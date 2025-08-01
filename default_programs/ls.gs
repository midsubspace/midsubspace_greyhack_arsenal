//command: ls
ValidateInput = function(input)
	return (input == "-la" or input == "-l" or input == "-a")
end function 

 ParamsValid = function(params)
     if params.len > 3 then return false 
     for p in params                               
         if p.indexOf("-") != null and not ValidateInput(p) then return false
     end for                                     
     return true                                
 end function
 
if not ParamsValid(params) then
	print(command_info("ls_usage"))
	
else
	computer = get_shell.host_computer
	folderPath = current_path
	if params and params[params.len - 1].indexOf("-") == null then
		folderPath = params[params.len - 1]
	end if
	
	folder = computer.File(folderPath)
	if folder == null then
		print("ls: No such file or directory")
	else
		if not folder.has_permission("r") then
			print("ls: permission denied")

		else
			showHide = 0
			if params and params[0].indexOf("a") != null then
				showHide = 1
			end if

			showDetails = 0
			if params and params[0].indexOf("l") != null then
				showDetails = 1
			end if

			subFiles = folder.get_folders + folder.get_files
			output = ""
			for subFile in subFiles
				nameFile = subFile.name
				permission = subFile.permissions
				owner = subFile.owner
				size = subFile.size
				group = subFile.group

				if showHide or nameFile.indexOf(".") != 0 then
					if output.len > 0 then 
						output = output + "\n"
					end if
					if showDetails then
						output = output + permission + " " + owner + " " + group + " " + size + " 00:00 " + nameFile
						if subFile.is_symlink then output = output + "-->" + subFile.path(true)
					else
						output = output + nameFile
					end if
				end if
			end for
			
			print(format_columns(output))
			
		end if
	end if
end if
