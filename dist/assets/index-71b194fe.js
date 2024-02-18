import{T as n,B as l,u as p,e as b,f as m,ci as _,j as t,c as h,x as f}from"./index-cd84bcc9.js";import{C as o,r as c,ar as T,a9 as A,ay as g}from"./vendor-51460554.js";import{E as y}from"./trackingEvents-87d8ea4c.js";import{O as U}from"./OnboardingScreenLayout-687de002.js";import"./index-a3ee8d79.js";import"./storyblok-c16fb040.js";import"./styles-a68f1539.js";const x=o(n)`
  width: 100%;
`,r=o(n)`
  width: 100%;
`,E=o(l)`
  margin-top: 20px;
  width: 100%;
`,N=()=>{const{width:s}=p(),d=c.useMemo(()=>s<=b.MOBILE_MAX,[s]),{t:a}=T(),i=A(),{user:e}=m(),u=c.useCallback(()=>{_(y.ONBOARDING.MORE_VERIFICATION.CONTINUE_APPROVED_USER,{UUID:e==null?void 0:e._id}),i("/")},[i,e]);return t(U,{"data-test":"AcceptedUser-OnboardingScreenLayout",children:h(f,{vertical:!0,align:"start",gap:16,maxWidth:344,"data-test":"AcceptedUser-Stack",children:[t(x,{colorToken:"--text-body-header-neutral-default",font:d?"heading-s-bold":"heading-m-bold","data-test":"AcceptedUser-Title",children:a("noumena.onboarding.account_is_activated_title")}),t(r,{colorToken:"--text-body-neutral-default",font:"body-l","data-test":"AcceptedUser-Description",children:t(g,{i18nKey:"noumena.onboarding.account_is_activated_description_1",components:{b:t(n,{font:"body-l-bold",colorToken:"--text-body-neutral-default",$fill:!0,"data-test":"AcceptedUser-TSpan"})},"data-test":"AcceptedUser-Trans"})}),t(r,{colorToken:"--text-body-neutral-default",font:"body-l","data-test":"AcceptedUser-Description",children:a("noumena.onboarding.account_is_activated_description_2")}),t(E,{primary:!0,testId:"continue_button",onClick:u,"data-test":"AcceptedUser-ContinueButton",children:a("noumena.onboarding.account_is_activated_continue_button")})]})})};export{N as AcceptedUser,N as default};
//# sourceMappingURL=index-71b194fe.js.map
