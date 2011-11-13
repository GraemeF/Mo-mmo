Import-Module pswatch

Function Rebuild($message)
{
	cls
	Write-Host $message
	Invoke-psake .\build.ps1
}

Rebuild "Starting up."
watch | Where-Object { ($_.Path -notlike "*.git*") -and ($_.Path -notlike "*.idea*") } | %{ Write-Output $_.Path.Replace("___jb_bak___", "") } | Where-Object { $_.EndsWith(".coffee") } | %{
	cls
	Write-Host "$_ changed."
	Invoke-psake .\build.ps1
}