import{v as ne,bF as yn,bG as xn,bH as _n,bs as Mt,bu as sa,p as Dt,bI as Sn,bJ as lt,bK as Ce,bL as qe,bM as Ke,bN as Tn,bO as He,bP as U,bQ as kn,bR as vn,bS as En,bT as wn,bU as Nn,bV as Mn,bW as In,w as Ee,bX as Dn,a7 as tt,j as e,I as j,c as m,T as P,bY as Z,F as H,a2 as Pt,bt as V,bZ as Ut,aj as ke,b_ as De,b$ as ae,n as be,d as it,M as oe,t as ue,h as ie,i as re,k as me,S as Q,B as R,s as Ye,a as Pn,c0 as ot,u as we,au as ca,b7 as ua,o as An,am as Ge,c1 as Bn,bz as Ln,ay as ma,m as ge,bw as On,c2 as fe,c3 as Hn,c4 as Wn,c5 as gt,q as It,c6 as Rn,c7 as zn,e as Ct,c8 as At,c9 as pa,f as yt,X as ha,ca as Fn,O as Vt,cb as Bt,y as ba,cc as $n,cd as ga,ce as Un,cf as Vn,cg as jt,ch as jn,ci as kt,cj as qn,ck as fa,aH as Kn,cl as Yn,cm as Gn,cn as Xn,co as qt,cp as Kt,cq as Qn,cr as at,cs as Yt,ct as Gt,cu as Ca,cv as ya,cw as xa,a1 as _a,x as z,aK as Zn,cx as Jn,cy as eo,cz as vt,cA as to,cB as ao,cC as Xt,cD as Et,cE as no,cF as Ue,bB as Y,cG as oo,cH as io,cI as ro,cJ as lo,aW as so,cK as co,cL as uo,cM as mo,ae as po,cN as ho,cO as Qt,cP as bo,cQ as go,cR as fo,R as Co}from"./index-cd84bcc9.js";import{r as l,B as k,f as ye,l as ve,ar as G,C as S,ad as We,ac as yo,a6 as Lt,ay as Re,am as xo,an as _o,ap as So,aq as To,aa as Sa,a9 as Ot,aB as Ta,aT as ka,bN as ko,b2 as vo}from"./vendor-51460554.js";import{u as Eo,a as wo,b as No,c as va,E as Ea,d as Mo,P as wa,C as Na,D as Io}from"./EditChamberHeader-95bc6aab.js";import{M as Zt,S as Ma,C as Ia,N as Jt,E as Do,a as Po,T as Ao}from"./index-401975c0.js";import{v as Bo,C as Da}from"./MemberStatusTag-69ed5aaa.js";import"./SelectField-54706174.js";import{N as Pa}from"./NoumAdsModal-991c7b16.js";import{M as Aa}from"./HandleUnlinkNoum-c385ad89.js";import{u as Ba}from"./useBlocker-0dcaf13c.js";import{u as La,N as Lo,a as Oo,H as Oa}from"./HoverWrapper-680bb0f6.js";import{g as Ha}from"./getTimeStampForDisplaying-22d5ca9d.js";import{C as Ho}from"./ChamberActionModal-ce3fca40.js";import{W as Ht,a as Wt}from"./styles-1a9b9e59.js";import"./helper-53a5becb.js";import{c as Wo,u as Ro,N as zo,d as wt}from"./ChamberCompleteness-c76bd15d.js";import{A as Fo,b as $o,c as Uo,d as Vo,e as jo,f as qo,g as Ko,h as Yo,i as Go,j as Xo,k as Qo,l as nt,m as Zo,n as Jo,o as ei,P as Rt,D as ti,p as ai,q as ea,r as ni,s as oi,t as ii,I as ri,v as li,w as di,x as si,y as ci,E as ui,z as mi,B as pi,F as hi,N as bi,a as gi,G as fi,H as Ci,J as yi}from"./Element-9cea61d7.js";import{u as xi}from"./useTimeIndicator-3b8ca7e8.js";import{R as bt}from"./RichTextEditorView-3d7dc014.js";import{R as _i}from"./Radiobox-c1e62033.js";import"./Accordion-ea03839b.js";function Wa(){const{addToast:t}=ne(),[a,{loading:o}]=yn(),r=l.useCallback(async n=>{var i;let d;try{const{data:c}=await a({variables:{spaceId:n}});t("success","icon",k("noumena.container.chamber.restore.success",{date:Ha((i=c==null?void 0:c.removeUnsavedAndDraftedData)==null?void 0:i.publishedAt)})),d=!0}catch(c){let s="Unknown";c instanceof Error&&(s=c.message),t("error","none",s),ye(new Error(s),{tags:{section:"removeUnsavedAndDraftedDataMutation"}}),d=!1}return d},[t,a]);return{loading:o,restoreSpaceHelper:r}}function Ra(){const{addToast:t}=ne(),[a,{loading:o}]=xn(),[r,{loading:n}]=_n(),d=l.useCallback(async(i,c)=>{let s;try{await a({variables:{spaceId:i,prevStates:[Mt.Unsaved],currentState:Mt.Draft}}),c&&sa.hasUnsavedSetting(c)&&await r({variables:{spaceId:i,status:Dt.Draft}}),t("success","icon",k("noumena.container.chamber_save_as_draft.success")),s=!0}catch(p){let h="Unknown";p instanceof Error&&(h=p.message),t("error","none",h),h!==k("noumena.container.chamber_business_brief_error")&&h!==k("noumena.container.chamber_experience_error")&&ye(new Error(h),{tags:{section:"publishElementStateMutation"}}),s=!1}return s},[t,r,a]);return{loading:o||n,saveAsDraftSpaceHelper:d}}function Si(){const{addToast:t}=ne(),[a,{loading:o}]=Sn(),r=l.useCallback(async(n,d,i,c)=>{let s;try{await a({variables:{input:d},update:(p,{data:h})=>{var x;if(!h||!h.addNoumLayoutTool)return;const u={id:n,editorV2Enabled:!0,status:lt.Unpublished},b=p.readQuery({query:Ce,variables:u});if(!b)return;const{getSpaceById:f}=b,g=ve.cloneDeep(f);if(!(g!=null&&g.layout))return;const{section:C,sectionIndex:_}=qe(d.columnId,((x=g==null?void 0:g.layout)==null?void 0:x.sections)||[]),{column:T,columnIndex:E}=Ke(d.columnId,(C==null?void 0:C.columns)||[]);if(!(!C||!T)){if(i){const w=T.tools.findIndex(v=>v._id===i),y=T.tools[w];y!=null&&y.position&&c&&y.position<c?T.tools.splice(w+1,0,{...h.addNoumLayoutTool,position:c}):T.tools.splice(w,0,{...h.addNoumLayoutTool,position:c})}else T.tools.push(h.addNoumLayoutTool);C.columns[E]=T,g.layout.sections[_]=C,p.writeQuery({query:Ce,variables:u,data:{getSpaceById:g}}),s=h.addNoumLayoutTool}}})}catch(p){let h="Unknown";p instanceof Error&&(h=p.message),t("error","none",h,!1),ye(new Error(h),{tags:{section:"addElementMutation"}})}return s},[a,t]);return{loading:o,addNoumLayoutToolHelper:r}}function Ti(){const{addToast:t}=ne(),[a,{loading:o}]=Tn(),r=l.useCallback(async(n,d,i,c)=>{let s;try{s=await a({variables:{input:n},update:(p,{data:h})=>{var O;if(!h||!h.moveToolToNoumLayoutColumn)return;const u={id:d,editorV2Enabled:!0,status:lt.Unpublished},b=p.readQuery({query:Ce,variables:u});if(!b)return;const{getSpaceById:f}=b;if(!f)return;const g=ve.cloneDeep(f);if(!(g!=null&&g.layout))return;g.layout.status=He.Unsaved;const{section:C}=qe(i.droppableId,g==null?void 0:g.layout.sections),{column:_}=Ke(i.droppableId,C==null?void 0:C.columns);if(!_)return;const T=_.tools.findIndex(A=>A._id===n.toolId),[E]=_.tools.splice(T,1),{section:x,sectionIndex:w}=qe(c.droppableId,g==null?void 0:g.layout.sections),{column:y,columnIndex:v}=Ke(c.droppableId,x==null?void 0:x.columns);if(!(y!=null&&y.tools))return;y==null||y.tools.sort(U.sortPublished);const I=((O=y.tools[c.index])==null?void 0:O.position)||0;y==null||y.tools.splice(c.index,0,{...E,position:I}),!(!y||!x)&&(y.tools.reduce((A,B)=>{if(B.position&&I&&B.position>=I&&E._id!==B._id){const N=B;N.position&&(N.position+=1)}return A.push(B),A},[]),x.columns[v]=y,g.layout.sections[w]=x,p.writeQuery({query:Ce,variables:u,data:{getSpaceById:g}}))}})}catch(p){let h="Unknown";p instanceof Error&&(h=p.message),t("error","none",h),ye(new Error(h),{tags:{section:"moveToolToNoumLayoutColumnMutation"}}),s=!1}return s},[t,a]);return{loading:o,moveToolToNoumLayoutColumnHelper:r}}function ki(){const{addToast:t}=ne(),[a,{loading:o}]=kn(),r=l.useCallback(async(n,d,i,c)=>{let s;try{await a({variables:{input:n},update:(p,{data:h})=>{var _;if(!h||!h.rearrangeSectionInNoumLayout)return;const u={id:d,editorV2Enabled:!0,status:lt.Unpublished},b=p.readQuery({query:Ce,variables:u});if(!b)return;const{getSpaceById:f}=b,g=ve.cloneDeep(f);if(!(g!=null&&g.layout))return;g.layout.sections=ve.remove(g==null?void 0:g.layout.sections,T=>T.visible),(_=g==null?void 0:g.layout)==null||_.sections.sort(U.sortSectionUnPublished);const C=g.layout.sections[i].position;g.layout.sections[i].position=g.layout.sections[c].position,g.layout.sections[c].position=C,g.layout.status=He.Unsaved,p.writeQuery({query:Ce,variables:u,data:{getSpaceById:g}})}}),s=!0}catch(p){let h="Unknown";p instanceof Error&&(h=p.message),t("error","none",h),s=!1}return s},[t,a]);return{loading:o,updateSectionPositionHelper:r}}function vi(){const{addToast:t}=ne(),[a,{loading:o}]=vn(),r=l.useCallback(async(n,d)=>{let i;try{await a({variables:{id:n},update:(c,{data:s})=>{var E,x;if(!s||!s.removeToolFromNoumLayout)return;const p={id:d,editorV2Enabled:!0,status:lt.Unpublished},h=c.readQuery({query:Ce,variables:p});if(!h)return;const{getSpaceById:u}=h;if(!u)return;const b=ve.cloneDeep(u);if(!(b!=null&&b.layout))return;b.layout.status=He.Unsaved;const f=En(n,((E=b==null?void 0:b.layout)==null?void 0:E.sections)||[]);if(!f)return;const{section:g,sectionIndex:C}=qe(f,((x=b==null?void 0:b.layout)==null?void 0:x.sections)||[]),{column:_,columnIndex:T}=Ke(f,(g==null?void 0:g.columns)||[]);!g||!_||(_.tools=ve.remove(_.tools,w=>(w==null?void 0:w._id)!==n),g.columns[T]=_,b.layout.sections[C]=g,c.writeQuery({query:Ce,variables:p,data:{getSpaceById:b}}))}}),t("success","none",k("noumena.container.tool_delete.success")),i=!0}catch(c){let s="Unknown";c instanceof Error&&(s=c.message),ye(new Error(s),{tags:{section:"removeToolFromNoumLayoutMutation"}}),i=!1}return i},[t,a]);return{loading:o,removeToolFromNoumLayoutHelper:r}}function zt(){const{addToast:t}=ne(),[a,{loading:o}]=wn(),r=l.useCallback(async(n,d)=>{let i;try{await a({variables:{input:d},update:(c,{data:s})=>{if(!s||!s.updateNoumLayoutSection)return;const p={id:n,editorV2Enabled:!0,status:lt.Unpublished},h=c.readQuery({query:Ce,variables:p});if(!h)return;const{getSpaceById:u}=h;if(!u)return;const b=ve.cloneDeep(u);c.writeQuery({query:Ce,variables:p,data:{getSpaceById:b}})}}),i=!0}catch(c){let s="Unknown";c instanceof Error&&(s=c.message),t("error","none",s),ye(new Error(s),{tags:{section:"updateNoumLayoutSectionMutation"}}),i=!1}return i},[t,a]);return{loading:o,updateNoumSectionHelper:r}}function za(){const[t,{loading:a}]=Nn(),o=l.useCallback(async r=>{let n;try{await t({variables:{ID:r}}),n=!0}catch(d){let i="Unknown";d instanceof Error&&(i=d.message),ye(new Error(i),{tags:{section:"noumLayoutAsDraftMutation"}}),n=!1}return n},[t]);return{loading:a,noumLayoutAsDraftHelper:o}}function Fa(){const[t,{loading:a}]=Mn(),o=l.useCallback(async r=>{let n;try{await t({variables:{ID:r}}),n=!0}catch(d){let i="Unknown";d instanceof Error&&(i=d.message),ye(new Error(i),{tags:{section:"cancelNoumLayoutChangesMutation"}}),n=!1}return n},[t]);return{loading:a,cancelNoumLayoutChangesHelper:o}}function Ei(){const{addToast:t}=ne(),a=l.useCallback(i=>{t("error","none",`${k("noumena.toast_error.text")}: ${i}`)},[t]),o=l.useCallback(()=>{t("success","icon",`${k("noumena.chamber_edit.permission.save_success_message")}`)},[t]),[r,{loading:n}]=In(),d=l.useCallback(async i=>{await r({variables:{input:i},onError:({networkError:c=null,graphQLErrors:s=[]})=>{const[p]=s;a((p==null?void 0:p.message)??c),ye(new Error((p==null?void 0:p.message)??c),{tags:{section:"updateConnectionPermissionMutation"}})},onCompleted:()=>{o()}})},[r,a,o]);return{loading:n,updateConnectionPermissionHelper:d}}function wi(){const{addToast:t}=ne(),{flags:a}=Ee(),o=l.useCallback(c=>{t("error","none",`${k("noumena.toast_error.text")}: ${c}`)},[t]),r=l.useCallback(c=>{t("error","none",`This Noum is ${c} by Admin`)},[t]),n=l.useCallback(()=>{t("error","none",`${k("noumena.money.myplans.handleExpiredNoum")}`)},[t]),[d]=Dn();return{checkChamberCanBePublished:l.useCallback(async(c,s,p,h)=>{a.paymentSubscriptions&&c?await d({fetchPolicy:"network-only",variables:{noumDetailInput:{chamber_id:c}},onError:({networkError:u=null,graphQLErrors:b=[]})=>{const[f]=b;o((f==null?void 0:f.message)??u),ye(new Error((f==null?void 0:f.message)??u),{tags:{section:"gqlGetNoumTransactionFeeDetails"}})},onCompleted:u=>{var b,f,g,C;switch((b=u==null?void 0:u.getNoumTransactionFeeDetails[0])==null?void 0:b.status){case tt.Suspended:r((f=u==null?void 0:u.getNoumTransactionFeeDetails[0])==null?void 0:f.status);break;case tt.Inactive:r((g=u==null?void 0:u.getNoumTransactionFeeDetails[0])==null?void 0:g.status);break;case tt.Active:(C=u==null?void 0:u.getNoumTransactionFeeDetails[0])!=null&&C.is_publishable?s():p(!0);break;case tt.Delinquent:n();break;case tt.Archived:n();break;default:h(),p(!0);break}}}):s()},[a.paymentSubscriptions,d,n,o,r])}}const $a=({onClick:t,iconSize:a=16})=>e(Fo,{"aria-label":"add_content","data-title":k("noumena.noum_editor.add_section"),onClick:o=>t?t():o.stopPropagation(),"data-test":"AddSectionComponent-AddSectionComponentWrapper",children:e($o,{"data-test":"AddSectionComponent-CenterIcon",children:e(j,{name:"plus_icon",size:a,"data-test":"AddSectionComponent-Icon"})})}),Ni=({name:t,size:a,text:o,isDisabled:r,isComingSoon:n,toolTipText:d,onClick:i,childIndex:c})=>m(Uo,{disabled:r,onClick:i,"data-testid":`ToolboxItemwrapper-${t}`,"data-test":"ToolboxItem-ToolboxItemWrapper",children:[d&&e(Vo,{childIndex:c,className:"toolbox-tooltip",font:"systemInfo-s",colorToken:"--text-tooltip-neutral-alt-default","data-test":"ToolboxItem-ToolTip",children:d}),e(j,{name:t,size:a,color:r||n?"--icon-button-neutral-disabled":"--icon-button-neutral-default","data-test":"ToolboxItem-Icon"}),m(jo,{"data-test":"ToolboxItem-ToolboxItemTextContainer",children:[e(qo,{overflow:"ellipsis",font:"body-m",isDisabled:r||!!n,"data-test":"ToolboxItem-ToolboxItemText",children:o}),!!n&&e(Ko,{isDisabled:r||!!n,"data-test":"ToolboxItem-ToolboxItemComingSoonText",children:k("noumena.comingVerySoon")})]})]}),Mi=()=>m(Yo,{"data-test":"DisbledToolTipSubWallet-SubWalletDisabledToolTip",children:[m(P,{font:"footnote",colorToken:"--text-tooltip-neutral-alt-default","data-test":"DisbledToolTipSubWallet-TSpan",children:[k("noumena.noumEditorv2.subwallet.cannot_be_created_text1")," "]}),m(P,{font:"footnote-bold",colorToken:"--text-tooltip-neutral-alt-default","data-test":"DisbledToolTipSubWallet-TSpan",children:[k("noumena.noumEditorv2.subwallet.cannot_be_created_text2")," "]}),m(P,{font:"footnote",colorToken:"--text-tooltip-neutral-alt-default","data-test":"DisbledToolTipSubWallet-TSpan",children:[k("noumena.noumEditorv2.subwallet.cannot_be_created_text3")," "]}),m(P,{font:"footnote-bold",colorToken:"--text-tooltip-neutral-alt-default","data-test":"DisbledToolTipSubWallet-TSpan",children:[k("noumena.noumEditorv2.subwallet.cannot_be_created_text4")," "]}),e(P,{font:"footnote",colorToken:"--text-tooltip-neutral-alt-default","data-test":"DisbledToolTipSubWallet-TSpan",children:k("noumena.noumEditorv2.subwallet.cannot_be_created_text5")})]}),Ii=({activeTab:t,handleSelectElementType:a})=>{const{addToast:o}=ne(),{listOfOptionsV2:r}=Eo(t.group),{hasWalletElement:n}=Z(),{walletStatus:d}=wo(),i=()=>{s(!1)},[c,s]=l.useState(!1),p={},h=b=>{p[b]=!0;const f=setTimeout(()=>{p[b]=!1,clearInterval(f)},3600)},u=b=>{if(!b.isComingSoon){if(b.disabled){if(p[b.type])return;switch(b.type){case V.Wallet:o("primary","icon",Ut.includes(d)?`${k("noumena.chambers.toolbox.element_exist_first")} ${b.text} ${k("noumena.chambers.toolbox.element_exist_last")}`:`${k("noumena.noumEditorv2.subwallet.cannot_be_created_text")}`);break;default:o("primary","icon",`${k("noumena.chambers.toolbox.element_exist_first")} ${b.text} ${k("noumena.chambers.toolbox.element_exist_last")}`)}h(b.type);return}if(a){if(b.type===V.Wallet&&n){o("error","none",k("noumena.chambers.toolbox.subwaleet_element_exists"));return}b.type===V.Wallet&&!n?s(!0):a(b.type)}}};return m(Go,{"data-test":"ToolboxTabContent-ToolboxTabContentWrapper",children:[r.length>0&&e(H,{children:r.map(b=>b.items.length>0&&m(l.Fragment,{children:[e(Pt,{"data-content":b.groupName,isWithText:t.group==="all","data-test":"ToolboxTabContent-Separator"}),e(Xo,{"data-test":"ToolboxTabContent-ToolboxItemsRow",children:b.items.map((f,g)=>e(Ni,{toolTipText:f.type===V.Wallet&&!Ut.includes(d)?e(Mi,{"data-test":"ToolboxTabContent-DisbleDToolTipSubWallet"}):f.toolTipText,name:f.name,size:f.size,text:f.text,isDisabled:f.disabled,isComingSoon:f.isComingSoon,onClick:()=>u(f),childIndex:g,"data-test":"ToolboxTabContent-ToolboxItem"},f.type))})]},b.groupName))}),e(Qo,{isOpen:c,handleClose:i,handleSelectElementType:a,"data-test":"ToolboxTabContent-NoumWalletCreateModal"})]})},Ua=({spaceId:t,columnId:a,handleSelectElementType:o,position:r=1,baseElementId:n,sectionId:d})=>{const{handleEditModal:i,setsectionSideBarOptions:c,sections:s,space:p}=Z(),[h,u]=l.useState(nt[0].id),[b,f]=l.useState(nt[0]),g=l.useCallback(y=>{y&&y!==h&&u(y)},[h]),C=l.useMemo(()=>nt.filter(y=>!((p==null?void 0:p.type)===ke.Home&&y.group==="finance")).map(y=>({...y,labelSize:"auto"})),[p==null?void 0:p.type]),_=l.useMemo(()=>{var y;return((y=s.find(v=>v._id===d))==null?void 0:y.background)===!1},[d,s]);l.useEffect(()=>{const y=nt.find(v=>v.id===h);f(y||nt[0])},[h]);const{addNoumLayoutToolHelper:T,loading:E}=Si(),{updateNoumSectionHelper:x}=zt(),w=l.useCallback(async y=>{if(t){const v={elementType:y,bodyContentType:U.getBodyContentTypeFromElementType(y),columnId:a,position:Math.round(r)};(y===V.Image||y===V.Video)&&(v.meta={percentageSize:30,align:De.CENTER});const I=await T(t,v,n,r);if(I){if(_&&(c==null||c({sectionBackgroud:{id:d,background:!0}}),await x(t,{sectionId:d,background:!0})),E||o(),y===V.Image||y===V.Video)return;i==null||i(ae.TOOL_TYPE,(I==null?void 0:I._id)||"",I)}}},[t,a,r,T,n,E,i,_,o,c,d,x]);return m(Zo,{"data-test":"Toolbox-ToolboxWrapper",children:[E&&e(Jo,{"data-test":"Toolbox-ToolboxLoader",children:e(be,{"data-test":"Toolbox-Spinner"})}),e(ei,{"data-test":"Toolbox-ToolboxTabs",children:e(it,{onChange:g,inputList:C,selectedId:h,mode:"isBackground",isWithoutImage:!0,fontSize:"--font-input-small-size","data-test":"Toolbox-BasicChipsTabsForm"})}),e(Ii,{handleSelectElementType:w,activeTab:b,"data-test":"Toolbox-ToolboxTabContent"})]})},Di=({spaceId:t,columnId:a,isOpen:o=!1,onClose:r,position:n=1,baseElementId:d})=>{const[i,c]=l.useState(o),s=l.useCallback(()=>{c(!1),r()},[r]);return e(Rt,{width:500,offsetY:68,isOpen:i,onClose:()=>{c(!1),r()},renderPopoverContent:()=>e(Ua,{spaceId:t||"",handleSelectElementType:s,columnId:a||"",position:n,baseElementId:d,"data-test":"AddToolPopover-Toolbox"}),renderTargetContent:()=>e($a,{onClick:()=>c(!0),"data-test":"AddToolPopover-AddSectionComponent"}),"data-test":"AddToolPopover-PopoverWrapper"})},Pi={maxWidth:"30em"},Va=l.memo(({noumName:t,isOpen:a,handleClose:o,onArchive:r})=>{const{t:n}=G();return m(oe,{isFullScreen:!1,testId:"chamberArchiveModal",open:a,onClose:o,style:Pi,size:ue.S,disableBackdropClick:!0,"data-test":"ChamberArchiveModal-Modal",children:[e(ie,{isFullScreen:!1,"data-test":"ChamberArchiveModal-ModalHeader",children:n("noumena.chamber_edit.archive.title")}),e(re,{isFullScreen:!1,"data-test":"ChamberArchiveModal-ModalBody",children:e(P,{colorToken:"--text-modal-neutral-default",font:"body-l",textAlign:"center","data-test":"ChamberArchiveModal-TSpan",children:n("noumena.chamber.edit.archive_description").replace("{0}",t)})}),m(me,{isFullScreen:!1,flexDirection:"column",gap:16,"data-test":"ChamberArchiveModal-ModalFooter",children:[e(Zt,{primary:!0,intent:"negative",onClick:r,children:n("noumena.chamber_edit.archive")}),e(Zt,{tertiary:!0,onClick:o,children:n("noumena.close")})]})]})}),ja=l.memo(t=>{const{t:a}=G();return m(oe,{testId:"testChamberEditMode",open:t.isOpen,onClose:t.handleClose,size:ue.S,disableBackdropClick:!0,"data-test":"ChamberEditMode-Modal",children:[e(ie,{"data-testid":"titleChamberEditMode","data-test":"ChamberEditMode-ModalHeader",children:a("noumena.container.chamber_edit_mode.title")}),m(re,{align:"center","data-test":"ChamberEditMode-ModalBody",children:[e(P,{"data-testid":"bodyChamberEditMode",font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"ChamberEditMode-TSpan",children:a("noumena.container.chamber_edit_mode.body")}),e(Q,{height:12,"data-test":"ChamberEditMode-Spacer"}),e(P,{colorToken:"—text-modal-header-neutral-default","data-testid":"bodyRememberChamberEditMode",font:"body-l-bold",textAlign:"center","data-test":"ChamberEditMode-TSpan",children:a("noumena.container.chamber_edit_mode.body.remember")})]}),e(me,{flexDirection:"column","data-test":"ChamberEditMode-ModalFooter",children:e(R,{"data-testid":"closeChamberEditMode",primary:!0,size:"full",onClick:t.handleMarkAsVisited,loading:t.markSpaceAsEditedLoading,"data-test":"ChamberEditMode-Button",children:a("noumena.container.chamber_edit_mode.start")})})]})});S.div`
  padding: 20px;
  @media (max-width: ${Ye.MOBILE_L}) {
    position: initial;
    padding: unset;
  }
`;const Ai=S.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`,Bi=S.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${Ye.MOBILE_L}) {
    height: calc(100vh - 225px);
  }
`,Li=S(P)`
  text-align: center;
`,Oi=S.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  min-height: 86px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`,Hi=S.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
`,Wi=S.div`
  display: flex;
  flex-direction: column;
`,ta=S(P)`
  width: 100%;
  max-width: 100%;
  ${Pn}
  word-break: break-word;
  white-space: break-spaces;
`,Ri=S.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`,zi=S(P)`
  margin-right: 12px;
