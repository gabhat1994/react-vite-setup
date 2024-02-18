import{x as v,dJ as Q,dK as I,pB as Fe,G as se,H as be,J as ee,c as l,j as e,S as C,T as g,y as R,F as X,B as z,I as W,v as Pe,K as me,L as ue,b1 as ve,f as Le,pC as Re,D as Ae,ci as ge,pD as Ve,pE as Be,pF as Oe,pG as $e,R as oe,cZ as He,a3 as Ge,w as We,cV as ze}from"./index-cd84bcc9.js";import{C as F,r as c,an as L,B as r,am as Ce,ap as le,aq as xe,l as Me,bc as Ue,bb as $,ar as _e,cG as qe,a6 as he,a9 as De}from"./vendor-51460554.js";import{i as je}from"./url-8d85408e.js";import{a as Xe,I as ne,P as ie,F as Ke,A as Ze,b as Je}from"./styles-fbdb2d1d.js";import{S as Ye}from"./index-d3ba6575.js";import{A as Qe,S as Ie}from"./styles-dc2530dc.js";import{O as et}from"./OnboardingScreenLayout-687de002.js";import{E as q}from"./trackingEvents-87d8ea4c.js";import{i as tt}from"./email-9dc89e57.js";import"./PhoneInput-94520e8e.js";import"./Flag-d41fef47.js";import"./countries-4aa86a38.js";import"./storyblok-c16fb040.js";import"./styles-5298610f.js";import"./index-a3ee8d79.js";import"./styles-a68f1539.js";const at=F.div`
  width: 100%;
  min-height: 80vh;
`,rt=F.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  height: 24px;
  width: 100%;
  input[type='checkbox'] {
    appearance: none;
    background-color: ${t=>t.checked?"var(--bg-checkbox-brand-primary-default)":"transparent"};
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 24px;
    height: 24px;
    border: 0.15em solid
      ${t=>t.checked?"transparent":" var(--border-checkbox-neutral-default)"};
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
  }
  input[type='checkbox']::before {
    content: '';
    width: 16px;
    height: 16px;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 0.5em 0.5em var(--form-control-color);
    background-color: var(--bg-checkbox-neutral-alt-default);
  }
  input[type='checkbox']:checked::before {
    transform: scale(1);
    transform-origin: bottom left;
    clip-path: polygon(
      13.762px 4.202px,
      13.798px 5.262px,
      6.798px 12.762px,
      6.263px 13px,
      5.72px 12.78px,
      2.22px 9.28px,
      2.22px 8.22px,
      3.28px 8.22px,
      6.231px 11.171px,
      12.702px 4.238px,
      13.762px 4.202px
    );
  }
`,ot=F(v)`
  width: 100%;
`,nt=F.form`
  width: 100%;
