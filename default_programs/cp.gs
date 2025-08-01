//command: cp
if params.len != 2 or params[0] == "-h" or params[0] == "--help" then exit(command_info("cp_usage"))

origFile = get_abs_path(params[0])
destFolder = get_abs_path(params[1])

computer = get_shell.host_computer
file = computer.File(origFile)
if not file then exit("cp: can't find " + origFile)

newName = ""
folder = computer.File(destFolder)
if not folder then
	//Check if the user wants to put a new name.
	pathParent = parent_path(destFolder)
					
	if pathParent == destFolder then			
		newName = destFolder
		destFolder = file.parent.path		
		output = file.copy(destFolder, newName)
		if output and output != 1 then print(output)
		exit
	end if	

	folder = computer.File(pathParent)
	newName = destFolder[destFolder.len - (destFolder.len - pathParent.len):-1]			
	if newName[0] == "/" then
		newName = newName[1:]
	end if
	if not folder then exit("cp: can't copy file. " + destFolder + " doesn't exist.")
	
end if

if folder then
			
	//Check if is trying to copy the file on itself. Ignored.
	if file.parent.path != folder.parent.path or file.name != folder.name then

		finalDest = folder.path
				
		if(newName.len == 0) then
			newName = file.name
		end if

		if not folder.is_folder then			
			finalDest = file.parent.path
			newName = folder.name
		end if

		output = file.copy(finalDest, newName)
		if output and output != 1 then print(output)

	end if
end if

