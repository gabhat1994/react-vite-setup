import{f as le,fc as Ge,fd as gt,s as P,f7 as bt,T as _,B as O,u as fe,c as p,M as $,t as j,j as t,h as V,i as G,x as C,I as L,S as ee,k as ge,R as te,fe as vt,bl as se,aC as Ce,ff as Mt,q as qt,fg as Rt,aF as Qe,b2 as Ne,ae as kt,fh as It,aR as yt,y as St,ay as be,fi as xt,au as Re,fj as _t,F as E,fk as Tt,eP as Ct,a as ke,b7 as oe,fl as we,aH as Ie,bz as B,n as Xe,aj as re,ci as Nt,fm as wt,dc as Ke,z as Ot,c_ as Oe,dd as At,fn as Ft,X as de,ao as Me,bu as U,e as he,d as Ye,cV as Bt,a2 as Ze,ag as Lt,fo as Dt,fp as zt,e8 as Ut,w as Pt,a5 as Te,fq as $t,c4 as Et,fr as Ht,v as Wt,fs as jt,ft as Vt}from"./index-cd84bcc9.js";import{r as b,C as k,a9 as ce,B as v,ar as ne,l as Ue,al as ve,aa as Je,b2 as qe,a6 as ue,be as Gt,N as et,aB as tt,ay as Ae,b8 as Qt,bw as Xt,aT as J,ad as Kt}from"./vendor-51460554.js";import{b as ae,M as Yt,a as Zt,u as Jt}from"./MemberStatusTag-69ed5aaa.js";import{S as en,D}from"./index-022aaf3d.js";import{M as Pe}from"./MultiselectField-a1e665cb.js";import{A as tn}from"./Accordion-ea03839b.js";import{u as nn}from"./styles-26e8a352.js";import{U as nt,R as at,S as an,a as sn,I as $e,b as on,B as Ee,F as ln,C as rn,H as dn,c as cn,A as un}from"./styles-75177d6f.js";import{t as He}from"./consts-be860660.js";import{c as mn}from"./capitalizeFirstLetter-92ef0abb.js";import{R as pn}from"./Radiobox-c1e62033.js";import{L as hn}from"./LinkNoumOption-dc9c410c.js";import{N as fn}from"./NoSearchResultsForNoums-50e9f00f.js";const st=e=>{const{user:a}=le(),{data:n,loading:i,refetch:s,fetchMore:r}=Ge({variables:e,fetchPolicy:"cache-and-network",skip:!(a!=null&&a._id)});return{data:n,loading:i,refetch:s,fetchMore:r}},ot=(e,a=!0)=>{const{user:n}=le(),[i,{data:s,loading:r,refetch:l,fetchMore:f}]=gt({variables:e,fetchPolicy:"cache-and-network"});return b.useEffect(()=>{n!=null&&n._id&&a&&i()},[n,i,a]),{data:s,loading:r,refetch:l,fetchMore:f,getReceivedConnections:i}},gn=k.div`
  margin-top: 5px;
  margin-bottom: 28px;
`,bn=k.div`
  width: 100%;
  box-sizing: border-box;
  margin: 8px 0;
  @media (min-width: ${P.TABLET}) {
    margin: 16px 0;
  }
  position: relative;
`,vn=k.div`
  width: 100%;
  height: 336px;
`,Mn=k.div`
  max-height: 488px;
  min-height: 288px;
  overflow: auto;
  ${bt};
  @media (min-width: ${P.TABLET}) {
    max-height: 288px;
  }
`,qn=k.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 13px;
`,Rn=k(_)`
  align-self: center;
`,We=k(O)`
  flex: ${({flex:e})=>e&&e};
