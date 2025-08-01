//command: ln
if params.len > 0 and params[0] == "-s" then
    params = params[1:]
end if
if params.len != 2 or params[0] == "-h" or params[0] == "--help" then exit(command_info("ln_usage"))

pathFile = params[0]
pathLink = params[1]
pathParent = parent_path(pathLink)
if pathParent == pathLink then
	pathParent = current_path
end if

file = get_shell.host_computer.File(pathFile)
	
if file == null then exit("ln: file not found: "+pathFile)
if not file.has_permission("w") then exit("ln: permission denied")

arrayPath = pathLink.split("/")
newName = arrayPath[arrayPath.len-1]
output = file.symlink(pathParent, newName)
if output and output != 1 then print(output)
