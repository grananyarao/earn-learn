import React, { useState } from 'react';
import { Course } from '../types';
import { X, PlayCircle, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';

interface CourseViewerModalProps {
  course: Course | null;
  onClose: () => void;
}

const FormattedReadingContent: React.FC<{ content?: string }> = ({ content }) => {
  if (!content) {
    return (
      <p className="text-sm text-slate-600 leading-relaxed">
        In this lesson, you will learn key concepts, best practices, and practical code implementations.
      </p>
    );
  }

  // Split by code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
      {parts.map((part, idx) => {
        if (part.startsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const firstLine = lines[0].trim();
          const isLangHeader = /^[a-zA-Z0-9_-]+$/.test(firstLine);
          const codeLines = isLangHeader ? lines.slice(1) : lines;
          const lang = isLangHeader ? firstLine : 'code';

          return (
            <div key={idx} className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden shadow-sm my-4 border border-slate-800">
              <div className="bg-slate-800/80 px-4 py-2 text-[11px] font-mono font-semibold text-slate-400 flex items-center justify-between border-b border-slate-700/50">
                <span className="uppercase tracking-wider">{lang}</span>
                <span>Code Snippet</span>
              </div>
              <pre className="p-4 font-mono text-xs overflow-x-auto text-emerald-400 leading-relaxed">
                <code>{codeLines.join('\n')}</code>
              </pre>
            </div>
          );
        }

        const lines = part.split('\n');
        return (
          <div key={idx} className="space-y-2">
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('# ')) {
                return (
                  <h2 key={lIdx} className="text-xl font-extrabold text-slate-900 pt-2 pb-1 border-b border-slate-200">
                    {trimmed.replace('# ', '')}
                  </h2>
                );
              }
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={lIdx} className="text-sm font-bold text-slate-800 pt-3">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('- ')) {
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-2 my-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{trimmed.replace('- ', '')}</span>
                  </div>
                );
              }
              return (
                <p key={lIdx} className="leading-relaxed">
                  {line}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export const CourseViewerModal: React.FC<CourseViewerModalProps> = ({ course, onClose }) => {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  if (!course) return null;

  // Find active lesson or default to first lesson
  const allLessons = course.modules.flatMap(m => m.lessons);
  const activeLessonIndex = allLessons.findIndex(l => l.id === activeLessonId);
  const activeLesson = activeLessonIndex >= 0 ? allLessons[activeLessonIndex] : allLessons[0];

  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex < allLessons.length - 1) {
      setActiveLessonId(allLessons[currentIndex + 1].id);
    }
  };

  const handlePrevLesson = () => {
    const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex > 0) {
      setActiveLessonId(allLessons[currentIndex - 1].id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            {course.badgeTag && (
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-900/40 px-2.5 py-0.5 rounded-full border border-blue-700/50">
                {course.badgeTag}
              </span>
            )}
            <h2 className="text-xl font-bold text-white mt-1">{course.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body split */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Main Player / Content Area */}
          <div className="lg:col-span-8 p-6 overflow-y-auto space-y-6 bg-slate-50">
            {activeLesson ? (
              <div className="space-y-4">
                {/* Video or Reading Content Card */}
                {activeLesson.type === 'video' ? (
                  <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center relative group shadow-lg">
                    <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition cursor-pointer">
                      <PlayCircle className="w-10 h-10" />
                    </div>
                    <p className="text-white font-medium text-sm mt-3">Interactive Video Lecture</p>
                    <p className="text-xs text-slate-400 mt-0.5">{activeLesson.title} • {activeLesson.duration}</p>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                        <BookOpen className="w-4 h-4" />
                        <span>Reading Module</span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{activeLesson.duration} read</span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900">{activeLesson.title}</h3>

                    <FormattedReadingContent content={activeLesson.textBody} />
                  </div>
                )}

                {/* Lesson Action Controls */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevLesson}
                      disabled={allLessons.findIndex(l => l.id === activeLesson.id) === 0}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                    <button
                      onClick={handleNextLesson}
                      disabled={allLessons.findIndex(l => l.id === activeLesson.id) === allLessons.length - 1}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 transition"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">Select a lesson to start learning.</p>
            )}
          </div>

          {/* Right Sidebar: Module & Lesson Checklist */}
          <div className="lg:col-span-4 border-l border-slate-200 p-6 bg-white overflow-y-auto space-y-6">
            <div className="space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">Course Modules</h4>
              {course.modules.map((module) => (
                <div key={module.id} className="space-y-2">
                  <p className="text-xs font-bold text-slate-700">{module.title}</p>
                  <div className="space-y-1">
                    {module.lessons.map((lesson) => {
                      const isSelected = activeLesson?.id === lesson.id;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLessonId(lesson.id)}
                          className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition ${
                            isSelected
                              ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2 overflow-hidden pr-2">
                            {lesson.type === 'reading' ? (
                              <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
                            ) : (
                              <PlayCircle className="w-4 h-4 text-slate-400 shrink-0" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">{lesson.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
