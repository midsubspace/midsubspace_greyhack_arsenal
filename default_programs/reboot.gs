//command: reboot
if params.len > 0 and (params[0] == "-h" or params[0] == "-help") then exit(command_info("reboot_usage"))
isSafeMode = params.len > 0 and params[0] == "-sm"
output = get_shell.host_computer.reboot(isSafeMode)
if output and output != 1 then 
    print(output)
else 
    print("Closing programs...\nRestarting...")
end if