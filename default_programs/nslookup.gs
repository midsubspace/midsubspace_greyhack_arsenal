//command: nslookup
if params.len != 1 or params[0] == "-h" or params[0] == "--help" then
	print(command_info("nslookup_usage"))
else
	address = params[0]
	print("Address: "+nslookup(address));
end if
