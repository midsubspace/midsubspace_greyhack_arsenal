import_code("/bin/core.src") // override=../imports/core.src
import_code("/bin/bios.src") // override=../imports/bios.src
import_code("/bin/cmd.src") // override=../imports/cmd.src
import_code("/bin/programs.src") // override=../imports/programs.src
if get_shell.host_computer.is_network_active==false then A.programs.wifi.run(["wifi"])
security=function
    if A.mode!="sp" then
        if (get_shell.host_computer.get_name=="me" or get_shell.host_computer.get_name=="test") then
            A.master_shell=get_shell("root",A.root_pwd)
            if typeof(A.master_shell)!="shell" then return
            A.master_shell.host_computer.File("/").chmod("o-rwx",1)
            A.master_shell.host_computer.File("/").chmod("u-rwx",1)
            A.master_shell.host_computer.File("/").chmod("g-rwx",1)
            A.master_shell.host_computer.File("/").set_owner("root",1)
            A.master_shell.host_computer.File("/").set_group("root",1)
            need=["/etc/init.d","/usr/bin","/home/test/Desktop","/home/me/Desktop"]
            for n in need
                if typeof(A.master_shell.host_computer.File(n))=="file" then
                    A.master_shell.host_computer.File(n).chmod("o+x",1)
                    A.master_shell.host_computer.File(n).chmod("u+x",1)
                    A.master_shell.host_computer.File(n).chmod("g+x",1)
                end if
            end for
        end if
    end if
end function

login=function
    ks=1
    A.master_shell=get_shell("root",A.root_pwd)
    return
    if A.debug!=1 then clear_screen
    shell=A.master_shell
    if typeof(shell)=="shell" then;if shell.host_computer.File("/home/me/Desktop/AdminMonitor.exe") or shell.host_computer.File("/home/test/Desktop/AdminMonitor.exe") then ks=0;end if
    procs=shell.host_computer.show_procs
    list=procs.split(char(10))[1:]
    for item in list
        procs=shell.host_computer.show_procs
        list=procs.split(char(10))[1:]
        processes=[]
        procs=shell.host_computer.show_procs
        list=procs.split(char(10))[1:]
        processes=[]
        for item in list
            parsedItem=item.split(" ")
            process={}
            process.user=parsedItem[0]
            process.pid=parsedItem[1]
            process.cpu=parsedItem[2]
            process.mem=parsedItem[3]
            process.command=parsedItem[4]
            processes.push(process)
        end for
    end for
    for p in processes
        if (p.command=="AdminMonitor" and (p.user=="me")) then ks=1
    end for
    if ks==0 then exit core.text("color","#ff0000")+"<b><align=center>CRITICAL SYSTEM ERROR: Kill Switch is "+core.text("color","#00ff00")+"ACTIVE"+char(10)+core.text("color","#FFFFFF")+"System functionality will be <b>"+core.text("color","#ff0000")+"DISABLED </b>"+core.text("color","#FFFFFF")+"until"+core.text("color","#e6e600")+" AdminMonitor.exe "+core.text("cap","color")+"is running."
    if A.debug!=1 and A.mode!="sp" then print core.text("align","center")+"Sign On"
    if A.debug!=1 and A.mode!="sp" then print core.text("align","center")+"System: ShadowBox01"
    if A.debug!=1 and A.mode!="sp" then print core.text("align","center")+"Subsystem: SBASE"
    if A.debug!=1 and A.mode!="sp" then print core.text("align","center")+"Display: DSP01"
    if A.debug!=1 and A.mode!="sp" then print(core.text("align","center")+"User: Administrator")
    if A.debug!=1 and A.mode!="sp" then
        password=user_input(core.text("align","center")+"Password:",1)
        if password==A.sys_pwd then
            clear_screen
            A.sessions.master=A.master_shell
        else
            bypass=0
            clear_screen
            shell=A.master_shell
            procs=shell.host_computer.show_procs
            procs=shell.host_computer.show_procs
            list=procs.split(char(10))[1:]
            processes=[]
            for item in list
                procs=shell.host_computer.show_procs
                list=procs.split(char(10))[1:]
                processes=[]
                print typeof(shell)
                procs=shell.host_computer.show_procs
                list=procs.split(char(10))[1:]
                processes=[]
                for item in list
                    parsedItem=item.split(" ")
                    process={}
                    process.user=parsedItem[0]
                    process.pid=parsedItem[1]
                    process.cpu=parsedItem[2]
                    process.mem=parsedItem[3]
                    process.command=parsedItem[4]
                    processes.push(process)
                end for
            end for
            for p in processes
                if ((p.command=="Chat" and p.user=="root") or A.mode=="sp") then bypass=1
            end for
           if ((A.debug!=1 and bypass==1 and password!="test") or A.mode=="sp") then
                A.sessions.master=A.master_shell
                A.sessions.current=A.master_shell
                boot
                setup
                clear_screen
                A.Bash
            end if
            if A.debug!=1 then print core.text("align","center")+"Sign On"
            if A.debug!=1 then print core.text("align","center")+"System: ShadowBox01"
            if A.debug!=1 then print core.text("align","center")+"Subsystem: SBASE"
            if A.debug!=1 then print core.text("align","center")+"Display: DP01"
            if A.debug!=1 then print(core.text("align","center")+"User: Administrator")
            if A.debug!=1 then print(core.text("align","center")+"Password:"+core.text("color","#ff0000")+"<b> INVALID")
            print char(10)
            exit core.text("color","#ff0000")+"<b><align=center>CRITICAL SYSTEM ERROR: Password Invalid"+char(10)+core.text("color","#FFFFFF")+"The Password Entered Is Invalid.  System functionality will be <b>"+core.text("color","#AA0000")+"DISABLED </b>"+core.text("color","#FFFFFF")+"until a valid password is entered."
        end if
    end if
    if A.mode=="sp" then
        A.sessions.master=A.master_shell
        A.sessions.current=A.master_shell
        boot
        setup
        clear_screen
        A.Bash
    end if
