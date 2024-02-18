import{I as j,x as k,y as D,u as T,j as o,am as V,c as z}from"./index-cd84bcc9.js";import{C as a,r}from"./vendor-51460554.js";const L=a.div`
  width: 100%;
`,P=a(j).attrs(()=>({size:16,color:"--icon-button-neutral-default"}))`
  transition: transform 0.3s;
  ${({isOpen:t})=>t&&"transform: rotate(180deg)"};
`,_=a(k).attrs(()=>({gap:16,align:"center"}))`
  span {
    visibility: visible;
  }
`,q=a(D)`
  cursor: ${t=>t.$searchable?"text":"pointer"};
`,i={RightIcon:P,Container:L,InputRightElements:_,TextField:q};function G({options:t,label:f,value:c,onChange:p,inputSize:h,disabled:l,leftIcon:m,hideIcons:x=!0,error:I,helperText:g,inputRightElement:y,noChevron:S=!1,disabledIconColor:w,searchable:u=!0,inputValue:R,...$}){const C=T(),n=r.useRef(null),[b,v]=r.useState(0),[E,d]=r.useState(!1),e=c?t.find(s=>s.type==="value"&&s.key===c):null;r.useLayoutEffect(()=>{n.current&&v(n.current.clientWidth)},[n,C]);const F=R||e&&typeof e.label=="string"&&e.label||"";return o(i.Container,{ref:n,children:o(V,{...$,hideIcons:x,inputValue:F,options:t,usePortal:!1,containerWidth:`${b}px`,disabled:l,onSelectOption:p,onOpen:()=>d(!0),onClose:()=>d(!1),"data-test":"Dropdown",children:({inputProps:s,inputRef:O,toggle:W})=>o(i.TextField,{ref:O,...s,$searchable:u,inputSize:h,disabled:l,label:f,leftIcon:(e==null?void 0:e.icon)??m,helperText:g,error:!!I,readOnly:!u,rightIcon:z(i.InputRightElements,{children:[y,l||S?null:o(i.RightIcon,{name:"chevron_down_m",isOpen:E,onClick:W})]}),disabledIconColor:w})})})}export{G as S};
//# sourceMappingURL=SelectField-54706174.js.map
