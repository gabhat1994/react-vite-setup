import{v as Ce,dB as $t,bJ as jt,bK as qt,dC as ct,dD as Xt,bG as Jt,dE as Be,bH as Zt,bt as f,aj as qe,bu as ke,bP as le,bs as K,bA as ye,p as Gt,dF as Qt,f as ut,dG as Kt,s as X,aa as Yt,j as e,c as S,T as D,dH as ea,ab as ta,dI as aa,am as Xe,y as me,I as j,aH as Ae,dJ as Qe,dK as Ke,u as fe,M as ce,t as be,h as se,i as pe,dL as na,O as oa,S as U,b1 as Je,k as de,B as $,e as ie,bw as mt,w as ge,dM as pt,dN as ia,aC as ra,dO as la,n as He,F as q,dP as ht,bY as ft,a5 as ve,dQ as sa,dR as da,dS as ca,ck as ua,x as Ze,dT as ma,dU as pa,dV as ha,dW as Ye,dX as fa,dY as bt,dZ as ba,d_ as ga,d$ as ya,e0 as gt,e1 as xa,e2 as Ue,d as Pe,ay as yt,aK as Ca}from"./index-cd84bcc9.js";import{r as n,B as y,f as xe,C as T,ar as he,ay as $e,ad as je,am as Ee,an as Q,ap as Ie,aq as Ne,a6 as xt,l as Ge,bb as De,bI as _a}from"./vendor-51460554.js";import{c as Sa}from"./capitalizeFirstLetter-92ef0abb.js";import"./styles-0c3f5396.js";import{R as Ct,a as _t}from"./RichTextEditorView-3d7dc014.js";import{m as Ta}from"./url-8d85408e.js";import{b as St,c as Ea,d as Ma,e as wa,W as Tt,a as Et,C as Mt,H as va,f as Oe,g as ka,h as et,i as Ba,j as Aa,k as Ia,l as Na,m as Wa,n as Ra,o as Ha,T as Pa,p as La,q as za,r as Va,s as Da,t as Oa,S as Fa}from"./styles-1a9b9e59.js";import{U as Ua}from"./UploadMedia-5fe81e87.js";function wt(){const{addToast:t}=Ce(),[a,{loading:r}]=$t(),o=n.useCallback(async(i,c)=>{let d;try{await a({variables:{spaceId:i,elementId:c},update:async(l,{data:s})=>{if(!s||!s.removeElement)return;const b={id:i,editorV2Enabled:!1,status:jt.Unpublished};l.writeQuery({query:qt,variables:b,data:{getSpaceById:{...s.removeElement,category:s.removeElement.category}}})}}),t("success","none",y("noumena.container.element_delete.success")),d=!0}catch(l){let s="Unknown";l instanceof Error&&(s=l.message),t("error","none",s),xe(new Error(s),{tags:{section:"removeElementMutation"}}),d=!1}return d},[t,a]);return{loading:r,removeElementHelper:o}}function vt(){const{addToast:t}=Ce(),[a]=ct(),[r]=Xt(),[o,{loading:i}]=Jt(),{updateElementHelper:c,loading:d}=Be(),[l,{loading:s}]=Zt(),b=n.useCallback((g,h)=>{h.some(m=>{var C;return(m==null?void 0:m.elementType)===f.Calendar&&!!((C=m.unSaved)!=null&&C.isDeleted)})&&r({variables:{chamberId:g}})},[r]),x=n.useCallback(async(g,h,p,m)=>{var u,M;let C;try{if(h&&(h==null?void 0:h.type)===qe.Home){const v=ke.getElements(h);if(!p){const w=v.reduce((B,k)=>{var I,N;return le.isHomeNoumProgressBarType(k.elementType)&&!((I=k==null?void 0:k.draft)!=null&&I.isDeleted)&&!((N=k==null?void 0:k.unSaved)!=null&&N.isDeleted)&&B.push({elementId:k._id,bodyContent:le.getBodyContent(k),bodyContentJson:le.getBodyContentJson(k),position:le.getPosition(k),status:K.Published,bodyContentType:ye.Json,percentCompleted:100}),B},[]);w&&w.length>0&&await c(g,w)}const E=v.find(w=>w.elementType===f.Usernetwork),A=JSON.parse(((u=E==null?void 0:E.unSaved)==null?void 0:u.bodyContent)||((M=E==null?void 0:E.draft)==null?void 0:M.bodyContent)||(E==null?void 0:E.bodyContent)||"{}")||{},W=[];Object.keys(A).map(w=>{W.push({link:Ta(w,A[w]),name:w})}),a({variables:{input:{profile:{socialLinks:W}}}}),m==null||m()}await o({variables:{spaceId:g,prevStates:[K.Unsaved,K.Draft],currentState:K.Published}}),await l({variables:{spaceId:g,status:Gt.Published}}),t("success","icon",y("noumena.container.chamber_publish.success")),b(g,(h==null?void 0:h.elements)||[]),C=!0}catch(v){let E="Unknown";v instanceof Error&&(E=v.message),t("error","none",E),E!==y("noumena.container.chamber_business_brief_error")&&E!==y("noumena.container.chamber_experience_error")&&xe(new Error(E),{tags:{section:"publishElementStateMutation"}}),C=!1}return C},[o,l,t,b,a,c]);return{loading:i||s||d,publishSpaceHelper:x}}function kt(){const[t,{loading:a}]=Qt(),r=n.useCallback(async o=>{let i;try{await t({variables:{ID:o}}),i=!0}catch(c){let d="Unknown";c instanceof Error&&(d=c.message),xe(new Error(d),{tags:{section:"publishNoumLayoutMutation"}}),i=!1}return i},[t]);return{loading:a,publishNoumLayoutHelper:r}}function $a(){const{addToast:t}=Ce(),{refetchUserData:a}=ut(),r=n.useCallback(g=>{t("error","none",`${y("noumena.toast_error.text")}: ${g}`)},[t]),o=n.useCallback(()=>{t("success","none",`${y("noumena.toast_success.text")}: ${y("noumena.home_noum.about_me.save_changes.success")}`),a()},[t,a]),[i,{loading:c}]=ct(),[d,{loading:l}]=Kt(),s=c||l,b=n.useCallback(async g=>{const h={success:!1};return await i({variables:{input:g},onError:({networkError:p=null,graphQLErrors:m=[]})=>{const[C]=m;r((C==null?void 0:C.message)??p),xe(new Error((C==null?void 0:C.message)??p),{tags:{section:"useUpdateUserProfileMutation"}})},onCompleted:()=>{o(),h.success=!0}}),h},[r,o,i]),x=n.useCallback(async g=>{const h={profilePicSuccess:!1};return await d({variables:{profilePictureLink:g},onError:({networkError:p=null,graphQLErrors:m=[]})=>{const[C]=m;r((C==null?void 0:C.message)??p),xe(new Error((C==null?void 0:C.message)??p),{tags:{section:"useUpdateUserProfileMutation"}})},onCompleted:()=>{h.profilePicSuccess=!0}}),h},[r,d]);return{loading:s,homeNoumAboutMeHelper:b,homeNoumAboutMeProfilePicHelper:x}}const ja=T.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  min-width: 322px;
  /* min-height: 182px; */

  @media (max-width: ${X.TABLET_L}) {
    min-width: 704px;
    min-height: 96px;
  }

  @media (max-width: ${X.MOBILE_MAX}) {
    width: 100%;
    min-width: unset;
    margin: unset;
  }

  background: var(--bg-card-brand-primary-default);
  border-radius: 16px;
  flex: none;
  flex-grow: 0;
`,qa=T.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  width: calc(100% - 32px);
  gap: 16px;
`,Xa=T.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  width: 100%;
  min-width: 290px;
  max-height: 72px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  @media (max-width: ${X.TABLET_L}) {
    min-width: 672px;
    max-height: 50px;
  }

  @media (max-width: ${X.MOBILE_MAX}) {
    min-width: unset;
    max-height: 72px;
  }
`,Ja=T.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  width: 100%;
  min-width: 290px;
  height: 38px;
  justify-content: space-between;
  background: var(--bg-profile-completion-brand-primary-default);
  border-radius: 8px;
  cursor: pointer;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  @media (max-width: ${X.TABLET_L}) {
    min-width: 672px;
  }

  @media (max-width: ${X.MOBILE_MAX}) {
    /* min-width: 311px; */
    min-width: unset;
  }
`,Za=T.div`
  padding: 8px 0px 8px 12px;
  width: 100%;
  min-width: 223px;

  @media (max-width: ${X.TABLET_L}) {
    min-width: 605px;
  }

  @media (max-width: ${X.MOBILE_MAX}) {
    min-width: 244px;
  }
`,Ga=T.div`
  padding: 8px 12px 8px 0px;
  cursor: pointer;
`,Qa=T.div`
  width: 100%;
  border-radius: 4px;
`,Ka=T.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: 100%;
  min-width: 290px;

  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
`;function Ya({profileProgressItems:t,profileProgressPercentage:a,onItemClicked:r,isTokensAlloted:o}){const{t:i}=he(),c=Yt();return e(ja,{"data-testid":"noumprogress-testid","data-test":"StyledNoumProgressWrapper",children:S(qa,{"data-test":"StyledNoum",children:[S(Xa,{"data-test":"StyledFrame",children:[e(D,{font:"body-l-bold",colorToken:"--text-profile-completion-header-neutral-alt-default","data-test":"TSpan",children:i("noumena.noumprogress.profile_completenes",{completeness:a})}),a!==100&&!o&&e(D,{font:"body-m-bold",colorToken:"--text-profile-completion-brand-secondary-default","data-test":"TSpan",children:e($e,{i18nKey:"noumena.noumprogress.profile_complete",components:{bold:e(D,{colorToken:"--text-profile-completion-neutral-alt-default","data-test":"TSpan"})},"data-test":"Trans"})})]}),e(Qa,{"data-test":"ProgressBarWrapper",children:e(ea,{percentage:a,backgroudColor:"var(--bg-progressbar-brand-primary-hightlighted)",barSize:8,color:"var(--bg-progressbar-neutral-alt-default)","data-test":"ProgressBar"})}),e(Ka,{"data-test":"ProgressItems",children:t.map(d=>S(Ja,{onClick:()=>r(d.id),"data-test":"StyledItem",children:[e(Za,{"data-test":"StyledDiv",children:e(D,{font:c===ta.MOBILE?"body-m-bold":"body-l-bold",colorToken:"--text-profile-completion-neutral-alt-default","data-test":"TSpan",children:d.name})}),e(Ga,{"data-test":"StyledButtonDiv",children:e(D,{font:"button-m",colorToken:"--text-button-neutral-alt-default","data-test":"TSpan",children:Sa(`${i("noumena.noumprogress.add")} `)})})]},d.id))})]})})}function en(){const{addToast:t}=Ce(),a=n.useCallback(c=>{t("error","none",`${y("noumena.toast_error.text")}: ${c}`)},[t]),[r,{loading:o}]=aa(),i=n.useCallback(async c=>{let d=[];return await r({variables:{search:c},onError:({networkError:l=null,graphQLErrors:s=[]})=>{const[b]=s;a((b==null?void 0:b.message)??l),xe(new Error((b==null?void 0:b.message)??l),{tags:{section:"useGetLocationLazyQuery"}})},onCompleted:l=>{l!=null&&l.getLocation&&(d=l==null?void 0:l.getLocation)}}),d},[a,r]);return{locationsLoading:o,locationHelper:i}}const tn=({options:t=[],onSelect:a=()=>{},onClear:r=()=>{},showValue:o="",error:i,helperText:c,setTextFieldValue:d,register:l,setSuggestedOptions:s,...b})=>{const[x,g]=n.useState(o),[h,p]=n.useState(!0),[m,C]=n.useState(t),u=!!(window!=null&&window.navigator.userAgent.match(/iPhone/i)),[M,v]=n.useState(!1),E=k=>{p(!1),B(),g(k),d&&d(k)},A=()=>{g(""),r()},{locationHelper:W,locationsLoading:w}=en(),B=n.useCallback(async()=>{if(x==="")return;const I=(await W(x)).map(N=>({key:je(),type:"value",label:(N==null?void 0:N.description)||"",value:(N==null?void 0:N.description)||"",fontFamily:"var(--font-body-medium-bold-font)"}));C(I),s==null||s(I)},[W,x,s]);return n.useEffect(()=>{h&&g(o)},[h,o]),e(Xe,{inputValue:x,options:m,onSelectOption:k=>{g(k.label),a(k),v(!1)},onInputChange:E,hideIcons:!0,isLoading:w,isOpen:M&&x!=="",usePortal:!1,placement:"top",calRefTop:!0,usePopStyle:u,"data-test":"SearchSelectAPI-Dropdown",children:({inputProps:k,inputRef:I})=>e(me,{...k,...b,ref:I,inputSize:"normal",rightIcon:M&&x!==""?x.trim()&&e(j,{name:"clear_m",color:"--border-input-brand-primary-default",size:16,onClick:A,"data-test":"SearchSelectAPI-Icon"}):null,"data-testid":"input-component",value:x,onChange:N=>E(N.target.value),error:i,helperText:c,onFocus:()=>{v(!0),E(x)},"data-test":"SearchSelectAPI-TextField"})})},an=T.div`
  width: 100%;
  text-align: center;
  div {
    margin: auto;
  }
  @media (max-width: ${X.TABLET_L}) {
    text-align: left;
    div {
      margin: 0;
    }
  }
`,nn=T.div`
  display: flex;
  justify-content: center;
