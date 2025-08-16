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
    # Resolve gh executable if not on PATH
    function Resolve-GhPath {
        $cmd = Get-Command gh -ErrorAction SilentlyContinue
        if ($cmd) { return $cmd.Path }

        $candidates = @(
            "$env:ProgramFiles\GitHub CLI\bin\gh.exe",
            "$env:ProgramFiles\GitHub CLI\gh.exe",
            "$env:ProgramFiles(x86)\GitHub CLI\bin\gh.exe",
            "$env:ProgramFiles(x86)\GitHub CLI\gh.exe",
            "$env:ProgramW6432\GitHub CLI\bin\gh.exe"
        )

        foreach ($p in $candidates) {
            if ($p -and (Test-Path $p)) { return $p }
        }

        return $null
    }

    $ghPath = Resolve-GhPath
    if (-not $ghPath) {
        Log "gh CLI not found in PATH or known locations; ensure GitHub CLI is installed and available to this session."
        $status = $null
    } else {
        $status = & $ghPath api repos/$Owner/$Repo/pages -q ".https_enforced" 2>$null
    }

    if ($status -eq "true") {
        Log "HTTPS already enforced. Exiting."
        exit 0
    }

    # Try to enable HTTPS. If certificate not present, the API will return an error.
    Log "Attempt ${i}: trying to enable HTTPS via API..."
    if (-not $ghPath) {
        $putOutput = "gh not available"
        $exit = 1
    } else {
    # Use a JSON payload to send a boolean for https_enforced
    $json = '{"https_enforced": true}'
    $putOutput = & $ghPath api -X PUT repos/$Owner/$Repo/pages -H "Accept: application/vnd.github+json" -f raw=$json 2>&1
    $exit = $LASTEXITCODE
    }
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
