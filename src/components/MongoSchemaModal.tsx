import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MONGO_SCHEMA_CODE } from '../models/mongoSchemas';
import { Database, Copy, Check, X, FileText, Code } from 'lucide-react';

export const MongoSchemaModal: React.FC = () => {
  const { schemaModalOpen, setSchemaModalOpen, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!schemaModalOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(MONGO_SCHEMA_CODE);
    setCopied(true);
    showToast('MongoDB Mongoose Schema copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Backend Database Schema</h3>
              <p className="text-xs text-slate-400">Complete backend schema for deployment (User, Task, Submission, Course, PointTransaction)</p>
            </div>
          </div>
          <button 
            onClick={() => setSchemaModalOpen(false)} 
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description & Action */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Code className="w-4 h-4 text-blue-600" />
            <span>Ready for Node.js / Express backend integration</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied Schema!' : 'Copy Complete Schema Code'}
          </button>
        </div>

        {/* Code Container */}
        <div className="p-6 bg-slate-950 overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed flex-1">
          <pre className="whitespace-pre-wrap select-all">{MONGO_SCHEMA_CODE}</pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Export this to <code className="bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">server/models/schema.js</code> when uploading to GitHub.
          </p>
          <button
            onClick={() => setSchemaModalOpen(false)}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-lg transition"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
