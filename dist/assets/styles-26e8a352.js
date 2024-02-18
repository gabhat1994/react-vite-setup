import{C as r,l as m,r as c,a6 as C}from"./vendor-51460554.js";import{ae as R,aC as w,j as G,dR as I,be as v,c_ as D,x as g}from"./index-cd84bcc9.js";const W=r.div`
  display: inline-flex;
  gap: 16px;
  padding: 12px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  ${({intent:e})=>e==="danger"&&"svg path { fill: var(--bg-button-danger-primary-default)};"}

  &:hover {
    background-color: var(--bg-tablecell-neutral-hover);
  }
`,q=r(R)`
  height: 50px;
  width: 147px;
`,ne={OptionContainer:W,SpinnerWrapper:q},u=(e,t)=>e===t;function x(e,t){return[...e,t]}function H(e,t){return m.uniq(x(e,t))}function S(e,t){return[...e,...t]}function U(e,t){return m.uniq(S(e,t))}function h(e,t,o=u){return e.filter(n=>!o(n,t))}function E(e,t,o=u){return e.filter(n=>!t.find(l=>o(l,n)))}function k(e,t){return b(e,t)?h(e,t):x(e,t)}function b(e,t,o=u){return!!e.find(n=>o(n,t))}function L(e,t,o=u){return t.every(n=>b(e,n,o))}const i={selectOne:x,selectOneUnique:H,selectMultiple:S,selectMultipleUnique:U,removeOne:h,removeMultiple:E,toggleOne:k,isSelected:b,areSelected:L};function j({initialSelection:e}={}){const[t,o]=c.useState(e??[]);return c.useMemo(()=>{function l(a){o(s=>i.selectOneUnique(s,a))}function d(a){o(s=>i.selectMultipleUnique(s,a))}function p(a){o(s=>i.removeOne(s,a))}function f(a){o(s=>i.removeMultiple(s,a))}function T(){o([])}function $(a){return i.isSelected(t,a)}function O(a){return i.areSelected(t,a)}return{selectedItems:t,selectOne:l,selectMultiple:d,removeOne:p,removeMultiple:f,clear:T,isSelected:$,areSelected:O}},[t])}function P(e){return e==="asc"?"desc":"asc"}function _(e,t,o){return w(t.map(n=>e.find(l=>o(l)===n)))}const B={getOppositeSortingDirection:P,mapRowSelectionToItems:_},y=c.createContext(null);function re({children:e,data:t,defaultSorting:o}){const n=j(),[l,d]=c.useState(o??null),p=c.useMemo(()=>({data:t,rowSelection:n,getRowSelectionItems:f=>B.mapRowSelectionToItems(t,n.selectedItems,f),sorting:l,setSorting:d}),[t,n,l]);return G(y.Provider,{value:p,children:e})}function ae(){const e=c.useContext(y);if(!e)throw new Error("useDataGrid must be called under DataGridProvider.");return e}const N=r.div`
  flex-grow: 0;
`,z=r.div`
  flex-grow: 0;
`,le={LeftSlot:N,RightSlot:z},A=60,M=C`
  max-width: 0;
  ${I}
`,F=r.table`
  width: 100%;
  border-collapse: collapse;
`,J=r.thead``,K=r.tbody``,Q=r.th`
  ${v.footnoteBold}
  background-color: var(--bg-card-neutral-default);
  color: var(--text-card-header-neutral-highlighted);
  padding: 12px;
  text-align: left;
  ${({$wordWrap:e})=>e?"":M}

  width: ${({$width:e})=>e?e==="fit-contents"?"1px":e:"auto"};

  :first-of-type {
    border-radius: 8px 0 0 8px;
  }

  :last-of-type {
    border-radius: 0 8px 8px 0;
  }
`,V=r.tr`
  ${e=>e.$clickable?"cursor: pointer;":""}
`,X=r.td`
  ${v.footnote}
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-card-neutral-default);
  color: var(--text-card-neutral-default);
  ${({$wordWrap:e})=>e?"":M}
  width: ${({$width:e})=>e?e==="fit-contents"?"1px":e:"auto"}
`,Y=r(g).attrs(()=>({align:"center",justify:"center"}))`
  height: ${e=>e.$rowsCount*A}px;
  color: var(--text-placeholder-neutral-default);
  ${D.bodyMedium}
`,se={Table:F,TableHead:J,TableBody:K,TableHeader:Q,TableRow:V,TableCell:X,NoResults:Y},ie=56,Z=r(g).attrs({fullWidth:!0,vertial:!0,gap:16})``,ee=r(g).attrs({fullWidth:!0})``,ce={ListRow:Z,ListItem:ee};export{B as D,i as M,A as R,ne as S,le as a,se as b,ce as c,ie as d,re as e,ae as u};
//# sourceMappingURL=styles-26e8a352.js.map
