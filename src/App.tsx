import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { LandingPage } from './components/LandingPage';
import { StudentTasks } from './components/StudentTasks';
import { StudentCourses } from './components/StudentCourses';
import { StudentSubmissions } from './components/StudentSubmissions';
import { AdminTasks } from './components/AdminTasks';
import { AdminCreateTask } from './components/AdminCreateTask';
import { AdminSubmissions } from './components/AdminSubmissions';
import { ToastNotification } from './components/ToastNotification';
import { MongoSchemaModal } from './components/MongoSchemaModal';
import { X } from 'lucide-react';

function AppContent() {
  const { currentView } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Landing page renders without standard portal sidebar/topbar
  if (currentView === 'landing') {
    return (
      <>
        <LandingPage />
        <ToastNotification />
        <MongoSchemaModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex text-slate-900 font-sans antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" 
            onClick={() => setMobileSidebarOpen(false)} 
          />
          <div className="relative z-10 w-72 bg-white h-full shadow-2xl flex flex-col">
            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopHeader onToggleMobileSidebar={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          {currentView === 'student-tasks' && <StudentTasks />}
          {currentView === 'student-courses' && <StudentCourses />}
          {currentView === 'student-submissions' && <StudentSubmissions />}
          
          {currentView === 'admin-dashboard' && <AdminTasks />}
          {currentView === 'admin-tasks' && <AdminTasks />}
          {currentView === 'admin-create-task' && <AdminCreateTask />}
          {currentView === 'admin-submissions' && <AdminSubmissions />}
        </main>
      </div>

      <ToastNotification />
      <MongoSchemaModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