`,aa=S(R)`
  width: 100%;
`,Fi=({isOpen:t,handleClose:a,handleConfirm:o,count:r})=>m(oe,{testId:"change-permissions-confirmation-modal",open:t,onClose:a,size:ue.S,"data-test":"ChangePermissionsConfirmationModal-Modal",children:[e(ie,{"data-test":"ChangePermissionsConfirmationModal-ModalHeader",children:k("noumena.link_noums.change_permissions_modal.title")}),e(re,{"data-test":"ChangePermissionsConfirmationModal-ModalBody",children:e(P,{font:"body-l",textAlign:"center",colorToken:"--text-modal-neutral-default","data-test":"ChangePermissionsConfirmationModal-TSpan",children:k("noumena.link_noums.change_permissions_modal.description",{count:r})})}),m(me,{flexDirection:"column",gap:16,"data-test":"ChangePermissionsConfirmationModal-ModalFooter",children:[e(aa,{primary:!0,onClick:o,"data-test":"ChangePermissionsConfirmationModal-ModalButtons",children:k("noumena.link_noums.change_permissions_modal.button.text")}),e(aa,{tertiary:!0,onClick:a,"data-test":"ChangePermissionsConfirmationModal-ModalButtons",children:k("noumena.cancel")})]})]}),$i=[{key:We(),label:k("noumena.chamber_edit.permission.guest"),type:"value",value:ot.Guest,description:k("noumena.chamber_edit.permission.guest_description"),labelColor:"--text-tablecell-header-neutral-highlighted"},{key:We(),label:k("noumena.chamber_edit.permission.favorite"),type:"value",value:ot.Favorite,description:k("noumena.chamber_edit.permission.favorite_description"),labelColor:"--text-tablecell-header-neutral-highlighted"},{key:We(),label:k("noumena.chamber_edit.permission.disconnect"),type:"value",value:ot.Disconnect,description:k("noumena.chamber_edit.permission.disconnect_description"),labelColor:"--text-tablecell-header-danger-primary-highlighted"}],Ui=({user:t,currentPermission:a,onChangePermission:o,isNonMember:r=!1})=>{const{t:n}=G(),[d,i]=l.useState(!1),c=we(),s=l.useMemo(()=>a||ot.Guest,[a]),p=l.useMemo(()=>c.width<768,[c]),h=l.useMemo(()=>{const b=[];return $i.forEach(f=>{r&&f.value===ot.Favorite||b.push({...f,selected:s===f.value})}),b},[r,s]),u=l.useCallback(b=>{o(b.value)},[o]);return m(Oi,{"data-test":"ChamberConnectedUser-UserWrapper",children:[e(ca,{url:ua.getProfilePicture(t)??"","data-test":"ChamberConnectedUser-Avatar"}),m(Hi,{"data-test":"ChamberConnectedUser-UserBody",children:[m(Wi,{"data-test":"ChamberConnectedUser-UserName",children:[e(P,{font:"body-l-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"ChamberConnectedUser-TSpan",children:An(t.firstName,t.middleName,t.lastName)}),r?e(ta,{font:"body-m",colorToken:"--text-tablecell-body-neutral-default","data-test":"ChamberConnectedUser-UserTitle",children:n("noumena.chamber_edit.permission.non_member")}):e(H,{children:!!t.title&&e(ta,{font:"body-m",colorToken:"--text-tablecell-body-neutral-default","data-test":"ChamberConnectedUser-UserTitle",children:t.title})})]}),e(Ge,{hideIcons:!0,closeOnSelect:!0,placement:"bottom-end",options:h,leftIcon:e(j,{name:"tick_m",size:24,color:"--icon-tablecell-neutral-highlighted","data-test":"ChamberConnectedUser-Icon"}),containerWidth:p?"100%":"440px",onSelectOption:u,onOpen:()=>i(!0),onClose:()=>i(!1),usePortal:!0,calRefTop:!0,isAnimation:!1,usePopStyle:!0,minHeight:"fit-content",observerMinHeight:"0px","data-test":"ChamberConnectedUser-Dropdown",children:({targetProps:b,targetRef:f,toggle:g})=>m(Ri,{ref:f,...b,onClick:g,"data-test":"ChamberConnectedUser-DropdownPicker",children:[e(zi,{font:"body-m-bold",colorToken:"--text-tablecell-body-neutral-default","data-test":"ChamberConnectedUser-PickedPermission",children:n(`noumena.chamber_edit.permission.${s.toLowerCase()}`)}),e(j,{name:`chevron_small_${d?"up":"down"}_m`,size:16,color:"--icon-tablecell-neutral-highlighted","data-test":"ChamberConnectedUser-Icon"})]})})]})]})},Vi=l.memo(({spaceId:t,connections:a,onChangePermission:o,onClose:r,onInvite:n})=>{const{t:d}=G();return a!=null&&a.length?e(H,{children:a.map(i=>{var s,p,h,u,b,f,g,C,_,T,E;const c=(i==null?void 0:i.type)===Bn.Connection?((s=i==null?void 0:i.requestFrom)==null?void 0:s._id)===t?(p=i==null?void 0:i.requestTo)==null?void 0:p.uid:(h=i==null?void 0:i.requestFrom)==null?void 0:h.uid:(u=i==null?void 0:i.requestTo)==null?void 0:u.uid;return i&&c&&!ua.isInactive(c)&&e(Ui,{user:c,currentPermission:((b=i==null?void 0:i.draft)==null?void 0:b.permission)||(i==null?void 0:i.permission),onChangePermission:x=>o(i._id,x),isNonMember:((g=(f=i==null?void 0:i.requestTo)==null?void 0:f.uid)==null?void 0:g.userStatus)==="UNREGISTERED"||((_=(C=i==null?void 0:i.requestTo)==null?void 0:C.uid)==null?void 0:_.userStatus)==="REGISTERED","data-test":"ChamberConnectedUsers-ChamberConnectedUser"},`${c._id}-${(E=(T=i==null?void 0:i.requestTo)==null?void 0:T.uid)==null?void 0:E._id}`)})}):e(Ai,{"data-testid":"chamber-permission-no-user-wrap","data-test":"ChamberConnectedUsers-NoUser",children:m(Bi,{"data-test":"ChamberConnectedUsers-NoUserWrapper",children:[e(j,{color:"--icon-placeholder-neutral-default",name:"groups_xxxxl",size:96,"data-test":"ChamberConnectedUsers-Icon"}),e(Li,{font:"body-l",colorToken:"--text-placeholder-neutral-default","data-test":"ChamberConnectedUsers-NoUserDescription",children:d("noumena.chamber_edit.permission.no_user")}),e(Q,{height:16,"data-test":"ChamberConnectedUsers-Spacer"}),e(R,{secondary:!0,size:"small",onClick:()=>{r(),n()},"data-test":"ChamberConnectedUsers-Button",children:d("noumena.chamber_edit.permission.invite_users")})]})})}),qa=({spaceId:t,connections:a,loading:o,isOpen:r,onClose:n,onInvite:d,linkedCount:i,infiniteState:c,fetchMoreConnections:s})=>{const[p,h]=l.useState(!1),{t:u}=G(),b=we(),[f,g]=l.useState([]),[C,_]=l.useState({}),{updateConnectionPermissionHelper:T,loading:E}=Ei(),x=l.useMemo(()=>(a==null?void 0:a.filter(A=>A.status===Ln.Approved))||[],[a]);l.useEffect(()=>{o||g(A=>x.map(B=>(A==null?void 0:A.find(N=>(N==null?void 0:N._id)===(B==null?void 0:B._id)))||B))},[x,o]),l.useEffect(()=>{r||g(x)},[r,x]);const w=l.useMemo(()=>b.width<768,[b]),y=l.useMemo(()=>f==null?void 0:f.length,[f]),v=l.useMemo(()=>ve.isEqual(x,f),[f,x]),I=l.useCallback((A,B)=>{if(!f||!A)return;const N=f.findIndex(M=>A===(M==null?void 0:M._id));g(M=>{const D=[...M||[]];return D[N]={...D[N],draft:{permission:B}},D}),_(M=>({...M,[A]:B}))},[f]),O=l.useCallback(async()=>{const A=Object.entries(C).map(([B,N])=>({connectionId:B,permission:N}));await T({connectionsPermissions:A}),_({}),n(),h(!1)},[n,C,T]);return p&&i?e(Fi,{isOpen:p,handleConfirm:O,handleClose:()=>{h(!1)},count:i,"data-test":"ChamberPermissionModal-ChangePermissionsConfirmationModal"}):m(oe,{testId:"chamber-permission-modal",open:r,onClose:n,enableAnimation:!0,enableCloseButton:!0,size:ue.L,disableBackdropClick:!0,"data-test":"ChamberPermissionModal-Modal",children:[e(ie,{justifyContent:w?"flex-start":"center","data-test":"ChamberPermissionModal-ModalHeader",children:u("noumena.chamber_edit.permission.title")}),m(re,{mobileFlex:!0,maxHeight:"540px","data-test":"ChamberPermissionModal-ModalBody",children:[e(P,{colorToken:"--text-modal-neutral-default",font:"body-m","data-test":"ChamberPermissionModal-TSpan",children:u("noumena.chamber_edit.permission.description")}),e(Q,{height:"16px","data-test":"ChamberPermissionModal-Spacer"}),e(ma,{onFetchMore:s,status:c,scrollbarWidth:0,isSpinnerRelative:!0,width:"100%","data-test":"ChamberPermissionModal-Infinite",children:e(Vi,{spaceId:t,connections:f||[],loading:o,onChangePermission:I,onClose:n,onInvite:d,"data-test":"ChamberPermissionModal-ChamberConnectedUsers"})})]}),e(me,{justifyContent:y?"space-between":"center",gap:16,"data-test":"ChamberPermissionModal-ModalFooter",children:(y||o)&&m(H,{children:[e(R,{tertiary:!0,size:"full",onClick:n,"data-test":"ChamberPermissionModal-Button",children:u("noumena.chamber_edit.permission.cancel")}),e(R,{primary:!0,softDisabled:v,loading:E,size:"full",onClick:()=>{i?h(!0):O()},"data-test":"ChamberPermissionModal-Button",children:u("noumena.chamber_edit.permission.save_changes")})]})})]})};S.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${ge.TABLET_MIN}) {
    width: 704px;
    max-height: 728px;
    padding: 0;
  }
  @media (min-width: ${ge.LAPTOP_MIN}) {
    width: 704px;
  }
  @media (max-width: ${Ye.MOBILE_XL}) {
    ${({isIPhone:t})=>t?"margin-top: 25px; height: 95vh;":""};
  }
  @media (max-width: ${Ye.TABLET}) {
    width: 100vw;
  }
`;const ji=S.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  @media (min-width: ${ge.TABLET_MIN}) {
    flex-direction: row-reverse;
  }
  @media (min-width: ${ge.LAPTOP_MIN}) {
    flex-direction: row;
  }
`;S.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
  @media (min-width: ${ge.TABLET_MAX}) {
    flex-direction: ${({left:t})=>t?"row":"row-reverse"};
  }
`;const Ft=S(P)`
  white-space: pre-line;
`,qi=S.div`
  display: flex;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  ${On};
  justify-content: ${({justifyContent:t})=>t?"center":void 0};
  flex-direction: column;
  @media (min-width: ${ge.MOBILE_L_MAX}) {
    justify-content: flex-start;
  }
`;S(qi)`
  @media (min-width: ${ge.LAPTOP_MIN}) {
    justify-content: space-between;
  }
  @media (max-width: ${ge.MOBILE_M_MIN}) {
    padding-top: 100px;
  }
`;const Ki=S.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 16px;
`;S.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 14px;
  height: 100%;
  overflow-y: scroll;
  align-self: stretch;
  flex-wrap: wrap;
  width: 100%;
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  @media (max-width: ${ge.MOBILE_L_MAX}) {
    justify-content: center;
  }
`;const Yi=S.div`
  width: 343px;
`,Gi=S(P)`
  text-align: center;
  white-space: pre-line;
`,Xi=S.div`
  display: flex;
  align-items: center;
  justify-content: ${t=>t.justifyCenter?"center":"space-between"};
  flex-direction: ${({flexDirection:t})=>t||"row"};
  gap: 16px;
  width: 100%;
  @media (min-width: ${ge.MOBILE_L_MAX}) {
    margin-top: 16px;
  }
  @media (max-width: ${ge.MOBILE_L_MAX}) {
    margin-bottom: 24px;
  }
`,rt=S(R)`
  flex: 1;
`,Qi=S.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  align-items: center;
  cursor: pointer;
`,Zi=S.div`
  height: 1px;
  width: 100%;
  background-color: var(--bg-separator-neutral-default);
`,Ji=S.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;S(ji)`
  width: 100%;
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: center;
`;const er=S(Ft)``;S.div`
  display: flex;
  height: 255px;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: ${({padding:t})=>t?`${t}px`:"30px"};
`;S.div`
  display: flex;
  height: 255px;
  width: 279px;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: ${({padding:t})=>t?`${t}px`:"30px"};
`;const tr=[{id:fe.EntireCommunity,heading:"noumena.chamber_edit.new_broadcasting.list_header_1",description:"noumena.chamber_edit.new_broadcasting.list_description_1"},{id:fe.MyCircle,heading:"noumena.chamber_edit.new_broadcasting.list_header_2",description:"noumena.chamber_edit.new_broadcasting.list_description_2"},{id:fe.MyNoums,heading:"noumena.chamber_edit.new_broadcasting.list_header_3",description:"noumena.chamber_edit.new_broadcasting.list_description_3"},{id:fe.FollowersOfMyNoums,heading:"noumena.chamber_edit.new_broadcasting.list_header_4",description:"noumena.chamber_edit.new_broadcasting.list_description_4"}],Ka=({isOpen:t,onClose:a,noumId:o,noumType:r,onSuccessfulCampaignCreation:n})=>{const{addToast:d}=ne(),{t:i}=G(),c=!!(window!=null&&window.navigator.userAgent.match(/iPhone/i)),[s,{loading:p}]=Hn({onCompleted:_=>{_.createProjectNoumCampaign&&(a(),n&&n(),d("success","icon",i("noumena.chamber_edit.new_broadcasting.started")))},onError:_=>{d("error","none",_.message)}}),[h,u]=l.useState(tr.map(_=>({..._,checked:!1,show:!1})));l.useEffect(()=>{const _=h.map(T=>({...T,show:!(r==="SECRET"&&T.id===fe.EntireCommunity)}));u(_)},[r]);const b=l.useMemo(()=>{const _=h.find(T=>T.id===fe.EntireCommunity);return _&&_.checked},[h]),f=l.useMemo(()=>h.every(_=>!_.checked),[h]),g=_=>()=>{if(b&&_!==fe.EntireCommunity)return;let T=[...h];const E=T.findIndex(w=>w.id===fe.EntireCommunity),x=T[E];if(_===fe.EntireCommunity)T=T.map(w=>({...w,checked:!1})),T.splice(E,1,{...x,checked:!x.checked});else{T.splice(E,1,{...x,checked:!1});const w=T.findIndex(y=>y.id===_);w>-1&&T.splice(w,1,{...T[w],id:_,checked:!T[w].checked})}u(T)},C=()=>{s({variables:{spaceId:o,targets:h.filter(_=>_.checked).map(_=>_.id)}})};return m(oe,{testId:"chamber-campaign-create-modal",open:t,onClose:a,size:ue.XL,hasBackButton:!0,disableBackdropClick:!0,closeButtonStyles:{enforceLeft:!0},"data-test":"CreateBroadcastModal-Modal",children:[e(ie,{"data-test":"CreateBroadcastModal-ModalHeader",children:i("noumena.chamber_edit.new_broadcasting.title")}),m(re,{loading:p,loadingDescription:i("noumena.chamber_edit.new_broadcasting.loading_description"),"data-test":"CreateBroadcastModal-ModalBody",children:[e(Ft,{colorToken:"--text-modal-neutral-default",font:"body-l",textAlign:"left",children:i("noumena.chamber_edit.new_broadcasting.description")}),h.map(({heading:_,description:T,id:E,checked:x,show:w},y)=>w?m(yo.Fragment,{children:[m(Qi,{children:[m(Ji,{onClick:g(E),children:[e(P,{font:"body-l-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"CreateBroadcastModal-TSpan",children:i(_)}),e(er,{colorToken:"--text-tablecell-body-neutral-default",font:"body-m",children:i(T)})]}),e(Wn,{disableClick:E!==fe.EntireCommunity?b:void 0,onChange:g(E),icon:e(j,{name:"tick_m",size:x?24:0,color:"--icon-checkbox-neutral-alt-default","data-test":"CreateBroadcastModal-Icon"}),isChecked:x,"data-test":"CreateBroadcastModal-Checkbox"})]}),y!==h.length-1&&e(Zi,{})]},E):void 0)]}),m(me,{loading:p,"data-test":"CreateBroadcastModal-ModalFooter",children:[m(Xi,{children:[e(rt,{tertiary:!0,testId:"chamber-campaign-cancel-action",onClick:a,children:i("noumena.chamber_edit.new_broadcasting.cancel_action")}),e(rt,{testId:"chamber-campaign-create-action",primary:!0,softDisabled:f,onClick:C,children:i("noumena.chamber_edit.new_broadcasting.complete_action")})]}),c?e(Q,{height:16,"data-test":"CreateBroadcastModal-Spacer"}):void 0]})]})};Lt`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 8px;
  height: 22px;
  font-weight: 600;
  font-size: 12px;
  text-align: center;
