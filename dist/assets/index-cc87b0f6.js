import{v as de,qc as ue,qd as le,ji as ce,qe as ge,K as me,qf as be,m as pe,x as $,u as he,e as fe,j as n,I as ee,c as z,T as P,S as M,am as _e,F as Se,y as Oe,f as Ie,ci as re,aK as ne,R as Z,B as ve,cV as ye}from"./index-cd84bcc9.js";import{r,B as C,an as B,am as we,C as L,ar as ae,l as Ce,a9 as Qe,ad as te,ap as Ue,aq as Ae}from"./vendor-51460554.js";import{A as Ne}from"./styles-dc2530dc.js";import{c as oe}from"./countries-4aa86a38.js";import{F as ie}from"./Flag-d41fef47.js";import{E as x}from"./trackingEvents-87d8ea4c.js";import{a as Ee,u as Te}from"./lib-45016883.js";import{O as Fe}from"./OnboardingScreenLayout-687de002.js";import"./index-a3ee8d79.js";import"./storyblok-c16fb040.js";import"./styles-a68f1539.js";const ke=()=>{var _;const{addToast:t}=de(),{data:v,loading:o,error:l}=ue(),[g,{loading:h}]=le(),[A]=ce(),N=r.useCallback(i=>{t("error","none",`${C("noumena.toast_error.text")}: ${i}`)},[t]),[R,{loading:Q}]=ge({onCompleted(i){if(i){const{getUserSubmittedOnboardingQuestionsAndAnswers:d}=i;me(be.ONBOARDING_COMPLETE_STATUS,d)}}}),f=r.useCallback(async(i,d)=>{var T;const{data:E}=await g({variables:{input:i},onCompleted:()=>{},onError:({networkError:F=null,graphQLErrors:k=[]})=>{const[y]=k;N((y==null?void 0:y.message)??F)}});return d&&await A({variables:{input:[d]}}),await R(),(T=E==null?void 0:E.submitOnboardingQuestionnaire)==null?void 0:T.userStatus},[N,g,R,A]);return{questions:((_=v==null?void 0:v.getOnboardingQuestionAndAnswers)==null?void 0:_.data)||[],loading:o||Q,error:l,handleSubmitOnboardingAnswer:f,submitting:h}},se={age_range:"636340a1d1b4cfc58759939c",year_of_self_employed:"632be1607003c70096be762d",business_stage:"6359035b844d4764725c2912",business_country:"632be1607003c70096be762e",business_industry:"632be1607003c70096be762f",revenue:"632be1607003c70096be7630",business_entity:"632be1607003c70096be7631"},xe={age_range:void 0,year_of_self_employed:void 0,business_stage:void 0,business_country:"us",business_industry:void 0,revenue:void 0,business_entity:void 0},Le=()=>{const t={year_of_self_employed:B().required(C("noumena.register.onboarding_questions.error.message.answer_required")),business_country:B().required(C("noumena.register.onboarding_questions.error.message.answer_required")),business_industry:B().required(C("noumena.register.onboarding_questions.error.message.answer_required")),revenue:B().required(C("noumena.register.onboarding_questions.error.message.answer_required")),business_entity:B().required(C("noumena.register.onboarding_questions.error.message.answer_required")),age_range:B().required(C("noumena.register.onboarding_questions.error.message.answer_required")),business_stage:B().required(C("noumena.register.onboarding_questions.error.message.answer_required"))};return we().shape(t).required()},Re=L.div`
  width: 100%;
  min-height: 80vh;
  @media (max-width: ${pe.LAPTOP_L_MAX}) {
    padding-bottom: 125px;
  }
`,De=L.form`
  width: 100%;
`;L($)`
  width: 100%;
`;L.div`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: var(--text-button-brand-primary-default);
  gap: 12px;
  height: 24px;
`;L.div`
  display: flex;
  padding: 4px;
  gap: 12px;
  width: 85%;
`;L.div`
  border-radius: 100%;
  background-color: gray;
  width: 8px;
  height: 8px;
  z-index: 1000;
  margin-top: 7px;
`;const Be=L($)`
  font-family: var(--font-family);
  max-width: 400px;
  display: block;
`,Me=L.div`
  width: 100%;
`,Ge=({questionKey:t,description:v,answerOptions:o,setAnswer:l,error:g,isLoading:h,helperText:A,onFocus:N})=>{var D;const R=r.useRef(null),{width:Q}=he(),f=r.useMemo(()=>Q<=fe.MOBILE_MAX,[Q]),{t:_}=ae(),i=["age_range","year_of_self_employed","business_stage","revenue","business_entity"].includes(t),d=t==="business_industry",E=t==="business_country",[T,F]=r.useState(!1),[k,y]=r.useState(void 0),[m,W]=r.useState(t==="business_country"?{name:"United States",dialCode:"1",iso2:"us"}:void 0),[S,G]=r.useState(""),[K,e]=r.useState([]),[a,b]=r.useState(15);r.useEffect(()=>{var u;const s=((u=S==null?void 0:S.toLocaleLowerCase())==null?void 0:u.trim())||"";if(!i){if(d&&Ee&&!s){e([]);return}const O=o.filter(I=>{var w,Y;return t==="business_country"&&I&&I.type==="value"&&I.value&&typeof I.value=="object"?(w=String(I.value.name))==null?void 0:w.toLowerCase().includes(s):d?(Y=String(I.value))==null?void 0:Y.toLowerCase().includes(s):!0});e(O)}},[o,i,d,t,S]);const U=r.useCallback(s=>{let u;typeof s=="string"?(u=o.find(O=>O.value===s),y(u!=null&&u.label&&typeof u.label=="string"?u.label:""),l(s)):t==="business_country"&&typeof s=="object"&&(W(s),l(s.iso2)),G("")},[o,t,l]),p=r.useCallback(()=>b(a+15),[a]),c=r.useRef(Ce.debounce(async s=>{G(s.trim())},200)).current;r.useEffect(()=>()=>c.cancel(),[c]);const j=r.useCallback(s=>{t==="business_country"&&F(!0),c(s),(k||m)&&(y(void 0),W(void 0),l(void 0)),(s===""&&E||s===""&&d)&&y("")},[t,c,k,m,E,d,l]),V=r.useCallback(({toggle:s})=>{if(t==="business_country"&&m)return n(ie,{flag:`flag_${m==null?void 0:m.iso2}`,size:24,onClick:s,"data-test":"QuestionContainer-renderLeftIcon-Flag"});if(d)return n(ee,{name:"search_m",size:24,color:"var(--icon-card-placeholder-neutral-default)","data-test":"QuestionContainer-renderLeftIcon-Icon"})},[d,t,m]),q=r.useCallback(()=>{F(!1),f&&G("")},[f]),H=_(d?"noumena.register.onboarding_questions.select_industry":"noumena.register.onboarding_questions.answer.placeholder"),X=i?void 0:S||"",J=i||S.length===0?o:K;return z(Me,{ref:R,"data-test":"QuestionContainer-QuestionContainerWrapper",children:[n(P,{colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"QuestionContainer-TSpan",children:v}),n(M,{height:8,"data-test":"QuestionContainer-Spacer"}),n(_e,{inputValue:X,hideIcons:t!=="business_country",isOpen:T,options:J,onSelectOption:s=>{U(s.value)},onInputChange:s=>G(s),onFetchMore:p,onOpen:N,onClose:q,isLoading:h,closeOnSelect:!0,renderContainerFromBottom:i&&f,showInternalSearch:!i&&f,forceHideCloseButton:!1,containerHeight:!i&&f?"100vh":"auto",noAvailableOptionsText:_("noumena.dropdown.no_search_results.text"),noSearchOptionsText:_("noumena.dropdown.no_search_results.text"),containerWidth:`${(D=R.current)==null?void 0:D.scrollWidth}px`??"auto",containerStyle:d?{minHeight:192}:void 0,observerMinHeight:"0px",searchPlaceholder:d?_("noumena.register.onboarding_questions.select_industry_placeholder"):void 0,searchLeftIcon:d?n(Se,{}):void 0,hideLeftIconPlace:!0,forceListFromBottom:d&&!f,"data-test":`QuestionContainer-Dropdown-${t}`,children:({inputProps:s,inputRef:u,toggle:O})=>n(Oe,{onClick:()=>F(!0),readOnly:i,ref:u,...s,error:T?!1:g,onChange:I=>{j(I.target.value)},helperText:g&&A&&!T?A:void 0,placeholder:H,value:S.length>0?S:m&&t==="business_country"?m==null?void 0:m.name:k,rightIcon:i?n(ee,{color:"--icon-input-neutral-disabled",name:"chevron_down_m",size:16,onClick:()=>F(!0),"data-test":"QuestionContainer-Icon"}):S.trim().length>0&&n(ee,{name:"clear_m",size:16,onClick:()=>{j("")},color:"--icon-input-brand-primary-default","data-test":"QuestionContainer-Icon"}),leftIcon:V({toggle:O}),onFocus:N,"data-test":"QuestionContainer-TextField"})},t)]})},$e=({questionKey:t,answerOptions:v,error:o,loading:l,onChooseAnswer:g,onFocus:h})=>z($,{fullWidth:!0,vertical:!0,"data-test":`QuestionAnswers-Stack-${t}`,children:[n(M,{height:24,"data-test":"QuestionAnswers-Spacer"}),n(Ge,{questionKey:t,description:C(`noumena.register.onboarding_questions.${t}.description`),answerOptions:v,setAnswer:g,error:!!o,isLoading:l,helperText:o,onFocus:()=>h(),"data-test":"QuestionAnswers-QuestionContainer"})]},t),je=[x.ONBOARDING.QUESTIONNAIRE.QUESTION_1,x.ONBOARDING.QUESTIONNAIRE.QUESTION_2,x.ONBOARDING.QUESTIONNAIRE.QUESTION_3,x.ONBOARDING.QUESTIONNAIRE.QUESTION_4,x.ONBOARDING.QUESTIONNAIRE.QUESTION_5,x.ONBOARDING.QUESTIONNAIRE.QUESTION_6,x.ONBOARDING.QUESTIONNAIRE.QUESTION_7],Pe=()=>{const{updateUserStatus:t,refetchUserData:v,user:o}=Ie(),{t:l}=ae(),g=Qe(),{questions:h,handleSubmitOnboardingAnswer:A,loading:N,submitting:R}=ke(),{allSkills:Q}=Te(),[f,_]=r.useState(!1),[i,d]=r.useState({age_range:[],year_of_self_employed:[],business_stage:[],business_country:[],business_industry:[],revenue:[],business_entity:[]}),E=r.useMemo(()=>oe.map(e=>({key:te(),label:n($,{"data-test":"SignUpForm-dropdownCountries-Stack",children:n(P,{font:"input-s",colorToken:"--text-tablecell-header-neutral-highlighted","data-testid":"country-options","data-test":"SignUpForm-dropdownCountries-TSpan",children:n("div",{style:{padding:"0 4px"},children:e.name})})}),type:"value",value:e,icon:n(ie,{flag:`flag_${e.iso2}`,size:24,"data-test":"SignUpForm-dropdownCountries-Flag"})})),[]),T=r.useMemo(()=>Q.sort((e,a)=>{var b;return((b=e==null?void 0:e.name)==null?void 0:b.localeCompare((a==null?void 0:a.name)||""))??0}).map(e=>({key:te(),type:"value",value:(e==null?void 0:e.name)??"",label:(e==null?void 0:e.name)??""})),[Q]),F=r.useMemo(()=>({UUID:o==null?void 0:o._id}),[o]);r.useEffect(()=>{const e={};h.length>0&&(h==null||h.forEach(a=>{var U;const b=Object.keys(se).find(p=>se[p]===(a==null?void 0:a._id));if(b){const p=[];(U=a==null?void 0:a.options)==null||U.forEach(c=>{c!=null&&c.answer&&p.push({key:te(),type:"value",value:c.answer,label:c.answer,description:c.description||""})}),e[b]=p}}),d(e))},[h]);const{setValue:k,trigger:y,handleSubmit:m,formState:{errors:W,isValid:S}}=Ue({resolver:Ae(Le()),mode:"all",reValidateMode:"onChange",defaultValues:xe}),G=r.useCallback(async e=>{var c,j,V,q,H,X,J;_(!0);let a={UUID:o==null?void 0:o._id};const b=[];let U;Object.keys(e).forEach(D=>{var I;const s=se[D],u=e[D];a={...a,[s]:u};const O={questionId:s,answer:u};if(D==="business_country"){O.countryCode=u;const w=oe.find(Y=>Y.iso2===u);O.answer=(w==null?void 0:w.name)||O.answer}D==="business_industry"&&(U=(I=Q.find(w=>(w==null?void 0:w.name)===O.answer))==null?void 0:I._id),b.push(O)}),re(x.ONBOARDING.QUESTIONNAIRE.SUBMIT,a);const p=await A(b,U);p&&(t(p),v(),p===ne.Active?g(Z.ACTIVE):p===ne.Pending?(j=(c=e==null?void 0:e.year_of_self_employed)==null?void 0:c.toLowerCase())!=null&&j.includes("interested")||(q=(V=e==null?void 0:e.year_of_self_employed)==null?void 0:V.toLowerCase())!=null&&q.includes("hustle")||(H=e==null?void 0:e.revenue.toLowerCase())!=null&&H.includes("less than")||(X=e==null?void 0:e.business_entity.toLowerCase())!=null&&X.includes("no business entity")||(J=e==null?void 0:e.business_entity.toLowerCase())!=null&&J.includes("other")?g(Z.MORE_INFO):g(Z.SIGNUP_PENDING):p===ne.Rejected&&g(Z.INACTIVE)),_(!1)},[o==null?void 0:o._id,A,t,g,Q,v]),K=r.useCallback((e,a)=>{k(e,a??""),y(e)},[k,y]);return z(Re,{"data-testid":"onboardingQuestionsFormContainer","data-test":"SignUpForm-FormStyled",children:[n(M,{height:20,"data-test":"SignUpForm-Spacer"}),n(P,{font:"heading-m-bold",$fill:!0,colorToken:"--text-body-header-neutral-default","data-test":"SignUpForm-TSpan",children:l("noumena.register.onboarding_questions.sub_title")}),n(M,{height:11,"data-test":"SignUpForm-Spacer"}),n(P,{font:"body-l",$fill:!0,colorToken:"--text-body-neutral-default","data-test":"SignUpForm-TSpan",children:l("noumena.register.onboarding_questions.description")}),n(M,{height:8,"data-test":"SignUpForm-Spacer"}),z(De,{onSubmit:m(G),"data-test":"SignUpForm-Form",children:[Object.keys(i).map((e,a)=>{var b;return n($e,{questionKey:e,answerOptions:e==="business_country"?E:e==="business_industry"?T:i[e]||[],error:(b=W[e])==null?void 0:b.message,loading:N,onChooseAnswer:U=>K(e,U),onFocus:()=>re(je[a],F),"data-test":`SignUpForm-QuestionAnswers-${e}`},e)}),n(M,{height:32,"data-test":"SignUpForm-Spacer"}),n($,{fullWidth:!0,"data-test":"SignUpForm-Stack",children:n(ve,{"data-testid":"onboardingQuestionsSubmitButton",type:"submit",primary:!0,size:"full",loading:f,disabled:!S||N||R||f,"data-test":"SignUpForm-Button",children:l("noumena.submit")})}),n(M,{height:16,"data-test":"SignUpForm-Spacer"}),n($,{fullWidth:!0,"data-test":"SignUpForm-Stack",children:n(P,{font:"body-s",colorToken:"--text-body-neutral-disabled",textAlign:"center","data-test":"SignUpForm-TSpan",children:l("noumena.register.onboarding_questions.description.our_solutions_best")})})]})]})},nn=()=>n(Fe,{"data-test":"OnboardingQuestions-OnboardingScreenLayout",children:z(Ne,{"data-testid":"SIGN_UP",className:"App","data-test":"OnboardingQuestions-AppStyled",children:[n(ye,{style:{borderRadius:8,marginTop:28},"data-test":"OnboardingQuestions-Chips",children:C("noumena.register.onboarding_questions.step")}),n(Be,{"data-testid":"onboardingQuestionsContainer","data-test":"OnboardingQuestions-Screen",children:n(Pe,{"data-test":"OnboardingQuestions-SignUpForm"})})]})});export{nn as default};
//# sourceMappingURL=index-cc87b0f6.js.map