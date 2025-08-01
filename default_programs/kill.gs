//command: kill
if params.len != 1 or params[0] == "-h" or params[0] == "--help" then exit(command_info("kill_usage"))
PID = params[0].to_int
if typeof(PID) != "number" then exit("The PID must be a number\n" + command_info("kill_usage"))

output = get_shell.host_computer.close_program(PID)
if output == true then exit("Process " + PID + " closed");
if output then exit(output)
print("Process " + PID + " not found")

