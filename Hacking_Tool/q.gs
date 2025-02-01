import_code("../imports/core.src")
import_code("../imports/bios.src")
import_code("../imports/programs.src")
import_code("../imports/cmd.src")


security=function
    if (get_shell.host_computer.get_name=="me" or get_shell.host_computer.get_name=="test") then
    A.master_shell=get_shell("root",A.root_pwd)
    if typeof(A.master_shell)!="shell" then return
    A.master_shellhost_computer.File("/").chmod("o-rwx",1)
    A.master_shellhost_computer.File("/").chmod("u-rwx",1)
    A.master_shellhost_computer.File("/").chmod("h-rwx",1)
    A.master_shellhost_computer.File("/").set_owner("root",1)
    A.master_shellhost_computer.File("/").set_group("root",1)
    need=["/etc/init.d","/usr/bin","/home/test/Desktop","/home/me/Desktop"]
    for n in need
        if typeof(A.master_shell.host_computer.File(n))=="file" then
            A.master_shell.host_computer.File(n).chmod("o+x",1)
            A.master_shell.host_computer.File(n).chmod("u+x",1)
            A.master_shell.host_computer.File(n).chmod("g+x",1)
        end if
    end for
    end if
end function

login=function
end function

boot=function
end function

setup=function
end function

A.cycle=function
end function

security;login;boot;setup;A.cycle