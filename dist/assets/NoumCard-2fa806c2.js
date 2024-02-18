import{c as n,j as t,az as r,T as e,_ as l}from"./index-cd84bcc9.js";import{C as d}from"./vendor-51460554.js";const s=d.div`
  height: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`,p=d.img`
  height: 24px;
  width: 24px;
  border-radius: 8px;
`,f=({name:i,status:a,image:o=r})=>n(s,{"data-test":"NOUMCard-BaseNOUMCard",children:[t(p,{src:o||r,alt:"profile","data-test":"NOUMCard-Profile"}),t(e,{font:"body-m","data-test":"NOUMCard-TSpan",children:i}),a&&t(e,{font:"body-m",colorToken:"--text-input-neutral-default","data-test":"NOUMCard-TSpan",children:t("div",{style:{width:"3.5px",height:"3.5px",borderRadius:"3px",backgroundColor:"var(--text-input-neutral-default)",marginTop:"-1px"}})}),a&&t(e,{font:"body-m",colorToken:"--text-input-neutral-default","data-test":"NOUMCard-TSpan",children:l.capitalizeFirstLetter(a)})]});export{f as N};
//# sourceMappingURL=NoumCard-2fa806c2.js.map
