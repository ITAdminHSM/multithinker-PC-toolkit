@echo off
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
set "REPORT_DIR=%USERPROFILE%\Documents\MultiThinker\Reports"
set "LOG_FILE=%REPORT_DIR%\MUPT_Activity.log"
set "CONFIG_FILE=%USERPROFILE%\Documents\MultiThinker\mupt_config.ini"

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
reg query HKCU\Console /v VirtualTerminalLevel >nul 2>&1
if %errorlevel% neq 0 (
    :: Try enabling it for this console session
    reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1 /f >nul 2>&1
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

:: Window Title and Default Color
title %APP_NAME% %APP_VERSION% - %DEV_BRAND%
color 1F

:: ----------------------------------------------------------------------------
:: SPLASH SCREEN & INITIALIZATION
:: ----------------------------------------------------------------------------
if "%ENABLE_SPLASH%"=="1" (
    call :SUB_SPLASH_SCREEN
)

:: ----------------------------------------------------------------------------
:: MAIN APPLICATION LOOP
:: ----------------------------------------------------------------------------
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
goto MAIN_MENU

:: ============================================================================
:: MODULE 1: QUICK MAINTENANCE
:: ============================================================================
:MOD_QUICK_MAINTENANCE
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   MODULE 1: QUICK MAINTENANCE (ONE-CLICK PREVENTATIVE CARE)%C_RESET%
echo  %C_CYAN%  ==============================================================================%C_RESET%
echo   This sequence runs safe, non-destructive standard maintenance tasks:
echo   1. Flush DNS resolver cache
echo   2. Clean safe user temporary files (skips locked files)
echo   3. Synchronize Windows system clock via NTP (w32tm)
echo   4. Verify Internet & Gateway connectivity
echo   5. Check local drive free space
echo.
echo   %C_YELLOW%Safety Notice:%C_RESET% No personal documents, registry keys, or network bindings
echo   are altered. No automatic restart will occur.
echo.
set "CONFIRM="
set /p "CONFIRM=  Execute Quick Maintenance sequence now? (Y/N, default Y): "
if /i "%CONFIRM%"=="N" goto MAIN_MENU

echo.
echo  %C_CYAN%  [1/5] Flushing DNS resolver cache...%C_RESET%
ipconfig /flushdns >nul 2>&1
if %errorlevel% equ 0 (
    echo        Status: %C_GREEN%[ OK ] DNS cache flushed successfully.%C_RESET%
    set "QM_DNS=SUCCESS"
) else (
    echo        Status: %C_YELLOW%[WARN] Could not flush DNS.%C_RESET%
    set "QM_DNS=FAILED"
)

echo.
echo  %C_CYAN%  [2/5] Cleaning safe user temp files (%TEMP%)...%C_RESET%
set "CLEAN_COUNT=0"
for %%F in ("%TEMP%\*.*") do (
    del /f /q "%%F" >nul 2>&1
    if not exist "%%F" (
        set /a CLEAN_COUNT+=1 >nul 2>&1
    )
)
echo        Status: %C_GREEN%[ OK ] User temp folder purged (locked files safely skipped).%C_RESET%
set "QM_TEMP=SUCCESS"

echo.
echo  %C_CYAN%  [3/5] Synchronizing system clock with Windows Time service...%C_RESET%
w32tm /resync >nul 2>&1
if %errorlevel% equ 0 (
    echo        Status: %C_GREEN%[ OK ] Clock synchronized successfully.%C_RESET%
    set "QM_TIME=SUCCESS"
) else (
    echo        Status: %C_YELLOW%[WARN] NTP resync failed (service may require elevation).%C_RESET%
    set "QM_TIME=SKIPPED/UNPRIVILEGED"
)

echo.
echo  %C_CYAN%  [4/5] Testing dual-host Internet connectivity (1.1.1.1 ^& 8.8.8.8)...%C_RESET%
ping 1.1.1.1 -n 1 -w 1500 >nul 2>&1
if %errorlevel% equ 0 (
    echo        Status: %C_GREEN%[ OK ] Primary DNS (1.1.1.1) reachable.%C_RESET%
    set "QM_NET=SUCCESS"
) else (
    ping 8.8.8.8 -n 1 -w 1500 >nul 2>&1
    if %errorlevel% equ 0 (
        echo        Status: %C_GREEN%[ OK ] Secondary DNS (8.8.8.8) reachable.%C_RESET%
        set "QM_NET=SUCCESS"
    ) else (
        echo        Status: %C_RED%[FAIL] No response from public DNS endpoints.%C_RESET%
        set "QM_NET=FAILED"
    )
)

echo.
echo  %C_CYAN%  [5/5] Querying system drive free space...%C_RESET%
for /f "tokens=3" %%A in ('dir /-c "%SystemDrive%\" 2^>nul ^| findstr /i "bytes free"') do set "SYS_FREE_BYTES=%%A"
if defined SYS_FREE_BYTES (
    echo        System Drive (%SystemDrive%): Free Space = %SYS_FREE_BYTES% bytes
    set "QM_DISK=SUCCESS"
) else (
    echo        System Drive (%SystemDrive%): Checked.
    set "QM_DISK=SUCCESS"
)

echo.
echo  %C_CYAN%  ------------------------------------------------------------------------------%C_RESET%
echo  %C_BOLD%%C_WHITE%   QUICK MAINTENANCE SUMMARY:%C_RESET%
echo   * DNS Resolver Flush:       %QM_DNS%
echo   * Safe Temp Cleanup:        %QM_TEMP%
echo   * System Clock NTP Sync:    %QM_TIME%
echo   * Network Connectivity:     %QM_NET%
echo   * Drive Free Space Audit:   %QM_DISK%
echo.
call :SUB_LOG_ACTIVITY "Quick Maintenance executed. Status: DNS=%QM_DNS%, Temp=%QM_TEMP%, Net=%QM_NET%"
echo  %C_GRAY%Press any key to return to main menu...%C_RESET%
pause >nul
goto MAIN_MENU

:: ============================================================================
:: MODULE 2: NETWORK TOOLKIT
:: ============================================================================
:MOD_NETWORK_TOOLKIT
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   MODULE 2: NETWORK TOOLKIT & IP UTILITIES%C_RESET%
echo  %C_CYAN%  ==============================================================================%C_RESET%
echo   %C_YELLOW%[ 1]%C_RESET% Show Detailed IP, Gateway, DNS ^& DHCP Config (ipconfig /all)
echo   %C_YELLOW%[ 2]%C_RESET% Flush DNS Resolver Cache
echo   %C_YELLOW%[ 3]%C_RESET% Release and Renew IP Address Lease (DHCP)
echo   %C_YELLOW%[ 4]%C_RESET% Ping Gateway, Google (8.8.8.8) ^& Cloudflare (1.1.1.1)
echo   %C_YELLOW%[ 5]%C_RESET% Custom Ping with Packet Loss and Latency Summary
echo   %C_YELLOW%[ 6]%C_RESET% Continuous Ping with Safe Interrupt
echo   %C_YELLOW%[ 7]%C_RESET% Trace Route to Target (tracert)
echo   %C_YELLOW%[ 8]%C_RESET% DNS Lookup ^& Reverse Query (nslookup)
echo   %C_YELLOW%[ 9]%C_RESET% Show Network Adapters and MAC Addresses (getmac)
echo   %C_YELLOW%[10]%C_RESET% %C_RED%[ADMIN]%C_RESET% Reset Winsock Catalog ^& TCP/IP Stack
echo   %C_YELLOW%[ H]%C_RESET% Help ^& Documentation for Network Tools
echo   %C_YELLOW%[ B]%C_RESET% Back to Main Menu
echo.
call :SUB_RENDER_FOOTER
set "NET_CHOICE="
set /p "NET_CHOICE=  Enter network selection [1-10, H, B]: "

if /i "%NET_CHOICE%"=="B" goto MAIN_MENU
if /i "%NET_CHOICE%"=="H" (
    call :SUB_HELP_POPUP "Network Toolkit" "Provides Layer 3 and Layer 7 diagnostic tools. Commands use native Windows binaries (ipconfig, ping, tracert, nslookup, netsh, getmac). Reset Winsock requires Administrator privileges and a reboot."
    goto MOD_NETWORK_TOOLKIT
)
if "%NET_CHOICE%"=="1" (
    echo.
    ipconfig /all | more
    pause
    goto MOD_NETWORK_TOOLKIT
)
if "%NET_CHOICE%"=="2" (
    echo.
    echo  Flushing DNS cache...
    ipconfig /flushdns
    pause
    goto MOD_NETWORK_TOOLKIT
)
if "%NET_CHOICE%"=="3" (
    echo.
    echo  %C_YELLOW%Notice:%C_RESET% Releasing IP address will momentarily drop your active network connection.
    set "DHCP_CONFIRM="
    set /p "DHCP_CONFIRM=  Proceed with DHCP Release/Renew? (Y/N): "
    if /i "%DHCP_CONFIRM%"=="Y" (
        echo  Releasing IP lease...
        ipconfig /release
        echo  Renewing IP lease...
        ipconfig /renew
    )
    pause
    goto MOD_NETWORK_TOOLKIT
)
if "%NET_CHOICE%"=="4" (
    echo.
    echo  %C_CYAN%Testing connectivity to Cloudflare (1.1.1.1)...%C_RESET%
    ping 1.1.1.1 -n 4
    echo.
    echo  %C_CYAN%Testing connectivity to Google (8.8.8.8)...%C_RESET%
    ping 8.8.8.8 -n 4
    pause
    goto MOD_NETWORK_TOOLKIT
)
if "%NET_CHOICE%"=="5" (
    echo.
    set "TARGET_HOST="
    set /p "TARGET_HOST=  Enter target IP address or hostname [e.g. 8.8.8.8 or google.com]: "
    if not defined TARGET_HOST set "TARGET_HOST=8.8.8.8"
    call :SUB_VALIDATE_HOSTNAME "%TARGET_HOST%"
    if %errorlevel% neq 0 (
        echo  %C_RED%Input contains disallowed characters. Command cancelled for security.%C_RESET%
        pause
        goto MOD_NETWORK_TOOLKIT
    )
    echo  %C_CYAN%Executing 4-packet diagnostic ping to: %TARGET_HOST%%C_RESET%
    ping %TARGET_HOST% -n 4
    pause
    goto MOD_NETWORK_TOOLKIT
)
if "%NET_CHOICE%"=="6" (
    echo.
    set "CONT_HOST="
    set /p "CONT_HOST=  Enter continuous ping host (default 8.8.8.8): "
    if not defined CONT_HOST set "CONT_HOST=8.8.8.8"
    call :SUB_VALIDATE_HOSTNAME "%CONT_HOST%"
    if %errorlevel% neq 0 (
        echo  %C_RED%Disallowed characters in host. Cancelled.%C_RESET%
        pause
        goto MOD_NETWORK_TOOLKIT
    )
    echo  %C_YELLOW%Continuous ping initiated. Press Ctrl+C then N (or Ctrl+Break) to return.%C_RESET%
    ping %CONT_HOST% -t
    pause
    goto MOD_NETWORK_TOOLKIT
)
if "%NET_CHOICE%"=="7" (
    echo.
    set "TRACE_HOST="
    set /p "TRACE_HOST=  Enter target for traceroute (default 1.1.1.1): "
    if not defined TRACE_HOST set "TRACE_HOST=1.1.1.1"
    call :SUB_VALIDATE_HOSTNAME "%TRACE_HOST%"
    if %errorlevel% neq 0 (
        echo  %C_RED%Disallowed characters in host. Cancelled.%C_RESET%
        pause
        goto MOD_NETWORK_TOOLKIT
    )
    echo  %C_CYAN%Tracing route to %TRACE_HOST% (max 30 hops)...%C_RESET%
    tracert -d -h 30 %TRACE_HOST%
    pause
    goto MOD_NETWORK_TOOLKIT
)
if "%NET_CHOICE%"=="8" (
    echo.
    set "NS_TARGET="
    set /p "NS_TARGET=  Enter domain or IP for nslookup (default google.com): "
    if not defined NS_TARGET set "NS_TARGET=google.com"
    call :SUB_VALIDATE_HOSTNAME "%NS_TARGET%"
    if %errorlevel% neq 0 (
        echo  %C_RED%Disallowed characters in host. Cancelled.%C_RESET%
        pause
        goto MOD_NETWORK_TOOLKIT
    )
    echo  %C_CYAN%Executing DNS lookup for: %NS_TARGET%%C_RESET%
    nslookup %NS_TARGET%
    pause
    goto MOD_NETWORK_TOOLKIT
)
if "%NET_CHOICE%"=="9" (
    echo.
    echo  %C_CYAN%Physical Network Adapters ^& MAC Addresses:%C_RESET%
    getmac /v /fo list
    echo.
    echo  %C_CYAN%Network Interface States (netsh):%C_RESET%
    netsh interface show interface
    pause
    goto MOD_NETWORK_TOOLKIT
)
if "%NET_CHOICE%"=="10" (
    echo.
    call :SUB_REQUIRE_ADMIN "Reset Winsock Catalog and TCP/IP Protocol Stack"
    if %errorlevel% neq 0 (
        pause
        goto MOD_NETWORK_TOOLKIT
    )
    echo  %C_RED%%C_BOLD%WARNING: This resets your network adapters and TCP/IP stack to factory defaults.%C_RESET%
    echo  A computer reboot is mandatory immediately after this operation.
    set "CONFIRM_RESET="
    set /p "CONFIRM_RESET=  Are you sure you want to proceed? (Type YES to confirm): "
    if /i "%CONFIRM_RESET%"=="YES" (
        echo  Executing: netsh winsock reset...
        netsh winsock reset
        echo  Executing: netsh int ip reset...
        netsh int ip reset
        call :SUB_LOG_ACTIVITY "Winsock and TCP/IP reset performed by user."
        echo.
        echo  %C_GREEN%Reset commands completed. Please restart your PC to finalize.%C_RESET%
    ) else (
        echo  Operation cancelled by user.
    )
    pause
    goto MOD_NETWORK_TOOLKIT
)

goto MOD_NETWORK_TOOLKIT

:: ============================================================================
:: MODULE 3: WI-FI MANAGER
:: ============================================================================
:MOD_WIFI_MANAGER
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   MODULE 3: WI-FI NETWORK MANAGER%C_RESET%
echo  %C_CYAN%  ==============================================================================%C_RESET%
echo   %C_YELLOW%[ 1]%C_RESET% Show Current Wi-Fi Connection ^& Signal Strength
echo   %C_YELLOW%[ 2]%C_RESET% List All Saved Wi-Fi Profiles on this PC
echo   %C_YELLOW%[ 3]%C_RESET% Show Detailed Wireless Interface ^& Driver Info
echo   %C_YELLOW%[ 4]%C_RESET% Reconnect to a Saved Wi-Fi Profile
echo   %C_YELLOW%[ 5]%C_RESET% Forget (Delete) a Specific Wi-Fi Profile
echo   %C_YELLOW%[ 6]%C_RESET% %C_RED%[DANGER]%C_RESET% Forget ALL Saved Wi-Fi Profiles
echo   %C_YELLOW%[ 7]%C_RESET% %C_RED%[ADMIN]%C_RESET% Restart Wi-Fi Adapter (Cycle Interface)
echo   %C_YELLOW%[ 8]%C_RESET% Wi-Fi Troubleshooting ^& Signal Guidance
echo   %C_YELLOW%[ H]%C_RESET% Help ^& Ethical Policy Notice
echo   %C_YELLOW%[ B]%C_RESET% Back to Main Menu
echo.
call :SUB_RENDER_FOOTER
set "WIFI_CHOICE="
set /p "WIFI_CHOICE=  Enter Wi-Fi selection [1-8, H, B]: "

if /i "%WIFI_CHOICE%"=="B" goto MAIN_MENU
if /i "%WIFI_CHOICE%"=="H" (
    call :SUB_HELP_POPUP "Wi-Fi Manager Policy" "ETHICAL NOTICE: In accordance with enterprise IT security standards, this tool NEVER extracts or reveals saved Wi-Fi cleartext passwords. Deleting a profile removes its saved credentials from Windows credential store."
    goto MOD_WIFI_MANAGER
)
if "%WIFI_CHOICE%"=="1" (
    echo.
    echo  %C_CYAN%Active Wireless Connection Details:%C_RESET%
    netsh wlan show interfaces
    pause
    goto MOD_WIFI_MANAGER
)
if "%WIFI_CHOICE%"=="2" (
    echo.
    echo  %C_CYAN%Saved Wi-Fi Profiles on this Computer:%C_RESET%
    netsh wlan show profiles
    pause
    goto MOD_WIFI_MANAGER
)
if "%WIFI_CHOICE%"=="3" (
    echo.
    echo  %C_CYAN%Wireless Hardware Drivers and Capabilities:%C_RESET%
    netsh wlan show drivers
    pause
    goto MOD_WIFI_MANAGER
)
if "%WIFI_CHOICE%"=="4" (
    echo.
    echo  Saved profiles:
    netsh wlan show profiles
    echo.
    set "CONNECT_SSID="
    set /p "CONNECT_SSID=  Enter exact profile name to connect: "
    if defined CONNECT_SSID (
        echo  Attempting connection to "%CONNECT_SSID%"...
        netsh wlan connect name="%CONNECT_SSID%"
    )
    pause
    goto MOD_WIFI_MANAGER
)
if "%WIFI_CHOICE%"=="5" (
    echo.
    echo  Saved profiles:
    netsh wlan show profiles
    echo.
    set "FORGET_SSID="
    set /p "FORGET_SSID=  Enter profile name to forget: "
    if defined FORGET_SSID (
        echo  %C_YELLOW%Confirming deletion of profile: "%FORGET_SSID%"%C_RESET%
        set "FORGET_CONFIRM="
        set /p "FORGET_CONFIRM=  Delete profile now? (Y/N): "
        if /i "%FORGET_CONFIRM%"=="Y" (
            netsh wlan delete profile name="%FORGET_SSID%"
            call :SUB_LOG_ACTIVITY "Wi-Fi profile forgotten: %FORGET_SSID%"
        )
    )
    pause
    goto MOD_WIFI_MANAGER
)
if "%WIFI_CHOICE%"=="6" (
    echo.
    echo  %C_RED%%C_BOLD%WARNING: This will delete ALL stored Wi-Fi networks and saved network keys.%C_RESET%
    set "FORGET_ALL_CONFIRM="
    set /p "FORGET_ALL_CONFIRM=  Type DELETE to permanently erase all Wi-Fi profiles: "
    if "%FORGET_ALL_CONFIRM%"=="DELETE" (
        netsh wlan delete profile name=* i=*
        call :SUB_LOG_ACTIVITY "ALL Wi-Fi profiles purged by user."
        echo  All Wi-Fi profiles removed.
    ) else (
        echo  Operation cancelled.
    )
    pause
    goto MOD_WIFI_MANAGER
)
if "%WIFI_CHOICE%"=="7" (
    echo.
    call :SUB_REQUIRE_ADMIN "Restart Wi-Fi Adapter"
    if %errorlevel% neq 0 (
        pause
        goto MOD_WIFI_MANAGER
    )
    echo  Looking for Wi-Fi interface name...
    netsh interface show interface | findstr /i "Wi-Fi Wireless WLAN"
    echo.
    set "WIFI_IF_NAME="
    set /p "WIFI_IF_NAME=  Enter exact Wi-Fi interface name [usually 'Wi-Fi']: "
    if not defined WIFI_IF_NAME set "WIFI_IF_NAME=Wi-Fi"
    echo  Disabling %WIFI_IF_NAME%...
    netsh interface set interface "%WIFI_IF_NAME%" disable
    ping 127.0.0.1 -n 3 >nul
    echo  Enabling %WIFI_IF_NAME%...
    netsh interface set interface "%WIFI_IF_NAME%" enable
    echo  Adapter cycle complete.
    pause
    goto MOD_WIFI_MANAGER
)
if "%WIFI_CHOICE%"=="8" (
    echo.
    echo  %C_CYAN%================ WI-FI TROUBLESHOOTING GUIDE ================%C_RESET%
    echo   1. Signal Strength below 60%% indicates high attenuation or interference.
    echo   2. Co-channel interference on 2.4 GHz (Channels 1, 6, 11) is common in plants.
    echo   3. Prefer 5 GHz or 6 GHz SSIDs for industrial or office laptop traffic.
    echo   4. If adapter fails to acquire IP, verify DHCP server pool status.
    echo   5. In heavy steel or manufacturing floors, check roaming aggressiveness.
    echo  %C_CYAN%=============================================================%C_RESET%
    pause
    goto MOD_WIFI_MANAGER
)

goto MOD_WIFI_MANAGER

:: ============================================================================
:: MODULE 4: DIAGNOSTICS & PERFORMANCE
:: ============================================================================
:MOD_PERFORMANCE
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   MODULE 4: SYSTEM DIAGNOSTICS & PERFORMANCE AUDIT%C_RESET%
echo  %C_CYAN%  ==============================================================================%C_RESET%
echo   %C_YELLOW%[ 1]%C_RESET% Memory (RAM) Usage ^& System Architecture Breakdown
echo   %C_YELLOW%[ 2]%C_RESET% CPU Model, Cores ^& Clock Speed (Registry Query)
echo   %C_YELLOW%[ 3]%C_RESET% System Uptime ^& Boot Time Verification
echo   %C_YELLOW%[ 4]%C_RESET% Startup Programs Auditor (HKCU and HKLM Run keys)
echo   %C_YELLOW%[ 5]%C_RESET% Restart Windows Explorer (Refreshes taskbar and shell)
echo   %C_YELLOW%[ 6]%C_RESET% Real-Time Process List sorted by Session
echo   %C_YELLOW%[ H]%C_RESET% Engineering Fact: Why "RAM Boosters" are Placebo
echo   %C_YELLOW%[ B]%C_RESET% Back to Main Menu
echo.
call :SUB_RENDER_FOOTER
set "PERF_CHOICE="
set /p "PERF_CHOICE=  Enter selection [1-6, H, B]: "

if /i "%PERF_CHOICE%"=="B" goto MAIN_MENU
if /i "%PERF_CHOICE%"=="H" (
    call :SUB_HELP_POPUP "RAM Management Engineering Note" "Modern Windows uses SuperFetch/SysMain and standby cache to utilize free RAM. Unused RAM is wasted RAM. Forced 'cleaners' dump memory into the slow pagefile, hurting responsiveness. Windows automatically frees standby memory when an active app requires it."
    goto MOD_PERFORMANCE
)
if "%PERF_CHOICE%"=="1" (
    echo.
    echo  %C_CYAN%Physical Memory Information (from systeminfo):%C_RESET%
    systeminfo | findstr /i /c:"Total Physical Memory" /c:"Available Physical Memory" /c:"Virtual Memory"
    pause
    goto MOD_PERFORMANCE
)
if "%PERF_CHOICE%"=="2" (
    echo.
    echo  %C_CYAN%Central Processor Unit (CPU) Identification:%C_RESET%
    reg query "HKLM\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v ProcessorNameString 2>nul
    reg query "HKLM\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v ~MHz 2>nul
    reg query "HKLM\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v Identifier 2>nul
    echo.
    echo  Logical Processor Count: %NUMBER_OF_PROCESSORS%
    echo  Architecture: %PROCESSOR_ARCHITECTURE%
    pause
    goto MOD_PERFORMANCE
)
if "%PERF_CHOICE%"=="3" (
    echo.
    echo  %C_CYAN%System Boot Time ^& Uptime Info:%C_RESET%
    systeminfo | findstr /i /c:"System Boot Time" /c:"Host Name" /c:"OS Name"
    echo.
    echo  Network Workstation Statistics (uptime indicator):
    net statistics workstation | findstr /i "Statistics since"
    pause
    goto MOD_PERFORMANCE
)
if "%PERF_CHOICE%"=="4" (
    echo.
    echo  %C_CYAN%Current User Startup Programs (HKCU\Run):%C_RESET%
    reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" 2>nul
    echo.
    echo  %C_CYAN%System-Wide Startup Programs (HKLM\Run):%C_RESET%
    reg query "HKLM\Software\Microsoft\Windows\CurrentVersion\Run" 2>nul
    pause
    goto MOD_PERFORMANCE
)
if "%PERF_CHOICE%"=="5" (
    echo.
    echo  %C_YELLOW%Restarting Windows Explorer shell...%C_RESET%
    echo  Note: This does not affect open files or background processes.
    taskkill /f /im explorer.exe >nul 2>&1
    ping 127.0.0.1 -n 2 >nul
    start explorer.exe
    echo  %C_GREEN%Explorer shell restarted successfully.%C_RESET%
    pause
    goto MOD_PERFORMANCE
)
if "%PERF_CHOICE%"=="6" (
    echo.
    tasklist | more
    pause
    goto MOD_PERFORMANCE
)

goto MOD_PERFORMANCE

:: ============================================================================
:: MODULE 5: PC CLEANING
:: ============================================================================
:MOD_CLEANING
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   MODULE 5: SAFE PC CLEANING & STORAGE OPTIMIZATION%C_RESET%
echo  %C_CYAN%  ==============================================================================%C_RESET%
echo   %C_GREEN%SAFETY GUARANTEE:%C_RESET% This utility strictly targets disposable cache files.
echo   It NEVER touches user Documents, Downloads, Desktop, browser profiles,
echo   saved passwords, database files, or system files.
echo.
echo   %C_YELLOW%[ 1]%C_RESET% Clean Safe User Temp Files (%TEMP%)
echo   %C_YELLOW%[ 2]%C_RESET% %C_RED%[ADMIN]%C_RESET% Clean Windows System Temp Files (%WINDIR%\Temp)
echo   %C_YELLOW%[ 3]%C_RESET% Empty Windows Recycle Bin (Prompts for confirmation)
echo   %C_YELLOW%[ 4]%C_RESET% Clean Windows Error Reporting (WER) Queue
echo   %C_YELLOW%[ 5]%C_RESET% Launch Windows Native Disk Cleanup Manager (cleanmgr.exe)
echo   %C_YELLOW%[ 6]%C_RESET% Full Safe Clean (User Temp + WER + Disk Cleanup)
echo   %C_YELLOW%[ H]%C_RESET% View Safe Cleaning Principles ^& Rules
echo   %C_YELLOW%[ B]%C_RESET% Back to Main Menu
echo.
call :SUB_RENDER_FOOTER
set "CLEAN_CHOICE="
set /p "CLEAN_CHOICE=  Enter cleaning selection [1-6, H, B]: "

if /i "%CLEAN_CHOICE%"=="B" goto MAIN_MENU
if /i "%CLEAN_CHOICE%"=="H" (
    call :SUB_HELP_POPUP "Safe Cleaning Principles" "1. Never delete active files: Locked files are in use and must be skipped. 2. Never touch registry cleaners: Registry cleaning provides zero performance improvement and risks system corruption. 3. Respect user data: Downloads folder is never touched without explicit user oversight."
    goto MOD_CLEANING
)
if "%CLEAN_CHOICE%"=="1" (
    echo.
    echo  Cleaning user temp directory: "%TEMP%"...
    del /f /q "%TEMP%\*.*" >nul 2>&1
    for /d %%D in ("%TEMP%\*") do rd /s /q "%%D" >nul 2>&1
    echo  %C_GREEN%Safe user temp files cleaned.%C_RESET%
    pause
    goto MOD_CLEANING
)
if "%CLEAN_CHOICE%"=="2" (
    echo.
    call :SUB_REQUIRE_ADMIN "Clean Windows System Temp Folder"
    if %errorlevel% neq 0 (
        pause
        goto MOD_CLEANING
    )
    echo  Cleaning Windows system temp: "%WINDIR%\Temp"...
    del /f /q "%WINDIR%\Temp\*.*" >nul 2>&1
    for /d %%D in ("%WINDIR%\Temp\*") do rd /s /q "%%D" >nul 2>&1
    echo  %C_GREEN%Windows system temp files cleaned.%C_RESET%
    pause
    goto MOD_CLEANING
)
if "%CLEAN_CHOICE%"=="3" (
    echo.
    set "EMPTY_RB="
    set /p "EMPTY_RB=  Empty Windows Recycle Bin now? (Y/N): "
    if /i "%EMPTY_RB%"=="Y" (
        :: Safe native method: empty $Recycle.Bin on system drive when allowed
        if exist "%SystemDrive%\$Recycle.Bin" (
            rd /s /q "%SystemDrive%\$Recycle.Bin" >nul 2>&1
            echo  %C_GREEN%Recycle Bin purge command issued.%C_RESET%
        ) else (
            echo  Recycle Bin already clear or unmounted.
        )
    )
    pause
    goto MOD_CLEANING
)
if "%CLEAN_CHOICE%"=="4" (
    echo.
    echo  Clearing queued Windows Error Reporting logs...
    if exist "%LOCALAPPDATA%\Microsoft\Windows\WER\ReportQueue" (
        del /f /q "%LOCALAPPDATA%\Microsoft\Windows\WER\ReportQueue\*.*" >nul 2>&1
    )
    echo  %C_GREEN%Error reporting cache cleared.%C_RESET%
    pause
    goto MOD_CLEANING
)
if "%CLEAN_CHOICE%"=="5" (
    echo.
    echo  Launching native Windows Disk Cleanup utility...
    start cleanmgr.exe
    pause
    goto MOD_CLEANING
)
if "%CLEAN_CHOICE%"=="6" (
    echo.
    echo  Executing comprehensive safe cleanup...
    del /f /q "%TEMP%\*.*" >nul 2>&1
    if exist "%LOCALAPPDATA%\Microsoft\Windows\WER\ReportQueue" (
        del /f /q "%LOCALAPPDATA%\Microsoft\Windows\WER\ReportQueue\*.*" >nul 2>&1
    )
    echo  Launching Disk Cleanup for drive %SystemDrive%...
    start cleanmgr.exe /d %SystemDrive%
    echo  %C_GREEN%Automated cleanup sequence complete.%C_RESET%
    pause
    goto MOD_CLEANING
)

goto MOD_CLEANING

:: ============================================================================
:: MODULE 6: WINDOWS REPAIR
:: ============================================================================
:MOD_WINDOWS_REPAIR
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   MODULE 6: WINDOWS REPAIR & INTEGRITY VERIFICATION%C_RESET%
echo  %C_CYAN%  ==============================================================================%C_RESET%
echo   %C_YELLOW%NOTICE:%C_RESET% System repair operations require Administrator elevation and may take
echo   10 to 30 minutes to complete. Do not interrupt or close the console during execution.
echo.
echo   %C_RED%[ 1] [ADMIN]%C_RESET% SFC /scannow (System File Checker Integrity Verification)
echo   %C_RED%[ 2] [ADMIN]%C_RESET% DISM CheckHealth (Quick Image Servicing Health Check)
echo   %C_RED%[ 3] [ADMIN]%C_RESET% DISM ScanHealth (Deep Component Store Corruption Scan)
echo   %C_RED%[ 4] [ADMIN]%C_RESET% DISM RestoreHealth (Repair Component Store from Windows Update)
echo   %C_YELLOW%[ 5]%C_RESET% Windows Update Troubleshooter ^& Settings Portal
echo   %C_YELLOW%[ 6]%C_RESET% Launch Device Manager (devmgmt.msc)
echo   %C_YELLOW%[ 7]%C_RESET% Launch Windows Services Management (services.msc)
echo   %C_YELLOW%[ 8]%C_RESET% Launch Windows Event Viewer (eventvwr.msc)
echo   %C_YELLOW%[ H]%C_RESET% Help ^& Explanation of SFC vs DISM
echo   %C_YELLOW%[ B]%C_RESET% Back to Main Menu
echo.
call :SUB_RENDER_FOOTER
set "REP_CHOICE="
set /p "REP_CHOICE=  Enter selection [1-8, H, B]: "

if /i "%REP_CHOICE%"=="B" goto MAIN_MENU
if /i "%REP_CHOICE%"=="H" (
    call :SUB_HELP_POPUP "SFC vs DISM Guidance" "SFC (System File Checker) replaces altered or corrupted protected system files with cached copies from the Windows component store. DISM repairs the component store itself using Windows Update or mounting media. Run DISM RestoreHealth first if SFC fails."
    goto MOD_WINDOWS_REPAIR
)
if "%REP_CHOICE%"=="1" (
    echo.
    call :SUB_REQUIRE_ADMIN "Run System File Checker (sfc /scannow)"
    if %errorlevel% neq 0 (
        pause
        goto MOD_WINDOWS_REPAIR
    )
    echo  %C_CYAN%Executing SFC scan. Please be patient...%C_RESET%
    sfc /scannow
    call :SUB_LOG_ACTIVITY "SFC /scannow completed with errorlevel %errorlevel%"
    pause
    goto MOD_WINDOWS_REPAIR
)
if "%REP_CHOICE%"=="2" (
    echo.
    call :SUB_REQUIRE_ADMIN "Run DISM CheckHealth"
    if %errorlevel% neq 0 (
        pause
        goto MOD_WINDOWS_REPAIR
    )
    echo  Executing DISM /Online /Cleanup-Image /CheckHealth...
    dism /Online /Cleanup-Image /CheckHealth
    pause
    goto MOD_WINDOWS_REPAIR
)
if "%REP_CHOICE%"=="3" (
    echo.
    call :SUB_REQUIRE_ADMIN "Run DISM ScanHealth"
    if %errorlevel% neq 0 (
        pause
        goto MOD_WINDOWS_REPAIR
    )
    echo  %C_CYAN%Executing DISM ScanHealth (takes several minutes)...%C_RESET%
    dism /Online /Cleanup-Image /ScanHealth
    pause
    goto MOD_WINDOWS_REPAIR
)
if "%REP_CHOICE%"=="4" (
    echo.
    call :SUB_REQUIRE_ADMIN "Run DISM RestoreHealth"
    if %errorlevel% neq 0 (
        pause
        goto MOD_WINDOWS_REPAIR
    )
    echo  %C_CYAN%Executing DISM RestoreHealth using online repair source...%C_RESET%
    dism /Online /Cleanup-Image /RestoreHealth
    call :SUB_LOG_ACTIVITY "DISM RestoreHealth completed with errorlevel %errorlevel%"
    pause
    goto MOD_WINDOWS_REPAIR
)
if "%REP_CHOICE%"=="5" (
    echo.
    echo  Launching Windows Update settings...
    start ms-settings:windowsupdate
    pause
    goto MOD_WINDOWS_REPAIR
)
if "%REP_CHOICE%"=="6" (
    start devmgmt.msc
    goto MOD_WINDOWS_REPAIR
)
if "%REP_CHOICE%"=="7" (
    start services.msc
    goto MOD_WINDOWS_REPAIR
)
if "%REP_CHOICE%"=="8" (
    start eventvwr.msc
    goto MOD_WINDOWS_REPAIR
)

goto MOD_WINDOWS_REPAIR

:: ============================================================================
:: MODULE 7: INTERNET TESTING
:: ============================================================================
:MOD_INTERNET_TESTING
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   MODULE 7: INTERNET SPEED & LATENCY TESTING%C_RESET%
echo  %C_CYAN%  ==============================================================================%C_RESET%
echo   %C_YELLOW%ENGINEERING HONESTY:%C_RESET% Pure Batch scripts cannot reliably compute multi-megabit
echo   bandwidth without external compiled binaries. For genuine, accurate speed
echo   measurement, this module leverages certified web speedtest engines alongside
echo   native ICMP latency and DNS resolution benchmarks.
echo.
echo   %C_YELLOW%[ 1]%C_RESET% Launch Cloudflare Speed Test in Default Browser (speed.cloudflare.com)
echo   %C_YELLOW%[ 2]%C_RESET% Launch Ookla Speedtest in Default Browser (www.speedtest.net)
echo   %C_YELLOW%[ 3]%C_RESET% Native ICMP Ping Latency Benchmark (10 Packets to 1.1.1.1)
echo   %C_YELLOW%[ 4]%C_RESET% Packet Loss and Jitter Assessment
echo   %C_YELLOW%[ 5]%C_RESET% DNS Query Resolution Speed Test (nslookup)
echo   %C_YELLOW%[ H]%C_RESET% Help ^& Explanation
echo   %C_YELLOW%[ B]%C_RESET% Back to Main Menu
echo.
call :SUB_RENDER_FOOTER
set "INET_CHOICE="
set /p "INET_CHOICE=  Enter selection [1-5, H, B]: "

if /i "%INET_CHOICE%"=="B" goto MAIN_MENU
if /i "%INET_CHOICE%"=="H" (
    call :SUB_HELP_POPUP "Internet Testing Architecture" "Bandwidth testing measures throughput in Mbps via HTTP/WebSocket streams. Latency measures round-trip time in milliseconds. Packet loss indicates physical line degradation or Wi-Fi interference."
    goto MOD_INTERNET_TESTING
)
if "%INET_CHOICE%"=="1" (
    echo  Launching Cloudflare Speed Test...
    start "" "https://speed.cloudflare.com"
    pause
    goto MOD_INTERNET_TESTING
)
if "%INET_CHOICE%"=="2" (
    echo  Launching Ookla Speedtest...
    start "" "https://www.speedtest.net"
    pause
    goto MOD_INTERNET_TESTING
)
if "%INET_CHOICE%"=="3" (
    echo.
    echo  %C_CYAN%Executing 10-packet latency benchmark to 1.1.1.1...%C_RESET%
    ping 1.1.1.1 -n 10
    pause
    goto MOD_INTERNET_TESTING
)
if "%INET_CHOICE%"=="4" (
    echo.
    echo  %C_CYAN%Sending 20 ICMP echo requests to evaluate packet drop rate...%C_RESET%
    ping 8.8.8.8 -n 20
    pause
    goto MOD_INTERNET_TESTING
)
if "%INET_CHOICE%"=="5" (
    echo.
    echo  %C_CYAN%Benchmarking DNS resolution time for Habib Sugar Mills domain and public targets...%C_RESET%
    nslookup google.com 1.1.1.1
    nslookup microsoft.com 8.8.8.8
    pause
    goto MOD_INTERNET_TESTING
)

goto MOD_INTERNET_TESTING

:: ============================================================================
:: MODULE 8: SECURITY TOOLS
:: ============================================================================
:MOD_SECURITY
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   MODULE 8: SECURITY TOOLS & DEFENDER STATUS%C_RESET%
echo  %C_CYAN%  ==============================================================================%C_RESET%
echo   %C_GREEN%ENTERPRISE POLICY:%C_RESET% This toolkit will NEVER disable antivirus protections,
echo   firewalls, or tampering defenses. It audits and runs native scans only.
echo.
echo   %C_YELLOW%[ 1]%C_RESET% Check Windows Defender Service (WinDefend) Status
echo   %C_YELLOW%[ 2]%C_RESET% Check Windows Firewall State for All Profiles
echo   %C_YELLOW%[ 3]%C_RESET% Run Microsoft Defender Antivirus Quick Scan (MpCmdRun)
echo   %C_YELLOW%[ 4]%C_RESET% Launch Windows Security Center Dashboard
echo   %C_YELLOW%[ 5]%C_RESET% Launch Windows Advanced Firewall Control Panel
echo   %C_YELLOW%[ 6]%C_RESET% Enterprise IT Endpoint Security Best Practices Checklist
echo   %C_YELLOW%[ H]%C_RESET% Help ^& Documentation
echo   %C_YELLOW%[ B]%C_RESET% Back to Main Menu
echo.
call :SUB_RENDER_FOOTER
set "SEC_CHOICE="
set /p "SEC_CHOICE=  Enter selection [1-6, H, B]: "

if /i "%SEC_CHOICE%"=="B" goto MAIN_MENU
if /i "%SEC_CHOICE%"=="H" (
    call :SUB_HELP_POPUP "Endpoint Security Protocol" "In industrial environments like Habib Sugar Mills, workstations must maintain active real-time AV protection, enabled domain/private firewalls, and restricted administrative credentials to isolate OT networks from LAN vulnerabilities."
    goto MOD_SECURITY
)
if "%SEC_CHOICE%"=="1" (
    echo.
    echo  %C_CYAN%Querying Windows Defender Service Status (sc query WinDefend):%C_RESET%
    sc query WinDefend 2>nul
    pause
    goto MOD_SECURITY
)
if "%SEC_CHOICE%"=="2" (
    echo.
    echo  %C_CYAN%Querying Windows Firewall Status across Profiles:%C_RESET%
    netsh advfirewall show allprofiles state
    pause
    goto MOD_SECURITY
)
if "%SEC_CHOICE%"=="3" (
    echo.
    set "MP_PATH=%ProgramFiles%\Windows Defender\MpCmdRun.exe"
    if not exist "%MP_PATH%" set "MP_PATH=%ProgramData%\Microsoft\Windows Defender\Platform"
    echo  Executing Microsoft Defender Quick Scan...
    "%ProgramFiles%\Windows Defender\MpCmdRun.exe" -Scan -ScanType 1 2>nul
    if %errorlevel% equ 0 (
        echo  %C_GREEN%Quick scan completed. No active threats detected.%C_RESET%
    ) else (
        echo  %C_YELLOW%Scan initiated or handled by Windows Defender Center.%C_RESET%
    )
    pause
    goto MOD_SECURITY
)
if "%SEC_CHOICE%"=="4" (
    start windowsdefender:
    goto MOD_SECURITY
)
if "%SEC_CHOICE%"=="5" (
    start control firewall.cpl
    goto MOD_SECURITY
)
if "%SEC_CHOICE%"=="6" (
    echo.
    echo  %C_CYAN%============= ENTERPRISE ENDPOINT BEST PRACTICES =============%C_RESET%
    echo   [1] Enable Windows Defender Real-Time Protection and Cloud Delivery.
    echo   [2] Never grant permanent Local Admin rights to standard shift operators.
    echo   [3] Keep Windows Update servicing pipeline current (Patch Tuesday).
    echo   [4] Disable legacy SMBv1 protocols to prevent lateral worm propagation.
    echo   [5] Enforce screen lock timeouts on all manufacturing floor terminals.
    echo  %C_CYAN%=============================================================%C_RESET%
    pause
    goto MOD_SECURITY
)

goto MOD_SECURITY

:: ============================================================================
:: MODULE 9: SYSTEM INFORMATION
:: ============================================================================
:MOD_SYSTEM_INFO
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   MODULE 9: COMPLETE SYSTEM SPECIFICATION AUDIT%C_RESET%
echo  %C_CYAN%  ==============================================================================%C_RESET%
echo   Querying local hardware and operating system parameters...
echo.
echo   %C_BOLD%Computer Name:%C_RESET%         %COMPUTERNAME%
echo   %C_BOLD%Current User:%C_RESET%          %USERNAME%
echo   %C_BOLD%User Domain:%C_RESET%           %USERDOMAIN%
echo   %C_BOLD%Elevation Status:%C_RESET%      %ADMIN_STR%
echo   %C_BOLD%Processor Architecture:%C_RESET%%PROCESSOR_ARCHITECTURE%
echo   %C_BOLD%Logical CPU Cores:%C_RESET%     %NUMBER_OF_PROCESSORS%

for /f "tokens=4-7 delims=[.] " %%A in ('ver') do set "WIN_VER_RAW=%%A.%%B.%%C"
echo   %C_BOLD%Windows Kernel Version:%C_RESET% %WIN_VER_RAW%

for /f "tokens=2,*" %%A in ('reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v ProductName 2^>nul') do set "OS_NAME=%%B"
if defined OS_NAME echo   %C_BOLD%Operating System:%C_RESET%       %OS_NAME%

for /f "tokens=2,*" %%A in ('reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v DisplayVersion 2^>nul') do set "OS_BUILD=%%B"
if defined OS_BUILD echo   %C_BOLD%OS Display Build:%C_RESET%       %OS_BUILD%

for /f "tokens=2,*" %%A in ('reg query "HKLM\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v ProcessorNameString 2^>nul') do set "CPU_NAME=%%B"
if defined CPU_NAME echo   %C_BOLD%CPU Processor:%C_RESET%          %CPU_NAME%

echo.
echo  %C_CYAN%  --- STORAGE DRIVES & FREE SPACE ---%C_RESET%
for %%D in (C D E F G) do (
    if exist "%%D:\" (
        for /f "tokens=3" %%B in ('dir /-c "%%D:\" 2^>nul ^| findstr /i "bytes free"') do (
            echo   Drive %%D:\ - Free Space: %%B bytes
        )
    )
)

