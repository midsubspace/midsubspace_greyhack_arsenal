//command: groups
if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit(command_info("groups_usage"))
user = params[0]
output = get_shell.host_computer.groups(user)
if not output then exit(command_info("groups_usage"))
print(output)