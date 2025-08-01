//command: cat
if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit(command_info("cat_usage"))

pathFile = params[0]
file = get_shell.host_computer.File(pathFile)

if file == null then exit("cat: file not found: "+pathFile)
if file.is_binary then exit("cat: can't open " + file.path + ". Binary file")	
if not file.has_permission("r") then exit("cat: permission denied")

print(file.get_content)
