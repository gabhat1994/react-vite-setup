import{m as T,ae as I,aa as P,X as j,c as p,j as n,I as _,T as g,ab as C,v as $,a7 as i,B as w,F as k,f9 as D}from"./index-cd84bcc9.js";import{C as o,r as a,B as r,aB as O,a9 as R,aT as W}from"./vendor-51460554.js";import{S as M,f as N,d as F}from"./index-ea5d695b.js";import{e as y,D as q}from"./helper-53a5becb.js";import{m as G}from"./main-wallet-6d7dbd11.js";import{T as X}from"./index-1f4ed9fc.js";import{R as H}from"./index-e04cac67.js";import{P as V}from"./Modal-5a254f40.js";const xe=o(I)`
  padding: ${e=>e.isSmallScreen?"16px":"24px"};
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media (max-width: ${T.MOBILE_XL_MAX}) {
    border-radius: 0px;
  }
  @media (max-width: ${T.TABLET_MAX}) {
    gap: 16px;
  }
`,ue=o(I)`
  width: 496px;
  //   height: 300px;
  display: flex;
  padding: 24px;
  flex-direction: column;
  gap: 24px;
  @media (max-width: ${T.TABLET_MAX}) {
    display: none;
  }
`,me=o.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  gap: 16px;
  flex: none;
  align-self: stretch;
  box-sizing: border-box;
  flex-grow: 0;
  width: auto;
  height: 40px;
  box-sizing: border-box;
`,fe=o.div`
  display: flex;
  flex-direction: ${e=>e.isMobile?"column":"row"};
  align-items: flex-start;
  box-sizing: border-box;
  padding: 0px;
  gap: 16px;
  flex: none;
  align-self: stretch;
  width: 100%;
  height: auto;
`,he=o.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  gap: 16px;
  box-sizing: border-box;
  width: ${({width:e})=>e};
  height: auto;
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 16px;
  flex: none;
  flex-grow: 1;
  background: #ffffff;
`,ge=o.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: auto;
  height: auto;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`,ye=o.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 16px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  width: auto;
  height: ${({height:e})=>e||"100%"};
  border-radius: 16px;
  border: 1px solid var(--border-card-neutral-highlighted);
  background: #ffffff;
`,be=o.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  width: auto;
  height: 24px;
`,we=o.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  flex: none;
  flex-grow: 0;
  width: ${({width:e})=>e||"auto"};
  height: ${({height:e})=>e};
`,Ne=o.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: auto;
  height: 41px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`,ve=o.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  flex: none;
  flex-grow: 1;
  width: ${e=>e.isMobile?"100%":"auto"};
  height: 100%;
`,Te=o.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 128px;
  height: 41px;
  flex: none;
  flex-grow: 0;
`,_e=o.div`
  padding-top: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  flex: none;
  flex-grow: 0;
  height: 19px;
`,Ce=o.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  flex: none;
  flex-grow: 0;
  width: 128px;
  height: 41px;
`,J=o.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: auto;
  height: ${e=>e.height?e.height:"30px"};
  box-sizing: border-box;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  justify-content: space-between;
`,K=o.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: auto;
  height: 30px;
  box-sizing: border-box;
  margin: auto;
`,Q=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: auto;
  height: 134px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`,U=o.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 12px;
  width: auto;
  height: 75px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  border-radius: 16px;
  border: 1px solid var(--border-card-neutral-highlighted);
`,Y=o.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`,Z=o.div`
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`,ee=o.img`
  height: 40px;
  width: 40px;
  ${({isExpired:e})=>e&&"filter: grayscale(100%); -webkit-filter: grayscale(100%); opacity:0.4;"}
`,te=o.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  flex: none;
  flex-grow: 1;
  width: ${e=>e.width?e.width:"277px"};
  height: auto;
`,B=o.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  height: 19px;
  flex: none;
  flex-grow: 0;
