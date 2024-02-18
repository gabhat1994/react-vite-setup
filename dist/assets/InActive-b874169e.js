import{x as S,T as s,u as g,f as m,aK as u,j as e,c as h,S as c,s as y,aL as A,F as b}from"./index-cd84bcc9.js";import{C as r,r as f,f as T,B as o}from"./vendor-51460554.js";import{A as I}from"./index-a3ee8d79.js";import"./storyblok-c16fb040.js";import"./styles-a68f1539.js";const x=r.div`
  font-family: var(--font-family);
  display: flex;
`,w=r(S)`
  font-family: var(--font-family);
  max-width: 343px;
`,j=r(s)`
  line-height: var(--font-otp-xlarge-lineheight);
  margin: 0;
`,E=r(s)`
  margin: 0;
  font-size: 16px;
  line-height: var(--font-body-small-lineheight);
`,k=parseInt(y.TABLET,10)||768,p=["click","mousemove","load","scroll","keydown","wheel","beforeunload"],L=a=>{const d=g(),{userStatus:n,handleLogout:i}=a,{user:t}=m(),v=f.useMemo(()=>d.width<k,[d.width]);return f.useEffect(()=>((t==null?void 0:t.userStatus)===u.Rejected&&(T(new Error(`user: ${t}, file: "InActive.tsx"`),{tags:{section:"Tracking Logout"}}),p.forEach(l=>{window.addEventListener(l,i,!1)})),()=>{p.forEach(l=>{window.removeEventListener(l,i,!1)})}),[t,t==null?void 0:t.userStatus,i]),n!==u.Rejected?null:e(I,{type:"onboarding","data-test":"InActive-AuthScreenLayout",children:e(x,{"data-test":"InActive-Wrapper",children:h(w,{vertical:!0,"data-testid":"rejectedContainer","data-test":"InActive-RejectedWrapper",children:[e(j,{"data-testid":"inActiveTitle",colorToken:"--text-body-header-neutral-default",font:v?"heading-s-bold":"heading-m-bold","data-test":"InActive-StyledTitle",children:o("noumena.signup.rejected_title",{name:(t==null?void 0:t.firstName)||""})}),e(c,{height:16,"data-test":"InActive-Spacer"}),e(E,{"data-testid":"inActiveSubTitle",colorToken:"--text-body-neutral-default","data-test":"InActive-StyledSubTitle",children:o("noumena.signup.rejected_subTitle")}),e(c,{height:32,"data-test":"InActive-Spacer"}),e(s,{colorToken:"--text-body-neutral-default",font:"body-m","data-test":"InActive-TSpan",children:o("noumena.signup.rejected_description")}),e(c,{height:32,"data-test":"InActive-Spacer"}),h(s,{colorToken:"--text-body-neutral-default",font:"body-m","data-test":"InActive-TSpan",children:[o("noumena.thanks"),","]}),e(c,{height:32,"data-test":"InActive-Spacer"}),e(s,{colorToken:"--text-body-neutral-default",font:"body-m","data-test":"InActive-TSpan",children:o("noumena.team")})]})})})},R=r.div`
  font-family: var(--font-family);
  background-color: var(--bg-body-neutral-alt-highlighted);
  display: flex;
  height: 100vh;
`,W=()=>{const{user:a,signOut:d}=m(),n=a!=null&&a.metadata&&a.metadata.length>0?a.metadata[a.metadata.length-1]:null,i=(n==null?void 0:n.reason)??"",t=(n==null?void 0:n.moreInfo)??"";return e(R,{"data-testid":"inActive","data-test":"InActiveScreen-AppStyled",children:(a==null?void 0:a.userStatus)===A.Rejected?e(L,{userStatus:"REJECTED",statusReason:i,description:t,handleLogout:d,"data-test":"InActiveScreen-InActive"}):e(b,{})})},M=W;export{M as default};
//# sourceMappingURL=InActive-b874169e.js.map
