import{m as p,s as i,z as g,j as r,n as f,c as w,F as N,I as $,x as S,R as e}from"./index-cd84bcc9.js";import{a6 as I,C as d,bf as y,ad as O}from"./vendor-51460554.js";const x=I`
  * {
    fill: ${({disabled:a})=>a?"var(--icon-main-nav-neutral-disabled)":"var(--icon-main-nav-brand-primary-selected)"} !important;
  }
`,s=d(y)`
  width: 76px;
  height: 63px;
  padding: 8px;
  color: var(--link-main-nav-neutral-default);
  text-decoration: none;
  box-sizing: border-box;
  min-width: 60px;
  min-height: 53px;
  gap: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: none;
  flex-grow: 0;
  border-radius: 8px;
  background-color: ${({active:a,disabled:t})=>a&&!t?"var(--bg-main-nav-brand-secondary-selected)":"none"};
  ${({$isNoumSideBar:a})=>a&&`
      @media (max-width: ${p.TABLET_MAX}) {
        flex-direction: row;
      }
    `}

  @media (min-width: ${i.TABLET}) {
    color: ${({active:a,disabled:t})=>a&&!t?"var(--link-main-nav-brand-primary-selected)":"var(--link-main-nav-neutral-disabled)"};
    &:hover {
      background-color: ${({disabled:a})=>!a&&"var(--bg-main-nav-brand-secondary-selected);"};
    }
  }
  @media (max-width: ${p.TABLET_MAX}) {
    width: 68px;
    height: 55px;
    padding: 4px;
  }
  @media (max-width: ${i.MOBILE_L}) {
    width: 60px;
    height: 53px;
    padding: 0px;
    background: none;
  }
  ${({disabled:a})=>a&&"cursor: not-allowed; opacity:0.5;"};
`,k=d.div`
  ${g}
  text-decoration: none;
  color: ${({active:a,disabled:t})=>a&&!t?"var(--link-main-nav-brand-primary-selected)":"var(--text-body-header-neutral-default)"};

  ${s}:hover & {
    color: ${({disabled:a})=>a?"var((--link-main-nav-neutral-default)":"var(--link-main-nav-brand-primary-selected)"};
  }
`,E=d.div`
  ${s}:hover & {
    &:first-child {
      ${x}
    }
  }
  @media (max-width: ${i.MOBILE_L}) {
    border-radius: 8px;
    background-color: ${({active:a,disabled:t})=>a&&!t&&"var(--bg-main-nav-brand-secondary-selected)"};
    ${s}:hover & {
      background-color: ${({disabled:a})=>!a&&"var(--bg-main-nav-neutral-alt-disabled)"};
      &:first-child {
        ${x}
      }
    }
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
  }
`,L="#",M=({icon:a,label:t,onItemChange:l,active:o=!1,value:c,disabled:n=!1,to:m=L,isNoumSideBar:h=!1,loading:u,...b})=>r(s,{to:m,onClick:v=>{if(n){v.preventDefault(),v.stopPropagation();return}l&&l(c)},active:o?1:0,disabled:!!n,"data-testid":"Nav-item-container",$isNoumSideBar:h,...b,"data-test":"SideNavItem-SideNavItemContainer",children:u?r(f,{"data-test":"SideNavItem-Spinner"}):w(N,{children:[a&&r(E,{active:o,disabled:!!n,"data-testid":"Nav-icon-wrapper","data-test":"SideNavItem-IconWrapper",children:r($,{"data-testid":"Nav-icon",name:a,color:o&&!n?"--icon-main-nav-brand-primary-selected":"--icon-button-neutral-default",size:24,"data-test":"SideNavItem-Icon"})}),r(k,{id:"Nav-label",active:o,disabled:!!n,"data-testid":"Nav-label","data-test":"SideNavItem-StyledLabel",children:t})]})}),_=d.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background-color: var(--bg-main-nav-neutral-alt-default);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 16px;
  z-index: 49;

  @media (min-width: ${i.MOBILE_L}) {
    padding: 12px;
  }

  @media (min-width: ${i.LAPTOP}) {
    flex-direction: column;
    position: relative;
    /* width: auto; */
    width: 100px;
    border-radius: 16px;
    padding: 12px;
  }

  ${({isNoumSideBar:a})=>a&&`@media (max-width: ${p.TABLET_MAX}) {
    top: 73px;
    height: 48px;
  }`}
`;d.div`
  @media (min-width: ${i.LAPTOP}) {
    border-radius: 16px;
    width: 100px;
  }
  cursor: pointer;
  background-color: var(--bg-main-nav-neutral-alt-default);
  max-height: 100vh;
`;d(S)`
  @media (min-width: ${i.LAPTOP}) {
    padding: 12px;
  }
  @media (max-width: ${i.LAPTOP}) {
    padding: 16px;
  }
  @media (max-width: ${i.MOBILE_L}) {
    padding: 12px 16px;
  }
`;d.div`
  display: grid;
  height: 700px;
`;d.div`
  display: grid;
  width: ${i.LAPTOP};
  margin: 0 auto;
`;d.div`
  display: grid;
  width: ${i.TABLET};
  margin: 0 auto;
`;d.div`
  display: grid;
  width: ${i.MOBILE_M};
  margin: 0 auto;
`;const P=({navItems:a=[],onNavChange:t,activeNavValue:l,isNoumSideBar:o=!1,loading:c})=>r(_,{isNoumSideBar:o,"data-test":"SideNav-Wrapper",children:a.map(({value:n,...m})=>r(M,{"data-testid":"Side-Nav-Item",active:n===l,onItemChange:t,value:n,...m,isNoumSideBar:o,loading:c,"data-test":"SideNav-SideNavItem"},O()))}),C=[{icon:"home_m",label:"Home",id:"1",value:e.HOME,to:e.HOME,disabled:!1},{icon:"groups_m",label:"Community",id:"2",value:e.COMMUNITY,to:e.COMMUNITY},{icon:"search_m",label:"Discovery",id:"3",value:e.DISCOVERY,to:e.DISCOVERY},{icon:"wallet_m",label:"Money",id:"4",value:e.MONEY,to:e.MONEY},{icon:"social_hall_m",label:"Noums",id:"5",value:e.NOUMS,to:e.NOUMS}],z=[{icon:"arrow_left_m",label:"Back",id:"1",value:"back",to:"#",disabled:!1}],U=[{icon:"arrow_left_m",label:"Post Details",id:"1",value:"back",to:"#",disabled:!1}],j=[{icon:"arrow_left_m",label:"Back",id:"1",value:e.GUEST_HOME,to:e.GUEST_HOME,disabled:!1}];export{j as G,z as N,P as S,U as a,C as s};
//# sourceMappingURL=sideNavItems-22800105.js.map
