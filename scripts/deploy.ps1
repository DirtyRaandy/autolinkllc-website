$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

function Load-DotEnv {
    param([string]$Path = ".env")
    if (-not (Test-Path $Path)) { return }
    Get-Content $Path | ForEach-Object {
        $line = $_.Trim()
        if (-not $line -or $line.StartsWith("#")) { return }
        $eq = $line.IndexOf("=")
        if ($eq -lt 1) { return }
        $key = $line.Substring(0, $eq).Trim()
        $value = $line.Substring($eq + 1).Trim()
        if ($value.StartsWith('"') -and $value.EndsWith('"')) {
            $value = $value.Substring(1, $value.Length - 2)
        }
        Set-Item -Path "env:$key" -Value $value
    }
}

$commitMessage = if ($args.Count -gt 0) { ($args -join " ") } else { "Update website" }

if (-not (Test-Path ".git")) {
    throw "Git is not initialized in this folder. Run setup first."
}

$changes = git status --porcelain
if ($changes) {
    git add -A
    git commit -m $commitMessage
    Write-Host "Committed: $commitMessage"
} else {
    Write-Host "No local changes to commit."
}

$branch = git rev-parse --abbrev-ref HEAD
git push -u origin $branch
Write-Host "Pushed to GitHub ($branch)."

Load-DotEnv

if ($env:NETLIFY_AUTH_TOKEN -and $env:NETLIFY_SITE_ID) {
    Write-Host "Deploying to Netlify..."
    npx --yes netlify-cli deploy --prod --dir . --site $env:NETLIFY_SITE_ID
    Write-Host "Live on Netlify."
} else {
    Write-Host ""
    Write-Host "GitHub push complete."
    Write-Host "If Netlify is linked to this repo, the site will update automatically."
    Write-Host "For direct CLI deploys, copy .env.example to .env and add NETLIFY_AUTH_TOKEN + NETLIFY_SITE_ID."
}
