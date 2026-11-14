import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db';

const applicationSchema = z.object({
  candidateName: z.string().min(2, 'Full name is required'),
  fatherName: z.string().min(2, "Father's name is required"),
  dob: z.string().min(4, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  category: z.string().min(1, 'Category is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email address is required'),
  address: z.string().optional(),
  marksPercent: z.string().min(1, 'Intermediate / Diploma marks are required'),
  entranceRank: z.string().optional(),
  programType: z.string().default('B.Tech'),
  branchPref1: z.string().min(2, 'First branch preference is required'),
  branchPref2: z.string().optional(),
  branchPref3: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = applicationSchema.parse(body);

    // Generate unique application number
    const count = await prisma.admissionApplication.count();
    const progCode = validated.programType.replace(/[^A-Za-z]/g, '').toUpperCase();
    const appNumber = `PACE-2026-${progCode}-${String(count + 101).padStart(5, '0')}`;

    const newApplication = await prisma.admissionApplication.create({
      data: {
        applicationNo: appNumber,
        candidateName: validated.candidateName,
        fatherName: validated.fatherName,
        dob: validated.dob,
        gender: validated.gender,
        category: validated.category,
        phone: validated.phone,
        email: validated.email,
        address: validated.address || '',
        marksPercent: validated.marksPercent,
        entranceRank: validated.entranceRank || '',
        programType: validated.programType,
        branchPref1: validated.branchPref1,
        branchPref2: validated.branchPref2 || '',
        branchPref3: validated.branchPref3 || '',
        status: 'NEW',
      },
    });

    // Record audit log entry
    await prisma.auditLog.create({
      data: {
        action: 'ADMISSION_SUBMITTED',
        entityType: 'AdmissionApplication',
        entityId: newApplication.id,
        details: JSON.stringify({
          applicationNo: newApplication.applicationNo,
          candidateName: newApplication.candidateName,
          program: newApplication.programType,
          pref1: newApplication.branchPref1,
        }),
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Admission enquiry submitted successfully.',
        applicationNo: newApplication.applicationNo,
        data: newApplication,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Admission submit error:', error);
    return NextResponse.json(
      { error: 'Failed to submit admission application' },
      { status: 500 }
    );
  }
}

