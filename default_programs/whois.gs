//command: whois
if params.len != 1 or params[0] == "-h" or params[0] == "--help" then
	print(command_info("whois_usage"))
else
	address = params[0]
	print(whois(address))
end if
