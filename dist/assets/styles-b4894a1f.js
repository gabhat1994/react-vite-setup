import{C as a}from"./vendor-51460554.js";import{m as d,eP as t}from"./index-cd84bcc9.js";const n=a.div`
  padding-bottom: 16px;
  pointer-events: ${({disabled:i})=>i?"none":"initial"};
`;a.div`
  width: 100%;
  margin-top: 16px;

  @media (min-width: 1161px) {
    width: 322px;
    margin: 0 0 0 24px;
  }
`;const o=a.div`
  @media (min-width: ${d.TABLET_MAX}) {
    width: 100%;
    margin-top: 16px;
    display: block;
  }
  @media (min-width: 1024px) {
    margin: 0 28px 0 0;
  }

  @media (max-width: ${d.TABLET_L}) {
    a {
      ${({noumEditor2:i})=>i&&"width: unset;"};
      #Nav-label {
        ${t.headingTypography.headingXSmallBold}
      }
    }
  }
`,p=a.div`
  width: 100%;
  ${({isBackgroundContent:i})=>!i&&"border: 1px solid var(--border-card-neutral-default); border-radius:16px;"};
`;export{n as B,p as E,o as L};
//# sourceMappingURL=styles-b4894a1f.js.map
