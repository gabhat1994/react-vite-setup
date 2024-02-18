import{dR as o,I as d,T as s,j as a,c,F as p,S as x}from"./index-cd84bcc9.js";import{a6 as r,C as e,bf as f,aT as g}from"./vendor-51460554.js";const y="/assets/riseavatar-ca9a0677.png",h=r`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 8px;
  height: 22px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
`;e.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  margin: 0 auto;
  font-family: var(--font-family);
`;e.div`
  display: flex;
  height: 254px;
`;const v=e(f)`
  position: relative;
  font-family: var(--font-family);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 8px 16px;
  height: 272px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
  cursor: ${({cursor:t})=>t};
  text-decoration: none;
`,w=e.div`
  height: 56px;
  background: ${({bgColor:t})=>t};
  border-radius: 12px;
  box-sizing: content-box;
  position: relative;
`,k=e(d)`
  position: absolute;
  top: 8px;
  right: 8px;
`,S=e.div`
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--border-badge-neutral-alt-default) 4px solid;
  border-radius: 14px;
  background-color: var(--bg-body-neutral-alt-default);
  ${t=>t.archived&&"filter: grayscale(100%);"}
  z-index: 1;
`,$=e.div`
  position: absolute;
  top: 95px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({bgColor:t})=>t};
  color: ${({color:t})=>t};
  border-radius: 8px;
  padding: 0 8px;
  min-height: 22px;
  font-weight: var(--font-body-small-bold-weight);
  font-family: var(--font-footnote-bold-font);
  font-size: 12px;
  text-align: center;
  border: solid var(--border-badge-neutral-alt-default) 2px;
  z-index: 2;
`,B=e.div`
  font-style: normal;
  font-weight: var(--font-body-large-bold-weight);
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: var(--text-card-header-neutral-highlighted);
  font-family: var(--font-body-large-bold-font);
  ${o};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ${t=>t.isEllipsis?"white-space: nowrap;":"white-space: normal;"}
  word-wrap: break-word;
  ${t=>t.archived&&"color: var(--text-card-header-neutral-default);"}
  ${t=>t.isMemberNoLocation&&"margin-top: -85px;"}
`,C=e.span`
  ${o}
`,T=e.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: var(--text-card-header-neutral-default);
  font-family: var(--font-body-medium-regular-font);
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 4px;
  ${o}
  ${t=>t.archived&&r`
      & :first-child {
        background-color: var(--bg-tag-neutral-default);
        padding: 0 8px;
        ${h} {
          height: 24px;
          font-size: 14px;
          color: var(--text-tag-neutral-default);
        }
      }
      & :nth-child(2) {
        margin: 0 4px 0 8px;
        padding-bottom: 8px;
      }
    `}
`,z=e.span`
  font-weight: var(--font-body-small-bold-weight);
  font-family: var(--font-body-medium-bold-font);
  color: var(--text-card-neutral-default);
  ${o};
`,j=e(s)`
  text-align: center;
  width: 100%;
  display: block;
  margin: auto;
`,F=e.div`
  padding-top: 52px;
  gap: 4px;
  display: flex;
  flex-direction: column;
`,U=e.div`
  display: ${t=>t.hide?"none":"flex"};
  width: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
`,b=e.div`
  min-width: 90%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`,n=({w:t,h:i,r:l})=>a(g,{width:t,height:i,style:{borderRadius:l,maxWidth:"100%",lineHeight:"unset !important"},"data-test":"StyledSkeleton-Skeleton"}),A=()=>c(p,{children:[a(n,{w:168,h:24,r:10,"data-test":"SkeletonChamberBox-StyledSkeleton"}),a(n,{w:152,h:14,r:24,"data-test":"SkeletonChamberBox-StyledSkeleton"}),a(x,{height:24,"data-test":"SkeletonChamberBox-Spacer"}),a(b,{"data-test":"SkeletonChamberBox-Underline"}),a(n,{w:94,h:16,r:10,"data-test":"SkeletonChamberBox-StyledSkeleton"})]});export{S as A,F as B,v as C,k as F,B as H,C as M,T as O,n as S,w as T,j as U,$ as a,A as b,z as c,U as d,b as e,y as r};
//# sourceMappingURL=SkeletonChamberBox-5e97f066.js.map
