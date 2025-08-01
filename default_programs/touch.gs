//command: touch
if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit(command_info("touch_usage"))

pathFile = params[0]
pathParent = parent_path(pathFile)
computer = get_shell.host_computer

if pathParent == pathFile then
	pathParent = current_path
end if

parent = computer.File(pathParent)

if not parent then exit("touch: " + pathParent + " not found")
if not parent.has_permission("w") then exit("touch: permission denied")

arrayPath = pathFile.split("/")
output = computer.touch(parent.path, arrayPath[arrayPath.len - 1])
if output and output != 1 then print(output)
