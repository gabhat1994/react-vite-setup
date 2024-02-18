import{m as E,x as d,ae as N,T as g,c as r,F as p,j as t,S as u,a2 as U,X as _,_ as m,az as L,aC as y}from"./index-cd84bcc9.js";import{N as k}from"./NoumCard-2fa806c2.js";import{C as s,a6 as O}from"./vendor-51460554.js";import{B as v}from"./Badge-f2e67408.js";import{C as A}from"./CountryCard-e0d91c6e.js";const B=s(d).attrs({fullWidth:!1,align:"center",gap:"16px"})`
  width: auto;
`,j=s(d).attrs({vertical:!0,align:"center",justify:"center",gap:"16px"})`
  width: 1130px;
  align-self: center;
  padding: 24px;
  @media (max-width: ${E.TABLET_MAX}) {
    width: 100%;
    padding: 0px;
  }
`,M=s(N)`
  width: 100%;
  padding: 24px;
`,w=s(g).attrs({font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted"})``,F=s(d).attrs({gap:"32px",align:"center"})`
  ${({applyTouchStyles:n})=>n&&O`
      align-items: start;
    `}
`,V=s(d).attrs({vertical:!0,gap:"8px"})``,G=s(g).attrs({font:"body-m",colorToken:"--text-card-neutral-default"})``,H=s.ul`
  margin: 0;
  min-width: 252px;
  padding-inline-start: 25px;
`,I=s(g).attrs({font:"body-m",colorToken:"--text-input-neutral-filled"})``,W=s(d).attrs({align:"center",justify:"center"})`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--bg-badge-brand-secondary-default);
`,Q=s(d).attrs({align:"center",justify:"space-between",fullWidth:!0})`
  padding: 0;
`,z=s(d).attrs({align:"center",gap:16})``,P=s(d).attrs({align:"center",justify:"center"})`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
`,R=s(d).attrs({vertical:!0})`
  width: 190px;
`,e={Right:B,Container:M,Main:j,ContainerTitle:w,InfoContainer:F,Info:V,Label:G,Ul:H,Value:I,Count:W,FileContainer:Q,FileSide:z,FileIcon:P,StackForCampaignHeading:R};function C(){return r(p,{children:[t(u,{height:8,"data-test":"Spacer"}),t(U,{size:"thin",fullWidth:!0,"data-test":"Separator"}),t(u,{height:8,"data-test":"Spacer"})]})}var T=(n=>(n.INCREASE_NOUM_VISIBILITY="Increase my Noum visibility",n.GET_QUICK_QUESTIONS_ANSWERS="Get answers to Quick Questions",n.GAIN_CONNECTED_USERS_AND_FOLLOWERS="Gain connected users and followers",n.OTHER="OTHER",n))(T||{}),D=(n=>(n.TOTAL_BUDGET="Total Budget",n.TOTAL_DAILY_BUDGET="Total Daily Budget",n))(D||{});function X({applyTouchStyles:n,title:a,status:c,adId:i}){const l=c;return r(p,{children:[n&&r(p,{children:[r(d,{vertical:!0,gap:8,"data-test":"Stack",children:[c&&t(v,{status:l,"data-test":"Badge"}),t(e.ContainerTitle,{children:a})," ",i&&r(g,{font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"TSpan",children:[t(g,{colorToken:"--text-card-neutral-default","data-test":"TSpan",children:"ID:"}),m.appendAdPrefix(i??"")]})]}),t(C,{"data-test":"Divider"})]}),!n&&r(p,{children:[r(d,{align:"start",justify:"space-between","data-test":"Stack",children:[r(d,{maxWidth:"80%",gap:8,"data-test":"Stack",children:[t(e.ContainerTitle,{children:a}),c&&r(e.StackForCampaignHeading,{children:[t(u,{height:4,"data-test":"Spacer"}),t(v,{status:l,"data-test":"Badge"})]})]}),i&&r(g,{font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"TSpan",children:[t(g,{colorToken:"--text-card-neutral-default","data-test":"TSpan",children:"ID:"})," ",m.appendAdPrefix(i??"")]})]}),t(C,{"data-test":"Divider"})]})]})}function Y({startDate:n,noumId:a,budgetAmount:c,budgetType:i=D.TOTAL_BUDGET,isMobile:l}){return r(p,{children:[r(e.InfoContainer,{children:[r(e.Info,{children:[t(e.Label,{children:"Start Date"}),t(e.Value,{children:m.formatDateForSummary(n)})]}),r(e.Info,{children:[t(e.Label,{children:D[i]}),r(e.Value,{children:[c??0," USD"]})]}),!l&&r(e.Info,{children:[t(e.Label,{children:"Noum:"}),t(k,{name:(a==null?void 0:a.name)??"",image:(a==null?void 0:a.profileImage)??L,"data-test":"NOUMCard"})]})]}),l&&r(p,{children:[t(u,{height:16,"data-test":"Spacer"}),r(e.Info,{children:[t(e.Label,{children:"Noum:"}),t(k,{name:(a==null?void 0:a.name)??"",image:(a==null?void 0:a.profileImage)??L,"data-test":"NOUMCard"})]})]}),t(C,{"data-test":"Divider"})]})}function $({applyTouchStyles:n,goals:a,otherGoals:c=""}){const i=y(a==null?void 0:a.slice(0,2)),l=y(a==null?void 0:a.slice(2));return r(p,{children:[t(e.Label,{children:"Goals"}),t(u,{height:8,"data-test":"Spacer"}),r(d,{vertical:n,gap:n?0:8,"data-test":"Stack",children:[!!(i!=null&&i.length)&&t(e.Ul,{children:i==null?void 0:i.map(o=>{const h=o!==T.OTHER?T[o]:c;return t("li",{"data-test":"",children:t(e.Value,{children:h})})})}),!!(l!=null&&l.length)&&t(e.Ul,{children:l==null?void 0:l.map(o=>{const h=o!==T.OTHER?T[o]:c;return t("li",{"data-test":"",children:t(e.Value,{children:h})})})})]}),t(C,{"data-test":"Divider"})]})}function K({applyTouchStyles:n,audience:a}){var l,o,h,x,S,b;const c=(o=(l=a==null?void 0:a.targetLocation)==null?void 0:l[0])==null?void 0:o.split("-")[0];let i=(x=(h=a==null?void 0:a.targetLocation)==null?void 0:h[0])==null?void 0:x.split("-")[1];return i=i||c,t(p,{children:r(e.InfoContainer,{vertical:n,applyTouchStyles:n,wrap:"wrap",children:[r(e.Info,{children:[t(e.Label,{children:"Audience"}),t(e.Value,{children:a?(S=a==null?void 0:a.category)==null?void 0:S.join(","):""})]}),r(e.Info,{children:[t(e.Label,{children:"Target Audience Location"}),t(e.Value,{children:i&&t(A,{country:i,flag:c,"data-test":"CountryCard"})})]}),r(e.Info,{children:[t(e.Label,{children:"Language"}),t(e.Value,{children:a?(b=a==null?void 0:a.targetLanguage)==null?void 0:b.join(","):""})]})]})})}function et({audience:n,startDate:a,noumId:c,goals:i,budgetAmount:l,budgetType:o,adId:h,otherGoals:x,title:S="",status:b="Pending"}){const f=_();return r(e.Container,{children:[t(X,{applyTouchStyles:f.isMobile,title:S,status:b,adId:h,"data-test":"Heading"}),t(Y,{startDate:a,noumId:c,budgetAmount:l,budgetType:o,isMobile:f.isMobile,"data-test":"Information"}),t($,{applyTouchStyles:f.isMobile,goals:i,otherGoals:x,"data-test":"Goals"}),t(K,{applyTouchStyles:f.isMobile||f.isTablet,audience:n,"data-test":"DemoGraphics"})]})}export{et as C,C as D,e as S};
//# sourceMappingURL=CampaignDetails-772896b1.js.map
