import{c as m,j as e,I as Z,S as K,T as W,B as ee,bw as de,s as ne,fY as ce,f as te,aC as U,hf as L,q8 as me,q9 as xe,qa as Se,au as ye,F as ue,n as ae,ho as A,u as F,hh as $,hj as V,hk as q,R as j,ay as Me,e as X,d as Le,w as we,a1 as Ge,d7 as _e,b7 as pe,hp as Ee,qb as Ne}from"./index-cd84bcc9.js";import{B as w,C as p,r as a,c as Be,ay as Te,a9 as se,al as Q,at as ke,au as Ae,ar as Ie,aa as Ce,aB as Oe,bo as We,bp as Re,bq as ie}from"./vendor-51460554.js";import{C as Y,f as re,N as he,i as ze,k as Pe,g as $e,l as He,m as Ue,n as Ve,o as De}from"./NewHomeConversationUserSelector-1a2609b0.js";import{A as je}from"./Accordion-ea03839b.js";import{A as J}from"./index-4963229a.js";import{M as Fe}from"./MessageInput-4cf1b973.js";import"./useResizeObserver-0deb9469.js";import"./Modal-5a254f40.js";const qe=[{name:"all",text:w("noumena.chambers.toolbox.element.all"),labelSize:"auto"},{name:"direct_conversation",text:w("noumena.chambers.toolbox.element.message.direct_conversation"),labelSize:"auto"},{name:"noums",text:w("noumena.search.filter_noums"),labelSize:"auto"}],Xe=p.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`,be=({onCreateNew:t})=>m(Xe,{"data-testid":"empty_screen_wrapper","data-test":"EmptyScreen-EmptyScreenWrapper",children:[e(Z,{name:"message_outline_m",size:96,color:"--icon-card-placeholder-neutral-default","data-test":"EmptyScreen-Icon"}),e(K,{height:8,"data-test":"EmptyScreen-Spacer"}),e(W,{colorToken:"--text-body-neutral-default",font:"body-xl","data-test":"EmptyScreen-TSpan",children:w("noumena.global_messages.no_conversation_note")}),e(K,{height:24,"data-test":"EmptyScreen-Spacer"}),e(ee,{secondary:!0,size:"small",onClick:t,"data-test":"EmptyScreen-Button",children:w("noumena.global_messages.create_new_conv")})]}),D=p.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  ${({padding:t})=>t&&`padding: ${t}px;`}
  box-sizing: border-box;
  overflow-y: scroll;
  ${({flex:t})=>t&&"flex: 1;"}
  ${({justifyContent:t})=>t&&`justify-content: ${t};`}
    ${({flexDirection:t})=>t&&`flex-direction: ${t};`}
    ${de}
`,Qe=p.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 404px;

  @media (max-width: ${ne.LAPTOP}) {
    width: 383px;
  }

  @media (max-width: ${ne.MOBILE_MAX}) {
    width: 100%;
  }
`,Je=p.div`
  display: flex;
  flex-direction: row;
  padding-left: 16px;
  box-sizing: border-box;
`,Ke=p.div`
  display: flex;
  gap: 8px;
`,le=p(W)`
  width: 231px;
  margin: 32px auto;
  text-align: center;
`,Ye=p(W).attrs({font:"body-m",colorToken:"--text-tablecell-body-neutral-default"})`
  display: flex;
  flex-direction: row;
  align-items: center;
  white-space: break-spaces;
`,Ze=p.div`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--bg-badge-danger-primary-default);
  border-radius: 1000px;
  margin-right: 8px;
`,et=p(W)`
  margin: 16px auto;
  cursor: pointer;
`,tt=p(ce)`
  margin: 16px auto;
`,at=p.div`
  width: 100%;
  min-height: 1px;
  background-color: var(--bg-separator-neutral-default);
