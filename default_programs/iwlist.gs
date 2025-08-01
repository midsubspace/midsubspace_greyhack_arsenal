//command: iwlist
if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit(command_info("iwlist_usage"))	
computer = get_shell.host_computer
devices = computer.network_devices
if devices == null or devices.indexOf(params[0]) == null then exit("iwlist: Network device not found")
if params[0].indexOf("eth") != null then exit("iwlist: ethernet cards not supported for this command")
networks = computer.wifi_networks(params[0])
if networks == null then exit(command_info("iwlist_usage"))

info = "BSSID PWR ESSID"
for network in networks
	info = info + "\n" + network
end for
print(format_columns(info))