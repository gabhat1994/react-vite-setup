import{c as m,x as p,j as t,I as ae,T as S,F,ae as ne,a2 as re,da as ie,eu as oe,ev as W,eG as se,eH as le,eI as ce,Q as T,eJ as P,eK as de,v as ue,aR as me,eL as ge,aC as fe,eB as he,b7 as U,eC as pe}from"./index-cd84bcc9.js";import{I as Se}from"./Infobox-cf6af02b.js";import{A as be}from"./payloadParser-f4cc4e4f.js";import{f as ye}from"./getTimeStampForDisplaying-22d5ca9d.js";import{R as Ce}from"./RouterLink-30e622d4.js";import"./styles-58edde60.js";import{u as V}from"./contractPermissions-cf3fd14b.js";import{E as O,a as ve,L as w,D as we,A as x,b as ke,u as De}from"./styles-548b0144.js";import{C as _e}from"./contract-47e31a61.js";import{aT as Le,C as g,ar as Q,r as k}from"./vendor-51460554.js";import{C as Ie,g as Ae}from"./contactDetails-4902172b.js";import{D as Te}from"./statementOfWork-e03c986f.js";import{F as Pe}from"./Flag-d41fef47.js";import{i as xe,f as Ne,u as Fe}from"./contract-546e6b09.js";import{S as C}from"./Section-2a57cf43.js";import{a as Ve}from"./contractPdf-f9d6c58f.js";import{u as Ee}from"./contactNoumConnection-819cdc27.js";function M({title:e,iconName:o="file_m"}){return m(p,{gap:12,align:"center","data-test":"Stack",children:[t(ae,{name:o,size:24,"data-test":"Icon"}),t(S,{font:"body-m-bold","data-test":"TSpan",children:e})]})}function Re({rows:e}){return t(p,{gap:12,vertical:!0,align:"stretch","data-test":"Stack",children:Array.from({length:e}).map((o,n)=>t(Le,{width:"100%",height:24,"data-test":`Skeleton-${n}`},n))})}const Ue=g.div`
  display: grid;
  grid-template-columns: max-content auto;
  grid-template-rows: auto;
  grid-template-areas:
    'contact contact'
    'account-label account-value'
    'billing-label billing-value';
  gap: 8px 32px;
`,z=g(S).attrs(()=>({font:"body-m",colorToken:"--text-card-neutral-default"}))``,J=g(S).attrs(()=>({font:"body-m",colorToken:"--text-card-neutral-highlighted"}))``,Me=g.div`
  grid-area: contact;
`,Be=g(z)`
  grid-area: account-label;
`,je=g(J)`
  grid-area: account-value;
`,We=g(z)`
  grid-area: billing-label;
`,Oe=g(J)`
  grid-area: billing-value;
`,v={Wrapper:Ue,Contact:Me,AccountLabel:Be,AccountValue:je,BillingLabel:We,BillingValue:Oe};function B({contact:e}){var o,n;return m(v.Wrapper,{children:[t(v.Contact,{children:t(O,{name:e.displayName,avatarUrl:((o=e.userId.profile)==null?void 0:o.profilePictureThumbnail)??void 0,"data-test":"EntityDisplay"})}),t(v.AccountLabel,{children:"Account Information"}),m(v.AccountValue,{children:[e.displayName,t("br",{}),Ie.formatCompanyAndTitle(e),t("br",{}),e.userId.email]}),t(v.BillingLabel,{children:"Billing Details"}),m(v.BillingValue,{children:[e.apartmentNo," ",e.street,t("br",{}),e.city,t("br",{}),e.state,", ",e.zipCode,t("br",{}),((n=Ae(e.country))==null?void 0:n.name)??"--"]})]})}function j({country:e,region:o}){if(!e||!xe(e))return t(F,{children:"--"});const n=Ne(e,o??null);return m(p,{gap:8,align:"center","data-test":"Stack",children:[t(Pe,{flag:`flag_${e}`,size:24,"data-test":"Flag"}),t(S,{font:"body-m","data-test":"TSpan",children:n})]})}const Qe=g(ne)`
  padding: 24px;
`,ze=g(re)`
  width: 100%;
  margin: 0;
`,Je=g.div`
  width: 100%;
  height: 300px;
  background-color: var(--text-tab-basic-neutral-disabled);
  border-radius: 8px;
`,$e=g(S).attrs(()=>({font:"body-m",colorToken:"--text-card-neutral-default"}))`
  margin-left: 12px;
`,Ge=g.div`
  cursor: pointer;
`,b={Card:Qe,Separator:ze,PDFPreview:Je,NoSOWsValue:$e,SowButtonLink:Ge};function gt({contract:e,linkedSows:o,isLoadingLinkedSows:n,onLinkedSowClick:s}){var y,D,_,i,L,I;const{t:a}=Q(),l=V(),{formState:{isValid:f,isSubmitted:c}}=ve(),r=c&&!f,d=l.canSign(e);return m(p,{gap:24,vertical:!0,align:"stretch","data-test":"Stack",children:[t(b.Card,{children:t(C,{title:m(F,{children:[t(S,{font:"heading-xs-bold","data-test":"TSpan",children:e.title}),t(Te,{status:e.status,"data-test":"DocumentStatusTag"})]}),titleSideAddon:m(S,{font:"body-m",colorToken:"--text-card-neutral-disabled","data-test":"TSpan",children:["ID:"," ",_e.formatDocumentNumber(e.contractNumber??0)]}),"data-test":"Section",children:m(p,{gap:24,"data-test":"Stack",children:[t(w,{label:"Effective Date",value:e.effectiveDate?ye(be.parseDateString(e.effectiveDate)):"--","data-test":"LabelValue"}),t(w,{label:"Termination Notice",value:e.terminationNoticeInDays?a("noumena.n_days",{count:e.terminationNoticeInDays,postProcess:"interval"}):"--","data-test":"LabelValue"}),t(w,{label:"Governing Law",value:t(j,{country:(y=e.legalJurisdiction)==null?void 0:y.country,region:(D=e.legalJurisdiction)==null?void 0:D.state,"data-test":"LegalRegionDisplay"}),"data-test":"LabelValue"}),t(w,{label:"Arbitration",value:t(j,{country:(_=e.arbitrationJurisdiction)==null?void 0:_.country,region:(i=e.arbitrationJurisdiction)==null?void 0:i.state,"data-test":"LegalRegionDisplay"}),"data-test":"LabelValue"}),t(ie,{grow:!0,"data-test":"StackItem",children:t(w,{label:"Noum",value:t(O,{name:((L=e.linkedNoum)==null?void 0:L.name)??"",avatarUrl:((I=e.linkedNoum)==null?void 0:I.profileImageThumbnail)??void 0,"data-test":"EntityDisplay"}),"data-test":"LabelValue"})})]})})}),t(b.Card,{children:m(p,{gap:16,vertical:!0,align:"stretch","data-test":"Stack",children:[m(p,{align:"stretch","data-test":"Stack",children:[t(C,{variant:"sub-section",title:"Buyer","data-test":"Section",children:e.buyer?t(B,{contact:e.buyer,"data-test":"ContactSummary"}):"--"}),t(C,{variant:"sub-section",title:"Service Provider","data-test":"Section",children:e.seller?t(B,{contact:e.seller,"data-test":"ContactSummary"}):"--"})]}),t(b.Separator,{}),t(C,{variant:"sub-section",title:"Statement of Work","data-test":"Section",children:t(p,{vertical:!0,gap:8,align:"stretch","data-test":"Stack",children:n?t(Re,{rows:3,"data-test":"AttachedFileListSkeleton"}):o.length>0?o.map(h=>s?t(b.SowButtonLink,{role:"button",tabIndex:0,onKeyPress:()=>{},onClick:()=>{s({contractId:void 0,sowId:h._id})},children:t(M,{title:h.title??"--","data-test":"AttachedFileListItem"})},h._id):t(Ce,{to:oe.viewStatementOfWork({id:h._id}),"data-test":"RouterLink",children:t(M,{title:h.title??"--","data-test":"AttachedFileListItem"})},h._id)):m(F,{children:[t(b.NoSOWsValue,{children:"None"}),l.isOwner(e)&&t(Se,{type:"secondary","data-test":"Infobox",children:a("noumena.contract_preview.no_sows.infobox")})]})})})]})}),e.timeline&&t(b.Card,{children:t(C,{title:"Timeline","data-test":"Section",children:t(we,{items:e.timeline,buyer:e.buyer,serviceProvider:e.seller,documentType:W.Contract,"data-test":"DocumentTimeline"})})}),t(b.Card,{hasError:r,id:"agreements",children:t(C,{title:"Agreements",hasSeparator:!0,"data-test":"Section",children:m(p,{gap:16,vertical:!0,align:"stretch","data-test":"Stack",children:[t(x,{name:"isAuthorized",label:a("noumena.contract_preview.agreements.is_authorized"),disabled:!d,"data-test":"AgreementCheckbox"}),t(x,{name:"termsAndConditions",label:a("noumena.contract_preview.agreements.terms_and_conditions"),disabled:!d,"data-test":"AgreementCheckbox"}),t(x,{name:"eSign",label:a("noumena.contract_preview.agreements.e_sign"),disabled:!d,"data-test":"AgreementCheckbox"}),r&&t(S,{font:"body-m",colorToken:"--bg-button-danger-primary-default","data-test":"TSpan",children:a("noumena.contracts_document_preview.agreements.required")})]})})})]})}function Ke(){const e=V(),[o]=Ee();function n(a){var l,f;return e.isOwner(a,(l=a.buyer)==null?void 0:l.userId._id)||e.isOwner(a,(f=a.seller)==null?void 0:f.userId._id)}async function s(a,l){if(!a.linkedNoum._id)return!1;if(e.isOwner(a,l.userId._id))return!0;const{isSecretNoum:f,isConnected:c}=await o(a.linkedNoum._id,l._id);return f?c:!0}return{canReceiveDocument:s,isOwnerAParty:n}}function N(e,o,n){e.updateFragment({fragment:de,fragmentName:"Contract",id:e.identify({__typename:"Contract",_id:o})},s=>s?{...s,status:n}:null)}function qe({id:e}){const[o]=se({update(c,r){var d;!((d=r.data)!=null&&d.sendDocumentForSigning)||!e||N(c,e,T.Issued)},refetchQueries:[P]}),[n]=le({update(c,r){var d;!((d=r.data)!=null&&d.signContract)||!e||N(c,e,T.Signed)},refetchQueries:[P]}),[s]=ce({update(c,r){var d;!((d=r.data)!=null&&d.rejectContract)||!e||N(c,e,T.Draft)},refetchQueries:[P]}),a=k.useCallback(async()=>{var r;if(!e)return;if(!((r=(await o({variables:{id:e}})).data)!=null&&r.sendDocumentForSigning))throw new Error("Unable to send the document. Please try again later.")},[e,o]),l=k.useCallback(async()=>{var r;if(!e)return;if(!((r=(await n({variables:{id:e}})).data)!=null&&r.signContract))throw new Error("Unable to sign the document. Please try again later.")},[e,n]),f=k.useCallback(async()=>{var r;if(!e)return;if(!((r=(await s({variables:{id:e}})).data)!=null&&r.rejectContract))throw new Error("Unable to decline the document. Please try again later.")},[e,s]);return{sendForSigning:a,sign:l,reject:f}}function ft({id:e}){var R;const[o,n]=k.useState("Summary"),{t:s}=Q(),{addSuccessIconToast:a,addErrorToast:l,addPrimaryIconToast:f}=ue(),c=V(),r=Ke(),{modalType:d,openModal:y,closeModal:D,contextData:_}=me(),{contract:i,isLoading:L,deleteContract:I}=Fe({id:e}),h=ge({variables:{contractId:e},skip:!e}),$=k.useMemo(()=>{var u;return fe((u=h.data)==null?void 0:u.getLinkedSOWs.data)},[(R=h.data)==null?void 0:R.getLinkedSOWs]),E=Ve({id:e,contract:i}),A=qe({id:e}),G=ke({defaultValues:{eSign:!1,isAuthorized:!1,termsAndConditions:!1}}),K=De({defaultValues:{documentContentsChecked:!1,validSignature:!1}}),[q]=he(),H=async()=>{if(!(!(i!=null&&i.buyer)||!i.seller||!(i!=null&&i.linkedNoum._id))){if(!r.isOwnerAParty(i)){l("To share the contract, you need to be one of the contracting parties.");return}if(!await r.canReceiveDocument(i,i.buyer)){y("secretNoumAlert",{isUnauthenticated:U.isUnauthenticated(i.buyer.userId)});return}if(!await r.canReceiveDocument(i,i.seller)){y("secretNoumAlert",{isUnauthenticated:U.isUnauthenticated(i.seller.userId)});return}n("ConfirmSignature")}},X=async()=>{if(i)try{c.isOwner(i)?(await A.sendForSigning(),a(s("noumena.contract_preview.toast.sent_for_signing"))):(await A.sign(),a(s("noumena.contract_preview.toast.signed"))),n("Summary")}catch(u){u instanceof Error&&l(u.message)}},Y=async()=>{try{await A.reject(),a(s("noumena.contract_preview.toast.declined")),n("Summary")}catch(u){u instanceof Error&&l(u.message)}},Z=async()=>{try{await I(e),a(s("noumena.contract_preview.toast.draft_deleted"))}catch(u){u instanceof Error&&l(u.message)}},ee=async()=>{f("QA Note: Duplicating is not implemented yet.")},te=async()=>{if(e)try{await q({variables:{documentId:e,type:W.Contract,sendTo:[pe.CounterParty]}}),a(s("noumena.contract_preview.toast.resent"))}catch(u){u instanceof Error&&l(u.message)}};return{summary:{isLoading:L,form:G,onSubmit:H},signature:{isLoading:E.loading,pdfWithSignature:E.pdfData??void 0,form:K,onSubmit:X},linkedSows:{data:$,loading:h.loading},contract:i,previewStep:o,changeStep:n,deleteContract:Z,declineContract:Y,duplicateContract:ee,resendContract:te,modalType:d,openModal:y,closeModal:D,contextData:_}}export{gt as C,ft as u};
//# sourceMappingURL=useContractPreviewScreen-f7a52406.js.map
