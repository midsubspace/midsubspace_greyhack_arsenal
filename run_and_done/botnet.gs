import_code("/bin/core.src") // override=../imports/core.src
import_code("/bin/bios.src") // override=../imports/bios.src
import_code("/bin/cmd.src") // override=../imports/cmd.src
import_code("/bin/programs.src") // override=../imports/programs.src
color = {};color.u="<u>";color.white = "<color=#FFFFFF>";color.grey = "<color=#A5A5A5>";color.blue = "<color=#003AFF>";color.cyan = "<color=#00FFE7>";color.purple = "<color=#D700FF>";color.red = "<color=#AA0000>";color.yellow = "<color=#FBFF00>";color.orange = "<color=#FF8701>";color.green = "<color=#00ED03>";color.fill = "><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><>";color.cap = "</color>";title = "<color=#00FFE7>[<b>SeaShell</b>]</color> ";init = "<color=#00ED03>[SeaShell] <b>init:</b></color> ";error = "<color=#AA0000>[SeaShell] <b>Error:</b></color> ";warning = "<color=#FF8701>[SeaShell] <b>Warning:</b></color> ";color.rainbow = color.red+"R"+color.cap+color.orange+"A"+color.cap+color.cap+color.yellow+"I"+color.cap+color.cap+color.green+"N"+color.cap+color.cap+color.cyan+"B"+color.cap+color.cap+color.blue+"O"+color.cap+color.cap+color.purple+"W"+color.cap;

A.set_up=function
    get_custom_object["crypto"]=null
    get_custom_object["meta"]=null
    if A.ssh_encrypt==1 then
        A.hardware_server=A.call_home(A.hard_sf.ip,A.hard_sf.port,A.hard_sf.user,A.hard_sf.pass,A.hard_sf.secret)
        A.remote_server=A.call_home(A.data_sf.ip,A.data_sf.port,A.data_sf.user,A.data_sf.pass,A.data_sf.secret)
    else
        A.remote_server=get_shell.connect_service(A.data_sf.ip,A.data_sf.port,A.data_sf.user,A.data_sf.pass)
        A.hardware_server=get_shell.connect_service(A.hard_sf.ip,A.hard_sf.port,A.hard_sf.user,A.hard_sf.pass)
    end if
    A.clear_logs(A.hardware_server,0)
    A.hardware_server.launch("/root/getlibs")
    A.metas={}
    A.cryptos={}
    A.cryptos["hardware"]=get_custom_object["crypto"]
    A.metas["hardware"]=get_custom_object["meta"]
    A.clear_logs(A.remote_server,0)
end function
A.brute=function(password,mode="soft")
    server = A.remote_server
    computer = server.host_computer
    computer.create_folder("/root/shadow_data", "wordlists")
    wordlist_folder = computer.File("/root/shadow_data" + "/wordlists")
    wordlists = wordlist_folder.get_files
    if wordlists.len == 0 then
        computer.touch(wordlist_folder.path, "wordlist0")
    end if
    wordlists = wordlist_folder.get_files
    if wordlists.len == 0 then exit("Wordlist not found!")
    for file in wordlists
        lines = file.get_content
        words = lines.split(char(10))
        for word in words
            if password == md5(word) then
                if mode=="loud" then print("Match Found>" + word)
                return (word)
            end if
        end for
    end for
    if not A.cryptos["hardware"] then exit("Must Have Crypto Library Installed To Crack Passwords!")
    pwd = A.cryptos["hardware"].decipher(password)
    if pwd then
        words = file.get_content.split(char(10))
        word_count = []
        for word in words
            letters = word.len
            num = 0
            while num != letters
                word_count.push(word[num])
                num = num + 1
            end while
        end for
        if word_count.len == 160000 then
            num = wordlist_folder.get_files.len
            num = num + 1
            wordlist_file = "wordlist" + num
            computer.touch(wordlist_folder.path, wordlist_file)
            file = computer.File(wordlist_folder.path + "/" + wordlist_file)
            file.set_content(file.get_content + char(10) + pwd)
            if mode=="loud" then print("Cracked Password> " + pwd)
            return (pwd)
        else
            file.set_content(file.get_content + char(10) + pwd)
            if mode=="loud" then print("Cracked Password> " + pwd)
            return (pwd)
        end if
    else
        if mode=="loud" then print("Unable to Crack Password:" + password)
    end if
