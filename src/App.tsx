import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  Search,
  BookOpen,
  Award,
  Zap,
  ArrowRight,
  Sparkles,
  Compass,
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileText,
  UserCheck
} from 'lucide-react';

export type AcademicGroup = 'science' | 'business' | 'humanities';

export interface StudentProfile {
  sscGroup: AcademicGroup;
  sscYear: string;
  sscGpa: number;
  hscGroup: AcademicGroup;
  hscYear: string;
  hscGpa: number;
  subjectGpas: Record<string, number | null>;
}

export interface UniversityRequirement {
  id: string;
  name: string;
  unit: string;
  allowedHscGroups: AcademicGroup[] | 'any';
  eligibleHscYears: string[];
  minHscGpa: number;
  minSscGpa: number;
  minTotalGpa: number;
  requiredSubjects?: {
    subject: string;
    minGrade: number;
  }[];
  isVerified: boolean;
  details: string;
  seatCount: string;
  examMark: string;
  examFormat: string;
  examDate: string;
}

const GROUP_SUBJECTS: Record<AcademicGroup, { id: string; name: string }[]> = {
  science: [
    { id: 'physics', name: 'Physics' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'math', name: 'Higher Mathematics' },
    { id: 'biology', name: 'Biology' },
    { id: 'english', name: 'English' },
    { id: 'bangla', name: 'Bangla' },
    { id: 'ict', name: 'ICT' },
  ],
  business: [
    { id: 'accounting', name: 'Accounting' },
    { id: 'finance', name: 'Finance, Banking & Insurance' },
    { id: 'management', name: 'Business Org. & Management' },
    { id: 'economics', name: 'Economics' },
    { id: 'english', name: 'English' },
    { id: 'bangla', name: 'Bangla' },
    { id: 'ict', name: 'ICT' },
  ],
  humanities: [
    { id: 'english', name: 'English' },
    { id: 'bangla', name: 'Bangla' },
    { id: 'economics', name: 'Economics' },
    { id: 'logic', name: 'Logic' },
    { id: 'history', name: 'History' },
    { id: 'civics', name: 'Civics & Good Governance' },
    { id: 'geography', name: 'Geography' },
    { id: 'ict', name: 'ICT' },
  ]
};

