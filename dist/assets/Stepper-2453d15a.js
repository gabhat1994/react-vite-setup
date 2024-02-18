import{j as e,c as S,dH as c}from"./index-cd84bcc9.js";import{C as n,r as p}from"./vendor-51460554.js";const s=t=>t?"var(--bg-stepper-brand-primary-default)":"var(--bg-stepper-brand-secondary-default)",b=t=>t?"var(--bg-stepper-brand-secondary-default)":"transparent",x=t=>t?"height: 20px; width: 20px;":"height: 10px; width: 10px;",g=n.div`
  border-radius: 100%;
  transition: background-color 0.2s linear 0s;
  z-index: 1000;
`,h=n.div`
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s linear 0s;
  background-color: ${t=>b(t.isPassed)};
  ${t=>x(t.isPassed)}

  ${g} {
    height: 8px;
    width: 8px;
    background-color: ${t=>s(t.isPassed)};
  }
`,P=n.div`
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`,C=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,l=n.div`
  width: calc(100% - 20px);
  padding: 0 10px;
  position: absolute;
  top: ${t=>t.top?t.top:0}px;
  left: 0;
  display: flex;
  align-items: center;
  border-radius: 10px;
`,f=n.div`
  position: relative;
  width: 100%;
  z-index: 1;
`,m=t=>{const{pointNum:r,onClick:a}=t;return e(P,{"data-test":"StepPoint-Container",children:e(h,{...t,"data-testid":"steppoint-container",onClick:()=>a(r),"data-test":"StepPoint-PointBackground",children:e(g,{"data-testid":"steppoint-point","data-test":"StepPoint-Point"})})})},v=t=>{const[r,a]=p.useState(0),d=p.useMemo(()=>100*(r-1)/(t.completed-1),[r,t.completed]),u=i=>a(i);return p.useEffect(()=>a(t.currentStep),[t.currentStep]),S(f,{"data-testid":"stepper-root-container","data-test":"Stepper-RootContainer",children:[e(C,{"data-testid":"stepper-container","data-test":"Stepper-StepperContainer",children:[...Array(t.completed).keys()].map((i,o)=>e(m,{pointNum:o+1,isPassed:r>o,isFirst:o===0,isLast:o===r-1,onClick:u,"data-test":"Stepper-StepPoint"},`${i}`))}),e(l,{"data-testid":"stepper-pb-bg-container",top:6,"data-test":"Stepper-ProgressBarContainer",children:e(c,{percentage:d,color:s(!1),barSize:8,"data-test":"Stepper-ProgressBar"})}),e(l,{"data-testid":"stepper-pb-container",top:9,"data-test":"Stepper-ProgressBarContainer",children:e(c,{percentage:d,color:s(!0),barSize:2,backgroudColor:s(!1),"data-test":"Stepper-ProgressBar"})})]})};export{v as S};
//# sourceMappingURL=Stepper-2453d15a.js.map
