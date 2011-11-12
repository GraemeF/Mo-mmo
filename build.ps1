properties {
}

task default -depends Test

task Test -depends Compile, Clean { 
  exec { vows speclib/helloworld.js --spec }
}

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