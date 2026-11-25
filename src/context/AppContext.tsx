import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Task, Submission, SubmissionStatus, Course, PointTransaction } from '../types';
import { isTaskLimitReached, isTaskDeadlinePassed } from '../utils/taskHelpers';
import { 
  initialStudentUser, 
  initialAdminUser, 
  initialTasks, 
  initialCourses, 
  initialSubmissions, 
  initialPointTransactions 
} from '../data/initialData';

export type AppView = 
  | 'landing' 
  | 'student-tasks' 
  | 'student-courses' 
  | 'student-submissions' 
  | 'admin-dashboard' 
  | 'admin-tasks' 
  | 'admin-create-task' 
  | 'admin-submissions'
  | 'mongo-schema';

interface AppContextType {
  user: User | null;
  role: UserRole;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  login: (role: UserRole, email?: string, name?: string) => void;
  logout: () => void;
  
  // Data State
  tasks: Task[];
  courses: Course[];
  submissions: Submission[];
  transactions: PointTransaction[];
  
  // Search & Filter
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;

  // Actions
  applyForTask: (taskId: string, responseText: string, attachments?: { name: string; size: string }[], projectUrl?: string) => boolean;
  createNewTask: (taskData: Omit<Task, 'id' | 'currentSubmissions' | 'createdAt' | 'authorId' | 'authorName'>) => void;
  updateExistingTask: (taskId: string, taskData: Omit<Task, 'id' | 'currentSubmissions' | 'createdAt' | 'authorId' | 'authorName'>, newStatus: 'active' | 'draft') => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
  deleteTask: (taskId: string) => void;
  deleteSubmission: (submissionId: string) => void;
  evaluateSubmission: (submissionId: string, pointsAwarded: number, feedback: string, decision: 'approve' | 'reject' | 'revision' | boolean) => void;
  unlockCourse: (courseId: string) => { success: boolean; message: string };
  toggleLessonCompletion: (courseId: string, lessonId: string) => void;
  
  // UI Toast Notice
  toastNotice: string | null;
  showToast: (msg: string) => void;
  
