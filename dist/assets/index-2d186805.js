import{s as d,u,w as h,j as r}from"./index-cd84bcc9.js";import{C as l,r as n}from"./vendor-51460554.js";import{u as m}from"./useResizeObserver-0deb9469.js";const y=l.div`
  @media (min-width: ${d.LAPTOP}) {
    ${({isSticky:t,$isAppUiV2:s})=>t&&`
        position: sticky; 
        top: ${s?"24px":"96px"};
      `};
    ${({leftNav:t})=>t?"left: 40px;":""};
    ${({height:t})=>t?`height: ${t}px;`:"auto"};
  }
`,x=({children:t,leftNav:s=!1})=>{const{height:o}=u(),[e,c]=n.useState(0),i=n.useRef(null),{flags:p}=h();return m(i,()=>{var a;c(((a=i==null?void 0:i.current)==null?void 0:a.clientHeight)||0)}),r(y,{"data-testid":"sticky-container",isSticky:e<o,leftNav:s,height:e,$isAppUiV2:p.newAppNavigation,"data-test":"StickyContainer-StickyWrapper",children:r("div",{ref:i,children:t})})};export{x as S};
//# sourceMappingURL=index-2d186805.js.map