`,on=T.form`
  width: 100%;
  label {
    width: fit-content;
  }
  @media (max-width: ${X.TABLET_L}) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`,tt=t=>{var a,r,o,i,c,d,l;return{profile:{profilePicture:(r=(a=t==null?void 0:t.uid)==null?void 0:a.profile)==null?void 0:r.profilePicture},firstName:((o=t==null?void 0:t.uid)==null?void 0:o.firstName)||void 0,lastName:((i=t==null?void 0:t.uid)==null?void 0:i.lastName)||void 0,title:((c=t==null?void 0:t.uid)==null?void 0:c.title)||"",bio:((d=t==null?void 0:t.uid)==null?void 0:d.bio)||"",location:((l=t==null?void 0:t.uid)==null?void 0:l.location)||""}},rn=n.memo(t=>{var O,P,z,L,V,H;const{t:a}=he(),{space:r,refetchConnectedMembers:o}=Ae(),[i,c]=n.useState(((P=(O=r==null?void 0:r.uid)==null?void 0:O.profile)==null?void 0:P.profilePicture)||void 0),[d,l]=n.useState(!1),[s,b]=n.useState(()=>tt(r)),{homeNoumAboutMeHelper:x,homeNoumAboutMeProfilePicHelper:g,loading:h}=$a(),p=Ee({firstName:Q().required(a("noumena.home_noum.about_me.error.name_required")).min(2,a("noumena.signup.first_name.too_short")).max(20,a("noumena.signup.first_name.too_long")).test("Two letter name validation",a("noumena.signup.two_digit_first_name.incorrect"),_=>_&&_.length<=2?Qe.test(_):!0).matches(Ke,a("noumena.home_noum.about_me.error.first_name_alpha_only")),lastName:Q().required(a("noumena.home_noum.about_me.error.name_required")).min(2,a("noumena.signup.last_name.too_short")).max(20,a("noumena.signup.last_name.too_long")).test("Two letter name validation",a("noumena.signup.two_digit_last_name.incorrect"),_=>_&&_.length<=2?Qe.test(_):!0).matches(Ke,a("noumena.home_noum.about_me.error.last_name_alpha_only")),title:Q().notRequired().max(64,a("noumena.home_noum.about_me.error.title_maximum_length")),bio:Q().notRequired().max(750,a("noumena.home_noum.about_me.error.bio_maximum_length"))}).required(),{register:m,reset:C,trigger:u,setValue:M,handleSubmit:v,formState:{errors:E,isValid:A}}=Ie({resolver:Ne(p),mode:"all",reValidateMode:"onBlur"}),W=n.useCallback(async _=>{let F={profilePicSuccess:!1};d&&(F=await g(""));const{success:Z}=await x({...s,firstName:_.firstName,lastName:_.lastName,profile:i?{profilePicture:i}:void 0});Z&&(d===!0&&(F==null?void 0:F.profilePicSuccess)===!0||d===!1&&(F==null?void 0:F.profilePicSuccess)===!1)&&t.handleSuccess(),o()},[d,x,s,i,o,g,t]),w=n.useCallback(_=>{b({...s,[_.currentTarget.name]:_.currentTarget.value})},[s,b]),B=n.useCallback(_=>{l(!1),c(_),M("profileImage",_),u("profileImage")},[c,M,u,l]),k=n.useCallback(()=>{var _,F;b(tt(r)),c(((F=(_=r==null?void 0:r.uid)==null?void 0:_.profile)==null?void 0:F.profilePicture)||void 0),C(),t.handleClose(!0)},[b,C,t,r,c]),{width:I}=fe(),N=I>=ie.TABLET_L,R=n.useCallback(_=>{b({...s,location:_.value})},[b,s]),J=n.useCallback(()=>{b({...s,location:""})},[b,s]);return S(ce,{testId:"testHomeNoumAboutMe",open:t.isOpen,onClose:k,enableCloseButton:!0,closeButtonStyles:{tertiary:!0},size:be.XL,disableBackdropClick:!0,"data-test":"HomeNoumAboutMe-Modal",children:[e(se,{isFullScreen:!N,"data-test":"HomeNoumAboutMe-ModalHeader",children:a("noumena.home_noum.about_me.section_title")}),S(pe,{mobileFlex:!0,align:"center","data-test":"HomeNoumAboutMe-ModalBody",children:[e(an,{"data-test":"HomeNoumAboutMe-ImageWrapper",children:e(nn,{"data-test":"HomeNoumAboutMe-ProfileImage",children:e(na,{size:"XXL",url:i,onContentChange:B,onClear:()=>{B(""),l(!0)},maximumFileSize:5,defaultImagePlaceHolder:oa,"data-test":"HomeNoumAboutMe-EditableAvatar"})})}),e(U,{height:24,"data-test":"HomeNoumAboutMe-Spacer"}),S(on,{onSubmit:v(W),"data-test":"HomeNoumAboutMe-StyledForm",children:[e(me,{...m("firstName",{required:{value:!0,message:a("noumena.home_noum.about_me.error.name_required")},onChange:w}),value:s.firstName||void 0,label:a("noumena.home_noum.about_me.first_name_label"),error:!!E.firstName,helperText:(z=E.firstName)==null?void 0:z.message,"data-test":"HomeNoumAboutMe-TextField"}),e(U,{height:16,"data-test":"HomeNoumAboutMe-Spacer"}),e(me,{...m("lastName",{required:{value:!0,message:a("noumena.home_noum.about_me.error.name_required")},onChange:w}),value:s.lastName||void 0,label:a("noumena.home_noum.about_me.last_name_label"),error:!!E.lastName,helperText:(L=E.lastName)==null?void 0:L.message,"data-test":"HomeNoumAboutMe-TextField"}),e(U,{height:16,"data-test":"HomeNoumAboutMe-Spacer"}),e(me,{...m("title",{onChange:w,maxLength:{value:64,message:a("noumena.home_noum.about_me.error.title_maximum_length")}}),value:s.title||"",label:a("noumena.home_noum.about_me.title_label"),error:!!E.title,helperText:(V=E.title)==null?void 0:V.message,multiple:!0,maxLength:64,"data-test":"HomeNoumAboutMe-TextField"}),e(U,{height:16,"data-test":"HomeNoumAboutMe-Spacer"}),e(Je,{...m("bio",{onChange:w,maxLength:{value:750,message:a("noumena.home_noum.about_me.error.bio_maximum_length")}}),resize:!1,autoResize:!0,value:s.bio||"",label:a("noumena.home_noum.about_me.description_label"),error:!!E.bio,helperText:(H=E.bio)==null?void 0:H.message,multiple:!0,maxLength:750,"data-test":"HomeNoumAboutMe-TextArea"}),e(U,{height:24,"data-test":"HomeNoumAboutMe-Spacer"}),S("div",{children:[e(D,{"data-testid":"labelLocation",font:"body-l-bold",colorToken:"--text-body-header-neutral-default","data-test":"HomeNoumAboutMe-TSpan",children:a("noumena.home_noum.about_me.location.heading")}),e(U,{height:16,"data-test":"HomeNoumAboutMe-Spacer"}),e(tn,{showValue:s.location||"",onSelect:R,onClear:J,"data-test":"HomeNoumAboutMe-SearchSelectAPI"})]})]})]}),e(de,{"data-test":"HomeNoumAboutMe-ModalFooter",children:e($,{type:"submit",primary:!0,size:"full",loading:h,secondary:!A,tertiary:!A,disabled:!A||h,onClick:v(W),"data-test":"HomeNoumAboutMe-Button",children:a("noumena.home_noum.about_me.save_changes")})})]})}),ln=T.form`
  width: 100%;
  overflow-y: auto;
  flex: 1;
  ${mt}
  label {
    width: fit-content;
  }
  @media (max-width: ${X.TABLET_L}) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`,sn=n.memo(t=>{const{flags:{noumEditor2:a}}=ge(),{addToast:r}=Ce(),{t:o}=he(),{space:i}=Ae(),{addElementsHelper:c,loading:d}=pt(),l=ke.getElementInSpaceByType(i,f.BusinessBrief),s=le.getBodyContentJson(l),b=(i==null?void 0:i._id)||"",{width:x}=fe(),g=x>ie.TABLET_L,[h]=n.useState(s||""),[p,m]=n.useState(s||""),{publishNoumLayoutHelper:C}=kt(),{updateElementHelper:u,loading:M}=Be(),{publishSpaceHelper:v,loading:E}=vt(),A=n.useCallback(async w=>{if(w.preventDefault(),p==="<p><br></p>"||!p){r("error","none",o("noumena.chamber_edit.add_reference.empty_content")),m("");return}if(l._id){const B=await u(b,{elementId:l._id,bodyContent:p,bodyContentJson:null,position:l.position??t.position,status:K.Published,bodyContentType:ye.Json,percentCompleted:100}),k=await v(b,i);B&&k&&t.handleSuccess()}else{const B={elementType:f.BusinessBrief,status:K.Published,bodyContentType:ye.Json,bodyContent:p,bodyContentJson:null,position:1,percentCompleted:100},k=await c(b,B,a);a&&await C(b),k&&t.handleSuccess()}},[p,l._id,l.position,r,o,c,b,a,C,t,u,v,i]),W=n.useCallback(()=>{m(s||""),t.handleClose(!0)},[t,m,s]);return S(ce,{testId:"testHomeNoumBusinessBrief",enableCloseButton:!0,open:t.isOpen,onClose:W,size:be.XL,disableBackdropClick:!0,"data-test":"HomeNoumBusinessBrief-Modal",children:[e(se,{"data-test":"HomeNoumBusinessBrief-ModalHeader",children:o("noumena.home_noum.business_brief.section_title")}),e(pe,{style:{height:g?"420px":"100%"},"data-test":"HomeNoumBusinessBrief-ModalBody",children:e(ln,{onSubmit:A,"data-test":"HomeNoumBusinessBrief-StyledForm",children:e(Ct,{placeholder:o("noumena.home_noum.business_brief.rte_placeholder"),initialValue:h,onContentChange:w=>{m(w.value??"")},width:"100%",inModal:!0,editEnabled:!0,"data-test":"HomeNoumBusinessBrief-RichTextEditor"})})}),e(de,{marginTop:g?16:0,"data-test":"HomeNoumBusinessBrief-ModalFooter",children:e($,{style:g?void 0:{position:"absolute",right:24,top:24},type:"submit",primary:!0,size:g?"large":"small",loading:d||M||E,secondary:p==="",tertiary:p==="",disabled:p===""||d||M||E,onClick:A,"data-test":"HomeNoumBusinessBrief-Button",children:o("noumena.homenoum.save_and_publish")})})]})}),at=10,dn=(t,a,r,o=at)=>{const{data:i,loading:c,error:d,fetchMore:l,refetch:s}=ia({variables:{experienceId:t,status:a,limit:r?o:at},fetchPolicy:"cache-and-network",skip:!t}),{references:b,count:x,totalCount:g}=n.useMemo(()=>{var C,u,M;return{references:((C=i==null?void 0:i.getNoumReferences)==null?void 0:C.data)||[],count:(((u=i==null?void 0:i.getNoumReferences)==null?void 0:u.data)||[]).length,totalCount:((M=i==null?void 0:i.getNoumReferences)==null?void 0:M.count)||0}},[i]),h=x<g?"hasNextPage":"end",p=n.useCallback(async()=>{try{await l({variables:{limit:o,offset:x}})}catch(C){console.log(C)}},[x,l,o]),m=n.useCallback(async()=>{try{await s()}catch(C){console.log(C)}},[s]);return{references:ra(b)||[],loading:c,error:d,infiniteState:h,fetchMoreReferences:p,refetchReferences:m}};function Fe(t,a=10){return new Promise(r=>{setTimeout(()=>{t(),r()},a)})}const cn=n.forwardRef(({currentTitle:t="",rightPadding:a,isCollapse:r,setIsCollapse:o,children:i,isCollapseDisabled:c,showFullTitle:d=!1,showCollapseBtn:l=!0,fullWidth:s,...b},x)=>{const{flags:{noumEditor2:g}}=ge(),h=p=>{c?p.preventDefault():o(!r)};return S(St,{ref:x,"data-testid":"WrapperView",isEditing:!1,isCollapseDisabled:!!c,fullWidth:s,...b,onClick:h,"data-test":"ViewMode-WrapperHead",children:[!g&&e(Ea,{showCollapseBtn:l,isCollapseDisabled:!!c,"data-testid":"collapse-button",onClick:h,"data-test":"ViewMode-WrapperCollapse",children:r?e(j,{name:"chevron_small_down_m",size:24,color:"--icon-button-neutral-default","data-test":"ViewMode-Icon"}):e(j,{name:"chevron_small_up_m",size:24,color:"--icon-button-neutral-default","data-test":"ViewMode-Icon"})}),e(Ma,{collapse:r,showFullTitle:d,rightPadding:`${a&&a*.18}px`,"data-test":"ViewMode-WrapperTitleView",children:e(wa,{font:"heading-xs-bold",colorToken:"--text-body-header-neutral-default","data-test":"ViewMode-WrapperTitleLabel",children:t})})]})}),Bt=n.memo(t=>{const{t:a}=he(),{removeElementHelper:r,loading:o}=wt(),{elementType:i}=t,c=n.useMemo(()=>{switch(i){case f.Calendar:return a("noumena.container.tool_delete.title");default:return a("noumena.container.element_delete.title")}},[i,a]),d=n.useMemo(()=>{switch(i){case f.Calendar:return e($e,{i18nKey:"noumena.container.calendar_delete.body",components:{b:e(D,{font:"body-l",colorToken:"--text-modal-neutral-highlighted",textAlign:"center","data-test":"ElementDelete-bodyMessage-TSpan"})},"data-test":"ElementDelete-bodyMessage-Trans"});case f.FilesManager:return e($e,{i18nKey:"noumena.file_manager.element_delete",components:{b:e(D,{font:"body-l",colorToken:"--text-modal-neutral-highlighted","data-test":"ElementDelete-bodyMessage-TSpan"})},"data-test":"ElementDelete-bodyMessage-Trans"});default:return a("noumena.container.element_delete.body",{elementTitle:t.elementTitle})}},[i,t.elementTitle,a]),l=n.useMemo(()=>{switch(i){case f.Message:return a("noumena.chat.edit_mode.delete_confirmation_message");case f.Calendar:return a("noumena.calendar.edit_mode.delete_confirmation_message");default:return null}},[i,a]),[s]=la(),b=n.useCallback(async()=>{Object.prototype.hasOwnProperty.call(t,"elementType")&&i===f.Wallet&&await s({variables:{chamberId:t.spaceId},onError:({networkError:g=null,graphQLErrors:h=[]})=>{const[p]=h;xe(new Error((p==null?void 0:p.message)??g),{tags:{section:"deleteQuestionMutation"}})}});const x=await r(t.spaceId,t.elementId);t.handleClose(x)},[i,t,r,s]);return e(ce,{isFullScreen:!1,testId:"testElementDelete",open:t.isOpen||o,onClose:t.handleClose,size:be.S,disableBackdropClick:!0,"data-test":"ElementDelete-Modal",children:o?S(Tt,{"data-test":"ElementDelete-WrapperLoading",children:[S(Et,{"data-test":"ElementDelete-WrapperSpinner",children:[e(He,{"data-test":"ElementDelete-Spinner"}),e(U,{height:"20px","data-test":"ElementDelete-Spacer"})]}),e(U,{height:"16px","data-test":"ElementDelete-Spacer"}),e(D,{"data-testid":"bodyElementDeleteSaving",font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"ElementDelete-TSpan",children:a("noumena.container.element_delete.body.loading")})]}):S(q,{children:[e(se,{"data-test":"ElementDelete-ModalHeader",children:c}),S(pe,{align:"center","data-test":"ElementDelete-ModalBody",children:[e(D,{"data-testid":"bodyElementDelete",font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"ElementDelete-TSpan",children:d}),e(U,{height:12,"data-test":"ElementDelete-Spacer"}),l&&e(D,{"data-testid":"extraBodyElementDelete",font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"ElementDelete-TSpan",children:l})]}),S(de,{flexDirection:"column",marginTop:12,gap:16,"data-test":"ElementDelete-ModalFooter",children:[e($,{"data-testid":"confirmElementDelete",primary:!0,intent:"negative",size:"full",onClick:t.handleDeleteProps?t.handleDeleteProps:b,"data-test":"ElementDelete-Button",children:a("noumena.container.element_delete")}),e($,{"data-testid":"cancelElementDelete",tertiary:!0,size:"full",onClick:()=>t.handleClose(),"data-test":"ElementDelete-Button",children:a("noumena.container.element_delete.cancel")})]})]})})}),un=n.memo(t=>{const{t:a}=he(),[r,o]=n.useState(!1),[i]=ht(),{removeElementHelper:c,loading:d}=wt(),l=n.useCallback(async()=>{const b=await c(t.spaceId,t.elementId);t.handleClose(b),o(!1)},[t,c]),s=n.useCallback(async()=>{var g,h,p;((p=(h=(g=(await i({fetchPolicy:"network-only",variables:{chamberId:t.spaceId}})).data)==null?void 0:g.getSubWalletBalance)==null?void 0:h.amount)==null?void 0:p.value)===0?o(!0):(t.handleClose(),t.setShowNonZeroWalletModal(!0))},[i,t]);return e(ce,{testId:"testCloseWallet",open:t.isOpen||d,onClose:t.handleClose,disableBackdropClick:!0,size:be.S,"data-test":"CloseWallet-Modal",children:d?S(Tt,{"data-test":"CloseWallet-WrapperLoading",children:[S(Et,{"data-test":"CloseWallet-WrapperSpinner",children:[e(He,{"data-test":"CloseWallet-Spinner"}),e(U,{height:"20px","data-test":"CloseWallet-Spacer"})]}),e(U,{height:"16px","data-test":"CloseWallet-Spacer"}),e(D,{colorToken:"--text-modal-neutral-default","data-testid":"bodyElementDeleteSaving",font:"body-l","data-test":"CloseWallet-TSpan",children:a("noumena.container.element_delete.body.loading")})]}):e(Mt,{"data-test":"CloseWallet-CloseWalletWrapperModalChildren",children:r?S(q,{children:[e(se,{"data-test":"CloseWallet-ModalHeader",children:a("noumena.container.close_subWallet.noumwalletclosed")}),e(pe,{align:"center","data-test":"CloseWallet-ModalBody",children:e(j,{name:"success_cq_xxxl",size:96,"data-test":"CloseWallet-Icon"})}),e(de,{flexDirection:"column",gap:16,"data-test":"CloseWallet-ModalFooter",children:e($,{"data-testid":"cancel1CloseWallet",primary:!0,size:"full",onClick:()=>l(),"data-test":"CloseWallet-Button",children:a("noumena.container.close_subwallet.close")})})]}):S(q,{children:[e(se,{"data-test":"CloseWallet-ModalHeader",children:a("noumena.container.close_subWallet.title")}),e(pe,{"data-test":"CloseWallet-ModalBody",children:e(D,{font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"CloseWallet-TSpan",children:a("noumena.container.close_subwallet.walletDeleteText")})}),S(de,{flexDirection:"column",gap:16,"data-test":"CloseWallet-ModalFooter",children:[e($,{"data-testid":"confirmCloseWallet",primary:!0,size:"full",onClick:()=>s(),"data-test":"CloseWallet-Button",children:a("noumena.container.close_subwallet.Continue")}),e($,{"data-testid":"cancelCloseWallet",tertiary:!0,size:"full",onClick:()=>t.handleClose(),"data-test":"CloseWallet-Button",children:a("noumena.container.close_subwallet.Cancel")})]})]})})})}),mn=n.memo(t=>{const{t:a}=he(),r=n.useCallback(async()=>{t.handleClose()},[t]);return e(ce,{size:be.S,testId:"testCloseWallet",open:t.isOpen,onClose:t.handleClose,disableBackdropClick:!0,"data-test":"NonZeroWalletModal-Modal",children:S(Mt,{"data-test":"NonZeroWalletModal-CloseWalletWrapperModalChildren",children:[e(se,{"data-test":"NonZeroWalletModal-ModalHeader",children:a("noumena.container.close_subWallet.title")}),e(D,{colorToken:"--text-modal-neutral-default",font:"body-l","data-test":"NonZeroWalletModal-TSpan",children:a("noumena.container.close_subwallet.nonZeroWalletBalanceTest")}),e(de,{"data-test":"NonZeroWalletModal-ModalFooter",children:e($,{"data-testid":"confirmCloseWallet",primary:!0,size:"full",onClick:()=>r(),"data-test":"NonZeroWalletModal-Button",children:a("noumena.container.close_subwallet.Ok")})})]})})}),pn=n.forwardRef(({spaceId:t,element:a,currentTitle:r="",currentIndex:o,totalIndex:i,children:c,onUpClick:d,onDownClick:l,provided:s,handleOpenExperienceModal:b,isCustomPreview:x,isCustomPreviewVisible:g,handleCPVisibilityChange:h,isPostCustomPreview:p,updateElementLoader:m,...C},u)=>{const{flags:{noumEditor2:M}}=ge(),{space:v,loading:E}=ft(),{updateElementHelper:A}=Be(),[W]=ht(),[w,B]=n.useState(!1),[k,I]=n.useState(!1),[N,R]=n.useState(!1),[J,O]=n.useState(!1),[P,z]=n.useState(r),[L,V]=n.useState(r),H=()=>{V(P),B(!w),Z(P)},_=a.elementType,F=n.useCallback(async()=>{var we,We,Re;((Re=(We=(we=(await W({fetchPolicy:"network-only",variables:{chamberId:t}})).data)==null?void 0:we.getSubWalletBalance)==null?void 0:We.amount)==null?void 0:Re.value)===0?R(!0):O(!0)},[W,t]),Z=n.useCallback(async ne=>{const ee={elementId:a._id,bodyContent:le.getBodyContent(a),bodyContentJson:le.getBodyContentJson(a),headerContent:_===f.Text&&!ne?"TEXT":ne,position:le.getPosition(a),status:K.Unsaved};await A(t,ee)},[a,t,A,_]),Y=ne=>{ne.key==="Enter"&&H()},te=()=>{B(!w),z(L)},re=n.useCallback(()=>{_===f.Wallet&&a.status===K.Published?F():I(!0)},[a.status,_,F]),ae=()=>{I(!1)},oe=()=>{R(!1)},_e=()=>{O(!1)},Me=ne=>{z(ne.target.value)},G=le.isHomeNoumType(_),ue=(v==null?void 0:v.type)===qe.Home&&(_===f.Message||_===f.Userposts||_===f.Skills),Se=_===f.PublicationDesignPatterns||_===f.EducationTraining||_===f.AchievementAward||_===f.PersonalInterest||_===f.SocialInterest||_===f.ProjectWorkExperience,Te=n.useCallback(ne=>{ne.stopPropagation(),b&&b(_)},[_,b]),ze=_===f.Text||_===f.Video||_===f.QuickQuestions||_===f.Calendar||_===f.Image,Ve=()=>{h==null||h(!0)};return S(q,{children:[S(St,{isEditing:!0,fullWidth:!M||!Se,isPostCustomPreview:p,"data-testid":"wrapperEditing",ref:u,...C,"data-test":"EditMode-WrapperHead",children:[S(va,{"data-testid":"headContent","data-test":"EditMode-HeadContent",children:[(!M||x)&&S(q,{children:[" ",e(Oe,{...s==null?void 0:s.dragHandleProps,className:"xs-hidden","data-test":"EditMode-WrapperIcons",children:e(j,{name:"order_m",size:24,color:"--icon-button-neutral-default","data-test":"EditMode-Icon"})}),S(ka,{"data-test":"EditMode-WrapperInline",children:[e(Oe,{disabled:o===0,onClick:d,"data-test":"EditMode-WrapperIcons",children:e(j,{name:"chevron_small_up_m",size:24,color:"--icon-button-neutral-default","data-test":"EditMode-Icon"})}),e(Oe,{disabled:o===i,onClick:l,"data-test":"EditMode-WrapperIcons",children:e(j,{name:"chevron_small_down_m",size:24,color:"--icon-button-neutral-default","data-test":"EditMode-Icon"})})]})]}),w?e(me,{maxLength:30,hideLengthHelperText:!0,"data-testid":"TextField",autoFocus:!0,value:P,inputSize:"small",onChange:Me,onKeyDown:Y,disabled:_===f.Wallet,"data-test":"EditMode-TextField"}):G||_===f.Message||_===f.Wallet||_===f.QuickQuestions||_===f.Skills||_===f.Calendar||_===f.FilesManager||_===f.ContractManager||_===f.Userposts?e(et,{noumEditor2:M&&!x,"data-test":"EditMode-WrapperTitleNoEdit",children:e(D,{font:"heading-xs-bold",colorToken:"--text-body-header-neutral-default","data-test":"EditMode-TSpan",children:r})}):!M&&!x?e(Ba,{"data-testid":"wrapperTitle",onClick:()=>B(!M&&!w),"data-test":"EditMode-WrapperTitle",children:L}):(!M||x)&&e(et,{"data-test":"EditMode-WrapperTitleNoEdit",children:e(D,{font:"heading-xs-bold",colorToken:"--text-body-header-neutral-default","data-test":"EditMode-TSpan",children:r})})]}),e(Aa,{"data-test":"EditMode-WrapperHeadActionButtons",children:w?S(q,{children:[e(Ia,{"data-test":"EditMode-WrapperHeadCrossButton",children:e($,{"data-testid":"onClose",secondary:!0,size:"small",intent:"negative",textOnly:!0,onClick:te,icon:e(j,{color:"--icon-button-danger-secondary-default",name:"close_m",size:24,"data-test":"EditMode-Icon"}),"data-test":"EditMode-Button"})}),e(Na,{"data-test":"EditMode-WrapperHeadCheckButton",children:e($,{"data-testid":"onConfirm",size:"small",textOnly:!0,onClick:H,icon:e(j,{color:"--icon-button-brand-secondary-default",name:"check_xs",size:24,"data-test":"EditMode-Icon"}),"data-test":"EditMode-Button"})})]}):S(q,{children:[Se&&e(Wa,{primary:!M,secondary:M,type:"button","data-testid":"addBtn",size:"small",onClick:ne=>Te(ne),noumEditor2:M&&!x,loading:m,"data-test":"EditMode-ChamberAddButton",children:e(j,{color:M?"--icon-button-brand-secondary-default":"--icon-button-neutral-alt-default",name:"plus_m",size:24,"data-test":"EditMode-Icon"})}),x&&ze&&e(Ra,{"data-testid":"chamberVisibilityChangeButton",secondary:!0,disabled:E,size:"small",onClick:Ve,"data-test":"EditMode-ChamberVisibilityChangeButton",children:e(j,{name:g?"eye_on_solid_m":"eye_off_solid_m",size:24,color:"--icon-button-brand-secondary-default","data-test":"EditMode-Icon"})}),p?S(Ha,{"data-test":"EditMode-HeadTag",children:[e(Pa,{"data-title":y("noumena.noum_edit.custom_previews.tooltip.message"),"data-test":"EditMode-ToolTipHead",children:e(j,{name:"info_m",size:20,color:"--icon-tag-neutral","data-test":"EditMode-Icon"})}),e(D,{font:"body-m-bold",colorToken:"--text-tag-neutral-default","data-test":"EditMode-TSpan",children:y("noumena.noum_edit.custom_previews.hidden.post")})]}):!M&&!ue&&!x&&e(La,{"data-testid":"deleteBtn",secondary:!0,size:"small",intent:"negative",onClick:re,"data-test":"EditMode-ChamberDeleteButton",children:_===f.Wallet&&a.status===K.Published?"Close This Wallet":e(j,{name:"delete_m",size:24,color:"--icon-button-danger-secondary-default","data-test":"EditMode-Icon"})})]})})]}),e(Bt,{spaceId:t,elementId:a._id||"",elementTitle:P,elementType:_,isOpen:k,handleClose:ae,"data-test":"EditMode-ElementDelete"}),e(un,{spaceId:t,elementId:a._id||"",isOpen:N,handleClose:oe,setShowNonZeroWalletModal:O,"data-test":"EditMode-CloseWallet"}),e(mn,{isOpen:J,handleClose:_e,"data-test":"EditMode-NonZeroWalletModal"})]})}),hn=n.forwardRef(({currentTitle:t=""})=>e(za,{"data-test":"ViewModeNoumEditor-TitleContainer",children:S(D,{font:"heading-xs-bold",colorToken:"--text-body-header-neutral-default","data-test":"ViewModeNoumEditor-TSpan",children:[" ",t," "]})})),fn=n.createContext({isCollapse:!1,expand:()=>{}}),So=n.forwardRef((t,a)=>{const{spaceId:r,element:o,currentTitle:i="",currentIndex:c,totalIndex:d,isEditing:l=!1,isSpecialCollapsing:s=!1,children:b,lift:x,provided:g,isBorder:h=!1,handleOpenExperienceModal:p,hideContent:m,setShowAll:C,isCustomPreview:u,handleCPVisibilityChange:M,selectedCustomPreviewTab:v,isHighlight:E,showFullTitle:A=!1,updateElementLoader:W,...w}=t,{flags:{noumEditor2:B,noumCustomPreivewV2:k}}=ge(),{t:I}=he(),[N,R]=n.useState(!(B&&!u)),[J,O]=n.useState(),[P,z]=n.useState(),[L,V]=n.useState(),H=!C,{isConnected:_,isFollowing:F}=Ae();n.useEffect(()=>{L||V(P==null?void 0:P.clientHeight)},[L,P==null?void 0:P.clientHeight]);const Z=n.useMemo(()=>o.elementType===f.BusinessBrief||o.elementType===f.Home||o.elementType===f.Text||o.elementType===f.Skills,[o.elementType]),Y=n.useMemo(()=>o.elementType===f.Video||o.elementType===f.Text||o.elementType===f.Image||o.elementType===f.BusinessBrief,[o.elementType]),te=n.useMemo(()=>o.elementType===f.Video||o.elementType===f.Text||o.elementType===f.Image,[o.elementType]),re=n.useMemo(()=>u&&o.elementType===f.Userposts&&!_&&!F,[o.elementType,_,u,F]);n.useEffect(()=>{let ee=null;return B||(Z?ee=setTimeout(()=>R(!0),10):R(!0)),()=>ee?clearTimeout(ee):void 0},[Z,u,B]);const ae=n.useCallback(ee=>{B&&!u||(R(ee),C&&C(ee))},[u,B,C]),oe=n.useCallback(()=>{ae(!1)},[ae]),_e=n.useMemo(()=>({isCollapse:H&&N,expand:oe}),[H,N,oe]),Me=n.useCallback(()=>{o.elementType===f.BusinessBrief||o.elementType===f.Home||o.elementType===f.Text||!l&&N&&ae(!1)},[o.elementType,N,l,ae]),G=n.useCallback(async ee=>{if(!x)return;const we=x(`${o._id}`);if(!we)return;const{moveDown:We,moveUp:Re,drop:Ut}=we;ee==="up"&&await Fe(Re,0),ee==="down"&&await Fe(We),await Fe(Ut,0)},[x,o]),ue=n.useCallback(()=>G("up"),[G]),Se=n.useCallback(()=>G("down"),[G]),[Te,ze]=ve(le.isCustomPreviewVisible(o)),Ve=()=>{M==null||M(!Te),ze()},ne=B&&(!u||k);return e(fn.Provider,{value:_e,children:S(Va,{isHighlight:E,ref:a,"data-testid":"wrapper",...w,isVisible:!u||u&&Te,isPostCustomPreview:re,noumEditor2:ne,isBackground:B&&Y&&!u,isContent:B&&te,"data-test":"ElementWrapper-Wrapper",children:[e(q,{children:l&&!u||v===sa.Edit?e(pn,{ref:ee=>O(ee),spaceId:r,element:o,currentTitle:i,currentIndex:c,totalIndex:d,onUpClick:ue,onDownClick:Se,provided:g,handleOpenExperienceModal:p,isCustomPreview:u,isCustomPreviewVisible:Te,handleCPVisibilityChange:Ve,isPostCustomPreview:re,updateElementLoader:W,"data-test":"ElementWrapper-EditMode"}):B&&!te&&!u?e(hn,{currentTitle:i,"data-test":"ElementWrapper-ViewModeNoumEditor"}):(!B||u)&&e(cn,{ref:ee=>O(ee),rightPadding:le.isImageAndVideoNotEmpty(o)?P==null?void 0:P.clientWidth:0,spaceId:r,element:o,currentTitle:i,isCollapse:N,setIsCollapse:ae,showFullTitle:A,"data-test":"ElementWrapper-ViewMode"})}),!m&&S(q,{children:[e(Da,{ref:ee=>z(ee),height:J==null?void 0:J.clientHeight,isEditing:l,childHeight:L,width:P==null?void 0:P.clientHeight,isBorder:h,"data-testid":"childContainer",collapse:H&&N&&!l&&!s,preview:o.elementType===f.Video||o.elementType===f.Image,isEditor:Z,onClick:Me,isPostCustomPreview:re,isVisible:!u||u&&Te,noumEditor2:ne,"data-test":"ElementWrapper-WrapperChildContainer",children:b}),Z&&N&&!l&&S(q,{children:[e(Oa,{onClick:()=>l?"":ae(!N),"data-test":"ElementWrapper-CollapseBackground"}),e(Fa,{font:"body-m-bold",colorToken:"--text-button-brand-primary-default",onClick:()=>ae(!1),"data-test":"ElementWrapper-SeeMoreWrapper",children:I("noumena.see_more")})]})]})]})})}),bn=T.div`
  display: grid;
  grid-gap: ${({isContianerWidth:t})=>t?" 0":" 16px"};
  padding: ${({isNoumEditor2:t,isContianerWidth:a})=>t&&a?"0":t&&" 0 16px 16px 16px"};