const universities: UniversityRequirement[] = [
  {
    id: "du-science-2026-27",
    name: "University of Dhaka",
    unit: "Science Unit (A Unit)",
    allowedHscGroups: ['science'],
    eligibleHscYears: ['2026'],
    minHscGpa: 3.5,
    minSscGpa: 3.5,
    minTotalGpa: 8.0,
    isVerified: true,
    details: "Passing years: SSC (2021–24), HSC (2026). Science applicants need min 3.50 in both with combined 8.00.",
    seatCount: "Pending Official Notice",
    examMark: "120 marks total (100 Test: 60 MCQ + 40 Written + 20 Academic)",
    examFormat: "MCQ: 60 marks (45m) | Written: 40 marks (45m)",
    examDate: "2026-12-12"
  },
  {
    id: "du-arts-law-social-sciences-2026-27",
    name: "University of Dhaka",
    unit: "Arts, Law & Social Sciences (B Unit)",
    allowedHscGroups: 'any',
    eligibleHscYears: ['2026'],
    minHscGpa: 3.0,
    minSscGpa: 3.0,
    minTotalGpa: 7.5,
    isVerified: true,
    details: "Humanities: min 3.00 (Total 7.50). Science: min 3.50 (Total 8.00). Commerce: min 3.00 (Total 7.50).",
    seatCount: "Pending Official Notice",
    examMark: "120 marks total (100 Test: 60 MCQ + 40 Written + 20 Academic)",
    examFormat: "MCQ: 60 marks (45m) | Written: 40 marks (45m)",
    examDate: "2026-12-19"
  },
  {
    id: "du-business-studies-2026-27",
    name: "University of Dhaka",
    unit: "Business Studies (C Unit)",
    allowedHscGroups: 'any',
    eligibleHscYears: ['2026'],
    minHscGpa: 3.0,
    minSscGpa: 3.0,
    minTotalGpa: 7.5,
    isVerified: true,
    details: "Commerce: min 3.00 (Total 7.50). Science: min 3.50 (Total 8.00). Humanities: min 3.00 (Total 7.50).",
    seatCount: "Pending Official Notice",
    examMark: "120 marks total (100 Test: 60 MCQ + 40 Written + 20 Academic)",
    examFormat: "MCQ: 60 marks (45m) | Written: 40 marks (45m)",
    examDate: "2026-12-26"
  },
  {
    id: "butex-textile-engineering-2026-27",
    name: "Bangladesh Univ. of Textiles",
    unit: "BSc in Textile Engineering",
    allowedHscGroups: ['science'],
    eligibleHscYears: ['2026'],
    minHscGpa: 0,
    minSscGpa: 0,
    minTotalGpa: 0,
    isVerified: false,
    details: "Official GPA thresholds pending circular release. Previous ref: 200 marks written exam.",
    seatCount: "Pending Circular",
    examMark: "200 Marks Written (Prev. Ref)",
    examFormat: "Written Examination format",
    examDate: "2027-01-29"
  },
  {
    id: "buet-undergraduate-2026-27",
    name: "Bangladesh Univ. of Engineering & Tech (BUET)",
    unit: "Undergraduate Engineering Admission",
    allowedHscGroups: ['science'],
    eligibleHscYears: ['2026'],
    minHscGpa: 0,
    minSscGpa: 0,
    minTotalGpa: 0,
    isVerified: false,
    details: "Official GPA thresholds, subject grades, and screening policy pending circular release. Test date: 16 January 2027.",
    seatCount: "Pending Official Notice",
    examMark: "2026–27 marks distribution pending official circular confirmation.",
    examFormat: "Selection process & examination format require official confirmation.",
    examDate: "2027-01-16"
  },
  {
    id: "cuet-undergraduate-2026-27",
    name: "Chittagong Univ. of Engineering & Technology (CUET)",
    unit: "Undergraduate Engineering, URP & Architecture",
    allowedHscGroups: ['science'],
    eligibleHscYears: ['2026'],
    minHscGpa: 0,
    minSscGpa: 0,
    minTotalGpa: 0,
    isVerified: false,
    details: "CUET announced 23 January 2027 as tentative test date. Official GPA thresholds remain pending.",
    seatCount: "Not yet verified for 2026–27",
    examMark: "2026–27 marks distribution requires confirmation from official circular.",
    examFormat: "Tentative test date: 23 January 2027.",
    examDate: "2027-01-23"
  }
];

type EligibilityStatus = 'eligible' | 'not-eligible' | 'pending';

