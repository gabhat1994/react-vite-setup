import{c_ as n,be as d,j as t}from"./index-cd84bcc9.js";import{C as o}from"./vendor-51460554.js";const p=o.div`
  padding: 12px 12px 12px 16px;
  border-left: 4px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: var(--text-infobox-neutral-default);

  ${({$size:r})=>r==="default"?`
    padding: 12px 12px 12px 16px;
    ${n.bodyMedium}
    `:`
    padding: 8px 8px 8px 12px;
    ${d.footnote};
  `}
  ${({$type:r})=>r==="secondary"?`
        border-color: var(--border-infobox-brand-primary-default);
        background-color: var(--bg-infobox-brand-primary-default);
        `:""}
    ${({$type:r})=>r==="tertiary"?`
        border-color: var(--border-infobox-neutral-default);
        background-color: var(--bg-infobox-neutral-default);
        `:""}
    ${({$type:r})=>r==="negative"?`
        border-color: var(--border-infobox-danger-primary-default);
        background-color: var(--bg-infobox-danger-primary-default);
        `:""};
`,b=o.div``,i={Container:p,RightIcon:b};function l({children:r,type:a,size:e="default"}){return t(i.Container,{$type:a,$size:e,children:r})}export{l as I};
//# sourceMappingURL=Infobox-cf6af02b.js.map
