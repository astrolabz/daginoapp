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
    $logPath = Join-Path $PSScriptRoot "enable-https.log"
    "[$ts] $msg" | Out-File -FilePath $logPath -Append -Encoding utf8
    Write-Output "[$ts] $msg"
}

Log ("Starting HTTPS enforcer for {0}/{1} (max {2} attempts, every {3} s)" -f $Owner, $Repo, $MaxAttempts, $IntervalSeconds)

for ($i = 1; $i -le $MaxAttempts; $i++) {
    Log ("Attempt {0}/{1}: querying Pages status..." -f $i, $MaxAttempts)
    # Resolve gh executable if not on PATH
    function Resolve-GhPath {
        $cmd = Get-Command gh -ErrorAction SilentlyContinue
        if ($cmd) { return $cmd.Path }

        $candidates = @(
            (Join-Path $env:ProgramFiles "GitHub CLI\bin\gh.exe"),
            (Join-Path $env:ProgramFiles "GitHub CLI\gh.exe"),
            (Join-Path ${env:ProgramFiles(x86)} "GitHub CLI\bin\gh.exe"),
            (Join-Path ${env:ProgramFiles(x86)} "GitHub CLI\gh.exe"),
            (Join-Path $env:ProgramW6432 "GitHub CLI\bin\gh.exe")
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
        Log ("Pages status: {0}. Waiting..." -f $status)
    }

    Log ("Sleeping {0} seconds before next attempt..." -f $IntervalSeconds)
    Start-Sleep -Seconds $IntervalSeconds
}

Log ("Max attempts reached ({0}). Giving up. Check logs in {1} and Pages settings." -f $MaxAttempts, (Join-Path $PSScriptRoot "enable-https.log"))
exit 1
