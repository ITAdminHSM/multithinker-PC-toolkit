import React, { useState } from 'react';
import { Header } from './components/Header';
import { TerminalSimulator } from './components/TerminalSimulator';
import { FileViewer } from './components/FileViewer';
import { InterviewPrep } from './components/InterviewPrep';
import { CandidateProfile } from './components/CandidateProfile';
import { TOOLKIT_FILES, DEVELOPER_INFO } from './data/filesData';
import type { ToolkitFile } from './types';
import { Check, Download, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'files' | 'interview' | 'candidate'>('terminal');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const triggerDownload = (filename: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadToast(`Saved "${filename}" to your computer!`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const handleDownloadMainBat = () => {
    const mainScript = TOOLKIT_FILES.find(f => f.id === 'mupt_bat');
    if (mainScript) {
      triggerDownload(mainScript.name, mainScript.content);
    }
  };

  const handleDownloadFile = (file: ToolkitFile) => {
    triggerDownload(file.name, file.content);
  };

  const handleDownloadAll = () => {
    TOOLKIT_FILES.forEach((f, idx) => {
      setTimeout(() => {
        triggerDownload(f.name, f.content);
      }, idx * 250);
    });
    setDownloadToast(`Initiated download of all 6 deliverables!`);
    setTimeout(() => setDownloadToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-900 selection:text-white">
      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onDownloadScript={handleDownloadMainBat} 
      />

      {/* Toast Notification */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-700/80 text-emerald-200 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Check className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{downloadToast}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'terminal' && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <span>MultiThinker Ultimate PC Toolkit (MUPT)</span>
                <span className="text-xs font-mono font-normal text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-2 py-0.5 rounded">
                  Live Terminal Simulation
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Experience the authentic Windows Command Prompt batch interface, complete with ANSI color virtualization, modular subroutines, interview demo mode, and non-destructive invariant checks.
              </p>
            </div>
            <TerminalSimulator />
          </div>
        )}

        {activeTab === 'files' && (
          <FileViewer 
            onDownloadFile={handleDownloadFile} 
            onDownloadAll={handleDownloadAll} 
          />
        )}

        {activeTab === 'interview' && (
          <InterviewPrep />
        )}

        {activeTab === 'candidate' && (
          <CandidateProfile />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-semibold text-slate-400">
              {DEVELOPER_INFO.brand} Ultimate PC Toolkit ({DEVELOPER_INFO.version})
            </span>
            <span className="hidden sm:inline">·</span>
            <span>
              Engineered by <strong className="text-slate-300">{DEVELOPER_INFO.name}</strong>, {DEVELOPER_INFO.title} at {DEVELOPER_INFO.org}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a 
              href={`mailto:${DEVELOPER_INFO.email}`}
              className="hover:text-cyan-400 transition-colors"
            >
              {DEVELOPER_INFO.email}
            </a>
            <span>·</span>
            <a 
              href={`https://${DEVELOPER_INFO.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
