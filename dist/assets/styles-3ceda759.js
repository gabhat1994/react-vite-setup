import{C as n}from"./vendor-51460554.js";import{b2 as p,s as t,m as d}from"./index-cd84bcc9.js";const g=n.div`
  font-family: var(--font-family);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-body-neutral-alt-highlighted);
`,a=i=>["Contacts","Contracts","Invoices","Campaigns"].includes(i??""),s=n.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  gap: 0;

  ${({type:i})=>i==="Chambers"&&"padding: 1px 0 0;"}
  ${({type:i})=>i==="Community"&&"padding: 1px 0 0;"}
  ${({type:i})=>i==="Discovery"&&"padding: 1px 0 0;"}

  /* ${({type:i})=>i==="Home"&&"padding: 16px 0 80px;"} */
  ${({type:i})=>a(i)&&"width: 100%; box-sizing: border-box;"}

  @media ${p.MOBILE_MAX} {
    ${({type:i})=>i==="Chambers"&&"padding: 16px 16px 0;"}
    ${({type:i})=>i==="Community"&&"padding: 0px 16px 0;"}
    /* ${({type:i})=>i==="Home"&&"padding: 16px 16px 80px;"} */
    ${({type:i})=>a(i)&&"padding: 16px 16px 0;"}
  }
  @media ${p.TABLET} {
    ${({type:i})=>i==="Chambers"&&"padding: 16px 16px 0;"}
    ${({type:i})=>i==="Community"&&"padding: 0px 16px 0;"}
    /* ${({type:i})=>i==="Home"&&"padding: 16px 16px 80px;"} */
    ${({type:i})=>a(i)&&"padding: 16px 16px 0;"}
  }
  @media ${p.LAPTOP} {
    ${({type:i})=>i==="Chambers"&&"padding: 24px 40px 0; gap: 24px;"}
    ${({type:i})=>i==="Community"&&"padding: 24px 40px 0; gap: 24px;"}
    ${({type:i})=>i==="Discovery"&&"padding: 24px 40px 48px; gap: 36px;"}
    ${({type:i})=>i==="Home"&&"padding: 24px 40px 48px; gap: 24px;"}
    ${({type:i})=>i==="Articles"&&"padding: 24px 32px 48px; gap: 24px;"}
      ${({type:i})=>a(i)&&"padding: 24px 40px 0; gap: 24px;"}
  }
  @media (max-width: ${t.TABLET_L}) {
    ${({type:i})=>i==="Discovery"&&"padding: 16px 16px 0;"}
  }
  @media (max-width: ${t.MOBILE_L}) {
    ${({type:i})=>i==="Discovery"&&"padding: 16px 0 0 0;"}
  }
  @media (min-width: ${t.LAPTOP_L}) {
    ${({type:i})=>a(i)&&`
    width: 1360px;
    margin: 0 auto;
    `}
  }
`,e=["Articles"],o=n.div`
  ${({type:i})=>a(i)&&"flex-grow: 1;"}

  @media (max-width: ${d.TABLET_MIN}) {
    ${({type:i})=>e.includes(i||"")&&"width: 100%;"};
  }
  @media (min-width: ${d.TABLET_MAX}) and (max-width: ${d.LAPTOP_MAX}) {
    ${({type:i})=>e.includes(i||"")&&"width: 100%; max-width: 1248px;"};
  }
  @media ${p.LAPTOP_L} {
    ${({type:i})=>e.includes(i||"")&&"width: 1248px;"};
  }
`,r=n.div`
  @media ${p.LAPTOP} {
    width: 0px;
    ${({type:i})=>i==="Chambers"&&"margin-right: 12px; min-width: 100px;"}
    ${({type:i})=>i==="Community"&&"margin-right: 12px; min-width: 100px;"}
    ${({type:i})=>i==="Home"&&"margin-right: 12px; min-width: 100px;"}
    ${({type:i})=>i==="Discovery"&&"margin-right: 12px; min-width: 100px;"}
    ${({type:i})=>i==="Articles"&&"margin-right: 12px; min-width: 100px;"}
    ${({type:i})=>a(i)&&"margin-right: 12px; min-width: 100px;"}
  }
`,c=n.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--bg-campaign-banner-success-secondary-default);
  span {
    @media (max-width: ${t.TABLET_L}) {
      text-align: left;
    }
    text-align: center;
  }
  .action-buttons {
    margin-left: 40px;
    display: flex;
    align-items: center;
    span {
      cursor: pointer;
    }
    button {
      margin-right: 32px;
      min-height: 40px;
      max-height: 40px;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  @media (max-width: ${t.TABLET_L}) {
    flex-direction: column;
    align-items: flex-start;
    span {
      text-align: left;
    }
    .action-buttons {
      align-items: center;
      margin-left: 0;
      margin-top: 12px;
    }
  }
`,$=n.div``;export{g as C,r as L,s as M,$ as R,c as S,o as a};
//# sourceMappingURL=styles-3ceda759.js.map
