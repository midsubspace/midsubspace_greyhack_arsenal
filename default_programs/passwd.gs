//command: passwd
if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit(command_info("passwd_usage"))

inputMsg = "Changing password for user " + params[0] +".\nNew password:"
inputPass = user_input(inputMsg, true)

output = get_shell.host_computer.change_password(params[0], inputPass)
if output == true then exit("password modified OK")
if output then exit(output)
print("Error: password not modified")