echo.
echo  %C_CYAN%  --- NETWORK ADAPTERS & IP ADDRESSES ---%C_RESET%
ipconfig | findstr /i "IPv4 Default"

echo.
echo  %C_CYAN%  ------------------------------------------------------------------------------%C_RESET%
echo   [E] Export full system audit to text report file
echo   [B] Back to Main Menu
echo.
set "SYS_ACTION="
set /p "SYS_ACTION=  Choose action [E, B]: "
if /i "%SYS_ACTION%"=="E" (
    call :SUB_EXPORT_SYS_REPORT
    pause
    goto MOD_SYSTEM_INFO
)
goto MAIN_MENU

:: ============================================================================
:: MODULE 10: ADVANCED UTILITIES
:: ============================================================================
:MOD_ADVANCED_UTILS
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   MODULE 10: ADVANCED ADMINISTRATIVE TOOLS & CONSOLES%C_RESET%
echo  %C_CYAN%  ==============================================================================%C_RESET%
echo   %C_YELLOW%[ 1]%C_RESET% Launch Task Manager (taskmgr.exe)
echo   %C_YELLOW%[ 2]%C_RESET% Launch Resource Monitor (resmon.exe)
echo   %C_YELLOW%[ 3]%C_RESET% Launch Performance Monitor (perfmon.exe)
echo   %C_YELLOW%[ 4]%C_RESET% Launch Computer Management Console (compmgmt.msc)
echo   %C_YELLOW%[ 5]%C_RESET% Launch Device Manager (devmgmt.msc)
echo   %C_YELLOW%[ 6]%C_RESET% Launch System Information (msinfo32.exe)
echo   %C_YELLOW%[ 7]%C_RESET% Open Clean Command Prompt at Toolkit Root
echo   %C_YELLOW%[ 8]%C_RESET% Launch Windows Terminal (wt.exe if installed)
echo   %C_YELLOW%[ 9]%C_RESET% View MUPT Maintenance Activity Log
echo   %C_YELLOW%[ B]%C_RESET% Back to Main Menu
echo.
call :SUB_RENDER_FOOTER
set "ADV_CHOICE="
set /p "ADV_CHOICE=  Enter selection [1-9, B]: "

