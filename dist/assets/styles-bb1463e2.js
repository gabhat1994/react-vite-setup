import{C as i}from"./vendor-51460554.js";import{b2 as a,m as t,s as n,B as o,I as r,T as d}from"./index-cd84bcc9.js";i(o)`
  ${e=>e.isPrimary?"background: none":null};
  ${e=>e.isDisabled?"display: none; cursor: no-drop":null};
`;i(r)`
  ${e=>e.isDisabled?"color: --border-pagination-neutral-default":null};
`;const s=i.div`
  font-family: var(--font-family);
  background-color: var(--bg-card-brand-primary-highlighted);
  background: linear-gradient(
    180deg,
    rgba(49, 13, 117, 1) 17%,
    rgba(102, 63, 186, 1) 100%,
    rgba(255, 255, 255, 1) 42%,
    rgba(255, 255, 255, 1) 100%
  );
  border-radius: 0px;
  box-sizing: border-box;
  width: 100%;
  @media ${a.LAPTOP} {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
`,x=i("div")`
  padding-top: 32px;
  padding-bottom: 32px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
  }
`,g=i.div`
  transition: all 0.12s liner;
  background: linear-gradient(
    180deg,
    rgba(102, 63, 186, 1) 42%,
    rgba(255, 255, 255, 1) 42%,
    rgba(255, 255, 255, 1) 100%
  );
  border-radius: 0px;
  padding-left: ${e=>e.hidePadding?"0px":"16px"};
  padding-bottom: 16px;
  width: 100%;
  box-sizing: border-box;
  @media ${a.LAPTOP} {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`,f=i(d)`
  align-self: center;
  @media (max-width: ${t.MOBILE_XL_MAX}) {
    font-size: var(--font-header-xsmall-size);
  } ;
`,h=i(d)`
  align-self: center;
  text-align: center;
  padding: 0px 16px 16px 16px;
  width: 100%;
  @media (max-width: 767px) {
    padding-top: 8px;
  }
`,c=i(d)`
  text-align: center;
  line-height: var(--font-input-medium-lineheight);
  align-self: center;
`;i.div`
  display: flex;
  justify-content: flex-end;
`;const m=i.div`
  width: 100%;
`,b=i.div`
  width: 100%;
  text-align: center;
  .mySwiper {
    display: flex;
    flex-direction: column-reverse;
  }
`,w=i.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  width: ${e=>e.isAppUiV2?"auto":"335px"};
  height: 248px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e7e6e9;
  gap: 8px;
`,u=i.div`
  display: flex;
`,v=i.div`
  display: flex;
  height: 250px;
  width: 250px;
  justify-content: center;
  align-items: center;
  z-index: 99;
`,y=i.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: var(--font-body-xlarge-bold-weight);
`;i.div`
  display: flex;
  flex-grow: 1;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 160%;
  text-align: left;
`;const A=i.div`
  display: flex;
  flex-grow: 1;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 160%;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,T=i.div`
  padding-top: 8px;
  display: flex;
`;i.div`
  display: flex;
  border-radius: 8px;
  background: #ffffff;
  padding: 24px;
`;i.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;i.div`
  display: flex;
  flex-grow: 1;
`;i.div`
  display: flex;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
`;i.div`
  width: 100%;
  overflow: hidden;
`;i.div`
  display: flex;
  gap: 16px;
`;i.div`
  width: 100%;
  height: 134px;
  overflow: hidden;
  border-radius: 12px;
  background-size: cover;
`;const $=i.div`
  font-family: var(--font-family);
  width: 100%;
  box-sizing: border-box;
  padding: 16px;

  ${e=>e.$isAppUiV2?`
    width: 100%;
    padding: 0;
    `:`
  @media (max-width: ${t.TABLET_MAX}) and (min-width: ${t.TABLET_MIN}) {
    width: 736px;
  }
  @media (max-width: ${t.LAPTOP_MAX}) and (min-width: ${t.LAPTOP_MIN}) {
    width: 736px;
  }
  @media (max-width: ${t.LAPTOP_L_MAX}) and (min-width: ${t.LAPTOP_L_MIN}) {
    width: 894px;
  }
  @media (min-width: ${n.DESKTOP}) {
    width: calc(100vw - 200px);
    max-width: 894px;
  }
  @media (max-width: ${t.TABLET_MIN}) {
    padding: unset;
  }
  `}
`,L=i.div`
  margin: 0 auto;
  width: 668px;
  font-family: var(--font-family);
  padding-bottom: 85px;

  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 140%;
    color: var(--text-card-header-neutral-highlighted);
    margin: 16px 0;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    color: var(--text-card-header-neutral-highlighted);
    img {
      width: 100%;
      height: 413px;
    }
  }

  @media (max-width: ${t.TABLET_MIN}) {
    box-sizing: border-box;
    padding-bottom: 60px;
    ${e=>e.$isAppUiV2?`
    width: 100%;
    padding: 0;
    `:`
    width: 100vw;
    padding: 0 16px;
    `}
  }
`,P=i.img`
  height: 360px;
  background: var(--bg-body-neutral-alt-default);
  border-radius: 16px;
  width: 100%;
  object-fit: cover;
`,z=i.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  @media (max-width: 767px) {
    padding-bottom: 0px;
  }
  .swiper-icons {
    position: absolute;
    right: 20px;
    .stepper {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
    }
    display: flex;
    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    @media (max-width: ${n.MOBILE_MAX}) {
      display: none;
    }
  }
`;i.div`
  ${({isBeginning:e})=>e?"margin-right: -25px;":"margin-left: 0;"};
  ${({isSwiping:e})=>e?"margin-left: -25px;":""};
`;export{w as A,A as B,$ as C,s as F,y as H,v as L,z as S,x as T,u as a,T as b,f as c,h as d,c as e,g as f,m as g,b as h,P as i,L as j};
//# sourceMappingURL=styles-bb1463e2.js.map
