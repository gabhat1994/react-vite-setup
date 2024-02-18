import{w as ee,v as oe,f as ve,R as N,j as t,B as L,c as l,x as re,T as E,aa as j,b as Q,I as w,ab as O,S as M,u as le,e as r,s as k,m as F,ku as We,F as se,aQ as Ne,kv as Ae,hE as Ce,kf as Fe,hC as ue,kw as Y,kx as he,n as te,gS as Oe,am as $e,gT as Re,a as ze,d as He,f1 as Ue,O as De,o as Ve,p as Qe}from"./index-cd84bcc9.js";import{r as c,a9 as X,B as f,C as S,al as ge,f as je,ar as ae,l as Xe}from"./vendor-51460554.js";import{M as fe}from"./index-a497727f.js";import{g as Me,e as Ye}from"./storyblok-c16fb040.js";import{A as me,L as Ge,a as qe,H as Je,B as Ke,b as Ze,S as et,F as tt,T as at,c as nt,d as it,e as ot,f as rt,g as lt,h as st}from"./styles-bb1463e2.js";import{S as de,a as ce}from"./swiper-slide-dfb916a5.js";import{C as dt}from"./constants-ab41c274.js";import{T as ne,a as ct}from"./index-594821a1.js";import{C as $,a as R,b as P,c as G,H as q,S as ke,R as pt,E as _e,W as ut,T as ye,d as ie,e as ht}from"./styles-0f5f7d9d.js";import"./helper-53a5becb.js";import"./OtpInput-6d75f9c8.js";import"./SetupPin-06f1ecff.js";import{u as gt,T as ft}from"./TokenModal-504d4668.js";import{u as mt}from"./useGenerateTokenForCQ-2d299743.js";import{C as yt,a as xt}from"./ChamberBox-e4d36ac9.js";import"./sideNavItems-22800105.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./styles-3ceda759.js";import"./useInvoice-3a46c6ed.js";import"./types-3fb18ef5.js";import"./done-439b31ee.js";import"./Radiobox-c1e62033.js";import"./main-wallet-6d7dbd11.js";import"./getTimeStampForDisplaying-22d5ca9d.js";import"./capitalizeFirstLetter-92ef0abb.js";import"./SkeletonChamberBox-5e97f066.js";import"./consts-be860660.js";import"./useTimeIndicator-3b8ca7e8.js";const bt=e=>{const{flags:o}=ee(),{addToast:a}=oe(),{isActive:i}=ve(),[g,d]=c.useState(void 0),s=X();c.useEffect(()=>{(async()=>{var h;const{data:m}=await Me(e.data.Article.cached_url);d((h=m==null?void 0:m.story)==null?void 0:h.content)})()},[e.data.Article.cached_url]);const p=c.useCallback(x=>{s({pathname:N.MONEY_ARTICLE,search:`?slug=${x}`})},[s]);return g?l(me,{isAppUiV2:o.newAppNavigation,"data-test":"Article-ArticleContainer",children:[t(qe,{"data-test":"Article-ArticleHeader",children:t(re,{"data-test":"Article-Stack",children:t(Je,{"data-test":"Article-HeaderText",children:t(E,{font:"body-l-bold",colorToken:"--text-body-neutral-highlighted","data-test":"Article-TSpan",children:g.Title})})})}),t(Ke,{"data-test":"Article-BodyTextArticle",children:t(E,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"Article-TSpan",children:g.Short_Description})}),t(Ze,{"data-test":"Article-ButtonContainer",children:t(L,{secondary:!0,size:"full_small",onClick:()=>{i?p(e.data.Article.cached_url):a("error","none",`${f("noumena.money.setup_wallet.not.authorized")}`)},"data-test":"Article-Button",children:g.Main_Button_Label})})]}):t(me,{isAppUiV2:o.newAppNavigation,"data-test":"Article-ArticleContainer",children:t(Ge,{"data-test":"Article-LoadingContainer",children:t(L,{neutral:!0,loading:!0,"data-test":"Article-Button"})})})},St=({SwiperSlidesOptions:e,slidesPerView:o,handleHidePadding:a})=>{const[i,g]=c.useState(!0),[d,s]=c.useState(!1),[p,x]=c.useState(),m=j(),h=Q(()=>{p&&!p.destroyed&&(p.slidePrev(),s(!1))}),A=Q(()=>{p&&!p.destroyed&&(p.slideNext(),g(!1))}),y=e?(e==null?void 0:e.length)>o:!1;return l(de,{slidesPerView:o,spaceBetween:16,freeMode:!0,className:"mySwiper",onInit:u=>x(u),onReachBeginning:()=>g(!0),onActiveIndexChange:({activeIndex:u})=>a(u),onReachEnd:()=>{((p==null?void 0:p.progress)||0)>.5&&s(!0)},onSliderMove:({progress:u})=>a(u),"data-test":"SwiperComponent-Swiper",children:[l(et,{"data-test":"SwiperComponent-StyledSwiperControls",children:[y&&l("div",{className:"swiper-icons",children:[t("div",{className:"stepper",children:t(w,{className:i?"disabled":"",name:"chevron_left_m",size:16,color:"--icon-button-neutral-alt-default",onClick:h,"data-test":"SwiperComponent-Icon"})}),t("div",{className:"stepper",children:t(w,{className:d?"disabled":"",name:"chevron_right_m",size:16,color:"--icon-button-neutral-alt-default",onClick:A,"data-test":"SwiperComponent-Icon"})})]}),m!==O.MOBILE&&t(M,{height:36,"data-test":"SwiperComponent-Spacer"})]}),e==null?void 0:e.map(u=>t(ce,{"data-test":"SwiperComponent-SwiperSlide",children:u},u.key))]})};function wt(e,o){let a=1;return o?(a=1.25,e>=r.TABLET&&e<r.LAPTOP?a=2.5:e>=r.LAPTOP&&e<r.LAPTOP_SM?a=1.75:e>=r.LAPTOP_SM&&e<r.LAPTOP_L?a=2.25:e>=r.LAPTOP_L&&(a=2.75)):(a=1,e>r.LAPTOP_M?a=2.4:e<=r.LAPTOP_M&&e>r.LAPTOP_M-30?a=2.1:e<=r.LAPTOP_M-30&&e>r.LAPTOP_SM+90?a=1.9:e<=r.LAPTOP_SM+90&&e>r.LAPTOP_SM+30?a=1.7:e<=r.LAPTOP_SM+30&&e>r.LAPTOP_SM?a=1.6:e<=r.LAPTOP_SM&&e>r.LAPTOP+100?a=1.5:e<=r.LAPTOP+100&&e>r.LAPTOP+66?a=1.4:e<=r.LAPTOP+66&&e>r.TABLET_L?a=1.15:e<=r.TABLET_L&&e>r.TABLET+152||e<=r.TABLET+152&&e>r.TABLET+112?a=2.3:e<=r.TABLET+112&&e>r.TABLET+52?a=2.1:e<=r.TABLET+52&&e>r.TABLET-48?a=1.8:e<=r.TABLET-48&&e>r.MOBILE_MAX-100?a=1.63:e<=r.MOBILE_MAX-100&&e>r.MOBILE_MAX-148?a=1.51:e<=r.MOBILE_MAX-148&&e>r.MOBILE_L+155?a=1.4:e<=r.MOBILE_L+155&&e>r.MOBILE_L+75?a=1.1:e<=r.MOBILE_L+75&&e>r.MOBILE_L+15?a=1:e<=r.MOBILE_L+15&&e>r.MOBILE_S?a=.9:e<=r.MOBILE_S&&(a=.8)),a}const Tt=e=>{const{data:o}=e,[a,i]=c.useState(!1),{width:g}=le(),{flags:d}=ee(),s=wt(g,d.newAppNavigation),p=c.useMemo(()=>{var m;return(m=o==null?void 0:o.Financial_Solutions)==null?void 0:m.map(h=>t(bt,{data:h,"data-test":"FinancialSolutionHeader-SwiperSlidesOptions-Article"},h.Article.id))},[o==null?void 0:o.Financial_Solutions]),x=m=>{m>0?i(!0):i(!1)};return l("div",{style:{display:"flex",flexDirection:"column"},"data-test":"FinancialSolutionHeader",children:[t(tt,{"data-test":"FinancialSolutionHeader-FinancialSolutionWrapper",children:l(at,{"data-test":"FinancialSolutionHeader-TitleWrapper",children:[t(nt,{font:"heading-m-bold",colorToken:"--text-card-header-neutral-alt-default","data-test":"FinancialSolutionHeader-Title",children:(o==null?void 0:o.Title)||""}),t(M,{height:8,"data-test":"FinancialSolutionHeader-Spacer"}),t(it,{font:"body-l",colorToken:"--text-card-brand-secondary-default","data-test":"FinancialSolutionHeader-SubTitle",children:(o==null?void 0:o.Description)||""}),t(ot,{font:"footnote-bold",colorToken:"--text-card-neutral-alt-default","data-test":"FinancialSolutionHeader-SubSubTitle",children:(o==null?void 0:o.Subtitle)||""})]})}),t(rt,{hidePadding:a,"data-test":"FinancialSolutionHeader-FinancialSolutionHeaderWrapper",children:t(lt,{"data-test":"FinancialSolutionHeader-ArticlesContainer",children:t(st,{"data-test":"FinancialSolutionHeader-ArticlesContainerFlex",children:!!(p!=null&&p.length)&&t(St,{SwiperSlidesOptions:p,slidesPerView:s,handleHidePadding:x,"data-test":"FinancialSolutionHeader-SwiperComponent"})})})})]})},vt=c.memo(Tt),xe=S.div`
  display: flex;
  font-family: var(--font-family);
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  gap: 16px;

  ${e=>e.isAppUiV2?`
  max-width: 100vw;
