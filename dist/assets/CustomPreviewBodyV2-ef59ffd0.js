import{j as a,b$ as o,bP as C,aH as v,bY as P,X as l,dQ as d,bu as w,aC as y,c as E,S as h,x as S}from"./index-cd84bcc9.js";import{r as V}from"./vendor-51460554.js";import{B}from"./styles-b4894a1f.js";import{c as N}from"./noumViewHelper-950fd893.js";import{E as T,N as f,a as g,C as b}from"./Element-9cea61d7.js";import{H as x}from"./HoverWrapper-680bb0f6.js";import"./helper-53a5becb.js";import{E as W}from"./ChamberCompleteness-c76bd15d.js";const k=({tool:e,spaceId:s,index:r,totalIndex:n,isEditing:m})=>a(x,{id:e==null?void 0:e._id,className:"child",type:o.TOOL_TYPE,isActive:!1,isCustomPreview:!0,currentIndex:r,elementType:(e==null?void 0:e.elementType)||void 0,totalIndex:n,isEditing:m,"data-test":"CustomPreviewElementV2-HoverWrapper",children:a(W,{className:"element-container",element:e,spaceId:s,isCustomPreview:!0,isCustomPreviewVisible:C.isCustomPreviewVisible(e),isEditing:!1,"data-test":"CustomPreviewElementV2-ElementWrapper",children:a(T,{className:"element-container",spaceId:s,element:e,id:(e==null?void 0:e._id)||"",currentTitle:(e==null?void 0:e.headerContent)??(e==null?void 0:e.elementType)??"UNKNOWN",isEditing:!1,columnWidth:700,isNoumEditor2:!0,"data-test":"CustomPreviewElementV2-Element"})})},e==null?void 0:e._id),A=()=>{const{isOwner:e,spaceId:s,space:r}=v(),{customPreviewElements:n}=P(),{isSmallerThanLaptop:m}=l(),u=V.useMemo(()=>{const t=e?d.Edit:d.Preview,i=w.getCustomPreviewLayoutV2(r,n,t);return y(N(i.sections))},[n,e,r]);return E(B,{"data-test":"CustomPreviewBodyV2-BodyContainer",children:[a(h,{height:16,"data-test":"CustomPreviewBodyV2-Spacer"}),a(S,{vertical:!0,gap:12,fullWidth:!0,"data-test":"CustomPreviewBodyV2-Stack",children:u.map(t=>a(f,{isBackground:t.background,"data-test":"CustomPreviewBodyV2-NoumSectionContainer",children:a(g,{id:t==null?void 0:t._id,noumSectionType:t.type,isSmallerThanLaptop:m,"data-test":"CustomPreviewBodyV2-NoumSectionLayout",children:t==null?void 0:t.columns.map(i=>a(b,{"data-testid":"noum-section-column",id:i._id,gap:12,vertical:!0,isBackground:i.background,"data-test":"CustomPreviewBodyV2-ColumnContainer",children:i.tools.map((c,p)=>a(k,{tool:c,spaceId:s||"",index:p,totalIndex:i.tools.length-1,isEditing:e,"data-test":"CustomPreviewBodyV2-CustomPreviewElementV2"}))},i._id))})}))})]})};export{A as C};
//# sourceMappingURL=CustomPreviewBodyV2-ef59ffd0.js.map
