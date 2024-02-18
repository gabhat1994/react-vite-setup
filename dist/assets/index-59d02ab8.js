import{s as d,x as at,j as t,ps as x,c,I as T,T as M,S as nt,f as O,b7 as W,F as D,O as N,pt as it,pu as C,pv as ot,pw as rt,px as st,py as dt,ay as lt,fi as ct,u as j,e as P,w as mt,pz as pt,aF as ut,pA as ht}from"./index-cd84bcc9.js";import{C as s,ar as k,aT as u,r,al as gt}from"./vendor-51460554.js";import{L as xt}from"./index-c8a663c0.js";import{N as St,a as ft}from"./styles-6b43a970.js";import{I as yt}from"./InviteFriendSideMenuSection-cdd5da99.js";import{I as bt,B as z,c as w,P as Ct,C as wt}from"./PostItem-d75f4356.js";import{s as Tt}from"./styles-d2f9f396.js";import"./sideNavItems-22800105.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./storyblok-c16fb040.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./styles-3ceda759.js";import"./ChamberActionModal-ce3fca40.js";import"./styles-1a9b9e59.js";import"./browser-f98ef106.js";import"./Radiobox-c1e62033.js";const Pt=s.div`
  border: 1px solid var(--border-card-neutral-highlighted);
  padding: 16px;
  gap: 10px;
  background: var(--bg-card-neutral-alt-default);
  display: grid;
  grid-template-columns: 56px auto;
  align-items: center;
  margin-top: 16px;
  box-sizing: border-box;

  @media (min-width: ${d.TABLET}) {
    margin-top: 16px;
    border-radius: 16px;
    grid-template-columns: 56px auto 48px;
    width: 92%;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: ${d.LAPTOP}) {
    margin-top: ${({isMarginTop:e})=>e?"20px":"0"};
    width: unset;
  }
`,kt=s.div`
  background: var(--bg-input-neutral-default);
  border-radius: 8px;
  height: 52px;
  color: var(--text-input-neutral-default);
  font-size: 16px;
  padding-left: 12px;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: var(--font-family);
  width: calc(100% - 10px);

  @media (min-width: ${d.TABLET}) {
    width: 95%;
  }

  @media (min-width: ${d.DESKTOP}) {
    width: 100%;
  }
`;s.img`
  width: 150px;
  margin: 0 auto;
`;s.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;const R=s.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 16px;
  margin: 16px 12px 0;
