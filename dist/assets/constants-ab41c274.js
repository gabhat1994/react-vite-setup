import{e3 as P,aj as p,p as N,j as T,s as m,b2 as R,B,d as O}from"./index-cd84bcc9.js";import{r as a,C as i,B as y}from"./vendor-51460554.js";import{a as l}from"./ChamberBox-e4d36ac9.js";var f=(e=>(e.ALL="ALL",e.NOUM_SPACES="NOUM_SPACES",e.MEMBERS="MEMBERS",e))(f||{});const z=({isInfinite:e,pageSize:d=0,tabId:c})=>{var C;const[u,h]=a.useState("hasNextPage"),[w,v]=a.useState(!1),[b,{data:t,loading:x,error:M,fetchMore:S,refetch:L}]=P(),s=a.useMemo(()=>{var n;return(n=t==null?void 0:t.getRecommendedNoums)==null?void 0:n.data},[t]),$=a.useMemo(()=>{var n,g;return(g=(n=t==null?void 0:t.getRecommendedNoums)==null?void 0:n.data)==null?void 0:g.filter(o=>{var _;return(o==null?void 0:o.type)!==p.Home&&(o==null?void 0:o.status)===N.Published||(o==null?void 0:o.type)===p.Home&&((_=o==null?void 0:o.uid)==null?void 0:_.userStatus)!=="PENDING"})},[t]);a.useEffect(()=>{(async()=>{v(!0);let n;switch(c){case"NOUM_SPACES":n={spaceType:p.Project};break;case"MEMBERS":n={spaceType:p.Home};break;case"ALL":default:n=void 0}await b({variables:{limit:e?d:12,offset:0,filter:n}}),v(!1)})()},[b,e,d,c]);const A=a.useCallback(async()=>{var g;(((g=(await S({variables:{limit:d,offset:(s==null?void 0:s.length)||0}})).data.getRecommendedNoums)==null?void 0:g.count)||0)<=((s==null?void 0:s.length)||0)&&h("end")},[S,s,d]);return a.useEffect(()=>{var n;h((((n=t==null?void 0:t.getRecommendedNoums)==null?void 0:n.count)||0)<=((s==null?void 0:s.length)||0)?"end":"hasNextPage")},[s,(C=t==null?void 0:t.getRecommendedNoums)==null?void 0:C.count,d]),{noums:$,loading:x,tabLoading:w,error:M,infiniteState:u,fetchMoreNoums:A,refetchRecommendedNoums:L}},k={recommendedTab:f.NOUM_SPACES,isTabLoading:!1,setIsTabLoading:()=>{},activeTab:1,setActiveTab:()=>{}},E=a.createContext(k),I=()=>a.useContext(E),F=({children:e})=>{const[d,c]=a.useState(f.NOUM_SPACES),[u,h]=a.useState(!1),[w,v]=a.useState(1),b=a.useCallback(x=>{v(x),c(x===2?f.MEMBERS:x===1?f.NOUM_SPACES:f.ALL)},[]),t=a.useMemo(()=>({recommendedTab:d,isTabLoading:u,setIsTabLoading:h,activeTab:w,setActiveTab:b}),[d,u,h,w,b]);return T(E.Provider,{value:t,children:e})};i.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 5px 5px;
  background-color: var(--bg-body-neutral-alt-highlighted);
  margin: auto;
  @media (min-width: ${m.LAPTOP_L}) {
    width: 1224px;
  }
  @media (max-width: ${m.TABLET}) and (min-width: ${m.MOBILE_MAX}) {
    width: 763px;
  }
`;const W=i.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: var(--font-family);
  font-style: normal;
  overflow: hidden;
  position: relative;
  padding-bottom: 24px;
`,X=i.div`
  display: flex;
  flex-direction: ${({direction:e})=>e||"row"};
  gap: 16px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,V=i.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: ${e=>e.flexStart?"flex-start":"space-between"};
  overflow-x: scroll;
  @media (max-width: ${m.MOBILE_L}) {
    width: 100%;
  }
`,K=i.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  @media (max-width: ${m.MOBILE_MAX}) {
    padding: 0 16px;
  }
  @media (min-width: ${m.MOBILE_MAX}) {
    ${({showTabs:e})=>e&&"width: 100%"};
  }