`,ts=({isOpen:e,handleClose:a,goToNoumLink:n})=>{const{width:i}=fe(),s=ce(),r=b.useMemo(()=>i<768,[i]),l=()=>{n?n():s(te.LINK_NOUM)};return p($,{isFullScreen:r,testId:"chamber-link-noum-modal",open:e,enableCloseButton:!r,onClose:a,size:j.L,disableBackdropClick:!0,"data-test":"LinkNoumModal-Modal",children:[t(V,{isFullScreen:r,"data-test":"LinkNoumModal-ModalHeader",children:v("noumena.link_noums.link_noums",{linkNo:""})}),p(G,{isFullScreen:r,"data-test":"LinkNoumModal-ModalBody",children:[t(C,{align:"center",fullWidth:!0,justify:"center","data-test":"LinkNoumModal-Stack",children:t(gn,{"data-test":"LinkNoumModal-IconContainer",children:t(L,{name:"link_noums_xxxxl",size:144,"data-test":"LinkNoumModal-Icon"})})}),t(_,{font:"body-m",colorToken:"--text-modal-neutral-highlighted","data-test":"LinkNoumModal-TSpan",children:v("noumena.chamber_create_new.link_noum_modal.description.sentence_1")}),t(ee,{height:24,"data-test":"LinkNoumModal-Spacer"}),t(_,{font:"body-m",colorToken:"--text-modal-neutral-highlighted","data-test":"LinkNoumModal-TSpan",children:v("noumena.chamber_create_new.link_noum_modal.description.sentence_2")}),t(ee,{height:24,"data-test":"LinkNoumModal-Spacer"}),t(_,{font:"body-m",colorToken:"--text-modal-neutral-highlighted","data-test":"LinkNoumModal-TSpan",children:v("noumena.chamber_create_new.link_noum_modal.description.sentence_3")}),t(ee,{height:24,"data-test":"LinkNoumModal-Spacer"}),t(_,{font:"body-m",colorToken:"--text-modal-neutral-highlighted","data-test":"LinkNoumModal-TSpan",children:v("noumena.chamber_create_new.link_noum_modal.description.sentence_4")}),t(ee,{height:24,"data-test":"LinkNoumModal-Spacer"}),t(_,{font:"body-m-bold",colorToken:"--text-modal-neutral-highlighted",textAlign:"left","data-test":"LinkNoumModal-TSpan",children:v("noumena.chamber_create_new.link_noum_modal.description.sentence_5")})]}),t(ge,{isFullScreen:!1,flexDirection:r?"column":"row",gap:16,"data-test":"LinkNoumModal-ModalFooter",children:t(O,{size:"full",primary:!0,onClick:l,"data-test":"LinkNoumModal-Button",children:v("noumena.link_noums.select_noums_action")})})]})};function kn({noumId:e,rowsPerPage:a}){var u,c,m,o;const{data:n,fetchMore:i,refetch:s,networkStatus:r}=vt({fetchPolicy:"cache-and-network",notifyOnNetworkStatusChange:!0,variables:{noumId:e,input:{offset:0,limit:a,statuses:[se.Connected,se.Invited,se.Requested]}},skip:!e}),l=b.useMemo(()=>{var q,M;return Ce((M=(q=n==null?void 0:n.getSpaceById)==null?void 0:q.members)==null?void 0:M.data)},[(c=(u=n==null?void 0:n.getSpaceById)==null?void 0:u.members)==null?void 0:c.data]),f=l.length,d=((o=(m=n==null?void 0:n.getSpaceById)==null?void 0:m.members)==null?void 0:o.count)??0;return{membersData:l,currentCount:f,totalCount:d,networkStatus:r,fetchMore:i,refetch:s}}function In({permissionGroup:e}){const{t:a}=ne(),n=e.permissions.filter(r=>r.isActive).map(r=>r.id);if(e.level!==Mt.Element||n.length===0)return null;const i=a(`noumena.noums.permissions_info.group.${e.elementType}`),s=n.map(r=>a(`noumena.noums.permissions_info.permission.${r}`)).join(", ");return p(qt,{size:"small",tertiary:!0,contentFont:"footnote",contentMaxWidth:"none","data-test":"Tag",children:[t("b",{"data-test":"b",children:i}),": ",s]})}function yn({isOpen:e,onClose:a}){const{t:n}=ne(),{data:i,loading:s}=Rt({variables:{limit:50,offset:0}});return p($,{open:e,onClose:a,enableCloseButton:!0,size:j.L,"data-test":"Modal",children:[t(V,{"data-test":"ModalHeader",children:n("noumena.noums.roles_info.modal.title")}),t(G,{"data-test":"ModalBody",children:p(C,{vertical:!0,align:"stretch",gap:16,fullWidth:!0,"data-test":"Stack",children:[t(_,{font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"TSpan",children:n("noumena.noums.roles_info.modal.description")}),s?t(Qe,{isLoading:s,"data-test":"SkeletonLoaderProvider",children:Array.from({length:5}).map((r,l)=>t(en,{w:"100%",h:64,"data-test":`SizedSkeleton-${l}`},l))}):t("div",{children:i==null?void 0:i.noumRoles.data.map(r=>t(tn,{title:r.name,isBoldTitle:!0,subtitle:r.description,headerPadding:"16px 0","data-test":"Accordion",children:t(C,{gap:8,wrap:"wrap",fullWidth:!0,"data-test":"Stack",children:r.groupedPermissions.map(l=>t(In,{permissionGroup:l,"data-test":"RoleInfoTag"},l.elementType))})},r._id))})]})})]})}const Sn=k.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  position: relative;

  @media ${Ne.TABLET} {
    padding: 16px 40px;
  }
`,xn=k.div`
  flex-grow: 1;
  align-self: center;
  padding: 16px;
  width: 100%;
  max-width: 1360px;
  min-height: 0;

  @media ${Ne.TABLET} {
    padding: 16px 40px;
  }

  * {
    box-sizing: border-box;
  }
`,_n=k(O)`
  position: absolute;
  right: 16px;

  @media ${Ne.TABLET} {
    right: 40px;
  }
`,Tn=k(_).attrs(()=>({font:"body-xl-bold"}))``;k.div`
  display: flex;
  flex-wrap: wrap;
`;k.div`
  width: fit-content;
  display: flex;
  align-items: center;
  grid-column-gap: 8px;
  padding: 1px 6px 2px;
  border-radius: 8px;
  margin-right: 8px;
  background: ${e=>e.manager?"var(--color-base-pastel-pink)":"var(--color-base-gray-90)"};
  color: ${e=>e.manager?"var(--color-base-solid-orange)":"var(--text-tag-neutral-default)"};
`;k.div`
  display: flex;
  grid-column-gap: 6px;
`;const Cn=k(kt)`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: row;
  gap: 32px;
  align-items: center;
  padding: 12px 16px;
  overflow: visible;

  border-radius: 8px;
  background: var(--bg-card-neutral-alt-default);
  box-shadow: 0px 4px 32px 0px rgba(32, 17, 62, 0.08);
`,Nn=k.div`
  display: flex;
  gap: 16px;
`,wn=e=>e._id;function On({onBulkAction:e}){const{t:a}=ne(),{rowSelection:n,getRowSelectionItems:i}=nn();if(n.selectedItems.length===0)return null;const s=i(wn),r=s.every(ae.canEditRole),l=s.every(ae.canDisconnect);return p(Cn,{children:[t(D.SelectedRowsCounter,{render:f=>a("noumena.chamber.member_management.bulk_selection.label",{count:f})}),p(Nn,{children:[t(D.BulkActionButton,{disabled:!r,onClick:()=>e("edit_role",s),size:"small",tooltipText:r?void 0:"You can't edit a role for Non-NM",tooltipPosition:"top-center",children:"Edit Role"}),t(D.BulkActionButton,{disabled:!l,onClick:()=>e("disconnect",s),secondary:!0,intent:"negative",size:"small",children:"Disconnect"})]})]})}const An=[se.Connected,se.Invited,se.Requested];function Fn(){var l;const{t:e}=ne(),a=It({fetchPolicy:"cache-and-network",variables:{limit:50,offset:0}}),{statusOptions:n,statusValues:i}=b.useMemo(()=>{const f=An.map(u=>({key:u,value:u,label:e(`noumena.chamber.members.status.${u.toLowerCase()}`),type:"value"})),d=f.map(u=>u.value);return{statusOptions:f,statusValues:d}},[e]),{roleOptions:s,roleValues:r}=b.useMemo(()=>{var u;const f=Ce((u=a.data)==null?void 0:u.noumRoles.data).map(c=>({key:c._id,value:c._id,label:c.name,type:"value"})),d=f.map(c=>c.value);return{roleOptions:f,roleValues:d}},[(l=a.data)==null?void 0:l.noumRoles.data]);return{statuses:{options:n,allValues:i,loading:!1},roles:{options:s,allValues:r,loading:a.loading}}}const Bn=({networkStatus:e,fetchMore:a,refetch:n,data:i,currentCount:s,totalCount:r,rowsPerPage:l,onRowActionSelect:f,onBulkAction:d,onInviteMembers:u})=>{const{modalType:c,openModal:m,closeModal:o}=yt(),{statuses:q,roles:M}=Fn(),y=[{id:"name",renderValue:g=>{var I,h,R,S;return p(C,{align:"center",gap:8,"data-test":"NoumPageTable-columns-Stack",children:[t(Re,{url:(h=(I=g.user)==null?void 0:I.profile)==null?void 0:h.profilePictureThumbnail,width:32,"data-test":"NoumPageTable-columns-Avatar"}),t(_,{font:"body-m-bold","data-test":"NoumPageTable-columns-TSpan",children:`${(R=g==null?void 0:g.user)==null?void 0:R.firstName} ${(S=g==null?void 0:g.user)==null?void 0:S.lastName}`})]})},title:"Name",width:"30%"},{id:"role",renderValue:g=>t(Yt,{member:g,"data-test":"NoumPageTable-columns-MemberRoleTag"}),title:"Role",width:"auto"},{id:"status",renderValue:g=>t(Zt,{member:g,"data-test":"NoumPageTable-columns-MemberStatusTag"}),title:"Status",width:"auto"},{id:"connected",renderValue:g=>t(_,{font:"body-m",colorToken:"--text-tablecell-header-neutral-default","data-test":"NoumPageTable-columns-TSpan",children:g!=null&&g.connectedAt?_t({dateTime:g==null?void 0:g.connectedAt,returnFormat:"dd/MM/yyyy, hh:mm a"}):null}),title:"Connected",wordWrap:!1,width:"20%"},{id:"actions",renderValue:g=>{const I=Ue.compact([ae.canViewManagerDetails(g)&&{key:"manager_details",value:"manager_details",label:"Manager Details",iconName:"info_m"},ae.canEditRole(g)&&{key:"edit_role",value:"edit_role",label:"Edit Role",iconName:"edit_m"},ae.canViewHomeNoum(g)&&{key:"view_home_noum",value:"view_home_noum",label:"View Home Noum",iconName:"profile_m"},ae.canDisconnect(g)&&{key:"disconnect",value:"disconnect",label:"Disconnect",iconName:"close_m",intent:"danger"}]);return I.length>0?t(C,{justify:"flex-end","data-test":"NoumPageTable-columns-Stack",children:t(D.ActionsMenu,{size:"small",onClick:h=>f(h,g),menuOptions:I})}):null},title:""}],T=b.useMemo(()=>Ue.debounce(g=>{n({input:{statuses:g.statuses,roleIDs:g.roleIDs,searchTerm:g.search,offset:0,limit:l}})},500),[n,l]);return t(Qe,{isLoading:e===ve.loading,"data-test":"NoumPageTable-SkeletonLoaderProvider",children:p(D.Provider,{data:i,children:[p(C,{gap:24,vertical:!0,align:"stretch",maxHeight:"100%","data-test":"NoumPageTable-Stack",children:[t(D.Filters,{submitOnChange:!0,defaultValues:{search:"",roleIDs:void 0,statuses:void 0},onSubmit:T,children:p(C,{gap:16,justify:"space-between","data-test":"NoumPageTable-Stack",children:[p(C,{gap:16,justify:"flex-start","data-test":"NoumPageTable-Stack",children:[t(D.FilterInput,{name:"statuses",render:({field:{value:g,onChange:I}})=>t(Pe,{inputSize:"small",hideIcons:!0,label:"Status",allOptionLabel:"All",options:q.options,isLoading:q.loading,value:g??q.allValues,onChange:I,maxContainerHeight:"500px",allSelectionStrategy:"empty-means-all","data-test":"NoumPageTable-MultiselectField"})}),t(D.FilterInput,{name:"roleIDs",render:({field:{value:g,onChange:I}})=>t(Pe,{inputSize:"small",hideIcons:!0,label:"Role",allOptionLabel:"All",options:M.options,isLoading:M.loading,value:g??M.allValues,onChange:I,maxContainerHeight:"500px",allSelectionStrategy:"empty-means-all","data-test":"NoumPageTable-MultiselectField"})}),t(O,{size:"small",tertiary:!0,leftIcon:t(L,{name:"info_m",size:24,"data-test":"NoumPageTable-Icon"}),onClick:()=>m("roles-info"),"data-test":"NoumPageTable-Button",children:"Roles"})]}),p(C,{gap:16,justify:"flex-start","data-test":"NoumPageTable-Stack",children:[t(D.FilterInput,{name:"search",render:({field:{value:g,onChange:I}})=>t(St,{inputSize:"small",placeholder:"Search...",value:g,onChange:I,leftIcon:t(L,{name:"search_m",size:24,color:"--icon-input-neutral-default","data-test":"NoumPageTable-Icon"}),"data-test":"NoumPageTable-TextField"})}),t(O,{size:"small",secondary:!0,leftIcon:t(L,{name:"add_m",size:22,"data-test":"NoumPageTable-Icon"}),onClick:u,"data-test":"NoumPageTable-Button",children:"Invite Members"})]})]})}),t(be,{onFetchMore:()=>a({variables:{offset:s}}),status:xt({networkStatus:e,currentCount:s,totalCount:r}),disableFetchMoreWhileLoading:!0,isSpinnerRelative:!0,"data-test":"NoumPageTable-Infinite",children:t(D.Table,{loading:[ve.loading,ve.setVariables].includes(e),columns:y,rowsPerPage:l,keyExtractor:g=>g._id,enableRowSelection:!0,noResultsMessageRowSpan:1})})]}),t(On,{onBulkAction:d,"data-test":"NoumPageTable-BulkActionsPopover"}),t(yn,{isOpen:c==="roles-info",onClose:o,"data-test":"NoumPageTable-RolesInfoModal"})]})})},je=20,ns=({isOpen:e,handleClose:a})=>{const{id:n=""}=Je(),i=ce(),{t:s}=ne(),{currentCount:r,totalCount:l,membersData:f,networkStatus:d,fetchMore:u,refetch:c}=kn({noumId:n,rowsPerPage:je}),{openModal:m,disconnectModalElement:o,editRoleModalElement:q,inviteMemberModalElement:M}=Jt({noumId:n,onInvite:c,onDisconnect:c,onEditRoles:c}),y=(g,I)=>{var h,R,S,x;switch(g){case"manager_details":if(!((R=(h=I.user)==null?void 0:h.chamber)!=null&&R._id))return;i(qe(te.NOUM_MANAGER_DETAILS,{id:I.user.chamber._id,memberId:I._id}));break;case"view_home_noum":if(!((x=(S=I.user)==null?void 0:S.chamber)!=null&&x._id))return;i(qe(te.NOUM,{id:I.user.chamber._id}));break;case"edit_role":m("edit-role",[I]);break;case"disconnect":m("disconnect",[I]);break}},T=(g,I)=>{switch(g){case"edit_role":m("edit-role",I);break;case"disconnect":m("disconnect",I);break}};return p(E,{children:[t($,{style:{padding:0},forceHideCloseButton:!0,testId:"ManageMembers",open:e,onClose:a,isFullScreen:!0,disableEscapeKeyDown:!0,"data-test":"ManageMembersModal-Modal",children:p(C,{vertical:!0,fullWidth:!0,justify:"stretch",align:"stretch",maxHeight:"100vh",overflow:"hidden","data-test":"ManageMembersModal-Stack",children:[p(Sn,{"data-test":"ManageMembersModal-Header",children:[t(Tn,{"data-test":"ManageMembersModal-Title",children:s("noumena.chamber_edit.manage_members.title")}),t(_n,{primary:!0,size:"small",onClick:a,"data-test":"ManageMembersModal-CloseButton",children:"Done"})]}),t(xn,{"data-test":"ManageMembersModal-Body",children:t(Bn,{data:f,currentCount:r,totalCount:l,fetchMore:u,refetch:c,networkStatus:d,rowsPerPage:je,onRowActionSelect:y,onBulkAction:T,onInviteMembers:()=>m("invite-members"),"data-test":"ManageMembersModal-NoumPageTable"})})]})}),M,q,o]})};var ie=(e=>(e[e.Default=0]="Default",e[e.FadeOut=1]="FadeOut",e[e.FadeIn=2]="FadeIn",e))(ie||{});const Ln=k(C)`
  ${e=>e.animationState===ie.FadeOut&&ue`
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      animation: fadeOut 0.25s ease;
    `}
`,as=k.div`
  position: relative;
  min-width: 352px;
  padding-bottom: 16px;
  ${Tt} {
    min-width: 100vw;
    padding: 24px;
  }

  button {
    padding: 8px;
  }

  label {
    width: 100%;
    input {
      display: none;
    }
    div {
      margin: 0px -8px;
    }
  }

  width: 100%;
`,Dn=k.div`
  position: relative;
  min-width: 352px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 16px;
  padding-bottom: 16px;

  button {
    padding: 8px;
  }

  label {
    width: 100%;
    input {
      display: none;
    }
    div {
      margin: 0px -8px;
    }
  }

  width: 100%;

  @media (max-width: ${P.TABLET}) {
    min-width: 343px;
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
`,zn=k.div`
  margin: 0px -6px 8px -6px;
  ${Ct.bodyTypography.bodyMedium};
  form {
    overflow-x: inherit;
  }
  form div {
    width: auto;
  }
  label div {
    padding: 9px 16px;
  }
  @media (max-width: ${P.MOBILE_MAX}) {
    label div {
      padding: 8px 12px;
    }
  }
  @media (max-width: ${P.MOBILE_M}) {
    label div {
      padding: 8px;
    }
  }
`,_e=k(_)`
  ${ke}
`,it=k.div`
  ${({isModal:e})=>e&&"height: 400px;"}

  display: flex;
  align-items: center;
  justify-content: center;
`,Un=k(_)`
  padding-top: 24px;
  width: 100%;
  max-width: 100%;
`,Pn=({isDeleting:e,onClose:a,isOpen:n,onDelete:i,component:s,isInvite:r})=>{const l=b.useCallback(async()=>{a(),await i()},[i,a]);return p($,{isFullScreen:!1,open:n??!1,testId:"delete_request",onClose:a,disableBackdropClick:e,disableEscapeKeyDown:e,size:j.S,"data-test":"DeleteMyRequest-Modal",children:[t(V,{isFullScreen:!1,"data-test":"DeleteMyRequest-ModalHeader",children:r?v("noumena.chambers.RequestsAndInvites.invitation.delete.title"):v("noumena.chambers.RequestsAndInvites.request.delete.title")}),p(G,{isFullScreen:!1,"data-test":"DeleteMyRequest-ModalBody",children:[t(_,{"data-testid":"delete_confirm_text",font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"DeleteMyRequest-TSpan",children:r?v("noumena.chambers.RequestsAndInvites.invitation.delete.description"):v("noumena.chambers.RequestsAndInvites.request.delete.description")}),t(ee,{height:16,"data-test":"DeleteMyRequest-Spacer"}),s&&t(C,{fullWidth:!0,"data-test":"DeleteMyRequest-Stack",children:s()})]}),p(ge,{isFullScreen:!1,flexDirection:"column",gap:16,"data-test":"DeleteMyRequest-ModalFooter",children:[t(O,{testId:"request_delete_btn",disabled:!1,loading:e,intent:"negative",size:"full",onClick:l,"data-test":"DeleteMyRequest-Button",children:r?v("noumena.chambers.RequestsAndInvites.invitation.delete.confirm"):v("noumena.chambers.RequestsAndInvites.request.delete.confirm")}),t(O,{tertiary:!0,onClick:a,size:"full",testId:"request_delete_cancel_btn","data-test":"DeleteMyRequest-Button",children:v("noumena.modal.no_keep_it")})]})]})};var Fe=(e=>(e[e.Default=0]="Default",e[e.FadeOut=1]="FadeOut",e[e.FadeIn=2]="FadeIn",e))(Fe||{});const $n=b.forwardRef(({name:e,requestFromChamberId:a,title:n,profileImage:i,category:s,isHomeType:r,connectionId:l,chamberId:f,noumType:d,inviterId:u,refetchReceivedRequests:c,message:m,isModal:o},q)=>{const{t:M}=ne(),y=b.useRef(null),{user:T}=le(),g=ce(),I=Gt(),h=b.useMemo(()=>oe.isUnregistered(T),[T]),{updateConnectionStatusHelper:R,loading:S}=we(),[x,w]=b.useState(!1),[N,A]=b.useState(!0),[F,H]=b.useState(!1),[Q,X]=b.useState(!1),{refetchConnectedMembers:K}=Ie(),[Y,z]=b.useState(0),[Z,Se]=b.useState(B.Requested),pt=W=>{Se(W),X(!0),z(1),setTimeout(()=>{X(!1),w(!0),z(2),setTimeout(()=>{c&&c(),W===B.Approved&&(K(),I.refetchQueries({include:[wt]}))},250)},250)},De=async(W,me,pe)=>{let xe=!1;return W&&me&&(xe=await R(W,me,pe),xe&&pt(pe)),xe},ht=async()=>{await De(f,l,B.Approved)&&d===re.Home&&Nt("friend_request_accept",{UUID:T==null?void 0:T._id,DeviceType:navigator.userAgent,Inviter:u})},ft=async()=>{De(f,l,B.Declined)},ze=()=>{h||g(`/noum/${a}`)};return b.useEffect(()=>{var me,pe;const W=N&&y.current?((me=y.current)==null?void 0:me.offsetHeight)<((pe=y.current)==null?void 0:pe.scrollHeight):!1;H(W)},[y,m,N]),p(E,{children:[p(jn,{ref:q,isModal:o,"data-test":"MemberRequest-MemberRequestContainer",children:[p(Qn,{"data-testid":"theadSection","data-test":"MemberRequest-MemberRequestHead",children:[p(Xn,{"data-test":"MemberRequest-MemberRequestDataHead",children:[t(lt,{onClick:ze,isClickable:!h,"data-test":"MemberRequest-AvatarClickableWrapper",children:t(Re,{url:i,"data-test":"MemberRequest-Avatar"})}),p(Kn,{"data-test":"MemberRequest-MemberRequestDataBody",children:[t(Jn,{onClick:ze,"data-testid":"tMemberRequestTitle",title:n,isClickable:!h,"data-test":"MemberRequest-MemberRequestTitle",children:n}),p(Vn,{colorToken:"--text-tablecell-neutral-default",isHomeType:r,"data-test":"MemberRequest-MemberRequestName",children:[!r&&`${M("noumena.chamber.member_request.invited_by")} `," ",t("span",{children:e})]})]})]}),s&&t(Gn,{bgColor:He[s.toLowerCase()].bgColor,color:He[s.toLowerCase()].color,"data-test":"MemberRequest-TagLabel",children:mn(s)})]}),p(na,{"data-test":"MemberRequest-StyledEventDescription",children:[N?t(ea,{ref:y,"data-test":"MemberRequest-CustomMessage",children:m}):m,F&&t(ta,{colorToken:"--link-card-brand-primary-default",onClick:()=>A(!N),font:"link-m","data-test":"MemberRequest-StyledSeeMoreButton",children:M("noumena.homeChambers.event.see_more")})]}),S||Q?p(aa,{"data-test":"MemberRequest-SpinnerContainer",children:[" ",t(Xe,{"data-test":"MemberRequest-Spinner"})," "]}):x?t(Yn,{animationState:Y,"data-test":"MemberRequest-RequestResolvedMessageSection",children:p("span",{"data-testid":"resolve-request-text",children:[Z===B.Declined&&M("noumena.request_declined"),Z===B.Approved&&M("noumena.request_accepted")]})}):p(Zn,{animationState:Y,"data-testid":"ttagsSection","data-test":"MemberRequest-ButtonSection",children:[p(O,{"data-testid":"decline-button",onClick:ft,tertiary:!0,size:"small","data-test":"MemberRequest-Button",children:[M("noumena.Decline")," "]}),t(O,{"data-testid":"accept-button",onClick:ht,secondary:!0,size:"small","data-test":"MemberRequest-Button",children:M("noumena.Accept")})]})]}),t(nt,{"data-test":"MemberRequest-Underline"})]})}),En=ue`
  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  animation: fadeOut 0.25s ease;
`,Hn=ue`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  animation: fadeIn 0.25s ease;
`,Wn=ue`
  @media (min-width: ${P.TABLET}) and (max-width: ${P.TABLET_L}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`,jn=k.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;
  ${({isModal:e})=>!e&&Wn}
