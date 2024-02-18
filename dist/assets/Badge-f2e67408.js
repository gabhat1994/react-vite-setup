import{_ as d,j as r,T as o}from"./index-cd84bcc9.js";import{C as s,a6 as a}from"./vendor-51460554.js";const c=s.span`
  padding: 1px 6px 2px 6px;
  box-sizing: border-box;
  height: 22px;
  border-radius: 8px;
  background-color: var(--bg-tag-neutral-default);

  ${({status:e})=>e==="Live"&&a`
      background-color: var(--bg-tag-success-secondary-default);
    `};
  ${({status:e})=>e==="Pending"&&a`
      background-color: var(--bg-tag-warning-secondary-default);
    `};
  ${({status:e})=>e==="In review"&&a`
      background-color: var(--bg-tag-brand-secondary-default);
    `};
  ${({status:e})=>e==="Completed"&&a`
      background-color: var(--bg-tag-neutral-default);
    `};
  ${({status:e})=>e==="Rejected"&&a`
      background-color: var(--bg-button-danger-secondary-default);
    `};
`,i=({status:e})=>{const t=d.capitalizeFirstLetter(e);return r(c,{status:t,"data-test":"Badge-BaseBadge",children:r(o,{font:"footnote-bold",colorToken:(n=>{switch(n){case"Live":return"--text-tag-success-primary-default";case"In review":return"--text-tag-brand-primary-default";case"Completed":return"--text-tag-neutral-default";case"Pending":return"--text-tag-warning-secondary-default";case"Rejected":return"--text-button-danger-secondary-default";default:return"--text-tag-neutral-default"}})(t),"data-test":"Badge-TSpan",children:t})})};export{i as B};
//# sourceMappingURL=Badge-f2e67408.js.map
