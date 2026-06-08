$ErrorActionPreference = "Stop"

$configPath = Join-Path $env:APPDATA "netlify\Config\config.json"
if (-not (Test-Path $configPath)) {
    throw "Netlify CLI is not logged in. Run: npx netlify login"
}

$config = Get-Content $configPath -Raw | ConvertFrom-Json
$userId = $config.userId
$token = $config.users.$userId.auth.token

$siteId = "7a785192-b9be-46a4-94ab-a3995a91c40b"
$body = @{
    repo = @{
        provider = "github"
        repo = "DirtyRaandy/autolinkllc-website"
        branch = "main"
        dir = "."
        cmd = ""
    }
} | ConvertTo-Json -Depth 5

$headers = @{
    Authorization = "Bearer $token"
    "Content-Type" = "application/json"
}

$response = Invoke-RestMethod `
    -Method Patch `
    -Uri "https://api.netlify.com/api/v1/sites/$siteId" `
    -Headers $headers `
    -Body $body

Write-Host "Linked Netlify site to GitHub repo: $($response.build_settings.repo_url)"
Write-Host "Production URL: $($response.ssl_url)"
