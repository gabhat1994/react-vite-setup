import{j as a,f as l,R as u}from"./index-cd84bcc9.js";import{C as i,a9 as c}from"./vendor-51460554.js";import{A as r}from"./index-4963229a.js";const d=i.div`
  width: 100%;
  background: var(--bg-card-neutral-alt-default);
`,v={NavBar:d},g=({children:t})=>a(v.NavBar,{children:a(r.MainContent,{children:t})}),f=({children:t,responsiveMain:o=!1,navBarContent:e})=>{const n=c(),{isUnregistered:s}=l();return a(r.Layout,{onGoBack:()=>n(s?u.GUEST_HOME:-1),topNavbar:e?a(g,{"data-test":"FullScreenLayout-NavBar",children:e}):null,sideNav:null,background:"neutral-alt-highlighted",children:o?a(r.MainContent,{children:t}):t})};export{f as F};
//# sourceMappingURL=index-af3e0302.js.map
