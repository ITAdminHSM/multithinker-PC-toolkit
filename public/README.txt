================================================================================
MULTITHINKER ULTIMATE PC TOOLKIT (MUPT) - VERSION 2.5.0 ENTERPRISE EDITION
Professional Windows Maintenance, Diagnostics & IT Systems Engineering Suite
================================================================================

DEVELOPER IDENTITY & PORTFOLIO CONTACT
--------------------------------------------------------------------------------
Developer:             Syed Salman Mehdi
Brand Name:            MultiThinker
Professional Title:    IT Officer
Current Organization:  Habib Sugar Mills Ltd, Nawabshah
Location:              Nawabshah, Sindh, Pakistan
Email Address:         salmanmehdi@gmail.com
Phone / WhatsApp:      0333-7011728 (International: +92 333 7011728)
LinkedIn Profile:      linkedin.com/in/multithinker
Tagline:               "Reliable. Safe. Professional."

DISCLAIMER: This software is an independent professional technical portfolio project
engineered by Syed Salman Mehdi to demonstrate enterprise systems administration,
defensive automation scripting, and IT support disciplines. It is not an official
product of any employer.

================================================================================
PROJECT PURPOSE & PHILOSOPHY
================================================================================
The Multithinker Ultimate PC Toolkit (MUPT) is built specifically for production
and industrial IT environments (such as continuous manufacturing plants, corporate
LANs, and remote field workstations) where:
1. Third-party executables (.exe) or untrusted downloads are blocked by endpoint policies.
2. PowerShell script execution is frequently restricted (ExecutionPolicy Restricted / AllSigned).
3. Runtime dependencies like Python, Node.js, or Java do NOT exist on client PCs.
4. Windows 11 updates have permanently removed legacy utilities such as 'wmic.exe'.
5. Field technicians require a reliable, zero-install, safe-by-default utility that
   can run directly from a USB stick or network share on Windows 10 and Windows 11.

MUPT adheres to strict software safety principles:
- Zero Destructive Actions by Default: Never wipes user downloads, documents, desktop,
  browser databases, or saved passwords.
- No Fake Optimizations: Never advertises "RAM Cleaners" or "Registry Boosters" (which
  degrade Windows caching algorithms and risk OS stability).
- Controlled Elevation: Operates gracefully under standard user privileges and requests
  Administrator elevation ONLY when executing low-level system repairs (SFC, DISM, Winsock).
- Ethical Security: Never extracts or displays saved Wi-Fi cleartext passwords.

================================================================================
SYSTEM REQUIREMENTS & RUNTIME SPECIFICATIONS
================================================================================
- Operating System:     Windows 10 (all versions) & Windows 11 (including 22H2, 23H2, 24H2)
- Architecture:         x64, x86, ARM64 (Native command interpreter)
- Script Interpreter:   Windows Command Processor (cmd.exe / Batch)
- Dependencies:         100% Native Windows binaries only (no external installs)
- User Rights:          Standard User supported for diagnostics; Administrator for repairs

================================================================================
MODULE CAPABILITIES BREAKDOWN
================================================================================

[ 1] QUICK MAINTENANCE
     One-click preventative maintenance cycle. Flushes DNS cache (ipconfig /flushdns),
     clears safe user temporary caches (%TEMP%), synchronizes system clock via NTP
     (w32tm /resync), tests dual-target internet connectivity (1.1.1.1 & 8.8.8.8),
     and audits primary volume free space. Produces a pass/fail/skipped summary.
     Never reboots silently.

[ 2] NETWORK TOOLKIT
     Comprehensive Layer 2 and Layer 3 diagnostic station.
     - View detailed IP, Gateway, DNS, and DHCP lease assignments.
     - Release and renew DHCP leases with warning dialogs.
     - ICMP ping benchmarking against local gateway, Google DNS, Cloudflare DNS.
     - Custom ping with shell metacharacter injection filters.
     - Continuous ping with graceful Ctrl+C interruption instructions.
     - Traceroute (tracert) and DNS query resolver (nslookup).
     - Physical network adapter and MAC address inventory (getmac, netsh).
     - Factory reset of Winsock catalog & TCP/IP stack (requires elevation & confirmation).

[ 3] WI-FI MANAGER
     Enterprise wireless adapter and profile auditor.
     - Real-time connection metrics: SSID, BSSID, Radio type, Signal strength %, Cipher.
     - Enumerates all saved Wi-Fi profiles on the workstation.
     - Wireless hardware driver capabilities (netsh wlan show drivers).
     - Connect or reconnect to existing saved profiles.
     - Forget specific profiles or purge all stored networks with explicit confirmation.
     - Restart wireless adapter (disable/enable cycle) for resolving stuck NIC states.
     - Plant floor Wi-Fi interference and roaming troubleshooting guide.
     * ETHICAL GUARANTEE: Never extracts or dumps cleartext Wi-Fi passwords.

[ 4] SYSTEM DIAGNOSTICS & PERFORMANCE
     Empirical hardware auditing without deprecated WMIC.
     - Memory audit: Physical total, physical available, pagefile commit ratio.
     - CPU identification: Processor string, frequency, and core count via HKLM registry.
     - Boot time, uptime calculations, and network workstation statistics.
     - Startup application auditor querying both HKCU and HKLM Run registries.
     - Safe Windows Explorer shell restart (refreshes UI without terminating user programs).
     - Live process inventory.

