import React, { useState } from 'react';
import { 
  Briefcase, 
  HelpCircle, 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  Factory,
  Copy,
  Check
} from 'lucide-react';
import { DEVELOPER_INFO } from '../data/filesData';

export const InterviewPrep: React.FC = () => {
  const [expandedQ, setExpandedQ] = useState<number | null>(0);
  const [copiedQ, setCopiedQ] = useState<number | null>(null);

  const interviewQuestions = [
    {
      q: 'Why build a maintenance toolkit in Batch rather than PowerShell or Python?',
      a: `In a corporate manufacturing environment like Habib Sugar Mills Ltd, endpoint security policy strictly enforces 'Set-ExecutionPolicy Restricted' on standard client workstations to block malicious script execution. Additionally, installing Python or Node.js runtime environments on 500+ production and office endpoints creates an unmanaged attack surface and requires continuous administrative patching. 

A pure Windows Command script (.bat) is universal: it executes out-of-the-box on factory Windows 10 and 11 workstations without altering security policies, installing interpreters, or requiring compiler dependencies. It works immediately from a technician's USB drive on any plant floor PC.`,
      keyTakeaway: 'Zero attack surface, respects GPO ExecutionPolicy Restricted, works on air-gapped factory PCs.'
    },
    {
      q: 'How do you handle the deprecation of WMIC on modern Windows 11 builds?',
      a: `Starting in Windows 11 22H2 and finalized in 24H2, Microsoft deprecated and permanently removed 'wmic.exe'. Legacy IT scripts calling 'wmic cpu get name' or 'wmic memorychip' immediately terminate with syntax errors.

In MUPT, I eliminated all WMIC dependencies. Instead, I query the Windows Kernel registry directly:
* CPU Model & Clock: 'reg query HKLM\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0 /v ProcessorNameString'
* Kernel Build: Tokenizing native 'ver' and reading 'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion'
* Memory & Uptime: Parsing native 'systeminfo' lines using strict 'findstr' filters.

This demonstrates proactive awareness of Microsoft operating system lifecycles and backward/forward compatibility engineering.`,
      keyTakeaway: 'Proactive registry and kernel querying without obsolete WMI command-line wrappers.'
    },
    {
      q: 'How do you protect against command injection when accepting user input in CMD?',
      a: `In Windows Batch scripts, accepting unvalidated input such as '8.8.8.8 & del C:\\test.txt' or using pipes ('|') can allow an attacker to escape the command context and execute arbitrary shell commands.

In MUPT, I engineered the ':SUB_VALIDATE_HOSTNAME' subroutine. It pipes candidate host strings into 'findstr' with a character class matching forbidden shell characters (&, |, <, >, ^, $, %). If any shell metacharacter (redirection, ampersand chaining, caret escapes, percent expansions) is detected, the script immediately aborts with errorlevel 1, cancels execution, and writes a warning to the security audit log.`,
      keyTakeaway: 'Strict regex token rejection preventing command chaining and argument injection.'
    },
    {
      q: 'What is your approach to PC cleaning, and why do commercial tools cause harm?',
      a: `Commercial "cleaners" and "RAM boosters" often mislead users. The Windows registry is an in-memory mapped database; deleting keys provides zero real-world performance gain while creating severe risks of application instability and broken COM associations. Similarly, forcing RAM clearing dumps active working sets into the slow pagefile, hurting responsiveness because Windows proactively uses free RAM for SuperFetch and Standby caching.

MUPT follows an ethical, safe-by-default standard:
1. Only disposable scratch caches in %TEMP% and explicitly enumerated temporary paths are targeted.
2. In-use locked files are safely bypassed ('2>nul') without crashing the script.
3. User Documents, Downloads, Desktop, browser profile SQLite databases, and saved credentials are NEVER touched.
4. For deeper servicing, MUPT launches the certified native Windows Disk Cleanup ('cleanmgr.exe') tool.`,
      keyTakeaway: 'Safe cache pruning, no fake registry/RAM cleaners, zero destruction of user files.'
    },
    {
      q: 'How does this project reflect your real-world work at Habib Sugar Mills Ltd?',
      a: `At Habib Sugar Mills Ltd in Nawabshah, we operate continuous industrial manufacturing cycles where downtime at sugarcane weighbridges, boiler control terminals, or administrative offices directly halts logistics and cost money.

As an IT Officer, I must deliver reliable, repeatable results under pressure:
1. Fast Fault Isolation: Diagnosing whether a plant PC drop is due to physical cabling, default gateway congestion, or DNS resolution within seconds.
2. Least-Privilege Discipline: Giving technicians the tools to run diagnostics without permanently granting them unrestricted Domain Admin credentials.
3. Tamper-Evident Reporting: Every maintenance task in MUPT produces a standardized, timestamped audit report saved to the user's profile, providing verifiable proof of work for IT audits.`,
      keyTakeaway: 'Industrial uptime discipline, least-privilege security, and audit-ready documentation.'
    }
  ];

  const handleCopyAnswer = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQ(idx);
    setTimeout(() => setCopiedQ(null), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Hero Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
              <Factory className="w-4 h-4" />
              <span>INDUSTRIAL IT & SYSTEMS ENGINEERING PORTFOLIO</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Interview Presentation & Technical Defense Guide
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Engineered by <strong className="text-cyan-300">{DEVELOPER_INFO.name}</strong>, {DEVELOPER_INFO.title} at {DEVELOPER_INFO.org}. This guide provides full technical justification for hiring managers, senior system architects, and technical interview panels.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="px-3 py-1 bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono rounded-lg">
              Role: IT Specialist / Systems Admin
            </span>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Engineering Discipline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4.5 flex flex-col gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Terminal className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Zero-Prerequisite Portability</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Eliminates dependencies on Python, Node, or PowerShell execution policies. Runs out of the box from a USB drive on all Windows 10 and 11 workstations.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4.5 flex flex-col gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Safe-by-Default Architecture</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Least-privilege elevation gates, shell injection protection, zero touch on personal user documents, and strict refusal to extract cleartext Wi-Fi keys.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4.5 flex flex-col gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-white">Future-Proof & Honest</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Handles the complete removal of WMIC in Windows 11 24H2 via direct registry introspection. Rejects snake-oil "RAM cleaners" with genuine OS memory facts.
          </p>
        </div>
      </div>

      {/* The 5 Key Interview Questions */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            Top 5 Technical Interview Questions & Model Answers
          </h2>
          <span className="text-xs text-slate-400">
            Click any question to expand
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {interviewQuestions.map((item, idx) => {
            const isExpanded = expandedQ === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedQ(isExpanded ? null : idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-200">
                      {item.q}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-950/40 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Key Takeaway: {item.keyTakeaway}</span>
                      </div>
                      <button
                        onClick={() => handleCopyAnswer(idx, item.a)}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded transition-colors"
                      >
                        {copiedQ === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedQ === idx ? 'Copied' : 'Copy Answer'}</span>
                      </button>
                    </div>

                    <div className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans bg-slate-900/60 p-4 rounded-lg border border-slate-800">
                      {item.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Industrial Manufacturing Context Callout */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Manufacturing Plant IT vs Standard Office IT</h4>
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              Habib Sugar Mills operates in continuous crushing seasons. Computers operate near heavy motors, dust, and electrical interference. Troubleshooting tools must never rely on cloud connectivity or hang on offline network calls.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400 shrink-0 self-end md:self-auto">
          Habib Sugar Mills Ltd, Nawabshah
        </div>
      </div>
    </div>
  );
};
