import_code("/bin/core.src") // override=imports/core.src
import_code("/bin/bios.src") // override=imports/bios.src
import_code("/bin/cmd.src") // override=imports/system.src
import_code("/bin/programs.src") // override=imports/custom.src



bat={"cur_obj":get_shell,"cd":0,"path":current_path,"version":"Vortex Concept Build"}
bat.id="UD46MCJ6726849135050752"
bat.build_date="2025-08-18 17:34:38"
bat.run=function()
    deviceName = bat.cur_obj.host_computer.get_name
    promptCurrentFolder = deviceName + bat.path + "$"
    if (cor.user(bat.cur_obj) == "root") then
        promptCurrentFolder = deviceName + ":" + bat.path + "#"
    else if (home_dir == bat.path) then
        promptCurrentFolder = deviceName + ":~$"
    end if
    while true
        params = user_input(active_user + "@" + promptCurrentFolder + " ", false, false, true)
        params=params.split(" ")
        if ["r","restart","reset","reload"].indexOf(params[0])!=null then;clear_screen;exit(get_shell.start_terminal);end if
        if params[0]=="crash" then 
            print crash
        else if params[0]=="-v" then
            print "You Are Currently Running The "+bat.version+char(10)+"ID:"+bat.id+char(10)+"Built:"+bat.build_date
            bat.run
        else if params[0]=="clear" then 
            clear_screen
        else if params[0]=="CodeEditor.exe" then 
            if params.len==3 then
                shell=cor.req("shell",bat.cur_obj)
                shell.launch("/usr/bin/"+params.pull,params[0]+" "+params[1])
            end if
        else
            for app in sys
                if params[0]==app["key"] then
                    sys[params.pull].run(params)
                    bat.run
                end if
            end for
            for app in cus
                if params[0]==app["key"] then
                    cus[params.pull].run(params)
                    bat.run
                end if
            end for
            print params[0]+": command not found"
        end if
    end while
end function

bat.run