`,st=({conversationItem:t,activeConversationSid:n,isNewConversation:s,handleClickItem:i})=>{var H,c,N,B,T,y,O;const{user:r}=te(),[u,l]=a.useState(!1),[d,C]=a.useState(!1),[S,x]=a.useState(!1),[G,v]=a.useState(0),[g,R]=a.useState(U((H=t.conversations)==null?void 0:H.map(o=>o==null?void 0:o.conversation))),M=((N=(c=t.noum)==null?void 0:c.uid)==null?void 0:N._id)===(r==null?void 0:r._id)?L.PROJECT_OWNER:L.PROJECT_USER,{variables:z}=me(M),[,{fetchMore:_}]=Be(M===L.PROJECT_OWNER?xe:Se,{fetchPolicy:"cache-and-network",variables:{...z,offset:0,limit:10,spaceId:(B=t.noum)==null?void 0:B._id}}),I=a.useCallback(async()=>{C(!0);const o=await _({variables:{offset:g.length,limit:10}}),f=(o.data.getSpaceConversations||o.data.getSpaceConversationsAsAdminQuery).data,b=U(f);b!=null&&b.length&&R(k=>[...k,...b.filter(ge=>k.every(fe=>ge._id!==fe._id))]),C(!1)},[g.length,_]),h=a.useMemo(()=>{var o;return((o=t.conversations)==null?void 0:o.reduce((f,b)=>{var k;return{...f,[(k=b==null?void 0:b.conversation)==null?void 0:k.cid]:(b==null?void 0:b.unread)||0}},{}))||{}},[t]),P=a.useCallback(o=>{i(o),h[o]&&(h[o]=0)},[i,h]),E=a.useCallback(o=>{h[o]&&(h[o]=0)},[h]);return a.useEffect(()=>v(t.unreadConversation||0),[t]),a.useLayoutEffect(()=>v(Object.values(h).reduce((o,f)=>f?o+1:o,0)),[h]),a.useEffect(()=>{var o;R(U((o=t.conversations)==null?void 0:o.map(f=>f==null?void 0:f.conversation)))},[t.conversations]),a.useLayoutEffect(()=>{const o=(t.conversationsCount||0)>g.length;x(o)},[t.conversationsCount,g.length]),a.useLayoutEffect(()=>{var f;const o=U((f=t.conversations)==null?void 0:f.map(b=>{var k;return(k=b==null?void 0:b.conversation)==null?void 0:k.cid}));l(o.includes(n))},[n,t.conversations]),e("div",{"data-test":"ExpandableChatItem",children:e(je,{expanded:u,onToggle:l,headerGap:16,left:e(ye,{url:(T=t.noum)==null?void 0:T.profileImage,"data-test":"ExpandableChatItem-Avatar"}),title:((y=t.noum)==null?void 0:y.name)||"",isBoldTitle:!0,contentHeightKey:String(g.length),subtitle:m(Ye,{"data-test":"ExpandableChatItem-StyledSubtitle",children:[G?e(Ze,{"data-test":"ExpandableChatItem-UnreadMessageSign"}):null,e(Te,{i18nKey:t.conversationsCount>1?"noumena.message.conversations_number_note":"noumena.message.conversation_number_note",values:{numConversations:t.conversationsCount},components:{primary:e(W,{font:"body-m-bold",colorToken:"--text-tablecell-brand-primary-default","data-test":"ExpandableChatItem-TSpan"})},"data-test":"ExpandableChatItem-Trans"})]}),"data-test":"ExpandableChatItem-Accordion",children:m(ue,{children:[e(at,{"data-test":"ExpandableChatItem-Divider"}),g.map((o,f)=>e(Y,{index:f,sid:o.cid,size:"M",isActive:!s&&o.cid===n,onClick:P,onRead:()=>E(o.cid),"data-test":"ExpandableChatItem-ChatItem"},o._id)),S&&(d?e(tt,{"data-test":"ExpandableChatItem-NoumGroupLoading",children:e(ae,{"data-test":"ExpandableChatItem-Spinner"})}):e(et,{onClick:I,font:"button-m",colorToken:"--text-button-brand-primary-default","data-test":"ExpandableChatItem-StyledLoadMore",children:w("noumena.load.more")}))]})},`accord-${(O=t.noum)==null?void 0:O._id}`)})},ot={notExistsConversation:!0,setNotExistsConversation:()=>{},selectedTabId:0,setSelectedTabId:()=>{}},oe=a.createContext(ot),nt=({children:t})=>{const{conversationType:n,setConversationType:s,isNewConversation:i,setIsNewConversation:r}=a.useContext(A),[u,l]=a.useState(!0),d=a.useMemo(()=>n===L.GLOBAL_DIRECT?1:n===L.GLOBAL_NOUM?2:0,[n]),[C,S]=a.useState(d),x=a.useCallback(v=>{S(v),s(v===1?L.GLOBAL_DIRECT:v===2?L.GLOBAL_NOUM:L.GLOBAL_ALL),i&&r(!1)},[i,s,r]),G=a.useMemo(()=>({notExistsConversation:u,setNotExistsConversation:l,selectedTabId:C,setSelectedTabId:x}),[u,l,C,x]);return e(oe.Provider,{value:G,children:t})},it=({selectedTabId:t,handleCreateNewConv:n})=>{const{width:s}=F(),i=s<=X.MOBILE_MAX,r=se(),{setViewMode:u,isNewConversation:l,setIsNewConversation:d,conversationType:C}=a.useContext(A),{setNotExistsConversation:S}=a.useContext(oe),{activeConversationSid:x,setActiveConversationSid:G}=a.useContext($),{conversations:v,networkStatus:g,count:R,totalCount:M,onFetchMore:z}=V.useConversationsList(C);a.useEffect(()=>{S(C===L.GLOBAL_ALL&&!M)},[C,S,M]),a.useLayoutEffect(()=>{var c,N,B,T;if(!l&&!x&&v.length>0){const y=v[0],O=y.__typename==="BasicConversationItem"?((c=y.conversation)==null?void 0:c.cid)||"":y.__typename==="NoumGroupConversationItem"&&((T=(B=(N=y.conversations)==null?void 0:N[0])==null?void 0:B.conversation)==null?void 0:T.cid)||"";G(O)}},[x,v,l,G]);const _=a.useCallback(c=>{d(!1),u(q.FULLCONVERSATION),r(`${j.MESSAGES}/${c}`)},[r,d,u]),I=!x&&l&&[0,1].includes(t),h=g===Q.fetchMore,P=R<M,E=h?"loading":P?"hasNextPage":"end";return(g===Q.loading||g===Q.setVariables)&&v.length===0?e(D,{flex:!0,"data-testid":"chatlist-wrapper",justifyContent:"center","data-test":"GlobalChatList-ListWrapper",children:e(ce,{"data-test":"GlobalChatList-SpinnerContainer",children:e(ae,{"data-test":"GlobalChatList-Spinner"})})}):M?e(D,{flex:!0,flexDirection:"column","data-testid":"list_wrapper","data-test":"GlobalChatList-ListWrapper",children:m(Me,{onFetchMore:z,status:E,width:"100%",isSpinnerRelative:!0,"data-test":"GlobalChatList-Infinite",children:[I&&e(re,{size:"L","data-test":"GlobalChatList-NewChatItem"}),v.map((c,N)=>{var B,T,y,O;return c.__typename==="ConversationOutput"?e(Y,{index:N,sid:c.cid,size:"L",isActive:c.cid===x,onClick:_,"data-test":"GlobalChatList-ChatItem"},c._id):c.__typename==="BasicConversationItem"?e(Y,{index:N,sid:(B=c.conversation)==null?void 0:B.cid,size:"L",isActive:((T=c.conversation)==null?void 0:T.cid)===x,onClick:_,"data-test":"GlobalChatList-ChatItem"},(y=c.conversation)==null?void 0:y._id):c.__typename==="NoumGroupConversationItem"&&e(st,{conversationItem:c,activeConversationSid:x,isNewConversation:l,handleClickItem:_,"data-test":"GlobalChatList-ExpandableChatItem"},(O=c.noum)==null?void 0:O._id)})]})}):I?e(D,{flex:!0,flexDirection:"column","data-testid":"list_wrapper","data-test":"GlobalChatList-ListWrapper",children:e(re,{size:"L","data-test":"GlobalChatList-NewChatItem"})}):t===2?e(le,{colorToken:"--text-placeholder-neutral-default",font:"body-m","data-test":"GlobalChatList-StyledNoNoumConvoNote",children:w("noumena.global_messages.no_noum_conversation_note")}):i?e(be,{onCreateNew:n,"data-test":"GlobalChatList-EmptyScreen"}):t===1?e(le,{colorToken:"--text-placeholder-neutral-default",font:"body-m","data-test":"GlobalChatList-StyledNoNoumConvoNote",children:w("noumena.global_messages.no_direct_conversation_note")}):null},rt=()=>{const{notExistsConversation:t,selectedTabId:n,setSelectedTabId:s}=a.useContext(oe),{setViewMode:i,setIsNewConversation:r}=a.useContext(A),{setActiveConversationSid:u}=a.useContext($),l=a.useCallback(C=>{C&&s(Number(C))},[s]),d=a.useCallback(()=>{r(!0),i(q.FULLCONVERSATION),u(""),n===2&&s(1)},[n,u,r,s,i]);return m(Qe,{"data-testid":"side_bar_wrapper","data-test":"SideBar-SideBarWrapper",children:[m(D,{padding:16,justifyContent:"space-between","data-test":"SideBar-ListWrapper",children:[e(W,{font:"heading-xs-bold",colorToken:"--text-body-header-neutral-default","data-test":"SideBar-TSpan",children:w("noumena.chambers.toolbox.element.messages")}),m(Ke,{"data-test":"SideBar-Options",children:[!1,e(ee,{size:"small",primary:!0,icon:e(Z,{name:"plus_m",size:24,color:"--icon-button-neutral-alt-default","data-test":"SideBar-Icon"}),onClick:d,"data-test":"SideBar-Button"})]})]}),!t&&e(Je,{"data-testid":"tabs_wrapper","data-test":"SideBar-TabsWrapper",children:e(Le,{onChange:l,inputList:qe,selectedId:n.toString(),mode:"isBackground",isWithoutImage:!0,fontSize:"--font-input-small-size","data-test":"SideBar-BasicChipsTabsForm"})}),e(K,{height:16,"data-test":"SideBar-Spacer"}),e(it,{selectedTabId:n,handleCreateNewConv:d,"data-test":"SideBar-GlobalChatList"})]})},lt=p.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  #main-header {
    width: 100%;
  }
`,dt=p.div`
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${ke(Ae("--bg-overlay-neutral-light"),.1)};
`,ct=p.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: 1;
  height: 100%;
