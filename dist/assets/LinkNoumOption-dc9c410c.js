import{s as i,fX as h,f7 as c,x as d,T as l,fY as k,fZ as y,y as L,j as o,u as T,e as $,c as n,au as C,az as O,f_ as B,F as N,c4 as z,I as A}from"./index-cd84bcc9.js";import{C as e,r as I,B as s}from"./vendor-51460554.js";import{t as u}from"./consts-be860660.js";const D=e(d)`
  background: var(--bg-body-neutral-alt-default);
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-height: -webkit-fill-available;
`,X=e(d)`
  width: 100%;
  max-height: calc(100vh - 72px);
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 0px 16px;
  flex: 1 1 auto;
  @media (min-width: ${i.TABLET_L}) {
    padding: 40px;
  }
`,F=e.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`,R=e(l)`
  margin-bottom: 24px;
  font-size: var(--font-header-xsmall-size);
  font-weight: var(--font-body-large-bold-weight);
  line-height: 30px;
  @media (min-width: ${i.TABLET}) {
    font-size: var(--font-header-medium-size);
    line-height: 39.2px;
  }
`,H=e.div`
  display: flex;
  width: 100%;
  gap: 32px;
  justify-content: center;
  margin-bottom: 16px;
  z-index: 0;
  flex: 1 1 auto;
  overflow: scroll;
  height: 100vh;
`,V=e.div`
  width: 100%;
  box-sizing: border-box;
  position: sticky;
  z-index: 1;
  top: 0px;
  padding-top: 10px;
  background-color: var(--bg-body-neutral-alt-default);
`,Y=e.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  ${h}
  @media (min-width: ${i.LAPTOP}) {
    width: 668px;
    max-height: 532px;
    border-radius: 8px;
    padding: 0 8px;
    border: 1px solid var(--border-card-neutral-highlighted);
  }
`,Z=e.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`,q=e.div`
  width: 399px;
  max-width: 485px;
  display: flex;
  flex-direction: column;
  @media (min-width: ${i.LAPTOP}) {
    max-height: 532px;
  }
  @media (min-width: ${i.TABLET}) and (max-width: ${i.TABLET_L}) {
    width: 485px;
  }
`,G=e.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: auto;
  @media (min-width: ${i.LAPTOP}) {
    overflow-y: auto;
    ${h}
  }
  ${c}
`,J=e.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media (max-width: ${i.MOBILE_MAX}) {
    width: 95%;
  }
  border: ${({border:t})=>`1px ${t} var(--border-card-neutral-highlighted)`};
  border-radius: 16px;
  padding: 15px 16px;
  box-sizing: border-box;
  ${({border:t})=>t==="dashed"&&"justify-content:center;"};
`,K=e.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 40px;
`,Q=e.div`
  border: 1px solid var(--border-card-neutral-default);
  position: absolute;
  z-index: 2;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 50%;
  padding: 6.32px;
`,U=e.div`
  height: 40px;
  width: 1px;
  background-color: var(--border-card-neutral-default);
`,tt=e.div`
  background-color: var(--bg-card-neutral-alt-highlighted);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  margin-top: 16px;
  @media (max-width: ${i.TABLET_L}) {
    margin-bottom: 16px;
  }
`,et=e.div`
  margin-top: auto;
  width: 100%;
  @media (max-width: ${i.TABLET_L}) {
    position: sticky;
    bottom: 0px;
    background: var(--bg-card-neutral-alt-default);
    padding: 16px;
    border-top: 1px solid var(--border-card-neutral-default);
    z-index: 1;
  }
`,it=e.div`
  width: 100%;
  @media (min-width: ${i.TABLET_L}) {
    ${c};
  }
`,S=e.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  background: var(--bg-tablecell-neutral-alt-default);
  width: ${({shouldHover:t})=>!t&&"auto"};
  padding-left: ${({showPadding:t})=>t&&"12px"};
  padding-right: ${({showPadding:t})=>t&&"20px"};
  border-bottom: ${({showBorder:t})=>t&&"1px solid var(--bg-separator-neutral-default)"};
  &:hover {
    background-color: ${({shouldHover:t})=>t&&"var(--bg-tablecell-neutral-hover)"};
  }