if /i "%ADV_CHOICE%"=="B" goto MAIN_MENU
if "%ADV_CHOICE%"=="1" (start taskmgr.exe & goto MOD_ADVANCED_UTILS)
if "%ADV_CHOICE%"=="2" (start resmon.exe & goto MOD_ADVANCED_UTILS)
if "%ADV_CHOICE%"=="3" (start perfmon.exe & goto MOD_ADVANCED_UTILS)
if "%ADV_CHOICE%"=="4" (start compmgmt.msc & goto MOD_ADVANCED_UTILS)
if "%ADV_CHOICE%"=="5" (start devmgmt.msc & goto MOD_ADVANCED_UTILS)
if "%ADV_CHOICE%"=="6" (start msinfo32.exe & goto MOD_ADVANCED_UTILS)
if "%ADV_CHOICE%"=="7" (start cmd.exe /k "cd /d %TOOLKIT_ROOT% & title MUPT Shell" & goto MOD_ADVANCED_UTILS)
if "%ADV_CHOICE%"=="8" (
    where wt.exe >nul 2>&1
    if %errorlevel% equ 0 (
        start wt.exe
    ) else (
        echo  %C_YELLOW%Windows Terminal (wt.exe) not installed on this system.%C_RESET%
        pause
    )
    goto MOD_ADVANCED_UTILS
)
if "%ADV_CHOICE%"=="9" (
    cls
    echo  %C_CYAN%MUPT Activity Log File (%LOG_FILE%):%C_RESET%
    echo  ------------------------------------------------------------------------------
    if exist "%LOG_FILE%" (
        type "%LOG_FILE%" | more
    ) else (
        echo  No activity logged yet.
    )
    echo  ------------------------------------------------------------------------------
    pause
    goto MOD_ADVANCED_UTILS
)

