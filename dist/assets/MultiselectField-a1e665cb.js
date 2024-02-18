import{I as D,x as L,y as S,j as o,am as U,c as $}from"./index-cd84bcc9.js";import{C as r,r as a,l as z}from"./vendor-51460554.js";import{M as P}from"./styles-26e8a352.js";import{u as K}from"./useElementDimensions-84b2a778.js";import{T as C}from"./TickCheckbox-c4d9d4b6.js";import{i as W}from"./utils-87d126b1.js";const q=r.div`
  width: 100%;
`,B=r(D).attrs(()=>({size:16,color:"--icon-button-neutral-default"}))`
  transition: transform 0.3s;
  ${({isOpen:n})=>n&&"transform: rotate(180deg)"};
`,G=r(L).attrs(()=>({gap:16,align:"center"}))`
  span {
    visibility: visible;
  }
`,H=r(S)`
  cursor: pointer;
`,i={RightIcon:B,Container:q,InputRightElements:G,TextField:H},k="ALL_VALUE";function ee({options:n,value:u,onChange:I,disabled:m,inputRightElement:O,allOptionLabel:p="All",leftIcon:E,hideIcons:M=!0,inputSize:T,error:v,helperText:V,label:w,disabledIconColor:R,isLoading:y,allSelectionStrategy:d="empty-means-none",...A}){const[b,g]=a.useState(!1),x=a.useRef(null),{size:{width:j}}=K(x),s=a.useMemo(()=>n.filter(W),[n]),l=a.useMemo(()=>{const e=s.map(t=>t.key);return d==="empty-means-all"&&u.length===0?e:z.intersection(e,u)},[d,u,s]),c=l.length===0?"empty":l.length===s.length?"all":"some",h=a.useMemo(()=>s.filter(e=>l.includes(e.key)),[l,s]),F=a.useMemo(()=>[{type:"value",key:k,label:p,value:k,rightIcon:o(C,{isChecked:c==="all",isIndeterminate:c==="some",captureClickEvent:!1,"data-test":"calculatedOptions-TickCheckbox"}),hideIconPlace:!0},...n.map(e=>({...e,rightIcon:o(C,{isChecked:h.includes(e),captureClickEvent:!1,"data-test":"calculatedOptions-TickCheckbox"})}))],[p,c,n,h]),_=e=>{let t=[];e.key===k?t=c==="all"?d==="empty-means-all"?l:[]:s.map(f=>f.key):t=P.toggleOne(l,e.key),I(t)};return o(i.Container,{ref:x,children:o(U,{hideIcons:M,inputValue:c==="all"?p:h.map(e=>e.label).join(", "),isLoading:y,options:y?[]:F,usePortal:!1,containerWidth:`${j}px`,disabled:m,onSelectOption:_,onOpen:()=>g(!0),onClose:()=>g(!1),closeOnSelect:!1,...A,"data-test":"Dropdown",children:({inputProps:e,inputRef:t,toggle:f})=>o(i.TextField,{ref:t,...e,readOnly:!0,inputSize:T,disabled:m,label:w,leftIcon:E,helperText:V,error:!!v,rightIcon:$(i.InputRightElements,{children:[O,m?null:o(i.RightIcon,{name:"chevron_down_m",isOpen:b,onClick:f})]}),disabledIconColor:R})})})}export{ee as M};
//# sourceMappingURL=MultiselectField-a1e665cb.js.map