function evaluateEligibility(student: StudentProfile, uni: UniversityRequirement): { status: EligibilityStatus; reason: string; hint: string } {
  if (!uni.isVerified || uni.minTotalGpa === 0) {
    return { 
      status: 'pending', 
      reason: 'The official 2026–27 admission circular for this unit has not been published yet.', 
      hint: 'Check back once the official circular is officially released by the university.' 
    };
  }

  if (uni.allowedHscGroups !== 'any' && !uni.allowedHscGroups.includes(student.hscGroup)) {
    return { 
      status: 'not-eligible', 
      reason: `Your HSC group (${student.hscGroup}) does not match this unit's allowed group (${uni.allowedHscGroups.join(', ')}).`, 
      hint: 'Review alternative units that accept your background group.' 
    };
  }

  if (uni.eligibleHscYears.length > 0 && !uni.eligibleHscYears.includes(student.hscYear)) {
    return { 
      status: 'not-eligible', 
      reason: `Your HSC passing year (${student.hscYear}) is not eligible for this session.`, 
      hint: 'Verify passing year rules in the official guideline.' 
    };
  }

  let minSsc = uni.minSscGpa;
  let minHsc = uni.minHscGpa;
  let minTotal = uni.minTotalGpa;

  if (uni.id.startsWith("du-")) {
    if (student.hscGroup === "science") {
      minSsc = 3.50; minHsc = 3.50; minTotal = 8.00;
    } else {
      minSsc = 3.00; minHsc = 3.00; minTotal = 7.50;
    }
  }

  const totalGpa = student.sscGpa + student.hscGpa;

  if (student.sscGpa < minSsc || student.hscGpa < minHsc || totalGpa < minTotal) {
    let details = [];
    if (student.sscGpa < minSsc) details.push(`SSC GPA is ${student.sscGpa} (Needs min ${minSsc})`);
    if (student.hscGpa < minHsc) details.push(`HSC GPA is ${student.hscGpa} (Needs min ${minHsc})`);
    if (totalGpa < minTotal) details.push(`Total GPA is ${totalGpa.toFixed(2)} (Needs min ${minTotal})`);
    
    return { 
      status: 'not-eligible', 
      reason: `Your GPA is below the requirement: ${details.join('; ')}.`, 
      hint: 'Your academic scores do not meet the minimum threshold for this unit.' 
    };
  }

  return { 
    status: 'eligible', 
    reason: 'Your SSC & HSC GPAs successfully meet all verified requirements for this unit.', 
    hint: 'You are fully eligible to apply when the application portal opens!' 
  };
}