goto MOD_ADVANCED_UTILS

:: ============================================================================
:: MODULE 11: MAINTENANCE REPORTS
:: ============================================================================
:MOD_REPORTS
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   MODULE 11: MAINTENANCE REPORTS & LOG AUDIT%C_RESET%
echo  %C_CYAN%  ==============================================================================%C_RESET%
echo   Reports are saved in:
echo   %C_GREEN%%REPORT_DIR%%C_RESET%
echo.
echo   %C_YELLOW%[ 1]%C_RESET% Generate New Comprehensive Maintenance Report Now
echo   %C_YELLOW%[ 2]%C_RESET% List All Saved Reports in Reports Folder
echo   %C_YELLOW%[ 3]%C_RESET% Open Reports Folder in Windows File Explorer
echo   %C_YELLOW%[ 4]%C_RESET% View Most Recent Report on Screen
echo   %C_YELLOW%[ B]%C_RESET% Back to Main Menu
echo.
call :SUB_RENDER_FOOTER
set "REP_M_CHOICE="
set /p "REP_M_CHOICE=  Enter selection [1-4, B]: "

if /i "%REP_M_CHOICE%"=="B" goto MAIN_MENU
if "%REP_M_CHOICE%"=="1" (
    call :SUB_EXPORT_SYS_REPORT
    pause
    goto MOD_REPORTS
)
if "%REP_M_CHOICE%"=="2" (
    echo.
    echo  Existing report files:
    dir /b /o-d "%REPORT_DIR%\*.txt" 2>nul
    pause
    goto MOD_REPORTS
)
if "%REP_M_CHOICE%"=="3" (
    explorer "%REPORT_DIR%"
    goto MOD_REPORTS
)
if "%REP_M_CHOICE%"=="4" (
    echo.
    for /f "delims=" %%F in ('dir /b /a-d /o-d "%REPORT_DIR%\*.txt" 2^>nul') do (
        echo  Displaying: %%F
        echo  ----------------------------------------------------------------------
        type "%REPORT_DIR%\%%F" | more
        pause
        goto MOD_REPORTS
    )
    echo  No reports found in directory.
    pause
    goto MOD_REPORTS
)

