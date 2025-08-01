//command: chown
if params.len < 2 or (params.len == 3 and params[0] != "-R") then exit(command_info("chown_usage"))

owner = params[0]
pathFile = params[1]
isRecursive = 0

if params.len == 3 then
    owner = params[1]
    pathFile = params[2]
    isRecursive = 1
end if

file = get_shell.host_computer.File(pathFile)
if file == null then exit("chown: file not found: "+pathFile)
output = file.set_owner(owner, isRecursive)
if output then print(output)