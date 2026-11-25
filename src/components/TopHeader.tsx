import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Plus, Star, Menu, Sparkles } from 'lucide-react';

interface TopHeaderProps {
  onToggleMobileSidebar?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onToggleMobileSidebar }) => {
  const { role, user, currentView, setCurrentView, searchQuery, setSearchQuery, setEditingTask } = useApp();

  const isStudent = role === 'student';

  const getSearchPlaceholder = () => {
    switch (currentView) {
      case 'student-tasks':
        return 'Search tasks...';
      case 'student-courses':
        return 'Search courses...';
      case 'student-submissions':
        return 'Search submissions...';
      case 'admin-submissions':
        return 'Search submissions...';
      case 'admin-dashboard':
      case 'admin-tasks':
        return 'Search tasks or students...';
      default:
        return 'Search...';
    }
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {onToggleMobileSidebar && (
          <button 
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {isStudent ? (
          /* Points Pill */
          <div className="flex items-center gap-2 bg-[#d1fadf] border border-[#a6f4c5] text-[#027a48] px-4 py-1.5 rounded-full font-bold text-sm shadow-xs">
            <Star className="w-4 h-4 fill-[#027a48] text-[#027a48]" />
            <span>{user?.points?.toLocaleString() || 0}</span>
            <span className="font-normal text-xs text-[#027a48]/80">Points</span>
          </div>
        ) : (
          /* Admin Search Input */
          <div className="relative w-72 md:w-96 hidden sm:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getSearchPlaceholder()}
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 text-sm pl-10 pr-4 py-2 rounded-full border border-slate-200 outline-none focus:border-blue-500 transition-all"
            />
          </div>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {isStudent ? (
          /* Student Search Input */
          <div className="relative w-56 sm:w-72 md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={getSearchPlaceholder()}
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-800 text-sm pl-10 pr-4 py-2 rounded-full border border-slate-200 outline-none focus:border-blue-500 transition-all"
            />
          </div>
        ) : (
          /* Admin + Create New Task Button */
          <button
            onClick={() => {
              setEditingTask(null);
              setCurrentView('admin-create-task');
            }}
            className="flex items-center gap-2 bg-[#0058be] hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Task</span>
          </button>
        )}
      </div>
    </header>
  );
};
