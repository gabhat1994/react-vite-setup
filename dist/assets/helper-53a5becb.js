import{g as i,u,B as o,aD as c,a8 as m}from"./vendor-51460554.js";const l={},p=i`
    mutation createPlaidLink {
  createPlaidLink {
    link_token
  }
}
    `;function y(n){const e={...l,...n};return u(p,e)}function D(n){if(!n)return"";if(n){const e=n.split("T")[0],a=e.split("-")[2],t=new Date(e).toLocaleString("en-us",{month:"short",year:"numeric"});return`${a} ${t}`}}const v=n=>{if(n){const e=new Date;return c(new Date(n),e)}return null};function T(n){if(n){const e=n.split("T")[0],a=parseInt(e.split("-")[1],10)-1,t=parseInt(e.split("-")[0],10),r=parseInt(e.split("-")[2],10),s=m(new Date(t,a,r),{days:365}).toString().split(" ");return`${s[2]} ${s[1]} ${s[3]}`}return""}function _(){const n=new Date,e=n.getFullYear()+1,a=n.getMonth();return`${n.getDate()} ${f[a]} ${e}`}const f=[o("noumena.viewTransactions.January"),o("noumena.viewTransactions.February"),o("noumena.viewTransactions.March"),o("noumena.viewTransactions.April"),o("noumena.viewTransactions.May"),o("noumena.viewTransactions.June"),o("noumena.viewTransactions.July"),o("noumena.viewTransactions.August"),o("noumena.viewTransactions.September"),o("noumena.viewTransactions.October"),o("noumena.viewTransactions.November"),o("noumena.viewTransactions.December")],d=n=>{const e=[];for(let a=0;a<n.length;a+=1){const t=n[a];(t==null?void 0:t.max_count_noum_renewal)===1&&(t==null?void 0:t.active_count_noum_renewal)===0&&e.push(t)}return e},g=n=>{const e=[];for(let a=0;a<n.length;a+=1){const t=n[a];(t==null?void 0:t.max_count_noum_setup)===1&&(t==null?void 0:t.active_count_noum_setup)===0&&e.push(t)}return e};export{D,g as a,_ as b,d as c,T as d,v as e,y as u};
//# sourceMappingURL=helper-53a5becb.js.map