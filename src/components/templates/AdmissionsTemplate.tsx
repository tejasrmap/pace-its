'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DataTable } from '@/components/ui/DataTable';
import { DocumentList } from '@/components/ui/DocumentList';
import { GraduationCap, CheckCircle, FileText, Send, AlertCircle, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

interface AdmissionsTemplateProps {
  page: any;
}

export const AdmissionsTemplate: React.FC<AdmissionsTemplateProps> = ({ page }) => {
  const isApplicationForm = page.canonicalPath.includes('apply-online');
  const programType = page.canonicalPath.includes('mtech') 
    ? 'M.Tech' 
    : page.canonicalPath.includes('mba') 
    ? 'MBA' 
    : 'B.Tech';

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [generatedAppNo, setGeneratedAppNo] = useState('');
  const [formData, setFormData] = useState({
    candidateName: '',
    fatherName: '',
    dob: '',
    gender: 'Male',
    category: 'OC',
    phone: '',
    email: '',
    address: '',
    marksPercent: '',
    entranceRank: '',
    branchPref1: 'Computer Science and Engineering (CSE)',
    branchPref2: 'Artificial Intelligence and Data Science (AI & DS)',
    branchPref3: 'Electronics and Communication Engineering (ECE)'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/admissions/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          programType: programType,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setGeneratedAppNo(data.applicationNo || 'PACE-2026-REG');
      setFormSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbs = [
    { name: "Admissions", href: "/admissions/admission-procedure" },
    { name: page.title }
  ];

  return (
    <div className="bg-[#F5F7F9] min-h-screen">
      {/* Header Banner */}
      <div className="bg-[#052D49] text-white pt-36 pb-16 relative overflow-hidden border-b-4 border-[#E9AC21]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E9AC21] text-[#052D49] uppercase tracking-wider font-condensed">
            <GraduationCap className="w-3.5 h-3.5" />
            ADMISSIONS 2026–27
          </span>
          <h1 className="font-condensed text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            {page.title}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-3xl font-light">
            PACE Institute of Technology & Sciences — Autonomous Institution accredited with NAAC 'A' Grade.
          </p>
        </div>
      </div>

      <Breadcrumb items={breadcrumbs} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {isApplicationForm ? (
              /* Working Online Application Portal */
              <div className="bg-white rounded-2xl border border-[#E4E9EF] p-6 sm:p-10 shadow-sm">
                <div className="border-b border-gray-100 pb-4 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E9AC21]">
                    CATEGORY-B (MANAGEMENT QUOTA) APPLICATION
                  </span>
                  <h2 className="font-condensed text-2xl sm:text-3xl font-black text-[#052D49] uppercase tracking-tight">
                    Online Application Form for {programType} Admissions (2026–27)
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Please provide accurate academic and contact details. Our admissions counseling cell will verify and contact you.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <div className="inline-block px-3 py-1 bg-emerald-200 text-emerald-900 font-mono text-xs font-bold rounded-full">
                      Application Reference: {generatedAppNo}
                    </div>
                    <h3 className="font-condensed text-2xl font-bold text-emerald-900 uppercase">
                      Application Submitted Successfully!
                    </h3>
                    <p className="text-sm text-emerald-800 max-w-md mx-auto">
                      Thank you, <strong>{formData.candidateName}</strong>. Your provisional {programType} application has been securely recorded in the PACE Admissions database. Our admissions counseling officer will contact you at <strong>{formData.phone}</strong> shortly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-2.5 bg-[#073B60] text-white rounded-xl text-xs font-bold uppercase tracking-wider font-condensed hover:bg-[#052D49]"
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold">
                        {submitError}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Full Name of Candidate *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.candidateName}
                          onChange={(e) => setFormData({...formData, candidateName: e.target.value})}
                          placeholder="As per SSC / 10th Marks Memo"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E9AC21]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Father's / Guardian's Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fatherName}
                          onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                          placeholder="Father / Guardian Name"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E9AC21]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.dob}
                          onChange={(e) => setFormData({...formData, dob: e.target.value})}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E9AC21]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Gender *
                        </label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({...formData, gender: e.target.value})}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E9AC21]"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="10-digit Mobile Number"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E9AC21]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="candidate@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E9AC21]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          Qualifying Exam Percentage (%) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.marksPercent}
                          onChange={(e) => setFormData({...formData, marksPercent: e.target.value})}
                          placeholder="e.g. 88.5%"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E9AC21]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                          EAPCET / Rank (if appeared)
                        </label>
                        <input
                          type="text"
                          value={formData.entranceRank}
                          onChange={(e) => setFormData({...formData, entranceRank: e.target.value})}
                          placeholder="State Entrance Rank"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E9AC21]"
                        />
                      </div>
                    </div>

                    {/* Branch Preferences */}
                    <div className="space-y-3 pt-2">
                      <h4 className="font-condensed text-base font-bold text-[#052D49] uppercase">
                        Branch Preferences
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] text-gray-500 mb-1 font-semibold">1st Choice</label>
                          <select
                            value={formData.branchPref1}
                            onChange={(e) => setFormData({...formData, branchPref1: e.target.value})}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none"
                          >
                            <option>Computer Science and Engineering (CSE)</option>
                            <option>Artificial Intelligence and Data Science (AI & DS)</option>
                            <option>Artificial Intelligence and Machine Learning (AI & ML)</option>
                            <option>CSE (IoT & Cyber Security incl. Blockchain)</option>
                            <option>Electronics and Communication Engineering (ECE)</option>
                            <option>Electrical and Electronics Engineering (EEE)</option>
                            <option>Mechanical Engineering (MECH)</option>
                            <option>Civil Engineering (CIVIL)</option>
                            <option>Master of Business Administration (MBA)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] text-gray-500 mb-1 font-semibold">2nd Choice</label>
                          <select
                            value={formData.branchPref2}
                            onChange={(e) => setFormData({...formData, branchPref2: e.target.value})}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none"
                          >
                            <option>Artificial Intelligence and Data Science (AI & DS)</option>
                            <option>Computer Science and Engineering (CSE)</option>
                            <option>Artificial Intelligence and Machine Learning (AI & ML)</option>
                            <option>CSE (IoT & Cyber Security)</option>
                            <option>Electronics and Communication Engineering (ECE)</option>
                            <option>Information Technology (IT)</option>
                            <option>Electrical and Electronics Engineering (EEE)</option>
                            <option>Mechanical Engineering (MECH)</option>
                            <option>Civil Engineering (CIVIL)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] text-gray-500 mb-1 font-semibold">3rd Choice</label>
                          <select
                            value={formData.branchPref3}
                            onChange={(e) => setFormData({...formData, branchPref3: e.target.value})}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 outline-none"
                          >
                            <option>Electronics and Communication Engineering (ECE)</option>
                            <option>Computer Science and Engineering (CSE)</option>
                            <option>Computer Science and Information Technology (CSIT)</option>
                            <option>Information Technology (IT)</option>
                            <option>Electrical and Electronics Engineering (EEE)</option>
                            <option>Mechanical Engineering (MECH)</option>
                            <option>Civil Engineering (CIVIL)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-[#E9AC21] hover:bg-[#F6C54A] text-[#052D49] font-condensed font-black text-sm uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'PROCESSING APPLICATION...' : 'SUBMIT ADMISSION APPLICATION'}</span>
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* Standard Admissions Information Page */
              <div className="bg-white rounded-2xl border border-[#E4E9EF] p-6 sm:p-8 shadow-sm">
                <div className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4">
                  {page.fullText ? (
                    page.fullText.split('\n\n').map((para: string, idx: number) => (
                      <p key={idx}>{para}</p>
                    ))
                  ) : (
                    <p>Comprehensive admission details, seat distribution, and institutional guidelines.</p>
                  )}
                </div>

                {/* Preserved Data Tables (e.g. Fee details, Courses Offered & Intake) */}
                {page.tables && page.tables.length > 0 && (
                  <div className="mt-8 space-y-6">
                    {page.tables.map((table: any, idx: number) => (
                      <DataTable
                        key={idx}
                        headers={table.headers}
                        rows={table.rows}
                        title={`Admission Table ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Document Downloads */}
                {page.documents && page.documents.length > 0 && (
                  <DocumentList
                    documents={page.documents}
                    title="Admission Notifications & Application Downloads"
                    enableSearch={true}
                  />
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-[#E4E9EF] p-6 shadow-sm space-y-4">
              <h3 className="font-condensed text-lg font-bold text-[#052D49] uppercase tracking-wider pb-3 border-b border-gray-100">
                Admissions Navigation
              </h3>
              <ul className="space-y-1.5 text-xs font-semibold text-[#073B60]">
                <li>
                  <Link href="/admissions/admission-procedure" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Admission Procedure</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/admissions/courses-offered" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Courses Offered & Intake</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/admissions/fee-details" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Fee Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/admissions/b-category/notifications" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Category-B Notifications</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/admissions/b-category/applications" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Download Application Form</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
                <li>
                  <Link href="/admissions/b-category/apply-online/btech" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-amber-50 text-[#073B60] font-bold transition-colors">
                    <span>Apply Online - B.Tech</span>
                    <span className="text-[10px] bg-[#E9AC21] text-[#052D49] px-2 py-0.5 rounded font-bold">Apply</span>
                  </Link>
                </li>
                <li>
                  <Link href="/admissions/b-category/apply-online/mba" className="hover:text-[#E9AC21] flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span>Apply Online - MBA</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E9AC21]" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-[#052D49] text-white rounded-2xl p-6 shadow-md border border-[#0A4A78] space-y-3">
              <span className="text-[10px] font-bold text-[#E9AC21] uppercase tracking-wider">
                ADMISSION HELPLINE
              </span>
              <h4 className="font-condensed text-xl font-bold uppercase">{siteConfig.phone}</h4>
              <p className="text-xs text-gray-300">Office open Mon–Sat 9:00 AM to 5:00 PM for on-campus counseling.</p>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-block w-full py-2.5 text-center bg-[#E9AC21] hover:bg-[#F6C54A] text-[#052D49] font-condensed font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-sm"
              >
                CALL ADMISSIONS DESK
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

