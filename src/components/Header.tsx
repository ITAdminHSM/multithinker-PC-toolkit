import React from 'react';
import { Terminal, Download, ShieldCheck } from 'lucide-react';
import { DEVELOPER_INFO } from '../data/filesData';

interface HeaderProps {
  activeTab: 'terminal' | 'files' | 'interview' | 'candidate';
  setActiveTab: (tab: 'terminal' | 'files' | 'interview' | 'candidate') => void;
  onDownloadScript: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onDownloadScript }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800 px-6 py-3.5 flex items-center justify-between gap-8">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-lg bg-blue-900/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
          <Terminal className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <button 
            onClick={() => setActiveTab('terminal')}
            className="text-left font-bold text-base tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            MultiThinker MUPT
            <span className="text-xs font-normal text-cyan-400/80 font-mono">v2.5.0</span>
          </button>
        </div>
      </div>

      {/* Zone 2: 4-5 clean single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <button
          onClick={() => setActiveTab('terminal')}
          className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'terminal' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Terminal Simulator
        </button>
        <button
          onClick={() => setActiveTab('files')}
          className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'files' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Toolkit Files & Scripts
        </button>
        <button
          onClick={() => setActiveTab('interview')}
          className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'interview' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Interview Talking Points
        </button>
        <button
          onClick={() => setActiveTab('candidate')}
          className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'candidate' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Candidate Profile
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onDownloadScript}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download .BAT Toolkit</span>
        </button>
      </div>
    </header>
  );
};