`:`
  @media (width: ${k.TABLET_L}) {
    width: 100%
    max-width: 925px;
  }
  @media (min-width: ${r.TABLET_L+1}px) {
    width: calc(100vw - 512px);
  }
  @media (min-width: ${k.LAPTOP_L}) {
    max-width: 925px;
  }
  @media (max-width: ${F.TABLET_MAX}) {
    margin-bottom: 60px;
  }
`}
`,Z=S.div`
  ${e=>!e.isAppUiV2&&`
  @media only screen and (max-width: ${k.TABLET_L}) and (min-width: ${k.TABLET}) {
    padding: 0 16px;
  }
`}
`,At=S.div`
  width: 288px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: ${F.TABLET_MAX}) {
    display: none;
  }
`,Ct=()=>{const{flags:{payments:e}}=ee(),[o,{loading:a}]=We(),i=X(),g=j(),{addToast:d}=oe(),[s,p]=c.useState(!1),x=c.useCallback(()=>{if(s){i(N.WALLET_SETUP);return}d("error","none",`${f("noumena.money.setup_wallet.not.authorized")}`)},[s,d,i]);return c.useEffect(()=>{o({fetchPolicy:"network-only",onCompleted(m){var h;(h=m.currentUser)!=null&&h.userStatus&&m.currentUser.userStatus==="ACTIVE"&&p(!0)}})},[o]),l($,{style:{height:"100%"},children:[t(R,{children:t(P,{font:"body-l-bold",colorToken:"--text-card-header-neutral-highlighted",children:f("noumena.money.wallet.title")})}),l(G,{style:g===O.TABLET?{height:"100%",width:"50%",alignSelf:"center"}:void 0,children:[t(w,{name:"wallet_m",size:96,color:"--icon-card-placeholder-neutral-default","data-test":"Setup-Icon"}),t(M,{height:16,"data-test":"Setup-Spacer"}),t(q,{font:"body-m",colorToken:"--text-placeholder-neutral-default",children:f("noumena.money.wallet.helperText")})]}),t(ke,{"data-testid":"money-wallet-setup-button",children:t(L,{secondary:!0,onClick:x,size:"full_small",loading:a,disabled:!e,"data-test":"Setup-Button",children:f("noumena.money.wallet.button.setup.wallet")})})]})},Mt=({refetchWallet:e,allowRefetch:o})=>{const a=()=>{e()};return l($,{style:{height:"100%",display:"flex",justifyContent:"space-around"},children:[t(R,{children:t(P,{font:"body-l-bold",colorToken:"--text-card-header-neutral-highlighted",children:f("noumena.money.wallet.title")})}),t(M,{height:16,"data-test":"Processing-Spacer"}),l(G,{style:{gap:"16px"},children:[t(P,{style:{width:"100%"},font:"body-l-bold",colorToken:"--text-card-header-neutral-highlighted",children:f("noumena.money.wallet.processing.titile")}),t(M,{height:12,"data-test":"Processing-Spacer"}),l(q,{font:"body-m",colorToken:"--text-placeholder-neutral-default",children:[f("noumena.money.wallet.processing.sub.titile"),"."," ",o&&l(se,{children:[" ","Click",l(pt,{onClick:a,children:[" ","refresh"," "]}),"to view the latest status."," "]})]})]})]})},be=({helperText:e,buttonText:o,onNavigate:a})=>{const i=j();return l($,{style:{height:"100%"},children:[t(R,{children:t(P,{font:"body-l-bold",colorToken:"--text-card-header-neutral-highlighted",children:f("noumena.money.wallet.title")})}),l(G,{style:i===O.TABLET?{height:"100%",width:"50%",alignSelf:"center"}:void 0,children:[t(P,{font:"body-l-bold",colorToken:"--text-card-header-neutral-highlighted",children:f("noumena.money.wallet.verification.sub.title")}),t(M,{height:16,"data-test":"Verification-Spacer"}),t(q,{font:"body-m",colorToken:"--text-placeholder-neutral-default",children:e})]}),t(ke,{"data-testid":"money-wallet-setup-button",children:t(L,{secondary:!0,size:"full_small",onClick:a,"data-test":"Verification-Button",children:o})})]})},kt=()=>l($,{style:{height:"100%",display:"flex",justifyContent:"space-around"},children:[t(R,{children:t(P,{font:"body-l-bold",colorToken:"--text-card-header-neutral-highlighted",children:f("noumena.money.wallet.title")})}),t(M,{height:16,"data-test":"Rejected-Spacer"}),l(G,{style:{gap:"16px"},children:[t(P,{style:{width:"100%"},font:"body-l-bold",colorToken:"--text-card-header-neutral-highlighted",children:f("noumena.money.wallet.rejected.title")}),t(M,{height:12,"data-test":"Rejected-Spacer"}),t(q,{font:"body-m",colorToken:"--text-placeholder-neutral-default",children:f("noumena.money.wallet.rejected.sub.title")})]})]}),_t=({total:e,handlePayment:o})=>{const a=X(),i=c.useCallback(async()=>{a(N.MONEY_DETAILS)},[a]);return l($,{children:[l(R,{children:[t(P,{font:"body-l-bold",colorToken:"--text-card-header-neutral-highlighted",children:f("noumena.money.wallet.title")}),t(L,{size:"small",style:{width:"40px",height:"40px"},leftIcon:t(w,{name:"arrow_right_m",size:24,color:"--icon-button-neutral-default","data-test":"Active-Icon"}),"data-testid":"stepTwoBackButton",tertiary:!0,onClick:()=>i(),"data-test":"Active-Button"})]}),l(G,{children:[t(E,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"Active-TSpan",children:f("noumena.money.wallet.verification.total.balance")}),t(M,{height:2,"data-test":"Active-Spacer"}),t(E,{font:"heading-m",colorToken:"--text-card-neutral-highlighted","data-test":"Active-TSpan",children:Ne(e?e.value:0,e==null?void 0:e.currency,2)}),t(M,{height:16,"data-test":"Active-Spacer"}),l(re,{fullWidth:!0,gap:10,align:"center",justify:"center",style:{paddingLeft:"16px",paddingRight:"16px"},"data-test":"Active-Stack",children:[t(L,{size:"full_small",secondary:!0,leftIcon:t(w,{name:"transfer_m",size:24,color:"--icon-button-brand-secondary-default","data-test":"Active-Icon"}),onClick:()=>o(ne.TRANSFER),"data-test":"Active-Button",children:f("noumena.money.transer")}),t(L,{onClick:()=>o(ne.PAY),size:"full_small",secondary:!0,leftIcon:t(w,{name:"pay",size:24,color:"--icon-button-brand-secondary-default","data-test":"Active-Icon"}),"data-testid":"active-wallet-pay","data-test":"Active-Button",children:f("noumena.money.pay")})]})]})]})},Lt=e=>!Object.values(Ae).includes(e),Bt=e=>e===Ce.CUSTOMER_NOT_CREATED,Se={canUploadDocument:Lt,canCreateWallet:Bt},Et=()=>{var I;const{data:e,refetch:o,networkStatus:a,error:i}=Fe({fetchPolicy:"cache-and-network",notifyOnNetworkStatusChange:!0}),{isPending:g}=ve(),d=X(),s=c.useCallback(()=>{d(N.APPLICATION_REVIEW)},[d]),p=c.useCallback(()=>{d(N.WALLET_SETUP_RETRY)},[d]),{status:x,docStatus:m,customerType:h,noumenaStatus:A,providerStatus:y}=(e==null?void 0:e.getWalletBalance)||{},u=Se.canCreateWallet(x||""),T=A===ue.REJECTED||y===Y.DEACTIVATED||y===Y.SUSPENDED,C=h===he.UNVERIFIED||y===Y.RETRY&&m!==Ae.UPLOADED,n=(y===Y.VERIFIED||y===Y.DOCUMENT)&&h===he.VERIFIED&&Se.canUploadDocument(m||""),v=A===ue.APPROVED,z=!C&&!n&&!v&&!T&&x!==Ce.CUSTOMER_NOT_CREATED,H=(I=e==null?void 0:e.getWalletBalance)==null?void 0:I.total,U=!y,D=g?f("noumena.money.setup_wallet.not.authorized.v2"):f("noumena.money.setup_wallet.error.generic");return{refetch:o,loading:a===ge.loading||a===ge.refetch,canRefreshWallet:U,wallet:{balance:H},render:{createWallet:u,walletRejected:T,walletRetry:C,uploadDocument:n,showWallet:v,walletProcessing:z,errorScreen:{show:!!i,errorMessage:D}},goTo:{applicationReview:s,walletSetupRetry:p}}},Pt=({message:e})=>t(_e,{"data-test":"Error-EmptyWalletCard",children:t(q,{font:"body-m",colorToken:"--text-placeholder-neutral-default","data-test":"Error-HelperText",children:e})}),Le=()=>{const[e,o]=c.useState(!1),[a,i]=c.useState(ne.PAY),{refetch:g,render:d,loading:s,goTo:p,wallet:x,canRefreshWallet:m}=Et(),h=u=>{i(u),o(!0)},A=()=>{o(!1),g()};return l(ut,{"data-test":"Wallet-WalletWrapper",children:[s?t(_e,{"data-test":"Wallet-EmptyWalletCard",children:t(te,{"data-test":"Wallet-Spinner"})}):(()=>{let u=null;return d.errorScreen.show?u=t(Pt,{message:d.errorScreen.errorMessage,"data-test":"Wallet-getWallet-Error"}):d.createWallet?u=t(Ct,{"data-test":"Wallet-getWallet-Setup"}):d.showWallet?u=t(_t,{handlePayment:h,total:x.balance,"data-test":"Wallet-getWallet-Active"}):d.walletRejected?u=t(kt,{"data-test":"Wallet-getWallet-Rejected"}):d.uploadDocument?u=t(be,{helperText:f("noumena.money.wallet.verification.helper.text"),buttonText:f("noumena.money.wallet.verification.button.title"),onNavigate:p.applicationReview,"data-test":"Wallet-getWallet-Verification"}):d.walletRetry?u=t(be,{helperText:f("noumena.money.wallet.verification.retry_helper.text"),onNavigate:p.walletSetupRetry,buttonText:f("noumena.money.wallet.verification.button.retry_title"),"data-test":"Wallet-getWallet-Verification"}):u=t(Mt,{refetchWallet:g,allowRefetch:m,"data-test":"Wallet-getWallet-Processing"}),u})(),e&&t(ct,{type:a,open:e,handleClose:A,"data-test":"Wallet-TransactionModal"})]})},It=S.input`
  border: 0;
  color: var(--text-card-neutral-default);
  font-style: normal;
  font-weight: var(--font-body-medium-regular-weight);
  font-size: var(--font-body-medium-size);
  outline: none;
  display: inline-flex;
  align-items: center;
  width: 30%;
`,Wt=S(w)`
  transition: transform 0.3s;
  ${({isOpen:e})=>e&&"transform: rotate(180deg)"};
  // padding: -4px;
  // width: 9.2px !important;
  // height: 5.2px !important;
  align-self: center;
`,Be=()=>{const e="https://noudev-cq-portal.noumenati.com/",o=j(),[a]=Oe(),{cqData:i}=gt(),{addToast:g}=oe(),d=mt(),[s,p]=c.useState({label:"",key:"",type:"value",value:""}),[x,m]=c.useState(!1);c.useEffect(()=>{const u={...s,key:(i==null?void 0:i.visibility).charAt(0).toUpperCase()+(i==null?void 0:i.visibility).slice(1),type:"value",value:(i==null?void 0:i.visibility).charAt(0).toUpperCase()+(i==null?void 0:i.visibility).slice(1)};p(u)},[i]);const h=[{key:"private",label:t(E,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"CapitalQuotient-options-TSpan",children:f("noumena.money.cq.private")}),type:"value",value:"private"},{key:"public",label:t(E,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"CapitalQuotient-options-TSpan",children:f("noumena.money.cq.public")}),type:"value",value:"public"}],A=c.useCallback(async()=>{const{token:u,error:T}=await d();if(u){const C=`${e}?access_token=${u}`;window.open(C,"_blank")}T&&g("error","none",`${T.message}`)},[g,e,d]),y=c.useCallback(async u=>{p(u),await a({variables:{input:{noumId:i.noumId||"",visibility:u.value.toUpperCase()}},onError:({networkError:T=null,graphQLErrors:C=[]})=>{const[n]=C;je(new Error((n==null?void 0:n.message)??T),{tags:{section:"deleteQuestionMutation"}})}})},[i.noumId,a]);return l($,{style:{padding:0},children:[l(R,{style:{padding:"16px 16px 16px 16px"},children:[t(P,{font:"body-l-bold",colorToken:"--text-card-header-neutral-highlighted",children:f("noumena.money.wallet.capitalquotient")}),t(L,{size:"small",style:{width:"40px",height:"40px"},leftIcon:t(w,{name:"arrow_right_m",size:24,color:"--icon-button-neutral-default","data-test":"CapitalQuotient-Icon"}),"data-testid":"stepTwoBackButton",tertiary:!0,onClick:()=>A(),"data-test":"CapitalQuotient-Button"})]}),t(M,{height:o===O.MOBILE?8:10,"data-test":"CapitalQuotient-Spacer"}),i.fetching&&t(te,{"data-test":"CapitalQuotient-Spinner"}),!i.fetching&&l(se,{children:[t(E,{style:{paddingLeft:"16px"},font:"heading-m",colorToken:"--text-card-neutral-highlighted","data-test":"CapitalQuotient-TSpan",children:i.score}),l(ye,{style:{paddingBottom:"4px"},children:[i.status!=="InComplete"&&l(ie,{font:"body-m",colorToken:"--text-card-neutral-default",children:[t(w,{name:"check_xs",size:16,color:"--icon-card-neutral-default","data-test":"CapitalQuotient-Icon"}),i.status]}),i.status==="InComplete"&&Number(i.score)<500&&t(ht,{font:"body-m",colorToken:"--text-card-neutral-highlighted",children:f("noumena.money.cq.incomplete_displayText")})]}),t(ye,{children:t($e,{hideIcons:!0,inputValue:(s==null?void 0:s.value).charAt(0).toUpperCase()+(s==null?void 0:s.value).slice(1),options:h,onSelectOption:u=>{y(u)},onOpen:()=>m(!0),onClose:()=>m(!1),renderContainerFromBottom:!0,"data-test":"CapitalQuotient-Dropdown",children:({inputProps:u,inputRef:T,toggle:C})=>l(ie,{font:"body-m",colorToken:"--text-card-neutral-default",children:[t(It,{...u,ref:T,"data-test":"CapitalQuotient-PrivacyDropdownSelctedValue"}),t(Wt,{size:12,name:"chevron_down_m",color:"--icon-card-neutral-default",isOpen:x,onClick:C,"data-test":"CapitalQuotient-RightIcon"})]})})})]})]})},Ee=()=>{var s;const[e,o]=c.useState(!1),a=j(),{data:i,loading:g}=Re(),d=c.useMemo(()=>i!=null&&i.getSpaceByType&&(i!=null&&i.getSpaceByType[0])?i==null?void 0:i.getSpaceByType[0]:{token:{count:"--"}},[i]);return l($,{style:{padding:0},children:[l(R,{style:{padding:"16px 16px 16px 16px"},children:[t(P,{font:"body-l-bold",colorToken:"--text-card-header-neutral-highlighted",children:f("noumena.money.wallet.tokens")}),t(L,{size:"small",style:{width:"40px",height:"40px"},"data-testid":"stepTwoBackButton",leftIcon:t(w,{name:"arrow_right_m",size:24,color:"--icon-button-neutral-default","data-test":"Tokens-Icon"}),tertiary:!0,onClick:()=>o(!0),"data-test":"Tokens-Button"})]}),t(M,{height:a===O.MOBILE?8:10,"data-test":"Tokens-Spacer"}),t(ie,{font:"body-m",colorToken:"--text-card-neutral-default",style:{paddingLeft:"16px",alignSelf:"flex-start"},children:f("noumena.money.tokens.subheading")}),t(E,{style:{paddingLeft:"16px",paddingBottom:"16px"},font:"heading-m",colorToken:"--text-card-neutral-highlighted","data-test":"Tokens-TSpan",children:g?"...":(s=d.token)==null?void 0:s.count}),t(ft,{open:e,onClose:()=>o(!1),"data-test":"Tokens-TokenModal"})]})},we=()=>l(At,{"data-test":"PaymentSideBar-PaymentSideBarWrapper",children:[t(Le,{"data-test":"PaymentSideBar-Wallet"}),t(Be,{"data-test":"PaymentSideBar-CapitalQuotient"}),t(Ee,{"data-test":"PaymentSideBar-Tokens"})]}),Nt=S.div`
  width: 100%;
  display: flex;
  gap: 16px;
  @media (min-width: 1024px) {
    display: none;
  }
  flex-direction: column;
  @media (max-width: ${F.MOBILE_L_MAX}) {
    flex-direction: column;
  }
`,Ft=S.div`
  display: flex;
  flex-grow: 1;
  // width: ${({isTablet:e})=>e?"50%":"100%"};
  width: 100%;
  flex-direction: ${({isTablet:e})=>e?"row":"column"};
  gap: 16px;
`,Ot=S.div`
  flex-grow: 1;
  display: flex;
  flex-direction: ${({isTablet:e})=>e?"row":"column"};
  gap: 16px;
`,$t=()=>{const e=j();return l(Nt,{"data-test":"PaymentMain-PaymentMainWrapper",children:[t(Ft,{isTablet:e===O.TABLET,"data-test":"PaymentMain-WalletWrapper",children:t(Le,{"data-test":"PaymentMain-Wallet"})}),l(Ot,{isTablet:e===O.TABLET,"data-test":"PaymentMain-CQTokenWrapper",children:[t(Be,{"data-test":"PaymentMain-CapitalQuotient"}),t(Ee,{"data-test":"PaymentMain-Tokens"})]})]})},Rt=S.div`
  h2 {
    margin-top: 0;
  }
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  min-width: 322px;
  min-height: 182px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  flex: none;
  flex-grow: 0;

  @media (max-width: ${k.TABLET_L}) {
    min-width: 704px;
    min-height: 160px;
  }

  @media (max-width: ${k.MOBILE_MAX}) {
    width: 100vw;
    min-width: unset;
    margin: unset;
    min-height: 182px;
    border-radius: unset;
    padding: 16px;
  }
`,zt=S.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${k.MOBILE_MAX}) {
    // padding: 16px;
    padding-bottom: 0px;
  }
