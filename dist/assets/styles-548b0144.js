import{c as S,x as f,j as a,T as m,au as A,ev as I,f as y}from"./index-cd84bcc9.js";import{bE as g,bb as E,C as d,r as w,b7 as b,l as N,am as k,bI as u,ap as F,aq as v}from"./vendor-51460554.js";import{T as _}from"./TickCheckbox-c4d9d4b6.js";import{A as C}from"./index-35efb18f.js";function H({label:e,name:n,disabled:r}){const{control:o}=g();return S(f,{gap:8,"data-test":"Stack",children:[a(E,{name:n,control:o,render:({field:{value:s,onChange:t},fieldState:i})=>a(_,{size:16,isChecked:s,onChange:t,hasError:!!i.error,disabled:r,"data-test":"TickCheckbox"}),"data-test":"Controller"}),a(m,{font:"footnote","data-test":"TSpan",children:e})]})}function J({name:e,avatarUrl:n}){return S(f,{gap:8,align:"center","data-test":"Stack",children:[a(A,{size:"M",url:n,"data-test":"Avatar"}),a(m,{font:"body-m","data-test":"TSpan",children:e})]})}const $={small:"footnote",medium:"body-m"};function x(e,n){const r=$[e];return n?`${r}-bold`:r}const U={small:4,medium:8};function L(e,n){return n??U[e]}const O=d(f).attrs(({size:e,gap:n,isVertical:r})=>({gap:L(e,n),vertical:r,align:r?"start":"baseline"}))``,P=d(m).attrs(({size:e})=>({font:x(e,!1),colorToken:"--text-card-neutral-default"}))``,M=d(m).attrs(({size:e,bold:n})=>({font:x(e,n)}))``,p={Container:O,Label:P,Value:M};function K({label:e,value:n,gap:r,layout:o="vertical",size:s="medium",bold:t=!1}){const i=o==="vertical";return S(p.Container,{size:s,gap:r,isVertical:i,children:[a(p.Label,{size:s,children:e}),w.isValidElement(n)?n:a(p.Value,{size:s,bold:t,children:n})]})}const c={isCreated(e){return e.fromStatus===null&&e.toStatus==="DRAFT"},isSentForSigning(e){return e.fromStatus==="DRAFT"&&e.toStatus==="ISSUED"},isDeclined(e){return e.fromStatus==="ISSUED"&&e.toStatus==="DRAFT"},isSigned(e){return e.fromStatus==="ISSUED"&&e.toStatus==="SIGNED"}};function R({items:e,usersMap:n,currentUserId:r,documentType:o}){const s=[];return e.forEach((t,i)=>{const h=r===t.userId,l=h?"You":(t.userId?n[t.userId]:void 0)??"Unknown User";if(c.isCreated(t)&&s.push({iconName:"edit_m",description:"Created",timestamp:t.timestamp}),c.isSentForSigning(t)){const T=e.slice(0,i).some(c.isSentForSigning);s.push({iconName:"check_xs",description:`Signed by ${l}`,timestamp:t.timestamp},{iconName:"time_m",description:T?"Re-sent for signing":"Sent for signing",timestamp:b(new Date(t.timestamp),2)})}c.isDeclined(t)&&s.push({iconName:"close_m",description:`${h?"You have":`${l} has`} returned the ${o===I.Contract?"contract":"SOW"} to make amendments`,timestamp:t.timestamp}),c.isSigned(t)&&s.push({iconName:"check_xs",description:`Signed by ${l}`,timestamp:t.timestamp},{iconName:"thumb_up_m",description:"Fully executed",timestamp:b(new Date(t.timestamp),2)})}),s}function V(e,n,r){const{user:o}=y();return N.reverse(R({items:e,usersMap:n,currentUserId:(o==null?void 0:o._id)??"",documentType:r}))}function D(e){if(!(!e||!e.userId._id||!e.displayName))return{[e.userId._id]:e.displayName}}function Q({items:e,buyer:n,serviceProvider:r,documentType:o}){const s=V(e,{...D(n),...D(r)},o);return a(C.List,{children:s.map(t=>a(C.Item,{iconName:t.iconName,description:t.description,timestamp:t.timestamp},t.timestamp.toString()))})}const j=k({documentContentsChecked:u().oneOf([!0]),validSignature:u().oneOf([!0])});function X({defaultValues:e}={}){return F({defaultValues:e,resolver:v(j),mode:"onSubmit"})}function Z(){return g()}const z=k({isAuthorized:u().oneOf([!0]),termsAndConditions:u().oneOf([!0]),eSign:u().oneOf([!0])});function ee({defaultValues:e}={}){return F({defaultValues:e,resolver:v(z),mode:"onSubmit"})}function te(){return g()}const G=d(m).attrs(()=>({font:"body-l",colorToken:"--text-modal-neutral-highlighted"}))`
  word-break: break-word;
`,ne={Title:G};export{H as A,Q as D,J as E,K as L,ne as S,te as a,ee as b,Z as c,X as u};
//# sourceMappingURL=styles-548b0144.js.map