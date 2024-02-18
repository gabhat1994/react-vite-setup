import{m as i,s as P,a as z,u as O,w as X,b as C,c as g,e as o,j as a,q as _,B as D,I as R,R as U}from"./index-cd84bcc9.js";import{C as c,a9 as j,ar as H,r as A,l as S}from"./vendor-51460554.js";import{a as G,g as K}from"./storyblok-c16fb040.js";import{L as V}from"./index-c8a663c0.js";import"./sideNavItems-22800105.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./styles-3ceda759.js";const q=c.div`
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;

  ${s=>s.$isAppUiV2?`
        padding: 0;
      `:`
  @media (max-width: ${i.TABLET_MAX}) and (min-width: ${i.TABLET_MIN}) {
    width: calc(100vw - 32px);
    padding: 16px 0 0 0;
  }
  @media (max-width: ${i.LAPTOP_MAX}) and (min-width: ${i.LAPTOP_MIN}) {
    width: 100%;
    max-width: 1224px;
    padding: 0;
  }
  @media (max-width: ${i.LAPTOP_L_MAX}) and (min-width: ${i.LAPTOP_L_MIN}) {
    width: 1224px;
    padding: 0;
  }
  @media (min-width: ${P.DESKTOP}) {
    width: calc(100vw - 200px);
    max-width: 1224px;
    padding: 0;
  }
  `}
`,F=c.div`
  font-family: var(--font-family);
  @media (max-width: ${i.TABLET_MAX}) {
    padding-bottom: 87px;
  }
`,$=c.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  color: var(--text-body-header-neutral-default);
  margin-bottom: 16px;
