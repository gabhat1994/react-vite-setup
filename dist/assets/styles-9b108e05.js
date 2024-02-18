import{C as i}from"./vendor-51460554.js";import{s as t,i as e}from"./index-cd84bcc9.js";i.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;const n=i.div`
  width: 401px;
  @media (max-width: ${t.TABLET_L}) {
    width: 343px;
    margin: 0 auto;
  }
  @media (max-width: ${t.MOBILE_M}) {
    width: calc(100vw - 32px);
  }
`,r=i.div`
  display: flex;
  flex-direction: ${a=>a.vertical?"column":"row"};
  gap: 16px;
  align-items: flex-start;
`,l=i.div`
  width: 170px;
  border: transparent;
  > div {
    display: flex;
    justify-content: flex-start;
  }
  button {
    margin-top: 16px;
  }
`,p=i.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`,x=i.div`
  margin-top: 24px;
  @media (max-width: ${t.TABLET_L}) {
    display: none;
    margin-top: 0px;
  }
  @media (max-width: ${t.MOBILE_MAX}) {
    display: none;
    margin-top: 0px;
  }
`,m=i(e)`
  display: flex;
  flex-direction: row-reverse;
  padding-top: 6px;

  @media (min-width: ${t.LAPTOP}) {
    max-height: calc(100vh - 300px);
  }

  @media (max-width: ${t.TABLET_L}) {
    width: 343px;
    margin: 0 auto;
    flex-direction: column;
    overflow-y: auto;
    height: calc(100vh - 200px);
  }

  @media (max-width: ${t.MOBILE_MAX}) {
    width: 343px;
    margin: 0 auto;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  }
  @media (max-width: ${t.MOBILE_M}) {
    width: calc(100vw - 32px);
  }
`,s=i.div`
  height: 100%;
  flex: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  @media (min-width: ${t.LAPTOP}) {
    margin-left: 56px;
  }
  @media (max-width: ${t.TABLET_L}) {
    margin-bottom: 32px;
  }
`;i.div`
  font-family: var(--font-family);
  font-style: normal;
  font-weight: var(--font-link-small-lineheight);
  font-size: var(--font-link-large-size);
  line-height: var(--font-header-xsmall-line-height);
  color: var(--bg-button-brand-primary-default);
  flex: none;
  order: 1;
  flex-grow: 0;
`;i.div`
  display: flex;
  cursor: pointer;
  width: 80%;
`;i.div`
  width: 341px;
`;const h=i.div`
  input {
    height: 104px;
  }
`;i.div`
  display: flex;
  flex-direction: row;
  @media (min-width: ${t.LAPTOP}) {
    align-items: center;

    justify-content: space-between;
    padding: 16px 24px 24px 24px;
  }

  @media (max-width: ${t.TABLET_L}) {
    width: 343px;
    margin: 0 auto;
    flex-direction: column;
    padding-top: 16px;
  }
`;const f=i.div`
  @media (min-width: ${t.LAPTOP}) {
    width: 117px;
    margin: unset;
  }
  width: 360px;
  margin: 0 auto;
`;i.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;i.div`
  @media (max-width: ${t.TABLET}) {
    margin-bottom: 98px;
  }
`;export{h as A,r as C,x as H,n as L,m as P,f as S,p as T,l as U,s as a};
//# sourceMappingURL=styles-9b108e05.js.map
