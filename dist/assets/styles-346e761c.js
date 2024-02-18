import{C as t}from"./vendor-51460554.js";import{s as a}from"./index-cd84bcc9.js";const s=t.div`
  ${({gap:i})=>`--gap:${i||20}px`};
  gap: var(--gap);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: max-content;
  position: relative;
  @media (max-width: ${a.MOBILE_MAX}) {
    justify-content: center;
  }
`,o=t.div`
  display: flex;
  --columns: ${({columns:i,fourColumnItem:m})=>`${i||m?4:3}`};

  @media (max-width: ${a.LAPTOP_M}) {
    --columns: 3;
  }

  @media (max-width: ${a.LAPTOP}) {
    --columns: 2;
  }

  width: calc(
    100% / var(--columns) - var(--gap) * (var(--columns) - 1) / var(--columns)
  );

  @media (max-width: 700px) {
    width: calc(50vw - var(--gap) / 2);
  }

  @media (max-width: ${a.MOBILE_L}) {
    width: calc(100vw - 32px);
    margin-right: 0 !important;
  }
`;export{s as C,o as a};
//# sourceMappingURL=styles-346e761c.js.map
