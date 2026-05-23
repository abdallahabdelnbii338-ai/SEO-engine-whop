@echo off
REM Double-click or run from CMD. Set your token first:
REM   set GITHUB_TOKEN=github_pat_your_token_here
REM   push-to-github.bat

cd /d "%~dp0"
if "%GITHUB_TOKEN%"=="" (
  echo ERROR: Set GITHUB_TOKEN first.
  echo   set GITHUB_TOKEN=github_pat_...
  echo   push-to-github.bat
  exit /b 1
)

echo Pushing to GitHub...
git -C "%~dp0." push "https://x-access-token:%GITHUB_TOKEN%@github.com/abdallahabdelnbii338-ai/SEO-engine-whop.git" HEAD:refs/heads/main
if errorlevel 1 (
  echo.
  echo Push failed. Use a CLASSIC token with "repo" scope:
  echo https://github.com/settings/tokens/new
  exit /b 1
)

echo.
echo Success! https://github.com/abdallahabdelnbii338-ai/SEO-engine-whop
pause
