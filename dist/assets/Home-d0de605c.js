import{s as c,m as T,a as j,T as v,B as O,u as X,b as B,R as H,j as e,F as W,c as l,d as se,I as A,e as $,S as E,f as q,g as ce,M as Z,h as ee,i as te,C as pe,k as ae,l as he,n as me,O as ue,o as ge,p as xe,q as be,r as fe,t as we,v as ye,w as Se}from"./index-cd84bcc9.js";import{C as s,ar as z,a9 as R,r as y,l as Me,f as _e,ay as Te,B as ve}from"./vendor-51460554.js";import{g as Ce,a as ke}from"./storyblok-c16fb040.js";import{L as Le}from"./index-c8a663c0.js";import{S as ie,a as oe}from"./swiper-slide-dfb916a5.js";import{C as Ne}from"./constants-ab41c274.js";import{C as Be}from"./ChamberCompleteness-c76bd15d.js";import{C as Ie,a as $e}from"./ChamberBox-e4d36ac9.js";import{S as Ae,a as Ee,b as Oe,c as Pe,V as ze}from"./Modal-ae3b602d.js";import"./sideNavItems-22800105.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./styles-3ceda759.js";import"./capitalizeFirstLetter-92ef0abb.js";import"./styles-0c3f5396.js";import"./RichTextEditorView-3d7dc014.js";import"./purify.es-89df9bf9.js";import"./url-8d85408e.js";import"./styles-1a9b9e59.js";import"./UploadMedia-5fe81e87.js";import"./SkeletonChamberBox-5e97f066.js";import"./consts-be860660.js";import"./useTimeIndicator-3b8ca7e8.js";import"./memoize-one.esm-7e8505cb.js";const Ue=s.div`
  h2 {
    margin-top: 0;
  }
  box-sizing: border-box;
  padding: 24px;
  width: 100%;
  min-width: 322px;
  min-height: 182px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  flex: none;
  /* order: 3; */
  flex-grow: 0;

  @media (max-width: ${c.TABLET_L}) {
    min-width: 704px;
    min-height: 160px;
    width: calc(100% - 32px);
    margin: 0 16px;
  }

  @media (max-width: ${c.MOBILE_MAX}) {
    width: 100vw;
    min-width: unset;
    margin: unset;
    min-height: 182px;
    border-radius: unset;
  }
`,Fe=s.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`,He=s(v)`
  display: flex;
  @media (max-width: ${T.TABLET_MAX}) {
    width: 60%;
    font-weight: 600;
    font-size: 18px;
    line-height: 160%;
  }
  @media (max-width: ${T.MOBILE_L_MAX}) {
    display: inline-flex;
    width: 85%;
    word-break: break-word;
  }
  @media (max-width: ${T.MOBILE_L_MAX}) {
    width: 70%;
  }
  @media (max-width: ${T.MOBILE_L_MIN}) {
    width: 60%;
  }
`,Ye=s(O)`
  display: none;
  @media (max-width: ${T.MOBILE_L_MAX}) {
    display: inline-flex;
  }
`,je=s.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  width: 100%;
  .mySwiper {
    display: flex;
    flex-direction: column-reverse;
    .swiper-slide {
      height: auto;
    }
  }
`,Xe=s.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-left: -6px;
  .swiper-icons {
    display: flex;
    align-items: center;
    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .swiper-control-btn {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      gap: 10px;
      width: 40px;
      height: 40px;
      background: var(--bg-button-neutral-default);
      border-radius: 8px;
    }
    .show-all {
      display: flex;
      align-items: center;
      margin-left: 16px;
    }
    > div:first-of-type {
      margin-right: 8px;
    }
    @media (max-width: ${c.MOBILE_MAX}) {
      display: none;
    }
  }
