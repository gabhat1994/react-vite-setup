import{s as V,T as u,B as G,u as P,e as j,v as H,dC as z,f as W,qg as X,ci as g,R as $,j as r,c as q,x as K,b1 as J,y as Q}from"./index-cd84bcc9.js";import{C as s,r as t,a9 as Y,ar as Z}from"./vendor-51460554.js";import{i as S,a as O}from"./url-8d85408e.js";import{E as b}from"./trackingEvents-87d8ea4c.js";import{O as ee}from"./OnboardingScreenLayout-687de002.js";import{u as te}from"./useBlocker-0dcaf13c.js";import"./index-a3ee8d79.js";import"./storyblok-c16fb040.js";import"./styles-a68f1539.js";const oe=s(u)`
  background: var(--bg-tag-brand-secondary-default);
  width: 204px;
  height: 22px;
  padding: 4px 8px 4px 8px;
  border-radius: 8px;
  @media (max-width: ${V.MOBILE_L}) {
    margin-top: 16px;
  }
  margin-top: 68px;
`,L=s(u)`
  margin-top: 16px;
`,ae=s(u)`
  width: 100%;
`,ne=s(u)`
  width: 100%;
  margin-top: 8px;
`,re=s(G)`
  margin-top: 20px;
  width: 100%;
  margin-bottom: 20px;
`,ge=()=>{const{width:h}=P(),N=t.useMemo(()=>h<=j.MOBILE_MAX,[h]),[o,y]=t.useState(""),[n,D]=t.useState(),[R,c]=t.useState(!1),[C,_]=t.useState(!1),[f,A]=t.useState(!1),I=Y(),{addToast:x}=H(),[T,{loading:m}]=z(),{t:a}=Z(),{user:l,refetchUserData:E,currentUserLoading:M}=W(),[w]=X(),p=1e3,B=t.useRef(),k=t.useMemo(()=>({UUID:l==null?void 0:l._id}),[l]),d=t.useMemo(()=>!(n&&(n==null?void 0:n.length)>p||o&&!S(o)||!n&&!o),[o,n]);t.useEffect(()=>{const e=i=>{f||(i.preventDefault(),w())};return window.addEventListener("beforeunload",e),()=>{window.removeEventListener("beforeunload",e)}},[f,w]);const U=t.useCallback(e=>{B.current=e,e.retry()},[]);te(U,!f);const F=t.useCallback(()=>{var e;d&&(g(b.ONBOARDING.MORE_VERIFICATION.SUBMIT),A(!0),T({variables:{input:{additionalInfo:n||void 0,...o.length?{profile:{socialLinks:o?[{name:(e=O(o))!=null&&e.includes("www")?"www1":O(o),link:o}]:void 0}}:{}}}}).then(i=>{var v;(v=i==null?void 0:i.data)!=null&&v.updateUserProfile&&(E(),!m&&!M&&I($.SIGNUP_PENDING))}).catch(()=>{x("error","icon",`${a("noumena.onboarding_profile_update_error")}`)}))},[d,T,n,o,E,m,M,I,x,a]);return r(ee,{"data-test":"MoreInfo-OnboardingScreenLayout",children:q(K,{vertical:!0,align:"start",gap:8,maxWidth:344,"data-test":"MoreInfo-Stack",children:[r(oe,{colorToken:"--text-tag-brand-primary-default",font:"body-m-bold","data-test":"MoreInfo-HeadTag",children:a("noumena.onboarding.more_info_additional_verification")}),r(ae,{colorToken:"--text-body-header-neutral-default",font:N?"heading-s-bold":"heading-m-bold","data-test":"MoreInfo-Title",children:a("noumena.onboarding.more_info_title")}),r(ne,{colorToken:"--text-body-neutral-default",font:"body-l","data-test":"MoreInfo-Description",children:a("noumena.onboarding.more_info_description")}),r(L,{colorToken:"--text-tablecell-header-neutral-highlighted",font:"body-l-bold","data-test":"MoreInfo-FieldDescription",children:a("noumena.onboarding.more_info_answer_description")}),r(J,{showScroll:!0,label:a("noumena.onboarding.more_info_answer_label"),resize:!1,value:n,maxLength:p,maxHeight:300,onChange:e=>{D(e.target.value),e.target.value.length>p?_(!0):_(!1)},error:C,onFocus:()=>g(b.ONBOARDING.MORE_VERIFICATION.TELL_US_MORE,k),"data-test":"MoreInfo-TextArea"}),r(L,{colorToken:"--text-tablecell-header-neutral-highlighted",font:"body-l-bold","data-test":"MoreInfo-FieldDescription",children:a("noumena.onboarding.more_info_answer_link_description")}),r(Q,{helperText:a("noumena.onboarding.more_info_answer_link_helper_text"),placeholder:a("noumena.onboarding.more_info_answer_link_placeholder"),value:o,onChange:e=>{if(y(e.target.value),!e.target.value){c(!1);return}S(e.target.value)?c(!1):c(!0)},error:R,onFocus:()=>g(b.ONBOARDING.MORE_VERIFICATION.LINK,k),"data-test":"MoreInfo-TextField"}),r(re,{primary:d,testId:"submit_button",onClick:F,disabled:!d,loading:m,"data-test":"MoreInfo-ContinueButton",children:a("noumena.submit")})]})})};export{ge as MoreInfo,ge as default};
//# sourceMappingURL=index-02660f89.js.map
