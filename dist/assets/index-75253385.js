import{T as s,s as L,j as e,c as t,I as r,u as R,e as _,S as v,R as m,cZ as N,B as V,d5 as W,d6 as D,f as j,w as K,M as w,a1 as Y,d7 as q,b7 as Z}from"./index-cd84bcc9.js";import{C as p,bf as J,r as g,ar as Q,as as X,B as E,a9 as ee}from"./vendor-51460554.js";import{S as te,M as ae,a as ne,b as ie,I as oe,c as de,d as le,e as ce,f as B,g as re,h as se,V as ue,i as H,H as $}from"./InviteFriendSideMenuSection-cdd5da99.js";import{A}from"./index-4963229a.js";const G=64,he=p(J)`
  width: 100%;
  text-decoration: none;
  &:hover {
    path {
      fill: var(--icon-tablecell-neutral-highlighted) !important;
    }
    ${s} {
      color: var(--text-tablecell-header-neutral-highlighted);
    }
  }
`,k=p.div`
  height: ${G}px;
  box-sizing: border-box;
  width: 100%;
  min-height: 42px;
  gap: 16px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px 24px 20px 40px;
  align-items: center;
  cursor: pointer;
  @media (max-width: ${L.TABLET_L}) {
    padding-left: 16px;
    padding-right: 16px;
  }

  &:hover {
    path {
      fill: var(--icon-tablecell-neutral-highlighted) !important;
    }
    ${s} {
      color: var(--text-tablecell-header-neutral-highlighted);
    }
  }
`,Se=p.div`
  flex-grow: 6;
  &:active {
    color: var(--text-tablecell-header-neutral-highlighted);
  }
`,Me="#",O=({icon:n,label:u,onItemChange:c,active:a=!1,value:h,disabled:i=!1,to:S=Me,external:f=!1,setIsShown:o,...l})=>{const b=g.useCallback(M=>{if(i){M.preventDefault(),M.stopPropagation();return}c&&c(h,f||!1),o&&o(!1)},[i,c,o,h,f]);return e(he,{to:S,onClick:b,"data-testid":"Nav-item-container",...l,"data-test":"SideMenuItem-SideMenuItemContainer",children:t(k,{"data-test":"SideMenuItem-SideMenuItemContent",children:[n&&e(r,{"data-testid":"Nav-icon",name:n,color:a&&!i?"--icon-tablecell-neutral-highlighted":"--icon-tablecell-neutral-default",size:24,"data-test":"SideMenuItem-Icon"}),e(Se,{active:a,disabled:!!i,"data-testid":"Nav-label","data-test":"SideMenuItem-StyledLabel",children:e(s,{font:"body-l-bold",colorToken:a?"--text-tablecell-header-neutral-highlighted":"--text-tablecell-header-neutral-default","data-test":"SideMenuItem-TSpan",children:u})}),e(r,{name:"chevron_right_m",size:16,color:a&&!i?"--icon-tablecell-neutral-highlighted":"--icon-tablecell-neutral-default","data-test":"SideMenuItem-Icon"})]})})},me=({navItems:n=[],navItemsMore:u=[],onNavChange:c,handleClose:a,isUserPending:h})=>{const i=R(),S=_.LAPTOP_L,f=i.width>=S,{t:o}=Q(),l=window.location.pathname,{toggleHelpPanel:b}=D(),M=g.useMemo(()=>n.findIndex(d=>d.value===l),[n,l]),y=g.useMemo(()=>u.findIndex(d=>d.value===l),[u,l]),I=(M!==-1?M:y+3)*G,T=()=>{b()};return t(te,{"data-testid":"Side-Menu-Container","data-test":"SideMenu-SideMenuContainer",children:[t(ae,{"data-test":"SideMenu-MyAccountHeader",children:[e(ne,{"data-test":"SideMenu-MyAccount",children:e(s,{font:"heading-m-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"SideMenu-TSpan",children:o("noumena.myaccount.title")})}),i.width<=_.TABLET_L&&e(r,{name:"close_m",size:24,onClick:a,color:"--icon-tablecell-neutral-highlighted","data-test":"SideMenu-Icon"})]}),e(v,{height:24,"data-test":"SideMenu-Spacer"}),t(ie,{"data-test":"SideMenu-ScrollSection",children:[e(oe,{marginLeft:"24px",handleClick:a,paddingLeft:"16px",disabled:h,"data-test":"SideMenu-InviteFriendSideMenuSection"}),e(v,{height:24,"data-test":"SideMenu-Spacer"}),t(de,{align:"center",vertical:f,fullWidth:f,"data-test":"SideMenu-StyledStack",children:[l!==m.INVITES_FRIENDS&&e(le,{"data-test":"SideMenu-SideBorderMain",children:e(X.div,{animate:{y:I},transition:{type:"spring"},children:e(ce,{pathName:l,"data-test":"SideMenu-SideBorder"})})}),n.map(({value:d,external:C,...x})=>e(O,{"data-testid":"Side-Menu-Item",active:d===l,onItemChange:c,value:d,external:C,...x,"data-test":`SideMenu-SideMenuItem-${d}`},d)),t(k,{"data-test":"SideMenu-SideMenuItemContent",children:[e(r,{"data-testid":"Nav-icon",name:"privacy_policy_m",color:"--icon-tablecell-neutral-default",size:24,"data-test":"SideMenu-Icon"}),e(B,{"data-test":"SideMenu-StyledStaticLabel",children:e(s,{font:"body-l-bold",colorToken:"--text-tablecell-header-neutral-default","data-testid":"privacy",onClick:()=>c(N.PRIVACY,!0),"data-test":"SideMenu-TSpan",children:o("noumena.myaccount.privacy_policy")})}),e(r,{name:"chevron_right_m",color:"--icon-tablecell-neutral-default",size:16,"data-test":"SideMenu-Icon"})]}),u.map(({value:d,external:C,...x})=>e(O,{"data-testid":"Side-Menu-Item",active:d===l,onItemChange:c,value:d,external:C,...x,"data-test":`SideMenu-SideMenuItem-${d}`},d)),t(k,{"data-test":"SideMenu-SideMenuItemContent",children:[e(r,{"data-testid":"Nav-icon",name:"terms_m",color:"--icon-tablecell-neutral-default",size:24,"data-test":"SideMenu-Icon"}),e(B,{"data-test":"SideMenu-StyledStaticLabel",children:e(s,{"data-testid":"terms",colorToken:"--text-tablecell-header-neutral-default",font:"body-l-bold",onClick:()=>c(N.TERMS,!0),"data-test":"SideMenu-TSpan",children:o("noumena.myaccount.terms_of_use")})}),e(r,{name:"chevron_right_m",color:"--icon-tablecell-neutral-default",size:16,"data-test":"SideMenu-Icon"})]})]}),e(v,{height:95,"data-test":"SideMenu-Spacer"}),t(re,{"data-test":"SideMenu-SideMenuFooterLinksContainer",children:[e(se,{"data-test":"SideMenu-MenuFooterItem",children:e(V,{leftIcon:e(r,{name:"question",size:25,color:"--icon-tablecell-neutral-highlighted","data-test":"SideMenu-Icon"}),textOnly:!0,onClick:T,"data-test":"SideMenu-Button",children:e(s,{font:"body-l-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"SideMenu-TSpan",children:o("noumena.header.menu.help")})})}),e(ue,{"data-test":"SideMenu-VersionContainer",children:o("noumena.myaccount.version",{version:W.packageVersion})})]})]})]})},Ce=n=>n.replace(m.MY_ACCOUNT,""),pe=[{icon:"settings_m",label:E("noumena.myaccount.account_settings"),id:"2",value:`${m.ACCOUNT_SETTINGS}`,to:`${m.ACCOUNT_SETTINGS}`},{icon:"notifications_m",label:E("noumena.myaccount.notifications"),id:"3",value:`${m.NOTIFICATIONS_SETTINGS}`,to:`${m.NOTIFICATIONS_SETTINGS}`}],fe=[{icon:"terms_m",label:"Cookie Policy",id:"4",value:`${m.COOKIE_SETTINGS}`,to:`${m.COOKIE_SETTINGS}`}],ye=p.div`
  font-family: var(--font-family);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-body-neutral-alt-default);
`,P=p.div`
  position: relative;
  display: flex;
  ${n=>!n.$isAppUiV2&&`
  @media (min-width: ${L.LAPTOP_M}) {
    width: 1440px;
    margin: 0 auto;
  }
  `}
`,z=p.div`
  display: block;
  box-shadow: 1px 0px 0px var(--shadow-neutral-alt-default);
`,F=p.div`
  display: flex;
  @media (min-width: ${L.LAPTOP}) {
    margin-left: 36px;
  }
`,U=p.div`
  width: 100%;
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`,xe=({children:n,mobileHeader:u})=>{const{width:c}=R(),a=c>_.TABLET_L,[h,i]=g.useState(!a),{user:S,isPending:f}=j(),o=ee(),l=g.useCallback((I,T)=>{if(i(!1),T){window.open(I,"_blank");return}o(I,{replace:!1})},[o]),{flags:b}=K(),M=()=>{i(!h)};g.useEffect(()=>{i(a)},[c,a]);const y=()=>e(me,{"data-testid":"layout-left-content",onNavChange:l,navItems:pe,navItemsMore:fe,handleClose:()=>i(!1),isUserPending:f,"data-test":"MyAccount-sideMenuBar-SideMenu"});return b.newAppNavigation?e(A.Layout,{onGoBack:()=>o(-1),background:"neutral-alt",topNavbar:e(A.TopBar,{}),sideNav:e(A.SideNavigation,{}),children:t(P,{"data-testid":"layout-main",$isAppUiV2:!0,"data-test":"MyAccount-Main",children:[e(z,{"data-testid":"layout-left-content","data-test":"MyAccount-LeftContent",children:a?y():t(w,{open:h,forceHideCloseButton:!0,isFullScreen:!0,"data-test":"MyAccount-Modal",children:[" ",y()," "]})}),t(U,{"data-testid":"layout-main-content","data-test":"MyAccount-LayoutMainContent",children:[!a&&t(H,{"data-test":"MyAccount-MobileHeader",children:[e($,{"data-test":"MyAccount-HamburgerWrapper",children:e(r,{name:"menu_m",size:24,onClick:M,color:"--icon-button-neutral-default","data-test":"MyAccount-Icon"})}),e(s,{font:"body-l-bold",colorToken:"--text-appbar-neutral-default","data-test":"MyAccount-TSpan",children:u})]}),e(F,{"data-test":"MyAccount-Content",children:n})]})]})}):t(ye,{"data-testid":"layout-container","data-test":"MyAccount-Container",children:[e(Y,{isBorderRadius:!1,"data-test":"MyAccount-Header",children:e(q,{avatar:Z.getProfilePicture(S)||void 0,userName:(S==null?void 0:S.firstName)||void 0,"data-test":"MyAccount-MainHeader"})}),t(P,{"data-testid":"layout-main","data-test":"MyAccount-Main",children:[e(z,{"data-testid":"layout-left-content","data-test":"MyAccount-LeftContent",children:a?y():t(w,{open:h,forceHideCloseButton:!0,isFullScreen:!0,"data-test":"MyAccount-Modal",children:[" ",y()," "]})}),t(U,{"data-testid":"layout-main-content","data-test":"MyAccount-LayoutMainContent",children:[!a&&t(H,{"data-test":"MyAccount-MobileHeader",children:[e($,{"data-test":"MyAccount-HamburgerWrapper",children:e(r,{name:"menu_m",size:24,onClick:M,color:"--icon-button-neutral-default","data-test":"MyAccount-Icon"})}),e(s,{font:"body-l-bold",colorToken:"--text-appbar-neutral-default","data-test":"MyAccount-TSpan",children:u})]}),e(F,{"data-test":"MyAccount-Content",children:n})]})]})]})};export{xe as M,Ce as g};
//# sourceMappingURL=index-75253385.js.map
