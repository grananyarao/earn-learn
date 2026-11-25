import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Submission, Task } from '../types';
import { EvaluateSubmissionModal } from './EvaluateSubmissionModal';
import { Hourglass, CheckCircle2, ChevronLeft, ChevronRight, User, Trash2, Edit3 } from 'lucide-react';

export const AdminSubmissions: React.FC = () => {
  const { submissions, tasks, user, searchQuery, deleteSubmission, setEditingTask, setCurrentView } = useApp();
  const [selectedSubForEval, setSelectedSubForEval] = useState<Submission | null>(null);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Graded' | 'Draft'>('All');

  const pendingCount = submissions.filter(s => s.status !== 'Graded' && s.status !== 'Draft').length;
  const completedCount = submissions.filter(s => s.status === 'Graded').length;
  const draftCount = submissions.filter(s => s.status === 'Draft').length;

  const filteredSubs = submissions.filter(s => {
    const matchesSearch = 
      s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.taskTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === 'All' ? true :
      statusFilter === 'Graded' ? s.status === 'Graded' :
      statusFilter === 'Draft' ? s.status === 'Draft' :
      (s.status !== 'Graded' && s.status !== 'Draft'); // Pending

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Submissions</h1>
        <p className="text-sm text-slate-500">
          Review and evaluate pending tasks from your active student cohorts.
        </p>
      </div>

      {/* Top Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
        <div 
          onClick={() => setStatusFilter('Pending')}
          className={`bg-white rounded-2xl p-6 border cursor-pointer transition shadow-xs ${
            statusFilter === 'Pending' ? 'ring-2 ring-blue-600 border-blue-600' : 'border-slate-200 hover:border-blue-300'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Reviews</span>
          <div className="text-4xl font-black text-blue-600">{pendingCount}</div>
        </div>

        <div 
          onClick={() => setStatusFilter('Graded')}
          className={`bg-white rounded-2xl p-6 border cursor-pointer transition shadow-xs ${
            statusFilter === 'Graded' ? 'ring-2 ring-emerald-600 border-emerald-600' : 'border-slate-200 hover:border-emerald-300'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Completed (Graded)</span>
          <div className="text-4xl font-black text-emerald-600">{completedCount}</div>
        </div>

        <div 
          onClick={() => setStatusFilter('Draft')}
          className={`bg-white rounded-2xl p-6 border cursor-pointer transition shadow-xs ${
            statusFilter === 'Draft' ? 'ring-2 ring-slate-600 border-slate-600' : 'border-slate-200 hover:border-slate-400'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Drafts</span>
          <div className="text-4xl font-black text-slate-700">{draftCount}</div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2 shrink-0">Filter Status:</span>
        {(['All', 'Pending', 'Graded', 'Draft'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              statusFilter === status
                ? 'bg-[#0058be] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {status}
            {status === 'Pending' && ` (${pendingCount})`}
            {status === 'Graded' && ` (${completedCount})`}
            {status === 'Draft' && ` (${draftCount})`}
            {status === 'All' && ` (${submissions.length})`}
          </button>
        ))}
      </div>

      {/* Submissions Evaluation Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          {filteredSubs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <p className="font-bold text-base text-slate-700">No submissions found.</p>
              <p className="text-xs">Try selecting a different status filter or clearing search terms.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                  <th className="py-4 px-6">Student Name</th>
                  <th className="py-4 px-6">Task Title</th>
                  <th className="py-4 px-6">Date Submitted</th>
                  <th className="py-4 px-6">Awarded / Max Points</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredSubs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition">
                    {/* Student Name */}
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-900">{sub.studentName}</span>
                    </td>

                    {/* Task Title */}
                    <td className="py-4 px-6 font-semibold text-slate-800">
                      {sub.taskTitle}
                    </td>

                    {/* Date Submitted */}
                    <td className="py-4 px-6 text-slate-500 text-xs whitespace-nowrap">
                      {sub.submittedAt}
                    </td>

                    {/* Awarded / Max Points */}
                    <td className="py-4 px-6 font-mono font-bold text-slate-800">
                      {sub.status === 'Graded' ? (
                        <span className="text-emerald-700 font-extrabold">{sub.pointsEarned} / {sub.maxPoints}</span>
                      ) : (
                        <span className="text-slate-600">{0} / {sub.maxPoints}</span>
                      )}
                    </td>

                    {/* Status Pill */}
                    <td className="py-4 px-6">
                      {sub.status === 'Graded' ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          Graded
                        </span>
                      ) : sub.status === 'Draft' ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          Draft
                        </span>
                      ) : sub.status === 'Rejected' ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
                          Rejected
                        </span>
                      ) : sub.status === 'Revision Requested' ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                          Revision Requested
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                          Pending Review
                        </span>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {sub.status === 'Draft' ? (
                          <button
                            onClick={() => {
                              let targetTask = tasks.find(t => t.id === sub.taskId);
                              if (!targetTask) {
                                targetTask = {
                                  id: sub.taskId || `task_${Date.now()}`,
                                  title: sub.taskTitle,
                                  description: sub.responseText,
                                  category: (sub.category as any) || 'General',
                                  points: sub.maxPoints,
                                  authorId: user?.id || 'admin',
                                  authorName: user?.name || 'Instructor',
                                  maxSubmissions: 'No limit',
                                  currentSubmissions: 0,
                                  status: 'draft',
                                  createdAt: new Date().toISOString()
                                };
                              }
                              setEditingTask(targetTask);
                              setCurrentView('admin-create-task');
                            }}
                            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center gap-1.5"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                        ) : sub.status === 'Graded' || sub.status === 'Rejected' || sub.status === 'Revision Requested' ? (
                          <button
                            onClick={() => setSelectedSubForEval(sub)}
                            className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-lg transition"
                          >
                            View
                          </button>
                        ) : (
                          <button
                            onClick={() => setSelectedSubForEval(sub)}
                            className="px-4 py-1.5 bg-[#0058be] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-xs transition"
                          >
                            Evaluate
                          </button>
                        )}
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
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredSubs.length} of {submissions.length} submissions</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Evaluate Modal */}
      <EvaluateSubmissionModal 
        submission={selectedSubForEval} 
        onClose={() => setSelectedSubForEval(null)} 
      />
    </div>
  );
};
