Import-Module pswatch

watch | Where-Object { $_.Path -notlike "*.git*" } | Get-Item | Where-Object { $_.Extension -eq ".coffee" } | %{
	cls
	Write-Host "$_ changed."
	Invoke-psake -taskList test .\build.ps1
}