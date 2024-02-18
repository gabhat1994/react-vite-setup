import{f2 as Ee,f3 as Ne,Y as j,v as be,f4 as Le,f5 as Me,w as fe,a6 as ke,f6 as Ie,e as F,f7 as Ae,T as l,aa as K,ab as H,c as i,j as t,q as Re,aQ as G,f8 as xe,B as ee,x as Se,bb as q,f9 as Q,F as te,S as X,n as De,fa as $,M as se,t as $e,h as de,i as le,fb as Ue,k as ce,I as Ye}from"./index-cd84bcc9.js";import{r as x,B as g,f as Be,C as S,a6 as I,aa as ye,aT as z,ay as ue}from"./vendor-51460554.js";import{c as Ve,a as Oe}from"./helper-53a5becb.js";import{T as ge}from"./index-1f4ed9fc.js";const Ge=()=>x.useContext(Ee),_e=e=>{const{refreshSubscriptions:p}=oe(),{customerDetails:s}=x.useContext(Ne),{logError:m}=j(),{addToast:_}=be(),[h,u]=x.useState({first_name:"",last_name:"",email:""});x.useEffect(()=>{u({first_name:(s==null?void 0:s.first_name)||"",last_name:(s==null?void 0:s.last_name)||"",email:(s==null?void 0:s.email)||""})},[s]);const[b,{loading:y}]=Le({onCompleted:d=>{d&&(e&&e.success&&(e.success(d.createSubscriptionAndInvoiceFromHostedPages),p()),_("success","none",`${g("noumena.money.subscription.subscription.successful")}`))},onError:d=>{m(d,"createSubscriptionAndInvoiceFromHostedPages")}}),f=y;return x.useEffect(()=>{window.Chargebee.registerAgain();const d=window.Chargebee.getInstance();if(d){const T=d==null?void 0:d.getCart();if(T==null||T.setCustomer(h),e){const{error:w,loaded:A,close:M,step:P}=e;d==null||d.setCheckoutCallbacks(()=>({success:R=>{b({variables:{hosted_id:R}})},error:w,loaded:A,close:M,step:P}))}}return()=>{var T;d&&((T=d.cart)==null||T.setCustomer(void 0),d==null||d.setCheckoutCallbacks(()=>({})))}},[e,h,p,b]),{loading:f}};function Te(){const{addToast:e}=be(),p=x.useCallback(h=>{e("error","none",`${g("noumena.toast_error.text")}: ${h}`)},[e]),s=x.useCallback(()=>{e("success","icon",`${g("noumena.toast_success.text")}: Noum Renewed`)},[e]),[m]=Me();return{noumRenewalHelper:x.useCallback(async h=>{let u;return await m({variables:{noumInput:h},onError:({networkError:b=null,graphQLErrors:y=[]})=>{const[f]=y;p((f==null?void 0:f.message)??b),Be(new Error((f==null?void 0:f.message)??b),{tags:{section:"addRenewNoumMutation"}}),u=!1},onCompleted:b=>{b.addRenewNoumTransactionFee.chamber_id?(s(),u=!0):u=!1}}),u},[p,s,m])}}const we=e=>{const[p,s]=x.useState([]),{logError:m}=j(),{flags:_}=fe(),{data:h,loading:u,error:b,refetch:y}=ke({fetchPolicy:"network-only",skip:!_.paymentSubscriptions,variables:{noumDetailInput:e},onError:()=>{m(b,"gqlGetNoumTransactionFeeDetails")}});return x.useEffect(()=>{s((h==null?void 0:h.getNoumTransactionFeeDetails)||[])},[h]),x.useEffect(()=>{y()},[y]),{noumData:p,loading:u,refreshNoumData:y}};var ne=(e=>(e.PLAN="PLAN",e.PLAN_DETAILS="PLAN_DETAILS",e))(ne||{}),O=(e=>(e.INACTIVE="INACTIVE",e.ACTIVE="ACTIVE",e.CANCELLED="CANCELLED",e.EXPIRED="EXPIRED",e))(O||{}),He=(e=>(e.NOUM_RENEWAL_USD="Noum-Renewal-USD",e.NOUM_SETUP_USD="Noum-Setup-USD",e.BUILDER_MONTHLY="Builder-USD-Monthly",e.BUILDER_YEARLY="Builder-USD-Yearly",e.GROWER_MONTHLY="Grower-USD-Monthly",e.GROWER_YEARLY="Grower-USD-Yearly",e.PAY_AS_YOU_GO="pay_as_you_go",e))(He||{}),Z=(e=>(e.PLAN="plan",e.CHARGE="charge",e))(Z||{}),Fe=(e=>(e.MONTH="Month",e.YEAR="Year",e))(Fe||{}),Y=(e=>(e.NOUM_RENEWAL="Noum-Renewal",e.NOUM_SETUP="Noum-Setup",e.INITIAL_SETUP="INITIAL_SETUP",e.BUILDER="Builder",e.GROWER="Grower",e))(Y||{});const oe=()=>{const[e,p]=x.useState([]),[s,m]=x.useState([]),{flags:_}=fe(),{logError:h}=j(),{data:u,loading:b,error:y,refetch:f}=Ie({fetchPolicy:"network-only",skip:!_.paymentSubscriptions,variables:{},onError:()=>{h(y,"GetAvailableSubscriptions")}});x.useEffect(()=>{p((u==null?void 0:u.getAvailableSubscriptions.filter(o=>o.plan_type===Z.PLAN))||[]),m((u==null?void 0:u.getAvailableSubscriptions.filter(o=>o.plan_type===Z.CHARGE))||[])},[u]);const d=(e||[]).filter(o=>(o==null?void 0:o.status)===O.ACTIVE),T=(e||[]).filter(o=>(o==null?void 0:o.status)===O.ACTIVE||(o==null?void 0:o.status)===O.CANCELLED),w=(e||[]).filter(o=>(o==null?void 0:o.status)===O.INACTIVE||(o==null?void 0:o.status)===O.EXPIRED),A=(s||[]).reduce((o,r)=>o+(r!=null&&r.max_count_noum_renewal?r.max_count_noum_renewal:0),0),M=(s||[]).reduce((o,r)=>o+(r!=null&&r.max_count_noum_setup?r.max_count_noum_setup:0),0),P=(d||[]).reduce((o,r)=>o+(r!=null&&r.max_count_noum_renewal?r.max_count_noum_renewal:0),0),R=(d||[]).reduce((o,r)=>o+(r!=null&&r.max_count_noum_setup?r.max_count_noum_setup:0),0),D=(d||[]).reduce((o,r)=>o+(r!=null&&r.active_count_noum_renewal?r.active_count_noum_renewal:0),0),E=(d||[]).reduce((o,r)=>o+(r!=null&&r.active_count_noum_setup?r.active_count_noum_setup:0),0),N=o=>{const r=[];for(let n=o.length-1;n>=0;n-=1){const c=o[n];(c!=null&&c.max_count_noum_setup?c.max_count_noum_setup:0)-(c!=null&&c.active_count_noum_setup?c.active_count_noum_setup:0)>0&&r.push(c)}return r},a=o=>{const r=[];for(let n=o.length-1;n>=0;n-=1){const c=o[n];(c!=null&&c.max_count_noum_renewal?c.max_count_noum_renewal:0)-(c!=null&&c.active_count_noum_renewal?c.active_count_noum_renewal:0)>0&&r.push(c)}return r},C=N(d),L=a(d),v=Ve(s),U=Oe(s);return x.useEffect(()=>{f()},[f]),{subscribedPlans:e,payAsYouGoPlan:s,loading:b,activeSubscription:d,expiredSubscription:w,refreshSubscriptions:f,noumRenewalSlotsPayAsYouGo:A,noumSetupSlotsPayAsYouGo:M,totalNoumRenewalSlots:P,totalNoumSetupSlots:R,activeNoumRenewalSlots:D,activeNoumSetupSlots:E,oldestPlanNoumSetup:C,oldestPlanNoumRenewal:L,payAsYouGoNoumRenewal:v,payAsYouGoNoumSetup:U,activeCancelledSubscription:T}},ze=S.div`
  width: 454px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: ${F.MOBILE_L}px) {
    width: 100%;
  }
`,pe=S.div`
  width: 223px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  ${({active:e})=>e&&I`
      border-bottom: 2px solid var(--bg-tab-indicator-primary-brand-default);
    `};

  @media only screen and (max-width: ${F.MOBILE_L}px) {
    width: 100%;
  }
`,We=S.div`
  width: auto;
  padding: 1px 6px 2px 6px;
  height: 22px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({color:e})=>e?`var(${e})`:"var(--bg-tag-brand-secondary-default)"};
`,Ce=S.div`
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-sizing: border-box;
  border: 1px solid var(--border-card-neutral-highlighted);
  display: flex;
  flex-direction: column;
  ${({spotlighted:e})=>e&&I`
      background-color: var(--bg-card-brand-secondary-highlighted);
      border: 1px solid var(--border-card-brand-primary-default);
    `}
`,Xe=S.header`
  box-sizing: border-box;
  padding: 12px;
  width: 100%;
  border-bottom: 1px solid var(--border-card-neutral-highlighted);
  display: flex;
  align-items: center;
  justify-content: space-between;
  section:nth-child(1) {
    width: 151px;
    padding: 0;
    border: none;
  }
  section:nth-child(2) {
    width: 151px;
    display: flex;
    justify-content: center;
  }
  ${({spotlighted:e})=>e&&I`
      border-bottom: 1px solid var(--border-card-brand-primary-default);
    `}
`,he=S.section`
  width: 100%;
  border-bottom: 1px solid var(--border-card-neutral-highlighted);
  display: flex;
`,W=S.div`
  padding: 12px;
  display: flex;
  width: 50%;
  flex-direction: column;
`,qe=S.div`
  margin: 0px 24px;
  width: 100%;
  display: flex;
  gap: 12px;
  overflow-y: scroll;
  overflow-x: hidden;
  ${Ae}
  @media only screen and (max-width: ${F.TABLET_L}px) {
    flex-wrap: wrap;
  }
`,Qe=S.div`
  width: 100%;
`,Ke=S(l)``,Je=S(l)``,Ze=S(l)`
  text-decoration: line-through;
  margin-right: 8px;
`;S.div`
  line-height: var(--font-footnote-regular-lineheight);
  width: 100%;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  height: ${({containNotes:e})=>e?"84px":"46px"};
  box-sizing: border-box;
  padding: 12px 12px 12px 16px;
`;S.div`
  font-family: var(--font-footnote-regular-font);
  font-size: var(--font-footnote-regular-size);
  font-weight: var(--font-footnote-regular-weight);
  line-height: var(--font-footnote-regular-lineheight);
  color: var(--text-tablecell-header-neutral-default);
`;S(l)`
  span {
    font-weight: bold;
  }
`;S.a`
  text-decoration: none;
  color: inherit;
`;const je=S.table`
  position: relative;
  width: 100%;
`,et=S.thead`
  width: 100%;
`,B=S.th`
  background: white;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 143px;
  min-width: 143px;
  box-sizing: border-box;
  padding: 0;
  @media only screen and (max-width: ${F.TABLET_L}px) {
    min-width: 90px;
  }

  ${({center:e})=>e&&I`
      text-align: center;
    `}
  ${({width:e})=>e&&I`
      width: ${e}px;
      min-width: ${e}px;
    `}
  ${({hideLeftBorder:e})=>!e&&I`
      border-left: 1px solid var(--border-card-neutral-default);
    `}
	${({spotlighted:e})=>e&&I`
      background-color: var(--bg-card-brand-secondary-highlighted);
      border-bottom: 1px solid var(--border-card-brand-primary-default);
      border-top: 1px solid var(--border-card-brand-primary-default);
    `}
`,V=S.td`
  width: 143px;
  min-width: 143px;
  box-sizing: border-box;
  padding: 0;
  @media only screen and (max-width: ${F.TABLET_L}px) {
    min-width: 90px;
  }

  ${({center:e})=>e&&I`
      text-align: center;
    `}
  ${({width:e})=>e&&I`
      width: ${e}px;
      min-width: ${e}px;
    `}
  ${({hideLeftBorder:e})=>!e&&I`
      border-left: 1px solid var(--border-card-neutral-default);
    `}
	${({spotlighted:e})=>e&&I`
      background-color: var(--bg-card-brand-secondary-highlighted);
      border-bottom: 1px solid var(--border-card-brand-primary-default);
      border-top: 1px solid var(--border-card-brand-primary-default);
    `}

${({spotlighted:e,hideBottomBorder:p})=>!e&&!p&&I`
      border-bottom: 1px solid var(--border-card-neutral-default);
    `}
`,me=S.tr`
  width: 100%;
  height: 70px;
  box-sizing: border-box;
`,tt=S.tbody``,ve=({isStarter:e,isInstallment:p,billingCycle:s,price:m,currency:_,discount:h,planName:u,spotlighted:b})=>{const y=!e&&p,f=!e&&!p&&!!h&&!!m&&_,T=K()===H.MOBILE,w=u.length>10;return i("div",{style:T?{}:{padding:"12px 0px 12px 16px",height:`${b?w?"auto":"90px":"70px"}`,boxSizing:"border-box"},"data-test":"IndivisualPlanDetails",children:[i("div",{style:{display:"flex",alignItems:"center",...w?{flexDirection:"column-reverse",alignItems:"flex-start"}:{}},children:[t(l,{font:b&&!T?"body-xl-bold":"body-m-bold",colorToken:"--text-card-brand-primary-default","data-test":"IndivisualPlanDetails-TSpan",children:u}),b&&t(Re,{size:"small",contentFont:"footnote",style:{marginLeft:w?"0px":"8px",marginBottom:"6px"},"data-test":"IndivisualPlanDetails-Tag",children:"Popular"})]}),i(Qe,{children:[f&&t(Ze,{font:"footnote-bold",colorToken:"--text-card-neutral-disabled",children:G(m/100/(1-h/100),_)}),t(Ke,{font:b&&!T?"heading-s-bold":"body-l-bold",colorToken:"--text-card-neutral-highlighted",children:e?"Pay as You Go":G(m/100,_)}),y&&i(Je,{font:"footnote",colorToken:"--text-card-neutral-default",children:[" ","× ",s," ",`${g("noumena.money.subscription.subscription.installments.text")}`]})]})]})},nt=({isStarter:e,isInstallment:p,planName:s="Starter",launchFrom:m="",chamber_id:_,noum_transaction_fee_id:h,onClosePurchasePlanModal:u,transactionFee:b,discountPercent:y,noumSetup:f,noumRenewal:d,billingCycle:T,price:w,currency:A,planId:M,renewPrice:P,chamberIdAfterCreatingNoum:R,publishAndSubscribeNoum:D,launchScreen:E,itemType:N,spotlighted:a,onPlanPurchase:C})=>{const{noumRenewalHelper:L}=Te(),{refreshSubscriptions:v}=oe(),{id:U}=ye(),o=()=>{let k={};return E===ne.PLAN_DETAILS&&(N===Q.Charge?k={plan_type:Q.Charge}:k={subscription_id:Number(U)}),k},{refreshNoumData:r}=we(o()),{loading:n}=_e({success:async k=>{u(),m===Y.NOUM_SETUP&&R&&k.subscription_id&&D&&await D(k.subscription_id),m===Y.INITIAL_SETUP&&v(),m===Y.NOUM_RENEWAL&&_&&h&&await L({chamber_id:_,operation_type:xe.Renewal,subscription_id:k==null?void 0:k.subscription_id,noum_transaction_fee_id:h})&&(v(),r())}}),c=e||n;return i(Ce,{spotlighted:a,"data-test":"SubscriptionCard-BaseSubscriptionCardCard",children:[i(Xe,{spotlighted:a,"data-test":"SubscriptionCard-HeaderSection",children:[t("section",{"data-test":"SubscriptionCard-section",children:t(ve,{spotlighted:a,isStarter:e,isInstallment:p,billingCycle:T,price:w,currency:A,discount:y,planName:s,"data-test":"SubscriptionCard-IndivisualPlanDetails"})}),t("section",{"data-test":"SubscriptionCard-section",children:t(ee,{size:"small",style:{width:e?"78px":"109px"},disabled:c,primary:a,secondary:!a,onClick:()=>C(M),"data-test":"SubscriptionCard-Button",children:t(l,{font:"button-m",colorToken:c?"--text-button-neutral-disabled":a?"--text-button-neutral-alt-default":"--text-button-brand-secondary-default","data-test":"SubscriptionCard-TSpan",children:e?`${g("noumena.money.subscription.subscription.default.text")}`:`${g("noumena.money.subscription.subscription.getstarted.text")}`})})})]}),i(he,{"data-test":"SubscriptionCard-FeatureSection",children:[i(W,{"data-test":"SubscriptionCard-MobileFeature",children:[i(Se,{"data-test":"SubscriptionCard-Stack",children:[t(l,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"SubscriptionCard-TSpan",children:"Transaction Fee"}),t("div",{style:{marginLeft:"6px"},children:t(ge,{top:18,left:-80,"data-test":"SubscriptionCard-Tooltip",children:t("div",{style:{width:"284px"},children:t(l,{colorToken:"--text-tooltip-neutral-alt-default",font:"footnote","data-test":"SubscriptionCard-TSpan",children:g("noumena.money.subscription.noum.transactionfee.tooltip.text")})})})})]}),i(l,{font:a?"body-m-bold":"body-m","data-test":"SubscriptionCard-TSpan",children:[b,"%"]})]}),i(W,{"data-test":"SubscriptionCard-MobileFeature",children:[t(l,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"SubscriptionCard-TSpan",children:"Noum Set-up Fee"}),t(l,{font:a?"body-m-bold":"body-m","data-test":"SubscriptionCard-TSpan",children:e&&w?`${G(w/100,q.Usd)} (1 Free)`:g("noumena.money.subscription.noum.allowed.to.setup_renew",{noums:f})})]})]}),i(he,{"data-test":"SubscriptionCard-FeatureSection",children:[i(W,{"data-test":"SubscriptionCard-MobileFeature",children:[t(l,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"SubscriptionCard-TSpan",children:"Noum Renewal Fee"}),t(l,{font:a?"body-m-bold":"body-m","data-test":"SubscriptionCard-TSpan",children:e&&P?G(P/100,q.Usd):g("noumena.money.subscription.noum.allowed.to.setup_renew",{noums:d})})]}),i(W,{"data-test":"SubscriptionCard-MobileFeature",children:[t(l,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"SubscriptionCard-TSpan",children:"Discount"}),t(l,{font:a?"body-m-bold":"body-m","data-test":"SubscriptionCard-TSpan",children:y?`${y}%`:"-"})]})]})]})},Pe=()=>{const p=K()===H.MOBILE;return i(te,{children:[p&&i(Ce,{spotlighted:!1,style:{padding:"12px"},"data-test":"SubscriptionCardSkeleton-BaseSubscriptionCardCard",children:[i("section",{"data-test":"SubscriptionCardSkeleton-section",children:[t("header",{"data-test":"SubscriptionCardSkeleton-header",children:t(z,{width:"60px",height:"20px","data-test":"SubscriptionCardSkeleton-Skeleton"})}),t(z,{width:"190px",height:"30px","data-test":"SubscriptionCardSkeleton-Skeleton"}),t(X,{height:24,"data-test":"SubscriptionCardSkeleton-Spacer"}),t(z,{width:"100%",height:"40px","data-test":"SubscriptionCardSkeleton-Skeleton"})]}),t("section",{style:{display:"flex",flexDirection:"column",justifyContent:"center",width:"100%",alignItems:"center"},"data-test":"SubscriptionCardSkeleton-section",children:t("div",{style:{width:"90%"},children:t(z,{width:"90%",count:5,"data-test":"SubscriptionCardSkeleton-Skeleton"})})})]}),!p&&t("div",{style:{position:"relative",width:"100%",height:"400px",display:"flex",alignItems:"center",justifyContent:"center"},children:t(De,{"data-test":"SubscriptionCardSkeleton-Spinner"})})]})},ot=x.memo(({plans:e,toggleButtonState:p,loading:s,launchFrom:m,itemType:_,launchScreen:h,onClosePurchasePlanModal:u,chamberIdAfterCreatingNoum:b,publishAndSubscribeNoum:y,chamber_id:f,noum_transaction_fee_id:d,onPlanPurchase:T})=>{const{noumRenewalHelper:w}=Te(),{refreshSubscriptions:A}=oe(),M=K(),P=M===H.TABLET||M===H.MOBILE,{id:R}=ye(),D=()=>{let a={};return h===ne.PLAN_DETAILS&&(_===Q.Charge?a={plan_type:Q.Charge}:a={subscription_id:Number(R)}),a},{refreshNoumData:E}=we(D()),{loading:N}=_e({success:async a=>{u(),m===Y.NOUM_SETUP&&b&&a.subscription_id&&y&&await y(a.subscription_id),m===Y.INITIAL_SETUP&&A(),m===Y.NOUM_RENEWAL&&f&&d&&await w({chamber_id:f,operation_type:xe.Renewal,subscription_id:a==null?void 0:a.subscription_id,noum_transaction_fee_id:d})&&(A(),E())}});return i(te,{children:[s&&t(Pe,{"data-test":"TableView-SubscriptionCardSkeleton"}),!s&&i(je,{children:[t(et,{children:i(me,{children:[t(B,{width:"210",hideLeftBorder:!0}),i(B,{children:[t(Se,{fullWidth:!0,justify:"center","data-test":"TableView-Stack",children:t(l,{font:"footnote-bold",colorToken:"--text-card-neutral-default","data-test":"TableView-TSpan",children:"Transaction Fee"})}),t(ge,{top:40,left:65,"data-test":"TableView-Tooltip",children:t("div",{style:{width:"284px",textAlign:"left"},children:t(l,{colorToken:"--text-tooltip-neutral-alt-default",font:"footnote",textAlign:"left","data-test":"TableView-TSpan",children:g("noumena.money.subscription.noum.transactionfee.tooltip.text")})})})]}),t(B,{center:!0,children:i(l,{font:"footnote-bold",colorToken:"--text-card-neutral-default","data-test":"TableView-TSpan",children:["Noum ",t("br",{})," Set-up Fee"]})}),t(B,{center:!0,children:i(l,{font:"footnote-bold",colorToken:"--text-card-neutral-default","data-test":"TableView-TSpan",children:["Noum ",t("br",{}),"Renewal Fee"]})}),t(B,{center:!0,children:t(l,{font:"footnote-bold",colorToken:"--text-card-neutral-default","data-test":"TableView-TSpan",children:"Discount"})}),t(B,{})]})}),t(tt,{children:!s&&e.map((a,C,L)=>{var c,k,J,ae,re,ie;const v=a.plan_name==="Starter"&&a.item_type==="charge",U=p===$.MONTHLY,o=a.plan_name_id,r=v||s||N,n=!!a.spotlight;return i(me,{children:[t(V,{width:"210",hideLeftBorder:!0,spotlighted:n,hideBottomBorder:!!((c=L[C+1])!=null&&c.spotlight),children:t(ve,{isStarter:v,isInstallment:U,billingCycle:a.billing_cycles,currency:a.currency_code,planName:a.plan_name,spotlighted:n,discount:a.discount_percent,price:a.price,"data-test":"TableView-IndivisualPlanDetails"})}),t(V,{center:!0,spotlighted:n,hideBottomBorder:!!((k=L[C+1])!=null&&k.spotlight),children:i(l,{font:n?"body-l-bold":"body-m","data-test":"TableView-TSpan",children:[a.percent_fee,"%"]})}),t(V,{center:!0,spotlighted:n,hideBottomBorder:!!((J=L[C+1])!=null&&J.spotlight),children:i(l,{font:n?"body-l-bold":"body-m","data-test":"TableView-TSpan",children:[!v&&(P||n?t(ue,{i18nKey:g("noumena.money.subscription.noum.allowed.to.setup_renew.wrapped",{noums:a.noum_setup}),components:{br:t("br",{})},"data-test":"TableView-Trans"}):g("noumena.money.subscription.noum.allowed.to.setup_renew",{noums:a.noum_setup})),v&&a.price&&i(l,{font:"body-m","data-test":"TableView-TSpan",children:[G(a.price/100,q.Usd)," ","(1 Free)"]})]})}),t(V,{center:!0,spotlighted:n,hideBottomBorder:!!((ae=L[C+1])!=null&&ae.spotlight),children:i(l,{font:n?"body-l-bold":"body-m","data-test":"TableView-TSpan",children:[!v&&(P||n?t(ue,{i18nKey:g("noumena.money.subscription.noum.allowed.to.setup_renew.wrapped",{noums:a.noum_renewal}),components:{br:t("br",{})},"data-test":"TableView-Trans"}):g("noumena.money.subscription.noum.allowed.to.setup_renew",{noums:a.noum_renewal})),v&&a.renew_price&&t(l,{font:"body-m","data-test":"TableView-TSpan",children:G(a.renew_price/100,q.Usd)})]})}),t(V,{center:!0,spotlighted:n,hideBottomBorder:!!((re=L[C+1])!=null&&re.spotlight),children:t(l,{font:n?"body-l-bold":"body-m","data-test":"TableView-TSpan",children:a.discount_percent?`${a.discount_percent}%`:"-"})}),t(V,{center:!0,spotlighted:n,hideBottomBorder:!!((ie=L[C+1])!=null&&ie.spotlight),children:t(ee,{size:"small",style:{width:"109px",fontSize:"16px"},disabled:r,primary:n,secondary:!n,onClick:()=>T(o),"data-test":"TableView-Button",children:t(l,{font:"button-m",colorToken:r?"--text-button-neutral-disabled":n?"--text-button-neutral-alt-default":"--text-button-brand-secondary-default","data-test":"TableView-TSpan",children:v?`${g("noumena.money.subscription.subscription.default.text")}`:`${g("noumena.money.subscription.subscription.getstarted.text")}`})})})]},C)})})]})]})}),dt=x.memo(({open:e,onClose:p,launchFrom:s,chamberIdAfterCreatingNoum:m,chamber_id:_,noum_transaction_fee_id:h,publishAndSubscribeNoum:u,launchScreen:b,itemType:y,closeNoumRenewModal:f})=>{const d=K(),[T,w]=x.useState(""),[A,M]=x.useState(!1),{plans:{monthly:P,yearly:R},loading:D}=Ge(),E=d===H.MOBILE,[N,a]=x.useState($.MONTHLY),C=n=>{a(n)},L=x.useMemo(()=>{const n=[];return P.forEach(c=>n.push(c.discount_percent??0)),R.forEach(c=>n.push(c.discount_percent??0)),Math.max(...n)},[P,R]),v=N===$.MONTHLY?P:R,U=x.useCallback(()=>{p(),f&&f()},[f,p]),o=x.useCallback(n=>{n&&(M(!0),w(n))},[]),r=()=>{M(!1);const n=document.getElementById(T);n&&n.click()};return i(te,{children:[i(se,{open:e,size:$e.XXL,enableCloseButton:!0,onClose:U,disableBackdropClick:!0,children:[t(de,{maxTitleWidth:1e3,bottomPadding:10,children:i("div",{style:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"},"data-test":"PlanPurchaseModal",children:[t(X,{height:24,"data-test":"PlanPurchaseModal-Spacer"}),t(l,{font:"heading-xs-bold","data-test":"PlanPurchaseModal-TSpan",children:g("noumena.money.subscription.subscription.purchaseplan.heading")}),t(X,{height:24,"data-test":"PlanPurchaseModal-Spacer"}),i(ze,{children:[t(pe,{active:N===$.MONTHLY,onClick:()=>C($.MONTHLY),children:t(l,{font:"body-m-bold",colorToken:N===$.MONTHLY?"--text-tab-chips-brand-primary-selected":"--text-tab-basic-neutral-default","data-test":"PlanPurchaseModal-TSpan",children:g("noumena.money.subscription.subscription.purchaseplan.tab.one.text")})}),i(pe,{active:N===$.YEARLY,onClick:()=>C($.YEARLY),children:[t(l,{font:"body-m",colorToken:N===$.YEARLY?"--text-tab-chips-brand-primary-selected":"--text-tab-basic-neutral-default","data-test":"PlanPurchaseModal-TSpan",children:g("noumena.money.subscription.subscription.purchaseplan.tab.two.text")}),!!L&&t(We,{children:t(l,{font:"footnote-bold",colorToken:"--text-tag-brand-primary-default","data-test":"PlanPurchaseModal-TSpan",children:E?"Save!":g("noumena.money.subscription.subscription.purchaseplan.tab.two.discount.text",{discount:L})})})]})]}),t(X,{height:24,"data-test":"PlanPurchaseModal-Spacer"})]})}),t(le,{align:"center",overflow:"hidden",children:i(qe,{children:[!E&&t(ot,{loading:D,toggleButtonState:N,plans:v,launchFrom:s,itemType:y,launchScreen:b,onClosePurchasePlanModal:U,chamberIdAfterCreatingNoum:m,publishAndSubscribeNoum:u,chamber_id:_,noum_transaction_fee_id:h,onPlanPurchase:o,"data-test":"PlanPurchaseModal-TableView"}),D&&E&&Ue.map(()=>t(Pe,{"data-test":"PlanPurchaseModal-SubscriptionCardSkeleton"})),!D&&E&&v.map(n=>t(nt,{spotlighted:!!n.spotlight,planName:n.plan_name,isStarter:n.plan_name==="Starter",transactionFee:n.percent_fee,discountPercent:n.discount_percent,noumSetup:n.noum_setup,noumRenewal:n.noum_renewal,billingCycle:n.billing_cycles,isInstallment:N===$.MONTHLY,currency:n.currency_code,planId:n.plan_name_id,onClosePurchasePlanModal:U,launchFrom:s,price:n.price,renewPrice:n.renew_price,planValidityInMonths:n.plan_validity_months,chamber_id:_,noum_transaction_fee_id:h,chamberIdAfterCreatingNoum:m,publishAndSubscribeNoum:u,launchScreen:b,itemType:y,onPlanPurchase:o,"data-test":"PlanPurchaseModal-SubscriptionCard"}))]})}),!D&&t(ce,{justifyContent:"center",flexDirection:"column",marginTop:E?void 0:0})]}),i(se,{open:A,enableCloseButton:!0,onClose:()=>M(!1),children:[t(de,{}),t(le,{align:"center",style:{width:E?"300px":"",paddingTop:E?"20px":""},children:t(l,{font:"body-m",textAlign:"center","data-test":"PlanPurchaseModal-TSpan",children:"Please do not edit your email in plan checkout page"})}),t(ce,{justifyContent:"center",children:t(ee,{onClick:r,secondary:!0,rightIcon:t(Ye,{name:"chevron_right_m",size:24,"data-test":"PlanPurchaseModal-Icon"}),"data-test":"PlanPurchaseModal-Button"})})]})]})});export{Fe as B,He as C,dt as P,ne as S,Y as a,_e as b,Te as c,we as d,Z as e,O as f,oe as u};
//# sourceMappingURL=index-ea5d695b.js.map
