//command: airmon
cryptools = include_lib("/lib/crypto.so")
if not cryptools then exit("Error: Missing crypto library")
if params.len > 0 and (params.len != 2 or params[0] == "-h" or params[0] == "--help") then exit(command_info("airmon_usage"))

computer = get_shell.host_computer
formatOutput = "Interface Chipset Monitor_Mode\n"
if params.len == 0 then	exit(format_columns(formatOutput + computer.network_devices))
option = params[0]
device = params[1]
if option != "start" and option != "stop" then exit(command_info("airmon_usage"))

output = cryptools.airmon(option, device)
if not output then exit("airmon: " + device + " not found")
if typeof(output) == "string" then exit(output)
print(format_columns(formatOutput + computer.network_devices))