import{r as s}from"./index-cd84bcc9.js";import{f as i}from"./vendor-51460554.js";const c=()=>{const[t]=s();return async()=>{var n,o;const r={token:null,error:null},e=await t();if((n=e.data)!=null&&n.generateOneTimeToken)r.token=(o=e.data)==null?void 0:o.generateOneTimeToken;else if(e.errors){const[a]=e.errors;r.error=a,i(e.errors,{tags:{section:"generateTokenForCQ"}})}return r}};export{c as u};
//# sourceMappingURL=useGenerateTokenForCQ-2d299743.js.map