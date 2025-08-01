//command: useradd
if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit(command_info("useradd_usage"))

inputMsg = "Setting password for user " + params[0] +".\nNew password: "
inputPass = user_input(inputMsg, true)

output = get_shell.host_computer.create_user(params[0], inputPass)
if output == true then exit("User created OK")
if output then exit(output)
print("Error: the user could not be created.")