  // Modal states
  schemaModalOpen: boolean;
  setSchemaModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage or Fallback
  const [role, setRole] = useState<UserRole>(() => {
    return (localStorage.getItem('earn_learn_role') as UserRole) || 'student';
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('earn_learn_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.role === 'student' && (parsed.points === 1250 || !parsed.points)) {
          parsed.points = 110;
        }
        return parsed;
      } catch { /* ignore */ }
    }
    return role === 'student' ? initialStudentUser : initialAdminUser;
  });

  const [currentView, setCurrentView] = useState<AppView>(() => {
    const savedView = localStorage.getItem('earn_learn_view') as AppView;
    return savedView || 'landing';
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('earn_learn_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('earn_learn_courses');
    if (saved) {
      try {
        const parsed: Course[] = JSON.parse(saved);
        return parsed.map(c => {
          const fresh = initialCourses.find(ic => ic.id === c.id || ic.title.toLowerCase() === c.title.toLowerCase());
          const isLockedCourse = c.title.toLowerCase().includes('full stack') || c.title.toLowerCase().includes('dsa') || c.id === 'crs_01' || c.id === 'crs_03';
          
          let mergedModules = c.modules;
          if (fresh) {
            mergedModules = fresh.modules.map(freshMod => ({
              ...freshMod,
              lessons: freshMod.lessons.map(freshLes => {
                const existingLes = c.modules?.flatMap(m => m.lessons).find(l => l.id === freshLes.id);
                return existingLes ? { ...freshLes, completed: existingLes.completed } : freshLes;
              })
            }));
          }

          return {
            ...c,
            description: fresh ? fresh.description : c.description,
            pointsCost: fresh ? fresh.pointsCost : c.pointsCost,
            badgeTag: fresh ? fresh.badgeTag : c.badgeTag,
            isPurchased: isLockedCourse ? false : c.isPurchased,
            modules: mergedModules,
          };
        });
      } catch {
        return initialCourses;
      }
    }
    return initialCourses;
  });

  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const saved = localStorage.getItem('earn_learn_submissions');
    return saved ? JSON.parse(saved) : initialSubmissions;
  });

  const [transactions, setTransactions] = useState<PointTransaction[]>(() => {
    const saved = localStorage.getItem('earn_learn_transactions');
    return saved ? JSON.parse(saved) : initialPointTransactions;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toastNotice, setToastNotice] = useState<string | null>(null);
  const [schemaModalOpen, setSchemaModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    if (user) localStorage.setItem('earn_learn_user', JSON.stringify(user));
    else localStorage.removeItem('earn_learn_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('earn_learn_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('earn_learn_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('earn_learn_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('earn_learn_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('earn_learn_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('earn_learn_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 4000);
  };

  const login = (selectedRole: UserRole, email?: string, name?: string) => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      const studentData = {
        ...initialStudentUser,
        name: name?.trim() || initialStudentUser.name,
        email: email?.trim() || initialStudentUser.email
      };
      setUser(studentData);
      setCurrentView('student-tasks');
      showToast(`Welcome back, ${studentData.name}! Signed in as Student.`);
    } else {
      const adminData = {
        ...initialAdminUser,
        name: name?.trim() || initialAdminUser.name,
        email: email?.trim() || initialAdminUser.email
      };
      setUser(adminData);
      setCurrentView('admin-tasks');
      showToast(`Welcome back, ${adminData.name}! Signed in as Administrator.`);
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentView('landing');
    showToast('You have been logged out.');
  };

  const applyForTask = (
    taskId: string, 
    responseText: string, 
    attachments?: { name: string; size: string }[],
    projectUrl?: string
  ): boolean => {
    if (!user || user.role !== 'student') return false;

    const targetTask = tasks.find(t => t.id === taskId);
    if (!targetTask) return false;

    // Check if task limit reached
    if (isTaskLimitReached(targetTask)) {
      showToast(`Cannot apply: This task has reached its submission limit (${targetTask.currentSubmissions}/${targetTask.maxSubmissions}).`);
      return false;
    }

    // Check if deadline passed
    if (isTaskDeadlinePassed(targetTask.deadline)) {
      showToast(`Cannot apply: The deadline for this task has passed (${targetTask.deadline}).`);
      return false;
    }

    // Check if task is closed by admin
    if (targetTask.status === 'closed') {
      showToast('Cannot apply: This task is currently closed.');
      return false;
    }

    // Check if already submitted
    const existing = submissions.find(s => s.taskId === taskId && s.studentId === user.id);
    if (existing) {
      showToast('You have already submitted an application for this task.');
      return false;
    }

    const newSub: Submission = {
      id: `sub_${Date.now()}`,
      taskId: targetTask.id,
      taskTitle: targetTask.title,
      category: targetTask.category,
      studentId: user.id,
      studentName: user.name,
      studentEmail: user.email,
      studentAvatar: user.avatar,
      submittedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Under Review',
      pointsEarned: 0,
      maxPoints: targetTask.points,
      responseText,
      projectUrl: projectUrl?.trim() || undefined,
      fileAttachments: attachments || []
    };

    setSubmissions(prev => [newSub, ...prev]);

    // Update task currentSubmissions count
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          currentSubmissions: t.currentSubmissions + 1
        };
      }
      return t;
    }));

    showToast(`Task submission sent for "${targetTask.title}"! Under review by administrator.`);
    return true;
  };

  const createNewTask = (taskData: Omit<Task, 'id' | 'currentSubmissions' | 'createdAt' | 'authorId' | 'authorName'>) => {
    if (!user) return;

    const newTask: Task = {
      ...taskData,
      id: `task_${Date.now()}`,
      authorId: user.id,
      authorName: user.name,
      currentSubmissions: 0,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [newTask, ...prev]);

    if (newTask.status === 'draft') {
      const draftSub: Submission = {
        id: `sub_draft_${Date.now()}`,
        taskId: newTask.id,
        taskTitle: newTask.title,
        category: newTask.category || 'General',
        studentId: user.id,
        studentName: `${user.name} (Admin Draft)`,
        studentEmail: user.email,
        submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Draft',
        pointsEarned: 0,
        maxPoints: newTask.points,
        responseText: newTask.description || 'Task draft created by instructor.',
        projectUrl: '',
        feedback: 'Draft task saved in admin queue.'
      };

      setSubmissions(prev => [draftSub, ...prev]);
      showToast(`Draft task "${newTask.title}" saved successfully!`);
      setCurrentView('admin-submissions');
    } else {
      showToast(`Task "${newTask.title}" has been published to the student marketplace!`);
      setCurrentView('admin-dashboard');
    }
  };

  const updateExistingTask = (
    taskId: string,
    taskData: Omit<Task, 'id' | 'currentSubmissions' | 'createdAt' | 'authorId' | 'authorName'>,
    newStatus: 'active' | 'draft'
  ) => {
    if (!user) return;

    setTasks(prev => {
      const exists = prev.some(t => t.id === taskId);
      if (exists) {
        return prev.map(t => {
          if (t.id === taskId) {
            return {
              ...t,
              ...taskData,
              status: newStatus
            };
          }
          return t;
        });
      } else {
        const newTask: Task = {
          ...taskData,
          id: taskId,
          authorId: user.id,
          authorName: user.name,
          currentSubmissions: 0,
          createdAt: new Date().toISOString(),
          status: newStatus
        };
        return [newTask, ...prev];
      }
    });

    if (newStatus === 'active') {
      setSubmissions(prev => prev.filter(s => !(s.taskId === taskId && s.status === 'Draft')));
      showToast(`Task "${taskData.title}" has been published to the student marketplace!`);
      setEditingTask(null);
      setCurrentView('admin-dashboard');
    } else {
      setSubmissions(prev => {
        const existingDraft = prev.find(s => s.taskId === taskId && s.status === 'Draft');
        if (existingDraft) {
          return prev.map(s => {
            if (s.id === existingDraft.id) {
              return {
                ...s,
                taskTitle: taskData.title,
                category: taskData.category || 'General',
                maxPoints: taskData.points,
                responseText: taskData.description || 'Task draft created by instructor.'
              };
            }
            return s;
          });
        } else {
          const newDraftSub: Submission = {
            id: `sub_draft_${Date.now()}`,
            taskId: taskId,
            taskTitle: taskData.title,
            category: taskData.category || 'General',
            studentId: user.id,
            studentName: `${user.name} (Admin Draft)`,
            studentEmail: user.email,
            submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Draft',
            pointsEarned: 0,
            maxPoints: taskData.points,
            responseText: taskData.description || 'Task draft created by instructor.',
            projectUrl: '',
            feedback: 'Draft task saved in admin queue.'
          };
          return [newDraftSub, ...prev];
        }
      });
      showToast(`Draft task "${taskData.title}" updated successfully!`);
      setEditingTask(null);
      setCurrentView('admin-submissions');
    }
  };

  const deleteTask = (taskId: string) => {
    const taskToDelete = tasks.find(t => t.id === taskId);
    setTasks(prev => prev.filter(t => t.id !== taskId));
    setSubmissions(prev => prev.filter(s => s.taskId !== taskId));
    showToast(`Task "${taskToDelete?.title || 'Selected task'}" deleted successfully.`);
  };

  const deleteSubmission = (submissionId: string) => {
    const subToDelete = submissions.find(s => s.id === submissionId);
    if (!subToDelete) return;

    setSubmissions(prev => prev.filter(s => s.id !== submissionId));

    setTasks(prev => prev.map(t => {
      if (t.id === subToDelete.taskId) {
        return {
          ...t,
          currentSubmissions: Math.max(0, t.currentSubmissions - 1)
        };
      }
      return t;
    }));

    showToast(`Submission for "${subToDelete.taskTitle}" deleted successfully.`);
  };

  const evaluateSubmission = (
    submissionId: string, 
    pointsAwarded: number, 
    feedback: string, 
    decision: 'approve' | 'reject' | 'revision' | boolean
  ) => {
    const targetSub = submissions.find(s => s.id === submissionId);
    if (!targetSub) return;

    let newStatus: SubmissionStatus;
    let isApproved = false;

    if (typeof decision === 'string') {
      if (decision === 'approve') {
        newStatus = 'Graded';
        isApproved = true;
      } else if (decision === 'revision') {
        newStatus = 'Revision Requested';
        isApproved = false;
      } else {
        newStatus = 'Rejected';
        isApproved = false;
      }
    } else {
      newStatus = decision ? 'Graded' : 'Rejected';
      isApproved = decision;
    }

    const finalPoints = isApproved ? pointsAwarded : 0;

    // Update submission
    setSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        return {
          ...s,
          status: newStatus,
          pointsEarned: finalPoints,
          feedback,
          gradedAt: new Date().toLocaleDateString()
        };
      }
      return s;
    }));

    // If approved and student is current logged in student or matched student ID, add points
    if (isApproved && finalPoints > 0) {
      if (user && user.id === targetSub.studentId) {
        setUser(prev => prev ? { ...prev, points: prev.points + finalPoints } : null);
      } else {
        // Update stored student points if stored in localStorage
        const storedUserJson = localStorage.getItem('earn_learn_user');
        if (storedUserJson) {
          try {
            const parsed = JSON.parse(storedUserJson);
            if (parsed.id === targetSub.studentId) {
              parsed.points += finalPoints;
              localStorage.setItem('earn_learn_user', JSON.stringify(parsed));
            }
          } catch { /* ignore */ }
        }
      }

      // Record transaction
      const newTx: PointTransaction = {
        id: `tx_${Date.now()}`,
        userId: targetSub.studentId,
        amount: finalPoints,
        type: 'earned',
        description: `Awarded for ${targetSub.taskTitle}`,
        timestamp: new Date().toISOString()
      };
      setTransactions(prev => [newTx, ...prev]);
    }

    showToast(`Submission by ${targetSub.studentName} marked as ${newStatus}${isApproved ? ` (${finalPoints} pts awarded)` : ''}.`);
  };

  const unlockCourse = (courseId: string): { success: boolean; message: string } => {
    if (!user || user.role !== 'student') {
      return { success: false, message: 'Please sign in as a student to unlock courses.' };
    }

    const course = courses.find(c => c.id === courseId);
    if (!course) return { success: false, message: 'Course not found.' };

    if (course.isPurchased) {
      return { success: true, message: 'Course is already unlocked!' };
    }

    if (user.points < course.pointsCost) {
      return { 
        success: false, 
        message: `Insufficient points! You need ${course.pointsCost} pts, but currently have ${user.points} pts. Complete more academic tasks to earn points!` 
      };
    }

    // Deduct points
    const newPoints = user.points - course.pointsCost;
    setUser({ ...user, points: newPoints });

    // Mark course as purchased
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, isPurchased: true } : c));

    // Record transaction
    const newTx: PointTransaction = {
      id: `tx_${Date.now()}`,
      userId: user.id,
      amount: course.pointsCost,
      type: 'spent',
      description: `Unlocked course: ${course.title}`,
      timestamp: new Date().toISOString()
    };
    setTransactions(prev => [newTx, ...prev]);

    showToast(`Congratulations! You unlocked "${course.title}". ${course.pointsCost} points deducted.`);
    return { success: true, message: `Successfully unlocked ${course.title}!` };
  };

  const toggleLessonCompletion = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id !== courseId) return course;

      let totalLessons = 0;
      let completedCount = 0;

      const updatedModules = course.modules.map(module => {
        const updatedLessons = module.lessons.map(lesson => {
          const isTarget = lesson.id === lessonId;
          const isCompleted = isTarget ? !lesson.completed : lesson.completed;
          
          totalLessons += 1;
          if (isCompleted) completedCount += 1;

          return { ...lesson, completed: isCompleted };
        });
        return { ...module, lessons: updatedLessons };
      });

      const newProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

      return {
        ...course,
        modules: updatedModules,
        progress: newProgress
      };
    }));
  };

  return (
    <AppContext.Provider value={{
      user,
      role,
      currentView,
      setCurrentView,
      login,
      logout,
      tasks,
      courses,
      submissions,
      transactions,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      applyForTask,
      createNewTask,
      updateExistingTask,
      editingTask,
      setEditingTask,
      deleteTask,
      deleteSubmission,
      evaluateSubmission,
      unlockCourse,
      toggleLessonCompletion,
      toastNotice,
      showToast,
      schemaModalOpen,
      setSchemaModalOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
