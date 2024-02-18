import{m as x,j as o,F as T,c as r,x as d,T as h,aQ as m}from"./index-cd84bcc9.js";import{C as e,l as g}from"./vendor-51460554.js";import{I as u}from"./invoice-e39dbdbc.js";import{R as y}from"./index-38931f83.js";const f=e.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  width: ${({fullSize:a})=>a?"100%":"50%"};

  @media (max-width: ${x.TABLET_MAX}) {
    width: 100%;
  }
`,v=e.div``,k=e.div`
  width: 100%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`,p={Wrapper:f,Separator:k,Header:v},z=({title:a,optional:n,children:c,fullSize:s,titleSeparator:i,rightIcon:t,font:b="heading-xs-bold",headerStyle:S})=>o(T,{children:r(p.Wrapper,{fullSize:s,children:[a?r(d,{fullWidth:!!t,align:"center",justify:"space-between","data-test":"FormSection-Stack",children:[o(p.Header,{style:S,children:r(h,{font:b,colorToken:"--text-card-neutral-highlighted","data-test":"FormSection-TSpan",children:[a," ",n?o(h,{font:"body-xl",colorToken:"--text-tablecell-header-neutral-default","data-test":"FormSection-TSpan",children:"(optional)"}):null]})}),t]}):null,i?o(p.Separator,{}):null,c]})}),w=e.table`
  width: 100%;
  border-collapse: collapse;
`,F=e.tbody``,I=e.tr``,$=e.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-card-neutral-default);
  ${a=>a.fitContents?"width: 1px":""}
`,C=e(h)`
  color: var(--text-card-neutral-highlighted);
`,l={Table:w,TableBody:F,TableRow:I,TableCell:$,SummaryText:C},L=({lineItems:a,currency:n})=>{const c=u.getAllItemsTotalValue(a),s=g.sumBy(a,t=>u.getItemSubtotalValue(t.quantity,t.unitPrice)),i=u.getTaxItems(a);return r(d,{justify:"flex-end",shrink:!0,gap:64,fullWidth:!0,"data-test":"InvoiceSummaryTable-Stack",children:[r(d,{vertical:!0,gap:8,"data-test":"InvoiceSummaryTable-Stack",children:[o(l.SummaryText,{children:"Subtotal"}),i.map(t=>r(l.SummaryText,{children:["Tax (",t.taxName?`${t.taxName}: `:""," ",t.taxRate,"%)"]},t.taxSum)),o(l.SummaryText,{font:"body-m-bold",children:"Total"})]}),r(d,{vertical:!0,gap:8,"data-test":"InvoiceSummaryTable-Stack",children:[o(l.SummaryText,{children:m(s,n,2)}),i.map(t=>o(l.SummaryText,{children:m(t.taxSum,n,2)},t.taxSum)),o(l.SummaryText,{font:"body-m-bold",children:m(c,n,2)})]})]})},j=e.div`
  background: var(--bg-body-neutral-alt-default);
`,A=e(d)`
  display: grid;
  grid-template-columns: ${({oneColumn:a})=>a?"1fr":"7fr 5fr"};
  width: 100%;

  @media (max-width: ${x.TABLET_MAX}) {
    grid-template-columns: 1fr;
  }
`,R=e.div`
  background-color: var(--bg-card-neutral-alt-default);
  width: 100%;
  border-bottom: 1px solid var(--border-card-neutral-highlighted);
  position: sticky;
  top: 0px;
  z-index: 100;
`,B=e(y)`
  padding-top: 0;
  padding-bottom: 0;
`,N={Content:A,FormHeaderContainer:R,ResponsiveMainStyled:B,Container:j};export{z as F,L as I,N as S};
//# sourceMappingURL=styles-2c16e7fb.js.map
