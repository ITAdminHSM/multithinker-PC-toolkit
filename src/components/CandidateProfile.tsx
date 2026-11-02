import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Building2, 
  CheckCircle2, 
  Award, 
  ExternalLink,
  Shield,
  Layers,
  FileCheck
} from 'lucide-react';
import { DEVELOPER_INFO } from '../data/filesData';

export const CandidateProfile: React.FC = () => {
  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Profile Card Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar Graphic */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-700 p-0.5 shadow-lg shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-cyan-400">
              <User className="w-10 h-10" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {DEVELOPER_INFO.name}
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-mono font-semibold bg-cyan-950 border border-cyan-800 text-cyan-300 rounded-md">
                {DEVELOPER_INFO.brand}
              </span>
            </div>

            <div className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{DEVELOPER_INFO.title} · {DEVELOPER_INFO.org}</span>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{DEVELOPER_INFO.location}</span>
              <span className="text-slate-600">·</span>
              <span className="text-cyan-400/90 font-medium italic">"{DEVELOPER_INFO.tagline}"</span>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <a
            href={`mailto:${DEVELOPER_INFO.email}?subject=Job%20Inquiry%20-%20MultiThinker%20PC%20Toolkit`}
            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/50 hover:bg-slate-800/60 border border-slate-800 transition-colors text-xs text-slate-200 group"
          >
            <Mail className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate">{DEVELOPER_INFO.email}</span>
          </a>

          <a
            href={`https://wa.me/923337011728?text=Hello%20Syed%20Salman%20Mehdi,%20I%20reviewed%20your%20MultiThinker%20PC%20Toolkit`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/50 hover:bg-slate-800/60 border border-slate-800 transition-colors text-xs text-slate-200 group"
          >
            <Phone className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span>{DEVELOPER_INFO.phone} (WhatsApp)</span>
          </a>

          <a
            href={`https://${DEVELOPER_INFO.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/50 hover:bg-slate-800/60 border border-slate-800 transition-colors text-xs text-slate-200 group"
          >
            <Linkedin className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
            <span className="truncate">{DEVELOPER_INFO.linkedin}</span>
            <ExternalLink className="w-3 h-3 text-slate-500 ml-auto shrink-0" />
          </a>
        </div>
      </div>

      {/* Professional Competencies & Industrial Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Competencies */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            Core Technical Competencies
          </h2>
          <ul className="flex flex-col gap-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Enterprise Windows Administration:</strong> OS imaging, group policy (GPO), servicing pipelines, driver management, and registry debugging.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Network Engineering:</strong> LAN topology, subnetting, DHCP reservations, DNS resolvers, Wi-Fi 6 enterprise authentication (WPA2/WPA3), routing isolation.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Automation & Scripting:</strong> Resilient Windows Batch (.bat), command interpreter APIs, netsh scripting, task scheduler integration, anti-injection design.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span><strong>Endpoint Security Hardening:</strong> Defender service management, firewall profile auditing, zero-trust workstation segregation, least-privilege operations.</span>
            </li>
          </ul>
        </div>

        {/* Industrial Manufacturing Environment Experience */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Habib Sugar Mills Experience Context
          </h2>
          <div className="text-xs text-slate-300 leading-relaxed space-y-2">
            <p>
              As IT Officer at <strong>Habib Sugar Mills Ltd</strong> in Nawabshah, Salman is responsible for high-stakes operational continuity across critical manufacturing infrastructure.
            </p>
            <p>
              This includes supporting weighbridge weighing systems, laboratory analytics PCs, continuous cane crushing monitors, and corporate administrative networks.
            </p>
            <p>
              Working in an industrial setting instills a safety-first mindset: tools must be fast, self-contained, air-gap capable, and produce verifiable audit logs without risking workstation downtime.
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 text-center text-xs text-slate-500 leading-relaxed">
        <p>
          <strong>Disclaimer:</strong> This project is a personal technical portfolio showcase engineered by <strong>Syed Salman Mehdi</strong> to demonstrate IT administration, automation scripting, and systems troubleshooting capabilities. It is not an official product or commercial representation of any employer.
        </p>
      </div>
    </div>
  );
};
