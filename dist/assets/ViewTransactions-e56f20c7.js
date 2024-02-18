import{x as K,aa as O,c as l,F,j as t,ab as m,S as T,aQ as j,bw as J,I as L,T as V,am as X,B,ky as Z,hu as y}from"./index-cd84bcc9.js";import{C as s,ar as E,a9 as ee,r as d,aa as te,l as ae}from"./vendor-51460554.js";import{M as ne}from"./index-a497727f.js";import"./helper-53a5becb.js";import{f as re,e as oe,g as le,h as M,u as ie,M as se,D as de}from"./helper-75d0b640.js";import{P as ce}from"./Pagination-43542d57.js";import{m as pe}from"./main-wallet-6d7dbd11.js";import{S as he}from"./styles-329bb842.js";import{C as ue,D as fe}from"./styles-48608700.js";import{a as me}from"./styles-b6dcb6f2.js";import"./sideNavItems-22800105.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./storyblok-c16fb040.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./styles-3ceda759.js";const ge=s(K)`
  width: 100%;
  height: 100%;
  border: 1px solid var(--bg-separator-neutral-default);
  background: var(--bg-tablecell-neutral-alt-default);
  box-sizing: border-box;
  border-radius: 8px;
  padding-top: 20px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`,ye=s.img`
  height: 40px;
  width: 40px;
`,Te=s.div`
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`,xe=s.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 80%;
  overflow: hidden;
`,U=s.div`
  width: 80%;
  color: var(--text-tablecell-header-neutral-highlighted);
  font-size: 14px;
  font-weight: 600;
  line-height: 160%;
  text-align: left;
`,I=s.div`
  width: 80%;
  color: var(--text-tablecell-body-neutral-default);
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 400;
  line-height: 19.2px;
  font-family: var(--font-family);
  text-align: left;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // &:hover {
  //   overflow: visible;
  //   white-space: normal;
  // }
`,we=s.div`
  font-family: var(--font-family);
  align-self: center;
  color: ${a=>a.isTransactionWithOwnAccounts?"var(--text-tablecell-header-neutral-default)":"var(--text-tablecell-header-neutral-highlighted)"};
  font-size: 14px;
  font-weight: 600;
  line-height: 22.4px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`,be=s.div`
  width: 100%;
  font-family: var(--font-family);
  color: var(--text-tablecell-body-neutral-default);
  font-size: var(--font-footnote-size);
  font-weight: var(--font-footnote-regular-weight);
  line-height: var(--font-link-xlarge-lineheight);
  display: flex;
  justify-content: flex-end;
`,ve=s.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  color: var(--text-tablecell-header-neutral-highlighted);
  font-size: var(--font-link-medium-size);
  font-weight: var(--font-link-xlarge-weight);
  line-height: var(--font-link-xlarge-lineheight);
  justify-content: flex-end;
`,Ce=({sourceDetail:a,destinationDetail:p,paymentDate:x,amount:h,id:g,transactionReason:v,currency:r,charges:i,paymentStatus:c,paymentId:w,isTransactionWithOwnAccounts:C})=>{const{t:u}=E(),b=O();return l(F,{children:[l(ge,{"data-test":`TransactionCard-Wrapper-${g}`,children:[t(Te,{"data-test":"TransactionCard-ProfileWarpper",children:t(ye,{src:pe,alt:"profile","data-test":"TransactionCard-Profile"})}),l(xe,{isMobile:b===m.MOBILE,"data-test":"TransactionCard-TransactionDetails",children:[l(U,{"data-test":"TransactionCard-AccountName",children:[t("span",{style:{fontWeight:"400"},children:u("noumena.money.money-detail.viewStatements.from")})," ",`${(a==null?void 0:a.name)||""} ${(a==null?void 0:a.maskNumber)||""} ${(a==null?void 0:a.accountName)||""}`]}),t(T,{height:2,"data-test":"TransactionCard-Spacer"}),l(U,{"data-test":"TransactionCard-AccountName",children:[t("span",{style:{fontWeight:"400"},children:u("noumena.money.money-detail.viewStatements.to")})," ",`${(p==null?void 0:p.name)||""}  ${(p==null?void 0:p.accountName)||""}`]}),t(T,{height:2,"data-test":"TransactionCard-Spacer"}),b!==m.MOBILE&&l(I,{"data-test":"TransactionCard-Account",children:[`${c} `,`${w}`]}),b===m.MOBILE&&t(I,{"data-test":"TransactionCard-Account",children:w}),t(T,{height:2,"data-test":"TransactionCard-Spacer"}),b===m.MOBILE&&t(I,{"data-test":"TransactionCard-Account",children:`${c} `}),t(T,{height:2,"data-test":"TransactionCard-Spacer"}),l(I,{"data-test":"TransactionCard-Account",children:[`${re(x)} `,v]})]}),l(ve,{"data-test":"TransactionCard-AmountWrapper",children:[l(we,{isTransactionWithOwnAccounts:C,"data-test":"TransactionCard-TransactionAmout",children:[C?null:Number(h)<0?"-":"+",j(Math.abs(Number(h)),r,2)]}),i&&Number(i)!==0?t(be,{"data-test":"TransactionCard-FeesWrapper",children:`${u("noumena.money.money-detail.viewStatements.fee")}: ${j(i,r,2)}`}):null]})]},g),t(T,{height:8,"data-test":"TransactionCard-Spacer"})]})},We=s.div`
  width: ${a=>a.isMobile?"368px":"668px"};
  background-color: var(--bg-card-neutral-alt-default);
  display: flex;
  flex-direction: column;
  margin: auto;
`,Se=s.div`
  padding: 7px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`,Ae=s.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  overflow-x: auto;