`,gn=T.div`
  box-sizing: border-box;
  width: 100%;
  background: var(--bg-card-neutral-alt-default);
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: ${({isContianerWidth:t})=>t?" 0":" 8px"};
  position: relative;
  max-height: 100%;
  ${({isOverLap:t})=>t&&`
    max-height: 250px;
    overflow-y: hidden;
    -webkit-box-shadow: 0 8px 6px -6px var(--bg-card-neutral-alt-default);
    -moz-box-shadow: 0 8px 6px -6px var(--bg-card-neutral-alt-default);
    box-shadow: 0 8px 6px -6px var(--bg-card-neutral-alt-default);
    &:after {
      bottom: 0;
      background: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.2));
    }
  `}
`,yn=T.div`
  display: grid;
  height: 48px;
  justify-content: center;
  align-items: center;
  grid-template-columns: ${({isEditMode:t,isNoumEditor2:a})=>a&&t?"1fr 28px 50px":t?"20px 20px 1fr 50px 50px":" 1fr 36px"};
  cursor: pointer;
  ${({isEditMode:t,isNoumEditor2:a})=>t&&!a?"padding: 16px;":""};
`,xn=T(D)`
  margin: 0;
  padding: 12px;
  width: 96%;
  ${da}
`,Cn=T($)`
  padding: 8px;
  margin-left: 8px;
  ${({isNoumEditor2:t})=>t&&xt`
      background: none;
      &:hover {
        background: none;
      }
    `}
