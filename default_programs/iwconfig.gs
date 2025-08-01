//command: iwconfig
if params.len != 4 or params[0] == "-h" or params[0] == "--help" then exit(command_info("iwconfig_usage"))	
computer = get_shell.host_computer
devices = computer.network_devices
if devices == null or devices.indexOf(params[0]) == null then exit("iwconfig: Network device not found")
bssid = params[1]
essid = params[2]
password = params[3]
status = computer.connect_wifi(params[0], bssid, essid, password)
if typeof(status) == "string" then print(status)
