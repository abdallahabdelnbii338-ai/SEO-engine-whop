# Run after replacing [YOUR-PASSWORD] in .env.local
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$envFile = ".env.local"
$content = Get-Content $envFile -Raw
if ($content -match '\[YOUR-PASSWORD\]') {
  Write-Host "ERROR: Replace [YOUR-PASSWORD] in .env.local with your Supabase database password first." -ForegroundColor Red
  Write-Host "Get it: https://supabase.com/dashboard/project/baextjforbphiupqaolb/settings/database"
  exit 1
}

Write-Host "Pushing Prisma schema to Supabase..."
npx prisma db push
Write-Host "Done. Restart: npm run dev"
