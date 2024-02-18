import{v as q,qi as mt,qj as pt,qk as ht,e as L,ae as yt,I,ql as gt,c as i,T as u,j as t,aQ as U,bb as G,n as ft,M as at,t as nt,h as lt,i as ot,k as rt,B as R,S as v,F as k,jo as Ct,qm as bt,f9 as P,ac as xt,Y as Pt,qn as Tt,am as _t,R as St}from"./index-cd84bcc9.js";import{r as g,f as j,C as h,L as st,N as it,B as m,aT as S,aa as dt,a9 as kt}from"./vendor-51460554.js";import"./helper-53a5becb.js";import{e as F,B as M,d as wt,f as Q,S as Y}from"./index-ea5d695b.js";import{M as Bt}from"./index-a497727f.js";import{M as V}from"./MyNoums-ef4fc27c.js";import{D as Nt}from"./styles-329bb842.js";import"./index-1f4ed9fc.js";import"./styles-46bbc451.js";import"./sideNavItems-22800105.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./storyblok-c16fb040.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./styles-3ceda759.js";import"./main-wallet-6d7dbd11.js";import"./index-e04cac67.js";const Dt=e=>{const{addToast:o}=q(),[a,s]=g.useState({}),[n,{loading:d}]=mt({fetchPolicy:"network-only",onCompleted:({getSubscriptionById:r})=>s(C=>({...C,subscription:r})),onError:r=>{o("error","none",`${r.message}`),j(r,{tags:{section:"useMySubscriptionPlanDetailsLazyQuery"}})}}),[l]=pt({fetchPolicy:"network-only",onCompleted:({getAvailableSubscriptions:r})=>{const _=r.filter(T=>T.plan_type===F.CHARGE).reduce((T,w)=>{const{max_count_noum_setup:B,max_count_noum_renewal:N,active_count_noum_renewal:D,active_count_noum_setup:E}=T,{max_count_noum_setup:A,max_count_noum_renewal:W,active_count_noum_renewal:z,active_count_noum_setup:$}=w;return{...T,...w,active_count_noum_setup:typeof E=="number"&&typeof $=="number"?E+$:0,active_count_noum_renewal:typeof D=="number"&&typeof z=="number"?D+z:0,max_count_noum_setup:typeof B=="number"&&typeof A=="number"?B+A:0,max_count_noum_renewal:typeof N=="number"&&typeof W=="number"?N+W:0}},{max_count_noum_setup:0,max_count_noum_renewal:0,active_count_noum_renewal:0,active_count_noum_setup:0});s(T=>({...T,subscription:_}))},onError:r=>{o("error","none",`${r.message}`),j(r,{tags:{section:"useMySubscriptionsLazyQuery"}})}}),[p,{loading:b}]=ht({fetchPolicy:"network-only",onCompleted:({getInvoices:r})=>{if(Number.isNaN(Number(e))){const C=r.filter(_=>_.plan_type===F.CHARGE);s(_=>({..._,invoices:C}));return}s(C=>({...C,invoices:r}))},onError:r=>{o("error","none",`${r.message}`),j(r,{tags:{section:"useMytInvoicesLazyQuery"}})}}),y=d||b,f=g.useCallback(()=>{Promise.all([n({variables:{subscription_id:Number(e)}}),p({variables:{input:{subscription_id:Number(e)}}})])},[p,n,e]),x=g.useCallback(()=>{Promise.all([l(),p()])},[p,l]),c=g.useCallback(()=>{if(Number.isNaN(Number(e))){x();return}f()},[x,f,e]);return g.useEffect(()=>{if(Number.isNaN(Number(e))){x();return}f()},[x,f,e]),{subscriptionData:a,loading:y,refetch:c}},vt=h.div`
  width: 1129px;
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 24px;
  @media only screen and (max-width: ${L.TABLET_L}px) {
    display: none;
  }
`,Mt=h.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;
  @media only screen and (min-width: ${L.TABLET_L}px) {
    display: none;
  }
