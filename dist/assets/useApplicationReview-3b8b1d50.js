var pe=Object.defineProperty;var ue=(e,t,a)=>t in e?pe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var Y=(e,t,a)=>(ue(e,typeof t!="symbol"?t+"":t,a),a);import{s as w,x as T,I as B,c as m,j as o,T as y,am as he,F as me,cI as ge,kK as fe,M as xe,t as G,h as be,i as we,S as q,k as ye,B as K,eb as Q,Y as De,v as Fe,aR as ke,kL as Ie,kM as ve,kN as A,kO as E}from"./index-cd84bcc9.js";import{C as g,a6 as b,r as f,B as P,h as J,f as Se}from"./vendor-51460554.js";const Ce=g.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 362px;
  width: 458px;
  border-radius: 8px;
  background-color: var(--bg-dragdrop-neutral-default);
  border: 1px solid var(--border-dragdrop-neutral-default);
  border-style: none;

  ${({isSingleFileDownload:e})=>e&&b`
      width: 100%;
      height: 470px;

      @media (max-width: ${w.TABLET_L}) {
        width: 100%;
        height: 100%;
      }
    `}
  ${({isSingleFileDownload:e})=>!e&&b`
      @media (max-width: ${w.TABLET_L}) {
        width: 100%;
        height: 362px;
      }
    `}



  @media (max-width: ${w.MOBILE_MAX}) {
    width: 100%;
    height: 287px;
  }
`,Te=g(T)`
  width: 100%;
  height: 65px;
  box-sizing: border-box;
  padding: 12px;
  border-bottom: 1px solid var(--border-dragdrop-neutral-default);
`,Ue=g(B)`
  cursor: pointer;
`,Me=g.div`
  width: 100%;
  height: 297px;
  box-sizing: border-box;

  ${({isSingleFileDownload:e})=>e&&b`
      height: 80%;
    `}

  @media (max-width: ${w.MOBILE_MAX}) {
    width: 100%;
    height: 221px;
  }
`,Pe=g.img`
  width: 100%;
  height: 297px;

  ${({isSingleFileDownload:e})=>e&&b`
      height: 100%;
    `}

  @media (max-width: ${w.MOBILE_MAX}) {
    width: 100%;
    height: 221px;
  }
`,ze=g.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 362px;
  width: 458px;
  cursor: pointer;
  border-radius: 8px;

  ${({isSingleSideUpload:e})=>e&&b`
      height: 470px;
      width: 100%; ;
    `}

  ${({isDraggingOver:e})=>e&&b`
      background-color: var(--bg-dragdrop-brand-secondary-focused);
      border: 2px solid var(--border-dragdrop-brand-primary-focused);
      border-style: dashed;
    `}
  ${({isDraggingOver:e})=>!e&&b`
      background-color: var(--bg-dragdrop-neutral-default);
      border: 1px solid var(--border-dragdrop-neutral-default);
      border-style: none;
    `}

${({isSingleSideUpload:e})=>!e&&b`
      @media (max-width: ${w.TABLET_L}) {
        width: 100%;
        height: 362px;
      }
    `}

${({isSingleSideUpload:e})=>e&&b`
      @media (max-width: ${w.TABLET_L}) {
        width: 100%;
        height: 80vh;
      }
    `}




  @media (max-width: ${w.MOBILE_MAX}) {
    width: 100%;
    height: 287px;
  }
`;g.div`
  height: 24px;
`;const Be=g.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;g.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 16px;
  gap: 12px;
  height: 24px;
  flex: none;
  flex-grow: 0;
`;const Le=g.div`
  display: flex;
  align-items: center;
`;g.div`
  width: 24px;
  height: 24px !important;
  position: relative;
`;const Ae=g(T).attrs({gap:"16px",align:"center"})`
  width: 438px;
  padding: 16px;
  height: 80px;
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
  @media (max-width: ${w.MOBILE_MAX}) {
    width: 100%;
    height: 127px;
  }
`,Ee=g(T).attrs({})`
  box-sizing: border-box;
  @media (max-width: ${w.MOBILE_MAX}) {
    width: 279px;
    height: 95px;
  }
