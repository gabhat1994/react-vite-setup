import{m as z,s as ht,ae as tt,I as M,x as v,T as b,i as Ct,j as t,aC as k,_ as f,R as T,a5 as ft,c as s,F as V,y as bt,B as F,M as W,h as H,S as y,k as U,Y as xt,X as et,v as yt,aR as St,qK as Mt,qL as vt,qM as Et,qN as It,qO as Ft,au as wt,az as at,n as nt,qP as kt}from"./index-cd84bcc9.js";import{L as Z}from"./index-c8a663c0.js";import{C as u,a9 as X,b2 as j,r as C,l as Dt}from"./vendor-51460554.js";import{D as S}from"./index-022aaf3d.js";import{B as it}from"./Badge-f2e67408.js";import{M as N}from"./MultiselectField-a1e665cb.js";import{N as At}from"./NoumCard-2fa806c2.js";import{R as _t}from"./Radiobox-c1e62033.js";import{D as Tt}from"./DeleteCampaignConformation-e0814e31.js";import"./sideNavItems-22800105.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./storyblok-c16fb040.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./styles-3ceda759.js";import"./styles-26e8a352.js";import"./Pagination-43542d57.js";import"./TickCheckbox-c4d9d4b6.js";import"./Accordion-ea03839b.js";import"./useElementDimensions-84b2a778.js";import"./utils-87d126b1.js";const Nt={fullWidth:!0,align:"center",justify:"space-between"},zt=u(tt)`
  width: 100%;
  min-height: 294px;
  padding: 24px;
  @media (max-width: ${z.MOBILE_S_MAX}) {
    padding: 0;
    span {
      padding: 12px 24px;
    }
  }
`,Bt=u.div`
  padding: 16px 12px 16px 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid var(--border-card-neutral-default);
`,Lt=u.div`
  padding: 0;
  display: flex;
  justify-content: space-between;
`,Ot=u.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 22px;
  box-sizing: border-box;