`;S.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  margin: 0 auto;
  font-family: var(--font-family);
`;S.div`
  display: flex;
  height: 254px;
`;const ar=S.div`
  font-family: var(--font-family);
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 343px;
  background: var(--bg-card-neutral-alt-default);
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 12px;
  box-sizing: border-box;
  cursor: pointer;
  gap: 12px;

  @media (min-width: ${Ye.MOBILE_MAX}) and (max-width: ${Ye.TABLET_L}) {
    width: 359.5px;
  }
`,nr=S.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;

  flex: none;
  order: 3;
  align-self: stretch;
  flex-grow: 0;
  z-index: 3;

  & :last-child {
    border: none;
  }
`,or=S.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0px 0px 8px;
  height: 27px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`,ir=S.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  row-gap: 4px;
  min-height: 64px;
  width: 100%;
`,rr=S.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`,na=S.div`
  display: flex;
  align-items: center;
  justify-content: ${({spaceBetween:t})=>t?"space-between":"flex-start"};
`,lr=S.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
`,dr=S.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  z-index: 2;
`;S.div`
  height: 56px;
  background: ${({bgColor:t})=>t};
  border-radius: 12px;
  width: calc(100% -16px);
  box-sizing: content-box;
`;S.div`
  background-color: ${({bgColor:t})=>t};
  color: ${({color:t})=>t};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 8px;
  min-height: 22px;
  font-weight: var(--font-body-small-bold-weight);
  font-size: 12px;
  text-align: center;
`;var Ya=(t=>(t.INIVITES_SENT="invitesSent",t.VIEWS="views",t.CLICKS_TO_NOUMS="clicksToNoums",t.CONNECTIONS_MADE="connectionsMade",t.CONNECTIONS_DECLINED="connectionsDeclined",t.FOLLOWERS_GAINED="followersGained",t))(Ya||{});const{CLICKS_TO_NOUMS:sr,CONNECTIONS_DECLINED:cr,CONNECTIONS_MADE:ur,FOLLOWERS_GAINED:mr,INIVITES_SENT:pr,VIEWS:hr}=Ya,Ve="noumena.chamber_edit.broadcasting.campaign.table.label",br=[{key:"invite-cancel",label:"Cancel Campaign",type:"value",description:"",value:"Cancel",labelColor:"--text-tablecell-header-danger-primary-highlighted"}],gr=[{translationKey:`${Ve}.inivites_sent`,mapKey:pr},{translationKey:`${Ve}.views`,mapKey:hr},{translationKey:`${Ve}.clicks_to_noums`,mapKey:sr},{translationKey:`${Ve}.connections_made`,mapKey:ur},{translationKey:`${Ve}.connections_declined`,mapKey:cr},{translationKey:`${Ve}.followers_gained`,mapKey:mr}],fr=({onDelete:t})=>e(H,{children:e("div",{"data-testid":"campaign-actions-testid","data-test":"CampaignActions",children:e(Ge,{hideIcons:!0,closeOnSelect:!0,placement:"bottom-end",options:br,containerWidth:"auto",onSelectOption:t,usePortal:!1,calRefTop:!1,isAnimation:!1,usePopStyle:!0,observerMinHeight:"0","data-test":"CampaignActions-Dropdown",children:({targetProps:a,targetRef:o,toggle:r})=>e(Rn,{ref:o,...a,onClick:r,"data-test":"CampaignActions-DropdownPicker",children:e(j,{name:"more_m",size:24,color:"--icon-button-brand-primary-default","data-test":"CampaignActions-Icon"})})})})}),Cr=({status:t,id:a,selectBroadcast:o,onDelete:r,startedAt:n="",unformattedStartTime:d})=>{const i=l.useMemo(()=>t===gt.Active||t===gt.Refreshed,[t]),[c]=xi(i?d:"");return e(ir,{"data-testid":"campaign-header-testid","data-test":"CampaignHeader-CampaignHeaderContainer",children:m(rr,{"data-test":"CampaignHeader-CampaignHeaderTitleContainer",children:[m(na,{spaceBetween:!0,"data-test":"CampaignHeader-CampaignBodyContainer",children:[e(P,{font:"heading-xs-bold",colorToken:"--text-card-header-neutral-highlighted","data-test":"CampaignHeader-TSpan",children:n}),i&&e(fr,{onDelete:()=>{o(a),r()},"data-test":"CampaignHeader-CampaignActions"})]}),m(na,{spaceBetween:i,"data-test":"CampaignHeader-CampaignBodyContainer",children:[e(It,{tertiary:t===gt.Cancelled,success:i,"data-test":"CampaignHeader-Tag",children:e(Re,{i18nKey:`noumena.chamber_edit.broadcasting.campaign.status.${t==null?void 0:t.toLowerCase()}`,"data-test":"CampaignHeader-Trans"})}),i?e(P,{font:"body-m",colorToken:"--text-body-neutral-default","data-test":"CampaignHeader-TSpan",children:k("noumena.broadcasting.countdown",{countDown:c})}):void 0]})]})})},yr=()=>m(dr,{"data-testid":"campaign-filters-testid","data-test":"CampaignFilters-CampaignFiltersContainer",children:[e(Re,{i18nKey:"noumena.chamber_edit.broadcasting.campaign.label.filters",components:{note:e(P,{font:"footnote-bold",colorToken:"--text-card-neutral-default","data-test":"CampaignFilters-TSpan"})},"data-test":"CampaignFilters-Trans"}),m(lr,{"data-test":"CampaignFilters-CampaignFilterTabsContainer",children:[e(It,{tertiary:!0,"data-test":"CampaignFilters-Tag",children:e(Re,{i18nKey:"noumena.chamber_edit.broadcasting.campaign.tabs.my_connections","data-test":"CampaignFilters-Trans"})}),e(It,{tertiary:!0,"data-test":"CampaignFilters-Tag",children:e(Re,{i18nKey:"noumena.chamber_edit.broadcasting.campaign.tabs.followers_of_my_noums","data-test":"CampaignFilters-Trans"})})]})]}),xr=({property:t,value:a})=>e(H,{children:m(or,{"data-testid":"campaign-summary-item-testid","data-test":"SummaryItem-CampaiginSummaryItem",children:[e(Re,{i18nKey:t,components:{note:e(P,{font:"footnote-bold",colorToken:"--text-body-neutral-default","data-test":"SummaryItem-TSpan"})},"data-test":"SummaryItem-Trans"}),e(P,{font:"footnote-bold",colorToken:"--text-body-neutral-highlighted","data-test":"SummaryItem-TSpan",children:a})]})}),_r=t=>e(nr,{"data-testid":"campaign-summary-container-testid","data-test":"CampaignSummary-CampaignSummaryContainer",children:gr.map(({translationKey:a,mapKey:o})=>e(xr,{property:a,value:t.status!==gt.Cancelled?t[o]??"-":"-","data-test":`CampaignSummary-SummaryItem-${o}`},o))});function Sr(t){const{id:a,status:o,startedAt:r,onDelete:n,selectBroadcast:d,unformattedStartTime:i}=t;return m(ar,{"data-testid":"campaign-testid","data-test":`CampaignContainer-${a}`,children:[e(Cr,{id:a,status:o,startedAt:r,onDelete:n,selectBroadcast:d,unformattedStartTime:i,"data-test":"CampaignHeader"}),e(yr,{"data-test":"CampaignFilters"}),e(_r,{...t,"data-test":"CampaignSummary"})]},a)}const Tr=({isOpen:t,onClose:a,campaignId:o,onRefetchCampaigns:r})=>{const{t:n}=G(),{addToast:d}=ne(),[i,{loading:c}]=zn({variables:{campaignId:o},onCompleted:s=>{s.cancelProjectNoumCampaign&&(r(),a(),d("primary","icon",n("noumena.chamber_edit.broadcasting.campaign.cancel_success")))},onError:s=>{d("error","none",s.message)}});return m(oe,{testId:"chamber-campaign-delete-modal",open:t,onClose:a,size:ue.S,disableBackdropClick:!0,"data-test":"DeleteChamberBroadcastModal-Modal",children:[e(ie,{"data-test":"DeleteChamberBroadcastModal-ModalHeader",children:n("noumena.chamber_edit.broadcasting.campaign.cancel")}),e(re,{loading:c,loadingDescription:n("noumena.chamber_edit.broadcasting.campaign.cancel.loading_description"),"data-test":"DeleteChamberBroadcastModal-ModalBody",children:e(P,{font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"DeleteChamberBroadcastModal-TSpan",children:n("noumena.chamber_edit.broadcasting.campaign.cancel_subheading")})}),m(me,{flexDirection:"column",gap:16,loading:c,"data-test":"DeleteChamberBroadcastModal-ModalFooter",children:[e(rt,{size:"full",intent:"negative",testId:"chamber-broadcast-cancel-btn",onClick:()=>i(),children:n("noumena.chamber_edit.broadcasting.campaign.cancel")}),e(rt,{size:"full",tertiary:!0,testId:"chamber-broadcast-cancel-no-btn",onClick:a,children:n("noumena.chamber_edit.broadcasting.campaign.dont_cancel")})]})]})},Ga=({isOpen:t,onClose:a,onCampaign:o,campaignsLoading:r,campaigns:n,fetchMoreCampaigns:d,infiniteState:i,onRefetchCampaigns:c})=>{const{t:s}=G(),[p,h]=l.useState(""),[u,b]=l.useState(!1),{width:f}=we(),g=l.useMemo(()=>f<768,[f]),C=l.useMemo(()=>f>=Ct.LAPTOP,[f]),_=()=>{a(),o()},T=()=>{b(!u)};return m(H,{children:[m(oe,{isFullScreen:!C,enableCloseButton:!0,testId:"chamber-broadcast-modal",open:t,onClose:a,size:ue.XL,disableBackdropClick:!0,"data-test":"ViewBroadcastModal-Modal",children:[e(ie,{action:n.length?e(R,{style:{marginLeft:C?"none":"auto"},secondary:!0,size:"small",onClick:_,testId:"chamber-broadcast-create-campaign-btn","data-test":"ViewBroadcastModal-Button",children:s("noumena.chamber_edit.broadcasting.start_action_small")}):void 0,isFullScreen:!C,flexDirection:C?"row-reverse":"row",justifyContent:C?"space-between":"initial",rightMobileContainer:!0,"data-test":"ViewBroadcastModal-ModalHeader",children:s("noumena.chamber_edit.broadcasting")}),e(Ft,{colorToken:"--text-modal-neutral-default",font:"body-l",style:{alignSelf:"center"},children:s("noumena.chamber_edit.broadcasting.description")}),e(Q,{height:"16px","data-test":"ViewBroadcastModal-Spacer"}),e(re,{isFullScreen:g,style:{paddingRight:0,paddingLeft:g?0:12},noFooter:!0,"data-test":"ViewBroadcastModal-ModalBody",children:!r&&(n!=null&&n.length)?m(ma,{onFetchMore:d,status:i,testId:"campaigns-container",paddingBottom:"15px",style:{flexWrap:"wrap",justifyContent:g?"center":void 0,width:"100%",overflow:"unset",flexDirection:"row",gap:14},"data-test":"ViewBroadcastModal-Infinite",children:[n.map(E=>l.createElement(Sr,{...E,key:E.id,onDelete:T,selectBroadcast:h,"data-test":"ViewBroadcastModal-Campaign"})),n.length===1&&C&&e(Yi,{})]}):e(H,{children:m(Ki,{"data-testid":"chamber-broadcast-no-broadcast",children:[e(j,{name:"megaphone_xxxl",size:80,color:"--icon-placeholder-neutral-default","data-test":"ViewBroadcastModal-Icon"}),m(Gi,{font:"body-l",colorToken:"--text-placeholder-neutral-default",children:[s("noumena.chamber_edit.broadcasting.no_campaign.para_1"),s("noumena.chamber_edit.broadcasting.no_campaign.para_2")]}),e(rt,{secondary:!0,size:"small",onClick:_,testId:"chamber-broadcast-create-btn",children:s("noumena.chamber_edit.broadcasting.start_action")})]})})})]}),e(Tr,{onRefetchCampaigns:c,campaignId:p,isOpen:u,onClose:T,"data-test":"ViewBroadcastModal-DeleteChamberBroadcastModal"})]})},Xa=({isOpen:t,handleClose:a,handleUnlinking:o,loading:r})=>m(oe,{testId:"unlink-archive-noum-modal",open:t,onClose:a,size:ue.S,disableBackdropClick:!0,"data-test":"UnlinkOnArchiveNoumModal-Modal",children:[e(ie,{"data-test":"UnlinkOnArchiveNoumModal-ModalHeader",children:k("noumena.link_archive_noums.Noum_is_linked")}),e(re,{isFullScreen:!1,style:{alignItems:"center"},"data-test":"UnlinkOnArchiveNoumModal-ModalBody",children:e(P,{font:"body-l",textAlign:"center",colorToken:"--text-modal-neutral-default","data-test":"UnlinkOnArchiveNoumModal-TSpan",children:k("noumena.link_archive_noums.description")})}),m(me,{flexDirection:"column",gap:16,"data-test":"UnlinkOnArchiveNoumModal-ModalFooter",children:[e(R,{testId:"enable-linking",size:"full",intent:"negative",disabled:r,onClick:o,"data-test":"UnlinkOnArchiveNoumModal-Button",children:k("noumena.link_archive_noums.Noum_unlink")})," ",e(R,{tertiary:!0,size:"full",testId:"cancel-linking",disabled:r,onClick:a,"data-test":"UnlinkOnArchiveNoumModal-Button",children:k("noumena.link_archive_noums.Noum_cancel")})]})]}),kr=S.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`,vr=S.div`
  padding: 12px 16px 0px;
  gap: 12px;
`,Er=S.div`
  border: solid 1px var(--border-card-neutral-highlighted);
  padding: 16px;
  gap: 16px;
  margin: 16px;
  border-radius: 16px;
  background-color: #e2eef1;
  color: var(--text-color);
  ${At}
  ${pa}
`,oa=S.img`
  min-width: 52px;
  width: 52px;
  height: 52px;
  border-radius: 12px;
`,wr=S.div`
  border: solid 1px var(--border-card-neutral-highlighted);
  padding: 16px;
  gap: 16px;
  margin: 16px;
  border-radius: 16px;
  background-color: #dff4df;
  display: flex;
  flex-direction: row-reverse;
  color: var(--text-color);
`;S.div`
  background-color: var(--background-color);
  color: var(--text-color);
  ${At}
`;S.div`
  margin: 16px;
  display: flex;
  align-self: flex-end;
`;const ia=S.div`
  border: solid 1px var(--border-card-neutral-highlighted);
  padding: 16px;
  gap: 16px;
  margin: 16px;
  border-radius: 16px;
  color: var(--text-color);
  ${At}
  ${pa}
`,Qa=({open:t,onClose:a,noumId:o,...r})=>{var w,y;const{t:n}=G(),{user:d}=yt(),[i,c]=l.useState(""),[s,p]=l.useState([]),{isDesktop:h}=ha(),[u,{loading:b}]=Fn({onCompleted:({getAdKeywords:v})=>{const{choices:I=[]}=v;if(!I.length)return;const O=(I[0].text||"").trim(),A=[...s];A.unshift({name:i,text:O}),p(A),c("")}}),f=l.useMemo(()=>xo({keyWord:_o().required("Can Not be empty")}).required(),[]),g=l.useCallback(v=>{c(v.currentTarget.value)},[c]),C=l.useCallback(()=>{b||u({variables:{promptText:i,options:{temperature:.5}}})},[u,i,b]),{register:_,formState:{errors:T}}=So({resolver:To(f)}),E=l.useMemo(()=>s.map(v=>{var I;return m("div",{"data-test":"NoumenaCopilot-searchHistoryList",children:[m(Er,{children:[e(oa,{src:Vt,alt:"addingUserAvatar"}),e(bt,{initialValue:v.text?v.text:"Not Found",editEnabled:!1,basicToolbar:!0,"data-test":"NoumenaCopilot-searchHistoryList-RichTextEditor"})]}),m(wr,{children:[e(oa,{src:((I=d==null?void 0:d.profile)==null?void 0:I.profilePicture)||Vt,alt:"addingUserAvatar"}),e(bt,{initialValue:v.name,editEnabled:!1,basicToolbar:!0,"data-test":"NoumenaCopilot-searchHistoryList-RichTextEditor"})]})]},We())}),[s,(w=d==null?void 0:d.profile)==null?void 0:w.profilePicture]),x=l.useCallback(v=>{i&&v.key==="Enter"&&C()},[i,C]);return e(H,{children:e(Bt,{placement:"right",showCloseButton:!0,enableAnimation:!0,nonBlockingModal:h,disableEscapeKeyDown:!0,isBackgroundOpacity:!h,height:"100%",padding:0,title:n("noumena.chamber_edit.noumena_copilot"),open:t,onClose:a,...r,actionButton:e(R,{primary:!0,size:"small",onClick:()=>{c(""),p([])},"data-test":"NoumenaCopilot-Button",children:"Clear"}),"data-test":"NoumenaCopilot-SideModal",children:m(kr,{children:[e(vr,{children:e(ba,{..._("keyWord",{required:{value:!0,message:n("noumena.email_login_form.valid_email.field_empty")},onChange:g}),value:i,label:n("noumena.chamber_edit.noumena_copilot_label"),onKeyPress:x,error:!!T.keyWord,helperText:(y=T.keyWord)==null?void 0:y.message,"data-testid":"testEmailLoginTextField",rightIcon:e(j,{name:"RocketIcon",color:"--icon-card-neutral-default",size:24,onClick:()=>C(),"data-test":"NoumenaCopilot-Icon"}),"data-test":"NoumenaCopilot-TextField"})}),b?e(ia,{children:e(bt,{initialValue:"Fetching results...",editEnabled:!1,basicToolbar:!0,"data-test":"NoumenaCopilot-RichTextEditor"})}):!s.length&&!b?e(ia,{children:e(bt,{initialValue:"No Chat History",editEnabled:!1,basicToolbar:!0,"data-test":"NoumenaCopilot-RichTextEditor"})}):null,E]})})})},Nr=S.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`,Mr=S.div`
  padding: 12px 16px 0px;
  gap: 12px;
`,Ir=S.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
`,Dr=S.div`
  padding: 16px 16px 16px 16px;
  display: flex;
  flex-grow: 1;
  height: 0;
  border-bottom: 1px solid var(--border-card-neutral-default);
  align-items: flex-start;
  overflow-y: auto;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`;S.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 12px;
`;S.div``;const Pr=S.div`
  position: relative;
  border: 2px solid
    ${({isSelected:t})=>t?"var(--border-card-brand-primary-default)":"var(--border-card-neutral-default)"};
  border-radius: 8px;
  height: 168px;
  margin-bottom: 16px;
  min-width: 40%;
  flex: 1;
  cursor: pointer;
`,Ar=S.img`
  width: 100%;
  border-radius: 5px;
`,Br=S.div`
  position: absolute;
  top: -1px;
  left: -1px;
`,Lr=S.img`
  width: 40px;
  height: 40px;
`,Or=S.div`
  color: ${({isSelected:t})=>t?"var(--text-card-brand-primary-default)":"var(--text-card-neutral-highlighted)"};

  font-size: var(--font-body-medium-bold-size);
  font-family: var(--font-body-medium-bold-font);
  padding: 12px 16px;
  font-weight: var(--font-body-medium-bold-weight);
`,Hr=S.div`
  overflow-y: auto;
`,Wr=S.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
`,Rr=S(P)`
  padding: 16px;
