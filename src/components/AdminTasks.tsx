import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Users, Sparkles, FilePlus, Send, Award, ArrowRight, Trash2, AlertTriangle } from 'lucide-react';

export const AdminTasks: React.FC = () => {
  const { tasks, setCurrentView, searchQuery, deleteTask } = useApp();
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const activeTasks = tasks.filter(t => t.status === 'active');
  const filteredActiveTasks = activeTasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tasks</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your academic tasks and review incoming student submissions.
          </p>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black text-slate-900">Tasks</h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
            {activeTasks.length} Tasks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredActiveTasks.map((task) => (
            <div 
              key={task.id} 
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">{task.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400 font-mono">{task.points} Points</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTaskToDelete(task.id)}
                    title="Delete Task"
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2">{task.description}</p>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>
                    Submissions: {task.maxSubmissions === 'No limit' ? task.currentSubmissions : `${task.currentSubmissions}/${task.maxSubmissions}`}
                  </span>
                </div>

                <button
                  onClick={() => setCurrentView('admin-submissions')}
                  className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 hover:underline"
                >
                  <span>View Submissions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Onboarding Workflow Guide */}
      <div className="border-2 border-dashed border-slate-300 rounded-3xl p-8 bg-slate-50/50 space-y-8 text-center">
        <div className="max-w-md mx-auto space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">Task Management Workflow</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Create tasks, publish them for students, and evaluate incoming student submissions to award points.
          </p>
        </div>

        {/* 3 Step Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FilePlus className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Step 1: Create</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Set up a task with clear instructions and point values.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Step 2: Publish</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              The task becomes available on the student marketplace.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Step 3: Grade</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Review submissions and award points to students.
            </p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900">Delete Task Permanently?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to delete this task? This action will remove the task and all associated student submissions from both Admin and Student dashboards.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setTaskToDelete(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTask(taskToDelete);
                  setTaskToDelete(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