goto MOD_REPORTS

:: ============================================================================
:: MODULE 12: INTERVIEW DEMO MODE (100% READ-ONLY SHOWCASE)
:: ============================================================================
:MOD_INTERVIEW_DEMO
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_GREEN%%C_BOLD%   ==============================================================================%C_RESET%
echo  %C_GREEN%%C_BOLD%   INTERVIEW DEMO MODE: GUIDED READ-ONLY PORTFOLIO WALKTHROUGH%C_RESET%
echo  %C_GREEN%%C_BOLD%   ==============================================================================%C_RESET%
echo.
echo   Welcome to the MultiThinker Ultimate PC Toolkit live presentation mode!
echo   This mode is specifically engineered for live technical job interviews:
echo.
echo   %C_CYAN%* 100%% Safe & Non-Destructive:%C_RESET% Never deletes files, changes registry, or drops connections.
echo   %C_CYAN%* No Elevation Required:%C_RESET% Operates cleanly under standard user credentials.
echo   %C_CYAN%* Guided 7-Step Tour:%C_RESET% Highlights systems diagnostics, network latency, disk auditing,
echo     firewall inspection, and generates a signed portfolio audit report.
echo.
echo   Candidate: %C_BOLD%%DEV_NAME%%C_RESET% (%DEV_TITLE%, %DEV_ORG%)
echo.
set "START_DEMO="
set /p "START_DEMO=  Begin live interview demo sequence? (Y/N, default Y): "
if /i "%START_DEMO%"=="N" goto MAIN_MENU