`,Vn=k(_)`
  color: var(--text-card-header-neutral-default);
  ${ke}
  ${Ke}
  ${e=>!e.isHomeType&&ue`
      span {
        ${Ot}
      }
    `}
`,Gn=k.div`
  background-color: ${({bgColor:e})=>e};
  color: ${({color:e})=>e};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 8px;
  min-height: 22px;
  ${Ke}
`,Qn=k.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${Oe.bodyMedium}
`,Xn=k.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`,Kn=k.div`
  display: flex;
  flex-direction: column;
`,Yn=k.span`
  display: flex;
  gap: 8px;
  width: 100%;
  height: 40px;
  font-weight: 600;
  justify-content: center;
  ${e=>e.animationState===Fe.FadeIn?Hn:void 0}

  span {
    padding: 12px 0px;
    color: var(--text-card-neutral-default);
    font-family: var(--font-button-medium-font);
  }
`,Zn=k.span`
  display: flex;
  gap: 8px;
  width: 100%;

  button {
    width: 100%;
    padding: 12px 0px;
  }

  @media (min-width: ${P.TABLET}) and (max-width: ${P.TABLET_L}) {
    width: auto;
    button {
      min-width: 121px;
    }
  }

  ${At} {
    ${Ft.buttonMedium};
  }

  ${e=>e.animationState===Fe.FadeOut?En:void 0}