`,_n=T($)`
  padding: 8px;
  margin-left: 8px;
  ${({isNoumEditor2:t})=>t&&xt`
      background: none;
      &:hover {
        background: none;
      }
    `}
`,nt=T.div`
  cursor: pointer;
  opacity: ${t=>t.disabled?"0.2":"1"};
  ${({isMobile:t})=>t&&"align-self: center;"}
  &.xs-hidden {
    ${ca}
  }
`,Sn=T.div`
  background: var(--gradient-base-overlay-default);
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
`,Tn=T.button`
  border: 1px solid var(--bg-separator-neutral-default);
  border-radius: 12px 12px 0px 0px;
  background: var(--bg-button-neutral-alt-default);
  padding: 16px;
  color: var(--text-button-brand-primary-default);
  font-weight: 600;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`,En=({id:t,title:a,body:r,isEditMode:o=!1,index:i,status:c,fullSize:d,isOpen:l,handleMoveTopOption:s,handleMoveDownOption:b,handleOpenAddExperienceModal:x,handleDeleteOption:g,handleSelectOption:h,setDefaultData:p,noumEditor2:m,isContianerWidth:C})=>{const u=n.useRef(null),M=n.useRef(null),[v,E]=n.useState(!1),[A,W]=n.useState(l),[w,B]=n.useState(r),[k,I]=n.useState(je());n.useEffect(()=>{w!==r&&(B(r),I(je()))},[w,r]),n.useEffect(()=>{W(l)},[l]);const[N,R]=n.useState(!1),J=v||A,O=()=>{p({id:t,title:a,body:r,position:i,status:c}),x()};n.useEffect(()=>{o&&W(!0)},[o]),n.useEffect(()=>{!o&&u.current&&(u.current.clientHeight>250?R(!0):R(!1))},[u,o,J]);const[P,z]=n.useState(!1),L=()=>{z(!1),g(t)},V=()=>{m&&!o?h({id:t,body:r,title:a}):R(H=>o?H:(E(H),!H))};return S(q,{children:[S(gn,{"data-testid":"SingleOptionWrapper",ref:u,isOverLap:N,isContianerWidth:C,"data-test":"SingleOption-SingleOptionWrapper",children:[S(yn,{"data-testid":"SingleOptionHeader",isEditMode:o,onClick:V,isNoumEditor2:m,"data-test":"SingleOption-SingleOptionHeader",children:[!m&&o&&e(nt,{disabled:i===0,onClick:()=>i!==0&&s(i),"data-test":"SingleOption-IconWrapper",children:e(j,{name:"chevron_small_up_m",size:24,color:"--icon-button-neutral-default","data-test":"SingleOption-Icon"})}),!m&&o&&e(nt,{disabled:i===d-1,onClick:()=>i!==d-1&&b(i),"data-test":"SingleOption-IconWrapper",children:e(j,{name:"chevron_small_down_m",size:24,color:"--icon-button-neutral-default","data-test":"SingleOption-Icon"})}),e(xn,{font:J&&!m?"heading-xs-bold":"body-m-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"SingleOption-TextHeader",children:a}),!o&&e(j,{onClick:H=>{H.preventDefault(),H.stopPropagation(),m?V():(h({id:t,body:r,title:a}),R(()=>(E(!1),!0)))},name:v?"chevron_small_down_m":"chevron_small_right_m",size:24,color:"--icon-button-neutral-default","data-test":"SingleOption-Icon"}),o&&e(Cn,{tertiary:!0,size:"small",onClick:H=>{H.stopPropagation(),O()},isNoumEditor2:m,"data-test":"SingleOption-ChamberEditButton",children:e(j,{name:"edit_m",size:24,color:m?"--icon-card-neutral-default":"--icon-button-neutral-default","data-test":"SingleOption-Icon"})}),o&&e(_n,{secondary:!0,size:"small",intent:"negative",onClick:H=>{H.stopPropagation(),z(!0)},isNoumEditor2:m,"data-test":"SingleOption-ChamberDeleteButton",children:e(j,{name:"delete_m",size:24,color:"--icon-button-danger-secondary-default","data-test":"SingleOption-Icon"})})]}),!m&&J&&e(_t,{ref:M,"data-testid":"RichTextEditorView",clickable:!o,onClick:()=>!o&&h({id:t,body:r,title:a}),html:r,"data-test":`SingleOption-RichTextEditorView-${k}`},k),!o&&!v&&(N?e(Sn,{"data-testid":"ShowMoreWrapper","data-test":"SingleOption-ShowMoreWrapper",children:e(Tn,{onClick:()=>{h({id:t,body:r,title:a}),R(H=>!H)},"data-test":"SingleOption-ShowMoreButton",children:y("noumena.chambers.toolbox.button.seemore")})}):e(q,{}))]}),e(Bt,{spaceId:"",elementId:"",elementTitle:a,isOpen:P,handleClose:()=>z(!1),handleDeleteProps:L,"data-test":"SingleOption-ElementDelete"})]})},Mn=({arrayOfOptions:t,isEditMode:a,isOpen:r,handleMoveDownOption:o,handleMoveTopOption:i,handleOpenAddExperienceModal:c,handleDeleteOption:d,handleSelectOption:l,setDefaultData:s,columnWidth:b})=>{const{width:x}=fe(),g=n.useMemo(()=>x<=ie.MOBILE_MAX,[x]),h=Ge.clone(t).sort((C,u)=>C.position>u.position?1:-1),{flags:{noumEditor2:p}}=ge(),m=n.useMemo(()=>b?b<475:g,[b,g]);return e(bn,{"data-testid":"homeChamberOptionsWrapper",isNoumEditor2:p,isContianerWidth:m,"data-test":"HomeChamberOptions-HomeChamberOptionsWrapper",children:h.map((C,u)=>e(En,{...C,isEditMode:a,index:u,isOpen:r,fullSize:t.length,handleMoveDownOption:o,handleMoveTopOption:i,handleOpenAddExperienceModal:c,handleDeleteOption:d,handleSelectOption:l,setDefaultData:s,noumEditor2:p,isContianerWidth:m,"data-test":"HomeChamberOptions-SingleOption"},C.id))})};function wn(t,a,r){const o=a<0?t.length+a:a;if(o>=0&&o<t.length){const i=r<0?t.length+r:r,[c]=t.splice(a,1);t.splice(i,0,c)}}function ot(t,a,r){const o=[...t];return wn(o,a,r),o}const vn=({spaceId:t,elementId:a,elementType:r,elementPosition:o,bodyContentJson:i="[]"})=>{const{setDisableUpdate:c,disabledUpdateElement:d,setdisabledUpdateElement:l}=n.useContext(ua),s=n.useRef(!0),[b,x]=n.useState(!1),[g,h]=n.useState(""),{t:p}=he(),[m,C]=n.useState({id:"",title:"",body:"",status:K.Unsaved}),[u,M]=n.useState(i?typeof i=="string"?JSON.parse(i).map(V=>({...V,id:V._id,status:K.Published}))||[]:i.map(V=>({...V,id:V._id,status:K.Published})):[]),v=()=>{C({id:"",title:"",body:"",status:K.Unsaved}),x(!1)},E=()=>{h("")},A=V=>{h(V)},{updateElementHelper:W,loading:w}=Be();n.useEffect(()=>{c(w)},[c,w]);const k={[f.ProjectWorkExperience]:{title:p("noumena.homeChambers.addExperience")},[f.EducationTraining]:{title:p("noumena.homeChambers.addEducation")},[f.AchievementAward]:{title:p("noumena.homeChambers.addAchievement")},[f.PublicationDesignPatterns]:{title:p("noumena.homeChambers.addNew")},[f.PersonalInterest]:{title:p("noumena.homeChambers.addNew")},[f.SocialInterest]:{title:p("noumena.homeChambers.addNew")}}[r],I=()=>{z(!0),x(!0)},N=n.useCallback(async(V,H,_,F)=>{var Z;if(typeof F=="number"){const Y=u.map((te,re)=>F===re?{...te,title:V,body:H}:te);M(Y)}else{if(!a)return;const Y=await W(t,{elementId:a,bodyContentJson:[...u,{_id:_,body:H,title:V,position:u.length}],position:o,status:K.Unsaved,bodyContentType:ye.Json},a);if(Y){const te=Y==null?void 0:Y.find(oe=>(oe==null?void 0:oe._id)===a);if(!((Z=te==null?void 0:te.unSaved)!=null&&Z.bodyContentJson))return;const re=te.unSaved.bodyContentJson.map(oe=>({...oe,id:oe._id})),ae=Ge.last(re);if(!ae)return;C({...ae,status:K.Unsaved}),M(re)}}},[a,u,t,o,W]),R=V=>{const H=u.filter(_=>_.id!==V);M(H)},J=V=>{const H=[...u],F=ot(H,V,V-1).map((Z,Y)=>({...Z,position:Y}));M(F)},O=V=>{const H=[...u],F=ot(H,V,V+1).map((Z,Y)=>({...Z,position:Y}));M(F)},[P,z]=n.useState(!1);n.useEffect(()=>{u!=null&&u.length&&!P&&z(!0),!(u!=null&&u.length)&&P&&z(!1)},[u,P]),n.useEffect(()=>{t&&a&&!s.current&&!d&&W(t,{elementId:a,bodyContentJson:u,position:o,status:K.Unsaved,bodyContentType:ye.Json}),s.current&&(s.current=!1,l(!1))},[a,u,o,t,W,d,l]);const L={[f.ProjectWorkExperience]:p("noumena.homeChambers.addExperience.currentTitle"),[f.EducationTraining]:p("noumena.homeChambers.addEducation.currentTitle"),[f.AchievementAward]:p("noumena.homeChambers.addAchievement.currentTitle"),[f.PublicationDesignPatterns]:p("noumena.homeChambers.publicationAndDesign.currentTitle"),[f.PersonalInterest]:p("noumena.homeChambers.personalInterest.currentTitle"),[f.SocialInterest]:p("noumena.homeChambers.socialInterest.currentTitle"),[f.Calendar]:p("noumena.homeChambers.calendar.currentTitle")};return{dataForAddReference:k,showExperienceModal:b,handleOpenExperienceModal:I,handleCloseExperienceModal:v,showReferenceModal:g,handleCloseAddReferenceModal:E,handleOpenAddReferenceModal:A,handleAddOption:N,arrayOfOption:u,handleDeleteOption:R,handleMoveTopOption:J,handleMoveDownOption:O,isAddedOption:P,title:L[r],setDefaultData:C,defaultData:m,updateElementLoader:w,setArrayOfOptions:M}},kn=T.div`
  display: ${({isEditReference:t})=>t?"inline-block":"grid"};
  grid-template-columns: ${({gridTemplateColumns:t,basicToolbar:a})=>t||(a===!1?"68px 1fr":"68px 1fr 68px")};
  align-items: center;
  width: 100%;
  min-height: 40px;

  @media (min-width: ${X.TABLET}) {
    grid-template-columns: ${({gridTemplateColumns:t,basicToolbar:a})=>t||(a===!1?"50px 1fr 150px":"50px 1fr 150px 65px")};
  }

  @media (min-width: ${X.LAPTOP}) {
    grid-template-columns: ${({gridTemplateColumns:t})=>t||"150px 1fr 150px"};
    min-width: 70px;
    justify-content: center;
    margin: 0;
  }
