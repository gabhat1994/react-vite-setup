import{C as t,aG as n}from"./vendor-51460554.js";const s=t.div`
  padding-top: 16px;
`,d=t.div`
  position: relative;
  width: 100%;
`,c=t.div`
  min-height: ${({minHeight:i})=>i??"100px"};
  position: relative;
  width: 100%;
  align-items: center;
  text-align: center;
  justify-content: center;
`,r=t.div`
  width: 100%;
  align-items: center;
  text-align: center;
  justify-content: center;

  button span {
    color: var(--text-button-brand-secondary-default);
  }
`,e=n`
  0% { opacity: 1; visibility: visible; z-index: 100; position: static;}
  100% { opacity: 0; visibility: hidden; z-index: -1; height: 0; }
  
`,l=t.div`
  text-align: center;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
  opacity: 0;
  animation-name: ${e};
  animation-duration: 3s;
  animation-fill-mode: forwards;
`,a=n`
  0% { opacity: 1;}
  100% {opacity: 1;}
`,p=t.div`
  width: 100%;
  opacity: 0;
  animation-name: ${a};
  animation-duration: ${i=>i.duration}s;
  animation-delay: 3s;
  text-align: center;
  align-items: 'center';
  justify-content: 'center';
`;export{c as S,d as a,s as b,r as c,l as d,p as e};
//# sourceMappingURL=styles-ba20ba6a.js.map
