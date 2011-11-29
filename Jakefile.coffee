exec = (require 'child_process').exec

desc 'Default task.'
task 'default', ['Test'], ->

task 'IntegrationTests', ['UnitTests'], ->
  #$paths = Get-ChildItem speclib/integration -Recurse -Include *-spec.js | ForEach-Object { Resolve-Path $_.FullName -Relative }
  #exec { vows $paths --spec }

task 'UnitTests', ['Compile'], ->
  #$paths = Get-ChildItem speclib/unit -Recurse -Include *-spec.js | ForEach-Object { Resolve-Path $_.FullName -Relative }
  exec 'vows speclib/unit/domain/* speclib/unit/app/*', ((error, output)-> complete(output)), true

task 'Test', ['UnitTests', 'IntegrationTests'], ->

task 'Compile', ['Clean'], ->
  exec 'coffee --bare --compile --output lib/ src/', ((error, output)-> complete()), true
  exec 'coffee --bare --compile --output speclib/ spec/', (-> complete()), true

task 'Clean', [], ->
  exec 'rm -rf lib', -> complete()
  exec 'rm -rf speclib', -> complete()
