import{al as c,r as f}from"./vendor-51460554.js";import{eD as u,a$ as l,v as p,eE as S,eq as w,eF as P}from"./index-cd84bcc9.js";import{u as g}from"./styles-5db1c009.js";function h({id:a}){var i,e;const{data:t,networkStatus:n,refetch:o}=u({notifyOnNetworkStatusChange:!0,fetchPolicy:"cache-and-network",variables:{id:a},skip:!a}),r=(e=(i=t==null?void 0:t.getSingleSOW)==null?void 0:i.sowPDF)==null?void 0:e.base64;return{pdfData:r?l(r,"application/pdf"):null,loading:[c.loading,c.refetch].includes(n),refetch:o}}function m(){const{addPrimaryIconToast:a}=p(),[t]=S({fetchPolicy:"network-only"});return f.useCallback(async(o,r)=>{var e,d;a("PDF download will begin shortly.");const{data:s}=await t({variables:{id:o}}),i=(d=(e=s==null?void 0:s.getSingleSOW)==null?void 0:e.sowPDF)==null?void 0:d.base64;i&&await w(l(i,"application/pdf"),"application/pdf",r)},[a,t])}function D({id:a,statementOfWork:t}){var e;const{signee:n}=g((t==null?void 0:t.linkedContract)??null),{data:o,networkStatus:r}=P({fetchPolicy:"cache-and-network",variables:{id:a,contactId:(n==null?void 0:n._id)??""},skip:!a||!n}),s=(e=o==null?void 0:o.previewWithSign)==null?void 0:e.base64;return{pdfData:s?l(s,"application/pdf"):null,loading:[c.loading,c.refetch].includes(r)}}export{D as a,h as b,m as u};
//# sourceMappingURL=statementOfWorkPdf-95417ec8.js.map