`,it=({userInfo:t,onSetStep:s,onChangeUserInfo:a,hasRefCode:p})=>{const[m,o]=c.useState(!1),d=c.useMemo(()=>{const S={firstName:L().trim().required(r("noumena.input.not_empty")).max(20,r("noumena.signup.first_name.too_long")).min(2,r("noumena.signup.first_name.too_short")).test("Two letter name validation",r("noumena.signup.two_digit_first_name.incorrect"),n=>n&&n.length<=2?Q.test(n):!0).matches(I,r("noumena.signup.first_name.incorrect")),lastName:L().trim().required(r("noumena.input.not_empty")).max(20,r("noumena.signup.last_name.too_long")).min(2,r("noumena.signup.last_name.too_short")).test("Two letter name validation",r("noumena.signup.two_digit_last_name.incorrect"),n=>n&&n.length<=2?Q.test(n):!0).matches(I,r("noumena.signup.last_name.incorrect"))};return p&&(S.referralCode=L().trim().required(r("noumena.input.not_empty")).max(5,r("noumena.signup.referral_code.max_error")).min(4,r("noumena.signup.referral_code.min_error")).matches(Fe,r("noumena.signup.referral_code.incorrect"))),Ce({...S}).required()},[p]),{control:b,setError:w,setValue:x,trigger:k,handleSubmit:P,formState:{errors:u,isValid:h}}=le({resolver:xe(d),mode:"all",reValidateMode:"onBlur",defaultValues:{firstName:t==null?void 0:t.firstName,lastName:t==null?void 0:t.lastName,referralCode:t==null?void 0:t.referralCode}});c.useEffect(()=>{p?(x("referralCode",t==null?void 0:t.referralCode),k("referralCode")):(x("referralCode",""),k("referralCode"))},[p,x,k,t==null?void 0:t.referralCode]);const T=c.useCallback(async S=>{if(o(!0),S.referralCode){const n=await se.serviceValidateReferralCode(S.referralCode);if(!n.errorMessage&&(n!=null&&n.isValid)&&(n==null?void 0:n.countExceed)===!1){a({...t,...S}),o(!1),s(3);return}throw n.errorStatus===102?new Error(be.BLOCKED_IP):(w("referralCode",{type:"focus",message:ee(n)},{shouldFocus:!0}),o(!1),new Error(ee(n)))}else a({...t,...Me.omit(S,["referralCode"])}),o(!1),s(3)},[w,s,a,t]);return{control:b,errors:u,isValid:h,loading:m,onSubmit:P(T)}},st=({setStep:t,setUserInfo:s,userInfo:a})=>{const[p,m]=c.useState(!1),[o]=Ue(),b=(o.get("referral-code")||"").replace(/[^a-zA-Z0-9]/g,""),{control:w,errors:x,isValid:k,loading:P,onSubmit:u}=it({userInfo:a,onSetStep:t,onChangeUserInfo:s,hasRefCode:p});return c.useEffect(()=>{a!=null&&a.referralCode&&m(!!a.referralCode)},[a==null?void 0:a.referralCode]),l(at,{"data-testid":"stepTwoFormContainer","data-test":"SignUpForm-FormStyled",children:[e(C,{height:80,"data-test":"SignUpForm-Spacer"}),e(g,{font:"heading-xs-bold",$fill:!0,colorToken:"--text-body-neutral-default","data-test":"SignUpForm-TSpan",children:r("noumena.sign_up.title")}),e(C,{height:10,"data-test":"SignUpForm-Spacer"}),e(g,{font:"heading-xl-bold",$fill:!0,colorToken:"--text-body-header-neutral-default","data-test":"SignUpForm-TSpan",children:r("noumena.register.step2.sub_title")}),e(C,{height:15,"data-test":"SignUpForm-Spacer"}),e(nt,{onSubmit:u,"data-test":"SignUpForm-Form",children:l(v,{vertical:!0,padding:"16px 0","data-test":"SignUpForm-Stack",children:[e($,{control:w,render:({field:{onChange:h,value:T}})=>{var S;return e(R,{name:"firstName",value:T||"",label:r("noumena.first_name"),onChange:h,error:!!x.firstName,helperText:(S=x.firstName)==null?void 0:S.message,"data-test":"SignUpForm-TextField"})},name:"firstName","data-test":"SignUpForm-Controller"}),e(C,{height:30,"data-test":"SignUpForm-Spacer"}),e($,{control:w,render:({field:{onChange:h,value:T}})=>{var S;return e(R,{name:"lastName",value:T||"",label:r("noumena.last_name"),onChange:h,error:!!x.lastName,helperText:(S=x.lastName)==null?void 0:S.message,"data-test":"SignUpForm-TextField"})},name:"lastName","data-test":"SignUpForm-Controller"}),e(C,{height:11,"data-test":"SignUpForm-Spacer"}),e(g,{font:"body-l",$fill:!0,colorToken:"--text-body-neutral-default","data-test":"SignUpForm-TSpan",children:r("noumena.register.step2.description")}),e(C,{height:20,"data-test":"SignUpForm-Spacer"}),l(rt,{"data-testid":"stepTwoFormCheckbox",checked:p,"data-test":"SignUpForm-CheckboxStyle",children:[e("input",{checked:p,"data-testid":"stepTwoFormInput",type:"checkbox",onChange:h=>m(h.target.checked),disabled:!!(a!=null&&a.referralCode)&&(a==null?void 0:a.referralCode)===b}),e(g,{font:"body-l",$fill:!0,colorToken:"--text-body-neutral-default","data-test":"SignUpForm-TSpan",children:r("noumena.sign_up.referral_message")})]}),p&&l(X,{children:[e(C,{height:32,"data-test":"SignUpForm-Spacer"}),e($,{control:w,render:({field:{onChange:h,value:T}})=>{var S;return e(R,{"data-testid":"referralCode",name:"referralCode",value:T||"",label:r("noumena.referral_code"),onChange:h,error:!!x.referralCode,helperText:(S=x.referralCode)==null?void 0:S.message,disabled:!!(a!=null&&a.referralCode)&&(a==null?void 0:a.referralCode)===b,"data-test":"SignUpForm-TextField"})},name:"referralCode","data-test":"SignUpForm-Controller"})]}),e(C,{height:32,"data-test":"SignUpForm-Spacer"}),l(ot,{"data-test":"SignUpForm-FullWidthStack",children:[e(z,{"data-testid":"stepTwoBackButton",tertiary:!0,leftIcon:e(W,{color:"--icon-button-neutral-default",name:"arrow_left_m",size:16,"data-test":"SignUpForm-Icon"}),style:{minWidth:"100px"},onClick:()=>t(1),"data-test":"SignUpForm-Button",children:r("noumena.back.text")}),e(C,{width:16,"data-test":"SignUpForm-Spacer"}),e(z,{"data-testid":"stepTwoSubmitButton",type:"submit",primary:!0,size:"full",disabled:!k,loading:P,"data-test":"SignUpForm-Button",children:r("noumena.next.text")})]})]})})]})},lt=F(v)`
  font-family: var(--font-family);
  max-width: 400px;
  display: block;
