//Command: ftp
CommandLine = function()
    output = user_input("ftp> ", false, false, true)
    if(output.len == 0) then return
    listCmd = output.trim.split(" ")
    command = listCmd[0]
    shellArgs = ""
    if(listCmd.len > 1) then
    	listCmd.remove(0)
    	shellArgs = listCmd.join
    end if
    	
    if(command == "quit") then 
        globals.connected = false
        return
    end if
    if(command == "clear") then 
        clear_screen
    else
        output = Launch(command, shellArgs)
        if output and output != 1 then print(output)
    end if
end function

 ParseParams = function(rawParams)
     tokens = rawParams.split(" ")
     params = []
     for t in tokens
         if t != "" then params.push(t)
     end for
     return params
 end function
 
Launch = function(command, shellArgs)
    params = ParseParams(shellArgs)
    if command == "ls" then 
        LsCommand(params)
    else if command == "cd" then 
        CdCommand(params)
    else if command == "get" then 
        GetCommand(params)
    else if command == "put" then 
        PutCommand(params)
    else if command == "mkdir" then 
        MkdirCommand(params)
    else if command == "rm" then 
        RmCommand(params)
    else if command == "pwd" then 
        PwdCommand()
    else if command == "cp" then 
        CpCommand(params)
    else if command == "mv" then 
        MvCommand(params)
    else if command == "help" then 
        ShowHelp
    else 
        print("command not found in ftp.\nType <b>help</b> to access the available ftp commands.")
    end if
end function

CdCommand = function(params)
    if params.len > 0 and (params[0] == "-h" or params[0] == "--help") then 
        print(command_info("cd_usage"))
        return
    end if
    pathFile = ftp_home_dir
    if(params.len > 0) then
        pathFile = get_abs_path(params[0], ftp_current_path)
    end if
    output = ftp_shell.host_computer.File(pathFile)
    if output == null then 
        print "Error: Path not found: " + pathFile
        return
    end if
    if not output.is_folder then
        print "Error: Not a folder"
        return
    end if
    globals.ftp_current_path = pathFile
    print("Directory successfully changed.") 
end function

PwdCommand = function()
    print(ftp_current_path)
end function

CpCommand = function(params)
    if params.len != 2 or params[0] == "-h" or params[0] == "--help" then 
        print(command_info("cp_usage"))
        return
    end if
    
    origFile = get_abs_path(params[0], ftp_current_path)
    destFolder = get_abs_path(params[1], ftp_current_path)
    
    computer = ftp_shell.host_computer
    file = computer.File(origFile)
    if not file then 
        print("cp: can't find " + origFile)
        return
    end if
    
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
    		return
    	end if	
    
    	folder = computer.File(pathParent)
    	newName = destFolder[destFolder.len - (destFolder.len - pathParent.len):]			
    	if newName[0] == "/" then
    		newName = newName[1:]
    	end if
    	if not folder then 
    	    print("cp: can't copy file. " + destFolder + " doesn't exist.")
    	    return
    	end if
    	
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
end function

MvCommand = function(params)
    if params.len != 2 then
    	print(command_info("mv_usage"))
    else
    	origFile = get_abs_path(params[0], ftp_current_path)
    	destFolder = get_abs_path(params[1], ftp_current_path)
    
    	computer = ftp_shell.host_computer
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
    				newName = destFolder[destFolder.len - (destFolder.len - pathParent.len):]			
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
end function

MkdirCommand = function(params)
    if params.len != 1 or params[0] == "-h" or params[0] == "--help" then
    	print(command_info("mkdir_usage"))
    else
    	computer = ftp_shell.host_computer
    	pathFile = params[0]
    	pathParent = parent_path(pathFile)
    	existFile = computer.File(pathFile)
    	
    	if pathParent == pathFile then
    		pathParent = ftp_current_path
    	end if
    
    	parent = computer.File(get_abs_path(pathParent, ftp_current_path))
    	if parent == null then
    		print("mkdir: " + pathParent + " not found")
    
    	else if existFile != null then
    		print("mkdir: " + existFile.path + " file exists")
    
    	else if not parent.has_permission("w") then
    		print("mkdir: permission denied")
    
    	else
    		arrayPath = pathFile.split("/")
    		output = computer.create_folder(parent.path, arrayPath[arrayPath.len - 1])
    		if output != null and output != 1 then
    			print(output)
    		end if 
    
    	end if
    end if
