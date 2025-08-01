import_code("/bin/core.src") // override=imports/core.src
import_code("/bin/bios.src") // override=imports/bios.src
import_code("/bin/cmd.src") // override=imports/system.src
import_code("/bin/programs.src") // override=imports/custom.src

print "Started B.A.S.H"


bat={}

bat.run=function()
    deviceName = get_shell.host_computer.get_name
    promptCurrentFolder = deviceName + current_path + "$"
    if (active_user == "root") then
        promptCurrentFolder = deviceName + ":" + current_path + "#"
    else if (home_dir == current_path) then
        promptCurrentFolder = deviceName + ":~$"
    end if
    while true
        input = user_input(active_user + "@" + promptCurrentFolder + " ", false, false, true)
        input=input.split(" ")
        if ["r","restart","reset","reload"].indexOf(input[0])!=null then;clear_screen;exit(get_shell.start_terminal);end if
        if input[0]=="crash" then print crash
        if input[0]=="clear" then clear_screen
        for app in sys
            if input[0]==app["key"] then 
            sys[input.pull].run(input)
            end if
        end for
    end while
end function

bat.run
