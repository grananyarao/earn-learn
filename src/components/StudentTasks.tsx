import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Task } from '../types';
import { ApplyTaskModal } from './ApplyTaskModal';
import { isTaskLimitReached, isTaskDeadlinePassed } from '../utils/taskHelpers';
import { Sparkles, ArrowRight, CheckCircle2, Clock, XCircle, Award, Trash2, AlertTriangle, Users, AlertCircle } from 'lucide-react';

export const StudentTasks: React.FC = () => {
  const { tasks, submissions, searchQuery, user, deleteTask } = useApp();
  const [selectedTaskForApply, setSelectedTaskForApply] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    // Do not display draft tasks created by admin to students
    if (task.status?.toLowerCase() === 'draft') return false;

    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getStudentSubmission = (taskId: string) => {
    return submissions.find(s => s.taskId === taskId && s.studentId === user?.id);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tasks</h1>
          <p className="text-sm text-slate-500 mt-1">
            Complete institutional challenges to earn points toward certified courses.
          </p>
        </div>
      </div>

      {/* Tasks Cards Grid */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <p className="text-lg font-bold text-slate-700">No tasks found matching your search.</p>
          <p className="text-xs text-slate-500">Try searching for another key term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => {
            const studentSub = getStudentSubmission(task.id);
            const limitReached = isTaskLimitReached(task);
            const deadlinePassed = isTaskDeadlinePassed(task.deadline);
            const isClosed = task.status === 'closed' || limitReached || deadlinePassed;

            return (
              <div 
                key={task.id} 
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-6"
              >
                {/* Card Top */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {limitReached || deadlinePassed || task.status === 'closed' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-200 font-bold rounded-xl text-xs shadow-2xs">
                        <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                        <span>TASK EXPIRED</span>
                      </span>
                    ) : task.deadline ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 font-bold rounded-xl text-xs shadow-2xs">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Deadline: {task.deadline}</span>
                      </span>
                    ) : (
                      <div />
                    )}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-extrabold text-blue-600 font-mono bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                        +{task.points} pts
                      </span>
                      <button
                        onClick={() => setTaskToDelete(task.id)}
                        title="Delete Task"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {task.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                </div>

                {/* Card Bottom / Action */}
                <div className="pt-2">
                  {studentSub ? (
                    studentSub.status === 'Graded' ? (
                      <button
                        disabled
                        className="w-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-default shadow-2xs"
                      >
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-700 shrink-0" />
                        <span>Graded (+{studentSub.pointsEarned} Pts Earned)</span>
                      </button>
                    ) : studentSub.status === 'Rejected' ? (
                      <button
                        disabled
                        className="w-full bg-red-50 border border-red-200 text-red-800 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-default"
                      >
                        <XCircle className="w-4.5 h-4.5 text-red-600 shrink-0" />
                        <span>Evaluated: Rejected</span>
                      </button>
                    ) : studentSub.status === 'Revision Requested' ? (
                      <button
                        disabled
                        className="w-full bg-amber-50 border border-amber-200 text-amber-800 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-default"
                      >
                        <Clock className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                        <span>Revision Requested</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-amber-50 border border-amber-200 text-amber-800 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-default"
                      >
                        <Clock className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                        <span>Applied (Under Review)</span>
                      </button>
                    )
                  ) : limitReached || deadlinePassed || task.status === 'closed' ? (
                    <button
                      disabled
                      className="w-full bg-slate-100 border border-slate-300 text-slate-500 font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      <XCircle className="w-4.5 h-4.5 text-slate-400 shrink-0" />
                      <span>TASK EXPIRED</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedTaskForApply(task)}
                      className="w-full bg-[#dbe8ff] hover:bg-[#c2dbff] text-[#004395] font-bold py-3 px-4 rounded-xl text-sm transition shadow-xs flex items-center justify-center gap-2"
                    >
                      <span>Start Task</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <ApplyTaskModal 
        task={selectedTaskForApply} 
        onClose={() => setSelectedTaskForApply(null)} 
      />

      {/* Delete Task Confirmation Modal */}
      {taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-slate-900">Delete Task?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Are you sure you want to delete this task? Deleting this task will remove it from both the Tasks list and Submissions history across student and admin dashboards.
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
