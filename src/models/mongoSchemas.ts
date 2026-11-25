/**
 * Earn&Learn MongoDB / Mongoose Data Models Schema
 * Ready for Node.js / Express / Mongoose production setup.
 */

export const MONGO_SCHEMA_CODE = `/**
 * Earn&Learn - Mongoose Schemas for MongoDB
 * Place this in /models directory of your Express/Node backend project.
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

// ==========================================
// 1. USER SCHEMA
// ==========================================
const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  points: { type: Number, default: 0, min: 0 },
  avatar: { type: String, default: '' },
  university: { type: String, default: 'University Scholar' },
  bio: { type: String, default: '' },
  enrolledCourseIds: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
}, {
  timestamps: true
});

// Index for email search & user query performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

// ==========================================
// 2. TASK SCHEMA
// ==========================================
const TaskSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Science', 'Engineering', 'Design', 'Writing', 'Mathematics', 'Business Admin', 'Computer Science'],
    required: true 
  },
  points: { type: Number, required: true, min: 1 },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  maxSubmissions: { type: Schema.Types.Mixed, default: 'No limit' }, // Number or 'No limit'
  currentSubmissions: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'draft', 'closed'], default: 'active' },
  deadline: { type: Date },
  attachments: [{
    name: String,
    size: String,
    type: String,
    url: String
  }]
}, {
  timestamps: true
});

TaskSchema.index({ category: 1, status: 1 });
TaskSchema.index({ author: 1 });

// ==========================================
// 3. SUBMISSION SCHEMA
// ==========================================
const SubmissionSchema = new Schema({
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  taskTitle: { type: String, required: true },
  category: { type: String, required: true },
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  studentAvatar: { type: String },
  submittedAt: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['Draft', 'Under Review', 'Graded', 'Rejected'], 
    default: 'Under Review' 
  },
  pointsEarned: { type: Number, default: 0 },
  maxPoints: { type: Number, required: true },
  responseText: { type: String, required: true },
  fileAttachments: [{
    name: String,
    size: String,
    url: String
  }],
  feedback: { type: String, default: '' },
  gradedAt: { type: Date },
  gradedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

SubmissionSchema.index({ student: 1, status: 1 });
SubmissionSchema.index({ task: 1 });

// ==========================================
// 4. COURSE SCHEMA
// ==========================================
const LessonSchema = new Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, enum: ['video', 'reading', 'quiz'], default: 'video' },
  contentUrl: { type: String },
  textBody: { type: String }
});

const CourseModuleSchema = new Schema({
  title: { type: String, required: true },
  lessons: [LessonSchema]
});

const CourseSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  badgeTag: { type: String, default: 'General' },
  pointsCost: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  image: { type: String, required: true },
  modules: [CourseModuleSchema],
  certificateTemplate: { type: String }
}, {
  timestamps: true
});

// ==========================================
// 5. POINT TRANSACTION SCHEMA
// ==========================================
const PointTransactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['earned', 'spent'], required: true },
  description: { type: String, required: true },
  referenceId: { type: Schema.Types.ObjectId }, // Submission ID or Course ID
  referenceType: { type: String, enum: ['Submission', 'Course'] }
}, {
  timestamps: true
});

PointTransactionSchema.index({ user: 1, createdAt: -1 });

module.exports = {
  User: mongoose.model('User', UserSchema),
  Task: mongoose.model('Task', TaskSchema),
  Submission: mongoose.model('Submission', SubmissionSchema),
  Course: mongoose.model('Course', CourseSchema),
  PointTransaction: mongoose.model('PointTransaction', PointTransactionSchema)
};
`;
