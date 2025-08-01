//command: mv
if params.len != 2 then
	print(command_info("mv_usage"))
else
	origFile = get_abs_path(params[0])
	destFolder = get_abs_path(params[1])

	computer = get_shell.host_computer
	file = computer.File(origFile)
	if file == null then
		print("mv: can't find " + origFile)

	else
		newName = ""
		folder = computer.File(destFolder)
		if folder == null then
			//Check if the user wants to put a new name.
			pathParent = parent_path(destFolder)
					
			if pathParent == destFolder then			
				newName = destFolder
				destFolder = file.parent.path		
				file.move(destFolder, newName)

			else

				folder = computer.File(pathParent)
				newName = destFolder[destFolder.len - (destFolder.len - pathParent.len):-1]	
				if newName[0] == "/" then
					newName = newName[1:]
				end if
				if folder == null then				
					print("mv: can't copy file. " + destFolder + " doesn't exist.")
				end if			
			end if
		
		end if

		if folder != null then
			
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

				if file.parent.path == folder.parent.path and newName != file.name then
					file.rename(newName)
				else
					file.move(finalDest, newName)
				end if
			end if
		end if
	end if
end if