import{I as L,c as $,j as u,T as _}from"./index-cd84bcc9.js";import{C as c,a6 as I,ac as N,r as n,ad as P}from"./vendor-51460554.js";import{u as Q}from"./useResizeObserver-0deb9469.js";const U=c.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 3px;
  width: ${({width:e})=>typeof e=="number"?`${e}px`:e};
  transition: margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  ${({borders:e})=>(e||[]).map(o=>I`
    border-${o}-color: var(--bg-separator-neutral-default);
    border-${o}-width: 1px;
    border-${o}-style: solid;
  `)}
  ${({shadowOnExpand:e,expanded:o,expandedOffsetBottom:t,offsetBottom:i})=>o&&e&&I`
      box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
        0px 2px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
      ${!t&&!i&&"margin-bottom: 5px !important;"}
    `}
  margin-bottom: ${({expanded:e,expandedOffsetBottom:o,offsetBottom:t})=>e?`${o!==void 0?o:t||0}px`:`${t||0}px`};
  margin-top: ${({expanded:e,expandedOffsetTop:o,offsetTop:t})=>e?`${o!==void 0?o:t||0}px`:`${t||0}px`};
`,V=c.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: ${({gap:e})=>`${e||10}px`};
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  transition: padding-top 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  padding: ${({padding:e})=>e||"20px 16px"};
  user-select: none;
  background-color: ${({disabled:e})=>e?"var(--bg-tablecell-neutral-alt-disabled)":"var(--bg-tablecell-neutral-alt-default)"};
  cursor: ${({disabled:e})=>e?"not-allowed":"pointer"};
`,W=c.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  box-sizing: border-box;
  flex: 1;
  gap: 3px;
  overflow: hidden;
`,X=c.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,Y=c.div``,Z=c(L)`
  transition: transform 0.3s;
  ${({expanded:e})=>e&&"transform: rotate(180deg)"};
  ${({color:e})=>e&&`color: ${e}`};
`,O=c.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow: hidden;
  box-sizing: border-box;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  ${({maxHeight:e,expanded:o})=>I`
    max-height: ${o?e:0};
    height: ${o?e:0};
  `}
`;c.div`
  padding: 8px 12px;
`;const B=({uid:e,title:o,isBoldTitle:t,headerGap:i,subtitle:s,expanded:b,disabled:C,left:g,padding:y,right:h,onClick:l,onKeyDown:v,titleFont:w})=>$(V,{id:`AccordionHeader_${e}`,"data-testid":"accordion-heading","data-element":"accordion-title-container",role:"button","aria-expanded":b,"aria-controls":`AccordionContent_${e}`,tabIndex:0,gap:i,disabled:C,expanded:b,onClick:l,onKeyDown:v,padding:y,"data-test":"AccordionHeader-AccordionHeaderContainer",children:[!!g&&g,$(W,{"data-test":"AccordionHeader-AccordionTitleContainer",children:[u(_,{font:w||(t?"body-l-bold":"body-l"),colorToken:"--text-tablecell-header-neutral-highlighted",overflow:"ellipsis","data-test":"AccordionHeader-TSpan",children:o}),!!s&&(typeof s=="string"?u(_,{font:"body-s",colorToken:"--text-tablecell-header-neutral-default","data-test":"AccordionHeader-TSpan",children:s}):s)]}),$(X,{"data-test":"AccordionHeader-AccordionRightContainer",children:[!!h&&u(Y,{"data-testid":"accordion-right-icon","data-element":"accordion-right-icon","data-test":"AccordionHeader-AccordionRightIcon",children:h}),u(Z,{"data-testid":"accordion-dropdown-icon","data-element":"accordion-icon",expanded:b,name:"chevron_small_down_m",size:24,color:"--icon-tablecell-neutral-highlighted","data-test":"AccordionHeader-AccordionDropDownIcon"})]})]}),ne=N.forwardRef(({accordionRef:e,borders:o=["bottom"],disabled:t,expanded:i,expandedOffsetBottom:s=0,contentHeightKey:b,expandedOffsetTop:C=0,left:g=null,offsetBottom:y=0,offsetTop:h=0,preExpanded:l,headerPadding:v,right:w,shadowOnExpand:j,subtitle:E,testId:R,title:D,isBoldTitle:S,titleFont:M,headerGap:q,width:K="100%",onToggle:p,children:T},F)=>{const[d,H]=n.useState(),[G,k]=n.useState(d?"auto":"0"),A=n.useRef(P()),a=n.useRef(null);Q(a,()=>{var r;k(`${((r=a==null?void 0:a.current)==null?void 0:r.scrollHeight)||0}px`)}),n.useEffect(()=>{var r;k(`${((r=a==null?void 0:a.current)==null?void 0:r.scrollHeight)||0}px`)},[b]),n.useEffect(()=>{d===void 0&&H(l)},[d,l]);const x=n.useMemo(()=>l===void 0&&i!==void 0,[i,l]),f=n.useMemo(()=>x?i:d,[i,x,d]),m=n.useCallback(()=>{t||(x?p&&p(!f):H(!d))},[t,x,f,d,p]),z=n.useCallback(()=>{x?p&&p(!1):H(!1)},[x,p]),J=n.useCallback(r=>{t||(r.key==="Enter"||r.key===" "?m():r.key==="Escape"&&z())},[t,m,z]);return n.useImperativeHandle(F,()=>({toggle(){m()}}),[m]),$(U,{ref:e,"data-testid":R||"accordion","data-component":"accordion",id:`accordion_${A.current}`,borders:o,expanded:f,expandedOffsetBottom:s,expandedOffsetTop:C,offsetBottom:y,offsetTop:h,shadowOnExpand:j,width:K,"data-test":"Accordion-AccordionContainer",children:[u(B,{headerGap:q,padding:v,uid:A.current,title:D,titleFont:M,isBoldTitle:S,subtitle:E,expanded:f,disabled:t,left:g,right:w,onClick:m,onKeyDown:J,"data-test":"Accordion-AccordionHeader"}),u(O,{ref:a,maxHeight:G,expanded:f,role:"region","data-element":"accordion-content",id:`AccordionContent_${A.current}`,"aria-labelledby":`AccordionHeader_${A.current}`,"data-test":"Accordion-AccordionContent",children:T})]})});export{ne as A};
//# sourceMappingURL=Accordion-ea03839b.js.map
