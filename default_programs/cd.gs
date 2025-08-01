//command: cd
if params.len > 0 and (params[0] == "-h" or params[0] == "--help") then exit(command_info("cd_usage"))
pathFile = home_dir
if(params.len > 0) then
	pathFile = get_abs_path(params[0])
end if
print(cd(pathFile))