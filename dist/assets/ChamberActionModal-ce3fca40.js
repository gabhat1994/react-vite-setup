import{j as t,M as S,t as B,c as e,n as T,S as d,F as a,T as M,h as k,i as I,k as z,B as o}from"./index-cd84bcc9.js";import{C}from"./vendor-51460554.js";import{W,a as j}from"./styles-1a9b9e59.js";C.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 279px;
  text-align: center;
`;const L=C.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 16px;
`,H=({isOpen:b=!0,isWaiting:u=!1,textForWaiting:n=void 0,isLoading:x=!1,title:f,description:r,body:i,positiveBtnLabel:A,positiveBtnType:l="primary",negativeBtnLabel:y="Close",positiveBtnIntent:s=void 0,extraBtnLabel:c,extraBtnCallback:h,cancelCallback:m,confirmCallback:g})=>{const p={};return l&&(p[l]=!0),t(S,{testId:"chamberActionModal",open:b,onClose:m,size:B.S,disableBackdropClick:!0,"data-test":"ChamberActionModal-Modal",children:u||x?e(W,{"data-testid":"loadingSpinnerModal","data-test":"ChamberActionModal-WrapperLoading",children:[e(j,{"data-test":"ChamberActionModal-WrapperSpinner",children:[t(T,{"data-test":"ChamberActionModal-Spinner"}),t(d,{height:"20px","data-test":"ChamberActionModal-Spacer"})]}),t(d,{height:"16px","data-test":"ChamberActionModal-Spacer"}),n&&t(a,{children:t(M,{colorToken:"--text-modal-neutral-default","data-testid":"bodyChamberWaitingText",font:"body-l","data-test":"ChamberActionModal-TSpan",children:n})})]}):e(a,{children:[t(k,{"data-test":"ChamberActionModal-ModalHeader",children:f}),t(I,{align:"center","data-test":"ChamberActionModal-ModalBody",children:t(L,{"data-test":"ChamberActionModal-BodyContent",children:r?t(M,{colorToken:"--text-modal-neutral-default",font:"body-l",textAlign:"center","data-testid":"description","data-test":"ChamberActionModal-TSpan",children:r}):i&&t(a,{children:i})})}),e(z,{flexDirection:"column",gap:16,"data-test":"ChamberActionModal-ModalFooter",children:[t(o,{size:"full",testId:"primaryBtn",textTestId:"primaryBtnLabel",onClick:g,...p,...s?{intent:s}:{},"data-test":"ChamberActionModal-Button",children:A}),c&&h&&e(a,{children:[t(o,{size:"full",testId:"extraBtn",textTestId:"extraBtnLabel",tertiary:!0,onClick:h,"data-test":"ChamberActionModal-Button",children:c}),t(d,{height:"16px","data-test":"ChamberActionModal-Spacer"})]}),t(o,{tertiary:!0,size:"full",onClick:m,testId:"secondaryBtn",textTestId:"secondaryBtnLabel","data-test":"ChamberActionModal-Button",children:y})]})]})})};export{H as C};
//# sourceMappingURL=ChamberActionModal-ce3fca40.js.map
