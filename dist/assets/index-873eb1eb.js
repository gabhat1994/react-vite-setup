import{j as t,ay as it,fi as nt,at as J,hO as D,hP as st,c as m,x as M,am as X,y as U,I as S,w as rt,o as Z,aC as dt,M as ct,F as W,h as ut,i as ht,T as _,c4 as tt,au as ft,S as G,k as bt,B as R,s as mt,m as Q,ae as pt,f as Pt,u as gt,e as et,aK as Ft,n as Mt,g as St}from"./index-cd84bcc9.js";import{r as o,B as b,C as at,at as kt,au as Ct,aa as vt}from"./vendor-51460554.js";import{P as yt,u as H,C as _t,a as xt,b as At}from"./PostItem-d75f4356.js";import{S as It}from"./index-38931f83.js";import{O as $,V as lt,a as Ot,A as wt,C as Tt}from"./CreateSection-88a250eb.js";import{R as zt}from"./Radiobox-c1e62033.js";import"./ChamberActionModal-ce3fca40.js";import"./styles-1a9b9e59.js";import"./browser-f98ef106.js";import"./ChamberLeftSideBar-2a7f8e7f.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./sideNavItems-22800105.js";import"./styles-b4894a1f.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";const Bt=({totalCount:p,posts:d,fetchMore:P,networkStatus:c})=>t(it,{width:"100%",onFetchMore:P,status:nt({networkStatus:c,totalCount:p,currentCount:d.length}),grow:!0,style:{gap:"16px"},"data-test":"AllNoumPosts-Infinite",children:d.map(g=>t(yt,{data:g,"data-test":"AllNoumPosts-PostItem"},`post-item-${g._id}`))}),Et=()=>{const{setFilter:p,noumEditor2:d,isMasterNoum:P,authorFilterOptions:c,setAuthorFilterKeyword:g}=H(),[u,w]=o.useState(!1),[F,C]=o.useState(!1),[I,x]=o.useState(!1),[A,O]=o.useState(J.Desc),[h,i]=o.useState([D.Connection,D.Follower]),[n,f]=o.useState([]);o.useEffect(()=>{c.length>0&&f(c)},[c]);const y=o.useCallback((s,r)=>{const a={filter:{visibility:r}};s.length>0?s.length!==c.length&&(a.filter={...a.filter,uids:s.map(e=>e.key)}):a.filter={...a.filter,uids:[]},p(a)},[c.length,p]),v=o.useCallback(s=>{O(s.value);const r={};r.sort={column:"createdAt",operator:s.value},p(r)},[p]),V=o.useCallback(s=>{if(h.find(a=>a===s.value)){const a=h.filter(e=>e!==s.value);y(n,a),i(a)}else{const a=[...h,s.value];y(n,a),i(a)}},[y,n,h]),T=o.useCallback(s=>{const r=n.findIndex(e=>{var l;return e.value._id===((l=s==null?void 0:s.value)==null?void 0:l._id)}),a=d?r>-1?n.filter(e=>{var l;return e.value._id!==((l=s==null?void 0:s.value)==null?void 0:l._id)}):[...n,s]:[s];f(a),y(a,h)},[y,n,d,h]),E=o.useMemo(()=>{var s,r;return(r=(s=$.find(a=>a.value===A))==null?void 0:s.label)==null?void 0:r.toString()},[A]),L=o.useMemo(()=>h.length===2?"All":h.length===0?"Members":`${st(h[0])}s`,[h]),N=o.useMemo(()=>n.length>0&&n.length===c.length?b("noumena.search.filter_all"):n.map(s=>s.label).join(", "),[c.length,n]),z=o.useCallback(s=>{g==null||g(s.target.value)},[g]);return m(M,{gap:16,"data-test":"FilterPosts-Stack",children:[t(X,{hideIcons:!0,closeOnSelect:!0,placement:"bottom-end",options:$,onSelectOption:v,onOpen:()=>w(!0),onClose:()=>w(!1),isAnimation:!1,observerMinHeight:"0","data-test":"FilterPosts-Dropdown",children:({inputProps:s,inputRef:r,toggle:a})=>t(U,{readOnly:!0,inputSize:"normal",ref:r,...s,value:E,label:b("noumena.post.filter.order_label"),spellCheck:"false",rightIcon:u?t(S,{name:"chevron_up_m",size:16,color:"--icon-input-neutral-default",onClick:a,"data-test":"FilterPosts-Icon"}):t(S,{name:"chevron_down_m",color:"--icon-input-neutral-default",size:16,onClick:a,"data-test":"FilterPosts-Icon"}),"data-test":"FilterPosts-TextField"})}),t(X,{multiselect:!0,closeOnSelect:!1,hideIcons:!0,placement:"bottom-end",options:lt,onSelectOption:V,onOpen:()=>C(!0),onClose:()=>C(!1),isAnimation:!1,observerMinHeight:"0",optionsRenderer:(s,r)=>t(Ot,{handleSelectOption:r,options:s,activeItem:h,"data-test":"FilterPosts-VisibilityoptionsRenderer"}),"data-test":"FilterPosts-Dropdown",children:({inputProps:s,inputRef:r,toggle:a})=>t(U,{inputSize:"normal",readOnly:!0,ref:r,...s,value:L,label:b("noumena.post.filter.visibility_label"),spellCheck:"false",rightIcon:F?t(S,{name:"chevron_up_m",color:"--icon-input-neutral-default",size:16,onClick:a,"data-test":"FilterPosts-Icon"}):t(S,{name:"chevron_down_m",color:"--icon-input-neutral-default",size:16,onClick:a,"data-test":"FilterPosts-Icon"}),"data-test":"FilterPosts-TextField"})}),!P&&t(X,{multiselect:d,hideIcons:!1,closeOnSelect:!d,placement:"bottom-end",onOpen:()=>x(!0),onClose:()=>{g==null||g(""),x(!1)},options:c,onSelectOption:T,isAnimation:!1,observerMinHeight:"0",optionsRenderer:(s,r)=>t(wt,{options:s,handleSelectOption:r,noumEditor2:d,activeItemKeys:n.map(a=>a.key),"data-test":"FilterPosts-AuthorOptionsRenderer"}),"data-test":"FilterPosts-Dropdown",children:({inputProps:s,inputRef:r,toggle:a})=>t(U,{inputSize:"normal",ref:r,...s,value:N,onChange:z,label:b("noumena.post.filter.authors_label"),spellCheck:"false",rightIcon:I?t(S,{name:"chevron_up_m",size:16,color:"--icon-input-neutral-default",onClick:a,"data-test":"FilterPosts-Icon"}):t(S,{name:"chevron_down_m",color:"--icon-input-neutral-default",size:16,onClick:a,"data-test":"FilterPosts-Icon"}),"data-test":"FilterPosts-TextField"})})]})},q={type:"value",value:"all",key:"all_authors",label:"All"},Nt=({isOpen:p,onClose:d})=>{const{flags:{noumEditor2:P}}=rt(),{setShowFilter:c,setFilter:g,filter:u,isMasterNoum:w,authorFilterOptions:F}=H(),[C,I]=o.useState(!1),[x,A]=o.useState(""),[O,h]=o.useState(J.Desc),[i,n]=o.useState([D.Connection]),[f,y]=o.useState([]),[v,V]=o.useState(q);o.useEffect(()=>{F.length>0&&y(F)},[F]);const T=o.useCallback(()=>{c(!1),I(!1),A(""),d()},[d,c]),E=o.useCallback(e=>{C||I(!0),h(e.value)},[C]),L=o.useCallback(e=>{C||I(!0);const l=i.find(k=>k===e.value);n(l?i.filter(k=>k!==e.value):[...i,e.value])},[C,i]),N=o.useCallback(e=>{C||I(!0);const l=f.findIndex(j=>{var B;return j.value._id===((B=e==null?void 0:e.value)==null?void 0:B._id)}),k=P?l>-1?f.filter(j=>{var B;return j.value._id!==((B=e==null?void 0:e.value)==null?void 0:B._id)}):[...f,e]:[e];y(k)},[f,C,P]),z=o.useMemo(()=>{var e,l;return(l=(e=$.find(k=>k.value===O))==null?void 0:e.label)==null?void 0:l.toString()},[O]),K=o.useMemo(()=>i.length===2?"All":i.length===0?"Members":`${st(i[0])}s`,[i]),s=o.useMemo(()=>P?F.length===f.length?b("noumena.search.filter_all"):f.map(e=>Z(e.value.firstName,e.value.middleName,e.value.lastName)).join(", "):typeof v.value=="string"?b("noumena.search.filter_all"):Z(v.value.firstName,v.value.middleName,v.value.lastName),[v.value,F.length,f,P]),r=o.useCallback(()=>{const e={};F.length===f.length?e.filter={visibility:i}:f.length>0?e.filter={uids:f.map(l=>l.key),visibility:i}:e.filter={uids:[],visibility:i},e.sort={column:"createdAt",operator:O},g(e),I(!1),A(""),d()},[f,O,g,d,F,i]);o.useEffect(()=>{var e,l,k;if(u){if((e=u.filter)!=null&&e.uid){const j=F.find(B=>{var Y;return typeof B.value!="string"?((Y=u.filter)==null?void 0:Y.uid)===B.value._id:!1});V(j||q)}else V(q);n(dt((l=u.filter)==null?void 0:l.visibility)||[D.Connection]),h(((k=u.sort)==null?void 0:k.operator)||J.Desc)}},[u,F]);const a=e=>f.some(l=>l.key===e.key);return m(ct,{open:p,isFullScreen:!0,enableCloseButton:!0,testId:"chamber-filter",onClose:T,disableBackdropClick:!0,customCloseButton:t(W,{children:x?t(M,{padding:"0 16px",onClick:()=>A(""),"data-test":"MobilePostFilter-Stack",children:t(S,{name:"arrow_left_m",size:24,"data-test":"MobilePostFilter-Icon"})}):t(M,{padding:"0 16px",onClick:T,"data-test":"MobilePostFilter-Stack",children:t(S,{name:"close_m",size:24,"data-test":"MobilePostFilter-Icon"})})}),"data-test":"MobilePostFilter-Modal",children:[t(ut,{isFullScreen:!0,justifyContent:"flex-start","data-test":"MobilePostFilter-ModalHeader",children:x==="Show Posts for"?b("noumena.editor.post_visibility"):x==="Show Posts for"?b("noumena.editor.post_author"):b("noumena.chambers.filter_modal_title")}),t(ht,{maxHeight:"unset","data-test":"MobilePostFilter-ModalBody",children:x==="Show Posts for"?t(W,{children:lt.map(e=>{var l;return t(o.Fragment,{children:m(M,{gap:16,onClick:()=>L(e),padding:"20px 0",borderBottom:!0,fullWidth:!0,justify:"space-between","data-test":"MobilePostFilter-Stack",children:[t(_,{font:"body-l",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"MobilePostFilter-TSpan",children:(l=e.label)==null?void 0:l.toString()}),t(tt,{onChange:()=>L(e),icon:t(S,{name:"tick_m",size:i.includes(e.value)?24:0,color:"--icon-checkbox-neutral-alt-default","data-test":"MobilePostFilter-Icon"}),isChecked:i.includes(e.value),"data-test":"MobilePostFilter-Checkbox"})]})},e.key)})}):x==="Authors"?t(W,{children:F.map(e=>{var l,k;return t(o.Fragment,{children:m(M,{gap:16,onClick:()=>N(e),padding:"20px 0",borderBottom:!0,fullWidth:!0,justify:"space-between","data-test":"MobilePostFilter-Stack",children:[m(M,{gap:16,"data-test":"MobilePostFilter-Stack",children:[typeof e.value!="string"&&t(ft,{url:((l=e.value.profile)==null?void 0:l.profilePictureThumbnail)||void 0,size:"M","data-test":"MobilePostFilter-Avatar"}),t(_,{font:"body-l",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"MobilePostFilter-TSpan",children:(k=e.label)==null?void 0:k.toString()})]}),t(tt,{onChange:()=>N(e),icon:t(S,{name:"tick_m",size:a(e)?24:0,color:"--icon-checkbox-neutral-alt-default","data-test":"MobilePostFilter-Icon"}),isChecked:a(e),"data-test":"MobilePostFilter-Checkbox"})]})},e.key)})}):m(W,{children:[t(_,{font:"body-l-bold",colorToken:"--text-body-header-neutral-default","data-test":"MobilePostFilter-TSpan",children:b("noumena.chambers.sorting")}),t(G,{height:16,"data-test":"MobilePostFilter-Spacer"}),$.map(e=>{var l;return t(M,{fullWidth:!0,"data-test":"MobilePostFilter-Stack",children:m(M,{gap:16,onClick:()=>E(e),padding:"13px 0",borderBottom:!0,fullWidth:!0,"data-test":"MobilePostFilter-Stack",children:[t(zt,{isChecked:e.label===z,icon:t(S,{name:"radio_btn_m",size:e.label===z?12:0,color:e.label===z?"--icon-radiobutton-brand-primary-default":"--icon-radiobutton-inactive-default","data-test":"MobilePostFilter-Icon"}),"data-test":"MobilePostFilter-Radiobox"}),t(_,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"MobilePostFilter-TSpan",children:(l=e.label)==null?void 0:l.toString()})]})},e.key)}),t(G,{height:24,"data-test":"MobilePostFilter-Spacer"}),m(W,{children:[t(_,{font:"body-l-bold",colorToken:"--text-body-header-neutral-default","data-test":"MobilePostFilter-TSpan",children:b("noumena.editor.post_filtering")}),t(G,{height:16,"data-test":"MobilePostFilter-Spacer"}),m(M,{justify:"space-between",fullWidth:!0,borderBottom:!0,padding:"13px 0px",align:"center",onClick:()=>A("Show Posts for"),"data-test":"MobilePostFilter-Stack",children:[m(M,{vertical:!0,gap:4,"data-test":"MobilePostFilter-Stack",children:[t(_,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"MobilePostFilter-TSpan",children:b("noumena.editor.post_visibility")}),t(_,{colorToken:"--text-tablecell-body-neutral-default","data-test":"MobilePostFilter-TSpan",children:K})]}),t(S,{name:"chevron_right_m",size:12,"data-test":"MobilePostFilter-Icon"})]}),!w&&m(M,{justify:"space-between",fullWidth:!0,borderBottom:!0,padding:"13px 0px",align:"center",onClick:()=>A("Authors"),"data-test":"MobilePostFilter-Stack",children:[m(M,{vertical:!0,gap:4,"data-test":"MobilePostFilter-Stack",children:[t(_,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"MobilePostFilter-TSpan",children:b("noumena.editor.post_author")}),t(_,{colorToken:"--text-tablecell-body-neutral-default","data-test":"MobilePostFilter-TSpan",children:s})]}),t(S,{name:"chevron_right_m",size:12,"data-test":"MobilePostFilter-Icon"})]})]})]})}),t(bt,{justifyContent:"center","data-test":"MobilePostFilter-ModalFooter",children:C?t(R,{testId:"chamber-filter-apply-button",onClick:()=>r(),primary:!0,size:"full","data-test":"MobilePostFilter-Button",children:b("noumena.editor.post_filter_save")}):t(R,{testId:"chamber-filter-cancel-button",size:"full",primary:!0,onClick:T,"data-test":"MobilePostFilter-Button",children:b("noumena.editor.post_filter_close")})})]})},ot=at(pt)`
  width: 100%;
  padding: 16px;
`,Vt=at.div`
  box-sizing: border-box;
  display: none;
  button {
    border-radius: 16px;
    box-shadow: 0 2px 16px ${kt(Ct("--shadow-neutral-default"),.08)};
  }

  @media (max-width: ${mt.MOBILE_MAX}) {
    padding: 0 16px;
  }

  @media (max-width: ${Q.MOBILE_L_MAX}) {
    position: absolute;
    width: 100%;
    bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  @media (max-width: ${Q.MOBILE_L_MAX}) {
    position: fixed;
    padding: 0 4%;
    right: 0;
  }
  @media (max-width: ${Q.TABLET_MAX}) {
    bottom: '24px';
  }
  z-index: 2;
`,Lt=({setIsOpenFilter:p})=>{const{setShowCreate:d}=H();return t(Vt,{"data-test":"PostMobileActions-MobileBottomActionsContainer",children:m(M,{justify:"end",fullWidth:!0,gap:12,"data-test":"PostMobileActions-Stack",children:[t(R,{size:"large",neutral:!0,onClick:()=>p(!0),"data-testid":"chamber-filtering",rightIcon:t(S,{name:"align_center_m",size:24,color:"--icon-button-neutral-default","data-test":"PostMobileActions-Icon"}),"data-test":"PostMobileActions-Button"}),t(R,{onClick:()=>d(!0),size:"large",primary:!0,"data-testid":"create-chamber",leftIcon:t(S,{name:"plus_m",size:24,"data-test":"PostMobileActions-Icon"}),"data-test":"PostMobileActions-Button"})]})})},Wt=({loadingElement:p})=>{var z;const{loading:d,posts:P,setShowCreate:c,showCreate:g,space:u,isSpaceOwner:w,refetchPosts:F,networkStatus:C,fetchMore:I,totalCount:x,filter:A,setAllPostsLoading:O,isMasterNoum:h}=H(),i=o.useMemo(()=>p||d,[p,d]),{user:n,isUnregistered:f}=Pt(),y=xt(),{width:v}=gt(),[V,T]=o.useState(!1),E=o.useMemo(()=>v<=et.MOBILE_XL,[v]),L=o.useMemo(()=>v<=et.TABLET_L,[v]),N=o.useMemo(()=>h&&!w?!1:f?y("POST","CREATE","UNREGISTERED"):(w||(u==null?void 0:u.isConnected))&&(n==null?void 0:n.userStatus)===Ft.Active,[h,w,f,y,u==null?void 0:u.isConnected,n==null?void 0:n.userStatus]);return o.useEffect(()=>{(i&&P.length>0||!i)&&O(!1)},[i,P.length,O]),t(It,{showBackButton:!0,responsiveMain:!0,loading:i,"data-test":"Posts-SinglePageLayout",children:m(M,{gap:16,vertical:!0,fullWidth:!0,maxHeight:E?"calc(100% - 66px)":"unset",padding:L?"16px 0 0 0":"unset","data-test":"Posts-Stack",children:[!E&&t(ot,{"data-test":"Posts-PostCardWrapper",children:t(Et,{"data-test":"Posts-FilterPosts"})}),i?t(Mt,{"data-test":"Posts-Spinner"}):P.length>0?m(W,{children:[!E&&N&&!((z=A.filter)!=null&&z.uid)&&t(ot,{"data-test":"Posts-PostCardWrapper",children:t(Tt,{onClick:()=>c(!0),isCreatable:N??!1,isPostView:!0,"data-test":"Posts-CreateSection"})}),g&&t(_t,{spaceId:u==null?void 0:u._id,onClose:()=>c(!1),onSuccess:()=>{c(!1),F()},isMasterNoum:h,"data-test":"Posts-CreatePost"}),t(Bt,{totalCount:x,posts:P,fetchMore:I,refetch:F,networkStatus:C,"data-test":"Posts-AllNoumPosts"})]}):m(M,{fullWidth:!0,align:"center",vertical:!0,gap:16,padding:"40px 0","data-test":"Posts-Stack",children:[t(_,{font:"heading-xs-bold","data-test":"Posts-TSpan",children:b("noumena.editor.no_posts_found")}),t(_,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"Posts-TSpan",children:b("noumena.editor.no_posts_description")})]}),t(Lt,{setIsOpenFilter:T,"data-test":"Posts-PostMobileActions"}),t(Nt,{isOpen:V,onClose:()=>T(!1),"data-test":"Posts-MobilePostFilter"})]})})},oe=()=>{const{id:p}=vt(),{space:d,loadingSpace:P,loading:c}=St(p);return t(At,{space:d,"data-test":"NoumPosts-PostElementProvider",children:t(Wt,{loadingElement:P||c,"data-test":"NoumPosts-Posts"})})};export{oe as NoumPosts,oe as default};
//# sourceMappingURL=index-873eb1eb.js.map