`,Lt=h.div`
  width: 784px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`,Ht=h.div`
  width: 321px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`,H=h(yt)`
  width: 100%;
  flex: 1 auto;
  padding: 24px;
`,ct=h.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;h(I)`
  cursor: pointer;
`;const It=h.div`
  width: 100%;
  display: flex;
  align-items: ${({alignStart:e})=>e?"start":"center"};
  justify-content: space-between;
  margin-top: 24px;
  @media only screen and (max-width: ${L.MOBILE_XL}px) {
    flex-direction: column;
    gap: 16px;
  }
`,Et=h.div`
  width: 252.5px;
  height: 120px;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid var(--border-card-neutral-default);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  @media only screen and (max-width: ${L.MOBILE_XL}px) {
    width: 100%;
    justify-content: start;
    gap: 16px;
  }
`,At=h.div`
  width: 120px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`,X=h.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  @media only screen and (max-width: ${L.MOBILE_XL}px) {
    width: 100%;
  }
`,Wt=h.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
`,zt=h.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`,$t=h.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`,jt=h.div`
  display: flex;
  gap: 4px;
`,Rt=h.div`
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: pointer;
`,Ot=h.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`,qt=h.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  height: 65px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`;h.img`
  width: 24px;
  height: 24px;
  border-radius: 6px;
