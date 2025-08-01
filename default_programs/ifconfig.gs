//command: ifconfig
if params.len != 0 and (params.len != 4 or params[0] == "-h" or params[0] == "--help") then exit(command_info("ifconfig_usage"))
computer = get_shell.host_computer
if (params.len == 0) then
	router = get_router    
	if computer.is_network_active then
	    lip = computer.local_ip
    	pip = router.public_ip
    	gw = computer.network_gateway
	    if computer.active_net_card == "WIFI" then
	        if router.local_ip != gw then
	            router = get_router(gw)
	        end if		    
		    output = "\nConnected to Wi-Fi:\nEssid: " + router.essid_name + "\nBssid: " + router.bssid_name
		else
		    output = "\nEthernet connection:"    
		end if
	else
		lip = "0.0.0.0"
		pip = "0.0.0.0"
		gw = "0.0.0.0"
		output = "\nNot connected to the network."
	end if
	print( output + "\n----------------\nPublic IP: " + pip + "\nLocal IP: " + lip + "\nGateway: " + gw + "\n")
else 
	if params[2] != "gateway" then exit(command_info("ifconfig_usage"))
	device = params[0]
	address = params[1]
	gateway = params[3]
	if not is_valid_ip(address) then exit("ifconfig: invalid ip address")
	if not is_valid_ip(gateway) then exit("ifconfig: invalid gateway")
	output = computer.connect_ethernet(device, address, gateway)
	if output.len > 0 then print(output)
end if
