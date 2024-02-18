import{R as K,k6 as $,k7 as U,T as B,j as x}from"./index-cd84bcc9.js";import{ac as c,f as N,C as k,a6 as G,a9 as W,r as h}from"./vendor-51460554.js";function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?D(Object(r),!0).forEach(function(n){H(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function H(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function q(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,s;for(s=0;s<n.length;s++)o=n[s],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}function X(e,t){if(e==null)return{};var r=q(e,t),n,o;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)n=s[o],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}const z=["component"],Q="heading",V="code_block",Y="paragraph",F="blockquote",J="ordered_list",Z="bullet_list",ee="list_item",te="horizontal_rule",re="hard_break",ne="image",oe="bold",le="italic",se="strike",ce="underline",ae="code",L="link",ie="styled";function ue(e,t={}){if(typeof e=="object"&&e.type==="doc"&&Array.isArray(e.content)){const r=t.blokResolvers,n=r===void 0?{}:r,o=t.defaultBlokResolver,s=o===void 0?function(){return null}:o,a=t.nodeResolvers,m=a===void 0?{}:a,b=t.markResolvers,j=b===void 0?{}:b,_=t.textResolver,I=_===void 0?function(l){return l}:_,P=E(E({},me),m),T=E(E({},be),j);let M=0;const y=function(l){return c.isValidElement(l)?c.cloneElement(l,{key:M++}):l},g=function(l){const u=l?l.map(w).filter(function(f){return f!=null}):null;return Array.isArray(u)&&u.length===0?null:u},w=function(l){if(l.type==="blok")return l.attrs.body.map(function(O){let i=O.component,p=X(O,z);const R=n[i],C=R?R(p):s(i,p);return y(C)});{var u;let f;if(l.type==="text")f=I(l.text);else{const i=P[l.type];f=i?y(i(g(l.content),l.attrs)):null}return((u=l.marks)!==null&&u!==void 0?u:[]).reduceRight(function(i,p){const R=T[p.type];return R?y(R(i,p.attrs)):i},f)}};return g(e.content)}else if(typeof e=="string"){const r=t.defaultStringResolver,n=r===void 0?function(a){return a}:r,o=t.textResolver;return n((o===void 0?function(a){return a}:o)(e))}return null}const v=function(e){return function(t){return t!=null?c.createElement(e,null,t):null}},A=function(e){return function(){return c.createElement(e)}},fe=function(e,t){return c.createElement(`h${t.level}`,null,e)},pe=function(e,t){return c.createElement("img",t,e)},Re=function(e,t){const r={className:t.class},n=c.createElement("code",r,e);return c.createElement("pre",null,n)},d=function(e){return function(t){return c.createElement(e,null,t)}},ve=function(e,{linktype:t,href:r,target:n}){const o={href:t==="email"?`mailto:${r}`:r,target:n};return c.createElement("a",o,e)},de=function(e,t){return c.createElement("span",{className:t.class},e)},me={[Q]:fe,[V]:Re,[ne]:pe,[Y]:v("p"),[F]:v("blockquote"),[J]:v("ol"),[Z]:v("ul"),[ee]:v("li"),[te]:A("hr"),[re]:A("br")},be={[L]:ve,[ie]:de,[oe]:d("b"),[le]:d("i"),[se]:d("s"),[ce]:d("u"),[ae]:d("code")},Ee=e=>{if(!e)return null;const t=new RegExp($),r=new RegExp(U);switch(!0){case t.test(e):{const[,,n]=t.exec(e)||[];return n?{pathname:`/noum/${n}`}:(N("Invalid internal link"),null)}case r.test(e):{const[,,n]=r.exec(e)||[];return n?{pathname:K.ARTICLE,search:`?slug=articles/${n}`}:(N("Invalid internal link"),null)}default:return null}},ye=k.div``,S=G`
  color: var(--link-card-brand-primary-default);

  &:hover {
    color: var(--text-button-brand-primary-default);
  }
`,Oe=k("a")`
  ${S}
`,ke=k(B)`
  text-decoration: underline;
  ${S}
`,xe=({content:e})=>{const t=W(),r=h.useCallback((n,{href:o,linktype:s,target:a})=>{const m=Ee(o);if(m)return x(ke,{role:"link",cursor:"pointer",tabIndex:0,onClick:()=>t(m),"data-test":"StoryblokRichTextContainer-linkResolver-InternalLink",children:n});const b={href:s==="email"?`mailto:${o}`:o,target:a};return c.createElement(Oe,b,n)},[t]);return h.useMemo(()=>e?x(ye,{"data-test":"StoryblokRichTextContainer-StoryblokRichTextWrapper",children:ue(e,{markResolvers:{[L]:r}})}):null,[e,r])};export{xe as S};
//# sourceMappingURL=StoryblokRichTextContainer-c5812fec.js.map