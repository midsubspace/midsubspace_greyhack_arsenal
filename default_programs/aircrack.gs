//command: aircrack
cryptools = include_lib("/lib/crypto.so")
if not cryptools then exit("Error: Missing crypto library")
if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit(command_info("aircrack_usage"))

pathFile = params[0]
file = get_shell.host_computer.File(pathFile)
if file == null then exit("aircrack: file not found: "+pathFile)
if not file.is_binary then exit("aircrack: Can't process file. Not valid filecap.")		
if not file.has_permission("r") then exit("aircrack: permission denied")

key = cryptools.aircrack(file.path)
if key then 
	print("KEY FOUND! [" + key + "]" )
else 
	print("aircrack: Unable to get the key" )
end if

