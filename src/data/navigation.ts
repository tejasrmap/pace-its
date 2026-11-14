export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
  badge?: string;
}

export const mainNavigation: NavItem[] = [
  {
    title: "About Us",
    href: "/pace-at-glance",
    children: [
      { title: "PACE At a Glance", href: "/pace-at-glance", description: "Institution history, milestones, and overview" },
      { title: "Vision & Mission", href: "/vision-and-mission", description: "Guiding principles and core educational goals" },
      { title: "Affiliation & Accreditation", href: "/affiliation-and-accreditation", description: "UGC Autonomous, NAAC 'A', NBA, JNTUK, AICTE" },
      { title: "Awards & Accolades", href: "/awards-and-accolades", description: "National rankings, institutional recognitions" },
      { title: "Why PACE", href: "/why-pace", description: "Key differentiators, infrastructure, campus culture" },
      { title: "Organization Chart", href: "/organization-chart", description: "Administrative hierarchy and governance framework" },
      { title: "Newsletters", href: "/newsletters", description: "Monthly and quarterly institutional publications" }
    ]
  },
  {
    title: "Administration",
    href: "/administration/chairman-message",
    children: [
      { title: "Chairman's Message", href: "/administration/chairman-message" },
      { title: "Vice President's Message", href: "/administration/vice-president-message" },
      { title: "Secretary's Message", href: "/administration/secretary-message" },
      { title: "Principal's Profile", href: "/administration/principal-profile" },
      { title: "Chief Administrative Officer", href: "/administration/cao" },
      { title: "Deans & Directors", href: "/administration/deans-and-directors" },
      { title: "HR Manager", href: "/administration/hrmanager" }
    ]
  },
  {
    title: "Admissions",
    href: "/admissions/admission-procedure",
    children: [
      { title: "Admission Procedure", href: "/admissions/admission-procedure" },
      { title: "Courses Offered", href: "/admissions/courses-offered" },
      { title: "Fee Details", href: "/admissions/fee-details" },
      { title: "Category-B (Management Quota)", href: "/admissions/b-category/applications" },
      { title: "Management Notifications", href: "/admissions/b-category/notifications" },
      { title: "Application Forms", href: "/admissions/b-category/applications" },
      { title: "Apply Online - B.Tech", href: "/admissions/b-category/apply-online/btech", badge: "Apply Now" },
      { title: "Apply Online - M.Tech", href: "/admissions/b-category/apply-online/mtech" },
      { title: "Apply Online - MBA", href: "/admissions/b-category/apply-online/mba" }
    ]
  },
  {
    title: "Academics",
    href: "/academics/academic-calendar",
    children: [
      { title: "Academic Calendar", href: "/academics/academic-calendar" },
      { title: "Academic Regulations", href: "/regulations" },
      { title: "Curriculum & Syllabus", href: "/curriculum_syllabus" },
      { title: "Examinations Cell", href: "/0/examinations-cell" },
      { title: "Exam Results Archive", href: "/1/examinations-cell" },
      {
        title: "Engineering Departments",
        href: "/academics/departments/cse",
        children: [
          { title: "Computer Science & Engineering (CSE)", href: "/academics/departments/cse" },
          { title: "Artificial Intelligence & Data Science (AI & DS)", href: "/academics/departments/artificial-intelligence-and-data-science" },
          { title: "Artificial Intelligence & Machine Learning (AI & ML)", href: "/academics/departments/artificial-intelligence-and-machine-learning" },
          { title: "CSE (IoT & Cyber Security)", href: "/academics/departments/internet-of-things-cyber-security" },
          { title: "Computer Science & Information Tech (CSIT)", href: "/academics/departments/csit" },
          { title: "Information Technology (IT)", href: "/academics/departments/it" },
          { title: "Electronics & Communication Engg (ECE)", href: "/academics/departments/ece" },
          { title: "Electrical & Electronics Engg (EEE)", href: "/academics/departments/eee" },
          { title: "Mechanical Engineering (MECH)", href: "/academics/departments/mech" },
          { title: "Civil Engineering (CIVIL)", href: "/academics/departments/civil" },
          { title: "CSE Regional Language", href: "/academics/departments/cser" },
          { title: "Master of Business Administration (MBA)", href: "/academics/departments/mba" },
          { title: "Humanities & Sciences (H&S)", href: "/academics/departments/h-and-s" }
        ]
      },
      {
        title: "Polytechnic / Diploma",
        href: "/academics/departments/polytechnic/cme",
        children: [
          { title: "Polytechnic CME", href: "/academics/departments/polytechnic/cme" },
          { title: "Polytechnic AIML", href: "/academics/departments/polytechnic/aimlj" },
          { title: "Polytechnic ECE", href: "/academics/departments/polytechnic/ece" },
          { title: "Polytechnic EEE", href: "/academics/departments/polytechnic/eee" },
          { title: "Polytechnic Civil", href: "/academics/departments/polytechnic/civil" },
          { title: "Polytechnic Exams", href: "/academics/departments/polytechnic/exams" },
          { title: "Polytechnic H&S", href: "/academics/departments/polytechnic/h&s" }
        ]
      }
    ]
  },
  {
    title: "Placements",
    href: "/trainings-and-placements",
    children: [
      { title: "Training & Placements Overview", href: "/trainings-and-placements" },
      { title: "Skill Development", href: "/skill-development" },
      { title: "Placement Records", href: "/placements-records" },
      { title: "Career Guidance Cell", href: "/career-guidance-cell" },
      { title: "From The Desk of TPO", href: "/tpo" }
    ]
  },
  {
    title: "Committees",
    href: "/committees/statutory-committees/governing-body",
    children: [
      {
        title: "Statutory Committees",
        href: "/committees/statutory-committees/governing-body",
        children: [
          { title: "Governing Body", href: "/committees/statutory-committees/governing-body" },
          { title: "Academic Council", href: "/committees/statutory-committees/academic-council" },
          { title: "Finance Committee", href: "/committees/non-statutory-committees/finance-committee" },
          { title: "Board of Studies (BOS)", href: "/committees/statutory-committees/board-of-studies/cse" }
        ]
      },
      {
        title: "Non-Statutory Committees",
        href: "/committees/non-statutory-committees/internal-complaints-committee",
        children: [
          { title: "Internal Complaints Committee (ICC)", href: "/committees/non-statutory-committees/internal-complaints-committee" },
          { title: "Women Empowerment Cell", href: "/committees/non-statutory-committees/women-empowerment-committee" },
          { title: "Anti-Ragging Committee", href: "/committees/non-statutory-committees/anti-ragging-committee" },
          { title: "Grievance Redressal Committee", href: "/committees/non-statutory-committees/grievance-redressal-committee" },
          { title: "SC/ST Committee", href: "/committees/non-statutory-committees/sc-st-committee" },
          { title: "Minority Cell", href: "/committees/non-statutory-committees/minority-cell-committee" },
          { title: "OBC Cell", href: "/committees/non-statutory-committees/obc-cell-committee" },
          { title: "Health Watch Committee", href: "/committees/non-statutory-committees/health-watch-committee" },
          { title: "Student Welfare Committee", href: "/committees/non-statutory-committees/student-welfare-committee" }
        ]
      }
    ]
  },
  {
    title: "R & D",
    href: "/research-and-development/about-research-and-development",
    children: [
      { title: "About Research & Development", href: "/research-and-development/about-research-and-development" },
      { title: "PACE Publishers", href: "/research-and-development/pace-publishers" },
      { title: "Publications & Patents", href: "/research-and-development/publications-and-patents" },
      { title: "Patents Granted & Published", href: "/research-and-development/patents" },
      { title: "Consultancy Activities", href: "/research-and-development/consultancy" },
      { title: "Research Supervisors & Scholars", href: "/research-and-development/scholars" },
      { title: "Sponsored Research Projects", href: "/research-and-development/sponsored-projects" },
      { title: "Recognized Research Centers", href: "/research-and-development/research-centers" },
      { title: "MOU Partners", href: "/research-and-development/mou-partners" },
      { title: "Entrepreneurship Cell (EDC)", href: "/research-and-development/edc" },
      { title: "Institution's Innovation Council (IIC)", href: "/research-and-development/iic" },
      { title: "National Innovation & Startup Policy (NISP)", href: "/research-and-development/national-innovation-startup-policy" },
      { title: "Industry Institution Interaction Cell", href: "/research-and-development/industry" }
    ]
  },
  {
    title: "Campus",
    href: "/campus/facilities",
    children: [
      { title: "Campus Facilities", href: "/campus/facilities" },
      { title: "Auditorium & Seminar Halls", href: "/campus/auditorium" },
      { title: "Student Hostels", href: "/campus/hostel" },
      { title: "Sports & Games", href: "/campus/sports-and-games" },
      { title: "National Service Scheme (NSS)", href: "/campus/national-service-scheme" },
      { title: "National Cadet Corps (NCC)", href: "/campus/ncc" },
      { title: "Institutional Social Responsibility", href: "/isr" },
      { title: "Press & Media Coverage", href: "/campus/press-and-media" },
      { title: "Campus Photo Gallery", href: "/campus/gallery" },
      { title: "Institutional Careers", href: "/careers" }
    ]
  }
];

export const quickLinks = [
  { title: "ERP Portal", href: "https://ecap.pace.ac.in/default.aspx", external: true },
  { title: "Alumni Network", href: "https://alumni.pace.ac.in/", external: true },
  { title: "Examinations Cell", href: "/0/examinations-cell" },
  { title: "Results", href: "/1/examinations-cell" },
  { title: "Online Grievance", href: "https://forms.gle/F8FwWDC1WrfsCn1Y7", external: true },
  { title: "IQAC", href: "/iqac" },
  { title: "AICTE IDEA LAB", href: "/aicte-idea-lab" },
  { title: "NIRF 2024", href: "https://pace.ac.in/public/assets/images/proffessional-bodies/National_Institutional_Ranking_Framework_2024.pdf", external: true },
  { title: "Mandatory Disclosure", href: "https://pace.ac.in/public/assets/images/Mandatory Disclosure PACEITS-KQ.pdf", external: true },
  { title: "RTI", href: "https://pace.ac.in/public/assets/images/rti-latest.pdf", external: true },
  { title: "Contact Us", href: "/contact-us" }
];

