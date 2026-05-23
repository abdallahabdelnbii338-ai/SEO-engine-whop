# Run from anywhere: right-click -> Run with PowerShell, OR:
#   powershell -ExecutionPolicy Bypass -File "C:\Users\abdal\Desktop\SEO, whop\launchos\push-to-github.ps1
#
# Set token first (do not commit this):
#   $env:GITHUB_TOKEN = "github_pat_..."

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$repo = "abdallahabdelnbii338-ai/SEO-engine-whop"
$Token = $env:GITHUB_TOKEN

if (-not (Test-Path (Join-Path $root ".git"))) {
    Write-Error "Not a git repo: $root"
}

if (-not $Token) {
    Write-Host @"

GITHUB_TOKEN is not set.

In PowerShell, run these lines (use quotes because of the comma in the folder name):

  cd "$root"
  `$env:GITHUB_TOKEN = "paste_your_token_here"
  .\push-to-github.ps1

"@
    exit 1
}

Set-Location -LiteralPath $root

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "git is not installed or not in PATH. Install Git for Windows: https://git-scm.com/download/win"
}

Write-Host "Project: $root"
Write-Host "Pushing to https://github.com/$repo (branch main) ..."

# Use -C so paths with commas never break; quote remote URL for PowerShell
$gitDir = $root -replace '\\', '/'
$remote = "https://x-access-token:$Token@github.com/$repo.git"
& git -C $gitDir push $remote HEAD:refs/heads/main

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Push failed. Your token needs Contents: Read and write on SEO-engine-whop"
    Write-Host "(or classic token with 'repo' scope)."
    exit $LASTEXITCODE
}

git remote set-url origin "https://github.com/$repo.git" 2>$null
Write-Host ""
Write-Host "Success! Open: https://github.com/$repo"
Write-Host "Then redeploy on Vercel (branch: main)."
