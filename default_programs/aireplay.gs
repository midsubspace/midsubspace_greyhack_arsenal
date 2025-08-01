//command: aireplay
cryptools = include_lib("/lib/crypto.so")
if not cryptools then exit("Error: Missing crypto library")
if params.len != 4 or params[0] == "-h" or params[0] == "--help" or params[0] != "-b" or params[2] != "-e" then exit(command_info("aireplay_usage"))

bssid = params[1]
essid = params[3]
result = cryptools.aireplay(bssid, essid)
if typeof(result) == "string" then exit(result)
