import{eb as N,pI as U,s as w,bw as X,m as O,u as K,e as S,c as x,M as Y,j as e,h as J,S as R,w as Q,v as Z,R as ee,a3 as te,T as y,I as B,y as I,am as ae,b1 as re,B as ne}from"./index-cd84bcc9.js";import{h as A,f as D,B as a,C as f,r as o,am as oe,an as P,a9 as ce,aB as ie,ap as de,bb as C,aq as le}from"./vendor-51460554.js";import{a as se}from"./RichTextEditorView-3d7dc014.js";import"./purify.es-89df9bf9.js";const $=`${U()}/chamber/v2`,q={fillOutReferenceByExternalUser:async({capacity:u,referenceText:s,imageUrl:l,referenceToken:m})=>{try{const c={capacity:u??void 0,referenceText:s,imageUrl:l},i=`${$}/noum-references/external`,g={headers:{"x-reference-token":m}};return(await A.post(i,c,g)).data}catch(c){D(c,{tags:{section:"NoumReference"}});const{errorMessage:i}=N(c);throw new Error(i)}},getNoumReferenceMetadata:async u=>{try{const s=`${$}/noum-references/metadata`,l={headers:{"x-reference-token":u,"Content-Type":"application/json"}};return(await A.get(s,l)).data}catch(s){D(s,{tags:{section:"NoumReference"}});const{errorMessage:l}=N(s);throw new Error(l)}}},k=[{value:"Client",key:"CLIENT",type:"value",label:a("noumena.capacity.dropdown.client")},{value:"Co-Worker",key:"CO_WORKER",type:"value",label:a("noumena.capacity.dropdown.co_worker")},{value:"Employer",key:"EMPLOYER",type:"value",label:a("noumena.capacity.dropdown.employer")},{value:"Manager",key:"MANAGER",type:"value",label:a("noumena.capacity.dropdown.manager")},{value:"Guide",key:"GUIDE",type:"value",label:a("noumena.capacity.dropdown.guide")},{value:"Supervisor",key:"SUPERVISOR",type:"value",label:a("noumena.capacity.dropdown.supervisor")},{value:"Colleague",key:"COLLEAGUE",type:"value",label:a("noumena.capacity.dropdown.colleague")}],pe=f.div`
  width: 100%;
  overflow-y: auto;
  gap: 16px;
  height: calc(600px - 156px);
  @media (max-width: ${w.TABLET_L}) {
    height: calc(100vh - 88px);
  }
  @media (max-width: ${w.MOBILE_MAX}) {
    height: calc(100vh - 134px);
  }
  ${X}
`,ue=f.div`
  margin: 16px;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  @media (min-width: ${w.TABLET_L}) {
    width: 668px;
    margin: auto;
  }
`,fe=f.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 180px;
`,me=f.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`,he=f.div`
  padding: 12px;
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 16px;
  @media (min-width: ${w.TABLET_L}) {
    width: 50%;
  }
`,xe=f.div`
  padding: 22px;
  padding-left: 40px;
  @media (max-width: ${w.MOBILE_MAX}) {
    padding-left: 16px;
  }
`;f.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  @media (min-width: ${O.TABLET_MIN}) {
    flex-direction: row;
  }
  @media (min-width: ${O.LAPTOP_MIN}) {
    flex-direction: row;
  }
`;const ge=f.img`
  width: 100%;
  border-radius: 12px;
  margin: 0 !important;
