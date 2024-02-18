import{B as P,c as _,j as p,I as w}from"./index-cd84bcc9.js";import{r as y,C as v,ac as $,ad as j}from"./vendor-51460554.js";const x=(t,n)=>{const o=n-t+1;return Array.from({length:o},(s,a)=>a+t)},k=({totalCount:t,pageSize:n,siblingCount:o,currentPage:s,breakLabel:a="..."})=>y.useMemo(()=>{if(s===0)return[];let l=[];const e=Math.ceil(t/(n||1)),b=o+5,m=Math.max(s-o,1),r=Math.min(s+o,e),u=m>2,i=r<e-2,f=1,g=e;if(b>=e)l=x(1,e);else if(!u&&i){const d=3+2*o;l=[...x(1,d),a,e]}else if(u&&!i){const d=3+2*o,h=x(e-d+1,e);l=[f,a,...h]}else if(u&&i){const d=x(m,r);l=[f,a,...d,a,g]}return l},[t,n,o,s,a]),z=v.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`,M=v(P)`
  width: 32px;
  height: 32px;
  max-width: 32px;
  min-width: 32px;
  min-height: 32px;
  max-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({active:t})=>t?"var(--bg-pagination-brand-secondary-default)":"var(--bg-pagination-neutral-hover)"};
  }

  span {
    color: ${({disabled:t})=>t?"var(--icon-button-neutral-disabled) !important":"var(--text-pagination-brand-primary-default) !important"};
    font-size: var(--font-footnote-regular-size) !important;
    line-height: var(--font-footnote-regular-lineheight) !important;
    font-family: var(--font-footnote-bold-font) !important;
    font-weight: var(--font-footnote-bold-weight) !important;
  }
`,R=v(M)`
  border-width: 1px;
  border-style: solid;
  border-color: ${({active:t})=>t?"transparent":"var(--border-pagination-neutral-default)"};
  background-color: ${({active:t})=>t?"var(--bg-pagination-brand-secondary-default)":"var(--bg-pagination-neutral-alt-default)"};
`,B=v(M)`
  &:active {
    background-color: transparent !important;
  }
  &:disabled {
    background-color: transparent !important;
  }
  &:hover {
    background-color: transparent !important;
  }

  svg path {
    fill: ${({disabled:t})=>t?"var(--icon-pagination-neutral-disabled) !important":"var(--icon-pagination-brand-primary-default) !important"};
  }
`,E=$.forwardRef(({totalCount:t,currentPage:n=1,pageSize:o=10,breakLabel:s="...",disabled:a=!1,siblingCount:I=1,nextPageButton:l,prevPageButton:e,renderOnOnePageCount:b=!1,testId:m,onPageChange:r},u)=>{const i=k({currentPage:n,totalCount:t,siblingCount:I,pageSize:o,breakLabel:s}),f=y.useMemo(()=>Math.ceil(t/(o||1)),[o,t]),g=y.useMemo(()=>i.length>1?i[i.length-1]:f,[i,f]),d=()=>{r&&r(Math.min(n+1,f))},h=()=>{r&&r(Math.max(n-1,1))};return!i.length||i.length<2&&!b?null:_(z,{"data-testid":m||"pagination",ref:u,"data-test":"Pagination-PaginationContainer",children:[e||p(B,{testId:"page-prev-button",textOnly:!0,disabled:a||n===1,onClick:h,"data-test":"Pagination-JumpButton",children:p(w,{name:"chevron_small_left_m",size:24,color:a||n===1?"--icon-button-neutral-disabled":"--icon-button-brand-primary-default","data-test":"Pagination-Icon"})}),i.map(c=>c===s?p(R,{testId:"page-button",size:"small",active:!1,disabled:a,"data-test":"Pagination-PageButton",children:c},`page-btn-break-${j()}`):p(R,{testId:"page-button",size:"small",secondary:n===+c,active:n===+c,disabled:a,onClick:()=>r&&r(+c),"data-test":"Pagination-PageButton",children:c},`page-btn-${c}`)),l||p(B,{testId:"page-next-button",textOnly:!0,disabled:a||n===g,onClick:d,"data-test":"Pagination-JumpButton",children:p(w,{name:"chevron_small_right_m",size:24,color:a||n===g?"--icon-button-neutral-disabled":"--icon-button-brand-primary-default","data-test":"Pagination-Icon"})})]})});export{E as P};
//# sourceMappingURL=Pagination-43542d57.js.map