`,k=c.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  .tags {
    > span {
      margin-right: 12px;
    }
  }
  @media (max-width: ${i.MOBILE_L_MAX}) {
    margin: 0;
    border-radius: unset;
  }
  @media (min-width: ${i.TABLET_MIN}) and (max-width: ${i.TABLET_MAX}) {
    padding: 16px;
    margin: 16px 0;
  }
  @media (max-width: ${i.TABLET_MIN}) {
    padding: 16px;
  }
`;c.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 24px;
`;const W=c.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: max-content;
  grid-gap: 24px;
  padding-bottom: 24px;
  .StyledCard {
    :nth-child(9n + 1) {
      grid-column: auto / span 2;
    }
  }

  @media (min-width: ${i.TABLET_MIN}) and (max-width: ${i.TABLET_MAX}) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
    padding-bottom: 16px;
    .StyledCard {
      :nth-child(9n + 1) {
        grid-column: auto / span 1;
      }
      :nth-child(7n + 1) {
        grid-column: auto / span 3;
      }
    }
  }

  @media (max-width: ${i.MOBILE_L_MAX}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    padding-bottom: 16px;
    .StyledCard {
      :nth-child(9n + 1) {
        grid-column: auto / span 1;
      }
      :nth-child(7n + 1) {
        grid-column: auto / span 1;
      }
    }
  }
  @media (max-width: ${i.MOBILE_XL_MAX}) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 16px;
    padding-bottom: 16px;
    .StyledCard {
      :nth-child(9n + 1) {
        grid-column: auto / span 1;
      }
      :nth-child(7n + 1) {
        grid-column: auto / span 1;
      }
    }
  }
`,J=c.div.attrs(s=>s)`
  cursor: pointer;
  padding: 8px !important;
  display: flex;
  flex-direction: column;
  padding: 0px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 20px;
  &.featured {
    display: flex;
    flex-direction: row;
    min-height: 225px;
  }
  &.featured .article-image {
    height: 100%;
    width: 50%;
    min-width: 50%;
  }
  &.featured .article-details {
    padding: 24px;
    .title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 18px;
      line-height: 160%;
    }
    .content {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .article-image {
    border-radius: 12px;
    width: 100%;
    height: 134px;
    background: url(${s=>s.imageUrl}) no-repeat center center;
    background-size: cover;
  }
  .article-details {
    padding: 8px;
    text-align: left;
    .type {
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 160%;
      color: var(--text-card-header-neutral-default);
    }
    .title {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
      color: var(--text-card-header-neutral-highlighted);
      ${z}
    }
    .content {
      padding-top: 8px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      color: var(--text-card-neutral-default);
      opacity: 0.75;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .link {
      cursor: pointer;
      border: none;
      background: transparent;
      padding-top: 20px;
      display: flex;
      align-items: center;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 100%;
      > div {
        padding-left: 8px;
      }
    }
  }
`,Q=()=>{const s=j(),{t:y}=H(),{width:l}=O(),{flags:E}=X(),[h,M]=A.useState(),[w,B]=A.useState([]);A.useEffect(()=>{async function e(){var r;const{data:d}=await G();M((r=d==null?void 0:d.story)==null?void 0:r.content)}e()},[]),A.useEffect(()=>{(async()=>{var m;const d=(m=h==null?void 0:h.Section_02[1])==null?void 0:m.Articles,r=await Promise.allSettled((d==null?void 0:d.map(async t=>{var n;return K((n=t==null?void 0:t.Link)==null?void 0:n.cached_url)}))||[]),p=[...r==null?void 0:r.map(t=>{var x,f;const n=t;return((f=(x=n==null?void 0:n.value)==null?void 0:x.data)==null?void 0:f.story)||null})],u=S.chunk(p,14);B(u)})()},[h]);const T=[{id:1,text:"Knowledge Base",type:"secondary"}],b=C(e=>{s({pathname:U.ARTICLE,search:`?slug=${e}`})});return g(V,{type:"Articles","data-test":"Articles-ListLayout",children:[l<o.TABLET&&g(k,{"data-test":"Articles-StyledTagsSection",children:[a($,{"data-test":"Articles-StyledHeader",children:y("noumena.home.articles.knowledge_base")}),a("div",{className:"tags",children:T.map(e=>a(_,{secondary:e.type==="secondary","data-test":"Articles-Tag",children:e.text},e.id))})]}),a(q,{$isAppUiV2:E.newAppNavigation,"data-test":"Articles-Container",children:g(F,{"data-testid":"articles","data-test":"Articles-StyledAllArticles",children:[l>=o.TABLET&&a($,{"data-test":"Articles-StyledHeader",children:y("noumena.home.articles.knowledge_base")}),l>=o.TABLET&&a(k,{"data-test":"Articles-StyledTagsSection",children:a("div",{className:"tags",children:T.map(e=>a(_,{secondary:e.type==="secondary","data-test":"Articles-Tag",children:e.text},e.id))})}),w==null?void 0:w.map((e,d)=>a(W,{"data-test":"Articles-StyledArticlesGrid",children:e==null?void 0:e.map((r,v)=>{var L;let p=0;l>=o.LAPTOP?p=9:l<o.LAPTOP&&l>=o.TABLET?p=7:l<o.TABLET&&(p=0);const u=v%p===0,{id:m,content:t,full_slug:n}=r,x=(L=t==null?void 0:t.Main_Image)==null?void 0:L.filename,f=t==null?void 0:t.Title,N=t==null?void 0:t.Short_Description,I=S.capitalize((t==null?void 0:t.Main_Category.split("_").join(" "))||"");return g(J,{imageUrl:x,className:`StyledCard ${u?"featured":""}`,onClick:()=>b(n),"data-test":`Articles-StyledCard-${m}`,children:[a("div",{className:"article-image"}),g("div",{className:"article-details",children:[a("div",{className:"type",children:I}),a("div",{className:"title",children:f}),a("div",{className:"content",children:N}),!!u&&a(D,{className:"link",textOnly:!0,onClick:()=>b(n),rightIcon:a(R,{name:"chevron_small_right_m",size:24,color:"--icon-button-brand-primary-default","data-test":"Articles-Icon"}),"data-test":"Articles-Button",children:y("noumena.home.articles.read_full_article")})]})]},m)})},`${d+0}`))]})})]})},lt=Q;export{lt as default};
//# sourceMappingURL=Articles-bd102f38.js.map
