import{fz as Fe,bz as P,aC as Ne,c0 as Ut,v as re,fA as Lt,fB as _e,fC as Bt,f as Rt,fD as Et,fE as Ft,fF as Ot,m as oe,s as et,a as Vt,c_ as At,dd as Pt,T as z,B as A,f7 as $t,u as ze,e as Pe,c as v,M as me,j as t,h as he,i as ve,k as De,ax as Q,am as Ue,y as ce,I as X,aR as We,F as te,S as qe,au as He,o as zt,ay as Le,fG as tt,fH as nt,fI as at,fJ as it,fK as st,q as Be,fL as Dt,aK as rt,fM as Wt,fN as ue,fO as $e,X as be,fP as qt,aH as Ht,aZ as ot,fQ as je,b1 as Re,g as Ke,fl as jt,b7 as ae,aL as lt,n as dt,t as ge,fR as Kt,w as Qt,d as ct,fh as Xt,x as ie,da as fe,bl as Oe,fS as Gt,fT as Zt,fU as Jt,fV as Yt,fW as en}from"./index-cd84bcc9.js";import{r as i,f as ut,B as Z,C as p,ad as Ve,ar as q,am as ye,bF as tn,ap as Me,aq as Ce,bb as ne,l as mt,an as J,bG as nn,ay as we}from"./vendor-51460554.js";import{C as an}from"./ChamberActionModal-ce3fca40.js";import{L as Ge}from"./LinkNoumOption-dc9c410c.js";import{S as sn}from"./SelectField-54706174.js";import{g as Ae}from"./forms-18e3c53a.js";const Se=10,ht=(e,n,a=Se)=>{const[r,l]=i.useState("hasNextPage"),[c,s]=i.useState("hasNextPage"),[o,d]=i.useState("hasNextPage"),[u,m]=i.useState([]),[h,b]=i.useState([]),[I,M]=i.useState([]),[C,T]=i.useState(0),[x,S]=i.useState(0),[R,E]=i.useState(0),{data:B,loading:_,error:U,fetchMore:F,refetch:K}=Fe({variables:{limit:n?a:Se,offset:0,spaceId:e}}),{data:L,loading:N,error:O,fetchMore:H,refetch:Y}=Fe({variables:{limit:n?a:Se,offset:0,spaceId:e,status:P.Approved}}),{data:D,loading:G,error:le,fetchMore:V,refetch:g}=Fe({variables:{limit:n?a:Se,offset:0,spaceId:e,status:[P.Approved,P.Invited,P.Declined]}});i.useEffect(()=>{var w,f;m(((w=B==null?void 0:B.getSpaceConnectionsV2)==null?void 0:w.data)||[]),T(((f=B==null?void 0:B.getSpaceConnectionsV2)==null?void 0:f.count)||0)},[B]),i.useEffect(()=>{var w,f;b(((w=L==null?void 0:L.getSpaceConnectionsV2)==null?void 0:w.data)||[]),S(((f=L==null?void 0:L.getSpaceConnectionsV2)==null?void 0:f.count)||0)},[L]),i.useEffect(()=>{var w,f;M(((w=D==null?void 0:D.getSpaceConnectionsV2)==null?void 0:w.data)||[]),E(((f=D==null?void 0:D.getSpaceConnectionsV2)==null?void 0:f.count)||0)},[D]);const j=i.useCallback(async()=>{var k,W;const w=await F({variables:{limit:a,offset:(u==null?void 0:u.length)||0}}),f=((W=(k=w==null?void 0:w.data)==null?void 0:k.getSpaceConnectionsV2)==null?void 0:W.data)||[],y=[...u||[],...f];m(y),(f.length||0)<a&&l("end")},[F,u,a]),ee=i.useCallback(async()=>{var k,W;const w=await H({variables:{limit:a,offset:(h==null?void 0:h.length)||0}}),f=((W=(k=w==null?void 0:w.data)==null?void 0:k.getSpaceConnectionsV2)==null?void 0:W.data)||[],y=[...h||[],...f];b(y),(f.length||0)<a&&s("end")},[H,h,a]),$=i.useCallback(async()=>{var k,W;const w=await V({variables:{limit:a,offset:(I==null?void 0:I.length)||0}}),f=((W=(k=w==null?void 0:w.data)==null?void 0:k.getSpaceConnectionsV2)==null?void 0:W.data)||[],y=[...I||[],...f];M(y),(f.length||0)<a&&d("end")},[V,a,I]),de=i.useMemo(()=>Ne(u==null?void 0:u.filter(w=>(w==null?void 0:w.permission)!==Ut.Disconnect)),[u]);return i.useEffect(()=>{l(u&&(u==null?void 0:u.length)>=C?"end":"hasNextPage")},[u,C]),i.useEffect(()=>{s(h&&(h==null?void 0:h.length)>=x?"end":"hasNextPage")},[h,x]),i.useEffect(()=>{d(I&&(I==null?void 0:I.length)>=R?"end":"hasNextPage")},[I,R]),i.useEffect(()=>{K()},[K]),i.useEffect(()=>{Y()},[Y]),i.useEffect(()=>{g()},[g]),{connectionsData:u,loading:_,error:U,infiniteState:r,fetchMoreConnections:j,refetchConnections:K,connections:de,appConnectionsData:h,approvedConnectionsLoading:N,approvedConnectionsError:O,approvedInfiniteState:c,fetchMoreApprovedConnections:ee,approvedConnectionsRefetch:Y,invitedConnections:I,invitedConnectionsLoading:G,invitedConnectionsError:le,invitedInfiniteState:o,fetchMoreInvitedConnections:$,refetchInvitedConnections:g}};function rn(){const{addToast:e}=re(),[n,{loading:a}]=Lt(),r=i.useCallback(async(l,c)=>{if(!l)return!1;let s;try{await n({variables:{token:l},update:(o,{data:d})=>{if(!d||!d.setInviteInactive)return;const{getinviteNonNoumenaMember:u}=o.readQuery({query:_e,variables:{noumId:c}});if(!u||!(u!=null&&u.count))return;const h=((u==null?void 0:u.data)||[]).filter(b=>(b==null?void 0:b._id)!==l);o.writeQuery({query:_e,variables:{noumId:c},data:{getinviteNonNoumenaMember:h}})}}),s=!0}catch(o){let d="Unknown";o instanceof Error&&(d=o.message),e("error","none",d),ut(new Error(d),{tags:{section:"updateConnectionStatus"}}),s=!1}return s},[e,n]);return{loading:a,setInvitedMemberInactive:r}}function bt(){const[e,{loading:n}]=Bt();return{sendNonMemberInvite:i.useCallback(async(r,l,c,s,o,d="")=>{var u,m,h,b;return e({variables:{input:{requestedForNoumId:r,email:l,firstName:c,lastName:s,noumDetails:{title:o.name||"",profileUrl:(o==null?void 0:o.profileImage)||"",owner:`${((u=o.uid)==null?void 0:u.firstName)||""} ${((m=o.uid)==null?void 0:m.middleName)||""} ${((h=o.uid)==null?void 0:h.lastName)||""}`.trim(),type:((b=o==null?void 0:o.category)==null?void 0:b.name)||""},message:d||""}},update:(I,{data:M})=>{var S,R;if(!M||!M.inviteNonNoumenaMember)return;const{getinviteNonNoumenaMember:C}=I.readQuery({query:_e,variables:{noumId:r}}),T=(C==null?void 0:C.data)||[],x=[{_id:(S=M.inviteNonNoumenaMember)==null?void 0:S.id,__typename:(R=M.inviteNonNoumenaMember)==null?void 0:R.__typename,token:null,isActive:!0,requestedForNoumId:r,uid:{email:l,firstName:c,lastName:s}},...T];I.writeQuery({query:_e,variables:{noumId:r},data:{getinviteNonNoumenaMember:x}})}})},[e]),loading:n}}const on=e=>{const{user:n}=Rt(),[a,{data:r,loading:l,refetch:c,fetchMore:s}]=Et({variables:e});return i.useEffect(()=>{n!=null&&n._id&&a()},[n,a]),{data:r,loading:l,refetch:c,fetchMore:s,getListBlockedCountries:a}},ln=e=>{var c;const{data:n,loading:a,refetch:r}=Ft({skip:!e,fetchPolicy:"cache-and-network",variables:{noumId:e},notifyOnNetworkStatusChange:!0}),l=i.useMemo(()=>{var s,o;return Ne((o=(s=n==null?void 0:n.getinviteNonNoumenaMember)==null?void 0:s.data)==null?void 0:o.filter(d=>(d==null?void 0:d.isActive)||(d==null?void 0:d.isVerified)))},[(c=n==null?void 0:n.getinviteNonNoumenaMember)==null?void 0:c.data]);return{refetchNonMembers:r,nonMembers:l,loadingNonMembers:a}};function dn(){const{addToast:e}=re(),n=i.useCallback(s=>{e("error","none",`${Z("noumena.toast_error.text")}: ${s}`)},[e]),a=i.useCallback(()=>{e("success","icon",Z("noumena.chamber_edit.visibility.success_message"))},[e]),[r,{loading:l}]=Ot(),c=i.useCallback(async(s,o)=>{await r({variables:{spaceId:s,visibility:o},onError:({networkError:d=null,graphQLErrors:u=[]})=>{const[m]=u;n((m==null?void 0:m.message)??d),ut(new Error((m==null?void 0:m.message)??d),{tags:{section:"updateNoumVisibilitySettingsMutation"}})},onCompleted:()=>{a()}})},[n,a,r]);return{loading:l,updateNoumVisibilitySettingsHelper:c}}const cn=p.div`
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  @media (max-width: ${oe.MOBILE_L_MAX}) {
    display: block;
    min-height: unset;
  }
  gap: 10px;
`,un=p(z)`
  line-height: 160%;
`,pt=p.div`
  display: flex;
  flex-direction: row;
  justify-content: ${e=>e.justifyCenter?"center":"space-between"};
  gap: 12px;
  width: 100%;
  padding-top: 16px;
  box-sizing: border-box;
`,mn=p.div`
  flex: 1;
`,Qe=p.div`
  display: flex;
  flex-direction: column;
  ${e=>e.fullWidth&&"width: 100%"};
`,ft=p.div`
  padding-top: 5px;
  margin-left: 12px;
`,vt=p.div`
  padding-top: 0px;
  @media (max-width: ${oe.MOBILE_L_MAX}) {
    padding-top: 6px;
  }
`,Ee=p(z)`
  width: 100%;
  line-height: 160%;
`,hn=p(z)`
  width: 100%;
  line-height: 160%;
  font-weight: 600;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`,bn=p.div`
  width: 100%;
  border-top: 1px solid var(--bg-separator-neutral-default);
  margin-top: 16px;
  margin-bottom: 16px;
`,pn=p.div`
  width: 100%;
`,fn=p(A)`
  width: 100px;
`,gt=p.div`
  width: 100%;
  padding-bottom: 12px;
  box-sizing: border-box;
  height: 296px;
  overflow-y: auto;
  @media (max-width: ${et.TABLET_L}) {
    height: calc(100vh - 453px);
    overflow-y: auto;
  }
`;p.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;p(A)`
  flex: 1;
`;const vn=p.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  min-height: 86px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  padding-left: 16px;
  box-sizing: border-box;