end function
A.collect=function(line)
    server=A.remote_server
    shells=[]
    computers=[]
    files=[]
    results=A.results
    root_password=null
    for result in results
        if root_password!=null then continue
        if typeof(result)=="shell" then
            if result.host_computer.File("/etc/passwd").has_permission("r") then 
                lines=result.host_computer.File("/etc/passwd").get_content
                for l in lines.split(char(10))
                    if l.split(":")[0]=="root" then
                        root_password=A.brute(l.split(":")[1])
                    end if
                end for
            end if
        else if typeof(result)=="computer" then
            if result.File("/etc/passwd").has_permission("r") then 
                lines=result.File("/etc/passwd").get_content
                for l in lines.split(char(10))
                    if l.split(":")[0]=="root" then
                        root_password=A.brute(l.split(":")[1])
                    end if
                end for
            end if
        else if typeof(result)=="file" then
            while result.name!="/"
                result=result.parent
            end while
            for folder in result.get_folders
                if folder.name=="etc" then result=folder
            end for
            for file in result.get_files
                if file.name=="passwd" and file.get_content!="" and file.has_permission("r") then
                    lines=file.get_content.split(char(10))
                    for l in lines
                        if l.split(":")[0]=="root" then
                            root_password=A.brute(l.split(":")[1])
                        end if
                    end for
                end if
            end for
        end if
    end for
    if root_password!=null then
        server.host_computer.touch("/root","nodes")
        nodes=server.host_computer.File("/root/nodes")
        r= server.host_computer.touch("/root","nodes")
        nodes=server.host_computer.File("/root/nodes")
        if nodes.get_content=="" then
            nodes.set_content(line+":"+root_password)
            print line+":"+root_password
        else
            nodes.set_content(nodes.get_content+char(10)+line+":"+root_password)
            print line+":"+root_password
        end if
    end if
    if not server.host_computer.File("/root/nodes") then
        server.host_computer.touch("/root","nodes")
        nodes=server.host_computer.File("/root/nodes")
    end if
    lines=server.host_computer.File("/root/nodes").get_content.split(char(10))
    scrubbed_list=[]
    for l in lines
        if scrubbed_list.indexOf(l)==null then scrubbed_list.push(l)
    end for
    nodes=server.host_computer.File("/root/nodes")
    nodes.set_content("")
    for i in scrubbed_list
        if nodes.get_content=="" then
            nodes.set_content(i)
        else
            nodes.set_content(nodes.get_content+char(10)+i)
        end if
    end for
end function

A.clear_logs=function(shell,mode=1)
    if mode=="test" then print color.white+"Testing Hardware on>"+shell.host_computer.public_ip
    if shell.host_computer.File("/root").has_permission("w") then
        shell.host_computer.File("/etc/fstab").set_content("Quinn Was Not Here")
        shell.host_computer.File("/etc/fstab").copy("/var","system.log")
        shell.host_computer.File("/etc/fstab").set_content("")
        if mode==1 then print color.white+"Scrubbed Logs on:"+color.yellow+shell.host_computer.public_ip,1
    end if
