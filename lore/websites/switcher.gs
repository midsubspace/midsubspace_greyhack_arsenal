s=get_shell
c=s.host_computer
n=0
files=[]
for file in c.File("/Public/htdocs/default").get_files
    files.push(file)
end for
for file in files
    print n+")"+file.name
    n+=1
end for
opt=user_input("Pick#").val
file=files[opt]
file.copy("/Public/htdocs","website.html")