`,Re=s.div.attrs(n=>n)`
  cursor: pointer;
  box-sizing: border-box;
  height: 100%;
  padding: 8px !important;
  display: flex;
  flex-direction: column;
  padding: 0px;
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 20px;
  &.featured {
    display: flex;
    flex-direction: row;
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
    background: url(${n=>n.imageUrl}) no-repeat center center;
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
      ${j}
    }
    .content {
      padding-top: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      color: var(--text-card-header-neutral-default);
      opacity: 0.75;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .link {
      padding-top: 0.75rem;
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
`,Ve=[{name:"test1",image:"terms_m",text:"Knowledge Base",labelSize:"auto"}],De=n=>{const{t:r}=z(),a=R(),[x,p]=y.useState(!0),[o,d]=y.useState(!1),{articles:i}=n,[b,S]=y.useState([]),[h,N]=y.useState(),[M,t]=y.useState(0),{width:u}=X();let w=3;u<$.MOBILE_L?w=1.25:u<$.TABLET?w=2.25:u<$.LAPTOP?w=3:u<$.LAPTOP_SM&&(w=2.25),y.useEffect(()=>{(async()=>{const g=await Promise.allSettled((i==null?void 0:i.map(async m=>{var L;return Ce((L=m==null?void 0:m.Link)==null?void 0:L.cached_url)}))||[]),P=g==null?void 0:g.map(m=>{var U,F;const L=m;return((F=(U=L==null?void 0:L.value)==null?void 0:U.data)==null?void 0:F.story)||null});S([...P])})()},[i]);const C=B(()=>{a(H.ARTICLES)}),_=B(()=>{h&&!h.destroyed&&(h.slidePrev(),d(!1))}),k=B(()=>{h&&!h.destroyed&&(h.slideNext(),p(!1))});return e(W,{children:l(ie,{slidesPerView:w,spaceBetween:16,freeMode:!0,className:"mySwiper",onInit:f=>N(f),onReachBeginning:()=>p(!0),onReachEnd:()=>{((h==null?void 0:h.progress)||0)>.5&&d(!0)},"data-test":"SwiperFreeMode-Swiper",children:[l(Xe,{"data-test":"SwiperFreeMode-StyledSwiperControls",children:[e(se,{onChange:f=>{t(Number(f))},selectedId:M.toString(),mode:"isBackground",isWithoutImage:!0,inputList:Ve,fontSize:"--font-link-medium-size","data-test":"SwiperFreeMode-BasicChipsTabsForm"}),l("div",{className:"swiper-icons",children:[(b==null?void 0:b.length)>w&&l(W,{children:[e(A,{className:`swiper-control-btn ${x?"disabled":""}`,name:"chevron_left_m",size:16,color:x?"--icon-button-neutral-disabled":"--icon-button-neutral-default",onClick:_,"data-test":"SwiperFreeMode-Icon"}),e(A,{className:`swiper-control-btn ${o?"disabled":""}`,name:"chevron_right_m",size:16,color:o?"--icon-button-neutral-disabled":"--icon-button-neutral-default",onClick:k,"data-test":"SwiperFreeMode-Icon"})]}),e(O,{className:"show-all",textOnly:!0,onClick:C,rightIcon:e(A,{name:"chevron_right_m",size:16,color:"--icon-button-brand-primary-default","data-test":"SwiperFreeMode-Icon"}),"data-test":"SwiperFreeMode-Button",children:r("noumena.home.show_all")})]})]}),b==null?void 0:b.map((f,g)=>{var Y;const{id:P,content:m,full_slug:L}=f,U=(Y=m==null?void 0:m.Main_Image)==null?void 0:Y.filename,F=m==null?void 0:m.Title,V=m==null?void 0:m.Short_Description,D=Me.capitalize((m==null?void 0:m.Main_Category.split("_").join(" "))||"");return e(oe,{"data-test":"SwiperFreeMode-SwiperSlide",children:l(Re,{imageUrl:U,onClick:()=>{a({pathname:H.ARTICLE,search:`?slug=${L}`})},"data-test":"SwiperFreeMode-StyledCard",children:[e("div",{className:"article-image"}),l("div",{className:"article-details",children:[e("div",{className:"type",children:D}),e("div",{className:"title",children:F}),e("div",{className:"content",children:V})]})]})},`${g+0}-${P}`)})]})})};function We({data:n}){const{t:r}=z(),a=R(),x=n==null?void 0:n.Title,p=(n==null?void 0:n.Articles)||[],o=B(()=>{a(H.ARTICLES)});return p&&(p!=null&&p.length)?l(Ue,{"data-testid":"onboarding-section-testid","data-test":"StyledHowItWorksSection",children:[l(Fe,{"data-test":"HeaderWrapper",children:[e(He,{font:"body-xl-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"HeaderTitle",children:x}),e(Ye,{className:"show-all",textOnly:!0,onClick:o,rightIcon:e(A,{name:"chevron_small_right_m",size:24,color:"--icon-button-brand-primary-default","data-test":"Icon"}),"data-test":"ShowAllButton",children:r("noumena.home.show_all")})]}),e(E,{height:16,"data-test":"Spacer"}),e(je,{"data-test":"StyledCardsSection",children:e(De,{articles:p,"data-test":"SwiperFreeMode"})})]}):null}const qe=s.div`
  width: 100%;
  @media (min-width: ${c.TABLET_L}) {
    margin: 0 auto;
    width: 400px;
  }
`,ne=y.memo(n=>{const{t:r}=z(),a=R(),{width:x}=X(),{masterId:p}=q(),o=ce(p),{data:d,loading:i,loadingSpace:b,mainSpaceId:S,connectedMembers:h,connectedMembersCount:N,existingConnection:M,onRefetchConnectedMembers:t,onRefetchConnections:u,onRefetchSpaceByConfig:w,onRefetchSpaceById:C,spaceConfigData:_}=o,{open:k,onClose:I}=n,f=x>=$.LAPTOP,g=x<=$.TABLET;return l(Z,{open:k,onClose:I,enableAnimation:!0,isFullScreen:g,testId:"testNoumMeModal",enableCloseButton:!0,closeButtonStyles:{primary:!0,color:"--icon-button-neutral-alt-default"},style:{width:f?654:x<=802?"100%":802,background:"linear-gradient(180deg,rgba(49,13,117,1) 0%,rgba(102,63,186,1) 42%,rgba(255,255,255,1) 42%,rgba(255,255,255,1) 100%)"},disableBackdropClick:!0,"data-test":"NoumMeModal-Modal",children:[e(ee,{tSpanProps:{colorToken:"--text-modal-header-neutral-alt-default"},isFullScreen:g,"data-test":"NoumMeModal-ModalHeader",children:r("noumena.home.noum_me_modal.title")}),l(te,{mobileFlex:!0,isFullScreen:g,align:"center","data-test":"NoumMeModal-ModalBody",children:[e(v,{colorToken:"--text-modal-brand-secondary-default",font:"body-l",textAlign:f?"center":"left","data-test":"NoumMeModal-TSpan",children:r("noumena.home.noum_me_modal.description")}),e(E,{height:f?24:16,"data-test":"NoumMeModal-Spacer"}),e(qe,{"data-test":"NoumMeModal-StyledChamberCompletenessWrapper",children:e(pe,{connectedMembers:h,connectedMembersCount:N,loading:i,loadingSpace:b,space:(d==null?void 0:d.getSpaceById)||void 0,mainSpaceId:S,existingConnection:M,refetchConnectedMembers:t,refetchConnections:u,spaceConfig:(_==null?void 0:_.getSpaceConfig)||[],onRefetchSpaceByConfig:w,onRefetchSpaceById:C,"data-test":"NoumMeModal-ChamberProvider",children:e(Be,{"data-test":"NoumMeModal-ChamberCompleteness"})})})]}),e(ae,{isFullScreen:g,justifyContent:"center",marginTop:24,"data-test":"NoumMeModal-ModalFooter",children:e(O,{secondary:!0,"data-testid":"action_button",size:g?"full":"small",onClick:()=>a(H.HOME_NOUM),"data-test":"NoumMeModal-Button",children:r("noumena.home.go_to_your_home_noum")})})]})}),Ke=({recommendedNoumIds:n})=>{const[r,a]=y.useState(!0),[x,p]=y.useState(!1),[o,d]=y.useState(),{data:i,loading:b}=he({variables:{filter:{spaceIds:n}}}),S=y.useMemo(()=>{var t;return((t=i==null?void 0:i.getProjectChambers)==null?void 0:t.data)||[]},[i]),{width:h}=X(),{t:N}=z();let M=3;return h<$.MOBILE_L?M=1.25:h<$.TABLET?M=2.25:h<$.LAPTOP?M=3:h<$.LAPTOP_SM&&(M=2.25),b?e(Ae,{"data-test":"SwiperFreeMode-SpinnerContainer",children:e(me,{"data-test":"SwiperFreeMode-Spinner"})}):l(ie,{slidesPerView:M,spaceBetween:16,freeMode:!0,className:"mySwiper",onInit:t=>d(t),onReachBeginning:()=>a(!0),onReachEnd:()=>{((o==null?void 0:o.progress)||0)>.5&&p(!0)},"data-testid":"SwiperTestId","data-test":"SwiperFreeMode-Swiper",children:[e(Ee,{"data-testid":"SwiperControlsTestId","data-test":"SwiperFreeMode-StyledSwiperControls",children:e("div",{className:"swiper-icons",children:(S==null?void 0:S.length)>M&&l(W,{children:[e(A,{className:`swiper-control-btn ${r?"disabled":""}`,name:"chevron_left_m",size:16,color:r?"--icon-button-neutral-disabled":"--icon-button-neutral-default",onClick:()=>{o&&!o.destroyed&&(o.slidePrev(),p(!1))},"data-testid":"PrevBtnId","data-test":"SwiperFreeMode-Icon"}),e(A,{className:`swiper-control-btn ${x?"disabled":""}`,name:"chevron_right_m",size:16,color:x?"--icon-button-neutral-disabled":"--icon-button-neutral-default",onClick:()=>{o&&!o.destroyed&&(o.slideNext(),a(!1))},"data-testid":"NextBtnId","data-test":"SwiperFreeMode-Icon"})]})})}),S==null?void 0:S.map(t=>{var w,C,_,k,I,f,g,P,m,L;const u=t==null?void 0:t._id;return e(oe,{"data-test":`SwiperFreeMode-SwiperSlide-${u}`,children:e(Ne,{isBordered:!0,"data-testid":u,"data-test":"SwiperFreeMode-ChamberItem",children:e(Ie,{id:t==null?void 0:t._id,url:(t==null?void 0:t.profileImage)??void 0,ownerImageURL:((C=(w=t==null?void 0:t.uid)==null?void 0:w.profile)==null?void 0:C.profilePicture)||ue,title:((_=t==null?void 0:t.uid)==null?void 0:_.title)||"",chamberTitle:(t==null?void 0:t.name)||"",name:((I=(k=t==null?void 0:t.category)==null?void 0:k.name)==null?void 0:I.toLowerCase())||$e.member,ownedby:(t==null?void 0:t._id)===((f=t==null?void 0:t.uid)==null?void 0:f._id)?N("noumena.you"):ge((g=t==null?void 0:t.uid)==null?void 0:g.firstName,(P=t==null?void 0:t.uid)==null?void 0:P.middleName,(m=t==null?void 0:t.uid)==null?void 0:m.lastName)??void 0,archived:(t==null?void 0:t.status)===xe.Archived,followers:(t==null?void 0:t.followersCount)||0,location:((L=t==null?void 0:t.uid)==null?void 0:L.location)??void 0,chamberUrl:`/noum/${u}`,"data-test":"SwiperFreeMode-ChamberBox"})},t==null?void 0:t._id)},u)})]})};function Ge({recommendedNoumIds:n}){const{t:r}=z();return l(Oe,{"data-testid":"noums-for-you-section-testid","data-test":"StyledNoumsForYouSection",children:[e(v,{font:"body-xl-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"TSpan",children:r("noumena.home.recommended.noums.header")}),e(E,{height:16,"data-test":"Spacer"}),e(Pe,{"data-test":"StyledCardsSection",children:e(Ke,{recommendedNoumIds:n,"data-test":"SwiperFreeMode"})})]})}const Qe=s.div`
  display: none;

  @media (min-width: ${c.LAPTOP}) {
    display: grid;
    gap: 16px;
    width: 288px;
  }
`,de=s.div.attrs(n=>n)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  .image {
    width: 56px;
    height: 56px;
    background: url('${n=>n.profileImageUrl}') center center;
    background-size: cover;
    border-radius: 12px;
  }
`,Je=s(v)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`,Ze=s(v)`
  ${j}
  word-break: break-word;
  span {
    background: none;
    padding: unset;
    cursor: default;
    height: unset;
    min-height: unset;
    max-height: unset;
    width: 100%;
    max-width: 100%;
    ${j}
    word-break: break-word;
    white-space: break-spaces;
  }
`,re=s.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  background: linear-gradient(
    135.79deg,
    var(--bg-blur-brand-primary-dark) 0%,
    var(--bg-card-brand-primary-highlighted) 48.49%,
    var(--bg-blur-brand-primary-default) 100%
  );
  border-radius: 16px;
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  @media (max-width: ${c.TABLET}) {
    border-radius: unset;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
    padding: 32px;
    align-items: center;
  }
`;function et(n){var k,I,f,g;const[r,a]=y.useState(!1),{t:x}=z(),p=R(),{user:o,isActive:d}=q(),{data:i}=n,b=(i==null?void 0:i.length)&&((k=i[0])==null?void 0:k.Title),S=(i==null?void 0:i.length)&&((I=i[0])==null?void 0:I.Description),h=(i==null?void 0:i.length)&&((f=i[0])==null?void 0:f.Button_Label),N=(o==null?void 0:o.firstName)||"",M=(o==null?void 0:o.middleName)||"",t=(o==null?void 0:o.lastName)||"",u=(o==null?void 0:o.title)||"",w=((g=o==null?void 0:o.profile)==null?void 0:g.profilePicture)||"",C=B(()=>{a(!0)}),_=B(()=>{a(!1)});return l(W,{children:[l(Qe,{"data-test":"StyledSideBar",children:[l(de,{profileImageUrl:w,"data-test":"StyledUserInfoCard",children:[!!w&&e("div",{className:"image"}),!w&&e(A,{imageIconName:"avatar_m",size:56,"data-testid":"avatarIcon","data-test":"Icon"}),e(E,{height:16,"data-test":"Spacer"}),e(Je,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted",title:`${N} ${M} ${t}`,"data-test":"UserName",children:`${N} ${M} ${t}`}),e(Ze,{colorToken:"--text-card-neutral-default","data-test":"Designation",children:e(be,{title:u,"data-test":"Tag",children:e(v,{font:"body-l",colorToken:"--text-card-neutral-default","data-test":"TSpan",children:u})})}),e(E,{height:16,"data-test":"Spacer"}),e(O,{textOnly:!0,rightIcon:e(A,{name:"arrow_right_m",size:20,color:"--icon-button-brand-secondary-default","data-test":"Icon"}),onClick:()=>p(H.HOME_NOUM),"data-test":"Button",children:x("noumena.home.go_to_your_home_noum")})]}),l(re,{"data-test":"StyledCompleteInfoCard",children:[e(v,{font:"body-xl-bold",colorToken:"--text-card-neutral-alt-default","data-test":"TSpan",children:b}),e(E,{height:16,"data-test":"Spacer"}),e(v,{font:"body-l",colorToken:"--text-card-brand-secondary-default","data-test":"TSpan",children:S}),e(E,{height:48,"data-test":"Spacer"}),e(O,{primary:!0,size:"small",className:`${d?"":"disabled"}`,disabled:!d,onClick:C,"data-test":"Button",children:h})]})]}),e(ne,{open:r,onClose:_,"data-test":"NoumMeModal"})]})}const tt=s.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 16px;
  width: 100%;
  min-width: 322px;
  min-height: 182px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  flex: none;
  flex-grow: 0;

  @media (max-width: ${c.TABLET_L}) {
    margin: 0 16px;
    width: calc(100% - 32px);
  }

  @media (max-width: ${c.MOBILE_MAX}) {
    width: 100%;
    margin: 0 0;
    border-radius: unset;
    min-width: 704px;
    min-height: 160px;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px 19.5px;
  }

  @media (max-width: ${c.MOBILE_MAX}) {
    width: 100vw;
    min-width: unset;
    margin: unset;
    min-height: 182px;
  }
`,at=s.div.attrs(n=>n)`
  min-height: 240px;
  box-sizing: border-box;
  cursor: pointer;
  background: linear-gradient(
      180deg,
      rgba(93, 58, 169, 0) 0%,
      rgba(93, 58, 169, 0.66) 100%
    ),
    url(${n=>n.thumbnailUrl});
  background-size: cover;
  border-radius: 8px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`,it=s.div`
  /* padding: 10px 0px; */
`,ot=s.span`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  color: var(--text-card-brand-secondary-disabled);
  opacity: 0.8;
`,nt=s(v)`
  display: inline-block;
  padding: 4px 0 16px 0;
  @media (max-width: ${c.TABLET_L}) {
    /* padding: 8px 0px; */
  }
`,G=s.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid var(--bg-separator-neutral-default);
  :nth-child(2) {
    border-top: unset;
  }
  .step-number {
    width: 32px;
    height: 32px;
    background: var(--bg-counter-brand-primary-default);
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 160%;
    color: var(--text-badge-neutral-alt-default);
  }
  .step-content {
    margin-left: 12px;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 160%;
    color: var(--text-card-neutral-highlighted);
  }
`,dt=s.span`
  /* cursor: pointer; */
  color: var(--text-card-brand-primary-default);
`,rt=y.memo(n=>{const{t:r}=z(),{width:a}=X(),[x]=fe(),{open:p,onClose:o,calendlyData:d}=n,i=a<$.TABLET,b=a<$.LAPTOP,S=B(()=>{const h=d==null?void 0:d.url;window.open(h,"_blank")});return y.useCallback(async()=>{var u;const t=`https://noudev-cq-portal.noumenati.com/?access_token=${(u=(await x({variables:{},onError:({networkError:w=null,graphQLErrors:C=[]})=>{const[_]=C;_e(new Error((_==null?void 0:_.message)??w),{tags:{section:"Home Page - Tell Us Your Story Modal"}})},onCompleted:()=>{}})).data)==null?void 0:u.generateOneTimeToken}`;window.open(t,"_blank")},[x]),l(Z,{open:p,onClose:o,enableCloseButton:!0,enableAnimation:!0,size:we.L,testId:"testTellUsYourStoryModal",isFullScreen:b,disableBackdropClick:!0,"data-test":"TellUsYourStoryModal-Modal",children:[e(ee,{isFullScreen:b,justifyContent:i?"flex-start":"center","data-test":"TellUsYourStoryModal-ModalHeader",children:r("noumena.home.tell_us_your_story_modal.title")}),l(te,{isFullScreen:b,mobileFlex:!0,"data-test":"TellUsYourStoryModal-ModalBody",children:[e(v,{font:"body-m",colorToken:"--text-body-neutral-default","data-test":"TellUsYourStoryModal-TSpan",children:r("noumena.home.tell_us_your_story_modal.description")}),l(G,{"data-test":"TellUsYourStoryModal-StyledStep",children:[e("div",{className:"step-number",children:"1"}),e("div",{className:"step-content",children:r("noumena.home.tell_us_your_story_modal.step_1")})]}),l(G,{"data-test":"TellUsYourStoryModal-StyledStep",children:[e("div",{className:"step-number",children:"2"}),e("div",{className:"step-content",children:r("noumena.home.tell_us_your_story_modal.step_2")})]}),l(G,{"data-test":"TellUsYourStoryModal-StyledStep",children:[e("div",{className:"step-number",children:"3"}),e("div",{className:"step-content",children:e(Te,{i18nKey:"noumena.home.tell_us_your_story_modal.step_3",components:{highlight:e(dt,{onClick:()=>{},"data-test":"TellUsYourStoryModal-Highlight"}),u:e("u",{"data-test":"TellUsYourStoryModal-u"})},"data-test":"TellUsYourStoryModal-Trans"})})]})]}),e(ae,{isFullScreen:b,justifyContent:"center",marginTop:b?100:24,"data-test":"TellUsYourStoryModal-ModalFooter",children:e(O,{"data-testid":"action_button",size:"full",primary:!0,onClick:S,"data-test":"TellUsYourStoryModal-Button",children:r("noumena.home.tell_us_your_story_modal.action_button")})})]})});function lt(n){var f,g;const{addToast:r}=ye(),{isActive:a}=q(),[x,p]=y.useState(!1),[o,d]=y.useState(!1),{sectionData:i,calendlyData:b}=n,S=i==null?void 0:i.Title,h=i==null?void 0:i.Asset_Title,N=i==null?void 0:i.Description,M=(f=i==null?void 0:i.Thumbnail)==null?void 0:f.filename,t=i==null?void 0:i.Button_Label,u=((g=i==null?void 0:i.Asset)==null?void 0:g.filename)||"",w=(i==null?void 0:i.Video_Duration)||"00:00",C=B(()=>{a?p(!0):r("error","none",`${ve("noumena.money.setup_wallet.not.authorized")}`)}),_=B(()=>{p(!1)}),k=B(()=>{d(!0)}),I=B(()=>{d(!1)});return l(tt,{"data-testid":"home-story-section-testid","data-test":"StyledHomeStorySection",children:[l(at,{thumbnailUrl:M,onClick:k,"data-test":"StyledVideoSection",children:[e(O,{size:"small",primary:!0,icon:e(A,{name:"play_xs",size:16,color:"--icon-button-neutral-alt-default","data-test":"Icon"}),"data-test":"Button"}),e(E,{height:16,"data-test":"Spacer"}),e(v,{font:"body-l-bold",colorToken:"--text-card-neutral-alt-default","data-test":"TSpan",children:h}),e(ot,{"data-test":"StyledTime",children:w})]}),l(it,{"data-test":"StyledContentSection",children:[e(v,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"TSpan",children:S}),e(nt,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"StyledDescription",children:N}),e(O,{size:"small",secondary:!0,onClick:C,"data-test":"Button",children:t})]}),e(rt,{open:x,onClose:_,calendlyData:b,"data-test":"TellUsYourStoryModal"}),e(ze,{open:o,onClose:I,videoURL:u,"data-test":"VideoPlayerModal"})]})}const st=s.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
  isolation: isolate;
  width: 100%;
  min-width: 322px;
  background: var(--bg-card-brand-primary-highlighted);
  border-radius: 16px;
  flex: none;
  flex-grow: 0;
  background: linear-gradient(
    135.79deg,
    var(--bg-blur-brand-primary-dark) 0%,
    var(--bg-card-brand-primary-highlighted) 48.49%,
    var(--bg-blur-brand-primary-default) 100%
  );

  @media (max-width: ${c.TABLET_L}) {
    min-width: 704px;
    border-radius: unset;
  }

  @media (max-width: ${c.MOBILE_MAX}) {
    width: 100vw;
    min-width: unset;
    margin: unset;
    border-radius: unset;
    align-items: flex-start;
  }
`,ct=s.div`
  text-align: center;
  span {
    display: inline-block;
  }
  @media (max-width: ${c.TABLET_L}) {
    span {
      font-weight: 600;
      font-size: 24px;
      line-height: 150%;
    }
  }
  @media (max-width: ${c.MOBILE_MAX}) {
    text-align: left;
    margin: 0 0;
    span {
      font-weight: 600;
      font-size: 20px;
      line-height: 150%;
    }
  }
`,pt=s(v)`
  text-align: center;
  @media (max-width: ${T.LAPTOP_L_MAX}) and (min-width: ${T.LAPTOP_L_MIN}) {
    width: 60%;
  }
  @media (max-width: ${c.TABLET_L}) {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
  }
  @media (max-width: ${c.MOBILE_MAX}) {
    text-align: left;
  }
`;function ht(n){const{data:r}=n,a=r==null?void 0:r.Title,x=r==null?void 0:r.Description,{width:p}=X();return l(st,{"data-testid":"noum-onboarding-section-testid","data-test":"StyledOnboardingEventsSection",children:[e(ct,{"data-test":"StyledHeader",children:e(v,{font:p<768?"heading-xs-bold":"heading-s-bold",colorToken:"--text-card-header-neutral-alt-default","data-test":"TSpan",children:a})}),e(E,{height:8,"data-test":"Spacer"}),e(pt,{font:"body-l",colorToken:"--text-card-brand-secondary-default","data-test":"StyledDescription",children:x})]})}const mt=s.div`
  * {
    box-sizing: border-box;
  }
  font-family: var(--font-family);
  display: grid;
  gap: 16px;
  box-sizing: border-box;
  ${n=>!n.isAppUiV2&&`
  @media (max-width: ${T.MOBILE_S_MAX}) and (min-width: ${T.MOBILE_S_MIN}) {
    width: 100%;
    gap: 16px;
    padding-bottom: 80px;
    padding-top: 16px;
  }
  @media (max-width: ${T.MOBILE_M_MAX}) and (min-width: ${T.MOBILE_M_MIN}) {
    gap: 16px;
    padding-bottom: 80px;
    padding-top: 16px;
  }
  @media (max-width: ${T.MOBILE_L_MAX}) and (min-width: ${T.MOBILE_L_MIN}) {
    width: calc(100vw);
    gap: 16px;
    padding-bottom: 80px;
    padding-top: 16px;
  }
  @media (max-width: ${T.TABLET_MAX}) and (min-width: ${T.TABLET_MIN}) {
    width: calc(100vw);
    padding-bottom: 110px;
    padding-top: 16px;
  }
  @media (max-width: ${c.LAPTOP_L}) and (min-width: ${c.LAPTOP}) {
    width: calc(100vw - 512px);
    max-width: 925px;
  }
  @media (max-width: ${T.LAPTOP_MAX}) and (min-width: ${c.LAPTOP_SM}) {
    width: calc(100vw - 512px);
    max-width: 925px;
  }
  @media (max-width: ${T.LAPTOP_L_MAX}) and (min-width: ${T.LAPTOP_L_MIN}) {
    width: calc(100vw - 512px);
    max-width: 925px;
  }
  @media (min-width: ${c.DESKTOP}) {
    width: calc(100vw - 512px);
    max-width: 925px;
  }
  `}
`,ut=s(re)`
  display: none;
  border-radius: unset;
  align-items: center;

  span {
    display: inline-block;
  }

  @media (max-width: ${c.TABLET_L}) {
    display: flex;
    flex-direction: row;
  }
  @media (max-width: ${c.TABLET_L}) {
    padding: 32px;
    justify-content: space-between;
    > div:first-of-type {
      width: 60%;
    }
  }
  @media (max-width: ${c.MOBILE_MAX}) {
    flex-direction: column;
    padding: 16px;
    gap: 48px;
    > div:first-of-type {
      width: 100%;
      span:first-of-type {
        width: 80%;
      }
    }
  }
`,gt=s.div`
  @media (max-width: ${c.MOBILE_MAX}) {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
`,xt=s(de)`
  display: none;
  border-radius: unset;
  .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 16px;
    .name-and-title {
      width: 60%;
      .name {
        padding-top: unset;
        ${j}
      }
      .job-title {
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        ${j}
        color: var(--text-card-header-neutral-default);
      }
    }
  }
  @media (max-width: ${c.MOBILE_MAX}) {
    .right {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .name-and-title {
        width: 100%;
      }
      .job-title {
        display: none !important;
      }
    }
  }
  @media (max-width: ${c.TABLET_L}) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`,bt=()=>{var g,P,m,L,U,F,V,D,Y,Q;const[n,r]=y.useState(!1),[a,x]=y.useState(),p=y.useRef(!0),{isActive:o,user:d}=q(),{t:i}=z(),b=R(),{flags:S}=Se(),h=(d==null?void 0:d.firstName)||"",N=(d==null?void 0:d.middleName)||"",M=(d==null?void 0:d.lastName)||"",t=(d==null?void 0:d.title)||"",u=((g=d==null?void 0:d.profile)==null?void 0:g.profilePicture)||"",w=((P=a==null?void 0:a.Section_03)==null?void 0:P.length)&&((m=a==null?void 0:a.Section_03[0])==null?void 0:m.Title),C=((L=a==null?void 0:a.Section_03)==null?void 0:L.length)&&((U=a==null?void 0:a.Section_03[0])==null?void 0:U.Description),_=((F=a==null?void 0:a.Section_03)==null?void 0:F.length)&&((V=a==null?void 0:a.Section_03[0])==null?void 0:V.Button_Label),k=(a==null?void 0:a.Noum_recommendations)||[],I=B(()=>{r(!0)}),f=B(()=>{r(!1)});return y.useEffect(()=>{async function le(){var J;const{data:K}=await ke();p.current&&x((J=K==null?void 0:K.story)==null?void 0:J.content)}return le(),()=>{p.current=!1}},[]),e(Le,{type:"Home",rightContent:e(et,{data:a==null?void 0:a.Section_03,"data-test":"Home-SideBar"}),"data-test":"Home-ListLayout",children:l(mt,{isAppUiV2:S.newAppNavigation,"data-test":"Home-Container",children:[l(xt,{profileImageUrl:u,"data-test":"Home-UserInfoCard",children:[!!u&&e("div",{className:"image"}),!u&&e(A,{imageIconName:"avatar_m",size:56,"data-testid":"avatarIcon","data-test":"Home-Icon"}),l("div",{className:"right",children:[l("div",{className:"name-and-title",children:[e(v,{font:"body-xl-bold",className:"name",colorToken:"--text-card-header-neutral-highlighted","data-test":"Home-TSpan",children:`${h} ${N} ${M}`}),e("div",{className:"job-title",children:t})]}),e(O,{className:"link",textOnly:!0,rightIcon:e(A,{name:"arrow_right_m",size:20,color:"--icon-button-brand-secondary-default","data-test":"Home-Icon"}),onClick:()=>b(H.HOME_NOUM),"data-test":"Home-Button",children:i("noumena.home.go_to_your_home_noum")})]})]}),e(ht,{data:(D=a==null?void 0:a.Section_01)==null?void 0:D[0],"data-test":"Home-OnboardingEventsSection"}),e(lt,{sectionData:(Y=a==null?void 0:a.Section_02)==null?void 0:Y[0],calendlyData:a==null?void 0:a.Schedule_a_call,"data-test":"Home-StorySection"}),l(ut,{"data-test":"Home-NoumMeCard",children:[l("div",{children:[e(v,{font:"body-xl-bold",colorToken:"--text-card-neutral-alt-default","data-test":"Home-TSpan",children:w}),e(E,{height:16,"data-test":"Home-Spacer"}),e(v,{font:"body-l",colorToken:"--text-card-brand-secondary-default","data-test":"Home-TSpan",children:C})]}),e(gt,{"data-test":"Home-ButtonContainer",children:e(O,{primary:!0,size:"small",className:`${o?"":"disabled"}`,disabled:!o,onClick:I,"data-test":"Home-Button",children:_})})]}),e(We,{data:(Q=a==null?void 0:a.Section_02)==null?void 0:Q[1],"data-test":"Home-HowItWorksSection"}),!!k.length&&e(Ge,{recommendedNoumIds:k,"data-test":"Home-NoumsForYouSection"}),e(ne,{open:n,onClose:f,"data-test":"Home-NoumMeModal"})]})})},Rt=bt;export{Rt as default};
//# sourceMappingURL=Home-d0de605c.js.map
