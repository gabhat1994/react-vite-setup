import{c as l,j as e,B as c,I as o,X as f}from"./index-cd84bcc9.js";import{S as d}from"./Header-df950621.js";function u({onDelete:t,isMobile:n,isTablet:a}){return e(c,{onClick:t,secondary:!0,size:"small",intent:"negative",leftIcon:e(o,{name:"delete_m",size:22,"data-test":"Icon"}),"data-test":"Button",children:n||a?"":"Delete"})}function p({onDownload:t}){const n=f();return e(c,{size:"small",leftIcon:e(o,{name:"download_m",size:16,"data-test":"Icon"}),tertiary:!0,onClick:t,"data-test":"Button",children:n.isMobile?"":"Download PDF"})}function A({onAcceptAndPay:t,disableButtons:n}){return e(c,{disabled:n,size:"small",primary:!0,intent:"positive",leftIcon:e(o,{name:"tick_m",size:20,"data-test":"Icon"}),onClick:t,"data-test":"Button",children:"Accept and Pay"})}function D({onReject:t,disableButtons:n}){return e(c,{disabled:n,size:"small",secondary:!0,intent:"negative",onClick:t,"data-test":"Button",children:"Reject"})}function y({onDuplicate:t}){return e(c,{onClick:t,size:"small",tertiary:!0,leftIcon:e(o,{name:"copy_m",size:22,"data-test":"Icon"}),"data-test":"Button",children:"Duplicate"})}function z({onSubmitRequest:t,submitDisabled:n,isMobile:a,isTablet:s,loading:i}){return e(c,{onClick:t,disabled:n,primary:!0,intent:"positive",size:"small",loading:i,"data-test":"Button",children:a||s?"Submit":"Submit Your Request"})}function I({onDownload:t,onAcceptAndPay:n,onReject:a,hideRejectButton:s,disableButtons:i,hideAcceptAndPay:r}){return l(d.Action,{children:[e(p,{onDownload:t,"data-test":"Download"}),s||e(D,{disableButtons:i,onReject:a,"data-test":"Reject"}),r||e(A,{disableButtons:i,onAcceptAndPay:n,"data-test":"AcceptAndPay"})]})}function h({isMobile:t,isTablet:n,hideDelete:a,onDuplicate:s,onDelete:i}){return l(d.Action,{children:[e(y,{onDuplicate:s,"data-test":"Duplicate"}),a||e(u,{isTablet:n,isMobile:t,deleteDisabled:!1,onDelete:i,"data-test":"Delete"})]})}function k({isMobile:t,isTablet:n,onDelete:a,onSubmitRequest:s,deleteDisabled:i=!1,submitDisabled:r=!1,loading:m=!1}){return l(d.Action,{children:[e(u,{isMobile:t,isTablet:n,deleteDisabled:i,onDelete:a,"data-test":"Delete"}),e(z,{isMobile:t,isTablet:n,loading:m,submitDisabled:r,onSubmitRequest:s,"data-test":"SubmitRequest"})]})}const j={OfferActions:I,SummaryActions:h,FormAction:k};export{j as A};
//# sourceMappingURL=Actions-ad30ea8c.js.map
