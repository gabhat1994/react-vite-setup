import{C as s}from"./vendor-51460554.js";import{T as x,c,j as t}from"./index-cd84bcc9.js";import{S as f,I as F}from"./styles-e426deab.js";const h=s.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid var(--border-card-neutral-default);
`,D=s.div`
  display: flex;
  margin-top: 16px;
  flex-direction: ${({flexDirection:e})=>e??"row"};
  justify-content: flex-end;
`,M=s(x)`
  padding: 16px 16px 0px 16px;
  display: block;
`,y=({value:e,id:d,label:a,disabled:l=!1,noBorder:i,isAlwaysFocus:n,inputSize:o,leftIcon:p,rightIcon:r,error:m=!1,onChangeHandler:u})=>c(f,{"data-testid":"Styled-TextField-masked-input",inputSize:o,isAlwaysFocus:n,error:m,disabled:l,leftIcon:!!p,rightIcon:!!r,label:a,noBorder:i,"data-test":"CustomDateInputMaskField-StyledTextField",children:[t(F,{formatChars:{0:"[0-1]",1:"[0-9]",3:"[0-3]",4:"[0-9]"},mask:"01/34/4444",placeholder:"MM/DD/YYYY",onChange:u,value:e??void 0,"data-test":"CustomDateInputMaskField-InputMask"}),t("fieldset",{"data-test":"CustomDateInputMaskField-fieldset",children:t("legend",{"data-test":"CustomDateInputMaskField-legend",children:t("span",{children:a})})}),t("label",{"data-testid":"labelTestId",htmlFor:d,"data-test":"CustomDateInputMaskField-label",children:a})]});export{D as B,y as C,h as D,M as S};
//# sourceMappingURL=CustomDateInputMaskField-46ce4df4.js.map