`,ra=S.div`
  width: 100%;
  height: ${({width:t})=>t||"1px"};
  background-color: var(--bg-separator-neutral-default);
`,zr=S.div`
  padding: 16px;
`,Fr=S.div`
  padding-top: 8px;
`;S(j)`
  transition: transform 0.3s;
  ${({isOpen:t})=>t&&"transform: rotate(180deg)"};
`;const $r=S(R)`
  border-radius: 0;
  min-height: unset;
  min-width: unset;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  height: max-content;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent !important;
`,Ur=S.div`
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  border: 1px solid var(--border-radiobutton-neutral-default);
  border-radius: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: ' ';
    border-radius: 100%;
    transition: all 0.1s ease-in;
    background-color: var(--icon-radiobutton-brand-primary-default);
    ${({selected:t})=>t?`
          width: 12px;
          height: 12px;
        `:`
          width: 0;
          height: 0;
        `}
  }
`,Vr=S(j)`
  transition: transform 0.3s;
  ${({isOpen:t})=>t&&"transform: rotate(180deg)"};
`,jr="/assets/check-m-17556a56.svg",qr=t=>{const{isSelected:a,title:o,onChangeTheme:r}=t;return m(Pr,{isSelected:a,onClick:r,children:[e(Ar,{src:$n[o],alt:"backgroundImage"}),a&&e(Br,{children:e(Lr,{src:jr,alt:"checkSVG"})}),e(Or,{isSelected:a,children:o})]})},Kr=({themes:t,noumId:a})=>{const{selectedThemeId:o,onChangeTheme:r}=ga();return e(Ir,{children:e(Dr,{children:t&&t.length&&t.map(n=>e(qr,{id:n==null?void 0:n._id,title:(n==null?void 0:n.name)||"",isSelected:(n==null?void 0:n._id)===o,onChangeTheme:()=>r(a,n==null?void 0:n._id),"data-test":"ThemePicker-ThemeItem"},`${n==null?void 0:n._id}`))})})};var ft=(t=>(t.THEME="theme",t.FONTS="fonts",t))(ft||{});const Yr=({title:t,isLastItem:a,name:o,selected:r,setFonts:n})=>{const[d,i]=l.useState(!1),[c,s]=l.useState(""),[p,h]=l.useState([]),[u,b]=l.useState(15),f=l.useMemo(()=>Un.map((x,w)=>({...x,rightIcon:e($r,{neutral:!0,leftIcon:e(Ur,{selected:x.value.name===r})}),intent:w%5!==0?"default":"danger",selected:!1})),[r]),g=l.useMemo(()=>f.find(x=>x.value.name===r),[r,f]),C=l.useCallback(()=>b(u+15),[u]),_=p.slice(0,Math.min(p.length,u));l.useEffect(()=>{const x=f.filter(w=>{var y;return w&&w.type==="value"&&w.value?(y=String(w.value.name))==null?void 0:y.toLowerCase().includes(c.toLocaleLowerCase()):!0});h(x)},[f,c]);const T=x=>{s(x)},E=l.useCallback(x=>{n(o,x.value.name),s("")},[o,n]);return m(Wr,{children:[e(Rr,{font:"body-l",colorToken:"--text-tablecell-header-neutral-highlighted",children:t}),e(ra,{}),m(zr,{children:[e(P,{font:"footnote-bold",colorToken:"--text-card-neutral-highlighted","data-test":"FontPicker-TSpan",children:k("noumena.customize.font_family")}),e("br",{}),e(P,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"FontPicker-TSpan",children:k("noumena.customize.font_apply_to_all")}),e(Fr,{children:e(Ge,{inputValue:(g==null?void 0:g.label)??"",options:f,"data-test":"FontPicker-Dropdown",children:e(Ge,{inputValue:c||"",options:_,placement:"bottom-start",usePortal:!1,onInputChange:T,onFetchMore:C,padding:"0px",containerPadding:"12.5px 10px 12.5px 0",iconColumnWidth:0,minHeight:"336px",containerHeight:"336px",showInternalSearch:!0,onOpen:()=>i(!0),onClose:()=>{s(""),i(!1)},onSelectOption:E,noSearchOptionsText:k("noumena.dropdown.no_search_results.text"),noSearchOptionsTextAlign:"left","data-test":"FontPicker-Dropdown",children:({inputProps:x,inputRef:w,toggle:y})=>e(ba,{readOnly:!0,ref:w,...x,value:g==null?void 0:g.value.name,spellCheck:"false",rightIcon:e(Vr,{name:"chevron_down_m",isOpen:d,size:16,onClick:y,"data-testid":"styledCountryDownArrow"}),rightIconColor:"var(--icon-button-brand-primary-default)",isAlwaysFocus:d,inputSize:"small","data-test":"FontPicker-TextField"})})})})]}),!a&&e(ra,{width:"3px"})]})},Gr=({isOpen:t,onClose:a,onConfirm:o,onCloseModal:r})=>m(oe,{open:t,size:ue.S,onClose:r,testId:"default-theme-revert-modal","data-test":"RevertModal-Modal",children:[e(ie,{"data-test":"RevertModal-ModalHeader",children:k("noumena.customize.theme.revert_title")}),e(re,{"data-test":"RevertModal-ModalBody",children:e(P,{font:"body-l",textAlign:"center",colorToken:"--text-modal-neutral-default","data-testid":"theme-revert-confirmation-modal-description","data-test":"RevertModal-TSpan",children:k("noumena.customize.theme.revert_description")})}),e(Q,{height:16,"data-test":"RevertModal-Spacer"}),m(me,{isFullScreen:!1,gap:16,flexDirection:"column",marginTop:12,"data-test":"RevertModal-ModalFooter",children:[e(R,{primary:!0,size:"full",onClick:o,"data-testid":"confirm-button","data-test":"RevertModal-Button",children:k("noumena.customize.theme.revert_confirm")}),e(R,{tertiary:!0,intent:"negative",size:"full",onClick:a,"data-testid":"cancel-button","data-test":"RevertModal-Button",children:k("noumena.customize.theme.revert_cancel")})]})]}),Za=({open:t,onClose:a,noumId:o,...r})=>{const[n,d]=l.useState(ft.THEME),[i,c]=l.useState(!0),[s,p]=l.useState(!1),{width:h}=we(),{themes:u,selectedFonts:b,onChangeFonts:f,onReset:g}=ga(),C=l.useMemo(()=>h>=Ct.TABLET_L,[h]),_=l.useCallback(()=>p(!1),[]),T=l.useCallback(()=>{g(o),p(!1)},[o,g]),E=l.useCallback((x,w)=>{let y={[x]:w};x==="body"&&(y={...y,footnote:w,input:w,link:w,systeminfo:w}),f(o,{...b,...y})},[o,f,b]);return m(H,{children:[e(Bt,{className:"theme_container",placement:"right",showCloseButton:!0,enableAnimation:!0,nonBlockingModal:C,disableEscapeKeyDown:!0,isBackgroundOpacity:!C,height:"100%",padding:0,title:k("noumena.customize.header"),open:t,onClose:a,actionButton:e(R,{textOnly:!0,size:"small",onClick:()=>p(!0),"data-test":"ThemePanel-Button",children:k("noumena.customize.reset_changes")}),...r,"data-test":"ThemePanel-SideModal",children:m(Nr,{children:[e(Mr,{children:e(it,{onChange:x=>d(x),inputList:Vn,selectedId:n,mode:"isBackground",isWithoutImage:!0,textFont:"--font-body-medium-regular-font",fontSize:"--font-body-medium-regular-size",fullWidth:!0,"data-test":"ThemePanel-BasicChipsTabsForm"})}),n===ft.THEME&&e(Kr,{isApply:i,setIsApply:c,themes:u,noumId:o,"data-test":"ThemePanel-ThemePicker"}),n===ft.FONTS&&e(Hr,{children:jt.map((x,w)=>e(Yr,{title:x.label,isLastItem:w===jt.length-1,name:x.name,selected:b[x.name]??jn,setFonts:E,"data-test":"ThemePanel-FontPicker"},`font-picker-${x.label}`))})]})}),e(Gr,{isOpen:s,onClose:_,onCloseModal:_,onConfirm:T,"data-test":"ThemePanel-RevertModal"})]})},Xr=S.div`
  cursor: pointer;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
