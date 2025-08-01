//command: groupdel
if params.len != 2 or params[0] == "-h" or params[0] == "--help" then exit(command_info("groupdel_usage"))

user = params[0]
group = params[1]

output = get_shell.host_computer.delete_group(user, group)
if output == true then exit("Group " + group + " deleted from user " + user)
if output then exit(output)
print("Error: the group could not be deleted.")