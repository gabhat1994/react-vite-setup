import{B as d}from"./vendor-51460554.js";import{eQ as i}from"./index-cd84bcc9.js";const m=["noumena.date.weekdays.monday","noumena.date.weekdays.tuesday","noumena.date.weekdays.wednesday","noumena.date.weekdays.thursday","noumena.date.weekdays.friday","noumena.date.weekdays.saturday","noumena.date.weekdays.sunday"],$=(n,t,o=!0)=>{if(!n)return;const e=new Date(n),a=new Date,s=i(a.toString(),n),y=u(e);let r=g(e,t);return s<2?r=c(e)?d("noumena.date.yesterday"):d("noumena.date.today"):s<7&&e.getDay()<a.getDay()&&(r=d(m[e.getDay()])),o?`${r}, ${y}`:r},u=n=>{let t=n.getHours();const o=n.getMinutes(),e=t>=12?"PM":"AM";t%=12,t=t||12;const a=o<10?`0${o}`:`${o}`;return`${t<10?`0${t}`:`${t}`}:${a} ${e}`},g=(n,t)=>{const o=n.getFullYear();let e=(1+n.getMonth()).toString();e=e.length>1?e:`0${e}`,t&&(e=n.toLocaleString("default",{month:"short"}));let a=n.getDate().toString();return a=a.length>1?a:`0${a}`,t?`${a} ${e} ${o}`:`${e}/${a}/${o}`},c=n=>{const t=new Date;return t.setDate(t.getDate()-1),t.toDateString()===n.toDateString()};export{g as f,$ as g};
//# sourceMappingURL=getTimeStampForDisplaying-22d5ca9d.js.map