`,Ja=l.memo(t=>{var E;const{t:a}=G(),{flags:{noumEditor2:o}}=Ee(),{user:r}=yt(),{addToast:n}=ne(),[d,i]=l.useState(!1),{publishSpaceHelper:c,loading:s}=Wo(),{restoreSpaceHelper:p,loading:h}=Wa(),{publishNoumLayoutHelper:u,loading:b}=Ro(),{checkChamberCanBePublished:f}=wi(),g=l.useCallback(async()=>{await c(t.spaceId,t.space,o,()=>{var x,w;((x=t.space)==null?void 0:x.type)===ke.Home&&(kt(t.space.status===Dt.Draft?"home_chamber_create":"home_chamber_edit",{DeviceType:navigator.userAgent,UUID:r==null?void 0:r._id,ChamberId:t.spaceId}),(w=t.space.elements)!=null&&w.some(y=>{var v;return!!((v=y==null?void 0:y.unSaved)!=null&&v.isDeleted)})&&kt("home_chamber_delete_element",{DeviceType:navigator.userAgent,UUID:r==null?void 0:r._id,ChamberId:t.spaceId}))})},[o,t.space,t.spaceId,c,r==null?void 0:r._id]),C=l.useCallback(()=>{g().then(()=>{var x;i(!1),((x=t.space)==null?void 0:x.type)===ke.Project&&!(t!=null&&t.isRestored)&&kt("publishPN",{UUID:r==null?void 0:r._id,ProjectNoumID:t.spaceId}),t.handleClose(!0)})},[g,t,r==null?void 0:r._id]),_=l.useCallback(()=>{i(!0),setTimeout(async()=>{t!=null&&t.isRestored?await p(t.spaceId):o?await u(t.spaceId).then(async()=>{C()}):C()},1e3)},[o,t,u,p,C]),T=async()=>{var x;t.emptyElementErrorMessage?(n("error","none",t.emptyElementErrorMessage),t.handleClose(!1)):ke.Home===((x=t.space)==null?void 0:x.type)?_():await f(t.spaceId,_,t.setSetUpSlotForNoum,t.handleClose)};return e(oe,{testId:"testChamberPublish",open:t.isOpen||s||h||b,onClose:t.handleClose,size:ue.S,disableBackdropClick:!0,"data-test":"ChamberPublish-Modal",children:d||s||b?m(Ht,{"data-test":"ChamberPublish-WrapperLoading",children:[m(Wt,{"data-test":"ChamberPublish-WrapperSpinner",children:[e(be,{"data-test":"ChamberPublish-Spinner"}),e(Q,{height:"20px","data-test":"ChamberPublish-Spacer"})]}),e(Q,{height:"16px","data-test":"ChamberPublish-Spacer"}),e(P,{"data-testid":"bodyChamberPublishSaving",font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"ChamberPublish-TSpan",children:a("noumena.container.chamber_publish.body.loading")})]}):m(H,{children:[e(ie,{"data-testid":"titleChamberPublish","data-test":"ChamberPublish-ModalHeader",children:a("noumena.container.chamber_publish.title")}),m(re,{align:"center",hideScrollbar:!0,"data-test":"ChamberPublish-ModalBody",children:[e(P,{"data-testid":"bodyChamberPublishP1",font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"ChamberPublish-TSpan",children:t!=null&&t.isHomeNoum?a("noumena.container.home_chamber_publish.body.p1"):a("noumena.container.chamber_publish.body.p1")}),e(P,{"data-testid":"bodyChamberPublishP2",font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"ChamberPublish-TSpan",children:t!=null&&t.isHomeNoum?a("noumena.container.home_chamber_publish.body.p2"):e(Re,{i18nKey:"noumena.container.chamber_publish.body.p2",components:{link:m(Xr,{onClick:t.handleClickInfo,"data-test":"ChamberPublish-SettingsLink",children:[e(P,{font:"body-l",colorToken:"--text-modal-neutral-highlighted",style:{marginRight:"2px"},"data-test":"ChamberPublish-TSpan",children:ve.capitalize(((E=t.space)==null?void 0:E.projectType)??"")}),e(j,{name:"info_m",size:20,color:"--icon-modal-neutral-highlighted","data-test":"ChamberPublish-Icon"})]})},"data-test":"ChamberPublish-Trans"})})]}),m(me,{flexDirection:"column",gap:16,"data-test":"ChamberPublish-ModalFooter",children:[e(R,{"data-testid":"confirmChamberPublish",primary:!0,size:"full",intent:"positive",onClick:T,"data-test":"ChamberPublish-Button",children:a("noumena.container.chamber_publish.confirm")}),e(R,{"data-testid":"cancelChamberPublish",tertiary:!0,size:"full",onClick:()=>t.handleClose(),"data-test":"ChamberPublish-Button",children:a("noumena.container.chamber_publish.cancel")})]})]})})}),en=l.memo(t=>{const{flags:{noumEditor2:a}}=Ee(),{t:o}=G(),{addToast:r}=ne(),[n,d]=l.useState(!1),{saveAsDraftSpaceHelper:i,loading:c}=Ra(),{noumLayoutAsDraftHelper:s,loading:p}=za(),h=async()=>{t.emptyElementErrorMessage?(r("error","none",t.emptyElementErrorMessage),t.handleClose()):(d(!0),setTimeout(async()=>{a&&await s(t.spaceId),await i(t.spaceId,t.space),d(!1),t.handleClose()},1e3))};return e(oe,{testId:"testChamberSaveAsDraft",open:t.isOpen||c,onClose:t.handleClose,size:ue.S,disableBackdropClick:!0,"data-test":"ChamberSaveAsDraft-Modal",children:n||c||p?m(Ht,{"data-test":"ChamberSaveAsDraft-WrapperLoading",children:[m(Wt,{"data-test":"ChamberSaveAsDraft-WrapperSpinner",children:[e(be,{"data-test":"ChamberSaveAsDraft-Spinner"}),e(Q,{height:"20px","data-test":"ChamberSaveAsDraft-Spacer"})]}),e(Q,{height:"16px","data-test":"ChamberSaveAsDraft-Spacer"}),e(P,{"data-testid":"bodyChamberSaveAsDraftSaving",font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"ChamberSaveAsDraft-TSpan",children:o("noumena.container.chamber_save_as_draft.body.loading")})]}):m(H,{children:[e(ie,{"data-testid":"titleChamberSaveAsDraft","data-test":"ChamberSaveAsDraft-ModalHeader",children:o("noumena.container.chamber_save_as_draft.title")}),e(re,{style:{textAlign:"center"},"data-test":"ChamberSaveAsDraft-ModalBody",children:e(P,{colorToken:"--text-modal-neutral-default","data-testid":"bodyChamberSaveAsDraft",font:"body-l","data-test":"ChamberSaveAsDraft-TSpan",children:o("noumena.container.chamber_save_as_draft.body")})}),m(me,{flexDirection:"column",gap:16,"data-test":"ChamberSaveAsDraft-ModalFooter",children:[e(R,{"data-testid":"confirmChamberSaveAsDraft",primary:!0,size:"full",onClick:h,"data-test":"ChamberSaveAsDraft-Button",children:o("noumena.container.chamber_save_as_draft.confirm")}),e(R,{"data-testid":"cancelChamberSaveAsDraft",tertiary:!0,size:"full",onClick:t.handleClose,"data-test":"ChamberSaveAsDraft-Button",children:o("noumena.container.chamber_save_as_draft.cancel")})]})]})})}),tn=l.memo(t=>{const{flags:{noumEditor2:a}}=Ee(),{t:o}=G(),[r,n]=l.useState(!1),{discardSpaceChangeHelper:d,loading:i}=No(),{saveAsDraftSpaceHelper:c,loading:s}=Ra(),{noumLayoutAsDraftHelper:p,loading:h}=za(),{cancelNoumLayoutChangesHelper:u,loading:b}=Fa(),f=async()=>{n(!0),setTimeout(async()=>{a&&await u(t.spaceId),await d(t.spaceId),n(!1),t.handleClose(!0)},1e3)},g=async()=>{n(!0),setTimeout(async()=>{a&&await p(t.spaceId),await c(t.spaceId,t.space),n(!1),t.handleClose(!0)},1e3)},C=o(s?"noumena.container.chamber_save_as_draft.body.loading":"noumena.container.chamber_discard_change.body.loading");return e(oe,{testId:"testChamberDiscardChange",open:t.isOpen||i||s,onClose:t.handleClose,size:ue.S,disableBackdropClick:!0,"data-test":"ChamberDiscardChange-Modal",children:r||i||s||h||b?m(Ht,{"data-test":"ChamberDiscardChange-WrapperLoading",children:[m(Wt,{"data-test":"ChamberDiscardChange-WrapperSpinner",children:[e(be,{"data-test":"ChamberDiscardChange-Spinner"}),e(Q,{height:"20px","data-test":"ChamberDiscardChange-Spacer"})]}),e(Q,{height:"16px","data-test":"ChamberDiscardChange-Spacer"}),e(P,{colorToken:"--text-modal-neutral-default","data-testid":"bodyChamberDiscardChangeSaving",font:"body-l","data-test":"ChamberDiscardChange-TSpan",children:C})]}):m(H,{children:[e(ie,{"data-testid":"titleChamberDiscardChange","data-test":"ChamberDiscardChange-ModalHeader",children:o("noumena.container.chamber_discard_change.title")}),e(re,{align:"center","data-test":"ChamberDiscardChange-ModalBody",children:e(P,{colorToken:"--text-modal-neutral-default","data-testid":"bodyChamberDiscardChange",font:"body-l",textAlign:"center","data-test":"ChamberDiscardChange-TSpan",children:o("noumena.container.chamber_discard_change.body")})}),m(me,{flexDirection:"column",gap:16,"data-test":"ChamberDiscardChange-ModalFooter",children:[e(R,{"data-testid":"confirmChamberDiscardChange",primary:!0,intent:"negative",size:"full",onClick:f,"data-test":"ChamberDiscardChange-Button",children:o("noumena.container.chamber_discard_change.discard_changes")}),e(R,{"data-testid":"saveAsDraftChamberDiscardChange",tertiary:!0,size:"full",onClick:g,"data-test":"ChamberDiscardChange-Button",children:o("noumena.container.chamber_discard_change.save_as_a_draft")}),e(R,{"data-testid":"continueEditingChamberDiscardChange",tertiary:!0,size:"full",onClick:()=>t.handleClose(),"data-test":"ChamberDiscardChange-Button",children:o("noumena.container.chamber_discard_change.continue_editing")})]})]})})}),Qr=({version:t})=>{const{t:a}=G();return m(H,{children:[m(P,{font:"body-l",colorToken:"--text-modal-neutral-default","data-testid":"description1",style:{paddingBottom:12},"data-test":"ChamberRestoreModalBody-TSpan",children:[a("noumena.container.chamber.restore.modal.body.p1")," ",m(P,{colorToken:"--text-modal-neutral-highlighted","data-testid":"description-restore-version",font:"body-l-bold","data-test":"ChamberRestoreModalBody-TSpan",children:[t,"?"]})]}),e(P,{font:"body-l",colorToken:"--text-modal-neutral-default","data-testid":"description2",style:{paddingBottom:12},"data-test":"ChamberRestoreModalBody-TSpan",children:a("noumena.container.chamber.restore.modal.body.p2")})]})},an=l.memo(t=>{const{flags:{noumEditor2:a}}=Ee(),{t:o}=G(),{restoreSpaceHelper:r,loading:n}=Wa(),{cancelNoumLayoutChangesHelper:d,loading:i}=Fa(),c=async()=>{await r(t.spaceId),a&&await d(t.spaceId),t.sucessCallback()},s=n||i;return e(Ho,{...t,isOpen:t.isOpen||s,title:o("noumena.container.chamber.restore.modal.title"),isWaiting:s,textForWaiting:o("noumena.container.chamber.restore.modal.restoring_previous_version"),positiveBtnLabel:o("noumena.container.chamber.restore.modal.button.restore"),negativeBtnLabel:o("noumena.cancel"),positiveBtnType:"primary",body:e(Qr,{version:t.version,"data-test":"ChamberRestoreModal-ChamberRestoreModalBody"}),confirmCallback:c,"data-test":"ChamberRestoreModal-ChamberActionModal"})}),nn=({isOpen:t,handleClose:a})=>{const{width:o}=we(),r=l.useMemo(()=>o<768,[o]),n=l.useCallback(i=>{switch(i){case"PUBLIC":return e(R,{tertiary:!0,size:"small",icon:e(j,{color:"--icon-button-neutral-default",name:"eye_on_m",size:24,"data-test":"ChamberPublishVisibilityInfo-optionIcon-Icon"}),"data-test":"ChamberPublishVisibilityInfo-optionIcon-Button"});case"PRIVATE":return e(R,{tertiary:!0,size:"small",icon:e(j,{name:"lock_m",color:"--icon-button-neutral-default",size:24,"data-test":"ChamberPublishVisibilityInfo-optionIcon-Icon"}),"data-test":"ChamberPublishVisibilityInfo-optionIcon-Button"});case"SECRET":return e(R,{tertiary:!0,size:"small",icon:e(j,{name:"eye_off_m",color:"--icon-button-neutral-default",size:24,"data-test":"ChamberPublishVisibilityInfo-optionIcon-Icon"}),"data-test":"ChamberPublishVisibilityInfo-optionIcon-Button"});default:return null}},[]),d=l.useMemo(()=>Bo.map(i=>({...i,icon:n(i.value),selected:!1})),[n]);return m(oe,{isFullScreen:r,testId:"link-confirmation-modal",open:t,onClose:a,style:{width:r?"auto":"450px",maxWidth:"450px"},closeButtonStyles:{enforceRight:!r,horizontal:24},enableCloseButton:!0,disableBackdropClick:!0,"data-test":"ChamberPublishVisibilityInfo-Modal",children:[e(ie,{isFullScreen:!1,"data-test":"ChamberPublishVisibilityInfo-ModalHeader",children:k("noumena.container.chamber_publish_visibility.title")}),e(re,{isFullScreen:!1,style:{alignItems:"center"},"data-test":"ChamberPublishVisibilityInfo-ModalBody",children:d.map(qn(()=>{},null,()=>{},{activeSubItem:null,iconColumnWidth:40,dropdownItemStyle:{width:"100%"}}))}),e(me,{isFullScreen:!1,marginTop:28,flexDirection:"column",gap:16,"data-test":"ChamberPublishVisibilityInfo-ModalFooter",children:e(R,{size:"full",tertiary:!0,onClick:a,"data-test":"ChamberPublishVisibilityInfo-Button",children:k("noumena.close")})})]})},Zr=l.forwardRef(({publishedDate:t="",lastChangedDate:a="",hasUnsaved:o=!1,hasUnsavedPermissions:r=!1,hasDraft:n=!1,hasPublished:d=!1,spaceId:i,space:c,emptyElementErrorMessage:s,onChamberRestore:p,isRestored:h=!1,isNavigateToCustomPreview:u,cancelNavigateToCustomPreview:b,onNavigate:f},g)=>{const{t:C}=G(),{id:_=""}=Sa(),{disableUpdate:T}=l.useContext(fa),[E,x]=l.useState(!1),[w,y]=l.useState(!1),[v,I]=l.useState(!1),[O,A]=l.useState(!1),[B,N]=l.useState(!1),{masterId:M,isPending:D}=yt(),[F,L]=l.useState(!1),{onRefetchSpaceByConfig:K,onRefetchSpaceById:$}=Kn(),{flags:q}=Ee();Ba(({retry:X})=>{o?A(!0):X()},o&&!u);const ee=async()=>{x(!0)},le=()=>{I(!0)},pe=l.useCallback(()=>{o?A(!0):f(_)},[o,_,f]),de=l.useCallback(X=>{x(!1),X&&(K(),$(),f(_,`/noum/${_}`))},[K,$,f,_]),se=()=>{y(!1),x(!0)},{width:ce}=we(),xe=ce>768,_e=()=>{I(!1)},Se=l.useCallback(X=>{A(!1),X&&f(_),b==null||b()},[b,_,f]),Ne=()=>{N(!0)},Pe=()=>e(Kt,{className:"xs-block","data-test":"EditHeader-RenderMobileStatus-StatusWrapper",children:e(Qn,{"data-test":"EditHeader-RenderMobileStatus-MobileStatusWrapper",children:o||n?m(H,{children:[o||o&&n?e(at,{colorToken:"--text-top-nav-danger-primary-default","data-test":"EditHeader-RenderMobileStatus-EditChangeStatusText",children:C("noumena.header.unsaved_changes.text")}):n&&!o?e(at,{colorToken:"--text-top-nav-neutral-default","data-test":"EditHeader-RenderMobileStatus-EditChangeStatusText",children:C("noumena.header.drafted_changes.text")}):e(H,{}),d&&!h&&m(Yt,{onClick:Ne,"data-test":"EditHeader-RenderMobileStatus-LastUpdateLabel",children:[C("noumena.header.restore_last_saved.text"),e("br",{})]})]}):e(H,{})})}),Me=({className:X="xs-hidden"})=>e(Kt,{className:`xs-${X}`,"data-test":"EditHeader-RenderStatus-StatusWrapper",children:o||n||h?m(H,{children:[m(Gt,{"data-testid":`lastChangedLabel_xs_${X}`,labelSize:"small","data-test":"EditHeader-RenderStatus-StatusLabel",children:[C("noumena.header.last_changed.text"),": ",a,o||o&&n?e(at,{colorToken:"--text-top-nav-danger-primary-default","data-test":"EditHeader-RenderStatus-EditChangeStatusText",children:C("noumena.header.unsaved_changes.text")}):n&&!o?e(at,{colorToken:"--text-top-nav-neutral-default","data-test":"EditHeader-RenderStatus-EditChangeStatusText",children:C("noumena.header.drafted_changes.text")}):e(H,{})]}),d&&(o||n)&&m(Yt,{"data-testid":`publishedDateLabel_xs_${X}`,onClick:Ne,"data-test":"EditHeader-RenderStatus-LastUpdateLabel",children:[C("noumena.header.restore_last_saved.text")," (",t,")",e("br",{})]})]}):(d||h)&&m(Gt,{labelSize:"small","data-testid":`lastPublishedLabel_xs_${X}`,className:`xs-${X}`,"data-test":"EditHeader-RenderStatus-StatusLabel",children:[C("noumena.header.last_published.text"),": ",t,e(at,{colorToken:"--text-top-nav-neutral-default","data-test":"EditHeader-RenderStatus-EditChangeStatusText",children:C("noumena.header.all_changes_saved.text")})]})});return m(Yn,{ref:g,"data-testid":"Edit-Header","data-test":"EditHeader-EditHeaderWrapper",children:[e(Gn,{"data-test":"EditHeader-IconWrapper",children:e(j,{"data-testid":"Header-Back-Button",name:"arrow_left_m",color:"--icon-button-neutral-default",size:24,onClick:pe,"data-test":"EditHeader-Icon"})}),e(Me,{className:"hidden","data-test":"EditHeader-RenderStatus"}),m(Xn,{"data-test":"EditHeader-ButtonsWrapper",children:[e(qt,{"data-testid":"Header-SaveAsADraft",secondary:!0,size:"small",onClick:le,disabled:!o||T,"data-test":"EditHeader-StyledButton",children:C("noumena.header.draft_button.text")}),e(qt,{"data-testid":"Header-Publish-Button",primary:!0,intent:"positive",size:"small",onClick:ee,disabled:!o&&!n&&!r&&!h||T||D,"data-test":"EditHeader-StyledButton",children:C("noumena.header.publish_button.text")})]}),xe?e(Me,{className:"block","data-test":"EditHeader-RenderStatus"}):e(Pe,{"data-test":"EditHeader-RenderMobileStatus"}),e(Ja,{spaceId:i,space:c,isOpen:E,handleClose:de,setSetUpSlotForNoum:L,handleClickInfo:()=>{y(!0)},emptyElementErrorMessage:s,isHomeNoum:(c==null?void 0:c._id)===M,"data-test":"EditHeader-ChamberPublish"}),e(nn,{isOpen:w,handleClose:se,"data-test":"EditHeader-ChamberPublishVisibilityInfo"}),e(en,{spaceId:i,space:c,isOpen:v,handleClose:_e,emptyElementErrorMessage:s,"data-test":"EditHeader-ChamberSaveAsDraft"}),e(tn,{spaceId:i,space:c,isOpen:O||o&&!!u,handleClose:Se,"data-test":"EditHeader-ChamberDiscardChange"}),e(an,{spaceId:i,isOpen:B,version:t,cancelCallback:()=>N(!1),sucessCallback:()=>{N(!1),p==null||p()},emptyElementErrorMessage:s,"data-test":"EditHeader-ChamberRestoreModal"}),q.paymentSubscriptions&&F&&e(Ma,{open:F,onClose:()=>L(!1),chamberIdAfterCreatingNoum:_,"data-test":"EditHeader-SetupNoumModal"})]})}),od=({id:t})=>{var Je;const{space:a,hasUnsaved:o,hasUnsavedPermissions:r,loading:n,publishedDate:d,lastChangedDate:i,hasDraft:c,isOpen:s,isOwner:p,isArchived:h,setOpenArchive:u,isOnLoad:b,hasPublished:f,openArchive:g,archiving:C,handleClose:_,sideBarOptionSelected:T,onArchive:E,openInvites:x,setOpenInvites:w,openPermission:y,setOpenPermission:v,openManageMembers:I,setOpenManageMembers:O,openNoumAds:A,setOpenNoumAds:B,openBroadcast:N,setOpenBroadcast:M,isVisited:D,handleMarkAsVisited:F,campaigns:L,campaignsLoading:K,fetchMoreCampaigns:$,infiniteState:q,onRefetchCampaigns:W,setIsRestored:ee,isRestored:le,linkedNoumsCount:pe,unlinkOnArchive:de,unlinkArchivingLoader:se,links:ce,openThemePanel:xe,setOpenThemePanel:_e,isNavigateToCustomPreview:Se,setNavigateToCustomPreview:Ne,isSettingTheme:Pe,markSpaceAsEditedLoading:Me,connections:X,approvedConnectionsLoading:Xe,approvedConnections:ze,approvedInfiniteState:J,fetchMoreApprovedConnections:Qe,refetchSpaceById:dt,openNoumenaCopilot:Fe,setOpenNoumenaCopilot:xt}=va(t),{t:_t}=G(),[st,ct]=l.useState(!1),[St,ut]=l.useState(""),[mt,pt]=l.useState(We()),Ae=Ot(),{state:Ie}=Ta();l.useEffect(()=>{var Te,Le;ut("");const he=(Te=a==null?void 0:a.elements)==null?void 0:Te.filter(U.isInvalidElement);he!=null&&he.length&&ut(Ca((Le=he==null?void 0:he[0])==null?void 0:Le.elementType))},[a,_t]);const ht=()=>{M(!0),ct(!1)},Be=()=>{pt(We()),ee(!0)},Ze=l.useMemo(()=>(ce==null?void 0:ce.linkedNoums.map(he=>({...he})))||[],[ce]),$e=l.useCallback((he,Te)=>{he&&Se?Ae(`/noum/${t}/edit/custom_preview`):Te&&(Ie!=null&&Ie.prevPath)?Ae(Te,{replace:!0}):Ae(-1)},[t,Se,Ae,Ie==null?void 0:Ie.prevPath]);return n||!a?e(be,{"data-test":"EditChamber-Spinner"}):m(ya,{space:a,loading:n,id:t,"data-test":"EditChamber-EditChamberProvider",children:[a&&p&&!h&&m(xa,{"data-testid":"EDIT-CHAMBER",className:"App",applyMinHeight:(a==null?void 0:a.elements)&&((Je=a==null?void 0:a.elements)==null?void 0:Je.length)<3||!1,"data-test":"EditChamber-AppStyled",children:[e(_a,{isBorderRadius:!1,"data-test":"EditChamber-Header",children:e(Zr,{publishedDate:d,lastChangedDate:i,hasUnsaved:o,hasUnsavedPermissions:r,hasDraft:c,hasPublished:f,spaceId:t,space:a,emptyElementErrorMessage:St,onChamberRestore:Be,isRestored:le,isNavigateToCustomPreview:Se,cancelNavigateToCustomPreview:()=>Ne(!1),onNavigate:$e,"data-test":"EditChamber-EditHeader"})}),e(Ia,{isEditing:!0,header:e(Ea,{"data-test":"EditChamber-EditChamberHeader"}),hasSideBar:!n&&!C&&(a==null?void 0:a.type)!==V.Home&&!xe&&!Fe,onSelectEditOption:T,hasThemePanel:xe||Fe,"data-test":"EditChamber-ChamberViewLayout",children:n||b?e(z,{"data-test":"EditChamber-Stack",children:e(be,{"data-test":"EditChamber-Spinner"})}):e(H,{children:e(Mo,{space:a,"data-test":`EditChamber-EditChamberBody-${mt}`},mt)})}),e(ja,{isOpen:s&&!D,handleClose:_,handleMarkAsVisited:F,markSpaceAsEditedLoading:Me,"data-test":"EditChamber-ChamberEditMode"}),a.link?e(Xa,{isOpen:g,handleClose:()=>u(!1),handleUnlinking:de,loading:se,"data-test":"EditChamber-UnlinkOnArchiveNoumModal"}):(a==null?void 0:a.name)&&e(Va,{noumName:a==null?void 0:a.name,isOpen:g,handleClose:()=>u(!1),onArchive:E,"data-test":"EditChamber-ChamberArchiveModal"}),(a==null?void 0:a.projectType)&&e(Da,{spaceId:t,connections:X,linkedNoums:Ze,visibility:a==null?void 0:a.projectType,isOpen:x,isSEOEnabled:!!(a!=null&&a.enableAds),handleClose:()=>w(!1),"data-test":"EditChamber-ChamberVisibilityInviteModal"}),e(qa,{spaceId:t,connections:ze,loading:Xe,isOpen:y,onClose:()=>v(!1),onInvite:()=>T("invites"),linkedCount:pe,infiniteState:J,fetchMoreConnections:Qe,"data-test":"EditChamber-ChamberPermissionModal"}),A&&e(Pa,{isOpen:A,onClose:()=>B(!1),refetchSpaceById:dt,"data-test":"EditChamber-NoumAdsModal"}),e(Ga,{infiniteState:q,campaigns:L,campaignsLoading:K,fetchMoreCampaigns:$,spaceId:t,isOpen:N,onRefetchCampaigns:W,onClose:()=>M(!1),onCampaign:()=>ct(!0),"data-test":"EditChamber-ViewBroadcastModal"}),st&&e(Ka,{noumType:a.projectType,noumId:t,isOpen:st,onClose:ht,onSuccessfulCampaignCreation:W,"data-test":"EditChamber-CreateBroadcastModal"}),e(Za,{noumId:t,open:xe,onClose:()=>_e(!1),"data-test":"EditChamber-ThemePanel"}),Fe&&e(Qa,{noumId:t,open:Fe,onClose:()=>xt(!1),"data-test":"EditChamber-NoumenaCopilot"}),I&&e(Aa,{isOpen:I,handleClose:()=>O(!1),"data-test":"EditChamber-ManageMembersModal"})]}),Pe&&e(be,{"data-test":"EditChamber-Spinner"})]})},Jr=({onSelect:t,isNoumPublishedAtAll:a,isShowRestore:o})=>{const{space:r}=Z(),n=l.useMemo(()=>r!=null&&r.publishedAt?Ha(r.publishedAt,!0):void 0,[r==null?void 0:r.publishedAt]),{flags:d}=Ee(),{width:i}=we(),c=l.useMemo(()=>i<1280?3:i<1440?5:6,[i]),s=l.useCallback(u=>{typeof u=="object"&&(t==null||t(u.value)),t==null||t(u)},[t]),p=l.useMemo(()=>Jt.map(u=>({...u,show:u.value==="manage_members"?d.elementPermission:["invites","permission"].includes(u.value)?!d.elementPermission:u.value==="broadcasting"?d.broadcast:u.value==="custom_preview"?d.customNoums:u.value==="noum_ads"||u.value==="noumena_copilot"?d.noumAds:!0})).filter((u,b)=>u&&b<c),[d,c]),h=l.useMemo(()=>Jt.filter(u=>u.value!=="restore_last_published_version"||o).filter(u=>p.findIndex(b=>b.value===u.value)<0&&u.value!=="save_as_a_template"&&u.value!=="noumena_copilot").map(u=>({...u,type:"value",key:u.label,label:u.value==="restore_last_published_version"?m(z,{vertical:!0,"aria-label":"noum-edit-mode-header-options","data-test":"NoumEditOptionsNew-moreItems-Stack",children:[e(P,{"data-test":"NoumEditOptionsNew-moreItems-TSpan",children:u.label}),n&&e(P,{font:"footnote",colorToken:"--text-tablecell-body-neutral-default","data-test":"NoumEditOptionsNew-moreItems-TSpan",children:k("noumena.noum_editor.published_on",{publishedDate:n})})]}):u.value==="archive"?e(P,{colorToken:"--text-tablecell-danger-primary-default","data-test":"NoumEditOptionsNew-moreItems-TSpan",children:u.label}):u.label})),[o,n,p]);return e(H,{children:m(Do,{"data-testid":"sideBar","aria-label":"noum-edit-mode-options-container","data-test":"NoumEditOptionsNew-EditOptionsContainer",children:[p.map(({label:u,type:b,value:f,show:g,disableBeforeFirstPublish:C})=>g?e(Po,{onClick:()=>{C&&a||s(f)},"data-testid":"navItem",disabled:C&&a,"data-test":"NoumEditOptionsNew-EditOptions",children:e(P,{"data-testid":`noum-edit-option-${u}`,font:"body-m-bold",colorToken:C&&a?"--text-button-neutral-disabled":b==="error"?"--text-tablecell-header-danger-primary-highlighted":"--text-button-brand-primary-default","data-test":"NoumEditOptionsNew-TSpan",children:u})},We()):void 0),e(Ge,{containerWidth:"max-content",hideIcons:!0,closeOnSelect:!0,onSelectOption:u=>s(u),options:h,usePortal:!1,isAnimation:!1,observerMinHeight:"0",placement:"auto","data-test":"NoumEditOptionsNew-Dropdown",children:({targetRef:u,targetProps:b,toggle:f})=>e(Ao,{ref:u,onClick:f,...b,"data-test":"NoumEditOptionsNew-ThreeDotsIconWrapper",children:e(j,{name:"more_m",size:24,color:"--icon-button-brand-primary-default","data-test":"NoumEditOptionsNew-Icon"})})})]})})},el=l.forwardRef(({publishedDate:t="",lastChangedDate:a="",hasUnsaved:o=!1,hasUnsavedPermissions:r=!1,hasDraft:n=!1,spaceId:d,space:i,emptyElementErrorMessage:c,onChamberRestore:s,isRestored:p=!1,isNavigateToCustomPreview:h,cancelNavigateToCustomPreview:u,onNavigate:b,onSelectEditOption:f,isOpenRestoreModal:g=!1,setOpenRestoreModal:C,hasPublished:_},T)=>{var ze;const{t:E}=G(),{id:x=""}=Sa(),{disableUpdate:w,setdisabledUpdateElement:y}=l.useContext(fa),[v,I]=l.useState(!1),[O,A]=l.useState(!1),[B,N]=l.useState(!1),[M,D]=l.useState(!1),{masterId:F,isPending:L}=yt(),[K,$]=l.useState(!1),{space:q,refetchSpaceById:W,setsectionStatus:ee}=Z(),le=!(((ze=q==null?void 0:q.uid)==null?void 0:ze.userStatus)===Zn.Active&&(q==null?void 0:q.status)===Dt.Published),pe=l.useMemo(()=>(i==null?void 0:i.type)===ke.Home,[i==null?void 0:i.type]),{flags:de}=Ee();Ba(({retry:J})=>{o?D(!0):J()},o&&!h);const ce=async()=>{y(!0),I(!0)},xe=()=>{N(!0),ee==null||ee(void 0)},_e=l.useCallback(()=>{o?D(!0):b(x)},[o,x,b]),Se=l.useCallback(J=>{I(!1),W==null||W(),J&&b(x,`/noum/${x}`)},[W,b,x]),Ne=()=>{A(!1),I(!0)},Pe=()=>{N(!1),W==null||W()},Me=()=>{C==null||C(!0)},X=l.useCallback(J=>{D(!1),J&&(W==null||W(),b(x)),u==null||u()},[u,x,b,W]),Xe=({className:J="xs-hidden"})=>e(ao,{className:`xs-${J}`,isNoumEditor2:!0,"aria-label":"noum_status","data-test":"EditHeaderNew-RenderStatus-StatusWrapper",children:o||n||p?m(H,{children:[m(Xt,{"data-testid":`lastChangedLabel_xs_${J}`,labelSize:"small","aria-label":"noum-status-label","data-test":"EditHeaderNew-RenderStatus-StatusLabel",children:[E("noumena.header.last_changed.text"),": ",a,o||o&&n?e(Et,{colorToken:"--text-top-nav-danger-primary-default","aria-label":"noum_status_unsaved","data-test":"EditHeaderNew-RenderStatus-EditChangeStatusText",children:E("noumena.header.unsaved_changes.text")}):n&&!o?e(Et,{colorToken:"--text-top-nav-neutral-default","aria-label":"noum_status_draft","data-test":"EditHeaderNew-RenderStatus-EditChangeStatusText",children:E("noumena.header.drafted_changes.text")}):e(H,{})]}),_&&(o||n)&&m(no,{"data-testid":`publishedDateLabel_xs_${J}`,onClick:Me,"aria-label":"noum-status-last-restored","data-test":"EditHeaderNew-RenderStatus-LastUpdateLabel",children:[E("noumena.header.restore_last_saved.text")," (",t,")",e("br",{})]})]}):(_||p)&&m(Xt,{labelSize:"small","data-testid":`lastPublishedLabel_xs_${J}`,className:`xs-${J}`,"aria-label":"noum_status_last_published","data-test":"EditHeaderNew-RenderStatus-StatusLabel",children:[E("noumena.header.last_published.text"),": ",t,e(Et,{colorToken:"--text-top-nav-neutral-default","aria-label":"noum_status_changes_status","data-test":"EditHeaderNew-RenderStatus-EditChangeStatusText",children:E("noumena.header.all_changes_saved.text")})]})});return m(Jn,{ref:T,"data-testid":"Edit-Header","aria-label":"noum-edit-mode-header","data-test":"EditHeaderNew-EditHeaderWrapperNew",children:[e(eo,{gap:34,align:"center","aria-label":"noum-edit-mode-left-actions-wrapper","data-test":"EditHeaderNew-LeftActionButtonsWrapper",children:e(vt,{"data-testid":"Header-SaveAsADraft",secondary:o,intent:"negative",tertiary:!o,size:"small",onClick:_e,"aria-label":"noum_edit_mode_left_action_button","data-test":"EditHeaderNew-StyledButton",children:E(o?"noumena._new_header.cancel_button.text":"noumena._new_header.done_button.text")})}),pe?e(Xe,{className:"hidden","data-test":"EditHeaderNew-RenderStatus"}):e(Jr,{onSelect:f,isNoumPublishedAtAll:le,isShowRestore:o||n,"data-test":"EditHeaderNew-NoumEditOptionsNew"}),m(to,{"aria-label":"noum-edit-mode-right-actions-wrapper","data-test":"EditHeaderNew-RightActionButtonsWrapper",children:[e(vt,{"data-testid":"Header-SaveAsADraft",secondary:!0,size:"small",onClick:xe,disabled:!o||w,"aria-label":"save_as_draft_button","data-test":"EditHeaderNew-StyledButton",children:E("noumena._new_header.draft_button.text")}),e(vt,{"data-testid":"Header-Publish-Button",primary:!0,intent:"positive",size:"small",onClick:ce,"aria-label":"publish_button",disabled:!o&&!n&&!r&&!p||w||L,"data-test":"EditHeaderNew-StyledButton",children:E("noumena.header.publish_button.text")})]}),e(Ja,{spaceId:d,space:i,isOpen:v,handleClose:Se,setSetUpSlotForNoum:$,handleClickInfo:()=>{A(!0)},emptyElementErrorMessage:c,isHomeNoum:(i==null?void 0:i._id)===F,"aria-label":"publish_noum_layout_modal","data-test":"EditHeaderNew-ChamberPublish"}),e(nn,{isOpen:O,handleClose:Ne,"data-test":"EditHeaderNew-ChamberPublishVisibilityInfo"}),e(en,{spaceId:d,space:i,isOpen:B,handleClose:Pe,emptyElementErrorMessage:c,"aria-label":"save_as_draft_modal","data-test":"EditHeaderNew-ChamberSaveAsDraft"}),e(tn,{spaceId:d,space:i,isOpen:M||o&&!!h,handleClose:X,"aria-label":"discard_changes_modal","data-test":"EditHeaderNew-ChamberDiscardChange"}),e(an,{spaceId:d,isOpen:g,version:t,"aria-label":"noum_restore_layout_modal",cancelCallback:()=>C==null?void 0:C(!1),sucessCallback:()=>{C==null||C(!1),s==null||s()},emptyElementErrorMessage:c,"data-test":"EditHeaderNew-ChamberRestoreModal"}),de.paymentSubscriptions&&K&&e(Ma,{open:K,onClose:()=>$(!1),chamberIdAfterCreatingNoum:x,"data-test":"EditHeaderNew-SetupNoumModal"})]})}),tl=({isOpen:t,loading:a,onClose:o,onConfirm:r,type:n=ae.SECTION_TYPE})=>{const{activeEditingTool:d}=Z(),i=n===ae.TOOL_TYPE;return m(oe,{open:t,size:ue.S,onClose:o,testId:"default-event-modal",disableBackdropClick:!0,"data-test":"DeleteModal-Modal",children:[e(ie,{"data-test":"DeleteModal-ModalHeader",children:i?k("noumena.noum_editor.tool.delete_modal_title"):k("noumena.noum_editor.delete_Section_title")}),e(re,{style:{alignItems:"center"},"data-test":"DeleteModal-ModalBody",children:m(z,{vertical:!0,gap:15,"data-test":"DeleteModal-Stack",children:[e(ti,{"data-test":"DeleteModal-DeleteDescriptionContainer",children:e(ai,{"data-test":"DeleteModal-DeleteDescription",children:e(Re,{i18nKey:i?d!=null&&d.elementType&&ea[d.elementType]?ea[d.elementType]:k("noumena.noum_editor.delete_tool_description"):k("noumena.noum_editor.delete_section_description"),components:{span:e(P,{font:"body-l",colorToken:"--text-modal-neutral-highlighted","data-test":"DeleteModal-TSpan"})},"data-test":"DeleteModal-Trans"})})}),e(P,{font:"body-l",textAlign:"center",colorToken:"--text-modal-neutral-default","data-testid":"event-confirmation-modal-description","data-test":"DeleteModal-TSpan",children:k("noumena.noum_editor.delete_tool_next_description")})]})}),e(Q,{height:16,"data-test":"DeleteModal-Spacer"}),m(me,{isFullScreen:!1,gap:16,flexDirection:"column",marginTop:12,"data-test":"DeleteModal-ModalFooter",children:[e(R,{primary:!0,intent:"negative",size:"full",onClick:r,"data-testid":"confirm-button",loading:a,"data-test":"DeleteModal-Button",children:i?k("noumena.noum_editor.delete_tool_confirm_button"):k("noumena.noum_editor.delete_section_confirm_button")}),e(R,{tertiary:!0,intent:"negative",size:"full",onClick:o,"data-testid":"cancel-button","data-test":"DeleteModal-Button",children:i?k("noumena.cancel"):k("noumena.noum_editor.delete_section_cancel_button")})]})]})},on=S.label`
  position: absolute;
  top: 2.5px;
  left: 0;
  width: 30px;
  height: 16px;
  border-radius: 15px;
  ${({disabled:t})=>t?"background: var(--bg-toggle-neutral-disabled)":Lt`
          background: var(--bg-toggle-neutral-default);
          cursor: pointer;
          &:hover {
            background: var(--bg-toggle-neutral-hover);
          }
        `};

  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 13.33px;
    height: 13.33px;
    margin: 1px;
    background: var(--bg-toggle-neutral-alt-default);
    /* box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2); */
    transition: 0.2s;
  }
