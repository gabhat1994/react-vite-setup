import{b2 as S,x as o,X as k,w as x,c as a,j as t,B as H,I as T,T as r,q as y,av as C,F as b,ae as w}from"./index-cd84bcc9.js";import{C as p,ar as _,a9 as N}from"./vendor-51460554.js";import{a as A}from"./index-38931f83.js";const B=p(o).attrs(()=>({justify:"space-between",align:"center",fullWidth:!0}))`
  width: 100%;
  ${e=>e.$isAppUiV2?`
      padding: 12px 24px;

    @media (${S.TABLET}) {
      padding: 12px 40px;
    }
    `:`
  height: 88px;
  `}
`,$={Container:B},j=({title:e,updatedAt:s,hasUnsavedChanges:m,buttons:u,onGoBack:i,showBackButton:g=!0,isFullScreenMode:h,badgeText:d})=>{const{t:c}=_(),f=N(),{isTablet:v}=k(),F=()=>i?i():f(-1),{flags:n}=x(),l=a($.Container,{$isAppUiV2:n.newAppNavigation,children:[a(o,{align:"center",gap:16,"data-test":"FormHeader-content-Stack",children:[g&&(!n.newAppNavigation||h)&&t(H,{onClick:F,neutral:!0,size:"small",leftIcon:t(T,{name:"arrow_left_m",size:24,"data-test":"FormHeader-content-Icon"}),"data-test":"FormHeader-content-Button"}),t(r,{font:"body-l-bold","data-test":"FormHeader-content-TSpan",children:e}),d?t(y,{size:"medium",tertiary:!0,"data-test":"FormHeader-content-Tag",children:d}):null]}),a(o,{align:"center",gap:12,"data-test":"FormHeader-content-Stack",children:[!v&&a(r,{font:"footnote",colorToken:"--text-top-nav-neutral-highlighted","data-test":"FormHeader-content-TSpan",children:[s&&c("noumena.form_header.changed_at",{timestamp:C(s,"datetime","long")}),m&&a(b,{children:[" ",t(r,{colorToken:"--text-top-nav-danger-primary-default","data-test":"FormHeader-content-TSpan",children:c("noumena.form_header.has_unsaved_changes")})]})]}),u]})]});return n.newAppNavigation?l:t(A,{"data-test":"FormHeader-ResponsiveContainer",children:l})},z=p(w)`
  padding: 0;
  border-radius: 0;
  position: sticky;
  top: 0px;
  z-index: 100;
  overflow: visible;
`,I={StickyNavbarCard:z};function U(e){return t(I.StickyNavbarCard,{children:t(j,{...e,"data-test":"FormHeader"})})}export{U as S};
//# sourceMappingURL=StickyFormHeader-043ef98d.js.map
