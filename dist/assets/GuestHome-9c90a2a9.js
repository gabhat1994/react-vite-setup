import{m as s,b2 as c,c as l,j as a,a1 as x,d9 as y,s as f,T as u,q2 as G,f as H,n as C,F as T,S as L,ay as w,p as g,O as v,o as E}from"./index-cd84bcc9.js";import{C as S,a as _}from"./ChamberBox-e4d36ac9.js";import{C as o,a6 as $,B as h,ay as B,a9 as I}from"./vendor-51460554.js";import{C as M,a as A}from"./styles-346e761c.js";import"./capitalizeFirstLetter-92ef0abb.js";import"./SkeletonChamberBox-5e97f066.js";import"./consts-be860660.js";import"./useTimeIndicator-3b8ca7e8.js";const N=o.div`
  font-family: var(--font-family);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-body-neutral-alt-highlighted);
`,O=$`
  @media (min-width: ${s.LAPTOP_MIN}) {
    grid-template-columns: 900px;
  }
  @media (max-width: ${s.TABLET_MAX}) and (min-width: ${s.MOBILE_S_MIN}) {
    grid-template-columns: 1fr;
  }
`,P=o.div`
  display: grid;
  justify-content: center;
  gap: 0;

  @media ${c.MOBILE_S} {
    padding: 16px 16px 0;
  }

  @media ${c.LAPTOP} {
    padding: 24px 40px 0;
    gap: 24px;
  }

  ${({type:e})=>e==="Home"&&O}
`,b=({type:e,children:t})=>l(N,{"data-testid":"guest-layout-container","data-test":"GuestLayout-Container",children:[a(x,{isBorderRadius:!1,"data-test":"GuestLayout-Header",children:a(y,{"data-test":"GuestLayout-GuestHeader"})}),a(P,{"data-testid":"guest-layout-main",type:e,"data-test":"GuestLayout-Main",children:t})]}),j=o.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`,k=o.div`
  @media (min-width: ${f.LAPTOP_L}) {
    width: 912px;
  }
`,F=o.div`
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  width: 783px;
  height: 196px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 24px;
  box-sizing: border-box;
  text-align: center;
  @media (min-width: ${s.TABLET_MIN}) and (max-width: ${s.TABLET_MAX}) {
    min-width: 600px;
    width: 100%;
  }
  @media (max-width: ${s.MOBILE_L_MAX}) {
    min-width: 327px;
    width: 100%;
    min-height: 196px;
    height: auto;
  }
`,z=o.div``,R=()=>l(F,{"data-testid":"guest-home-empty","data-test":"GuestHomeEmpty-EmptyContainer",children:[a(u,{font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted","data-testid":"empty-home-title","data-test":"GuestHomeEmpty-TSpan",children:h("noumena.guest.empty.home.page.title.text")}),a(u,{font:"body-m",colorToken:"--text-card-neutral-default","data-testid":"empty-home-description","data-test":"GuestHomeEmpty-TSpan",children:a(B,{i18nKey:"noumena.guest.empty.home.page.description.text",components:{br:a("br",{})},"data-test":"GuestHomeEmpty-Trans"})})]}),U=10,W=e=>{var d,r,m;const t=e==null?void 0:e.uid,i=e==null?void 0:e._id;return a(S,{id:i,url:(e==null?void 0:e.profileImage)??void 0,chamberUrl:`/noum/${i}`,ownerImageURL:((d=t==null?void 0:t.profile)==null?void 0:d.profilePicture)||v,title:(t==null?void 0:t.title)||"",chamberTitle:e.name||"",name:((m=(r=e.category)==null?void 0:r.name)==null?void 0:m.toLowerCase())||_.member,ownedby:E(t==null?void 0:t.firstName,t==null?void 0:t.middleName,t==null?void 0:t.lastName)??void 0,archived:e.status===g.Archived,followers:e.followersCount||0,location:(t==null?void 0:t.location)??void 0,"data-test":"renderChamberBox-ChamberBox"})},X=()=>{const{noums:e,loading:t,infiniteState:i,fetchMoreNoums:d}=G(!0,U),{user:r}=H(),m=I();return a(b,{type:"Home","data-test":"GuestHome-GuestLayout",children:a(z,{"data-test":"GuestHome-Container",children:t?a(k,{"data-test":"GuestHome-SpinnerContainer",children:a(C,{"data-test":"GuestHome-Spinner"})}):e&&e.length>0?l(T,{children:[" ",l(j,{"data-test":"GuestHome-TitleWrapper",children:[a(u,{font:"heading-xs-bold",colorToken:"--text-body-header-neutral-default","data-test":"GuestHome-TSpan",children:h("noumena.guest.home.page.title.text")}),a(L,{height:16,"data-test":"GuestHome-Spacer"})]}),a(w,{onFetchMore:d,status:i,scrollbarWidth:0,paddingBottom:"75px","data-test":"GuestHome-Infinite",children:a(M,{"data-testid":"guest-chambers-list","data-test":"GuestHome-ChambersListContainer",children:e.map((n,p)=>n&&n.status!==g.Deleted&&a(A,{onClick:()=>m(`/noum/${n==null?void 0:n._id}`),"data-test":"GuestHome-ChamberItem",children:W(n)},`${n._id?n._id+p:p}`))})})]}):r&&!t&&a(R,{"data-test":"GuestHome-GuestHomeEmpty"})})})},tt=X;export{tt as default};
//# sourceMappingURL=GuestHome-9c90a2a9.js.map
