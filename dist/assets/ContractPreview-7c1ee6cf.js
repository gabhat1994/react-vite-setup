import{f as I,Y as K,aR as z,c as l,F as y,j as t,b7 as q,ev as V,R as M,T as Y,v as $,n as J,eq as Q,eu as X}from"./index-cd84bcc9.js";import{ar as H,a9 as Z,b2 as ee,C as O,aa as te,bo as F,bz as R}from"./vendor-51460554.js";import{u as ne,C as ae}from"./useContractPreviewScreen-f7a52406.js";import{S as A}from"./StickyFormHeader-043ef98d.js";import{u as b}from"./contractPermissions-cf3fd14b.js";import{a as oe}from"./styles-548b0144.js";import{C as u}from"./contract-47e31a61.js";import{D as re,R as ie,a as se}from"./DocumentSignaturePreview-a0af4fc2.js";import{D as le}from"./DeleteDocumentConfirmationModal-44709272.js";import{R as de,E as me,d as ce,a as ue,D as T,K as pe,e as x,f as fe}from"./Section-2a57cf43.js";import{u as Ce}from"./contractPdf-f9d6c58f.js";import{u as ge}from"./useScrollIntoElement-809d6327.js";import{S as B,R as Se,F as De}from"./index-38931f83.js";import{u as he}from"./navigation-419d637e.js";import{S as we}from"./SecretNoumAlertModal-f376a2a7.js";import"./Infobox-cf6af02b.js";import"./payloadParser-f4cc4e4f.js";import"./getTimeStampForDisplaying-22d5ca9d.js";import"./RouterLink-30e622d4.js";import"./styles-58edde60.js";import"./contactDetails-4902172b.js";import"./countries-4aa86a38.js";import"./statementOfWork-e03c986f.js";import"./Flag-d41fef47.js";import"./contract-546e6b09.js";import"./contactNoumConnection-819cdc27.js";import"./TickCheckbox-c4d9d4b6.js";import"./index-35efb18f.js";import"./styles-5db1c009.js";import"./ChamberLeftSideBar-2a7f8e7f.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./sideNavItems-22800105.js";import"./styles-b4894a1f.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./Accordion-ea03839b.js";const Pe=({contract:e,onConfirmDelete:d,onConfirmDecline:n,onConfirmResend:m,onDuplicate:p,onGoBackToList:s})=>{const{t:i}=H(),o=Z(),{user:S}=I(),{logError:c}=K(),{modalType:f,openModal:C,closeModal:r}=z(),v=Ce(),a=b(),{formState:{isValid:D,isDirty:h}}=oe(),_=()=>{s()},k=()=>{C("delete")},w=async()=>{await p()},P=()=>{e!=null&&e._id&&o(ee(M.CONTRACT_EDIT,{id:e._id}),{replace:!0})},L=()=>{C("decline")},U=()=>{C("resend")},j=async()=>{try{await d(),r(),s()}catch(g){r(),c(g,"contract-draft")}},W=async()=>{try{await n()}catch(g){c(g,"contract-decline")}finally{r()}},G=async()=>{try{await m()}catch(g){c(g,"contract-resend")}finally{r()}},N=()=>{e!=null&&e._id&&v(e._id,u.formatPdfFileName(e))};return l(y,{children:[t(A,{showBackButton:!q.isUnauthenticated(S),title:i("noumena.contract_preview.title"),buttons:a.isOwner(e)?l(y,{children:[a.canResend(e)&&t(de,{onClick:U}),a.canEdit(e)&&t(me,{onClick:P}),a.canDuplicate(e)&&t(ce,{onClick:w}),a.canDelete(e)&&t(ue,{onClick:k,isDraft:u.isDraft(e)}),a.canDownloadPdf(e)&&!u.isDraft(e)&&t(T,{onClick:N}),a.canSaveDraft(e)&&t(pe,{onClick:_}),a.canSign(e)&&t(x,{softDisabled:!(D&&h)})]}):l(y,{children:[a.canDownloadPdf(e)&&!u.isDraft(e)&&t(T,{onClick:N}),a.canDecline(e)&&t(fe,{onClick:L}),a.canSign(e)&&t(x,{softDisabled:!(D&&h)})]}),"data-test":"ContractPreviewHeader-StickyFormHeader"}),t(le,{isOpen:f==="delete",isDraft:u.isDraft(e),documentName:(e==null?void 0:e.title)??"",documentType:V.Contract,onCancel:r,onDelete:j,"data-test":"ContractPreviewHeader-DeleteDocumentConfirmationModal"}),t(re,{isOpen:f==="decline",documentName:(e==null?void 0:e.title)??"",onCancel:r,onDelete:W,"data-test":"ContractPreviewHeader-DeclineDocumentConfirmationModal"}),t(ie,{isOpen:f==="resend",onCancel:r,onConfirm:G,"data-test":"ContractPreviewHeader-ResendDocumentConfirmationModal"})]})},ye=({contract:e,title:d,onGoBack:n,onDownloadPdf:m})=>{const p=b();return t(y,{children:t(A,{onGoBack:n,title:d,buttons:e&&p.canDownloadPdf(e)&&t(T,{onClick:m}),"data-test":"ContractSigningHeader-StickyFormHeader"})})},ve=O(Y)`
  white-space: pre-wrap;

  ul {
    margin-top: 4px;
    margin-top: 4px;
  }
`,E={DescriptionText:ve},_e=({isUnauthenticated:e,...d})=>{const{t:n}=H(),m=e?l(E.DescriptionText,{font:"body-l",colorToken:"--text-modal-neutral-default",children:[n("noumena.contracts.secret_noum_modal.unauthenticated.description_1"),l("ul",{"data-test":"ContractSecretNoumAlertModal-descriptionElement",children:[t("li",{children:n("noumena.contracts.secret_noum_modal.unauthenticated.description_2")}),t("li",{children:n("noumena.contracts.secret_noum_modal.unauthenticated.description_3")})]})]}):t(E.DescriptionText,{font:"body-l",colorToken:"--text-modal-neutral-default",children:n("noumena.contracts.secret_noum_modal.member.description")});return t(we,{warningText:n(e?"noumena.contracts.secret_noum_modal.unauthenticated.warning_text":"noumena.contracts.secret_noum_modal.member.warning_text"),description:m,title:n("noumena.contracts.secret_noum_modal.title"),...d,"data-test":"ContractSecretNoumAlertModal-SecretNoumAlertModal"})},ke=O.form`
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-grow: 1;
`,Me={SignatureModalForm:ke};function mt(){const{id:e}=te(),{addErrorToast:d}=$(),{scrollIntoElement:n}=ge(),{goBackToOrigin:m}=he(),p=b(),{summary:s,signature:i,contract:o,previewStep:S,linkedSows:c,closeModal:f,modalType:C,contextData:r,changeStep:v,deleteContract:a,declineContract:D,duplicateContract:h,resendContract:_}=ne({id:e}),k=()=>{m({fallbackUrl:X.contractManager()})},w=()=>{v("Summary")},P=()=>{d("Please check all the agreements in the last section to continue."),n("agreements")};return!e||!o&&!s.isLoading||o&&!p.canSeeSummary(o)?t(F,{to:M.NOT_FOUND,replace:!0,"data-test":"Navigate"}):S==="Summary"?t(B,{"data-test":"SinglePageLayout",children:l(R,{...s.form,"data-test":"FormProvider",children:[l("form",{onSubmit:s.form.handleSubmit(s.onSubmit,P),children:[t(Pe,{contract:o,onConfirmDelete:a,onConfirmDecline:D,onDuplicate:h,onGoBackToList:k,onConfirmResend:_,"data-test":"ContractPreviewHeader"}),t(Se,{"data-test":"ResponsiveMain",children:s.isLoading?t(J,{"data-test":"Spinner"}):o?t(ae,{contract:o,linkedSows:c.data,isLoadingLinkedSows:c.loading,"data-test":"ContractPreview"}):null})]}),t(_e,{isOpenModal:C==="secretNoumAlert",onClose:f,isUnauthenticated:!!(r!=null&&r.isUnauthenticated),"data-test":"ContractSecretNoumAlertModal"})]})}):S==="ConfirmSignature"?t(B,{"data-test":"SinglePageLayout",children:l(De,{"data-test":"FullHeightMain",children:[t(ye,{title:"Check your Contract before signing",onGoBack:w,contract:o,onDownloadPdf:()=>{!o||!i.pdfWithSignature||Q(i.pdfWithSignature,"application/json",u.formatPdfFileName(o))},"data-test":"ContractSigningHeader"}),t(Me.SignatureModalForm,{onSubmit:i.form.handleSubmit(i.onSubmit,P),children:t(R,{...i.form,"data-test":"FormProvider",children:t(se,{pdfData:i.pdfWithSignature,isLoading:i.isLoading,onGoBack:w,"data-test":"DocumentSignaturePreview"})})})]})}):t(F,{to:M.NOT_FOUND,replace:!0,"data-test":"Navigate"})}export{mt as default};
//# sourceMappingURL=ContractPreview-7c1ee6cf.js.map