export default function App() {
  const [sscGroup, setSscGroup] = useState<AcademicGroup>('science');
  const [sscYear, setSscYear] = useState<string>('2024');
  const [sscGpa, setSscGpa] = useState<string>('');
  
  const [hscGroup, setHscGroup] = useState<AcademicGroup>('science');
  const [hscYear, setHscYear] = useState<string>('2026');
  const [hscGpa, setHscGpa] = useState<string>('');

  const [subjectGpas, setSubjectGpas] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'checker' | 'directory' | 'tips'>('checker');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const handleSubjectChange = (subjectId: string, val: string) => {
    setSubjectGpas(prev => ({ ...prev, [subjectId]: val }));
  };

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const numSsc = parseFloat(sscGpa);
    const numHsc = parseFloat(hscGpa);
    if (!isNaN(numSsc) && !isNaN(numHsc)) {
      setIsCalculated(true);
    }
  };

  const currentStudent: StudentProfile = {
    sscGroup,
    sscYear,
    sscGpa: parseFloat(sscGpa) || 0,
    hscGroup,
    hscYear,
    hscGpa: parseFloat(hscGpa) || 0,
    subjectGpas: Object.fromEntries(
      Object.entries(subjectGpas).map(([k, v]) => [k, v !== '' ? parseFloat(v) : null])
    )
  };

  const filteredUniversities = universities.filter(uni => 
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const evaluatedList = universities.map(uni => ({
    uni,
    evalResult: evaluateEligibility(currentStudent, uni)
  }));

  const eligibleList = evaluatedList.filter(item => item.evalResult.status === 'eligible');
  const otherList = evaluatedList.filter(item => item.evalResult.status !== 'eligible');

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-50 text-slate-800 antialiased"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 sm:p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl shadow-md shadow-emerald-500/10">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                UniChecker
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                2026-27
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 text-xs font-semibold w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveTab('checker')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-xl transition-all cursor-pointer text-center ${
                activeTab === 'checker' ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/50 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Checker
            </button>
            <button
              onClick={() => setActiveTab('directory')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-xl transition-all cursor-pointer text-center ${
                activeTab === 'directory' ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/50 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Directory
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-xl transition-all cursor-pointer text-center ${
                activeTab === 'tips' ? 'bg-white text-emerald-800 shadow-sm border border-slate-200/50 font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Guide & Tips
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        {/* TAB 1: CHECKER */}
        {activeTab === 'checker' && (
          <div className="space-y-8 sm:space-y-10">
            <div className="text-center max-w-xl mx-auto space-y-2.5 sm:space-y-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-3 py-1 bg-emerald-50 border border-emerald-200/60 text-emerald-700 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Public University Admission 2026–27
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Smart Eligibility Validator
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed px-2">
                Enter your academic records and stream subjects once to evaluate eligibility across multiple universities clearly.
              </p>
            </div>

            {/* Profile Form Card */}
            <div className="max-w-xl mx-auto bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Student Academic Profile</h2>
                  <p className="text-[11px] text-slate-400">SSC & HSC details with stream subjects</p>
                </div>
              </div>

              <form onSubmit={handleCheck} className="space-y-6">
                
                {/* SSC Section */}
                <div className="space-y-3 p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">SSC Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Group</label>
                      <select
                        value={sscGroup}
                        onChange={(e) => setSscGroup(e.target.value as AcademicGroup)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                      >
                        <option value="science">Science</option>
                        <option value="business">Business Studies</option>
                        <option value="humanities">Humanities</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Passing Year</label>
                      <input
                        type="text"
                        placeholder="2024"
                        value={sscYear}
                        onChange={(e) => setSscYear(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Overall GPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="5.0"
                        required
                        placeholder="5.00"
                        value={sscGpa}
                        onChange={(e) => setSscGpa(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>

                {/* HSC Section */}
                <div className="space-y-3 p-4 bg-slate-50/70 rounded-2xl border border-slate-100">
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">HSC Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Group</label>
                      <select
                        value={hscGroup}
                        onChange={(e) => {
                          setHscGroup(e.target.value as AcademicGroup);
                          setSubjectGpas({});
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                      >
                        <option value="science">Science</option>
                        <option value="business">Business Studies</option>
                        <option value="humanities">Humanities</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Passing Year</label>
                      <input
                        type="text"
                        placeholder="2026"
                        value={hscYear}
                        onChange={(e) => setHscYear(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Overall GPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="5.0"
                        required
                        placeholder="5.00"
                        value={hscGpa}
                        onChange={(e) => setHscGpa(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Dynamic HSC Subject-wise GPA Inputs */}
                <div className="space-y-3 p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100/80">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">
                      HSC Subject-Wise GPAs <span className="text-[10px] font-normal lowercase text-emerald-700">(optional / as needed)</span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {GROUP_SUBJECTS[hscGroup].map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-200/80">
                        <label className="text-xs font-medium text-slate-700 truncate pr-2" title={sub.name}>
                          {sub.name}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="5.0"
                          placeholder="e.g. 5.00"
                          value={subjectGpas[sub.id] || ''}
                          onChange={(e) => handleSubjectChange(sub.id, e.target.value)}
                          className="w-20 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-center text-slate-900 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3.5 px-5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  Evaluate Eligibility Across Universities <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Results Grouped Report */}
            {isCalculated && (
              <div className="space-y-10 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900">Eligibility Analysis Report</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Combined Total GPA: <span className="text-emerald-700 font-bold text-sm">{(currentStudent.sscGpa + currentStudent.hscGpa).toFixed(2)}</span> / 10.00
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-xs px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-700 font-semibold capitalize shadow-xs">
                    HSC Group: {hscGroup}
                  </span>
                </div>

                {/* SECTION 1: ELIGIBLE UNIVERSITIES */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                      <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                        Eligible Units / Universities
                      </h3>
                    </div>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                      {eligibleList.length} Found
                    </span>
                  </div>

                  {eligibleList.length === 0 ? (
                    <div className="p-6 bg-white border border-slate-200 rounded-2xl text-center text-xs text-slate-500">
                      No fully verified eligible universities found matching your current GPA or criteria. Check pending or ineligible sections below.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {eligibleList.map(({ uni, evalResult }) => {
                        const isExpanded = !!expandedCards[uni.id];
                        return (
                          <div key={uni.id} className="bg-white border-2 border-emerald-400 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
                            <div>
                              <div className="flex items-start justify-between gap-2.5 mb-4">
                                <div>
                                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">{uni.name}</h3>
                                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">{uni.unit}</p>
                                </div>
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 shrink-0">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Eligible
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-4">
                                <div className="bg-slate-50 border border-slate-100 p-2.5 sm:p-3 rounded-2xl">
                                  <span className="block text-[10px] sm:text-[11px] text-slate-400 font-medium mb-0.5">Req. Total GPA</span>
                                  <span className="text-xs sm:text-sm font-extrabold text-slate-900">{uni.minTotalGpa.toFixed(2)}</span>
                                  <span className="block text-[9px] sm:text-[10px] text-emerald-600 font-semibold mt-0.5">Criteria Met</span>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 p-2.5 sm:p-3 rounded-2xl">
                                  <span className="block text-[10px] sm:text-[11px] text-slate-400 font-medium mb-0.5">Exam Date</span>
                                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-emerald-600 shrink-0" /> {uni.examDate}
                                  </span>
                                  <span className="block text-[9px] sm:text-[10px] text-slate-500 mt-0.5 truncate">Seats: {uni.seatCount}</span>
                                </div>
                              </div>

                              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 mb-3 text-[11px] space-y-1">
                                <p className="text-emerald-900"><strong>Why Eligible:</strong> {evalResult.reason}</p>
                                <p className="text-emerald-700 text-[10px]">💡 <strong>Next Step:</strong> {evalResult.hint}</p>
                              </div>

                              <div className="border-t border-slate-100 pt-3">
                                <button
                                  onClick={() => toggleExpand(uni.id)}
                                  className="w-full flex items-center justify-between text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors py-1 cursor-pointer"
                                >
                                  <span className="flex items-center gap-1.5 text-[11px]">
                                    <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Circular & Mark Summary
                                  </span>
                                  {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                                </button>

                                {isExpanded && (
                                  <div className="mt-2.5 p-3 bg-slate-50/80 rounded-2xl border border-slate-100 text-[11px] space-y-2 text-slate-600 animate-fadeIn">
                                    <p><strong className="text-slate-800">Criteria:</strong> {uni.details}</p>
                                    <p><strong className="text-slate-800">Exam Marks:</strong> {uni.examMark}</p>
                                    <p><strong className="text-slate-800">Format:</strong> {uni.examFormat}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* SECTION 2: PENDING / NOT ELIGIBLE UNIVERSITIES */}
                <div className="space-y-4 pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                        Pending Circular & Ineligible Units
                      </h3>
                    </div>
                    <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                      {otherList.length} Found
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {otherList.map(({ uni, evalResult }) => {
                      const isExpanded = !!expandedCards[uni.id];
                      const isPending = evalResult.status === 'pending';

                      return (
                        <div 
                          key={uni.id}
                          className={`bg-white border rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 ${
                            isPending ? 'border-amber-200 shadow-sm' : 'border-rose-200/80 shadow-sm'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2.5 mb-4">
                              <div>
                                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">{uni.name}</h3>
                                <p className="text-xs font-semibold text-emerald-700 mt-0.5">{uni.unit}</p>
                              </div>

                              {isPending ? (
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 shrink-0">
                                  <AlertCircle className="w-3 h-3 text-amber-600" /> Pending Circular
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-xl border border-rose-200 shrink-0">
                                  <XCircle className="w-3 h-3 text-rose-600" /> Not Eligible
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-4">
                              <div className="bg-slate-50 border border-slate-100 p-2.5 sm:p-3 rounded-2xl">
                                <span className="block text-[10px] sm:text-[11px] text-slate-400 font-medium mb-0.5">Req. Total GPA</span>
                                <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                                  {uni.minTotalGpa === 0 ? "Pending" : uni.minTotalGpa.toFixed(2)}
                                </span>
                                <span className="block text-[9px] sm:text-[10px] text-slate-500 mt-0.5">Threshold Check</span>
                              </div>
                              <div className="bg-slate-50 border border-slate-100 p-2.5 sm:p-3 rounded-2xl">
                                <span className="block text-[10px] sm:text-[11px] text-slate-400 font-medium mb-0.5">Exam Date</span>
                                <span className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-emerald-600 shrink-0" /> {uni.examDate}
                                </span>
                                <span className="block text-[9px] sm:text-[10px] text-slate-500 mt-0.5 truncate">Seats: {uni.seatCount}</span>
                              </div>
                            </div>

                            {/* Detailed Simple English Reason & Hint */}
                            <div className={`p-3 rounded-xl border mb-3 text-[11px] space-y-1 ${
                              isPending ? 'bg-amber-50/60 border-amber-100 text-amber-900' : 'bg-rose-50/60 border-rose-100 text-rose-900'
                            }`}>
                              <p><strong>Why not eligible:</strong> {evalResult.reason}</p>
                              <p className="text-[10px] opacity-90">💡 <strong>Action:</strong> {evalResult.hint}</p>
                            </div>

                            <div className="border-t border-slate-100 pt-3">
                              <button
                                onClick={() => toggleExpand(uni.id)}
                                className="w-full flex items-center justify-between text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors py-1 cursor-pointer"
                              >
                                <span className="flex items-center gap-1.5 text-[11px]">
                                  <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Circular & Mark Summary
                                </span>
                                {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                              </button>

                              {isExpanded && (
                                <div className="mt-2.5 p-3 bg-slate-50/80 rounded-2xl border border-slate-100 text-[11px] space-y-2 text-slate-600 animate-fadeIn">
                                  <p><strong className="text-slate-800">Criteria:</strong> {uni.details}</p>
                                  <p><strong className="text-slate-800">Exam Marks:</strong> {uni.examMark}</p>
                                  <p><strong className="text-slate-800">Format:</strong> {uni.examFormat}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* TAB 2: DIRECTORY */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">University Directory</h2>
                <p className="text-xs text-slate-500 mt-1">Explore unit-wise exam dates, format, and verified rules</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search university or unit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600 shadow-2xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredUniversities.map((uni) => (
                <div key={uni.id} className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">{uni.name}</h3>
                      <p className="text-xs font-semibold text-emerald-700 mt-0.5">{uni.unit}</p>
                    </div>
                    <div className="p-2 sm:p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                      <span className="block text-[10px] text-slate-400">Exam Date</span>
                      <span className="text-xs font-bold text-slate-800">{uni.examDate}</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                      <span className="block text-[10px] text-slate-400">Total Seats</span>
                      <span className="text-xs font-bold text-slate-800 truncate block">{uni.seatCount}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50/60 rounded-2xl border border-slate-100 text-[11px] text-slate-600 space-y-1.5">
                    <p><strong className="text-slate-800">Details:</strong> {uni.details}</p>
                    <p><strong className="text-slate-800">Exam Marks:</strong> {uni.examMark}</p>
                    <p><strong className="text-slate-800">Exam Format:</strong> {uni.examFormat}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TIPS */}
        {activeTab === 'tips' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2 mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 bg-emerald-50 border border-emerald-200/60 text-emerald-700 rounded-full">
                <Compass className="w-3.5 h-3.5 text-emerald-600" /> Success Roadmap
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Admission Guidelines 2026–27
              </h2>
              <p className="text-xs text-slate-500 px-2">
                Key strategies to boost your chances in competitive university entrance exams.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm flex gap-3.5 items-start">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">1. Focus on Main HSC Textbooks First</h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1">Master core theories from your official textbooks before moving to extra guides.</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm flex gap-3.5 items-start">
                <div className="p-2.5 bg-teal-50 text-teal-600 rounded-2xl shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">2. Solve Past 10 Years' Question Papers</h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1">Analyze recurring patterns and practice question banks regularly.</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm flex gap-3.5 items-start">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900">3. Practice Timed Mock Tests</h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-1">Negative marking and strict time limits require focus. Build speed and accuracy.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}