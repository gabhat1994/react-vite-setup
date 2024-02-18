import{m as ae,y as u,kC as ne,dJ as O,dK as B,kA as oe,v as ie,kI as re,kG as se,dC as de,kB as ce,R as le,c as i,j as t,I as ue,S as h,T as d,ae as K,B as j,b3 as me}from"./index-cd84bcc9.js";import{C as y,am as pe,an as z,B as a,r as f,a9 as he,ap as ye,bb as G,aq as fe}from"./vendor-51460554.js";import{M as De}from"./index-a497727f.js";import{c as v}from"./countries-4aa86a38.js";import{C as ge}from"./CountryPicker-2d42d72f.js";import{a as be,T as Ae}from"./index-594821a1.js";import{S as Ce}from"./styles-329bb842.js";import"./sideNavItems-22800105.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./storyblok-c16fb040.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./styles-3ceda759.js";import"./Flag-d41fef47.js";import"./useInvoice-3a46c6ed.js";import"./types-3fb18ef5.js";import"./helper-53a5becb.js";import"./OtpInput-6d75f9c8.js";import"./done-439b31ee.js";import"./Radiobox-c1e62033.js";import"./SetupPin-06f1ecff.js";const A=y.div`
  display: flex;
  @media (max-width: ${ae.TABLET_MAX}) {
    flex-direction: column;
  }
`,$=y.div`
  display: flex;
  flex-direction: column;
  background: var(--bg-card-neutral-default);
  flex: 1;
  border-radius: 16px;
  padding: 24px;
`,W=y.div`
  min-height: 60px;
`,N=y.div`
  margin-bottom: 10px;
`,Te=y.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`,xe=y.div`
  display: flex;
  flex: 1;
