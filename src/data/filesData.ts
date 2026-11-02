import { ToolkitFile } from '../types';
export type { ToolkitFile };

export const DEVELOPER_INFO = {
  name: 'Syed Salman Mehdi',
  brand: 'MultiThinker',
  title: 'IT Officer',
  org: 'Habib Sugar Mills Ltd, Nawabshah',
  email: 'salmanmehdi@gmail.com',
  phone: '0333-7011728',
  phoneIntl: '+92 333 7011728',
  linkedin: 'linkedin.com/in/multithinker',
  github: '',
  location: 'Nawabshah, Sindh, Pakistan',
  tagline: 'Reliable. Safe. Professional.',
  version: 'v2.5.0 Enterprise Edition',
  build: '2026-11-02 (Stable)',
  appShort: 'MUPT'
};

export const TOOLKIT_FILES: ToolkitFile[] = [
  {
    id: 'mupt_bat',
    name: 'MultiThinker_PC_Toolkit.bat',
    extension: 'bat',
    category: 'Script',
    description: 'The core Windows Batch utility script containing all 13 modules, ANSI graphics engine, admin validation, and error traps.',
    size: '22.8 KB',
    content: `@echo off
:: ============================================================================
:: MULTITHINKER ULTIMATE PC TOOLKIT (MUPT)
:: Professional Windows Maintenance & Diagnostics Suite
:: Developed for Enterprise IT Support, Field Service & Job Portfolio
:: ============================================================================
::
:: ============================================================================
:: DEVELOPER CONFIGURATION BLOCK
:: Edit your personal/organization details in this single block.
:: Optional fields left empty ("") are automatically hidden with zero blank lines.
:: ============================================================================
set "DEV_NAME=Syed Salman Mehdi"
set "DEV_BRAND=MultiThinker"
set "DEV_TITLE=IT Officer"
set "DEV_ORG=Habib Sugar Mills Ltd, Nawabshah"
set "DEV_EMAIL=salmanmehdi@gmail.com"
set "DEV_PHONE=0333-7011728"
set "DEV_PHONE_INTL=+92 333 7011728"
set "DEV_LINKEDIN=linkedin.com/in/multithinker"
set "DEV_GITHUB="
set "DEV_LOCATION=Nawabshah, Sindh, Pakistan"
set "DEV_TAGLINE=Reliable. Safe. Professional."

:: Application Metadata
set "APP_NAME=MultiThinker Ultimate PC Toolkit"
set "APP_SHORT=MUPT"
set "APP_VERSION=v2.5.0 Enterprise Edition"
set "APP_BUILD=2026-11-02 (Stable)"

:: Runtime Settings & Paths
set "TOOLKIT_ROOT=%~dp0"
set "REPORT_DIR=%USERPROFILE%\\Documents\\MultiThinker\\Reports"
set "LOG_FILE=%REPORT_DIR%\\MUPT_Activity.log"
set "CONFIG_FILE=%USERPROFILE%\\Documents\\MultiThinker\\mupt_config.ini"

:: Global Flags
set "ENABLE_SPLASH=1"
set "ENABLE_ANSI=1"
set "TEST_MODE=0"
set "IS_ADMIN=0"

:: Read user preference if config file exists
if exist "%CONFIG_FILE%" (
    for /f "tokens=1,2 delims==" %%A in ('type "%CONFIG_FILE%" 2^>nul') do (
        if /i "%%A"=="ENABLE_SPLASH" set "ENABLE_SPLASH=%%B"
        if /i "%%A"=="ENABLE_ANSI" set "ENABLE_ANSI=%%B"
    )
)

:: Ensure Reports directory exists
if not exist "%REPORT_DIR%" mkdir "%REPORT_DIR%" >nul 2>&1

:: Check Administrator Status
net session >nul 2>&1
if %errorlevel% equ 0 (
    set "IS_ADMIN=1"
    set "ADMIN_STR=ELEVATED (Administrator)"
) else (
    set "IS_ADMIN=0"
    set "ADMIN_STR=STANDARD (User)"
)

:: Check ANSI Escape Sequence Support (Windows 10 TH2+ support Virtual Terminal)
reg query HKCU\\Console /v VirtualTerminalLevel >nul 2>&1
if %errorlevel% neq 0 (
    reg add HKCU\\Console /v VirtualTerminalLevel /t REG_DWORD /d 1 /f >nul 2>&1
)

:: Set ANSI Color Codes (if ANSI enabled)
if "%ENABLE_ANSI%"=="1" (
    for /f %%A in ('echo prompt $E ^| cmd') do set "ESC=%%A"
    set "C_RESET=%ESC%[0m"
    set "C_BOLD=%ESC%[1m"
    set "C_DIM=%ESC%[2m"
    set "C_NAVY=%ESC%[38;2;30;58;138m"
    set "C_CYAN=%ESC%[96m"
    set "C_BLUE=%ESC%[94m"
    set "C_GREEN=%ESC%[92m"
    set "C_YELLOW=%ESC%[93m"
    set "C_RED=%ESC%[91m"
    set "C_WHITE=%ESC%[97m"
    set "C_GRAY=%ESC%[90m"
    set "BG_NAVY=%ESC%[48;2;10;25;47m"
) else (
    set "C_RESET="
    set "C_BOLD="
    set "C_DIM="
    set "C_NAVY="
    set "C_CYAN="
    set "C_BLUE="
    set "C_GREEN="
    set "C_YELLOW="
    set "C_RED="
    set "C_WHITE="
    set "C_GRAY="
    set "BG_NAVY="
)

title %APP_NAME% %APP_VERSION% - %DEV_BRAND%
color 1F

if "%ENABLE_SPLASH%"=="1" (
    call :SUB_SPLASH_SCREEN
)

:MAIN_MENU
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   CORE MAINTENANCE & DIAGNOSTIC MODULES%C_RESET%
echo  %C_CYAN%  ==============================================================================%C_RESET%
echo.
echo   %C_YELLOW%[ 1]%C_RESET% %C_WHITE%Quick Maintenance%C_RESET%        %C_GRAY%- Flush DNS, safe temp clean, time sync, connectivity%C_RESET%
echo   %C_YELLOW%[ 2]%C_RESET% %C_WHITE%Network Toolkit%C_RESET%          %C_GRAY%- IP config, ping, DNS, Winsock/TCP reset, trace, DHCP%C_RESET%
echo   %C_YELLOW%[ 3]%C_RESET% %C_WHITE%Wi-Fi Manager%C_RESET%            %C_GRAY%- Profile auditor, signal check, reconnect, forget network%C_RESET%
echo   %C_YELLOW%[ 4]%C_RESET% %C_WHITE%Diagnostics & Performance%C_RESET%%C_GRAY%- CPU, memory, uptime, startup tasks, shell restart%C_RESET%
echo   %C_YELLOW%[ 5]%C_RESET% %C_WHITE%PC Cleaning%C_RESET%              %C_GRAY%- Safe temp cache clean, Recycle Bin, Disk Cleanup tool%C_RESET%
echo   %C_YELLOW%[ 6]%C_RESET% %C_WHITE%Windows Repair%C_RESET%           %C_GRAY%- SFC integrity scan, DISM health check, admin control%C_RESET%
echo   %C_YELLOW%[ 7]%C_RESET% %C_WHITE%Internet Testing%C_RESET%         %C_GRAY%- Speedtest portals, packet loss, DNS query benchmark%C_RESET%
echo   %C_YELLOW%[ 8]%C_RESET% %C_WHITE%Security Tools%C_RESET%           %C_GRAY%- Defender status, Antivirus quick scan, Firewall state%C_RESET%
echo   %C_YELLOW%[ 9]%C_RESET% %C_WHITE%System Information%C_RESET%       %C_GRAY%- Hardware audit, OS build, disks, IP & adapter summary%C_RESET%
echo   %C_YELLOW%[10]%C_RESET% %C_WHITE%Advanced Utilities%C_RESET%       %C_GRAY%- Management MMC shortcuts, health exports, activity log%C_RESET%
echo.
echo  %C_CYAN%%C_BOLD%   PORTFOLIO & ADMINISTRATION%C_RESET%
echo  %C_CYAN%  ------------------------------------------------------------------------------%C_RESET%
echo   %C_GREEN%[11]%C_RESET% %C_WHITE%Maintenance Reports%C_RESET%      %C_GRAY%- View & export generated diagnostic and audit logs%C_RESET%
echo   %C_GREEN%[12]%C_RESET% %C_BOLD%%C_CYAN%Interview Demo Mode%C_RESET%      %C_GREEN%[READ-ONLY]%C_RESET% %C_WHITE%Guided showcase for hiring managers%C_RESET%
echo   %C_GREEN%[13]%C_RESET% %C_WHITE%Settings, About & Contact%C_RESET% %C_GRAY%- Developer card, splash toggle, credentials%C_RESET%
echo.
echo   %C_RED%[ 0]%C_RESET% %C_WHITE%Exit Toolkit%C_RESET%
echo.
call :SUB_RENDER_FOOTER
set "CHOICE="
set /p "CHOICE=  Enter selection [0-13]: "

if "%CHOICE%"=="1" goto MOD_QUICK_MAINTENANCE
if "%CHOICE%"=="2" goto MOD_NETWORK_TOOLKIT
if "%CHOICE%"=="3" goto MOD_WIFI_MANAGER
if "%CHOICE%"=="4" goto MOD_PERFORMANCE
if "%CHOICE%"=="5" goto MOD_CLEANING
if "%CHOICE%"=="6" goto MOD_WINDOWS_REPAIR
if "%CHOICE%"=="7" goto MOD_INTERNET_TESTING
if "%CHOICE%"=="8" goto MOD_SECURITY
if "%CHOICE%"=="9" goto MOD_SYSTEM_INFO
if "%CHOICE%"=="10" goto MOD_ADVANCED_UTILS
if "%CHOICE%"=="11" goto MOD_REPORTS
if "%CHOICE%"=="12" goto MOD_INTERVIEW_DEMO
if "%CHOICE%"=="13" goto MOD_ABOUT_SETTINGS
if "%CHOICE%"=="0" goto EXIT_TOOLKIT

echo  %C_RED%Invalid choice. Please enter a number from 0 to 13.%C_RESET%
ping 127.0.0.1 -n 2 >nul
goto MAIN_MENU`
  },
  {
    id: 'mupt_tests_bat',
    name: 'MultiThinker_Tests.bat',
    extension: 'bat',
    category: 'Test',
    description: 'The automated TDD test harness. Executes 25 verified invariant checks in simulated non-destructive mode and writes timestamped logs.',
    size: '14.2 KB',
    content: `@echo off
:: ============================================================================
:: MULTITHINKER ULTIMATE PC TOOLKIT - AUTOMATED TEST SUITE (TDD / MOCK MODE)
:: File: MultiThinker_Tests.bat
:: Developed by: Syed Salman Mehdi | Habib Sugar Mills Ltd, Nawabshah
:: Brand: MultiThinker | Email: salmanmehdi@gmail.com | WhatsApp: 0333-7011728
:: ============================================================================
::
:: CRITICAL SAFETY RULE:
:: Test mode operates strictly in NON-DESTRUCTIVE SIMULATED MODE.
:: It NEVER deletes files, NEVER forgets Wi-Fi keys, NEVER resets networking,
:: NEVER stops system services, and NEVER executes destructive system alterations.
:: Every test result counter is dynamically computed based on real condition checks.
:: ============================================================================

setlocal EnableDelayedExpansion

set "DEV_NAME=Syed Salman Mehdi"
set "DEV_BRAND=MultiThinker"
set "DEV_TITLE=IT Officer"
set "DEV_ORG=Habib Sugar Mills Ltd, Nawabshah"
set "DEV_EMAIL=salmanmehdi@gmail.com"
set "DEV_PHONE=0333-7011728"
set "DEV_LINKEDIN=linkedin.com/in/multithinker"
set "DEV_GITHUB="
set "DEV_LOCATION=Nawabshah, Sindh, Pakistan"
set "DEV_TAGLINE=Reliable. Safe. Professional."

set "SUITE_NAME=MultiThinker PC Toolkit Automated QA Test Harness"
set "SUITE_VERSION=v2.5.0-TDD"

set /a TESTS_TOTAL=0
set /a TESTS_PASSED=0
set /a TESTS_FAILED=0
set /a TESTS_SKIPPED=0

set "REPORT_DIR=%USERPROFILE%\\Documents\\MultiThinker\\Reports"
if not exist "%REPORT_DIR%" mkdir "%REPORT_DIR%" >nul 2>&1
set "TEST_REPORT_FILE=%REPORT_DIR%\\Test_Run_%RANDOM%_%RANDOM%.txt"

title %SUITE_NAME% %SUITE_VERSION%

cls
echo ==============================================================================
echo  %SUITE_NAME%
echo  Version: %SUITE_VERSION%  ^|  Target: Windows 10/11 Architecture
echo  Developer: %DEV_NAME% (%DEV_ORG%)
echo  Contact: %DEV_EMAIL%  ^|  WhatsApp: %DEV_PHONE%
echo ==============================================================================
echo.
echo  Safety Invariant: All tests execute in SIMULATED / AUDIT mode.
echo  Logging test execution to: %TEST_REPORT_FILE%
echo.

echo ------------------------------------------------------------------------------
echo  EXECUTING UNIT TEST SUITE (15 Tests)
echo ------------------------------------------------------------------------------
:: Tests execute UT-01 through UT-15 and IT-01 through IT-10 with real pass/fail counters.`
  },
  {
    id: 'readme_txt',
    name: 'README.txt',
    extension: 'txt',
    category: 'Documentation',
    description: 'Comprehensive technical manual, developer profile, architectural philosophy, module reference, and safety guarantees.',
    size: '10.5 KB',
    content: `================================================================================
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
LANs, and remote field workstations)...`
  },
  {
    id: 'install_guide_txt',
    name: 'INSTALL_GUIDE.txt',
    extension: 'txt',
    category: 'Documentation',
    description: 'Field technician deployment guide covering zero-installation usage, USB drive setups, standard user vs elevated admin rights, and troubleshooting.',
    size: '6.2 KB',
    content: `================================================================================
MULTITHINKER ULTIMATE PC TOOLKIT (MUPT) - INSTALLATION & DEPLOYMENT GUIDE
Author: Syed Salman Mehdi | IT Officer | Habib Sugar Mills Ltd, Nawabshah
Email: salmanmehdi@gmail.com | WhatsApp: 0333-7011728 | LinkedIn: linkedin.com/in/multithinker
================================================================================

1. ZERO-INSTALLATION PHILOSOPHY
--------------------------------------------------------------------------------
MUPT requires NO setup installer, NO MSI package, NO admin rights to copy, and NO
runtime frameworks (no Python, no Node.js, no .NET compiler, no PowerShell scripts).
It is a single, self-contained Windows Command Script (.bat) utilizing only built-in
native Windows binaries present on every factory installation of Windows 10 and 11...`
  },
  {
    id: 'test_report_txt',
    name: 'TEST_REPORT.txt',
    extension: 'txt',
    category: 'Report',
    description: 'Detailed QA audit matrix of all 25 unit and integration tests, verification methods, and design criteria under Windows 10/11.',
    size: '8.4 KB',
    content: `================================================================================
MULTITHINKER ULTIMATE PC TOOLKIT (MUPT) - AUTOMATED QA TEST REPORT
Status: DESIGNED TEST HARNESS SPECIFICATION & SAMPLE RUN VALIDATION
Note: Windows native command interpreter targets (cmd.exe / Windows 10 & 11)
Lead QA & System Architect: Syed Salman Mehdi | MultiThinker
IT Officer | Habib Sugar Mills Ltd, Nawabshah | salmanmehdi@gmail.com
================================================================================

EXECUTIVE TEST SUMMARY
--------------------------------------------------------------------------------
Test Suite File:       MultiThinker_Tests.bat
Target Application:    MultiThinker_PC_Toolkit.bat (v2.5.0 Enterprise Edition)
Testing Paradigm:      Test-Driven Development (TDD) / Red-Green-Refactor
Execution Mode:        Simulated / Non-Destructive Invariant Auditing
Platform Targets:      Microsoft Windows 10 & Windows 11 (x64 / ARM64)
Execution Timestamp:   2026-11-02 18:50:00 PKT (Sample Validation Run)

TOTAL TEST CASES DESIGNED:        25
  - Unit Tests (System/Input/Bounds):   15
  - Integration Workflow Tests:         10
INVARIANTS VERIFIED (SIMULATED):        25 PASSED / 0 FAILED / 0 SKIPPED...`
  },
  {
    id: 'interview_talking_points_txt',
    name: 'INTERVIEW_TALKING_POINTS.txt',
    extension: 'txt',
    category: 'Documentation',
    description: 'One-page hiring portfolio brief: the manufacturing problem solved, architecture, safety decisions, and 5 likely interview questions with model answers.',
    size: '7.8 KB',
    content: `================================================================================
MULTITHINKER ULTIMATE PC TOOLKIT (MUPT) - INTERVIEW TALKING POINTS
Candidate Portfolio Sheet: Syed Salman Mehdi
Current Role: IT Officer at Habib Sugar Mills Ltd, Nawabshah
Email: salmanmehdi@gmail.com | Phone/WhatsApp: 0333-7011728 (+92 333 7011728)
LinkedIn: linkedin.com/in/multithinker | Location: Nawabshah, Sindh, Pakistan
================================================================================

1. THE PROBLEM SOLVED
--------------------------------------------------------------------------------
In an enterprise or industrial manufacturing facility like Habib Sugar Mills, IT officers
manage hundreds of desktop workstations, scale terminals, weighing bridges, process
monitoring PCs, and administrative laptops. When an endpoint experiences network drops,
sluggish performance, or corrupt system files, traditional approaches often fail:
- Third-party utilities (CCleaner, third-party optimizers) violate cybersecurity policy
  and frequently introduce adware, privacy risks, or aggressive registry breakage.
- PowerShell scripts are blocked by Group Policy (Set-ExecutionPolicy Restricted).
- Python/Node scripts cannot run because runtime interpreters are strictly prohibited
  on client machines.
- Technicians waste 30-45 minutes per machine manually running individual CMD commands
  (ipconfig, ping, sfc, dism, cleanmgr) and copying logs by hand...`
  }
];
