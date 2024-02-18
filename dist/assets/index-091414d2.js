import{D as l,j as t}from"./index-cd84bcc9.js";import{C as u,bc as g,r as p}from"./vendor-51460554.js";import{S as k}from"./index-d3ba6575.js";import{Q as S}from"./QuickSignUpScreenLayout-e2476265.js";import"./PhoneInput-94520e8e.js";import"./Flag-d41fef47.js";import"./countries-4aa86a38.js";import"./storyblok-c16fb040.js";import"./trackingEvents-87d8ea4c.js";import"./styles-5298610f.js";import"./email-9dc89e57.js";import"./styles-a68f1539.js";const U=u.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;u.div`
  align-self: center;
`;const C=()=>{const{setIsSigningUpFromNextApp:o,setQuickSignUpNoumID:r,setIsLoggingingUpFromNextApp:e,setBackUrl:c,backUrl:n}=l(),[i]=g();p.useEffect(()=>{o(!0),e(!1);const a=i.get("quickNoumID")??null,s=i.get("backurl")??"";a&&s&&(r(a),c(s))},[i,e,o,r,c]);const m=p.useCallback(()=>{window.location.href=`../noums/${n}`},[n]);return t(S,{onBackClick:m,"data-test":"QuickSignUp-QuickSignUpScreenLayout",children:t(U,{"data-test":"QuickSignUp-QuickSignUpBody",children:t(k,{"data-test":"QuickSignUp-SignUpForm"})})})};export{C as default};
//# sourceMappingURL=index-091414d2.js.map
