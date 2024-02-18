import{e as O,m as j,ae as _,T as o,x as c,bc as S,j as t,c as l,au as N,az as q,bd as F,be as M,X as B,F as $,aQ as f,aC as L,q as Q,b6 as T,bf as p,f as X,bb as Y,bg as K}from"./index-cd84bcc9.js";import{C as s,r as G,N as U,l as C,ay as J,ar as W}from"./vendor-51460554.js";import{I as b}from"./invoice-e39dbdbc.js";import{I as Z,F as I}from"./styles-2c16e7fb.js";import{C as ee,g as te}from"./contactDetails-4902172b.js";import{a as ae,I as ne}from"./useInvoicePdfDownload-84ddf906.js";import{A as E}from"./index-35efb18f.js";const le=s(_)`
  width: 100%;
  padding: 24px;
  overflow: visible;
`,ie=s(o)`
  min-width: 110px;
`,re=s.div`
  width: 100%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`,oe=s.div`
  display: grid;
  grid-template-columns: 160px auto;
  align-items: flex-start;

  @media (max-width: ${O.MOBILE_MAX}px) {
    grid-template-columns: auto;
    gap: 8px;
    padding-bottom: 12px;
    width: 100%;
    border-bottom: 1px solid var(--bg-separator-neutral-default);
  }
`,se=s(c)`
  display: grid;
  grid-template-columns: 160px auto;
  gap: 24px;

  @media (max-width: ${j.TABLET_MAX}) {
    grid-template-columns: auto;
    gap: 8px;
  }
`,de=s(o).attrs({colorToken:"--text-card-neutral-highlighted",font:"body-m"})``,u={PageCard:le,InvoiceNumberLabel:ie,Separator:re,DetailsRow:oe,AccountDetailsColumn:se,AccountDetailsValueText:de},Ee=({invoice:e})=>{var d,m;const n=(y,h,g=null)=>h?l(u.DetailsRow,{children:[t(o,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"InvoiceDetailsSection-renderDetailsRow-TSpan",children:y}),l(c,{align:"center",gap:8,"data-test":"InvoiceDetailsSection-renderDetailsRow-Stack",children:[g,t(o,{font:"body-m",colorToken:"--text-card-header-neutral-highlighted","data-test":"InvoiceDetailsSection-renderDetailsRow-TSpan",children:h})]})]}):null,r=G.useMemo(()=>{switch(e.paymentTerms){case S.FullPaymentAdvance:return"Payable on or Before Due Date";case S.MilestonePayment:return"Milestone Payment";case S.InstallmentPayment:return"Installment Payment";default:return""}},[e.paymentTerms]),a=b.getLateFeeText(e.lateFeeType,e.lateFeeValue,e.currency);return t(u.PageCard,{children:l(c,{vertical:!0,gap:16,fullWidth:!0,"data-test":"InvoiceDetailsSection-Stack",children:[t(o,{font:"heading-xs-bold","data-test":"InvoiceDetailsSection-TSpan",children:"Details"}),l(c,{fullWidth:!0,vertical:!0,gap:8,"data-test":"InvoiceDetailsSection-Stack",children:[e.issueDate?n("Created",U(new Date(e.issueDate),"dd MMM yyyy")):null,n("Currency",e==null?void 0:e.currency,null),n("Payment Terms",r),n("Late Fee",a),n("Connected Noum",(d=e.noumId)==null?void 0:d.name,t(N,{url:((m=e.noumId)==null?void 0:m.profileImage)||q,size:F.M,"data-test":"InvoiceDetailsSection-Avatar"}))]})]})})},ce=s.table`
  width: 100%;
  border-collapse: collapse;
`,ue=s.tbody``,me=s.tr``,he=s.thead``,pe=s.td`
  ${M.footnote}
  padding: 12px;
  text-align: right;
  border-bottom: 1px solid var(--border-card-neutral-default);
  color: var(--text-card-neutral-default);
  width: ${({$width:e})=>e||"auto"};
  text-align: ${({align:e})=>e||"right"};
`,Te=s.th`
  ${M.footnoteBold}
  background-color: var(--bg-card-neutral-default);
  color: var(--text-card-header-neutral-default);
  padding: 12px;
  text-align: ${({align:e})=>e||"right"};

  :first-of-type {
    border-radius: 8px 0 0 8px;
  }

  :last-of-type {
    border-radius: 0 8px 8px 0;
  }
`,ye=s(o)`
  color: var(--text-card-neutral-highlighted);
`,ge=s(o).attrs({font:"footnote",colorToken:"--text-card-neutral-default"})``,Ie=s(c).attrs({fullWidth:!0,justify:"space-between",align:"center",padding:"0 12px 0 0"})``,i={Table:ce,TableBody:ue,TableRow:me,TableCell:pe,SummaryText:ye,TableHead:he,TableHeader:Te,ItemDetailsRowText:ge,ItemDetailsRow:Ie},fe=({data:e,currency:n})=>{const{isMobile:r}=B();return l($,{children:[l(i.Table,{children:[!r&&t(i.TableHead,{children:l(i.TableRow,{children:[t(i.TableHeader,{align:"left",children:"DESCRIPTION"}),t(i.TableHeader,{children:"QTY"}),t(i.TableHeader,{children:"UNIT PRICE"}),t(i.TableHeader,{children:"TAX RATE"}),t(i.TableHeader,{children:"AMOUNT"})]})}),t(i.TableBody,{children:e.map(a=>r?t(i.TableRow,{children:l(i.TableCell,{children:[t(c,{"data-test":"InvoiceItemsSummaryTable-Stack",children:t(o,{font:"body-m-bold",colorToken:"--text-card-neutral-highlighted","data-test":"InvoiceItemsSummaryTable-TSpan",children:a.description})}),l(i.ItemDetailsRow,{children:[t(i.ItemDetailsRowText,{children:"Quantity:"}),t(i.ItemDetailsRowText,{children:a.quantity})]}),l(i.ItemDetailsRow,{children:[t(i.ItemDetailsRowText,{children:"Unit Price:"}),t(i.ItemDetailsRowText,{children:a.unitPrice})]}),l(i.ItemDetailsRow,{children:[t(i.ItemDetailsRowText,{children:"Tax Rate:"}),t(i.ItemDetailsRowText,{children:C.isNumber(a.taxRate)?`${a.taxRate}%`:"-"})]}),l(i.ItemDetailsRow,{children:[t(i.ItemDetailsRowText,{children:"Amount:"}),t(i.ItemDetailsRowText,{children:b.getItemTotalValueWithCurrency(a.quantity,a.unitPrice,a.taxRate,n)})]})]})},a.id):l(i.TableRow,{children:[t(i.TableCell,{align:"left",children:t(o,{font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"InvoiceItemsSummaryTable-TSpan",children:a.description})}),t(i.TableCell,{$width:"10%",children:t(o,{font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"InvoiceItemsSummaryTable-TSpan",children:a.quantity})}),t(i.TableCell,{$width:"10%",children:t(o,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"InvoiceItemsSummaryTable-TSpan",children:f(a.unitPrice,n,2)})}),t(i.TableCell,{$width:"10%",children:t(o,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"InvoiceItemsSummaryTable-TSpan",children:C.isNumber(a.taxRate)?`${a.taxRate}%`:""})}),t(i.TableCell,{$width:"10%",children:t(o,{font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"InvoiceItemsSummaryTable-TSpan",children:b.getItemTotalValueWithCurrency(a.quantity,a.unitPrice,a.taxRate,n)})})]},a.id))})]}),t(Z,{lineItems:e,currency:n,"data-test":"InvoiceItemsSummaryTable-InvoiceSummaryTable"})]})},P=({contact:e})=>{var n,r;return l($,{children:[l(c,{align:"center",gap:8,padding:"8px 0","data-test":"AccountDetails-Stack",children:[t(N,{url:(n=e==null?void 0:e.userId.profile)==null?void 0:n.profilePictureThumbnail,size:F.M,"data-test":"AccountDetails-Avatar"}),t(o,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"AccountDetails-TSpan",children:e.displayName})]}),l(u.AccountDetailsColumn,{padding:"8px 0",children:[t(o,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"AccountDetails-TSpan",children:"Account Information"}),l(c,{vertical:!0,"data-test":"AccountDetails-Stack",children:[t(u.AccountDetailsValueText,{children:e.displayName}),t(u.AccountDetailsValueText,{children:ee.formatCompanyAndTitle(e)}),t(u.AccountDetailsValueText,{children:e.userId.email})]})]}),l(u.AccountDetailsColumn,{padding:"8px 0",children:[t(o,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"AccountDetails-TSpan",children:"Billing Details"}),l(c,{vertical:!0,"data-test":"AccountDetails-Stack",children:[l(u.AccountDetailsValueText,{children:[e.apartmentNo," ",e.street]}),t(u.AccountDetailsValueText,{children:e.city}),l(u.AccountDetailsValueText,{children:[e.state,", ",e.zipCode]}),t(u.AccountDetailsValueText,{children:((r=te(e.country))==null?void 0:r.name)??e.country??"--"})]})]})]})},Ve=({invoice:e})=>{var r;const{isMobile:n}=B();return t(u.PageCard,{children:l(c,{vertical:!0,gap:16,fullWidth:!0,"data-test":"InvoiceSummary-Stack",children:[t(o,{font:"heading-xs-bold","data-test":"InvoiceSummary-TSpan",children:"Summary"}),l(c,{fullWidth:!0,vertical:n,gap:n?16:0,"data-test":"InvoiceSummary-Stack",children:[t(I,{title:"Recipient",sectionSeparator:!1,"data-test":"InvoiceSummary-FormSection",children:e.invoiceTo?t(P,{contact:e.invoiceTo,"data-test":"InvoiceSummary-AccountDetails"}):null}),t(I,{title:"Service Provider",sectionSeparator:!1,"data-test":"InvoiceSummary-FormSection",children:e.invoiceFrom?t(P,{contact:e.invoiceFrom,"data-test":"InvoiceSummary-AccountDetails"}):null})]}),e.summary?t(I,{title:"Attention","data-test":"InvoiceSummary-FormSection",children:e.summary}):null,(r=e.lineItems)!=null&&r.length?t(I,{title:"Items",fullSize:!0,"data-test":"InvoiceSummary-FormSection",children:t(fe,{data:L(e.lineItems),currency:e.currency??void 0,"data-test":"InvoiceSummary-InvoiceItemsSummaryTable"})}):null,e.notes?t(I,{title:"Notes","data-test":"InvoiceSummary-FormSection",children:e.notes}):null]})})},He=({invoice:e})=>{const{isNoumOwner:n}=ae();return t(u.PageCard,{children:l(c,{justify:"space-between","data-test":"PlanDetails-Stack",children:[l(c,{vertical:!0,gap:16,"data-test":"PlanDetails-Stack",children:[l(c,{align:"center",gap:8,"data-test":"PlanDetails-Stack",children:[t(o,{colorToken:"--text-card-neutral-highlighted",font:"heading-xs-bold","data-test":"PlanDetails-TSpan",children:e.invoiceNumber}),e.amount?l(o,{colorToken:"--text-card-neutral-highlighted",font:"body-xl","data-test":"PlanDetails-TSpan",children:["for"," ",f(e.amount,e.currency??void 0,2)]}):null,e.duplicatedFromInvoiceNumber&&n(e)?l(Q,{size:"medium",tertiary:!0,"data-test":"PlanDetails-Tag",children:["Duplicated from ",e.duplicatedFromInvoiceNumber]}):null]}),l(c,{align:"center",gap:8,"data-test":"PlanDetails-Stack",children:[t(o,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"PlanDetails-TSpan",children:"Payment Due:"}),t(o,{font:"body-m-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"PlanDetails-TSpan",children:e.issueDate?U(new Date(e.dueDate),"dd MMM yyyy"):null})]})]}),t(ne,{status:e==null?void 0:e.status,"data-test":"PlanDetails-InvoiceStatusBadge"})]})})},xe=s(_)`
  width: 100%;
  padding: 24px;
  overflow: visible;
`,Se=s(c).attrs({fullWidth:!0})`
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  padding: 8px 0;
`,be=s(c).attrs({vertical:!0})``,ve=s.div`
  padding: 2px 8px 0;
`,De=s(c).attrs({fullWidth:!0,vertical:!0})`
  padding-top: 16px;
`,ke=s(o).attrs({font:"footnote",colorToken:"--text-timestamp-neutral-default"})``,we=s(o).attrs({font:"body-m",colorToken:"--text-card-header-neutral-highlighted"})``,Ae=s(o).attrs({font:"body-m-bold",colorToken:"--text-card-header-neutral-highlighted"})``,V={PageCard:xe,TimelineListItem:Se,TimelineInfoWrapper:be,TimelineIconWrapper:ve,TimelineContainer:De,DateText:ke,ActivityText:we,BodyHighlighted:Ae};function Ce({i18nKey:e,values:n}){return t(J,{i18nKey:e,values:n,components:{b:t(V.BodyHighlighted,{})},"data-test":"Trans"})}function H(e){switch(e){case T.Draft:return"noumena.invoices.status.draft";case T.Issued:return"noumena.invoices.status.issued";case T.Paid:return"noumena.invoices.status.paid";case T.Overdue:return"noumena.invoices.status.overdue";case T.Cancelled:return"noumena.invoices.status.cancelled";case T.PartiallyPaid:return"noumena.invoices.status.partially_paid";case T.WriteOff:return"noumena.invoices.status.write_off";default:return""}}function R(e){if(!(!e||!e.userId._id||!e.displayName))return{[e.userId._id]:e.displayName}}function Pe({item:e,currency:n,currentUserId:r,serviceProvider:a,buyer:d,t:m,isOpsUser:y}){var D,k,w;const h={...R(d),...R(a)},g=r===((D=e.userId)==null?void 0:D._id),z=(d==null?void 0:d.userId._id)===r?a==null?void 0:a.userId._id:d==null?void 0:d.userId._id,x=g?"You":(e.userId?h[(k=e==null?void 0:e.userId)==null?void 0:k._id]:void 0)??"Unknown User",v=h[z??""];switch(e.activityType){case p.InvoiceCreated:return e.duplicatedFrom&&g?{translation:{key:"noumena.invoices.timeline.duplicated",values:{invoiceNumber:e.duplicatedFrom}},icon:"check_xs"}:e.toStatus===T.Draft?{translation:{key:"noumena.invoices.timeline.drafted"},icon:"check_xs"}:{translation:{key:"noumena.invoices.timeline.created"},icon:"check_xs"};case p.StatusChanged:return{translation:{key:"noumena.invoices.timeline.status_changed",values:{status:m(H(e.toStatus??void 0))}},icon:"transfer_m"};case p.Paid:{const A=(d==null?void 0:d.userId._id)===r?"You":d==null?void 0:d.displayName;return{translation:(e.remainingAmount??0)>0?{key:"noumena.invoices.timeline.partially_paid",values:{user:A,amount:f(e.amount??0,n),remainingAmount:f(e.remainingAmount??0,n)}}:{key:"noumena.invoices.timeline.paid",values:{user:A,amount:f(e.amount??0,n)}},icon:"wallet_m"}}case p.Reminder:return{translation:{key:"noumena.invoices.timeline.reminder",values:{user:x}},icon:"notifications_m"};case p.InvoiceSent:return y?{translation:{key:"noumena.invoices.timeline.sent",values:{user:h[((w=a==null?void 0:a.userId)==null?void 0:w._id)??""]}},icon:"send_m_1"}:{translation:g?{key:"noumena.invoices.timeline.received",values:{user:v}}:{key:"noumena.invoices.timeline.sent",values:{user:v}},icon:"send_m_1"};case p.InvoiceEdited:return{translation:{key:"noumena.invoices.timeline.edited",values:{user:x}},icon:"edit_m"};case p.PaymentFailed:return{translation:{key:"noumena.invoices.timeline.declined"},icon:"close_m"};case p.DueDateChanged:return{translation:{key:"noumena.invoices.timeline.due_date_changed",values:{user:x}},icon:"time_m"};default:return null}}const Re={getTimelineItemByType:Pe,getStatusTranslationKey:H};function _e({item:e,invoice:n}){const{t:r}=W(),{user:a,isOpsUser:d}=X(),m=n.currency??Y.Usd,y=n.invoiceTo,h=n.invoiceFrom;return Re.getTimelineItemByType({currency:m,currentUserId:(a==null?void 0:a._id)??"",buyer:y??void 0,serviceProvider:h??void 0,item:e,t:r,isOpsUser:d})}const Ne=({item:e,invoice:n})=>{const r=_e({item:e,invoice:n});return r?t(E.Item,{iconName:r.icon,description:r.translation.key?t(Ce,{i18nKey:r.translation.key,values:r.translation.values,"data-test":"TimelineListItem-TranslatedBody"}):null,timestamp:e.createdAt}):null},ze=({invoice:e})=>{var d;const{t:n}=W(),{data:r}=K({variables:{invoiceId:e.id,limit:100,offset:0},fetchPolicy:"cache-and-network"}),a=L((d=r==null?void 0:r.getInvoiceTimeLines)==null?void 0:d.data);return a.length?t(V.PageCard,{children:l(c,{gap:16,vertical:!0,fullWidth:!0,"data-test":"InvoiceTimeline-Stack",children:[t(o,{font:"heading-xs-bold","data-test":"InvoiceTimeline-TSpan",children:n("noumena.invoices.timeline.heading")}),t(E.List,{children:a.map(m=>t(Ne,{invoice:e,item:m,"data-test":"InvoiceTimeline-TimelineListItem"},m._id))})]})}):null};export{Ve as I,He as P,Ee as a,ze as b};
//# sourceMappingURL=InvoiceTimeline-e66f8fb7.js.map
