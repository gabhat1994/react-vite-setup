import{f as S,j as t,c as d,S as p,x as a,T as o,B as c,R as f}from"./index-cd84bcc9.js";import{C as s,a9 as m,ar as h}from"./vendor-51460554.js";import{A as P}from"./styles-dc2530dc.js";import{O as y}from"./OnboardingScreenLayout-687de002.js";import"./index-a3ee8d79.js";import"./storyblok-c16fb040.js";import"./styles-a68f1539.js";const x=s.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 360px;
`;s.div`
  width: 282px;
  margin-top: 24px;
`;const T=()=>{const{user:e,loading:r,currentUserLoading:g}=S(),u=m(),{t:n}=h(),l=()=>{e&&u(f.HOME)},i=r||g;return t(y,{"data-test":"SignupStepPending-OnboardingScreenLayout",children:t(P,{"data-testid":"SIGN_UP",className:"App","data-test":"SignupStepPending-AppStyled",children:d(x,{"data-testid":"stepPendingContainer","data-test":"SignupStepPending-PageStyled",children:[t(p,{height:138,"data-test":"SignupStepPending-Spacer"}),t(a,{fullWidth:!0,"data-test":"SignupStepPending-Stack",children:d(o,{colorToken:"--text-body-header-neutral-default",font:"heading-m-bold",$fill:!0,"data-test":"SignupStepPending-TSpan",children:[n("noumena.sign_up.step_pending.title"),", ",e==null?void 0:e.firstName,"!"]})}),t(a,{fullWidth:!0,"data-test":"SignupStepPending-Stack",children:t(o,{font:"body-l",$fill:!0,colorToken:"--text-body-neutral-default","data-test":"SignupStepPending-TSpan",children:n("noumena.register.step_pending.description")})}),t(p,{height:8,"data-test":"SignupStepPending-Spacer"}),t(a,{fullWidth:!0,"data-test":"SignupStepPending-Stack",children:t(c,{"data-testid":"stepPendingButton",primary:!0,size:"full",loading:i,disabled:i,onClick:l,"data-test":"SignupStepPending-Button",children:n("noumena.continue_to_noumena")})})]})})})},B=T;export{B as default};
//# sourceMappingURL=SignupPending-8788e28b.js.map