`,Ht=S(E)`
  display: flex;
  @media (max-width: ${F.TABLET_MAX}) {
    width: 60%;
    font-weight: 600;
    font-size: 18px;
    line-height: 160%;
  }
  @media (max-width: ${F.MOBILE_L_MAX}) {
    display: inline-flex;
    width: 85%;
    word-break: break-word;
  }
  @media (max-width: ${F.MOBILE_L_MAX}) {
    width: 70%;
  }
  @media (max-width: ${F.MOBILE_L_MIN}) {
    width: 60%;
  }
`,Ut=S(L)`
  display: none;
`,Dt=S.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  width: 100%;
  .mySwiper {
    display: flex;
    flex-direction: column-reverse;
    .swiper-slide {
      height: auto;
    }
  }
`,Vt=S.div`
  display: flex;
  justify-content: ${({showOnlyNavigationIcons:e})=>e?"flex-end":"space-between"};
  padding-bottom: 16px;
  margin-left: -6px;
  .swiper-icons {
    display: flex;
    align-items: center;
    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .swiper-control-btn {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      gap: 10px;
      width: 40px;
      height: 40px;
      background: var(--bg-button-neutral-disabled);
      border-radius: 8px;
    }
    .show-all {
      display: flex;
      align-items: center;
      margin-left: 16px;
    }
    > div:first-of-type {
      margin-right: 8px;
    }
    @media (max-width: ${k.MOBILE_MAX}) {
      display: none;
    }
  }
`,Qt=S.div.attrs(e=>e)`
  cursor: pointer;
  box-sizing: border-box;
  height: 100%;
  padding: 8px !important;
  display: flex;
  flex-direction: column;
  padding: 0px;
  background: var(--bg-card-neutral-alt-default);
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 20px;
  &.featured {
    display: flex;
    flex-direction: row;
  }
  &.featured .article-image {
    height: 100%;
    width: 50%;
    min-width: 50%;
  }
  &.featured .article-details {
    padding: 24px;
    .title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 18px;
      line-height: 160%;
    }
    .content {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .article-image {
    border-radius: 12px;
    width: 100%;
    height: 134px;
    background: url(${e=>e.imageUrl}) no-repeat center center;
    background-size: cover;
  }
  .article-details {
    padding: 8px;
    text-align: left;
    .type {
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 160%;
      color: var(--text-card-header-neutral-default);
    }
    .title {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
      color: var(--text-card-header-neutral-highlighted);
      ${ze}
    }
    .content {
      padding-top: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      color: var(--text-card-neutral-default);
      opacity: 0.75;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .link {
      padding-top: 0.75rem;
      display: flex;
      align-items: center;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 100%;
      color: var(--text-button-brand-primary-default);
      > div {
        padding-left: 8px;
      }
    }
  }
`,jt=[{name:"test1",image:"terms_m",text:"Knowledge Base",labelSize:"auto"}],Xt=e=>{const{t:o}=ae(),a=X(),[i,g]=c.useState(!0),[d,s]=c.useState(!1),{articles:p,showOnlyNavigationIcons:x,showCategory:m}=e,[h,A]=c.useState([]),[y,u]=c.useState(),[T,C]=c.useState(0),{width:n}=le();let v=3;n<r.TABLET&&(v=1.25),c.useEffect(()=>{(async()=>{const W=await Promise.allSettled((p==null?void 0:p.map(async b=>{var _;return Me((_=b==null?void 0:b.Link)==null?void 0:_.cached_url)}))||[]),V=W==null?void 0:W.map(b=>{var J,K;const _=b;return((K=(J=_==null?void 0:_.value)==null?void 0:J.data)==null?void 0:K.story)||null});A([...V])})()},[p]);const z=Q(()=>{a(N.ARTICLES)}),H=Q(()=>{y&&!y.destroyed&&(y.slidePrev(),s(!1))}),U=Q(()=>{y&&!y.destroyed&&(y.slideNext(),g(!1))}),D=B=>{C(Number(B))},I=(h==null?void 0:h.length)>v;return t(se,{children:l(de,{slidesPerView:v,spaceBetween:16,freeMode:!0,className:"mySwiper",onInit:B=>u(B),onReachBeginning:()=>g(!0),onReachEnd:()=>{((y==null?void 0:y.progress)||0)>.5&&s(!0)},"data-test":"SwiperFreeMode-Swiper",children:[l(Vt,{showOnlyNavigationIcons:x,"data-test":"SwiperFreeMode-StyledSwiperControls",children:[x||t(He,{onChange:D,selectedId:T.toString(),mode:"isBackground",isWithoutImage:!0,inputList:jt,fontSize:"--font-link-medium-size","data-test":"SwiperFreeMode-BasicChipsTabsForm"}),l("div",{className:"swiper-icons",children:[I&&t(w,{className:`swiper-control-btn ${i?"disabled":""}`,name:"chevron_left_m",size:16,color:i?"--icon-button-neutral-disabled":"--icon-button-neutral-default",onClick:H,"data-test":"SwiperFreeMode-Icon"}),I&&t(w,{className:`swiper-control-btn ${d?"disabled":""}`,name:"chevron_right_m",size:16,color:d?"--icon-button-neutral-disabled":"--icon-button-neutral-default",onClick:U,"data-test":"SwiperFreeMode-Icon"}),x||t(L,{className:"show-all",textOnly:!0,onClick:z,rightIcon:t(w,{name:"chevron_right_m",size:16,color:"--icon-button-brand-primary-default","data-test":"SwiperFreeMode-Icon"}),"data-test":"SwiperFreeMode-Button",children:o("noumena.home.show_all")})]})]}),h==null?void 0:h.map((B,W)=>{var pe;const{id:V,content:b,full_slug:_}=B,J=(pe=b==null?void 0:b.Main_Image)==null?void 0:pe.filename,K=b==null?void 0:b.Title,Pe=b==null?void 0:b.Short_Description,Ie=Xe.capitalize((b==null?void 0:b.Main_Category.split("_").join(" "))||"");return t(ce,{"data-test":"SwiperFreeMode-SwiperSlide",children:l(Qt,{imageUrl:J,onClick:()=>{a({pathname:N.ARTICLE,search:`?slug=${_}`})},"data-test":"SwiperFreeMode-StyledCard",children:[t("div",{className:"article-image"}),l("div",{className:"article-details",children:[m&&t("div",{className:"type",children:Ie}),t("div",{className:"title",children:K}),t("div",{className:"content",children:Pe})]})]})},`${W+0}-${V}`)})]})})};function Te({data:e,showOnlyNavigationIcons:o=!1,showCategory:a=!0}){const{t:i}=ae(),g=X(),d=e==null?void 0:e.Title,s=(e==null?void 0:e.Articles)||[],p=Q(()=>{g(N.ARTICLES)});return s&&(s!=null&&s.length)?l(Rt,{"data-testid":"onboarding-section-testid","data-test":"StyledHowItWorksSection",children:[l(zt,{"data-test":"HeaderWrapper",children:[t(Ht,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"HeaderTitle",children:d}),t(Ut,{className:"show-all",textOnly:!0,onClick:p,rightIcon:t(w,{name:"chevron_right_m",size:16,color:"--icon-button-brand-primary-default","data-test":"Icon"}),"data-test":"ShowAllButton",children:i("noumena.home.show_all")})]}),t(Dt,{"data-test":"StyledCardsSection",children:t(Xt,{articles:s,showOnlyNavigationIcons:o,showCategory:a,"data-test":"SwiperFreeMode"})})]}):null}const Yt=S.div`
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  min-width: 322px;
  min-height: 182px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  flex: none;
  flex-grow: 0;
  @media (max-width: ${k.TABLET_L}) {
    min-width: 704px;
    min-height: 160px;
  }

  @media (max-width: ${k.MOBILE_MAX}) {
    width: 100vw;
    min-width: unset;
    margin: unset;
    min-height: 182px;
    border-radius: unset;
    margin-bottom: 16px;
    padding: 16;
  }
`,Gt=S.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  width: 100%;
  .mySwiper {
    display: flex;
    flex-direction: column-reverse;
    @media (max-width: 767px) {
      flex-direction: column;
    }
  }