`,Me=o.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  height: 19px;
  flex: none;
  flex-grow: 0;
`,Se=o.div`
  display: flex;
  flex-direction: column;
`,Ee=o.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`,oe=a.memo(({iconColor:e,textColor:c,expiryDate:u,daysLeft:l,isGracePeriod:s,isExpired:m,showClockIcon:f})=>{const h=P(),{isMobile:x}=j();return p(B,{"data-test":"TextGenerator-ExpiryDateSection",children:[f&&!s&&n(_,{name:"time_m",size:18,color:e,"data-test":"TextGenerator-Icon"}),f&&s&&n(X,{top:33,left:x?-53:10,iconColor:e,"data-test":"TextGenerator-Tooltip",children:n("div",{style:{width:x?"300px":"345px"},children:n(g,{colorToken:"--text-tooltip-neutral-alt-default",font:"footnote","data-test":"TextGenerator-TSpan",children:r("noumena.money.subscription.noum.grace.period.tooltip.text")})})}),n(g,{font:"footnote",colorToken:c,"data-test":"TextGenerator-TSpan",children:s?"Grace period":m?r("noumena.money.myplans.expired"):r("noumena.money.myplans.expires")}),!s&&n(g,{font:"footnote-bold",colorToken:c,"data-test":"TextGenerator-TSpan",children:u}),(l<30&&l>0||s)&&h!==C.MOBILE&&p(g,{font:"footnote-bold",colorToken:c,"data-test":"TextGenerator-TSpan",children:["(",Math.abs(s?Math.abs(l)-10:l)," ","days left)"]})]})}),ne=a.memo(e=>{var x,b,d;const[c,u]=a.useState(!1),{addToast:l}=$(),s=P(),m=a.useCallback(()=>{u(!0)},[]),f=a.useCallback(()=>{u(!1)},[]),h=a.useCallback(()=>{e.launchFrom===M.PLAN_DETAILS&&(e.subscriptionStatus===N.INACTIVE||e.subscriptionStatus===N.CANCELLED)?l("error","none",`${r("noumena.toast_error.text")}: ${r("noumena.money.myplans.createNoum.expiredSubscription")}`):e.status===i.Suspended?l("error","none",`${r("noumena.toast_error.text")}: ${r("noumena.money.myplans.createNoum.suspenededNoum")}`):m()},[l,e.launchFrom,e.status,e.subscriptionStatus,m]);return p(U,{"data-test":"NoumCard-NoumCardWrapper",children:[n(Z,{"data-test":"NoumCard-ProfileWarpper",children:n(ee,{src:((x=e==null?void 0:e.chamber_id)==null?void 0:x.profileImage)===null?G:(b=e==null?void 0:e.chamber_id)==null?void 0:b.profileImage,alt:"profile",isExpired:e.status===i.Archived,"data-test":"NoumCard-Profile"})}),p(te,{width:s===C.MOBILE?"158px":s===C.TABLET?"500px":void 0,"data-test":"NoumCard-NoumMetaData",children:[n(g,{font:"body-l-bold",colorToken:e.status===i.Archived?"--text-card-header-neutral-default":"--text-card-header-neutral-highlighted","data-test":"NoumCard-TSpan",children:(d=e==null?void 0:e.chamber_id)==null?void 0:d.name}),n(B,{"data-test":"NoumCard-ExpiryDateSection",children:n(oe,{isExpired:e.status===i.Archived||e.status===i.Suspended,daysLeft:Number(y(e==null?void 0:e.valid_till)),isGracePeriod:e.status===i.Delinquent,expiryDate:q(e==null?void 0:e.valid_till),showClockIcon:e.status===i.Archived||e.status===i.Delinquent||e.status===i.Suspended||Number(y(e==null?void 0:e.valid_till))<31&&Number(y(e==null?void 0:e.valid_till))>0,iconColor:e.status===i.Archived?"--icon-card-danger-primary-default":e.status===i.Delinquent?"--icon-card-brand-primary-default":"--icon-card-neutral-highlighted",textColor:e.status===i.Delinquent?"--text-card-brand-primary-default":e.status===i.Archived?"--text-card-danger-primary-default":Number(y(e==null?void 0:e.valid_till))<30?"--text-card-header-neutral-highlighted":"--text-card-header-neutral-default","data-test":"NoumCard-TextGenerator"})})]}),e.status===i.Archived||e.status===i.Delinquent||Number(y(e==null?void 0:e.valid_till))<30?n(w,{size:"small",primary:!0,style:{width:"75px"},onClick:()=>h(),"data-test":"NoumCard-Button",children:r("noumena.money.myplans.renew")}):n(w,{size:"small",secondary:!0,style:{width:"75px"},onClick:()=>h(),"data-test":"NoumCard-Button",children:r("noumena.money.myplans.renew")}),c&&n(H,{open:c,onClose:()=>f(),chamber_id:e==null?void 0:e.chamber_id,launchFrom:e.launchFrom,itemType:e.itemType,noum_transaction_fee_id:e.noum_transaction_fee_id,noumExpiryDate:e==null?void 0:e.valid_till,"data-test":"NoumCard-RenewNoumModal"})]})}),Ae=a.memo(({launchFrom:e,subscription_id:c,itemType:u,subscriptionStatus:l})=>{const[s,m]=a.useState(!1),{addToast:f}=$(),{pathname:h}=O(),x=R(),b=()=>{let t={};return e===M.PLAN_DETAILS&&(u===D.Charge?t={plan_type:D.Charge}:t={subscription_id:c}),t},{noumData:d,loading:v}=F(b()),S=a.useCallback(()=>{m(!0)},[]),L=a.useCallback(()=>{m(!1)},[]),E=a.useCallback(()=>{e===M.PLAN_DETAILS&&(l===N.INACTIVE||l===N.CANCELLED)?f("error","none",`${r("noumena.toast_error.text")}: ${r("noumena.money.myplans.createNoum.expiredSubscription")}`):S()},[f,e,S,l]),z=a.useCallback(t=>{x(`/noum/${t}/edit`,{state:{prevPath:h}})},[x,h]);return p(k,{children:[p(J,{height:d.length>0?"40px":void 0,"data-test":"MyNoums-NoumHeader",children:[p(g,{font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted","data-test":"MyNoums-TSpan",children:[" ",r("noumena.money.myplans.mynoums")]}),d.length>0&&n(w,{size:"small",tertiary:!0,leftIcon:n(_,{name:"add_m",color:"--icon-button-neutral-default",size:24,"data-test":"MyNoums-Icon"}),style:{width:"172px"},onClick:()=>E(),"data-test":"MyNoums-Button",children:r("noumena.money.myplans.addnewnoum")})]}),v&&n(k,{children:n("div",{style:{width:"100%"},children:n(W,{count:4,borderRadius:16,height:75,"data-test":"MyNoums-Skeleton"})})}),d.length<=0&&!v&&p(Q,{"data-test":"MyNoums-EmptyNoumData",children:[n(_,{name:"social_hall_m",size:96,color:"--bg-card-neutral-alt-default","data-test":"MyNoums-Icon"}),n(g,{font:"body-m",colorToken:"--text-placeholder-neutral-default","data-test":"MyNoums-TSpan",children:r("noumena.money.myplans.nonoumdata")})]}),d.length>0&&n(Y,{"data-test":"MyNoums-NoumWrapper",children:d.map(t=>{var A;return n(ne,{uid:t==null?void 0:t.uid,noum_transaction_fee_id:t==null?void 0:t.noum_transaction_fee_id,chamber_id:t==null?void 0:t.chamber_id,valid_till:t==null?void 0:t.valid_till,status:t==null?void 0:t.status,per_item_fee:t==null?void 0:t.per_item_fee,percent_fee:t==null?void 0:t.percent_fee,launchFrom:e,itemType:u,subscriptionStatus:l,"data-test":"MyNoums-NoumCard"},((A=t==null?void 0:t.chamber_id)==null?void 0:A._id)||"")})}),d.length<=0&&!v&&p(K,{"data-test":"MyNoums-NoumFooter",children:[" ",n(w,{size:"small",secondary:!0,style:{width:"178px"},onClick:()=>E(),"data-test":"MyNoums-Button",children:r("noumena.money.myplans.addFirstNoum")})]}),s&&n(V,{isOpen:s,handleClose:()=>L(),handleSuccess:z,"data-test":"MyNoums-ProjectCreate"})]})});export{ge as A,Me as E,Ae as M,he as P,ue as S,we as T,ye as a,ve as b,be as c,Ne as d,Te as e,Ce as f,_e as g,Se as h,Ee as i,fe as j,xe as k,me as l};
//# sourceMappingURL=MyNoums-ef4fc27c.js.map
