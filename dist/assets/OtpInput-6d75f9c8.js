import{en as F,j as w}from"./index-cd84bcc9.js";import{a6 as N,C as R,r as g}from"./vendor-51460554.js";const L=N`
  display: 'inline-flex';
  height: 66px;

  border: none;
  outline: none;
  border-radius: 8px;
  background-color: var(--bg-code-form-neutral-default);
  text-align: center;
  vertical-align: middle;
  text-align: center;
  color: var(--text-code-form-neutral-default);
  border: 2px solid var(--border-input-neutral-default);
  padding: 0px;

  :disabled {
    background-color: var(--bg-code-form-neutral-default);
    border: 2px solid var(--border-input-neutral-disabled);
    cursor: not-allowed;
    color: var(--text-code-form-neutral-disabled);
  }
  :focus {
    border: 2px solid var(--border-input-brand-primary-default);
  }

  ${F.otpXLarge};
`,M=R.input`
  ${L}
  width: ${n=>n.width?n.width:"70px"};
  color: ${n=>n.color?n.color:"var(--text-code-form-neutral-default)"};
  -webkit-text-security: ${n=>n.launchFrom==="PaymentModal"?"disc":"none"};
`,K=({isDisabled:n=!1,isInputNum:u=!0,launchFrom:p,isInputPassword:b=!1,value:h="",focus:l=!1,color:c,...y})=>{const o=g.useRef(null);g.useEffect(()=>{o.current&&l&&o.current.focus()},[l]);function x(){return b?"password":u?"tel":"text"}return w(M,{autoComplete:"off",type:x(),maxLength:1,disabled:n,ref:o,value:h||"",color:c,...y,launchFrom:p,"data-test":"RenderInput-SinleOtpInputStyled"})},X=n=>K(n),_=N`
  border: none;
  display: inline-flex;
  justify-content: space-between;
  width: 100%;

  :hover > input:not(:disabled):not(:focus) {
    background-color: var(--bg-input-brand-primary-hover);
    border: 2px solid var(--border-input-neutral-default);
  }

  :focus-within > input {
    transition: color 0.2s ease-in-out;
    background-color: var(--bg-input-brand-primary-hover);
  }

  :focus-within > input:not(:focus) {
    transition: color 0.2s ease-in-out;
    border: 2px solid var(--border-input-neutral-default);
  }
`,q=R.div`
  ${_}
`,z=({numInputs:n=4,isDisabled:u=!1,isInputNum:p=!0,isInputPassword:b=!1,launchFrom:h="",dataCy:l="OtpInput-cy",dataTestId:c="OtpInputTestId",onChange:y,value:o,width:x,onEnter:v,color:T})=>{const[r,s]=g.useState(0),S=[],d=()=>o?o.toString().split(""):[];g.useEffect(()=>{o!=null&&o.length||s(0)},[o]);const D=d();let m=!0;function O(t){let e=t.join("");m=Object.values(t).length===t.length,m||(e=new Array(n).fill("").map((a,i)=>t[i]||" ").join("")),y(e)}function j(t){return(p?!Number.isNaN(parseInt(t,10)):typeof o=="string")&&t.trim().length===1}function I(t){const e=Math.max(Math.min(n-1,t),0);s(e)}function $(){I(r+1)}function C(){I(r-1)}const k=t=>{const e=d(),a=t[0];e[r]=a,O(e)},V=(t,e)=>{const a=d(),i=t[0];a[e]=i,O(a)},P=t=>{if(t.preventDefault(),u)return;const e=d();let a=r;const i=t.clipboardData.getData("text/plain").slice(0,n-r).split("");for(let f=0;f<n;f+=1)f>=r&&i.length>0&&(e[f]=i.shift(),a+=1);s(a),I(a),O(e)},A=t=>{const{value:e}=t.target;j(e)&&m&&k(e)},B=t=>{if(t.key==="Backspace")t.preventDefault(),t.currentTarget.value===""&&r>0?(V([],r-1),C()):k("");else if(t.key==="Delete")t.preventDefault(),k("");else if(t.key==="ArrowLeft")t.preventDefault(),C();else if(t.key==="ArrowRight")t.preventDefault(),$();else if(t.key===" "||t.key==="Spacebar"||t.key==="Space")t.preventDefault();else if(t.key==="Enter")v==null||v();else{t.stopPropagation();const e=Number(t.key);!Number.isNaN(e)&&e>=0&&e<=9&&(V([t.key],r),$())}};for(let t=0;t<n;t+=1)S.push(w(X,{focus:r===t,value:D&&D[t],onChange:A,onKeyDown:B,onPaste:P,onFocus:()=>{s(t)},onBlur:()=>s(-1),isDisabled:u,isInputPassword:b,isInputNum:p,"data-cy":l&&`${l}-${t}`,"data-testid":c&&`${c}-${t}`,width:x,color:T,launchFrom:h,"data-test":`RenderInputs-SingleOtpInput-${t}`},t));return S},H=({...n})=>w(q,{"data-test":"OtpInput-OtpStyled",children:z(n)});export{H as O,L as S};
//# sourceMappingURL=OtpInput-6d75f9c8.js.map
