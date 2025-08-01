//command: man
if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit(command_info("man_usage"))
command = params[0]
info = command_info(command+"_usage")
if info == (command+"_usage").upper then exit("man: manual entry for "+command+" not found")
print(info)