`;const Ft=h.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`,Qt=h.div`
  margin-left: 350px;
  display: flex;
  align-items: center;
	@media only screen and (max-width: ${L.TABLET_L}px) {
		margin-left: 2%;

`,Ut=h.div`
  position: relative;
  margin-right: 12px;
`,Gt=h.div`
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 65px;
`,ut=g.memo(({issueDate:e,planName:o,amountPaid:a,externalInvoiceId:s,planType:n})=>{const{addToast:d}=q(),[l,{loading:p}]=gt({fetchPolicy:"network-only",onCompleted:({getInvoiceDownloadURL:c})=>{if(!c)return;const r=document.createElement("a");r.href=c,r.click(),r.remove()},onError:c=>{d("error","none",`${c.message}`),j(c,{tags:{section:"useInvoiceDownloadUrlLazyQuery"}})}}),b=()=>{!s||p||l({variables:{invoice_id:s}})},y=c=>{const r=c==null?void 0:c.split(" ");return r?`${r[0]} (${r[2]})`:m("noumena.moneny.subscription.name.failed")},f=c=>{const r=c==null?void 0:c.split(" ");return r?`${r[0]} ${r[1]}`:m("noumena.moneny.subscription.name.failed")},x=n===F.CHARGE?f(o):y(o);return i(zt,{"data-test":"BillingCard-BillingCardWrapper",children:[i($t,{"data-test":"BillingCard-BillingWrapper",children:[i(u,{font:"body-m-bold",colorToken:"--text/tablecell-header-neutral-highlighted","data-test":"BillingCard-TSpan",children:["Plan: ",x]}),i(jt,{"data-test":"BillingCard-BillingDetails",children:[a||a===0?t(u,{font:"footnote",colorToken:"--text-tablecell-body-neutral-default","data-test":"BillingCard-TSpan",children:U(a/100,G.Usd,2)}):null,t(u,{font:"footnote",colorToken:"--text-tablecell-body-neutral-default","data-test":"BillingCard-TSpan",children:"·"}),e&&st(e)?t(u,{font:"footnote",colorToken:"--text-body-neutral-disabled","data-test":"BillingCard-TSpan",children:it(e,"dd MMM yyyy")}):null]})]}),i(Rt,{onClick:b,"data-test":"BillingCard-InvoiceButton",children:[p?t(Ut,{"data-test":"BillingCard-SpinnerWrapper",children:t(ft,{color:"var(--icon-button-brand-primary-default)","data-test":"BillingCard-Spinner"})}):t(I,{name:"download_m",size:26,color:"--icon-button-brand-primary-default","data-test":"BillingCard-Icon"}),t(u,{font:"button-m",colorToken:"--text-button-brand-primary-default","data-test":"BillingCard-TSpan",children:m("noumena.subscription.invoice.text")})]})]})}),Yt=g.memo(({open:e,onClose:o,invoices:a})=>i(at,{open:e,size:nt.L,enableCloseButton:!0,onClose:o,children:[t(lt,{children:m("noumena.subscription.billing.history.heading.text")}),t(ot,{align:"center",children:!!(a!=null&&a.length)&&a.map(s=>t(ut,{planName:s.plan_name,issueDate:Number(s.issue_date),amountPaid:s.amount_paid,externalInvoiceId:s.external_invoice_id,planType:s.plan_type,"data-test":"BillingHistoryModal-BillingCard"}))}),t(rt,{children:t(R,{primary:!0,size:"full",onClick:o,"data-test":"BillingHistoryModal-Button",children:m("noumena.close")})})]})),J=g.memo(({loading:e,invoices:o})=>{const[a,s]=g.useState(!1),n=g.useCallback(()=>{s(p=>!p)},[]),d=o&&o.length>5||!1,l=o==null?void 0:o.slice(0,6);return i(H,{"data-test":"BillingHistoryCard-CardLayoutWrapper",children:[t(u,{font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted","data-test":"BillingHistoryCard-TSpan",children:m("noumena.subscription.billing.history.heading.text")}),t(v,{height:16,"data-test":"BillingHistoryCard-Spacer"}),e?t(S,{height:55,borderRadius:16,"data-test":"BillingHistoryCard-Skeleton"}):i(k,{children:[l!=null&&l.length?l.map(p=>t(ut,{planName:p.plan_name,issueDate:Number(p.issue_date),amountPaid:p.total,externalInvoiceId:p.external_invoice_id,planType:p.plan_type,"data-test":"BillingHistoryCard-BillingCard"})):t(u,{font:"body-m",colorToken:"--text-placeholder-neutral-default","data-test":"BillingHistoryCard-TSpan",children:m("noumena.money.subscription.subscription.no.billing.history")}),d?t(Ot,{onClick:n,"data-test":"BillingHistoryCard-SeeAllTransactionWrapper",children:t(u,{font:"button-m",colorToken:"--text-button-brand-primary-default","data-test":"BillingHistoryCard-TSpan",children:m("noumena.subscription.billing.history.button.text")})}):null,t(Yt,{open:a,onClose:n,invoices:o,"data-test":"BillingHistoryCard-BillingHistoryModal"})]})]})});var O=(e=>(e.CARD="card",e.DIRECT_DEBIT="direct_debit",e))(O||{});const Vt=(e,o)=>{var a,s,n,d;if(e&&o){const l=JSON.parse(o);return{method:e,name:e===O.CARD?((a=l==null?void 0:l.card)==null?void 0:a.brand)||"Not available":((s=l==null?void 0:l.bank_account)==null?void 0:s.bank_name)||"Not available",number:e===O.CARD?((n=l==null?void 0:l.card)==null?void 0:n.masked_number)||"Not available":((d=l==null?void 0:l.bank_account)==null?void 0:d.last4)||"Not available"}}return null},Xt=["amex","diners","discover","mastercard","unionpay","visa","jcb"],Jt=({loading:e,accountName:o,accountNumber:a,method:s,paymentFailed:n})=>{const d=g.useMemo(()=>Xt.includes(o)?o:"creadit_card_m",[o]);return e?t(S,{height:55,borderRadius:16,"data-test":"PaymentBankCard-Skeleton"}):i(qt,{"data-test":"PaymentBankCard-PaymentBankCardWrapper",children:[s===O.DIRECT_DEBIT?t("img",{src:Ct,alt:"bank"}):o?t(I,{name:d,size:32,"data-test":"PaymentBankCard-Icon"}):null,i(Ft,{"data-test":"PaymentBankCard-BankDetails",children:[t(u,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"PaymentBankCard-TSpan",children:o}),i(u,{font:"footnote",colorToken:n?"--text-tablecell-body-danger-primary-default":"--text-tablecell-body-neutral-default","data-test":"PaymentBankCard-TSpan",children:[a," ",n?"(Failed)":""]})]})]})},K=g.memo(({upcomingPayment:e,loading:o,price:a,accountName:s,accountNumber:n,paymentMethod:d,paymentMethodDetails:l,transactionStatus:p,invoiceId:b})=>{const y=Vt(d,l),[f,x]=g.useState(!1),{loading:c}=bt({skip:!b||p!=="payment_due",variables:{input:{invoice_id:b}},onCompleted:({getSelectedInvoiceDetails:C})=>{C[0].linked_payments&&C[0].linked_payments[0].txn_status&&x(C[0].linked_payments[0].txn_status==="failure")}}),r=o||c;return i(H,{"data-test":"PaymentCard-CardLayoutWrapper",children:[t(ct,{"data-test":"PaymentCard-Header",children:t(u,{font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted","data-test":"PaymentCard-TSpan",children:m("noumena.subscription.payment.text")})}),t(v,{height:16,"data-test":"PaymentCard-Spacer"}),t(Jt,{loading:r,accountName:(y==null?void 0:y.name)||s,accountNumber:(y==null?void 0:y.number)||n,method:(y==null?void 0:y.method)||"",paymentFailed:f,"data-test":"PaymentCard-PaymentBankCard"}),!r&&!f&&t(v,{height:16,"data-test":"PaymentCard-Spacer"}),!r&&f&&i(k,{children:[i(Gt,{"data-test":"PaymentCard-ErrorWrapper",children:[t(u,{colorToken:"--text-tablecell-header-danger-primary-highlighted",font:"body-m-bold","data-test":"PaymentCard-TSpan",children:m("noumena.moneny.subscription.payment.failed.heading")}),t(u,{colorToken:"--text-tablecell-body-danger-primary-default",font:"footnote","data-test":"PaymentCard-TSpan",children:m("noumena.moneny.subscription.payment.failed.subheding")})]}),t(v,{height:16,"data-test":"PaymentCard-Spacer"})]}),r&&t(S,{width:200,"data-test":"PaymentCard-Skeleton"}),e&&!r?t(u,{font:"body-m-bold",colorToken:"--text-card-neutral-highlighted","data-test":"PaymentCard-TSpan",children:m("noumena.subscription.plan-details.scheduled-payment.text")}):null,t(v,{height:8,"data-test":"PaymentCard-Spacer"}),r&&t(S,{width:80,"data-test":"PaymentCard-Skeleton"}),e&&st(e)&&!r?t(u,{font:"footnote",colorToken:"--text-tablecell-body-neutral-default","data-test":"PaymentCard-TSpan",children:it(new Date(e),"dd MMM yyyy")}):null,t(v,{height:4,"data-test":"PaymentCard-Spacer"}),r?t(S,{height:15,width:50,"data-test":"PaymentCard-Skeleton"}):t(u,{font:"body-l",colorToken:"--text-card-neutral-highlighted","data-test":"PaymentCard-TSpan",children:U(a/100,G.Usd,2)})]})}),Z=g.memo(({name:e,totalSlots:o,usedSlots:a,loading:s,type:n})=>{const d=a/o*100,l=n===P.Plan?`${a} / ${o}`:`${a}`;return i(Et,{"data-test":"NoumProgress-ProgressCircleContainer",children:[n===P.Plan&&t(xt,{percentage:d,color:d?"var(--bg-progressbar-brand-primary-default)":"var(--bg-progressbar-neutral-default)",barSize:8,circleSize:72,"data-test":"NoumProgress-CircleProgressBar"}),i(At,{"data-test":"NoumProgress-ProgressContainer",children:[t(u,{font:"body-l",colorToken:"--text-card-neutral-default","data-test":"NoumProgress-TSpan",children:e}),s?t(S,{height:18,width:80,"data-test":"NoumProgress-Skeleton"}):t(u,{font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted","data-test":"NoumProgress-TSpan",children:l})]})]})}),tt=({children:e,loading:o})=>t(k,{children:o?t(S,{width:80,height:22,"data-test":"PlanName-Skeleton"}):t(u,{font:"body-xl-bold",colorToken:"--text-body-brand-primary-default","data-test":"PlanName-TSpan",children:e})}),Kt=({children:e,loading:o})=>t(k,{children:o?t(S,{width:80,height:22,"data-test":"CancelledText-Skeleton"}):t(u,{font:"footnote-bold",background:"var(--bg-tag-neutral-default)",colorToken:"--text-tag-neutral-default","data-test":"CancelledText-TSpan",children:e})}),Zt=({price:e,loading:o,planUnit:a})=>{const s=a.toLowerCase()===M.MONTH.toLowerCase();return t(k,{children:o?t(S,{height:30,width:50,"data-test":"PlanPrice-Skeleton"}):i("div",{children:[t(u,{font:"heading-m-bold",colorToken:"--text-card-neutral-highlighted","data-test":"PlanPrice-TSpan",children:U(e/100,G.Usd)}),s&&i(u,{font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"PlanPrice-TSpan",children:[" ","/ ",a," "]})]})})},te=({billingCycles:e,paidInsatallments:o,loading:a,planUnit:s})=>{const n=s.toLowerCase()===M.MONTH.toLowerCase();return t(k,{children:a?t(S,{width:50,height:15,"data-test":"PlanInstallments-Skeleton"}):t("div",{children:n?i(k,{children:[i(u,{font:"footnote",colorToken:"--text-tablecell-body-neutral-default","data-test":"PlanInstallments-TSpan",children:["Paid:"," "]}),i(u,{font:"footnote-bold",colorToken:"--text-tablecell-body-neutral-default","data-test":"PlanInstallments-TSpan",children:[o," of ",e]})]}):t(u,{font:"footnote",colorToken:"--text-body-neutral-default","data-test":"PlanInstallments-TSpan",children:m("noumena.money.subscription.single.payment.text")})})})},ee=g.memo(({planName:e,price:o,loading:a,type:s,planUnit:n,remainingBillingCycle:d=0,billingCycle:l=12,showCancelled:p})=>{const b=l===11?l+1-d:l-d;if(s===P.Charge)return t(X,{"data-test":"Plan-PlanWrapper",children:t(tt,{loading:a,"data-test":"Plan-PlanName",children:m("noumena.money.myplans.starter")})});const y=e===m("noumena.moneny.subscription.name.failed")?m("noumena.moneny.subscription.name.failed"):e.split(" ")[0];return i(X,{"data-test":"Plan-PlanWrapper",children:[i(Wt,{"data-test":"Plan-PlanWrapperHeader",children:[t(tt,{loading:a,"data-test":"Plan-PlanName",children:y}),p&&t(Kt,{loading:a,"data-test":"Plan-CancelledText",children:m("noumena.money.myplans.cancelled")})]}),t(Zt,{planUnit:n,price:o,loading:a,"data-test":"Plan-PlanPrice"}),t(te,{loading:a,paidInsatallments:b,billingCycles:l===11?l+1:l,planUnit:n,"data-test":"Plan-PlanInstallments"})]})}),ae=g.memo(({open:e,onClose:o,plan_name:a,refetch:s,type:n})=>{const{id:d}=dt(),l=()=>{let c={};return n===P.Charge?c={plan_type:P.Charge}:c={subscription_id:Number(d)},c},{refreshNoumData:p}=wt(l()),{logError:b}=Pt(),{addToast:y}=q(),[f]=Tt({onCompleted:c=>{c.cancelSubscription&&(y("success","none",`${m("noumena.money.subscription.cancelSubsciption.success",{plan_name:a})}`),s(),p(),o())},onError:c=>{c instanceof Error&&b(c,"gqlCancelSuscription")}}),x=g.useCallback(async()=>{await f({variables:{subscription_id:Number(d)}})},[f,d]);return i(at,{open:e,size:nt.S,onClose:o,disableBackdropClick:!0,children:[t(lt,{children:m("noumena.money.palndetails.cancelmodal_header")}),i(ot,{align:"center",hideScrollbar:!0,children:[t(u,{font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"CancelPlanModal-TSpan",children:m("noumena.money.palndetails.cancelmodal.bodytext")}),t(v,{height:16,"data-test":"CancelPlanModal-Spacer"}),t(u,{font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"CancelPlanModal-TSpan",children:m("noumena.money.palndetails.cancelmodal.bodytext2")})]}),i(rt,{gap:16,flexDirection:"column",children:[t(R,{primary:!0,size:"full",onClick:()=>o(),"data-test":"CancelPlanModal-Button",children:m("noumena.money.palndetails.cancelmodal.cancel")}),t(R,{tertiary:!0,size:"full",onClick:x,"data-test":"CancelPlanModal-Button",children:m("noumena.money.palndetails.cancelmodal.ok")})]})]})}),et=g.memo(({subscriptionDetails:e,loading:o,type:a,refetch:s})=>{const{remaining_billing_cycles:n,billing_cycles:d,billing_period_unit:l,max_count_noum_renewal:p,active_count_noum_renewal:b,active_count_noum_setup:y,max_count_noum_setup:f,unit_price:x,plan_name:c,status:r}=e||{},{addToast:C}=q(),[_,T]=g.useState(!1),w=n?Number(n):0,B=a===P.Charge,N=a===P.Charge?m("noumena.money.myplans.payasyougo"):m("noumena.money.subscription.plan.details.text"),D=(l==null?void 0:l.toLowerCase())===M.MONTH.toLowerCase()?M.MONTH:M.YEAR,E=a===P.Charge?f:y,A=a===P.Charge?p:b,W=g.useCallback(()=>{(l==null?void 0:l.toLowerCase())===M.MONTH.toLowerCase()?T(!0):C("error","icon",`${m("noumena.plandetails.cancel_error")}`)},[C,l]);return i(k,{children:[i(H,{"data-test":"PlanDetailsCard-CardLayoutWrapper",children:[i(ct,{"data-test":"PlanDetailsCard-Header",children:[t(u,{font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted","data-test":"PlanDetailsCard-TSpan",children:N}),a===P.Plan&&Q.ACTIVE===r&&t(_t,{hideIcons:!0,containerWidth:"150px",options:[{label:"Cancel Plan",value:"Cancel",key:"Cancel",type:"value",labelColor:"--text-tablecell-header-danger-primary-highlighted",intent:"danger"}],usePortal:!0,renderContainerFromBottom:!0,onSelectOption:()=>{W()},"data-test":"PlanDetailsCard-Dropdown",children:({targetProps:z,targetRef:$})=>t(k,{children:t(Nt,{ref:$,...z,"data-test":"PlanDetailsCard-DropdownPicker",children:t(R,{textOnly:!0,size:"small",icon:t(I,{name:"more_m",size:24,color:"--icon-button-neutral-default","data-test":"PlanDetailsCard-Icon"}),"data-test":"PlanDetailsCard-Button"})},"123")})})]}),i(It,{alignStart:B,"data-test":"PlanDetailsCard-PlanContent",children:[t(ee,{loading:o,remainingBillingCycle:w,type:a,planUnit:D,planName:c||"Failed to fetch name",price:x||0,billingCycle:d||0,showCancelled:Q.CANCELLED===r&&(l==null?void 0:l.toLowerCase())===M.MONTH.toLowerCase(),"data-test":"PlanDetailsCard-Plan"}),t(Z,{name:"Noum Set ups",loading:o,type:a,totalSlots:f||0,usedSlots:E||0,"data-test":"PlanDetailsCard-NoumProgress"}),t(Z,{name:"Noum Renewals",loading:o,type:a,totalSlots:p||0,usedSlots:A||0,"data-test":"PlanDetailsCard-NoumProgress"})]})]}),_&&t(ae,{open:_,onClose:()=>T(!1),plan_name:c,refetch:s,type:a,"data-test":"PlanDetailsCard-CancelPlanModal"})]})}),ne=()=>{const e=kt();return i(Qt,{"data-test":"PlanDetailsHeader-HeadingWrapper",children:[t(I,{name:"arrow_left_m",size:24,color:"--icon-button-neutral-default",onClick:()=>e(St.MY_PLAN),style:{marginBottom:"5px"},"data-test":"PlanDetailsHeader-Icon"}),t(u,{font:"heading-xs-bold",colorToken:"--text-appbar-neutral-default",style:{paddingLeft:"10px"},"data-test":"PlanDetailsHeader-TSpan",children:m("noumena.money.myplans")})]})},le=()=>{var w,B,N,D;const{id:e}=dt(),{subscriptionData:o,loading:a,refetch:s}=Dt(e||""),{subscription:n,invoices:d}=o||{},l=e===P.Charge?P.Charge:P.Plan,p=g.useMemo(()=>t(ne,{"data-test":"PlanDetails-planDetailsSubHeader-PlanDetailsHeader"}),[]),b=l===P.Plan&&(n==null?void 0:n.status)===Q.ACTIVE,y=Number(n==null?void 0:n.next_billing_at),f=(n==null?void 0:n.unit_price)||0,x=(n==null?void 0:n.card_type)||"",c=(n==null?void 0:n.card_masked_number)||"",r=d?(w=d[0])==null?void 0:w.payment_method:null,C=d?(B=d[0])==null?void 0:B.payment_method_details:null,_=d?(N=d[0])==null?void 0:N.status:null,T=d?(D=d[0])==null?void 0:D.invoice_id:null;return i(Bt,{type:"Chambers","data-testid":"money-layout",hideLeftMenu:!0,subHeader:p,"data-test":"PlanDetails-Layout",children:[i(vt,{"data-test":"PlanDetails-Container",children:[i(Lt,{"data-test":"PlanDetails-FirstColumn",children:[t(et,{subscriptionDetails:n,loading:a,type:l,refetch:s,"data-test":"PlanDetails-PlanDetailsCard"}),t(H,{style:{gap:"24px"},"data-test":"PlanDetails-CardLayoutWrapper",children:t(V,{launchFrom:Y.PLAN_DETAILS,subscription_id:Number(e),itemType:l,subscriptionStatus:n==null?void 0:n.status,"data-test":"PlanDetails-MyNoums"})})]}),i(Ht,{"data-test":"PlanDetails-SecondColumn",children:[b?t(K,{loading:a,upcomingPayment:y,price:f,accountName:x,accountNumber:c,paymentMethod:r,paymentMethodDetails:C,transactionStatus:_,invoiceId:T,"data-test":"PlanDetails-PaymentCard"}):null,t(J,{loading:a,invoices:d,"data-test":"PlanDetails-BillingHistoryCard"})]})]}),i(Mt,{"data-test":"PlanDetails-TabContainer",children:[t(et,{subscriptionDetails:n,loading:a,type:l,refetch:s,"data-test":"PlanDetails-PlanDetailsCard"}),b?t(K,{loading:a,upcomingPayment:y,price:f,accountName:x,accountNumber:c,paymentMethod:r,paymentMethodDetails:C,transactionStatus:_,invoiceId:T,"data-test":"PlanDetails-PaymentCard"}):null,t(J,{loading:a,invoices:d,"data-test":"PlanDetails-BillingHistoryCard"}),t(H,{style:{gap:"24px"},"data-test":"PlanDetails-CardLayoutWrapper",children:t(V,{launchFrom:Y.PLAN_DETAILS,subscription_id:Number(e),itemType:l,subscriptionStatus:n==null?void 0:n.status,"data-test":"PlanDetails-MyNoums"})})]})]})},Se=le;export{Se as default};
//# sourceMappingURL=PlanDetails-c6302f38.js.map
