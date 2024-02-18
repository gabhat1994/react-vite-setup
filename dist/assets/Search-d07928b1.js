import{bw as $,s as c,f as A,w as E,u as N,j as e,c as n,x as v,da as O,a1 as u,d7 as V,b7 as j,e as F,I as P,T as L,dA as W,pS as D,pT as z,pU as w,n as M,F as T,pV as G,pW as _,pX as Q,pY as U,d as q,pZ as X,p_ as Y,ay as Z,p$ as I,q0 as J}from"./index-cd84bcc9.js";import{C as d,ar as K,a9 as R,r as i,B as s}from"./vendor-51460554.js";import{A as g}from"./index-4963229a.js";import"./useResizeObserver-0deb9469.js";import"./Modal-5a254f40.js";const aa=d.div`
  font-family: var(--font-family);
  display: flex;
  flex-direction: column;
`,ea=d.div`
  position: relative;
  display: grid;
  grid-template-columns: 783px 322px;
  gap: 24px;
  padding: 0px 24px;
  justify-content: center;
  ${$}

  @media (min-width: ${c.LAPTOP_L}) {
    margin-left: 256px;
  }

  @media (max-width: ${c.LAPTOP}) {
    grid-template-columns: 670px 290px;
    padding: 16px;
    justify-content: start;
  }

  @media (max-width: ${c.TABLET_L}) {
    grid-template-columns: 488px 235px;
    padding: 16px;
    justify-content: center;
  }

  @media (max-width: ${c.MOBILE_L}) {
    grid-template-columns: 375px;
    padding: 16px;
  }
  @media (max-width: ${c.MOBILE_M}) {
    grid-template-columns: 351px;
  }
  @media (max-width: ${c.MOBILE_S}) {
    grid-template-columns: 288px;
  }
`,ta=d.div`
  width: 100%;
  overflow-x: hidden;
  ${$}
  label {
    width: auto;
  }
`,na=d.div`
  padding: 8px 0px;
  display: flex;
  gap: 12px;
  align-items: center;
  @media (min-width: ${c.MOBILE_L}) {
    gap: 40px;
  }
`,ia=d.div`
  width: 239px;
  text-align: center;
`,ca=d.div`
  padding: 8px;
`,B=d.div`
  width: 100%;
  max-width: 330px;
  @media (max-width: ${c.MOBILE_L}) {
    display: none;
  }
`,da=({children:p,rightContent:o,setResult:r,selectedTab:a,onGoBack:S})=>{const{t:x}=K(),{user:h}=A(),b=R(),f=()=>{b(-1)},{flags:{newAppNavigation:y}}=E(),{width:C}=N(),m=C>F.MOBILE_L,l=()=>n(v,{padding:16,vertical:!0,"data-test":"SearchLayout-mobileHeadView-Stack",children:[n(na,{"data-test":"SearchLayout-mobileHeadView-Head",children:[e(ca,{onClick:f,"data-test":"SearchLayout-mobileHeadView-HeadIcon",children:e(P,{color:"--icon-button-neutral-default",name:"arrow_left_m",size:24,"data-test":"SearchLayout-mobileHeadView-Icon"})}),e(ia,{"data-test":"SearchLayout-mobileHeadView-HeadName",children:e(L,{font:"body-l-bold",colorToken:"--text-appbar-neutral-default","data-test":"SearchLayout-mobileHeadView-TSpan",children:x("noumena.search.search_head.text")})})]}),e(W,{setResults:r,type:a,"data-test":"SearchLayout-mobileHeadView-GlobalSearch"})]});return y?e(g.Layout,{background:"neutral-alt",onGoBack:S,topNavbar:m?e(g.TopBar,{onSearchChange:r,searchTypeFilter:a}):l(),sideNav:e(g.SideNavigation,{}),children:e(g.MainContent,{children:n(v,{gap:24,align:"start",justify:"stretch",fullWidth:!0,"data-test":"SearchLayout-Stack",children:[e(O,{grow:!0,"data-test":"SearchLayout-StackItem",children:p}),!!o&&e(B,{"data-testid":"layout-right-content","data-test":"SearchLayout-RightContent",children:o})]})})}):n(aa,{"data-testid":"layout-container","data-test":"SearchLayout-Container",children:[m?e(u,{isBorderRadius:!1,"data-test":"SearchLayout-Header",children:e(V,{avatar:j.getProfilePicture(h)||void 0,userName:(h==null?void 0:h.firstName)||void 0,setSearchResult:r,searchFilter:a,"data-test":"SearchLayout-MainHeader"})}):l(),n(ea,{"data-testid":"layout-main","data-test":"SearchLayout-Main",children:[e(ta,{"data-test":"SearchLayout-Content",children:p}),e(B,{"data-test":"SearchLayout-RightContent",children:o})]})]})},oa=()=>{const p=R(),[o,r]=i.useState("All"),[a,S]=i.useState(),{markSeachEntityAsClickedMutation:x}=D({}),h=i.useCallback(t=>{r(t)},[]);i.useEffect(()=>{a!=null&&a.search||S(t=>({...t,data:void 0,search:void 0}))},[a==null?void 0:a.search]);const b=i.useMemo(()=>{var t;return(a==null?void 0:a.isMobile)&&!(a!=null&&a.search)&&(a==null?void 0:a.recentSearchList)&&((t=a==null?void 0:a.recentSearchList)==null?void 0:t.length)>0},[a==null?void 0:a.isMobile,a==null?void 0:a.recentSearchList,a==null?void 0:a.search]),f=i.useMemo(()=>(a==null?void 0:a.loading)||(a==null?void 0:a.infiniteState)==="hasNextPage"&&(a==null?void 0:a.data)&&!(a!=null&&a.search),[a==null?void 0:a.data,a==null?void 0:a.infiniteState,a==null?void 0:a.loading,a==null?void 0:a.search]),y=i.useMemo(()=>!(a!=null&&a.loading)&&(!(a!=null&&a.search)&&!(a!=null&&a.data)||(a==null?void 0:a.data)&&a.data.length===0),[a==null?void 0:a.data,a==null?void 0:a.loading,a==null?void 0:a.search]),C=i.useMemo(()=>!(a!=null&&a.data)&&!(a!=null&&a.loading)&&(a==null?void 0:a.isMobile)&&(a==null?void 0:a.recentSearchList)&&(a==null?void 0:a.recentSearchList.length)===0,[a==null?void 0:a.data,a==null?void 0:a.isMobile,a==null?void 0:a.loading,a==null?void 0:a.recentSearchList]),m=i.useMemo(()=>!(a!=null&&a.search)&&(a==null?void 0:a.isMobile)&&(a==null?void 0:a.recentSearchLoading),[a==null?void 0:a.isMobile,a==null?void 0:a.recentSearchLoading,a==null?void 0:a.search]),l=()=>{var t;return n(T,{children:[e(I,{header:!0,font:"heading-xs-bold",colorToken:"--text-body-header-neutral-default","data-test":"Search-rightContent-ContentSpan",children:s("noumena.search.search_recent")}),a!=null&&a.recentSearchLoading?e(w,{recentSearch:a==null?void 0:a.recentSearchLoading,"data-test":"Search-rightContent-SpinnerHead",children:e(M,{"data-test":"Search-rightContent-Spinner"})}):(a==null?void 0:a.searchQueriesList)&&((t=a==null?void 0:a.searchQueriesList)==null?void 0:t.length)>0&&(a==null?void 0:a.searchQueriesList.map(H=>e(J,{color:"--text-tablecell-header-neutral-highlighted","data-test":`Search-rightContent-SpanItem-${H}`,children:H},H)))]})},k=t=>{x({variables:{markSearchEntityAsClickedId:`${t.entityType}/${t.id}`}})};return n(da,{setResult:S,selectedTab:o,rightContent:l(),onGoBack:()=>p(-1),"data-test":"Search-SearchLayout",children:[e(z,{"data-test":"Search-SearchHead",children:e(L,{font:"heading-s-bold",colorToken:"--text-body-header-neutral-default","data-test":"Search-TSpan",children:s("noumena.search.search_results")})}),m?e(w,{"data-test":"Search-SpinnerHead",children:e(M,{"data-test":"Search-Spinner"})}):b?n(T,{children:[e(G,{"data-test":"Search-OptionHeaderWrapper",children:e(L,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"Search-TSpan",children:s("noumena.global_search.recent_searches")})}),e(_,{result:a==null?void 0:a.recentSearchList,searchRouteHandler:k,"data-test":"Search-SearchList"})]}):C?e(Q,{"data-test":"Search-RecentSearchHead",children:e(L,{font:"body-m",colorToken:"--text-placeholder-neutral-default","data-test":"Search-TSpan",children:s("noumena.global_search.no_recent_results")})}):n(T,{children:[e(U,{"data-test":"Search-TabsContainer",children:e(q,{onChange:h,inputList:X(),selectedId:o,mode:"isBackground",isWithoutImage:!0,fontSize:"--font-link-medium-size","data-test":"Search-BasicChipsTabsForm"})}),n(Y,{"data-test":"Search-DataContent",children:[a!=null&&a.data&&a.data.length>0?e(Z,{onFetchMore:a==null?void 0:a.fetchMore,scrollbarWidth:0,paddingBottom:"25px","data-test":"Search-Infinite",children:e(_,{result:a.data,query:a==null?void 0:a.search,searchRouteHandler:k,"data-test":"Search-SearchList"})}):y&&e(I,{font:"body-l",colorToken:"--text-placeholder-neutral-default","data-test":"Search-ContentSpan",children:s("noumena.global_search.no_results")}),f&&e(w,{"data-test":"Search-SpinnerHead",children:e(M,{"data-test":"Search-Spinner"})})]})]})]})},ma=oa;export{ma as default};
//# sourceMappingURL=Search-d07928b1.js.map
