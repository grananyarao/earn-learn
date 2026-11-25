import React, { useState } from 'react';
import { Task } from '../types';
import { useApp } from '../context/AppContext';
import { isTaskLimitReached, isTaskDeadlinePassed } from '../utils/taskHelpers';
import { X, Send, Paperclip, UploadCloud, AlertCircle, Link, Globe, Users, Clock } from 'lucide-react';

interface ApplyTaskModalProps {
  task: Task | null;
  onClose: () => void;
}

export const ApplyTaskModal: React.FC<ApplyTaskModalProps> = ({ task, onClose }) => {
  const { applyForTask } = useApp();
  const [responseText, setResponseText] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string }[]>([]);
  const [errorMsg, setErrorMsg] = useState('');

  if (!task) return null;

  const limitReached = isTaskLimitReached(task);
  const deadlinePassed = isTaskDeadlinePassed(task.deadline);
  const isClosed = task.status === 'closed' || limitReached || deadlinePassed;

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setAttachedFiles(prev => [...prev, { name: file.name, size: sizeMb }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (responseText.trim().length < 20) {
      setErrorMsg('Please enter a detailed response (at least 20 characters).');
      return;
    }

    const success = applyForTask(task.id, responseText, attachedFiles, projectUrl);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              +{task.points} Pts
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-2">{task.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Closed Warning Banner if task is no longer taking responses */}
          {limitReached && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-start gap-3 text-rose-800 text-xs">
              <Users className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Submission Limit Reached</p>
                <p className="mt-0.5 text-rose-700">
                  This task has reached its maximum respondent limit ({task.currentSubmissions}/{task.maxSubmissions}). Further student submissions are automatically locked.
                </p>
              </div>
            </div>
          )}

          {deadlinePassed && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3 text-red-800 text-xs">
              <Clock className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Deadline Date Passed</p>
                <p className="mt-0.5 text-red-700">
                  The deadline date for this task ({task.deadline}) has passed. Submissions for this task are automatically closed.
                </p>
              </div>
            </div>
          )}

          {/* Task Description */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 space-y-2">
            <p className="font-semibold text-slate-900">Task Objective & Instructions:</p>
            <p className="leading-relaxed">{task.description}</p>
          </div>

          {/* Response Textarea */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">
              Your Submission / Solution Response <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              value={responseText}
              onChange={(e) => {
                setResponseText(e.target.value);
                setErrorMsg('');
              }}
              required
              placeholder="Provide your solution details, research notes, code snippets, or rationale here..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:bg-white transition"
            />
            {errorMsg && (
              <p className="text-xs text-red-600 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMsg}</span>
              </p>
            )}
          </div>

          {/* Project / Repository Link */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-slate-800">
              Project / GitHub / Website Link <span className="text-xs text-slate-500 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://github.com/username/project or https://myproject.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-600 focus:bg-white transition"
              />
            </div>
            <p className="text-[11px] text-slate-500">Provide a GitHub repository link, Figma design URL, or live demo link for instructor evaluation.</p>
          </div>

          {/* Attachment Upload Zone */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">Resource Attachments (Optional)</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition relative cursor-pointer">
              <input 
                type="file" 
                onChange={handleSimulatedUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-8 h-8 text-blue-500 mx-auto mb-1" />
              <p className="text-xs font-semibold text-slate-700">Click or drop files to upload solution attachments</p>
              <p className="text-[11px] text-slate-400">PDF, DOCX, ZIP, PY up to 25MB</p>
            </div>

            {attachedFiles.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {attachedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-blue-50/70 border border-blue-100 px-3 py-1.5 rounded-lg text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-medium truncate">{file.name}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[10px]">{file.size}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isClosed}
              className={`px-6 py-2.5 text-sm font-bold rounded-xl flex items-center gap-2 transition ${
                isClosed
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-[#0058be] hover:bg-blue-700 text-white shadow-md'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>{isClosed ? 'TASK EXPIRED' : 'Submit Application'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