`,lt=k.span`
  ${({isClickable:e})=>e?"cursor: pointer;":void 0}
`,Jn=k.span`
  display: flex;
  flex-direction: column;
  color: var(--text-tablecell-header-neutral-highlighted);
  ${ke}
  ${Oe.bodyMediumBold};
  ${({isClickable:e})=>e?"cursor: pointer;":void 0}
`,ea=k.span`
  ${ke}
  -webkit-line-clamp: 3;
`,ta=k(_)`
  font-size: var(--font-link-small-size);
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
  width: 100%;
`,na=k(_)`
  word-break: break-all;
  ${Oe.bodyMedium}
  color: var(--link-notification-tile-neutral-default);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`,aa=k.div`
  position: relative;
`,sa=({name:e,refetch:a,requestedAt:n,title:i,profileImage:s,isInvite:r,noumId:l,connectionId:f,isChamberBox:d,isNotPrivateNoum:u,isChambersScreen:c,requestToChamberId:m})=>{const{onChangeLastUpdatedConnectionId:o}=Ie(),q=ce(),{isUnregistered:M}=le(),y=b.useCallback(()=>{M||q(`/noum/${m}`)},[m,M,q]),[T,g]=b.useState(!1),[I,h]=b.useState(ie.Default),{updateConnectionStatusHelper:R}=we(),S=()=>{h(ie.FadeOut),a()},x=async(Y,z,Z)=>{if(l&&z){const Se=await R(Y,z,Z);o&&o(z),Se&&S()}},w=async()=>{await x(l,f,B.Cancelled)},N=n?et(new Date(parseFloat(n)),"MMM dd, yyyy hh:mm a"):"",A=v("noumena.chamber.modal.requests_invites_sent"),F=v("noumena.chamber.modal.requests_invites_invited"),H=v("noumena.chamber.modal.requests_invites_on"),Q=(N==null?void 0:N.includes(v("noumena.date.today")))||(N==null?void 0:N.includes(v("noumena.date.yesterday"))),X=d?"":` ${Q?"":H} ${N}`,K=()=>p(C,{gap:12,"data-test":"RequestsOrInvite-renderRequestOrInvite-Stack",children:[t(lt,{onClick:y,isClickable:!M,"data-test":"RequestsOrInvite-renderRequestOrInvite-AvatarClickableWrapper",children:t(Re,{url:s||"","data-test":"RequestsOrInvite-renderRequestOrInvite-Avatar"})}),p(C,{vertical:!0,"data-test":"RequestsOrInvite-renderRequestOrInvite-Stack",children:[t(_e,{onClick:y,cursor:M?void 0:"pointer",font:"body-m-bold",title:e??"",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"RequestsOrInvite-renderRequestOrInvite-TSpanWithOverFlowText",children:e}),r&&p(_e,{cursor:r?"text":"pointer",onClick:y,font:u?"body-m":"body-m-bold",colorToken:"--text-card-header-neutral-default",title:i??"","data-test":"RequestsOrInvite-renderRequestOrInvite-TSpanWithOverFlowText",children:[c&&!d?"→":""," ",i]}),t(_e,{font:"body-s",colorToken:r?"--text-card-header-neutral-default":"--text-timestamp-neutral-default",title:i??"","data-test":"RequestsOrInvite-renderRequestOrInvite-TSpanWithOverFlowText",children:`${d?i??"":r?F:A}${X}`})]})]});return p(Ln,{justify:"space-between",fullWidth:!0,animationState:I,"data-test":"RequestsOrInvite-MyRequestContainer",children:[K(),t(O,{style:{margin:"auto 0"},size:"small",tertiary:!0,onClick:()=>g(!0),"data-test":"RequestsOrInvite-Button",children:v("noumena.cancel")}),t(Pn,{isInvite:r,isOpen:T,requestId:"",onClose:()=>g(!1),onDelete:w,component:K,"data-test":"RequestsOrInvite-DeleteMyRequest"})]})},Be=()=>{const e=ce(),{id:a}=Je(),n=tt(),i=()=>{a&&e(qe(te.EDIT_NOUM,{id:a}))};return t(Un,{font:"body-m",colorToken:"--text-tablecell-header-neutral-default",textAlign:"center","data-test":"InviteNonNemberNoListNote-StyledTSpan",children:t(Ae,{i18nKey:v("noumena.chamber.invite_by_me.description.non_member_not_in_list"),components:{link1:t(_,{cursor:n.pathname===te.NOUMS?void 0:"pointer",font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-default",onClick:i,"data-test":"InviteNonNemberNoListNote-TSpan"})},"data-test":"InviteNonNemberNoListNote-Trans"})})},rt=({isInvite:e,data:a,refetch:n,loading:i,chamberId:s,isChamberBox:r,isNotPrivateNoum:l,isChambersScreen:f,isModal:d})=>{var c,m;const u=(m=(c=a==null?void 0:a.requestedConnection)==null?void 0:c.data)==null?void 0:m.filter(o=>{var q;return!!(o!=null&&o.requestTo)&&!oe.isInactive((q=o==null?void 0:o.requestTo)==null?void 0:q.uid)});return t(E,{children:u&&u.length>0?u.map(o=>{var q,M,y,T,g,I,h,R,S,x,w,N,A,F;return p("div",{"data-test":"InvitesOrMyRequestsList",children:[t(sa,{requestFromChamberId:(q=o==null?void 0:o.requestFrom)==null?void 0:q._id,requestToChamberId:(M=o==null?void 0:o.requestTo)==null?void 0:M._id,refetch:n,noumId:s||"",connectionId:o==null?void 0:o.connectionId,isInvite:e,requestedAt:o==null?void 0:o.requestedAt,name:e||r||((y=o==null?void 0:o.requestTo)==null?void 0:y.type)==="HOME"?`${(g=(T=o==null?void 0:o.requestTo)==null?void 0:T.uid)==null?void 0:g.firstName} ${(h=(I=o==null?void 0:o.requestTo)==null?void 0:I.uid)==null?void 0:h.lastName}`:(R=o==null?void 0:o.requestTo)==null?void 0:R.name,title:f?(S=o==null?void 0:o.requestFrom)==null?void 0:S.name:(w=(x=o==null?void 0:o.requestTo)==null?void 0:x.uid)==null?void 0:w.title,profileImage:((N=o==null?void 0:o.requestTo)==null?void 0:N.type)==="HOME"?oe.getProfilePicture((A=o==null?void 0:o.requestTo)==null?void 0:A.uid):(F=o==null?void 0:o.requestTo)==null?void 0:F.profileImage,isNotPrivateNoum:l,isChamberBox:r,isChambersScreen:f,"data-test":"InvitesOrMyRequestsList-RequestsOrInvite"}),t(nt,{"data-test":"InvitesOrMyRequestsList-Underline"})]},o==null?void 0:o.connectionId)}):!i&&t(it,{isModal:d,"data-test":"InvitesOrMyRequestsList-NoResultsContainer",children:p(C,{vertical:!0,"data-test":"InvitesOrMyRequestsList-Stack",children:[t(at,{"data-test":"InvitesOrMyRequestsList-ReceivedRequest",children:e||r?v("noumena.chamber.You_dont_have_any_invites"):v("noumena.chamber.You_dont_have_any_sent_requests")}),e&&t(Be,{"data-test":"InvitesOrMyRequestsList-InviteNonNemberNoListNote"})]})})})},dt=({fetchMore:e,pageSize:a,data:n})=>{var d,u,c;const[i,s]=b.useState(void 0),[r,l]=b.useState("hasNextPage"),f=b.useCallback(async()=>{var o,q,M,y,T,g,I,h,R;if(!((o=n==null?void 0:n.requestedConnection)!=null&&o.data))return;const m=await e({variables:{limit:a,offset:((M=(q=i==null?void 0:i.requestedConnection)==null?void 0:q.data)==null?void 0:M.length)||0}});if((T=(y=m.data)==null?void 0:y.requestedConnection)!=null&&T.data){const S=[...((g=i==null?void 0:i.requestedConnection)==null?void 0:g.data)||[],...m.data.requestedConnection.data];s({requestedConnection:{data:S}})}(((R=(h=(I=m.data)==null?void 0:I.requestedConnection)==null?void 0:h.data)==null?void 0:R.length)||0)<a&&l("end")},[a,s,(d=n==null?void 0:n.requestedConnection)==null?void 0:d.data,e,(u=i==null?void 0:i.requestedConnection)==null?void 0:u.data]);return b.useEffect(()=>{var m,o,q;(m=n==null?void 0:n.requestedConnection)!=null&&m.data&&(s(n),l((o=n==null?void 0:n.requestedConnection)!=null&&o.data&&((q=n==null?void 0:n.requestedConnection)==null?void 0:q.data.length)<a?"end":"hasNextPage"))},[n,(c=n==null?void 0:n.requestedConnection)==null?void 0:c.data,a,s]),{infiniteData:i,infiniteState:r,infinityFetch:f}},oa=({noumId:e,isChambersScreen:a,isNotPrivateNoum:n})=>{var y;const{isMasterNoum:i,isOwner:s}=Ie(),r=10,{isMobile:l}=de(),{data:f,loading:d,refetch:u,fetchMore:c}=st({limit:r,requestFrom:a||i&&s?null:e,status:Me.Invited}),{infiniteData:m,infiniteState:o,infinityFetch:q}=dt({data:f,pageSize:r,fetchMore:c}),M=((y=m==null?void 0:m.requestedConnection)==null?void 0:y.data)||[];return p(C,{fullWidth:!0,vertical:!0,justify:"space-between","data-test":"InvitedByMeTab-Stack",children:[t(be,{onFetchMore:q,status:o,paddingRight:m?"12px":"0",isSpinnerRelative:!0,width:"100%",style:{overflowX:"hidden",maxHeight:l||i?"unset":325},"data-test":"InvitedByMeTab-Infinite",children:t(rt,{isChambersScreen:a,isInvite:!0,refetch:u,chamberId:e,data:m,loading:d,isNotPrivateNoum:n,isModal:!0,"data-test":"InvitedByMeTab-InvitesOrMyRequestsList"})}),M.length>0&&!i&&t(Be,{"data-test":"InvitedByMeTab-InviteNonNemberNoListNote"})]})},ia=({noumId:e})=>{const{data:n,refetch:i,loading:s,fetchMore:r}=st({limit:10,status:Me.Requested}),{infiniteData:l,infiniteState:f,infinityFetch:d}=dt({data:n,pageSize:10,fetchMore:r});return t(be,{onFetchMore:d,status:f,paddingRight:l?"12px":"0",isSpinnerRelative:!0,width:"100%",style:{overflowX:"hidden"},"data-test":"MyRequestsTab-Infinite",children:t(rt,{refetch:i,chamberId:e,data:l,loading:s,isModal:!0,"data-test":"MyRequestsTab-InvitesOrMyRequestsList"})})},ye=(e,a)=>{var n;return((n=e==null?void 0:e.requestTo)==null?void 0:n._id)===a},Le=e=>{var a,n,i,s,r,l;return`${((n=(a=e==null?void 0:e.requestFrom)==null?void 0:a.uid)==null?void 0:n.firstName)??""} ${((s=(i=e==null?void 0:e.requestFrom)==null?void 0:i.uid)==null?void 0:s.middleName)||""} ${((l=(r=e==null?void 0:e.requestFrom)==null?void 0:r.uid)==null?void 0:l.lastName)??""}`},la=e=>e!=null&&e.requestFrom?e.requestFrom.type!==re.Home?e.requestFrom.name??"":Le(e):"",ra=e=>{var a;return e!=null&&e.requestFrom?e.requestFrom.type!==re.Home?Le(e):((a=e.requestFrom.uid)==null?void 0:a.title)??"":""},da=e=>{var a,n;return e!=null&&e.requestFrom?e.requestFrom.type===re.Home?((n=(a=e.requestFrom.uid)==null?void 0:a.profile)==null?void 0:n.profilePictureThumbnail)||"":e.requestFrom.profileImage??"":""},ca=e=>{var a;return e!=null&&e.requestFrom?e.requestFrom.type==="HOME"?"Member":(a=e.requestFrom.category)==null?void 0:a.name:""},ua=(e,a)=>e!=null&&e.requestTo?ye(e,a)?la(e):e.requestTo.name??"":"",ma=(e,a)=>e!=null&&e.requestTo?ye(e,a)?ra(e):`${v("noumena.chamber.member_request.requested_by")} ${Le(e)}`:"",pa=(e,a)=>e!=null&&e.requestTo?ye(e,a)?da(e):e.requestTo.profileImage??"":"",ha=(e,a)=>{var n;return e!=null&&e.requestTo?ye(e,a)?ca(e):(n=e.requestTo.category)==null?void 0:n.name:""},ct=({data:e,loading:a,chamberId:n,isModal:i,refetchReceivedRequests:s})=>{var f;const{pathname:r}=tt(),l=b.useMemo(()=>{var u,c;const d=((c=(u=e==null?void 0:e.receivedConnectionRequest)==null?void 0:u.data)==null?void 0:c.filter(m=>{var o;return!!(m!=null&&m.requestFrom)&&!oe.isInactive((o=m==null?void 0:m.requestFrom)==null?void 0:o.uid)&&!U.isRiseApplicatonCategory(m.requestTo)}))||[];return Qt(te.NOUMS,r)?d.slice(0,3):d},[(f=e==null?void 0:e.receivedConnectionRequest)==null?void 0:f.data,r]);return t(E,{children:l&&l.length>0?l.map(d=>{var u,c,m,o,q,M;return t("div",{"data-testid":(u=d==null?void 0:d.requestFrom)==null?void 0:u._id,"data-test":"RequestList",children:t($n,{requestFromChamberId:(c=d==null?void 0:d.requestFrom)==null?void 0:c._id,refetchReceivedRequests:s,chamberId:n,noumType:(m=d==null?void 0:d.requestTo)==null?void 0:m.type,connectionId:d==null?void 0:d._id,title:ua(d,n),name:ma(d,n),profileImage:pa(d,n),category:i?ha(d,n):void 0,inviterId:(q=(o=d==null?void 0:d.requestFrom)==null?void 0:o.uid)==null?void 0:q._id,isHomeType:((M=d==null?void 0:d.requestFrom)==null?void 0:M.type)===re.Home,message:d==null?void 0:d.message,isModal:i,"data-test":"RequestList-MemberRequest"})},d==null?void 0:d._id)}):!a&&t(it,{isModal:i,"data-test":"RequestList-NoResultsContainer",children:t(at,{"data-test":"RequestList-ReceivedRequest",children:v("noumena.chamber.You_dont_have_any_requests")})})})},fa=({noumId:e,isChambersScreen:a,refetchReceivedRequests:n})=>{var T,g,I;const{data:s,refetch:r,loading:l,fetchMore:f}=ot(a?{limit:10}:{spaceId:e,limit:10}),{width:d}=fe(),u=d<he.TABLET,[c,m]=b.useState(void 0),[o,q]=b.useState("hasNextPage"),M=b.useCallback(async()=>{var R,S,x,w,N,A,F,H,Q;if(!((R=s==null?void 0:s.receivedConnectionRequest)!=null&&R.data))return;const h=await f({variables:{limit:10,offset:((x=(S=c==null?void 0:c.receivedConnectionRequest)==null?void 0:S.data)==null?void 0:x.length)||0}});if((N=(w=h.data)==null?void 0:w.receivedConnectionRequest)!=null&&N.data){const X=[...((A=c==null?void 0:c.receivedConnectionRequest)==null?void 0:A.data)||[],...h.data.receivedConnectionRequest.data];m({receivedConnectionRequest:{data:X}})}(((Q=(H=(F=h.data)==null?void 0:F.receivedConnectionRequest)==null?void 0:H.data)==null?void 0:Q.length)||0)<10&&q("end")},[10,m,(T=s==null?void 0:s.receivedConnectionRequest)==null?void 0:T.data,f,(g=c==null?void 0:c.receivedConnectionRequest)==null?void 0:g.data]);return b.useEffect(()=>{var h,R,S;(h=s==null?void 0:s.receivedConnectionRequest)!=null&&h.data&&(m(s),q((R=s==null?void 0:s.receivedConnectionRequest)!=null&&R.data&&((S=s==null?void 0:s.receivedConnectionRequest)==null?void 0:S.data.length)<10?"end":"hasNextPage"))},[s,(I=s==null?void 0:s.receivedConnectionRequest)==null?void 0:I.data,10,m]),t(be,{onFetchMore:M,status:o,style:{paddingLeft:u?16:0,paddingRight:u?16:c?12:0,overflowX:"hidden"},isSpinnerRelative:!0,width:"100%","data-test":"ReceivedRequestsTab-Infinite",children:t(ct,{showCategory:!0,refetchReceivedRequests:()=>{n&&n(),r()},chamberId:e,data:c,loading:l,isModal:!0,"data-test":"ReceivedRequestsTab-RequestList"})})},ga=b.memo(({isOpen:e,handleClose:a,isChambersScreen:n,noumId:i,isInviteOnly:s,refetchReceivedRequests:r})=>{const{t:l}=ne(),[f,d]=b.useState(s?"1":"0"),{width:u}=fe(),c=u<he.TABLET+1,m=u<he.TABLET,o=b.useMemo(()=>[{name:"received",image:"terms_m",text:l("noumena.chamber.modal.received"),labelSize:"medium"},{name:"invited by me",image:"terms_m",text:l("noumena.chamber.modal.invited_by_me"),labelSize:"medium"}],[l]),q=y=>{d(y)};b.useEffect(()=>{n&&o.push({name:"my requests",image:"terms_m",text:l("noumena.chamber.modal.my_requests"),labelSize:"medium"})},[o,n,l]);const M=()=>{switch(f){case"1":return t(oa,{noumId:i,isChambersScreen:n,isNotPrivateNoum:s,"data-test":"RequestsAndInvitesModal-tabComponent-InvitedByMeTab"});case"2":return t(ia,{noumId:i,"data-test":"RequestsAndInvitesModal-tabComponent-MyRequestsTab"});case"0":default:return t(fa,{noumId:i,isChambersScreen:n,refetchReceivedRequests:r,"data-test":"RequestsAndInvitesModal-tabComponent-ReceivedRequestsTab"})}};return p($,{testId:"testRequestsAndInvites",open:e,onClose:a,isFullScreen:m,enableCloseButton:!0,size:j.M,disableBackdropClick:!0,"data-test":"RequestsAndInvitesModal-Modal",children:[t(V,{topPadding:0,bottomPadding:0,justify:"flex-start",titleCss:{textAlign:"left",margin:0},"data-test":"RequestsAndInvitesModal-ModalHeader",children:l(s?"noumena.chamber.modal.invited_by_me":"noumena.chamber.modal.requests_invites")}),t(Dn,{"data-test":"RequestsAndInvitesModal-TabsContainer",children:!s&&t(zn,{"data-test":"RequestsAndInvitesModal-TabSection",children:t(Ye,{onChange:q,inputList:o,selectedId:f,mode:"isBackground",isWithoutImage:!0,fontSize:"--font-body-medium-size",tabWidth:c?"106.33px":"109.33px",textFont:"--font-body-medium-regular-font","data-test":"RequestsAndInvitesModal-BasicChipsTabsForm"})})}),t(G,{minHeight:419,...!m&&{maxHeight:"419px"},"data-test":"RequestsAndInvitesModal-ModalBody",children:M()})]})});var ut=(e=>(e[e.Default=0]="Default",e[e.FadeOut=1]="FadeOut",e[e.FadeIn=2]="FadeIn",e))(ut||{});const ba=k(C)`
  overflow-y: auto;
