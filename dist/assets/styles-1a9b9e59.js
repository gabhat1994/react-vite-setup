import{C as t,a6 as i}from"./vendor-51460554.js";import{b2 as d,s as e,dS as p,eh as n,dR as s,ei as x,ae as h,T as r,B as o}from"./index-cd84bcc9.js";t.span`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;const m=t(h)`
  border-radius: 0;
  position: relative;
  ${({noumEditor2:a})=>a&&"padding: 0px !important;"}
  padding: 16px;

  @media ${d.LAPTOP} {
    border-radius: 16px;
    ${({noumEditor2:a})=>a&&"padding: 0px !important;"}
    padding: 24px;
  }
  @media ${d.TABLET} {
    border-radius: 16px;
  }
  ${({isBackground:a})=>a&&"background: none !important;;"}
  ${({isVisible:a})=>!a&&"background-color: var(--bg-card-neutral-alt-hidden);"}
  ${({isPostCustomPreview:a})=>a&&"overflow: visible; background-color: var(--bg-card-neutral-alt-hidden);"}
  ${({isHighlight:a})=>a&&"animation-name: highlightElement; animation-duration: 10s; animation-delay:5s;"}

  @keyframes highlightElement {
    from {
      border: 1px solid #663fba;
      box-shadow: 0px 0px 0px 4px #e9e2fe;
      -moz-box-shadow: 0px 0px 0px 4px #e9e2fe;
      -webkit-box-shadow: 0px 0px 0px 4px #e9e2fe;
    }
    to {
      border: none;
      box-shadow: unset;
      -moz-box-shadow: unset;
      -webkit-box-shadow: unset;
    }
  }
  ${({isContent:a})=>a&&"border-radius: 0px !important;"}
`,b=t.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`,f=t.div`
  position: relative;
  width: 100%;
`,v=t.div`
  display: inline-flex;
  gap: 12px;
  justify-content: ${a=>a.isEditing?"space-between":"flex-start"};
  cursor: ${a=>a.isCollapseDisabled?"default":"pointer"};
  width: ${({fullWidth:a})=>a?"100%":"auto"};
  align-items: center;
  @media (max-width: ${e.TABLET}) {
    height: unset;
    padding: 3px;
  }
  @media (max-width: ${e.MOBILE_MAX}) {
    ${a=>a.isPostCustomPreview&&"flex-direction: column"};
  }
`,w=t.div`
  svg path {
    fill: var(--icon-button-danger-secondary-default);
  }
`,$=t.div`
  svg path {
    fill: var(--icon-button-neutral-default);
  }
`,y=t.div`
  display: inline-flex;
  gap: 7px;
  @media (max-width: ${e.TABLET}) {
    align-self: flex-start;
  }
`,T=t.div`
  display: inline-flex;
  @media (max-width: ${e.TABLET}) {
    height: 40px;
    align-items: center;
  }
`,B=t.div`
  text-align: center;
  height: ${({height:a})=>a?"257px":"max-content"};
  width: ${({width:a})=>a?`${a}px`:"303px"};
`,C=t.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`,W=t(r)`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 80px;
  left: calc(50% - 80px / 2);
  bottom: -1px;
  background: var(--bg-button-neutral-alt-default);
  border: 1px solid var(--bg-separator-neutral-default);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  color: var(--text-button-brand-primary-default);
  cursor: pointer;
  padding: 8px;
  gap: 8px;
`,k=t.div`
  position: absolute;
  width: 100%;
  height: 68px;
  left: 0;
  bottom: 0px;
  background: var(--gradient-base-overlay-default);