`,gn=p.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-left: ${e=>e.isPadding?"16px":0};
`,yn=p.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  span {
    ${Vt}
  }
`,Mn=p.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`,Cn=p(z)`
  margin-right: 12px;
`,yt=p.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 296px;
  width: 100%;
  @media (max-width: ${et.TABLET_L}) {
    height: calc(100vh - 452px);
  }
`,Mt=p.div`
  ${At.bodyMedium};
  width: 100%;
`,Sn=p.div`
  display: flex;
  justify-content: center;
  @media (max-width: ${oe.MOBILE_L_MAX}) {
    justify-content: flex-start;
  }
`,In=p.div`
  min-width: 240px;
`,xn=p.div`
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: ${oe.MOBILE_L_MAX}) {
    justify-content: flex-start;
    width: 100%;
  }
`;p.div`
  display: block;
  @media (max-width: ${oe.MOBILE_L_MAX}) {
    height: calc(100vh - 200px);
    overflow-y: auto;
  }
`;const Ct=p.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: unset;
`,Ie=p.div`
  padding: 12px 0px;
  width: ${e=>e.width};
  @media (max-width: ${oe.MOBILE_L_MAX}) {
    padding: 6px 0px;
    width: 100%;
  }
`,kn=p(A)`
  display: inline;
  height: auto;
  width: auto;
  min-height: unset;
  max-height: unset;
  min-width: unset;
  vertical-align: baseline;
  padding: 0;
  margin: 0;

  & > ${Pt} {
    text-decoration: underline;
    font: inherit;
    color: var(--text-input-neutral-default);
  }
`,_n=p.div`
  max-height: 152px;
  width: 100%;
  overflow-y: auto;
  margin-top: 17px;
  ${$t};
`,wn=({isOpen:e,handleClose:n,linkedNoums:a,selectedOption:r,handleAccept:l})=>{const{width:c}=ze(),s=i.useMemo(()=>c<=Pe.MOBILE_MAX,[c]);return v(me,{isFullScreen:!1,testId:"link-visibility-modal",open:e,onClose:n,style:{width:s?"auto":"450px"},enableCloseButton:!0,disableBackdropClick:!0,"data-test":"ChamberVisibilityLinkModal-Modal",children:[t(he,{isFullScreen:!1,"data-test":"ChamberVisibilityLinkModal-ModalHeader",children:Z("noumena.container.chamber_publish_visibility_link.title")}),v(ve,{isFullScreen:!1,style:{alignItems:"center"},hasScrollBar:!0,"data-test":"ChamberVisibilityLinkModal-ModalBody",children:[r&&t(Ge,{iconSize:40,item:r,showBorder:!1,showChips:!0,showDetail:!0,style:{alignSelf:"stretch"},"data-test":"ChamberVisibilityLinkModal-LinkNoumOption"}),t(z,{colorToken:"--text-modal-neutral-default",textAlign:"center",font:"body-m","data-test":"ChamberVisibilityLinkModal-TSpan",children:Z("noumena.container.chamber_publish_visibility_link.description",{linkCount:a.length})}),a.length&&t(_n,{"data-test":"ChamberVisibilityLinkModal-ExistingLinkContainer",children:a.map((o,d)=>t(Ge,{item:o,showDetail:!1,showBorder:d<a.length-1,"data-test":"ChamberVisibilityLinkModal-LinkNoumOption"},o._id))})]}),v(De,{isFullScreen:!1,marginTop:24,gap:16,flexDirection:s?"column":"row-reverse","data-test":"ChamberVisibilityLinkModal-ModalFooter",children:[t(A,{size:"full",primary:!0,onClick:l,"data-test":"ChamberVisibilityLinkModal-Button",children:Z("noumena.continue")}),t(A,{tertiary:!0,size:"full",onClick:n,"data-test":"ChamberVisibilityLinkModal-Button",children:Z("noumena.cancel")})]})]})},Tn=[{key:Ve(),label:"Public",type:"value",value:Q.Public,description:Z("noumena.chamber_edit.visibility.public_description"),labelColor:"--text-tablecell-header-neutral-highlighted"},{key:Ve(),label:"Private",type:"value",value:Q.Private,description:Z("noumena.chamber_edit.visibility.private_description"),labelColor:"--text-tablecell-header-neutral-highlighted"},{key:Ve(),label:"Secret",type:"value",value:Q.Secret,description:Z("noumena.chamber_edit.visibility.secret_description"),labelColor:"--text-tablecell-header-neutral-highlighted"}],xe=[{key:"invite-cancel",label:"Cancel Invite",type:"value",value:"Cancel",description:""},{key:"invite-resend",label:"Resend the Invite",type:"value",value:"Resend",description:""}],Nn=e=>{switch(e){case Q.Public:return t(X,{name:"public_XL",size:40,"data-test":"mapOptionIcon-Icon"});case Q.Private:return t(X,{name:"lock_xl",size:40,"data-test":"mapOptionIcon-Icon"});case Q.Secret:return t(X,{name:"private_XL",size:40,"data-test":"mapOptionIcon-Icon"});default:return null}};function Un({value:e,onChange:n}){const{t:a}=q(),[r,l]=i.useState(!1),c=i.useMemo(()=>Tn.map(o=>({...o,icon:Nn(o.value),selected:o.value===e})),[e]),s=c.find(o=>o.value===e);return t(mn,{children:t(Qe,{fullWidth:!0,children:t(Ue,{hideIcons:!1,closeOnSelect:!0,placement:"bottom-end",options:c,onSelectOption:n,onOpen:()=>l(!0),onClose:()=>l(!1),usePortal:!1,calRefTop:!1,isAnimation:!1,usePopStyle:!0,iconColumnWidth:40,"data-test":"Dropdown",children:({inputProps:o,inputRef:d,toggle:u})=>t(ce,{readOnly:!0,ref:d,...o,value:typeof(s==null?void 0:s.label)=="string"?s.label:"",label:a("noumena.chamber_edit.visibility.visibility_setting"),helperText:e&&a(`noumena.chamber_edit.visibility.${e.toLowerCase()}_description`),spellCheck:"false",rightIcon:r?t(X,{color:"--icon-input-neutral-default",name:"chevron_up_m",size:16,onClick:u,"data-test":"Icon"}):t(X,{color:"--icon-input-neutral-default",name:"chevron_down_m",size:16,onClick:u,"data-test":"Icon"}),"data-test":"TextField"})})})})}const Ln=ye({visibility:tn().oneOf(Object.values(Q))});function Bn({defaultValues:e}){return Me({defaultValues:e,resolver:Ce(Ln)})}function Rn(e){switch(e){case"PRIVATE":return Q.Private;case"PUBLIC":return Q.Public;case"SECRET":return Q.Secret;default:return Q.Public}}function En({noumId:e,defaultVisibility:n,linkedNoums:a,isSEOEnabled:r,onClose:l}){const{addErrorToast:c}=re(),{t:s}=q(),{modalType:o,openModal:d,closeModal:u}=We(),{handleSubmit:m,control:h,getValues:b,formState:{isDirty:I}}=Bn({defaultValues:{visibility:Rn(n)}}),{updateNoumVisibilitySettingsHelper:M,loading:C}=dn(),T=i.useCallback(async()=>{const E=b("visibility");E&&(await M(e,E),l())},[b,M,e,l]),x=i.useCallback(()=>{a!=null&&a.length?d("linked-noums-visibility"):T()},[T,a==null?void 0:a.length,d]),S=i.useCallback(async E=>{const B=E.visibility;if(r&&B!==Q.Public){c("SEO enabled noums can only be public");return}B===Q.Public?d("auto-accept-pending"):x()},[c,x,r,d]),R=i.useCallback(()=>{T(),u()},[u,T]);return v(te,{children:[t(un,{colorToken:"--text-modal-neutral-default",font:"body-m",children:s("noumena.chamber_edit.visibility.description")}),t(qe,{height:"16px","data-test":"Spacer"}),v(pt,{children:[t(ne,{control:h,name:"visibility",render:({field:{value:E,onChange:B}})=>t(Un,{value:E,onChange:_=>B(_.value),"data-test":"ChamberVisibilityPicker"}),"data-test":"Controller"}),t(fn,{primary:!0,size:"large",disabled:!I,loading:C,onClick:m(S),children:s("noumena.chamber_edit.visibility.save")})]}),t(wn,{isOpen:o==="linked-noums-visibility",handleAccept:R,handleClose:u,linkedNoums:a||[],"data-test":"ChamberVisibilityLinkModal"}),t(an,{positiveBtnLabel:s("noumena.continue"),confirmCallback:x,cancelCallback:u,isOpen:o==="auto-accept-pending",title:s("noumena.container.chamber_publish_visibility_link.title"),description:s("noumena.noum.visibility.public.pending_request_auto_accept"),negativeBtnLabel:s("noumena.cancel"),"data-test":"ChamberActionModal"})]})}var se=(e=>(e.NoumenaMembers="NOUMENA_MEMBERS",e.NonNoumenaMembers="NON_NOUMENA_MEMBERS",e))(se||{});const St=[{id:se.NoumenaMembers,name:"Noumena Members",image:"terms_m",text:Z("noumena.chamber_edit.modal.members"),labelSize:"auto"},{id:se.NonNoumenaMembers,name:"Non-Noumena Members",image:"terms_m",text:Z("noumena.chamber_edit.modal.non_members"),labelSize:"auto"}],It=({user:e,onSelect:n,isNonNoumTab:a=!1})=>{var u;const[r,l]=i.useState(!1),c=i.useMemo(()=>e.connectionStatus,[e]),s=i.useMemo(()=>{if(a&&!e.isVerified)return"Pending";if(a&&e.isVerified)return"Accepted";switch(e.connectionStatus){case P.Invited:return"Pending";default:return mt.capitalize(e.connectionStatus)}},[e,a]),o=i.useMemo(()=>{if(a&&e.isVerified)return xe.filter(m=>m.value!=="Resend");switch(e.connectionStatus){case P.Invited:return xe.filter(m=>m.value!=="Resend");case P.Declined:case P.Cancelled:case P.Removed:return xe.filter(m=>m.value!=="Cancel")}return xe},[a,e.connectionStatus,e.isVerified]),d=i.useCallback(m=>{n(e,m.value)},[e,n]);return v(vn,{"data-test":"ChamberInvitedUser-UserWrapper",children:[e.isMember&&t(He,{url:((u=e.profile)==null?void 0:u.profilePictureThumbnail)||"","data-test":"ChamberInvitedUser-Avatar"}),v(gn,{isPadding:e.isMember,"data-test":"ChamberInvitedUser-UserBody",children:[v(yn,{"data-test":"ChamberInvitedUser-UserName",children:[t(z,{colorToken:"--text-tablecell-header-neutral-highlighted",font:e.isMember?"body-l-bold":"body-l","data-test":"ChamberInvitedUser-TSpan",children:zt(e.firstName,"",e.lastName)}),t(z,{colorToken:"--text-tablecell-body-neutral-default",font:"body-m",title:(e==null?void 0:e.title)??"","data-test":"ChamberInvitedUser-TSpan",children:e.isMember?e.title:e.email})]}),t(Qe,{"data-test":"ChamberInvitedUser-DropdownWrapper",children:t(Ue,{hideIcons:!0,closeOnSelect:!0,placement:"bottom-end",options:o,containerWidth:"238px",onSelectOption:d,onOpen:()=>l(!0),onClose:()=>l(!1),usePortal:!0,calRefTop:!0,isAnimation:!1,usePopStyle:!0,minHeight:"fit-content",observerMinHeight:"0px","data-test":"ChamberInvitedUser-Dropdown",children:({targetProps:m,targetRef:h,toggle:b})=>v(Mn,{ref:h,...m,onClick:c===P.Approved||a&&e.isVerified?()=>{}:b,"data-test":"ChamberInvitedUser-DropdownPicker",children:[t(Cn,{colorToken:"--text-tablecell-body-neutral-default",font:"body-m","data-test":"ChamberInvitedUser-PickedInviteStatus",children:s}),!(c===P.Approved||a&&e.isVerified)&&t(X,{name:`chevron_small_${r?"up":"down"}_m`,size:24,color:"--icon-tablecell-neutral-highlighted","data-test":"ChamberInvitedUser-Icon"})]})})})]})]})},Fn=p.div`
  width: 100%;
`,On=p.div`
  width: 100%;
  display: flex;
  align-items: center;
`,Vn=p.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  min-height: 56px;
  box-sizing: border-box;
  padding-left: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  transition: border 0.2s linear;
  background-color: var(--bg-input-neutral-default);
  border-color: ${({focused:e})=>e?"var(--border-input-brand-primary-default);":"transparent"};