end function

RmCommand = function(params)
    if params.len < 1 or params.len > 2 or params[0] == "-h" or params[0] == "--help" then 
        print(command_info("rm_usage"))
        return
    end if
    
    pathFile = params[0]
    isRecursive = 0
    if params[0] == "-r" then
        if params.len == 1 then 
            print(command_info("rm_usage"))
            return
        end if
        isRecursive = 1
        pathFile = params[1]
    end if
    file = ftp_shell.host_computer.File(get_abs_path(pathFile, ftp_current_path))
        
    if file == null then 
        print("rm: file not found: "+pathFile)
        return
    end if
    if not file.has_permission("w") then 
        print("rm: permission denied")
        return
    end if
    
    if file.is_folder == 1 and isRecursive == 0 and file.is_symlink == 0 then
        print("rm: " + file.name + " is a directory")
    else
        output = file.delete
        if output.len > 0 then print(output)
    end if

end function

ValidateLsInput = function(input)
   return (input == "-la" or input == "-l" or input == "-a")
end function 
 
LsParamsValid = function(prms)
    if prms.len > 3 then return false 
    for p in prms                               
        if p.indexOf("-") != null and not ValidateLsInput(p) then return false
    end for                                     
    return true                                
end function
 
LsCommand = function(params)
    if not LsParamsValid(params) then
    	print(command_info("ls_usage"))
    	
    else
    	computer = ftp_shell.host_computer
    	folderPath = ftp_current_path
    	if params and params[params.len - 1].indexOf("-") == null then
    		folderPath = params[params.len - 1]
    	end if
    	folderPath = get_abs_path(folderPath, ftp_current_path)
    	folder = computer.File(folderPath)
    	if folder == null then
    		print("ls: No such file or directory " + folderPath)
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
end function

PutCommand = function(params)
    if params.len != 2 then
        print(command_info("put_usage"))
        return
    end if
    source = get_abs_path(params[0], current_path)
    dest = get_abs_path(params[1], ftp_current_path)
    output = ftp_shell.scp(source, dest, null, true)
    if output == null then 
        print("put: there is no active remote connections")
    else if output != 1 then 
        print(output)
    end if
end function

GetCommand = function(params)
    if params.len != 2 then
        print(command_info("get_usage"))
        return
    end if
    source = get_abs_path(params[0], ftp_current_path)
    dest = get_abs_path(params[1], current_path)
    output = ftp_shell.scp(source, dest, null, false)
    if output == null then 
        print("put: there is no active remote connections")
    else if output != 1 then 
        print(output)
    end if
end function

ShowHelp = function()
    help = "Available commands: 
    ls <path>        - List files and directories.
    cd <path>        - Change current directory.
    pwd              - Show current directory.
    get <file>       - Download a file from the server.
    put <file>       - Upload a file to the server.
    mkdir <dirname>  - Create a new directory.
    rm <file>        - Delete a file.
    cp <file>        - Copy a file.
    mv <file>        - Move a file.
    quit             - Close the FTP connection.
            
Type the command followed by any required arguments."
print(help)
end function

//Main
if params.len < 2 or params.len > 3 then exit(command_info("ftp_usage"))
credentials = params[0].split("@")
user = credentials[0]
password = credentials[1]
connected = true
port = 21
if params.len == 3 then port = params[2].to_int
if typeof(port) != "number" then exit("Invalid port: " + port)
print("Connecting...")
ftp_current_path = ""
ftp_home_dir = ""
ftp_shell = get_shell.connect_service(params[1], port, user, password, "ftp")
if typeof(ftp_shell) == "string" then exit(ftp_shell)
if ftp_shell then
    ftp_current_path = "/root"
    if user != "root" then ftp_current_path = "/home/" + user
    ftp_home_dir = ftp_current_path    
    while connected
        CommandLine
    end while
else 
    print("connection failed")
end if