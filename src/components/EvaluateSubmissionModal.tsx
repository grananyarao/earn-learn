import React, { useState } from 'react';
import { Submission } from '../types';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, XCircle, Award, MessageSquare, FileText, User, Download, Paperclip, ExternalLink, Globe, RotateCcw } from 'lucide-react';

interface EvaluateSubmissionModalProps {
  submission: Submission | null;
  onClose: () => void;
}

export const EvaluateSubmissionModal: React.FC<EvaluateSubmissionModalProps> = ({ submission, onClose }) => {
  const { evaluateSubmission } = useApp();
  const [pointsAwarded, setPointsAwarded] = useState<number>(submission?.maxPoints || 100);
  const [feedback, setFeedback] = useState('Excellent execution! Thorough research and clear conclusions.');

  if (!submission) return null;

  const isGraded = submission.status === 'Graded' || submission.status === 'Rejected' || submission.status === 'Revision Requested';

  const handleGrade = (decision: 'approve' | 'reject' | 'revision') => {
    evaluateSubmission(submission.id, pointsAwarded, feedback, decision);
    onClose();
  };

  const handleDownloadFile = (fileName?: string, fileContentText?: string) => {
    const defaultFileName = `${submission.studentName.replace(/\s+/g, '_')}_${submission.taskTitle.replace(/\s+/g, '_')}_Submission.txt`;
    const docName = fileName || defaultFileName;
    const content = fileContentText || 
`ACADEMIC TASK SUBMISSION DOCUMENT
----------------------------------------
Student Name : ${submission.studentName}
Student Email: ${submission.studentEmail}
Task Title   : ${submission.taskTitle}
Category     : ${submission.category}
Submitted At : ${submission.submittedAt}
Status       : ${submission.status}
Score        : ${submission.status === 'Graded' ? `${submission.pointsEarned} / ${submission.maxPoints} Points` : `Max ${submission.maxPoints} Points`}

----------------------------------------
SUBMITTED WORK RESPONSE:
----------------------------------------
${submission.responseText}

${submission.feedback ? `----------------------------------------\nINSTRUCTOR FEEDBACK:\n${submission.feedback}\n` : ''}`;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              {submission.studentName.charAt(0)}
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">{submission.studentName}</h3>
              <p className="text-xs text-slate-500">{submission.taskTitle} • Submitted {submission.submittedAt}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Response */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Submitted Work Response</label>
            
            <button
              onClick={() => handleDownloadFile()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Download Submission Document</span>
            </button>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-800 leading-relaxed max-h-48 overflow-y-auto">
            {submission.responseText}
          </div>

          {/* Submitted Project / Repository Link */}
          {submission.projectUrl ? (
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Submitted Project / Repository Link</label>
              <div className="flex items-center justify-between bg-blue-50/70 border border-blue-200 p-3 rounded-xl">
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{submission.projectUrl}</p>
                    <p className="text-[10px] text-blue-700 font-medium">Click to open repository or live preview URL</p>
                  </div>
                </div>
                <a
                  href={submission.projectUrl.startsWith('http') ? submission.projectUrl : `https://${submission.projectUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0058be] hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shrink-0 shadow-xs"
                >
                  <span>Open Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Submitted Project / Repository Link</label>
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>No project URL attached with this submission</span>
                </div>
              </div>
            </div>
          )}

          {/* Attachments Section */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Submitted File Attachments</label>
            <div className="flex flex-wrap gap-2">
              {submission.fileAttachments && submission.fileAttachments.length > 0 ? (
                submission.fileAttachments.map((file, i) => (
                  <button
                    key={i}
                    onClick={() => handleDownloadFile(file.name)}
                    className="flex items-center gap-2 bg-slate-50 hover:bg-blue-50/80 text-slate-800 hover:text-blue-800 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-300 transition"
                  >
                    <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                    <span>{file.name} ({file.size})</span>
                    <Download className="w-3.5 h-3.5 text-slate-400 ml-1" />
                  </button>
                ))
              ) : (
                <button
                  onClick={() => handleDownloadFile(`${submission.studentName.replace(/\s+/g, '_')}_Submission.pdf`)}
                  className="flex items-center gap-2 bg-slate-50 hover:bg-blue-50/80 text-slate-800 hover:text-blue-800 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-300 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>{submission.studentName.replace(/\s+/g, '_')}_Submission_Document.pdf</span>
                  <Download className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Evaluation Details / Controls */}
        {isGraded ? (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Status & Score</label>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  submission.status === 'Graded'
                    ? 'bg-emerald-100 text-emerald-800'
                    : submission.status === 'Revision Requested'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {submission.status}
                </span>
                {submission.status === 'Graded' && (
                  <span className="text-sm font-extrabold font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                    {submission.pointsEarned} / {submission.maxPoints} Points Awarded
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Instructor Feedback</label>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 leading-relaxed">
                {submission.feedback || 'No feedback provided.'}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Award Points (Max: {submission.maxPoints} Pts)
              </label>
              <input
                type="number"
                value={pointsAwarded}
                onChange={(e) => setPointsAwarded(Number(e.target.value))}
                max={submission.maxPoints}
                min={0}
                className="w-36 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold font-mono outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Instructor Feedback</label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide constructive feedback for the student..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-blue-600 focus:bg-white"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          {isGraded ? (
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              Close
            </button>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleGrade('approve')}
                className="px-6 py-2.5 bg-[#0058be] hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition"
              >
                <Award className="w-4 h-4" />
                <span>Award Reward ({pointsAwarded} Pts)</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
