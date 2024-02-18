import{u as B,e as M,g as T,j as a,b2 as s,m as u,x as $,f as b,w as A,R as C,a1 as v,d9 as P,c as N,d7 as w,b7 as _}from"./index-cd84bcc9.js";import{a9 as x,aa as E,bc as H,r as S,aB as y,C as m}from"./vendor-51460554.js";import{C as I}from"./ChamberLeftSideBar-2a7f8e7f.js";import{S as O}from"./index-2d186805.js";import{S as R,N as k,a as U}from"./sideNavItems-22800105.js";import{L as j}from"./styles-b4894a1f.js";import{A as l}from"./index-4963229a.js";const G=({loading:e})=>{const t=x(),{id:d}=E(),[c]=H(),{width:n}=B(),g=S.useMemo(()=>n<=M.TABLET_L,[n]),{pathname:i}=y(),o=S.useMemo(()=>i.startsWith("/post/"),[i]),p=c.get("noumId")??"",{space:r}=T(o?p:d),h=[{icon:"arrow_left_m",label:`${r==null?void 0:r.name} All Posts`,id:"1",value:"back",to:"#",disabled:!1}];return a(O,{"data-test":"NoumLeftSideBar-StickyContainer",children:a(j,{noumEditor2:!0,"data-test":"NoumLeftSideBar-LeftSideBarContainer",children:a(R,{onNavChange:L=>{t(L==="back"?-1:L)},navItems:g?o?U:h:k,activeNavValue:"",isNoumSideBar:!0,loading:e,"data-test":"NoumLeftSideBar-SideNav"})})})},F=m.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;

  @media ${s.TABLET} {
    ${({hasPadding:e})=>e&&"padding: 0 16px;"}
  }

  @media ${s.LAPTOP} {
    ${({hasPadding:e})=>e&&"padding: 0 40px;"}
  }

  @media ${s.LAPTOP_L} {
    width: ${u.LAPTOP_L_MIN};
  }
`,W={Container:F};function D({children:e,noPadding:t=!1,...d}){return a(W.Container,{hasPadding:!t,...d,children:e})}const z=m.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-body-neutral-alt-highlighted);
`,X=m.div`
  display: grid;
  justify-content: center;
  gap: 0;

  @media ${s.MOBILE_S} {
    padding: 0;
  }

  @media ${s.LAPTOP} {
    padding: 24px 40px 55px;
  }
  @media (max-width: ${u.TABLET_MAX}) {
    padding-top: 48px;
  }

  @media (min-width: ${u.LAPTOP_MIN}) {
    grid-template-columns: auto 783px;
    grid-column-gap: 0;
  }
  @media (max-width: ${u.TABLET_MAX}) and (min-width: ${u.MOBILE_S_MIN}) {
    grid-template-columns: 1fr;
  }
`,V=m($).attrs(()=>({grow:1,vertical:!0,align:"stretch",justify:"stretch"}))`
  height: 100%;
  overflow-y: hidden;
`,q=m(D)`
  padding: 16px 0 32px;

  @media ${s.TABLET} {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media ${s.LAPTOP} {
    padding-left: 40px;
    padding-right: 40px;
  }
`,f={Container:z,Main:X,FullHeightMain:V,ResponsiveMain:q},J=({children:e,showBackButton:t=!1,responsiveMain:d=!1,loading:c})=>{const{pathname:n}=y(),g=x(),{user:i,isUnregistered:o,isUnauthenticated:p}=b(),r=S.useMemo(()=>n.startsWith("/post/")||n.startsWith("/posts/"),[n]),{flags:h}=A();return h.newAppNavigation?a(l.Layout,{onGoBack:()=>g(o?C.GUEST_HOME:-1),topNavbar:o?a(v,{isBorderRadius:!1,"data-test":"SinglePageLayout-Header",children:a(P,{leftNavButton:!0,"data-test":"SinglePageLayout-GuestHeader"})}):a(l.TopBar,{}),sideNav:a(l.SideNavigation,{}),children:d?a(l.MainContent,{children:e}):e}):N(f.Container,{"data-testid":"single-page-layout-container",children:[p?null:a(v,{isBorderRadius:!1,"data-test":"SinglePageLayout-Header",children:o?a(P,{leftNavButton:!0,"data-test":"SinglePageLayout-GuestHeader"}):a(w,{avatar:_.getProfilePicture(i)||void 0,userName:(i==null?void 0:i.firstName)||void 0,"data-test":"SinglePageLayout-MainHeader"})}),t?N(f.Main,{"data-testid":"single-page-layout-main",children:[t&&r?a(G,{loading:c,"data-test":"SinglePageLayout-NoumLeftSideBar"}):a(I,{"data-test":"SinglePageLayout-ChamberLeftSideBar"}),e]}):e]})},{ResponsiveMain:ia,FullHeightMain:sa}=f,na=J;export{sa as F,ia as R,na as S,D as a};
//# sourceMappingURL=index-38931f83.js.map
