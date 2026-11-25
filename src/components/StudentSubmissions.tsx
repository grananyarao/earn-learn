import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Submission } from '../types';
import { 
  FileText, 
  Hourglass, 
  Award, 
  Filter, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Eye, 
  X,
  Globe,
  ExternalLink,
  Download,
  Paperclip,
  Trash2
} from 'lucide-react';

export const StudentSubmissions: React.FC = () => {
  const { submissions, searchQuery, user, deleteSubmission } = useApp();
  const [selectedSubForView, setSelectedSubForView] = useState<Submission | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const handleDownloadFile = (sub: Submission, fileName?: string) => {
    const defaultFileName = `${sub.taskTitle.replace(/\s+/g, '_')}_Submission.txt`;
    const docName = fileName || defaultFileName;
    const content = 
`ACADEMIC TASK SUBMISSION RECORD
----------------------------------------
Student Name : ${sub.studentName}
Task Title   : ${sub.taskTitle}
Category     : ${sub.category}
Submitted At : ${sub.submittedAt}
Status       : ${sub.status}
Score        : ${sub.status === 'Graded' ? `${sub.pointsEarned} / ${sub.maxPoints} Points` : `Max ${sub.maxPoints} Points`}

----------------------------------------
SUBMITTED WORK RESPONSE & DESCRIPTION:
----------------------------------------
${sub.responseText}

${sub.projectUrl ? `----------------------------------------\nPROJECT / REPOSITORY URL:\n${sub.projectUrl}\n` : ''}
${sub.feedback ? `----------------------------------------\nINSTRUCTOR FEEDBACK:\n${sub.feedback}\n` : ''}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = docName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter student submissions (excluding draft tasks/submissions)
  const studentSubs = submissions.filter(s => 
    s.status?.toLowerCase() !== 'draft' && 
    (s.studentId === user?.id || s.studentEmail === user?.email)
  );

  const filteredSubs = studentSubs.filter(s => {
    const matchesSearch = 
      s.taskTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'All' || s.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const totalSubCount = studentSubs.length;
  const pendingCount = studentSubs.filter(s => s.status === 'Under Review').length;
  const totalPointsEarned = studentSubs
    .filter(s => s.status === 'Graded')
    .reduce((sum, s) => sum + s.pointsEarned, 0);

  const getStatusPill = (status: string) => {
    switch (status) {
      case 'Graded':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Graded
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Under Review
          </span>
        );
      case 'Draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            Draft
          </span>
        );
      case 'Revision Requested':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Revision Requested
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Submissions</h1>
        <p className="text-sm text-slate-600">
          Track your academic progress and earned rewards.
        </p>
      </div>

      {/* Top Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Submissions</span>
            <div className="text-3xl font-black text-slate-900">{totalSubCount}</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Review</span>
            <div className="text-3xl font-black text-slate-900">{pendingCount}</div>
            <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-amber-500 h-full transition-all duration-300" 
                style={{ width: `${totalSubCount > 0 ? (pendingCount / totalSubCount) * 100 : 0}%` }}
              />
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Hourglass className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Points Earned</span>
            <div className="text-3xl font-black text-slate-900">{totalPointsEarned.toLocaleString()}</div>
            <p className="text-xs text-slate-500">From graded tasks</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Submissions Table Box */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4">
        {/* Table Toolbar Header */}
        <div className="p-6 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
          <h3 className="font-extrabold text-lg text-slate-900">Recent Submissions</h3>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
              {['All', 'Graded', 'Under Review'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    filterStatus === st
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                <th className="py-4 px-6">Task Name</th>
                <th className="py-4 px-6">Submission Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Points</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredSubs.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/80 transition">
                  {/* Task Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{sub.taskTitle}</p>
                      </div>
                    </div>
                  </td>

                  {/* Submission Date */}
                  <td className="py-4 px-6 text-slate-600 font-medium text-xs whitespace-nowrap">
                    {sub.submittedAt}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    {getStatusPill(sub.status)}
                  </td>

                  {/* Points */}
                  <td className="py-4 px-6 font-mono font-extrabold text-blue-600">
                    {sub.status === 'Graded' ? `+${sub.pointsEarned}` : '--'}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedSubForView(sub)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
                      >
                        {sub.status === 'Draft' ? 'Resume' : 'View Details'}
                      </button>
                      <button
                        onClick={() => deleteSubmission(sub.id)}
                        title="Delete Submission"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredSubs.length} of {totalSubCount} submissions</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold">1</button>
            <button className="px-3 py-1 rounded-lg hover:bg-slate-100 text-slate-700">2</button>
            <button className="px-3 py-1 rounded-lg hover:bg-slate-100 text-slate-700">3</button>
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Submission Detail Modal */}
      {selectedSubForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  {selectedSubForView.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedSubForView.taskTitle}</h3>
                <p className="text-xs text-slate-500">Submitted on {selectedSubForView.submittedAt}</p>
              </div>
              <button onClick={() => setSelectedSubForView(null)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              {/* Status & Score Row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Status</span>
                  {getStatusPill(selectedSubForView.status)}
                </div>

                {selectedSubForView.status === 'Graded' && (
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-emerald-800">Score</span>
                    <span className="font-extrabold text-emerald-700 text-sm">+{selectedSubForView.pointsEarned} / {selectedSubForView.maxPoints} Pts</span>
                  </div>
                )}
              </div>

              {/* Submitted Response Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted Work Response & Description</p>
                  <button
                    onClick={() => handleDownloadFile(selectedSubForView)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Download Summary</span>
                  </button>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed max-h-40 overflow-y-auto">
                  {selectedSubForView.responseText}
                </div>
              </div>

              {/* Attached Project / Repository Link */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted Project / Repository Link</p>
                {selectedSubForView.projectUrl ? (
                  <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-900 truncate">{selectedSubForView.projectUrl}</span>
                    </div>
                    <a
                      href={selectedSubForView.projectUrl.startsWith('http') ? selectedSubForView.projectUrl : `https://${selectedSubForView.projectUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shrink-0"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>No project URL attached with this submission</span>
                  </div>
                )}
              </div>

              {/* Submitted File Attachments & Downloads */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted Files & Documents</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSubForView.fileAttachments && selectedSubForView.fileAttachments.length > 0 ? (
                    selectedSubForView.fileAttachments.map((file, i) => (
                      <button
                        key={i}
                        onClick={() => handleDownloadFile(selectedSubForView, file.name)}
                        className="flex items-center gap-2 bg-slate-50 hover:bg-blue-50/80 text-slate-800 hover:text-blue-800 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-300 transition"
                      >
                        <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                        <span>{file.name} ({file.size})</span>
                        <Download className="w-3.5 h-3.5 text-slate-400 ml-1" />
                      </button>
                    ))
                  ) : (
                    <button
                      onClick={() => handleDownloadFile(selectedSubForView, `${selectedSubForView.taskTitle.replace(/\s+/g, '_')}_Submission_Doc.pdf`)}
                      className="flex items-center gap-2 bg-slate-50 hover:bg-blue-50/80 text-slate-800 hover:text-blue-800 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-300 transition"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>{selectedSubForView.taskTitle.replace(/\s+/g, '_')}_Submission_Doc.pdf</span>
                      <Download className="w-3.5 h-3.5 text-slate-400 ml-1" />
                    </button>
                  )}
                </div>
              </div>

              {/* Instructor Feedback */}
              {selectedSubForView.feedback && (
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Instructor Feedback</p>
                  <p className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-xs text-blue-900 leading-relaxed font-medium">
                    "{selectedSubForView.feedback}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownloadFile(selectedSubForView)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Copy</span>
                </button>
                <button
                  onClick={() => {
                    deleteSubmission(selectedSubForView.id);
                    setSelectedSubForView(null);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl transition"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
              <button
                onClick={() => setSelectedSubForView(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