`,vt=s.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 40px;
  padding: 9px 12px;
  cursor: pointer;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: var(--font-body-medium-size);
  color: var(--text-tab-chips-neutral-default);
  ${({isActive:e})=>e?"color: var(--text-tab-chips-brand-primary-selected); background-color: var(--bg-tab-chips-brand-secondary-selected);":void 0}
`,At=s.img`
  min-width: 52px;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  ${({isClickable:e})=>e?"cursor: pointer;":void 0}
`,Lt=s.div`
  @media (min-width: ${d.LAPTOP}) {
    width: 288px;
    margin-left: 0;
  }
`,Ft=s.div`
  width: 100vw;
`;s.div`
  display: grid;
`;const It=s(at)`
  width: 100%;

  ${e=>!e.isAppUiV2&&`
  @media (min-width: ${d.TABLET_L}) and (max-width: ${d.LAPTOP_L}) {
    width: calc(100vw - 512px);
    max-width: 924px;
  }
  @media (min-width: ${d.TABLET}) and (max-width: ${d.TABLET_L}) {
    width: calc(100vw - 32px);
  }
  @media (min-width: ${d.LAPTOP_L}) {
    width: calc(100vw - 516px);
    max-width: 924px;
  }
  @media (min-width: ${d.DESKTOP}) {
    max-width: 924px;
  }
  @media (max-width: ${d.TABLET_L}) {
    padding-bottom: 95px;
  }
  `}
`,$t=({handleClick:e,tabName:a})=>{const{t:i}=k();return t(R,{"data-test":"CommunityTabs-TabContainer",children:x.map(o=>t(vt,{isActive:o===a,onClick:()=>e(o),"data-test":`CommunityTabs-TabButton-${o}`,children:i(`${o}`)},o))})};s.div`
  display: flex;
  position: relative;
  width: ${({size:e,length:a,leftPosition:i})=>e*a-i*(a-1)}px;
  height: calc(${({size:e})=>e}px + 2px);
  margin-right: calc(
    ${({length:e,leftPosition:a})=>e===1?8:a/2}px
  );
`;s.div`
  display: flex;
  position: absolute;
  padding: 2px;
  background-color: var(--bg-card-neutral-alt-default);
  border-radius: 8px;
  width: ${({size:e})=>e}px;
  height: ${({size:e})=>e}px;
  top: 0;
  left: ${({leftPosition:e,nr:a})=>a>0?e*a:"0"}px;
  z-index: ${({nr:e})=>e};
`;const _t=({handleLike:e,handleComment:a,isLiked:i,numberOfComments:o,showComments:n,isSkeletonVisible:m=!1})=>{const{t:p}=k();return c(bt,{"data-test":"FooterActions-ItemFooter",children:[c(z,{onClick:e,"data-test":"FooterActions-ButtonWrap",children:[t(T,{name:"thumb_up_m",size:w,color:i?"--icon-card-brand-primary-default":"--icon-card-neutral-default","data-test":"FooterActions-Icon"}),t(M,{colorToken:i?"--button-card-brand-primary-default":"--button-card-neutral-default",font:"body-m-bold",style:{marginLeft:10},"data-test":"FooterActions-TSpan",children:m?t(u,{width:62,height:24,"data-test":"FooterActions-Skeleton"}):p(i?"noumena.reaction.liked":"noumena.reaction.like")})]}),t(nt,{width:w,"data-test":"FooterActions-Spacer"}),c(z,{onClick:a,"data-test":"FooterActions-ButtonWrap",children:[t(T,{name:"message_m",size:w,color:n?"--icon-card-brand-primary-default":"--icon-card-neutral-default","data-test":"FooterActions-Icon"}),t(M,{colorToken:n?"--button-card-brand-primary-default":"--button-card-neutral-default",font:"body-m-bold",style:{marginLeft:10},"data-test":"FooterActions-TSpan",children:m?t(u,{width:62,height:24,"data-test":"FooterActions-Skeleton"}):o&&o>0?o:p("noumena.reaction.comment")})]})]})},V=({user:e,onClick:a})=>{var m;const{user:i}=O(),o=r.useMemo(()=>!W.isInactive(e),[e]),n=r.useMemo(()=>W.isUnregistered(i),[i]);return t(D,{children:e?t(At,{isClickable:o&&!n&&!!a,src:o?((m=e==null?void 0:e.profile)==null?void 0:m.profilePicture)||N:N,alt:"addingPostUserAvatar",onClick:o&&!n?a:()=>{},"data-test":"UserAvatar-StyledAvatar"}):t(u,{width:"52px",height:"52px","data-test":"UserAvatar-Skeleton"})})},Bt=()=>c(it,{"data-testid":"SinglePostWrap",isMarginTop:!0,"data-test":"SinglePostSkeleton-ElementCnt",children:[c(C,{"data-test":"SinglePostSkeleton-Wrapper",children:[t(V,{user:void 0,"data-test":"SinglePostSkeleton-UserAvatar"}),c(ot,{"data-test":"SinglePostSkeleton-WrapperColumn",children:[t(rt,{isActive:!1,"data-test":"SinglePostSkeleton-StyledName",children:t(u,{"data-test":"SinglePostSkeleton-Skeleton"})}),t(C,{"data-test":"SinglePostSkeleton-Wrapper",children:t(st,{"data-test":"SinglePostSkeleton-TimeText",children:t(u,{height:"10px",width:"120px","data-test":"SinglePostSkeleton-Skeleton"})})})]}),t(dt,{"data-test":"SinglePostSkeleton-IconCnt",children:t(u,{width:"24px",height:"16px",style:{position:"relative",bottom:"10px",marginLeft:"8px"},"data-test":"SinglePostSkeleton-Skeleton"})})]}),t(C,{"data-test":"SinglePostSkeleton-Wrapper",children:t("div",{style:{display:"block",flex:1},children:t(u,{count:3,"data-test":"SinglePostSkeleton-Skeleton"})})}),t(_t,{handleComment:()=>{},handleLike:()=>{},isSkeletonVisible:!0,"data-test":"SinglePostSkeleton-FooterActions"})]}),Et=({totalCount:e,posts:a,fetchMore:i,networkStatus:o,refetch:n,forceRender:m,setForceRender:p})=>t(lt,{onFetchMore:()=>{i({variables:{limit:10,offset:a==null?void 0:a.length}})},status:ct({networkStatus:o,totalCount:e,currentCount:(a==null?void 0:a.length)??0}),grow:!0,width:"100%",style:j().width<P.LAPTOP?{padding:"16px",overflow:"hidden"}:void 0,"data-test":"AllPosts-Infinite",children:a==null?void 0:a.map(l=>t(Ct,{data:l,isPinningEnabled:!0,isMarginTop:!0,refetch:n,isCommunity:!0,forceRender:m,setForceRender:p,size:"XL","data-test":"AllPosts-PostItem"},l==null?void 0:l._id))}),Ut=10,te=()=>{var _,B,E;const{flags:e}=mt(),{t:a}=k(),[i,o]=r.useState(x[0]),{data:n,fetchMore:m,networkStatus:p,refetch:l,loading:S}=pt({variables:{limit:Ut,offset:0,filter:{usersType:[ht[i]]}}}),[K,Q]=r.useState(!1),Y=((_=n==null?void 0:n.myFeed)==null?void 0:_.count)||0,v=r.useMemo(()=>{var g,U;return((U=(g=n==null?void 0:n.myFeed)==null?void 0:g.data)==null?void 0:U.filter(b=>i===x[1]?b==null?void 0:b.isPinned:!0))||[]},[(B=n==null?void 0:n.myFeed)==null?void 0:B.data,i]),{width:A}=j(),f=A>P.LAPTOP-1,H=A>P.TABLET-1,L=t(Lt,{"data-test":"Community-rightContent-RightSideBarContainer",children:t(yt,{width:"272px","data-test":"Community-rightContent-InviteFriendSideMenuSection"})}),{user:h}=O(),X=r.useMemo(()=>(h==null?void 0:h._id)??"",[h]),[Z,y]=r.useState(!1),[q,F]=r.useState(S),I=r.useCallback(()=>{F(!0),l().finally(()=>F(!1))},[l]);r.useLayoutEffect(()=>{I()},[l,i,I]);const G=g=>{o(g)},J=r.useCallback(()=>{y(!1),o(x[0]),l().then(()=>{})},[]),tt=r.useCallback(()=>y(!0),[]),et=r.useCallback(()=>y(!1),[]),$=!((E=n==null?void 0:n.myFeed)!=null&&E.data)&&S||q||p===gt.loading;return t(ut,{isLoading:$,"data-test":"Community-SkeletonLoaderProvider",children:c(Ft,{"data-test":"Community-PageCnt",children:[Z&&t(wt,{spaceId:X,onClose:et,onSuccess:J,isChamber:!1,"data-test":"Community-CreatePost"}),c(xt,{type:"Community",rightContent:f?L:void 0,"data-test":"Community-ListLayout",children:[!f&&L,t(It,{gap:24,isAppUiV2:e.newAppNavigation,"data-test":"Community-Container",children:t(Tt,{style:{marginLeft:f?12:0},"data-test":"Community-AppStyled",children:c(D,{children:[c(Pt,{"data-test":"Community-ElementWrapper",children:[t(V,{user:h,"data-test":"Community-UserAvatar"}),t(kt,{onClick:tt,"data-test":"Community-StartDiscussion",children:a("noumena.post.start_discussion")}),H&&t(T,{name:"send_filled_m",size:24,color:"--icon-button-neutral-pressed","data-test":"Community-Icon"})]}),t($t,{handleClick:G,tabName:i,"data-test":"Community-CommunityTabs"}),$?t(u,{count:5,wrapper:()=>t(Bt,{"data-test":"Community-SinglePostSkeleton"}),"data-test":"Community-Skeleton"}):t(Et,{totalCount:Y,posts:v,fetchMore:m,refetch:l,networkStatus:p,setForceRender:Q,forceRender:K,"data-test":"Community-AllPosts"}),!S&&!v.length&&t(R,{"data-test":"Community-TabContainer",children:t(St,{"data-test":"Community-NoPostsContainer",children:t(ft,{font:"body-m",colorToken:"--text-card-neutral-default",style:{position:"relative",left:"200%"},"data-test":"Community-NoPosts",children:a("noumena.post.no_posts_yet")})})})]})})})]})]})})};export{te as default};
//# sourceMappingURL=index-59d02ab8.js.map
