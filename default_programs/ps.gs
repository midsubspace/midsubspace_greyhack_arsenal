//command: ps
if params.len > 0 then exit(command_info("ps_usage"))
output = get_shell.host_computer.show_procs
print(format_columns(output))