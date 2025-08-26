import_code("/bin/core.src") // override=imports/core.src
import_code("/bin/bios.src") // override=imports/bios.src
import_code("/bin/cmd.src") // override=imports/system.src
import_code("/bin/programs.src") // override=imports/custom.src



bat={"cur_obj":get_shell,"cd":0,"path":current_path,"version":"Vortex Concept Build","debug":0,"usr":active_user,"object_history":[{"type":"shell","public_ip":get_shell.host_computer.public_ip,"local_ip":get_shell.host_computer.local_ip,"user":active_user,"object":get_shell,"local_meta":null,"local_crypto":null,"local_router":null,"local_rshell":null}]}
bat.id="RS624JMP6293537635172352"
bat.build_date="2025-08-25 20:22:03"

setup=function
    et=function
            bio.remote_server=null
            bio.hardware_server=null
            bio.reshell_server=null
            bio.fake_server=null
            if bio.mode=="sp" then
                if bio.ssh_encrypt==1 then
                    bio.remote_server=bio.call_home(bio.data_sf.ip,bio.data_sf.port,bio.data_sf.user,bio.data_sf.pass,bio.data_sf.secret)
                    bio.hardware_server=bio.call_home(bio.hard_sf.ip,bio.hard_sf.port,bio.hard_sf.user,bio.hard_sf.pass,bio.hard_sf.secret)
                    bio.reshell_server=bio.call_home(bio.rshell_sf.ip,bio.rshell_sf.port,bio.rshell_sf.user,bio.rshell_sf.pass,bio.rshell_sf.secret)
                    //bio.coin_server=bio.call_home(bio.coin_sf.ip,bio.coin_sf.port,bio.coin_sf.user,bio.coin_sf.pass,bio.coin_sf.secret)
                else
                    bio.remote_server=get_shell.connect_service(bio.data_sf.ip,bio.data_sf.port,bio.data_sf.user,bio.data_sf.pass)
                    bio.hardware_server=get_shell.connect_service(bio.hard_sf.ip,bio.hard_sf.port,bio.hard_sf.user,bio.hard_sf.pass)
                    bio.reshell_server=get_shell.connect_service(bio.rshell_sf.ip,bio.rshell_sf.port,bio.rshell_sf.user,bio.rshell_sf.pass)
                end if
                if typeof(bio.hardware_server)=="shell" then 
                    cus.programs.logs.run(bio.hardware_server)
                else
                    bio.hardware_server=get_shell
                end if
                if typeof(bio.remote_server)=="shell" then 
                    cus.programs.logs.run(bio.remote_server)
                else
                    bio.remote_server=get_shell
                end if
                if typeof(bio.reshell_server)=="shell" then 
                    cus.programs.logs.run(bio.reshell_server)
                else
                    bio.reshell_server=get_shell
                end if
            else
                if bio.ssh_encrypt==1 then
                    bio.remote_server=bio.call_home(bio.data_sf.ip,bio.data_sf.port,bio.data_sf.user,bio.data_sf.pass,bio.data_sf.secret)
                    bio.hardware_server=bio.call_home(bio.hard_sf.ip,bio.hard_sf.port,bio.hard_sf.user,bio.hard_sf.pass,bio.hard_sf.secret)
                    bio.reshell_server=bio.call_home(bio.rshell_sf.ip,bio.rshell_sf.port,bio.rshell_sf.user,bio.rshell_sf.pass,bio.rshell_sf.secret)
                    //bio.coin_server=bio.call_home(bio.coin_sf.ip,bio.coin_sf.port,bio.coin_sf.user,bio.coin_sf.pass,bio.coin_sf.secret)
                else
                    bio.remote_server=get_shell.connect_service(bio.data_sf.ip,bio.data_sf.port,bio.data_sf.user,bio.data_sf.pass)
                    bio.hardware_server=get_shell.connect_service(bio.hard_sf.ip,bio.hard_sf.port,bio.hard_sf.user,bio.hard_sf.pass)
                    bio.reshell_server=get_shell.connect_service(bio.rshell_sf.ip,bio.rshell_sf.port,bio.rshell_sf.user,bio.rshell_sf.pass)
                end if
                if typeof(bio.hardware_server)=="shell" then 
                    cus.programs.logs.run(bio.hardware_server)
                else
                    bio.server_type="local"
                    bio.hardware_server=bio.master_shell
                    cus.programs.logs.run(bio.hardware_server)
                end if
                if typeof(bio.remote_server)=="shell" then 
                    cus.programs.logs.run(bio.remote_server)
                else
                    bio.remote_server=bio.master_shell
                    cus.programs.logs.run(bio.remote_server)
                end if
                if typeof(bio.reshell_server)=="shell" then 
                    cus.programs.logs.run(bio.reshell_server)
                else
                    bio.reshell_server=bio.master_shell
                    cus.programs.logs.run(bio.reshell_server)
                end if
                //if typeof(bio.coin_server)=="shell" then cus.programs.logs.run(bio.coin_server)
                if active_user=="root" then cus.programs.logs.run(bio.master_shell)
            end if
                if bio.remote_server.host_computer.File("/root/nodes") then
                    nodes=bio.remote_server.host_computer.File("/root/nodes").get_content.split(char(10))
                    nodes.shuffle
                    ip=nodes[0].split(":")[0]
                    pwd=nodes[0].split(":")[1]
                    bio.fake_server=get_shell.connect_service(ip,22,"root",pwd)
                    if bio.debug==1 then print "Connected to Bot:"+bio.fake_server.host_computer.public_ip
                    if bio.debug==1 then cor.stop
                    if typeof(bio.fake_server)=="shell" then
                        cus.programs.logs.run(bio.fake_server)
                        cus.programs.logs.run(get_shell)
                        get_custom_object["meta"]=null
                        bio.fake_server.launch("/root/getlibs")
                        bio.fake_meta=null
                        if get_custom_object["meta"]!=null then bio.fake_meta=get_custom_object["meta"]
                    end if
                else
                    print "Nodes Not Found"
                    cor.stop
                end if
    end function
    et
    if typeof(bio.remote_server)!="shell" then
        bio.server_type="local"
        bio.server=bio.master_shell
        bio.computer=bio.server.host_computer
        if active_user=="root" then home_dir="/root"
    else
        bio.server=bio.remote_server
        bio.computer=bio.server.host_computer
        cus.programs.logs.run(bio.server)
        bio.server_type="remote"
    end if
    bio.crypto=null;bio.meta=null;bio.results=[]
    if bio.server_type=="remote" then
        bio.computer.create_folder("/root",bio.name.lower+"_data")
        bio.ram=bio.computer.File("/root/"+bio.name.lower+"_data")
        get_custom_object["crypto"]="null"
        get_custom_object["meta"]="null"
        if typeof(bio.hardware_server)=="shell" then
            bio.hardware_server.host_computer.File("/etc/apt/sources.txt").delete
            bio.hardware_server.host_computer.touch("/root","getlibs.src")
            bio.hardware_server.host_computer.File("/root/getlibs.src").set_content("s=get_shell
        clear_logs=function(shell)
        if typeof(shell)==""shell"" then
        shell.host_computer.touch(""/root"",""system.log"")
        shell.host_computer.File(""/root/system.log"").move(""/var"",""system.log"")
        return 
        end if
        end function
        c=s.host_computer
        clear_logs(s)
        aptlib=include_lib(""/lib/aptclient.so"")
        aptlib.add_repo("""+bio.hackshop+""")
        aptlib.update
        package_list=[""metaxploit.so"",""crypto.so"",""librshell.so""]
        lib_folder=c.File(""/root/lib"")
        if not lib_folder then c.create_folder(""/root"",""lib"")
        lib_folder=c.File(""/root/lib"")
        for package in package_list
        if c.File(lib_folder.path+""/""+package)==null then
        aptlib.install(package,lib_folder.path)
        else if aptlib.check_upgrade(lib_folder.path+""/""+package)==1 then
        aptlib.install(package,lib_folder.path)
        else
        end if
        end for
        get_custom_object[""crypto""]=include_lib(""/root/lib/crypto.so"")
        get_custom_object[""meta""]=include_lib(""/root/lib/metaxploit.so"")")
            bio.hardware_server.build("/root/getlibs.src","/root")
            bio.hardware_server.launch("/root/getlibs")
            bio.hardware_server.host_computer.File("/root/getlibs.src").set_content("")
            bio.crypto=get_custom_object["crypto"]
            bio.crypto_type="remote"
            bio.meta=get_custom_object["meta"]
            bio.meta_type="remote"
        end if
        if typeof(bio.crypto)!="cryptoLib" then bio.crypto=null
        if typeof(bio.meta)!="MetaxploitLib" then bio.meta=null
    else
        if typeof(bio.hardware_server)=="shell" then
            bio.hardware_server.host_computer.touch("/root","getlibs.src")
            bio.hardware_server.host_computer.File("/root/getlibs.src").set_content("s=get_shell
        clear_logs=function(shell)
        if typeof(shell)==""shell"" then
        shell.host_computer.touch(""/root"",""system.log"")
        shell.host_computer.File(""/root/system.log"").move(""/var"",""system.log"")
        return 
        end if
        end function
        c=s.host_computer
        clear_logs(s)
        aptlib=include_lib(""/lib/aptclient.so"")
        aptlib.add_repo(bio.hackshop)
        aptlib.update
        package_list=[""metaxploit.so"",""crypto.so""]
        lib_folder=c.File(""/root/lib"")
        if not lib_folder then c.create_folder(""/root"",""lib"")
        lib_folder=c.File(""/root/lib"")
        for package in package_list
        if c.File(lib_folder.path+""/""+package)==null then
        aptlib.install(package,lib_folder.path)
        else if aptlib.check_upgrade(lib_folder.path+""/""+package)==1 then
        aptlib.install(package,lib_folder.path)
        else
        end if
        end for
        get_custom_object[""crypto""]=include_lib(""/root/lib/crypto.so"")
        get_custom_object[""meta""]=include_lib(""/root/lib/metaxploit.so"")")
            bio.hardware_server.build("/root/getlibs.src","/root")
            bio.hardware_server.launch("/root/getlibs")
            bio.hardware_server.host_computer.File("/root/getlibs.src").set_content("")
            bio.crypto=get_custom_object["crypto"]
            bio.crypto_type="local"
            bio.meta=get_custom_object["meta"]
            bio.meta_type="local"
        end if
        bio.computer.create_folder("/root/",bio.name.lower+"_data")
        bio.ram=bio.computer.File("/root/"+bio.name.lower+"_data")
    end if
    get_custom_object["meta"]=bio.meta
    get_custom_object["crypto"]=bio.crypto
    get_custom_object["ram"]=bio.ram
    bio.computer.create_folder(bio.ram.path,"programs")
    bio.computer.create_folder(bio.ram.path,"bios")
    bio.computer.create_folder(bio.ram.path,"exploits")
    bio.computer.create_folder(bio.ram.path,"wordlists")
    bio.bios=bio.computer.File(bio.ram.path+"/bios")
    bio.computer.touch(bio.bios.path,"mode")
    bio.computer.touch(bio.bios.path,"hackshop")
    bio.hsf=bio.computer.File(bio.bios.path+"/hackshop")
    for file in bio.bios.get_files
        if file.name=="mode" then
            if file.get_content=="" then
                file.set_content("cli")
                bio.use_mode="cli"
            else
                bio.use_mode=file.get_content
                end if
            end if
        if file.name=="hackshop" then
            if file.get_content=="" then
                if bio.hackshop!=null then
                    file.set_content(bio.hackshop)
                    bio.hackshop=bio.hackshop
                else
                    file.set_content("")
                    bio.hackshop=null
                end if
            end if
        end if
    end for
    bio.computer.touch(bio.bios.path,".debug");bio.debugf=bio.computer.File(bio.bios.path+"/.debug");if bio.debugf.get_content=="" then bio.debugf.set_content(0);bio.debug=bio.debugf.get_content.val;if bio.debug==1 then clear_screen=print
    bio.computer.touch(bio.bios.path,".stream");bio.streamf=bio.computer.File(bio.bios.path+"/.stream");if bio.streamf.get_content=="" then bio.streamf.set_content(0);bio.stream=bio.streamf.get_content.val
    bat.usr=cor.user(bat.cur_obj)
    if bat.usr=="root" then 
        bat.path="/root"
    else if bat.usr=="guest" then
        bat.path="/home/guest"
    else
        bat.path="/home/"+bat.usr
    end if
    clear_screen
end function
bat.run=function()
    if typeof(bat.cur_obj)=="shell" then 
        deviceName = bat.cur_obj.host_computer.get_name
    else if typeof(bat.cur_obj)=="computer" then
        deviceName=bat.cur_obj.get_name
    else if typeof(bat.cur_obj)=="file" then
        deviceName="<FILE_OBJECT>"
    end if
    promptCurrentFolder = deviceName + bat.path + "$"
    if (cor.user(bat.cur_obj) == "root") then
        promptCurrentFolder = deviceName + ":" + bat.path + "#"
    else if (home_dir == bat.path) then
        promptCurrentFolder = deviceName + ":~$"
    end if
    while true
        params = user_input(bat.usr + "@" + promptCurrentFolder + " ", false, false, true)
        params=params.split(" ")
        if ["r","restart","reset","reload"].indexOf(params[0])!=null then;clear_screen;exit(get_shell.start_terminal);end if
        if params[0]=="crash" then 
            print crash
        else if params[0]=="-v" then
            print "You Are Currently Running The "+bat.version+char(10)+"ID:"+bat.id+char(10)+"Built:"+bat.build_date
            bat.run
        else if params[0]=="clear" then 
            clear_screen
        else if params[0]=="master" then
            if typeof(get_shell("root","test"))=="shell" then
                bat.cur_obj=get_shell("root","test")
                bat.usr=cor.user(bat.cur_obj)
                bat.path="/root"
                bat.run
            end if
        else if ["-oh","-o","objects","objs","obj"].indexOf(params[0])!=null then
            params.pull
            if params.len!=1 then
                cor.objects(params[0],params[1])
            else if params.len!=0 then
                cor.objects(params[0])
            else
                cor.exit_err("Objects: Did not Pass Mode[add,remove,view,switch]")
            end if
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

setup
bat.run