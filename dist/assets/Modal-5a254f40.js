import{v as ue,e5 as Se,e6 as xe,e7 as ie,e8 as ce,s as $,B as Te,j as t,am as se,y as L,ax as C,I as E,e9 as De,p as Me,ea as we,f as Ie,bY as ke,az as z,aE as Ee,ci as Ue,u as Le,e as oe,M as $e,t as le,c as k,h as Be,S as T,i as qe,T as de,dL as Fe,x as Oe,F as Ae,k as ze}from"./index-cd84bcc9.js";import{r,B as l,f as he,C as U,ar as be,am as ge,an as w,ap as He,aq as Ne}from"./vendor-51460554.js";function Ve(){const{addToast:e}=ue(),m=r.useCallback(y=>{e("error","none",`${l("noumena.toast_error.text")}: ${y}`)},[e]),i=r.useCallback(()=>{e("success","icon",`${l("noumena.toast_success.text")}: ${l("noumena.noum_edit.noum_edit_success_message.text")}`)},[e]),[s,{loading:b}]=Se(),j=r.useCallback(async(y,g,n)=>{let d;return await s({variables:{id:y,input:g},onError:({networkError:u=null,graphQLErrors:P=[]})=>{const[h]=P;m((h==null?void 0:h.message)??u),he(new Error((h==null?void 0:h.message)??u),{tags:{section:"updateProjectChamberMutation"}}),d=!1},onCompleted:()=>{n||i(),d=!0}}),d},[m,i,s]);return{loading:b,updateProjectChamberHelper:j}}function We(){const{addToast:e}=ue(),m=r.useCallback(y=>{e("error","none",`${l("noumena.toast_error.text")}: ${y}`)},[e]),i=r.useCallback(()=>{e("success","icon",`${l("noumena.chamber_create.success_message")}`)},[e]),[s,{loading:b}]=xe(),j=r.useCallback(async y=>{const g={id:void 0};return await s({variables:{input:y},onError:({networkError:n=null,graphQLErrors:d=[]})=>{const[u]=d;m((u==null?void 0:u.message)??n),he(new Error((u==null?void 0:u.message)??n),{tags:{section:"createProjectChamberMutation"}})},onCompleted:({createProjectChamber:n})=>{i(),g.id=(n==null?void 0:n._id)||void 0},update:(n,{data:d})=>{var D;if(!d||!d.createProjectChamber)return;const u=n.readQuery({query:ie,variables:{offset:0,limit:ce,filter:{categoryNotIn:["6267afe198962732993afaf5"]}}});if(!((D=u==null?void 0:u.getOwnProjectChambers)!=null&&D.data))return;const P=[...u.getOwnProjectChambers.data],h=[d.createProjectChamber,...P];n.writeQuery({query:ie,variables:{offset:0,limit:ce,filter:{categoryNotIn:["6267afe198962732993afaf5"]}},data:{getOwnProjectChambers:{data:h}}})}}),g},[m,i,s]);return{loading:b,createProjectChamberHelper:j}}const Re=U.div`
  display: ${({isUpdateMode:e})=>e?"block":"flex"};
  width: ${({isUpdateMode:e})=>e?"40%":"100%"};
  justify-content: center;
  @media (max-width: ${$.TABLET_L}) {
    width: 100%;
  }
`,Ge=U.form`
  label {
    width: fit-content;
  }
  ${({isUpdateMode:e})=>e&&"padding-left: 32px;"}
  @media (max-width: ${$.TABLET_L}) {
    height: 100%;
    display: flex;
    flex-direction: column;
    ${({isUpdateMode:e})=>e&&"width: auto; margin: 0 auto; padding-left:0;"}
  }
`,me=U(Te)`
  ${({isUpdateMode:e})=>e?"width: 117px":"flex: 1"};
  @media (max-width: ${$.TABLET_L}) {
    ${({isUpdateMode:e})=>e?"width: 100%":"flex: 1"};
  }
`,ye=U.div`
  width: 100%;
`,Qe=U.div`
  display: flex;
  width: ${({isUpdateMode:e})=>e?"405px":"100%"};
  @media (max-width: ${$.TABLET_L}) {
    width: ${({isUpdateMode:e})=>e?"auto":"100%"};
  }
`,Xe=({selectedProjectType:e,handleSelectProjectType:m,errors:i,setValue:s,projectTypeOptions:b})=>{const{t:j}=be();return t(ye,{"data-test":"ProjectTypeDropdown-StyledDropDownWrapper",children:t(se,{options:b,inputValue:e==null?void 0:e.value,onSelectOption:m,usePortal:!1,isPopperStyle:!0,iconColumnWidth:40,"data-test":"ProjectTypeDropdown-Dropdown",children:({inputProps:y,inputRef:g,toggle:n})=>{var d;return t(L,{readOnly:!0,...y,ref:g,value:e?String(e==null?void 0:e.label):"",label:j("noumena.chamber_create.visibility_label"),spellCheck:"false",onChange:()=>{s("projectType",(e==null?void 0:e.value)||C.Private)},error:!!i.projectType,helperText:((d=i.projectType)==null?void 0:d.message)||j("noumena.chamber_create.visibility_helper_text"),rightIcon:t(E,{name:"chevron_down_m",color:"--icon-input-neutral-default",size:16,onClick:n,"data-test":"ProjectTypeDropdown-Icon"}),"data-testid":"CreateProject-Modal-ProjectType","data-test":"ProjectTypeDropdown-TextField"})}})})},ea={[C.Public]:l("noumena.chamber_create.projectType_public_label"),[C.Private]:l("noumena.chamber_create.projectType_private_label"),[C.Secret]:l("noumena.chamber_create.projectType_secret_label")},Ye=[{key:C.Public,label:l("noumena.chamber_create.projectType_public_label"),type:"value",value:C.Public,description:l("noumena.chamber_create.projectType_public_description")},{key:C.Private,label:l("noumena.chamber_create.projectType_private_label"),type:"value",value:C.Private,description:l("noumena.chamber_create.projectType_private_description")},{key:C.Secret,label:l("noumena.chamber_create.projectType_secret_label"),type:"value",value:C.Secret,description:l("noumena.chamber_create.projectType_secret_description")}],H={name:"",description:void 0,profileImage:void 0,category:"",institution:De.Noumena,status:Me.Draft,permission:we.All,projectType:C.Private},Ze=ge({name:w().required(l("noumena.chamber_create.error.name_required")).max(75,l("noumena.chamber_create.error.description_maximum_length")),description:w().notRequired().max(1e3,l("noumena.chamber_create.error.description_maximum_length")),category:w().required(l("noumena.chamber_create.error.category_required"))}).required(),Je=ge({name:w().required(l("noumena.chamber_create.error.name_required")).max(75,l("noumena.chamber_create.error.description_maximum_length")),description:w().notRequired().max(1e3,l("noumena.chamber_create.error.description_maximum_length")),category:w().notRequired()}).required(),aa=r.memo(e=>{var J,K,p,ee,ae,te,ne,re;const{user:m}=Ie(),{t:i}=be(),{space:s}=ke(),[b,j]=r.useState([]),[y,g]=r.useState(void 0),[n,d]=r.useState(void 0),[u,P]=r.useState(!1),[h,D]=r.useState((J=e.summaryData)!=null&&J.profileImage&&((K=e.summaryData)==null?void 0:K.profileImage)!==z?(p=e.summaryData)==null?void 0:p.profileImage:void 0),[_,v]=r.useState({...H,...e==null?void 0:e.summaryData,category:((ee=e==null?void 0:e.summaryData)==null?void 0:ee.categoryId)||""}),[N,{loading:Ce}]=Ee({fetchPolicy:"cache-and-network",onCompleted:a=>{const o=a.getProjectChamberCategories;o&&j(o.filter(c=>!c.name.toLowerCase().match("member")&&!c.name.toLowerCase().match("linked")&&!c.name.toLowerCase().match("rise_application")).map(c=>({key:c._id,value:c._id,type:"value",label:c.name})))}}),{createProjectChamberHelper:V,loading:_e}=We(),{updateProjectChamberHelper:W,loading:R}=Ve(),{register:B,reset:G,trigger:M,setValue:f,handleSubmit:fe,formState:{errors:S,isValid:q}}=He({resolver:Ne(((ae=s==null?void 0:s.category)==null?void 0:ae.name)==="Rise"?Je:Ze),mode:"all",reValidateMode:"onBlur"}),Q=r.useCallback(a=>{switch(a){case"PUBLIC":return t(E,{name:"public_visibility_xl",size:40,"data-test":"ProjectCreate-optionIcon-Icon"});case"PRIVATE":return t(E,{name:"private_visibility_xl",size:40,"data-test":"ProjectCreate-optionIcon-Icon"});case"SECRET":return t(E,{name:"secret_visibility_xl",size:40,"data-test":"ProjectCreate-optionIcon-Icon"});default:return null}},[]),F=r.useMemo(()=>Ye.map(a=>({...a,icon:Q(a.value)})),[Q]);r.useEffect(()=>{e.isOpen&&g(F[1])},[e.isOpen,F]),r.useEffect(()=>{var a;e.isOpen&&b.length&&d((a=e==null?void 0:e.summaryData)!=null&&a.categoryId?b.find(o=>{var c;return o.value===((c=e==null?void 0:e.summaryData)==null?void 0:c.categoryId)}):b[0]),e!=null&&e.summaryData&&(d(b.find(o=>{var c;return o.value===((c=e==null?void 0:e.summaryData)==null?void 0:c.categoryId)})),v({...H,...e==null?void 0:e.summaryData}))},[e.isOpen,e==null?void 0:e.summaryData,b]),r.useEffect(()=>{f("category",(n==null?void 0:n.value)||"")},[n,f]);const je=r.useCallback(async a=>{var c;const o={..._,name:a.name,category:a.category,description:a.description,profileImage:h};if(e.isUpdateMode&&((c=e==null?void 0:e.summaryData)!=null&&c.spaceId))await W(e.summaryData.spaceId,{name:a.name,description:a.description,category:a.category||void 0,profileImage:h})&&e.handleSuccess(e.summaryData.spaceId);else{const{id:x}=await V(o);x&&e.handleSuccess(x),Ue("createPN",{UUID:m==null?void 0:m._id,ProjectNoumID:x})}},[_,h,e,W,V,m]),O=r.useCallback(a=>{var o;if(v({..._,[a.currentTarget.name]:a.currentTarget.value}),e!=null&&e.isUpdateMode&&(e!=null&&e.summaryData)){const c=a.currentTarget.name;P(((o=e==null?void 0:e.summaryData)==null?void 0:o[c])!==a.currentTarget.value)}},[_,e]),Pe=r.useCallback(a=>{var o;v({..._,category:a.value}),d(a),f("category",a.value),M("category"),e!=null&&e.isUpdateMode&&P(((o=e==null?void 0:e.summaryData)==null?void 0:o.categoryId)!==a.value)},[_,f,M,e]),ve=r.useCallback(a=>{v({..._,projectType:a.value}),g(a),f("projectType",a.value),M("projectType")},[v,g,f,M,_]),X=r.useCallback(a=>{var o;D(a),f("profileImage",a),M("profileImage"),e!=null&&e.isUpdateMode&&P(((o=e==null?void 0:e.summaryData)==null?void 0:o.profileImage)!==a)},[D,f,M,e]),Y=r.useCallback(()=>{var a,o,c;v(H),d(void 0),g(void 0),D((a=e==null?void 0:e.summaryData)!=null&&a.profileImage&&((o=e.summaryData)==null?void 0:o.profileImage)!==z?(c=e==null?void 0:e.summaryData)==null?void 0:c.profileImage:void 0),G(),P(!1),e.handleClose(!0)},[v,d,g,G,e]);r.useEffect(()=>{m!=null&&m._id&&N()},[N,m]),B("category",{required:{value:!0,message:i("noumena.chamber_create.error.category_required")},onChange:O});const Z=Le(),I=Z.width<=oe.TABLET,A=Z.width<=oe.TABLET_L;return Ce?null:t($e,{testId:"testProjectCreate",open:e.isOpen,onClose:Y,enableCloseButton:!0,size:e.isUpdateMode?le.XL:le.L,disableBackdropClick:!0,"data-test":"ProjectCreate-Modal",children:k(Ge,{onSubmit:fe(je),isUpdateMode:e==null?void 0:e.isUpdateMode,"data-test":"ProjectCreate-StyledForm",children:[t(Be,{isFullScreen:I,justifyContent:I?"flex-start":"center","data-test":"ProjectCreate-ModalHeader",children:e!=null&&e.isUpdateMode?i("noumena.noum_edit.title"):i("noumena.chamber_create.title")}),t(T,{height:e.isUpdateMode?16:0,"data-test":"ProjectCreate-Spacer"}),k(qe,{mobileFlex:!0,flexDirection:e.isUpdateMode&&!A?"row-reverse":"column",gap:e.isUpdateMode?56:"","data-test":"ProjectCreate-ModalBody",children:[k(Re,{isUpdateMode:e==null?void 0:e.isUpdateMode,"data-test":"ProjectCreate-ProfileImage",children:[(e==null?void 0:e.isUpdateMode)&&t(de,{font:A?"body-l-bold":"heading-s-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"ProjectCreate-TSpan",children:i("noumena.noum_edit.noum_pictures.text")}),t(T,{height:I?32:24,"data-test":"ProjectCreate-Spacer"}),t(Fe,{size:"XXL",url:h||"",onContentChange:X,onClear:()=>X(""),maximumFileSize:5,defaultImagePlaceHolder:z,noMargin:!0,"data-test":"ProjectCreate-EditableAvatar"})]}),t(Qe,{isUpdateMode:e==null?void 0:e.isUpdateMode,"data-test":"ProjectCreate-FormContainer",children:k(Oe,{vertical:!0,fullWidth:!0,"data-test":"ProjectCreate-Stack",children:[(e==null?void 0:e.isUpdateMode)&&t(de,{font:A?"body-l-bold":"heading-s-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"ProjectCreate-TSpan",children:i("noumena.noum_edit.basic_settings.text")}),t(T,{height:24,"data-test":"ProjectCreate-Spacer"}),t(L,{...B("name",{required:{value:!0,message:i("noumena.chamber_create.error.name_required")},maxLength:{value:75,message:i("noumena.chamber_create.error.description_maximum_length")},onChange:O}),value:_.name,label:i("noumena.chamber_create.name_label"),error:!!S.name,helperText:(te=S.name)==null?void 0:te.message,"data-testid":"CreateProject-Modal-Name","data-test":"ProjectCreate-TextField"}),t(T,{height:16,"data-test":"ProjectCreate-Spacer"}),t(L,{...B("description",{onChange:O,maxLength:{value:1e3,message:i("noumena.chamber_create.error.description_maximum_length")}}),value:_.description||"",label:i("noumena.chamber_create.description_label"),error:!!S.description,helperText:(ne=S.description)==null?void 0:ne.message,multiple:!0,maxLength:1e3,"data-testid":"CreateProject-Modal-Description","data-test":"ProjectCreate-TextField"}),t(T,{height:16,"data-test":"ProjectCreate-Spacer"}),t(ye,{"data-test":"ProjectCreate-StyledDropDownWrapper",children:t(se,{hideIcons:!0,options:b,inputValue:n==null?void 0:n.value,onSelectOption:Pe,isPopperStyle:!0,disabled:((re=s==null?void 0:s.category)==null?void 0:re.name)==="Rise","data-test":"ProjectCreate-Dropdown",children:({inputProps:a,inputRef:o,toggle:c})=>{var x;return t(L,{readOnly:!0,...a,ref:o,value:n?String(n.label):"",label:i("noumena.chamber_create.category_label"),spellCheck:"false",onChange:()=>{f("category",(n==null?void 0:n.value)||"")},error:!!S.category,helperText:((x=S.category)==null?void 0:x.message)||i("noumena.chamber_create.category_helper_text"),rightIcon:t(E,{name:"chevron_down_m",color:"--icon-input-neutral-default",size:16,onClick:c,"data-test":"ProjectCreate-Icon"}),"data-testid":"CreateProject-Modal-Category","data-test":"ProjectCreate-TextField"})}})}),t(T,{height:32,"data-test":"ProjectCreate-Spacer"}),!(e!=null&&e.isUpdateMode)&&t(Ae,{children:t(Xe,{handleSelectProjectType:ve,selectedProjectType:y,errors:S,projectTypeOptions:F,setValue:f,"data-test":"ProjectCreate-ProjectTypeDropdown"})})]})})]}),t(T,{height:e.isUpdateMode?16:0,"data-test":"ProjectCreate-Spacer"}),k(ze,{flexDirection:"row-reverse",justifyContent:"space-between",gap:16,"data-test":"ProjectCreate-ModalFooter",children:[t(me,{isUpdateMode:!I&&e.isUpdateMode,"data-testid":"Create-Noum-Button",type:"submit",primary:!0,loading:R,secondary:!q,tertiary:!q,disabled:!q||_e||(e==null?void 0:e.isUpdateMode)&&R||(e==null?void 0:e.isUpdateMode)&&!u,"data-test":"ProjectCreate-StyledButton",children:e!=null&&e.isUpdateMode?i("noumena.button.save"):i("noumena.chamber_create.create_button")}),!I&&!(e!=null&&e.isUpdateMode)&&t(me,{"data-testid":"Create-Noum-Cancel",onClick:()=>Y(),secondary:!0,tertiary:!0,"data-test":"ProjectCreate-StyledButton",children:i("noumena.cancel")})]})]})})});export{aa as P,Re as a,ea as p,Ve as u};
//# sourceMappingURL=Modal-5a254f40.js.map
