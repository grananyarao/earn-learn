import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Course } from '../types';
import { CourseViewerModal } from './CourseViewerModal';
import { Lock, PlayCircle, Star, CheckCircle, Sparkles, BookOpen } from 'lucide-react';

export const StudentCourses: React.FC = () => {
  const { courses, searchQuery, unlockCourse, user } = useApp();
  const [selectedCourseForView, setSelectedCourseForView] = useState<Course | null>(null);

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUnlock = (courseId: string) => {
    unlockCourse(courseId);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Premium Courses</h1>
        <p className="text-sm text-slate-600">
          Invest your hard-earned points into career-accelerating knowledge.
        </p>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div 
            key={course.id} 
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            {/* Card Image Banner */}
            <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-500" 
              />
              
              {course.isPurchased ? (
                /* Purchased Overlay Pill */
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center">
                  <div className="bg-[#00714d] text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Purchased</span>
                  </div>
                </div>
              ) : (
                /* Points Cost Tag */
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-slate-900 shadow-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{course.pointsCost} Pts</span>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900">{course.title}</h3>
                  {course.badgeTag && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                      {course.badgeTag}
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100">
                {course.isPurchased ? (
                  <button
                    onClick={() => setSelectedCourseForView(course)}
                    className="w-full bg-[#00714d] hover:bg-[#005a3e] text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Continue Learning</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleUnlock(course.id)}
                    className="w-full bg-[#0058be] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Unlock Course</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Content Player Modal */}
      <CourseViewerModal 
        course={selectedCourseForView} 
        onClose={() => setSelectedCourseForView(null)} 
      />
    </div>
  );
};