`,va=k(C)`
  min-height: 300px;
`,Ma=k(C)`
  &:first-child [data-tooltip]:hover::after {
    top: 30px;
  }
`,qa=k(C)`
  min-height: 80px;
  ${e=>e.animationState===ut.FadeOut&&ue`
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
      animation: fadeOut 0.25s ease;
    `}
`,Ra=k(C)`
  flex: 1;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
`,ka=k.span`
  ${({isClickable:e})=>e?"cursor: pointer;":void 0}
`,Ia=k(C)`
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`,Ve=k(_).attrs({colorToken:"--text-tablecell-header-neutral-highlighted",font:"body-m-bold"})`
  display: flex;
  gap: 8px;
  cursor: pointer;
`,ya=k(O)`
  max-height: unset;
  height: unset;
  &[data-tooltip]:hover::after {
    max-width: 359px;
    font-size: var(--font-body-medium-size);
    z-index: 10000;
    padding: 10px 16px;
    border-radius: 8px;
    left: 15px;
    top: -110px;
    text-align: left;
  }
`,Sa=k(C)`
  min-height: 20px;
  margin: auto;
`,xa=()=>t(Bt,{primary:!0,size:"medium",borderRadius:"8px","data-test":"MemberBadge-Chips",children:t(_,{font:"footnote-bold",colorToken:"--text-badge-noums-member-highligt","data-test":"MemberBadge-TSpan",children:v("noumena.member")})}),mt=e=>{var h,R,S,x,w,N,A;const{isMobile:a}=de(),{showMessage:n,handleClickShowMessage:i,item:s,isReceived:r,isInvite:l}=e,{user:f,isUnregistered:d}=le(),u=ce(),c=F=>{!d&&F&&u(qe(te.NOUM,{id:F}))},{ownSpace:m,guestSpace:o}=((h=s.requestTo)==null?void 0:h._id)===((R=f==null?void 0:f.chamber)==null?void 0:R._id)||((w=(x=(S=s.requestTo)==null?void 0:S.uid)==null?void 0:x.chamber)==null?void 0:w._id)===((N=f==null?void 0:f.chamber)==null?void 0:N._id)||r&&((A=s.requestTo)==null?void 0:A.type)===re.Project&&U.isMasterNoum(s.requestFrom)?{ownSpace:s.requestTo,guestSpace:s.requestFrom}:{ownSpace:s.requestFrom,guestSpace:s.requestTo},q=U.getSpaceProfileImage(o),M=U.getSpaceTitle(o),y=U.getSpaceTitle(m),T=!l&&U.isMasterNoum(o)&&U.isMasterNoum(m),g=s.requestedAt?et(new Date(parseFloat(s.requestedAt)),"MMM dd, yyyy hh:mm a"):"",I=l&&r&&o?v("noumena.noum.invited_by_",{userName:oe.renderFullName(o.uid)}):"";return p(Ra,{"data-test":"RequstsOrInvitesItemDetail-RequestsOrInvitesItemDetailWrapper",children:[p(C,{gap:12,"data-test":"RequstsOrInvitesItemDetail-Stack",children:[t(ka,{onClick:()=>c(o==null?void 0:o._id),isClickable:!d,"data-test":"RequstsOrInvitesItemDetail-AvatarClickableWrapper",children:t(Re,{url:q,"data-test":"RequstsOrInvitesItemDetail-Avatar"})}),p(C,{vertical:!0,"data-test":"RequstsOrInvitesItemDetail-Stack",children:[p(Ia,{"data-test":"RequstsOrInvitesItemDetail-TitleWrapper",children:[t(Ve,{onClick:()=>c(o==null?void 0:o._id),"data-test":"RequstsOrInvitesItemDetail-TitleSpan",children:M}),p(Ve,{"data-test":"RequstsOrInvitesItemDetail-TitleSpan",children:[!U.isMasterNoum(m)&&p(E,{children:[t(L,{color:"--icon-tablecell-neutral-default",name:"arrow_right_m",size:16,"data-test":"RequstsOrInvitesItemDetail-Icon"}),U.isMasterNoum(o)?t(_,{onClick:()=>c(m==null?void 0:m._id),"data-test":"RequstsOrInvitesItemDetail-TSpan",children:y}):""]}),T&&t(xa,{"data-test":"RequstsOrInvitesItemDetail-MemberBadge"})]})]}),t(_,{font:"footnote",colorToken:"--text-tablecell-body-neutral-default","data-test":"RequstsOrInvitesItemDetail-TSpan",children:t(Ae,{i18nKey:"noumena.noums.requests_or_invites_item.date_time_information",values:{labelForDateTime:I,dateTime:g},components:{link1:t(_,{font:"footnote-bold",onClick:()=>c(o==null?void 0:o._id),"data-test":"RequstsOrInvitesItemDetail-TSpan"})},"data-test":"RequstsOrInvitesItemDetail-Trans"})})]})]}),n&&t(ya,{icon:t(L,{name:"message_outline_m",size:24,"data-test":"RequstsOrInvitesItemDetail-Icon"}),size:"small",textOnly:!0,tooltipPosition:"top-center",tooltipText:a?"":s.message||"",onClick:i,"data-test":"RequstsOrInvitesItemDetail-IconButton"})]})},_a=e=>{const{onClose:a,isOpen:n,item:i,onConfirm:s,isActionLoading:r,isInvite:l,isReceived:f,actionType:d}=e,u=l?v("noumena.noums.requests_or_invites.type.invitation"):v("noumena.noums.requests_or_invites.type.request"),c=d===B.Approved?v("noumena.Accept"):d===B.Declined?v("noumena.decline"):d===B.Cancelled?v("noumena.cancel"):"",m=b.useCallback(async()=>{s()},[s]);return p($,{isFullScreen:!1,open:n??!1,testId:"delete_request",onClose:a,size:j.S,"data-test":"RequestOrInvitesActionModal-Modal",children:[t(V,{isFullScreen:!1,"data-test":"RequestOrInvitesActionModal-ModalHeader",children:`${c} ${u}`}),p(G,{isFullScreen:!1,"data-test":"RequestOrInvitesActionModal-ModalBody",children:[t(_,{"data-testid":"delete_confirm_text",font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"RequestOrInvitesActionModal-TSpan",children:v("noumena.noums.requests_or_invites.modal.action.description",{action:c.toLocaleLowerCase(),type:u.toLocaleLowerCase()})}),t(ee,{height:16,"data-test":"RequestOrInvitesActionModal-Spacer"}),t(mt,{item:i,showMessage:!1,isReceived:f,isInvite:l,"data-test":"RequestOrInvitesActionModal-RequstsOrInvitesItemDetail"})]}),p(ge,{isFullScreen:!1,flexDirection:"column",gap:16,"data-test":"RequestOrInvitesActionModal-ModalFooter",children:[t(O,{testId:"request_delete_btn",disabled:r,loading:r,intent:"negative",size:"full",onClick:m,"data-test":"RequestOrInvitesActionModal-Button",children:v("noumena.noums.requests_or_invites.modal.button.yes",{action:c,type:u})}),t(O,{tertiary:!0,disabled:r,onClick:a,size:"full",testId:"request_delete_cancel_btn","data-test":"RequestOrInvitesActionModal-Button",children:v("noumena.modal.no_keep_it")})]})]})},Ta=({isReceived:e,handleActionClick:a})=>{const{isMobile:n}=de();return t(C,{gap:8,fullWidth:n&&e,"data-test":"RequestsOrInvitesItemActions-Stack",children:e?p(E,{children:[t(O,{size:n?"full_small":"small",tertiary:!0,onClick:()=>a(B.Declined),"data-test":"RequestsOrInvitesItemActions-Button",children:v("noumena.chamber.decline_button")}),t(O,{size:n?"full_small":"small",secondary:!0,onClick:()=>a(B.Approved),"data-test":"RequestsOrInvitesItemActions-Button",children:v("noumena.chamber.accept_button")})]}):t(O,{size:"small",intent:"negative",secondary:!0,icon:t(L,{name:"close_m",size:24,"data-test":"RequestsOrInvitesItemActions-Icon"}),onClick:()=>a(B.Cancelled),"data-test":"RequestsOrInvitesItemActions-Button"})})},Ca=k(C)`
  justify-content: center;