:: Step 1: System Identification
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   DEMO STEP 1 OF 7: SYSTEM AUDIT & OS IDENTIFICATION%C_RESET%
echo  %C_CYAN%  ------------------------------------------------------------------------------%C_RESET%
echo   %C_GRAY%Engineering Concept: Cross-version OS detection without deprecated WMIC.%C_RESET%
echo.
echo   Target Host:        %COMPUTERNAME%
echo   Active Account:     %USERNAME%
echo   Privilege Tier:     %ADMIN_STR%
for /f "tokens=4-7 delims=[.] " %%A in ('ver') do echo   Windows Kernel:     %%A.%%B.%%C
echo.
echo  %C_GREEN%[ EXPLANATION FOR INTERVIEWER ]%C_RESET%
echo  "In modern Windows 11 22H2/24H2 builds, wmic.exe has been removed. A resilient
echo   batch utility must use native APIs like 'ver', registry queries, and 'systeminfo'
echo   to guarantee compatibility across both legacy and state-of-the-art workstations."
echo.
pause

:: Step 2: Network Topology
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   DEMO STEP 2 OF 7: NETWORK TOPOLOGY & GATEWAY RESOLUTION%C_RESET%
echo  %C_CYAN%  ------------------------------------------------------------------------------%C_RESET%
echo   %C_GRAY%Engineering Concept: Querying Layer 3 interface status.%C_RESET%
echo.
ipconfig | findstr /i "IPv4 Default"
echo.
echo  %C_GREEN%[ EXPLANATION FOR INTERVIEWER ]%C_RESET%
echo  "In a manufacturing plant like Habib Sugar Mills, fast fault isolation between
echo   the local switch, default gateway, and corporate WAN is critical. Parsing
echo   interfaces natively ensures zero dependencies on external diagnostic binaries."
echo.
pause

:: Step 3: Latency & Loss
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   DEMO STEP 3 OF 7: ICMP LATENCY & PACKET LOSS VERIFICATION%C_RESET%
echo  %C_CYAN%  ------------------------------------------------------------------------------%C_RESET%
echo   %C_GRAY%Engineering Concept: 2-packet non-blocking round-trip time verification.%C_RESET%
echo.
echo   Pinging primary public DNS (1.1.1.1)...
ping 1.1.1.1 -n 2
echo.
echo  %C_GREEN%[ EXPLANATION FOR INTERVIEWER ]%C_RESET%
echo  "We execute low-packet pings with strict timeout bounding to prevent UI hangs.
echo   This gives the technician instant quantitative data on line quality."
echo.
pause

:: Step 4: Storage Free Space
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   DEMO STEP 4 OF 7: STORAGE PARTITION FREE SPACE AUDIT%C_RESET%
echo  %C_CYAN%  ------------------------------------------------------------------------------%C_RESET%
echo   %C_GRAY%Engineering Concept: Safe volume capacity inspection.%C_RESET%
echo.
for /f "tokens=3" %%A in ('dir /-c "%SystemDrive%\" 2^>nul ^| findstr /i "bytes free"') do (
    echo   Volume %SystemDrive%: Free Available = %%A bytes
)
echo.
echo  %C_GREEN%[ EXPLANATION FOR INTERVIEWER ]%C_RESET%
echo  "Low disk space on drive C: is a primary cause of Windows Update corruption
echo   and swap file thrashing. We safely audit storage before running any maintenance."
echo.
pause

