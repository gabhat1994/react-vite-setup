import{s as n,x as r,T as s,B as o,j as t,a1 as d,c}from"./index-cd84bcc9.js";import{U as l}from"./unsubscribe-7530c809.js";import{U as u}from"./UnauthenticatedHeader-60009936.js";import{A as p}from"./index-4963229a.js";import{C as e,ar as m}from"./vendor-51460554.js";import"./useResizeObserver-0deb9469.js";import"./Modal-5a254f40.js";const b=e(r).attrs({vertical:!0,align:"center",padding:"40px"})`
  background-color: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  max-width: 668px;

  @media (max-width: ${n.TABLET_L}) {
    max-width: 100%;
  }
`,x=e(r).attrs({fullWidth:!0,justify:"center"})`
  @media (max-width: ${n.TABLET_L}) {
    padding: 0 36px;
  }
`,g=e(s).attrs({font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted"})``,h=e(s).attrs({font:"body-l",colorToken:"--text-card-neutral-default"})``,f=e(s).attrs({font:"body-l",colorToken:"--text-card-neutral-default"})``,T=e(r).attrs({fullWidth:!0,justify:"center",padding:"24px 0 24px"})``,y=e.img`
  max-width: 104px;
`,L=e(o).attrs({size:"small"})`
  span {
    color: var(--text-button-brand-primary-default) !important;
  }
`,v=e.div`
  position: relative;
`,a={Image:y,Content:b,Layout:T,MessageTitle:g,ContentWrapper:x,MessageDescription:h,ManageButton:L,ResubscribeText:f,SpinnerContainer:v},E=()=>{const{t:i}=m();return t(p.Layout,{topNavbar:t(d,{isBorderRadius:!1,"data-test":"EmailResubscribed-Header",children:t(u,{title:"","data-test":"EmailResubscribed-UnauthenticatedHeader"})}),children:t(a.Layout,{children:t(a.ContentWrapper,{children:t(a.Content,{children:c(r,{gap:16,vertical:!0,fullWidth:!0,align:"center","data-test":"EmailResubscribed-Stack",children:[t(a.Image,{src:l,alt:"resubscribed-image"}),t(a.MessageTitle,{children:i("noumena.resubscribed.title")}),t(a.MessageDescription,{textAlign:"center",children:i("noumena.resubscribed.description")})]})})})})})},M=E;export{M as default};
//# sourceMappingURL=EmailResubscribed-218392fe.js.map
