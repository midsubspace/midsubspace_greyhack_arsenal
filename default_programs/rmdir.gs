//Command rmdir

if params.len < 1 or not params[0].trim then exit(command_info("rmdir_usage"))
path = params[0].trim
if params[0] == "--help" then exit(command_info("rmdir_usage"))
f = get_shell.host_computer.File(path)
if typeof(f) != "file" then exit("rmdir: failed to remove '" + path + "': no such file or directory")
if f.is_folder == 0 then exit("Error: " + f.name + " is not a directory.")
if f.get_files.len >= 1 or f.get_folders.len >= 1 then exit("rmdir: failed to remove '" + path + "': directory not empty")
fd = f.delete
if fd.trim.len == 0 then exit
exit("rmdir: failed to remove '" + path + "': " + fd.trim)