import{s as c,x as r,u as M,w as $,c as o,j as t,a3 as _,B as j,I as E,e as G,G as R}from"./index-cd84bcc9.js";import{C as g,r as i,bc as z}from"./vendor-51460554.js";import{d as H}from"./storyblok-c16fb040.js";import{M as P,B as T}from"./styles-a68f1539.js";const V="/assets/login-bg-49de7fe8.png",W="/assets/login-bg-2x-6c4a7e38.png",D="/assets/signup-bg-8f2eafaf.png",U="/assets/register-bg-5938ec42.png",O="/assets/initial_signup_bg-ca7bf9eb.png",X=g(r)`
  background-color: var(--bg-body-neutral-alt-default);
  height: 100vh;
  @media (max-width: ${c.MOBILE_L}) {
    height: 85vh;
    ${e=>e.dynamicHeight&&"height: unset"}
  }
  ${e=>e.dynamicHeight&&"height: unset"}
  ${({dynamicWidth:e})=>!e&&"width: 100vw;"}
`,Z=g(r)`
  flex: 1;
  padding: 40px;
  max-height: 100vh;
  max-width: 100vw;
  height: 100%;
  @media (max-width: ${c.MOBILE_L}) {
    padding: 16px;
    height: 100vh;
  }
`,q=g.div`
  flex: 1;
  height: 100vh;
  width: 100%;
  background: ${e=>`url(${e.background}) center center no-repeat`};
  background-size: cover;

  @media (max-width: ${c.TABLET_L}) {
    display: none;
  }
`,m={width:"100%",display:"flex",alignItems:"center",justifyContent:"center",height:"100%"},F={login:V,login2x:W,signup:D,confirm:U,onboarding:O},te=({type:e,children:p,dynamicHeight:y,dynamicWidth:b,overflow:S,showBackButton:L=!1,onBackClick:B})=>{const{height:x,width:w}=M(),d=w<G.TABLET,k=x<600&&e!=="onboarding"?{...m,minHeight:"500px"}:m,a=i.useRef(!0),[A,v]=i.useState(),[I]=z(),n=(I.get("referral-code")||"").replace(/[^a-zA-Z0-9]/g,""),{flags:{newSignUp:u}}=$();return i.useEffect(()=>{async function C(){var h,f;const l=await R.serviceValidateReferralCode(n);if(!!(!l.errorMessage&&l.isValid)&&(a!=null&&a.current))try{const{data:s}=await H(n);v((f=(h=s==null?void 0:s.story)==null?void 0:h.content)==null?void 0:f.Image)}catch{}}return n&&C(),()=>{a.current=!1}},[n]),o(X,{dynamicHeight:y,dynamicWidth:b,"data-test":"AuthScreenLayout-Root",children:[o(Z,{vertical:!0,overflow:S,"data-test":"AuthScreenLayout-MainContainer",children:[o(r,{justify:d?"space-between":void 0,fullWidth:d,"data-test":"AuthScreenLayout-Stack",children:[!u&&t(_,{"data-test":"AuthScreenLayout-Logo"}),t(P,{"data-test":"AuthScreenLayout-MobileHelpButton"})]}),L&&t(T,{"data-test":"AuthScreenLayout-ButtonWrapper",children:t(j,{size:"small",tertiary:!0,leftIcon:t(E,{name:"arrow_left_m",size:22,"data-test":"AuthScreenLayout-Icon"}),onClick:B,"data-test":"AuthScreenLayout-Button",children:"Back"})}),t(r,{justify:"center",align:"center",style:k,"data-test":"AuthScreenLayout-Stack",children:p})]}),!u&&t(q,{background:A||F[e],"data-test":"AuthScreenLayout-SideImage"})]})};export{te as A};
//# sourceMappingURL=index-a3ee8d79.js.map
