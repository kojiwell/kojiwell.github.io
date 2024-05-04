"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[110],{219:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>o});var r=n(4848),t=n(8453);const i={id:"idrac",title:"iDRAC - integrated Dell Remote Access Controller",sidebar_label:"iDRAC"},a=void 0,l={id:"special/idrac",title:"iDRAC - integrated Dell Remote Access Controller",description:"The iDRAC is a device in a Dell server that allows IT administrators to manage",source:"@site/docs/special/idrac.md",sourceDirName:"special",slug:"/special/idrac",permalink:"/docs/special/idrac",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"idrac",title:"iDRAC - integrated Dell Remote Access Controller",sidebar_label:"iDRAC"},sidebar:"notesSidebar",previous:{title:"Conman",permalink:"/docs/special/conman"},next:{title:"Slurm",permalink:"/docs/special/slurm"}},c={},o=[];function d(e){const s={a:"a",code:"code",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.p,{children:"The iDRAC is a device in a Dell server that allows IT administrators to manage\nand monitor a remote and local server. It doesn't only provide a web UI but\nalso very helpful, handy CLIs."}),"\n",(0,r.jsxs)(s.p,{children:["It also provides SSH public key access, which is wonderful when you manage hundreds of servers\nby a parallel shell -- such as ",(0,r.jsx)(s.a,{href:"https://github.com/chaos/pdsh",children:"pdsh"}),"."]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.p,{children:"Install racadm and omreport"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"# Install\ndnf install -y srvadmin-omacore srvadmin-idrac\n\n# Start and enable srvadmin-services\n/opt/dell/srvadmin/sbin/srvadmin-services.sh start\n/opt/dell/srvadmin/sbin/srvadmin-services.sh enable\n\n# Check it\n/opt/dell/srvadmin/sbin/omreport system\n"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.p,{children:"Register a SSH public key"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:'racadm -r <ip/hostname> -u <user> -p <password> \\\n    sshpkauth -i <number> -k <number> -t "$(cat ~/.ssh/id_rsa.pub)"\n'})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"-i <number>"})," : User ID. root is 2"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"-k <number>"})," : Key ID. 1 ~ 4"]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:'-t "text"'})," : content of your public key"]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:"You can check a user name by this"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",children:"racadm get idrac.users.<number>.UserName\n"})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"<number>"})," : Root is 2"]}),"\n"]}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.p,{children:"Install Dell System Update, update GPG keys, and then run dsu"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",children:"wget -q -O - http://linux.dell.com/repo/hardware/dsu/bootstrap.cgi | bash\ncurl -s https://linux.dell.com/repo/hardware/dsu/copygpgkeys.sh | bash\nyum install dell-system-update\ndsu --non-interactive --import-public-key --reboot\n"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.p,{children:"Setup a static IP on iDRAC"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-shell",children:"racadm setniccfg -s <IPv4Address> <netmask> <IPv4 gateway>\n"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.p,{children:"Updating iDRAC or BIOS would sometimes fail. If resetting iDRAC doesn't solve the problem, you have to try force-resetting\njobqueue and then reset iDRAC like this:"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"racadm jobqueue delete -i JID_CLEARALL_FORCE\nsleep 120 # Wait for two minutes to make sure jobqueue is cleared\nracadm racreset\nsleep 300 # Wait for five minutes to ensure iDRAC is back to online\n# and then\ndsu --non-interactive --reboot\n"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.p,{children:"Generate the SupportAssist log by CLI"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"racadm -r <ip/host> -u <user> -p <password> supportassist accepteula\nracadm -r <ip/host> -u <user> -p <password> supportassist collect -f <filename>.zip\n"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.p,{children:"Set up the next boot with PXE and reboot (locally)"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-sh",children:"racadm set iDRAC.ServerBoot.BootOnce Enabled\nracadm set iDRAC.ServerBoot.FirstBootDevice PXE\nreboot\n"})}),"\n",(0,r.jsx)(s.hr,{}),"\n",(0,r.jsx)(s.p,{children:"Use serial console via iDRAC"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{children:"ssh root@<ip/hostname of iDRAC>\nracadm>> console com2\n"})}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["To exit, ",(0,r.jsx)(s.code,{children:"Ctrl"})," + ",(0,r.jsx)(s.code,{children:"\\"})]}),"\n",(0,r.jsxs)(s.li,{children:["To enable the serial console on CentOS 8, add ",(0,r.jsx)(s.code,{children:"console=tty0 console=ttyS0,115200n8"})," to ",(0,r.jsx)(s.code,{children:"GRUB_CMDLINE_LINUX"})," in ",(0,r.jsx)(s.code,{children:"/etc/sysconfig/grub"})]}),"\n"]})]})}function h(e={}){const{wrapper:s}={...(0,t.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>a,x:()=>l});var r=n(6540);const t={},i=r.createContext(t);function a(e){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),r.createElement(i.Provider,{value:s},e.children)}}}]);