`,dt=({setStep:t,setUserInfo:s,userInfo:a})=>e(lt,{"data-testid":"stepTwoContainer","data-test":"SignUpStepTwo-Screen",children:e(st,{setStep:t,setUserInfo:s,userInfo:a,"data-test":"SignUpStepTwo-SignUpForm"})}),ct=({setStep:t,userInfo:s,setUserInfo:a,setUserOutput:p})=>{var K;const{addToast:m}=Pe(),{t:o}=_e(),[d,b]=c.useState(!1),[w,x]=c.useState(!1),{control:k,register:P,setError:u,clearErrors:h,getValues:T,handleSubmit:S,formState:{errors:n}}=le({defaultValues:{additionalInfo:s==null?void 0:s.additionalInfo,profile:s==null?void 0:s.profile}}),y=(V,U)=>{je(V)?(U===0&&b(!0),h(`profile.socialLinks.${U}.link`)):u(`profile.socialLinks.${U}.link`,{type:"focus",message:o("noumena.input.incorrect")})},_=c.useCallback(async V=>{var O,M;x(!0);const U={...V};U.profile.socialLinks=(M=(O=U==null?void 0:U.profile)==null?void 0:O.socialLinks)==null?void 0:M.filter(({link:N})=>!!N).map(({link:N},G)=>({name:`url${G+1}`,link:N==null?void 0:N.toLowerCase()}));const B={...s,...U};a&&a(B);const E=await se.serviceSignup(B);E&&!E.errorMessage?(me(ue.ACCESS_TOKEN,E.token.accessToken),me(ue.REFRESH_TOKEN,E.token.refreshToken),p&&p(E.user),t(4),x(!1)):(m("error","none",E.errorStatus===102?be.BLOCKED_IP:`${o("noumena.toast_error.text")}: ${ee(E)}`),x(!1))},[m,t,a,p,o,s]),{fields:H,append:A,remove:te}=qe({control:k,name:"profile.socialLinks"});return l(Xe,{"data-testid":"stepThreeFormContainer","data-test":"SignUpForm-FormStyled",children:[e(C,{height:78,"data-test":"SignUpForm-Spacer"}),e(g,{font:"heading-xs-bold",$fill:!0,colorToken:"--text-body-neutral-default","data-test":"SignUpForm-TSpan",children:o("noumena.sign_up.title")}),e(C,{height:10,"data-test":"SignUpForm-Spacer"}),e(g,{font:"heading-xl-bold",$fill:!0,colorToken:"--text-body-header-neutral-default","data-test":"SignUpForm-TSpan",children:o("noumena.register.step3.sub_title")}),e(C,{height:11,"data-test":"SignUpForm-Spacer"}),e(g,{font:"body-l",$fill:!0,colorToken:"--text-body-neutral-default","data-test":"SignUpForm-TSpan",children:o("noumena.register.step3.description")}),e(v,{vertical:!0,padding:"16px 40px","data-test":"SignUpForm-Stack",children:e(g,{colorToken:"--text-body-neutral-highlighted",font:"body-l-bold","data-test":"SignUpForm-TSpan",children:o("noumena.register.step3.sub_title1")})}),l(ne,{"data-test":"SignUpForm-IconWrapper",children:[e(ie,{"data-test":"SignUpForm-Point"}),e(g,{font:"body-m",colorToken:"--text-body-neutral-default","data-test":"SignUpForm-TSpan",children:o("noumena.register.step3.info_item1")})]}),l(ne,{"data-test":"SignUpForm-IconWrapper",children:[e(ie,{"data-test":"SignUpForm-Point"}),e(g,{font:"body-m",colorToken:"--text-body-neutral-default","data-test":"SignUpForm-TSpan",children:o("noumena.register.step3.info_item2")})]}),l(ne,{"data-test":"SignUpForm-IconWrapper",children:[e(ie,{"data-test":"SignUpForm-Point"}),e(g,{font:"body-m",colorToken:"--text-body-neutral-default","data-test":"SignUpForm-TSpan",children:o("noumena.register.step3.info_item3")})]}),e(C,{height:15,"data-test":"SignUpForm-Spacer"}),e(Ke,{onSubmit:S(_),"data-test":"SignUpForm-Form",children:l(v,{vertical:!0,padding:"16px 0","data-test":"SignUpForm-Stack",children:[H.map((V,U)=>{var B,E,O,M,N,G,Z;return l(c.Fragment,{children:[e(R,{"data-testid":`urlfield${U}`,label:o("noumena.professional_profile_link"),...P(`profile.socialLinks.${U}.link`,{required:{value:!0,message:o("noumena.input.not_empty")},pattern:{value:/[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/i,message:o("noumena.input.incorrect")}}),onBlur:ae=>y(ae.target.value,U),rightIcon:U!==0?e(W,{color:"--icon-tablecell-neutral-highlighted",name:"delete_m",size:24,onClick:()=>te(U),"data-test":"SignUpForm-Icon"}):void 0,value:T(`profile.socialLinks.${U}.link`),error:!!((O=(E=(B=n==null?void 0:n.profile)==null?void 0:B.socialLinks)==null?void 0:E[U])!=null&&O.link),helperText:((Z=(G=(N=(M=n==null?void 0:n.profile)==null?void 0:M.socialLinks)==null?void 0:N[U])==null?void 0:G.link)==null?void 0:Z.message)||o("noumena.signup.socialLinks.example"),"data-test":"SignUpForm-TextField"}),e(C,{height:20,"data-test":"SignUpForm-Spacer"})]},V.id)}),H.length<3&&d&&l(X,{children:[" ",l(Ze,{onClick:()=>A({link:""}),"data-test":"SignUpForm-AddButtonStyle",children:[e(W,{color:"--icon-button-neutral-default",name:"add_m",size:24,"data-test":"SignUpForm-Icon"}),e(g,{colorToken:"--text-button-brand-primary-default",font:"button-m",$fill:!0,"data-test":"SignUpForm-TSpan",children:o("noumena.add_another_link")})]}),e(C,{height:16,"data-test":"SignUpForm-Spacer"})," "]}),e(ve,{label:o("noumena.sign_up.step3.textarea.label"),resize:!1,...P("additionalInfo",{maxLength:{value:2e3,message:o("noumena.input.not_exceed-2000")}}),value:T("additionalInfo"),error:!!(n!=null&&n.additionalInfo),helperText:(K=n==null?void 0:n.additionalInfo)==null?void 0:K.message,"data-test":"SignUpForm-TextArea"}),e(C,{height:32,"data-test":"SignUpForm-Spacer"}),l(Je,{"data-test":"SignUpForm-FullWidthStack",children:[e(z,{"data-testid":"stepThreeBackButton",tertiary:!0,leftIcon:e(W,{color:"--icon-button-neutral-default",name:"arrow_left_m",size:16,"data-test":"SignUpForm-Icon"}),style:{minWidth:"100px"},onClick:()=>t(2),"data-test":"SignUpForm-Button",children:o("noumena.back.text")}),e(C,{width:16,"data-test":"SignUpForm-Spacer"}),e(z,{"data-testid":"stepThreeSubmitButton",type:"submit",primary:!0,size:"full",disabled:!d,loading:w,"data-test":"SignUpForm-Button",children:o(d?"noumena.submit":"noumena.sign_up.step3.button.text")})]})]})})]})},pt=F(v)`
  font-family: var(--font-family);
  max-width: 400px;
  display: block;
