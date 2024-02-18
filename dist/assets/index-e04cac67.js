import{f8 as T,j as e,B as P,f9 as b,c as l,F as _,M as j,t as ee,h as ae,i as te,T as d,S as k,ac as ne,I as oe,k as le}from"./index-cd84bcc9.js";import{aa as se,B as o,C as g,r as u,aT as re}from"./vendor-51460554.js";import{c as q,u as W,d as $,b as de,S as J,C as ie,P as ue,a as ce}from"./index-ea5d695b.js";import{D as me,d as pe}from"./helper-53a5becb.js";const we=({closeRenewModal:N,chamber_id:s,noum_transaction_fee_id:a,launchFrom:h,itemType:c})=>{const{noumRenewalHelper:R}=q(),{refreshSubscriptions:m,payAsYouGoNoumRenewal:y}=W(),{id:M}=se(),p=()=>{let n={};return h===J.PLAN_DETAILS&&(c===b.Charge?n={plan_type:b.Charge}:n={subscription_id:Number(M)}),n},{refreshNoumData:w}=$(p()),{loading:r}=de({success:async n=>{await R({chamber_id:s,operation_type:T.Renewal,subscription_id:n==null?void 0:n.subscription_id,noum_transaction_fee_id:a})&&(m(),w(),N())}});return e(P,{size:"large",style:{width:"193px"},secondary:!0,disabled:r,onClick:async()=>{var n;if(y.length>0)await R({chamber_id:s,operation_type:T.Renewal,subscription_id:(n=y[0])==null?void 0:n.subscription_id,noum_transaction_fee_id:a})&&(m(),w(),N());else{const i=document.getElementById(ie.NOUM_RENEWAL_USD);i==null||i.click()}},"data-test":"PayFeesButton-Button",children:o("noumena.money.myplans.payfees")})},he=g.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 8px;
  background: var(--bg-card-neutral-alt-default);
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 16px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`,ye=g.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`,U=g.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 177px;
  height: 22px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`,fe=g.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  flex: none;
  order: 1;
  flex-grow: 1;
`,xe=g.div`
  width: 96px;
  height: 96px;
  flex: none;
  flex-grow: 0;
`,Se=u.memo(({open:N,onClose:s,chamber_id:a,launchFrom:h,noum_transaction_fee_id:c,noumExpiryDate:R,itemType:m})=>{var E,A,I,z,F,L,G,Y,H;const[y,M]=u.useState(!1),[p,w]=u.useState(!1),[r,C]=u.useState(!1),{totalNoumRenewalSlots:n,activeNoumRenewalSlots:i,oldestPlanNoumRenewal:t,refreshSubscriptions:v,payAsYouGoNoumRenewal:f,loading:K}=W(),Q=()=>{var x;let S={};return h===J.PLAN_DETAILS&&(m===b.Charge?S={plan_type:b.Charge}:S={subscription_id:(x=t[0])==null?void 0:x.subscription_id}),S},{refreshNoumData:B}=$(Q()),{noumRenewalHelper:D}=q();u.useEffect(()=>{f.length>0?(w(!0),C(!0)):n-i>0?w(!0):w(!1)},[i,f.length,n]);const V=u.useCallback(()=>{M(!0)},[]),X=u.useCallback(()=>{M(!1)},[]),Z=u.useCallback(async()=>{var x,O;await D({chamber_id:a==null?void 0:a._id,operation_type:T.Renewal,subscription_id:r?(x=f[f.length-1])==null?void 0:x.subscription_id:(O=t[0])==null?void 0:O.subscription_id,noum_transaction_fee_id:c})&&(v(),B(),s())},[D,a==null?void 0:a._id,r,f,t,c,v,B,s]);return l(_,{children:[e(j,{open:N,size:ee.M,enableCloseButton:!0,onClose:s,disableBackdropClick:!0,children:K?e("div",{style:{width:"100%"},"data-test":"RenewNoumModal",children:e(re,{count:4,borderRadius:16,height:75,"data-test":"RenewNoumModal-Skeleton"})}):l(_,{children:[e(ae,{children:p?o("noumena.money.myplans.renewnoum"):o("noumena.money.myplans.payasyougo")}),e(te,{align:"center",hideScrollbar:!0,children:p?l(_,{children:[e(d,{font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"RenewNoumModal-TSpan",children:r?o("noumena.money.myplans.renewnoum.pay_as_you_bodytext"):o("noumena.money.myplans.renewnoum.bodytext")}),e(k,{height:16,"data-test":"RenewNoumModal-Spacer"}),l(he,{"data-test":"RenewNoumModal-PlanInfo",children:[e(d,{font:"body-l-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"RenewNoumModal-TSpan",children:r?"Pay As You Go":(A=(E=t[0])==null?void 0:E.item_price_id)==null?void 0:A.split("-")[0]}),l(ye,{"data-test":"RenewNoumModal-PlanMetaData",children:[!r&&l(U,{"data-test":"RenewNoumModal-PlanDescription",children:[e(d,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"RenewNoumModal-TSpan",children:o("noumena.money.myplans.expire")}),e(d,{font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"RenewNoumModal-TSpan",children:me((I=t[0])==null?void 0:I.valid_till)})]}),l(fe,{"data-test":"RenewNoumModal-PlanRenewalBox",children:[e(ne,{percentage:r?0/1*100:((z=t[0])!=null&&z.active_count_noum_renewal?t[0].active_count_noum_renewal:0)/((F=t[0])!=null&&F.max_count_noum_renewal?t[0].max_count_noum_renewal:0)*100,color:((L=t[0])!=null&&L.active_count_noum_renewal?t[0].active_count_noum_renewal:0)/((G=t[0])!=null&&G.max_count_noum_renewal?t[0].max_count_noum_renewal:0)*100===0?"var(--bg-progressbar-neutral-default)":"var(--bg-progressbar-brand-primary-default)",barSize:3,circleSize:24,"data-test":"RenewNoumModal-CircleProgressBar"}),l(U,{"data-test":"RenewNoumModal-PlanDescription",children:[e(d,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"RenewNoumModal-TSpan",children:o("noumena.money.myplans.noumrenewal")}),e(d,{font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"RenewNoumModal-TSpan",children:r?"0 / 1":`${(Y=t[0])==null?void 0:Y.active_count_noum_renewal} /
                        ${(H=t[0])==null?void 0:H.max_count_noum_renewal}`})]})]})]})]}),e(k,{height:16,"data-test":"RenewNoumModal-Spacer"}),e(d,{font:"footnote",colorToken:"--text-input-neutral-default","data-test":"RenewNoumModal-TSpan",children:o("noumena.money.myplans.renewnoum.expirytext")}),e(d,{font:"body-m-bold",colorToken:"--text-input-neutral-filled","data-test":"RenewNoumModal-TSpan",children:pe(R)})]}):l(_,{children:[e(xe,{"data-test":"RenewNoumModal-ImageBox",children:e(oe,{name:"social_hall_m",size:96,color:"--icon-card-placeholder-neutral-default","data-test":"RenewNoumModal-Icon"})}),e(k,{height:16,"data-test":"RenewNoumModal-Spacer"}),e(d,{font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center",style:{width:"370px"},"data-test":"RenewNoumModal-TSpan",children:o("noumena.money.myplans.payasyougo.modaltext")})]})}),l(le,{gap:16,children:[p?e(P,{tertiary:!0,size:"large",style:{width:"193px"},onClick:()=>s(),"data-test":"RenewNoumModal-Button",children:o("noumena.money.myplans.cancel")}):e(we,{closeRenewModal:s,chamber_id:a==null?void 0:a._id,noum_transaction_fee_id:c,launchFrom:h,itemType:m,"data-test":"RenewNoumModal-PayFeesButton"}),p?e(P,{primary:!0,size:"large",style:{width:"193px"},onClick:()=>Z(),"data-test":"RenewNoumModal-Button",children:o("noumena.money.myplans.renewnoum")}):e(P,{primary:!0,size:"large",style:{width:"193px"},onClick:()=>{V()},"data-test":"RenewNoumModal-Button",children:o("noumena.money.myplans.addNewPlan")})]})]})}),y&&e(ue,{open:y,onClose:X,launchFrom:ce.NOUM_RENEWAL,chamber_id:a==null?void 0:a._id,noum_transaction_fee_id:c,launchScreen:h,itemType:m,closeNoumRenewModal:s,"data-test":"RenewNoumModal-PlanPurchaseModal"})]})});export{Se as R};
//# sourceMappingURL=index-e04cac67.js.map
