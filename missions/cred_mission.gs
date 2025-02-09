import_code("../imports/core.src")
import_code("../imports/bios.src")

mailbox=mail_login(user_mail_address,A.mail_pass)
clear_screen
emails=mailbox.fetch
for email in emails
    subject=email.split(char(10))[4].split(":")[1].trim
    if subject!="Mission Contract" then continue
    who=email.split(char(10))[5].split("user")[1].split("<b>")[1].split("\.")[0]
    remote=email.split(char(10))[6].split("victim is")[1].split("<b>")[1].split("</b>")[0]
    if not is_valid_ip(remote) then remote=remote.split("<")[0]
    if not is_valid_ip(remote) then exit remote
    admin=whois(remote).split(char(10))[2].split(":")[1].trim
    user_input(admin)
    clear_screen
end for
Ohende@ipudugojil.net



get_shell.host_computer.File(program_path).delete