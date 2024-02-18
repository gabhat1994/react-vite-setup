import{aa as B,c as a,ab as s,j as e,ac as v,T as r,I as T,B as _,F as M,S as I,f9 as V}from"./index-cd84bcc9.js";import{r as m,a9 as G,B as d,aT as c}from"./vendor-51460554.js";import{M as p}from"./index-a497727f.js";import{D as C,e as f}from"./helper-53a5becb.js";import{f as o,B as z,u as tt,S as F,P as et,a as at}from"./index-ea5d695b.js";import{P as ot,T as N,A as rt,a as S,b,c as U,d as E,e as w,f as X,g as dt,E as W,h as nt,i as st,j as q,S as it,M as $,k,l as j}from"./MyNoums-ef4fc27c.js";import"./sideNavItems-22800105.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./storyblok-c16fb040.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./styles-3ceda759.js";import"./index-1f4ed9fc.js";import"./styles-46bbc451.js";import"./main-wallet-6d7dbd11.js";import"./index-e04cac67.js";const H=m.memo(({percentage:n,text:l,fractionValue:i})=>{const u=B();return a(ot,{width:u===s.MOBILE?"100%":"40%","data-test":"ProgressCard-PlanInfoTile",children:[e(v,{percentage:n,color:n===0?"var(--bg-progressbar-neutral-default)":"var(--bg-progressbar-brand-primary-default)",barSize:u===s.MOBILE?5:8,circleSize:u===s.MOBILE?48:72,"data-test":"ProgressCard-CircleProgressBar"}),a(N,{height:"54px","data-test":"ProgressCard-TextColumn",children:[e(r,{font:"body-l",colorToken:"--text-card-neutral-default","data-test":"ProgressCard-TSpan",children:l}),e(r,{font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted","data-test":"ProgressCard-TSpan",children:i})]})]})}),Y=m.memo(n=>{const l=G(),i=B(),u=m.useCallback(t=>{l(`/noums/plan-details/${t}`)},[l]);return n.planData.length>0?a(rt,{"data-test":"PlanCard-ActivePlans",children:[a(r,{font:"body-m-bold",colorToken:"--text-card-header-neutral-default","data-test":"PlanCard-TSpan",children:[" ",n.planName]}),n.planData.length>0&&n.planData.map(t=>{var g,h,P;return a(S,{onClick:()=>i===s.MOBILE&&u(t==null?void 0:t.subscription_id),"data-test":"PlanCard-ActivePlanBox",children:[a(b,{isMobile:i===s.MOBILE,"data-test":"PlanCard-MainContent",children:[a(U,{style:i===s.MOBILE?{justifyContent:"space-between"}:{},"data-test":"PlanCard-TextRow",children:[a(r,{font:"body-l-bold",colorToken:o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status)?"--text-card-neutral-default":"--text-card-neutral-highlighted","data-test":"PlanCard-TSpan",children:[" ",(g=t==null?void 0:t.plan_name)==null?void 0:g.split(" ")[0],a(r,{font:"body-l-bold",colorToken:o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status)?"--text-card-neutral-disabled":"--text-card-neutral-default","data-test":"PlanCard-TSpan",children:[" ","(",((h=t==null?void 0:t.billing_period_unit)==null?void 0:h.toLowerCase())===z.MONTH.toLowerCase()?"Monthly":"Yearly",")"]})]}),(t==null?void 0:t.status)===o.ACTIVE&&!(t!=null&&t.is_cancelled)&&((P=t==null?void 0:t.billing_period_unit)==null?void 0:P.toLowerCase())===z.MONTH.toLowerCase()&&a(r,{font:"footnote-bold",background:"var(--bg-tag-neutral-default)",colorToken:"--text-tag-neutral-default",textAlign:"end","data-test":"PlanCard-TSpan",children:[" ",d("noumena.money.myplans.nextpayment"),C(t==null?void 0:t.next_billing_at)]}),(t==null?void 0:t.is_cancelled)&&e(r,{font:"footnote-bold",background:"var(--bg-tag-neutral-default)",colorToken:"--text-tag-neutral-default",textAlign:"end","data-test":"PlanCard-TSpan",children:d("noumena.money.myplans.cancelled")})]}),a(E,{"data-test":"PlanCard-PlanMetaData",children:[i!==s.MOBILE&&a(w,{"data-test":"PlanCard-PlanFees",children:[e(r,{font:"footnote",colorToken:o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status)?"--text-card-neutral-disabled":"--text-card-neutral-default","data-test":"PlanCard-TSpan",children:o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status)?d("noumena.money.myplans.expire1"):d("noumena.money.myplans.expire")}),e(r,{font:"body-m",colorToken:o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status)?"--text-card-neutral-default":"--text-card-neutral-highlighted","data-test":"PlanCard-TSpan",children:C(t==null?void 0:t.valid_till)})]}),a(X,{"data-test":"PlanCard-PlanNoumInfo",children:[e(v,{percentage:(t!=null&&t.active_count_noum_setup?t.active_count_noum_setup:0)/(t!=null&&t.max_count_noum_setup?t.max_count_noum_setup:0)*100,color:o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status)?"var(--bg-progressbar-neutral-disabled)":(t!=null&&t.active_count_noum_setup?t.active_count_noum_setup:0)/(t!=null&&t.max_count_noum_setup?t.max_count_noum_setup:0)*100===0?"var(--bg-progressbar-neutral-default)":"var(--bg-progressbar-brand-primary-default)",barSize:3,circleSize:24,"data-test":"PlanCard-CircleProgressBar"}),a(N,{width:"81px",height:"41px","data-test":"PlanCard-TextColumn",children:[e(r,{font:"footnote",colorToken:o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status)?"--text-card-neutral-disabled":"--text-card-neutral-default","data-test":"PlanCard-TSpan",children:d("noumena.money.myplans.noumsetup")}),a(r,{font:"body-m",colorToken:"--text-card-header-neutral-highlighted","data-test":"PlanCard-TSpan",children:[t==null?void 0:t.active_count_noum_setup," /"," ",t==null?void 0:t.max_count_noum_setup]})]})]}),a(X,{"data-test":"PlanCard-PlanNoumInfo",children:[e(v,{percentage:(t!=null&&t.active_count_noum_renewal?t.active_count_noum_renewal:0)/(t!=null&&t.max_count_noum_renewal?t.max_count_noum_renewal:0)*100,color:o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status)?"var(--bg-progressbar-neutral-disabled)":(t!=null&&t.active_count_noum_renewal?t.active_count_noum_renewal:0)/(t!=null&&t.max_count_noum_renewal?t.max_count_noum_renewal:0)*100===0?"var(--bg-progressbar-neutral-default)":"var(--bg-progressbar-brand-primary-default)",barSize:3,circleSize:24,"data-test":"PlanCard-CircleProgressBar"}),a(N,{width:"90px",height:"41px","data-test":"PlanCard-TextColumn",children:[e(r,{font:"footnote",colorToken:o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status)?"--text-card-neutral-disabled":"--text-card-neutral-default","data-test":"PlanCard-TSpan",children:d("noumena.money.myplans.noumrenewal")}),a(r,{font:"body-m",colorToken:"--text-card-header-neutral-highlighted","data-test":"PlanCard-TSpan",children:[t==null?void 0:t.active_count_noum_renewal," /"," ",t==null?void 0:t.max_count_noum_renewal]})]})]})]}),i===s.MOBILE&&(o.ACTIVE===(t==null?void 0:t.status)&&Number(f(t==null?void 0:t.valid_till))>30||(t==null?void 0:t.is_cancelled)||o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status))&&a(dt,{"data-test":"PlanCard-PlanFeesMobile",children:[e(T,{name:"info_m",color:"--icon-card-neutral-highlighted",size:16.67,"data-test":"PlanCard-Icon"}),e(r,{font:"footnote",colorToken:o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status)?"--text-card-neutral-disabled":"--text-card-header-neutral-highlighted","data-test":"PlanCard-TSpan",children:o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status)?d("noumena.money.myplans.expire1"):d("noumena.money.myplans.expire")}),e(r,{font:"footnote-bold",colorToken:o.INACTIVE===(t==null?void 0:t.status)||o.EXPIRED===(t==null?void 0:t.status)?"--text-card-neutral-default":"--text-card-header-neutral-highlighted","data-test":"PlanCard-TSpan",children:C(t==null?void 0:t.valid_till)})]}),(t==null?void 0:t.valid_till)&&o.ACTIVE===t.status&&!(t!=null&&t.is_cancelled)&&Number(f(t==null?void 0:t.valid_till))<=7&&Number(f(t==null?void 0:t.valid_till))>=0&&a(W,{"data-test":"PlanCard-ErrorMessage",children:[i!==s.MOBILE&&e(T,{name:"time_m",size:18,color:"--icon-card-danger-primary-default","data-test":"PlanCard-Icon"}),i!==s.MOBILE&&a(r,{font:"footnote",colorToken:"--text-card-danger-primary-default","data-test":"PlanCard-TSpan",children:[d("noumena.money.myplans.expires"),e(r,{font:"footnote-bold",colorToken:"--text-card-danger-primary-default","data-test":"PlanCard-TSpan",children:C(t.valid_till)}),d("noumena.money.myplans.dataLost")]}),i===s.MOBILE&&a(nt,{"data-test":"PlanCard-ErrorBoxCol",children:[a(st,{"data-test":"PlanCard-ErrorBoxRow",children:[e(T,{name:"time_m",size:18,color:"--icon-card-danger-primary-default","data-test":"PlanCard-Icon"}),a(r,{font:"footnote",colorToken:"--text-card-danger-primary-default","data-test":"PlanCard-TSpan",children:[d("noumena.money.myplans.expires"),a(r,{font:"footnote-bold",colorToken:"--text-card-danger-primary-default","data-test":"PlanCard-TSpan",children:[C(t.valid_till),"."]})]})]}),e(r,{font:"footnote",colorToken:"--text-card-danger-primary-default","data-test":"PlanCard-TSpan",children:d("noumena.money.myplans.dataLostMobile")})]})]}),(t==null?void 0:t.valid_till)&&o.ACTIVE===(t==null?void 0:t.status)&&!(t!=null&&t.is_cancelled)&&Number(f(t==null?void 0:t.valid_till))<=30&&Number(f(t==null?void 0:t.valid_till))>7&&e(W,{"data-test":"PlanCard-ErrorMessage",children:e(r,{font:"footnote",colorToken:"--text-card-danger-primary-default","data-test":"PlanCard-TSpan",children:d("noumena.money.myplans.expireSoon")})})]}),i!==s.MOBILE&&e(_,{size:"small",style:{width:"40px"},rightIcon:e(T,{name:"chevron_right_m",color:"--icon-button-neutral-default ",size:24,onClick:()=>{},"data-test":"PlanCard-Icon"}),onClick:()=>u(t==null?void 0:t.subscription_id),"data-test":"PlanCard-Button"})]},t==null?void 0:t.subscription_id)})]},n.planType):null}),ct=m.memo(({onAddNewPlan:n,loading:l})=>e(M,{children:l?e(c,{"data-test":"NoPlanData-Skeleton"}):a(M,{children:[e(r,{font:"body-m",colorToken:"--text-placeholder-neutral-default",style:{alignSelf:"center"},"data-test":"NoPlanData-TSpan",children:d("noumena.money.myplans.noactiveplan")}),e(_,{size:"small",secondary:!0,style:{width:"165px",alignSelf:"center"},onClick:()=>n(),"data-test":"NoPlanData-Button",children:d("noumena.money.myplans.addFirstPlan")})]})})),lt=({isMobile:n})=>a(M,{children:[a(q,{isMobile:n,"data-test":"PlanSkeleton-PlanTopWrapper",children:[e("div",{style:{width:"100%"},children:e(c,{height:130,borderRadius:16,"data-test":"PlanSkeleton-Skeleton"})}),e("div",{style:{width:"100%"},children:e(c,{height:130,borderRadius:16,"data-test":"PlanSkeleton-Skeleton"})})]}),e(c,{width:100,height:15,"data-test":"PlanSkeleton-Skeleton"}),e(S,{"data-test":"PlanSkeleton-ActivePlanBox",children:a(b,{"data-test":"PlanSkeleton-MainContent",children:[e(c,{width:350,height:15,"data-test":"PlanSkeleton-Skeleton"}),a(E,{"data-test":"PlanSkeleton-PlanMetaData",children:[e(c,{width:350,height:15,"data-test":"PlanSkeleton-Skeleton"}),e(c,{width:350,height:15,"data-test":"PlanSkeleton-Skeleton"})]})]})}),e(S,{"data-test":"PlanSkeleton-ActivePlanBox",children:a(b,{"data-test":"PlanSkeleton-MainContent",children:[e(c,{width:350,height:15,"data-test":"PlanSkeleton-Skeleton"}),a(E,{"data-test":"PlanSkeleton-PlanMetaData",children:[e(c,{width:350,height:15,"data-test":"PlanSkeleton-Skeleton"}),e(c,{width:350,height:15,"data-test":"PlanSkeleton-Skeleton"})]})]})})]}),ut=()=>{const n=B(),l=G(),[i,u]=m.useState(),[t,g]=m.useState(!1),{loading:h,expiredSubscription:P,totalNoumRenewalSlots:L,totalNoumSetupSlots:A,activeNoumRenewalSlots:D,activeNoumSetupSlots:R,noumRenewalSlotsPayAsYouGo:J,noumSetupSlotsPayAsYouGo:K,activeCancelledSubscription:x}=tt();m.useEffect(()=>{(x.length>0||P.length>0)&&h===!1?u(!0):(x.length<=0||P.length<=0)&&h&&u(!1)},[x.length,P.length,h]);const y=s.MOBILE===n||s.TABLET===n,O=m.useCallback(Z=>{l(`/noums/plan-details/${Z}`)},[l]),Q=m.useCallback(()=>{g(!0)},[]);return e(p,{type:"Money","data-testid":"money-layout",rightContent:e(it,{"data-test":"Plan-SideLayoutWrapper",children:e($,{launchFrom:F.PLAN,"data-test":"Plan-MyNoums"})}),"data-test":"Plan-Layout",children:a("div",{style:n===s.TABLET?{padding:"16px"}:{},children:[n===s.MOBILE&&e(I,{height:16,"data-test":"Plan-Spacer"}),a(k,{isSmallScreen:y,"data-test":"Plan-MainLayoutWrapper",children:[a(j,{"data-test":"Plan-PlanHeader",children:[a(r,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"Plan-TSpan",children:[" ",d("noumena.money.myplans")]}),i&&e(_,{size:"small",primary:!0,leftIcon:e(T,{name:"add_m",color:"--icon-button-neutral-alt-default",size:24,onClick:()=>{},"data-test":"Plan-Icon"}),style:{width:"160px"},onClick:()=>g(!0),"data-test":"Plan-Button",children:d("noumena.money.myplans.addnewplan")})]}),h&&e(lt,{isMobile:n===s.MOBILE,"data-test":"Plan-PlanSkeleton"}),i&&a(q,{isMobile:n===s.MOBILE,"data-test":"Plan-PlanTopWrapper",children:[e(H,{percentage:R/A*100,text:d("noumena.money.myplans.noumsetup"),fractionValue:`${R}/${A}`,"data-test":"Plan-ProgressCard"}),e(H,{percentage:D/L*100,text:d("noumena.money.myplans.noumrenewal"),fractionValue:`${D}/${L}`,"data-test":"Plan-ProgressCard"})]}),i&&e(Y,{planType:o.ACTIVE||o.CANCELLED,planData:x,planName:d("noumena.money.myplans.activeplan"),"data-test":"Plan-PlanCard"}),i&&e(Y,{planName:d("noumena.money.myplans.expiredplan"),planData:P,planType:o.INACTIVE||o.EXPIRED,"data-test":"Plan-PlanCard"}),i===!1&&e(ct,{onAddNewPlan:Q,loading:h,"data-test":"Plan-NoPlanData"})]}),e(I,{height:y?16:24,"data-test":"Plan-Spacer"}),a(k,{isSmallScreen:y,"data-test":"Plan-MainLayoutWrapper",children:[e(j,{style:{height:"30px"},"data-test":"Plan-PlanHeader",children:a(r,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"Plan-TSpan",children:[" ",d("noumena.money.myplans.payasyougo")]})}),a(S,{onClick:()=>n===s.MOBILE&&O(V.Charge),"data-test":"Plan-ActivePlanBox",children:[a(b,{"data-test":"Plan-MainContent",children:[e(U,{"data-test":"Plan-TextRow",children:a(r,{font:"body-l-bold",colorToken:"--text-card-neutral-highlighted","data-test":"Plan-TSpan",children:[" ",d("noumena.money.myplans.starter")]})}),a(E,{"data-test":"Plan-PlanMetaData",children:[a(w,{"data-test":"Plan-PlanFees",children:[e(r,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"Plan-TSpan",children:d("noumena.money.myplans.noumsetup")}),e(r,{font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"Plan-TSpan",children:K||0})]}),a(w,{"data-test":"Plan-PlanFees",children:[e(r,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"Plan-TSpan",children:d("noumena.money.myplans.noumrenewal")}),e(r,{font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"Plan-TSpan",children:J||0})]})]})]}),n!==s.MOBILE&&e(_,{size:"small",style:{width:"40px"},rightIcon:e(T,{name:"chevron_right_m",size:24,color:"--icon-button-neutral-default",onClick:()=>{},"data-test":"Plan-Icon"}),onClick:()=>O(V.Charge),"data-test":"Plan-Button"})]})]}),e(I,{height:y?16:24,"data-test":"Plan-Spacer"}),y&&e(k,{isSmallScreen:y,"data-test":"Plan-MainLayoutWrapper",children:e($,{launchFrom:F.PLAN,"data-test":"Plan-MyNoums"})}),t&&e(et,{open:t,onClose:()=>g(!1),launchFrom:at.INITIAL_SETUP,"data-test":"Plan-PlanPurchaseModal"})]})})},Nt=ut;export{Nt as default};
//# sourceMappingURL=Plan-7a4888ca.js.map
