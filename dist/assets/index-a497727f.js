import{j as a,k5 as J,b2 as r,e as Q,f as X,w as Y,d8 as Z,a1 as C,d9 as tt,c as s,x as L,T as p,B as H,K as P,da as at,d7 as et,b7 as ot,L as M}from"./index-cd84bcc9.js";import{r as n,C as c,a9 as nt,aB as it}from"./vendor-51460554.js";import{s as E,S as st}from"./sideNavItems-22800105.js";import{S as v}from"./index-2d186805.js";import{c as dt}from"./storyblok-c16fb040.js";import{A as h}from"./index-4963229a.js";import{S as R}from"./styles-3ceda759.js";const W=n.forwardRef(({children:t,...d},u)=>a(J,{ref:u,"data-testid":"SubHeader",...d,"data-test":"SubHeader-SubHeaderWrapper",children:t})),rt=c.div.attrs(t=>t)`
  font-family: var(--font-family);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(
    ${t=>t.backgroundColor||"--bg-body-neutral-alt-highlighted"}
  );
`,ct=c.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  gap: 0;

  ${({type:t})=>t==="Chambers"&&"padding: 1px 0 0;"}
  ${({type:t})=>t==="Discovery"&&"padding: 16px 0 80px;"}
  ${({type:t})=>t==="Money"&&"padding: 0px 0 80px;"}

  @media ${r.TABLET} {
    ${({type:t})=>t==="Chambers"&&"padding: 16px 16px 0;"}
    ${({type:t})=>t==="Discovery"&&"padding: 16px 16px 80px;"}
    ${({type:t})=>t==="Money"&&"padding: 0px 0px 80px;"}
  }
  @media ${r.LAPTOP} {
    ${({type:t})=>t==="Chambers"&&"padding: 24px 40px 0;"}
    ${({type:t})=>t==="Money"&&"padding: 24px 40px 0;"}
    ${({type:t})=>t==="Discovery"&&"padding: 24px 40px 48px;      gap: 36px;    "}
    ${({type:t})=>t==="Chambers"&&"gap: 24px;"}
    ${({type:t})=>t==="Money"&&"gap: 24px;"}
  }
`,ut=c.div`
  ${({type:t})=>t==="Chambers"&&"width: 100%;"}
  ${({type:t})=>t==="Money"&&"width: 100%;"}

  @media ${r.LAPTOP_L} {
    ${({type:t})=>t==="Chambers"&&"width: 1224px;"};
    ${({type:t})=>t==="Money"&&"width: 1224px;"};
  }
  @media ${r.TABLET} {
    ${({type:t})=>t==="Chambers"&&"max-width: 920px;"};
    ${({type:t})=>t==="Money"&&"max-width: 100%;"};
  }
  @media (min-width: ${Q.TABLET_L+1}px) {
    ${({type:t})=>t==="Money"&&"max-width: 924px;"};
  }
`,lt=c.div`
  @media ${r.LAPTOP} {
    ${({type:t})=>t==="Chambers"&&"margin-right: 12px; min-width:100px"}
    ${({type:t})=>t==="Money"&&"margin-right: 12px; min-width: 100px; width:120px;"}
  }
`,D=c.div`
  ${t=>t.$isAppUiV2&&`
    display: none;
    
    @media ${r.LAPTOP} {
      display: block;
    }
  `}