`,ye=({experienceTitle:u,experienceDetail:s,onClose:l,isOpen:m,imageUrl:c})=>{const{width:i}=K(),g=o.useMemo(()=>i>=S.LAPTOP,[i]),h=o.useMemo(()=>i>=S.TABLET&&i<S.LAPTOP,[i]),v=o.useMemo(()=>i<S.TABLET,[i]);return x(Y,{isFullScreen:v||h,enableCloseButton:!0,open:m,onClose:l,testId:"add_experience_modal",style:{width:g||h?"752px":"375px"},disableBackdropClick:!0,"data-test":"ReferenceDetailModal-Modal",children:[e(J,{isFullScreen:v||h,"data-test":"ReferenceDetailModal-ModalHeader",children:u}),e(R,{height:16,"data-test":"ReferenceDetailModal-Spacer"}),x(pe,{"data-test":"ReferenceDetailModal-StyledRichEditor",children:[e(se,{"data-testid":"RichTextEditorView",html:s,"data-test":"ReferenceDetailModal-RichTextEditorView"}),c!=null&&c.length?e(ge,{src:c,"data-test":"ReferenceDetailModal-StyledImage"}):void 0]})]})},Re=oe({providerName:P().required(),capacity:P().required()}).required(),ve=()=>{const{flags:{references:u}}=Q(),s=ce(),{addToast:l}=Z(),{search:m}=ie(),c=o.useRef(""),[i,g]=o.useState(!1),[h,v]=o.useState(""),[j,T]=o.useState(!1),[V,F]=o.useState(!1),[r,G]=o.useState({capacity:"",experience:{body:"",id:"",title:"",_id:"",url:""},experienceId:"",experienceOwnerName:"",providerName:"",_id:""}),{control:E,handleSubmit:z,setValue:M}=de({resolver:le(Re),defaultValues:{referenceText:"",capacity:"Client"},reValidateMode:"onBlur",mode:"onBlur"});o.useEffect(()=>{u===!1&&s(ee.LOGIN,{replace:!0})},[s,u]);const L=o.useCallback(async n=>{T(!0);try{const t=await q.getNoumReferenceMetadata(n);G({...t})}catch{l("error","none",a("noumena.give_reference.get_reference_fail"))}finally{T(!1)}},[l]);o.useEffect(()=>{const t=new URLSearchParams(m).get("reference_token");t&&!r._id&&(c.current=t,L(c.current))},[m,L,r._id]),o.useEffect(()=>{if(r.capacity&&r.providerName){const{capacity:n,providerName:t}=r;M("providerName",t);const d=k.find(p=>p.key.toLowerCase()===n.toLowerCase());M("capacity",d?d.value:n)}},[r,M]);const H=o.useCallback(async n=>{const{capacity:t,imageUrl:d,referenceText:p}=n;if(!p||p.trim().split(" ").length<3||p.length>2e3){v(a("noumena.give_reference.experience_error"));return}T(!0);const b=k.find(_=>_.value===t);try{await q.fillOutReferenceByExternalUser({referenceToken:c.current,referenceText:p,...(d==null?void 0:d.length)&&{imageUrl:d},...(t==null?void 0:t.length)&&{capacity:(b==null?void 0:b.key)??t}}),F(!0)}catch{l("error","none",a("noumena.give_reference.request_fail"))}T(!1)},[l]);return x(me,{"data-test":"Reference-Container",children:[e(xe,{"data-test":"Reference-Header",children:e(te,{"data-test":"Reference-Logo"})}),V?x(fe,{"data-test":"Reference-CompletedProvidingReferenceContainer",children:[e(y,{font:"heading-xl-bold",colorToken:"--text-body-header-neutral-default","data-test":"Reference-TSpan",children:a("noumena.give_reference.completed")}),e(y,{font:"body-l",colorToken:"--text-body-neutral-highlighted","data-test":"Reference-TSpan",children:a("noumena.give_reference.completed_description",{referenceRequest:r.experienceOwnerName})})]}):x(ue,{"data-test":"Reference-WrapperContainer",children:[e(y,{font:"heading-xs-bold",colorToken:"--text-body-header-neutral-default","data-test":"Reference-TSpan",children:a("noumena.chamber_edit.give_reference.title",{referenceRequest:r.experienceOwnerName})}),e(R,{height:24,"data-test":"Reference-Spacer"}),e(y,{font:"body-m",colorToken:"--text-body-neutral-highlighted","data-test":"Reference-TSpan",children:a("noumena.chamber_edit.give_reference.description")}),x(he,{onClick:r._id?()=>g(!0):void 0,"data-test":"Reference-ProjectContainer",children:[e(y,{font:"body-m-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"Reference-TSpan",children:r.experience.title}),e(B,{name:"chevron_small_right_m",size:20,color:"--icon-card-neutral-default","data-test":"Reference-Icon"})]}),x("div",{children:[e(C,{control:E,name:"providerName",render:({field:{value:n,onChange:t}})=>e(I,{label:a("noumena.chamber_edit.give_reference.input.name_placeholder"),value:n,onChange:t,"data-test":"Reference-TextField"}),"data-test":"Reference-Controller"}),e(R,{height:16,"data-test":"Reference-Spacer"}),e(C,{control:E,name:"capacity",render:({field:{value:n,onChange:t},fieldState:{error:d}})=>e(ae,{containerStyle:{padding:"0"},observerMinHeight:"0px",hideIcons:!0,placement:"bottom-start",options:k,inputValue:n??"",onSelectOption:p=>{t(p.value)},usePortal:!1,"data-test":"Reference-Dropdown",children:({inputProps:p,inputRef:b,toggle:_})=>e(I,{readOnly:!0,...p,ref:b,value:n??"",label:a("noumena.chamber_edit.give_reference.input.capacity_placeholder",{experienceOwner:r.experienceOwnerName}),spellCheck:"false",onChange:W=>{t(W.currentTarget.value)},error:!!(d!=null&&d.message),rightIcon:e(B,{name:"chevron_down_m",size:16,onClick:_,color:"--icon-input-neutral-default","data-test":"Reference-Icon"}),"data-test":"Reference-TextField"})}),"data-test":"Reference-Controller"}),e(R,{height:16,"data-test":"Reference-Spacer"}),e(C,{control:E,name:"referenceText",render:({field:{value:n,onChange:t}})=>e(re,{label:a("noumena.chamber_edit.give_reference.input.reference_text_placeholder",{experienceOwner:r.experienceOwnerName}),value:n,onChange:d=>{t(d),v("")},error:!!h,helperText:h,"data-test":"Reference-TextArea"}),"data-test":"Reference-Controller"}),e(R,{height:16,"data-test":"Reference-Spacer"}),e(ne,{primary:!0,size:"full",disabled:j,onClick:z(H),"data-test":"Reference-Button",children:a("noumena.submit")})]}),e(R,{height:16,"data-test":"Reference-Spacer"}),e(y,{font:"body-m",colorToken:"--text-body-neutral-default","data-test":"Reference-TSpan",children:a("noumena.chamber_edit.give_reference.footer_2")})]}),e(ye,{imageUrl:r.experience.url,experienceDetail:r.experience.body,experienceTitle:r.experience.title,isOpen:i,onClose:()=>g(!1),"data-test":"Reference-ReferenceDetailModal"})]})},Se=ve;export{Se as default};
//# sourceMappingURL=Reference-e5679cd1.js.map
