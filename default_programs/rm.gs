//command: rm
if params.len < 1 or params.len > 2 or params[0] == "-h" or params[0] == "--help" then exit(command_info("rm_usage"))

pathFile = get_abs_path(params[0])
isRecursive = 0
if params[0] == "-r" then
	if params.len == 1 then exit(command_info("rm_usage"))
	isRecursive = 1
	pathFile = params[1]
end if
file = get_shell.host_computer.File(pathFile)
	
if file == null then exit("rm: file not found: "+pathFile)
if not file.has_permission("w") then exit("rm: permission denied")

if file.is_folder == 1 and isRecursive == 0 and file.is_symlink == 0 then
	print("rm: " + file.name + " is a directory")
else
	output = file.delete
	if output.len > 0 then print(output)
end if
