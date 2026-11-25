import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Rocket, Save, UploadCloud, ChevronRight, Paperclip, AlertCircle } from 'lucide-react';

export const AdminCreateTask: React.FC = () => {
  const { createNewTask, updateExistingTask, editingTask, setEditingTask, setCurrentView } = useApp();

  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [points, setPoints] = useState<number | string>(editingTask?.points ?? '');
  const [submissionLimit, setSubmissionLimit] = useState<string>(
    editingTask ? (editingTask.maxSubmissions === 'No limit' ? 'No limit' : String(editingTask.maxSubmissions)) : ''
  );
  const [deadline, setDeadline] = useState(editingTask?.deadline || '');
  const [attachments, setAttachments] = useState<{ name: string; size: string; type: string }[]>(
    editingTask?.attachments || []
  );
  const [errorMsg, setErrorMsg] = useState('');

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setAttachments(prev => [...prev, { name: file.name, size: sizeMb, type: file.type }]);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setErrorMsg('Please enter a valid task title and description.');
      return;
    }

    const limitVal = submissionLimit.toLowerCase() === 'no limit' || submissionLimit === '' 
      ? 'No limit' 
      : parseInt(submissionLimit) || 5;

    const taskPayload = {
      title,
      description,
      category: (editingTask?.category as any) || 'General',
      points: Number(points) || 100,
      maxSubmissions: limitVal,
      status: 'active' as const,
      deadline,
      attachments
    };

    if (editingTask) {
      updateExistingTask(editingTask.id, taskPayload, 'active');
    } else {
      createNewTask(taskPayload);
    }
  };

  const handleSaveDraft = () => {
    const limitVal = submissionLimit.toLowerCase() === 'no limit' || submissionLimit === '' 
      ? 'No limit' 
      : parseInt(submissionLimit) || 5;

    const taskPayload = {
      title: title || 'Draft Task',
      description,
      category: (editingTask?.category as any) || 'General',
      points: Number(points) || 100,
      maxSubmissions: limitVal,
      status: 'draft' as const,
      deadline,
      attachments
    };

    if (editingTask) {
      updateExistingTask(editingTask.id, taskPayload, 'draft');
    } else {
      createNewTask(taskPayload);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button onClick={() => { setEditingTask(null); setCurrentView('admin-dashboard'); }} className="hover:text-blue-600">Dashboard</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => { setEditingTask(null); setCurrentView('admin-tasks'); }} className="hover:text-blue-600">Tasks</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 font-bold">{editingTask ? 'Edit Draft' : 'New Task'}</span>
      </nav>

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {editingTask ? 'Edit Draft Task' : 'Publish a New Task'}
        </h1>
        <p className="text-sm text-slate-500">
          {editingTask ? 'Review and update your saved task draft before publishing.' : 'Fill in the details below to launch a new academic challenge for your students.'}
        </p>
      </div>

      {/* Form Grid */}
      <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Details Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Task Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Task Title"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Point Value</label>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value === '' ? '' : Number(e.target.value))}
                required
                min={1}
                placeholder="Point Value"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:bg-white transition font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Detailed Description</label>
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Detailed Description"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm outline-none focus:border-blue-600 focus:bg-white transition leading-relaxed"
              />
            </div>
          </div>

          {/* Submission Controls Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Submission Controls</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Submission Limit (Users)</label>
                <input
                  type="text"
                  value={submissionLimit}
                  onChange={(e) => setSubmissionLimit(e.target.value)}
                  placeholder="5 or No limit"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Deadline Date</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-600 focus:bg-white transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Action Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Resource Attachments Upload Zone */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-blue-600" />
              <span>Resource Attachments</span>
            </h4>

            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 transition relative cursor-pointer">
              <input 
                type="file" 
                onChange={handleSimulatedFileUpload} 
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
              <UploadCloud className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-800">Drop files here or click to upload</p>
              <p className="text-[11px] text-slate-400 mt-1">PDF, DOCX, ZIP up to 50MB</p>
            </div>

            {attachments.length > 0 && (
              <div className="space-y-2 pt-2">
                {attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                    <span className="font-medium text-slate-800 truncate">{file.name}</span>
                    <span className="text-slate-400 font-mono text-[10px]">{file.size}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <button
              type="submit"
              className="w-full bg-[#0058be] hover:bg-blue-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" />
              <span>Publish Task</span>
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="w-full bg-white hover:bg-slate-50 text-blue-700 font-bold py-3 px-4 rounded-xl border border-blue-600 transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save as Draft</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
