import{D as o,j as e,c as i,I as c,T as r,B as d,R as p}from"./index-cd84bcc9.js";import{C as t,a9 as l}from"./vendor-51460554.js";import{Q as s}from"./QuickSignUpScreenLayout-e2476265.js";import"./styles-a68f1539.js";const u=t.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 24px;
  margin: 0 auto;
  width: 450px;
  left: calc(50% - 450px / 2);
  top: calc(50% - 367px / 2 + 0.5px);
  background: #ffffff;
  border: 1px solid #f7f7f8;
  border-radius: 16px;
`,g=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 100%;
  height: 239px;
`,x=t.div`
  border-radius: 200px;
  background-color: var(--bg-body-neutral-alt-default);
  border: 1px solid var(--bg-body-neutral-alt-default);
  align-self: center;
  width: 96px;
  height: 96px;
  flex-grow: 0;
  align-items: center;
`,b=()=>{const{quickSignUpNoumId:a}=o(),n=l();return e(s,{showBackButton:!1,"data-test":"QuickSignUp-QuickSignUpScreenLayout",children:i(u,{"data-test":"QuickSignUp-Wrapper",children:[i(g,{"data-test":"QuickSignUp-WrapperChildren",children:[e(x,{"data-test":"QuickSignUp-WrapperIcon",children:e(c,{name:"success_cq_xxxl",color:"--icon-card-brand-primary-default",size:96,"data-test":"QuickSignUp-Icon"})}),e(r,{font:"heading-m-bold",colorToken:"--text-modal-header-neutral-default",textAlign:"center","data-test":"QuickSignUp-TSpan",children:"Thanks for signing up"}),e(r,{font:"body-l",colorToken:"--text-body-neutral-default",textAlign:"center","data-test":"QuickSignUp-TSpan",children:"Nice work! Let's get started"})]}),e(d,{primary:!0,size:"full",onClick:()=>{a?n(`/noum/${a}`,{replace:!0}):n(p.GUEST_HOME,{replace:!0})},"data-test":"QuickSignUp-Button",children:"Start Using Noumena"})]})})};export{b as default};
//# sourceMappingURL=index-b2986125.js.map
