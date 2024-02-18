import{m as n,s as y,u as J,w as Q,g as Y,b as k,c as r,j as t,S as d,B as $,I as Z,T as p,e as R}from"./index-cd84bcc9.js";import{C as l,a9 as U,aB as tt,r as c,ar as et,l as L}from"./vendor-51460554.js";import{a as at,g as it}from"./storyblok-c16fb040.js";import{M as ot}from"./index-a497727f.js";import{g as rt,a as nt}from"./getColorByNoumType-1fec2f43.js";import{S as st}from"./StoryblokRichTextContainer-c5812fec.js";import{d as dt,V as lt}from"./Modal-ae3b602d.js";import"./sideNavItems-22800105.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./styles-3ceda759.js";import"./memoize-one.esm-7e8505cb.js";const ct="/assets/connect-intro-noum-17803718.svg",mt="/assets/connect-intro-noum-mobile-6278b40e.svg",ht=l.div`
  font-family: var(--font-family);
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  img {
    height: auto;
    object-fit: cover;
  }

  ${i=>i.isAppUiV2?`
    padding: 0;

    @media (min-width: ${n.TABLET_MIN}) {
      max-width: 894px;
      margin: 0 auto;
    }
    `:`
  @media (max-width: ${n.TABLET_MAX}) and (min-width: ${n.TABLET_MIN}) {
    width: 100vw;
    padding: 0;
  }
  @media (max-width: ${n.LAPTOP_MAX}) and (min-width: ${n.LAPTOP_MIN}) {
    width: 894px;
  }
  @media (max-width: ${n.LAPTOP_L_MAX}) and (min-width: ${n.LAPTOP_L_MIN}) {
    width: 894px;
  }
  @media (min-width: ${y.DESKTOP}) {
    width: calc(100vw - 200px);
    max-width: 894px;
  }
  @media (max-width: ${n.TABLET_MIN}) {
    padding: unset;
  }
  `}
`,pt=l.div`
  margin: 0 auto;
  width: 668px;
  font-family: var(--font-family);
  padding-bottom: 85px;

  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 140%;
    color: var(--text-body-header-neutral-default);
    margin: 16px 0;
  }

  h1:nth-of-type(2) {
    font-size: 24px;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 160%;
    color: var(--text-body-neutral-highlighted);
    img {
      width: 100%;
      height: 413px;
    }
  }

  @media (max-width: ${n.TABLET_MAX}) {
    width: 100vw;
    box-sizing: border-box;
    padding: 0 16px;
    padding-bottom: 60px;
  }
`,gt=l.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: var(--text-body-brand-primary-default);
  padding-bottom: 8px;
`,ut=l.div.attrs(i=>i)`
  .clickable {
    cursor: pointer;
  }
  .relative-btn-ctr {
    position: relative;
    bottom: calc(40px + 24px);
    display: flex;
    justify-content: center;
  }
`,xt=l.div.attrs(i=>i)`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  gap: 40px;
  isolation: isolate;
  background: url('${({bgImage:i})=>i}'),
    linear-gradient(
      267.32deg,
      var(--bg-card-brand-secondary-default) 33.52%,
      rgba(242, 238, 254, 0.4) 76.82%
    );
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 16px;
  margin-bottom: 100px;
  .left {
    .description {
      color: var(--text-card-brand-primary-default);
      padding: 0;
    }
    button {
      cursor: pointer;
    }
  }
  .right {
    width: 100%;
    max-width: 277px;
    > div {
      cursor: pointer;
      box-sizing: border-box;
      width: 100%;
      max-width: 277px;
      text-align: center;
    }
  }
  @media (max-width: ${n.TABLET_MAX}) {
    border-radius: unset;
  }
  @media (max-width: ${n.MOBILE_L_MAX}) {
    flex-direction: column;
    text-align: center;
    padding: 24px 16px 16px;
    gap: 24px;
  }
`,ft=l.img`
  height: 360px;
  border-radius: 16px;
  width: 100%;
  @media (max-width: ${y.TABLET_L}) {
    border-radius: unset;
  }
  @media (max-width: ${y.TABLET}) {
    height: 216px;
  }