`;T(D)`
  @media (max-width: ${X.MOBILE_MAX}) {
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: ${X.MOBILE_MAX}) {
    position: absolute;
    margin-right: ${({isEdit:t})=>t?"50%":"40%"};
    text-align: center;
  }
  @media (min-width: ${X.TABLET_L}) {
    position: relative;
    margin-right: auto;
    margin-left: auto;
  }
`;const Bn=T(se)`
  justify-content: flex-end;
  @media (min-width: ${X.TABLET_L}) {
    flex-direction: row-reverse;
    justify-content: space-between;
    width: ${({isEdit:t})=>t?"75%":"100%"};
  }
`,An=T($)`
  font-size: var(--font-body-large-size);
  &:hover,
  :active {
    background-color: transparent;
  }
`,At=T($)`
  margin-left: auto;
  padding: 16px 32px;
  font-size: var(--font-input-medium-size);
  font-family: var(--font-button-medium-font);
`,It=T($)`
  font-size: var(--font-input-medium-size);
  font-family: var(--font-button-medium-font);
  margin-left: 12px;
`,In=T.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  flex: 2;
`,Nt=T.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  ${({fullWidth:t})=>t&&"width: 100%;"};

  @media (max-width: ${X.MOBILE_MAX}) {
    padding-top: 0;
  }

  @media (max-width: ${X.TABLET_L}) {
    flex: 2;
  }
`,Nn=T.div`
  margin: 8px 0px;
`,Wn=T.form`
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr 56px;
  display: grid;
`,Rn=T.div`
  width: 100%;
`,Wt=T.div`
  display: flex;
  margin-top: 16px;
  flex-direction: ${({flexDirection:t})=>t??"row"};
`,Rt=T(Ze)`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 24px;
`,Le=T.div`
  width: fit-content;
`;T.div`
  display: flex;
  align-self: baseline;
`;const Hn=T.div`
  width: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid var(--border-card-neutral-highlighted);
  background: var(--bg-card-neutral-alt-default);
`,Pn=T.div`
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`,Ln=T.div`
  display: flex;
  flex-direction: column;
`,zn=T($)`
  padding: 0;
  width: auto;
`,Vn=T.img`
  background-size: contain;
  background-position: center;
  width: 100%;
  @media (max-width: ${X.MOBILE_MAX}) {
    max-height: 222px;
  }
`,Ht=T.div`
  width: 100%;
  gap: 16px;
  box-sizing: border-box;
  margin-top: 16px;
  flex: 1;
  display: flex;
`,Dn=T(D)`
  white-space: pre-line;
