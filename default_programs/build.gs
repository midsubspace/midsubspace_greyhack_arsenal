//command: build
if params.len != 2 then
	print(command_info("build_usage"))
else
	pathSource = params[0]
	programPath = params[1]

	shell = get_shell
	computer = shell.host_computer
	fileSource = computer.File(pathSource)
	folderDest = computer.File(programPath)

	if fileSource == null then exit("build: can't find "+ pathSource)
	if folderDest == null then exit("build: can't find " + programPath)
	
	output = shell.build(fileSource.path, folderDest.path)
	if output.len == 0 then
		print("build successful.")
	else
		print(output);
	end if
end if