`,yt=()=>{var v,S,M,N,I,C;const i=U(),g=tt(),P=c.useRef(!0),b=(v=g==null?void 0:g.search)==null?void 0:v.split("?slug=")[1],[z,A]=c.useState(!1),[e,E]=c.useState(),[V,O]=c.useState(""),{width:u}=J(),{flags:D}=Q();c.useEffect(()=>{async function W(){var B,_;const{data:s}=await at(),h=((_=(B=s==null?void 0:s.story)==null?void 0:B.content)==null?void 0:_.special_noum_id)||"";P.current&&O(h)}async function q(){var h;const{data:s}=await it(b);E((h=s==null?void 0:s.story)==null?void 0:h.content)}W(),q()},[b]);const{data:x}=Y(V),a=x==null?void 0:x.getSpaceById,w=a==null?void 0:a._id,j=a==null?void 0:a.name,X=(a==null?void 0:a.profileImage)||"",f=(a==null?void 0:a.type)||"",F=(a==null?void 0:a.followersCount)||0,H=`${(S=a==null?void 0:a.uid)==null?void 0:S.firstName} ${(M=a==null?void 0:a.uid)==null?void 0:M.lastName}`,{t:m}=et(),G=u>R.MOBILE_MAX?ct:mt,o=((N=e==null?void 0:e.Video)==null?void 0:N.filename)||"",T=k(()=>{A(!0)}),K=k(()=>{A(!1)});return r(ot,{hideLeftMenu:!0,backgroundColor:"--bg-body-neutral-alt-default",onGoBack:()=>i(-1),"data-test":"Articles-MoneyLayout",children:[r(ht,{isAppUiV2:D.newAppNavigation,"data-test":"Articles-Container",children:[u>1023&&t(d,{height:24,"data-test":"Articles-Spacer"}),r(ut,{"data-test":"Articles-StyledFeaturedImageContainer",children:[t(ft,{className:`featured-img ${!!(o!=null&&o.length)&&"clickable"}`,src:(I=e==null?void 0:e.Main_Image)==null?void 0:I.filename,alt:(C=e==null?void 0:e.Main_Image)==null?void 0:C.alt,onClick:o.length>0?T:void 0,"data-test":"Articles-ArticeMainImage"}),!!(o!=null&&o.length)&&t("div",{className:"relative-btn-ctr",children:t($,{primary:!0,size:"small",onClick:T,leftIcon:t(Z,{name:"play_xs",size:24,color:"--icon-button-neutral-alt-default","data-test":"Articles-Icon"}),"data-test":"Articles-Button",children:m("noumena.home.article.watch_video")})})]}),!(o!=null&&o.length)&&t(d,{height:u>1023?40:24,"data-test":"Articles-Spacer"}),r(pt,{"data-test":"Articles-StyledArticleDetail",children:[t(gt,{"data-test":"Articles-StyledCategory",children:L.capitalize((e==null?void 0:e.Main_Category.split("_").join(" "))||"")}),t(p,{font:"heading-l-bold",colorToken:"--text-body-neutral-highlighted","data-test":"Articles-TSpan",children:e==null?void 0:e.Title}),t(d,{isFlex:!0,height:16,"data-test":"Articles-Spacer"}),t(p,{font:"heading-xs",colorToken:"--text-body-neutral-highlighted","data-test":"Articles-TSpan",children:e==null?void 0:e.Short_Description}),t(d,{height:16,"data-test":"Articles-Spacer"}),t(st,{content:e==null?void 0:e.Content,"data-test":"Articles-StoryblokRichTextContainer"})]}),r(xt,{bgImage:G,"data-test":"Articles-StyledBanner",children:[r("div",{className:"left",children:[t(p,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"Articles-TSpan",children:m("noumena.home.article.footer.header")}),t(d,{isFlex:!0,height:4,"data-test":"Articles-Spacer"}),t(p,{font:"body-l",colorToken:"--text-card-brand-primary-default",className:"description","data-test":"Articles-TSpan",children:m("noumena.home.article.footer.description")}),t(d,{isFlex:!0,height:16,"data-test":"Articles-Spacer"}),t($,{primary:!0,size:"small",onClick:()=>i(`/noum/${w}`),"data-test":"Articles-Button",children:m("noumena.home.article.footer.button.text")})]}),t("div",{className:"right",children:r(dt,{imageUrl:X,backgroundColor:rt(f),color:nt(f),onClick:()=>i(`/noum/${w}`),"data-test":"Articles-StyledNoumCard",children:[t("div",{className:"cover"}),r("div",{className:"transform-block",children:[t("div",{className:"image"}),t("div",{className:"type",children:L.capitalize(f)})]}),r("div",{className:"transform-block transform-block-50",children:[t("div",{className:"name",children:j}),r("div",{className:"owned-by",children:["Owned By: ",t("b",{"data-test":"Articles-b",children:H})]})]}),r("div",{className:"followers",children:[F," Followers"]})]})})]})]}),t(lt,{open:z,onClose:K,videoURL:o,"data-test":"Articles-VideoPlayerModal"})]})},Lt=yt;export{Lt as default};
//# sourceMappingURL=Article-c9d5b0b0.js.map
