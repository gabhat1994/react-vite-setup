import{C as e}from"./vendor-51460554.js";import{b2 as i,T as a,ae as n}from"./index-cd84bcc9.js";const s=e.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
`,l=e(a)`
  font-weight: 400;
  font-size: 18px;
  text-align: center;
  color: var(--text-card-neutral-default);
  line-height: 28.8px;
  width: 100%;
  font-family: var(--font-family);
  font-style: normal;
`,d=e.div`
  width: 100%;
  display: flex;
  flex-direction: ${t=>t.isMobile?"column":"row"};
`,x=e.div`
  align-self: ${t=>t.isMobile?"center":"flex-start"};
`,f=e.div`
  padding-top: ${t=>t.isMobile?"16px":"0px"};
  margin-left: ${t=>t.isMobile?"0px":"auto"};
`;e(n)`
  border-radius: 0;
  min-height: 140px;
  max-height: 450px;
  flex: 1;
  box-sizing: border-box;
  padding: 16px;
  @media ${i.TABLET} {
    border-radius: 16px;
  }
`;const p=e.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding-bottom: 16px;
`,c=e(a)`
  text-align: center;
  font-family: var(--font-family);
  width: 489px;
`,m=e.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`,g=e.div`
display: flex;
align-items: left;
flex: 1;
margin: auto;
@media ${i.TABLET} {
  ${()=>"max-width: 912px;"};
`;export{d as C,m as D,l as F,x as L,s as M,f as R,g as S,p as a,c as b};
//# sourceMappingURL=styles-329bb842.js.map