`,Le=s.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
`,Me=s.div`
  overflow-x: scroll;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 9px 12px;
  gap: 20px;
  ${J}
`,Ie=s.div`
  background: ${a=>a.isSelected?"var(--bg-tab-chips-brand-secondary-selected)":"var(--bg-tab-chips-neutral-default)"};
  border-radius: 8px;
  height: 40px;
  white-space: nowrap;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 2.5rem;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
  color: ${a=>a.isSelected?"var(--text-tab-chips-brand-primary-selected)":"var(--text-tab-chips-neutral-default)"};
  &:hover {
    cursor: pointer;
  }
`,ke=a=>{const p=ee(),{t:x}=E(),h=O(),g=d.useCallback(async()=>{p(-1)},[p]);d.useEffect(()=>{const r=document.getElementById("monthslist")||null;if(r){const i=r.scrollWidth-r.clientWidth;r.scrollLeft=i}},[]);function v(r){const i=document.getElementById("monthslist")||null;let c=0;const w=setInterval(()=>{r==="left"&&i!==void 0?i.scrollLeft-=90:i.scrollLeft+=90,c+=70,c>=200&&window.clearInterval(w)},50)}return t(he,{"data-test":"TransactionHeader-SubHeaderContainer",children:l(We,{isMobile:h===m.MOBILE,"data-test":"TransactionHeader-Wrapper",children:[l(Se,{"data-test":"TransactionHeader-HeaderWrapper",children:[l(Le,{"data-test":"TransactionHeader-HeadingWrapper",children:[t(L,{name:"arrow_left_m",size:24,color:"--icon-button-neutral-default",onClick:()=>g(),"data-test":"TransactionHeader-Icon"}),t(V,{font:"heading-xs-bold",colorToken:"--text-appbar-neutral-default",style:{paddingLeft:"10px"},"data-test":"TransactionHeader-TSpan",children:x("noumena.money.view_transaction")})]}),t(X,{hideIcons:!0,containerWidth:"280px",onSelectOption:r=>{a.handleDropdoenUpdate(r)},options:a.accounts,"data-test":"TransactionHeader-Dropdown",children:({targetRef:r,toggle:i})=>{var c;return t(B,{ref:r,size:"small",rightIcon:t(L,{name:"chevron_down_m",size:16,color:"--icon-input-neutral-default","data-test":"TransactionHeader-Icon"}),softDisabled:!0,onClick:i,"data-test":"TransactionHeader-Button",children:(c=a.selctedDropdownValue)==null?void 0:c.label})}})]}),l(Ae,{"data-test":"TransactionHeader-CarosoulWrapper",children:[t(B,{style:{background:"var(--bg-button-neutral-alt-default)",minHeight:"35px",display:h===m.MOBILE||h===m.TABLET?"none":""},"data-test":"TransactionHeader-Button",children:t(L,{name:"chevron_small_left_m",color:"--icon-button-neutral-default",size:24,onClick:()=>{v("left")},"data-test":"TransactionHeader-Icon"})}),t(Me,{id:"monthslist","data-test":"TransactionHeader-MonthListWrapper",children:oe().map(r=>t(Ie,{id:r,isSelected:a.selectedMonth===r,onClick:()=>a.handleMonthUpdate(r),"data-test":"TransactionHeader-MonthButton",children:r.split(" ")[1]===String(new Date().getUTCFullYear())?r.split(" ")[0]:r}))}),t(B,{onClick:()=>{v("right")},style:{background:"var(--bg-button-neutral-alt-default)",minHeight:"35px",display:h===m.MOBILE||h===m.TABLET?"none":""},"data-test":"TransactionHeader-Button",children:t(L,{name:"chevron_small_right_m",size:24,color:"--icon-button-neutral-default","data-test":"TransactionHeader-Icon"})})]})]})})},He=()=>{const[a,p]=d.useState([]),x=10,{t:h}=E(),{id:g="",accountType:v=""}=te(),[r]=Z({fetchPolicy:"cache-and-network"}),[i,c]=d.useState(1),[w,C]=d.useState(le()),[u,b]=d.useState({accountType:R(v),endDate:M(new Date(new Date().getUTCFullYear(),new Date().getUTCMonth()+1,0)),accountId:`${g}`,startDate:M(new Date(new Date().getUTCFullYear(),new Date().getUTCMonth(),1))});function R(n){switch(n){case"WALLET":return[y.Wallet];case"BANK":return[y.Bank];case"CARD":return[y.Card];case"SUB_WALLET":return[y.SubWallet];default:return[y.SubWallet,y.Wallet]}}const{transactionData:k,refresh:Y}=ie({filter:u,limit:x,page:i}),[W,$]=d.useState({label:"",key:"",type:"value",value:""}),G=d.useCallback(async()=>{var e,S,A,N,P;const n=await r();if((e=n.data)!=null&&e.getAccountList){const _=(A=(S=n.data)==null?void 0:S.getAccountList)==null?void 0:A.map(f=>({label:f.accountType==="WALLET"?f.walletName||"":f.customerName||"",key:f.masterWalletId!==null&&f.chamberId!==null?y.SubWallet:f.accountType||"",type:"value",value:f.id||""}));_.unshift({label:"Wallets : All",key:"",type:"value",value:""}),p(_);const o=(P=(N=n.data)==null?void 0:N.getAccountList)==null?void 0:P.filter(f=>g===f.id)[0];$({...W,label:o===void 0?"Wallets : All":o.accountType==="WALLET"?o.walletName||"":o.customerName||"",key:(o==null?void 0:o.masterWalletId)!==null&&(o==null?void 0:o.chamberId)!==null?y.SubWallet:(o==null?void 0:o.accountType)||"",type:"value",value:(o==null?void 0:o.id)||""})}},[r,g,W]),D=d.useCallback(n=>{$(n),c(1),b({...u,accountId:n.value,accountType:[n==null?void 0:n.key]})},[u]),z=d.useCallback(n=>{C(n),c(1);const e=se.indexOf(n.split(" ")[0]),S=M(new Date(n.split(" ")[1],e,1)),A=M(new Date(n.split(" ")[1],e+1,0));b({...u,startDate:S,endDate:A})},[u]),Q=n=>{c(n)};d.useEffect(()=>{G()},[]),d.useEffect(()=>{Y()},[u,i]);const H=ae.groupBy(k.data,n=>de(n==null?void 0:n.createdAt)),q=d.useMemo(()=>t(ke,{accounts:a,selctedDropdownValue:W,selectedMonth:w,handleDropdoenUpdate:D,handleMonthUpdate:z,"data-test":"ViewTransactions-subHeader-TransactionHeader"}),[a,W,w,D,z]);return t(ne,{type:"Chambers","data-testid":"money-layout",hideLeftMenu:!0,subHeader:q,"data-test":"ViewTransactions-Layout",children:l(ue,{"data-test":"ViewTransactions-Container",children:[Object.keys(H).map(n=>l(F,{children:[t(fe,{"data-test":"ViewTransactions-DateWrapper",children:n}),t(T,{height:8,"data-test":"ViewTransactions-Spacer"}),H[n].length>0?H[n].map(e=>t(Ce,{id:e==null?void 0:e.id,sourceDetail:e==null?void 0:e.sourceDetail,destinationDetail:e==null?void 0:e.destinationDetail,paymentDate:e==null?void 0:e.createdAt,amount:e==null?void 0:e.amount,transactionReason:e==null?void 0:e.transactionReason,currency:e==null?void 0:e.currency,charges:e==null?void 0:e.charges,paymentStatus:e==null?void 0:e.paymentStatus,paymentId:e==null?void 0:e.paymentId,isTransactionWithOwnAccounts:(e==null?void 0:e.createUserId)===(e==null?void 0:e.updatedUserId),"data-test":"ViewTransactions-TransactionCard"},e==null?void 0:e.id)):t(me,{"data-test":"ViewTransactions-Row",children:h("noumena.container.close_subwallet.noTransactionsFound")}),t(T,{height:8,"data-test":"ViewTransactions-Spacer"})]})),k.totalCount>x&&l("div",{style:{alignSelf:"center"},children:[t(T,{height:4,"data-test":"ViewTransactions-Spacer"}),t(ce,{currentPage:i,pageSize:x,totalCount:k.totalCount,onPageChange:Q,"data-test":"ViewTransactions-Pagination"})]})]})})},Ke=He;export{Ke as default};
//# sourceMappingURL=ViewTransactions-e56f20c7.js.map
