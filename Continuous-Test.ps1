Import-Module pswatch

Function Rebuild($message)
{
	cls
	Write-Host $message
	Invoke-psake .\build.ps1
}

Rebuild "Starting up."
watch | Where-Object { $_.Path -notlike "*.git*" } | Get-Item | Where-Object { $_.Extension -eq ".coffee" } | %{
	cls
	Write-Host "$_ changed."
	Invoke-psake .\build.ps1
}