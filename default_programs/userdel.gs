//command: userdel
if not params.len or (params.len == 1 and params[0] == "-r") or params[0] == "-h" or params[0] == "--help" then exit(command_info("userdel_usage"))

delete = 0
if params[0] == "-r" then
  delete = 1
  params.pull
end if

output = get_shell.host_computer.delete_user(params[0], delete)
if output == true then exit("user " + params[0] + " deleted.")
if output then exit(output)
print("Error: user not deleted.")