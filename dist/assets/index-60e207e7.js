import{ky as ne,jq as le,T as y,aa as b,c as r,ab as s,j as e,aQ as O,et as Q,b2 as W,ae as C,x as $,B as k,I as B,ju as oe,R as z,S as g,am as X,F as A,hu as ie,v as V,M as re,h as de,i as se,k as ce,cZ as me,m as N,n as ue}from"./index-cd84bcc9.js";import{M as H}from"./index-a497727f.js";import{r as f,C as a,ar as T,a9 as D,f as he,ab as pe,l as U}from"./vendor-51460554.js";import"./helper-53a5becb.js";import{T as E,a as Y,u as fe,b as ye,c as ge,M as xe,d as be}from"./index-594821a1.js";import{F as Te,C as w,L as S,R as I,D as Z,a as J,b as ee,M as ke}from"./styles-329bb842.js";import{m as P}from"./main-wallet-6d7dbd11.js";import{f as Be,u as ve,D as Me}from"./helper-75d0b640.js";import{D as Ae}from"./styles-48608700.js";import"./sideNavItems-22800105.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./storyblok-c16fb040.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./styles-3ceda759.js";import"./useInvoice-3a46c6ed.js";import"./types-3fb18ef5.js";import"./OtpInput-6d75f9c8.js";import"./done-439b31ee.js";import"./Radiobox-c1e62033.js";import"./SetupPin-06f1ecff.js";const Ce=()=>{const[t,n]=f.useState({loading:!0,total:0,mainWallet:[],subWallet:[],bankAccounts:[]}),[o]=ne(),[d]=le(),l=f.useCallback(async()=>{var i,L,v,x,M,_,j,F,R;const h=await Promise.all([o({fetchPolicy:"network-only"}),d({fetchPolicy:"network-only"})]),u=p=>({id:p.id,walletName:p.walletName||"Wallet",accountType:p.accountType||"WALLET",chamberId:p.chamberId||void 0,balance:p.balance||0}),c={...t};c.loading=!1,c.total=((v=(L=(i=h[1].data)==null?void 0:i.getWalletBalance)==null?void 0:L.total)==null?void 0:v.value)||0,c.mainWallet=((M=(x=h[0].data)==null?void 0:x.getAccountList)==null?void 0:M.filter(p=>!p.masterWalletId&&p.accountType==="WALLET").map(u))||[],c.subWallet=((j=(_=h[0].data)==null?void 0:_.getAccountList)==null?void 0:j.filter(p=>p.masterWalletId&&p.accountType==="WALLET").map(u))||[],c.bankAccounts=((R=(F=h[0].data)==null?void 0:F.getAccountList)==null?void 0:R.filter(p=>p.accountType==="BANK").map(p=>({name:p.accountName||"Bank Account",chamberId:p.chamberId,accountType:p.accountType||"BANK",maskAccountNumber:p.maskAccountNumber||"",id:p.id,balance:p.balance,createdAt:p.createdAt})))||[],n(c)},[o,d,t]);f.useEffect(()=>{l()},[]);const m=f.useCallback(()=>{n({...t,loading:!0}),l()},[l]);return{accountData:t,refresh:m}},Le=a.div`
  display: flex;
  flex-direction: column;
  align-items: ${t=>t.isMobile?"center":"left"};
  flex: 1;
`,We=a(y)``,we=a.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  flex: 1;
`,Se=a(y)``,Ie=a.div`
  display: flex;
  justify-content: flex-end;
