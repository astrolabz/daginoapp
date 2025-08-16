# Poll GitHub Pages and enable HTTPS when certificate is available
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\enable-https.ps1

param(
    [string]$Owner = 'astrolabz',
    [string]$Repo = 'daginoapp',
    [int]$IntervalSeconds = 60,
    [int]$MaxAttempts = 30
)

function Log($msg) {
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "[$ts] $msg" | Out-File -FilePath "$PSScriptRoot/enable-https.log" -Append -Encoding utf8
    Write-Output "[$ts] $msg"
}

Log "Starting HTTPS enforcer for $Owner/$Repo (max $MaxAttempts attempts, every $IntervalSeconds s)"

for ($i = 1; $i -le $MaxAttempts; $i++) {
    Log "Attempt ${i}/${MaxAttempts}: querying Pages status..."
    $status = gh api repos/$Owner/$Repo/pages -q ".https_enforced" 2>$null

    if ($status -eq "true") {
        Log "HTTPS already enforced. Exiting."
        exit 0
    }

    # Try to enable HTTPS. If certificate not present, the API will return an error.
    Log "Attempt ${i}: trying to enable HTTPS via API..."
    $putOutput = gh api -X PUT repos/$Owner/$Repo/pages -f https_enforced=true 2>&1
    $exit = $LASTEXITCODE

    if ($exit -eq 0) {
        Log "Enable request succeeded. Verifying status..."
        $status2 = gh api repos/$Owner/$Repo/pages -q ".https_enforced" 2>$null
        if ($status2 -eq "true") {
            Log "HTTPS enforced successfully. Exiting."
            exit 0
        } else {
            Log "Enable request returned 0 but https_enforced is not true yet. Will retry."
        }
    } else {
        Log "Enable request failed (exit $exit): $putOutput"
    }

    Log "Sleeping $IntervalSeconds seconds before next attempt..."
    Start-Sleep -Seconds $IntervalSeconds
}

Log "Max attempts reached ($MaxAttempts). Giving up. Check logs in $PSScriptRoot/enable-https.log and Pages settings."
exit 1
