import{X as s,c as o,M as c,t as u,j as e,h as p,T as i,i as f,x as r,k as D,B as d}from"./index-cd84bcc9.js";import"./vendor-51460554.js";const M=({onConfirm:l,onClose:a,isOpenModal:t})=>{const{isMobile:n}=s();return o(c,{isFullScreen:n,open:t,testId:"update_invoice_modal",size:u.S,onClose:a,disableBackdropClick:!0,"data-test":"DuplicateInvoiceModal-Modal",children:[e(p,{"data-test":"DuplicateInvoiceModal-ModalHeader",children:e(i,{font:"heading-xs-bold",colorToken:"--text-modal-header-neutral-default","data-test":"DuplicateInvoiceModal-TSpan",children:"Duplicate Invoice"})}),e(f,{"data-test":"DuplicateInvoiceModal-ModalBody",children:e(r,{padding:"0 0 16px","data-test":"DuplicateInvoiceModal-Stack",children:o(i,{font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"DuplicateInvoiceModal-TSpan",children:["Are you sure you want to duplicate this invoice? Duplicating the invoice will create a new copy with the same details.",e(i,{font:"body-l-bold",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"DuplicateInvoiceModal-TSpan",children:" Please review the details before proceeding."})]})})}),o(D,{flexDirection:"column",gap:16,"data-test":"DuplicateInvoiceModal-ModalFooter",children:[e(d,{primary:!0,onClick:l,size:"full",testId:"close_btn","data-test":"DuplicateInvoiceModal-Button",children:"Duplicate Invoice"}),e(d,{tertiary:!0,onClick:a,size:"full",testId:"close_btn","data-test":"DuplicateInvoiceModal-Button",children:"Cancel"})]})]})};function v(l){if(!l)return"";const t=new Intl.NumberFormat("en-US",{style:"currency",currency:l,minimumFractionDigits:0,maximumFractionDigits:0}).formatToParts(0).find(n=>n.type==="currency");return t==null?void 0:t.value}const y=({isOpenModal:l,isDraft:a=!0,onClose:t,onConfirm:n})=>e(c,{isFullScreen:!1,open:l,testId:"delete_draft_modal",onClose:t,disableBackdropClick:!0,"data-test":"DeleteDraftModal-Modal",children:o(r,{gap:16,padding:14,vertical:!0,maxWidth:327,align:"center",justify:"center","data-test":"DeleteDraftModal-Stack",children:[e(i,{font:"heading-s-bold",colorToken:"--text-modal-header-neutral-default","data-test":"DeleteDraftModal-TSpan",children:a?"Delete Draft Invoice":"Delete Invoice"}),o(i,{"data-testid":"confirm_text",font:"body-l",textAlign:"center",colorToken:"--text-modal-neutral-default","data-test":"DeleteDraftModal-TSpan",children:[a?" Are you sure you want to permanently delete this draft invoice?":" Are you sure you want to permanently delete this invoice?",e("br",{})," ",e("br",{}),"This cannot be undone."]}),o(r,{vertical:!0,gap:16,fullWidth:!0,padding:"12px 0 0","data-test":"DeleteDraftModal-Stack",children:[e(d,{primary:!0,size:"full",testId:"confirm_btn",intent:"negative",grow:!0,onClick:n,"data-test":"DeleteDraftModal-Button",children:a?"Delete Draft":"Delete Invoice"}),e(d,{tertiary:!0,onClick:t,size:"full",testId:"cancel_btn","data-test":"DeleteDraftModal-Button",children:"Close"})]})]})});export{y as D,M as a,v as g};
//# sourceMappingURL=DeleteDraftModal-e41d0b22.js.map