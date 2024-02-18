import{j as e,ay as x,c as l,fG as y,c4 as f,I as c,fH as C,fI as w,fJ as R,au as k,at as h,hO as b,c9 as v,c8 as O,s as g,f as m,b7 as _,T as A}from"./index-cd84bcc9.js";import{C as d,B as u,ar as V}from"./vendor-51460554.js";import{R as D}from"./Radiobox-c1e62033.js";d.div``;const L=d.div`
  padding-right: 16px;
`,P=({options:t,handleSelectOption:i,activeItem:n})=>e(x,{"data-testid":"author-users-list",maxHeight:"200px",paddingRight:t&&t.length>2?"8px":"0","data-test":"VisibilityOptionsRenderer-Infinite",children:t.map(r=>r.type==="value"?l(y,{isBottomBorder:!0,active:n.includes(r.value),tabIndex:0,onClick:()=>i(r),"data-test":"VisibilityOptionsRenderer-DropdownItemLayout",children:[e(L,{"data-test":"VisibilityOptionsRenderer-CheckWrap",children:e(f,{onChange:()=>i(r),icon:e(c,{name:"tick_m",size:n.includes(r.value)?24:0,color:"--icon-checkbox-neutral-alt-default","data-test":"VisibilityOptionsRenderer-Icon"}),isChecked:n.includes(r.value),"data-test":"VisibilityOptionsRenderer-Checkbox"})}),e(C,{selected:n.includes(r.value),"data-test":"VisibilityOptionsRenderer-DropDownLabel",children:e(w,{"data-test":"VisibilityOptionsRenderer-DropdownValueWrapper",children:e(R,{"data-test":"VisibilityOptionsRenderer-DropdownValueLabel",children:r.label})})})]},r.key):null)}),S=d.div``,j=({options:t,handleSelectOption:i,activeItem:n,noumEditor2:r,activeItemKeys:o})=>{const s=a=>(n==null?void 0:n.key)===a.key||!!(o!=null&&o.includes(a.key));return e(x,{"data-testid":"author-users-list",maxHeight:"200px",paddingRight:t&&!r&&t.length>2?"8px":"0","data-test":"AuthorOptionsRenderer-Infinite",children:t.map(a=>{var p;return a.type==="value"?l(y,{isBottomBorder:!0,active:s(a),tabIndex:0,onClick:()=>i(a),"data-test":"AuthorOptionsRenderer-DropdownItemLayout",children:[l(C,{selected:s(a),"data-test":"AuthorOptionsRenderer-DropDownLabel",children:[e(S,{"data-test":"AuthorOptionsRenderer-AvatarWrapper",children:typeof a.value!="string"&&e(k,{url:((p=a.value.profile)==null?void 0:p.profilePictureThumbnail)||void 0,size:"M","data-test":"AuthorOptionsRenderer-Avatar"})}),e(w,{"data-test":"AuthorOptionsRenderer-DropdownValueWrapper",children:e(R,{"data-test":"AuthorOptionsRenderer-DropdownValueLabel",children:a.label})})]}),r?e(f,{onChange:()=>i(a),icon:e(c,{name:"tick_m",size:s(a)?24:0,color:"--icon-checkbox-neutral-alt-default","data-test":"AuthorOptionsRenderer-Icon"}),isChecked:s(a),"data-test":"AuthorOptionsRenderer-Checkbox"}):e(D,{isChecked:s(a),icon:e(c,{name:"flag_pl_m",size:12,color:s(a)?"--icon-radiobutton-brand-primary-default":"--icon-radiobutton-inactive-default","data-test":"AuthorOptionsRenderer-Icon"}),"data-test":"AuthorOptionsRenderer-Radiobox"})]},a.key):null})})},H=[{key:"new-old",value:h.Desc,type:"value",label:u("noumena.post.filter_sort_new_to_old")},{key:"old-new",value:h.Asc,type:"value",label:u("noumena.post.filter_sort_old_to_new")}],M=[{key:"show-connections",value:b.Connection,type:"value",label:u("noumena.post.filter_visibility_show_connections")},{key:"show-followers",value:b.Follower,type:"value",label:u("noumena.post.filter_visibility_show_followers")}],B=d.div`
  width: 100%;
  border-radius: 16px;
  gap: 12px;
  ${({noumEditor2:t,isPostView:i})=>!t&&!i&&"border: solid 1px var(--border-card-neutral-highlighted);"};
  padding: ${({noumEditor2:t})=>t?"16px 16px 0 16px":"8px"};
  ${v}
  ${O};
`,z=d.div`
  background: var(--bg-input-neutral-default);
  flex: 1;
  height: ${({noumEditor2:t})=>t?"40px":"56px"};
  border-radius: 8px;
  padding-left: 12px;
  ${O}
  justify-content: flex-start !important;
  cursor: pointer;
`,T=d.div`
  @media (max-width: ${g.MOBILE_L}) {
    display: none;
  }
  padding: 8px, 8px, 15px, 8px;
  cursor: ${({isCreatable:t})=>t?"pointer":"not-allowed"};
`,U=t=>{const{user:i}=m(),{onClick:n,size:r,noumEditor2:o,isPostView:s}=t,{t:a}=V();return l(B,{noumEditor2:o,isPostView:s,"data-test":"CreateSection-Container",children:[e(k,{url:_.getProfilePicture(i)??"",size:r||"XL","data-test":"CreateSection-Avatar"}),e(z,{onClick:n,noumEditor2:o,"data-test":"CreateSection-TextSection",children:e(A,{font:"body-l",colorToken:"--text-input-neutral-default","data-test":"CreateSection-TSpan",children:a("noumena.create_post_placeholder")})}),!o&&e(T,{onClick:n,isCreatable:t.isCreatable,"data-test":"CreateSection-CreateButton",children:e(c,{color:t.isCreatable?"--icon-button-brand-secondary-default":"--icon-button-brand-primary-disabled",name:"send_m",size:24,"data-test":"CreateSection-Icon"})})]})};export{j as A,U as C,H as O,M as V,P as a};
//# sourceMappingURL=CreateSection-88a250eb.js.map
