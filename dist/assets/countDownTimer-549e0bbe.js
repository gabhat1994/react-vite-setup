import{r as s}from"./vendor-51460554.js";const c=(n,r)=>{const[e,o]=s.useState(n);return s.useEffect(()=>{const t=setInterval(()=>{o(e-1)},1e3);return e||(clearInterval(t),r&&r()),()=>clearInterval(t)},[e,r]),[e]};export{c as u};
//# sourceMappingURL=countDownTimer-549e0bbe.js.map
