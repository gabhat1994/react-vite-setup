import{eg as i}from"./index-cd84bcc9.js";import{r as e,bO as l,b5 as f}from"./vendor-51460554.js";const w=n=>{const[o,c]=e.useState("00:00:00"),r=e.useRef(null),a=e.useCallback(s=>{const t=setInterval(()=>{const u=i(new Date,s);c(u)},1e3);r.current=t},[]);return e.useEffect(()=>{if(n){const s=new Date(n),t=l(s,72);f(t)&&a(t)}},[n,a]),e.useEffect(()=>()=>{r.current&&clearInterval(r.current)},[]),[o]};export{w as u};
//# sourceMappingURL=useTimeIndicator-3b8ca7e8.js.map
