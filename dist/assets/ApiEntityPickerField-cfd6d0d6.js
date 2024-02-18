import{y as R,x as j,j as a,am as A,F as B,I as m}from"./index-cd84bcc9.js";import{C as l,r as D,B as H}from"./vendor-51460554.js";import{i as I}from"./utils-87d126b1.js";const N=l(R)`
  svg path {
    fill: var(--icon-input-neutral-default);
  }
`,J=l.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: ${e=>e.$inputSize==="small"?"4px 12px":"16px"};
  min-height: 40px;
  background: var(--bg-tablecell-neutral-pressed);
  border-radius: 8px;
  gap: 16px;
`,K=l.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`,L=l.div`
  width: ${e=>e.$fullWidth?"100%":"auto"};
`,M=l(j).attrs(()=>({gap:8,align:"center"}))``;function P({options:e,placeholderText:f,value:x,onChange:r,stickyHeaderOptions:p,inputValue:c,onInputChange:t,inputSize:i,label:h,disabled:o,leftIcon:S,rightIcon:b,fullWidth:y,renderSelectionPreviewComponent:d,isLoading:g,autoFocus:F,hideLeftIconPlace:v,preselectedOption:T,error:k,helperText:w,readOnly:O,..._}){const[$,n]=D.useState(!1),z=!(e!=null&&e.length),u=e.find(s=>I(s)&&s.key===x)??T;return d&&u?d({onChange:r,selectedOption:u,disabled:o,fullWidth:y,inputSize:i}):a(A,{noSearchOptionsText:H("noumena.global_search.no_results"),..._,isLoading:g,isShowEmptyText:z,stickyHeaderOptions:p,onSelectOption:r,isOpen:$,options:e,calRefTop:!1,"data-test":"Dropdown",children:({inputRef:s})=>a(B,{children:a(N,{autoFocus:F,onFocus:()=>n(!0),onBlur:()=>setTimeout(()=>n(!1),200),inputSize:i,placeholder:f,hideLeftIconPlace:v,ref:s,readOnly:O,leftIcon:S??a(m,{name:"search_m",size:24,color:"--icon-input-neutral-default","data-test":"Icon"}),rightIcon:b||!!c&&a(m,{onClick:()=>t==null?void 0:t(""),name:"clear_m",size:24,color:"--icon-input-neutral-default","data-test":"Icon"}),rightIconColor:"var(--icon-input-brand-primary-default)",value:c,onChange:E=>t==null?void 0:t(E.currentTarget.value),"data-testid":"global-search-input",label:h,disabled:o,error:k,helperText:w,"data-test":"SearchField"})})})}export{P as A,L as S,J as a,K as b,M as c};
//# sourceMappingURL=ApiEntityPickerField-cfd6d0d6.js.map