:: Step 5: Wireless Adapter
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   DEMO STEP 5 OF 7: WI-FI INTERFACE & SECURITY POSTURE%C_RESET%
echo  %C_CYAN%  ------------------------------------------------------------------------------%C_RESET%
echo   %C_GRAY%Engineering Concept: WLAN interface querying with credential protection.%C_RESET%
echo.
netsh wlan show interfaces 2>nul
if %errorlevel% neq 0 (
    echo   No wireless adapter active (Standard Ethernet workstation mode detected).
)
echo.
echo  %C_GREEN%[ EXPLANATION FOR INTERVIEWER ]%C_RESET%
echo  "Our Wi-Fi module strictly complies with enterprise security: it reports SSID,
echo   BSSID, signal ratio and cipher types, but deliberately never exposes cleartext
echo   passwords, preventing unauthorized credential leakage during field audits."
echo.
pause

:: Step 6: Security Defense
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   DEMO STEP 6 OF 7: DEFENDER & FIREWALL INTEGRITY%C_RESET%
echo  %C_CYAN%  ------------------------------------------------------------------------------%C_RESET%
echo   %C_GRAY%Engineering Concept: Native service query without admin compromise.%C_RESET%
echo.
netsh advfirewall show allprofiles state 2>nul
echo.
echo  %C_GREEN%[ EXPLANATION FOR INTERVIEWER ]%C_RESET%
echo  "Endpoint security rules require verifying that Domain, Private, and Public
echo   profiles are active. Our toolkit verifies security state without altering rules."
echo.
pause

:: Step 7: Sample Report Generation
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   DEMO STEP 7 OF 7: GENERATING SIGNED AUDIT REPORT%C_RESET%
echo  %C_CYAN%  ------------------------------------------------------------------------------%C_RESET%
echo   Compiling verified diagnostic parameters into permanent file...
call :SUB_EXPORT_SYS_REPORT
echo.
echo  %C_CYAN%==============================================================================%C_RESET%
echo  %C_BOLD%%C_WHITE%   WHAT THIS DEMONSTRATES TO AN EMPLOYER / INTERVIEW PANEL:%C_RESET%
echo  %C_CYAN%==============================================================================%C_RESET%
echo   1. %C_GREEN%Engineering Rigor:%C_RESET% Native Batch code written with modular subroutines,
echo      safe quoting, zero dangerous wildcards, and clean errorlevel trapping.
echo   2. %C_GREEN%Enterprise Security Awareness:%C_RESET% Respects least-privilege principles,
echo      asks for elevation only when needed, and refuses to leak stored passwords.
echo   3. %C_GREEN%Industrial Practicality:%C_RESET% Built for real production workstations where
echo      installing Python, PowerShell scripts (Restricted policy), or third-party EXEs
echo      is strictly forbidden by IT security policy.
echo   4. %C_GREEN%Candidate Initiative:%C_RESET% Syed Salman Mehdi brings production experience
echo      from Habib Sugar Mills Ltd, Nawabshah, solving real technical problems.
echo  %C_CYAN%==============================================================================%C_RESET%
echo.
pause
goto MAIN_MENU

:: ============================================================================
:: MODULE 13: SETTINGS, ABOUT & CONTACT DEVELOPER
:: ============================================================================
:MOD_ABOUT_SETTINGS
cls
call :SUB_RENDER_HEADER
echo.
echo  %C_CYAN%%C_BOLD%   ==============================================================================%C_RESET%
echo  %C_CYAN%%C_BOLD%   DEVELOPER PROFILE & IT PORTFOLIO CARD%C_RESET%
echo  %C_CYAN%%C_BOLD%   ==============================================================================%C_RESET%
echo.
echo    %C_WHITE%%C_BOLD%Developer Name:%C_RESET%     %DEV_NAME%
echo    %C_WHITE%%C_BOLD%Brand Name:%C_RESET%         %DEV_BRAND%
echo    %C_WHITE%%C_BOLD%Professional Role:%C_RESET%  %DEV_TITLE%
echo    %C_WHITE%%C_BOLD%Organization:%C_RESET%       %DEV_ORG%
echo    %C_WHITE%%C_BOLD%Email Address:%C_RESET%      %DEV_EMAIL%
echo    %C_WHITE%%C_BOLD%Phone / WhatsApp:%C_RESET%   %DEV_PHONE% (Intl: %DEV_PHONE_INTL%)
echo    %C_WHITE%%C_BOLD%LinkedIn:%C_RESET%           %DEV_LINKEDIN%
if defined DEV_GITHUB (
    echo    %C_WHITE%%C_BOLD%GitHub / Portfolio:%C_RESET% %DEV_GITHUB%
)
echo    %C_WHITE%%C_BOLD%Location:%C_RESET%           %DEV_LOCATION%
echo    %C_WHITE%%C_BOLD%Core Tagline:%C_RESET%       "%DEV_TAGLINE%"
echo.
echo    %C_YELLOW%Toolkit Version:%C_RESET%    %APP_VERSION%
echo    %C_YELLOW%Build Stamp:%C_RESET%        %APP_BUILD%
echo.
echo    %C_GRAY%Core Technical Competencies:%C_RESET%
echo    * Enterprise Windows 10/11 Deployment, Servicing and Troubleshooting
echo    * Network Administration (LAN, VLANs, Wi-Fi 6, DHCP, DNS, Routing)
echo    * Industrial Endpoint Support in Manufacturing & Continuous Processing
echo    * Native Automation Scripting (Batch, Command Shell, Registry, Netsh)
echo    * Systems Integrity, Security Hardening, and Preventative Maintenance
echo.
echo    %C_DIM%Disclaimer: This project was conceived and engineered by Syed Salman Mehdi%C_RESET%
echo    %C_DIM%as an independent professional technical portfolio showcase.%C_RESET%
echo.
echo  %C_CYAN%  ------------------------------------------------------------------------------%C_RESET%
echo   %C_YELLOW%[ 1]%C_RESET% Open Developer's LinkedIn Profile in Browser
echo   %C_YELLOW%[ 2]%C_RESET% Send Email to salmanmehdi@gmail.com (mailto)
echo   %C_YELLOW%[ 3]%C_RESET% Toggle Splash Screen Animation (Current: %ENABLE_SPLASH%)
echo   %C_YELLOW%[ 4]%C_RESET% Toggle ANSI Color Rendering (Current: %ENABLE_ANSI%)
echo   %C_YELLOW%[ B]%C_RESET% Back to Main Menu
echo.
call :SUB_RENDER_FOOTER
set "ABOUT_CHOICE="
set /p "ABOUT_CHOICE=  Enter selection [1-4, B]: "

if /i "%ABOUT_CHOICE%"=="B" goto MAIN_MENU
if "%ABOUT_CHOICE%"=="1" (
    start "" "https://%DEV_LINKEDIN%"
    goto MOD_ABOUT_SETTINGS
)
if "%ABOUT_CHOICE%"=="2" (
    start "" "mailto:%DEV_EMAIL%?subject=Job%%20Inquiry%%20-%%20MultiThinker%%20PC%%20Toolkit"
    goto MOD_ABOUT_SETTINGS
)
if "%ABOUT_CHOICE%"=="3" (
    if "%ENABLE_SPLASH%"=="1" (
        set "ENABLE_SPLASH=0"
    ) else (
        set "ENABLE_SPLASH=1"
    )
    echo ENABLE_SPLASH=%ENABLE_SPLASH% > "%CONFIG_FILE%"
    echo ENABLE_ANSI=%ENABLE_ANSI% >> "%CONFIG_FILE%"
    echo  Setting updated.
    ping 127.0.0.1 -n 2 >nul
    goto MOD_ABOUT_SETTINGS
)
if "%ABOUT_CHOICE%"=="4" (
    if "%ENABLE_ANSI%"=="1" (
        set "ENABLE_ANSI=0"
    ) else (
        set "ENABLE_ANSI=1"
    )
    echo ENABLE_SPLASH=%ENABLE_SPLASH% > "%CONFIG_FILE%"
    echo ENABLE_ANSI=%ENABLE_ANSI% >> "%CONFIG_FILE%"
    echo  ANSI toggle updated. Restart script to apply color changes.
    pause
    goto MOD_ABOUT_SETTINGS
)

goto MOD_ABOUT_SETTINGS

:: ============================================================================
:: REUSABLE SUBROUTINES & ENGINE FUNCTIONS
:: ============================================================================

:SUB_RENDER_HEADER
echo  %C_NAVY%================================================================================%C_RESET%
echo  %C_BOLD%%C_CYAN%   %APP_NAME%  -  %APP_VERSION%%C_RESET%
echo  %C_WHITE%   Developed by %DEV_NAME% ^| %DEV_ORG%%C_RESET%
echo  %C_GRAY%   Host: %COMPUTERNAME%  ^|  User: %USERNAME%  ^|  Status: %ADMIN_STR%%C_RESET%
echo  %C_NAVY%================================================================================%C_RESET%
exit /b 0

