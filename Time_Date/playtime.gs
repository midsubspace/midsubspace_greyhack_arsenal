while true
    endTime=time
    h = floor(endTime / 3600)
    m = floor((endTime % 3600) / 60)
    s = floor(endTime % 60)
    if h!=0 then
        h=h+" Hour(s)"
    else
        h=""
    end if
    if m!=0 then
        m=m+" Minute(s)"
    else
        m=""
    end if
    if s!=0 then
        s=s+" Second(s)"
    else
        continue
    end if
    if params.len>0 then
        if params.indexOf("break")!=null then
            print("Last Break Was"+h+" "+m+" "+s,1)
        else if params.indexOf("afk")!=null then
            print("<size=55>Quinn's Been Gone For:"+h+" "+m+" "+s,1)
        else if params.indexOf("left")!=null then
            stopH=user_input("Hours: ").to_int
            stopM=user_input("Minutes: ").to_int
            stopS=user_input("Seconds: ").to_int
            countdownTime=(stopH*3600)+(stopM*60)+stopS
            while countdownTime>0
                h=floor(countdownTime/3600)
                m=floor((countdownTime%3600)/60)
                s=floor(countdownTime%60)
                if h!=0 then
                    hstr=h+" Hour(s)"
                else
                    hstr=""
                end if
                if m!=0 then
                    mstr=m+" Minute(s)"
                else
                    mstr=""
                end if
                if s!=0 then
                    sstr=s+" Second(s)"
                else
                    sstr=s+" Second(s)"
                end if
                print "Quinn's Leaving In: "+hstr+" "+mstr+" "+sstr,1
                countdownTime=countdownTime-1
                wait 1
            end while
            hostComputer = get_shell("root", "test").host_computer
            processes = hostComputer.show_procs.split(char(10))[1:]
            for process in processes
                pid = process.split(" ")[1]
                closeResult = hostComputer.close_program(pid.to_int)
                if typeof(closeResult) == "string" then
                print("There was an error when closing a program: " + closeResult)
                else
                print("Program with pid " + pid + " got successfully closed.")
                end if
            end for
        end if
    else
        print "You've Been Playing For:"+h+" "+m+" "+s,1
    end if
        wait 1
end while