[ 5] PC CLEANING & STORAGE OPTIMIZATION
     Surgically clean disposable junk without collateral damage.
     - Purges %TEMP% user files while safely bypassing locked/in-use handles.
     - Purges %WINDIR%\Temp system caches when running as Administrator.
     - Empties Windows Recycle Bin ($Recycle.Bin) upon user confirmation.
     - Clears Windows Error Reporting (WER) queue crash logs.
     - Launches native Windows Disk Cleanup (cleanmgr.exe) with custom drive switches.

[ 6] WINDOWS REPAIR & INTEGRITY VERIFICATION
     Automated operating system component store and file repair.
     - System File Checker (sfc /scannow) to replace corrupted protected system files.
     - DISM /CheckHealth: Instant flag check for component store corruption.
     - DISM /ScanHealth: In-depth byte-level image scanning.
     - DISM /RestoreHealth: Automated repair using Windows Update payload sources.
     - Management launchers: Windows Update, Device Manager, Services, Event Viewer.
     * Clear warnings regarding execution duration; no automated interruptions.

[ 7] INTERNET SPEED & LATENCY BENCHMARKS
     Transparent network quality assessment.
     - Dispatches browser tests to Cloudflare Speed Test and Ookla Speedtest.
     - Native 10-packet latency and jitter evaluation.
     - 20-packet packet loss stress test to diagnose drop rates.
     - DNS query benchmarking measuring response time for corporate and public hostnames.

[ 8] SECURITY TOOLS & DEFENDER AUDITOR
     Endpoint security compliance verification.
     - Queries Windows Defender (WinDefend) service active status.
     - Inspects Windows Firewall states across Domain, Private, and Public profiles.
     - Dispatches Microsoft Defender Antivirus quick scan via MpCmdRun.exe command utility.
     - Launches Windows Security Center dashboard and Advanced Firewall MMC.
     - Enterprise endpoint security hardening checklist for industrial environments.

[ 9] SYSTEM INFORMATION AUDIT
     Complete hardware and software inventory in one structured screen.
     - Hostname, username, user domain, and elevation tier.
     - Windows kernel build, OS edition, and release version (e.g. 23H2 / 24H2).
     - Processor architecture and logical core count.
     - Storage volume inventory: Drive letter, partition presence, free space in bytes.
     - Active IPv4 addresses and default gateways.
     - Direct export feature saving signed audit reports to disk.

[10] ADVANCED UTILITIES & CONSOLES
     Instant access to essential Windows management consoles:
     - Task Manager (taskmgr.exe)
     - Resource Monitor (resmon.exe)
     - Performance Monitor (perfmon.exe)
     - Computer Management (compmgmt.msc)
     - Device Manager (devmgmt.msc)
     - System Information (msinfo32.exe)
     - Windows Terminal (wt.exe) or clean Command Prompt shell.
     - Integrated MUPT Maintenance Activity Log viewer.

[11] MAINTENANCE REPORTS
     Audit trail management for field work and customer sign-off.
     - Automatically generates structured text reports.
     - Stores reports in %USERPROFILE%\Documents\MultiThinker\Reports.
     - View most recent report directly in the console.
     - Direct folder shortcut opening File Explorer.

[12] INTERVIEW DEMO MODE (100% READ-ONLY SHOWCASE)
     Designed specifically for live presentation to hiring managers and technical panels:
     - Runs 100% read-only with zero elevation required.
     - 7-step guided presentation covering OS detection, networking, ping latency,
       storage inspection, wireless security, firewall audit, and report generation.
     - Features conversational technical talking points explaining "Why" each choice was made.
     - Concludes with an engineering discipline overview highlighting defensive coding,
       errorlevel trapping, and zero-dependency reliability.

[13] SETTINGS, ABOUT & CONTACT DEVELOPER
     Complete developer card for Syed Salman Mehdi with direct interactive actions:
     - Open LinkedIn profile in web browser.
     - Initiate mailto email client to salmanmehdi@gmail.com.
     - Toggle animated splash screen on or off.
     - Toggle ANSI virtual terminal colors (with plain ASCII fallback).

================================================================================
REPORT FORMAT & FOOTER SIGNATURE
================================================================================
All generated reports feature a standardized, tamper-evident audit header and footer:

  Generated by MultiThinker Ultimate PC Toolkit | Syed Salman Mehdi
  IT Officer | Habib Sugar Mills Ltd, Nawabshah
  Email: salmanmehdi@gmail.com | WhatsApp: 0333-7011728
  LinkedIn: linkedin.com/in/multithinker
  Tagline: "Reliable. Safe. Professional."

================================================================================
CONTACT & CREDENTIALS
================================================================================
For job inquiries, technical discussions, or code review:
- Developer: Syed Salman Mehdi
- Phone / WhatsApp: +92 333 7011728
- Email: salmanmehdi@gmail.com
- LinkedIn: https://linkedin.com/in/multithinker
- Nawabshah, Sindh, Pakistan
================================================================================