`,Pt=T.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`,On=T(Pt)`
  margin-bottom: 16px;
  width: 100%;
`,Fn=T.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,it=T(D)``,Un=T(D)`
  margin: 16px 0;
`,$n=T.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Lt=({title:t,content:a,handleChangeTitle:r,handleChangeContent:o,basicToolbar:i=!1})=>{const[c]=n.useState(a);return S(Nt,{"data-testid":"EditElementWrapper",fullWidth:!0,"data-test":"EditElement-StyledTabWrapper",children:[e(me,{placeholder:y("noumena.chamber_edit.add_experience.title"),value:t,onChange:d=>r(d.target.value),"data-test":"EditElement-TextField"}),e(In,{"data-test":"EditElement-ContentContainer",children:e(Ct,{placeholder:y("noumena.chamber_edit.add_experience.placeholder"),initialValue:c,onContentChange:d=>{o(d.value??"")},basicToolbar:i,minHeight:"100%",width:"calc(100% - 2px)",inModal:!0,editEnabled:!0,"data-test":"EditElement-RichTextEditor"})})]})},jn=n.memo(t=>{var g,h,p;const{flags:{noumEditor2:a}}=ge(),{toolMetaValue:r,handleChangeToolMetaValue:o,updateToolMetaValue:i,activeEditingTool:c,mediaUploadPercentage:d,mediaUploadTempFile:l}=ft(),s=n.useMemo(()=>(c==null?void 0:c._id)===t.elementId,[c==null?void 0:c._id,t.elementId]),b=n.useMemo(()=>{var m;return a?s?r==null?void 0:r.percentageSize:((m=t.meta)==null?void 0:m.percentageSize)||30:void 0},[s,a,(g=t.meta)==null?void 0:g.percentageSize,r==null?void 0:r.percentageSize]),x=n.useCallback((m,C,u)=>{var v,E;const M=Math.floor((E=(v=u==null?void 0:u.style)==null?void 0:v.width)==null?void 0:E.replace("%",""));o==null||o({percentageSize:M})},[o]);return e(q,{children:a&&!t.isCustomPreview?e(ma,{meta:t.meta,"data-testid":"video-element-view","data-test":"VideoView-NoumLayoutToolWrapper",children:e(q,{children:s&&l?e(pa,{file:l,uploadPercentage:d,"data-test":"VideoView-UploadProgress"}):e(ha,{onResize:x,onResizeStop:i,disable:!a||!s,percentSize:b,"data-test":"VideoView-ElementResizable",children:e(Ye,{url:((p=(h=c==null?void 0:c.unSaved)==null?void 0:h.bodyContentJson)==null?void 0:p.videoURL)||t.url,fullHeight:a,fileType:t.fileType,onLoadedData:t.onLoadedData,isCollapse:t.isCollapse,bigPlayButton:t.bigPlayButton,controls:t.controls,viewOnly:!0,width:t.width,height:t.height,isSquare:t.isSquare,"data-test":"VideoView-VideoPlayerView"})})})}):e(Ye,{...t,"data-test":"VideoView-VideoPlayerView"})})}),zt=({clearMedia:t,mediaName:a,mediaSize:r,mediaType:o,mediaSrc:i})=>{const{width:c}=fe(),d=c<=ie.MOBILE_MAX;return S(Hn,{"data-test":"ReferenceMedia-ReferenceImageContainer",children:[a&&S(Pn,{"data-test":"ReferenceMedia-RefereneceImageHeader",children:[S(Ln,{"data-test":"ReferenceMedia-RefereneceImageDetailHeader",children:[e(D,{font:"body-m",colorToken:"--text-card-header-neutral-highlighted","data-test":"ReferenceMedia-TSpan",children:a}),!!r&&e(D,{font:"systemInfo-s",colorToken:"--text-card-neutral-default","data-test":"ReferenceMedia-TSpan",children:`${r}mb`})]}),t&&e(zn,{onClick:t,size:"small",textOnly:!0,icon:e(j,{name:"close_m",size:24,color:"--icon-card-neutral-default","data-test":"ReferenceMedia-Icon"}),"data-test":"ReferenceMedia-ReferenceImageCloseButton"})]}),o==="image"?e(Vn,{src:i,"data-test":"ReferenceMedia-ReferenceImage"}):o==="video"?e(jn,{url:i,fileType:fa(bt(i)),height:d?222:413,"data-test":"ReferenceMedia-VideoView"}):null]})},qn=(t,a)=>{const r=a.find(o=>o.value===t);return r==null?void 0:r.label},Vt=t=>({fileType:Dt(bt(t)??""),fileName:ba(t)}),Dt=t=>ga.find(a=>a===t||a.split("/")[1]===t)?"image":ya.find(a=>a===t||a.split("/")[1]===t)?"video":"",Xn=({isOpen:t,onClose:a,handleDiscardReference:r})=>{const{t:o}=he();return S(ce,{testId:"reference-delete-modal",open:t,onClose:a,size:be.S,disableBackdropClick:!0,"data-test":"DeleteChamberBroadcastModal-Modal",children:[e(se,{"data-test":"DeleteChamberBroadcastModal-ModalHeader",children:o("noumena.chamber_edit.delete_reference.heading")}),e(Dn,{style:{textAlign:"center"},font:"body-l",colorToken:"--text-modal-neutral-default",children:o("noumena.chamber_edit.delete_reference.subheading")}),S(de,{flexDirection:"column","data-test":"DeleteChamberBroadcastModal-ModalFooter",children:[e($,{size:"full",intent:"negative",secondary:!0,testId:"delete-reference-btn",onClick:r,"data-test":"DeleteChamberBroadcastModal-Button",children:o("noumena.chamber_edit.delete_reference.discard")}),e(U,{height:16,"data-test":"DeleteChamberBroadcastModal-Spacer"}),e($,{size:"full",tertiary:!0,testId:"delete-reference-no-btn",onClick:a,"data-test":"DeleteChamberBroadcastModal-Button",children:o("noumena.cancel")})]})]})},Ot=[{name:y("noumena.chambers.project_types"),image:"terms_m",text:y("noumena.chambers.project_types"),labelSize:"auto"},{name:y("noumena.chamber_view.references"),image:"terms_m",text:y("noumena.chamber_view.references"),labelSize:"auto"}];y("noumena.chamber_edit.add_reference.ask_for_a_reference"),y("noumena.chamber_edit.add_reference.ask_for_a_reference"),y("noumena.chamber_edit.add_reference.enter_manually"),y("noumena.chamber_edit.add_reference.enter_manually");gt.Client;const Jn=Ee({providerName:Q().min(3,y("noumena.chamber_edit.add_reference.input_length")).required(y("noumena.input.not_empty")),capacity:Q().min(3,y("noumena.input.not_empty")).required(y("noumena.input.not_empty")),referenceText:Q().test("minLength",y("noumena.chamber_edit.add_reference.input_length_min_max"),t=>t!=null&&t.length?t.split(" ").length>=3:!1).test("maxLength",y("noumena.chamber_edit.add_reference.input_length_min_max"),t=>t!=null&&t.length?t.split(" ").length<=2e3:!1).required(y("noumena.input.not_empty"))}).required(),To=Ee({providerName:Q().min(3,y("noumena.chamber_edit.add_reference.input_length")).required(y("noumena.input.not_empty")),capacity:Q().min(3,y("noumena.input.not_empty")).required(y("noumena.input.not_empty")),providerEmail:Q().email(y("noumena.email_login_form.valid_email.error_message_without_example")).required(y("noumena.input.not_empty"))}).required(),Zn=({isOpen:t,onClose:a,reference:r,capacityOptions:o,referenceLoading:i,onSubmitReference:c})=>{const{capacity:d,imageUrl:l,providerName:s,referenceText:b}=r,{fileName:x,fileType:g}=Vt(l??""),{width:h}=fe(),p=n.useMemo(()=>h>ie.TABLET_L,[h]),m=n.useMemo(()=>h<=ie.MOBILE_MAX,[h]),[,C]=n.useState(!1),[u,M]=n.useState(l??""),[v,E]=n.useState({name:x,type:g,size:0}),{reset:A,control:W,setValue:w,handleSubmit:B,formState:{isValid:k}}=Ie({defaultValues:{providerName:s??"",referenceText:b??"",capacity:d??"",imageUrl:l??""},resolver:Ne(Jn),mode:"onTouched",reValidateMode:"onSubmit"}),I=()=>{A(),M(""),a()},N=async()=>{await B(c)()};n.useEffect(()=>{w("imageUrl",u)},[u,w]);const R=n.useCallback(O=>{E({name:O.name,type:Dt(O.type),size:Number((Math.round(O.size)/1e6).toPrecision(2))})},[]),J=n.useCallback(O=>{C(O)},[]);return S(ce,{open:!!t,onClose:I,testId:"update-reference-modal",isFullScreen:!p,style:{width:p?752:void 0},hasBackButton:!0,enableCloseButton:!0,closeButtonStyles:{enforceLeft:!0,transparentModalCloseButton:!0,defaultBtnForMobile:!1},disableBackdropClick:!0,"data-test":"UpdateReference-Modal",children:[e(se,{isFullScreen:!p,"data-test":"UpdateReference-ModalHeader",children:y("noumena.chamber_edit.edit_reference.title")}),S(pe,{style:{textAlign:"left"},minHeight:"55vh",isFullScreen:!p,noFooter:!0,"data-test":"UpdateReference-ModalBody",children:[e(U,{height:24,"data-test":"UpdateReference-Spacer"}),e(De,{control:W,name:"providerName",render:({field:{value:O,onChange:P,onBlur:z},fieldState:{error:L}})=>e(me,{label:y("noumena.chamber_edit.add_reference.ask_for_a_reference.provider.full_name"),onBlur:z,value:O??"",onChange:P,error:!!(L!=null&&L.message),helperText:L==null?void 0:L.message,"data-test":"UpdateReference-TextField"}),"data-test":"UpdateReference-Controller"}),e(U,{height:"16px","data-test":"UpdateReference-Spacer"}),e(De,{control:W,name:"capacity",render:({field:{value:O,onChange:P},fieldState:{error:z}})=>e(Xe,{containerStyle:{padding:"0"},observerMinHeight:"0px",hideIcons:!0,placement:"bottom-start",options:o,inputValue:O??"",onSelectOption:L=>{P(L.value)},usePopStyle:!m,renderContainerFromBottom:m,dropdownItemStyle:m?{textAlign:"center"}:void 0,"data-test":"UpdateReference-Dropdown",children:({inputProps:L,inputRef:V,toggle:H})=>e(me,{readOnly:!0,...L,ref:V,value:qn(O||void 0,o),label:y("noumena.chamber_edit.add_reference.ask_for_a_reference.capacity"),spellCheck:"false",error:!!(z!=null&&z.message),helperText:z==null?void 0:z.message,rightIcon:e(j,{name:"chevron_down_m",size:16,color:"--icon-input-neutral-default",onClick:H,"data-test":"UpdateReference-Icon"}),"data-test":"UpdateReference-TextField"})}),"data-test":"UpdateReference-Controller"}),e(U,{height:"16px","data-test":"UpdateReference-Spacer"}),e(De,{control:W,name:"referenceText",render:({field:{value:O,onChange:P,onBlur:z},fieldState:{error:L}})=>e(Je,{label:y("noumena.chamber_edit.add_reference.ask_for_a_reference.reference_text"),autoResize:!0,value:O??"",onBlur:z,onChange:P,error:!!(L!=null&&L.message),helperText:L==null?void 0:L.message,"data-test":"UpdateReference-TextArea"}),"data-test":"UpdateReference-Controller"}),e(U,{height:"16px","data-test":"UpdateReference-Spacer"}),u!=null&&u.length?e(zt,{mediaSrc:u,clearMedia:()=>M(""),mediaName:v.name,mediaSize:v.size,mediaType:v.type,"data-test":"UpdateReference-ReferenceMedia"}):e(Ua,{acceptedFileTypes:xa,onUploading:J,maxSize:500,setMediaDetail:R,onContentChange:M,"data-test":"UpdateReference-UploadMedia"}),e(U,{height:"16px","data-test":"UpdateReference-Spacer"})]}),S(de,{isFullScreen:!p,justifyContent:"space-between","data-test":"UpdateReference-ModalFooter",children:[e($,{tertiary:!0,testId:"add-reference-cancel-action",size:"full",softDisabled:i,disabled:!k,onClick:I,"data-test":"UpdateReference-Button",children:y("noumena.cancel")}),e(U,{width:16,"data-test":"UpdateReference-Spacer"}),e($,{testId:"add-reference-save-action",primary:!0,size:"full",softDisabled:i,disabled:!k,onClick:N,"data-test":"UpdateReference-Button",children:y("noumena.button.save")})]})]})},Ft=({reference:t,isEditing:a,approveReference:r,rejectReference:o,discardReference:i,updateReference:c,loading:d,capacityOptions:l})=>{const{_id:s,capacity:b,imageUrl:x,providerName:g,referenceText:h,status:p}=t,{formattedCapacity:m,fileName:C,fileType:u}=n.useMemo(()=>({formattedCapacity:b.replaceAll("_"," ").split(" ").map(B=>Ge.capitalize(B)).join(" "),...Vt(x??"")}),[b,x]),[M,v]=n.useState(!1),[E,A]=n.useState(!1),W=n.useCallback(async()=>{await(i==null?void 0:i(s)),A(!1)},[i,s]),w=n.useCallback(async B=>{await(c==null?void 0:c(s,B)),v(!1)},[c,s]);return S(q,{children:[S(On,{"data-test":"ReferenceViewItem-ReferenceContainer",children:[S(Fn,{"data-test":"ReferenceViewItem-ReferenceDetail",children:[S(Pt,{"data-test":"ReferenceViewItem-ReferenceDetailContainer",children:[e(D,{colorToken:"--text-card-header-neutral-highlighted",font:"body-xl-bold","data-test":"ReferenceViewItem-TSpan",children:g}),e(it,{font:"body-m-bold",colorToken:"--text-card-header-neutral-default","data-test":"ReferenceViewItem-ReferenceClient",children:m}),p===Ue.Pending&&S(q,{children:[e(U,{height:16,"data-test":"ReferenceViewItem-Spacer"}),e(it,{font:"body-m",colorToken:"--text-card-header-neutral-default","data-test":"ReferenceViewItem-ReferenceClient",children:y("noumena.chamber_edit.add_reference.subheading")})]})]}),a&&S($n,{"data-test":"ReferenceViewItem-IconMainContainer",children:[e($,{tertiary:!0,size:"small",icon:e(j,{name:"edit_m",size:24,color:"--icon-button-neutral-default","data-test":"ReferenceViewItem-Icon"}),onClick:()=>v(!0),"data-test":"ReferenceViewItem-Button"}),e($,{secondary:!0,intent:"negative",size:"small",icon:e(j,{name:"delete_m",size:24,color:"--icon-button-danger-secondary-default","data-test":"ReferenceViewItem-Icon"}),onClick:()=>A(!0),"data-test":"ReferenceViewItem-Button"})]})]}),e(Un,{textAlign:"left",font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"ReferenceViewItem-ReferenceDescription",children:h}),x&&e(zt,{mediaSrc:x,mediaName:C,mediaType:u,"data-test":"ReferenceViewItem-ReferenceMedia"}),p===Ue.Pending&&S(Wt,{"data-test":"ReferenceViewItem-ButtonWrapper",children:[e($,{size:"small",loading:d,onClick:()=>r==null?void 0:r(s),intent:"positive",secondary:!0,"data-test":"ReferenceViewItem-Button",children:y("noumena.keep")}),e(U,{width:8,"data-test":"ReferenceViewItem-Spacer"}),e($,{size:"small",loading:d,onClick:()=>o==null?void 0:o(s),intent:"negative",secondary:!0,"data-test":"ReferenceViewItem-Button",children:y("noumena.discard")})]})]}),a&&E&&e(Xn,{isOpen:E,onClose:()=>A(!1),handleDiscardReference:W,"data-test":"ReferenceViewItem-DeleteReference"}),a&&M&&e(Zn,{isOpen:M,onClose:()=>v(!1),reference:t,referenceLoading:!!d,capacityOptions:l||[],onSubmitReference:w,"data-test":"ReferenceViewItem-UpdateReference"})]})},Gn=Ee({title:Q().required(),content:Q().required()}).required(),Qn=({elementType:t,title:a,isEditing:r,onClose:o,isOpen:i,handleAddOption:c,handleDeleteOption:d,defaultData:l,handleOpenAddReferenceModal:s,approveReference:b,rejectReference:x,discardReference:g,updateReference:h,capacityOptions:p,loading:m,referenceFetching:C,referenceData:u,fetchMoreReferences:M,infiniteState:v,setShowDiscardExperienceModal:E})=>{const{addToast:A}=Ce(),{flags:{references:W}}=ge(),{width:w}=fe(),[B,k]=n.useState(0),[I,N]=n.useState(l.title),[R,J]=n.useState(l.body),[O,P]=n.useState(!1),z=n.useMemo(()=>w>=ie.LAPTOP,[w]),L=n.useMemo(()=>w<=ie.MOBILE_MAX,[w]),V=t===f.ProjectWorkExperience,H=n.useMemo(()=>{var G,ue;return[{value:"ask_for_reference",key:"ask_for_reference",type:"value",label:y("noumena.chamber_edit.add_reference.ask_for_a_reference"),description:y("noumena.chamber_edit.publish_project"),disabled:!l.body.length||!((G=l.id)!=null&&G.length)||l.status!==K.Published},{value:"add_reference_manually",key:"add_reference_manually",type:"value",label:y("noumena.chamber_edit.add_manually"),disabled:!((ue=l.id)!=null&&ue.length)}]},[l]),_=n.useCallback(G=>{J(G)},[J]),{reset:F,trigger:Z,setValue:Y,formState:{isValid:te}}=Ie({resolver:Ne(Gn),mode:"all",reValidateMode:"onBlur"}),re=n.useCallback(G=>{if(!Number.isNaN(G)){const ue=Number(G);k(ue)}},[k]),ae=n.useCallback(async()=>{if(l.title&&!I){A("error","none",y("noumena.chamber_edit.add_reference.empty_title"));return}if(R==="<p><br></p>"||!R){A("error","none",y("noumena.chamber_edit.add_reference.empty_content")),_("");return}await c(I,R,l.id,l.position),setTimeout(()=>{P(!1),o(),F()},1e3)},[l.title,l.id,l.position,I,R,c,o,F,A,_]),oe=n.useCallback(G=>{G.key==="add_reference_manually"?s("manually"):s("ask")},[s]),_e=n.useCallback(()=>{P(!0),I!==l.title||R!==l.body?ae():o()},[I,l.title,l.body,R,ae,o]),Me=n.useCallback(()=>{!I&&!R&&!l.body&&!l.title&&l._id?(d(l._id),o()):I!==l.title||R!==l.body?E():o()},[R,l,I,d,o,E]);return n.useEffect(()=>{Y("title",I),Y("content",R),Z("content"),Z("title")},[I,R,Y,Z]),n.useEffect(()=>{u.length===0&&k(0)},[u]),S(ce,{open:!!i,size:be.XL,testId:"add_experience_modal",isFullScreen:!z,onClose:Me,enableCloseButton:!0,disableBackdropClick:!0,disableEscapeKeyDown:!0,"data-test":"AddExperience-Modal",children:[e(se,{maxTitleWidth:310,isFullScreen:!z,rightMobileContainer:e(It,{secondary:te,disabled:!te||m,loading:O,size:"small",onClick:_e,"data-test":"AddExperience-StyledSaveButtonTableMobile",children:y("noumena.chamber_edit.visibility.save")}),action:V&&e(Xe,{isPopperStyle:!0,isAnimation:!1,containerStyle:{padding:"0"},observerMinHeight:"0px",hideIcons:!0,placement:"bottom-start",options:H,onSelectOption:oe,usePortal:!1,"data-test":"AddExperience-Dropdown",children:({targetProps:G,targetRef:ue,toggle:Se})=>e(An,{ref:ue,...G,"data-testid":"add_reference_btn",neutral:z,primary:!z,textOnly:!0,leftIcon:e(j,{name:"add_m",size:24,color:"--icon-button-brand-primary-default","data-test":"AddExperience-Icon"}),onClick:Se,"data-test":"AddExperience-StyledAddReferenceButton",children:y("noumena.chamber_edit.add_reference")})}),"data-test":"AddExperience-ModalHeader",children:l.title.length?l.title:a}),e(pe,{minHeight:"55vh",isFullScreen:!z,noFooter:!0,"data-test":"AddExperience-ModalBody",children:C&&u.length===0?e(He,{"data-test":"AddExperience-Spinner"}):S(q,{children:[V&&W&&u.length?e(Le,{"data-test":"AddExperience-TabContainer",children:e(Pe,{onChange:re,inputList:Ot,selectedId:B.toString(),mode:"isBackground",isWithoutImage:!0,fontSize:"--font-body-medium-regular-size",textFont:"--font-body-medium-regular-font","data-test":"AddExperience-BasicChipsTabsForm"})}):e(q,{}),B===0&&e(Ht,{"data-test":"AddExperience-StyledRichEditor",children:e(Lt,{title:I,content:R,handleChangeTitle:N,handleChangeContent:_,basicToolbar:!1,"data-test":"AddExperience-EditElement"})}),B===1&&e(yt,{onFetchMore:M,status:v,scrollbarWidth:0,paddingBottom:"15px",width:"100%","data-test":"AddExperience-Infinite",children:e(Rt,{"data-test":"AddExperience-ReferenceInnerContainer",children:u.map(G=>e(Ft,{reference:G,loading:m,isEditing:r,approveReference:b,rejectReference:x,discardReference:g,updateReference:h,capacityOptions:p,"data-test":"AddExperience-ReferenceViewItem"},G._id))})})]})}),e(de,{isFullScreen:!z,"data-test":"AddExperience-ModalFooter",children:!L&&e(At,{primary:te||m,disabled:!te,loading:O,onClick:_e,"data-test":"AddExperience-StyledSaveButton",children:y("noumena.chamber_edit.visibility.save")})})]})},Eo=n.memo(Qn),Kn=[{name:"test1",image:"terms_m",text:y("noumena.chamber_view.experiences"),labelSize:"auto"},{name:"test1",image:"terms_m",text:y("noumena.chamber_view.references"),labelSize:"auto"}],Mo=({id:t,body:a,title:r,isOpen:o,onClose:i})=>{const{width:c}=fe(),d=n.useMemo(()=>c<=ie.MOBILE_MAX,[c]),l=n.useMemo(()=>c>=ie.LAPTOP,[c]),s=n.useMemo(()=>c>=ie.TABLET,[c]),{fetchMoreReferences:b,infiniteState:x,loading:g,references:h}=dn(t,Ue.Accepted,!0,4),[p,m]=n.useState(0),C=n.useCallback(u=>{m(u?Number(u):0)},[m]);return S(ce,{open:o,testId:"view_reference_modal",isFullScreen:d,onClose:i,style:{width:l||s?750:void 0},enableCloseButton:!0,disableBackdropClick:!0,"data-test":"ViewExperience-Modal",children:[e(se,{isFullScreen:d,"data-test":"ViewExperience-ModalHeader",children:r}),h&&h.length>0&&e(Le,{"data-test":"ViewExperience-TabContainer",children:e(Pe,{onChange:C,inputList:Kn,selectedId:p.toString(),mode:"isBackground",isWithoutImage:!0,fontSize:"--font-body-medium-regular-size",textFont:"--font-body-medium-regular-font","data-test":"ViewExperience-BasicChipsTabsForm"})}),e(U,{height:16,"data-test":"ViewExperience-Spacer"}),S(pe,{isFullScreen:d,noFooter:!0,"data-test":"ViewExperience-ModalBody",children:[p===0&&e(_t,{style:{padding:0},"data-testid":"RichTextEditorView",html:a??"","data-test":"ViewExperience-RichTextEditorView"}),!g&&p===1&&h.length&&e(yt,{onFetchMore:b,status:x,paddingBottom:"15px",paddingRight:"12px",width:"100%","data-test":"ViewExperience-Infinite",children:e(Rt,{"data-test":"ViewExperience-ReferenceInnerContainer",children:h.map(u=>e(Ft,{loading:!1,isEditing:!1,reference:u,"data-test":"ViewExperience-ReferenceViewItem"},u._id))})})]})]})},Yn=T.div`
  display: grid;
  justify-content: center;
  align-items: center;
`,wo=T.div`
  margin: 0 auto;
  margin-top: 24px;
`,vo=T.div`
  text-align: center;
  color: var(--text-placeholder-neutral-default);
  font-size: var(--font-body-xlarge-regular-size);
  font-family: var(--font-body-xlarge-regular-font);
  margin-top: 12px;
`,ko=T.div`
  margin: 16px auto;
  font-weight: 500;
`;T.div`
  display: flex;
`;const eo=T.div`
  display: none;
`,Bo=T(Ze)`
  cursor: pointer;
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 8px;
  &:hover ${eo} {
    display: flex;
  }
`,Ao=T.div`
  padding: 0 16px 16px 16px;
`,to=[{name:y("noumena.chamber_edit.add_reference.ask_for_a_reference"),image:"terms_m",text:y("noumena.chamber_edit.add_reference.ask_for_a_reference"),labelSize:"auto"},{name:"test1",image:"terms_m",text:y("noumena.chamber_edit.add_reference.enter_manually"),labelSize:"auto"}],rt={providerName:"",capacity:gt.Client,providerEmail:"",referenceText:"",isManual:!1,file:void 0},ao=Ee({providerName:Q().required(y("noumena.input.not_empty")),capacity:Q().required(y("noumena.input.not_empty")),email:Q().when("isManual",{is:!1,then:Q().email(y("noumena.email_login_form.valid_email.error_message_without_example")).required(y("noumena.input.not_empty"))}),referenceText:Q().when("isManual",{is:!0,then:Q().required(y("noumena.input.not_empty"))}),isManual:_a().required()}).required(),no=({onClose:t})=>{var M,v,E;const[a,r]=n.useState(0),[,o]=n.useState(void 0),[i,c]=n.useState({...rt,isManual:!1}),{register:d,reset:l,trigger:s,setValue:b,handleSubmit:x,formState:{errors:g,isValid:h}}=Ie({resolver:Ne(ao),mode:"all",reValidateMode:"onBlur"}),p=A=>{const W=Number(A);r(W),c({...i,isManual:W===1})},m=n.useCallback(A=>{c({...i,[A.currentTarget.name]:A.currentTarget.value}),(A.currentTarget.name==="providerEmail"||A.currentTarget.name==="referenceText")&&(b(A.currentTarget.name,A.currentTarget.value),s(A.currentTarget.name))},[c,b,s,i]),C=n.useCallback(()=>{c(rt),o(void 0),l(),t()},[c,o,t,l]),u=n.useCallback(async A=>{console.log(A)},[]);return n.useEffect(()=>{b("isManual",a===1),s("isManual")},[a,b,s]),S(Nt,{"data-testid":"EditReferenceWrapper",fullWidth:!0,style:{height:"100%"},"data-test":"EditReference-StyledTabWrapper",children:[e(Le,{"data-test":"EditReference-TabContainer",children:e(Pe,{onChange:p,inputList:to,selectedId:a.toString(),mode:"isBackground",isWithoutImage:!0,fontSize:"--font-body-medium-regular-size",textFont:"--font-body-medium-regular-font","data-test":"EditReference-BasicChipsTabsForm"})}),a===0&&e(Nn,{"data-test":"EditReference-EditReferenceDescription",children:e(D,{colorToken:"--text-modal-neutral-default",font:"body-l","data-test":"EditReference-TSpan",children:y("noumena.chamber_edit.add_reference.ask_for_a_reference.description")})}),e(U,{height:16,"data-test":"EditReference-Spacer"}),S(Wn,{onSubmit:x(u),"data-test":"EditReference-EditReferenceForm",children:[S(Rn,{"data-test":"EditReference-FieldWrapper",children:[e(me,{...d("providerName",{required:{value:!0,message:y("noumena.input.not_empty")},onChange:m}),value:i.providerName,label:y("noumena.chamber_edit.add_reference.ask_for_a_reference.provider.full_name"),error:!!g.providerName,helperText:(M=g.providerName)==null?void 0:M.message,"data-test":"EditReference-TextField"}),e(U,{height:16,"data-test":"EditReference-Spacer"}),e(U,{height:16,"data-test":"EditReference-Spacer"}),a===0&&S(q,{children:[e(me,{...d("providerEmail",{required:{value:!0,message:y("noumena.input.not_empty")},onChange:m}),value:i.providerEmail,label:y("noumena.chamber_edit.add_reference.ask_for_a_reference.provider.providerEmail"),error:!!g.providerEmail,helperText:(v=g.providerEmail)==null?void 0:v.message,"data-test":"EditReference-TextField"}),e(U,{height:16,"data-test":"EditReference-Spacer"})]}),a===1&&S(q,{children:[e(Je,{...d("referenceText",{required:{value:!0,message:y("noumena.input.not_empty")},onChange:m}),value:i.referenceText,label:y("noumena.chamber_edit.add_reference.ask_for_a_reference.reference_text"),error:!!g.referenceText,helperText:(E=g.referenceText)==null?void 0:E.message,multiple:!0,"data-test":"EditReference-TextArea"}),e(U,{height:16,"data-test":"EditReference-Spacer"})]}),e(U,{height:72,"data-test":"EditReference-Spacer"})]}),S(Wt,{"data-test":"EditReference-ButtonWrapper",children:[e($,{onClick:()=>C(),secondary:!0,tertiary:!0,size:"full","data-test":"EditReference-Button",children:y("noumena.cancel")}),e(U,{width:16,"data-test":"EditReference-Spacer"}),a===0&&e($,{type:"submit",primary:!0,size:"full",loading:!1,secondary:!h,tertiary:!h,disabled:!h,"data-test":"EditReference-Button",children:y("noumena.send")}),a===1&&e($,{type:"submit",primary:!0,size:"full",loading:!1,secondary:!h,tertiary:!h,disabled:!h,"data-test":"EditReference-Button",children:y("noumena.chamber_edit.visibility.save")})]})]})]})},oo=({title:t,isEmpty:a=!0,onClose:r,handleAddOption:o,defaultData:i,basicToolbar:c=!0})=>{const{addToast:d}=Ce(),{flags:{references:l}}=ge(),{width:s,height:b}=fe(),x=s>ie.TABLET_L,g=s>ie.MOBILE_MAX,[h,p]=n.useState(!1),[m,C]=n.useState(0),[u,M]=n.useState(i.title),[v,E]=n.useState(i.body),A=Ee({title:Q().required(),content:Q().required()}).required(),{reset:W,trigger:w,setValue:B,formState:{isValid:k}}=Ie({resolver:Ne(A),mode:"all",reValidateMode:"onBlur"}),I=R=>{const J=Number(R);C(J)},N=n.useCallback(async()=>{if(!u){d("error","none",y("noumena.chamber_edit.add_reference.empty_title"));return}if(v==="<p><br></p>"||!v){d("error","none",y("noumena.chamber_edit.add_reference.empty_content")),E("");return}await o({title:u,body:v,_id:i.id,position:i.position}),W()},[u,v,o,W,d,i.id,i.position]);return n.useEffect(()=>{B("title",u),B("content",v),w("content"),w("title")},[u,v,B,w]),S(ce,{testId:"testHomeNoumProjectWorkExperience",open:!0,onClose:r,hasBackButton:!x,enableCloseButton:x,size:be.XL,disableBackdropClick:!0,"data-test":"AddReferenceNonModal-Modal",children:[m===0&&S(q,{children:[e(Bn,{rightMobileContainer:e(It,{primary:k,disabled:!k,size:"small",onClick:N,"data-test":"AddReferenceNonModal-StyledSaveButtonTableMobile",children:y("noumena.chamber_edit.visibility.save")}),action:l&&c&&e($,{"data-testid":"add_reference_btn",textOnly:!0,leftIcon:e(j,{name:"add_m",size:24,color:"--icon-button-brand-primary-default","data-test":"AddReferenceNonModal-Icon"}),onClick:()=>p(!1),"data-test":"AddReferenceNonModal-Button",children:y("noumena.chamber_edit.add_reference")}),"data-test":"AddReferenceNonModal-ModalHeader",children:e(D,{font:"heading-xs-bold",colorToken:"--text-modal-header-neutral-default","data-test":"AddReferenceNonModal-TSpan",children:t})}),e(pe,{minHeight:x&&b<720?"calc(100vh - 296px)":"55vh","data-test":"AddReferenceNonModal-ModalBody",children:e(Ht,{"data-test":"AddReferenceNonModal-StyledRichEditor",children:e(Lt,{title:u,content:v,handleChangeTitle:M,handleChangeContent:E,"data-test":"AddReferenceNonModal-EditElement"})})}),x&&e(de,{marginTop:x&&b<720?16:24,"data-test":"AddReferenceNonModal-ModalFooter",children:e(At,{primary:!a||k,disabled:!k,onClick:N,"data-test":"AddReferenceNonModal-StyledSaveButton",children:y("noumena.chamber_edit.visibility.save")})})]}),m===1&&S(kn,{isEditReference:!x&&!g,gridTemplateColumns:!x&&g?"50px 1fr 50px":void 0,"data-test":"AddReferenceNonModal-HeaderContainerNonModal",children:[e(j,{name:"arrow_left_m",size:24,color:"--icon-button-brand-primary-default",onClick:()=>C(0),"data-test":"AddReferenceNonModal-Icon"}),!x&&!g&&e(U,{height:20,"data-test":"AddReferenceNonModal-Spacer"}),e(D,{colorToken:"--text-modal-header-neutral-default",style:{alignSelf:"center"},font:"heading-xs-bold","data-test":"AddReferenceNonModal-TSpan",children:y("noumena.chamber_edit.add_reference.title")})]}),h&&m===0&&e(Le,{"data-test":"AddReferenceNonModal-TabContainer",children:e(Pe,{onChange:I,inputList:Ot,selectedId:m.toString(),mode:"isBackground",isWithoutImage:!0,fontSize:"--font-body-medium-regular-size",textFont:"--font-body-medium-regular-font","data-test":"AddReferenceNonModal-BasicChipsTabsForm"})}),h&&m===1&&e(no,{onClose:()=>C(0),"data-test":"AddReferenceNonModal-EditReference"})]})},lt={[f.PublicationDesignPatterns]:{image:"bulb_m",text:"No Publications, Designs or Patents Added Yet",buttonText:"Add New"},[f.EducationTraining]:{image:"education_m",text:"No Education Added Yet",buttonText:"Add Education",AddNewbuttonText:"Add New Education"},[f.AchievementAward]:{image:"avard_m",text:"No Achievements Added Yet",buttonText:"Add Achievement"},[f.PersonalInterest]:{image:"interest_m",text:"No Personal Interests Added Yet",buttonText:"Add New"},[f.SocialInterest]:{image:"heart_m",text:"No Social Interests Added Yet",buttonText:"Add New"},[f.ProjectWorkExperience]:{image:"briefcase_m",text:"No Experience Added Yet",buttonText:"Add Experience",AddNewbuttonText:"Add New Experience"}},io={getHomeChamberElements:()=>lt,getHomeChamberElementByType:t=>lt[t]},ro=T.div`
  margin: 0 auto;
`,lo=T.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${({isAddedOption:t})=>!t&&"height: 553px; justify-content: center;"}
  ${mt}
