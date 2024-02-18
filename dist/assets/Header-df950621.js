import{m as o,x as d,B as C,c as i,j as e,I as B,T as r,S as T}from"./index-cd84bcc9.js";import{C as a,a6 as p,a9 as y}from"./vendor-51460554.js";import{S as L}from"./Stepper-2453d15a.js";const _=a.div`
  z-index: 1;
  background-color: var(--bg-card-neutral-alt-default);
  border-bottom: 1px solid var(--border-card-neutral-highlighted);
  position: sticky;
  top: 0px;
  margin-top: 2px;
  padding: 16px 40px 16px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${o.MOBILE_XL_MAX}) {
    padding: 16px 16px;
    position: static;
    ${({wrap:t})=>t&&p`
        flex-wrap: wrap;
      `}
  }
`,A=a.span`
  @media (max-width: ${o.MOBILE_XL_MAX}) {
    ${({updateMargin:t})=>t&&p`
        margin-top: 16px;
      `}
  }
`,$=a(d).attrs({fullWidth:!1,align:"center",gap:"16px"})`
  min-width: 200px;
  @media (max-width: ${o.MOBILE_XL_MAX}) {
    ${({unsetMinWidth:t})=>t&&p`
        min-width: auto;
      `};
			${({unsetMinWidth:t})=>!t&&p`
          min-width: 200px;
        `};
  }
  }
`,I=a(d).attrs({fullWidth:!1,align:"center",gap:"16px"})`
  width: auto;
`,M=a(C)`
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  box-sizing: border-box;
`,X=a(d).attrs({vertical:!0,justify:"center",gap:"16px",align:"center"})`
  width: 400px;
`,k=a.div`
  width: 343px;
  @media (max-width: ${o.TABLET_MAX}) {
    width: 200px;
  }
`,v=a(d).attrs({fullWidth:!1,align:"center",justify:"space-between"})`
  width: 400px;
  @media (max-width: ${o.TABLET_MAX}) {
    width: 270px;
  }
`,j=a(d).attrs({fullWidth:!1,align:"center",gap:"16px"})`
  width: auto;
`,n={HeaderContainer:_,Left:$,BackButton:M,Right:I,StepperContainer:X,StepName:v,Steps:k,Action:j,ActionContainer:A};function N({isMobile:t,isTablet:h,heading:m,currentStep:f,totalSteps:g,stepper:u=!0,label:s,onBack:l,unsetMinWidth:w=!1,wrap:c=!1,rightAction:x=e(T,{width:300,"data-test":"Spacer"})}){const S=y(),b=()=>{l?l():S(-1)};return i(n.HeaderContainer,{wrap:c,children:[i(n.Left,{unsetMinWidth:w,children:[e(n.BackButton,{onClick:b,neutral:!0,size:"small",leftIcon:e(B,{name:"arrow_left_m",size:22,"data-test":"Icon"})}),i(r,{font:t||h?"body-l-bold":"heading-xs-bold",colorToken:"--text-body-header-neutral-default",style:{display:"flex",gap:"10px",alignItems:"center"},"data-test":"TSpan",children:[m,s&&s]})]}),!t&&u?i(n.StepperContainer,{children:[e(n.Steps,{children:e(L,{currentStep:f,completed:g,"data-test":"Stepper"})}),i(n.StepName,{children:[e(r,{font:"footnote-bold","data-test":"TSpan",children:"New Campaign"}),e(r,{font:"footnote-bold","data-test":"TSpan",children:"Offering"}),e(r,{font:"footnote-bold","data-test":"TSpan",children:"Start Campaign"})]})]}):e(n.StepperContainer,{}),x&&e(n.ActionContainer,{updateMargin:c,children:x})]})}export{N as H,n as S};
//# sourceMappingURL=Header-df950621.js.map
