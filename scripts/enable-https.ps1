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
        Log "HTTPS enforced. Exiting."
        exit 0
    }

    if ($status -eq "false") {
        Log "HTTPS not yet enforced. Certificate may be provisioning. Will retry after waiting."
    } elseif (-not $status) {
        Log "Could not read Pages https_enforced status; ensure gh is available and repository Pages is configured."
    } else {
        Log "Pages status: $status. Waiting..."
    }

    Log "Sleeping $IntervalSeconds seconds before next attempt..."
    Start-Sleep -Seconds $IntervalSeconds
}

Log "Max attempts reached ($MaxAttempts). Giving up. Check logs in $PSScriptRoot/enable-https.log and Pages settings."
exit 1
