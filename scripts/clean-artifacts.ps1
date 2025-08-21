# PowerShell script to clean local build artifacts and runtime PID files
Write-Host 'Cleaning dist/, pids/, and node_modules/ (if present)...'
$paths = @("dist","pids","node_modules")
foreach ($p in $paths) {
    if (Test-Path $p) {
        Write-Host ('Removing ' + $p)
        try {
            Remove-Item -LiteralPath $p -Recurse -Force -ErrorAction Stop
            Write-Host ('Removed ' + $p)
        } catch {
            Write-Host ('Failed to remove ' + $p + ': ' + $_.Exception.Message)
        }
    } else {
        Write-Host ($p + ' not found, skipping')
    }
}
Write-Host 'Cleanup complete. Note: lockfiles are preserved (required for npm ci).'
