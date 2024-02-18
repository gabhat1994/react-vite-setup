import{s as m,x as n,T as d,B as U,f as S,X as y,v,j as e,R as u,a1 as B,c as l,n as C,a2 as k}from"./index-cd84bcc9.js";import{U as M}from"./unsubscribe-7530c809.js";import{U as I}from"./UnauthenticatedHeader-60009936.js";import{A as L}from"./index-4963229a.js";import{C as a,ar as _,bc as A,a9 as R,r as w,bo as N}from"./vendor-51460554.js";import{u as W}from"./useUserPreferences-0adc91e3.js";import"./useResizeObserver-0deb9469.js";import"./Modal-5a254f40.js";const j=a(n).attrs({vertical:!0,align:"center",padding:"40px"})`
  background-color: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  max-width: 668px;

  @media (max-width: ${m.TABLET_L}) {
    max-width: 100%;
  }
`,H=a(n).attrs({fullWidth:!0,justify:"center"})`
  @media (max-width: ${m.TABLET_L}) {
    padding: 0 36px;
  }
`,O=a(d).attrs({font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted"})``,D=a(d).attrs({font:"body-l",colorToken:"--text-card-neutral-default"})``,F=a(d).attrs({font:"body-l",colorToken:"--text-card-neutral-default"})``,P=a(n).attrs({fullWidth:!0,justify:"center",padding:"24px 0 24px"})``,$=a.img`
  max-width: 104px;
`,z=a(U).attrs({size:"small"})`
  span {
    color: var(--text-button-brand-primary-default) !important;
  }
`,G=a.div`
  position: relative;
`,t={Image:$,Content:j,Layout:P,MessageTitle:O,ContentWrapper:H,MessageDescription:D,ManageButton:z,ResubscribeText:F,SpinnerContainer:G},Q=()=>{const{t:r}=_(),[h]=A(),b=R(),{user:i}=S(),s=h.get("unsubscribeFrom"),{isMobile:g}=y(),{updatePreference:o,loading:f,loadingUpdate:x,error:p}=W({disableQuery:!0}),{addErrorToast:c}=v();w.useEffect(()=>{async function E(){if(s&&!p)try{await o(s,!1)}catch{c(r("noumena.unsubscribe.error"))}}E()},[c,p,r,s,o]);const T=async()=>{if(s)try{await o(s,!0),b(u.EMAIL_RESUBSCRIBED,{replace:!0})}catch{c(r("noumena.unsubscribe.error"))}};return!s||!(i!=null&&i._id)?e(N,{to:u.HOME,replace:!0,"data-test":"EmailUnsubscribe-Navigate"}):e(L.Layout,{topNavbar:e(B,{isBorderRadius:!1,"data-test":"EmailUnsubscribe-Header",children:e(I,{title:"","data-test":"EmailUnsubscribe-UnauthenticatedHeader"})}),children:e(t.Layout,{children:e(t.ContentWrapper,{children:l(t.Content,{children:[l(n,{gap:16,vertical:!0,fullWidth:!0,align:"center","data-test":"EmailUnsubscribe-Stack",children:[e(t.Image,{src:M,alt:"unsubscribe-image"}),e(t.MessageTitle,{children:r("noumena.unsubscribe.title")}),e(t.SpinnerContainer,{children:(f||x)&&e(C,{"data-test":"EmailUnsubscribe-Spinner"})}),e(t.MessageDescription,{textAlign:"center",children:r("noumena.unsubscribe.description")}),e(t.ManageButton,{neutral:!0,onClick:()=>b(u.NOTIFICATIONS_SETTINGS),children:r("noumena.unsubscribe.manager_preferences_button")})]}),e(k,{fullWidth:!0,"data-test":"EmailUnsubscribe-Separator"}),l(n,{align:"center",vertical:g,"data-test":"EmailUnsubscribe-Stack",children:[e(t.ResubscribeText,{children:r("noumena.unsubscribe.helper_text")}),e(t.ManageButton,{neutral:!0,onClick:T,children:r("noumena.unsubscribe.resubscribe_button")})]})]})})})})},te=Q;export{te as default};
//# sourceMappingURL=EmailUnsubscribe-94713f0d.js.map