`,ut=p.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow-y: auto;
  position: relative;
  height: 100%;
`,pt=p.div`
  flex: 1;
  overflow: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
`,Ct=p.div`
  height: 100%;
  border-left: 1px solid var(--bg-separator-neutral-default);
`,ht=t=>{const{children:n}=t,{user:s}=te(),{width:i}=F(),{flags:r}=we(),u=se(),{viewMode:l}=a.useContext(A),{loading:d}=a.useContext(he),C=i<=X.MOBILE_MAX,S=e(ct,{children:m(ut,{children:[(l!==q.FULLCONVERSATION||!C)&&e(rt,{"data-test":"GlobalMessageLayout-mainContent-SideBar"}),!C&&e(Ct,{}),e(pt,{children:n})]})});return r.newAppNavigation?e(J.Layout,{onGoBack:()=>u(-1),background:"neutral-alt",topNavbar:e(J.TopBar,{}),sideNav:e(J.SideNavigation,{}),children:S}):m(lt,{children:[d&&e(dt,{children:e(ae,{"data-test":"GlobalMessageLayout-Spinner"})}),e(Ge,{isBorderRadius:!1,"data-test":"GlobalMessageLayout-Header",children:e(_e,{avatar:pe.getProfilePicture(s)||void 0,userName:(s==null?void 0:s.firstName)||void 0,"data-test":"GlobalMessageLayout-MainHeader"})}),S]})},bt=p.div`
  display: flex;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
`,vt=()=>{const{width:t}=F(),n=t<=X.MOBILE_MAX,{setViewMode:s,isNewConversation:i,setIsNewConversation:r}=a.useContext(A),u=a.useRef(null),l=a.useCallback(()=>{var d,C;r(!1),s(q.FULLCHAT),(C=(d=u==null?void 0:u.current)==null?void 0:d.cancel)==null||C.call(d)},[r,s]);return m(bt,{"data-testid":"conversionheader-wrapper","data-test":"GlobalConversationHeader-GlobalConversationHeaderWrapper",children:[n&&e(ee,{"data-testid":"back-button",neutral:!0,size:"small",icon:e(Z,{name:"arrow_left_m",size:24,color:"--icon-button-neutral-default","data-test":"GlobalConversationHeader-Icon"}),onClick:l,"data-test":"GlobalConversationHeader-Button"}),i?e(ze,{ref:u,"data-test":"GlobalConversationHeader-NewHomeConversationUserSelector"}):e(Pe,{"data-test":"GlobalConversationHeader-ConversationProfile"})]})},gt=p.div`
  flex: 1;
  width: 100%;
  height: calc(100% - 72px);
  box-sizing: border-box;
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`,ft=p.div`
  padding-right: 16px;
  flex: 1;
  overflow: auto;
  ${de}
`,mt=p.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
`,xt=p.div`
  padding-top: 8px;
