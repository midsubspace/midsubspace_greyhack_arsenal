Bash = function()
    deviceName = get_shell.host_computer.get_name
    promptCurrentFolder = deviceName + current_path + "$"
    if (active_user == "root") then
        promptCurrentFolder = deviceName + ":" + current_path + "#"
    else if (home_dir == current_path) then
        promptCurrentFolder = deviceName + ":~$"
    end if
    
	output = user_input(active_user + "@" + promptCurrentFolder + " ", false, false, true)
	if(output.len == 0) then return
	
	listCmd = output.trim.split(" ")
	command = listCmd[0]
	shellArgs = ""
	if(listCmd.len > 1) then
		listCmd.remove(0)
		shellArgs = listCmd.join
	end if
	
	if(command == "exit") then exit
	if(command == "clear") then 
	    clear_screen
	else
	    cmdPath = GetFinalPath(command)
	    output = get_shell.launch(cmdPath, shellArgs)
	    if output and output != 1 then print(output)
	end if
end function

GetFinalPath = function(command)
    paths = [current_path, "/bin", "/usr/bin"]
	for i in range(0, paths.len - 1)
	    if i == 0 then
		    absPath = get_abs_path(command)
		else 
		    absPath = paths[i] + "/" + command
		end if
	 	cmdFile = get_shell.host_computer.File(absPath)
		if (cmdFile != null) then return absPath
	end for
	return command
end function

while(true)
	Bash()
end while