`,Rt=u.div`
  width: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Pt=u(M)`
  cursor: pointer;
`,jt=u(v)``,O=u(v).attrs(Nt)``,R=u(b).attrs({colorToken:"--text-card-neutral-default",font:"footnote"})``,P=u(b).attrs({colorToken:"--text-card-neutral-default",font:"footnote"})``,Vt=u(v).attrs({fullWidth:!0,align:"center",gap:"16px",maxWidth:"580px"})`
  margin-top: 28px;
`,Wt=u(v)``,B=u(b).attrs({font:"heading-xs-bold"})``,Ht=u(v).attrs({fullWidth:!1,gap:"16px"})`
  max-width: 382px;
  @media (max-width: ${z.MOBILE_L_MAX}) {
    max-width: 100%;
    width: 100%;
  }
`,$=u(b).attrs({font:"body-l-bold"})``,Ut=u(b).attrs({font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted"})``,Xt=u(v).attrs({fullWidth:!0,align:"center",gap:"16px"})`
  height: 48px;
  box-sizing: border-box;
  padding: 12px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`,qt=u.span`
  display: none;
  @media (max-width: ${z.MOBILE_L_MAX}) {
    z-index: 55;
    position: fixed;
    display: flex;
    bottom: calc(100vh - 88vh);
    right: 16px;
    height: 56px;
    box-sizing: border-box;
    gap: 16px;
  }
`,Gt=u.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  padding: 16px;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: var(--bg-button-floating-neutral-alt-default);
`,q=u(Ct)`
  @media (max-width: ${ht.MOBILE_MAX}) {
    height: calc(100% - 10px);
    max-height: calc(100% - 10px);
  }
`,Yt=u.div`
  font-family: var(--font-footnote-regular-font);
  font-size: var(--font-footnote-regular-size);
  font-weight: var(--font-footnote-regular-weight);
  line-height: var(--font-footnote-regular-lineheight);
  width: 100%;
  max-width: 100%;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--text-tablecell-body-neutral-default);
`,Qt=u(b).attrs({font:"body-m-bold"})`
  padding-top: 5px;
  max-width: 60%;
`;function ot({campaign:a,onDelete:i}){const e=X(),r=n=>{switch(n){case"VIEW":e(j(T.CAMPAIGN_SUMMARY,{id:a._id||""}));break;case"DELETE":i({id:a._id??"",title:a.title??""});break}};return t(S.ActionsMenu,{onClick:r,menuOptions:k([{key:"view-campaign",value:"VIEW",label:"See Details",iconName:"eye_on_m"},f.canDelete((a==null?void 0:a.status)??"")?{key:"delete-campaign",value:"DELETE",label:"Delete",iconName:"delete_m",intent:"danger"}:void 0])})}function Kt({campaignName:a,noumName:i,campaignStartDate:e,campaignEndData:r,campaignStatus:n,campaign:d,onDelete:l}){const[I,g]=ft(!0);return s(Bt,{"data-test":"CollapsibleCampaignBase",children:[s(Lt,{"data-test":"CampaignHeader",children:[s(Ot,{"data-test":"Left",children:[t(Qt,{"data-test":"ListCampaignTitle",children:f.truncateString(a,20)}),t(it,{status:n,"data-test":"Badge"})]}),s(Rt,{"data-test":"Right",children:[t(ot,{campaign:d,onDelete:l,"data-test":"ActionMenu"}),t(Pt,{onClick:g,name:I?"chevron_down_m":"chevron_up_m",size:12,"data-test":"CollapseIcon"})]})]}),!I&&s(jt,{fullWidth:!0,vertical:!0,gap:8,"data-test":"CampaignBody",children:[s(O,{"data-test":"CampaignRow",children:[t(R,{"data-test":"CampaignItem",children:"Noum"}),t(P,{"data-test":"CampaignValue",children:i})]}),s(O,{"data-test":"CampaignRow",children:[t(R,{"data-test":"CampaignItem",children:"Start Date"}),t(P,{"data-test":"CampaignValue",children:e})]}),s(O,{"data-test":"CampaignRow",children:[t(R,{"data-test":"CampaignItem",children:"End Date"}),t(P,{"data-test":"CampaignValue",children:r})]})]})]})}function Jt({campaigns:a,onDelete:i}){return t(V,{children:a.map(e=>{var r;return t(Kt,{campaign:e,campaignStatus:e.status,campaignName:e.title||"",noumName:((r=e.noumId)==null?void 0:r.name)||"",campaignStartDate:f.formatDate(e.startDate),campaignEndData:e.endDate?f.formatDate(e.endDate):"-",onDelete:i,"data-test":"CampaignsCollapsibleItem"},e._id??"")})})}function Zt({hideFilters:a,onNewCampaign:i,statusOptions:e,noumsOptions:r}){return s(V,{children:[s(Wt,{vertical:a,align:a?"start":"center",justify:"space-between",gap:a?10:void 0,"data-test":"HeadingContainer",children:[t(B,{"data-test":"Heading",children:"Campaigns"}),s(Ht,{"data-test":"Actions",children:[t(S.FilterInput,{name:"search",render:({field:{value:n,onChange:d}})=>t(bt,{inputSize:"small",placeholder:"Search...",value:n,onChange:d,leftIcon:t(M,{name:"search_m",size:24,color:"--icon-input-neutral-default","data-test":"Icon"}),"data-test":"TextField"})}),!a&&t(F,{primary:!0,size:"small",leftIcon:t(M,{name:"add_m",size:24,"data-test":"Icon"}),onClick:i,"data-test":"Button",children:"New Campaign"})]})]}),!a&&s(Vt,{"data-test":"FilterContainer",children:[t(S.FilterInput,{name:"status",render:({field:{value:n,onChange:d}})=>t(N,{inputSize:"small",value:n,options:e,label:"Status",onChange:d,usePortal:!0,renderContainerFromBottom:!0,"data-test":"MultiselectField"})}),t(S.FilterInput,{name:"noums",render:({field:{value:n,onChange:d}})=>t(N,{leftIcon:t(M,{name:"search_m",size:20,color:"--icon-input-neutral-default","data-test":"Icon"}),inputSize:"small",value:n,options:r,label:"Noums",onChange:d,usePortal:!0,renderContainerFromBottom:!0,hideIcons:!1,allOptionLabel:"All Owned Noums","data-test":"MultiselectField"})})]})]})}function $t({campaigns:a,columns:i,keyExtractor:e,loading:r,onRowClick:n}){return t(S.Table,{keyExtractor:e,columns:i,data:a,loading:r,rowsPerPage:5,onRowClick:n})}const te=[{id:"1",label:"Created: Newest to Oldest",selected:!1},{id:"2",label:"Created: Oldest to Newest",selected:!1}];function ee({selected:a,onSelect:i,label:e}){return s(Xt,{onClick:i,children:[t(_t,{isChecked:a,icon:t(M,{name:"radio_btn_m",size:a?12:0,color:a?"--icon-radiobutton-brand-primary-default":"--icon-radiobutton-inactive-default","data-test":"Icon"}),"data-test":"Radiobox"}),t(Ut,{children:e})]})}function ae({open:a,onClose:i,filters:e}){const[r,n]=C.useState("1");return s(W,{open:a,onClose:i,isFullScreen:!0,children:[t(H,{children:t(B,{children:"Sorting and Filtering"})}),s(q,{children:[t($,{children:"Sorting"}),t(y,{height:16,"data-test":"Spacer"}),te.map(d=>t(ee,{label:d.label,selected:d.id===r,onSelect:()=>n(d.id),"data-test":"Sorting"},d.id)),t(y,{height:24,"data-test":"Spacer"}),t($,{children:"Filtering"}),t(y,{height:24,"data-test":"Spacer"}),e.map(d=>s("div",{style:{width:"100%"},onClick:d.onClick,children:[s(v,{fullWidth:!0,justify:"space-between",maxWidth:"100%","data-test":"Stack",children:[s(v,{vertical:!0,maxWidth:"90%","data-test":"Stack",children:[t(b,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"TSpan",children:d.label}),t(Yt,{children:d.value})]}),t(M,{name:"chevron_small_right_m",size:24,"data-test":"Icon"})]}),t(y,{height:16,"data-test":"Spacer"})]},d.key))]}),t(U,{justifyContent:"center",children:t(F,{style:{width:"100%"},primary:!0,onClick:i,"data-test":"Button",children:"Close"})})]})}function ne({onToggleFilter:a,onNewCampaign:i}){return s(qt,{"data-test":"ActionContainer",children:[t(Gt,{"data-test":"ActionFilter",children:t(F,{size:"large",neutral:!0,onClick:a,"data-testid":"campaign-filtering",rightIcon:t(M,{name:"align_center_m",size:24,color:"--icon-button-neutral-default","data-test":"Icon"}),"data-test":"Button"})}),t(F,{size:"large",primary:!0,"data-testid":"create-chamber",onClick:i,leftIcon:t(M,{name:"plus_m",size:24,color:"--icon-button-neutral-alt-default","data-test":"Icon"}),"data-test":"Button"})]})}function ie({onDelete:a}){var G,Y,Q,K;const i=xt(),e=et(),r=yt(),n=St(),{updateFilterState:d,offset:l,...I}=Mt(),g=vt({fetchPolicy:"cache-and-network",onError:o=>i.logError(o,"campaign-filters",!0),variables:{input:{settingsType:Et.AdCampaignStatus}}}),x=It({fetchPolicy:"cache-and-network",onError:o=>i.logError(o,"campaign-list",!0),variables:{offset:l,limit:e.isMobile?7:8,filter:f.mapFilter(I)}}),[A,{loading:c}]=Ft({onError:o=>i.logError(o,"list-delete-campaign",!0),onCompleted:({deleteAdCampaign:o})=>{o!=null&&o.isDeleted&&(n.closeModal(),r.addSuccessIconToast("Campaign has been deleted"),g.refetch(),x.refetch(),a==null||a())}}),_=C.useCallback(o=>{if(!(o!=null&&o.id)){r.addErrorToast("Campaign not found");return}A({variables:{campaignId:o.id}})},[A,r]),w=C.useMemo(()=>{var o;return k((o=g==null?void 0:g.data)==null?void 0:o.noums).map(p=>{var h,m,E,D;return{key:((h=p==null?void 0:p.noumId)==null?void 0:h._id)||"",value:((m=p==null?void 0:p.noumId)==null?void 0:m._id)||"",label:((E=p==null?void 0:p.noumId)==null?void 0:E.name)||"",icon:t(wt,{url:((D=p==null?void 0:p.noumId)==null?void 0:D.profileImage)||at,size:"M","data-test":"noumsOptions-Avatar"}),type:"value"}})},[g==null?void 0:g.data]),L=C.useMemo(()=>{var o,p,h;return(h=k((p=(o=g==null?void 0:g.data)==null?void 0:o.status)==null?void 0:p.settingsValue))==null?void 0:h.map(m=>({key:m,value:m,label:f.capitalizeFirstLetter(m),type:"value"}))},[g==null?void 0:g.data]),lt=C.useCallback(()=>{n.openModal("noum-filter",w)},[n,w]),rt=C.useCallback(()=>{n.openModal("status-filter",L)},[n,L]),st=C.useCallback(()=>{n.closeModal(),n.openModal("sort-filter")},[n]),dt=C.useCallback(()=>{n.openModal("sort-filter")},[n]),ct=C.useCallback(o=>{n.openModal("delete-confirmation",o)},[n]),pt=o=>{var p,h;return k((h=(p=g.data)==null?void 0:p.noums)==null?void 0:h.map(m=>{var E,D,J;if((E=m==null?void 0:m.noumId)!=null&&E._id&&o.includes((D=m==null?void 0:m.noumId)==null?void 0:D._id))return(J=m==null?void 0:m.noumId)==null?void 0:J.name}))},ut=o=>{var p,h,m;return k((m=(h=(p=g.data)==null?void 0:p.status)==null?void 0:h.settingsValue)==null?void 0:m.map(E=>{if(E&&o.includes(E))return f.capitalizeFirstLetter(E)}))},mt=o=>{d({offset:o})},gt=o=>{const{search:p,noums:h,status:m}=o;d({search:p,noums:h,status:m})};return{Modal:{...n,openNoumFilter:lt,openStatusFilter:rt,closeFilterModal:st,openSortAndFilter:dt,openDeleteConfirmationModal:ct},Campaign:{isDeleting:c,softDelete:_,list:k((Y=(G=x==null?void 0:x.data)==null?void 0:G.getAdCampaignsByUser)==null?void 0:Y.data),loading:x.loading,count:((K=(Q=x==null?void 0:x.data)==null?void 0:Q.getAdCampaignsByUser)==null?void 0:K.count)??0},Filter:{value:I,update:gt,loading:g.loading,mapNoumFilter:pt,mapStatusFilter:ut},Offset:{value:l,update:mt},Dropdown:{noum:w,status:L}}}function oe({open:a,onClose:i,dropDownOptions:e,title:r}){return s(W,{open:a,forceHideCloseButton:!0,onClose:i,isFullScreen:!0,children:[t(y,{height:40,"data-test":"Spacer"}),t(H,{children:t(B,{children:r})}),s(q,{children:[t(y,{height:16,"data-test":"Spacer"}),t(S.FilterInput,{name:"noums",render:({field:{value:n,onChange:d}})=>t(N,{leftIcon:t(M,{name:"search_m",size:20,color:"--icon-input-neutral-default","data-test":"Icon"}),inputSize:"small",value:n,options:e,label:"Noums",onChange:d,isOpen:!0,"data-test":"MultiselectField"})})]}),t(U,{justifyContent:"center",children:t(F,{style:{width:"100%"},primary:!0,onClick:i,"data-test":"Button",children:"Save Filter"})})]})}function le({open:a,onClose:i,dropDownOptions:e}){return s(W,{open:a,isFullScreen:!0,forceHideCloseButton:!0,children:[t(y,{height:40,"data-test":"Spacer"}),t(H,{children:t(B,{children:"Status"})}),s(q,{children:[t(y,{height:16,"data-test":"Spacer"}),t(S.FilterInput,{name:"status",render:({field:{value:r,onChange:n}})=>t(N,{inputSize:"small",value:r,options:e,label:"Status",onChange:n,isOpen:!0,"data-test":"MultiselectField"})})]}),t(U,{justifyContent:"center",children:t(F,{style:{width:"100%"},primary:!0,onClick:i,"data-test":"Button",children:"Save Filter"})})]})}const re=()=>{const a=et(),i=X(),{Filter:e,Dropdown:r,Campaign:n,Offset:d,Modal:l}=ie({}),I=C.useMemo(()=>[{id:"name",title:"Name",renderValue:c=>t(b,{font:"body-m-bold","data-test":"CampaignEntries-columns-TSpan",children:f.truncateString(c.title||"",37)})},{id:"status",title:"Status",renderValue:c=>t(it,{status:c.status??"In Review","data-test":"CampaignEntries-columns-Badge"})},{id:"noum",title:"Noum",renderValue:c=>{var _,w;return t(At,{name:((_=c.noumId)==null?void 0:_.name)||"",image:((w=c.noumId)==null?void 0:w.profileImage)??at,"data-test":"CampaignEntries-columns-NOUMCard"})}},{id:"startDate",title:"Start Date",renderValue:c=>t(b,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"CampaignEntries-columns-TSpan",children:f.formatDate(c.startDate)})},{id:"endDate",title:"End Date",renderValue:c=>t(b,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"CampaignEntries-columns-TSpan",children:c.endDate?f.formatDate(c.endDate):"-"})},{id:"action",title:"",renderValue:c=>s(v,{justify:"end","data-test":"CampaignEntries-columns-Stack",children:[t(ot,{campaign:c,onDelete:l.openDeleteConfirmationModal,"data-test":"CampaignEntries-columns-ActionMenu"}),","]})}],[l.openDeleteConfirmationModal]),g=C.useMemo(()=>Dt.debounce(c=>{d.update(0),e.update(c)},500),[e,d]),x=C.useCallback(()=>{i(j(T.CAMPAIGN_CREATE,{id:"new"}))},[i]),A=C.useCallback(c=>{i(j(T.CAMPAIGN_SUMMARY,{id:c._id||""}))},[i]);return t(V,{children:e.loading?t(nt,{"data-test":"CampaignEntries-Spinner"}):t(zt,{"data-test":"CampaignEntries-Wrapper",children:t(S.Provider,{data:[],children:s(S.Filters,{defaultValues:{status:[...e.value.status.map(f.mapItem)],noums:[...e.value.noums.map(f.mapItem)],search:e.value.search},onSubmit:g,clearRowSelectionOnSubmit:!0,children:[t(Zt,{statusOptions:r.status,noumsOptions:r.noum,hideFilters:a.isMobile,onNewCampaign:x,"data-test":"CampaignEntries-CampaignHeader"}),t(y,{height:24,"data-test":"CampaignEntries-Spacer"}),a.isMobile&&t(Jt,{campaigns:n.list,onDelete:l.openDeleteConfirmationModal,"data-test":"CampaignEntries-CampaignsCollapsibleList"}),!a.isMobile&&t($t,{keyExtractor:c=>c._id??"",campaigns:n.list,columns:I,loading:n.loading||e.loading,onRowClick:A,"data-test":"CampaignEntries-CampaignTable"}),t(y,{height:24,"data-test":"CampaignEntries-Spacer"}),t(S.Footer,{leftElement:t(S.Pagination,{totalCount:n.count,itemsPerPage:8,onChange:({offset:c})=>d.update(c),currentOffset:d.value})}),a.isMobile&&t(y,{height:145,"data-test":"CampaignEntries-Spacer"}),t(ne,{onToggleFilter:l.openSortAndFilter,onNewCampaign:x,"data-test":"CampaignEntries-MobileActions"}),t(ae,{open:l.modalType==="sort-filter",onClose:l.closeModal,filters:[{key:"noum-filter",label:"Noum",value:e.value.noums.length&&e.value.noums.length!==r.noum.length?e.mapNoumFilter(e.value.noums).join(", "):"All",onClick:l.openNoumFilter},{key:"status-filter",label:"Status",value:e.value.status.length&&e.value.status.length!==r.status.length?e.mapStatusFilter(e.value.status).join(", "):"All",onClick:l.openStatusFilter}],"data-test":"CampaignEntries-SortingAndFiltering"}),t(Tt,{open:l.modalType==="delete-confirmation",onClose:l.closeModal,onDelete:n.softDelete,actionButtonLoading:n.isDeleting,campaign:l.contextData&&Array.isArray(l.contextData)?null:l.contextData,"data-test":"CampaignEntries-DeleteCampaignConfirmation"}),t(oe,{open:l.modalType==="noum-filter",dropDownOptions:l.contextData&&Array.isArray(l.contextData)?l.contextData:[],title:l.modalType==="noum-filter"?"Noum":"Status",onClose:l.closeFilterModal,"data-test":"CampaignEntries-NoumFilter"}),t(le,{open:l.modalType==="status-filter",dropDownOptions:l.contextData&&Array.isArray(l.contextData)?l.contextData:[],onClose:l.closeFilterModal,"data-test":"CampaignEntries-StatusFilter"})]})})})})},se=u(tt)`
  width: 100%;
  min-height: 294px;
  box-sizing: border-box;
  padding: 24px;
  gap: 24px;
  @media (max-width: ${z.MOBILE_XL_MAX}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
  }
`,de=()=>{const a=X();return s(se,{"data-test":"EmptyCampaign-Wrapper",children:[t("header",{"data-test":"EmptyCampaign-header",children:t(b,{font:"heading-xs-bold","data-test":"EmptyCampaign-TSpan",children:"Campaigns"})}),s(v,{fullWidth:!0,vertical:!0,align:"center",gap:22,"data-test":"EmptyCampaign-Stack",children:[t(M,{name:"ads_m",size:96,"data-test":"EmptyCampaign-Icon"}),t(b,{font:"body-l",colorToken:"--text-placeholder-neutral-default","data-test":"EmptyCampaign-TSpan",children:"You haven’t started any campaigns yet."}),t(F,{onClick:()=>a(T.CAMPAIGN_CREATE),primary:!0,size:"small",leftIcon:t(M,{name:"add_m",size:24,"data-test":"EmptyCampaign-Icon"}),"data-test":"EmptyCampaign-Button",children:"New Campaign"})]})]})},Te=()=>{var e,r;const a=kt({fetchPolicy:"cache-and-network"}),i=!!((r=(e=a.data)==null?void 0:e.getAdCampaignsByUser)!=null&&r.count);return a.loading?t(Z,{type:"Campaigns","data-test":"CampaignManager-ListLayout",children:t(nt,{"data-test":"CampaignManager-Spinner"})}):s(Z,{type:"Campaigns","data-test":"CampaignManager-ListLayout",children:[!i&&t(de,{"data-test":"CampaignManager-EmptyCampaign"}),i&&t(re,{"data-test":"CampaignManager-CampaignEntries"})]})};export{Te as default};
//# sourceMappingURL=CampaignManager-7484a3d8.js.map
