import React from 'react';
import { useApp, AppView } from '../context/AppContext';
import { 
  ClipboardList, 
  GraduationCap, 
  Send, 
  LayoutDashboard, 
  LogOut, 
  Database, 
  User as UserIcon,
  BookOpen
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { role, user, currentView, setCurrentView, logout, setSchemaModalOpen } = useApp();

  const handleNav = (view: AppView) => {
    setCurrentView(view);
  };

  const isStudent = role === 'student';

  return (
    <aside className="w-64 bg-[#e8f1ff] border-r border-[#d3e4fe] flex flex-col justify-between h-screen sticky top-0 shrink-0 z-30 select-none">
      {/* Top Brand & Profile */}
      <div className="p-6 space-y-6">
        {/* Brand */}
        <div 
          onClick={() => setCurrentView('landing')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="text-2xl font-black tracking-tight text-[#0058be]">
            Earn&Learn
          </span>
        </div>

        {/* Role Avatar Badge */}
        <div className="mt-4">
          {isStudent ? (
            <div className="bg-white/80 px-4 py-3 rounded-xl border border-blue-100 shadow-xs">
              <p className="text-sm font-bold text-slate-800 truncate">{user?.name || 'Student!'}</p>
              <p className="text-xs text-blue-600 font-medium truncate">Student Account</p>
            </div>
          ) : (
            <div className="bg-white/80 px-4 py-3 rounded-xl border border-blue-100 shadow-xs">
              <p className="text-sm font-bold text-slate-800 truncate">{user?.name || 'Admin!'}</p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="space-y-1.5 pt-2">
          {isStudent ? (
            <>
              <button
                onClick={() => handleNav('student-tasks')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'student-tasks'
                    ? 'bg-[#1d70e8] text-white shadow-md font-semibold'
                    : 'text-slate-700 hover:bg-blue-100/60'
                }`}
              >
                <ClipboardList className="w-5 h-5" />
                <span>Tasks</span>
              </button>

              <button
                onClick={() => handleNav('student-courses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'student-courses'
                    ? 'bg-[#1d70e8] text-white shadow-md font-semibold'
                    : 'text-slate-700 hover:bg-blue-100/60'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                <span>Courses</span>
              </button>

              <button
                onClick={() => handleNav('student-submissions')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'student-submissions'
                    ? 'bg-[#1d70e8] text-white shadow-md font-semibold'
                    : 'text-slate-700 hover:bg-blue-100/60'
                }`}
              >
                <Send className="w-5 h-5" />
                <span>Submissions</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNav('admin-tasks')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'admin-tasks' || currentView === 'admin-dashboard'
                    ? 'bg-[#1d70e8] text-white shadow-md font-semibold'
                    : 'text-slate-700 hover:bg-blue-100/60'
                }`}
              >
                <ClipboardList className="w-5 h-5" />
                <span>Tasks</span>
              </button>

              <button
                onClick={() => handleNav('admin-submissions')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  currentView === 'admin-submissions'
                    ? 'bg-[#1d70e8] text-white shadow-md font-semibold'
                    : 'text-slate-700 hover:bg-blue-100/60'
                }`}
              >
                <Send className="w-5 h-5" />
                <span>Submissions</span>
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-6 border-t border-blue-200/60 space-y-2">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
