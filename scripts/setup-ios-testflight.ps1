# One-time iOS credential setup for TestFlight (run in Cursor terminal).
# When prompted, press Y / Enter to generate certificates.

$root = Split-Path -Parent $PSScriptRoot
$env:EXPO_ASC_API_KEY_PATH = Join-Path $root "AuthKey_84T3YX7863.p8"
$env:EXPO_ASC_KEY_ID = "84T3YX7863"
$env:EXPO_ASC_ISSUER_ID = "6543b00f-d5a8-4e8c-8083-325449adaad0"
$env:EXPO_APPLE_TEAM_ID = "6N3H43M5JP"
$env:EXPO_APPLE_TEAM_TYPE = "COMPANY_OR_ORGANIZATION"
$env:EAS_BUILD_NO_EXPO_GO_WARNING = "true"

Set-Location $root
Write-Host "`n>>> Step 1/2: iOS credentials (press Y when asked to generate certificate)`n" -ForegroundColor Cyan
npx eas-cli credentials:configure-build -p ios -e production
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "`n>>> Step 2/2: Build + submit to TestFlight`n" -ForegroundColor Cyan
npx eas-cli build --platform ios --profile production --auto-submit --non-interactive
exit $LASTEXITCODE
