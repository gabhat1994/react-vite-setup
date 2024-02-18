import{v as se,f as ne,A as ae,G as R,R as K,K as oe,L as ie,H as z,s as M,j as n,c as x,F as X,n as re,T as k,a3 as ce,B as de}from"./index-cd84bcc9.js";import{r as t,a9 as le,B as d,C as f}from"./vendor-51460554.js";import{O as ue}from"./OtpInput-6d75f9c8.js";import{O as fe}from"./index-c3d1598e.js";import"./styles-ba20ba6a.js";const me=()=>{const{addToast:o}=se(),{signIn:S,user:i,initialNoumId:p,loading:h}=ne(),[s,b]=t.useState(),[r,L]=t.useState(),[T,A]=t.useState(!1),[v,C]=t.useState(!1),[I,l]=t.useState(!1),[y,B]=t.useState(""),[q,F]=t.useState(3),[O,$]=t.useState(!1),[J,H]=t.useState(0),V=new URLSearchParams(window.location.search),u=V.get("token"),m=V.get("redirectUrl"),{recaptchaToken:E}=ae(),g=le(),[Q,W]=t.useState(!0),P=t.useCallback(async()=>{if(u){const e=await R.ottValidate(u);!e.errorMessage&&e.isValid?(W(!1),b({type:"email",value:e.email})):g(K.ACCESS_DENIED)}},[g,u]);t.useEffect(()=>{u&&(i!=null&&i._id?g(m?`../${m}`:"../"):P())},[P,u,i==null?void 0:i._id,g,m]),t.useEffect(()=>{const e=m||"";oe(ie.GUEST_REDIRECT_TO_URI,e)},[m]),t.useEffect(()=>{v&&!h&&i&&!p&&g(K.GUEST_HOME)},[i,p,g,h,v,m]),t.useEffect(()=>{const e=async()=>{!T&&E&&(s!=null&&s.value)&&await R.signInEmail(s==null?void 0:s.value,E)&&A(!0)};s!=null&&s.value&&E&&e()},[s==null?void 0:s.value,T,E]);const w=t.useCallback((e,c,a)=>!c||!c.value||!e||e.length!==4||a,[]),U=t.useCallback(()=>{B(""),l(!0)},[]),j=t.useCallback(e=>{B(e),o("error","none",e===z.BLOCKED_IP?e:`${d("noumena.toast_error.text")}: ${e}`),l(!1)},[o]),N=t.useCallback(e=>{S({accessToken:e.token.accessToken,refreshToken:e.token.refreshToken,noumId:e.noumId}),C(!0)},[S]),G=t.useCallback(async()=>{if(!r||!s||w(r,s,O))return;U();const e={...s,otp:r},c=R.signInEmailVerification,a=await c(e.value,e.otp,u??"");if(a!=null&&a.errorMessage){j(a.errorStatus===102?z.BLOCKED_IP:a.errorMessage);return}N(a)},[U,w,O,s,j,N,r,u]),Y=()=>{(r==null?void 0:r.trim().length)===4&&r.indexOf(" ")<0&&G()};t.useEffect(()=>{y!==""&&L("")},[y]);const Z=t.useCallback((e,c,a,_,te)=>{o("success","none",d("noumena.verification_code_sent.text")||e),a?(H(c),F(a)):(H(0),F(0)),te?$(!1):l(!1),b(_)},[o]),D=t.useCallback((e=!1)=>{e?$(!0):l(!0)},[]),ee=t.useCallback((e,c,a)=>{let _=a;c===404&&(_=d("noumena.email_login_form.email_address.not_exist_error")),o("error","none",`${d("noumena.toast_error.text")}: ${_}`),l(!1)},[o]);return{otp:r,setOtp:L,loading:I,isResendLoading:O,loginData:s,remainingRequests:q,timeLeftForNextResend:J,onEnter:Y,onLoginSuccess:Z,onBeforeLogin:D,onLoginFailed:ee,disabledSubmit:w,onVerify:G,loader:Q,ottEmail:s==null?void 0:s.value}},ge=f.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-body-neutral-alt-highlighted);
  height: 100vh;
`,pe=f.header`
  display: flex;
  justify-content: center;
  height: 72px;
  width: 100%;
  align-items: center;
  padding-left: 16px;
  background-color: var(--bg-top-nav-neutral-alt-default);
  margin-bottom: 72px;
  @media (min-width: ${M.TABLET_L}) {
    padding-left: 40px;
  }
  @media (max-width: ${M.MOBILE_MAX}) {
    margin-bottom: 0px;
  }
`,he=f.div`
  display: flex;
  width: 100%;
  max-width: 1408px;
`,xe=f.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 402px;
  min-height: 326px;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  background-color: var(--bg-card-neutral-alt-default);
  header {
    width: 100%;
    text-align: center;
    padding: 3px 0px 24px 0px;
  }
  @media (max-width: ${M.MOBILE_MAX}) {
    width: 90vw;
    height: 100%;
  }
`,Se=f.div`
  padding: 16px 0px 32px 0px;
`,be=f.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  padding-top: 85px;
`,Le=f.div`
  padding-top: 16px;
`,Te=()=>{const{otp:o,setOtp:S,loading:i,isResendLoading:p,loginData:h,remainingRequests:s,timeLeftForNextResend:b,onEnter:r,onLoginSuccess:L,onBeforeLogin:T,onLoginFailed:A,disabledSubmit:v,onVerify:C,loader:I,ottEmail:l}=me();return n(ge,{"data-testid":"t-nm-login","data-test":"Access-Container",children:I?x(X,{children:[n(re,{"data-test":"Access-Spinner"}),x(be,{"data-test":"Access-TextHead",children:[" ",n(k,{font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted","data-test":"Access-TSpan",children:d("noumena.non_member.login_loader_text")})]})]}):x(X,{children:[n(pe,{"data-test":"Access-Header",children:n(he,{"data-test":"Access-LogoContainer",children:n(ce,{"data-test":"Access-Logo"})})}),x(xe,{"data-test":"Access-Main",children:[x("div",{children:[n("header",{"data-test":"Access-header",children:n(k,{font:"heading-xs-bold",colorToken:"--text-modal-header-neutral-default","data-test":"Access-TSpan",children:d("noumena.non_member.verify_your_identity")})}),n(k,{font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"Access-TSpan",children:d("noumena.non_member.enter_code")}),n("div",{children:n(k,{font:"body-l",colorToken:"--text-modal-neutral-highlighted","data-test":"Access-TSpan",children:l})}),n(Se,{"data-test":"Access-ContainerOTP",children:n(ue,{value:o,onChange:y=>S(y),isDisabled:p,onEnter:r,"data-test":"Access-OtpInput"})}),n(fe,{minHeight:"0px",loginData:h,remainingRequests:s,timeLeftForNextResend:b,beforeSubmit:T,onLoginFailed:A,onLoginSuccess:L,isResendLoading:p,"data-test":"Access-OTPResend"})]}),n(Le,{"data-test":"Access-StyledSpacer"}),n(de,{"data-testid":"otp-submit-button",primary:!0,size:"full",disabled:v(o==null?void 0:o.trim(),h)||i,loading:i,onClick:C,"data-test":"Access-Button",children:d("noumena.continue")})]})]})})},Ae=Te;export{Ae as default};
//# sourceMappingURL=Access-1be4e985.js.map
