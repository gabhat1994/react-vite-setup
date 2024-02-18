import{a6 as r,C as a,at as p,au as s,bf as x}from"./vendor-51460554.js";import{fu as c,f7 as m,s as t,fv as e,m as d,b2 as h,eP as g,dc as u,B as b,x as n,ae as l,T as o}from"./index-cd84bcc9.js";r`
  width: calc(33.33% - 14px);
  margin-right: 20px !important;
  :nth-of-type(3n) {
    margin-right: 0 !important;
  }
`;r`
  width: calc(25% - 15px);
  margin-right: 20px;
  :nth-of-type(4n) {
    margin-right: 0;
  }
`;a.div`
  height: 600px;
`;a.div`
  ${c};
  align-items: flex-start;
  flex: 1;
  gap: 16px;
`;const v=a.div`
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 12px 0;
  overflow-x: auto;
  gap: 12px;
  ${m}
  div :first-child {
    margin-left: 0;
  }

  @media (min-width: ${t.LAPTOP_M}) {
    flex-wrap: nowrap;
  }

  label {
    width: 100%;
    input {
      display: none;
    }
    div {
      margin: 0;
    }
  }
  svg path {
    fill: var(--icon-input-neutral-default);
  }
  span {
    display: inline-flex;
    gap: 12px;
  }
  @media (max-width: ${e}) {
    span {
      display: none;
    }
  }

  @media (max-width: ${t.MOBILE_MAX}) {
    width: 100%;
    overflow: scroll;
    padding: 16px 0;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    form {
      ::-webkit-scrollbar {
        display: none;
      }
    }
  }
`,y=a.div`
  width: 288px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${e}) {
    display: none;
  }
`,$=a.div`
  margin-top: 8px;
  @media (max-width: ${t.LAPTOP}) {
    width: 100%;
  }
  @media (max-width: ${t.MOBILE_MAX}) {
    width: calc(100vw - 32px);
    padding: 0 16px;
  }
`,L=a.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: ${t.TABLET}) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media (max-width: ${t.MOBILE_MAX}) {
    width: 100vw;
  }
`,A=a.div`
  width: 100%;
  @media (min-width: ${e}) {
    display: none;
  }
`,T=a.div`
  position: relative;
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 16px;
  cursor: default;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  background: var(--bg-card-neutral-alt-default);
  background-size: cover;

  ${i=>!i.isLoading&&"button div { background-color: var(--bg-badge-brand-primary-default); border: none;}"}

  button {
    height: 42px;
    min-height: 42px;
  }

  @media (max-width: ${t.MOBILE_MAX}) {
    padding: 16px;
    margin: 0 16px;
  }

  @media (min-width: ${e}) {
    display: none;
  }
`,k=a.span`
  align-items: center;
  @media (max-width: ${e}) {
    display: none;
  }
`,M=a.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  text-align: center;
  @media (max-width: ${t.MOBILE_MAX}) {
    padding: 0;
  }
`,B=a.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  padding: 16px;
  .ellipsis-menu {
    width: 56px;
  }
