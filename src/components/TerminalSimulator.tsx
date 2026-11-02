import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal as TerminalIcon, 
  Play, 
  RotateCcw, 
  Shield, 
  ShieldAlert, 
  Copy, 
  Check, 
  FileText, 
  Info,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { DEVELOPER_INFO } from '../data/filesData';

interface TerminalLine {
  text: string;
  type: 'cyan' | 'green' | 'yellow' | 'red' | 'white' | 'gray' | 'bold' | 'header';
}

export const TerminalSimulator: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'main' | 'module' | 'demo' | 'tests' | 'report_view'>('splash');
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [demoStep, setDemoStep] = useState(1);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedReports, setGeneratedReports] = useState<string[]>([
    'MUPT_Report_PLANT-PC-04_7241.txt',
    'MUPT_Report_WEIGHBRIDGE-02_9104.txt'
  ]);
  const [activityLogs, setActivityLogs] = useState<string[]>([
    `[2026-11-02 08:30:15] [salman@PLANT-PC-04] Toolkit initialized in Standard User mode.`,
    `[2026-11-02 08:31:02] [salman@PLANT-PC-04] Quick Maintenance executed. Status: DNS=SUCCESS, Temp=SUCCESS, Net=SUCCESS`,
    `[2026-11-02 08:34:20] [salman@PLANT-PC-04] ICMP benchmark 1.1.1.1 completed (avg=14ms, loss=0%)`
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  // Initial Splash Sequence
  useEffect(() => {
    runSplashSequence();
  }, [isAdmin]);

  const addLine = (text: string, type: TerminalLine['type'] = 'white') => {
    setLines(prev => [...prev, { text, type }]);
  };

  const clearLines = () => {
    setLines([]);
  };

  const runSplashSequence = async () => {
    setIsProcessing(true);
    setCurrentScreen('splash');
    setLines([]);

    addLine(' ', 'white');
    addLine('    __  _____  ______  __________________  _____   ______ __ ______ ____ ', 'cyan');
    addLine('   /  |/  / / / / / /_/ /_  __/  _/ / / / / / / | / / //_// ____// __ \\', 'cyan');
    addLine('  / /|_/ / / / / / __  / / /  / // /_/ / / / /  |/ / ,<  / __/  / /_/ /', 'cyan');
    addLine(' / /  / / /_/ / / /_/ / / / _/ // __  / /_/ / /|  / /| | / /___ / _, _/ ', 'cyan');
    addLine('/_/  /_/\\____/_/\\____/_/ /_/ /___/_/ /_/\\____/_/ |_/_/ |_/_____//_/ |_|  ', 'cyan');
    addLine(' ', 'white');
    addLine(`      ULTIMATE PC TOOLKIT (MUPT) - ${DEVELOPER_INFO.version}`, 'bold');
    addLine('      Automated Windows Maintenance, Diagnostics & Systems Engineering', 'cyan');
    addLine(`      Build: ${DEVELOPER_INFO.build} | ${DEVELOPER_INFO.tagline}`, 'gray');
    addLine('--------------------------------------------------------------------------------', 'cyan');
    addLine('  Initializing system modules and environment checks...', 'white');
    addLine(' ', 'white');

    await new Promise(r => setTimeout(r, 400));
    addLine('  * Operating System:        [ OK ] Microsoft Windows 11 Pro 64-bit (Build 22631)', 'green');

    await new Promise(r => setTimeout(r, 400));
    if (isAdmin) {
      addLine('  * Administrative Access:   [ OK ] Elevated (Local Administrator)', 'green');
    } else {
      addLine('  * Administrative Access:   [WARN] Standard User (System repair tools will prompt for elevation)', 'yellow');
    }

    await new Promise(r => setTimeout(r, 400));
    addLine('  * Console ANSI Engine:     [ OK ] Virtual Terminal Level Active (High-Visibility)', 'green');

    await new Promise(r => setTimeout(r, 400));
    addLine('  * Report Directory:        [ OK ] Ready (%USERPROFILE%\\Documents\\MultiThinker\\Reports)', 'green');

    await new Promise(r => setTimeout(r, 400));
    addLine('  * Network Interface:       [ OK ] Active IPv4 Adapter (192.168.10.45 / Gateway 192.168.10.1)', 'green');

    await new Promise(r => setTimeout(r, 500));
    addLine(' ', 'white');
    addLine('  ----------------------------------------------------------------------', 'cyan');
    addLine(`  Candidate / Developer:  ${DEVELOPER_INFO.name} (${DEVELOPER_INFO.brand})`, 'white');
    addLine(`  Professional Role:      ${DEVELOPER_INFO.title} | ${DEVELOPER_INFO.org}`, 'white');
    addLine(`  Contact:                ${DEVELOPER_INFO.email} | WhatsApp ${DEVELOPER_INFO.phone}`, 'white');
    addLine(`  LinkedIn:               ${DEVELOPER_INFO.linkedin}`, 'white');
    addLine('  ----------------------------------------------------------------------', 'cyan');
    addLine(' ', 'white');
    addLine('  [ OK ] Initialization complete. Loading workspace...', 'green');

    await new Promise(r => setTimeout(r, 600));
    setIsProcessing(false);
    renderMainMenu();
  };

  const renderHeader = () => {
    return [
      { text: '================================================================================', type: 'cyan' as const },
      { text: `   ${DEVELOPER_INFO.brand} Ultimate PC Toolkit  -  ${DEVELOPER_INFO.version}`, type: 'bold' as const },
      { text: `   Developed by ${DEVELOPER_INFO.name} | ${DEVELOPER_INFO.org}`, type: 'white' as const },
      { text: `   Host: DESKTOP-PROD04  |  User: salman.mehdi  |  Status: ${isAdmin ? 'ELEVATED (Administrator)' : 'STANDARD (User)'}`, type: 'gray' as const },
      { text: '================================================================================', type: 'cyan' as const }
    ];
  };

  const renderFooter = () => {
    return [
      { text: '--------------------------------------------------------------------------------', type: 'cyan' as const },
      { text: `   MultiThinker IT Systems  |  Email: ${DEVELOPER_INFO.email}  |  WhatsApp: ${DEVELOPER_INFO.phone}`, type: 'gray' as const },
      { text: '================================================================================', type: 'cyan' as const }
    ];
  };

  const renderMainMenu = () => {
    setCurrentScreen('main');
    setActiveModuleId(null);
    setLines([
      ...renderHeader(),
      { text: ' ', type: 'white' },
      { text: '   CORE MAINTENANCE & DIAGNOSTIC MODULES', type: 'bold' },
      { text: '  ==============================================================================', type: 'cyan' },
      { text: ' ', type: 'white' },
      { text: '   [ 1] Quick Maintenance        - Flush DNS, safe temp clean, time sync, connectivity', type: 'white' },
      { text: '   [ 2] Network Toolkit          - IP config, ping, DNS, Winsock/TCP reset, trace, DHCP', type: 'white' },
      { text: '   [ 3] Wi-Fi Manager            - Profile auditor, signal check, reconnect, forget network', type: 'white' },
      { text: '   [ 4] Diagnostics & Performance- CPU, memory, uptime, startup tasks, shell restart', type: 'white' },
      { text: '   [ 5] PC Cleaning              - Safe temp cache clean, Recycle Bin, Disk Cleanup tool', type: 'white' },
      { text: '   [ 6] Windows Repair           - SFC integrity scan, DISM health check, admin control', type: 'white' },
      { text: '   [ 7] Internet Testing         - Speedtest portals, packet loss, DNS query benchmark', type: 'white' },
      { text: '   [ 8] Security Tools           - Defender status, Antivirus quick scan, Firewall state', type: 'white' },
      { text: '   [ 9] System Information       - Hardware audit, OS build, disks, IP & adapter summary', type: 'white' },
      { text: '   [10] Advanced Utilities       - Management MMC shortcuts, health exports, activity log', type: 'white' },
      { text: ' ', type: 'white' },
      { text: '   PORTFOLIO & ADMINISTRATION', type: 'bold' },
      { text: '  ------------------------------------------------------------------------------', type: 'cyan' },
      { text: '   [11] Maintenance Reports      - View & export generated diagnostic and audit logs', type: 'white' },
      { text: '   [12] Interview Demo Mode      [READ-ONLY] Guided showcase for hiring managers', type: 'green' },
      { text: '   [13] Settings, About & Contact- Developer card, splash toggle, credentials', type: 'white' },
      { text: ' ', type: 'white' },
      { text: '   [ 0] Exit Toolkit', type: 'red' },
      { text: ' ', type: 'white' },
      ...renderFooter()
    ]);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    const choice = inputVal.trim();
    setInputVal('');
    processCommand(choice);
  };

  const processCommand = async (cmd: string) => {
    if (!cmd) return;

    if (currentScreen === 'main') {
      if (cmd === '1') return runQuickMaintenance();
      if (cmd === '2') return openModuleMenu(2);
      if (cmd === '3') return openModuleMenu(3);
      if (cmd === '4') return openModuleMenu(4);
      if (cmd === '5') return openModuleMenu(5);
      if (cmd === '6') return openModuleMenu(6);
      if (cmd === '7') return openModuleMenu(7);
      if (cmd === '8') return openModuleMenu(8);
      if (cmd === '9') return openModuleMenu(9);
      if (cmd === '10') return openModuleMenu(10);
      if (cmd === '11') return openModuleMenu(11);
      if (cmd === '12') return startInterviewDemo();
      if (cmd === '13') return openModuleMenu(13);
      if (cmd === '0') {
        setLines([
          { text: 'Exiting MultiThinker Ultimate PC Toolkit...', type: 'cyan' },
          { text: `Thank you for reviewing Syed Salman Mehdi's portfolio suite.`, type: 'green' }
        ]);
        setTimeout(() => renderMainMenu(), 1500);
        return;
      }
      addLine(`Invalid choice: "${cmd}". Please enter a number between 0 and 13.`, 'red');
      return;
    }

    if (currentScreen === 'module') {
      if (cmd.toUpperCase() === 'B') {
        renderMainMenu();
        return;
      }
      handleModuleSubCommand(activeModuleId, cmd);
      return;
    }

    if (currentScreen === 'demo') {
      if (cmd.toUpperCase() === 'B' || cmd === '0') {
        renderMainMenu();
        return;
      }
      advanceDemoStep();
      return;
    }

    if (currentScreen === 'tests' || currentScreen === 'report_view') {
      renderMainMenu();
      return;
    }
  };

  // Module 1: Quick Maintenance
  const runQuickMaintenance = async () => {
    setIsProcessing(true);
    setLines([
      ...renderHeader(),
      { text: ' ', type: 'white' },
      { text: '   MODULE 1: QUICK MAINTENANCE (ONE-CLICK PREVENTATIVE CARE)', type: 'bold' },
      { text: '  ==============================================================================', type: 'cyan' },
      { text: '   Executing safe automated sequence...', type: 'white' },
      { text: ' ', type: 'white' }
    ]);

    await new Promise(r => setTimeout(r, 400));
    addLine('  [1/5] Flushing DNS resolver cache (ipconfig /flushdns)...', 'cyan');
    await new Promise(r => setTimeout(r, 400));
    addLine('        Status: [ OK ] Windows IP Configuration: Successfully flushed DNS Resolver Cache.', 'green');

    await new Promise(r => setTimeout(r, 400));
    addLine('  [2/5] Cleaning safe user temp files (%TEMP%\\*.*)...', 'cyan');
    await new Promise(r => setTimeout(r, 500));
    addLine('        Status: [ OK ] 184 obsolete cache files removed (14 locked files safely skipped).', 'green');

    await new Promise(r => setTimeout(r, 400));
    addLine('  [3/5] Synchronizing system clock with Windows Time service (w32tm)...', 'cyan');
    await new Promise(r => setTimeout(r, 500));
    addLine('        Status: [ OK ] Clock resynchronized with time.windows.com (offset +0.002s).', 'green');

    await new Promise(r => setTimeout(r, 400));
    addLine('  [4/5] Testing dual-host Internet connectivity (1.1.1.1 & 8.8.8.8)...', 'cyan');
    await new Promise(r => setTimeout(r, 400));
    addLine('        Status: [ OK ] Primary DNS (1.1.1.1) latency: 12ms | Loss: 0%', 'green');

    await new Promise(r => setTimeout(r, 400));
    addLine('  [5/5] Querying system drive free space...', 'cyan');
    await new Promise(r => setTimeout(r, 400));
    addLine('        Status: [ OK ] Volume C: Free Space: 142,849,120,256 bytes (~133.04 GB available).', 'green');

    await new Promise(r => setTimeout(r, 500));
    addLine(' ', 'white');
    addLine('  ------------------------------------------------------------------------------', 'cyan');
    addLine('   QUICK MAINTENANCE SUMMARY:', 'bold');
    addLine('   * DNS Resolver Flush:     SUCCESS', 'green');
    addLine('   * Safe Temp Cleanup:      SUCCESS', 'green');
    addLine('   * System Clock NTP Sync:  SUCCESS', 'green');
    addLine('   * Network Connectivity:   SUCCESS', 'green');
    addLine('   * Drive Free Space Audit: SUCCESS', 'green');
    addLine('  ------------------------------------------------------------------------------', 'cyan');
    addLine('   Activity logged to: %USERPROFILE%\\Documents\\MultiThinker\\Reports\\MUPT_Activity.log', 'gray');
    addLine('   Press "B" or Enter to return to main menu.', 'yellow');

    setActivityLogs(prev => [
      `[${new Date().toISOString().replace('T', ' ').substring(0, 19)}] Quick Maintenance run by salman. Status: DNS=OK, Temp=OK, Net=OK`,
      ...prev
    ]);
    setIsProcessing(false);
  };

  // Open Submenus
  const openModuleMenu = (modId: number) => {
    setActiveModuleId(modId);
    setCurrentScreen('module');

    if (modId === 2) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   MODULE 2: NETWORK TOOLKIT & IP UTILITIES', type: 'bold' },
        { text: '  ==============================================================================', type: 'cyan' },
        { text: '   [ 1] Show Detailed IP, Gateway, DNS & DHCP Config (ipconfig /all)', type: 'white' },
        { text: '   [ 2] Flush DNS Resolver Cache', type: 'white' },
        { text: '   [ 3] Release and Renew IP Address Lease (DHCP)', type: 'white' },
        { text: '   [ 4] Ping Gateway, Google (8.8.8.8) & Cloudflare (1.1.1.1)', type: 'white' },
        { text: '   [ 5] Custom Ping with Packet Loss and Latency Summary', type: 'white' },
        { text: '   [ 6] Continuous Ping with Safe Interrupt', type: 'white' },
        { text: '   [ 7] Trace Route to Target (tracert)', type: 'white' },
        { text: '   [ 8] DNS Lookup & Reverse Query (nslookup)', type: 'white' },
        { text: '   [ 9] Show Network Adapters and MAC Addresses (getmac)', type: 'white' },
        { text: '   [10] [ADMIN] Reset Winsock Catalog & TCP/IP Stack', type: 'red' },
        { text: '   [ H] Help & Documentation for Network Tools', type: 'yellow' },
        { text: '   [ B] Back to Main Menu', type: 'yellow' },
        { text: ' ', type: 'white' },
        ...renderFooter()
      ]);
    } else if (modId === 3) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   MODULE 3: WI-FI NETWORK MANAGER', type: 'bold' },
        { text: '  ==============================================================================', type: 'cyan' },
        { text: '   [ 1] Show Current Wi-Fi Connection & Signal Strength', type: 'white' },
        { text: '   [ 2] List All Saved Wi-Fi Profiles on this PC', type: 'white' },
        { text: '   [ 3] Show Detailed Wireless Interface & Driver Info', type: 'white' },
        { text: '   [ 4] Reconnect to a Saved Wi-Fi Profile', type: 'white' },
        { text: '   [ 5] Forget (Delete) a Specific Wi-Fi Profile', type: 'white' },
        { text: '   [ 6] [DANGER] Forget ALL Saved Wi-Fi Profiles', type: 'red' },
        { text: '   [ 7] [ADMIN] Restart Wi-Fi Adapter (Cycle Interface)', type: 'red' },
        { text: '   [ 8] Wi-Fi Troubleshooting & Signal Guidance', type: 'white' },
        { text: '   [ H] Help & Ethical Policy Notice', type: 'yellow' },
        { text: '   [ B] Back to Main Menu', type: 'yellow' },
        { text: ' ', type: 'white' },
        ...renderFooter()
      ]);
    } else if (modId === 4) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   MODULE 4: SYSTEM DIAGNOSTICS & PERFORMANCE AUDIT', type: 'bold' },
        { text: '  ==============================================================================', type: 'cyan' },
        { text: '   [ 1] Memory (RAM) Usage & System Architecture Breakdown', type: 'white' },
        { text: '   [ 2] CPU Model, Cores & Clock Speed (Registry Query)', type: 'white' },
        { text: '   [ 3] System Uptime & Boot Time Verification', type: 'white' },
        { text: '   [ 4] Startup Programs Auditor (HKCU and HKLM Run keys)', type: 'white' },
        { text: '   [ 5] Restart Windows Explorer (Refreshes taskbar and shell)', type: 'white' },
        { text: '   [ 6] Real-Time Process List sorted by Session', type: 'white' },
        { text: '   [ H] Engineering Fact: Why "RAM Boosters" are Placebo', type: 'yellow' },
        { text: '   [ B] Back to Main Menu', type: 'yellow' },
        { text: ' ', type: 'white' },
        ...renderFooter()
      ]);
    } else if (modId === 5) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   MODULE 5: SAFE PC CLEANING & STORAGE OPTIMIZATION', type: 'bold' },
        { text: '  ==============================================================================', type: 'cyan' },
        { text: '   [ 1] Clean Safe User Temp Files (%TEMP%)', type: 'white' },
        { text: '   [ 2] [ADMIN] Clean Windows System Temp Files (%WINDIR%\\Temp)', type: 'red' },
        { text: '   [ 3] Empty Windows Recycle Bin (Prompts for confirmation)', type: 'white' },
        { text: '   [ 4] Clean Windows Error Reporting (WER) Queue', type: 'white' },
        { text: '   [ 5] Launch Windows Native Disk Cleanup Manager (cleanmgr.exe)', type: 'white' },
        { text: '   [ 6] Full Safe Clean (User Temp + WER + Disk Cleanup)', type: 'white' },
        { text: '   [ H] View Safe Cleaning Principles & Rules', type: 'yellow' },
        { text: '   [ B] Back to Main Menu', type: 'yellow' },
        { text: ' ', type: 'white' },
        ...renderFooter()
      ]);
    } else if (modId === 6) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   MODULE 6: WINDOWS REPAIR & INTEGRITY VERIFICATION', type: 'bold' },
        { text: '  ==============================================================================', type: 'cyan' },
        { text: '   [ 1] [ADMIN] SFC /scannow (System File Checker Integrity Verification)', type: 'red' },
        { text: '   [ 2] [ADMIN] DISM CheckHealth (Quick Image Servicing Health Check)', type: 'red' },
        { text: '   [ 3] [ADMIN] DISM ScanHealth (Deep Component Store Corruption Scan)', type: 'red' },
        { text: '   [ 4] [ADMIN] DISM RestoreHealth (Repair Component Store from Windows Update)', type: 'red' },
        { text: '   [ 5] Windows Update Troubleshooter & Settings Portal', type: 'white' },
        { text: '   [ 6] Launch Device Manager (devmgmt.msc)', type: 'white' },
        { text: '   [ 7] Launch Windows Services Management (services.msc)', type: 'white' },
        { text: '   [ 8] Launch Windows Event Viewer (eventvwr.msc)', type: 'white' },
        { text: '   [ H] Help & Explanation of SFC vs DISM', type: 'yellow' },
        { text: '   [ B] Back to Main Menu', type: 'yellow' },
        { text: ' ', type: 'white' },
        ...renderFooter()
      ]);
    } else if (modId === 7) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   MODULE 7: INTERNET SPEED & LATENCY TESTING', type: 'bold' },
        { text: '  ==============================================================================', type: 'cyan' },
        { text: '   [ 1] Launch Cloudflare Speed Test in Default Browser (speed.cloudflare.com)', type: 'white' },
        { text: '   [ 2] Launch Ookla Speedtest in Default Browser (www.speedtest.net)', type: 'white' },
        { text: '   [ 3] Native ICMP Ping Latency Benchmark (10 Packets to 1.1.1.1)', type: 'white' },
        { text: '   [ 4] Packet Loss and Jitter Assessment', type: 'white' },
        { text: '   [ 5] DNS Query Resolution Speed Test (nslookup)', type: 'white' },
        { text: '   [ H] Help & Explanation', type: 'yellow' },
        { text: '   [ B] Back to Main Menu', type: 'yellow' },
        { text: ' ', type: 'white' },
        ...renderFooter()
      ]);
    } else if (modId === 8) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   MODULE 8: SECURITY TOOLS & DEFENDER STATUS', type: 'bold' },
        { text: '  ==============================================================================', type: 'cyan' },
        { text: '   [ 1] Check Windows Defender Service (WinDefend) Status', type: 'white' },
        { text: '   [ 2] Check Windows Firewall State for All Profiles', type: 'white' },
        { text: '   [ 3] Run Microsoft Defender Antivirus Quick Scan (MpCmdRun)', type: 'white' },
        { text: '   [ 4] Launch Windows Security Center Dashboard', type: 'white' },
        { text: '   [ 5] Launch Windows Advanced Firewall Control Panel', type: 'white' },
        { text: '   [ 6] Enterprise IT Endpoint Security Best Practices Checklist', type: 'white' },
        { text: '   [ H] Help & Documentation', type: 'yellow' },
        { text: '   [ B] Back to Main Menu', type: 'yellow' },
        { text: ' ', type: 'white' },
        ...renderFooter()
      ]);
    } else if (modId === 9) {
      // System info instant view
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   MODULE 9: COMPLETE SYSTEM SPECIFICATION AUDIT', type: 'bold' },
        { text: '  ==============================================================================', type: 'cyan' },
        { text: '   Computer Name:          DESKTOP-PROD04', type: 'white' },
        { text: '   Current User:           salman.mehdi (Domain: HSM-NAWABSHAH)', type: 'white' },
        { text: `   Privilege Status:       ${isAdmin ? 'ELEVATED (Administrator)' : 'STANDARD (User)'}`, type: 'white' },
        { text: '   Processor Architecture: AMD64 (64-bit)', type: 'white' },
        { text: '   Logical CPU Cores:      8 Cores / 16 Threads', type: 'white' },
        { text: '   Windows Kernel Version: 10.0.22631 (Windows 11 Enterprise 23H2)', type: 'white' },
        { text: '   CPU Processor:          13th Gen Intel(R) Core(TM) i7-13700 @ 2.10 GHz', type: 'white' },
        { text: ' ', type: 'white' },
        { text: '  --- STORAGE DRIVES & FREE SPACE ---', type: 'cyan' },
        { text: '   Drive C:\\ - Free Space: 142,849,120,256 bytes (133.04 GB available)', type: 'green' },
        { text: '   Drive D:\\ - Free Space: 412,982,546,432 bytes (384.62 GB available)', type: 'green' },
        { text: ' ', type: 'white' },
        { text: '  --- NETWORK ADAPTERS & IP ADDRESSES ---', type: 'cyan' },
        { text: '   Ethernet adapter Realtek PCIe GbE:   192.168.10.45 / Subnet: 255.255.255.0', type: 'white' },
        { text: '   Default Gateway:                     192.168.10.1', type: 'white' },
        { text: '   Wireless LAN adapter Wi-Fi 6 AX201:  192.168.20.89 / Gateway: 192.168.20.1', type: 'white' },
        { text: ' ', type: 'white' },
        { text: '   [E] Export full system audit to text report file', type: 'yellow' },
        { text: '   [B] Back to Main Menu', type: 'yellow' },
        { text: ' ', type: 'white' },
        ...renderFooter()
      ]);
    } else if (modId === 10) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   MODULE 10: ADVANCED ADMINISTRATIVE TOOLS & CONSOLES', type: 'bold' },
        { text: '  ==============================================================================', type: 'cyan' },
        { text: '   [ 1] Launch Task Manager (taskmgr.exe)', type: 'white' },
        { text: '   [ 2] Launch Resource Monitor (resmon.exe)', type: 'white' },
        { text: '   [ 3] Launch Performance Monitor (perfmon.exe)', type: 'white' },
        { text: '   [ 4] Launch Computer Management Console (compmgmt.msc)', type: 'white' },
        { text: '   [ 5] Launch Device Manager (devmgmt.msc)', type: 'white' },
        { text: '   [ 6] Launch System Information (msinfo32.exe)', type: 'white' },
        { text: '   [ 7] Open Clean Command Prompt at Toolkit Root', type: 'white' },
        { text: '   [ 8] Launch Windows Terminal (wt.exe)', type: 'white' },
        { text: '   [ 9] View MUPT Maintenance Activity Log', type: 'white' },
        { text: '   [ B] Back to Main Menu', type: 'yellow' },
        { text: ' ', type: 'white' },
        ...renderFooter()
      ]);
    } else if (modId === 11) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   MODULE 11: MAINTENANCE REPORTS & LOG AUDIT', type: 'bold' },
        { text: '  ==============================================================================', type: 'cyan' },
        { text: '   Storage Path: %USERPROFILE%\\Documents\\MultiThinker\\Reports', type: 'green' },
        { text: ' ', type: 'white' },
        { text: '   [ 1] Generate New Comprehensive Maintenance Report Now', type: 'white' },
        { text: '   [ 2] List All Saved Reports in Reports Folder', type: 'white' },
        { text: '   [ 3] Open Reports Folder in Windows File Explorer', type: 'white' },
        { text: '   [ 4] View Most Recent Report on Screen', type: 'white' },
        { text: '   [ B] Back to Main Menu', type: 'yellow' },
        { text: ' ', type: 'white' },
        ...renderFooter()
      ]);
    } else if (modId === 13) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   ==============================================================================', type: 'cyan' },
        { text: '   DEVELOPER PROFILE & IT PORTFOLIO CARD', type: 'bold' },
        { text: '   ==============================================================================', type: 'cyan' },
        { text: `    Developer Name:     ${DEVELOPER_INFO.name}`, type: 'white' },
        { text: `    Brand Name:         ${DEVELOPER_INFO.brand}`, type: 'white' },
        { text: `    Professional Role:  ${DEVELOPER_INFO.title}`, type: 'white' },
        { text: `    Organization:       ${DEVELOPER_INFO.org}`, type: 'white' },
        { text: `    Email Address:      ${DEVELOPER_INFO.email}`, type: 'white' },
        { text: `    Phone / WhatsApp:   ${DEVELOPER_INFO.phone} (Intl: ${DEVELOPER_INFO.phoneIntl})`, type: 'white' },
        { text: `    LinkedIn:           ${DEVELOPER_INFO.linkedin}`, type: 'white' },
        { text: `    Location:           ${DEVELOPER_INFO.location}`, type: 'white' },
        { text: `    Tagline:            "${DEVELOPER_INFO.tagline}"`, type: 'white' },
        { text: ' ', type: 'white' },
        { text: `    Toolkit Version:    ${DEVELOPER_INFO.version}`, type: 'yellow' },
        { text: `    Build Stamp:        ${DEVELOPER_INFO.build}`, type: 'yellow' },
        { text: ' ', type: 'white' },
        { text: '    Core Technical Competencies:', type: 'gray' },
        { text: '    * Enterprise Windows 10/11 Deployment, Servicing & Troubleshooting', type: 'white' },
        { text: '    * Network Administration (LAN, VLANs, Wi-Fi 6, DHCP, DNS, Routing)', type: 'white' },
        { text: '    * Industrial Endpoint Support in Manufacturing & Continuous Processing', type: 'white' },
        { text: '    * Native Automation Scripting (Batch, Command Shell, Registry, Netsh)', type: 'white' },
        { text: '    * Systems Integrity, Security Hardening, and Preventative Maintenance', type: 'white' },
        { text: ' ', type: 'white' },
        { text: '    Disclaimer: Personal professional portfolio project by Syed Salman Mehdi.', type: 'gray' },
        { text: '  ------------------------------------------------------------------------------', type: 'cyan' },
        { text: '   [ 1] Open Developer\'s LinkedIn Profile in Browser', type: 'white' },
        { text: '   [ 2] Send Email to salmanmehdi@gmail.com', type: 'white' },
        { text: '   [ 3] Toggle Splash Screen Animation', type: 'white' },
        { text: '   [ 4] Toggle ANSI Color Rendering', type: 'white' },
        { text: '   [ B] Back to Main Menu', type: 'yellow' },
        { text: ' ', type: 'white' },
        ...renderFooter()
      ]);
    }
  };

  const handleModuleSubCommand = async (modId: number | null, subCmd: string) => {
    setIsProcessing(true);

    if (modId === 2) {
      if (subCmd === '1') {
        addLine('Executing: ipconfig /all...', 'cyan');
        await new Promise(r => setTimeout(r, 400));
        addLine('Windows IP Configuration', 'bold');
        addLine('   Host Name . . . . . . . . . . . . : DESKTOP-PROD04', 'white');
        addLine('   Primary Dns Suffix  . . . . . . . : habibmills.local', 'white');
        addLine('   Node Type . . . . . . . . . . . . : Hybrid', 'white');
        addLine('   IP Routing Enabled. . . . . . . . : No', 'white');
        addLine('Ethernet adapter Ethernet 1:', 'cyan');
        addLine('   IPv4 Address. . . . . . . . . . . : 192.168.10.45(Preferred)', 'green');
        addLine('   Subnet Mask . . . . . . . . . . . : 255.255.255.0', 'white');
        addLine('   Lease Obtained. . . . . . . . . . : Monday, November 2, 2026 07:00:00', 'white');
        addLine('   Default Gateway . . . . . . . . . : 192.168.10.1', 'green');
        addLine('   DHCP Server . . . . . . . . . . . : 192.168.10.5', 'white');
        addLine('   DNS Servers . . . . . . . . . . . : 192.168.10.5, 1.1.1.1', 'white');
      } else if (subCmd === '4') {
        addLine('Pinging Google DNS (8.8.8.8) with 32 bytes of data:', 'cyan');
        await new Promise(r => setTimeout(r, 300));
        addLine('Reply from 8.8.8.8: bytes=32 time=14ms TTL=117', 'green');
        await new Promise(r => setTimeout(r, 200));
        addLine('Reply from 8.8.8.8: bytes=32 time=13ms TTL=117', 'green');
        await new Promise(r => setTimeout(r, 200));
        addLine('Reply from 8.8.8.8: bytes=32 time=14ms TTL=117', 'green');
        addLine('Ping statistics for 8.8.8.8: Packets: Sent = 3, Received = 3, Lost = 0 (0% loss).', 'bold');
      } else if (subCmd === '10') {
        if (!isAdmin) {
          addLine('==============================================================================', 'red');
          addLine('   ADMINISTRATIVE PRIVILEGES REQUIRED', 'bold');
          addLine('==============================================================================', 'red');
          addLine('   The requested operation: "Reset Winsock Catalog & TCP/IP Stack"', 'white');
          addLine('   requires elevated Windows Administrator permissions.', 'white');
          addLine('   Right-click MultiThinker_PC_Toolkit.bat and choose "Run as administrator".', 'yellow');
        } else {
          addLine('Executing: netsh winsock reset...', 'cyan');
          await new Promise(r => setTimeout(r, 400));
          addLine('Sucessfully reset the Winsock Catalog. You must restart the computer.', 'green');
          addLine('Executing: netsh int ip reset...', 'cyan');
          await new Promise(r => setTimeout(r, 400));
          addLine('Resetting Global, Interface, Subnet... OK! Restart required to complete.', 'green');
        }
      } else {
        addLine(`Command [${subCmd}] simulated successfully.`, 'green');
      }
    } else if (modId === 3) {
      if (subCmd === '1') {
        addLine('Active Wireless Connection Details:', 'cyan');
        addLine('   Name                   : Wi-Fi', 'white');
        addLine('   Description            : Intel(R) Wi-Fi 6 AX201 160MHz', 'white');
        addLine('   GUID                   : 4a91b320-91cd-40a1-87bb-1294871e09bc', 'white');
        addLine('   Physical address       : 3c:58:c2:d9:e1:04', 'white');
        addLine('   State                  : connected', 'green');
        addLine('   SSID                   : HSM_PLANT_STAFF_5G', 'green');
        addLine('   BSSID                  : 74:83:c2:41:09:aa', 'white');
        addLine('   Network type           : Infrastructure', 'white');
        addLine('   Radio type             : 802.11ax (Wi-Fi 6)', 'white');
        addLine('   Authentication         : WPA2-Enterprise (802.1X)', 'green');
        addLine('   Cipher                 : CCMP (AES)', 'white');
        addLine('   Signal                 : 94% (Excellent coverage)', 'green');
      } else if (subCmd === '2') {
        addLine('Profiles on interface Wi-Fi:', 'cyan');
        addLine('   User profiles:', 'white');
        addLine('   -------------', 'white');
        addLine('   All User Profile     : HSM_PLANT_STAFF_5G', 'green');
        addLine('   All User Profile     : HSM_GUEST_PORTAL', 'white');
        addLine('   All User Profile     : MultiThinker_Lab', 'white');
      } else if (subCmd === 'H') {
        addLine('==============================================================================', 'cyan');
        addLine('   HELP & ETHICAL POLICY NOTICE: WI-FI MANAGER', 'bold');
        addLine('==============================================================================', 'cyan');
        addLine('   ETHICAL NOTICE: In accordance with enterprise IT security standards,', 'white');
        addLine('   this tool NEVER extracts or reveals saved Wi-Fi cleartext passwords.', 'white');
        addLine('   Deleting a profile removes its saved credentials from Windows credential store.', 'white');
      } else {
        addLine(`Wi-Fi operation [${subCmd}] simulated.`, 'green');
      }
    } else if (modId === 6) {
      if (subCmd === '1' || subCmd === '2' || subCmd === '3' || subCmd === '4') {
        if (!isAdmin) {
          addLine('==============================================================================', 'red');
          addLine('   ADMINISTRATIVE PRIVILEGES REQUIRED', 'bold');
          addLine('==============================================================================', 'red');
          addLine('   Windows integrity repairs (SFC / DISM) require elevated Administrator privileges.', 'white');
          addLine('   Please toggle Administrator elevation mode in the upper right control bar.', 'yellow');
        } else {
          addLine(`Executing repair utility [${subCmd}]...`, 'cyan');
          if (subCmd === '1') {
            addLine('Beginning system scan. This process will take some time.', 'white');
            await new Promise(r => setTimeout(r, 600));
            addLine('Verification 100% complete.', 'white');
            addLine('Windows Resource Protection did not find any integrity violations.', 'green');
          } else {
            addLine('Deployment Image Servicing and Management tool (DISM)', 'white');
            await new Promise(r => setTimeout(r, 600));
            addLine('Image Version: 10.0.22631.3447', 'white');
            addLine('The component store is repairable. The operation completed successfully.', 'green');
          }
        }
      } else {
        addLine(`Windows repair shortcut [${subCmd}] dispatched.`, 'green');
      }
    } else if (modId === 9 && subCmd.toUpperCase() === 'E') {
      const newRep = `MUPT_Report_DESKTOP-PROD04_${Math.floor(1000 + Math.random() * 9000)}.txt`;
      setGeneratedReports(prev => [newRep, ...prev]);
      addLine('Report successfully generated at:', 'green');
      addLine(`%USERPROFILE%\\Documents\\MultiThinker\\Reports\\${newRep}`, 'white');
      addLine('Signed with candidate identity and verified system invariants.', 'cyan');
    } else if (modId === 11) {
      if (subCmd === '1') {
        const newRep = `MUPT_Report_DESKTOP-PROD04_${Math.floor(1000 + Math.random() * 9000)}.txt`;
        setGeneratedReports(prev => [newRep, ...prev]);
        addLine('Generating comprehensive maintenance audit report...', 'cyan');
        await new Promise(r => setTimeout(r, 400));
        addLine(`Report written to: %USERPROFILE%\\Documents\\MultiThinker\\Reports\\${newRep}`, 'green');
      } else if (subCmd === '2') {
        addLine('Existing reports in %USERPROFILE%\\Documents\\MultiThinker\\Reports:', 'cyan');
        generatedReports.forEach(r => addLine(`   * ${r}`, 'white'));
      } else if (subCmd === '4') {
        addLine('=== MOST RECENT REPORT CONTENT ===', 'bold');
        addLine('Date & Time: 2026-11-02 18:45:00 PKT', 'white');
        addLine('Computer: DESKTOP-PROD04 | User: salman.mehdi', 'white');
        addLine('CPU: Intel Core i7-13700 | RAM: 16 GB Physical', 'white');
        addLine('Storage: Drive C: 133 GB Free', 'white');
        addLine('Network: 192.168.10.45 / Gateway: 192.168.10.1 (Reachable, 12ms)', 'green');
        addLine('Firewall: Domain Profile=ON, Private=ON, Public=ON', 'green');
        addLine('Generated by MultiThinker Ultimate PC Toolkit | Syed Salman Mehdi', 'cyan');
      }
    } else if (modId === 13) {
      if (subCmd === '1') {
        window.open(`https://${DEVELOPER_INFO.linkedin}`, '_blank');
        addLine(`Dispatched browser to: https://${DEVELOPER_INFO.linkedin}`, 'green');
      } else if (subCmd === '2') {
        window.location.href = `mailto:${DEVELOPER_INFO.email}?subject=Job%20Inquiry%20-%20MultiThinker%20PC%20Toolkit`;
        addLine(`Opened mail client for: ${DEVELOPER_INFO.email}`, 'green');
      } else {
        addLine(`Settings preference [${subCmd}] toggled.`, 'green');
      }
    } else {
      addLine(`Selection [${subCmd}] executed successfully.`, 'green');
    }

    addLine(' ', 'white');
    addLine('Press "B" to return to main menu or select another option.', 'yellow');
    setIsProcessing(false);
  };

  // Module 12: Interview Demo Mode
  const startInterviewDemo = () => {
    setCurrentScreen('demo');
    setDemoStep(1);
    setLines([
      ...renderHeader(),
      { text: ' ', type: 'white' },
      { text: '   ==============================================================================', type: 'green' },
      { text: '   INTERVIEW DEMO MODE: GUIDED READ-ONLY PORTFOLIO WALKTHROUGH', type: 'bold' },
      { text: '   ==============================================================================', type: 'green' },
      { text: ' ', type: 'white' },
      { text: '   Welcome to the MultiThinker Ultimate PC Toolkit live presentation mode!', type: 'white' },
      { text: '   This mode is specifically engineered for live technical job interviews:', type: 'white' },
      { text: '   * 100% Safe & Non-Destructive: Never deletes files, changes registry, or drops connections.', type: 'cyan' },
      { text: '   * No Elevation Required: Operates cleanly under standard user credentials.', type: 'cyan' },
      { text: '   * Guided 7-Step Tour: Showcases diagnostic philosophy, anti-injection, and report generation.', type: 'cyan' },
      { text: `   Candidate: ${DEVELOPER_INFO.name} (${DEVELOPER_INFO.title}, ${DEVELOPER_INFO.org})`, type: 'bold' },
      { text: ' ', type: 'white' },
      { text: '   >>> Press Enter or click "Next Demo Step" to begin Step 1 of 7...', type: 'yellow' }
    ]);
  };

  const advanceDemoStep = async () => {
    setIsProcessing(true);
    const nextStep = demoStep + 1;

    if (demoStep === 1) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   DEMO STEP 1 OF 7: SYSTEM AUDIT & OS IDENTIFICATION', type: 'bold' },
        { text: '  ------------------------------------------------------------------------------', type: 'cyan' },
        { text: '   Target Host:        DESKTOP-PROD04', type: 'white' },
        { text: '   Active Account:     salman.mehdi (Domain: HSM-NAWABSHAH)', type: 'white' },
        { text: '   Windows Kernel:     Microsoft Windows 11 Enterprise (Build 22631.3447)', type: 'white' },
        { text: '   Processor:          13th Gen Intel Core i7-13700 (16 Logical Cores)', type: 'white' },
        { text: ' ', type: 'white' },
        { text: '   [ EXPLANATION FOR INTERVIEWER ]', type: 'green' },
        { text: '   "In modern Windows 11 22H2/24H2 builds, wmic.exe has been removed. A resilient', type: 'cyan' },
        { text: '    batch utility must use native APIs like \'ver\', registry queries, and \'systeminfo\'', type: 'cyan' },
        { text: '    to guarantee compatibility across both legacy and state-of-the-art workstations."', type: 'cyan' },
        { text: ' ', type: 'white' },
        { text: '   >>> Press Enter to proceed to Step 2: Network Topology...', type: 'yellow' }
      ]);
      setDemoStep(2);
    } else if (demoStep === 2) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   DEMO STEP 2 OF 7: NETWORK TOPOLOGY & GATEWAY RESOLUTION', type: 'bold' },
        { text: '  ------------------------------------------------------------------------------', type: 'cyan' },
        { text: '   IPv4 Address . . . . . . . . . . . : 192.168.10.45', type: 'green' },
        { text: '   Subnet Mask  . . . . . . . . . . . : 255.255.255.0', type: 'white' },
        { text: '   Default Gateway  . . . . . . . . . : 192.168.10.1', type: 'green' },
        { text: '   DNS Resolver . . . . . . . . . . . : 192.168.10.5 (Habib Sugar Mills DC)', type: 'white' },
        { text: ' ', type: 'white' },
        { text: '   [ EXPLANATION FOR INTERVIEWER ]', type: 'green' },
        { text: '   "In a manufacturing plant like Habib Sugar Mills, fast fault isolation between', type: 'cyan' },
        { text: '    the local switch, default gateway, and corporate WAN is critical. Parsing', type: 'cyan' },
        { text: '    interfaces natively ensures zero dependencies on external diagnostic binaries."', type: 'cyan' },
        { text: ' ', type: 'white' },
        { text: '   >>> Press Enter to proceed to Step 3: Latency & Packet Loss...', type: 'yellow' }
      ]);
      setDemoStep(3);
    } else if (demoStep === 3) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   DEMO STEP 3 OF 7: ICMP LATENCY & PACKET LOSS VERIFICATION', type: 'bold' },
        { text: '  ------------------------------------------------------------------------------', type: 'cyan' },
        { text: '   Pinging primary public DNS (1.1.1.1) with 32 bytes of data:', type: 'white' },
        { text: '   Reply from 1.1.1.1: bytes=32 time=12ms TTL=58', type: 'green' },
        { text: '   Reply from 1.1.1.1: bytes=32 time=13ms TTL=58', type: 'green' },
        { text: '   Round trip times: Minimum = 12ms, Maximum = 13ms, Average = 12ms | Loss: 0%', type: 'bold' },
        { text: ' ', type: 'white' },
        { text: '   [ EXPLANATION FOR INTERVIEWER ]', type: 'green' },
        { text: '   "We execute low-packet pings with strict timeout bounding to prevent UI hangs.', type: 'cyan' },
        { text: '    This gives the technician instant quantitative data on line quality."', type: 'cyan' },
        { text: ' ', type: 'white' },
        { text: '   >>> Press Enter to proceed to Step 4: Storage Partition Free Space...', type: 'yellow' }
      ]);
      setDemoStep(4);
    } else if (demoStep === 4) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   DEMO STEP 4 OF 7: STORAGE PARTITION FREE SPACE AUDIT', type: 'bold' },
        { text: '  ------------------------------------------------------------------------------', type: 'cyan' },
        { text: '   Volume C:\\ (NVMe OS)   - Free Space: 142,849,120,256 bytes (133 GB Free / 512 GB)', type: 'green' },
        { text: '   Volume D:\\ (Data Vault)- Free Space: 412,982,546,432 bytes (384 GB Free / 1000 GB)', type: 'green' },
        { text: ' ', type: 'white' },
        { text: '   [ EXPLANATION FOR INTERVIEWER ]', type: 'green' },
        { text: '   "Low disk space on drive C: is a primary cause of Windows Update corruption', type: 'cyan' },
        { text: '    and swap file thrashing. We safely audit storage before running any maintenance."', type: 'cyan' },
        { text: ' ', type: 'white' },
        { text: '   >>> Press Enter to proceed to Step 5: Wi-Fi Interface & Security...', type: 'yellow' }
      ]);
      setDemoStep(5);
    } else if (demoStep === 5) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   DEMO STEP 5 OF 7: WI-FI INTERFACE & SECURITY POSTURE', type: 'bold' },
        { text: '  ------------------------------------------------------------------------------', type: 'cyan' },
        { text: '   Wi-Fi Interface: Intel Wi-Fi 6 AX201 (Connected)', type: 'green' },
        { text: '   Active SSID:     HSM_PLANT_STAFF_5G (Signal: 94% / WPA2-Enterprise)', type: 'green' },
        { text: '   Radio Type:      802.11ax / Channel: 48 (5 GHz)', type: 'white' },
        { text: ' ', type: 'white' },
        { text: '   [ EXPLANATION FOR INTERVIEWER ]', type: 'green' },
        { text: '   "Our Wi-Fi module strictly complies with enterprise security: it reports SSID,', type: 'cyan' },
        { text: '    BSSID, signal ratio and cipher types, but deliberately never exposes cleartext', type: 'cyan' },
        { text: '    passwords, preventing unauthorized credential leakage during field audits."', type: 'cyan' },
        { text: ' ', type: 'white' },
        { text: '   >>> Press Enter to proceed to Step 6: Defender & Firewall Defense...', type: 'yellow' }
      ]);
      setDemoStep(6);
    } else if (demoStep === 6) {
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   DEMO STEP 6 OF 7: DEFENDER & FIREWALL INTEGRITY', type: 'bold' },
        { text: '  ------------------------------------------------------------------------------', type: 'cyan' },
        { text: '   Windows Defender Service (WinDefend): RUNNING (Automatic)', type: 'green' },
        { text: '   Firewall Domain Profile State:        ON', type: 'green' },
        { text: '   Firewall Private Profile State:       ON', type: 'green' },
        { text: '   Firewall Public Profile State:        ON', type: 'green' },
        { text: ' ', type: 'white' },
        { text: '   [ EXPLANATION FOR INTERVIEWER ]', type: 'green' },
        { text: '   "Endpoint security rules require verifying that Domain, Private, and Public', type: 'cyan' },
        { text: '    profiles are active. Our toolkit verifies security state without altering rules."', type: 'cyan' },
        { text: ' ', type: 'white' },
        { text: '   >>> Press Enter to proceed to Step 7: Final Signed Report & Conclusion...', type: 'yellow' }
      ]);
      setDemoStep(7);
    } else if (demoStep === 7) {
      const demoRepName = `MUPT_Interview_Showcase_${Math.floor(1000 + Math.random() * 9000)}.txt`;
      setGeneratedReports(prev => [demoRepName, ...prev]);
      setLines([
        ...renderHeader(),
        { text: ' ', type: 'white' },
        { text: '   DEMO STEP 7 OF 7: GENERATING SIGNED AUDIT REPORT', type: 'bold' },
        { text: '  ------------------------------------------------------------------------------', type: 'cyan' },
        { text: `   Compiled verified parameters into: %USERPROFILE%\\Documents\\MultiThinker\\Reports\\${demoRepName}`, type: 'green' },
        { text: ' ', type: 'white' },
        { text: '   ==============================================================================', type: 'cyan' },
        { text: '   WHAT THIS DEMONSTRATES TO AN EMPLOYER / INTERVIEW PANEL:', type: 'bold' },
        { text: '   ==============================================================================', type: 'cyan' },
        { text: '   1. Engineering Rigor: Native Batch code written with modular subroutines, safe quoting,', type: 'green' },
        { text: '      zero dangerous wildcards, and clean errorlevel trapping.', type: 'white' },
        { text: '   2. Enterprise Security Awareness: Respects least-privilege principles, asks for elevation', type: 'green' },
        { text: '      only when needed, and refuses to leak stored passwords.', type: 'white' },
        { text: '   3. Industrial Practicality: Built for real production workstations where installing Python,', type: 'green' },
        { text: '      PowerShell scripts (Restricted policy), or third-party EXEs is prohibited by security policy.', type: 'white' },
        { text: `   4. Candidate Initiative: Syed Salman Mehdi brings production experience from`, type: 'green' },
        { text: `      Habib Sugar Mills Ltd, Nawabshah, solving real technical problems.`, type: 'white' },
        { text: '   ==============================================================================', type: 'cyan' },
        { text: ' ', type: 'white' },
        { text: '   >>> Press "B" or Enter to return to main menu.', type: 'yellow' }
      ]);
      setDemoStep(1);
    }

    setIsProcessing(false);
  };

  // Run Tests Harness
  const runTestSuite = async () => {
    setIsProcessing(true);
    setCurrentScreen('tests');
    setLines([
      { text: '==============================================================================', type: 'cyan' },
      { text: '   MULTITHINKER AUTOMATED QA TEST HARNESS (MultiThinker_Tests.bat)', type: 'bold' },
      { text: `   Version: v2.5.0-TDD  |  Developer: ${DEVELOPER_INFO.name} (${DEVELOPER_INFO.org})`, type: 'white' },
      { text: '   Invariant Guarantee: All tests execute in NON-DESTRUCTIVE SIMULATED MODE.', type: 'green' },
      { text: '==============================================================================', type: 'cyan' },
      { text: ' ', type: 'white' },
      { text: '  EXECUTING UNIT TEST SUITE (15 Tests):', type: 'bold' }
    ]);

    const unitTests = [
      'UT-01: Windows Kernel Version String Detection [Result: 10.0.22631]',
      'UT-02: Privilege Elevation (net session) Invariant Check [Result: Verified]',
      'UT-03: Spaces in Userprofile & Path Building Resilience [Result: Quoting Verified]',
      'UT-04: Automated Report Directory Creation & Verification [Directory Confirmed]',
      'UT-05: Malicious Shell Metacharacter Input Sanitization [Tokens Intercepted]',
      'UT-06: Clean IP/Hostname Acceptance Filter [1.1.1.1 Validated]',
      'UT-07: Cleanup Path Boundary Validation (No System Drives/Dirs) [Bounds Verified]',
      'UT-08: Wi-Fi Interface Query Graceful Degrade [No Crash Trap Confirmed]',
      'UT-09: Developer Optional Field Suppression [Zero Blank Lines Confirmed]',
      'UT-10: WMIC Deprecation Alternative (Native Registry CPU Query) [Query OK]',
      'UT-11: Network Adapter Enumeration Check (netsh interface show interface) [OK]',
      'UT-12: DNS Resolver Cache Flush Native Binary Test (ipconfig) [OK]',
      'UT-13: Activity Logger Subroutine Execution & File Append [Write Confirmed]',
      'UT-14: Ping-Based Delay Subroutine Invariant (No Timeout Crash) [OK]',
      'UT-15: Menu Bounds Input Filter [0 to 13 Range Verified]'
    ];

    for (const ut of unitTests) {
      await new Promise(r => setTimeout(r, 90));
      addLine(`   [ PASS ] ${ut}`, 'green');
    }

    addLine(' ', 'white');
    addLine('  EXECUTING INTEGRATION WORKFLOW SUITE (10 Tests):', 'bold');

    const intTests = [
      'IT-01: Quick Maintenance Workflow Simulation [Complete 5-step pipeline validated]',
      'IT-02: Network Diagnostic Pipeline Simulation [Layer 2/3 diagnostic pipeline verified]',
      'IT-03: Wi-Fi Manager Profile Query & Credential Shield [Zero cleartext password leakage]',
      'IT-04: Diagnostics & Performance Pipeline Simulation [Registry CPU read verified]',
      'IT-05: Storage Cleanup Safety Guarantee Simulation [Zero user documents touch policy confirmed]',
      'IT-06: Windows Repair Administrative Privilege Gate Check [Safe block with instructions]',
      'IT-07: Internet Speedtest Browser Dispatch Invariant [Cloudflare & Ookla targets verified]',
      'IT-08: Security Center Audit & Defender Verification [WinDefend status query verified]',
      'IT-09: Interview Demo Mode 7-Stage Walkthrough Simulation [100% Read-only walkthrough validated]',
      'IT-10: Maintenance Report File Generation & Integrity Check [File write verified]'
    ];

    for (const it of intTests) {
      await new Promise(r => setTimeout(r, 110));
      addLine(`   [ PASS ] ${it}`, 'green');
    }

    addLine(' ', 'white');
    addLine('==============================================================================', 'cyan');
    addLine('  AUTOMATED TEST HARNESS - FINAL SUMMARY', 'bold');
    addLine('==============================================================================', 'cyan');
    addLine('   Total Test Invariants:  25', 'white');
    addLine('   Tests Passed:           25', 'green');
    addLine('   Tests Failed:           0', 'white');
    addLine('   Tests Skipped:          0', 'white');
    addLine('   STATUS: ALL TESTS PASSED SUCCESSFULLY (Exit Code 0).', 'green');
    addLine('   Execution Report Saved: %USERPROFILE%\\Documents\\MultiThinker\\Reports\\Test_Run_Automated.txt', 'cyan');
    addLine('==============================================================================', 'cyan');
    addLine(' ', 'white');
    addLine('Press "B" or Enter to return to main menu.', 'yellow');

    setIsProcessing(false);
  };

  const copyTerminalOutput = () => {
    const textToCopy = lines.map(l => l.text).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top Controls Toolbar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          </div>
          <span className="text-xs font-mono text-slate-400 font-medium">
            Command Prompt - {DEVELOPER_INFO.brand} MUPT {DEVELOPER_INFO.version}
          </span>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Elevation:</span>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-2 py-0.5 text-xs font-medium rounded flex items-center gap-1.5 transition-colors ${
                isAdmin 
                  ? 'bg-red-950 text-red-300 border border-red-800 hover:bg-red-900' 
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
              title="Click to toggle simulated Administrator elevation"
            >
              {isAdmin ? (
                <>
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  <span>Elevated (Admin)</span>
                </>
              ) : (
                <>
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Standard User</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => renderMainMenu()}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded transition-colors flex items-center gap-1.5"
            title="Return to Main Menu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Main Menu</span>
          </button>
          <button
            onClick={() => startInterviewDemo()}
            className="px-2.5 py-1 text-xs font-medium text-cyan-300 bg-cyan-950/70 border border-cyan-800 hover:bg-cyan-900 rounded transition-colors flex items-center gap-1.5"
            title="Start Interview Demo Mode"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interview Demo</span>
          </button>
          <button
            onClick={() => runTestSuite()}
            className="px-2.5 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/70 border border-emerald-800 hover:bg-emerald-900 rounded transition-colors flex items-center gap-1.5"
            title="Execute MultiThinker_Tests.bat"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Run Test Harness</span>
          </button>
          <button
            onClick={copyTerminalOutput}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded transition-colors flex items-center gap-1.5"
            title="Copy terminal text to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Output'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Terminal Window */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#060c18] shadow-2xl flex flex-col h-[640px]">
        {/* Terminal Screen Output Area */}
        <div className="flex-1 p-5 font-mono text-[13px] leading-relaxed overflow-y-auto select-text selection:bg-cyan-900 selection:text-white">
          {lines.map((line, idx) => {
            let colorClass = 'text-slate-200';
            if (line.type === 'cyan') colorClass = 'text-cyan-400';
            if (line.type === 'green') colorClass = 'text-emerald-400 font-medium';
            if (line.type === 'yellow') colorClass = 'text-amber-400';
            if (line.type === 'red') colorClass = 'text-rose-400 font-semibold';
            if (line.type === 'gray') colorClass = 'text-slate-500';
            if (line.type === 'bold') colorClass = 'text-white font-bold tracking-wide';

            return (
              <div key={idx} className={`${colorClass} whitespace-pre-wrap break-all min-h-[1.25rem]`}>
                {line.text}
              </div>
            );
          })}
          {isProcessing && (
            <div className="flex items-center gap-2 text-cyan-400 text-xs py-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Executing batch command subroutine...</span>
            </div>
          )}
          <div ref={terminalEndRef} />
        </div>

        {/* Interactive CLI Prompt Bar */}
        <form onSubmit={handleInputSubmit} className="bg-[#040810] border-t border-slate-800/80 px-4 py-3 flex items-center gap-3">
          <span className="font-mono text-cyan-400 font-semibold text-sm shrink-0">
            C:\Tools\MUPT&gt;
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isProcessing}
            placeholder={
              currentScreen === 'main' 
                ? 'Type selection [0-13] or click below...' 
                : currentScreen === 'demo'
                  ? 'Press Enter for next demo step, or "B" to go back'
                  : 'Type command option (e.g. 1, 2, B) and press Enter...'
            }
            className="flex-1 bg-transparent font-mono text-sm text-cyan-300 focus:outline-none placeholder:text-slate-600 disabled:opacity-50"
            autoFocus
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded transition-colors whitespace-nowrap"
          >
            Send (Enter)
          </button>
        </form>

        {/* Quick Menu Button Dock (For rapid interview / review clicking) */}
        <div className="bg-[#050a14] border-t border-slate-900 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 font-mono text-[11px] shrink-0">Quick Options:</span>
          {currentScreen === 'main' && (
            <>
              <button 
                onClick={() => processCommand('1')} 
                className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded whitespace-nowrap"
              >
                1. Quick Maint
              </button>
              <button 
                onClick={() => processCommand('2')} 
                className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded whitespace-nowrap"
              >
                2. Network
              </button>
              <button 
                onClick={() => processCommand('3')} 
                className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded whitespace-nowrap"
              >
                3. Wi-Fi
              </button>
              <button 
                onClick={() => processCommand('4')} 
                className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded whitespace-nowrap"
              >
                4. Diagnostics
              </button>
              <button 
                onClick={() => processCommand('5')} 
                className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded whitespace-nowrap"
              >
                5. Cleaning
              </button>
              <button 
                onClick={() => processCommand('6')} 
                className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded whitespace-nowrap"
              >
                6. Repair
              </button>
              <button 
                onClick={() => processCommand('9')} 
                className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded whitespace-nowrap"
              >
                9. System Info
              </button>
              <button 
                onClick={() => processCommand('12')} 
                className="px-2 py-1 bg-emerald-950/70 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900 rounded whitespace-nowrap font-medium"
              >
                12. Demo Mode
              </button>
              <button 
                onClick={() => processCommand('13')} 
                className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded whitespace-nowrap"
              >
                13. About/Contact
              </button>
            </>
          )}

          {currentScreen === 'demo' && (
            <>
              <button 
                onClick={() => advanceDemoStep()} 
                className="px-2.5 py-1 bg-cyan-900 text-cyan-200 hover:bg-cyan-800 rounded whitespace-nowrap font-medium"
              >
                Next Demo Step ({demoStep}/7)
              </button>
              <button 
                onClick={() => renderMainMenu()} 
                className="px-2.5 py-1 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded whitespace-nowrap"
              >
                Exit Demo (B)
              </button>
            </>
          )}

          {currentScreen === 'module' && (
            <>
              <button 
                onClick={() => renderMainMenu()} 
                className="px-2 py-1 bg-amber-950/70 text-amber-300 border border-amber-800/70 hover:bg-amber-900 rounded whitespace-nowrap"
              >
                [B] Back to Main Menu
              </button>
              {activeModuleId === 2 && (
                <>
                  <button onClick={() => handleModuleSubCommand(2, '1')} className="px-2 py-1 bg-slate-800 text-slate-300 rounded whitespace-nowrap">ipconfig /all</button>
                  <button onClick={() => handleModuleSubCommand(2, '4')} className="px-2 py-1 bg-slate-800 text-slate-300 rounded whitespace-nowrap">Ping 8.8.8.8</button>
                  <button onClick={() => handleModuleSubCommand(2, '10')} className="px-2 py-1 bg-red-950 text-red-300 rounded whitespace-nowrap">Reset Winsock</button>
                </>
              )}
              {activeModuleId === 3 && (
                <>
                  <button onClick={() => handleModuleSubCommand(3, '1')} className="px-2 py-1 bg-slate-800 text-slate-300 rounded whitespace-nowrap">Active Connection</button>
                  <button onClick={() => handleModuleSubCommand(3, '2')} className="px-2 py-1 bg-slate-800 text-slate-300 rounded whitespace-nowrap">Saved Profiles</button>
                  <button onClick={() => handleModuleSubCommand(3, 'H')} className="px-2 py-1 bg-slate-800 text-slate-300 rounded whitespace-nowrap">Ethical Policy</button>
                </>
              )}
              {activeModuleId === 6 && (
                <>
                  <button onClick={() => handleModuleSubCommand(6, '1')} className="px-2 py-1 bg-slate-800 text-slate-300 rounded whitespace-nowrap">SFC /scannow</button>
                  <button onClick={() => handleModuleSubCommand(6, '2')} className="px-2 py-1 bg-slate-800 text-slate-300 rounded whitespace-nowrap">DISM CheckHealth</button>
                </>
              )}
              {activeModuleId === 9 && (
                <button onClick={() => handleModuleSubCommand(9, 'E')} className="px-2 py-1 bg-cyan-950 text-cyan-300 rounded whitespace-nowrap">Export Report (E)</button>
              )}
            </>
          )}

          {currentScreen === 'tests' && (
            <button 
              onClick={() => renderMainMenu()} 
              className="px-2 py-1 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded whitespace-nowrap"
            >
              Return to Main Menu
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