`,te=t=>t==null?"--":O(t,Q.Usd,2),Ee=t=>{const n=b(),{t:o}=T();return r(Le,{isMobile:n===s.MOBILE,"data-test":"BalanceComponentMain-BalanceContainer",children:[e(Te,{font:"body-xl",colorToken:"--text-card-neutral-default","data-test":"BalanceComponentMain-FormHelperText",children:o(`noumena.money.money-detail.labelProps,{
      label :${t.label}`)}),e(We,{font:"heading-xxl",colorToken:"--text-card-header-neutral-highlighted","data-test":"BalanceComponentMain-Amount",children:te(t.amount)})]})},Pe=t=>{const{t:n}=T();return r(we,{"data-test":"BalanceComponentWallet-SmallBalanceContainer",children:[r(y,{font:"footnote",colorToken:"--text-card-neutral-default",style:{alignSelf:"flex-end"},"data-test":"BalanceComponentWallet-TSpan",children:[" ",n(`noumena.money.money-detail.labelProps,{
      label :${t.label}`)]}),e(Ie,{"data-test":"BalanceComponentWallet-AmountContainer",children:e(Se,{font:"heading-xs",colorToken:"--text-card-header-neutral-highlighted","data-test":"BalanceComponentWallet-SmallAmount",children:te(t.amount)})})]})},Oe=a(C)`
  border-radius: 0;
  width: 100%;
  padding: ${t=>t.isMobile?"16px":"24px"};
  font-family: var(--font-family);
  @media ${W.TABLET} {
    border-radius: 16px;
  }
`;a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;const $e=t=>{const{t:n}=T(),o=b(),[d,l]=f.useState({open:!1,modalType:E.PAY,defaultFrom:void 0});return r(Oe,{"data-testid":"balance",isMobile:o===s.MOBILE,"data-test":"Balance-BalanceWrapper",children:[r(w,{isMobile:o===s.MOBILE,"data-test":"Balance-Container",children:[e(S,{isMobile:o===s.MOBILE,"data-test":"Balance-LeftItem",children:e(Ee,{label:n("noumena.money.wallet.verification.total.balance"),amount:t.total,"data-test":"Balance-BalanceComponentMain"})}),e(I,{isMobile:o===s.MOBILE,"data-test":"Balance-RightItem",children:r($,{gap:8,align:"center",justify:"center",style:o===s.MOBILE?{padding:"0px"}:{padding:"12px 12px 0"},"data-test":"Balance-Stack",children:[e(k,{size:o===s.MOBILE?"full_small":"large",style:{width:o===s.MOBILE?"100%":"126px"},secondary:!0,leftIcon:e(B,{color:"--icon-button-brand-secondary-default",name:"transfer_m",size:24,"data-test":"Balance-Icon"}),onClick:()=>{l({open:!0,modalType:E.TRANSFER,defaultFrom:void 0})},"data-test":"Balance-Button",children:n("noumena.money.transer")}),e(k,{size:o===s.MOBILE?"full_small":"large",style:{width:o===s.MOBILE?"100%":"91px"},secondary:!0,leftIcon:e(B,{name:"pay",color:"--icon-button-brand-secondary-default",size:24,"data-test":"Balance-Icon"}),onClick:()=>{l({open:!0,modalType:E.PAY,defaultFrom:void 0})},"data-test":"Balance-Button",children:n("noumena.money.pay")})]})})]}),d.open&&e(Y,{type:d.modalType,open:d.open,handleClose:()=>{var m;l({...d,open:!1}),(m=t.refresh)==null||m.call(t)},"data-test":"Balance-TransactionModal"})]})},Ne=a(C)`
  border-radius: 0;
  width: 100%;
  padding: ${t=>t.isMobile?"0px":"24px"};
  @media ${W.TABLET} {
    border-radius: 16px;
  }
`,ze=a.div`
  display: flex;
  text-align: center;
  height: 100%;
`,De=a.div`
  border-radius: ${t=>t.isMobile?"0px":"16px"};
  border: 1px solid var(--border-card-neutral-highlighted);
  padding: 16px;
`,_e=a.img`
  height: 40px;
  width: 40px;
  border-radius: 10px;
`,je=a.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`,Fe=a.div`
  display: flex;
  align-items: center;
  justify-content: center;
`,q=t=>{const[n]=oe({fetchPolicy:"cache-and-network"}),o=b(),[d,l]=f.useState(P),[m,h]=f.useState(!1),u=D(),{t:c}=T(),i=[{key:"view",label:e(y,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"Wallet-options-TSpan",children:c("noumena.money.money-detail.viewDetails")}),type:"value",value:"view"}],L=f.useCallback(async()=>{u(z.ACCOUNT_DETAILS)},[u]);f.useEffect(()=>{t.chamberId&&n({variables:{id:t.chamberId},onCompleted:x=>{var M;l(((M=x.getSpaceById)==null?void 0:M.profileImage)||P)}})},[n,t.chamberId]);const v=f.useCallback(()=>{l(P)},[]);return r(De,{isMobile:o===s.MOBILE,"data-test":"Wallet-WalletContainer",children:[r(w,{isMobile:!1,"data-test":"Wallet-Container",children:[e(S,{isMobile:!1,"data-test":"Wallet-LeftItem",children:r(je,{"data-test":"Wallet-ProfileWarpper",children:[e(_e,{src:d,alt:"profile",onError:v,"data-test":"Wallet-Profile"}),e(y,{font:"body-l-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"Wallet-TSpan",children:t.walletName})]})}),e(I,{isMobile:!1,"data-test":"Wallet-RightItem",children:r(ze,{"data-test":"Wallet-BalanceContainer",children:[e(Pe,{label:o===s.MOBILE?c("noumena.money.money-detail.balanceLabel"):c("noumena.money.money-detail.availableBalanceLabel"),amount:t.balance,size:"small","data-test":"Wallet-BalanceComponentWallet"}),e(g,{width:16,"data-test":"Wallet-Spacer"}),e(Fe,{"data-test":"Wallet-IconContainer",children:t.isMain?e(X,{hideIcons:!0,containerHeight:"50px",options:i,usePortal:!0,onSelectOption:x=>{switch(x.key){case"view":L();break;case"add":h(!0);break}},"data-test":"Wallet-Dropdown",children:({targetProps:x,targetRef:M})=>e(A,{children:e(Z,{ref:M,...x,"data-test":"Wallet-DropdownPicker",children:e(k,{textOnly:!0,size:"small",icon:e(B,{name:"more_m",size:24,color:"--icon-button-neutral-default","data-test":"Wallet-Icon"}),"data-test":"Wallet-Button"})},"123")})}):e(k,{textOnly:!0,size:"small",icon:e(B,{name:"chevron_right_m",color:"--icon-button-neutral-default",size:9.2,onClick:()=>{u(`/view-statements/${ie.SubWallet}/${t.id}`)},"data-test":"Wallet-Icon"}),"data-test":"Wallet-Button"})})]})})]}),m&&e(Y,{type:E.TRANSFER,open:m,handleClose:()=>h(!1),onSuccessfulTransaction:t.refresh,"data-test":"Wallet-TransactionModal"})]})},Re=t=>{const n=D(),o=f.useCallback(async()=>{n(z.VIEW_STATEMENTS_MAIN)},[n]),{t:d}=T(),l=b();return r(Ne,{"data-testid":"balance",isMobile:l===s.MOBILE,"data-test":"Wallets-WalletWrapper",children:[r(w,{isMobile:!1,children:[e(S,{isMobile:!1,children:e(J,{children:e(ee,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted",style:{padding:l===s.MOBILE?"16px 16px 8px":"0px"},children:d("noumena.money.money-detail.wallets")})})}),e(I,{isMobile:!1,children:e(k,{size:"full",style:{padding:l===s.MOBILE?"16px 16px 8px":"0px"},textOnly:!0,primary:!0,rightIcon:e(B,{name:"chevron_right_m",size:9.2,color:"--icon-button-brand-primary-default","data-test":"Wallets-Icon"}),onClick:()=>o(),"data-test":"Wallets-Button",children:d("noumena.money.money-detail.viewStatements1")})})]}),e(q,{...t.mainWallets[0],isMain:!0,refresh:t.refresh,"data-test":"Wallets-Wallet"}),l!==s.MOBILE&&e(g,{height:8,"data-test":"Wallets-Spacer"}),t.subWallets.length>0&&e("div",{style:{padding:l===s.MOBILE?"16px 16px 8px":"0px"},children:e(y,{font:"body-m-bold",colorToken:"--text-card-header-neutral-default","data-test":"Wallets-TSpan",children:d("noumena.money.money-detail.noumWallets")})}),t.subWallets.map(m=>r(A,{children:[e(q,{...m,isMain:!1,"data-test":"Wallets-Wallet"},m.id),e(g,{height:8,"data-test":"Wallets-Spacer"})]}))]})},He="/assets/empty-account-bef1dad7.svg";a.div`
  display: flex;
  flex-direction: column;
  width: 654px;
`;a.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;a.div`
  position: absolute;
  left: calc(50% + 300px);
`;const G=a(y)`
  text-align: center;
`,Ue=t=>{const{addToast:n}=V(),o=b(),[d]=fe(),{t:l}=T(),m=f.useCallback(async()=>{},[]),h=f.useCallback(async v=>{if(v){t.onClose();try{(await d({variables:{plaidToken:v}})).errors?n("error","none",l("noumena.money.money-detail.accountLinkError")):n("success","none",l("noumena.money.money-detail.accountLinkSuccess")),t.refresh()}catch(x){he(x,{tags:{section:"linkPlaidAccount"}}),x instanceof Error?n("error","none",`${x.message}`):n("error","none",l("noumena.money.money-detail.accountLinkError"))}}},[d,t,n,l]),u=f.useMemo(()=>({token:t.plaidToken,onSuccess:h,onExit:m}),[t.plaidToken,h,m]),{open:c,ready:i}=ye(u),L=()=>{window.open(me.HOW_PLAID_WORKS,"_blank")};return r(re,{isFullScreen:!1,enableCloseButton:!0,style:{width:o===s.MOBILE?327:654},disableBackdropClick:!0,disableEscapeKeyDown:!0,closeButtonStyles:{tertiary:!0,enforceRight:!0},onClose:()=>t.onClose(),open:t.open,"data-test":"Plaid-Modal",children:[e(de,{isFullScreen:!1,"data-test":"Plaid-ModalHeader",children:l("noumena.money.money-detail.addAccount")}),r(se,{isFullScreen:!1,align:"center","data-test":"Plaid-ModalBody",children:[e(y,{font:"heading-xs-bold",colorToken:"--text-modal-header-neutral-default",textAlign:"center","data-test":"Plaid-TSpan",children:l("noumena.money.money-detail.Great")}),e(y,{font:"heading-xs-bold",colorToken:"--text-modal-header-neutral-default",textAlign:"center","data-test":"Plaid-TSpan",children:l("noumena.money.money-detail.connectAccountsAndWallet")}),e(g,{height:20,"data-test":"Plaid-Spacer"}),e(G,{font:"body-m",colorToken:"--text-modal-neutral-default",children:l("noumena.money.money-detail.helperText1")}),e(g,{height:20,"data-test":"Plaid-Spacer"}),e(G,{font:"body-m",colorToken:"--text-modal-neutral-default",children:l("noumena.money.money-detail.helperText2")}),e(g,{height:20,"data-test":"Plaid-Spacer"}),e(y,{font:"link-m",colorToken:"--text-modal-neutral-default",textAlign:"center",cursor:"pointer",onClick:L,"data-test":"Plaid-TSpan",children:l("noumena.money.money-detail.howPalidWorkd")})]}),e(ce,{isFullScreen:!1,"data-test":"Plaid-ModalFooter",children:e(k,{disabled:!i,size:"full",primary:!0,onClick:()=>{i&&c&&c()},"data-test":"Plaid-Button",children:l("noumena.money.money-detail.Continue")})})]})},qe="/assets/empty-wallet-62082c09.svg",Ge=a(C)`
  border-radius: 0;
  width: 100%;
  padding: ${t=>t.isMobile?"0px":"24px"};
  margin-bottom: 16px;
  @media ${W.TABLET} {
    border-radius: 16px;
  }
`;a(C)`
  border-radius: 0;
  width: 100%;
  margin-bottom: 16px;
  @media ${W.TABLET} {
    border-radius: 16px;
  }
`;const Ke=a(C)`
  border-radius: 0;
  min-height: 140px;
  max-height: 450px;
  flex: 1;
  box-sizing: border-box;
  padding 0px;
  @media ${W.TABLET} {
    border-radius: 16px;
  }
`,Qe=a.div`
  border-radius: ${t=>t.isMobile?"0px":"16px"};
  border: 1px solid var(--border-card-neutral-highlighted);
  padding: 15px;
  margin-top: 10px;
`,Xe=a.div`
  display: flex;
  flex-direction: column;
`,Ve=a.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,Ye=a(y)`
  text-align: center;
`,Ze=a.img`
  width: 80px;
  height: 80px;
`,Je=a.img`
  height: 40px;
  width: 40px;
  margin-right: 5px;
`,et=a.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`,tt=a(y)``,at=t=>{const{addToast:n}=V(),o=b(),[d]=ge(),{t:l}=T(),m=f.useCallback(async c=>{(await d({variables:{id:c}})).errors?n("error","none",l("noumena.money.money-detail.accountUnLinkError")):n("success","none",l("noumena.money.money-detail.accountUnLinkSuccess")),t.onRemove()},[d,t,n,l]),h=[{key:"unlink",label:e(tt,{font:"body-m-bold",colorToken:"--text-tablecell-header-danger-primary-highlighted","data-test":"Bank-options-MenuItem",children:l("noumena.money.money-detail.unlinkAccount")}),type:"value",value:"unlink"}],u=pe(Date.now(),new Date(t.createdAt))>xe||!t.balance;return e(Qe,{isMobile:o===s.MOBILE,"data-test":"Bank-BankContainer",children:r(w,{isMobile:!1,"data-test":"Bank-Container",children:[e(S,{isMobile:!1,"data-test":"Bank-LeftItem",children:r(et,{"data-test":"Bank-ProfileWarpper",children:[e(Je,{src:qe,alt:"profile","data-test":"Bank-Profile"}),r(Xe,{"data-test":"Bank-BankDetails",children:[e(y,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"Bank-TSpan",children:l("noumena.money.money-detail.cardDetail",{details:`${t.name} ******${t.lastFour}`})}),!u&&e(y,{font:"footnote",colorToken:"--text-tablecell-body-neutral-default","data-test":"Bank-TSpan",children:l("noumena.money.money-detail.availableBalance",{amount:O(t.balance||0,Q.Usd,2)})})]})]})}),e(I,{isMobile:!1,"data-test":"Bank-RightItem",children:e(X,{hideIcons:!0,options:h,usePortal:!0,onSelectOption:()=>m(t.id),"data-test":"Bank-Dropdown",children:({targetProps:c,targetRef:i})=>e(A,{children:e(Z,{ref:i,...c,"data-test":"Bank-DropdownPicker",children:e(B,{name:"more_m",color:"--icon-button-neutral-default",size:24,"data-test":"Bank-Icon"})},"123")})})})]})})},nt=t=>{const{plaidToken:n}=be(),{accounts:o}=t,[d,l]=f.useState(!1),m=b(),{t:h}=T();return r(Ge,{"data-testid":"Linked-accounts",isMobile:m===s.MOBILE,children:[r(w,{isMobile:!1,"data-test":"LinkedAccounts-Container",children:[e(S,{isMobile:!1,"data-test":"LinkedAccounts-LeftItem",children:e(J,{style:{padding:m===s.MOBILE?"21px 16px":"0px"},children:r(ee,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted",children:[" ",h("noumena.money.money-detail.linkedAccount")]})})}),o.length>0?e(I,{isMobile:!1,style:{padding:m===s.MOBILE?"16px 16px":"0px"},"data-test":"LinkedAccounts-RightItem",children:e(k,{size:"small",tertiary:!0,leftIcon:e(B,{name:"add_m",size:16,color:"--icon-button-neutral-default","data-test":"LinkedAccounts-Icon"}),onClick:()=>l(!0),disabled:!n,"data-test":"LinkedAccounts-Button",children:h("noumena.money.money-detail.addAccount")})}):null]}),o.length?o.map(u=>e(at,{name:u.name,lastFour:u.maskAccountNumber,id:u.id,onRemove:()=>t.refresh(),balance:u.balance,createdAt:u.createdAt,"data-test":"LinkedAccounts-Bank"},u.id)):r(A,{children:[e(g,{height:16,"data-test":"LinkedAccounts-Spacer"}),e(Ke,{children:r(Ve,{children:[e(Ze,{src:He,alt:"Account"}),e(g,{height:16,"data-test":"LinkedAccounts-Spacer"}),e(Ye,{font:"body-l",colorToken:"--text-placeholder-neutral-default",children:h("noumena.money.money-detail.linkFirstAccountWithPlaid")}),e(g,{height:16,"data-test":"LinkedAccounts-Spacer"}),e(k,{secondary:!0,size:"small",leftIcon:e(B,{name:"add_m",size:16,color:"--icon-button-brand-secondary-default","data-test":"LinkedAccounts-Icon"}),disabled:!n,onClick:()=>l(!0),"data-test":"LinkedAccounts-Button",children:h("noumena.money.money-detail.addAccount")}),e(g,{height:24,"data-test":"LinkedAccounts-Spacer"})]})})]}),d&&n&&e(Ue,{open:!0,onClose:()=>l(!1),plaidToken:n,refresh:t.refresh,"data-test":"LinkedAccounts-Plaid"})]})},lt=a(C)`
  border-radius: ${t=>t.isTablet?"16px":"0px"};
  width: 100%;
  padding: 0px;
  margin-bottom: 60px;
  @media (min-width: ${N.TABLET_MAX}) {
    display: none;
  }
`,ot=a($)`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid var(--shadow-neutral-light);
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
`,it=a.img`
  height: 24px;
  width: 24px;
`,rt=a.div`
  width: 24px;
  height: 100%;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  padding-right: 16px;
`,dt=a.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  overflow: hidden;
`,K=a.div`
  width: 80%;
  color: var(--link-card-neutral-highlighted);
  font-size: var(--font-body-medium-size);
  font-weight: var(--font-link-large-weight);
  line-height: var(--font-link-xlarge-lineheight);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // &:hover {
  //   overflow: visible;
  //   white-space: normal;
  // }
`,st=a.div`
  width: 80%;
  color: var(--text-card-neutral-default);
  font-size: var(--font-footnote-size);
  font-weight: var(--font-footnote-regular-weight);
  line-height: var(--font-link-xlarge-lineheight);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // &:hover {
  //   overflow: visible;
  //   white-space: normal;
  // }
`,ct=a.div`
  color: var(--link-card-neutral-highlighted);
  font-size: var(--font-link-medium-size);
  font-weight: var(--font-link-xlarge-weight);
  line-height: var(--font-link-xlarge-lineheight);
`,mt=a.div`
  color: var(--text-card-neutral-default);
  font-size: var(--font-link-small-size);
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,ut=a($)`
  height: 100%;
  width: 30%;
`,ht=({sourceDetail:t,destinationDetail:n,paymentDate:o,amount:d,transactionReason:l,currency:m,charges:h})=>{const{t:u}=T(),c=b();return r(ot,{style:{paddingLeft:c===s.TABLET?"16px":"0px"},justify:"space-between","data-test":"TransactionCard-Wrapper",children:[r($,{fullWidth:!0,style:{width:"70%"},"data-test":"TransactionCard-Stack",children:[e(rt,{"data-test":"TransactionCard-ProfileWarpper",children:e(it,{src:P,alt:"profile","data-test":"TransactionCard-Profile"})}),e(g,{height:16,"data-test":"TransactionCard-Spacer"}),r(dt,{"data-test":"TransactionCard-TransactionDetails",children:[r(K,{"data-test":"TransactionCard-AccountName",children:[u("noumena.money.money-detail.viewStatements.from")," ",`${(t==null?void 0:t.name)||""} ${(t==null?void 0:t.maskNumber)||""} ${(t==null?void 0:t.accountName)||""}`]}),r(K,{"data-test":"TransactionCard-AccountName",children:[u("noumena.money.money-detail.viewStatements.to")," ",`${(n==null?void 0:n.name)||""}  ${(n==null?void 0:n.accountName)||""}`]}),r(st,{"data-test":"TransactionCard-Account",children:[`${Be(o)} `,l]})]})]}),r(ut,{vertical:!0,align:"end",justify:"center","data-test":"TransactionCard-AmountWarpper",children:[e(ct,{"data-test":"TransactionCard-TransactionAmout",children:`${Number(d)<0?"":"+"}${O(Number(d),m,2)}`}),!!h&&e(mt,{"data-test":"TransactionCard-Charges",children:`Fee: ${O(h,m,2)}`})]})]})},pt=a(C)`
  border-radius: 0;
  min-height: 140px;
  max-height: 450px;
  flex: 1;
  box-sizing: border-box;
  display: flex;
  padding: ${t=>t.isMobile?"16px 16px":t.isTablet?"16px 8px":"24px"};
  @media ${W.TABLET} {
    border-radius: 16px;
  }
`,ft=a.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  padding-bottom: 16px;
`,yt=a(y)`
  font-weight: 600;
  font-size: 20px;
  line-height: 30%;
  text-align: center;
  font-family: var(--font-family);
`;a.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;a.img`
  width: 88px;
  height: 56px;
  margin-bottom: 35.5px;
`;const gt=a.div`
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  color: var(--text-button-brand-primary-default);
  font-family: var(--font-family);
  line-height: 22.4px;
  text-align: center;
  align-self: center;
  margin: auto;
  cursor: pointer;
`,xt=a.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 248px;
`,ae=()=>{const{t}=T(),n=D(),o={endDate:new Date().toISOString().split("T")[0],startDate:""},d=b(),l=s.MOBILE===d||s.TABLET===d,{transactionData:m}=ve({filter:o,limit:2,page:1}),h=f.useCallback(async()=>{n(z.VIEW_TRANSACTIONS_MAIN)},[n]),u=U.groupBy(m.data,c=>Me(c==null?void 0:c.createdAt));return r(pt,{isMobile:d===s.MOBILE,isTablet:d===s.TABLET,children:[r(ft,{style:{display:"flex",justifyContent:"space-between"},children:[e(yt,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted",children:t("noumena.money.money-detail.transactions")}),m.data.length>0&&!l&&e(A,{children:e(k,{style:{justifyContent:"flex-end",width:"fit-content"},textOnly:!0,primary:!0,rightIcon:e(B,{name:"chevron_small_right_m",size:24,color:"--icon-button-brand-primary-default","data-test":"Transactions-Icon"}),onClick:()=>h(),"data-test":"Transactions-Button",children:t("noumena.money.money-detail.showAll")})})]}),Object.keys(u).map(c=>r(A,{children:[e(Ae,{style:{paddingLeft:d===s.TABLET?"16px":"0px"},"data-test":"Transactions-DateWrapper",children:c.split(",")[0]}),u[c].length>0&&u[c].map(i=>e(ht,{sourceDetail:i==null?void 0:i.sourceDetail,destinationDetail:i==null?void 0:i.destinationDetail,paymentDate:i==null?void 0:i.paymentDate,amount:i==null?void 0:i.amount,transactionReason:i==null?void 0:i.transactionReason,currency:i==null?void 0:i.currency,charges:i==null?void 0:i.charges,"data-test":"Transactions-TransactionCard"},i==null?void 0:i.id))]})),U.isEmpty(u)&&e(xt,{children:e(y,{font:"body-l",colorToken:"--text-placeholder-neutral-default",textAlign:"center",$fill:!0,"data-test":"Transactions-TSpan",children:t("noumena.money-detail.trsanactions.noTransactionsFound")})}),m.data.length>0&&l&&r(A,{children:[" ",e(g,{height:16,"data-test":"Transactions-Spacer"})," ",e(gt,{onClick:()=>h(),children:t("noumena.container.subwallet.seeAllTransactions")})]})]})},bt=()=>{const t=b();return e(lt,{isTablet:t===s.TABLET,"data-test":"TransactionsMain-TransactionsMainWrapper",children:e(ae,{"data-test":"TransactionsMain-Transactions"})})},Tt=a.div`
  width: 320px;
  height: 342px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: ${N.LAPTOP_M_MAX}) {
    width: 300px;
  }
  @media (max-width: ${N.TABLET_MAX}) {
    display: none;
  }
`,kt=()=>e(Tt,{"data-test":"PaymentSideBar-PaymentSideBarWrapper",children:e(ae,{"data-test":"PaymentSideBar-Transactions"})}),Bt=a.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`,vt=()=>e(Bt,{"data-test":"Loading-Container",children:e(ue,{"data-test":"Loading-Spinner"})}),Gt=()=>{const{accountData:t,refresh:n}=Ce();console.log(t,"accountData");const o=b(),d=s.MOBILE===o||s.TABLET===o;return t.loading?e(H,{type:"Chambers","data-testid":"money-layout",hideLeftMenu:!1,"data-test":"MoneyDetails-Layout",children:e(vt,{"data-test":"MoneyDetails-Loading"})}):e(H,{type:"Chambers",rightContent:e(kt,{"data-test":"MoneyDetails-PaymentSideBar"}),"data-testid":"money-layout","data-test":"MoneyDetails-Layout",children:r(ke,{"data-test":"MoneyDetails-MoneyWrapper",children:[s.MOBILE===o&&e(g,{height:16,"data-test":"MoneyDetails-Spacer"}),e($e,{total:t.total,refresh:n,"data-test":"MoneyDetails-Balance"}),e(g,{height:d?16:24,"data-test":"MoneyDetails-Spacer"}),e(Re,{mainWallets:t.mainWallet,subWallets:t.subWallet,refresh:n,"data-test":"MoneyDetails-Wallets"}),e(g,{height:d?16:24,"data-test":"MoneyDetails-Spacer"}),e(nt,{accounts:t.bankAccounts,refresh:n,"data-test":"MoneyDetails-LinkedAccounts"}),e(bt,{"data-test":"MoneyDetails-TransactionsMain"})]})})};export{Gt as default};
//# sourceMappingURL=index-60e207e7.js.map