`,mt=({setStep:t,userInfo:s,setUserInfo:a,setUserOutput:p})=>e(pt,{"data-testid":"stepThreeContainer","data-test":"SignUpStepThree-Screen",children:e(ct,{setStep:t,userInfo:s,setUserInfo:a,setUserOutput:p,"data-test":"SignUpStepThree-SignUpForm"})}),ut=F.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 12px;
  width: 360px;
`,gt=F.div`
  width: 282px;
  margin-top: 24px;
`,ht=({userInfo:t,userOutput:s})=>{const{signUp:a}=Le(),p=()=>{s&&a()},{t:m}=_e();return l(ut,{"data-testid":"stepFourContainer","data-test":"SignFour-PageStyled",children:[e(C,{height:138,"data-test":"SignFour-Spacer"}),l(g,{colorToken:"--text-body-header-neutral-default",font:"heading-l-bold",$fill:!0,"data-test":"SignFour-TSpan",children:[m("noumena.sign_up.success_page.title"),", ",t==null?void 0:t.firstName,"!"]}),e(g,{font:"body-l",$fill:!0,colorToken:"--text-body-neutral-default","data-test":"SignFour-TSpan",children:m("noumena.register.success_page.sub_title")}),e(g,{font:"body-l",$fill:!0,colorToken:"--text-body-neutral-default","data-test":"SignFour-TSpan",children:m("noumena.register.success_page.description")}),e(gt,{"data-test":"SignFour-ButtonContainer",children:e(z,{"data-testid":"stepFourButton",primary:!0,size:"full",onClick:p,"data-test":"SignFour-Button",children:m("noumena.continue_to_noumena")})})]})},St=F(v).attrs({align:"center",justify:"start",fullWidth:!0,vertical:!0})`
  position: relative;
  height: 100%;
`,ft=F.div`
  position: absolute;
  top: 0;
  left: 0;
`,Ft=F(v).attrs({vertical:!0,align:"center",justify:"center",gap:16})``,bt=F(v).attrs({vertical:!0,align:"center",gap:12})`
  width: 450px;
  box-sizing: border-box;
  padding: 24px;
`,Ct=F(v).attrs({vertical:!0,gap:8})`
  width: 240px;
`,D=F(g).attrs({font:"footnote"})`
  ${({successful:t})=>t&&he`
      color: var(--text-button-success-secondary-default);
    `}
  ${({successful:t})=>!t&&he`
      color: var(--text-body-neutral-default);
    `};

  display: inline-flex;
  align-items: center;
`,xt=F(W)`
  margin-right: 4px;
`,Ut=F.div`
  position: relative;
  width: 100%;
`,_t=F.div`
  position: absolute;
  z-index: 2;
  background: while;
  top: -120%;
  right: -75%;
  padding: 12px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: -15px;
    transform: translateY(-50%);
    border-style: solid;
    border-width: 8px;
    border-color: transparent white transparent transparent;
  }
`,wt=F(v).attrs({vertical:!0,fullWidth:!0,gap:12})`
  margin-bottom: 12px;
`,Se=F(g).attrs({font:"body-m",colorToken:"--text-card-header-neutral-highlighted"})`
  cursor: pointer;
`,kt=F(g).attrs({font:"heading-m-bold",colorToken:"--text-modal-header-neutral-default"})``,Tt=F(g).attrs({font:"body-l",colorToken:"--text-card-header-neutral-default"})``,yt=F(g).attrs({font:"body-m",colorToken:"--text-card-header-neutral-default"})``,fe=F(g).attrs({font:"body-m",colorToken:"--text-card-header-neutral-disabled"})``,Et=({userInfo:t})=>{const s={firstName:L().trim().required(r("noumena.input.complete_field")).max(20,r("noumena.signup.first_name.too_long")).min(2,r("noumena.signup.first_name.too_short")).test("Two letter name validation",r("noumena.signup.two_digit_first_name.incorrect"),u=>u&&u.length<=2?Q.test(u):!0).matches(I,r("noumena.signup.first_name.incorrect")),lastName:L().trim().required(r("noumena.input.complete_field")).max(20,r("noumena.signup.last_name.too_long")).min(2,r("noumena.signup.last_name.too_short")).test("Two letter name validation",r("noumena.signup.two_digit_last_name.incorrect"),u=>u&&u.length<=2?Q.test(u):!0).matches(I,r("noumena.signup.last_name.incorrect")),email:L().trim().email(r("noumena.signup.error.incorrect_email")).required(r("noumena.input.complete_field")).test("validateEmail",r("noumena.signup.error.incorrect_email"),u=>tt(u||"")),password:L().trim().required(r("noumena.input.complete_field")).matches(Re),referralCode:L().trim().when("referralCode",u=>u!=null&&u.length?L().test("validateReferralCode",r("noumena.signup.referral_code.incorrect"),h=>!!(h&&h.trim().length===h.length)).min(4,r("noumena.signup.referral_code.min_error")).max(5,r("noumena.signup.referral_code.max_error")).matches(Fe,r("noumena.signup.referral_code.incorrect")):L().notRequired())},a=Ce().shape(s,[["referralCode","referralCode"],["phone","phone"]]).required(),{control:p,handleSubmit:m,getValues:o,reset:d,setError:b,clearErrors:w,watch:x,formState:{errors:k,isValid:P}}=le({resolver:xe(a),mode:"all",reValidateMode:"onBlur",defaultValues:{email:(t==null?void 0:t.email)||"",firstName:(t==null?void 0:t.firstName)||"",lastName:(t==null?void 0:t.lastName)||"",referralCode:(t==null?void 0:t.referralCode)||"",password:""}});return{control:p,errors:k,isValid:P,getValues:o,handleSubmit:m,reset:d,setError:b,clearErrors:w,watch:x}},Nt=()=>({hasLowerCaseCharacter:!1,hasNumber:!1,hasSixCharacters:!1,hasSpecialCharacter:!1,hasUpperCaseCharacter:!1}),Pt=()=>{const t=De(),[s]=Ue(),{userInfo:a,recaptchaToken:p,setUserInfo:m,showBlockedErrorMsg:o,signUpEmail:d,isSigningUpFromNextApp:b}=Ae(),{control:w,errors:x,isValid:k,handleSubmit:P,setError:u,clearErrors:h,watch:T}=Et({userInfo:a}),[S,n]=c.useState(!1),[y,_]=c.useState(!1),[H,A]=c.useState(!1),[te,K]=c.useState(Nt()),V=c.useRef(!0),[U,B]=c.useState(!1),{serviceValidateReferralCode:E,validateContact:O}=se,N=(s.get("referral-code")||"").replace(/[^a-zA-Z0-9]/g,""),G=c.useMemo(()=>{const f={};return s.forEach((i,re)=>{re.startsWith("utm_")&&(f[re]=i)}),f},[s]),Z=c.useCallback(f=>{let i="";switch(f.target.name){case"email":i=q.ONBOARDING.INITIAL_SIGNUP_SCREEN.EMAIL;break;case"firstName":i=q.ONBOARDING.INITIAL_SIGNUP_SCREEN.FIRST_NAME;break;case"lastName":i=q.ONBOARDING.INITIAL_SIGNUP_SCREEN.LAST_NAME;break;case"referralCode":i=q.ONBOARDING.INITIAL_SIGNUP_SCREEN.REFERRAL_CODE;break}ge(i)},[]),ae=()=>_(f=>!f),we=c.useCallback(f=>{const i=f.target.value;K({hasSixCharacters:i.length>=6,hasNumber:Ve.test(i),hasSpecialCharacter:Be.test(i),hasLowerCaseCharacter:Oe.test(i),hasUpperCaseCharacter:$e.test(i)})},[]),ke=()=>A(f=>!f),Te=c.useCallback(()=>{t(oe.LOGIN)},[t]),ye=c.useCallback(()=>{window.open(He.TERMS_OF_USE,"_blank")},[]),Ee=!!(T("password")||"").length&&H,J=c.useCallback((f,i)=>{u(f,{type:"focus",message:ee(i)},{shouldFocus:!0})},[u]),Y=c.useCallback(async f=>{const i=await E(f);return!(i!=null&&i.errorMessage)&&(i!=null&&i.isValid)&&!(i!=null&&i.countExceed)?(h("referralCode"),"valid"):((i==null?void 0:i.errorStatus)===102&&o(),J("referralCode",i),"invalid")},[h,E,J,o]),de=c.useCallback(async f=>{const i=await O("email",f);return i&&!(i!=null&&i.errorMessage)?(h("email"),"available"):((i==null?void 0:i.errorStatus)===102&&o(),J("email",i),"not-available")},[h,J,o,O]),ce=c.useCallback(async()=>{await Y(N)==="valid"&&B(!0)},[Y,N]),Ne=c.useCallback(async f=>{if(n(!0),f.referralCode&&await Y(f.referralCode)==="invalid"){n(!1);return}if(await de(f.email)==="not-available"){n(!1);return}m(pe=>({...pe,...f})),ge(q.ONBOARDING.INITIAL_SIGNUP_SCREEN.SUBMIT,{Email:a==null?void 0:a.email,Phone:a==null?void 0:a.phone,FirstName:a==null?void 0:a.firstName,LastName:a==null?void 0:a.lastName,DateOfBirth:a==null?void 0:a.dob,ReferralCode:a==null?void 0:a.referralCode,...G}),await d(f.email)&&(b?t(oe.SIGN_UP_OTP):t(oe.SIGN_UP_OTP,{replace:!0}))},[de,Y,b,t,m,d,a,G]);return c.useEffect(()=>(N&&V.current&&ce(),()=>{V.current=!1}),[ce,N]),{loading:S,recaptchaToken:p,isValidReferral:U,navigateTo:{login:Te,termsOfUse:ye},form:{control:w,errors:x,isValid:k,setError:u,clearErrors:h,handleFocus:Z,handleSubmit:P(Ne)},password:{toggleVisibility:ae,showPassword:y,analyzePassword:we,passwordErrorStates:te,showHelper:Ee,togglePasswordFiledFocus:ke}}},j=()=>e(X,{children:e(xt,{name:"check_xs",size:16,color:"--icon-button-success-secondary-default","data-test":"CheckIcon-CheckIconStyled"})}),vt=({passwordStates:t})=>{const s=Object.values(t).some(b=>!b),{hasLowerCaseCharacter:a,hasNumber:p,hasSixCharacters:m,hasSpecialCharacter:o,hasUpperCaseCharacter:d}=t;return l(X,{children:[l(g,{font:"footnote",colorToken:"--text-body-neutral-default","data-test":"PasswordHelper-TSpan",children:["Password strength:"," ",e(g,{font:"footnote",colorToken:s?"--bg-button-danger-primary-default":"--text-button-success-secondary-default","data-test":"PasswordHelper-TSpan",children:s?"Weak":"Strong"})]}),e(C,{height:16,"data-test":"PasswordHelper-Spacer"}),l(Ct,{"data-test":"PasswordHelper-PasswordHelperWrapper",children:[l(D,{successful:m,"data-test":"PasswordHelper-PasswordCheck",children:[m&&e(j,{"data-test":"PasswordHelper-CheckIcon"}),r("noumena.password.hint.six.characters")]}),l(D,{successful:a,"data-test":"PasswordHelper-PasswordCheck",children:[a&&e(j,{"data-test":"PasswordHelper-CheckIcon"}),r("noumena.password.hint.lowercase.character")]}),l(D,{successful:d,"data-test":"PasswordHelper-PasswordCheck",children:[d&&e(j,{"data-test":"PasswordHelper-CheckIcon"}),r("noumena.password.hint.uppercase.character")]}),l(D,{successful:o,"data-test":"PasswordHelper-PasswordCheck",children:[o&&e(j,{"data-test":"PasswordHelper-CheckIcon"}),r("noumena.password.hint.special.character")]}),l(D,{successful:p,"data-test":"PasswordHelper-PasswordCheck",children:[p&&e(j,{"data-test":"PasswordHelper-CheckIcon"}),r("noumena.password.hint.one.number")]})]})]})},Lt=({name:t,label:s,...a})=>e(z,{leftIcon:e(W,{name:t,size:24,"data-test":"SocialAuthentication-Icon"}),size:"full",...a,"data-test":"SocialAuthentication-Button",children:s}),Rt=()=>{const{form:t,password:s,recaptchaToken:a,loading:p,navigateTo:m}=Pt(),{control:o,errors:d,handleFocus:b,handleSubmit:w,isValid:x}=t,{showPassword:k,toggleVisibility:P,analyzePassword:u,passwordErrorStates:h,showHelper:T,togglePasswordFiledFocus:S}=s;return l(St,{children:[e(ft,{children:e(Ge,{"data-test":"SignUpFormV2-Logo"})}),l(Ft,{children:[e(kt,{children:r("noumena.sign_up.title")}),e(Tt,{children:r("noumena.sign_up.subtitle")})]}),e("form",{onSubmit:w,children:l(bt,{children:[e(wt,{children:e(Lt,{name:"google_logo",label:r("noumena.signup.continue.with.google"),"data-test":"SignUpFormV2-SocialAuthentication"})}),e(g,{font:"body-m",colorToken:"--text-card-neutral-disabled","data-test":"SignUpFormV2-TSpan",children:"Or"}),l(v,{gap:12,"data-test":"SignUpFormV2-Stack",children:[e($,{control:o,render:({field:{onChange:n,value:y}})=>{var _;return e(R,{name:"firstName",value:y||"",label:r("noumena.first_name"),error:!!d.firstName,onChange:n,helperText:(_=d.firstName)==null?void 0:_.message,"data-testid":"firstNameInput",onFocus:b,"data-test":"SignUpFormV2-TextField"})},name:"firstName","data-test":"SignUpFormV2-Controller"}),e($,{control:o,render:({field:{onChange:n,value:y}})=>{var _;return e(R,{name:"lastName",value:y||"",label:r("noumena.last_name"),error:!!d.lastName,onChange:n,helperText:(_=d.lastName)==null?void 0:_.message,"data-testid":"lastNameInput",onFocus:b,"data-test":"SignUpFormV2-TextField"})},name:"lastName","data-test":"SignUpFormV2-Controller"})]}),e($,{control:o,render:({field:{onChange:n,value:y}})=>{var _;return e(R,{name:"email",value:y||"",label:r("noumena.email_address"),error:!!d.email,onChange:n,helperText:(_=d.email)==null?void 0:_.message,"data-testid":"emailInput",onFocus:b,"data-test":"SignUpFormV2-TextField"})},name:"email","data-test":"SignUpFormV2-Controller"}),e($,{control:o,render:({field:{onChange:n,value:y}})=>{var _,H;return l(Ut,{children:[e(R,{name:"password",type:k?"text":"password",value:y||"",label:r("noumena.password"),error:((_=d.password)==null?void 0:_.type)==="required"?!!d.password:void 0,onChange:A=>{u(A),n(A)},helperText:((H=d.password)==null?void 0:H.type)==="required"?d.password.message:void 0,"data-testid":"passwordInput",onFocus:A=>{S(),b(A)},onBlur:S,rightIcon:e(W,{name:k?"eye_off_m":"eye_on_m",size:24,onClick:P,"data-test":"SignUpFormV2-Icon"}),"data-test":"SignUpFormV2-TextField"}),T&&e(_t,{children:e(vt,{passwordStates:h,"data-test":"SignUpFormV2-PasswordHelper"})})]})},name:"password","data-test":"SignUpFormV2-Controller"}),e($,{control:o,render:({field:{onChange:n,value:y}})=>{var _;return e(R,{name:"referralCode",value:y||"",label:r("noumena.referral_code.optional"),error:!!d.referralCode,onChange:n,helperText:d.referralCode?(_=d.referralCode)==null?void 0:_.message:r("noumena.referral_code.helper"),"data-testid":"referralCodeInput",onFocus:b,style:{color:"gray"},"data-test":"SignUpFormV2-TextField"})},name:"referralCode","data-test":"SignUpFormV2-Controller"}),l(X,{children:[e(C,{height:8,"data-test":"SignUpFormV2-Spacer"}),e(z,{primary:!0,size:"full",type:"submit",disabled:!a||!x||p,loading:p,"data-testid":"submitBtn","data-test":"SignUpFormV2-Button",children:r("noumena.signup.title.v2")})]}),l(yt,{children:[r("noumena.signup.login.v2"),e(Se,{onClick:m.login,children:"Log in"})]})]})}),l(fe,{children:[r("noumena.signup.term.and.condition.v2"),e(Se,{onClick:m.termsOfUse,children:"Terms of Use"})]}),e(C,{height:16,"data-test":"SignUpFormV2-Spacer"}),e(fe,{children:r("noumena.signup.google.privacy.policy.v2")})]})},Jt=()=>{const[t,s]=c.useState(1),[a,p]=c.useState(),{flags:{newSignUp:m}}=We(),[o,d]=c.useState({email:"",firstName:"",lastName:"",profile:{socialLinks:[]}}),b=()=>{switch(t){case 1:return m?e(Rt,{"data-test":"SignUp-getSignUpForm-SignUpFormV2"}):e(Ye,{"data-test":"SignUp-getSignUpForm-SignUpForm"});case 2:return e(dt,{setUserInfo:d,userInfo:o,setStep:s,"data-test":"SignUp-getSignUpForm-StepTwo"});case 3:return e(mt,{setStep:s,setUserInfo:d,userInfo:o,setUserOutput:p,"data-test":"SignUp-getSignUpForm-StepThree"});case 4:return e(ht,{userInfo:o,userOutput:a,"data-test":"SignUp-getSignUpForm-StepFour"});default:return""}};return e(et,{"data-test":"SignUp-OnboardingScreenLayout",children:l(Qe,{"data-testid":"SIGN_UP",className:"App",fullWidth:m,"data-test":"SignUp-AppStyled",children:[t<3&&!m&&e(Ie,{"data-test":"SignUp-StyledStep",children:e(ze,{primary:!0,size:"medium","data-test":"SignUp-Chips",children:r("noumena.sign_up.stepper",{currentStep:t,allSteps:2})})}),b()]})})};export{Jt as default};
//# sourceMappingURL=index-4c12812c.js.map