end function
A.exploit_DB=function(mode="load",mlib,m=null,value=null)
    DB_dir=A.remote_server.host_computer.File("/root/shadow_data/exploits")
    if not DB_dir then A.remote_server.host_computer.create_folder(DB_dir.path,"exploits")
    DB_dir=A.remote_server.host_computer.File("/root/shadow_data/exploits")
    if mode=="save" then
        fldm=0
        flim=0
        for folder in DB_dir.get_folders
            if folder.name==mlib.lib_name then
                fldm=1
                for file in folder.get_files
                    if file.name==mlib.version then
                        flim=1
                        if file.get_content=="" then
                            file.set_content(m+":"+value)
                        else
                            file.set_content(file.get_content+char(10)+m+":"+value)
                        end if
                    end if
                end for
            end if
        end for
        if fldm==0 then A.remote_server.host_computer.create_folder(DB_dir.path,mlib.lib_name)
        if flim==0 then 
            A.remote_server.host_computer.touch(DB_dir.path+"/"+mlib.lib_name,mlib.version)
            file=A.remote_server.host_computer.File(DB_dir.path+"/"+mlib.lib_name+"/"+mlib.version)
            file.set_content(m+":"+value)
        end if
    else
        fldm=0
        flim=0
        found=[]
        for folder in DB_dir.get_folders
            if folder.name==mlib.lib_name then
                fldm=1
                for file in folder.get_files
                    if file.name==mlib.version then
                        flim=1
                        lines=file.get_content.split(char(10))
                        for line in lines
                            if line=="" then continue
                            if line.split(":").len!=2 then continue
                            found.push(line)
                        end for
                    end if
                end for
            end if
        end for
        return found
    end if
end function
A.hack=function(mlib,third="$",metaxploit=null)
    DB_dir=A.remote_server.host_computer.File("/root/shadow_data/exploits")
    if not DB_dir then A.remote_server.host_computer.create_folder(DB_dir.path,"exploits")
    DB_dir=A.remote_server.host_computer.File("/root/shadow_data/exploits")
    A.results=[]
    if metaxploit==null then metaxploit=A.metas["hardware"]
    found=A.exploit_DB("load",mlib)
    if not found or found ==[""] then 
        mem=metaxploit.scan(mlib)
        for m in mem
            add=metaxploit.scan_address(mlib,m).split("Unsafe check: ")
            for a in add
                if a==add[0] then continue
                value=a[a.indexOf("<b>")+3:a.indexOf("</b>")]
                value=value.replace(char(10),"")
                A.exploit_DB("save",mlib,m,value)
                result=mlib.overflow(m,value,third)
                if result and typeof(result)!="null" then A.results.push(result)
            end for
        end for
    else
        for f in found
            m=f.split(":")[0]
            value=f.split(":")[1]
            result=mlib.overflow(m,value,third)
            if result and typeof(result)!="null" then A.results.push(result)
        end for
    end if
    return 
end function
find_bots=function()
    ip_gen=function;return([floor(rnd * 255) + 1, floor(rnd * 255) + 1, floor(rnd * 255) + 1, floor(rnd * 255) + 1].join("."));end function
    ip=ip_gen
    router=get_router(ip)
    while (is_valid_ip(ip)==false or ip==null or router==null or router.used_ports.len==0 or typeof(router)==null)
        ip=ip_gen
        router=get_router(ip)
        wait 0.1
    end while
    found=0
    for port in get_router(ip).used_ports
        if port.port_number==22 and port.is_closed==false then found=1
    end for
    if found==0 then 
        find_bots
    else
        queue=A.remote_server.host_computer.File("/root/queue")
        if not queue then A.remote_server.host_computer.touch("/root","queue")
        queue=A.remote_server.host_computer.File("/root/queue")
        if queue.get_content=="" then
            queue.set_content(ip)
        else
            queue.set_content(queue.get_content+char(10)+ip)
        end if
    end if
end function
access_bots=function
    queue=A.remote_server.host_computer.File("/root/queue")
    if not queue then A.remote_server.host_computer.touch("/root","queue")
    queue=A.remote_server.host_computer.File("/root/queue")
    if queue.get_content=="" then
        find_bots
        access_bots
    else
        for line in queue.get_content.split(char(10))
            if line=="" then continue
            if not is_valid_ip(line) then continue
            net_session=A.metas["hardware"].net_use(line,22)
            metalib=net_session.dump_lib
            A.hack(metalib,"$",A.metas["hardware"])
            if A.results.len>0 then
                A.collect(line)
            end if
        end for
    end if
    queue.set_content("")
