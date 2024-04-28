"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[626],{3828:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>t,metadata:()=>r,toc:()=>i});var c=o(4848),s=o(8453);const t={id:"conman",title:"Conman - console manager",sidebar_label:"Conman"},a=void 0,r={id:"special/conman",title:"Conman - console manager",description:"Connect console",source:"@site/docs/special/conman.md",sourceDirName:"special",slug:"/special/conman",permalink:"/docs/special/conman",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"conman",title:"Conman - console manager",sidebar_label:"Conman"},sidebar:"notesSidebar",previous:{title:"Special",permalink:"/docs/category/special"},next:{title:"iDRAC",permalink:"/docs/special/idrac"}},l={},i=[{value:"Setup remote access to serial console CentOS/Redhat",id:"setup-remote-access-to-serial-console-centosredhat",level:2},{value:"References",id:"references",level:2}];function m(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.p,{children:"Connect console"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sh",children:"conman <name>\n"})}),"\n",(0,c.jsx)(n.p,{children:"Exit from console"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sh",children:"&.\n"})}),"\n",(0,c.jsx)(n.p,{children:"Install from source"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-sh",children:"# Required packages\ndnf install expect freeipmi freeipmi-devel\n\n# Download, compile, and install\ngit clone https://github.com/dun/conman.git\ncd conman\ngit tag\ngit checkout conman-0.3.0\n./bootstrap\n./configure --prefix=/opt/conman-0.3.0\nmake\nmake install\nln -s /opt/conman-0.3.0 /opt/conman\nmkdir -p /var/log/conman/console_log/conman/\n"})}),"\n",(0,c.jsxs)(n.p,{children:["Example conman.conf(e.g. ",(0,c.jsx)(n.code,{children:"/opt/conman/etc/conman.conf"}),")"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-text",children:'server timestamp=1h\nSERVER logdir="/var/log/conman/console_log/conman/"\nSERVER logfile="conman.log"\nglobal log="/var/log/conman/console_log/%N/%N.%Y.%m%d.%H%M%S"\nglobal logopts="timestamp"\n\nconsole name="host1" dev="/opt/conman/lib/conman/exec/ipmitool.exp %N-mg.example.com user"\nconsole name="host2" dev="/opt/conman/lib/conman/exec/ipmitool.exp %N-mg.example.com user"\n'})}),"\n",(0,c.jsxs)(n.p,{children:["Example of ",(0,c.jsx)(n.code,{children:"/etc/conman.pswd"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-text",children:"host[1-2]-mg.example.com : user : password\n"})}),"\n",(0,c.jsxs)(n.p,{children:["Example conman.service(",(0,c.jsx)(n.code,{children:"/etc/systemd/system/conman.service"}),")"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-text",children:"[Unit]\nDescription=ConMan Console Management Daemon\nAfter=network.target\n\n[Service]\nType=forking\n# For installations with large number of users, raise the limit\n# of open file descriptors:\n#LimitNOFILE=10000\nExecStart=/opt/conman/sbin/conmand -c /opt/conman/etc/conman.conf\n\n[Install]\nWantedBy=multi-user.target\n"})}),"\n",(0,c.jsx)(n.h2,{id:"setup-remote-access-to-serial-console-centosredhat",children:"Setup remote access to serial console CentOS/Redhat"}),"\n",(0,c.jsxs)(n.p,{children:["On the ",(0,c.jsx)(n.code,{children:"/etc/sysconfig/grub"}),", add ",(0,c.jsx)(n.code,{children:"console=tty0 console=ttyS0,115200n8"})," to ",(0,c.jsx)(n.code,{children:"GRUB_CMDLINE_LINUX"})," like this:"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{children:'--- /etc/sysconfig/grub 2020-12-08 10:32:54.784876819 +0900\n+++ /etc/sysconfig/grub.orig    2020-12-08 09:44:09.023170789 +0900\n@@ -3,6 +3,6 @@\n GRUB_DEFAULT=saved\n GRUB_DISABLE_SUBMENU=true\n GRUB_TERMINAL_OUTPUT="console"\n-GRUB_CMDLINE_LINUX="crashkernel=auto resume=UUID=dce8618b-f6e2-4a6d-be51-62a1d1dec0ef console=tty0 console=ttyS0,115200n8"\n+GRUB_CMDLINE_LINUX="crashkernel=auto resume=UUID=dce8618b-f6e2-4a6d-be51-62a1d1dec0ef rhgb quiet"\n GRUB_DISABLE_RECOVERY="true"\n GRUB_ENABLE_BLSCFG=true\n'})}),"\n",(0,c.jsx)(n.p,{children:"Apply the change (and reboot after this command):"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{children:"# Backup grub.cfg\ncp /boot/efi/EFI/centos/grub.cfg{,.orig}\n\n# CentOS\ngrub2-mkconfig -o /boot/efi/EFI/centos/grub.cfg\n# Redhat\ngrub2-mkconfig -o /boot/efi/EFI/centos/grub.cfg\n"})}),"\n",(0,c.jsx)(n.p,{children:"Test it"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{children:"# By ipmitool\nipmitool -H host1-mg -I lanplus -U <user> -P <password> sol activate | tee -a console_log.txt\n\n# By conman's ipmitool.exp\n/opt/conman-0.3.0/lib/conman/exec/ipmitool.exp host1-mg.oist.jp <user> <password>\n"})}),"\n",(0,c.jsx)(n.h2,{id:"references",children:"References"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"https://shachimaru.wiki.fc2.com/wiki/conman",children:"\u3084\u308b\u30e1\u30e2- conman"})}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(m,{...e})}):m(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>a,x:()=>r});var c=o(6540);const s={},t=c.createContext(s);function a(e){const n=c.useContext(t);return c.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),c.createElement(t.Provider,{value:n},e.children)}}}]);