# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# Add files and commands to this file, like the example:
#   watch(%r{file/path}) { `command(s)` }
#
guard 'shell' do
  watch /(.*).js/ do |m|
    n m[0], 'Changed'
    `npm test`
  end
end