`,al=S.div`
  position: relative;
`,nl=S.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 30px;
  height: 16px;
  &:checked + ${on} {
    background: var(--bg-toggle-brand-primary-selected);
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 13.33px;
      height: 13.33px;
      margin-left: 15px;
      transition: 0.2s;
    }
    &:hover {
      background: var(--bg-toggle-brand-primary-hover);
    }
  }
`,la=t=>m(al,{"data-test":"Switch-SwitchWrapper",children:[e(nl,{type:"checkbox",...t,"data-test":"Switch-SwitchButton"}),e(on,{htmlFor:t.id,disabled:t.disabled,"data-test":"Switch-SwitchLabel"})]}),ol=[{id:Ue.TOP,name:Ue.TOP,image:"align_top_m",text:"",labelSize:"medium"},{id:Ue.CENTER,name:Ue.CENTER,image:"align_center_m_2",text:"",labelSize:"auto"},{id:Ue.BOTTOM,name:Ue.BOTTOM,image:"align_bottom_m",text:"",labelSize:"auto"}],il=[{id:De.LEFT,name:De.LEFT,image:"left_align_m",text:"",labelSize:"medium"},{id:De.CENTER,name:De.CENTER,image:"center_align_m",text:"",labelSize:"auto"},{id:De.RIGHT,name:De.RIGHT,image:"right_align_m",text:"",labelSize:"auto"}],rl=S.div``,rn=S.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 4px;
  height: 30px;

  div {
    margin: 0px;
    gap: 4px;
  }

  label {
    height: 32px;
    width: 32px;
    padding: 0px;
    border-radius: 4px;
  }

  input {
    display: none;
  }
`,ln=Lt`
  :hover section {
    border: 1px solid var(--border-section-picker-brand-primary-default);
    div:not(.disabled) {
      border: 1px solid var(--border-section-picker-brand-primary-default);
      background: var(--bg-section-picker-brand-primary-default);
    }
    div.disabled {
      border: 1px solid var(--bg-section-picker-brand-secondary-disabled);
      background: var(--bg-section-picker-brand-secondary-disabled);
    }
  }
`,ll=S.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  height: 40px;
  border: 1px solid var(--border-card-neutral-default);
  border-radius: 8px;
  padding: 4px;
  padding-right: 13px;
  :hover {
    border: 1px solid var(--border-section-picker-brand-primary-default);
  }
  ${ln}
`,dl=S.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  box-sizing: border-box;
  padding: ${({isFullWidth:t})=>t?"7px":"12px"};
  ${({isFullWidth:t})=>t&&"width: 100%; section {border:none}"};
  ${ln}
`,je=S.section`
  display: grid;
  grid-template-columns: ${({type:t})=>t===Y.SingleColumn?"1fr":t===Y.SingleColumn_700Px?"1fr 60% 1fr":t===Y.TwoEqualColumns?"1fr 1fr":t===Y.ThreeEqualColumns?"1fr 1fr 1fr":t===Y.TwoColumnsLeftWider?"30% 1fr":t===Y.TwoColumnsRightWider&&"1fr 30%"};
  border: 1px solid var(--border-card-neutral-default);
  border-radius: 4px;
  padding: 3px;
  gap: 6px;
  width: calc(100% - 8px);
  box-sizing: border-box;

  div {
    border: 1px solid var(--border-section-picker-brand-secondary-default);
    background: var(--bg-section-picker-brand-secondary-default);
    border-radius: 4px;
    box-sizing: border-box;
    height: 24px;
  }

  .disabled {
    background: var(--bg-section-picker-neutral-disabled);
    border: 1px solid var(--bg-section-picker-neutral-disabled);
  }
`,sl=S.div`
  margin: -6px;
  margin-top: 0px;
  form {
    div {
      gap: 4px;
    }
  }
