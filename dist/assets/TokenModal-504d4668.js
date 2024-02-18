import{r as g,ar as _,C as n,l as T}from"./vendor-51460554.js";import{i4 as F,i5 as G,s as H,h as R,aa as X,i6 as $,u as K,ab as V,j as t,M as J,t as U,F as O,i as b,B as Y,c as r,T as d}from"./index-cd84bcc9.js";import{m as Z}from"./main-wallet-6d7dbd11.js";import{f as ee}from"./getTimeStampForDisplaying-22d5ca9d.js";const me=(p,h)=>{const[s,l]=g.useState({fetching:!0,status:"",visibility:"",score:"",noumId:""}),{t:u}=_(),[y]=F(),[x]=G(),m=g.useCallback(async()=>{var i,a,M,k,S,B,v,w,I,E,N,C,Q,j,q,L,A,D,P,z;const o={...s};if(o.fetching=!1,h&&p){const e=await x({variables:{noumId:p}});o.noumId=(M=(a=(i=e==null?void 0:e.data)==null?void 0:i.capitalquotient)==null?void 0:a.getNoumenaScoreByNoumId)==null?void 0:M.noumId,o.visibility=((B=(S=(k=e==null?void 0:e.data)==null?void 0:k.capitalquotient)==null?void 0:S.getNoumenaScoreByNoumId)==null?void 0:B.capitalQuotient)===null?"Private":"Public",o.score=((I=(w=(v=e==null?void 0:e.data)==null?void 0:v.capitalquotient)==null?void 0:w.getNoumenaScoreByNoumId)==null?void 0:I.capitalQuotient)||""}else{const e=await y({});o.status=c((C=(N=(E=e.data)==null?void 0:E.capitalquotient)==null?void 0:N.getNoumenaScore)==null?void 0:C.status),o.noumId=((Q=e==null?void 0:e.data)==null?void 0:Q.getSpaceByType)&&(e==null?void 0:e.data.getSpaceByType.length)&&((j=e==null?void 0:e.data.getSpaceByType[0])==null?void 0:j._id)||"",o.visibility=f((A=(L=(q=e.data)==null?void 0:q.capitalquotient)==null?void 0:L.getNoumenaScore)==null?void 0:A.visibility),o.score=((z=(P=(D=e==null?void 0:e.data)==null?void 0:D.capitalquotient)==null?void 0:P.getNoumenaScore)==null?void 0:z.capitalQuotient)||""}l(o)},[y]),c=o=>o?u(o==="IN_COMPLETE"?"noumena.money.cq.incomplete":"noumena.money.cq.complete"):"",f=o=>o?u(o==="PRIVATE"?"noumena.money.cq.private":"noumena.money.cq.public"):"";return g.useEffect(()=>{m()},[m]),{cqData:s}};n.div`
  display: flex;
  flex-direction: column;
  width: 454px;
  position: relative;
  @media (max-width: ${H.MOBILE_MAX}) {
    width: 100%;
  }
`;const te=n.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`,W=n.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
`;n.div`
  position: absolute;
  left: calc(50% + 200px);
  @media (max-width: ${H.MOBILE_MAX}) {
    left: calc(50% + 130px);
  }
`;n(R)`
  padding-bottom: unset;
`;n.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-height: 500px;
  width: 100%;
  overflow: auto;
`;const oe=n.div`
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  padding: 20px 16px 20px;
  flex-direction: column;
  flex-grow: 1;
`,ae=n.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  margin-left: 16px;
`,ne=n.div``,le=n.div`
  margin-left: auto;
  margin-right: 16px;
`,ie=n.img`
  height: 40px;
  width: 40px;
  margin-right: 16px;
  border-radius: 10px;
`,de=n.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`,ce=n.div`
  display: flex;
  flex-direction: column;
`,ye=p=>{var f,o;const h=X(),{t:s}=_(),{data:l,loading:u}=$(),{height:y}=K(),x=h===V.MOBILE,m=g.useMemo(()=>l!=null&&l.getSpaceByType&&(l!=null&&l.getSpaceByType[0])?l==null?void 0:l.getSpaceByType[0]:{token:{count:0},tokenTransaction:{data:[]}},[l]),c=T.groupBy((f=m.tokenTransaction)==null?void 0:f.data,i=>ee(new Date(i==null?void 0:i.createdAt)));return t(J,{size:U.L,disableBackdropClick:!0,disableEscapeKeyDown:!0,enableCloseButton:!0,onClose:()=>p.onClose(),open:p.open,"data-test":"TokenModal-Modal",children:u?t(O,{children:t(b,{align:"center","data-test":"TokenModal-ModalBody",children:t(Y,{loading:!0,neutral:!0,"data-test":"TokenModal-Button"})})}):r(O,{children:[r(te,{children:[t(d,{font:"body-xl",colorToken:"--text-card-neutral-default","data-test":"TokenModal-TSpan",children:s("noumena.money.tokenHeader")}),t(d,{font:"heading-xxl",textAlign:"center",colorToken:"--text-card-header-neutral-highlighted","data-test":"TokenModal-TSpan",children:(o=m.token)==null?void 0:o.count})]}),!T.isEmpty(c)&&t(b,{style:{display:"block"},align:"center",minHeight:x?y-106:"auto","data-test":"TokenModal-ModalBody",children:Object.keys(c).map(i=>r("div",{children:[t(W,{children:t(ae,{children:t(d,{font:"body-m-bold",colorToken:"--text-card-header-neutral-default","data-test":"TokenModal-TSpan",children:i})})}),c[i].length>0&&c[i].map(a=>t(oe,{children:r(W,{children:[t(ne,{children:r(de,{children:[t(ie,{src:Z,alt:"profile"}),r(ce,{children:[t(d,{font:"body-l-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"TokenModal-TSpan",children:s("noumena.default.brand_name")}),t(d,{font:"body-m",colorToken:"--text-tablecell-body-neutral-default","data-test":"TokenModal-TSpan",children:a==null?void 0:a.message})]})]})}),t(le,{children:((a==null?void 0:a.count)||0)>=0?r(d,{font:"body-xl-bold",colorToken:"--text-tablecell-success-primary-default","data-test":"TokenModal-TSpan",children:["+ ",a==null?void 0:a.count]}):t(d,{font:"body-xl-bold",colorToken:"--text-tablecell-danger-primary-default","data-test":"TokenModal-TSpan",children:a==null?void 0:a.count})})]})},a==null?void 0:a.createdAt))]},i))}),T.isEmpty(c)&&t(b,{align:"center","data-test":"TokenModal-ModalBody",children:t(d,{font:"body-l",textAlign:"center",colorToken:"--text-modal-neutral-default","data-test":"TokenModal-TSpan",children:s("noumena.money.noTransactions")})})]})})};export{W as C,ae as D,ye as T,me as u};
//# sourceMappingURL=TokenModal-504d4668.js.map