`,An=p.div`
  flex: 1;
  min-width: 50px;
  display: flex;
  align-items: center;
`,Pn=p.input`
  font-size: var(--font-input-medium-size);
  font-family: var(--font-family);
  color: var(--text-input-neutral-default);
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  padding: 0 !important;
  -webkit-text-fill-color: var(--text-input-neutral-filled);
  ::placeholder {
    font-family: var(--font-input-medium-regular-font);
    color: var(--text-input-neutral-default);
    -webkit-text-fill-color: var(--text-input-neutral-default);
    opacity: 1; /* Firefox */
  }
`,$n=p.div`
  padding: 2px;
  align-items: center;
  display: flex;
`;p.div`
  display: flex;
  align-items: center;
  padding-left: 10px;

  @media (max-width: 767px) {
    display: none;
  }
`;const zn=p(A)`
  min-width: unset;
  @media (min-width: ${oe.TABLET_MIN}) {
    width: 100px;
  }
`,Dn=p(A)`
  min-width: unset;
  padding-left: 3px;
  margin-bottom: 3px;
`,Wn=p.div``,qn=i.forwardRef(({inputProps:e,children:n},a)=>{const[r,l]=i.useState(!1),c=i.useCallback(o=>{e.onFocus&&e.onFocus(o),l(!0)},[e]),s=i.useCallback(o=>{e.onBlur&&e.onBlur(o),l(!1)},[e]);return t(On,{"data-testid":"invite-user-search",ref:a,"data-test":"InviteUserSearch-SearchWrapper",children:v(Vn,{focused:r,"data-test":"InviteUserSearch-SearchContainer",children:[n,t(An,{"data-test":"InviteUserSearch-InputWrapper",children:t(Pn,{...e,onFocus:c,onBlur:s,"data-test":"InviteUserSearch-InputField"})})]})})}),Hn=({options:e,activeItem:n,loading:a,hasMore:r,onSelect:l,onFetchMore:c})=>t(Le,{"data-testid":"invite-users-list",status:a?"loading":r?"end-with-force":"end",onFetchMore:c,"data-test":"InviteUserOptionRenderer-Infinite",children:e.map(s=>s.type==="value"?t(tt,{active:(n==null?void 0:n.key)===s.key,tabIndex:0,onClick:()=>l(s),"data-test":"InviteUserOptionRenderer-DropdownItemLayout",children:v(nt,{selected:(n==null?void 0:n.key)===s.key,"data-test":"InviteUserOptionRenderer-DropDownLabel",children:[t(Wn,{"data-test":"InviteUserOptionRenderer-AvatarWrapper",children:t(He,{url:s.value.user.thumbnailUrl??"",size:"M","data-test":"InviteUserOptionRenderer-Avatar"})}),v(at,{"data-test":"InviteUserOptionRenderer-DropdownValueWrapper",children:[t(it,{"data-test":"InviteUserOptionRenderer-DropdownValueLabel",children:s.label}),s.description&&t(st,{"data-test":"InviteUserOptionRenderer-DropdownValueDescription",children:s.description})]})]})},s.key):null)}),jn=({data:e,multiselect:n,onRemove:a})=>t($n,{"data-testid":"invite-selected-user","data-test":"InviteSelectedUser-SelectedUser",children:t(Be,{secondary:!0,icon:n?t(X,{"data-testid":"remove-button",name:"close_m",size:24,color:"--icon-tab-basic-brand-primary-default",onClick:()=>a(e.key),"data-test":"InviteSelectedUser-Icon"}):void 0,"data-test":"InviteSelectedUser-Tag",children:t(z,{"data-testid":"text-message",flex:1,font:"body-m",colorToken:"--text-tab-chips-brand-primary-selected","data-test":"InviteSelectedUser-TSpan",children:e.label})})}),Ze=15;function xt(e){const{data:n,loading:a}=Dt({variables:{search:e,limit:1,filter:{excludeUsersByStatus:[rt.Unregistered]}}}),{data:r,fetchMore:l,loading:c}=Wt({variables:{query:e,limit:Ze,entityType:ue.HomeNoum},fetchPolicy:"cache-and-network"}),s=i.useCallback(d=>l({variables:{query:e,limit:Ze,offset:d||0,entityType:ue.HomeNoum}}),[l,e]),o=i.useMemo(()=>Ne(r==null?void 0:r.globalSearch.data).filter(d=>d.entityType===ue.HomeNoum&&d.user.status===$e.NoumenaMember),[r]);return{allCount:(n==null?void 0:n.allUsers.count)||0,users:o,fetchMore:s,loading:a||c}}const Kn=e=>e.map(n=>({key:n.id,label:n.user.name||"",type:"value",description:n.user.title||"",value:n})),Qn=({handleInvite:e})=>{const{t:n}=q(),{addToast:a}=re(),{isMobile:r,windowDimensions:{width:l}}=be(),c=i.useRef(null),{id:s}=i.useContext(qt),{space:o}=Ht(),d=s||(o==null?void 0:o._id)||"",[u,m]=i.useState([]),[h,b]=i.useState(),[I,M]=i.useState(""),[C,T]=i.useState(0),[x]=i.useState(!0),[S,R]=i.useState(""),E=ot(I,500),{allCount:B,users:_,loading:U,fetchMore:F}=xt(E),[K,{loading:L}]=je(),[N,O]=i.useState([]),[H,Y]=i.useState(_||[]),D=U||L;i.useEffect(()=>{Y(_||[])},[_]);const G=i.useMemo(()=>(h==null?void 0:h.length)||u.length,[h,u]),le=i.useMemo(()=>Kn(H||[]),[H]),V=i.useMemo(()=>{const f=[];return le.forEach(y=>{(h||[]).includes(String(y.key))||f.push({...y,selected:!1})}),f},[le,h]),g=i.useCallback(async()=>{if(H.length<B){const f=await F(H.length),y=H.concat(f.data.globalSearch.data);Y(y)}},[H,B,F]),j=i.useCallback(f=>{const{value:y}=f.target;M(y)},[]),ee=i.useCallback(f=>{const y=h||[];x?y.includes(f.key)?(b(y.filter(k=>k!==f.key)),O(N.filter(k=>k.key!==f.key))):(b([...y,f.key]),O([...N,f])):(b([f.key]),O([f])),M("")},[x,h,N]),$=i.useCallback(f=>{b(y=>(y||[]).filter(k=>k!==f)),O(y=>(y||[]).filter(k=>k.key!==f)),m(y=>(y||[]).filter(k=>k.key!==f))},[]),de=i.useCallback(async()=>{const f=N.map(y=>y.value.id);try{await K({variables:{message:S.trim(),ownSpaceId:d,invitedSpaceIds:f}}),e(),a("success","icon",`${n("noumena.chamber_invite_sent.success_messages")}`),R("")}catch(y){let k="Unknown";y instanceof Error&&(k=y.message);const W=k.includes("not published")?`${n("noumena.chamber_invite_sent.error_message.not_published")}`:`${n("noumena.toast_error.text")}: ${k}`;a("error","none",W)}O([]),b([])},[N,K,S,d,e,a,n]);i.useLayoutEffect(()=>{c.current&&T(c.current.clientWidth)},[c,l]);const w=i.useCallback(()=>{r&&M("")},[r]);return v(te,{children:[v(pt,{children:[v(Qe,{fullWidth:!0,children:[t(Fn,{"data-testid":"invite-users-picker",ref:c,"data-test":"InviteUserPicker-Container",children:t(Ue,{hideIcons:!0,closeOnSelect:!0,multiselect:x,placement:"bottom-start",options:V,onInputChange:f=>M(f),onSelectOption:ee,onClose:w,usePortal:!0,calRefTop:!1,isAnimation:!1,containerWidth:`${C}px`,containerHeight:r?"100vh":"250px",isLoading:D,showInternalSearch:r,forceHideCloseButton:!1,optionsRenderer:(f,y,k)=>t(Hn,{loading:D,hasMore:H.length<B,options:f,multiselect:x,activeItem:k,onSelect:y,onFetchMore:g,"data-test":"InviteUserPicker-InviteUserOptionRenderer"}),"data-test":"InviteUserPicker-Dropdown",children:({inputProps:f,inputRef:y})=>t(qn,{ref:y,inputProps:{...f,placeholder:G?"":n("noumena.chamber_edit.visibility.invite_placeholder"),value:I,onChange:j,onKeyDown:()=>{}},"data-test":"InviteUserPicker-InviteUserSearch",children:[...N,...u].map(k=>t(jn,{multiselect:x,data:k,onRemove:$,"data-test":"InviteUserPicker-InviteSelectedUser"},k.key))})})}),t(ft,{children:t(Ee,{colorToken:"--text-input-neutral-default",font:"body-s",children:n("noumena.chamber_edit.visibility.invite_description")})})]}),t(zn,{primary:!0,size:"large",disabled:!G,onClick:de,loading:L,"data-test":"InviteUserPicker-InviteButton",children:n("noumena.chamber_edit.visibility.invite")})]}),G>0&&v(te,{children:[t(qe,{height:16,"data-test":"InviteUserPicker-Spacer"}),t(Re,{label:n("noumena.chamber_edit.visibility.invite_message.input_placeholder"),maxLength:200,value:S,onChange:f=>R(f.target.value.trimStart().slice(0,200)),autoResize:!0,"data-test":"InviteUserPicker-TextArea"})]})]})},Je=({spaceId:e})=>{const{invitedConnectionsLoading:n,invitedConnections:a,refetchInvitedConnections:r,fetchMoreInvitedConnections:l,invitedInfiniteState:c}=ht(e,!0,10),{linkedNoumIds:s}=Ke(e),{addToast:o}=re(),{t:d}=q(),u=i.useMemo(()=>!!(a!=null&&a.length),[a]),m=i.useRef(null),{updateConnectionStatusHelper:h}=jt(),[b]=je(),I=i.useMemo(()=>{const x=[];return a==null||a.map(S=>{var R,E,B,_,U,F,K,L,N;if((!ae.isInactive((R=S.requestTo)==null?void 0:R.uid)||!ae.isInactive((E=S.requestFrom)==null?void 0:E.uid))&&S.status!==P.Cancelled&&S.status!==P.Removed&&((_=(B=S.requestTo)==null?void 0:B.uid)==null?void 0:_.userStatus)!==lt.Unregistered&&!ae.isInactive((U=S.requestTo)==null?void 0:U.uid)){const O=((F=S.requestFrom)==null?void 0:F._id)===e||s.includes((K=S==null?void 0:S.requestFrom)==null?void 0:K._id)?(L=S==null?void 0:S.requestTo)==null?void 0:L.uid:(N=S==null?void 0:S.requestFrom)==null?void 0:N.uid;x.push({isMember:!0,connectionStatus:S.status,connectionId:S._id,...O})}}),x},[a,e,s]),M=i.useCallback(async x=>{var S;try{await b({variables:{ownSpaceId:e,invitedSpaceIds:[((S=x.chamber)==null?void 0:S._id)||""]}}),o("success","icon",`${d("noumena.chamber_invite_sent.success_message")}`),r()}catch(R){let E="Unknown";R instanceof Error&&(E=R.message),o("error","none",`${d("noumena.toast_error.text")}: ${E}`)}},[b,e,o,d,r]),C=i.useCallback((x,S)=>{switch(S){case"Cancel":h(e,x.connectionId,P.Cancelled);break;case"Resend":M(x);break}},[h,e,M]),T=i.useCallback(()=>{r(),m.current&&m.current.scrollTo({top:m.current.offsetTop,behavior:"smooth"})},[r]);return v(te,{children:[t(Qn,{handleInvite:T,"data-test":"InviteMemberTab-InviteUserPicker"}),n?t(yt,{children:t(dt,{"data-test":"InviteMemberTab-Spinner"})}):t(gt,{children:t(Le,{ref:m,onFetchMore:l,status:c,scrollbarWidth:0,isSpinnerRelative:!0,"data-test":"InviteMemberTab-Infinite",children:!!u&&(I==null?void 0:I.map(x=>t(It,{user:x,onSelect:C,"data-test":"InviteMemberTab-ChamberInvitedUser"},x._id)))})})]})},kt=({isOpen:e,onClose:n})=>{var h;const[a,r]=i.useState([]),{t:l}=q(),c=ze(),o=i.useMemo(()=>c.width<768,[c])?30:20,{data:d,fetchMore:u}=on({limit:o});i.useEffect(()=>{var b;return r((b=d==null?void 0:d.listBlockedCountries)==null?void 0:b.data)},[(h=d==null?void 0:d.listBlockedCountries)==null?void 0:h.data]);const m=i.useCallback(async()=>{var I;const{data:b}=await u({variables:{limit:o,offset:a.length||0}});r([...a,...(I=b.listBlockedCountries)==null?void 0:I.data])},[a,u,o]);return v(me,{testId:"chamber-blocked-countries-modal",open:e,onClose:n,enableAnimation:!0,size:ge.M,customCloseButton:t(A,{testId:"close_reference_modal",textOnly:!0,size:"small",icon:t(X,{color:"icon-button-brand-primary-default",name:"arrow_left_m",size:24,"data-test":"BlockedCountriesListModal-Icon"}),onClick:n,"data-test":"BlockedCountriesListModal-Button"}),"data-test":"BlockedCountriesListModal-Modal",children:[t(he,{"data-test":"BlockedCountriesListModal-ModalHeader",children:l("noumena.chamber_edit.visibility.global_availability")}),t(xn,{children:t(z,{colorToken:"--text-modal-neutral-default",font:"body-m","data-test":"BlockedCountriesListModal-TSpan",children:l("noumena.chamber_edit.visibility.except_countries")})}),a!=null&&a.length?t(Le,{onFetchMore:m,status:"end-with-force",paddingBottom:"15px",paddingTop:"15px",width:"100%","data-test":"BlockedCountriesListModal-Infinite",children:a==null?void 0:a.map(b=>t(Sn,{children:t(In,{children:v(z,{colorToken:"--text-modal-neutral-default",font:"body-m","data-test":"BlockedCountriesListModal-TSpan",children:["• ",(b==null?void 0:b.name)||""]})})},b.code))}):t(z,{colorToken:"--text-modal-neutral-default","data-test":"BlockedCountriesListModal-TSpan",children:"no blocked countries"})]})},Xn=({connectedUsers:e,spaceId:n})=>{var le;const[a,{loading:r}]=Kt(),[l,{loading:c}]=je({onCompleted:V=>{var g;(g=V.sendMultipleConnectionInvite)!=null&&g.length?(h("success","icon",`${m("noumena.chamber_edit.visibility.invite_non_member.invited_noum_user")}`),_(),u("")):V.sendMultipleConnectionInvite&&V.sendMultipleConnectionInvite.length===0&&(h("primary","icon",`${m("noumena.chamber_edit.visibility.invite_non_member.already_invited")}`),_())}}),[s,o]=i.useState(!1),[d,u]=i.useState(""),{t:m}=q(),{addToast:h}=re(),{width:b}=ze(),{sendNonMemberInvite:I,loading:M}=bt(),{connections:C}=ht(n),{space:T}=Ke(n),x=i.useMemo(()=>{const V=[];return C==null||C.map(g=>{var j,ee,$,de,w,f,y,k,W,pe;if((((j=g.requestFrom)==null?void 0:j._id)===n&&!ae.isInactive((ee=g.requestTo)==null?void 0:ee.uid)||(($=g.requestTo)==null?void 0:$._id)===n&&!ae.isInactive((de=g.requestFrom)==null?void 0:de.uid))&&g.status!==P.Cancelled&&g.status!==P.Removed&&((f=(w=g.requestTo)==null?void 0:w.uid)==null?void 0:f.userStatus)!==lt.Unregistered&&!ae.isInactive((y=g.requestTo)==null?void 0:y.uid)){const Nt=((k=g.requestFrom)==null?void 0:k._id)===n?(W=g==null?void 0:g.requestTo)==null?void 0:W.uid:(pe=g==null?void 0:g.requestFrom)==null?void 0:pe.uid;V.push({isMember:!0,connectionStatus:g.status,connectionId:g._id,...Nt})}}),V},[C,n]),S=b<Pe.TABLET,R=b>Pe.TABLET_L,E=ye().shape({email:J().email(m("noumena.chamber_edit.visibility.invite_non_member_email.invalid_error")).required(m("noumena.signup.error.field_cannot_be_empty")),firstName:J().max(20,m("noumena.signup.first_name.too_long")).required(m("noumena.signup.error.field_cannot_be_empty")),lastName:J().max(20,m("noumena.signup.last_name.too_long")).required(m("noumena.signup.error.field_cannot_be_empty"))}).required(),{register:B,reset:_,getValues:U,handleSubmit:F,formState:{isValid:K,errors:L},trigger:N}=Me({resolver:Ce(E),defaultValues:{email:"",firstName:"",lastName:""}}),O=i.useCallback(async V=>{var w,f;const g={isNew:!0,isUnregistered:!0};if((e==null?void 0:e.filter(y=>y.email===V&&y.isVerified&&y.userStatus===rt.Unregistered)).length)return g.isNew=!1,g;const ee=await a({variables:{query:V,limit:1,entityType:ue.HomeNoum}}),$=(f=(w=ee==null?void 0:ee.data)==null?void 0:w.globalSearch)==null?void 0:f.data[0];return!$||$.entityType!==ue.HomeNoum||$.user.status!==$e.NoumenaMember?g:$&&$.entityType===ue.HomeNoum&&$.user.status===$e.NoumenaMember&&x.find(k=>k._id===$.user.id)?(g.isNew=!1,g.isUnregistered=!1,g):C.length?((C==null?void 0:C.filter(y=>{var k,W,pe;return((k=y.requestFrom)==null?void 0:k._id)===n&&y.status!==P.Cancelled&&y.status!==P.Removed&&((pe=(W=y.requestTo)==null?void 0:W.uid)==null?void 0:pe._id)===$.id})).length?g.isNew=!1:(g.isUnregistered=!1,g.user=$),g):(g.isUnregistered=!1,g.user=$,g)},[n,e,x,C,a]),H=i.useCallback(async()=>{var V;try{const g=U("email"),j=await O(g);if(!j.isNew){h("primary","icon",`${m("noumena.chamber_edit.visibility.invite_non_member.already_invited")}`);return}j.isUnregistered&&T?(await I(n,U("email"),U("firstName"),U("lastName"),T,d.trim()),_(),u(""),h("success","icon",`${m("noumena.chamber_invite_sent.success_messages")}`)):n&&((V=j.user)!=null&&V.id)&&await l({variables:{ownSpaceId:n,invitedSpaceIds:[j.user.id],message:d}});return}catch(g){let j="Unknown";g instanceof Error&&(j=g.message),h("error","none",j)}},[h,U,n,T,_,I,m,O,l,d]),Y=i.useCallback(async()=>{H()},[H]),D=i.useCallback(()=>{N()},[N]),G=i.useCallback(V=>{u(V.target.value.trimStart().slice(0,200))},[u]);return v(te,{children:[v("form",{onSubmit:F(Y),style:{width:"100%"},"data-test":"InviteNonUserPicker",children:[v(cn,{children:[t(Ie,{width:R?"293px":"40%",children:t(ce,{label:m("noumena.email"),...B("email",{onChange:D}),value:U("email"),fullWidth:!0,error:!!L.email,helperText:(le=L.email)==null?void 0:le.message,"data-test":"InviteNonUserPicker-TextField"})}),t(Ie,{width:R?"150px":"20%",children:t(ce,{label:m("noumena.first_name"),...B("firstName",{onChange:D}),value:U("firstName"),fullWidth:!0,"data-test":"InviteNonUserPicker-TextField"})}),t(Ie,{width:R?"150px":"20%",children:t(ce,{label:m("noumena.last_name"),...B("lastName",{onChange:D}),value:U("lastName"),fullWidth:!0,"data-test":"InviteNonUserPicker-TextField"})}),t(Ie,{width:R?"auto":"12%",children:t(A,{primary:!0,size:"full",disabled:!K,loading:M||r||c,type:"submit","data-test":"InviteNonUserPicker-Button",children:m("noumena.chamber_edit.visibility.invite")})})]}),v(vt,{isMobile:S,children:[t(Ee,{colorToken:"--text-input-neutral-default",font:"body-s",children:m("noumena.chamber_edit.visibility.invite_non_member_description")}),t(Dn,{textOnly:!0,onClick:()=>o(!0),"data-test":"InviteNonUserPicker-ViewCountryButton",children:t(hn,{colorToken:"--text-input-neutral-default",font:"body-s",children:m("noumena.chamber_edit.visibility.invite_non_member_button")})})]}),K&&v(te,{children:[t(qe,{height:16,"data-test":"InviteNonUserPicker-Spacer"}),t(Re,{label:m("noumena.chamber_edit.visibility.invite_message.input_placeholder"),maxLength:200,value:d,onChange:G,autoResize:!0,"data-test":"InviteNonUserPicker-TextArea"})]})]}),t(kt,{isOpen:s,onClose:()=>o(!1),"data-test":"InviteNonUserPicker-BlockedCountriesListModal"})]})},Gn=({spaceId:e})=>{const[n,a]=i.useState([]),{loadingNonMembers:r,nonMembers:l}=ln(e),{addToast:c}=re(),{t:s}=q(),o=i.useMemo(()=>!!(l!=null&&l.length),[l]),{setInvitedMemberInactive:d}=rn(),{sendNonMemberInvite:u}=bt(),{space:m}=Ke(e),h=i.useCallback(()=>{let M=l.length>0;return l==null||l.forEach(C=>{var T;(T=C.uid)!=null&&T.email||(M=!1)}),M},[l]);i.useEffect(()=>{if(l&&l.length!==0&&h()){const M=[];l==null||l.forEach(C=>{var T,x;M.push({email:(T=C.uid)==null?void 0:T.email,connectionStatus:(x=C.uid)==null?void 0:x.userStatus,connectionId:C._id,isVerified:C.isVerified,...C.uid})}),a(M)}o||a([])},[h,l,o]);const b=i.useCallback(async M=>{try{if(!m)return;await u(e,M.email||"",M.firstName||"",M.lastName||"",m),c("success","icon",`${s("noumena.chamber_invite_sent.success_message")}`)}catch(C){let T="Unknown";C instanceof Error&&(T=C.message),c("error","none",T)}},[u,e,c,s,m]),I=i.useCallback(async(M,C)=>{switch(C){case"Cancel":d(M.connectionId,e);break;case"Resend":b(M);break}},[d,e,b]);return v(te,{children:[t(Xn,{connectedUsers:n,spaceId:e,"data-test":"InviteNonMemberTab-InviteNonUserPicker"}),r?t(yt,{children:t(dt,{"data-test":"InviteNonMemberTab-Spinner"})}):t(gt,{children:!!o&&n.map(M=>t(It,{user:M,onSelect:I,isNonNoumTab:!0,"data-test":"InviteNonMemberTab-ChamberInvitedUser"},M._id))})]})};function Zn({noumId:e}){const{flags:n}=Qt(),[a,r]=i.useState(se.NoumenaMembers),{isMobile:l,windowDimensions:c}=be();return n.nonNmUsers?v(te,{children:[t(Mt,{children:t(ct,{inputList:St,onChange:r,selectedId:a,mode:"isUnderline",isWithoutImage:!0,fontSize:l?"--font-input-small-size":"--font-button-small-size",tabWidth:l?`${c.width/2-32}px`:"100%",isMobile:l,windowSize:c.width,textFont:"--font-body-medium-regular-font","data-test":"BasicChipsTabsForm"})}),v(Ct,{children:[a===se.NoumenaMembers&&t(Je,{spaceId:e,"data-test":"InviteMemberTab"}),a===se.NonNoumenaMembers&&t(Gn,{spaceId:e,"data-test":"InviteNonMemberTab"})]})]}):t(Je,{spaceId:e,"data-test":"InviteMemberTab"})}const Oa=i.memo(({visibility:e,isOpen:n,spaceId:a,handleClose:r,linkedNoums:l,isSEOEnabled:c=!1,isOnlyInvite:s=!1})=>{const{t:o}=q(),{isMobile:d,isDesktop:u}=be();return v(me,{testId:"chamber-visibility-invite-modal",open:n,onClose:r,enableCloseButton:!0,size:ge.XL,isFullScreen:!u,disableBackdropClick:!0,"data-test":"ChamberVisibilityInviteModal-Modal",children:[t(he,{justifyContent:d?"flex-start":"center",isFullScreen:!u,"data-test":"ChamberVisibilityInviteModal-ModalHeader",children:o(s?"noumena.noum.invite_users":"noumena.chamber_edit.visibility.title")}),v(ve,{isFullScreen:!u,noFooter:!0,"data-test":"ChamberVisibilityInviteModal-ModalBody",children:[!s&&v(te,{children:[t(En,{noumId:a,defaultVisibility:e,linkedNoums:l??[],isSEOEnabled:c,onClose:r,"data-test":"ChamberVisibilityInviteModal-VisibilitySettings"}),t(bn,{}),t(pn,{children:t(z,{colorToken:"--text-modal-header-neutral-default",font:"body-l-bold","data-test":"ChamberVisibilityInviteModal-TSpan",children:o("noumena.chamber_edit.visibility.invites")})})]}),t(Zn,{noumId:a,"data-test":"ChamberVisibilityInviteModal-InviteMembers"})]})]})});function Jn(e){return e.map(n=>({type:"value",key:n._id,value:n._id,label:n.name}))}function _t({value:e,onChange:n,...a}){const{data:r,loading:l}=Xt({fetchPolicy:"cache-and-network",variables:{limit:50,offset:0}}),c=i.useMemo(()=>Jn(Ne(r==null?void 0:r.noumRoles.data)),[r==null?void 0:r.noumRoles.data]);return t(sn,{isLoading:l,hideIcons:!0,options:c,searchable:!1,searchPlaceholder:e?void 0:"Role",value:e,onChange:n,maxContainerHeight:"400px",...a,"data-test":"SelectField"})}const Yn=ye({userIds:nn(J().required()).required().ensure().min(1),roleId:J().required(),message:J().max(100)});function ea({defaultValues:e}){return Me({defaultValues:e,resolver:Ce(Yn)})}const ta=p.div`
  width: 100%;
