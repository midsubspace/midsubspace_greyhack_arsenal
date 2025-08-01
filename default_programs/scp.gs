//command: scp
if params.len != 3 or (params[0] != "-u" and params[0] != "-d") then exit(command_info("scp_usage"))
output = get_shell.scp(params[1], params[2], null, params[0] == "-u")
if output == null then exit("scp: there is no active remote connections")
if output != 1 then print(output)