`,X=y.div``,w=y.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px 24px 24px 0;
`;y(u)`
  background: white;
`;function Se(e){var r,m,g,S,k,_,C,n,T,o,x;return{firstName:((r=e==null?void 0:e.currentUser)==null?void 0:r.firstName)||"",lastName:((m=e==null?void 0:e.currentUser)==null?void 0:m.lastName)||"",dob:(g=e==null?void 0:e.userKyc)!=null&&g.dob?new Date((S=e==null?void 0:e.userKyc)==null?void 0:S.dob):void 0,ssn:((k=e==null?void 0:e.userKyc)==null?void 0:k.ssn)||"",citizenship:((_=e==null?void 0:e.currentUser)==null?void 0:_.citizenship)||"",city:((C=e==null?void 0:e.userAddress)==null?void 0:C.city)||"",state:((n=e==null?void 0:e.userAddress)==null?void 0:n.state)||"",zipcode:((T=e==null?void 0:e.userAddress)==null?void 0:T.zipcode)||"",street:((o=e==null?void 0:e.userAddress)==null?void 0:o.street)||"",apartment:((x=e==null?void 0:e.userAddress)==null?void 0:x.apartment)||""}}function ke(e){return{apartment:e.apartment,state:e.state,zipcode:e.zipcode,street:e.street,city:e.city}}function _e(e){const r=ne(e.dob.toDateString()).split(" ")[0].split("/");return{ssn:e.ssn,dob:`${r[2]}-${r[0]}-${r[1]}`}}function Ne(e){var r;return{firstName:e.firstName,lastName:e.lastName,citizenship:(r=v.find(m=>m.name.toLocaleLowerCase()===e.citizenship.toLocaleLowerCase()))==null?void 0:r.iso2}}function we(e){var m;const r=(m=v.find(g=>g.name.toLocaleLowerCase()===e.citizenship.toLocaleLowerCase()))==null?void 0:m.iso2;return{firstName:e.firstName||"",lastName:e.lastName||"",dob:e.dob,ssn:e.ssn||"",citizenship:r||"",city:e.city||"",state:e.state||"",zipcode:e.zipcode||"",street:e.street||"",apartment:e.apartment||""}}const ze=pe({firstName:z().trim().required(a("noumena.input.not_empty")).min(2,a("noumena.signup.first_name.too_short")).max(20,a("noumena.signup.first_name.too_long")).test("Two letter name validation",a("noumena.signup.two_digit_first_name.incorrect"),e=>e&&e.length<=2?O.test(e):!0).matches(B,a("noumena.signup.first_name.incorrect")),lastName:z().trim().required(a("noumena.input.not_empty")).min(2,a("noumena.signup.last_name.too_short")).max(20,a("noumena.signup.last_name.too_long")).test("Two letter name validation",a("noumena.signup.two_digit_last_name.incorrect"),e=>e&&e.length<=2?O.test(e):!0).matches(B,a("noumena.signup.last_name.incorrect")),ssn:z().trim().required(a("noumena.input.not_empty")).matches(oe,a("noumena.signup.ssn.incorrect"))}).required(),ve=()=>{var U,I,L,H,P,V,R;const[e,r]=f.useState(!1),{addToast:m}=ie(),[g]=re({fetchPolicy:"cache-and-network"}),[S]=se(),[k]=de(),[_]=ce(),C=he(),[n,T]=f.useState(!0),[o,x]=f.useState({firstName:"",lastName:"",dob:void 0,ssn:"",citizenship:"us",city:"",state:"",zipcode:"",street:"",apartment:""}),E=f.useCallback(async()=>{C(le.MONEY_DETAILS)},[C]),Y=async()=>{const s=await g(),D=Se(s==null?void 0:s.data);x(D)};f.useEffect(()=>{Y()},[]);const{getValues:c,register:p,control:F,setValue:l,trigger:q,formState:{errors:b}}=ye({resolver:fe(ze),mode:"onChange"});f.useEffect(()=>{o&&(l("firstName",o.firstName,{shouldValidate:!0,shouldDirty:!0}),l("lastName",o.lastName,{shouldValidate:!0,shouldDirty:!0}),l("citizenship",o.citizenship,{shouldValidate:!0,shouldDirty:!0}),l("dob",o.dob,{shouldValidate:!0,shouldDirty:!0}),l("ssn",o.ssn||"",{shouldValidate:!0,shouldDirty:!0}),l("city",o.city||"",{shouldValidate:!0,shouldDirty:!0}),l("state",o.state||"",{shouldValidate:!0,shouldDirty:!0}),l("zipcode",o.zipcode||"",{shouldValidate:!0,shouldDirty:!0}),l("street",o.street||"",{shouldValidate:!0,shouldDirty:!0}),l("apartment",o.apartment||"",{shouldValidate:!0,shouldDirty:!0}),q())},[o,l,n,q]);const[J,M]=f.useState(!1),Q=async()=>{if(n)T(!n);else{M(!0);const s=c(),D=S({variables:{input:ke(s)}}),ee=_({variables:{input:_e(s)}}),te=k({variables:{input:Ne(s)}});try{await Promise.all([D,ee,te]).then(()=>{x(we(s))}),m("success","none","Account Owner Information saved Successfully.")}catch{m("error","none","There was an error saving")}T(!n),M(!1)}},Z=f.useMemo(()=>i(Ce,{"data-test":"AccountDetail-subHeader-SubHeaderContainer",children:[t(ue,{name:"arrow_left_m",size:24,color:"--icon-button-neutral-default",onClick:()=>E(),"data-test":"AccountDetail-subHeader-Icon"}),t(h,{width:20,"data-test":"AccountDetail-subHeader-Spacer"}),i(d,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"AccountDetail-subHeader-TSpan",children:[" ",a("noumena.money.money-detail.accountdetails")]})]}),[E]);return i(De,{type:"Chambers","data-testid":"money-layout",hideLeftMenu:!0,subHeader:Z,"data-test":"AccountDetail-Layout",children:[i(K,{"data-test":"AccountDetail-Card",children:[t(d,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"AccountDetail-TSpan",children:a("noumena.money.money-detail.addMoney")}),t(h,{height:20,"data-test":"AccountDetail-Spacer"}),i(A,{"data-test":"AccountDetail-Container",children:[i($,{"data-test":"AccountDetail-ContentContainer",children:[t(W,{"data-test":"AccountDetail-ContentHeaderContainer",children:t(d,{font:"body-m-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"AccountDetail-TSpan",children:a("noumena.money.money-detail.externalTransfer")})}),t(N,{"data-test":"AccountDetail-ItemContainer",children:t(d,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"AccountDetail-TSpan",children:a("noumena.money.money-detail.linkBank")})}),t(j,{size:"full",primary:!0,onClick:()=>r(!0),"data-test":"AccountDetail-Button",children:a("noumena.money.money-detail.transferNow")})]}),t(Te,{"data-test":"AccountDetail-MiddleContainer",children:t(d,{font:"body-m",colorToken:"--text-placeholder-neutral-default","data-test":"AccountDetail-TSpan",children:a("noumena.money.money-detail.or")})}),i($,{"data-test":"AccountDetail-ContentContainer",children:[t(W,{"data-test":"AccountDetail-ContentHeaderContainer",children:t(d,{font:"body-m-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"AccountDetail-TSpan",children:a("noumena.money.money-detail.directDEposit")})}),t(N,{"data-test":"AccountDetail-ItemContainer",children:t(d,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"AccountDetail-TSpan",children:a("noumena.money.money-detail.directDEposit1")})}),t(N,{"data-test":"AccountDetail-ItemContainer",children:t(d,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"AccountDetail-TSpan",children:a("noumena.money.money-detail.directDEposit2")})}),t(N,{"data-test":"AccountDetail-ItemContainer",children:t(d,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"AccountDetail-TSpan",children:a("noumena.money.money-detail.directDEposit3")})})]})]})]}),t(h,{height:20,"data-test":"AccountDetail-Spacer"}),t(K,{"data-test":"AccountDetail-Card",children:i("form",{style:{width:"100%"},children:[i(A,{"data-test":"AccountDetail-Container",children:[t(xe,{"data-test":"AccountDetail-OwnerHeaderContainer",children:t(d,{font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted","data-test":"AccountDetail-TSpan",children:a("noumena.money.money-detail.accountOwner")})}),t(j,{secondary:!0,size:"small",onClick:()=>Q(),disabled:!0,loading:J,"data-test":"AccountDetail-Button",children:n?a("noumena.money.money-detail.edit"):a("noumena.money.money-detail.save")})]}),t(A,{"data-test":"AccountDetail-Container",children:t(X,{"data-test":"AccountDetail-FormHeaderContainer",children:t(d,{font:"body-m-bold",colorToken:"--text-card-neutral-highlighted","data-test":"AccountDetail-TSpan",children:a("noumena.money.money-detail.personalDetails")})})}),i(A,{"data-test":"AccountDetail-Container",children:[i(w,{"data-test":"AccountDetail-FormContainer",children:[t(u,{style:n?{background:"white"}:void 0,disabled:n,"data-testid":"step-one-firstName",label:a("noumena.legal.first_name"),...p("firstName",{required:{value:!0,message:a("noumena.input.not_empty")}}),value:c("firstName"),error:!!((U=b.firstName)!=null&&U.message),helperText:(I=b.firstName)==null?void 0:I.message,"data-test":"AccountDetail-TextField"}),t(h,{height:16,"data-test":"AccountDetail-Spacer"}),t(u,{style:n?{background:"white"}:void 0,disabled:n,"data-testid":"step-one-lastName",label:a("noumena.legal.last_name"),...p("lastName",{required:{value:!0,message:a("noumena.input.not_empty")}}),value:c("lastName"),error:!!((L=b.lastName)!=null&&L.message),helperText:(H=b.lastName)==null?void 0:H.message,"data-test":"AccountDetail-TextField"}),t(h,{height:16,"data-test":"AccountDetail-Spacer"}),n?t(u,{style:n?{background:"white"}:void 0,disabled:n,"data-testid":"step-one-ssn",label:a("noumena.date_of_birth"),...p("dob"),value:(P=c("dob"))==null?void 0:P.toDateString(),"data-test":"AccountDetail-TextField"}):t(G,{control:F,name:"dob","data-testid":"step-one-dob",rules:{required:{value:!0,message:a("noumena.input.not_empty")}},render:({field:{onChange:s,value:D}})=>t(me,{required:!0,layout:"dropdown",onChange:s,value:D,label:a("noumena.date_of_birth"),maxDate:new Date,fromYear:new Date().getFullYear()-100,"data-test":"AccountDetail-DatePicker"}),"data-test":"AccountDetail-Controller"})]}),i(w,{"data-test":"AccountDetail-FormContainer",children:[n?t(u,{style:n?{background:"white"}:void 0,disabled:n,"data-testid":"step-one-ssn",label:a("noumena.citizenship"),...p("citizenship"),value:((V=v.find(s=>s.iso2===c("citizenship")))==null?void 0:V.name)||"","data-test":"AccountDetail-TextField"}):t(G,{"data-testid":"step-one-country",control:F,name:"citizenship",rules:{required:!0},render:({field:{onChange:s,value:D}})=>t(ge,{onCountryCodeChange:s,value:D,"data-test":"AccountDetail-CountryPicker"}),"data-test":"AccountDetail-Controller"}),t(h,{height:16,"data-test":"AccountDetail-Spacer"}),t(u,{style:n?{background:"white"}:void 0,disabled:n,"data-testid":"step-one-ssn",label:a("noumena.ssn_esn"),...p("ssn",{required:{value:!0,message:a("noumena.input.not_empty")}}),error:!!b.ssn,helperText:(R=b.ssn)==null?void 0:R.message,value:c("ssn"),"data-test":"AccountDetail-TextField"})]})]}),t(A,{"data-test":"AccountDetail-Container",children:t(X,{"data-test":"AccountDetail-FormHeaderContainer",children:t(d,{font:"body-m-bold",colorToken:"--text-card-neutral-highlighted","data-test":"AccountDetail-TSpan",children:a("noumena.money.money-detail.contactDetails")})})}),i(A,{"data-test":"AccountDetail-Container",children:[i(w,{"data-test":"AccountDetail-FormContainer",children:[t(u,{style:n?{background:"white"}:void 0,disabled:n,"data-testid":"city",label:a("noumena.money.setupWallet.address.city"),...p("city"),value:c("city"),"data-test":"AccountDetail-TextField"}),t(h,{height:16,"data-test":"AccountDetail-Spacer"}),t(u,{style:n?{background:"white"}:void 0,disabled:n,"data-testid":"zipcode",label:a("noumena.zipcode"),...p("zipcode"),value:c("zipcode"),"data-test":"AccountDetail-TextField"}),t(h,{height:16,"data-test":"AccountDetail-Spacer"}),t(u,{style:n?{background:"white"}:void 0,disabled:n,"data-testid":"street",label:a("noumena.money.setupWallet.address.street"),...p("street"),value:c("street"),"data-test":"AccountDetail-TextField"})]}),i(w,{"data-test":"AccountDetail-FormContainer",children:[t(u,{style:n?{background:"white"}:void 0,disabled:n,"data-testid":"state",label:a("noumena.money.setupWallet.address.state"),...p("state"),value:c("state"),"data-test":"AccountDetail-TextField"}),t(h,{height:16,"data-test":"AccountDetail-Spacer"}),t(u,{style:n?{background:"white"}:void 0,disabled:n,"data-testid":"apartment",label:a("apartment"),...p("apartment"),value:c("apartment"),"data-test":"AccountDetail-TextField"})]})]})]})}),e&&t(be,{open:e,handleClose:()=>r(!1),type:Ae.TRANSFER,"data-test":"AccountDetail-TransactionModal"})]})},Ze=ve;export{Ze as default};
//# sourceMappingURL=AccoubtDetails-18df74e8.js.map