`,Na=k(O)`
  position: absolute;
`,wa=k(Ze)`
  height: 5px;
  margin: 21px auto -8px;
  width: 134px;
  background: var(--bg-overlay-neutral-dark);
  border-radius: 100px;
`,Oa=e=>{const{open:a,children:n,onClose:i}=e;return p(Lt,{open:a,usePortal:!0,"data-test":"ItemDetailMessageModal-BottomSheet",children:[t(Na,{size:"small",tertiary:!0,icon:t(L,{name:"close_m",size:24,color:"--icon-button-neutral-default","data-test":"ItemDetailMessageModal-Icon"}),onClick:i,"data-test":"ItemDetailMessageModal-StyledBottomSheetCloseButton"}),t(Ca,{fullWidth:!0,padding:8,"data-test":"ItemDetailMessageModal-StyledBottomSheetHeader",children:t(_,{font:"body-xl-bold",colorToken:"--text-modal-header-neutral-default","data-test":"ItemDetailMessageModal-TSpan",children:v("noumena.noums.requests_or_invites.detail.modal.message")})}),t(ee,{height:16,"data-test":"ItemDetailMessageModal-Spacer"}),n,t(wa,{"data-test":"ItemDetailMessageModal-StyledSeparator"})]})},Aa=({item:e,isInvite:a,isReceived:n,refetch:i})=>{const{isMobile:s}=de(),{user:r}=le(),[l,f]=b.useState(!1),[d,u]=b.useState(!1),{onChangeLastUpdatedConnectionId:c}=Ie(),[m,o]=b.useState(ie.Default),{updateConnectionStatusHelper:q,loading:M}=we(),y=()=>{o(ie.FadeOut),i()},T=async(w,N)=>{var A;if(w){const F=await q(((A=r==null?void 0:r.chamber)==null?void 0:A._id)||"",w,N);c&&c(w),F&&(y(),R())}},[g,I]=b.useState(void 0),h=w=>{f(!0),I(w)},R=()=>{f(!1),I(void 0)},S=async()=>{g&&await T(e._id,g)},x=()=>{s&&u(!0)};return p(qa,{justify:"space-between",fullWidth:!0,gap:16,animationState:m,vertical:s&&n,align:s?void 0:"center","data-test":"RequestsOrInvitesItem-RequestsOrInvitesItemWrapper",children:[t(mt,{item:e,isReceived:n,isInvite:a,showMessage:!!e.message,handleClickShowMessage:x,"data-test":"RequestsOrInvitesItem-RequstsOrInvitesItemDetail"}),t(Ta,{isReceived:n,handleActionClick:h,"data-test":"RequestsOrInvitesItem-RequestsOrInvitesItemActions"}),t(_a,{isOpen:l,actionType:g,onClose:R,onConfirm:S,isActionLoading:M,isInvite:a,item:e,isReceived:n,"data-test":"RequestsOrInvitesItem-RequestOrInvitesActionModal"}),e.message&&s&&t(Oa,{open:d,onClose:()=>u(!1),"data-test":"RequestsOrInvitesItem-ItemDetailMessageModal",children:t(_,{colorToken:"--text-modal-neutral-default","data-test":"RequestsOrInvitesItem-TSpan",children:e.message})})]})},Fa=({isInvite:e,isReceived:a=!1,data:n,loading:i,refetch:s})=>{const r=e?n==null?void 0:n.filter(l=>{var f;return!oe.isInactive((f=a?l==null?void 0:l.requestFrom:l==null?void 0:l.requestTo)==null?void 0:f.uid)}):n;return t(va,{vertical:!0,fullWidth:!0,"data-test":"RequestsAndInvitesItems-RequestsAndInvitesItemsWrapper",children:r.length>0?r.map(l=>l?p(Ma,{fullWidth:!0,vertical:!0,"data-test":"RequestsAndInvitesItems-RequestsOrInvitesItemContainer",children:[t(Aa,{item:l,isReceived:a,isInvite:e,refetch:s,"data-test":"RequestsAndInvitesItems-RequestsOrInvitesItem"}),t(Ze,{noMargin:!0,fullWidth:!0,"data-test":"RequestsAndInvitesItems-Separator"})]},l==null?void 0:l._id):null):t(Sa,{vertical:!0,align:"center","data-test":"RequestsAndInvitesItems-EmptyContainer",children:i?t(Xe,{"data-test":"RequestsAndInvitesItems-Spinner"}):p(E,{children:[t(_,{font:"body-l",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"RequestsAndInvitesItems-TSpan",children:v("noumena.noums.requests_or_invites_item.no_result")}),r.length===0&&e&&t(Be,{"data-test":"RequestsAndInvitesItems-InviteNonNemberNoListNote"})]})})})},Ba=b.memo(e=>{var K,Y,z,Z;const{isMobile:a}=de(),{typeId:n,statusId:i,refetchReceivedRequests:s}=e,r=n==="invites",l=r?Me.Invited:Me.Requested,f=i==="received",d={limit:a?zt:Ut,status:l,offset:0},{data:u,refetch:c,loading:m,fetchMore:o,networkStatus:q}=Dt({fetchPolicy:"cache-and-network",variables:d}),{data:M,refetch:y,loading:T,fetchMore:g,networkStatus:I}=Ge({fetchPolicy:"cache-and-network",variables:d}),{loading:h,refetch:R,networkStatus:S,items:x,totalCount:w,fetchMore:N}=f?{loading:m,refetch:c,networkStatus:q,items:((K=u==null?void 0:u.receivedConnectionRequest)==null?void 0:K.data)||[],totalCount:((Y=u==null?void 0:u.receivedConnectionRequest)==null?void 0:Y.count)||0,fetchMore:o}:{loading:T,refetch:y,networkStatus:I,items:((z=M==null?void 0:M.requestedConnection)==null?void 0:z.data)||[],totalCount:((Z=M==null?void 0:M.requestedConnection)==null?void 0:Z.count)||0,fetchMore:g},A=b.useCallback(async()=>N({variables:{offset:(x==null?void 0:x.length)||0}}),[N,x==null?void 0:x.length]),F=S===ve.fetchMore,H=(x==null?void 0:x.length)<w;return t(ba,{fullWidth:!0,"data-test":"RequestsAndInvitesList-RequestsAndInvitesListWrapper",children:t(be,{onFetchMore:A,status:F?"loading":H?"hasNextPage":"end",width:"100%","data-test":"RequestsAndInvitesList-Infinite",children:t(Fa,{isInvite:r,isReceived:f,refetch:()=>{R(),f&&(s==null||s())},data:x,loading:h,isModal:!0,"data-test":"RequestsAndInvitesList-RequestsAndInvitesItems"})})})}),La=[{id:"requests",name:"requests",text:v("noumena.requests"),labelSize:"auto"},{id:"invites",name:"invites",text:v("noumena.invites"),labelSize:"auto"}],Da=[{id:"received",label:v("noumena.received")},{id:"sent",label:v("noumena.sent")}],za=b.memo(({isOpen:e,handleClose:a,refetchReceivedRequests:n})=>{const{isMobile:i}=de(),[s,r]=b.useState("requests"),[l,f]=b.useState("received"),d=c=>{r(c)},u=c=>{f(c)};return p($,{testId:"testRequestsAndInvites",open:e,onClose:a,isFullScreen:i,enableCloseButton:!0,size:j.XL,disableBackdropClick:!0,"data-test":"RequestsAndInvitesModal-Modal",children:[t(V,{topPadding:0,bottomPadding:24,"data-test":"RequestsAndInvitesModal-ModalHeader",children:v("noumena.chamber.modal.requests_invites")}),p(G,{gap:16,minHeight:488,maxHeight:i?"unset":"488px","data-test":"RequestsAndInvitesModal-ModalBody",children:[t(C,{fullWidth:!0,"data-test":"RequestsAndInvitesModal-Stack",children:t(Ye,{onChange:d,inputList:La,selectedId:s,mode:"isBackground",fullWidth:!0,isWithoutImage:!0,tabCSS:{margin:0},gap:12,fontSize:"--font-body-medium-size",textFont:"--font-body-medium-regular-font","data-test":"RequestsAndInvitesModal-BasicChipsTabsForm"})}),t(C,{fullWidth:!0,gap:16,"data-test":"RequestsAndInvitesModal-Stack",children:Da.map(c=>{const m=c.id===l;return p(C,{onClick:()=>u(c.id||""),gap:8,align:"center","data-test":"RequestsAndInvitesModal-Stack",children:[t(pn,{isChecked:m,icon:t(L,{name:"radio_btn_m",size:m?12:0,color:m?"--icon-radiobutton-brand-primary-default":"--icon-radiobutton-inactive-default","data-test":"RequestsAndInvitesModal-Icon"}),"data-test":"RequestsAndInvitesModal-Radiobox"}),t(_,{colorToken:m?"--text-tab-chips-brand-primary-selected":"--text-tab-chips-neutral-default","data-test":"RequestsAndInvitesModal-TSpan",children:c.label})]},c.id)})}),t(Ba,{statusId:l,typeId:s,refetchReceivedRequests:n,"data-test":"RequestsAndInvitesModal-RequestsAndInvitesList"})]})]})}),Ua=()=>t(an,{"data-testid":"received-request-skeleton","data-test":"ReceivedRequestsSkeleton-SkeletonContainer",children:p(Xt,{borderRadius:8,"data-test":"ReceivedRequestsSkeleton-SkeletonTheme",children:[t(J,{width:143,"data-test":"ReceivedRequestsSkeleton-Skeleton"}),Array.from({length:3}).map(()=>p(sn,{"data-testid":"skeleton_item","data-test":"ReceivedRequestsSkeleton-SkeletonItem",children:[p($e,{"data-test":"ReceivedRequestsSkeleton-ItemSkeletonWrapper",children:[t(J,{width:40,height:40,"data-test":"ReceivedRequestsSkeleton-Skeleton"}),p(on,{"data-test":"ReceivedRequestsSkeleton-RightSkeletonWrapper",children:[t(J,{width:140,"data-test":"ReceivedRequestsSkeleton-Skeleton"}),t(J,{width:198,"data-test":"ReceivedRequestsSkeleton-Skeleton"})]})]}),p($e,{"data-test":"ReceivedRequestsSkeleton-ItemSkeletonWrapper",children:[t(Ee,{"data-test":"ReceivedRequestsSkeleton-ButtonSkeletonWrapper",children:t(J,{height:40,"data-test":"ReceivedRequestsSkeleton-Skeleton"})}),t(Ee,{"data-test":"ReceivedRequestsSkeleton-ButtonSkeletonWrapper",children:t(J,{height:40,"data-test":"ReceivedRequestsSkeleton-Skeleton"})})]})]},Kt())),t(ln,{"data-test":"ReceivedRequestsSkeleton-FooterSkeleton",children:t(J,{width:214,"data-test":"ReceivedRequestsSkeleton-Skeleton"})})]})}),ss=({isChambersScreen:e,noumId:a,disabled:n})=>{var q,M,y;const i=fe(),{flags:{noumRequestsInvitesV2:s}}=Pt(),[r,l]=Te(),[f,d]=b.useState(!1);b.useEffect(()=>{i.width>he.TABLET_L&&d(!1)},[i.width]);const{data:u,loading:c,refetch:m}=ot(e?{limit:3}:{spaceId:a,limit:3}),o=()=>m(e?{}:{spaceId:a});return p(rn,{disabled:n,"data-test":"ReceivedRequests-Container",children:[c&&!((M=(q=u==null?void 0:u.receivedConnectionRequest)==null?void 0:q.data)!=null&&M.length)?t(Ua,{"data-test":"ReceivedRequests-ReceivedRequestsSkeleton"}):p(E,{children:[p(dn,{"data-test":"ReceivedRequests-Header",children:[t(cn,{"data-testid":"received-requests-collapse-button",onClick:()=>d(!f),"data-test":"ReceivedRequests-ButtonView",children:t(L,{name:f?"chevron_small_down_m":"chevron_small_up_m",color:"--icon-button-neutral-default",size:24,"data-test":"ReceivedRequests-Icon"})}),t(_,{font:"footnote-bold",colorToken:"--text-body-neutral-default","data-test":"ReceivedRequests-TSpan",children:v("noumena.chamber.received_requests")})]}),f?t(_,{font:"body-m",colorToken:"--text-body-neutral-default",textAlign:"center",$fill:!0,"data-test":"ReceivedRequests-TSpan",children:t(Ae,{i18nKey:"noumena.chamber.awaiting_received_requests",values:{postProcess:"interval",count:((y=u==null?void 0:u.receivedConnectionRequest)==null?void 0:y.count)||0},components:{bold:t(_,{colorToken:"--text-card-neutral-highlighted",textAlign:"center",$fill:!0,"data-test":"ReceivedRequests-TSpan"})},"data-test":"ReceivedRequests-Trans"})}):t(ct,{refetchReceivedRequests:o,chamberId:a,data:u,"data-test":"ReceivedRequests-RequestList"}),t(un,{textOnly:!0,onClick:l,"data-test":"ReceivedRequests-AllRequests",children:v("noumena.chamber.See_all_Requests_&_Invites")})]}),s?t(za,{isOpen:r,handleClose:l,refetchReceivedRequests:o,"data-test":"ReceivedRequests-RequestsAndInvitesModalV2"}):t(ga,{isOpen:r,isChambersScreen:e,handleClose:l,refetchReceivedRequests:o,noumId:a,"data-test":"ReceivedRequests-RequestsAndInvitesModal"})]})},Pa=b.forwardRef(({isOpen:e,handleClose:a,acceptUnlinking:n,linkedNoums:i},s)=>{const[r,l]=b.useState(""),{width:f}=fe(),d=b.useMemo(()=>f<=he.MOBILE_MAX,[f]),[u,c]=b.useState([]),[m,o]=b.useState(u);b.useEffect(()=>{const h=[...u],R=r.toLowerCase(),S=h.filter(({name:x})=>{const w=(x==null?void 0:x.toLowerCase())??"";return R.includes(w??"")||(w==null?void 0:w.includes(R))});o(S)},[r,u]);const q=b.useCallback((h=[])=>h.map(R=>({...R,checked:!1,disabled:!1})),[]);b.useEffect(()=>{const h=q(i||[]);c(h),e||l("")},[e,i,q]);const M=h=>{l(h)};b.useImperativeHandle(s,()=>({handleSubmit:()=>u.filter(h=>h.checked).map(h=>h._id)||[]}));const y=b.useMemo(()=>{if(u.every(h=>h.checked))return!0;if(u.every(h=>!h.checked))return!1},[u]),T=h=>()=>{const R=[...u],S=u.findIndex(x=>x._id===h);S>-1&&R.splice(S,1,{...R[S],checked:!R[S].checked}),c(R)},g=()=>{const h=u.reduce((R,S)=>(S.checked?R.true+=1:R.false+=1,R),{true:0,false:0});c(u.map(R=>({...R,checked:typeof y=="boolean"?!y:!(h.false>h.true)})))},I=b.useCallback(()=>{const h=q(i||[]);c(h),a()},[a,i,q]);return p($,{enableCloseButton:!d,testId:"unlink-multiple-noum-modal",open:e,onClose:I,size:j.L,disableBackdropClick:!0,"data-test":"UnlinkMultipleNoumModal-Modal",children:[t(V,{"data-test":"UnlinkMultipleNoumModal-ModalHeader",children:v("noumena.link_noums.unlink_noums")}),p(G,{"data-test":"UnlinkMultipleNoumModal-ModalBody",children:[t(Rn,{font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"UnlinkMultipleNoumModal-AlignTSpan",children:v("noumena.link_noums.unlink_multiple_modal_description")}),p(bn,{"data-test":"UnlinkMultipleNoumModal-SearchWrapper",children:[t($t,{inputSize:"small",placeholder:"Search for a Noum",leftIcon:t(L,{name:"search_m",size:24,color:"--icon-input-neutral-default","data-test":"UnlinkMultipleNoumModal-Icon"}),rightIcon:r&&t(L,{name:"clear_m",size:24,color:"--icon-input-brand-primary-default",onClick:()=>M(""),"data-test":"UnlinkMultipleNoumModal-Icon"}),value:r||"",onChange:h=>M(h.currentTarget.value),"data-testid":"search-attendees","data-test":"UnlinkMultipleNoumModal-SearchField"}),m.length===0&&t(fn,{"data-test":"UnlinkMultipleNoumModal-NoSearchResultsForNoums"})]}),p(vn,{"data-test":"UnlinkMultipleNoumModal-UnlinkContainer",children:[m.length>0&&p(qn,{"data-test":"UnlinkMultipleNoumModal-UnlinkContainerHeader",children:[t(_,{colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"UnlinkMultipleNoumModal-TSpan",children:v("noumena.link_noums.unlink_all")}),t(Et,{onChange:g,isChecked:typeof y=="boolean"?y:!0,icon:t(L,{name:typeof y=="boolean"?"check_xs":"minus_xs",size:24,color:"--icon-checkbox-neutral-alt-default","data-test":"UnlinkMultipleNoumModal-Icon"}),"data-test":"UnlinkMultipleNoumModal-Checkbox"})]}),t(Mn,{"data-test":"UnlinkMultipleNoumModal-UnlinkOptionContainer",children:m.map((h,R)=>t(hn,{style:{paddingRight:12},item:h,showBorder:R<Ht.length-1,updateOptionState:T(h._id??""),"data-test":"UnlinkMultipleNoumModal-LinkNoumOption"},h._id))})]})]}),p(ge,{gap:16,"data-test":"UnlinkMultipleNoumModal-ModalFooter",children:[t(We,{size:"full",testId:"cancel-linking",flex:1,onClick:I,"data-test":"UnlinkMultipleNoumModal-ButtonFlex",children:v("noumena.cancel")}),t(We,{testId:"enable-linking",size:"full",flex:d?2:1,intent:"negative",onClick:n,"data-test":"UnlinkMultipleNoumModal-ButtonFlex",children:v("noumena.link_noums.unlink_noums")})]})]})}),$a=({isOpen:e,handleClose:a,handleUnlinking:n,loading:i,description:s})=>p($,{testId:"unlink-noum-modal",open:e,onClose:a,size:j.S,"data-test":"UnlinkSingleNoumModal-Modal",children:[t(V,{"data-test":"UnlinkSingleNoumModal-ModalHeader",children:v("noumena.link_noums.unlink_noums")}),t(G,{style:{alignItems:"center"},"data-test":"UnlinkSingleNoumModal-ModalBody",children:t(_,{font:"body-l",textAlign:"center",colorToken:"--text-modal-neutral-default","data-test":"UnlinkSingleNoumModal-TSpan",children:s||v("noumena.link_noums.unlink_confirm_modal.description.multiple_noums")})}),p(ge,{flexDirection:"column",gap:16,"data-test":"UnlinkSingleNoumModal-ModalFooter",children:[t(O,{testId:"enable-linking",size:"full",intent:"negative",disabled:i,loading:i,onClick:n,"data-test":"UnlinkSingleNoumModal-Button",children:v("noumena.link_noums.unlink_modal_confirm")}),t(O,{size:"full",testId:"cancel-linking",tertiary:!0,disabled:i,onClick:a,"data-test":"UnlinkSingleNoumModal-Button",children:v("noumena.link_noums.unlink_modal_cancel")})]})]}),os=b.forwardRef(({refetch:e,space:a,noumLink:n},i)=>{const{addToast:s}=Wt(),[r,l]=Te(),[f,d,u]=Te(!1),c=b.useRef(null),m=b.useMemo(()=>Ce(a?[a,...(n==null?void 0:n.linkedNoums)||[]]:n==null?void 0:n.linkedNoums),[a,n]);b.useImperativeHandle(i,()=>({toggleUnlinkConfirmationOpen:l,toggleUnlinkMultipleNoum:d}));const[o,{loading:q}]=jt({onError:h=>{s("error","none",h.message)},onCompleted:()=>{s("success","none",v("noumena.link_noums.unlink_alert")),l(),e()}}),[M,{loading:y}]=Vt({onError:h=>{s("error","none",h.message)},onCompleted:()=>{e(),s("success","none",v("noumena.link_noums.unlink_alert")),u(!1),l()}}),T=async()=>{n!=null&&n._id&&await o({variables:{noumLinkId:n._id}})},g=async()=>{var R;const h=(R=c.current)==null?void 0:R.handleSubmit();h&&(n!=null&&n._id)&&await M({variables:{noumLinkId:n._id,linkedNoumIDs:h}})};return p(E,{children:[t($a,{loading:q||y,handleUnlinking:()=>{n&&n.linkedNoumsCount>2?g():T()},isOpen:r,handleClose:l,description:v("noumena.link_noums.unlink_confirm_modal.description.multiple_noums"),"data-test":"HandleUnlinkNoum-UnlinkSingleNoumModal"}),t(Pa,{ref:c,linkedNoums:m,acceptUnlinking:l,handleClose:d,isOpen:f,"data-test":"HandleUnlinkNoum-UnlinkMultipleNoumModal"})]})});export{as as C,os as H,rt as I,ts as L,ns as M,ss as R,st as a,za as b,ga as c,ot as u};
//# sourceMappingURL=HandleUnlinkNoum-c385ad89.js.map
