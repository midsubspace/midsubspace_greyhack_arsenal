//Command: ping
if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit(command_info("ping_usage"))
result = get_shell.ping(params[0])
if result then
    if typeof(result) == "string" then
        print(result) 
	else
	    print("Ping successful")
	end if
else
	print("ip unreachable");
end if
