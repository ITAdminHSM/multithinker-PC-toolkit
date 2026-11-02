import React, { useState } from 'react';
import { 
  FileCode, 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Search, 
  Terminal, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2 
} from 'lucide-react';
import { TOOLKIT_FILES } from '../data/filesData';
import type { ToolkitFile } from '../types';

interface FileViewerProps {
  onDownloadFile: (file: ToolkitFile) => void;
  onDownloadAll: () => void;
}

export const FileViewer: React.FC<FileViewerProps> = ({ onDownloadFile, onDownloadAll }) => {
  const [selectedFileId, setSelectedFileId] = useState<string>('mupt_bat');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedFile = TOOLKIT_FILES.find(f => f.id === selectedFileId) || TOOLKIT_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = selectedFile.content.split('\n');
  const filteredIndices = searchQuery.trim() 
    ? lines.map((l, i) => l.toLowerCase().includes(searchQuery.toLowerCase()) ? i : -1).filter(i => i !== -1)
    : [];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top Banner with File Count and Global Download */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-cyan-400" />
            Toolkit File & Documentation Repository
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            6 complete deliverables engineered for Habib Sugar Mills IT portfolio, field deployment, and technical interview showcase.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onDownloadFile(selectedFile)}
            className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download {selectedFile.name}</span>
          </button>
          <button
            onClick={onDownloadAll}
            className="px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-slate-400" />
            <span>Download All 6 Files</span>
          </button>
        </div>
      </div>

      {/* Main Grid: File Navigator (Left) + Code Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: File Selector Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          {TOOLKIT_FILES.map(file => {
            const isSelected = file.id === selectedFileId;
            return (
              <button
                key={file.id}
                onClick={() => setSelectedFileId(file.id)}
                className={`text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-blue-950/40 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {file.extension === 'bat' ? (
                      <Terminal className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    ) : (
                      <FileText className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    )}
                    <span className={`font-mono text-xs font-semibold truncate ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                      {file.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                    {file.size}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {file.description}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span className="font-medium text-slate-400">{file.category}</span>
                  <span>·</span>
                  <span>{file.extension.toUpperCase()}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Code Inspector */}
        <div className="lg:col-span-8 flex flex-col rounded-xl border border-slate-800 bg-[#060c18] overflow-hidden shadow-2xl">
          {/* Header Bar */}
          <div className="bg-[#0a1224] border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-xs font-bold text-white truncate">
                {selectedFile.name}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-mono text-slate-400">
                {lines.length} lines
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Search in File Input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find in code..."
                  className="bg-slate-900 border border-slate-700 rounded-md pl-8 pr-3 py-1 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 w-36 sm:w-44"
                />
              </div>

              {/* Copy Code Button */}
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5"
                title="Copy file content to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              {/* Download Button */}
              <button
                onClick={() => onDownloadFile(selectedFile)}
                className="px-2.5 py-1 text-xs font-medium text-cyan-300 bg-cyan-950 border border-cyan-800 hover:bg-cyan-900 rounded-md transition-colors flex items-center gap-1.5"
                title="Download this file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {searchQuery && (
            <div className="bg-blue-950/30 border-b border-cyan-900/40 px-4 py-1.5 text-xs text-cyan-300 flex items-center justify-between">
              <span>{filteredIndices.length} matches found for "{searchQuery}"</span>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-white"
              >
                Clear
              </button>
            </div>
          )}

          {/* Code Viewer Body with Line Numbers */}
          <div className="p-4 font-mono text-[12px] leading-relaxed overflow-x-auto max-h-[580px] overflow-y-auto selection:bg-cyan-900 selection:text-white">
            <table className="w-full border-collapse">
              <tbody>
                {lines.map((line, idx) => {
                  const lineNum = idx + 1;
                  const isMatch = searchQuery.trim() && line.toLowerCase().includes(searchQuery.toLowerCase());
                  
                  // Syntax-like color heuristics
                  let lineClass = 'text-slate-300';
                  if (line.trim().startsWith('::') || line.trim().startsWith('REM') || line.trim().startsWith('#')) {
                    lineClass = 'text-slate-500 italic';
                  } else if (line.trim().startsWith(':') && !line.trim().startsWith('::')) {
                    lineClass = 'text-amber-400 font-semibold';
                  } else if (line.includes('echo') || line.includes('set ')) {
                    lineClass = 'text-cyan-300';
                  } else if (line.includes('[ PASS ]') || line.includes('[ OK ]')) {
                    lineClass = 'text-emerald-400 font-medium';
                  } else if (line.includes('[ FAIL ]') || line.includes('[ADMIN]')) {
                    lineClass = 'text-rose-400 font-medium';
                  }

                  return (
                    <tr 
                      key={idx} 
                      className={`hover:bg-slate-800/40 ${isMatch ? 'bg-cyan-950/50' : ''}`}
                    >
                      <td className="w-12 text-right pr-4 text-slate-600 select-none text-[11px] align-top py-0.5">
                        {lineNum}
                      </td>
                      <td className={`whitespace-pre-wrap break-all py-0.5 ${lineClass}`}>
                        {line || ' '}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