`,Q=i.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  width: 256px;
  height: 40px;
  left: 968px;
  top: 7px;
  @media (max-width: 478px) {
    display: none;
  }
`,q=i.div`
  background: ${e=>e.disabled?"var(--bg-button-neutral-disabled)":"var(--bg-button-neutral-alt-default)"};
  padding: 8px;
  border-radius: 8px;
  z-index: 1;
  margin-right: ${e=>e.marginRight?`${e.marginRight}px`:0};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
`,J=i(B)``,Y=i.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: ${e=>e.marginBottom?`${e.marginBottom}px`:0};
  height: max-content;
  margin-right: 16px;
  width: ${e=>e.countPerPage?e!=null&&e.isNotFilledItems?`calc(calc(100% - 32px)/${e.countPerPage})`:`${100/e.countPerPage}%`:"100%"};
  @media ${R.TABLET} and (max-width: ${m.LAPTOP}) {
    min-width: 230px;
    margin-bottom: 16px;
  }
  @media (max-width: 767px) {
    min-width: 260px;
    margin-right: 16px;
    ${e=>e.deviceWidth&&!(e!=null&&e.isNotFilledItems)?" width: calc(100vw - 50px) !important":""};
  }
  :last-of-type {
    margin-right: 0;
  }
`,Z=i(B)`
  background-color: var(--bg-button-neutral-alt-default);
  margin: 16px 16px 0;
  display: none;
  @media (max-width: ${m.TABLET}) {
    display: block;
  }
`,ee=i.div`
  @media (min-width: ${m.MOBILE_L}) {
    .slide {
      display: flex;
      flex-direction: row !important;
      justify-content: flex-start;
    }
  }
`;i.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 272px;
`;const te=i.div`
  cursor: pointer;
  ${({isBordered:e})=>e?"border: 1px solid var(--border-card-neutral-highlighted); border-radius: 16px;":""};
`,ie=i.div`
  width: 100%;
  padding: 0 16px;
  ${({isSwiping:e})=>e?"padding: 0;":""};
  ${({isEnd:e})=>e?"padding-right: 16px;":""};
`,ne=i.div`
  display: flex;
  align-items: center;
  ${({full:e})=>e&&"width: 100%"};
`,D=i.div`
  width: fit-content;
  flex: 1;
  margin-left: -6px;
  @media (max-width: ${m.MOBILE_MAX}) {
    padding: 0 16px;
  }
`,j=[{name:"all",image:"activity_m",text:y("noumena.homeChambers.event.filter_all"),labelSize:"auto"},{name:"noum_spaces",image:"terms_m",text:y("noumena.discovery.recommended.tab.noum_spaces"),labelSize:"auto"},{name:"members",image:"terms_m",text:y("noumena.search.filter_members"),labelSize:"auto"}],ae=()=>{const{activeTab:e,setActiveTab:d}=I();return T(D,{"data-test":"RecommendedNoumsTabs-TabContainer",children:T(O,{onChange:u=>{if(!u)return;const h=Number(u);d(h)},inputList:j,selectedId:e.toString(),mode:"isBackground",isWithoutImage:!0,fontSize:"--font-input-small-size","data-test":"RecommendedNoumsTabs-BasicChipsTabsForm"})})},oe=4,se=3,de=1439,r="https://www.w3schools.com/howto/img_avatar2.png";l.project,l.social,l.story,l.member,l.investment,l.social,l.investment,l.social,l.story,l.project;export{te as C,oe as D,Z as M,se as O,ee as R,ie as S,Y as a,V as b,Q as c,q as d,J as e,X as f,K as g,ne as h,ae as i,de as j,W as k,F as l,z as m,I as u};
//# sourceMappingURL=constants-ab41c274.js.map
