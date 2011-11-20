properties {
}

task default -depends Test

task IntegrationTests -depends UnitTests { 
  $paths = Get-ChildItem speclib/integration -Recurse -Include *-spec.js | ForEach-Object { Resolve-Path $_.FullName -Relative }
  exec { vows $paths --spec }
}

task UnitTests -depends Compile { 
  $paths = Get-ChildItem speclib/app -Recurse -Include *-spec.js | ForEach-Object { Resolve-Path $_.FullName -Relative }
  exec { vows $paths --spec }
}

task Test -depends UnitTests, IntegrationTests

task Compile -depends Clean { 
  exec { coffee --bare --compile --output lib/ src/ }
  exec { coffee --bare --compile --output speclib/ spec/ }
}

task Clean {
  if (Test-Path lib) { Remove-Item lib -Recurse }
  if (Test-Path speclib) { Remove-Item speclib -Recurse }
}

task ? -Description "Helper to display task info" {
	Write-Documentation
}