`;S.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0px 7px 0px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`;const cl=S.div`
  width: 100%;
  padding: 16px 0;
  border-top: 4px solid var(--bg-separator-neutral-default);
  border-bottom: 4px solid var(--bg-separator-neutral-default);
`,ul=S(z)`
  border-top: 1px solid var(--bg-separator-neutral-default);
`,ml=({option:t})=>{switch(t){case Y.SingleColumn_700Px:return m(je,{type:t,"data-test":"Columns-ColumnContainer",children:[e("div",{className:"disabled",children:" "}),e("div",{children:" "}),e("div",{className:"disabled",children:" "})]});case Y.TwoColumnsLeftWider:return m(je,{type:t,"data-test":"Columns-ColumnContainer",children:[e("div",{children:" "}),e("div",{children:" "})]});case Y.TwoEqualColumns:return m(je,{type:t,"data-test":"Columns-ColumnContainer",children:[e("div",{children:" "}),e("div",{children:" "})]});case Y.TwoColumnsRightWider:return m(je,{type:t,"data-test":"Columns-ColumnContainer",children:[e("div",{children:" "}),e("div",{children:" "})]});case Y.ThreeEqualColumns:return m(je,{type:t,"data-test":"Columns-ColumnContainer",children:[e("div",{children:" "}),e("div",{children:" "}),e("div",{children:" "})]});case Y.SingleColumn:default:return e(je,{type:t,"data-test":"Columns-ColumnContainer",children:e("div",{children:" "})})}},da=({onChange:t,option:a,isSelected:o})=>m(dl,{onClick:()=>t?t(a):{},isFullWidth:!t,"data-test":"ColumnOptions-OptionContainer",children:[e(ml,{option:a,"data-test":"ColumnOptions-Columns"}),t&&e(_i,{isChecked:!!o,icon:o?e(j,{name:"radio_btn_m",size:12,color:"--icon-radiobutton-brand-primary-default","data-test":"ColumnOptions-Icon"}):void 0,"data-test":"ColumnOptions-Radiobox"})]}),pl=()=>{const{section:t,space:a,setsectionStatus:o,setsectionSideBarOptions:r,sectionSideBarOptions:n,useHeightRef:d,setHeight:i,height:c,setLayoutLoading:s}=Z(),{updateNoumSectionHelper:p}=zt(),[h,u]=l.useState(!1),b=async g=>{var C;i==null||i(c||((C=d==null?void 0:d.current)==null?void 0:C.offsetHeight)),r==null||r({selectedLayout:{id:t==null?void 0:t._id,layoutType:g}}),s==null||s(!0),setTimeout(async()=>{const _=await p(a==null?void 0:a._id,{sectionId:t==null?void 0:t._id,type:g});o==null||o(He.Unsaved),_||(r==null||r({selectedLayout:{id:t==null?void 0:t._id,layoutType:t==null?void 0:t.type}}),o==null||o(void 0)),i==null||i(void 0),u(!1),s==null||s(!1)},500)},f=Object.values(Y);return m(z,{vertical:!0,padding:"0 12px",fullWidth:!0,gap:8,"data-test":"ColumnPicker-Stack",children:[e(P,{font:"footnote-bold",colorToken:"--text-card-neutral-highlighted",overflow:"ellipsis","data-test":"ColumnPicker-TSpan",children:k("noumena.noum_editor.edit_Section.section_layout")}),e(z,{fullWidth:!0,"data-test":"ColumnPicker-Stack",children:e(Ge,{hideIcons:!0,options:[],isShowEmptyText:!1,containerWidth:"218px",isAnimation:!1,containerStyle:{overflow:"auto"},optionsRenderer:()=>f.map((g,C)=>{var _;return m(l.Fragment,{children:[e(da,{onChange:b,option:g,isSelected:g===((_=n==null?void 0:n.selectedLayout)==null?void 0:_.layoutType),"data-test":`ColumnPicker-ColumnOptions-${g}`},g),f.length-1!==C&&e(Pt,{fullWidth:!0,"data-test":"ColumnPicker-Separator"})]},g)}),isOpen:h,"data-test":"ColumnPicker-Dropdown",children:({targetProps:g,targetRef:C})=>{var _;return m(ll,{style:{width:"100%"},ref:C,...g,onClick:()=>u(!h),"data-test":"ColumnPicker-DropdownPicker",children:[e(da,{option:(t==null?void 0:t.type)||((_=n==null?void 0:n.selectedLayout)==null?void 0:_.layoutType)||Y.SingleColumn,"data-test":"ColumnPicker-ColumnOptions"}),e(j,{name:"chevron_down_m",size:16,color:"--icon-button-neutral-default","data-test":"ColumnPicker-Icon"})]})}})})]})},hl=({noumSidePanelId:t})=>{var O,A,B,N;const{handleDeleteModal:a,space:o,setNoumSidePanelId:r,section:n,setsectionStatus:d,setsectionSideBarOptions:i,sectionSideBarOptions:c,duplicateHandler:s}=Z(),{removeSectionHelper:p}=La(),{updateNoumSectionHelper:h}=zt(),[u,b]=l.useState(),[f,g]=l.useState(!1),C=l.useMemo(()=>n==null?void 0:n.columns.find(M=>M._id===u),[n==null?void 0:n.columns,u]),_=l.useMemo(()=>U.nonRemovableTools((n==null?void 0:n.columns)||[]),[n==null?void 0:n.columns]),T=l.useMemo(()=>{var L,K;let M=1;const D=n==null?void 0:n.columns.find($=>$._id===u);switch(b(u?D==null?void 0:D._id:n==null?void 0:n.columns[0]._id),((L=c==null?void 0:c.selectedLayout)==null?void 0:L.layoutType)??(n==null?void 0:n.type)){case Y.ThreeEqualColumns:M=3;break;case Y.TwoColumnsLeftWider:case Y.TwoColumnsRightWider:case Y.TwoEqualColumns:M=2;break;default:b(n==null?void 0:n.columns[0]._id),M=0;break}const F=(K=n==null?void 0:n.columns)==null?void 0:K.map(($,q)=>({id:$._id,text:`${q+1}`,name:`${$._id}`,labelSize:"auto"}));return F==null?void 0:F.slice(0,M)},[n==null?void 0:n.columns,n==null?void 0:n.type,(O=c==null?void 0:c.selectedLayout)==null?void 0:O.layoutType,u]),E=async M=>{i==null||i({selectedAlignItem:{id:n==null?void 0:n._id,alignItem:M}});const D=await h(o==null?void 0:o._id,{sectionId:n==null?void 0:n._id,columnsVerticalAlignType:M});d==null||d(He.Unsaved),D||(i==null||i({selectedAlignItem:{id:n==null?void 0:n._id,alignItem:n==null?void 0:n.columnsVerticalAlignType}}),d==null||d(void 0))},x=M=>{i==null||i({columnBackground:void 0}),b(M)},w=async M=>{i==null||i({sectionBackgroud:{id:n==null?void 0:n._id,background:M.target.checked}});const D=await h(o==null?void 0:o._id,{sectionId:n==null?void 0:n._id,background:M.target.checked});d==null||d(He.Unsaved),D||(i==null||i({sectionBackgroud:{id:n==null?void 0:n._id,background:n==null?void 0:n.background}}),d==null||d(void 0))},y=async M=>{i==null||i({columnBackground:{id:C==null?void 0:C._id,background:M.target.checked}});const D=n==null?void 0:n.columns.map(L=>L._id===u?{columnId:L._id,background:M.target.checked}:{columnId:L._id,background:L.background}),F=await h(o==null?void 0:o._id,{sectionId:n==null?void 0:n._id,columns:D});if(d==null||d(He.Unsaved),!F){const L=n==null?void 0:n.columns.find(K=>K._id===u);i==null||i({columnBackground:{id:L==null?void 0:L._id,background:L==null?void 0:L.background}}),d==null||d(void 0)}},v=async()=>{if(_.length>0){g(!0);return}(n==null?void 0:n.columns.find(D=>D.tools.length>0))?a==null||a(ae.SECTION_TYPE,t):await p(t,o==null?void 0:o._id)&&(r==null||r(void 0))},I=async()=>{s==null||s(t)};return m(H,{children:[m(z,{vertical:!0,fullWidth:!0,align:"stretch",justify:"space-between","aria-label":"edit_section_side_panel","data-test":"NoumEditSection-Stack",children:[m(z,{vertical:!0,fullWidth:!0,"aria-label":"edit_section_block","data-test":"NoumEditSection-Stack",children:[m(ul,{vertical:!0,fullWidth:!0,align:"stretch",gap:8,padding:"16px 16px 0 16px","aria-label":"edit_apearance_block","data-test":"NoumEditSection-AppearanceSection",children:[e(P,{font:"footnote-bold",colorToken:"--text-card-neutral-highlighted",overflow:"ellipsis","aria-label":"apearance_text","data-test":"NoumEditSection-TSpan",children:k("noumena.noum_editor.edit_Section.appearance")}),m(z,{fullWidth:!0,align:"center",justify:"space-between","aria-label":"column_align_block","data-test":"NoumEditSection-Stack",children:[e(P,{font:"footnote",colorToken:"--text-card-neutral-highlighted",overflow:"ellipsis","aria-label":"align_items_text","data-test":"NoumEditSection-TSpan",children:k("noumena.noum_editor.edit_Section.alignitems")}),e(rn,{"aria-label":"align_columns_picker","data-test":"NoumEditSection-AlignPicker",children:e(it,{onChange:E,inputList:ol,selectedId:((A=c==null?void 0:c.selectedAlignItem)==null?void 0:A.alignItem)??(n==null?void 0:n.columnsVerticalAlignType),mode:"isActiveBackgroundOnly",fontSize:"--font-link-medium-size",iconSize:20,"data-test":"NoumEditSection-BasicChipsTabsForm"})})]}),m(z,{fixedHeight:56,fullWidth:!0,align:"center",justify:"space-between","aria-label":"change_section_background_block","data-test":"NoumEditSection-Stack",children:[e(P,{font:"footnote",colorToken:"--text-card-neutral-highlighted",overflow:"ellipsis","aria-label":"section_background_text","data-test":"NoumEditSection-TSpan",children:k("noumena.noum_editor.edit_Section.background")}),e(la,{id:"background","aria-label":"section_background_toggle",checked:((B=c==null?void 0:c.sectionBackgroud)==null?void 0:B.background)??(n==null?void 0:n.background),onChange:M=>w(M),"data-test":"NoumEditSection-Switch"})]})]}),e(cl,{"aria-label":"section_layout_container","data-test":"NoumEditSection-ColumnPickerContainer",children:e(pl,{"aria-label":"section_layout_picker","data-test":"NoumEditSection-ColumnPicker"})}),m(z,{vertical:!0,fullWidth:!0,align:"stretch",gap:8,padding:"16px","aria-label":"column_picker_block","data-test":"NoumEditSection-Stack",children:[e(P,{font:"footnote-bold",colorToken:"--text-card-neutral-highlighted",overflow:"ellipsis","aria-label":"column_settings_text","data-test":"NoumEditSection-TSpan",children:k("noumena.noum_editor.edit_Section.column_settings")}),T&&(T==null?void 0:T.length)>1&&e(sl,{"data-test":"NoumEditSection-ColumnChipsContainer",children:e(it,{onChange:x,inputList:T,selectedId:u,mode:"isBackground",isWithoutImage:!0,fontSize:"--font-footnote-regular-size",tabWidth:"100%",maxHeight:"27px",tabCSS:{margin:0},"data-test":"NoumEditSection-BasicChipsTabsForm"})})]}),m(z,{fullWidth:!0,align:"center",justify:"space-between",padding:"8px 16px","aria-label":"change_column_background_block","data-test":"NoumEditSection-Stack",children:[e(P,{font:"footnote",colorToken:"--text-card-neutral-highlighted",overflow:"ellipsis","aria-label":"column_background_text","data-test":"NoumEditSection-TSpan",children:k("noumena.noum_editor.edit_Section.column_background")}),e(la,{id:"column_background","aria-label":"column_background_toggle",checked:((N=c==null?void 0:c.columnBackground)==null?void 0:N.background)??(C==null?void 0:C.background),onChange:M=>y(M),"data-test":"NoumEditSection-Switch"})]})]}),m(z,{gap:8,padding:"16px","aria-label":"bottom_actions_container","data-test":"NoumEditSection-Stack",children:[e(R,{size:"full_small",tertiary:!0,secondary:!0,onClick:I,"aria-label":"duplicate_button","data-test":"NoumEditSection-Button",children:k("noumena.noum_editor.edit_Section.button.duplicate")}),e(R,{size:"full_small",intent:"negative",secondary:!0,onClick:v,"aria-label":"delete_button","data-test":"NoumEditSection-Button",children:k("noumena.noum_editor.edit_Section.button.delete")})]})]}),e(Lo,{isOpen:f,onClose:()=>g(!1),nonRemovableToolList:_,"data-test":"NoumEditSection-NonRemovableDeleteModal"})]})},bl=S.div`
  width: 226px;
`,gl=S.input`
  width: 218px;
  -webkit-appearance: none;
  background: var(--bg-progressbar-neutral-default);
  background-image: linear-gradient(
    var(--bg-progressbar-brand-primary-default),
    var(--bg-progressbar-brand-primary-default)
  );
  background-size: ${({percent:t})=>`${t}% 100%`};
  background-repeat: no-repeat;
  border-radius: 32px;
  margin: 0;

  ::-webkit-slider-runnable-track {
    height: 8px;
  }
  ::-webkit-slider-thumb {
    z-index: 4;
    appearance: none;
    cursor: pointer;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: relative;
    top: -6px;
    outline: 2px solid var(--color-base-primary-main);
    background: white;
    transition: background 0.3s ease-in-out;
  }
`,fl=({min:t=0,max:a=100,initialValue:o=30,onChange:r,changedValue:n,onChangeEnd:d})=>{const[i,c]=l.useState(o),s=l.useCallback(h=>{const u=h.target.value;c(u),r==null||r(u)},[r]),p=l.useMemo(()=>((n||i)-t)*100/(a-t),[n,a,t,i]);return m(bl,{"data-test":"Slider-SliderWrapper",children:[e(gl,{type:"range",min:t,max:a,onChange:s,value:n||i,percent:p,onMouseUp:d,"data-test":"Slider-SliderRangeInput"}),e(z,{fullWidth:!0,justify:"end","data-test":"Slider-Stack",children:m(P,{font:"footnote","data-test":"Slider-TSpan",children:[n||i,"%"]})})]})},Nt=({separatorSize:t,children:a})=>m(H,{children:[t&&e(Pt,{fullWidth:!0,size:t,noMargin:!0,"data-test":"EditBlockWrapper-Separator"}),e(z,{vertical:!0,fullWidth:!0,"data-testid":"edit-block-wrapper",style:{padding:"16px 12px"},"aria-label":"edit_block_wrapper","data-test":"EditBlockWrapper-Stack",children:a})]}),Cl=S(z)`
  & > div {
    min-width: 56px;
  }
`,yl=S.div`
  width: ${({isBanner:t})=>t&&"173px"};
  height: ${({isBanner:t})=>t&&"36px"};
  cursor: pointer;
  vertical-align: middle;
  gap: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(
    ${({isBanner:t})=>t?"--color-base-gray-transparency-40":"none"}
  );
`,xl=({onClick:t})=>e(yl,{"data-testid":"avatarEditButton",onClick:t,"data-test":"UploadFileButton-StyledButton",children:e(P,{font:"footnote",colorToken:"--bg-button-brand-primary-default","data-test":"UploadFileButton-TSpan",children:k("noumena.noum_editor.edit_tool.button.replace")})}),_l=l.memo(t=>{const{noumLayoutToolUpdating:a,mediaUploadPercentage:o,setMediaUploadPercentage:r}=Z(),{url:n,uploadPercentage:d,isUploadComplete:i,isUploadStarted:c,fileName:s,fileSize:p,onClick:h}=t;return l.useEffect(()=>{const u=c?i?100:d%100:0;r==null||r(u)},[i,c,o,r,d]),m(H,{children:[e(ca,{url:n,size:"XL",isUploadComplete:i&&!a,isUploadStarted:c,spinnerColor:"var(--icon-spinner-neutral-alt-default)",overlayColor:"var(--overlay-avatar-neutral-default)","data-test":"MediaPreview-Avatar"}),m(z,{vertical:!0,justify:"space-between","data-test":"MediaPreview-Stack",children:[s&&e(P,{font:"footnote",colorToken:"--text-card-neutral-highlighted","data-test":"MediaPreview-TSpan",children:oo(s)}),p&&e(P,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"MediaPreview-TSpan",children:io(p)}),e(xl,{onClick:h,"data-test":"MediaPreview-UploadFileButton"})]})]})}),Sl=l.memo(({url:t,maximumFileSize:a,defaultImagePlaceHolder:o,onContentChange:r,acceptedFileTypes:n,fileSize:d,fileName:i,onUploadFile:c})=>e(ro,{url:t||"",maxSize:a,acceptedFileTypes:n,onContentChange:r,generateThumbnail:!0,onUploadFile:c,"data-test":"UploadFile-Upload",children:({triggerElRef:s,...p})=>e(Cl,{gap:12,ref:s,align:"center","data-test":"UploadFile-MediaInfoWrapper",children:e(_l,{url:t||o,isUploadComplete:p.isUploadComplete,isUploadStarted:p.isUploadStarted,uploadPercentage:p.uploadPercentage,fileName:i,fileSize:d,onClick:p.onClickHandler,"data-test":"UploadFile-MediaPreview"})})})),Tl=({noumSidePanelId:t})=>{var N;const{handleDeleteModal:a,activeEditingTool:o,handleChangeToolMetaValue:r,toolMetaValue:n,updateToolMetaValue:d,updateToolMutation:i,duplicateHandler:c,space:s,setMediaUploadTempFile:p}=Z(),[h,u]=l.useState(!1),b=l.useMemo(()=>U.isAvailableToDuplicate(o),[o]),f=l.useMemo(()=>U.isNotAvailableToDelete(o),[o]),g=l.useMemo(()=>U.isMediaElement(o),[o]),C=l.useMemo(()=>U.isImageElement(o),[o]),{setNoumLayoutToolMetaValueHelper:_}=lo(),T=!1,{subWalletDeleteHelper:E}=Oo(),x=()=>{if(!(o!=null&&o.elementType))return"";const M=ni[o.elementType];if(M==="")return"This is a short tool description. It contains max 150 characters.";const D=M.trim();return D.length>150?`${D.substring(0,147)}...`:D},w=async M=>{r==null||r({align:M}),await _({toolId:o==null?void 0:o._id,metaValues:{align:M}},s==null?void 0:s._id)},y=l.useCallback(M=>{r==null||r({percentageSize:Number(M)})},[r]),v=M=>{p==null||p(M)},I=l.useCallback((M,D)=>{if(p==null||p(void 0),!o)return;const F={...U.getBodyContentJson(o),fileSize:D==null?void 0:D.fileSize,fileName:D==null?void 0:D.fileName,...(D==null?void 0:D.type)==="video"&&{thumbnail:D.thumbnail,videoURL:D.videoURL}},L={elementId:t,bodyContent:M,bodyContentJson:Object.keys(F).length>0?F:null,status:Mt.Unsaved};i==null||i(L)},[o,t,p,i]),O=l.useMemo(()=>U.getBodyContentJson(o),[o]),A=l.useCallback(()=>{a==null||a(ae.TOOL_TYPE,t)},[a,t]),B=()=>{u(!h)};return m(H,{children:[m(z,{vertical:!0,fullWidth:!0,align:"stretch",justify:"space-between","aria-label":"edit_tool_side_panel","data-test":"EditTool-Stack",children:[m("div",{children:[e(z,{padding:"0 12px 4px 12px","aria-label":"tool_description","data-test":"EditTool-Stack",children:e(P,{font:"body-m",colorToken:"--text-card-neutral-default","data-test":"EditTool-TSpan",children:x()})}),g&&m(H,{children:[e(Nt,{separatorSize:"thick","data-test":"EditTool-EditBlockWrapper",children:m(H,{children:[e(P,{font:"footnote-bold","aria-label":"file_uploaded_text","data-test":"EditTool-TSpan",children:k("noumena.noum_editor.tool.image.file_uploaded")}),e(z,{gap:12,"aria-label":"uploaded_file_block","data-test":"EditTool-Stack",children:e(Sl,{acceptedFileTypes:C?so:co,url:C?U.getBodyContent(o):(N=U.getBodyContentJson(o))==null?void 0:N.thumbnail,onContentChange:I,maximumFileSize:C?20:200,fileSize:O==null?void 0:O.fileSize,fileName:O==null?void 0:O.fileName,onUploadFile:v,"data-test":"EditTool-UploadFile"})})]})}),e(Nt,{separatorSize:"thick","data-test":"EditTool-EditBlockWrapper",children:m(H,{children:[e(P,{font:"footnote-bold","aria-label":"image_size_text","data-test":"EditTool-TSpan",children:k("noumena.noum_editor.tool.image.size")}),e(fl,{onChange:y,initialValue:n==null?void 0:n.percentageSize,changedValue:n==null?void 0:n.percentageSize,onChangeEnd:d,"data-test":"EditTool-Slider"})]})}),e(Nt,{separatorSize:"thick","data-test":"EditTool-EditBlockWrapper",children:m(z,{fullWidth:!0,align:"center",justify:"space-between","aria-label":"image_align_block","data-test":"EditTool-Stack",children:[e(P,{font:"footnote-bold","aria-label":"image_align_text","data-test":"EditTool-TSpan",children:k("noumena.noum_editor.tool.image.align")}),e(rn,{"aria-label":"image_align_picker","data-test":"EditTool-AlignPicker",children:e(it,{onChange:w,inputList:il,selectedId:(n==null?void 0:n.align)||De.CENTER,mode:"isActiveBackgroundOnly",fontSize:"--font-link-medium-size",iconSize:20,"data-test":"EditTool-BasicChipsTabsForm"})})]})})]}),T]}),m(z,{gap:8,padding:"12px","aria-label":"bottom_actions_container","data-test":"EditTool-Stack",children:[b&&e(R,{size:"full_small",tertiary:!0,secondary:!0,onClick:()=>c==null?void 0:c(o==null?void 0:o._id,!0),"aria-label":"duplicate_button","data-test":"EditTool-Button",children:k("noumena.noum_editor.edit_tool.duplicate")}),!f&&e(R,{size:"full_small",intent:"negative",secondary:!0,"aria-label":"delete_button",onClick:async()=>{V.Wallet===(o==null?void 0:o.elementType)?E(s==null?void 0:s._id,A,B):A()},"data-test":"EditTool-Button",children:k("noumena.noum_editor.edit_tool.delete")})]})]}),e(zo,{isOpen:h,handleClose:B,"data-test":"EditTool-NonZeroWalletModal"})]})},kl=({open:t,onClose:a,noumSidePanelType:o=ae.SECTION_TYPE,noumSidePanelId:r,...n})=>{const{activeEditingTool:d}=Z(),{width:i}=we(),c=l.useMemo(()=>i>=Ct.TABLET_L,[i]),s=l.useRef(null);uo(s,!0,a,{excludes:['.modal-root [data-testid="dropdown-container"]','.NoumEditor-root [data-testid="hoverWrapper-container"]','.modal-root [data-testid="nonremovable-tools-modal"]']});const p=o===ae.TOOL_TYPE,h=t&&(p?!!d&&r===d._id&&(U.isMediaElement(d)?U.isImageAndVideoNotEmpty(d):!0):!0),u=l.useMemo(()=>p?d!=null&&d.elementType?oi[d.elementType]:k("noumena.noum_editor.tool"):k("noumena.noum_editor.edit_Section"),[d==null?void 0:d.elementType,p]);return e(rl,{ref:s,"aria-label":"side_panel_wrapper","data-test":"NoumSidePanel-NoumSidePanelWrapper",children:e(Bt,{className:"noums_container",placement:"right",enableAnimation:!0,nonBlockingModal:c,disableEscapeKeyDown:!0,isBackgroundOpacity:!c,height:"100%",padding:0,width:"250px",title:u,titleFont:"body-m-bold",open:h,onClose:a,rightSecondaryIcon:e(j,{name:"close_m",color:"--icon-card-neutral-default",size:24,onClick:a,"data-test":"NoumSidePanel-Icon"}),...n,"data-test":"NoumSidePanel-SideModal",children:p?e(Tl,{noumSidePanelId:r,"data-test":"NoumSidePanel-EditTool"}):e(hl,{noumSidePanelId:r,"data-test":"NoumSidePanel-NoumEditSection"})})})},dn=({position:t=0,setIsLoading:a})=>{const[o,r]=l.useState(!1);return e(Rt,{offsetY:68,isOpen:o,onClose:()=>r(!1),renderPopoverContent:()=>e(ii,{position:t,setIsPopover:r,setIsLoading:a,"data-test":"AddSectionPopover-SectionLayoutPicker"}),renderTargetContent:()=>e($a,{onClick:()=>r(!0),"data-test":"AddSectionPopover-AddSectionComponent"}),"data-test":"AddSectionPopover-PopoverWrapper"})};mo.None;const vl=[{key:0,title:`${k("noumena.noum_editor.empty_state_build_title")}`,description:`${k("noumena.noum_editor.empty_state_description")}`},{key:1,title:`${k("noumena.noum_editor.empty_state_use_title")}`,description:`${k("noumena.noum_editor.empty_state_description")}`}],El=S(po)`
  width: 100%;
  display: flex;
  transition: all 0.1s ease-in-out;
  justify-content: center;
  align-items: center;
  border: 2px dashed var(--color-base-gray-80);
  cursor: pointer;
  padding: 40px 0;
  ${({isColumnBackground:t})=>!t&&"background: none"};
  :hover {
    border-color: var(--border-column-brand-secondary-default);
    background-color: var(--bg-column-brand-secondary-default);
  }
`,wl=t=>{var p;const{spaceId:a,columnId:o,col:r,sectionId:n}=t,[d,i]=l.useState(!1),{sectionSideBarOptions:c}=Z(),s=l.useMemo(()=>{var h;return(r==null?void 0:r._id)===((h=c==null?void 0:c.selectedLayout)==null?void 0:h.id)},[r==null?void 0:r._id,(p=c==null?void 0:c.selectedLayout)==null?void 0:p.id]);return e(Rt,{isOpen:d,width:500,offsetY:10,onClose:()=>i(!1),renderPopoverContent:()=>e(Ua,{spaceId:a||"",handleSelectElementType:()=>i(!1),columnId:o||"",sectionId:n,"data-test":"NoumContentElement-Toolbox"}),renderTargetContent:()=>{var h;return e(El,{isColumnBackground:s?(h=c==null?void 0:c.columnBackground)==null?void 0:h.background:r==null?void 0:r.background,onClick:u=>{u.stopPropagation(),i(!0)},"data-test":"NoumContentElement-NoumContentElementWrapper",children:m(z,{gap:9,align:"center","data-test":"NoumContentElement-Stack",children:[e(j,{name:"plus_icon",size:16,color:"--icon-add-content-brand-primary-default","data-test":"NoumContentElement-Icon"}),e(P,{"aria-label":"add_content",font:"body-m",colorToken:"--text-add-content-brand-primary-default","data-test":"NoumContentElement-TSpan",children:k("noumena.noum_editor.column_content")})]})})},"data-test":"NoumContentElement-PopoverWrapper"})},Nl=t=>{const[a,o]=l.useState({x:0,y:0});return l.useEffect(()=>{const r=d=>{o({x:d.clientX,y:d.clientY})},n=()=>{t==null||t()};return window.addEventListener("mousedown",r),window.addEventListener("mouseup",n),()=>{window.removeEventListener("mousedown",r),window.removeEventListener("mouseup",n)}},[]),{coords:a}},Ml=l.memo(t=>{var $,q;const{tool:a,provided:o,noumSidePanelId:r,isDragging:n,spaceId:d,columnId:i,isSectionBg:c,col:s,setOnDragInitiateId:p,onDragInitiateId:h,index:u}=t,b=l.useRef(null),[f,g]=l.useState(0),[C,_]=l.useState(void 0),T=()=>{p==null||p("")},{coords:E}=Nl(T),[x,w]=l.useState(void 0),{handleEditModal:y,sectionSideBarOptions:v}=Z(),I=l.useMemo(()=>h===(a==null?void 0:a._id),[h,a==null?void 0:a._id]),O=r===(a==null?void 0:a._id),A=(s==null?void 0:s._id)===(($=v==null?void 0:v.columnBackground)==null?void 0:$.id),B=l.useMemo(()=>{if(!a)return 1;const W=U.getPosition(a,!0);return x===ri.Above?W-.5:W+.5},[x,a]),N=l.useCallback(W=>{w(W)},[]),M=l.useCallback(W=>{W.stopPropagation(),y==null||y(ae.TOOL_TYPE,a==null?void 0:a._id,a)},[y,a]),D=l.useMemo(()=>(a==null?void 0:a.elementType)===V.Video||(a==null?void 0:a.elementType)===V.Text||(a==null?void 0:a.elementType)===V.Image||(a==null?void 0:a.elementType)===V.BusinessBrief,[a==null?void 0:a.elementType]),F=l.useMemo(()=>(a==null?void 0:a.elementType)===V.Userposts||(a==null?void 0:a.elementType)===V.Calendar||(a==null?void 0:a.elementType)===V.Wallet||(a==null?void 0:a.elementType)===V.Message||(a==null?void 0:a.elementType)===V.QuickQuestions||(a==null?void 0:a.elementType)===V.FilesManager,[a==null?void 0:a.elementType]),L=l.useMemo(()=>(a==null?void 0:a.elementType)===V.Skills||(a==null?void 0:a.elementType)===V.Usernetwork,[a==null?void 0:a.elementType]),K=l.useMemo(()=>({duplicate:a&&!U.isAvailableToDuplicate(a),edit:a&&U.isMediaElement(a)&&!U.isImageAndVideoNotEmpty(a),delete:a&&U.isNotAvailableToDelete(a)}),[a]);return l.useLayoutEffect(()=>{var W;_((W=b.current)==null?void 0:W.clientWidth)},[]),m(li,{"aria-label":`tool_${u+1}`,ref:o==null?void 0:o.innerRef,...o==null?void 0:o.draggableProps,...o==null?void 0:o.draggableProps.style,"data-testid":a==null?void 0:a._id,insertDirection:x,style:{...o==null?void 0:o.draggableProps.style,width:I?"303px":"auto",left:I?`${E.x-(D?170:200)}px`:"",top:I?`${E.y}px`:"",marginLeft:I?"auto":"",height:I?`${f}px`:"auto",zIndex:I?"5000":"auto"},"data-test":"DragableElement-DNDElementContainer",children:[x&&e(Di,{spaceId:d,columnId:i||"",isOpen:!!x,onClose:()=>w(void 0),position:B,baseElementId:(a==null?void 0:a._id)||void 0,"data-test":"DragableElement-AddToolPopover"}),e(Oa,{id:a==null?void 0:a._id,className:"child",type:ae.TOOL_TYPE,isActive:O,isDragging:n,onInsert:N,isSectionBackground:D&&c,setOnDragInitiateId:p,isTool:I,setCurrentElementHeight:g,elementRef:b,elementType:a==null?void 0:a.elementType,isColumnBackground:D&&A?(q=v==null?void 0:v.columnBackground)==null?void 0:q.background:s==null?void 0:s.background,disable:K,...t,"data-test":"DragableElement-HoverWrapper",children:n||I?e(di,{"data-test":"DragableElement-DraggingElement",children:m(z,{gap:22,align:"center","data-test":"DragableElement-Stack",children:[e(j,{name:"post_m",size:24,"data-test":"DragableElement-Icon"}),e(P,{font:"footnote",colorToken:" --text-card-neutral-default","data-test":"DragableElement-TSpan",children:k("noumena.noum_editor.drag_item")})]})}):m(si,{ref:b,onClick:W=>M(W),className:"element-container",isDragging:n,isBackground:D,isSkillOrNetwork:L,"data-test":"DragableElement-ElementWrapper",children:[F&&e(ci,{"data-test":"DragableElement-NonIntrectiveOverlay"}),e(ui,{className:"element-container",spaceId:d,element:a,id:`${a==null?void 0:a._id}`,currentTitle:(a==null?void 0:a.headerContent)??(a==null?void 0:a.elementType)??"UNKNOWN",isEditing:!0,columnWidth:C,isActiveTool:O,isNoumEditor2:!0,"data-test":"DragableElement-Element"})]})},a==null?void 0:a._id)]})}),Il=l.memo(t=>{const{index:a,tool:o}=t;return e(wa,{draggableId:`${o==null?void 0:o._id}`,index:a,disableInteractiveElementBlocking:!0,"data-test":"DragableElementArea-Draggable",children:(r,n)=>e(Ml,{...t,isDragging:n.isDragging,provided:r,index:a,"data-test":"DragableElementArea-DragableElement"})})});var Oe=(t=>(t.DROPPABLE_SECTION="droppableSection",t.DROPPABLE_ELEMENT="droppableElement",t))(Oe||{});const Dl=t=>{var _,T;const{tools:a,columnId:o,placeholderProps:r,col:n,isSectionLayout:d,onDragInitiateId:i,setOnDragInitiateId:c}=t,{sectionSideBarOptions:s,layoutLoading:p,space:h}=Z(),u=l.useRef(null),b=l.useMemo(()=>a?U.filterMasterElement(a,(h==null?void 0:h.type)===ke.Home):[],[h==null?void 0:h.type,a]),f=(n==null?void 0:n._id)===((_=s==null?void 0:s.columnBackground)==null?void 0:_.id),C=b.some(E=>E._id===i)?(T=u.current)==null?void 0:T.clientHeight:void 0;return p&&d?e(be,{"data-test":"DroppableElementArea-Spinner"}):e(Na,{droppableId:o,type:Oe.DROPPABLE_ELEMENT,"data-test":"DroppableElementArea-Droppable",children:(E,x)=>{var w;return m(mi,{id:o,ref:E.innerRef,isDraggingOver:x.isDraggingOver,isDraggingFrom:!!x.draggingFromThisWith,...E.droppableProps,"data-testid":"column",isBackground:f?(w=s==null?void 0:s.columnBackground)==null?void 0:w.background:n==null?void 0:n.background,"data-test":"DroppableElementArea-DropZoneColumn",children:[e(pi,{ref:u,height:C,"data-test":"DroppableElementArea-EditColumnContainer",children:b&&b.length>0?b.map((y,v,I)=>l.createElement(Il,{...t,key:y._id,index:v,currentIndex:v,totalIndex:b.length-1,tool:y,lastItem:I.length-1===v,placeholderProps:r,setOnDragInitiateId:c,onDragInitiateId:i,"data-test":"DroppableElementArea-DragableElementArea"})):!x.isDraggingOver&&e(wl,{...t,"data-test":"DroppableElementArea-NoumContentElement"})}),x.isDraggingOver&&e(hi,{placeholderProps:r,"data-test":"DroppableElementArea-DroppableElement"}),E.placeholder]})}})},Pl=t=>{var y,v,I,O,A,B;const{setNoumSidePanelId:a,noumSidePanelId:o,setNoumSidePanelType:r,section:n,lift:d,index:i}=t,{isSmallerThanLaptop:c}=ha(),{sectionSideBarOptions:s,height:p,setHeight:h,useHeightRef:u}=Z(),b=(n==null?void 0:n._id)===((y=s==null?void 0:s.sectionBackgroud)==null?void 0:y.id),f=(n==null?void 0:n._id)===((v=s==null?void 0:s.selectedAlignItem)==null?void 0:v.id),g=(n==null?void 0:n._id)===((I=s==null?void 0:s.selectedLayout)==null?void 0:I.id),C=(n==null?void 0:n._id)===o,_=l.useMemo(()=>n==null?void 0:n.columns.some(N=>N.tools.length>0),[n==null?void 0:n.columns]),T=l.useCallback(async N=>{if(!d)return;const M=d(`${n==null?void 0:n._id}`);if(!M)return;const{moveDown:D,moveUp:F,drop:L}=M;N==="up"&&await wt(F,100),N==="down"&&await wt(D),await wt(L,100)},[d,n==null?void 0:n._id]),E=l.useCallback(()=>T("up"),[T]),x=l.useCallback(()=>T("down"),[T]),w=l.useCallback(N=>{var M;h==null||h((M=u==null?void 0:u.current)==null?void 0:M.offsetHeight),N.stopPropagation(),N.defaultPrevented||(r==null||r(ae.SECTION_TYPE),a==null||a(n==null?void 0:n._id))},[n==null?void 0:n._id,h,a,r,u]);return e(H,{children:e(Oa,{id:n==null?void 0:n._id,className:"parent",type:ae.SECTION_TYPE,isActive:o===(n==null?void 0:n._id),onUpClick:E,onDownClick:x,...t,"data-test":"NoumSections-HoverWrapper",children:e(bi,{"aria-label":`section_${i+1}`,ref:C?u:null,height:g?p:void 0,isBackground:b?(O=s==null?void 0:s.sectionBackgroud)==null?void 0:O.background:n==null?void 0:n.background,isEmptySection:_,onClick:N=>w(N),isEdit:!0,"data-test":"NoumSections-NoumSectionContainer",children:e(gi,{id:n==null?void 0:n._id,noumSectionType:g?(A=s==null?void 0:s.selectedLayout)==null?void 0:A.layoutType:n==null?void 0:n.type,isSmallerThanLaptop:c,sectionAlign:f?(B=s==null?void 0:s.selectedAlignItem)==null?void 0:B.alignItem:n==null?void 0:n.columnsVerticalAlignType,"data-test":"NoumSections-NoumSectionLayout",children:n==null?void 0:n.columns.map(N=>{var M;return e(l.Fragment,{children:e(Dl,{tools:N.tools,columnId:N._id,setNoumSidePanelId:a,setNoumSidePanelType:r,noumSidePanelId:o,col:N,isSectionLayout:g,sectionId:n._id,isSectionBg:b?(M=s==null?void 0:s.sectionBackgroud)==null?void 0:M.background:n==null?void 0:n.background,...t,"data-test":"NoumSections-DroppableElementArea"})},N._id)})})})})})},Al=l.memo(t=>{const{section:a,isDragging:o,provided:r,currentIndex:n}=t,[d,i]=l.useState(!1),c=n===U.getSectionPosition(a)-1;return m(fi,{ref:r==null?void 0:r.innerRef,...r==null?void 0:r.draggableProps,isDragging:o,"data-testid":a==null?void 0:a._id,"data-test":"DragableSection-DNDContainer",children:[d&&c&&m(H,{children:[e(ka,{width:"100%",height:134,borderRadius:12,enableAnimation:!0,baseColor:"var(--color-base-gray-100)","data-test":"DragableSection-Skeleton"}),e(Q,{height:12,"data-test":"DragableSection-Spacer"})]}),e(dn,{position:U.getSectionPosition(a),setIsLoading:i,"data-test":"DragableSection-AddSectionPopover"}),e(Q,{height:12,"data-test":"DragableSection-Spacer"}),e(Pl,{provided:r,currentIndex:n,...t,"data-test":"DragableSection-NoumSections"},a==null?void 0:a._id)]})}),Bl=l.memo(t=>{const{index:a,section:o}=t;return e(wa,{draggableId:`${o==null?void 0:o._id}`,index:a,disableInteractiveElementBlocking:!0,"data-test":"DragableSectionArea-Draggable",children:(r,n)=>e(Al,{...t,isDragging:n.isDragging,provided:r,index:a,"data-test":"DragableSectionArea-DragableSection"})})}),Ll=t=>{const{sections:a}=t;return e(Na,{droppableId:"Section_edit_list",type:Oe.DROPPABLE_SECTION,"data-test":"DroppableSectionArea-Droppable",children:(o,r)=>m(Ci,{ref:o.innerRef,isDraggingOver:r.isDraggingOver,isDraggingFrom:!!r.draggingFromThisWith,...o.droppableProps,"data-testid":"rearrange-wapper","data-test":"DroppableSectionArea-DropZone",children:[a==null?void 0:a.map((n,d)=>l.createElement(Bl,{...t,key:n._id,index:d,currentIndex:d,totalIndex:a.length-1,section:n,"data-test":"DroppableSectionArea-DragableSectionArea"})),o.placeholder]})})},Ol=t=>{const{id:a,space:o,handleEditModal:r,setHeight:n}=Z(),{setSections:d,sections:i}=t,c=l.useRef(null),[s,p]=l.useState(!1),[h,u]=l.useState(""),[b,f]=l.useState(),g=y=>{c.current=y},{moveToolToNoumLayoutColumnHelper:C}=Ti(),{updateSectionPositionHelper:_}=ki(),T=l.useCallback(y=>{if(s)return null;const v=c.current;if(!v)return null;const I=v.tryGetLock(y,()=>{});return I?I.snapLift():null},[s]),E=l.useCallback(y=>{if(p(!0),y.type===Oe.DROPPABLE_ELEMENT){const v=ho(y);f({dragX:v.dragX,dragY:v.dragY,dragHeight:v.dragHeight,dragWidth:v.dragWidth,dropWidth:v.dropWidth,dropHeight:v.dropHeight})}},[]),x=l.useCallback(y=>{p(!1),u("");const{source:v,destination:I}=y;if(!I)return;const O=v.index,A=I==null?void 0:I.index,B=ko.cloneDeep(i)||[];if(y.type===Oe.DROPPABLE_SECTION){const N={sectionId:y.draggableId,position:A+1};if(!i)return;const M=Qt(B,O,A);d==null||d(M),_(N,a,O,A)}else if(y.type===Oe.DROPPABLE_ELEMENT){const{section:N,sectionIndex:M}=qe(v.droppableId,B),{column:D,columnIndex:F}=Ke(v.droppableId,N==null?void 0:N.columns),{section:L,sectionIndex:K}=qe(I.droppableId,B),{column:$,columnIndex:q}=Ke(I.droppableId,(L==null?void 0:L._id)!==(N==null?void 0:N._id)?L==null?void 0:L.columns:N==null?void 0:N.columns),W=bo(D==null?void 0:D.tools,o==null?void 0:o.type),ee={columnId:I.droppableId,toolId:(D==null?void 0:D.tools[v.index]._id)||"",position:1};if(v.droppableId===I.droppableId){if(ee.position=I.index+1,D&&N){const le=Qt(W,O,A),pe={...D,tools:le},de=(N==null?void 0:N.columns)||[];de.splice(F,1,pe);const se={...N,columns:de};B.splice(M,1,se),d==null||d(B)}}else if(ee.position=I.index+1,D&&$&&N&&L){const[le]=D.tools.splice(O,1);$.tools.splice(I.index,0,le);const pe=(N==null?void 0:N.columns)||[],de=(L==null?void 0:L.columns)||[];pe[F]=D,de[q]=$;const se={...N,columns:pe},ce={...L,columns:de};B[M]=se,B[K]=ce,d==null||d(B)}ee.toolId!==""&&(o!=null&&o._id)&&C(ee,o._id,v,I),r==null||r(ae.TOOL_TYPE,y.draggableId,$==null?void 0:$.tools.find(le=>le._id===y.draggableId)),n==null||n(void 0)}},[r,C,i,n,d,o==null?void 0:o._id,o==null?void 0:o.type,a,_]);return e(H,{children:e(Io,{onDragStart:E,onDragEnd:x,sensors:[g],onDragUpdate:y=>{if(y.type===Oe.DROPPABLE_ELEMENT){const v=go(y);if(!v)return;f({dragX:v.dragX,dragY:v.dragY,dragHeight:v.dragHeight,dragWidth:v.dragWidth,dropWidth:v.dropWidth,dropHeight:v.dropHeight})}},"data-test":"Rearrage-DragDropContext",children:e(Ll,{spaceId:a,lift:T,isHomeNoum:(o==null?void 0:o.type)===ke.Home,placeholderProps:b,isElementDragging:s,onDragInitiateId:h,setOnDragInitiateId:u,...t,"data-test":"Rearrage-DroppableSectionArea"})})})},Hl=t=>{const{flags:{noumEditor2:a}}=Ee(),{sections:o}=Z(),r=Ot(),n=Ta(),[d,i]=l.useState(!1),[c,s]=l.useState(),{width:p}=we(),h=l.useMemo(()=>p<=Ct.TABLET_L,[p]);return l.useEffect(()=>{a&&r({pathname:n.pathname,search:"?new=true"},{replace:!0})},[n.pathname,r,a]),l.useEffect(()=>{s(o)},[o]),e(fo,{"data-test":"EditNoumBody-Container",children:c&&c.length>0?m(H,{children:[e(Ol,{sections:c,setSections:s,...t,"data-test":"EditNoumBody-Rearrage"}),e(Q,{height:4,"data-test":"EditNoumBody-Spacer"}),e(dn,{position:sa.getSectionMaxPosition(c)+1,setIsLoading:i,"data-test":"EditNoumBody-AddSectionPopover"}),d&&m(H,{children:[e(Q,{height:4,"data-test":"EditNoumBody-Spacer"}),e(ka,{width:"100%",height:134,borderRadius:12,enableAnimation:!0,baseColor:"var(--color-base-gray-100)","data-test":"EditNoumBody-Skeleton"})]})]}):e(z,{"aria-label":"noum_empty_state",gap:16,vertical:h,"data-test":"EditNoumBody-Stack",children:vl.map(u=>e(yi,{title:u.title,description:u.description,"data-test":"EditNoumBody-EmptyNoumState"},u.key))})})},id=({id:t})=>{const{space:a,hasDraft:o,hasPublished:r,hasUnsaved:n,hasUnsavedPermissions:d,loading:i,publishedDate:c,lastChangedDate:s,isOpen:p,isOwner:h,isArchived:u,setOpenArchive:b,isOnLoad:f,openArchive:g,handleClose:C,sideBarOptionSelected:_,onArchive:T,openInvites:E,setOpenInvites:x,openPermission:w,setOpenPermission:y,openManageMembers:v,setOpenManageMembers:I,openNoumAds:O,setOpenNoumAds:A,openBroadcast:B,setOpenBroadcast:N,isVisited:M,handleMarkAsVisited:D,campaigns:F,campaignsLoading:L,fetchMoreCampaigns:K,infiniteState:$,onRefetchCampaigns:q,setIsRestored:W,isRestored:ee,linkedNoumsCount:le,unlinkOnArchive:pe,unlinkArchivingLoader:de,links:se,openThemePanel:ce,setOpenThemePanel:xe,isNavigateToCustomPreview:_e,setNavigateToCustomPreview:Se,isSettingTheme:Ne,markSpaceAsEditedLoading:Pe,connections:Me,approvedConnectionsLoading:X,approvedConnections:Xe,approvedInfiniteState:ze,fetchMoreApprovedConnections:J,refetchSpaceById:Qe,openNoumenaCopilot:dt,setOpenNoumenaCopilot:Fe,openRestoreModal:xt,setOpenRestoreModal:_t,hasDraftNoumLayout:st,hasUnsavedNoumLayout:ct,hasPublishedNoumLayout:St,setsectionStatus:ut}=va(t),{t:mt}=G(),[pt,Ae]=l.useState(!1),[Ie,ht]=l.useState(""),[Be,Ze]=l.useState(),[$e,Je]=l.useState(),[he,Te]=l.useState(!1),[Le,sn]=l.useState(""),Tt=Ot(),{removeSectionHelper:cn,loading:un}=La(),{removeToolFromNoumLayoutHelper:mn,loading:pn}=vi();l.useEffect(()=>{var et,$t;ht("");const te=U.isInvalidTool((et=a==null?void 0:a.layout)==null?void 0:et.sections);te!=null&&te.length&&ht(Ca(($t=te==null?void 0:te[0])==null?void 0:$t.elementType))},[a,mt]);const hn=()=>{N(!0),Ae(!1)},bn=()=>{W(!0),Qe()},gn=l.useMemo(()=>(se==null?void 0:se.linkedNoums.map(te=>({...te})))||[],[se]),fn=l.useCallback((te,et)=>{te&&_e?vo(Co.NOUM_CUSTOM_PREVIEW,{id:t}):et&&(a==null?void 0:a.type)===ke.Project?Tt(et,{replace:!0}):Tt(-1)},[t,_e,Tt,a==null?void 0:a.type]),Cn=async()=>{if(!Le||Le==="")return;let te=!1;if(a!=null&&a._id)if($e===ae.SECTION_TYPE)te=await cn(Le,a._id);else if($e===ae.TOOL_TYPE)te=await mn(Le,a._id);else return;te&&Te(!1)};return i&&!a?e(be,{"data-test":"EditNoum-Spinner"}):m(ya,{space:a,loading:i,id:t,setisDeleteModal:Te,setNoumSectionToolType:Je,setNoumSidePanelId:Ze,noumSidePanelId:Be,refetchSpaceById:Qe,setDeletedId:sn,setsectionStatus:ut,"data-test":"EditNoum-EditChamberProvider",children:[a&&h&&!u&&m(xa,{"data-testid":"EDIT-CHAMBER",className:"App",applyMinHeight:!1,"aria-label":"noum-layout","data-test":"EditNoum-AppStyled",children:[e(_a,{isBorderRadius:!1,style:{padding:"0px"},"aria-label":"noum-header","data-test":"EditNoum-Header",children:e(el,{publishedDate:c,lastChangedDate:s,hasUnsaved:ct||n,hasUnsavedPermissions:d,hasDraft:st||o,hasPublished:St||r,spaceId:t,space:a,emptyElementErrorMessage:Ie,onChamberRestore:bn,isRestored:ee,isNavigateToCustomPreview:_e,cancelNavigateToCustomPreview:()=>Se(!1),onNavigate:fn,onSelectEditOption:_,isOpenRestoreModal:xt,setOpenRestoreModal:_t,"data-test":"EditNoum-EditHeaderNew"})}),m(Ia,{isEditing:!0,header:e(Ea,{"data-test":"EditNoum-EditChamberHeader"}),onSelectEditOption:_,hasThemePanel:ce||!!Be,"data-test":"EditNoum-ChamberViewLayout",children:[i&&!a||f?e(z,{"data-test":"EditNoum-Stack",children:e(be,{"data-test":"EditNoum-Spinner"})}):e(Hl,{setNoumSidePanelId:Ze,noumSidePanelId:Be,setNoumSidePanelType:Je,"data-test":"EditNoum-EditNoumBody"}),e(Za,{noumId:t,open:ce,onClose:()=>xe(!1),"data-test":"EditNoum-ThemePanel"}),e(kl,{noumSidePanelType:$e,open:!!Be,onClose:()=>Ze(void 0),noumSidePanelId:Be,"data-test":"EditNoum-NoumSidePanel"})]}),(a==null?void 0:a.type)===ke.Project&&e(ja,{isOpen:p&&!M,handleClose:C,handleMarkAsVisited:D,markSpaceAsEditedLoading:Pe,"data-test":"EditNoum-ChamberEditMode"}),a.link?e(Xa,{isOpen:g,handleClose:()=>b(!1),handleUnlinking:pe,loading:de,"data-test":"EditNoum-UnlinkOnArchiveNoumModal"}):(a==null?void 0:a.name)&&e(Va,{noumName:a==null?void 0:a.name,isOpen:g,handleClose:()=>b(!1),onArchive:T,"data-test":"EditNoum-ChamberArchiveModal"}),(a==null?void 0:a.projectType)&&e(Da,{spaceId:t,connections:Me,linkedNoums:gn,visibility:a==null?void 0:a.projectType,isOpen:E,isSEOEnabled:!!(a!=null&&a.enableAds),handleClose:()=>x(!1),"data-test":"EditNoum-ChamberVisibilityInviteModal"}),e(qa,{spaceId:t,connections:Xe,loading:X,isOpen:w,onClose:()=>y(!1),onInvite:()=>_("invites"),linkedCount:le,infiniteState:ze,fetchMoreConnections:J,"data-test":"EditNoum-ChamberPermissionModal"}),O&&e(Pa,{isOpen:O,onClose:()=>A(!1),refetchSpaceById:Qe,"data-test":"EditNoum-NoumAdsModal"}),e(Ga,{infiniteState:$,campaigns:F,campaignsLoading:L,fetchMoreCampaigns:K,spaceId:t,isOpen:B,onRefetchCampaigns:q,onClose:()=>N(!1),onCampaign:()=>Ae(!0),"data-test":"EditNoum-ViewBroadcastModal"}),pt&&e(Ka,{noumType:a.projectType,noumId:t,isOpen:pt,onClose:hn,onSuccessfulCampaignCreation:q,"data-test":"EditNoum-CreateBroadcastModal"}),e(tl,{isOpen:he,onClose:()=>Te(!1),type:$e,onConfirm:Cn,loading:pn||un,"data-test":"EditNoum-DeleteModal"}),dt&&e(Qa,{noumId:t,open:dt,onClose:()=>Fe(!1),"data-test":"EditNoum-NoumenaCopilot"}),v&&e(Aa,{isOpen:v,handleClose:()=>I(!1),"data-test":"EditNoum-ManageMembersModal"})]}),Ne&&e(be,{"data-test":"EditNoum-Spinner"})]})};export{id as E,od as a};
//# sourceMappingURL=EditNoum-6481f585.js.map