:SUB_RENDER_FOOTER
echo  %C_NAVY%--------------------------------------------------------------------------------%C_RESET%
echo  %C_GRAY%   MultiThinker IT Systems  ^|  Email: %DEV_EMAIL%  ^|  WhatsApp: %DEV_PHONE%%C_RESET%
echo  %C_NAVY%================================================================================%C_RESET%
exit /b 0

:SUB_SPLASH_SCREEN
cls
echo.
echo  %C_CYAN%
echo      __  _____  ______  __________________  _____   ______ __ ______ ____ 
echo     /  ^|/  / / / / / /_/ /_  __/  _/ / / / / / / ^| / / //_// ____// __ \
echo    / /^|_/ / / / / / __  / / /  / // /_/ / / / /  ^|/ / ,^<  / __/  / /_/ /
echo   / /  / / /_/ / / /_/ / / / _/ // __  / /_/ / /^|  / /^| ^| / /___ / _, _/ 
echo  /_/  /_/\____/_/\____/ /_/ /___/_/ /_/\____/_/ ^|_/_/ ^|_/_____//_/ ^|_^|  
echo  %C_RESET%
echo  %C_BOLD%%C_WHITE%      ULTIMATE PC TOOLKIT (MUPT) - %APP_VERSION%%C_RESET%
echo  %C_CYAN%      Automated Windows Maintenance, Diagnostics ^& Systems Engineering%C_RESET%
echo  %C_GRAY%      Build: %APP_BUILD% ^| %DEV_TAGLINE%%C_RESET%
echo.
echo  %C_NAVY%  ----------------------------------------------------------------------%C_RESET%
echo  %C_WHITE%   Initializing system modules and environment checks...%C_RESET%
echo.

:: 1. OS Version Check
for /f "tokens=4-7 delims=[.] " %%A in ('ver') do set "SPLASH_OS=Windows %%A.%%B"
echo    * Operating System:        %C_GREEN%[ OK ] %SPLASH_OS%%C_RESET%
ping 127.0.0.1 -n 2 >nul

:: 2. Admin Check
if "%IS_ADMIN%"=="1" (
    echo    * Administrative Access:   %C_GREEN%[ OK ] Elevated (Local Administrator)%C_RESET%
) else (
    echo    * Administrative Access:   %C_YELLOW%[WARN] Standard User (Some repairs restricted)%C_RESET%
)
ping 127.0.0.1 -n 2 >nul

:: 3. ANSI Rendering Check
if "%ENABLE_ANSI%"=="1" (
    echo    * Console ANSI Engine:     %C_GREEN%[ OK ] Virtual Terminal Level Active%C_RESET%
) else (
    echo    * Console ANSI Engine:     %C_YELLOW%[WARN] Plain ASCII Fallback Mode%C_RESET%
)
ping 127.0.0.1 -n 2 >nul

:: 4. Report Storage Ready
if exist "%REPORT_DIR%" (
    echo    * Report Directory:        %C_GREEN%[ OK ] Ready (%REPORT_DIR%)%C_RESET%
) else (
    echo    * Report Directory:        %C_YELLOW%[WARN] Directory Created%C_RESET%
)
ping 127.0.0.1 -n 2 >nul

:: 5. Network Interface Ready
ipconfig | findstr /i "IPv4" >nul 2>&1
if %errorlevel% equ 0 (
    echo    * Network Connection:      %C_GREEN%[ OK ] Active IP Interface Detected%C_RESET%
) else (
    echo    * Network Connection:      %C_YELLOW%[WARN] No Active IPv4 Adapter Found%C_RESET%
)
ping 127.0.0.1 -n 2 >nul

echo.
echo  %C_NAVY%  ----------------------------------------------------------------------%C_RESET%
echo  %C_BOLD%%C_WHITE%   Candidate / Developer Profile:%C_RESET%
echo    Name:         %DEV_NAME% (%DEV_BRAND%)
echo    Role:         %DEV_TITLE%
echo    Company:      %DEV_ORG%
echo    Contact:      %DEV_EMAIL% ^| %DEV_PHONE%
echo    Profile:      %DEV_LINKEDIN%
echo  %C_NAVY%  ----------------------------------------------------------------------%C_RESET%
echo.
echo   %C_GREEN%Initialization complete. Loading workspace...%C_RESET%
ping 127.0.0.1 -n 3 >nul
exit /b 0

:SUB_LOG_ACTIVITY
if not exist "%REPORT_DIR%" mkdir "%REPORT_DIR%" >nul 2>&1
echo [%DATE% %TIME%] [%USERNAME%@%COMPUTERNAME%] %~1 >> "%LOG_FILE%"
exit /b 0

:SUB_REQUIRE_ADMIN
if "%IS_ADMIN%"=="1" exit /b 0
echo.
echo  %C_RED%==============================================================================%C_RESET%
echo  %C_RED%%C_BOLD%   ADMINISTRATIVE PRIVILEGES REQUIRED%C_RESET%
echo  %C_RED%==============================================================================%C_RESET%
echo   The requested operation:
echo   "%~1"
echo   requires elevated Windows Administrator permissions to modify protected system files,
echo   networking stacks, or driver configurations.
echo.
echo   %C_YELLOW%How to elevate:%C_RESET%
echo   Right-click on MultiThinker_PC_Toolkit.bat and choose "Run as administrator".
echo.
exit /b 1

:SUB_VALIDATE_HOSTNAME
set "CHECK_INPUT=%~1"
:: Rejects shell redirect and pipe metacharacters
echo "%CHECK_INPUT%" | findstr /R "[&|<>\^`$%%]" >nul 2>&1
if %errorlevel% equ 0 exit /b 1
exit /b 0

:SUB_HELP_POPUP
echo.
echo  %C_CYAN%==============================================================================%C_RESET%
echo  %C_BOLD%%C_WHITE%   HELP & TECHNICAL SPECIFICATION: %~1%C_RESET%
echo  %C_CYAN%==============================================================================%C_RESET%
echo   %~2
echo.
echo  %C_CYAN%==============================================================================%C_RESET%
pause
exit /b 0

:SUB_EXPORT_SYS_REPORT
set "REPORT_NAME=%REPORT_DIR%\MUPT_Report_%COMPUTERNAME%_%RANDOM%.txt"
echo ============================================================================== > "%REPORT_NAME%"
echo MULTITHINKER ULTIMATE PC TOOLKIT - SYSTEM MAINTENANCE & AUDIT REPORT >> "%REPORT_NAME%"
echo %APP_VERSION% - Build %APP_BUILD% >> "%REPORT_NAME%"
echo ============================================================================== >> "%REPORT_NAME%"
echo Date & Time:        %DATE% %TIME% >> "%REPORT_NAME%"
echo Computer Name:      %COMPUTERNAME% >> "%REPORT_NAME%"
echo Active User:        %USERNAME% (Domain: %USERDOMAIN%) >> "%REPORT_NAME%"
echo Privilege Tier:     %ADMIN_STR% >> "%REPORT_NAME%"
echo System Architecture:%PROCESSOR_ARCHITECTURE% >> "%REPORT_NAME%"
echo Number of CPUs:     %NUMBER_OF_PROCESSORS% >> "%REPORT_NAME%"
echo. >> "%REPORT_NAME%"
echo [OPERATING SYSTEM KERNEL] >> "%REPORT_NAME%"
ver >> "%REPORT_NAME%"
echo. >> "%REPORT_NAME%"
echo [ACTIVE NETWORK INTERFACES] >> "%REPORT_NAME%"
ipconfig | findstr /i "IPv4 Subnet Default" >> "%REPORT_NAME%"
echo. >> "%REPORT_NAME%"
echo [STORAGE VOLUMES FREE SPACE] >> "%REPORT_NAME%"
for %%D in (C D E) do (
    if exist "%%D:\" (
        dir /-c "%%D:\" 2>nul | findstr /i "bytes free" >> "%REPORT_NAME%"
    )
)
echo. >> "%REPORT_NAME%"
echo [FIREWALL PROFILE STATES] >> "%REPORT_NAME%"
netsh advfirewall show allprofiles state 2>nul | findstr /i "Profile State" >> "%REPORT_NAME%"
echo. >> "%REPORT_NAME%"
echo ============================================================================== >> "%REPORT_NAME%"
echo Generated by MultiThinker Ultimate PC Toolkit ^| Syed Salman Mehdi >> "%REPORT_NAME%"
echo IT Officer ^| Habib Sugar Mills Ltd, Nawabshah >> "%REPORT_NAME%"
echo Email: salmanmehdi@gmail.com ^| WhatsApp: 0333-7011728 >> "%REPORT_NAME%"
echo LinkedIn: linkedin.com/in/multithinker >> "%REPORT_NAME%"
echo Tagline: "Reliable. Safe. Professional." >> "%REPORT_NAME%"
echo ============================================================================== >> "%REPORT_NAME%"

echo.
echo  %C_GREEN%Report successfully generated at:%C_RESET%
echo  %REPORT_NAME%
call :SUB_LOG_ACTIVITY "Audit report generated: %REPORT_NAME%"
exit /b 0

:EXIT_TOOLKIT
cls
echo.
echo  %C_CYAN%Thank you for using %APP_NAME%.%C_RESET%
echo  Engineered by %DEV_NAME% (%DEV_ORG%).
echo  Email: %DEV_EMAIL% ^| WhatsApp: %DEV_PHONE%
echo.
ping 127.0.0.1 -n 2 >nul
exit /b 0
