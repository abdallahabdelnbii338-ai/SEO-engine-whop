# Push to GitHub using a Personal Access Token (do not commit the token).
# Usage:
#   $env:GITHUB_TOKEN = "github_pat_...."
#   .\scripts\push-github.ps1

param(
    [string]$Token = $env:GITHUB_TOKEN
)

$ErrorActionPreference = "Stop"
$repo = "abdallahabdelnbii338-ai/SEO-engine-whop"
$root = Split-Path -LiteralPath $PSScriptRoot -Parent

if (-not (Test-Path (Join-Path $root ".git"))) {
    Write-Error "Not a git repo. Run from launchos folder or use push-to-github.ps1 in the project root."
}

if (-not $Token) {
    Write-Host "Set GITHUB_TOKEN first, e.g.:"
    Write-Host '  $env:GITHUB_TOKEN = "github_pat_..."'
    Write-Host "  .\scripts\push-github.ps1"
    exit 1
}

Set-Location -LiteralPath $root
$remote = "https://x-access-token:$Token@github.com/$repo.git"

Write-Host "Pushing main to $repo ..."
git push $remote main:main
if ($LASTEXITCODE -eq 0) {
    git branch --set-upstream-to=origin/main main 2>$null
    git remote set-url origin "https://github.com/$repo.git"
    Write-Host "Done. Repo: https://github.com/$repo"
} else {
    Write-Host ""
    Write-Host "Push failed. Create a new token with WRITE access:"
    Write-Host "  GitHub -> Settings -> Developer settings -> Fine-grained tokens"
    Write-Host "  Repository: SEO-engine-whop"
    Write-Host "  Permissions: Contents = Read and write, Metadata = Read"
    Write-Host "  OR use Classic token with 'repo' scope"
    exit $LASTEXITCODE
}
