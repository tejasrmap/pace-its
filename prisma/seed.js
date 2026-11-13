const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting PACE ITS Database Seeding ---');

  // 1. ROLES
  const rolesData = [
    { name: 'SUPER_ADMIN', description: 'Full system access and administration' },
    { name: 'PRINCIPAL', description: 'Institutional oversight, approvals and reports' },
    { name: 'DEAN', description: 'Academic and R&D oversight' },
    { name: 'HOD', description: 'Department-specific curriculum, faculty and lab management' },
    { name: 'ADMISSIONS_OFFICER', description: 'Category-B applications, leads, status updates' },
    { name: 'EXAMINATION_CONTROLLER', description: 'Timetables, circulars, results, regulations' },
    { name: 'TRAINING_PLACEMENT_OFFICER', description: 'Placement records, recruiters, training statistics' },
    { name: 'RND_CONVENER', description: 'Patents, research publications, research centers' },
    { name: 'FACULTY_COORDINATOR', description: 'Faculty profiles and departmental achievements' },
    { name: 'CONTENT_EDITOR', description: 'Website pages, announcements, media and gallery' },
    { name: 'GRIEVANCE_OFFICER', description: 'Ombudsperson and grievance submissions' },
    { name: 'STUDENT_AFFAIRS_ADMIN', description: 'Clubs, student council, sports, NSS and NCC' },
  ];

  const roleMap = {};
  for (const r of rolesData) {
    const role = await prisma.role.upsert({
      where: { name: r.name },
      update: { description: r.description },
      create: r,
    });
    roleMap[r.name] = role.id;
  }
  console.log(`✓ Seeded ${rolesData.length} RBAC Roles.`);

  // 2. PERMISSIONS
  const permissionsData = [
    { action: 'all:manage', description: 'Full root access' },
    { action: 'page:read', description: 'View pages' },
    { action: 'page:create', description: 'Create page' },
    { action: 'page:edit', description: 'Edit page content' },
    { action: 'page:delete', description: 'Delete or archive page' },
    { action: 'admission:read', description: 'View admission applications' },
    { action: 'admission:status_update', description: 'Update application status and notes' },
    { action: 'admission:export', description: 'Export admission leads' },
    { action: 'department:manage', description: 'Manage department data and faculty' },
    { action: 'placement:manage', description: 'Manage placement statistics and recruiters' },
    { action: 'examination:manage', description: 'Upload timetables and examination docs' },
    { action: 'research:manage', description: 'Manage patents and research publications' },
    { action: 'gallery:manage', description: 'Upload and organize photo galleries' },
    { action: 'audit:read', description: 'View security audit logs' },
  ];

  for (const p of permissionsData) {
    const perm = await prisma.permission.upsert({
      where: { id: p.action }, // using action as deterministic ID
      update: { description: p.description },
      create: { id: p.action, action: p.action, description: p.description },
    });

    // Assign all to SUPER_ADMIN
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: roleMap['SUPER_ADMIN'], permissionId: perm.id } },
      update: {},
      create: { roleId: roleMap['SUPER_ADMIN'], permissionId: perm.id },
    });
  }
  console.log(`✓ Seeded ${permissionsData.length} Permissions and mapped to SUPER_ADMIN.`);

  // 3. USERS
  const salt = await bcrypt.genSalt(10);
  const usersToSeed = [
    {
      email: 'admin@pace.ac.in',
      name: 'PACE Super Admin',
      password: 'PaceAdmin@2026!',
      role: 'SUPER_ADMIN',
    },
    {
      email: 'principal@pace.ac.in',
      name: 'Dr. C. V. Subbarao (Principal)',
      password: 'Principal@2026!',
      role: 'PRINCIPAL',
    },
    {
      email: 'admissions@pace.ac.in',
      name: 'Admissions Cell Convener',
      password: 'Admit@2026!',
      role: 'ADMISSIONS_OFFICER',
    },
    {
      email: 'hod.cse@pace.ac.in',
      name: 'Dr. M. Srinivasa Rao (HOD CSE)',
      password: 'HodCse@2026!',
      role: 'HOD',
    },
    {
      email: 'placements@pace.ac.in',
      name: 'Training & Placement Officer',
      password: 'Placements@2026!',
      role: 'TRAINING_PLACEMENT_OFFICER',
    },
    {
      email: 'editor@pace.ac.in',
      name: 'Content & Media Team',
      password: 'Editor@2026!',
      role: 'CONTENT_EDITOR',
    },
  ];

  for (const u of usersToSeed) {
    const passwordHash = await bcrypt.hash(u.password, salt);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, passwordHash, isActive: true },
      create: {
        email: u.email,
        name: u.name,
        passwordHash,
        isActive: true,
      },
    });

    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: user.id, roleId: roleMap[u.role] } },
      update: {},
      create: { userId: user.id, roleId: roleMap[u.role] },
    });
  }
  console.log(`✓ Seeded ${usersToSeed.length} Administrative Users.`);

  // 4. CANONICAL PAGES FROM JSON
  const canonicalPath = path.join(__dirname, '../src/data/canonicalPages.json');
  if (fs.existsSync(canonicalPath)) {
    const pagesDict = JSON.parse(fs.readFileSync(canonicalPath, 'utf8'));
    const pages = Array.isArray(pagesDict) ? pagesDict : Object.values(pagesDict);
    console.log(`Loading ${pages.length} canonical pages into database...`);

    let pageCount = 0;
    for (const p of pages) {
      await prisma.page.upsert({
        where: { canonicalPath: p.canonicalPath },
        update: {
          title: p.title || 'Untitled Page',
          section: p.section || 'General',
          category: p.category || 'General',
          template: p.template || 'InstitutionalTemplate',
          status: 'PUBLISHED',
          fullText: p.fullText ? p.fullText.substring(0, 5000) : '',
          seoTitle: `${p.title || 'Institutional Document'} | PACE ITS`,
          seoDesc: p.fullText ? p.fullText.substring(0, 160) : `PACE Institute of Technology & Sciences - ${p.title}`,
        },
        create: {
          canonicalPath: p.canonicalPath,
          sourceUrl: p.sourceUrl,
          title: p.title || 'Untitled Page',
          section: p.section || 'General',
          category: p.category || 'General',
          template: p.template || 'InstitutionalTemplate',
          status: 'PUBLISHED',
          fullText: p.fullText ? p.fullText.substring(0, 5000) : '',
          seoTitle: `${p.title || 'Institutional Document'} | PACE ITS`,
          seoDesc: p.fullText ? p.fullText.substring(0, 160) : `PACE Institute of Technology & Sciences - ${p.title}`,
        },
      });
      pageCount++;
    }
    console.log(`✓ Seeded ${pageCount} Canonical Pages.`);
  }

  // 5. DEPARTMENTS
  const departments = [
    { code: 'CSE', name: 'Computer Science and Engineering', slug: 'cse', type: 'UG', intake: '240 Seats' },
    { code: 'CSIT', name: 'Computer Science and Information Technology', slug: 'csit', type: 'UG', intake: '120 Seats' },
    { code: 'AIDS', name: 'Artificial Intelligence and Data Science', slug: 'aids', type: 'UG', intake: '180 Seats' },
    { code: 'AIML', name: 'Artificial Intelligence and Machine Learning', slug: 'aiml', type: 'UG', intake: '120 Seats' },
    { code: 'CSG', name: 'Computer Science and Business Systems', slug: 'csg', type: 'UG', intake: '60 Seats' },
    { code: 'IT', name: 'Information Technology', slug: 'it', type: 'UG', intake: '60 Seats' },
    { code: 'ECE', name: 'Electronics and Communication Engineering', slug: 'ece', type: 'UG', intake: '180 Seats' },
    { code: 'EEE', name: 'Electrical and Electronics Engineering', slug: 'eee', type: 'UG', intake: '60 Seats' },
    { code: 'MECH', name: 'Mechanical Engineering', slug: 'mech', type: 'UG', intake: '60 Seats' },
    { code: 'CIVIL', name: 'Civil Engineering', slug: 'civil', type: 'UG', intake: '60 Seats' },
    { code: 'AUTO', name: 'Automobile Engineering', slug: 'automobile', type: 'UG', intake: '30 Seats' },
    { code: 'MBA', name: 'Master of Business Administration', slug: 'mba', type: 'PG', intake: '180 Seats' },
    { code: 'HBS', name: 'Humanities and Basic Sciences', slug: 'humanities-basic-sciences', type: 'UG', intake: 'Foundation' },
    { code: 'D-CE', name: 'Diploma in Civil Engineering', slug: 'diploma-ce', type: 'DIPLOMA', intake: '60 Seats' },
    { code: 'D-EEE', name: 'Diploma in Electrical & Electronics Engineering', slug: 'diploma-eee', type: 'DIPLOMA', intake: '60 Seats' },
    { code: 'D-ME', name: 'Diploma in Mechanical Engineering', slug: 'diploma-me', type: 'DIPLOMA', intake: '60 Seats' },
    { code: 'D-ECE', name: 'Diploma in Electronics & Communication Engineering', slug: 'diploma-ece', type: 'DIPLOMA', intake: '60 Seats' },
    { code: 'D-CSE', name: 'Diploma in Computer Engineering', slug: 'diploma-cse', type: 'DIPLOMA', intake: '120 Seats' },
    { code: 'D-AIML', name: 'Diploma in Artificial Intelligence & Machine Learning', slug: 'diploma-aiml', type: 'DIPLOMA', intake: '60 Seats' },
  ];

  for (const d of departments) {
    await prisma.department.upsert({
      where: { code: d.code },
      update: { name: d.name, slug: d.slug, type: d.type, intake: d.intake },
      create: d,
    });
  }
  console.log(`✓ Seeded ${departments.length} Academic & Diploma Departments.`);

  // 6. SAMPLE ADMISSION APPLICATIONS
  const sampleApps = [
    {
      applicationNo: 'PACE-2026-BTECH-00101',
      candidateName: 'Kalyan Ramachandran',
      fatherName: 'Venkata Ramachandran',
      dob: '2008-04-12',
      gender: 'Male',
      category: 'OC',
      phone: '+91 98480 12345',
      email: 'kalyan.ram@gmail.com',
      address: 'D.No 4-12, Gandhi Road, Ongole, Prakasam Dist, AP - 523001',
      marksPercent: '94.6%',
      entranceRank: 'EAPCET Rank: 14,250',
      programType: 'B.Tech',
      branchPref1: 'Computer Science and Engineering (CSE)',
      branchPref2: 'Artificial Intelligence and Data Science (AIDS)',
      branchPref3: 'Information Technology (IT)',
      status: 'NEW',
      internalNotes: 'Top 15k ranker. Interested in merit fee concession inquiry.',
    },
    {
      applicationNo: 'PACE-2026-BTECH-00102',
      candidateName: 'Pooja Reddy',
      fatherName: 'Srinivasa Reddy',
      dob: '2008-07-25',
      gender: 'Female',
      category: 'OC',
      phone: '+91 94401 56789',
      email: 'pooja.reddy2008@outlook.com',
      address: 'Flat 302, Sai Residency, Lawyerpet, Ongole, AP - 523002',
      marksPercent: '96.2%',
      entranceRank: 'EAPCET Rank: 11,890',
      programType: 'B.Tech',
      branchPref1: 'Artificial Intelligence and Machine Learning (AIML)',
      branchPref2: 'Computer Science and Engineering (CSE)',
      branchPref3: 'Electronics and Communication Engineering (ECE)',
      status: 'CONTACTED',
      internalNotes: 'Contacted on 10 Nov. Candidate requested campus hostel tour.',
    },
    {
      applicationNo: 'PACE-2026-BTECH-00103',
      candidateName: 'Manoj Kumar Varma',
      fatherName: 'Raju Varma',
      dob: '2007-11-19',
      gender: 'Male',
      category: 'BC-D',
      phone: '+91 97012 34567',
      email: 'manoj.varma@yahoo.com',
      address: 'Chirala Road, Kandukur, Prakasam Dist, AP',
      marksPercent: '88.4%',
      entranceRank: 'EAPCET Rank: 28,400',
      programType: 'B.Tech',
      branchPref1: 'Electronics and Communication Engineering (ECE)',
      branchPref2: 'Electrical and Electronics Engineering (EEE)',
      branchPref3: 'Mechanical Engineering (MECH)',
      status: 'UNDER_REVIEW',
      internalNotes: 'Documents uploaded. Verifying intermediate marks memo.',
    },
    {
      applicationNo: 'PACE-2026-MBA-00045',
      candidateName: 'Swathi Chowdary',
      fatherName: 'Nageswara Rao',
      dob: '2003-02-14',
      gender: 'Female',
      category: 'OC',
      phone: '+91 99890 98765',
      email: 'swathi.chowdary@gmail.com',
      address: 'Trunk Road, Ongole, AP',
      marksPercent: '8.4 CGPA (B.Com)',
      entranceRank: 'ICET Rank: 4,120',
      programType: 'MBA',
      branchPref1: 'Finance & HR Dual Specialization',
      branchPref2: 'Marketing & Business Analytics',
      status: 'APPROVED',
      internalNotes: 'Provisional Category-B seat allotment confirmed by Convener.',
    },
  ];

  for (const app of sampleApps) {
    await prisma.admissionApplication.upsert({
      where: { applicationNo: app.applicationNo },
      update: app,
      create: app,
    });
  }
  console.log(`✓ Seeded ${sampleApps.length} Admission Applications.`);

  // 7. WEBSITE SETTINGS
  const settings = [
    { key: 'COLLEGE_NAME', value: 'PACE Institute of Technology & Sciences (Autonomous)', group: 'GENERAL' },
    { key: 'COLLEGE_CODE', value: 'PACE (EAPCET Code: PACE)', group: 'GENERAL' },
    { key: 'ACCREDITATION_INFO', value: 'Autonomous, NAAC Grade "A+", NBA Accredited (CSE, ECE, EEE, ME, CE), Approved by AICTE, Affiliated to JNTUK', group: 'GENERAL' },
    { key: 'ADMISSIONS_HOTLINE_1', value: '+91 95814 56310', group: 'ADMISSIONS' },
    { key: 'ADMISSIONS_HOTLINE_2', value: '+91 95814 56311', group: 'ADMISSIONS' },
    { key: 'ADMISSIONS_EMAIL', value: 'admissions@pace.ac.in', group: 'ADMISSIONS' },
    { key: 'GENERAL_EMAIL', value: 'principal@pace.ac.in', group: 'CONTACT' },
    { key: 'CAMPUS_ADDRESS', value: 'NH-16, Near Valluramma Temple, Valluru, Ongole, Prakasam District, Andhra Pradesh - 523272', group: 'CONTACT' },
  ];

  for (const s of settings) {
    await prisma.websiteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, group: s.group },
      create: s,
    });
  }
  console.log(`✓ Seeded ${settings.length} Website Settings.`);

  // 8. NEWS TICKERS
  const newsItems = [
    { title: 'PACE ITS Accredited by NAAC with prestigious "A+" Grade in Cycle-2 with highest CGPA in Prakasam District', isTicker: true, isActive: true, order: 1 },
    { title: 'Admissions open for B.Tech Category-B (Management Quota) 2026-27 - Apply online or visit campus admissions cell', isTicker: true, isActive: true, order: 2 },
    { title: 'Campus Placements 2024-25: 1200+ Offers with Highest Package ₹18.5 LPA by Virtusa, TCS, Wipro and Infosys', isTicker: true, isActive: true, order: 3 },
    { title: 'Autonomous End Semester Examinations (Regular & Supplementary) Timetable Notification Released', isTicker: true, isActive: true, order: 4 },
  ];

  for (const n of newsItems) {
    await prisma.newsArticle.create({
      data: n,
    });
  }
  console.log(`✓ Seeded ${newsItems.length} News Ticker Articles.`);

  // 9. AUDIT LOG INITIALIZATION
  await prisma.auditLog.create({
    data: {
      action: 'SYSTEM_INITIALIZATION',
      entityType: 'System',
      entityId: 'ROOT',
      details: JSON.stringify({ message: 'Phase 4 Database initialization and canonical data seeding completed successfully' }),
    },
  });
  console.log('✓ Initialized System Audit Log.');

  console.log('--- Database Seeding Finished Successfully! ---');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
