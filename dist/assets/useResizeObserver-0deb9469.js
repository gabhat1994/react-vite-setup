import{r as n}from"./vendor-51460554.js";function f(u,s,c){const r=n.useRef(),e=n.useRef(s);e.current=s,n.useLayoutEffect(()=>{const t=u.current;return!c&&t&&(r.current=new ResizeObserver(()=>{e==null||e.current()}),r.current.observe(t)),()=>{!c&&t&&r.current&&(r.current.unobserve(t),r.current.disconnect())}},[u,c])}export{f as u};
//# sourceMappingURL=useResizeObserver-0deb9469.js.map
