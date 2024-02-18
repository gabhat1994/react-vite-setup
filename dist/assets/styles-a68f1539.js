import{u,dp as r,dm as p,dn as c,j as n,em as m,B as g,I as x,e as b,d6 as y,s as e,x as o}from"./index-cd84bcc9.js";import{aB as f,r as w,C as a}from"./vendor-51460554.js";const L=()=>{const{width:t}=u(),s=document.querySelector("#launcher-frame"),i=t<=b.MOBILE_MAX,l=f(),{toggleHelpPanel:d}=y();w.useEffect(()=>i?(setTimeout(()=>{p(s,{...c,opacity:"0",bottom:"unset",top:"4px",transform:"translateX(120px)","max-width":"156px","z-index":"1000001",width:"unset",left:{value:"unset",priority:"important"},right:{value:"120px",priority:"important"}})},200),()=>r("none")):r("block"),[i,t,l.key,s]);const h=()=>{d()};return i?n(m,{"data-id":"mobile-help-button","data-test":"MobileHelpButton-LogoutContainer",children:n(g,{textOnly:!0,size:"small",onClick:h,rightIcon:n(x,{color:"--icon-button-brand-primary-default",name:"question",size:24,"data-test":"MobileHelpButton-Icon"}),"data-test":"MobileHelpButton-Button",children:"Help"})}):null},B="/assets/QuickSignUp-0089d4be.svg",k=a(o)`
  background-color: var(--bg-body-neutral-alt-default);
  height: 100vh;
  @media (max-width: ${e.MOBILE_L}) {
    height: 85vh;
    ${t=>t.dynamicHeight&&"height: unset"}
  }
  ${t=>t.dynamicHeight&&"height: unset"}
  ${({dynamicWidth:t})=>!t&&"width: 100vw;"}
`,H=a(o)`
  flex: 1;
  padding: 0 40px;
  max-height: 100vh;
  max-width: 100vw;
  height: 100%;

  @media (max-width: ${e.MOBILE_MAX}) {
    padding: 0 20px;
  }

  @media (max-width: ${e.MOBILE_L}) {
    height: 100vh;
  }
`,S=a(o)`
  flex: 1;
  max-height: 100vh;
  max-width: 100vw;
  height: 100%;
  @media (max-width: ${e.MOBILE_L}) {
    height: 100vh;
  }
  padding-top: 40px;
`,I={width:"100%",display:"flex",alignItems:"center",justifyContent:"center",height:"100%",background:`url(${B}) no-repeat`,backgroundSize:"100%"},C=a.div`
  width: 95px;
  height: 40px;
  padding-top: 30px;
`;export{C as B,S as H,I as L,L as M,k as R,H as a};
//# sourceMappingURL=styles-a68f1539.js.map
