function u(r){function o(e,s){var a;const n=r(e);return{error:n,helperText:n?(a=e.error)==null?void 0:a.message:s}}return o}const t=u(r=>!!r.error),g=u(r=>!!r.error&&r.isTouched),c={fieldProps:r=>({onChange:o=>{const e=Number.isNaN(Number(o.target.value))?void 0:Number(o.target.value);return Number.isNaN(e)?r.onChange(void 0):r.onChange(e)},value:`${r.value??""}`})};export{g as a,t as g,c as n};
//# sourceMappingURL=forms-18e3c53a.js.map
