import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toastNotice } = useApp();

  if (!toastNotice) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white px-5 py-4 rounded-xl shadow-2xl border border-slate-700 flex items-center justify-between gap-4 animate-bounce-short">
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-sm font-medium leading-snug">{toastNotice}</p>
      </div>
    </div>
  );
};