end function

boot=function
    
end function

setup=function
    et=function
        A.remote_server=null
        A.hardware_server=null
        A.reshell_server=null
        A.fake_server=null
        if A.mode=="sp" then
            if A.ssh_encrypt==1 then
                A.remote_server=A.call_home(A.data_sf.ip,A.data_sf.port,A.data_sf.user,A.data_sf.pass,A.data_sf.secret)
                A.hardware_server=A.call_home(A.hard_sf.ip,A.hard_sf.port,A.hard_sf.user,A.hard_sf.pass,A.hard_sf.secret)
                A.reshell_server=A.call_home(A.rshell_sf.ip,A.rshell_sf.port,A.rshell_sf.user,A.rshell_sf.pass,A.rshell_sf.secret)
                //A.coin_server=A.call_home(A.coin_sf.ip,A.coin_sf.port,A.coin_sf.user,A.coin_sf.pass,A.coin_sf.secret)
            else
                A.remote_server=get_shell.connect_service(A.data_sf.ip,A.data_sf.port,A.data_sf.user,A.data_sf.pass)
                A.hardware_server=get_shell.connect_service(A.hard_sf.ip,A.hard_sf.port,A.hard_sf.user,A.hard_sf.pass)
                A.reshell_server=get_shell.connect_service(A.rshell_sf.ip,A.rshell_sf.port,A.rshell_sf.user,A.rshell_sf.pass)
            end if
            if typeof(A.hardware_server)=="shell" then 
                A.programs.logs.run(A.hardware_server)
            else
                A.hardware_server=get_shell
            end if
            if typeof(A.remote_server)=="shell" then 
                A.programs.logs.run(A.remote_server)
            else
                A.remote_server=get_shell
            end if
            if typeof(A.reshell_server)=="shell" then 
                A.programs.logs.run(A.reshell_server)
            else
                A.reshell_server=get_shell
            end if
        else
            if A.ssh_encrypt==1 then
                A.remote_server=A.call_home(A.data_sf.ip,A.data_sf.port,A.data_sf.user,A.data_sf.pass,A.data_sf.secret)
                A.hardware_server=A.call_home(A.hard_sf.ip,A.hard_sf.port,A.hard_sf.user,A.hard_sf.pass,A.hard_sf.secret)
                A.reshell_server=A.call_home(A.rshell_sf.ip,A.rshell_sf.port,A.rshell_sf.user,A.rshell_sf.pass,A.rshell_sf.secret)
                //A.coin_server=A.call_home(A.coin_sf.ip,A.coin_sf.port,A.coin_sf.user,A.coin_sf.pass,A.coin_sf.secret)
            else
                A.remote_server=get_shell.connect_service(A.data_sf.ip,A.data_sf.port,A.data_sf.user,A.data_sf.pass)
                A.hardware_server=get_shell.connect_service(A.hard_sf.ip,A.hard_sf.port,A.hard_sf.user,A.hard_sf.pass)
                A.reshell_server=get_shell.connect_service(A.rshell_sf.ip,A.rshell_sf.port,A.rshell_sf.user,A.rshell_sf.pass)
            end if
            if typeof(A.hardware_server)=="shell" then 
                A.programs.logs.run(A.hardware_server)
            else
                A.server_type="local"
                A.hardware_server=A.master_shell
                A.programs.logs.run(A.hardware_server)
            end if
            if typeof(A.remote_server)=="shell" then 
                A.programs.logs.run(A.remote_server)
            else
                A.remote_server=A.master_shell
                A.programs.logs.run(A.remote_server)
            end if
            if typeof(A.reshell_server)=="shell" then 
                A.programs.logs.run(A.reshell_server)
            else
                A.reshell_server=A.master_shell
                A.programs.logs.run(A.reshell_server)
            end if
            //if typeof(A.coin_server)=="shell" then A.programs.logs.run(A.coin_server)
            if active_user=="root" then A.programs.logs.run(A.master_shell)
        end if
            if A.remote_server.host_computer.File("/root/nodes") then
                nodes=A.remote_server.host_computer.File("/root/nodes").get_content.split(char(10))
                nodes.shuffle
                ip=nodes[0].split(":")[0]
                pwd=nodes[0].split(":")[1]
                A.fake_server=get_shell.connect_service(ip,22,"root",pwd)
                if A.debug==1 then print "Connected to Bot:"+A.fake_server.host_computer.public_ip
                if A.debug==1 then core.stop
                if typeof(A.fake_server)=="shell" then
                    A.programs.logs.run(A.fake_server)
                    A.programs.logs.run(get_shell)
                    get_custom_object["meta"]=null
                    A.fake_server.launch("/root/getlibs")
                    A.fake_meta=null
                    if get_custom_object["meta"]!=null then A.fake_meta=get_custom_object["meta"]
                end if
            else
                print "Nodes Not Found"
                core.stop
            end if
        end function
    et
    if typeof(A.remote_server)!="shell" then
        A.server_type="local"
        A.server=A.master_shell
        A.computer=A.server.host_computer
        if active_user=="root" then home_dir="/root"
    else
        A.server=A.remote_server
        A.computer=A.server.host_computer
        A.programs.logs.run(A.server)
        A.server_type="remote"
    end if
    A.crypto=null;A.meta=null;A.results=[]
    if A.server_type=="remote" then
        A.computer.create_folder("/root",A.name.lower+"_data")
        A.ram=A.computer.File("/root/"+A.name.lower+"_data")
        get_custom_object["crypto"]="null"
        get_custom_object["meta"]="null"
        if typeof(A.hardware_server)=="shell" then
            A.hardware_server.host_computer.File("/etc/apt/sources.txt").delete
            A.hardware_server.host_computer.touch("/root","getlibs.src")
            A.hardware_server.host_computer.File("/root/getlibs.src").set_content("s=get_shell
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
        aptlib.add_repo("""+A.hackshop+""")
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
            A.hardware_server.build("/root/getlibs.src","/root")
            A.hardware_server.launch("/root/getlibs")
            A.hardware_server.host_computer.File("/root/getlibs.src").set_content("")
            A.crypto=get_custom_object["crypto"]
            A.crypto_type="remote"
            A.meta=get_custom_object["meta"]
            A.meta_type="remote"
        end if
        if typeof(A.crypto)!="cryptoLib" then A.crypto=null
        if typeof(A.meta)!="MetaxploitLib" then A.meta=null
    else
        if typeof(A.hardware_server)=="shell" then
            A.hardware_server.host_computer.touch("/root","getlibs.src")
            A.hardware_server.host_computer.File("/root/getlibs.src").set_content("s=get_shell
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
        aptlib.add_repo(A.hackshop)
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
            A.hardware_server.build("/root/getlibs.src","/root")
            A.hardware_server.launch("/root/getlibs")
            A.hardware_server.host_computer.File("/root/getlibs.src").set_content("")
            A.crypto=get_custom_object["crypto"]
            A.crypto_type="local"
            A.meta=get_custom_object["meta"]
            A.meta_type="local"
        end if
        A.computer.create_folder("/root/",A.name.lower+"_data")
        A.ram=A.computer.File("/root/"+A.name.lower+"_data")
    end if
    get_custom_object["meta"]=A.meta
    get_custom_object["crypto"]=A.crypto
    get_custom_object["ram"]=A.ram
    A.computer.create_folder(A.ram.path,"programs")
    A.computer.create_folder(A.ram.path,"bios")
    A.computer.create_folder(A.ram.path,"exploits")
    A.computer.create_folder(A.ram.path,"wordlists")
    A.bios=A.computer.File(A.ram.path+"/bios")
    A.computer.touch(A.bios.path,"mode")
    A.computer.touch(A.bios.path,"hackshop")
    A.hsf=A.computer.File(A.bios.path+"/hackshop")
    for file in A.bios.get_files
        if file.name=="mode" then
            if file.get_content=="" then
                file.set_content("cli")
                A.use_mode="cli"
            else
                A.use_mode=file.get_content
                end if
            end if
        if file.name=="hackshop" then
            if file.get_content=="" then
                if A.hackshop!=null then
                    file.set_content(A.hackshop)
                    A.hackshop=A.hackshop
                else
                    file.set_content("")
                    A.hackshop=null
                end if
            end if
        end if
    end for
    A.computer.touch(A.bios.path,".debug");A.debugf=A.computer.File(A.bios.path+"/.debug");if A.debugf.get_content=="" then A.debugf.set_content(0);A.debug=A.debugf.get_content.val;if A.debug==1 then clear_screen=print
    A.computer.touch(A.bios.path,".stream");A.streamf=A.computer.File(A.bios.path+"/.stream");if A.streamf.get_content=="" then A.streamf.set_content(0);A.stream=A.streamf.get_content.val
    cmds.usr=core.check_user(A.sessions.current)
    if cmds.usr=="root" then 
        cmds.dir="/root"
    else if cmds.usr=="guest" then
        cmds.dir="/home/guest"
    else
        cmds.dir="/home/"+cmds.usr
    end if
    clear_screen
end function

A.Bash=function
while true
    params=[]
    if A.debug!=1 then
        cmds.usr=core.check_user(A.sessions.current)
        if typeof(A.sessions.current)=="shell" then
            prompt="["+A.sessions.current.host_computer.public_ip+"@"+A.sessions.current.host_computer.local_ip+"]("+typeof(A.sessions.current)+")"+cmds.usr+"@:"+cmds.dir+"> "
        else if typeof(A.sessions.current)=="computer" then
            prompt="["+A.sessions.current.public_ip+"@"+A.sessions.current.local_ip+"]("+typeof(A.sessions.current)+")"+cmds.usr+"@:"+cmds.dir+"> "
        else
            prompt="[?]("+typeof(A.sessions.current)+")"+cmds.usr+"@:"+cmds.dir+"> "
        end if
    else
        prompt=core.text("color","#FFFFFF")+"DEBUG> "
    end if
    for word in user_input(prompt,0,0,1).split(" ")
        params.push(word)
    end for
    if params[0]=="r" then;clear_screen;print "Rebooting Bash...";wait 0.5;exit(get_shell.start_terminal);end if
    if params[0]=="master" then ;if user_input("Bypass Code: *********",1)=="q" then ;A.sessions.current=A.master_shell;end if;end if
    if params[0]=="guid" then;clear_screen;print core.text("align","center")+core.text("color","#FBFF00")+A.RID;wait 3;A.Bash;end if
    if params[0]=="import" then A.shared_wordlist
    if params[0]=="local_lib" then;A.local_shit(A.sessions.current);A.Bash;end if
    if params[0]=="debug" then;if A.debug==0 then; print core.text("color","#ffffff")+"Turning on Debug Mode";A.debugf.set_content(1);A.debug=1;A.Bash;else;print core.text("color","#FFFFFF")+"Debug Mode Turned Off";A.debugf.set_content(0);A.debug=0;A.Bash;end if;end if
    if params[0]=="browser" then A.programs.elaunch.run(["elaunch","Browser"])
    if params[0]=="files" then A.programs.elaunch.run(["elaunch","FileExplorer"])
    if params[0]=="log" then A.programs.elaunch.run(["elaunch","LogViewer"])
    if params[0]=="mail" then A.programs.elaunch.run(["elaunch","Mail"])
    if params[0]=="grades" then A.programs.elaunch.run(["elaunch","StudentsViewer"])
    if params[0]=="police" then A.programs.elaunch.run(["elaunch","PoliceRecord"])
    if params[0]=="settings" then A.programs.elaunch.run(["elaunch","Settings"])
    if params[0]=="dock" then
        o=user_input("System:",1).lower
        if o=="storage" then
            A.sessions.current=A.remote_server
            cmds.usr=core.check_user(A.sessions.current)
            if cmds.usr=="root" then 
                cmds.dir="/root"
            else if cmds.usr=="guest" then
                cmds.dir="/home/guest"
            else
                cmds.dir="/home/"+cmds.usr
            end if
            A.Bash
        else if o=="hardware" then
            A.sessions.current=A.hardware_server
            cmds.usr=core.check_user(A.sessions.current)
            if cmds.usr=="root" then 
                cmds.dir="/root"
            else if cmds.usr=="guest" then
                cmds.dir="/home/guest"
            else
                cmds.dir="/home/"+cmds.usr
            end if
            A.Bash
        else if o=="gateway" then
            A.sessions.current=A.reshell_server
            cmds.usr=core.check_user(A.sessions.current)
            if cmds.usr=="root" then 
                cmds.dir="/root"
            else if cmds.usr=="guest" then
                cmds.dir="/home/guest"
            else
                cmds.dir="/home/"+cmds.usr
            end if
            A.Bash
        else
            print core.text("color","#ffff04")+"That is not a valid system"
            wait 5
            A.Bash
        end if
    end if
    if params[0]=="info" then;A.programs.info.run(params);A.Bash;end if
    if params[0]=="crash" then print [].lower
    if params[0]=="man" then
        if params.len==1 then
            clear_screen
            user_input(core.text("color","#ffffff")+"man:Prints Description of command",0,1)
        else
            for i in cmds.programs
                if params[1].lower==i.value.name and i.value.type!="dev" then
                    clear_screen
                    user_input(core.text("color","#ffffff")+i.value.name+":"+i.value.desc+":"+i.value.req,0,1)
                end if
            end for
            for i in A.programs
                if params[1].lower==i.value.name and i.value.type!="dev"then
                    clear_screen
                    user_input(core.text("color","#ffffff")+i.value.name+":"+i.value.desc+":"+i.value.req,0,1)
                end if
            end for 
        end if
    end if
    if cmds.programs.hasIndex(params[0])==1 then
        cmds.programs[params[0]].run(params,A.sessions.current)
    else if A.programs.hasIndex(params[0])==1 then
        A.programs[params[0]].run(params)
    else if core.hasIndex(params[0])==1 then
        core[params[0]].run(params)
    else if params[0]=="help" or params[0]=="-h" or params[0]==""then
        for i in cmds.programs
            if i.value.type=="dev" then continue
            if typeof(A.sessions.current=="file") then
                if i.value.req=="shell" or i.value.req=="computer" then continue
            else if typeof(A.sessions.current=="computer") then
                if i.value.req=="shell" then continue
            else if typeof(A.sessions.current=="shell") then
                wait 0.1
            end if
            print i.value.name
        end for
        for i in A.programs
            if i.value.type=="dev" then continue
            if typeof(A.sessions.current=="file") then
                if i.value.req=="shell" or i.value.req=="computer" then continue
            else if typeof(A.sessions.current=="computer") then
                if i.value.req=="shell" then continue
            else if typeof(A.sessions.current=="shell") then
                wait 0.1
            end if
            print i.value.name
        end for
    else
        clear_screen
    end if
end while
end function

security;login;boot;setup
A.Bash