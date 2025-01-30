print_cal=function(year)
    months=["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"]
    daysTitle="MO TU WE TH FR SA SU"
    DaysPerMonth=[31,28,31,30,31,30,31,31,30,31,30,31]
    startday=((year-1)*365+floor((year-1)/4)-floor((year-1)/100)+floor((year-1)/400))%7
    if year%4==0 and year%100!=0 or year%400==0 then DaysPerMonth[1]=29
    sep=5
    month_width=daysTitle.len
    cal_width=3*month_width+2*sep
    center=function(str,width)
        fill1=floor((width-str.len)/2)
        fill2=floor(width-str.len)-fill1
        spaces1=" "*fill1
        spaces2=" "*fill2
        return spaces1+str+spaces2
    end function
    makeMonth=function(name,skip,days)
        cal=[center(name,month_width),daysTitle]
        curDay=1-skip
        while cal.len<9
            line=["sun","mo","tu","we","thr","fri","sat"]
            for i in range(0,6)
                if curDay<1 or curDay>days then
                    line[i]=("  ")
                else
                    formatedDay="  "+curDay
                    if formatedDay.len>2 then formatedDay=formatedDay[-2:]
                    line[i]=(formatedDay)
                end if
                curDay=curDay+1
            end for
        cal.push(line.join(" "))
        end while
        return cal
    end function
    calendar=[]
    for i in range(0,months.len-1)
        month=months[i]
        dpm=DaysPerMonth[i]
        calendar.push(makeMonth(month,startday,dpm))
        startday=(startday+dpm)%7
    end for
    print center("[Quinn [midsubspace]]",cal_width)
    print center("--- "+str(year)+" ---",cal_width)

    for q in range(0,3)
        for l in range(0,8)
            line=[0,1,2]
            for m in range(0,2)
                line[m]=calendar[q*3+m][l]
            end for
            print line.join(" "*sep)
        end for
    end for
end function


print_cal(current_date.split("/")[2].split(" - ")[0])