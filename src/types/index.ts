export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  points: number;
  avatar?: string;
  university?: string;
  bio?: string;
}

export type TaskCategory = 
  | 'Science' 
  | 'Engineering' 
  | 'Design' 
  | 'Writing' 
  | 'Mathematics' 
  | 'Business Admin' 
  | 'Computer Science';

export interface TaskAttachment {
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  points: number;
  authorId: string;
  authorName: string;
  maxSubmissions: number | 'No limit';
  currentSubmissions: number;
  status: 'active' | 'draft' | 'closed';
  createdAt: string;
  deadline?: string;
  attachments?: TaskAttachment[];
}

export type SubmissionStatus = 'Draft' | 'Under Review' | 'Graded' | 'Rejected' | 'Revision Requested';

export interface Submission {
  id: string;
  taskId: string;
  taskTitle: string;
  category: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar?: string;
  submittedAt: string;
  status: SubmissionStatus;
  pointsEarned: number;
  maxPoints: number;
  responseText: string;
  projectUrl?: string;
  fileAttachments?: { name: string; size: string; url?: string }[];
  feedback?: string;
  gradedAt?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  completed: boolean;
  contentUrl?: string;
  textBody?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  category: TaskCategory;
  badgeTag: string;
  pointsCost: number;
  description: string;
  image: string;
  isPurchased: boolean;
  progress: number; // 0 to 100
  modules: CourseModule[];
  certificateUrl?: string;
}

export interface PointTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'spent';
  description: string;
  timestamp: string;
}