`,Lt=n.memo(({type:t,rightContent:d,children:u,hideLeftMenu:O,subHeader:l,backgroundColor:U,onGoBack:j})=>{const S=nt(),$=it(),{user:y,isUnregistered:_,isUnauthenticated:V}=X(),{flags:m}=Y(),[F,k]=n.useState(""),[f,g]=n.useState(!0),[e,G]=n.useState(),I=n.useRef(!0);n.useEffect(()=>{const i=Z(M.SHOW_BANNER)===null;g(i)},[f]),n.useEffect(()=>{async function i(){var T,B,b,N,w,A;const{data:o}=await dt();if(I.current){const K=(B=(T=o==null?void 0:o.story)==null?void 0:T.content)==null?void 0:B.Description,q=(N=(b=o==null?void 0:o.story)==null?void 0:b.content)==null?void 0:N.ButtonText,z=(A=(w=o==null?void 0:o.story)==null?void 0:w.content)==null?void 0:A.ButtonLink;G({description:K,buttonText:q,buttonLink:z})}}i()},[]),n.useEffect(()=>{let i="/";E.some(o=>o.value.length>1&&$.pathname.includes(o.value)?(i=o.value,!0):!1),k(i)},[$.pathname]);const x=n.useCallback(i=>{k(i),S(i,{replace:!1})},[S]);return m.newAppNavigation?a(h.Layout,{onGoBack:j,topNavbar:V?null:_?a(C,{isBorderRadius:!1,"data-test":"MoneyLayout-Header",children:a(tt,{leftNavButton:!0,"data-test":"MoneyLayout-GuestHeader"})}):a(h.TopBar,{}),sideNav:a(h.SideNavigation,{}),children:a(h.MainContent,{children:s(L,{vertical:!0,align:"stretch",fullWidth:!0,style:{fontFamily:"var(--font-family)"},"data-test":"MoneyLayout-Stack",children:[l&&a(W,{"data-test":"MoneyLayout-SubHeader",children:l}),s(L,{vertical:!0,align:"stretch",gap:24,fullWidth:!0,"data-test":"MoneyLayout-Stack",children:[f&&(e==null?void 0:e.buttonText)&&s(R,{"data-test":"MoneyLayout-StyledBanner",children:[a(p,{font:"body-m",colorToken:"--text-campaign-banner-success-primary-default","data-test":"MoneyLayout-TSpan",children:e==null?void 0:e.description}),s("div",{className:"action-buttons",children:[a(H,{primary:!0,intent:"positive",onClick:()=>x(`/article?slug=articles/${e==null?void 0:e.buttonLink}`),"data-test":"MoneyLayout-Button",children:e==null?void 0:e.buttonText}),a(p,{font:"button-m",colorToken:"--text-button-success-secondary-default",onClick:()=>{g(!1),P(M.SHOW_BANNER,!1)},"data-test":"MoneyLayout-TSpan",children:"Dismiss"})]})]}),s(L,{gap:24,align:"start",justify:"stretch",fullWidth:!0,"data-test":"MoneyLayout-Stack",children:[a(at,{grow:!0,style:{overflow:m.newAppNavigation?"hidden":"unset"},"data-test":"MoneyLayout-StackItem",children:u}),!!d&&a(D,{"data-testid":"layout-right-content",$isAppUiV2:m.newAppNavigation,"data-test":"MoneyLayout-RightContent",children:a(v,{"data-test":"MoneyLayout-StickyContainer",children:d})})]})]})]})})}):s(rt,{"data-testid":"layout-container",backgroundColor:U,"data-test":"MoneyLayout-Container",children:[a(C,{isBorderRadius:!1,"data-test":"MoneyLayout-Header",children:a(et,{avatar:ot.getProfilePicture(y)||void 0,userName:(y==null?void 0:y.firstName)||void 0,"data-test":"MoneyLayout-MainHeader"})}),l&&a(W,{"data-test":"MoneyLayout-SubHeader",children:l}),f&&(e==null?void 0:e.buttonText)&&s(R,{"data-test":"MoneyLayout-StyledBanner",children:[a(p,{font:"body-m",colorToken:"--text-campaign-banner-success-primary-default","data-test":"MoneyLayout-TSpan",children:e==null?void 0:e.description}),s("div",{className:"action-buttons",children:[a(H,{primary:!0,intent:"positive",onClick:()=>x(`/article?slug=articles/${e==null?void 0:e.buttonLink}`),"data-test":"MoneyLayout-Button",children:e==null?void 0:e.buttonText}),a(p,{font:"button-m",colorToken:"--text-button-success-secondary-default",onClick:()=>{g(!1),P(M.SHOW_BANNER,!1)},"data-test":"MoneyLayout-TSpan",children:"Dismiss"})]})]}),s(ct,{"data-testid":"layout-main",type:t,"data-test":"MoneyLayout-Main",children:[!O&&a(lt,{"data-testid":"layout-left-content",type:t,"data-test":"MoneyLayout-LeftContent",children:a(v,{leftNav:!0,"data-test":"MoneyLayout-StickyContainer",children:a(st,{onNavChange:x,navItems:E,activeNavValue:F,"data-test":"MoneyLayout-SideNav"})})}),a(ut,{"data-testid":"layout-main-content",type:t,"data-test":"MoneyLayout-Content",children:u}),!!d&&a(D,{"data-testid":"layout-right-content","data-test":"MoneyLayout-RightContent",children:a(v,{"data-test":"MoneyLayout-StickyContainer",children:d})})]})]})});export{Lt as M};
//# sourceMappingURL=index-a497727f.js.map
