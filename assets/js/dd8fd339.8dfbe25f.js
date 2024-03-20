"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[154],{2035:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>l,metadata:()=>r,toc:()=>d});var i=s(4848),t=s(8453);const l={id:"tmux",title:"Tmux - terminal multiplexer",sidebar_label:"Tmux"},c=void 0,r={id:"essential/tmux",title:"Tmux - terminal multiplexer",description:"Basics",source:"@site/docs/essential/tmux.md",sourceDirName:"essential",slug:"/essential/tmux",permalink:"/docs/essential/tmux",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/essential/tmux.md",tags:[],version:"current",frontMatter:{id:"tmux",title:"Tmux - terminal multiplexer",sidebar_label:"Tmux"},sidebar:"notesSidebar",previous:{title:"Linux",permalink:"/docs/essential/linux"},next:{title:"Vim",permalink:"/docs/essential/vim"}},o={},d=[{value:"Basics",id:"basics",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Optional",id:"optional",level:2},{value:"Tmux-powerline",id:"tmux-powerline",level:3},{value:"Misc",id:"misc",level:3},{value:"References",id:"references",level:2}];function a(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"basics",children:"Basics"}),"\n",(0,i.jsx)(n.p,{children:"Start a new Tmux session"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"$ tmux new -s [session-name]\n"})}),"\n",(0,i.jsx)(n.p,{children:"Detach from a Tmux session"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Ctrl"}),"+",(0,i.jsx)(n.code,{children:"b"}),", ",(0,i.jsx)(n.code,{children:"d"})]}),"\n",(0,i.jsx)(n.p,{children:"List Tmux sessions"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"$ tmux ls\n"})}),"\n",(0,i.jsx)(n.p,{children:"Attach a Tmux session"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"tmux a -t [session-name]\n\n# Detach any other clients and attach the session\ntmux a -dt [session-name]\n"})}),"\n",(0,i.jsx)(n.p,{children:"Create a new window"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Ctrl"}),"+",(0,i.jsx)(n.code,{children:"b"}),", ",(0,i.jsx)(n.code,{children:"c"})]}),"\n",(0,i.jsx)(n.p,{children:"Split a window or a pane into two panes"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["vertically: ",(0,i.jsx)(n.code,{children:"Ctrl"}),"+",(0,i.jsx)(n.code,{children:"b"}),", ",(0,i.jsx)(n.code,{children:"%"})]}),"\n",(0,i.jsxs)(n.li,{children:["horizontally: ",(0,i.jsx)(n.code,{children:"Ctrl"}),"+",(0,i.jsx)(n.code,{children:"b"}),", ",(0,i.jsx)(n.code,{children:'"'})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Show the list of windows, and then pick one"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Ctrl+b"}),", ",(0,i.jsx)(n.code,{children:"w"})," and then ",(0,i.jsx)(n.code,{children:"[arrow key]"})," or ",(0,i.jsx)(n.code,{children:"[number]"})]}),"\n",(0,i.jsx)(n.p,{children:"Rename a window"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Ctrl"}),"+",(0,i.jsx)(n.code,{children:"b"}),", ",(0,i.jsx)(n.code,{children:","})]}),"\n",(0,i.jsx)(n.p,{children:"Switch from the current window to"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["the next window: ",(0,i.jsx)(n.code,{children:"Ctrl"}),"+",(0,i.jsx)(n.code,{children:"b"}),", ",(0,i.jsx)(n.code,{children:"n"})]}),"\n",(0,i.jsxs)(n.li,{children:["the previous window: ",(0,i.jsx)(n.code,{children:"Ctrl"}),"+",(0,i.jsx)(n.code,{children:"b"}),", ",(0,i.jsx)(n.code,{children:"p"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Switch from the current pane to the left, right, upper, or lower"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Ctrl"}),"+",(0,i.jsx)(n.code,{children:"b"}),", ",(0,i.jsx)(n.code,{children:"[arrow key]"})]}),"\n",(0,i.jsx)(n.p,{children:"Move the active pane in the current window"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["clockwise: ",(0,i.jsx)(n.code,{children:"Ctrl"}),"+",(0,i.jsx)(n.code,{children:"b"}),", ",(0,i.jsx)(n.code,{children:"}"})]}),"\n",(0,i.jsxs)(n.li,{children:["counter-clockwise: ",(0,i.jsx)(n.code,{children:"Ctrl"}),"+",(0,i.jsx)(n.code,{children:"b"}),", ",(0,i.jsx)(n.code,{children:"{"})]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,i.jsxs)(n.p,{children:["Tmux is easy to customize. Here're things that I add to my Tmux configuration file ",(0,i.jsx)(n.code,{children:"~/.tmux.conf"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Enable vi mode"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"set-window-option -g mode-keys vi\n"})}),"\n",(0,i.jsx)(n.p,{children:"Use clipboard to copy and paste"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"bind-key -T copy-mode-vi v send-keys -X begin-selection\nbind-key -T copy-mode-vi y send-keys -X copy-pipe-and-cancel 'xclip -in -selection clipboard'\n"})}),"\n",(0,i.jsx)(n.p,{children:"Disable auto renaming window"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"set-option -g allow-rename off\n"})}),"\n",(0,i.jsx)(n.p,{children:"Set default shell (e.g. zsh)"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"set -g default-shell /usr/bin/zsh\n"})}),"\n",(0,i.jsx)(n.p,{children:"Setup foreground and background colors of status line"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:'set-option -g status-fg "colour136"\nset-option -g status-bg "colour235"\n'})}),"\n",(0,i.jsx)(n.h2,{id:"optional",children:"Optional"}),"\n",(0,i.jsx)(n.h3,{id:"tmux-powerline",children:"Tmux-powerline"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:'set-option -g status on\nset-option -g status-interval 2\nset-option -g status-justify "centre"\nset-option -g status-left-length 60\nset-option -g status-right-length 90\nset-option -g status-left "#(~/.config/tmux-powerline/powerline.sh left)"\nset-option -g status-right "#(~/.config/tmux-powerline/powerline.sh right)"\n'})}),"\n",(0,i.jsx)(n.h3,{id:"misc",children:"Misc"}),"\n",(0,i.jsxs)(n.p,{children:["Avold the this problem - ",(0,i.jsx)(n.a,{href:"https://github.com/vim-airline/vim-airline/issues/124",children:"delay when switching insert mode to normal mode (vim-airline/issues/124)"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-text",children:"set -sg escape-time 0\n"})}),"\n",(0,i.jsx)(n.h2,{id:"references",children:"References"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://tmuxcheatsheet.com/",children:"Tmux Cheat Sheet & Quick Reference"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://linuxize.com/post/getting-started-with-tmux/",children:"Linuxize -- Getting started with Tmux"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>c,x:()=>r});var i=s(6540);const t={},l=i.createContext(t);function c(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);