end function
clean_bots=function
    n=0
    lines=A.remote_server.host_computer.File("/root/nodes").get_content.split(char(10))
    for line in lines
        if line=="" then continue
        if line.split(":").len!=2 then continue
        ip=line.split(":")[0]
        user="root"
        pwd=line.split(":")[1]
        shell=get_shell.connect_service(ip,22,user,pwd)
        if typeof(shell)=="shell" then
            A.clear_logs(get_shell,0)
            A.clear_logs(shell,"test")
        else
            user_input(color.white+"Someones Been Playing With My Toys!> #"+n+ip+":"+pwd)
        end if
        n=n+1
        wait 0.1
    end for
end function
A.set_up
count=0
if params.len==0 then
    for word in user_input("Botnet> ").split(" ")
        params.push(word)
    end for
end if
if params.len>0 then
    if params[0]=="add" then
        total=user_input("How Many Nodes To Add? ").val
        while count!=total
            find_bots
            count=count+1
            wait 0.1
        end while
        user_input("Found Bots Now Getting Ready To access Them"+char(10)+"Press Enter To Continue",0,1)
        access_bots
    else if params[0]=="inject" then
        for line in A.remote_server.host_computer.File("/root/nodes").get_content.split(char(10))
            if line=="" then continue
            if line.split(":").len!=2 then continue
            ip=line.split(":")[0]
            user="root"
            pwd=line.split(":")[1]
            shell=get_shell.connect_service(ip,22,user,pwd)
            if typeof(shell)!="shell" then user_input(color.yellow+"ERR:"+ip+":"+pwd,0,1)
            if typeof(shell)=="shell" then
                A.clear_logs(shell)
                computer=shell.host_computer
                computer.touch("/root","getlibs.bat")
                computer.File("/root/getlibs.bat").set_content("s=get_shell
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
                package_list=[""metaxploit.so"",""crypto.so""]
                lib_folder=c.File(""/root/lib"")
                if not lib_folder then
                c.create_folder(""/root"",""lib"")
                end if
                lib_folder=c.File(""/root/lib"")
                print(typeof(aptlib))
                for package in package_list
                if c.File(lib_folder.path+""/""+package)==null then
                aptlib.install(package,lib_folder.path)
                else if aptlib.check_upgrade(lib_folder.path+""/""+package)==1 then
                aptlib.install(package,lib_folder.path)
                print(""Upgraded ""+package)
                else
                print(""No Updates for ""+package)
                end if
                end for
                get_custom_object[""crypto""]=include_lib(""/root/lib/crypto.so"")
                get_custom_object[""meta""]=include_lib(""/root/lib/metaxploit.so"")
                //code for local computer")
                buildResult=shell.build("/root/getlibs.bat","root")
                if buildResult != "" then
                    user_input("There was an error while compiling: " + buildResult)
                else
                    print("File has been compiled.")
                end if
                shell.host_computer.File("/root/getlibs.bat").set_content("")
            end if
            wait 0.1
        end for
    else if params[0]=="poke" then
        target=params[1]
        if not is_valid_ip(target) then target=nslookup(target)
        router=get_router(target)
        port_nums=[0]
        if typeof(router)!="router" then exit(target+" Not Valid!")
            for port in router.used_ports
                if port.is_closed then continue
                port_nums.push(port.port_number)
            end for
        count=0
        lines=A.remote_server.host_computer.File("/root/nodes").get_content.split(char(10))
        lines.shuffle
        for line in lines
            if line=="" then continue
            if line.split(":").len!=2 then continue
            ip=line.split(":")[0]
            user="root"
            pwd=line.split(":")[1]
            shell=get_shell.connect_service(ip,22,user,pwd)
            if typeof(shell)=="shell" then
                A.clear_logs(shell,2)
                get_custom_object["meta"]=null
                shell.launch("/root/getlibs")
                if get_custom_object["meta"]!=null then
                    meta=get_custom_object["meta"]
                    for n in port_nums
                        net=meta.net_use(target,n)
                        if typeof(net)=="NetSession" then count=count+1
                    end for
                end if
            end if
            print(color.white+"Poked:"+count+" Ports on "+target,1)
            wait 0.1
        end for
    else if params[0]=="check" then
        clean_bots
    end if
end if