`,_=e.div`
  margin-left: 16px;
  margin-right: auto;
  width: 90%;
`,at=e.div`
  max-height: 152px;
  width: 100%;
  overflow-y: auto;
  margin-top: 17px;
  ${c};
`,E=e.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({bgColor:t})=>t};
  color: ${({color:t})=>t};
  border-radius: 8px;
  padding: 0 8px;
  min-height: 22px;
  font-family: var(--font-family);
  font-weight: var(--font-body-small-bold-weight);
  font-size: 12px;
  text-align: center;
  border: solid var(--bg-card-neutral-alt-default) 2px;
`,ot=e.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  @media (min-width: ${i.TABLET_L}) {
    justify-content: center;
  }
`,nt=e(d)`
  @media (max-width: ${i.MOBILE_MAX}) {
    flex: 1;
  }
`,dt=e(d)`
  @media (max-width: ${i.MOBILE_MAX}) {
    flex: 2;
  }
  @media (min-width: ${i.MOBILE_XL}) {
    width: 243px;
  }
`,rt=e(k)`
  position: absolute;
  top: 100;
`,lt=e(y)`
  position: absolute;
  z-index: 1;
`,st=e.div`
  width: 100%;
  box-sizing: border-box;
`,ct=e(L)``,M=({type:t})=>{var a,r;return o(E,{"data-testid":"chamberbox-tag-label",bgColor:(a=u[t.toLowerCase()])==null?void 0:a.bgColor,color:(r=u[t.toLowerCase()])==null?void 0:r.color,"data-test":"NoumOptionTag-TagLabel",children:t})},pt=({item:t,updateOptionState:a,showBorder:r,showDetail:m=!1,showExtraDetail:b=!1,showChips:g=!1,showPadding:f=!1,style:v,showCheckBox:w=!0})=>{const{width:p}=T(),x=I.useMemo(()=>p<=$.MOBILE_MAX,[p]);return n(S,{style:v,showPadding:f,showBorder:r,onClick:t.disabled?void 0:a,shouldHover:!!a,"data-test":"LinkNoumOption-SelectOption",children:[o(C,{url:t.profileImage??O,size:"M","data-test":"LinkNoumOption-Avatar"}),n(_,{"data-test":"LinkNoumOption-OptionDetail",children:[o(l,{singleLine:!0,font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"LinkNoumOption-TSpan",children:t.name}),m&&n(d,{style:{flexDirection:x?"column":"row"},"data-test":"LinkNoumOption-Stack",children:[n(l,{colorToken:"--text-tablecell-body-neutral-default",font:"footnote","data-test":"LinkNoumOption-TSpan",children:[`${t.connections} ${s("noumena.connections")}`,t.visibility!==B.Secret?` · ${t.followers} ${s("noumena.followers")}`:"",` · ${t.visibility}`]}),b&&t.linked?n(l,{font:"footnote",colorToken:"--text-tablecell-body-neutral-highlighted","data-test":"LinkNoumOption-TSpan",children:[x?"":o(N,{children:" · "}),s("noumena.link_noums.link_options.linked_noums",{linked:t.linked})]}):null]})]}),(a||t.disabled)&&w&&o(z,{disableClick:t.disabled,isChecked:t.checked??!1,onChange:t.disabled?void 0:a,icon:o(A,{name:"tick_m",size:24,color:t.disabled?"--icon-checkbox-neutral-disabled":"--icon-checkbox-neutral-alt-default","data-test":"LinkNoumOption-Icon"}),"data-test":"LinkNoumOption-Checkbox"}),g&&t.type&&o(M,{type:t.type,"data-test":"LinkNoumOption-NoumOptionTag"})]},t._id)};export{et as A,ot as B,rt as C,at as E,K as I,pt as L,D as M,q as N,it as O,G as P,tt as R,st as S,F as T,J as a,M as b,U as c,Q as d,nt as e,dt as f,ct as g,Y as h,V as i,Z as j,lt as k,X as l,R as m,H as n};
//# sourceMappingURL=LinkNoumOption-dc9c410c.js.map
