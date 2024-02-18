import{f as y,aa as R,c,j as e,a1 as M,d7 as C,b7 as k,ab as S,s as v,S as d,T as p,I as _,B as b,X as D,v as T,q1 as B,R as h,n as U,kv as I}from"./index-cd84bcc9.js";import{C as o,B as r,ar as L,r as m,a9 as O}from"./vendor-51460554.js";import{u as E,D as F,a as N}from"./useApplicationReview-3b8b1d50.js";const $=o.div`
  font-family: var(--font-family);
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  background: white;
`,z=o.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  gap: 0;
  background: white;
  padding-left: ${a=>a.isMobile?"16px":"40px"};
  padding-right: ${a=>a.isMobile?"16px":"40px"};
  padding-bottom: ${a=>a.isMobile?"16px":"0px"};
  overflow: hidden;
`,P=o.div`
  width: ${a=>a.isMobile?"343px":"438px"};
`,g=({children:a})=>{const{user:n}=y(),i=R();return c($,{"data-testid":"layout-container","data-test":"ApplicationReviewLayout-Container",children:[e(M,{isBorderRadius:!1,"data-test":"ApplicationReviewLayout-Header",children:e(C,{avatar:k.getProfilePicture(n)||void 0,userName:(n==null?void 0:n.firstName)||void 0,"data-test":"ApplicationReviewLayout-MainHeader"})}),e(z,{"data-testid":"layout-main",isMobile:i===S.MOBILE,"data-test":"ApplicationReviewLayout-Main",children:e(P,{"data-testid":"layout-main-content",isMobile:i===S.MOBILE,"data-test":"ApplicationReviewLayout-Content",children:a})})]})},w=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: white;
  position: relative;
`,f=o.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
`,j=o.div`
  width: 100%;
  margin-top: 32px;
  @media (max-width: ${v.MOBILE_MAX}) {
    position: absolute;
    margin-top: 0;
    top: calc(100% - 65px);
  }
`,V=o.div`
  width: 100%;
  margin-top: 32px;
  @media (max-width: ${v.MOBILE_MAX}) {
    position: absolute;
    margin-top: 0;
    top: calc(100% - 65px);
  }
`,W=o.div`
  border-radius: 200px;
  background-color: var(--bg-body-neutral-alt-default);
  border: 1px solid var(--bg-body-neutral-alt-default);
  align-self: center;
  width: 96px;
  height: 96px;
  flex-grow: 0;
  align-items: center;
`,X=({onButtonClick:a})=>e(g,{"data-test":"SubmittedScreen-Layout",children:c(w,{"data-test":"SubmittedScreen-Container",children:[e(d,{height:16,"data-test":"SubmittedScreen-Spacer"}),e(p,{font:"heading-s-bold",textAlign:"center",colorToken:"--text-card-header-neutral-highlighted","data-test":"SubmittedScreen-TSpan",children:r("noumena.application_review_completed_heading")}),e(d,{height:64,"data-test":"SubmittedScreen-Spacer"}),c(f,{"data-test":"SubmittedScreen-UploadContainer",children:[e(W,{"data-test":"SubmittedScreen-WrapperIcon",children:e(_,{name:"success_cq_xxxl",size:96,"data-test":"SubmittedScreen-Icon"})}),e(d,{height:64,"data-test":"SubmittedScreen-Spacer"}),e(p,{font:"body-l",colorToken:"--text-body-neutral-default",textAlign:"center","data-test":"SubmittedScreen-TSpan",children:r("noumena.application_review_succes_message")}),e(V,{"data-test":"SubmittedScreen-ReturnToNoumenaWrapper",children:e(b,{primary:!0,size:"full",onClick:a,"data-test":"SubmittedScreen-Button",children:r("noumena.application_review_completed_btn")})})]})]})}),H=10,q=({onSuccessfulUpload:a})=>{const{documentOptions:n,modal:i,file:t,button:u}=E({onSuccessfulUpload:a}),l=D(),{t:s}=L();return e(g,{"data-testid":"application-layout","data-test":"ApplicationReview-Layout",children:c(w,{"data-test":"ApplicationReview-Container",children:[e(d,{height:16,"data-test":"ApplicationReview-Spacer"}),e(p,{font:"heading-s-bold",colorToken:"--text-card-header-neutral-highlighted",textAlign:"center","data-test":"ApplicationReview-TSpan",children:s("noumena.application_review_heading")}),e(d,{height:16,"data-test":"ApplicationReview-Spacer"}),e(p,{font:"body-l",textAlign:"center",colorToken:"--text-body-neutral-default","data-test":"ApplicationReview-TSpan",children:s("noumena.application_review_sub_heading")}),e(d,{height:64,"data-test":"ApplicationReview-Spacer"}),c(f,{"data-test":"ApplicationReview-UploadContainer",children:[e(d,{height:16,"data-test":"ApplicationReview-Spacer"}),e(F,{documentOptions:n,onSelect:i.handleOpen,isMobile:l.isMobile,variant:t.frontSide?"success":"primary","data-test":"ApplicationReview-DwollaDocumentDropDown"})]}),e(j,{"data-test":"ApplicationReview-ContinueButton",children:e(b,{loading:t.updatingIsInProgress,disabled:t.updatingIsInProgress||!t.frontSide,onClick:t.handleContinue,size:"full",primary:!0,"data-test":"ApplicationReview-Button",children:s("noumena.application_review_btn")})}),i.isOpen&&e(N,{open:i.isOpen,onClose:i.handleClose,contextData:i.contextData,disable:u.disable,onConfirmAndSave:t.confirmAndSave,isMobile:l.isMobile,isTablet:l.isTablet,isSingleSideUpload:t.isSingleSideUpload,isXLSize:t.isSingleSideUpload,onFrontSideUpload:t.updateFront,onBackSideUpload:t.updateBack,uploadedFrontSideFile:t.frontSide,uploadedBackSideFile:t.backSide,clearFrontSideFile:t.updateFront,clearBackSideFile:t.updateBack,maxUploadSize:H,"data-test":"ApplicationReview-DwollaDocumentModal"})]})})},Y=()=>{const[a,n]=m.useState(0),i=O(),{addSuccessIconToast:t}=T(),{loading:u}=B({fetchPolicy:"cache-and-network",onCompleted:({getWalletBalance:x})=>{const{docStatus:A}=x||{};Object.values(I).includes(A)&&(t(r("noumena.money.setupWallet.document.already.uploaded")),i(h.MONEY))}}),l=m.useCallback(()=>{n(1)},[]),s=m.useCallback(()=>{i(h.MONEY)},[i]);return u?e(U,{"data-test":"ApplicationReviewV2-Spinner"}):a===0?e(q,{onSuccessfulUpload:l,"data-test":"ApplicationReviewV2-UploadComponent"}):e(X,{onButtonClick:s,"data-test":"ApplicationReviewV2-SubmittedScreen"})},K=Y;export{K as default};
//# sourceMappingURL=ApplicationReview-9ebe025e.js.map