`,so=T.div`
  width: 100%;
  text-align: center;
  div {
    margin: auto;
  }
  @media (max-width: ${X.MOBILE_L}) {
    div {
      margin: 0;
    }
  }
`,co=T.form`
  width: 100%;
  overflow: auto;
  label {
    width: fit-content;
  }

  ${({isAddedOption:t})=>t===!1&&" justify-content: center; align-items: center;"}
`,uo=T.div`
  display: inline-flex;
  width: 100%;

  button {
    @media (max-width: ${X.TABLET_L}) {
      width: 100%;
      button {
        z-index: 1001;
      }
    }
  }
  justify-content: center;
`,mo=T(D)`
  margin-left: auto;
  margin-right: auto;
  @media (max-width: ${X.MOBILE_MAX}) {
    float: left;
  }
`,st=parseInt(X.TABLET,10)||768,po=n.memo(t=>{const a=fe(),{width:r}=a,o=(t==null?void 0:t.arrayOfOption)??[],{title:i,buttonText:c,handleOpenExperienceModal:d}=t;return S(so,{"data-test":"InitialMode-StyledHeaderWrapper",children:[r>=st&&e(D,{"data-testid":"testTitleHomeNoumProjectWorkExperience",font:"heading-xs-bold",colorToken:"--text-modal-header-neutral-default","data-test":"InitialMode-TSpan",children:i}),o.length>0&&e($,{style:{float:"right"},secondary:!0,size:"small",type:"button",onClick:()=>{d()},"data-test":"InitialMode-Button",children:c}),r<st&&e(q,{children:e(mo,{"data-testid":"testTitleHomeNoumProjectWorkExperience",font:"heading-xs-bold",colorToken:"--text-modal-header-neutral-default","data-test":"InitialMode-StyledTitle",children:i})})]})}),dt=n.memo(t=>{const{t:a}=he(),{flags:{noumEditor2:r}}=ge(),{space:o}=Ae(),{addElementsHelper:i,loading:c}=pt(),d=ke.getElementInSpaceByType(o,t.elementType),l=le.getBodyContentJson(d),s=(o==null?void 0:o._id)||"",[b]=n.useState(!0),{dataForAddReference:x,handleOpenExperienceModal:g,handleCloseExperienceModal:h,isAddedOption:p,arrayOfOption:m,handleMoveTopOption:C,handleMoveDownOption:u,title:M,handleDeleteOption:v,defaultData:E,setDefaultData:A,showExperienceModal:W,setArrayOfOptions:w}=vn({elementType:d.elementType??t.elementType,spaceId:s,elementPosition:d.position??t.position,bodyContentJson:l,elementId:void 0}),B=io.getHomeChamberElementByType(d.elementType||t.elementType),[,k]=n.useState(void 0),{publishNoumLayoutHelper:I}=kt(),{updateElementHelper:N,loading:R}=Be(),{publishSpaceHelper:J,loading:O}=vt(),P=n.useCallback(H=>{k(H),g()},[k,g]),z=n.useCallback(async H=>{const _={status:K.Published,bodyContentType:ye.Json,bodyContentJson:[H],position:0,percentCompleted:100};await i(s,{..._,elementType:d.elementType??t.elementType},r)&&(t.handleSuccess(),h())},[i,s,d.elementType,t,r,h]),L=n.useCallback(async H=>{H.preventDefault();const _={status:K.Published,bodyContentType:ye.Json,bodyContentJson:m,position:d.position??t.position,percentCompleted:100};if(d._id){const F=await N(s,{..._,elementId:d._id}),Z=await J(s,o);F&&Z&&t.handleSuccess()}else{const F=await i(s,{..._,elementType:d.elementType??t.elementType});r&&await I(s),F&&t.handleSuccess()}},[m,d.position,d._id,d.elementType,t,i,s,r,I,N,J,o]),V=n.useCallback(()=>{w(l||[]),t.handleClose(!0)},[t,l,w]);return W?e(oo,{onClose:h,handleAddOption:z,defaultData:E,basicToolbar:t.elementType===f.ProjectWorkExperience,...x,"data-test":"HomeNoumProjectWorkExperience-AddReferenceNonModal"}):S(ce,{testId:"testHomeNoumProjectWorkExperience",open:t.isOpen,onClose:V,enableCloseButton:!W,size:be.XL,disableBackdropClick:!0,"data-test":"HomeNoumProjectWorkExperience-Modal",children:[e(se,{"data-test":"HomeNoumProjectWorkExperience-ModalHeader",children:e(po,{title:M,loading:c||R||O,arrayOfOption:m,handleOpenExperienceModal:g,onSubmit:L,buttonText:B.AddNewbuttonText||"","data-test":"HomeNoumProjectWorkExperience-InitialMode"})}),S(co,{isAddedOption:p,onSubmit:L,"data-test":"HomeNoumProjectWorkExperience-StyledForm",children:[e(pe,{"data-test":"HomeNoumProjectWorkExperience-ModalBody",children:e(lo,{isAddedOption:p,"data-test":"HomeNoumProjectWorkExperience-FormElements",children:p?e(Mn,{isEditMode:!0,arrayOfOptions:m,handleMoveTopOption:C,handleMoveDownOption:u,handleOpenAddExperienceModal:g,handleDeleteOption:v,handleSelectOption:P,setDefaultData:A,isOpen:!b,"data-test":"HomeNoumProjectWorkExperience-HomeChamberOptions"}):e(q,{children:S(Yn,{"data-testid":"homechambers-testid","data-test":"HomeNoumProjectWorkExperience-HomeChambersWrapper",children:[e(ro,{"data-test":"HomeNoumProjectWorkExperience-ImageWrapper",children:e(j,{color:"--icon-card-placeholder-neutral-default",name:B.image,size:96,"data-test":"HomeNoumProjectWorkExperience-Icon"})}),e(U,{height:18,"data-test":"HomeNoumProjectWorkExperience-Spacer"}),e(D,{font:"body-xl",colorToken:"--text-placeholder-neutral-default","data-test":"HomeNoumProjectWorkExperience-TSpan",children:B.text}),e(U,{height:16,"data-test":"HomeNoumProjectWorkExperience-Spacer"}),e(uo,{"data-test":"HomeNoumProjectWorkExperience-AddExpButtonWrapper",children:e($,{secondary:!0,size:"small",type:"button",onClick:g,"data-test":"HomeNoumProjectWorkExperience-Button",children:B.buttonText})})]})})})}),(m==null?void 0:m.length)>0&&e(q,{children:e(de,{"data-test":"HomeNoumProjectWorkExperience-ModalFooter",children:e($,{style:{float:"right"},type:"submit",primary:!0,size:"large",loading:c,secondary:(m==null?void 0:m.length)<=0,tertiary:(m==null?void 0:m.length)<=0,disabled:(m==null?void 0:m.length)<=0||c,"data-test":"HomeNoumProjectWorkExperience-Button",children:a("noumena.homenoum.save_and_publish")})})})]})]})}),Io=()=>{var B,k;const{space:t,spaceConfig:a,onRefetchSpaceByConfig:r,onRefetchSpaceById:o}=Ae(),{masterId:i,loading:c}=ut(),[d,l]=ve(!1),[s,b]=ve(!1),[x,g]=ve(!1),[h,p]=ve(!1),m=I=>{const N=[];return I&&I.forEach(R=>{R&&R.id&&R.name&&N.push({id:R.id,name:R.name})}),N},C=n.useMemo(()=>ke.getElements(t),[t]),u=n.useMemo(()=>{if(a&&(a==null?void 0:a.length)>0&&C.length>0){const I=ke.getProgressBarItems(t,a);return m(I)}return[]},[t,a,C]),M=n.useCallback(I=>{switch(I){case f.Profile:l();break;case f.BusinessBrief:b();break;case f.ProjectWorkExperience:g();break;case f.EducationTraining:p();break}},[l,b,g,p]),v=()=>{l(),w()},E=()=>{b(),w()},A=()=>{g(),w()},W=()=>{p(),w()},w=()=>{o(),r()};return c&&!i?e(Ze,{"data-test":"ChamberCompleteness-Stack",children:e(He,{"data-test":"ChamberCompleteness-Spinner"})}):a&&a.length&&t&&(t==null?void 0:t.type)===qe.Home&&((B=t==null?void 0:t.uid)==null?void 0:B.userStatus)===Ca.Active?S(q,{children:[e(Ya,{profileProgressPercentage:(t==null?void 0:t.percentCompleted)||0,profileProgressItems:u,onItemClicked:M,isTokensAlloted:!!((k=t==null?void 0:t.token)!=null&&k.count)||!1,"data-test":"ChamberCompleteness-NoumProgress"}),e(rn,{isOpen:d,handleClose:l,handleSuccess:v,"data-test":"ChamberCompleteness-HomeNoumAboutMe"}),e(sn,{isOpen:s,handleClose:b,handleSuccess:E,position:1,"data-test":"ChamberCompleteness-HomeNoumBusinessBrief"}),e(dt,{isOpen:x,handleClose:g,handleSuccess:A,elementType:f.ProjectWorkExperience,position:2,"data-test":"ChamberCompleteness-HomeNoumProjectWorkExperience"}),e(dt,{isOpen:h,handleClose:p,handleSuccess:W,elementType:f.EducationTraining,position:3,"data-test":"ChamberCompleteness-HomeNoumProjectWorkExperience"})]}):null};export{Eo as A,ko as B,Io as C,So as E,rn as H,eo as I,Dn as M,mn as N,zt as R,Bo as S,Mo as V,sn as a,dt as b,vt as c,Fe as d,dn as e,Jn as f,Dt as g,qn as h,To as i,vn as j,Ao as k,Yn as l,wo as m,vo as n,Mn as o,$a as p,tn as q,nt as r,fn as s,jn as t,kt as u,un as v,hn as w,cn as x};
//# sourceMappingURL=ChamberCompleteness-c76bd15d.js.map