`,St=()=>{var I;const t=a.useRef(null),{t:n}=Ie(),{user:s}=te(),{activeConversationSid:i}=a.useContext($),{setConversationWrapperWidth:r}=a.useContext(A),{ecLoading:u,selectedUsers:l,isConversationCreatable:d,createHomeNoumNewConversation:C}=a.useContext(he),{conversation:S}=V.useConversation({sid:i}),{setIsNewConversation:x}=a.useContext(A),{sendMessage:G,sendFile:v}=V.useConversationMessages({sid:i}),{users:g}=V.useConversationDetails({sid:i}),R=!u,M=!u&&!i&&d,z=a.useMemo(()=>(i||d)&&!pe.isInactive(s)&&(g.length===1?g[0].source!==null:!0),[i,d,s,g]);a.useEffect(()=>{var h;r(((h=t.current)==null?void 0:h.scrollWidth)||0)},[(I=t.current)==null?void 0:I.scrollWidth,r]);const _=async(h,P)=>{let E=S;d&&(E?x(!1):E=await C()),Ee(h,4e3).forEach(c=>G(c,E)),P.forEach(c=>v(c,E))};return m(gt,{ref:t,"data-testid":"conversionbody-wrapper","data-test":"GlobalConversationBody-Wrapper",children:[e(ft,{"data-test":"GlobalConversationBody-MessageListWrapper",children:R&&e($e,{"data-test":"GlobalConversationBody-MessageList"})}),m(xt,{"data-test":"GlobalConversationBody-MessageInputWrapper",children:[M&&e(mt,{"data-test":"GlobalConversationBody-StartConversationMessage",children:e(W,{font:"footnote",colorToken:"--text-message-status-neutral-default","data-test":"GlobalConversationBody-TSpan",children:l.length===1?n("noumena.message.start_single_conversation",{name:`${l[0].firstName} ${l[0].lastName}`}):n("noumena.message.start_group_conversation")})}),z&&e(Fe,{onSendMessage:_,"data-test":"GlobalConversationBody-MessageInput"})]})]})},ve=()=>{const{width:t}=F(),n=t<=X.MOBILE_MAX,{id:s}=Ce(),{isNewConversation:i,setIsNewConversation:r}=a.useContext(A),{activeConversationSid:u,setActiveConversationSid:l}=a.useContext($),d=a.useCallback(()=>{r(!0),l("")},[l,r]);return a.useLayoutEffect(()=>{s&&l(s)},[s,l]),!n&&!i&&!u?e(be,{onCreateNew:d,"data-test":"MessageContent-EmptyScreen"}):m(ue,{children:[e(vt,{"data-test":"MessageContent-GlobalConversationHeader"}),e(St,{"data-test":"MessageContent-GlobalConversationBody"})]})},yt=()=>{const t=Oe(),{id:n}=Ce(),{activeConversationSid:s}=a.useContext($);return s&&t.pathname.includes(j.MESSAGES)&&!n?e(We,{replace:!0,to:`${j.MESSAGES}/${s}`,"data-test":"GlobalMessagesRedirect-Navigate"}):e(ve,{"data-test":"GlobalMessagesRedirect-MessageContent"})},Tt=()=>{const t=se(),[n]=Ne(),s=a.useCallback(r=>{t(`${j.MESSAGES}/${r}`)},[t]),i=a.useCallback(()=>{n({variables:{date:new Date().toISOString()}})},[n]);return e(He,{"data-test":"GlobalMessages-ConversationViewProvider",children:e(nt,{"data-test":"GlobalMessages-GlobalMessageProvider",children:e(Ue,{onLoadConversations:i,"data-test":"GlobalMessages-TwilioClientProvider",children:e(Ve,{"data-test":"GlobalMessages-ActiveConversationProvider",children:e(De,{onCreated:s,"data-test":"GlobalMessages-NewConversationProvider",children:e(ht,{"data-test":"GlobalMessages-GlobalMessageLayout",children:m(Re,{"data-test":"GlobalMessages-Routes",children:[e(ie,{path:":id",element:e(ve,{"data-test":"GlobalMessages-MessageContent"}),"data-test":"GlobalMessages-Route"}),e(ie,{element:e(yt,{"data-test":"GlobalMessages-GlobalMessagesRedirect"}),index:!0,"data-test":"GlobalMessages-Route"})]})})})})})})})};export{Tt as default};
//# sourceMappingURL=index-e155eb79.js.map