`,L=t.span`
  margin-top: ${({isPostCustomPreview:a,noumEditor2:l})=>a||l?"0px":"16px"};
  border-radius: 8px;
  border: ${({isBorder:a})=>a?"1px solid var(--bg-separator-neutral-default)":"none"};
  justify-self: end;
  align-self: flex-end;
  ${({isEditor:a})=>a?i`
          max-height: 100%;
        `:""};
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
  ${a=>a.collapse&&a.height&&a.width?a.isEditor?a.isEditing?i`
            height: 100%;
          `:i`
            max-height: 150px;
            width: 100%;
          `:i`
            opacity: ${a.collapse&&!a.preview,"1"};
            min-height: ${a.height}px;
            width: 117px;
            height: 40px;
            padding: 12px 0;
            margin-top: -60px;
          `:"width: 100%;"};
  ${({isVisible:a})=>!a&&"opacity: 0.4;"}
`,E=t.div`
  cursor: pointer;
  opacity: ${a=>a.disabled?"0.2":"1"};
  &.xs-hidden {
    ${p}
  }
`,A=t.div`
  padding: 4px 8px;
  color: var(--text-body-header-neutral-default);
  outline: 1px solid var(--border-card-neutral-highlighted);
  outline-offset: -2px;
  border-radius: 8px;
  ${n.headingXSmallBold}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 145px;
  @media (min-width: ${e.MOBILE_L}) {
    max-width: 250px;
  }
  @media (min-width: ${e.TABLET_L}) {
    max-width: initial;
  }
`,M=t.div`
  padding: ${({noumEditor2:a})=>a?"16px":"4px 8px"};
`,H=t.div`
  max-width: 300px;
  @media (min-width: ${e.MOBILE_L}) {
    max-width: 300px;
  }
  @media (min-width: ${e.TABLET_L}) {
    max-width: initial;
  }
  ${a=>a.rightPadding&&a.collapse&&`padding-right:${a.rightPadding}`};
  ${s}
  ${a=>a.showFullTitle&&"white-space: normal"};
`,I=t(r)``,g=i`
  background-color: var(--bg-body-neutral-alt-highlighted);
  pointer-events: none;
  cursor: not-allowed;
  :hover,
  :active {
    background-color: var(--bg-body-neutral-alt-highlighted);
  }
`,S=t.div`
  padding: 8px;
  cursor: pointer;
  background-color: var(--bg-button-neutral-default);
  border-radius: 8px;
  ${n.headingXSmallBold};
  ${a=>!a.showCollapseBtn&&"display: none"};
  ${a=>a.isCollapseDisabled&&g}
  :hover {
    background-color: var(--bg-button-neutral-alt-hover);
  }
`,_=t(o)`
  padding: 8px;
  margin-left: 8px;
  z-index: 9;
`,O=t(o)`
  padding: 8px;
  margin-left: 8px;
`,P=t(o)`
  padding: 8px;
  ${({noumEditor2:a})=>a&&"margin-right: 16px;"};
`;t.div`
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: center;
  min-height: 40px;
`;t.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;const j=t.div`
  background: var(--bg-tag-neutral);
  display: flex;
  gap: 5px;
  padding: 8px;
  border-radius: 8px;
  @media (max-width: ${e.MOBILE_MAX}) {
    padding: 8px 0px;
  }
`,z=t.div`
  &[data-title]:hover::after {
    content: attr(data-title);
    position: absolute;
    background-color: var(--bg-tooltip-neutral-default);
    color: var(--text-tooltip-neutral-alt-default);
    padding: 6px 8px;
    border-radius: 4px;
    width: 433px;
    top: -20px;
    right: 1px;
    ${x.systemInfoSmall}
    @media (max-width: ${e.MOBILE_MAX}) {
      width: auto;
      top: 30px;
    }
  }
`,X=t.div`
  padding: 16px 16px 0 16px;
`;export{B as C,C as H,W as S,z as T,b as W,f as a,v as b,S as c,H as d,I as e,E as f,T as g,M as h,A as i,y as j,w as k,$ as l,P as m,O as n,j as o,_ as p,X as q,m as r,L as s,k as t};
//# sourceMappingURL=styles-1a9b9e59.js.map
