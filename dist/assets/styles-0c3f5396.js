import{h as e,f as o,C as a}from"./vendor-51460554.js";import{eb as n,I as c}from"./index-cd84bcc9.js";const p=e.create({baseURL:"https://us-autocomplete-pro.api.smartystreets.com",headers:{"Content-Type":"application/json"}}),i="28866402985625707",h={lookup:async s=>{try{return(await p.get(`/lookup?key=${i}&search=${s}`)).data}catch(r){o(r,{tags:{section:"SmartyServices"}});const{errorMessage:t}=n(r);throw new Error(t)}}},d=a(c)`
  transition: transform 0.3s;
  ${({isOpen:s})=>s&&"transform: rotate(180deg)"}
`;export{d as A,h as S};
//# sourceMappingURL=styles-0c3f5396.js.map
