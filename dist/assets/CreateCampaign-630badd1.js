import{qQ as M,_ as F,m as P,x as f,ae as Z,T,B,j as e,az as ee,aZ as ae,c as h,S as k,am as te,F as D,I as w,y as L,a2 as z,b3 as le,aC as ne,c4 as R,qR as I,Y as me,qK as ue,qS as he,qT as ge,p as pe,ax as ve,qU as Ne,R as K,X as ie,v as be}from"./index-cd84bcc9.js";import{r as l,C,ad as Ce,a9 as H,aa as ke,b2 as Se}from"./vendor-51460554.js";import{S as fe}from"./index-38931f83.js";import{S as xe,C as ye}from"./CampaignDetails-772896b1.js";import{N as oe}from"./NoumCard-2fa806c2.js";import{I as Te}from"./Infobox-cf6af02b.js";import{C as Ae}from"./CountryPicker-2d42d72f.js";import{R as $}from"./Radiobox-c1e62033.js";import{H as re}from"./Header-df950621.js";import{A as we}from"./Actions-ad30ea8c.js";import"./ChamberLeftSideBar-2a7f8e7f.js";import"./index-2d186805.js";import"./useResizeObserver-0deb9469.js";import"./sideNavItems-22800105.js";import"./styles-b4894a1f.js";import"./index-4963229a.js";import"./Modal-5a254f40.js";import"./Badge-f2e67408.js";import"./CountryCard-e0d91c6e.js";import"./Flag-d41fef47.js";import"./countries-4aa86a38.js";import"./Stepper-2453d15a.js";const Ie=3e3,Ee=1e3,Oe=100,E={MAX_OTHER_GOAL_CHARACTERS:Ie,MAX_AUDIENCE_CHARACTERS:Ee,MAX_TITLE_CHARACTERS:Oe},de={noumId:"",title:"",startDate:"",goals:[],audience:{category:[],targetLanguage:["English (US)"],targetLocation:[]},budgetAmount:0,budgetType:M.TotalBudget};function Ge(){const[a,n]=l.useState(de),i=l.useCallback(()=>{const s={...a};delete s.otherGoals,n(s)},[a]),o=l.useCallback(()=>{n(s=>({...s,otherGoals:""}))},[]),m=l.useMemo(()=>({isTitleRangeExceeded:a.title.length>E.MAX_TITLE_CHARACTERS,isFieldEmpty:Object.values(a).some(F.isEmpty),isOtherGoalRangeExceeded:a.otherGoals?a.otherGoals.length>E.MAX_OTHER_GOAL_CHARACTERS:!1,isAudienceRangeExceeded:F.getAudienceLength(a.audience.category||[])>E.MAX_AUDIENCE_CHARACTERS}),[a]),r=Object.values(m).some(s=>s);return{campaign:a,updateCampaign:n,deleteOtherGoalsKey:i,addOtherGoalsKey:o,error:m,restrictUserToSubmitCampaign:r}}const se=l.createContext({campaign:de,updateCampaign:()=>null,deleteOtherGoalsKey:()=>null,addOtherGoalsKey:()=>null,restrictUserToSubmitCampaign:!0,error:{isTitleRangeExceeded:!1,isFieldEmpty:!0,isOtherGoalRangeExceeded:!1,isAudienceRangeExceeded:!1}}),_=()=>l.useContext(se),Me=C(f).attrs({justify:"center",align:"center"})`
  width: 100%;
  padding: 24px;
`,De=C(f).attrs({vertical:!0,justify:"center",gap:"16px"})`
  width: 900px;
  max-width: 900px;
`,Le=C(Z)`
  width: 100%;
  overflow: visible;
`,_e=C(T).attrs({font:"body-m-bold",colorToken:"--text-card-neutral-highlighted"})``,Re=C.div`
  width: 100%;
`,Fe=C.div`
  width: 160px;
  @media (max-width: ${P.MOBILE_XL_MAX}) {
    width: 350px;
  }
`,ze=C(T).attrs({font:"heading-xs-bold",colorToken:"--text-card-neutral-highlighted"})``,Be=C(f).attrs({gap:"12px",align:"center"})`
  width: 415px;
  border-radius: 4px;
  padding: 12px;
  border: 1px solid var(--border-option-selector-neutral-default);
  @media (max-width: ${P.TABLET_MAX}) {
    width: 350px;
  }
`,Pe=C(f).attrs({fullWidth:!0,gap:"16px",align:"start",wrap:"wrap"})``,Ke=C(T).attrs({font:"body-m",colorToken:"--text-option-selector-neutral-default"})``,He=C.div`
  width: 100%;
`,Ue=C(f).attrs({gap:"8px",align:"center"})`
  width: 122px;
`,je=C.input`
  width: 84px;
  height: 38px;
  background-color: var(--bg-input-neutral-default);
  border: none;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 12px;
  ::placeholder {
    color: var(--text-input-neutral-default);
    -webkit-text-fill-color: var(--text-input-neutral-default);
    opacity: 1; /* Firefox */
  }
`,We=C(Z)`
  width: 900px;
  height: 406px;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 0 auto;
  margin-top: 5%;
  @media (max-width: ${P.TABLET_MAX}) {
    width: 100%;
    height: calc(100vh - 165px);
    border-radius: 0px;
    margin-top: 0%;
  }
`,qe=C(f)`
  width: 100%;
  height: 40px;
  background-color: var(--bg-input-neutral-default);
  border-radius: 8px;
  padding: 0px 12px;
`,Xe=C.span`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 16px;
  background-color: var(--bg-button-floating-neutral-alt-default);
  float: right;
  cursor: pointer;
`,Qe=C.div`
  background-color: var(--bg-card-neutral-alt-default);
  border-bottom: 1px solid var(--border-card-neutral-highlighted);
  position: sticky;
  top: 0px;
  margin-top: 2px;
  padding: 16px 40px 16px 40px;
`,Ve=C(B)`
  min-width: 40px;
  min-height: 40px;
  max-width: 40px;
  max-height: 40px;
  box-sizing: border-box;
`,Ye=C(T).attrs({font:"body-xl-bold",colorToken:"--text-body-header-neutral-default"})`
  margin-top: 8px;
`,c={FormContainer:Me,Forms:De,Container:Le,InputLabel:_e,DatePickerContainer:Fe,NoumAssignmentContainer:Re,FormTitle:ze,GoalOptionContainer:Pe,GoalOption:Be,Option:Ke,FullWidthDiv:He,CurrencyContainer:Ue,CurrencyInput:je,RequestSubmitted:We,NOUMContainer:qe,PreviewContainer:Xe,PreviewHeader:Qe,PreviewBackButton:Ve,CampaignTitle:Ye},$e=a=>(a==null?void 0:a.map(n=>({key:n._id||"",label:e(f,{"data-test":"mapDropDownList-Stack",children:e(oe,{name:n.name||"",image:(n==null?void 0:n.profileImage)||ee,status:n.projectType??void 0,"data-test":"mapDropDownList-NOUMCard"})}),type:"value",value:{...n}})))||[],Je=(a,n)=>a.filter(({value:i})=>{var o;return(o=i.name)==null?void 0:o.toLowerCase().includes(n.toLowerCase())}),Ze=l.memo(({noums:a,isMobile:n})=>{const{updateCampaign:i,campaign:o}=_(),[m,r]=l.useState(""),[s,p]=l.useState(null),v=ae(m,500),u=l.useMemo(()=>$e(a),[a]),t=s||(o.noumId?a.find(N=>(N==null?void 0:N._id)===o.noumId):null),x=l.useMemo(()=>v?Je(u,v):u,[v,u]);return h(c.NoumAssignmentContainer,{children:[e(c.InputLabel,{children:"Noum Assignment"}),e(k,{height:10,"data-test":"NoumAssignmentForm-Spacer"}),e(te,{containerHeight:n?"100%":void 0,options:x,showInternalSearch:n,inputValue:m,onInputChange:N=>r(N),onSelectOption:({value:N})=>{p(N),i(A=>({...A,noumId:N._id??""}))},"data-test":"NoumAssignmentForm-Dropdown",children:({inputProps:N,inputRef:A})=>h(D,{children:[!!t&&h(c.NOUMContainer,{align:"center",justify:"space-between",children:[e(oe,{name:t.name||"",image:t.profileImage||ee,status:t.projectType??void 0,"data-test":"NoumAssignmentForm-NOUMCard"}),e("button",{type:"button",style:{cursor:"pointer",border:"none",backgroundColor:"transparent"},onClick:()=>{p(null),i(d=>({...d,noumId:""})),r("")},children:e(w,{name:"close_s",size:26,color:"--icon-input-neutral-default","data-test":"NoumAssignmentForm-Icon"})})]}),!t&&e(L,{...N,name:"noum",fullWidth:!0,placeholder:"Find a Noum...",inputSize:"small",leftIcon:e(w,{name:"search_m",size:24,color:"--icon-input-neutral-default","data-test":"NoumAssignmentForm-Icon"}),ref:A,spellCheck:"false",onChange:d=>r(d.target.value),"data-test":"NoumAssignmentForm-TextField"})]})})]})});function ea({noums:a,isMobile:n}){const{campaign:i,updateCampaign:o,error:{isTitleRangeExceeded:m}}=_();return h(c.Container,{children:[h(f,{fullWidth:!0,align:"start",justify:"center",gap:16,"data-test":"Stack",children:[e(c.CampaignTitle,{children:"Title:"}),e(L,{name:"title",fullWidth:!0,placeholder:"Campaign Title",inputSize:"small",value:i.title,error:m,maxLength:m?void 0:E.MAX_TITLE_CHARACTERS,helperText:m?` Title should not exceed ${E.MAX_TITLE_CHARACTERS} characters`:"",onChange:({target:r})=>{o(s=>({...s,title:r.value}))},"data-test":"TextField"})]}),e(k,{height:10,"data-test":"Spacer"}),e(z,{fullWidth:!0,size:"thin","data-test":"Separator"}),e(k,{height:10,"data-test":"Spacer"}),h(f,{vertical:n,fullWidth:!0,gap:16,align:"center",justify:n?"flex-start":void 0,"data-test":"Stack",children:[e(Ze,{noums:a,isMobile:!!n,"data-test":"NoumAssignmentForm"}),h(c.DatePickerContainer,{children:[e(c.InputLabel,{children:"Start Date"}),e(k,{height:10,"data-test":"Spacer"}),e(le,{size:"small",placeholder:"MM/DD/YYYY",placement:n?"auto":"left-end",value:i.startDate,onChange:r=>{r&&o(s=>({...s,startDate:r}))},"data-test":"DatePicker"})]})]})]})}function aa(){const{campaign:a,updateCampaign:n,deleteOtherGoalsKey:i,addOtherGoalsKey:o,error:{isOtherGoalRangeExceeded:m}}=_(),[r,s]=l.useState(new Set([])),p=l.useMemo(()=>r.size?r:new Set(ne(F.castType(a.goals))),[a.goals,r]),v=(u,t)=>{const x=new Set(p);t?x.add(u):x.delete(u),s(x),n(N=>({...N,goals:Array.from(x)}))};return h(c.Container,{children:[e(c.FormTitle,{children:"Goals"}),e(k,{height:14,"data-test":"Spacer"}),e(z,{fullWidth:!0,size:"thin","data-test":"Separator"}),e(k,{height:14,"data-test":"Spacer"}),h(c.GoalOptionContainer,{children:[h(c.GoalOption,{children:[e(R,{"data-testid":"check-box-one",isChecked:!!p.has(I.IncreaseNoumVisibility),onChange:u=>{v(I.IncreaseNoumVisibility,u)},icon:e(w,{name:"tick_m",size:23.5,color:"--icon-checkbox-neutral-alt-default","data-test":"Icon"}),"data-test":"Checkbox"}),e(c.Option,{children:"Increase my Noum visibility"})]}),h(c.GoalOption,{children:[e(R,{"data-testid":"check-box-one",isChecked:!!p.has(I.GainConnectedUsersAndFollowers),onChange:u=>{v(I.GainConnectedUsersAndFollowers,u)},icon:e(w,{name:"tick_m",size:23.5,color:"--icon-checkbox-neutral-alt-default","data-test":"Icon"}),"data-test":"Checkbox"}),e(c.Option,{children:"Gain connected users and followers"})]}),h(c.GoalOption,{children:[e(R,{"data-testid":"check-box-one",isChecked:!!p.has(I.GetQuickQuestionsAnswers),onChange:u=>{v(I.GetQuickQuestionsAnswers,u)},icon:e(w,{name:"tick_m",size:23.5,color:"--icon-checkbox-neutral-alt-default","data-test":"Icon"}),"data-test":"Checkbox"}),e(c.Option,{children:"Get answers to Quick Questions"})]}),h(c.GoalOption,{children:[e(R,{"data-testid":"check-box-one",isChecked:!!p.has(I.Other),onChange:u=>{u?o():i(),v(I.Other,u)},icon:e(w,{name:"tick_m",size:23.5,color:"--icon-checkbox-neutral-alt-default","data-test":"Icon"}),"data-test":"Checkbox"}),e(c.Option,{children:"Other"})]})]}),e(k,{height:14,"data-test":"Spacer"}),p.has(I.Other)&&e(L,{inputSize:"small",label:"Tell us more about your goals",maxLength:m?void 0:E.MAX_OTHER_GOAL_CHARACTERS,error:m,helperText:m?`Goals should not exceed ${E.MAX_OTHER_GOAL_CHARACTERS} characters`:"",value:a.otherGoals??"",onChange:u=>{n(t=>({...t,otherGoals:u.target.value}))},"data-test":"TextField"})]})}const J=[{code:"ab",name:"Abkhaz",nativeName:"аҧсуа"},{code:"aa",name:"Afar",nativeName:"Afaraf"},{code:"af",name:"Afrikaans",nativeName:"Afrikaans"},{code:"ak",name:"Akan",nativeName:"Akan"},{code:"sq",name:"Albanian",nativeName:"Shqip"},{code:"am",name:"Amharic",nativeName:"አማርኛ"},{code:"ar",name:"Arabic",nativeName:"العربية"},{code:"an",name:"Aragonese",nativeName:"Aragonés"},{code:"hy",name:"Armenian",nativeName:"Հայերեն"},{code:"as",name:"Assamese",nativeName:"অসমীয়া"},{code:"av",name:"Avaric",nativeName:"авар мацӀ, магӀарул мацӀ"},{code:"ae",name:"Avestan",nativeName:"avesta"},{code:"ay",name:"Aymara",nativeName:"aymar aru"},{code:"az",name:"Azerbaijani",nativeName:"azərbaycan dili"},{code:"bm",name:"Bambara",nativeName:"bamanankan"},{code:"ba",name:"Bashkir",nativeName:"башҡорт теле"},{code:"eu",name:"Basque",nativeName:"euskara, euskera"},{code:"be",name:"Belarusian",nativeName:"Беларуская"},{code:"bn",name:"Bengali",nativeName:"বাংলা"},{code:"bh",name:"Bihari",nativeName:"भोजपुरी"},{code:"bi",name:"Bislama",nativeName:"Bislama"},{code:"bs",name:"Bosnian",nativeName:"bosanski jezik"},{code:"br",name:"Breton",nativeName:"brezhoneg"},{code:"bg",name:"Bulgarian",nativeName:"български език"},{code:"my",name:"Burmese",nativeName:"ဗမာစာ"},{code:"ca",name:"Catalan; Valencian",nativeName:"Català"},{code:"ch",name:"Chamorro",nativeName:"Chamoru"},{code:"ce",name:"Chechen",nativeName:"нохчийн мотт"},{code:"ny",name:"Chichewa; Chewa; Nyanja",nativeName:"chiCheŵa, chinyanja"},{code:"zh",name:"Chinese",nativeName:"中文 (Zhōngwén), 汉语, 漢語"},{code:"cv",name:"Chuvash",nativeName:"чӑваш чӗлхи"},{code:"kw",name:"Cornish",nativeName:"Kernewek"},{code:"co",name:"Corsican",nativeName:"corsu, lingua corsa"},{code:"cr",name:"Cree",nativeName:"ᓀᐦᐃᔭᐍᐏᐣ"},{code:"hr",name:"Croatian",nativeName:"hrvatski"},{code:"cs",name:"Czech",nativeName:"česky, čeština"},{code:"da",name:"Danish",nativeName:"dansk"},{code:"dv",name:"Divehi; Dhivehi; Maldivian;",nativeName:"ދިވެހި"},{code:"nl",name:"Dutch",nativeName:"Nederlands, Vlaams"},{code:"en-gb",name:"English (UK)",nativeName:"English (UK)"},{code:"en-us",name:"English (US)",nativeName:"English (US)"},{code:"eo",name:"Esperanto",nativeName:"Esperanto"},{code:"et",name:"Estonian",nativeName:"eesti, eesti keel"},{code:"ee",name:"Ewe",nativeName:"Eʋegbe"},{code:"fo",name:"Faroese",nativeName:"føroyskt"},{code:"fj",name:"Fijian",nativeName:"vosa Vakaviti"},{code:"fi",name:"Finnish",nativeName:"suomi, suomen kieli"},{code:"fr",name:"French",nativeName:"français, langue française"},{code:"ff",name:"Fula; Fulah; Pulaar; Pular",nativeName:"Fulfulde, Pulaar, Pular"},{code:"gl",name:"Galician",nativeName:"Galego"},{code:"ka",name:"Georgian",nativeName:"ქართული"},{code:"de",name:"German",nativeName:"Deutsch"},{code:"el",name:"Greek, Modern",nativeName:"Ελληνικά"},{code:"gn",name:"Guaraní",nativeName:"Avañeẽ"},{code:"gu",name:"Gujarati",nativeName:"ગુજરાતી"},{code:"ht",name:"Haitian; Haitian Creole",nativeName:"Kreyòl ayisyen"},{code:"ha",name:"Hausa",nativeName:"Hausa, هَوُسَ"},{code:"he",name:"Hebrew (modern)",nativeName:"עברית"},{code:"hz",name:"Herero",nativeName:"Otjiherero"},{code:"hi",name:"Hindi",nativeName:"हिन्दी, हिंदी"},{code:"ho",name:"Hiri Motu",nativeName:"Hiri Motu"},{code:"hu",name:"Hungarian",nativeName:"Magyar"},{code:"ia",name:"Interlingua",nativeName:"Interlingua"},{code:"id",name:"Indonesian",nativeName:"Bahasa Indonesia"},{code:"ie",name:"Interlingue",nativeName:"Originally called Occidental; then Interlingue after WWII"},{code:"ga",name:"Irish",nativeName:"Gaeilge"},{code:"ig",name:"Igbo",nativeName:"Asụsụ Igbo"},{code:"ik",name:"Inupiaq",nativeName:"Iñupiaq, Iñupiatun"},{code:"io",name:"Ido",nativeName:"Ido"},{code:"is",name:"Icelandic",nativeName:"Íslenska"},{code:"it",name:"Italian",nativeName:"Italiano"},{code:"iu",name:"Inuktitut",nativeName:"ᐃᓄᒃᑎᑐᑦ"},{code:"ja",name:"Japanese",nativeName:"日本語 (にほんご／にっぽんご)"},{code:"jv",name:"Javanese",nativeName:"basa Jawa"},{code:"kl",name:"Kalaallisut, Greenlandic",nativeName:"kalaallisut, kalaallit oqaasii"},{code:"kn",name:"Kannada",nativeName:"ಕನ್ನಡ"},{code:"kr",name:"Kanuri",nativeName:"Kanuri"},{code:"ks",name:"Kashmiri",nativeName:"कश्मीरी, كشميري‎"},{code:"kk",name:"Kazakh",nativeName:"Қазақ тілі"},{code:"km",name:"Khmer",nativeName:"ភាសាខ្មែរ"},{code:"ki",name:"Kikuyu, Gikuyu",nativeName:"Gĩkũyũ"},{code:"rw",name:"Kinyarwanda",nativeName:"Ikinyarwanda"},{code:"ky",name:"Kirghiz, Kyrgyz",nativeName:"кыргыз тили"},{code:"kv",name:"Komi",nativeName:"коми кыв"},{code:"kg",name:"Kongo",nativeName:"KiKongo"},{code:"ko",name:"Korean",nativeName:"한국어 (韓國語), 조선말 (朝鮮語)"},{code:"ku",name:"Kurdish",nativeName:"Kurdî, كوردی‎"},{code:"kj",name:"Kwanyama, Kuanyama",nativeName:"Kuanyama"},{code:"la",name:"Latin",nativeName:"latine, lingua latina"},{code:"lb",name:"Luxembourgish, Letzeburgesch",nativeName:"Lëtzebuergesch"},{code:"lg",name:"Luganda",nativeName:"Luganda"},{code:"li",name:"Limburgish, Limburgan, Limburger",nativeName:"Limburgs"},{code:"ln",name:"Lingala",nativeName:"Lingála"},{code:"lo",name:"Lao",nativeName:"ພາສາລາວ"},{code:"lt",name:"Lithuanian",nativeName:"lietuvių kalba"},{code:"lu",name:"Luba-Katanga",nativeName:""},{code:"lv",name:"Latvian",nativeName:"latviešu valoda"},{code:"gv",name:"Manx",nativeName:"Gaelg, Gailck"},{code:"mk",name:"Macedonian",nativeName:"македонски јазик"},{code:"mg",name:"Malagasy",nativeName:"Malagasy fiteny"},{code:"ms",name:"Malay",nativeName:"bahasa Melayu, بهاس ملايو‎"},{code:"ml",name:"Malayalam",nativeName:"മലയാളം"},{code:"mt",name:"Maltese",nativeName:"Malti"},{code:"mi",name:"Māori",nativeName:"te reo Māori"},{code:"mr",name:"Marathi (Marāṭhī)",nativeName:"मराठी"},{code:"mh",name:"Marshallese",nativeName:"Kajin M̧ajeļ"},{code:"mn",name:"Mongolian",nativeName:"монгол"},{code:"na",name:"Nauru",nativeName:"Ekakairũ Naoero"},{code:"nv",name:"Navajo, Navaho",nativeName:"Diné bizaad, Dinékʼehǰí"},{code:"nb",name:"Norwegian Bokmål",nativeName:"Norsk bokmål"},{code:"nd",name:"North Ndebele",nativeName:"isiNdebele"},{code:"ne",name:"Nepali",nativeName:"नेपाली"},{code:"ng",name:"Ndonga",nativeName:"Owambo"},{code:"nn",name:"Norwegian Nynorsk",nativeName:"Norsk nynorsk"},{code:"no",name:"Norwegian",nativeName:"Norsk"},{code:"ii",name:"Nuosu",nativeName:"ꆈꌠ꒿ Nuosuhxop"},{code:"nr",name:"South Ndebele",nativeName:"isiNdebele"},{code:"oc",name:"Occitan",nativeName:"Occitan"},{code:"oj",name:"Ojibwe, Ojibwa",nativeName:"ᐊᓂᔑᓈᐯᒧᐎᓐ"},{code:"cu",name:"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",nativeName:"ѩзыкъ словѣньскъ"},{code:"om",name:"Oromo",nativeName:"Afaan Oromoo"},{code:"or",name:"Oriya",nativeName:"ଓଡ଼ିଆ"},{code:"os",name:"Ossetian, Ossetic",nativeName:"ирон æвзаг"},{code:"pa",name:"Panjabi, Punjabi",nativeName:"ਪੰਜਾਬੀ, پنجابی‎"},{code:"pi",name:"Pāli",nativeName:"पाऴि"},{code:"fa",name:"Persian",nativeName:"فارسی"},{code:"pl",name:"Polish",nativeName:"polski"},{code:"ps",name:"Pashto, Pushto",nativeName:"پښتو"},{code:"pt",name:"Portuguese",nativeName:"Português"},{code:"qu",name:"Quechua",nativeName:"Runa Simi, Kichwa"},{code:"rm",name:"Romansh",nativeName:"rumantsch grischun"},{code:"rn",name:"Kirundi",nativeName:"kiRundi"},{code:"ro",name:"Romanian, Moldavian, Moldovan",nativeName:"română"},{code:"ru",name:"Russian",nativeName:"русский язык"},{code:"sa",name:"Sanskrit (Saṁskṛta)",nativeName:"संस्कृतम्"},{code:"sc",name:"Sardinian",nativeName:"sardu"},{code:"sd",name:"Sindhi",nativeName:"सिन्धी, سنڌي، سندھی‎"},{code:"se",name:"Northern Sami",nativeName:"Davvisámegiella"},{code:"sm",name:"Samoan",nativeName:"gagana faa Samoa"},{code:"sg",name:"Sango",nativeName:"yângâ tî sängö"},{code:"sr",name:"Serbian",nativeName:"српски језик"},{code:"gd",name:"Scottish Gaelic; Gaelic",nativeName:"Gàidhlig"},{code:"sn",name:"Shona",nativeName:"chiShona"},{code:"si",name:"Sinhala, Sinhalese",nativeName:"සිංහල"},{code:"sk",name:"Slovak",nativeName:"slovenčina"},{code:"sl",name:"Slovene",nativeName:"slovenščina"},{code:"so",name:"Somali",nativeName:"Soomaaliga, af Soomaali"},{code:"st",name:"Southern Sotho",nativeName:"Sesotho"},{code:"es",name:"Spanish; Castilian",nativeName:"español, castellano"},{code:"su",name:"Sundanese",nativeName:"Basa Sunda"},{code:"sw",name:"Swahili",nativeName:"Kiswahili"},{code:"ss",name:"Swati",nativeName:"SiSwati"},{code:"sv",name:"Swedish",nativeName:"svenska"},{code:"ta",name:"Tamil",nativeName:"தமிழ்"},{code:"te",name:"Telugu",nativeName:"తెలుగు"},{code:"tg",name:"Tajik",nativeName:"тоҷикӣ, toğikī, تاجیکی‎"},{code:"th",name:"Thai",nativeName:"ไทย"},{code:"ti",name:"Tigrinya",nativeName:"ትግርኛ"},{code:"bo",name:"Tibetan Standard, Tibetan, Central",nativeName:"བོད་ཡིག"},{code:"tk",name:"Turkmen",nativeName:"Türkmen, Түркмен"},{code:"tl",name:"Tagalog",nativeName:"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"},{code:"tn",name:"Tswana",nativeName:"Setswana"},{code:"to",name:"Tonga (Tonga Islands)",nativeName:"faka Tonga"},{code:"tr",name:"Turkish",nativeName:"Türkçe"},{code:"ts",name:"Tsonga",nativeName:"Xitsonga"},{code:"tt",name:"Tatar",nativeName:"татарча, tatarça, تاتارچا‎"},{code:"tw",name:"Twi",nativeName:"Twi"},{code:"ty",name:"Tahitian",nativeName:"Reo Tahiti"},{code:"ug",name:"Uighur, Uyghur",nativeName:"Uyƣurqə, ئۇيغۇرچە‎"},{code:"uk",name:"Ukrainian",nativeName:"українська"},{code:"ur",name:"Urdu",nativeName:"اردو"},{code:"uz",name:"Uzbek",nativeName:"zbek, Ўзбек, أۇزبېك‎"},{code:"ve",name:"Venda",nativeName:"Tshivenḓa"},{code:"vi",name:"Vietnamese",nativeName:"Tiếng Việt"},{code:"vo",name:"Volapük",nativeName:"Volapük"},{code:"wa",name:"Walloon",nativeName:"Walon"},{code:"cy",name:"Welsh",nativeName:"Cymraeg"},{code:"wo",name:"Wolof",nativeName:"Wollof"},{code:"fy",name:"Western Frisian",nativeName:"Frysk"},{code:"xh",name:"Xhosa",nativeName:"isiXhosa"},{code:"yi",name:"Yiddish",nativeName:"ייִדיש"},{code:"yo",name:"Yoruba",nativeName:"Yorùbá"},{code:"za",name:"Zhuang, Chuang",nativeName:"Saɯ cueŋƅ, Saw cuengh"}],ta=C(w)`
  transition: transform 0.3s;
  ${({isOpen:a})=>a&&"transform: rotate(180deg)"};
`,na={RightIcon:ta};function ia({onOptionSelect:a,placement:n="bottom-start",containerHeight:i,value:o="",...m}){const[r,s]=l.useState({open:!1,searchQuery:"",filteredOptions:[],value:{code:"en-us",name:"English (US)",nativeName:"English (US)"}}),p=ae(r.searchQuery,1e3),v=l.useMemo(()=>o?J.find(g=>g.name.toLowerCase()===o.toLowerCase()||g.nativeName.toLowerCase()===o.toLowerCase()):r.value,[r.value,o]),u=l.useMemo(()=>J.map(g=>({key:Ce(),label:e(f,{"data-test":"dropDownOptions-Stack",children:e(T,{font:"input-s",colorToken:"--text-tablecell-header-neutral-default","data-testid":"country-options","data-test":"dropDownOptions-TSpan",children:e("div",{style:{padding:"0 4px"},children:g.name})})}),type:"value",value:{...g}})),[]),t=l.useCallback(g=>u.filter(({value:{name:b}})=>b.toLowerCase().includes(g.toLowerCase())),[u]),x=l.useCallback(g=>{s(b=>({...b,searchQuery:g}))},[]),N=l.useCallback(()=>{s(g=>({...g,open:!g.open}))},[]),A=l.useCallback(()=>{s(g=>({...g,open:!g.open,searchQuery:""}))},[]),d=l.useCallback(({value:g})=>{a(g),s(b=>({...b,value:g}))},[a]),y=l.useMemo(()=>p?t(p):u,[p,u,t]);return e(f,{fullWidth:!0,"data-testid":"language-picker","data-test":"Stack",children:e(te,{containerWidth:"443px",containerHeight:i,inputValue:r.searchQuery,options:y,usePortal:!0,placement:n,showInternalSearch:!0,onInputChange:x,onClose:A,onOpen:N,onSelectOption:d,"data-test":"Dropdown",children:({inputProps:g,inputRef:b,toggle:S})=>e(L,{"data-testid":"country-picker-textfield",readOnly:!0,ref:b,...m,...g,value:(v==null?void 0:v.name)??"",rightIcon:e(na.RightIcon,{name:"chevron_down_m",isOpen:r.open,size:16,onClick:S,"data-testid":"language-dropdown-icon",color:"--icon-input-neutral-default"}),"data-test":"TextField"})})})}function oa({isMobile:a}){var t,x,N,A,d,y,g;const{updateCampaign:n,campaign:i,error:{isAudienceRangeExceeded:o}}=_(),[m,r]=l.useState(""),s=l.useMemo(()=>{var b,S;return m||((S=(b=i==null?void 0:i.audience)==null?void 0:b.category)==null?void 0:S.join(","))},[(t=i==null?void 0:i.audience)==null?void 0:t.category,m]),p=b=>{r(b),n(S=>({...S,audience:{...S.audience,category:b.length?b.split(","):[""]}}))},v=l.useCallback((b,S)=>{!b||!S||n(O=>{var G;return{...O,audience:{...O.audience,targetLocation:[`${S}-${(G=b.split("(")[0])==null?void 0:G.trim()}`]}}})},[n]),u=l.useCallback(b=>{n(S=>({...S,audience:{...S.audience,targetLanguage:[b.name]}}))},[n]);return h(c.Container,{children:[e(c.FormTitle,{children:"Audience"}),e(k,{height:14,"data-test":"Spacer"}),e(z,{fullWidth:!0,size:"thin","data-test":"Separator"}),e(k,{height:14,"data-test":"Spacer"}),e(T,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"TSpan",children:"The target audience of an advertisement refers to the specific group of people that the ad is designed to reach and appeal to. Please describe the certain characteristics, interests, or behaviors in common that make them likely to respond positively to the ad."}),e(k,{height:16,"data-test":"Spacer"}),e(Te,{type:"tertiary","data-test":"Infobox",children:e(T,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"TSpan",children:"e.g. male, a 27-year-old tech enthusiasts, graphic designer, self-employed."})}),e(k,{height:24,"data-test":"Spacer"}),e(L,{label:"Tell us more about your audience",value:s,onChange:b=>p(b.target.value),error:o,maxLength:o?void 0:E.MAX_AUDIENCE_CHARACTERS,helperText:o?`Audience should not exceed ${E.MAX_AUDIENCE_CHARACTERS} characters`:"","data-test":"TextField"}),e(k,{height:24,"data-test":"Spacer"}),h(f,{gap:24,fullWidth:!0,vertical:a,"data-test":"Stack",children:[h(c.FullWidthDiv,{children:[e(c.InputLabel,{children:"Target Audience Location"}),e(k,{height:10,"data-test":"Spacer"}),e(Ae,{placement:"top",containerHeight:a?void 0:"300px",onCountryCodeChange:v,value:((d=(A=(N=(x=i==null?void 0:i.audience)==null?void 0:x.targetLocation)==null?void 0:N[0])==null?void 0:A.split("-"))==null?void 0:d[0])??"","data-test":"CountryPicker"})]}),h(c.FullWidthDiv,{children:[e(c.InputLabel,{children:"Languages"}),e(k,{height:10,"data-test":"Spacer"}),e(ia,{placement:"top",containerHeight:a?void 0:"300px",onOptionSelect:u,value:((g=(y=i==null?void 0:i.audience)==null?void 0:y.targetLanguage)==null?void 0:g[0])??"English (US)","data-test":"LanguagePicker"})]})]})]})}function ra(){const{campaign:a,updateCampaign:n}=_(),i=a.budgetType===M.TotalDailyBudget,o=a.budgetType===M.TotalBudget,m=s=>{n(p=>({...p,budgetType:s}))},r=s=>{const p=parseInt(s.target.value.replace(/\D/g,"")||"0",10);p>99999||n(v=>({...v,budgetAmount:p}))};return h(c.Container,{children:[e(c.FormTitle,{children:"Total Budget"}),e(k,{height:14,"data-test":"Spacer"}),e(z,{fullWidth:!0,size:"thin","data-test":"Separator"}),e(k,{height:14,"data-test":"Spacer"}),e(T,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"TSpan",children:"Average amount of money that you have set to be spent on your advertising campaign. It is used to control the pace of your advertising spend, ensuring that your budget is not exceeded."}),e(k,{height:16,"data-test":"Spacer"}),h(f,{gap:16,align:"center","data-test":"Stack",children:[h(f,{gap:8,align:"center",onClick:()=>m(M.TotalBudget),"data-test":"Stack",children:[e($,{isChecked:o,icon:e(w,{name:"radio_btn_m",size:o?12:0,color:o?"--icon-radiobutton-brand-primary-default":"--icon-radiobutton-inactive-default","data-test":"Icon"}),"data-test":"Radiobox"}),e(T,{font:"body-m-bold",colorToken:"--text-option-selector-neutral-pressed","data-test":"TSpan",children:"Total Budget"})]}),h(f,{gap:8,align:"center",onClick:()=>m(M.TotalDailyBudget),"data-test":"Stack",children:[e($,{isChecked:i,icon:e(w,{name:"radio_btn_m",size:i?12:0,color:i?"--icon-radiobutton-brand-primary-default":"--icon-radiobutton-inactive-default","data-test":"Icon"}),"data-test":"Radiobox"}),e(T,{font:"body-m-bold",colorToken:"--text-option-selector-neutral-pressed","data-test":"TSpan",children:"Total Daily Budget"})]})]}),e(k,{height:16,"data-test":"Spacer"}),h(c.CurrencyContainer,{children:[e(c.CurrencyInput,{value:a.budgetAmount||"",onChange:r,type:"text",placeholder:"0"}),e(T,{font:"body-m",colorToken:"--text-tablecell-header-neutral-default","data-test":"TSpan",children:"USD"})]}),e(k,{height:16,"data-test":"Spacer"})]})}function da({onCreated:a}){const{logError:n}=me(),{updateFilterState:i,noums:o}=ue(),[m,r]=l.useState(20),s=H(),p=ke(),v=Ge(),u=he({skip:!p.id,variables:{campaignId:p.id},onCompleted:({getSelectedAdCampaignDetails:d})=>{if(v){const y={...F.cleanCampaignSummary(d),title:`${d==null?void 0:d.title}_Clone`};y.otherGoals||delete y.otherGoals,v.updateCampaign(y)}}}),t=ge({fetchPolicy:"cache-and-network",variables:{limit:m,filters:{status:pe.Published,projectType:ve.Public}},onCompleted:({getOwnProjectChambers:d})=>{d!=null&&d.count&&d.count>m&&r(d.count)},onError:d=>{n(d,"noum-assignment-create-campaign",!0)}}),[x,N]=Ne({variables:{input:v.campaign},onCompleted:({createAdCampaign:d})=>{var y;if((y=d==null?void 0:d.noumId)!=null&&y._id&&o.length&&!o.includes(d.noumId._id)){const g=[...o];g.push(d.noumId._id),i({noums:g})}a==null||a((d==null?void 0:d._id)??"new")},onError:d=>n(d,"create-campaign",!0)}),A=l.useCallback(()=>{s(K.CAMPAIGNS)},[s]);return{noums:t,createCampaignFn:x,createCampaignState:N,campaign:v,duplication:u,handleDelete:A}}function sa({isMobile:a,isTablet:n,currentStep:i,totalSteps:o,onStepChange:m}){var S,O,G,U,j,W,q,X,Q,V;const r=ie(),{addErrorToast:s}=be(),[p,v]=l.useState(!1),{noums:u,campaign:t,createCampaignFn:x,createCampaignState:N,handleDelete:A}=da({onCreated:m}),{restrictUserToSubmitCampaign:d}=t,y=ne((O=(S=u==null?void 0:u.data)==null?void 0:S.getOwnProjectChambers)==null?void 0:O.data),g=l.useMemo(()=>y.find(ce=>{var Y;return ce._id===((Y=t==null?void 0:t.campaign)==null?void 0:Y.noumId)}),[(G=t==null?void 0:t.campaign)==null?void 0:G.noumId,y]),b=()=>{if(!d&&!N.loading){v(!0);return}s("Please fill up all the fields for preview")};return e(D,{children:p?h(D,{children:[e(c.PreviewHeader,{children:e(c.PreviewBackButton,{neutral:!0,size:"small",leftIcon:e(w,{name:"arrow_left_m",size:22,"data-test":"Icon"}),onClick:()=>v(!1)})}),e(xe.Main,{children:e(ye,{title:(U=t==null?void 0:t.campaign)==null?void 0:U.title,status:"",audience:(j=t==null?void 0:t.campaign)==null?void 0:j.audience,startDate:(W=t==null?void 0:t.campaign)==null?void 0:W.startDate,noumId:g,goals:(q=t==null?void 0:t.campaign)==null?void 0:q.goals,budgetAmount:(X=t==null?void 0:t.campaign)==null?void 0:X.budgetAmount,budgetType:(Q=t==null?void 0:t.campaign)==null?void 0:Q.budgetType,otherGoals:(V=t==null?void 0:t.campaign)==null?void 0:V.otherGoals,"data-test":"CampaignDetails"})})]}):h(D,{children:[e(re,{isMobile:a,isTablet:n,heading:"New Campaign",currentStep:i,totalSteps:o,rightAction:e(we.FormAction,{isMobile:a,isTablet:n,submitDisabled:d||N.loading,deleteDisabled:N.loading,loading:N.loading,onSubmitRequest:x,onDelete:A}),"data-test":"Header"}),e(c.FormContainer,{children:e(se.Provider,{value:t,children:h(c.Forms,{children:[e(ea,{noums:y??[],isMobile:r.isMobile,"data-test":"CampaignTitle"}),e(aa,{"data-test":"CampaignGoals"}),e(oa,{isMobile:r.isMobile,"data-test":"CampaignAudience"}),e(ra,{"data-test":"CampaignBudget"})]})})}),(r.isMobile||r.isTablet)&&e("div",{style:{padding:"16px"},children:e(c.PreviewContainer,{onClick:b,children:e(w,{name:"preview_m",size:22,"data-test":"Icon"})})})]})})}function ca({isMobile:a,isTablet:n,currentStep:i,totalSteps:o,onSeeDetails:m}){const r=H(),s=()=>r(K.CAMPAIGNS);return h(D,{children:[e(re,{isMobile:a,isTablet:n,heading:"Campaign",currentStep:i,totalSteps:o,"data-test":"Header"}),h(c.RequestSubmitted,{children:[e(w,{name:"success_cq_xxxl",size:130,"data-test":"Icon"}),e(T,{font:"heading-xs-bold",colorToken:"text-body-header-neutral-default",textAlign:"center","data-test":"TSpan",children:"Campaign Request Submitted Successfully"}),h(T,{font:"body-l",colorToken:"--text-body-neutral-default",textAlign:"center","data-test":"TSpan",children:["We've got your request and will take care of it in under"," ",e(T,{colorToken:"--text-body-neutral-highlighted",textAlign:"center","data-test":"TSpan",children:"72 hours"}),". You'll receive an offer soon."]}),h(f,{vertical:a,fullWidth:a,gap:16,"data-test":"Stack",children:[e(B,{size:a?"full":void 0,primary:!0,onClick:m,"data-test":"Button",children:"See Details"}),e(B,{size:a?"full":void 0,secondary:!0,onClick:s,"data-test":"Button",children:"See Your Campaigns"})]})]})]})}function Ma(){const a=ie(),n=H(),[i,o]=l.useState(1),[m,r]=l.useState("new"),s=l.useCallback(()=>{n(Se(K.CAMPAIGN_SUMMARY,{id:m}))},[m,n]),p=l.useCallback(v=>{r(v),o(2)},[]);return h(fe,{"data-test":"SinglePageLayout",children:[i===1&&e(sa,{isMobile:a.isMobile,isTablet:a.isTablet,currentStep:i,totalSteps:3,onStepChange:p,"data-test":"CampaignForm"}),i===2&&e(ca,{isMobile:a.isMobile,isTablet:a.isTablet,currentStep:i,onSeeDetails:s,totalSteps:3,"data-test":"CampaignSubmitted"})]})}export{Ma as default};
//# sourceMappingURL=CreateCampaign-630badd1.js.map