`,C=a.div`
  box-sizing: border-box;
  display: none;
  button {
    border-radius: 16px;
    box-shadow: 0 2px 16px ${p(s("--shadow-neutral-default"),.08)};
  }

  @media (max-width: ${t.MOBILE_MAX}) {
    padding: 0 16px;
  }

  @media (max-width: ${e}) {
    position: absolute;
    width: 100%;
    bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  @media (max-width: ${d.LAPTOP_MAX}) {
    position: fixed;
    padding: 0 4%;
    right: 0;
  }
  @media (max-width: ${d.TABLET_MAX}) {
    bottom: ${i=>i.isAppUiV2?"24px":"100px"};
  }
  z-index: 2;
`,E=a(b)`
  border-radius: 16px;
  box-shadow: 0 2px 16px ${p(s("--shadow-neutral-default"),.08)}; ;
`,_=a.span`
  display: ${({show:i})=>i?"block":"none"};
  position: absolute;
  width: 8px;
  height: 8px;
  top: 15px;
  right: 83px;
  background: var(--bg-badge-danger-primary-default);
  border: 2px solid var(--border-badge-neutral-alt-default);
  border-radius: 1000px;
  @media (max-width: ${d.MOBILE_L_MAX}) {
    right: 100px;
  }
`,S=a.div`
  @media (min-width: ${t.LAPTOP_L}) {
    width: 912px;
  }
`,O=a(n)`
  width: 100%;
  ${i=>!i.isAppUiV2&&`
  @media (min-width: ${t.TABLET_L}) and (max-width: ${t.LAPTOP_L}) {
    width: calc(100vw - 480px);
    max-width: 924px;
  }
  @media (min-width: ${t.TABLET}) and (max-width: ${t.TABLET_L}) {
    width: calc(100vw - 32px);
  }
  @media (min-width: ${t.LAPTOP_L}) {
    width: calc(100vw - 516px);
    max-width: 924px;
  }
  @media (min-width: ${t.DESKTOP}) {
    max-width: 924px;
  }
  @media (max-width: ${t.TABLET_L}) {
    padding-bottom: 95px;
  }
  `}
`,P=a(l)`
  border-radius: 0;
  flex: 1;

  @media ${h.TABLET} {
    border-radius: 16px;
  }
  @media (max-width: ${d.MOBILE_L_MAX}) {
    padding: 0 16px;
  }
`,I=a(n)`
  position: relative;
  padding: 5px;
  @media (max-width: ${t.LAPTOP_M}) {
    padding: 8px;
    height: 24px;
    width: 24px;
  }
`,X=a.div`
  width: 100%;
`,j=a(o)`
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
`,z=a.div`
  position: absolute;
  top: 10px;
  right: 10px;
  border: 2px solid var(--border-badge-neutral-alt-default);
`,D=a.div`
  position: relative;
`,N=a.div`
  background-color: ${({bgColor:i})=>i};
  color: ${({color:i})=>i};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 8px;
  min-height: 22px;
  font-weight: var(--font-body-small-bold-weight);
  font-size: var(--font-body-medium-size);
  text-align: center;
`,H=a.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`,V=a(n)`
  border-radius: 16px;
  background: var(--bg-tablecell-neutral-alt-default);
  @media (max-width: ${d.MOBILE_L_MAX}) {
    width: 100vw;
  }
`,W=a(o)`
  display: flex;
  ${({isMobile:i})=>i&&"flex-direction:column "};
  ${({gap:i})=>i&&`gap: ${i}px`};
  ${({isTurncate:i})=>i&&r`
      display: inline-block;
      width: 118px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`,F=a.div`
  background-color: ${({bgColor:i})=>i};
  color: ${({color:i})=>i};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 6px;
  height: 22px;
  ${g.footnoteTypography.footnoteBold}
`,R=a(n)`
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
  cursor: pointer;
`,U=a(x)`
  text-decoration: none;
  width: 100%;
`,q=a.div`
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
  display: flex;
  gap: 12px;
  padding: 12px;
  align-items: center;
`,K=a.div`
  padding: 12px;
  &:hover {
    background: var(--bg-card-neutral-alt-default);
  }
`;a.div`
  background-color: ${({bgColor:i})=>i};
  color: ${({color:i})=>i};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 8px;
  min-height: 22px;
  ${u}
`;const G=a.div`
  min-width: 100%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`,J=a(o)`
  padding: 12px;
  margin: auto;
`,Q=a(n)`
  overflow-x: auto;
  overflow-y: hidden;
  width: -webkit-fill-available;
  ::-webkit-scrollbar {
    display: none;
  }
`;a(n)`
  padding: 0px 10px;
`;const Y=a.div`
  display: inline-flex;
  gap: 16px;
  padding: 12px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  ${({intent:i})=>i==="danger"&&"svg path { fill: var(--bg-button-danger-primary-default)};"}

  &:hover {
    background-color: var(--bg-tablecell-neutral-hover);
  }
`,Z=a(l)`
  height: 50px;
  width: 147px;
`,aa=a.div`
  @media (max-width: ${t.MOBILE_MAX}) {
    margin-left: 10px;
  }
  margin-left: -6px;
`,ia=a(o)`
  text-transform: capitalize;
`;export{z as A,P as C,$ as E,_ as F,D as I,K as L,C as M,Y as O,M as P,I as R,y as S,N as T,v as a,k as b,E as c,B as d,T as e,j as f,F as g,G as h,J as i,V as j,W as k,ia as l,Q as m,U as n,q as o,R as p,H as q,O as r,X as s,L as t,A as u,aa as v,S as w,Z as x};
//# sourceMappingURL=styles-d2f9f396.js.map
