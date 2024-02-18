import{C as o,a6 as a}from"./vendor-51460554.js";import{T as i}from"./index-cd84bcc9.js";const n=o.div`
  position: relative;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`,l=o.div``,p=o.div`
  position: absolute;
  z-index: 100000000;
  width: auto;

  ${({width:t})=>t&&a`
      width: ${t}px;
    `}

  ${({top:t})=>t&&a`
      top: ${t}px;
    `}
  ${({left:t})=>t&&a`
      left: ${t}px;
    `}
 
  background-color: var(--bg-tooltip-neutral-default);
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0.95;
  display: flex;
  align-items: flex-start;
`,d=o.div`
  max-width: 300px;
  width: max-content;

  span {
    visibility: visible;
    padding: 0;
  }
`,r=o(i).attrs(()=>({font:"footnote",colorToken:"--text-tooltip-neutral-alt-default"}))``;export{l as I,p as M,n as T,d as a,r as b};
//# sourceMappingURL=styles-46bbc451.js.map
