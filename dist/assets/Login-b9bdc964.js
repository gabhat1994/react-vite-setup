import{j as n,c as L,x as N,y as ce,E as de,S as k,B as V,s as $,z as me,u as ue,A as Z,D,G as R,R as H,T as _,d as pe,H as ee,J as he,F as fe,I as ge,v as be,f as ye,K as Se,L as xe}from"./index-cd84bcc9.js";import{r as t,ar as U,am as Le,an as Fe,ap as Te,aq as _e,C as v,a9 as ke,bc as ve,aB as Pe,B as w}from"./vendor-51460554.js";import{A as Ie}from"./index-a3ee8d79.js";import{i as J,P as Ee,g as Ce}from"./PhoneInput-94520e8e.js";import{O as Oe}from"./OtpInput-6d75f9c8.js";import{u as Be}from"./countDownTimer-549e0bbe.js";import{O as Ne}from"./index-c3d1598e.js";import"./storyblok-c16fb040.js";import"./styles-a68f1539.js";import"./Flag-d41fef47.js";import"./countries-4aa86a38.js";import"./styles-ba20ba6a.js";function we(){const[e]=t.useState((window==null?void 0:window.devicePixelRatio)??1);return{density:e}}const Ve=({recaptchaToken:e,loading:f,submitLoginData:s})=>{var c;const{t:i}=U(),[u,a]=t.useState(""),m=t.useMemo(()=>Le({email:Fe().email(i("noumena.signup.error.incorrect_email")).required(i("noumena.signup.error.field_cannot_be_empty"))}).required(),[i]),{register:g,handleSubmit:p,formState:{errors:b}}=Te({resolver:_e(m)}),l=t.useCallback(async y=>{s({type:"email",value:y.email.trim()})},[s]),o=t.useCallback(y=>{a(y.currentTarget.value)},[a]);return n("form",{onSubmit:p(l),"data-test":"EmailLoginForm",children:L(N,{vertical:!0,padding:"16px 0","data-test":"EmailLoginForm-Stack",children:[n(ce,{...g("email",{required:{value:!0,message:i("noumena.email_login_form.valid_email.field_empty")},pattern:{value:de,message:i("noumena.email_login_form.valid_email.error_message")},onChange:o}),value:u,label:i("noumena.email_login_form.email_address.label"),error:!!b.email,helperText:(c=b.email)==null?void 0:c.message,"data-testid":"testEmailLoginTextField","data-test":"EmailLoginForm-TextField"}),n(k,{height:29.5,"data-test":"EmailLoginForm-Spacer"}),n(V,{id:"email-login-btn",type:"submit",primary:!0,size:"full",loading:f,disabled:f||!e||u.trim()==="","data-test":"EmailLoginForm-Button",children:i("noumena.login_button.text")})]})})},Re=({recaptchaToken:e,loading:f,submitLoginData:s,errorMessage:i})=>{const{t:u}=U(),[a,m]=t.useState(""),[g,p]=t.useState(""),b=t.useCallback(c=>{m(c)},[m]),l=t.useCallback(()=>{if(p(""),!a){p(u("noumena.phone_login_form.valid_phone.field_empty"));return}if(a.includes("-")||!J(`+${a}`)){p(u("noumena.phone_login_form.valid_phone.error_message"));return}s({type:"phone",value:a.trim()})},[a,s,u]),o=t.useCallback(c=>{c.key==="Enter"&&l()},[l]);return t.useEffect(()=>{J(a)&&p(""),i&&p(i)},[a,p,i]),L(N,{vertical:!0,padding:"16px 0","data-test":"PhoneLoginForm-Stack",children:[n(Ee,{label:u("noumena.phone_login_form.phone.label"),error:!!g,helperText:g,onPhoneChange:b,onKeyPress:o,"data-testid":"testLoginPhoneInput","data-test":"PhoneLoginForm-PhoneInput"}),n(k,{height:29.5,"data-test":"PhoneLoginForm-Spacer"}),n(V,{id:"phone-login-btn",primary:!0,size:"full",onClick:l,loading:f,softDisabled:!e||a.trim()===""||f,testId:"testPhoneLoginButton","data-test":"PhoneLoginForm-Button",children:u("noumena.login_button.text")})]})};v.div`
  width: 100%;
  padding-top: 36px;
  padding-bottom: 16px;

  @media (max-width: ${$.MOBILE_L}) {
    padding-top: 28px;
    padding-bottom: 8px;
  }
`;const $e=v.div`
  font-family: var(--font-family);
  max-width: 343px;
  @media screen and (orientation: landscape) and (max-width: ${$.TABLET_L}) {
    margin-top: 150px;
  }
`,Ue=v(N)`
  width: 100%;
  margin-top: 15px;

  div span {
    cursor: pointer;
    color: var(--text-button-brand-secondary-default);
  }
`,Ae=v.div`
  /* position: absolute; */
  max-width: 20rem;
  margin-top: 10px;
  margin-bottom: 10px;
  bottom: 0%;
  width: 100%;
  text-align: center;
  color: var(--text-body-neutral-disabled);
  ${me}

  @media screen and (orientation: landscape) and (max-width: ${$.TABLET_L}) {
    position: relative;
    margin-top: 20px;
  }
  @media (max-height: 600px) {
    position: relative;
    margin-top: 150px;
  }
`,X=v.div`
  width: 100%;
  height: 100%;
  font-family: var(--font-family);
`,Ge=[{name:"test1",image:"terms_m",text:"Phone",labelSize:"large"},{name:"test1",image:"terms_m",text:"Email",labelSize:"large"}],Me=({loading:e,beforeSubmit:f,onLoginFailed:s,onLoginSuccess:i,errorMessage:u,clearInput:a})=>{const{t:m}=U(),g=ke(),{height:p}=ue(),{recaptchaToken:b,returnNewReCaptcha:l}=Z(),{isLoggingingUpFromNextApp:o,quickSignUpNoumId:c,backUrl:y}=D(),[F,B]=t.useState(1),P=t.useCallback(async x=>{if(!b)return;f(!1);const h=await l(),r=await(x.type==="phone"?R.signInPhone:R.signInEmail)(x.value,h);if(r!=null&&r.errorMessage){s(x.type,r.errorStatus,r.errorMessage);return}i(r.message,r.nextRequestAfterInSecond,r.remainingRequest,x,!1)},[b,f,l,i,s]),S=t.useCallback(()=>{g(o?`${H.QUICK_SIGN_UP}?quickNoumID=${c}&backurl=${y}`:H.SIGN_UP)},[o,g,c,y]);return L($e,{"data-testid":"loginFormContainer","data-test":"LoginForm-Screen",children:[L("div",{children:[p<600&&n(k,{height:100,"data-test":"LoginForm-Spacer"}),n(_,{font:"heading-xl-bold",colorToken:"--text-body-header-neutral-default","data-testid":"heading","data-test":"LoginForm-TSpan",children:m("noumena.login_in.heading")}),n(k,{height:11,"data-test":"LoginForm-Spacer"}),n(_,{font:"body-l",colorToken:"--text-body-neutral-default","data-test":"LoginForm-TSpan",children:m("noumena.phone_or_email.text")}),n(k,{height:31,"data-test":"LoginForm-Spacer"}),n(pe,{onChange:x=>{B(+x),a&&a()},inputList:Ge,selectedId:F.toString(),mode:"isUnderline",isWithoutImage:!0,fullWidth:!0,animateOnLoad:!1,"data-test":"LoginForm-BasicChipsTabsForm"}),F?n(X,{"data-test":"LoginForm-StyledTabPanel",children:n(Ve,{recaptchaToken:b,loading:e,submitLoginData:P,"data-test":"LoginForm-EmailLoginForm"})}):n(X,{"data-test":"LoginForm-StyledTabPanel",children:n(Re,{recaptchaToken:b,submitLoginData:P,loading:e,errorMessage:u,"data-test":"LoginForm-PhoneLoginForm"})}),L(Ue,{align:"center",justify:"center","data-test":"LoginForm-LinkContainer",children:[n(_,{colorToken:"--text-input-neutral-default",style:{paddingRight:"8px"},"data-test":"LoginForm-TSpan",children:m("noumena.no_account.text")}),n("div",{children:n(_,{font:"button-m",onClick:S,colorToken:"--text-button-brand-secondary-default","data-testid":"signUp","data-test":"LoginForm-TSpan",children:m("noumena.sign_up.title")})})]})]}),n(Ae,{"data-testid":"recaptcha","data-test":"LoginForm-RecaptchaNote",children:m("noumena.signup.foot_note")})]})},A=v.div`
  padding-top: 32px;

  @media (max-width: ${$.MOBILE_L}) {
    padding-top: 24px;
  }
`,qe=v(N)`
  width: 100%;
`,ze=({loginData:e,loading:f,isResendLoading:s,errorMsg:i,backStep:u,beforeSubmit:a,onVerifyFailed:m,onVerifySuccess:g,remainingRequests:p,timeLeftForNextResend:b=0})=>{const{t:l}=U(),[o,c]=t.useState(),[y]=Be(b),F=t.useCallback((h,I,r)=>!I||!I.value||!h||h.length!==4||r,[]),B=t.useCallback(async()=>{if(!o||!e||F(o,e,s))return;a();const h={...e,otp:o},r=await(h.type==="phone"?R.signInPhoneVerification:R.signInEmailVerification)(h.type==="phone"?h.value.replace(/\+/g,""):h.value,h.otp);if(r!=null&&r.errorMessage){m(r.errorStatus===102?ee.BLOCKED_IP:he(r)||r.errorMessage);return}g(r)},[a,F,s,e,m,g,o]),P=t.useCallback(()=>{c(void 0),u()},[u,c]),S=()=>{(o==null?void 0:o.trim().length)===4&&o.indexOf(" ")<0&&B()};t.useEffect(()=>{i!==""&&c("")},[i]);const x=f||s||p===3&&y!==0;return L(fe,{children:[n(_,{font:"body-l-bold",colorToken:"--text-body-neutral-default",$fill:!0,"data-test":"OTPVerifyForm-TSpan",children:l("noumena.login_in.heading")}),n(k,{height:16,"data-test":"OTPVerifyForm-Spacer"}),L(_,{font:"heading-m-bold",colorToken:"--text-body-header-neutral-default",$fill:!0,"data-test":"OTPVerifyForm-TSpan",children:[l("noumena.verification.text")," ",(e==null?void 0:e.type)==="email"&&l("noumena.otp_verify_form.email.text"),(e==null?void 0:e.type)==="phone"&&l("noumena.otp_verify_form.phone.text")]}),n(k,{height:16,"data-test":"OTPVerifyForm-Spacer"}),L("div",{children:[n(_,{font:"body-l",$fill:!0,colorToken:"--text-body-neutral-default","data-test":"OTPVerifyForm-TSpan",children:l("noumena.enter_otp_code.text")}),n("div",{}),L(_,{font:"body-l",$fill:!0,colorToken:"--text-body-neutral-highlighted","data-test":"OTPVerifyForm-TSpan",children:[" ",(e==null?void 0:e.type)==="email"&&(e==null?void 0:e.value),(e==null?void 0:e.type)==="phone"&&Ce(`+${e==null?void 0:e.value}`)]})]}),n(A,{"data-test":"OTPVerifyForm-StyledSpacer"}),n(Oe,{value:o,onChange:h=>c(h),isDisabled:s,onEnter:S,"data-test":"OTPVerifyForm-OtpInput"}),n(A,{"data-test":"OTPVerifyForm-StyledSpacer"}),L(qe,{"data-test":"OTPVerifyForm-FullWidthStack",children:[n(V,{"data-testid":"otp-back-button",icon:n(ge,{color:x?"--icon-button-neutral-disabled":"--icon-button-neutral-default",name:"arrow_left_m",size:24,"data-test":"OTPVerifyForm-Icon"}),style:{minWidth:"102px"},disabled:x,onClick:P,"data-test":"OTPVerifyForm-Button",children:l("noumena.back.text")}),n(k,{width:25,"data-test":"OTPVerifyForm-Spacer"}),n(V,{id:(e==null?void 0:e.type)==="phone"?"verify-phone-signin-next-btn":"verify-email-signin-next-btn","data-testid":"otp-submit-button",primary:!0,size:"full",disabled:F(o==null?void 0:o.trim(),e)||f,loading:f,onClick:B,"data-test":"OTPVerifyForm-Button",children:l("noumena.next.text")})]}),n(A,{"data-test":"OTPVerifyForm-StyledSpacer"})]})};var O=(e=>(e.LOGIN="LOGIN",e.VERIFY="VERIFY",e))(O||{});const We=v(N)`
  font-family: var(--font-family);
  width: 343px;
`,Ke=()=>{const[e]=ve(),{recaptchaToken:f}=Z(),{addToast:s}=be(),{density:i}=we(),{signIn:u}=ye(),{state:a}=Pe(),{setIsSigningUpFromNextApp:m,setQuickSignUpNoumID:g,setIsLoggingingUpFromNextApp:p,setBackUrl:b,isLoggingingUpFromNextApp:l,backUrl:o}=D();t.useEffect(()=>{const d=e.get("quickNoumID")??null,T=e.get("backurl")??"";d&&T?(m(!1),p(!0),g(d),b(T)):(m(!1),p(!1))},[e,p,m,g,b]);const[c,y]=t.useState(O.LOGIN),[F,B]=t.useState(),[P,S]=t.useState(!1),[x,h]=t.useState(""),[I,r]=t.useState(3),[G,M]=t.useState(!1),[te,q]=t.useState(),[z,W]=t.useState(0),K=t.useMemo(()=>{const d={};return e.forEach((T,E)=>{E.startsWith("utm_")&&(d[E]=T)}),d},[e]),ne=t.useMemo(()=>i>=2?"login2x":"login",[i]);t.useEffect(()=>()=>{S(!1)},[]),t.useEffect(()=>{a!=null&&a.fromPath&&Se(xe.GUEST_REDIRECT_TO_URI,a.fromPath)},[a==null?void 0:a.fromPath]);const j=t.useCallback((d=!1)=>{d?M(!0):S(!0)},[]),Y=t.useCallback((d,T,E)=>{let C=E;T===404?C=d==="phone"?w("noumena.phone_login_form.phone_number.not_exist_error"):w("noumena.email_login_form.email_address.not_exist_error"):T===102&&(C=ee.BLOCKED_IP),s("error","none",d==="email"?C:`${w("noumena.toast_error.text")}: ${C}`),q(C),S(!1)},[s]),Q=t.useCallback((d,T,E,C,le)=>{s("success","none",w("noumena.verification_code_sent.text")||d),E?(W(T),r(E)):(W(0),r(0)),le?M(!1):S(!1),B(C),y(O.VERIFY)},[s]),ae=t.useCallback(()=>{h(""),S(!0)},[]),oe=t.useCallback(d=>{h(d),s("error","none",`${d}`,void 0,400),S(!1)},[s]),re=t.useCallback(d=>{u({accessToken:d.token.accessToken,refreshToken:d.token.refreshToken},K)},[u,K]),se=t.useCallback(()=>{S(!1),q(""),h("")},[]),ie=t.useCallback(()=>{c===O.LOGIN?window.location.href=`../noums/${o}`:y(O.LOGIN)},[o,c]);return n(Ie,{type:ne,showBackButton:l,onBackClick:ie,"data-test":"Login-AuthScreenLayout",children:c===O.LOGIN?n(Me,{"data-testid":"testLoginForm",recaptchaToken:f,loading:P,beforeSubmit:j,onLoginFailed:Y,onLoginSuccess:Q,errorMessage:te,clearInput:se,"data-test":"Login-LoginForm"}):L(We,{vertical:!0,"data-test":"Login-Screen",children:[n(ze,{loginData:F,loading:P,errorMsg:x,backStep:()=>y(O.LOGIN),beforeSubmit:ae,onVerifyFailed:oe,onVerifySuccess:re,isResendLoading:G,remainingRequests:I,timeLeftForNextResend:z,"data-test":"Login-OTPVerifyForm"}),n(Ne,{loginData:F,remainingRequests:I,timeLeftForNextResend:z,beforeSubmit:j,onLoginFailed:Y,onLoginSuccess:Q,isResendLoading:G,"data-test":"Login-OTPResend"})]})})},ot=Ke;export{ot as default};
//# sourceMappingURL=Login-b9bdc964.js.map
