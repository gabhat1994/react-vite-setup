import{f as l,v as T,G as m,a0 as k,j as p,n as w}from"./index-cd84bcc9.js";import{r as u,o as g}from"./vendor-51460554.js";const A=()=>{const e=new URLSearchParams(window.location.search),o=e.get("token"),i=e.get("invoiceId"),a=e.get("contractId"),r=e.get("sowId"),d=e.get("unsubscribeFrom"),s=e.get("ott"),{signIn:c,user:t,setAuthData:f}=l(),{addErrorToast:I}=T(),h=u.useRef(!1),v=u.useCallback(async()=>{if(!s)return;const n=await m.verifyWithOneTimeAuth(s);k(n)?I("One-Time token authentication failed"):c({accessToken:n.accessToken,refreshToken:n.refreshToken})},[I,s,c]);return u.useEffect(()=>{if(h.current)return;const n=g(o??"");(t==null?void 0:t._id)===n._id?f({invoiceId:i||void 0,contractId:a||void 0,sowId:r||void 0,unsubscribeFrom:d}):o?c({accessToken:o,invoiceId:i||void 0,contractId:a||void 0,sowId:r||void 0,unsubscribeFrom:d}):s&&v(),h.current=!0},[a,v,i,s,f,c,r,o,d,t==null?void 0:t._id]),p(w,{"data-test":"UnauthenticatedAccess-Spinner"})},S=A;export{S as default};
//# sourceMappingURL=UnauthenticatedAccess-4be25a2c.js.map