`,qt=S.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  @media (max-width: ${k.MOBILE_MAX}) {
    padding: 16px;
  }
`,Jt=S.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 16px;
  margin-left: -6px;
  .swiper-icons {
    display: flex;
    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .swiper-control-btn {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      gap: 10px;
      width: 40px;
      height: 40px;
      background: var(--bg-button-neutral-default);
      border-radius: 8px;
    }
    .show-all {
      cursor: pointer;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 100%;
      color: var(--text-button-brand-primary-default);
      margin-left: 16px;
    }
    > div:first-of-type {
      margin-right: 8px;
    }
    @media (max-width: ${k.MOBILE_MAX}) {
      display: none;
    }
  }
`;S.div.attrs(e=>e)`
  cursor: pointer;
  padding: 8px !important;
  display: flex;
  flex-direction: column;
  padding: 0px;
  background: var(--bg-card-neutral-alt-default);
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 20px;
  .cover {
    height: 56px;
    background-color: ${e=>`var(${e.backgroundColor})`};
    border-radius: 12px;
  }
`;const Kt=S(re)`
  position: relative;
  padding: 5px;
  height: 245px;
`,Zt=({recommendedNoumIds:e})=>{const[o]=Ue(),[a,i]=c.useState([]),[g,d]=c.useState(0),[s,p]=c.useState(!0),[x,m]=c.useState(!1),[h,A]=c.useState();c.useEffect(()=>{g<e.length&&o({variables:{id:e[g]},onCompleted(n){i(v=>[...v,n.getSpaceById]),d(v=>v+1)}})},[o,g,e]);const{width:y}=le(),{t:u}=ae();let T=3;y<r.TABLET&&(T=1.25);const C=(a==null?void 0:a.length)>T;return a.length?l(de,{slidesPerView:T,spaceBetween:16,freeMode:!0,className:"mySwiper",onInit:n=>A(n),onReachBeginning:()=>p(!0),onReachEnd:()=>{((h==null?void 0:h.progress)||0)>.5&&m(!0)},"data-test":"SwiperFreeMode-Swiper",children:[C&&t(Jt,{"data-test":"SwiperFreeMode-StyledSwiperControls",children:l("div",{className:"swiper-icons",children:[t(w,{className:`swiper-control-btn ${s?"disabled":""}`,name:"chevron_left_m",size:16,color:s?"--icon-button-neutral-disabled":"--icon-button-neutral-default",onClick:()=>{h&&!h.destroyed&&(h.slidePrev(),m(!1))},"data-test":"SwiperFreeMode-Icon"}),t(w,{className:`swiper-control-btn ${x?"disabled":""}`,name:"chevron_right_m",size:16,color:x?"--icon-button-neutral-disabled":"--icon-button-neutral-default",onClick:()=>{h&&!h.destroyed&&(h.slideNext(),p(!1))},"data-test":"SwiperFreeMode-Icon"})]})}),a==null?void 0:a.map(n=>{var z,H,U,D,I,B,W,V,b,_;const v=n==null?void 0:n._id;return t(ce,{"data-test":`SwiperFreeMode-SwiperSlide-${v}`,children:t(dt,{isBordered:!0,"data-test":"SwiperFreeMode-ChamberItem",children:t(yt,{id:n==null?void 0:n._id,chamberUrl:`/noum/${v}`,url:(n==null?void 0:n.profileImage)??void 0,ownerImageURL:((H=(z=n==null?void 0:n.uid)==null?void 0:z.profile)==null?void 0:H.profilePicture)||De,title:((U=n==null?void 0:n.uid)==null?void 0:U.title)||"",chamberTitle:(n==null?void 0:n.name)||"",name:((I=(D=n==null?void 0:n.category)==null?void 0:D.name)==null?void 0:I.toLowerCase())||xt.member,ownedby:(n==null?void 0:n._id)===((B=n==null?void 0:n.uid)==null?void 0:B._id)?u("noumena.you"):Ve((W=n==null?void 0:n.uid)==null?void 0:W.firstName,(V=n==null?void 0:n.uid)==null?void 0:V.middleName,(b=n==null?void 0:n.uid)==null?void 0:b.lastName)??void 0,archived:(n==null?void 0:n.status)===Qe.Archived,followers:(n==null?void 0:n.followersCount)||0,location:((_=n==null?void 0:n.uid)==null?void 0:_.location)??void 0,"data-test":"SwiperFreeMode-ChamberBox"})},`${n==null?void 0:n._id}-${n==null?void 0:n.name}`)},v)})]}):t(Kt,{"data-test":"SwiperFreeMode-SpinnerContainer",children:t(te,{"data-test":"SwiperFreeMode-Spinner"})})};function ea({recommendedNoumIds:e,storyBlockTitle:o}){const{t:a}=ae();return l(Yt,{"data-testid":"noums-for-you-section-testid","data-test":"StyledNoumsForYouSection",children:[t(qt,{"data-test":"HeaderWrapper",children:t(E,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"TSpan",children:o||a("noumena.home.recommended.noums.header")})}),t(Gt,{"data-test":"StyledCardsSection",children:t(Zt,{recommendedNoumIds:e,"data-test":"SwiperFreeMode"})})]})}const ta=()=>{const[e,o]=c.useState(),{flags:a}=ee();c.useEffect(()=>{async function g(){var s;const{data:d}=await Ye();o((s=d==null?void 0:d.story)==null?void 0:s.content)}g()},[]);const i=c.useMemo(()=>{var d,s;return(d=e==null?void 0:e.Money_Page_Layout[1])!=null&&d.Description?(s=e==null?void 0:e.Money_Page_Layout[1])==null?void 0:s.Description.split(",").map(p=>p.trim()):[]},[e]);return e?t(fe,{type:"Money",rightContent:t(we,{"data-test":"Money-PaymentSideBar"}),"data-testid":"money-layout","data-test":"Money-MoneyLayout",children:l(xe,{isAppUiV2:a.newAppNavigation,"data-test":"Money-MoneyWrapper",children:[t(vt,{data:(e==null?void 0:e.Money_Page_Header[0])||void 0,"data-test":"Money-FinancialSolutionHeader"}),t(Z,{isAppUiV2:a.newAppNavigation,"data-test":"Money-SectionWarpper",children:t($t,{"data-test":"Money-PaymentMain"})}),t(Z,{isAppUiV2:a.newAppNavigation,"data-test":"Money-SectionWarpper",children:t(Te,{data:e==null?void 0:e.Money_Page_Layout[0],showOnlyNavigationIcons:!0,showCategory:!1,"data-test":"Money-HowItWorksSection"})}),t(Z,{isAppUiV2:a.newAppNavigation,"data-test":"Money-SectionWarpper",children:t(ea,{recommendedNoumIds:i,storyBlockTitle:(e==null?void 0:e.Money_Page_Layout[1].Title)||"","data-test":"Money-NoumsForYouSection"})}),t(Z,{isAppUiV2:a.newAppNavigation,"data-test":"Money-SectionWarpper",children:t(Te,{data:e==null?void 0:e.Money_Page_Layout[2],showOnlyNavigationIcons:!0,"data-test":"Money-HowItWorksSection"})})]})}):t(fe,{type:"Chambers",rightContent:t(we,{"data-test":"Money-PaymentSideBar"}),"data-testid":"money-layout","data-test":"Money-MoneyLayout",children:t(xe,{isAppUiV2:a.newAppNavigation,"data-test":"Money-MoneyWrapper",children:t(te,{"data-test":"Money-Spinner"})})})},Ia=ta;export{Ia as default};
//# sourceMappingURL=Money-3dfaaa98.js.map
