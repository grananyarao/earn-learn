import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Search, 
  Award, 
  GraduationCap, 
  FilePlus, 
  CheckSquare, 
  Gift, 
  Lock, 
  ArrowRight, 
  Database,
  Mail,
  Shield,
  UserCheck,
  User,
  Eye,
  EyeOff
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { login, setCurrentView, setSchemaModalOpen } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formHighlighted, setFormHighlighted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, email, fullName);
  };

  const handleGetStarted = () => {
    setFormHighlighted(true);
    const formElement = document.getElementById('login-form-card');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      setFormHighlighted(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans">
      {/* Top Bar */}
      <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-[#0058be] tracking-tight">Earn&Learn</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 lg:px-16 py-12 lg:py-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Copy */}
        <div className="lg:col-span-7 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Where Academic Excellence Meets{' '}
            <span className="text-[#0058be]">Rewarding Opportunities</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            A dynamic task-reward ecosystem designed for the modern scholar. Complete institutional challenges, earn points for your contributions, and unlock premium certified courses to accelerate your career.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleGetStarted}
              className="bg-[#0058be] hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Started
            </button>

            <button
              onClick={() => {
                login('student', 'student@university.edu');
              }}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold px-6 py-3.5 rounded-lg transition"
            >
              Demo Student Mode
            </button>

            <button
              onClick={() => {
                login('admin', 'admin@university.edu');
              }}
              className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold px-6 py-3.5 rounded-lg transition"
            >
              Demo Admin Mode
            </button>
          </div>
        </div>

        {/* Right Column: Sign In Card */}
        <div className="lg:col-span-5">
          <div 
            id="login-form-card"
            className={`bg-white rounded-2xl p-8 border border-slate-200 shadow-xl space-y-6 transition-all duration-300 ${
              formHighlighted 
                ? 'ring-4 ring-blue-500 ring-offset-2 scale-[1.02] shadow-2xl animate-pulse border-blue-500' 
                : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
                <p className="text-xs text-slate-500 mt-1">Please enter details to sign in.</p>
              </div>
            </div>

            {/* Role Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 tracking-wide uppercase">I am a...</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition-all ${
                    selectedRole === 'student'
                      ? 'bg-[#0058be] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition-all ${
                    selectedRole === 'admin'
                      ? 'bg-[#0058be] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </button>
              </div>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Full Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-10 py-2.5 text-sm outline-none focus:border-blue-600 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0058be] hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Feature Section 1: Students */}
      <section className="px-6 lg:px-16 py-16 max-w-7xl mx-auto w-full border-t border-slate-200/60">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Empowering Your <span className="text-[#0058be]">Educational Journey</span>
          </h2>
          <p className="text-sm text-slate-600">
            Three simple steps for students to transition from academic challenges to career-defining certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Find Tasks</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Browse a curated marketplace of tasks provided by institutional admins. From peer reviews to research assistance, find tasks that match your skills.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Earn Points</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Complete tasks with high quality to receive institutional verification. Points are automatically credited to your student wallet upon approval.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Unlock Courses</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Redeem your accumulated points to gain full access to premium courses like Python Mastery or Full Stack Development with certification.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Admins */}
      <section className="px-6 lg:px-16 py-16 max-w-7xl mx-auto w-full border-t border-slate-200/60">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Empowering Your <span className="text-[#0058be]">Teaching Impact</span>
          </h2>
          <p className="text-sm text-slate-600">
            Providing institutional administrators with the tools to guide and reward the next generation of talent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FilePlus className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Create Tasks</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Define challenges with clear descriptions and point rewards. Mobilize student talent for institutional projects and research initiatives.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Review Submissions</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Evaluate student work through a streamlined dashboard. Provide constructive feedback to help students grow and maintain high academic standards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Award Points</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Reward excellence and help students unlock their potential. Distribute points that directly contribute to their professional certification journey.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white px-6 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-lg font-black text-[#0058be]">Earn&Learn</span>
            <p>© 2026 Earn&Learn Education. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-blue-600 transition">Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-blue-600 transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
