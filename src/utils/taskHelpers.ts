import { Task } from '../types';

export const isTaskDeadlinePassed = (deadline?: string): boolean => {
  if (!deadline) return false;
  
  try {
    // Expected format: YYYY-MM-DD or standard date string
    const parts = deadline.split('-');
    let deadlineDate: Date;
    
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      deadlineDate = new Date(year, month, day, 23, 59, 59, 999);
    } else {
      deadlineDate = new Date(deadline);
      deadlineDate.setHours(23, 59, 59, 999);
    }

    if (isNaN(deadlineDate.getTime())) return false;
    return new Date() > deadlineDate;
  } catch {
    return false;
  }
};

export const isTaskLimitReached = (task: Task): boolean => {
  if (task.maxSubmissions === 'No limit' || typeof task.maxSubmissions !== 'number') {
    return false;
  }
  return task.currentSubmissions >= task.maxSubmissions;
};

export const isTaskClosedOrExpired = (task: Task): boolean => {
  if (task.status === 'closed') return true;
  if (isTaskLimitReached(task)) return true;
  if (isTaskDeadlinePassed(task.deadline)) return true;
  return false;
};