`,$e=g.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 8px;
  box-sizing: border-box;
  ${({isSuccess:e})=>e&&b`
      background-color: var(--bg-iconbox-success-secondary-default);
    `}
  ${({isSuccess:e})=>!e&&b`
      background-color: var(--bg-iconbox-brand-secondary-default);
    `}
`,_e=g(T).attrs({vertical:!0})`
  width: 290px;
  box-sizing: border-box;

  @media (max-width: ${w.MOBILE_MAX}) {
    width: 100%;
  }
`,Oe=g(B)`
  transition: transform 0.3s;
  ${({isOpen:e})=>e&&"transform: rotate(180deg)"};
`,Re=g(T).attrs({align:"center",justify:"center"})`
  width: 24px;
  height: 24px;
  background-color: var(--bg-badge-brand-secondary-default);
  border-radius: 12px;
`,He=({variant:e,isOpen:t,onToggle:a,isMobile:n})=>m(Ae,{"data-test":"Picker-IDPickerContainer",children:[m(Ee,{align:n?void 0:"center",justify:n?"center":void 0,gap:n?"10px":"16px",vertical:n,"data-test":"Picker-IDPickerLeft",children:[o($e,{isSuccess:e==="success","data-test":"Picker-IDPickerIcon",children:o(B,{name:e==="primary"?"id_card_m":"tick_m",size:26,color:e==="primary"?"--icon-iconbox-brand-primary-default":"--icon-iconbox-success-primary-default","data-test":"Picker-Icon"})}),m(_e,{gap:n?void 0:"4px","data-test":"Picker-IDPickerContent",children:[o(y,{font:"body-l",colorToken:"--text-card-neutral-highlighted","data-test":"Picker-TSpan",children:"Government-issued ID Document"}),o(y,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"Picker-TSpan",children:"Upload 1 of the 3 types of required documents"})]})]}),e==="primary"?o(Oe,{name:"chevron_down_m",isOpen:t,size:14,onClick:a,color:"--icon_card-neutral-highlighted","data-test":"Picker-Chevrolet"}):o(B,{onClick:a,name:"edit_m",size:24,color:"--icon_card-neutral-highlighted","data-test":"Picker-Icon"})]}),et=({documentOptions:e,onSelect:t,isMobile:a,variant:n})=>{const[i,s]=f.useState(!1);return o(he,{usePortal:!0,usePopStyle:!0,isAnimation:!1,options:e,hideIcons:!0,placement:"bottom-start",onSelectOption:l=>{t(l)},onClose:()=>s(!1),onOpen:()=>s(!0),"data-test":"DwollaDocumentDropDown-Dropdown",children:({inputRef:l,toggle:d})=>o("div",{style:{width:"100%"},ref:l,children:o(He,{variant:n,isOpen:i,onToggle:d,isMobile:a,"data-test":"DwollaDocumentDropDown-Picker"})})})},V=({heading:e,index:t})=>m(T,{gap:8,align:"center","data-test":"DocumentHeading-Stack",children:[o(Re,{"data-test":"DocumentHeading-Index",children:o(y,{textAlign:"center",font:"footnote-bold",colorToken:"--text-badge-brand-primary-default","data-test":"DocumentHeading-TSpan",children:t})}),o(y,{colorToken:"--text-modal-neutral-highlighted",font:"body-l-bold","data-test":"DocumentHeading-TSpan",children:e})]}),je=({isUploadComplete:e,isUploadStarted:t,onClick:a,defaultPlaceHolder:n,defaultSubPlaceHolder:i,isDraggingOver:s,linkPlaceHolder:l,onDragOverText:d,isMobile:u,isTablet:h,isSingleSideUpload:I})=>{const F=f.useMemo(()=>t&&!e||!1,[e,t]);return o(ze,{onClick:k=>{k.preventDefault(),a==null||a(k)},isDraggingOver:s,isSingleSideUpload:I,"data-test":"Input-UploadInputContainer",children:o(Le,{"data-test":"Input-IConTextWrapper",children:o(me,{children:!F&&!e&&m(Be,{"data-test":"Input-TextWrapper",children:[m(y,{font:"body-l-bold",colorToken:s||h||u?"--text-dragdrop-brand-primary-default":"--text-dragdrop-header-neutral-default","data-test":"Input-TSpan",children:[s?d:n,l&&!s&&m(y,{colorToken:"--text-dragdrop-brand-primary-default","data-test":"Input-TSpan",children:[" ",l]}),"."]}),o(y,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"Input-TSpan",children:i})]})})})})},We=f.memo(({url:e,maximumFileSize:t,defaultPlaceHolder:a,defaultSubPlaceHolder:n,onContentChange:i,onUploadFile:s,isUploadStarted:l,isUploadComplete:d,linkPlaceHolder:u,onDragOverText:h,isMobile:I,isTablet:F,isSingleSideUpload:v})=>o(ge,{url:e,maxSize:t,acceptedFileTypes:fe,onContentChange:i,uploadToS3:!1,onUploadFile:s,"data-test":"UploadInput-Upload",children:({triggerElRef:k,...S})=>o("div",{ref:k,children:o(je,{isUploadComplete:d,isUploadStarted:l,onClick:S.onClickHandler,defaultPlaceHolder:a,defaultSubPlaceHolder:n,isDraggingOver:S.isDraggingOver,linkPlaceHolder:u,onDragOverText:h,isMobile:I,isTablet:F,isSingleSideUpload:!!v,"data-test":"UploadInput-Input"})})})),Xe=({uploadedFileBlob:e,fileName:t,fileSize:a,isSingleFileUpload:n,clearFile:i})=>m(Ce,{isSingleFileDownload:n,"data-test":"FileDisplay-DisplayFileContainer",children:[m(Te,{align:"center",justify:"space-between","data-test":"FileDisplay-FileDetails",children:[m(T,{vertical:!0,"data-test":"FileDisplay-Stack",children:[o(y,{font:"body-m",colorToken:"--text-card-header-neutral-highlighted","data-test":"FileDisplay-TSpan",children:t}),m(y,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"FileDisplay-TSpan",children:[Math.ceil(a/(1024*1024))," MB"]})]}),o(Ue,{onClick:()=>i(),name:"close_m",size:24,color:"--icon-card-neutral-default","data-test":"FileDisplay-ClearFile"})]}),o(Me,{isSingleFileDownload:n,"data-test":"FileDisplay-DocumentContainer",children:o(Pe,{isSingleFileDownload:n,src:e,alt:"","data-test":"FileDisplay-Image"})})]}),Z=f.memo(({uploadedFile:e,clearFile:t,...a})=>e?o(Xe,{uploadedFileBlob:URL.createObjectURL(e),fileName:e.name,fileSize:e.size,clearFile:t,isSingleFileUpload:!!a.isSingleSideUpload,"data-test":"UploadComponent-FileDisplay"}):o(We,{uploadedFile:e,...a,"data-test":"UploadComponent-UploadInput"})),tt=({contextData:e,uploadedBackSideFile:t,uploadedFrontSideFile:a,onClose:n,open:i,disable:s,isMobile:l,isTablet:d,isXLSize:u,isSingleSideUpload:h,onFrontSideUpload:I,onBackSideUpload:F,clearBackSideFile:v,clearFrontSideFile:k,onConfirmAndSave:S,maxUploadSize:U})=>m(xe,{open:i,enableCloseButton:!0,size:u?G.XL:G.XXL,onClose:n,children:[o(be,{children:m(y,{font:"heading-xs-bold",colorToken:"--text-modal-header-neutral-default","data-test":"DwollaDocumentModal-TSpan",children:["Upload Scan/Photo of Your ",e?e.label:""]})}),m(we,{flexDirection:l?"column":"row",gap:16,maxHeight:600,children:[m("div",{style:{width:"100%"},children:[!h&&o(V,{index:1,heading:"Front side of your document","data-test":"DwollaDocumentModal-DocumentHeading"}),o(q,{height:16,"data-test":"DwollaDocumentModal-Spacer"}),o(Z,{url:"",onUploadFile:I,maximumFileSize:U,defaultPlaceHolder:d||l?P("noumena.money.application.review.add.file.touch"):P("noumena.money.application.review.add.file.non.touch"),onDragOverText:"Drag your file here",linkPlaceHolder:d||l?"":"browse",defaultSubPlaceHolder:P("noumena.money.application.review.add.file.placeholder",{maxUploadSize:String(U)}),isUploadStarted:!1,isUploadComplete:!1,uploadedFile:a,clearFile:k,isMobile:l,isTablet:d,isSingleSideUpload:h,"data-test":"DwollaDocumentModal-UploadComponent"})]}),!h&&m("div",{style:{width:"100%"},children:[o(V,{index:2,heading:"Back side of your document","data-test":"DwollaDocumentModal-DocumentHeading"}),o(q,{height:16,"data-test":"DwollaDocumentModal-Spacer"}),o(Z,{url:"",onUploadFile:F,maximumFileSize:U,defaultPlaceHolder:d||l?P("noumena.money.application.review.add.file.touch"):P("noumena.money.application.review.add.file.non.touch"),onDragOverText:"Drag your file here, or",linkPlaceHolder:d||l?"":"browse",defaultSubPlaceHolder:P("noumena.money.application.review.add.file.placeholder",{maxUploadSize:String(U)}),isUploadStarted:!1,isUploadComplete:!1,uploadedFile:t,clearFile:v,isMobile:l,isTablet:d,"data-test":"DwollaDocumentModal-UploadComponent"})]})]}),m(ye,{flexDirection:"row",gap:16,children:[o(K,{size:"full",onClick:n,"data-test":"DwollaDocumentModal-Button",children:"Cancel"}),o(K,{onClick:S,disabled:s,size:"full",leftIcon:o(B,{name:"tick_m",size:24,"data-test":"DwollaDocumentModal-Icon"}),primary:!0,intent:"positive","data-test":"DwollaDocumentModal-Button",children:"Confirm & Save"})]})]});class Ne{constructor(){Y(this,"controller",{})}async uploadFileWithSignedUrl(t,a){var n;try{this.controller=new AbortController;const i={"Content-Type":a.type};return(await J.put(t,a,{headers:i,signal:(n=this.controller)==null?void 0:n.signal})).status}catch(i){return J.isCancel(i)?Q(i):(Se(i,{tags:{section:"uploadFileWithSignedUrl"}}),Q(i))}}cancelUpload(){var t,a;(t=this.controller)!=null&&t.abort&&((a=this.controller)==null||a.abort())}}const Ye=e=>{const t=document.createElement("canvas"),a=t.getContext("2d"),n=e.map(i=>new Promise(s=>{const l=new FileReader;l.onload=d=>{var h;const u=new Image;u.onload=()=>s(u),u.src=(h=d==null?void 0:d.target)==null?void 0:h.result},l.readAsDataURL(i)}));return Promise.all(n).then(i=>{let s=0;i.forEach(d=>{s+=d.height}),t.width=i[0].width,t.height=s;let l=0;return i.forEach(d=>{a==null||a.drawImage(d,0,l),l+=d.height}),new Promise(d=>{t.toBlob(u=>{if(u!==null){const h=new File([u],"merged.png",{type:"image/png"});d(h)}else throw new Error("Error converting canvas to blob.")},"image/png")})})},Ge=e=>URL.createObjectURL(e),qe=e=>{var n;const{documentName:t,url:a}=((n=e==null?void 0:e.data)==null?void 0:n.uploadCustomerDocuments)||{};return{name:t,url:a}},z={mergeImages:Ye,generateURL:Ge,getFileDetails:qe},at=({onSuccessfulUpload:e})=>{const[t,a]=f.useState({updatingIsInProgress:!1}),n=f.useMemo(()=>new Ne,[]),i=De(),s=Fe(),l=10,{openModal:d,closeModal:u,contextData:h,modalType:I}=ke(),[F]=Ie({fetchPolicy:"network-only",onError:r=>{i.logError(r,"upload-document-v2")}}),[v]=ve({fetchPolicy:"network-only",onCompleted:e,onError:r=>{i.logError(r,"update-document-v2")}}),k=[{key:"passport",value:A.Passport,type:"value",label:"U.S. Passport"},{key:"license",value:A.License,type:"value",label:"Driving License"},{key:"idcard",value:A.IdCard,type:"value",label:"U.S. Government-issued Identification Card"}],S=()=>{a({frontSideFile:void 0,backSideFile:void 0,documentName:null,documentUrl:"",updatingIsInProgress:!1})},U=f.useCallback(r=>{t.documentType!==r.value&&S(),a(c=>({...c,documentType:r.value})),d("upload-document",r)},[d,t.documentType]),ee=f.useCallback(r=>{if(!r){a(p=>({...p,frontSideFile:r}));return}if(r.size/1024/1024>l){s.addErrorToast(`file should be less than ${l} Mb`);return}a(p=>({...p,frontSideFile:r}))},[s]),te=f.useCallback(r=>{if(!r){a(p=>({...p,backSideFile:r}));return}if(r.size/1024/1024>l){s.addErrorToast(`file should be less than ${l} Mb`);return}a(p=>({...p,backSideFile:r}))},[s]),M=f.useCallback((r,c)=>F({variables:{input:{documentName:r,contentType:c}}}),[F]),ae=f.useCallback(()=>{S(),u()},[u]),oe=f.useCallback(async()=>{const{frontSideFile:r,backSideFile:c}=t;if(r&&c){const p=await z.mergeImages([r,c]);a(x=>({...x,mergedFile:p}))}u()},[u,t]),_=f.useCallback(async r=>{let c=[];const{frontSideFile:p,backSideFile:x,mergedFile:D}=r,L=await M(p.name,p.type),$=await M(x.name,x.type),C=await M(D.name,D.type),{name:R,url:H}=z.getFileDetails(L),{name:j,url:W}=z.getFileDetails($),{name:X,url:N}=z.getFileDetails(C);if(!!R&&!!H&&!!j&&!!W&&!!X&&!!N){const de=await n.uploadFileWithSignedUrl(H,p),se=await n.uploadFileWithSignedUrl(W,x),ce=await n.uploadFileWithSignedUrl(N,D);de===200&&se===200&&ce===200&&(c=[{name:R,uploadFor:E.Front},{name:j,uploadFor:E.Back},{name:X,uploadFor:E.Merged}])}return c},[M,n]),O=f.useCallback(async r=>{let c=[];const p=await M(r.name,r.type),{name:x,url:D}=z.getFileDetails(p);return x&&D&&await n.uploadFileWithSignedUrl(D,r)===200&&(c=[{name:x,uploadFor:E.Front}]),c},[M,n]),ne=f.useCallback(async()=>{let r=[];a(C=>({...C,updatingIsInProgress:!0}));const{frontSideFile:c,backSideFile:p,mergedFile:x,documentType:D}=t,L=!!c&&!!p&&!!x,$=!!c&&!p&&!x;try{L&&(r=await _({frontSideFile:c,backSideFile:p,mergedFile:x})),$&&(r=await O(c)),r.length&&D&&await v({variables:{input:{documents:r,type:D}}})}catch(C){i.logError(C,"upload-document-mutation",!0)}finally{a(C=>({...C,updatingIsInProgress:!1}))}},[_,O,i,t,v]),re=I==="upload-document",ie=!t.frontSideFile,le=(h==null?void 0:h.value)===A.IdCard;return{documentOptions:k,services:n,button:{disable:ie},file:{updateFront:ee,updateBack:te,confirmAndSave:oe,isSingleSideUpload:le,handleContinue:ne,updatingIsInProgress:t.updatingIsInProgress,frontSide:t.frontSideFile,backSide:t.backSideFile},modal:{isOpen:re,handleOpen:U,contextData:h,handleClose:ae}}};export{et as D,tt as a,at as u};
//# sourceMappingURL=useApplicationReview-3b8b1d50.js.map
