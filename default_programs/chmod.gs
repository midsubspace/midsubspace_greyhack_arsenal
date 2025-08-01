//command: chmod
if params.len < 2 or (params.len == 3 and params[0] != "-R") then exit(command_info("chmod_usage"))

permissions = params[0]
pathFile = params[1]
isRecursive = 0

if params.len == 3 then
    permissions = params[1]
	pathFile = params[2]
	isRecursive = 1
end if

file = get_shell.host_computer.File(pathFile)
if file == null then exit("chmod: can't find " + pathFile)
output = file.chmod(permissions, isRecursive)
if output then print(output)
	