`,na=p.div`
  width: 100%;
  display: flex;
  align-items: center;
`,aa=p.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  min-height: 56px;
  box-sizing: border-box;
  padding-left: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  transition: border 0.2s linear;
  background-color: var(--bg-input-neutral-default);
  border-color: ${({focused:e})=>e?"var(--border-input-brand-primary-default);":"transparent"};
`,ia=p.div`
  flex: 1;
  min-width: 50px;
  display: flex;
  align-items: center;
`,sa=p.input`
  font-size: var(--font-input-medium-size);
  font-family: var(--font-family);
  color: var(--text-input-neutral-default);
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  padding: 0 !important;
  -webkit-text-fill-color: var(--text-input-neutral-filled);
  ::placeholder {
    font-family: var(--font-input-medium-regular-font);
    color: var(--text-input-neutral-default);
    -webkit-text-fill-color: var(--text-input-neutral-default);
    opacity: 1; /* Firefox */
  }
`,ra=p.div`
  padding: 2px;
  align-items: center;
  display: flex;
`;p.div`
  display: flex;
  align-items: center;
  padding-left: 10px;

  @media (max-width: 767px) {
    display: none;
  }
`;p(A)`
  min-width: unset;
  @media (min-width: ${oe.TABLET_MIN}) {
    width: 100px;
  }
`;p(A)`
  min-width: unset;
  padding-left: 3px;
  margin-bottom: 3px;
`;const oa=p.div``,la=({data:e,multiselect:n,onRemove:a})=>t(ra,{"data-testid":"invite-selected-user","data-test":"InviteSelectedUser-SelectedUser",children:t(Be,{secondary:!0,icon:n?t(X,{"data-testid":"remove-button",name:"close_m",size:24,color:"--icon-tab-basic-brand-primary-default",onClick:()=>a(e),"data-test":"InviteSelectedUser-Icon"}):void 0,"data-test":"InviteSelectedUser-Tag",children:t(z,{"data-testid":"text-message",flex:1,font:"body-m",colorToken:"--text-tab-chips-brand-primary-selected","data-test":"InviteSelectedUser-TSpan",children:e.label})})}),da=({options:e,activeItem:n,loading:a,hasMore:r,onSelect:l,onFetchMore:c})=>t(Le,{"data-testid":"invite-users-list",status:a?"loading":r?"end-with-force":"end",onFetchMore:c,"data-test":"InviteUserOptionRenderer-Infinite",children:e.map(s=>s.type==="value"?t(tt,{active:(n==null?void 0:n.key)===s.key,tabIndex:0,onClick:()=>l(s),"data-test":"InviteUserOptionRenderer-DropdownItemLayout",children:v(nt,{selected:(n==null?void 0:n.key)===s.key,"data-test":"InviteUserOptionRenderer-DropDownLabel",children:[t(oa,{"data-test":"InviteUserOptionRenderer-AvatarWrapper",children:t(He,{url:s.value.user.thumbnailUrl??"",size:"M","data-test":"InviteUserOptionRenderer-Avatar"})}),v(at,{"data-test":"InviteUserOptionRenderer-DropdownValueWrapper",children:[t(it,{"data-test":"InviteUserOptionRenderer-DropdownValueLabel",children:s.label}),s.description&&t(st,{"data-test":"InviteUserOptionRenderer-DropdownValueDescription",children:s.description})]})]})},s.key):null)}),ca=i.forwardRef(({inputProps:e,children:n},a)=>{const[r,l]=i.useState(!1),c=i.useCallback(o=>{e.onFocus&&e.onFocus(o),l(!0)},[e]),s=i.useCallback(o=>{e.onBlur&&e.onBlur(o),l(!1)},[e]);return t(na,{"data-testid":"invite-user-search",ref:a,"data-test":"InviteUserSearch-SearchWrapper",children:v(aa,{focused:r,"data-test":"InviteUserSearch-SearchContainer",children:[n,t(ia,{"data-test":"InviteUserSearch-InputWrapper",children:t(sa,{...e,onFocus:c,onBlur:s,"data-test":"InviteUserSearch-InputField"})})]})})}),ua=e=>e.map(n=>({key:n.user.id||"",label:n.user.name||"",type:"value",description:n.user.title||"",value:n,selected:!1})),ma=({value:e,onChange:n,helperText:a,placeholder:r})=>{var B;const{t:l}=q(),{isMobile:c}=be(),s=i.useRef(null),[o,d]=i.useState(""),u=ot(o,500),{allCount:m,users:h,loading:b,fetchMore:I}=xt(u),[M,C]=i.useState([]),T=i.useMemo(()=>ua(h||[]).filter(_=>!e.includes(_.key)),[h,e]),x=async()=>{h.length<m&&I(h.length)},S=i.useCallback(_=>{e.includes(_.key)?(n(e.filter(U=>U!==_.key)),C(M.filter(U=>U.key!==_.key))):(n([...e,_.key]),C([...M,_])),d("")},[e,n,M]),R=_=>{n(e.filter(U=>U!==_.key)),C(U=>U.filter(F=>F.key!==_.key))},E=((B=s.current)==null?void 0:B.clientWidth)??0;return v(ta,{"data-testid":"invite-users-picker",ref:s,"data-test":"InviteUserPicker-Container",children:[t(Ue,{hideIcons:!0,closeOnSelect:!0,multiselect:!0,placement:"bottom-start",options:T,onInputChange:d,onSelectOption:S,onClose:()=>{c&&d("")},usePortal:!0,calRefTop:!1,isAnimation:!1,containerWidth:`${E}px`,containerHeight:c?"100vh":"250px",isLoading:b,showInternalSearch:c,forceHideCloseButton:!1,optionsRenderer:(_,U,F)=>t(da,{loading:b,hasMore:h.length<m,options:_,multiselect:!0,activeItem:F,onSelect:U,onFetchMore:x,"data-test":"InviteUserPicker-InviteUserOptionRenderer"}),"data-test":"InviteUserPicker-Dropdown",children:({inputProps:_,inputRef:U})=>t(ca,{ref:U,inputProps:{..._,placeholder:e.length>0?"":r,value:o,onChange:F=>d(F.currentTarget.value),onKeyDown:()=>{}},"data-test":"InviteUserPicker-InviteUserSearch",children:M.map(F=>t(la,{multiselect:!0,data:F,onRemove:R,"data-test":"InviteUserPicker-InviteSelectedUser"},F.key))})}),a&&t(ft,{children:t(Ee,{colorToken:"--text-input-neutral-default",font:"body-s",children:l("noumena.chamber_edit.visibility.invite_description")})})]})};function ha({onCancel:e,onSubmit:n}){const{t:a}=q(),{handleSubmit:r,control:l,formState:{isValid:c,isSubmitting:s}}=ea({defaultValues:{userIds:[],roleId:"",message:""}});return v(ie,{vertical:!0,align:"stretch",fullWidth:!0,gap:16,"data-test":"Stack",children:[v(ie,{align:"start",fullWidth:!0,gap:16,"data-test":"Stack",children:[t(fe,{grow:!0,"data-test":"StackItem",children:t(ne,{control:l,name:"userIds",render:({field:o})=>t(ma,{value:o.value,onChange:o.onChange,helperText:a("noumena.chamber_edit.visibility.invite_description"),placeholder:a("noumena.chamber_edit.visibility.invite_placeholder"),"data-test":"InviteUserPicker"}),"data-test":"Controller"})}),t(fe,{basis:"220px","data-test":"StackItem",children:t(ne,{control:l,name:"roleId",render:({field:o})=>t(_t,{value:o.value,onChange:d=>o.onChange(d.value),label:"Role","data-test":"NoumRolePicker"}),"data-test":"Controller"})})]}),t(ne,{control:l,name:"message",render:({field:{onChange:o,...d}})=>t(Re,{...d,autoResize:!0,label:a("noumena.chamber_edit.visibility.invite_message.input_placeholder"),maxLength:100,onChange:u=>o(u.target.value.trimStart().slice(0,100)),"data-test":"TextArea"}),"data-test":"Controller"}),v(ie,{gap:16,fullWidth:!0,"data-test":"Stack",children:[t(A,{tertiary:!0,size:"large",onClick:e,grow:!0,"data-test":"Button",children:"Cancel"}),t(A,{primary:!0,size:"large",disabled:!c,loading:s,onClick:r(n),grow:!0,"data-test":"Button",children:a("noumena.noums.member_management.invite_members.submit")})]})]})}const ba=ye({email:J().email().required().label("Email"),firstName:J().required().label("First Name"),lastName:J().required().label("Last Name"),message:J().max(100).label("Message")});function pa({defaultValues:e}){return Me({defaultValues:e,resolver:Ce(ba),mode:"all"})}function fa({onSubmit:e,onCancel:n}){const{t:a}=q(),{isMobile:r}=be(),{modalType:l,openModal:c,closeModal:s}=We(),{handleSubmit:o,control:d,formState:{isValid:u,isSubmitting:m}}=pa({defaultValues:{email:"",firstName:"",lastName:"",message:""}});return v(te,{children:[v(ie,{vertical:!0,align:"stretch",fullWidth:!0,gap:16,"data-test":"Stack",children:[v(ie,{align:"start",fullWidth:!0,gap:16,"data-test":"Stack",children:[t(fe,{grow:!0,basis:"50%","data-test":"StackItem",children:t(ne,{control:d,name:"email",render:({field:h,fieldState:b})=>t(ce,{...h,label:a("noumena.noums.member_management.invite_non_members.email.label"),...Ae(b),"data-test":"TextField"}),"data-test":"Controller"})}),t(fe,{basis:"25%","data-test":"StackItem",children:t(ne,{control:d,name:"firstName",render:({field:h,fieldState:b})=>t(ce,{...h,label:a("noumena.noums.member_management.invite_non_members.first_name.label"),...Ae(b),"data-test":"TextField"}),"data-test":"Controller"})}),t(fe,{basis:"25%","data-test":"StackItem",children:t(ne,{control:d,name:"lastName",render:({field:h,fieldState:b})=>t(ce,{...h,label:a("noumena.noums.member_management.invite_non_members.last_name.label"),...Ae(b),"data-test":"TextField"}),"data-test":"Controller"})})]}),t(vt,{isMobile:r,children:t(Ee,{colorToken:"--text-input-neutral-default",font:"body-s",children:t(we,{i18nKey:"noumena.noums.member_management.invite_non_members.blocked_countries.description",components:{link_button:t(kn,{textOnly:!0,onClick:()=>c("blocked-countries")})},"data-test":"Trans"})})}),t(ne,{control:d,name:"message",render:({field:{onChange:h,...b}})=>t(Re,{...b,autoResize:!0,label:a("noumena.chamber_edit.visibility.invite_message.input_placeholder"),maxLength:100,onChange:I=>h(I.target.value.trimStart().slice(0,100)),"data-test":"TextArea"}),"data-test":"Controller"}),v(ie,{gap:16,fullWidth:!0,"data-test":"Stack",children:[t(A,{tertiary:!0,size:"large",onClick:n,grow:!0,"data-test":"Button",children:a("noumena.cancel")}),t(A,{primary:!0,size:"large",softDisabled:!u,loading:m,onClick:o(e),grow:!0,"data-test":"Button",children:a("noumena.noums.member_management.invite_non_members.submit")})]})]}),t(kt,{isOpen:l==="blocked-countries",onClose:s,"data-test":"BlockedCountriesListModal"})]})}function va({isOpen:e,onClose:n,noumId:a,onInviteMembers:r,onInviteNonMembers:l}){const{t:c}=q(),{isMobile:s,isDesktop:o,windowDimensions:d}=be(),[u,m]=i.useState(se.NoumenaMembers);return v(me,{testId:"chamber-invite-modal",open:e,onClose:n,enableCloseButton:!0,size:ge.XL,isFullScreen:!o,disableBackdropClick:!0,"data-test":"Modal",children:[t(he,{justifyContent:s?"flex-start":"center",isFullScreen:!o,"data-test":"ModalHeader",children:c("noumena.noums.member_management.invite_members.modal.title")}),t(ve,{isFullScreen:!o,noFooter:!0,overflow:"visible","data-test":"ModalBody",children:v(ie,{vertical:!0,align:"stretch",gap:16,fullWidth:!0,"data-test":"Stack",children:[t(z,{font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"TSpan",children:c("noumena.noums.member_management.invite_members.modal.description")}),t(Mt,{children:t(ct,{inputList:St,onChange:m,selectedId:u,mode:"isUnderline",isWithoutImage:!0,fontSize:s?"--font-input-small-size":"--font-button-medium-size",tabWidth:s?`${d.width/2-32}px`:"100%",isMobile:s,windowSize:d.width,"data-test":"BasicChipsTabsForm"})}),v(Ct,{children:[u===se.NoumenaMembers&&t(ha,{noumId:a,onSubmit:r,onCancel:n,"data-test":"InviteMemberForm"}),u===se.NonNoumenaMembers&&t(fa,{onSubmit:l,onCancel:n,"data-test":"InviteNonMemberForm"})]})]})})]})}function ga(e,n){return{noumId:e,members:n.userIds.map(a=>({roleId:n.roleId,userId:a})),invitationMessage:n.message}}const ya={toInviteMembersInput:ga};function Ma(e,n){return{noumId:e,email:n.email,firstName:n.firstName,lastName:n.lastName,invitationMessage:n.message}}const Ca={toInviteNonNoumenaMemberInput:Ma};function Sa(e){return!!e.role.isManager}function wt(e){const n=e.length>1,r=e.filter(Sa).length,l=e.length-r,c=r>0&&r===e.length,s=r>0&&r<e.length;return{hasManagersOnly:c,hasMixedRoles:s,isBulkSelection:n,managersCount:r,membersCount:l}}function Ia(e){const{isBulkSelection:n,hasMixedRoles:a,hasManagersOnly:r}=wt(e);return`${n?"bulk":"single"}.${r?"manager":a?"mixed":"member"}`}function Xe(e){const{managersCount:n,membersCount:a}=wt(e);return{translationSuffix:Ia(e),userName:e.length>0?ae.renderName(e[0].user):"",managersCount:n,membersCount:a}}const Va={canViewManagerDetails:e=>e.role.isManager,canViewHomeNoum:e=>{var n,a;return((a=(n=e.user)==null?void 0:n.chamber)==null?void 0:a._id)&&ae.isActive(e.user)},canEditRole:e=>!ae.isUnregistered(e.user),canDisconnect:e=>e.role._id},Ye={isConnected:e=>e.status===Oe.Connected,hasPendingInvitation:e=>[Oe.Invited,Oe.Requested].includes(e.status)};function xa({isOpen:e,onClose:n,onConfirm:a,members:r,isLoading:l}){const{t:c}=q(),{translationSuffix:s,managersCount:o,membersCount:d,userName:u}=Xe(r);return r.length===0?null:v(me,{open:e,onClose:n,size:ge.S,"data-test":"Modal",children:[t(he,{"data-test":"ModalHeader",children:c(`noumena.chamber.disconnect_member_modal.title.${s}`)}),t(ve,{"data-test":"ModalBody",children:t(z,{font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"TSpan",children:t(we,{i18nKey:`noumena.chamber.disconnect_member_modal.body.${s}`,values:{userName:u,membersCount:d,managersCount:o},components:{b:t(z,{font:"body-l",colorToken:"--text-modal-neutral-highlighted","data-test":"TSpan"})},"data-test":"Trans"})})}),v(De,{flexDirection:"column",gap:16,"data-test":"ModalFooter",children:[t(A,{intent:"negative",size:"full",onClick:a,loading:l,"data-test":"Button",children:t(we,{i18nKey:`noumena.chamber.disconnect_member_modal.submit.${s}`,values:{membersCount:d,managersCount:o},"data-test":"Trans"})}),t(A,{tertiary:!0,size:"full",onClick:n,"data-test":"Button",children:"Cancel"})]})]})}function ka(e){const n=mt.uniq(e.map(a=>a.role._id));return{roleId:n.length===1?n[0]:""}}const _a=ye({roleId:J().required()});function wa({defaultValues:e}){return Me({defaultValues:e,resolver:Ce(_a)})}function Ta({isOpen:e,onClose:n,onConfirm:a,members:r,isLoading:l}){const{t:c}=q(),{translationSuffix:s,managersCount:o,membersCount:d}=Xe(r),{handleSubmit:u,control:m}=wa({defaultValues:ka(r)});return r.length===0?null:t(me,{open:e,onClose:n,size:ge.L,isScrollableContent:!0,"data-test":"Modal",children:v("form",{onSubmit:u(a),children:[t(he,{"data-test":"ModalHeader",children:c("noumena.chamber.edit_member_role_modal.title",{count:r.length})}),t(ve,{overflow:"visible","data-test":"ModalBody",children:v(ie,{vertical:!0,fullWidth:!0,align:"stretch",gap:16,"data-test":"Stack",children:[t(z,{font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"TSpan",children:c("noumena.chamber.edit_member_role_modal.body")}),t(ne,{control:m,name:"roleId",render:({field:h})=>t(_t,{value:h.value,onChange:({value:b})=>{h.onChange(b)},"data-test":"NoumRolePicker"}),"data-test":"Controller"})]})}),v(De,{gap:16,"data-test":"ModalFooter",children:[t(A,{tertiary:!0,size:"full",onClick:n,"data-test":"Button",children:"Cancel"}),t(A,{type:"submit",primary:!0,size:"full",loading:l,"data-test":"Button",children:t(we,{i18nKey:`noumena.chamber.edit_member_role_modal.submit.${s}`,values:{membersCount:d,managersCount:o},"data-test":"Trans"})})]})]})})}function Aa({noumId:e,onInvite:n,onDisconnect:a,onEditRoles:r}){const{getModalKey:l,modalType:c,contextData:s,openModal:o,closeModal:d}=We({resetModalKey:!0}),{addSuccessIconToast:u,addErrorToast:m}=re(),{t:h}=q(),[b,{loading:I}]=Gt(),[M,{loading:C}]=Zt(),[T]=Jt(),[x]=Yt(),[S]=en(),E=t(xa,{isOpen:c==="disconnect",onClose:d,onConfirm:async()=>{const L=s;if(!(!L||L.length===0))try{const N=L.filter(Ye.isConnected),O=L.filter(Ye.hasPendingInvitation);await Promise.all(O.map(G=>T({variables:{memberId:G._id}}))),await b({variables:{memberIDs:N.map(G=>G._id)}});const{translationSuffix:H,membersCount:Y,managersCount:D}=Xe(L);u(h(`noumena.chamber.disconnect_member_modal.success_toast.${H}`,{membersCount:Y,managersCount:D})),a==null||a()}catch(N){N instanceof Error&&m(N.message)}finally{d()}},members:s??[],isLoading:I,"data-test":"disconnectModalElement-MembersDisconnectModal"},l("disconnect")),_=t(Ta,{isOpen:c==="edit-role",onClose:d,onConfirm:async L=>{const N=s;if(!(!N||N.length===0))try{await M({variables:{input:{memberIDs:N.map(O=>O._id),roleId:L.roleId}}}),r==null||r()}catch(O){O instanceof Error&&m(O.message)}finally{d()}},members:s??[],isLoading:C,"data-test":"editRoleModalElement-MembersEditRoleModal"},l("edit-role")),K=t(va,{isOpen:c==="invite-members",onClose:d,noumId:e??"",onInviteMembers:async L=>{if(e)try{await x({variables:{input:ya.toInviteMembersInput(e,L)}}),n==null||n(),d()}catch(N){N instanceof Error&&m(N.message)}},onInviteNonMembers:async L=>{if(e)try{await S({variables:{input:Ca.toInviteNonNoumenaMemberInput(e,L)}}),n==null||n(),d()}catch(N){N instanceof Error&&m(N.message)}},"data-test":"inviteMemberModalElement-ChamberInviteModal"},l("invite-members"));return{openModal:o,closeModal:d,disconnectModalElement:E,editRoleModalElement:_,inviteMemberModalElement:K}}const Te=p(Be).attrs(()=>({size:"small",contentFont:"footnote-bold"}))``,Tt=p(Te).attrs(()=>({tertiary:!0}))`
  background-color: var(--color-base-pastel-pink);
  color: var(--color-base-solid-orange);
`;function Na({member:e}){var n;return(n=e.previousRole)!=null&&n._id?v(ie,{gap:8,align:"center","data-test":"Stack",children:[t(Te,{tertiary:!0,"data-test":"StyledTag",children:e.previousRole.name}),t(X,{color:"--icon-tablecell-neutral-default",name:"arrow_right_m",size:16,"data-test":"Icon"}),e.role.isManager?t(Tt,{icon:t(X,{name:"star_filled_m",size:16,color:"--color-base-solid-orange","data-test":"Icon"}),"data-test":"ManagerTag",children:"Manager"}):t(Te,{tertiary:!0,"data-test":"StyledTag",children:e.role.name})]}):null}function Pa({member:e}){var n;return(n=e.previousRole)!=null&&n._id?t(Na,{member:e,"data-test":"MemberRoleTransition"}):e.role.isManager?t(Tt,{icon:t(X,{name:"star_filled_m",size:16,color:"--color-base-solid-orange","data-test":"Icon"}),"data-test":"ManagerTag",children:"Manager"}):t(Te,{tertiary:!0,"data-test":"StyledTag",children:e.role.name})}const ke=p(Be).attrs(()=>({size:"small",contentFont:"footnote-bold"}))``;function $a({member:e}){const{t:n}=q();switch(e.status){case"CONNECTED":return t(ke,{success:!0,"data-test":"StyledTag",children:n("noumena.chamber.members.status.connected")});case"INVITED":return t(ke,{tertiary:!0,"data-test":"StyledTag",children:n("noumena.chamber.members.status.invited")});case"REQUESTED":return t(ke,{secondary:!0,"data-test":"StyledTag",children:n("noumena.chamber.members.status.requested")});default:return t(ke,{"data-test":"StyledTag",children:e.status})}}export{Oa as C,Pa as M,$a as a,Va as b,ht as c,Aa as u,Tn as v};
//# sourceMappingURL=MemberStatusTag-69ed5aaa.js.map
