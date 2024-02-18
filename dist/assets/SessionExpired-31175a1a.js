import{m as a,c_ as p,aa as c,c as n,j as e,a1 as x,d9 as h,T as d,ab as r,S as o,B as u,R as S}from"./index-cd84bcc9.js";import{C as i,ar as g,a9 as m,ay as E}from"./vendor-51460554.js";const _=i.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-card-neutral-alt-default);
`,T=i.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`,y=i.div`
  margin-top: -72px;
  max-width: 402px;
  text-align: center;
  @media (max-width: ${a.TABLET_MAX}) {
    width: 279px;
  }
  @media (max-width: ${a.MOBILE_L_MAX}) {
    width: 100%;
    max-width: 343px;
  }
`;i.a`
  ${p.bodyMediumBold}
  color: var(--link-card-neutral-highlighted);
`;const f=()=>{const{t}=g(),l=m(),s=c();return n(_,{"data-test":"SessionExpired-Container",children:[e(x,{isBorderRadius:!1,"data-test":"SessionExpired-Header",children:e(h,{expired:!0,"data-test":"SessionExpired-GuestHeader"})}),e(T,{"data-testid":"session_expired_container","data-test":"SessionExpired-SessionExpiredContainer",children:n(y,{"data-test":"SessionExpired-SessionExpiredModal",children:[e(d,{font:s===r.DESKTOP?"heading-m-bold":"heading-s-bold","data-testid":"session_expired_title",colorToken:"--text-card-header-neutral-highlighted","data-test":"SessionExpired-TSpan",children:e(E,{i18nKey:"noumena.session_expired.logged_out",components:{newline:e("br",{})},"data-test":"SessionExpired-Trans"})}),e(o,{height:16,"data-test":"SessionExpired-Spacer"}),e(d,{font:"body-l",colorToken:"--text-card-neutral-default","data-testid":"session_expired_guide","data-test":"SessionExpired-TSpan",children:t("noumena.session_expired.require_login")}),e(o,{height:24,"data-test":"SessionExpired-Spacer"}),e(u,{primary:!0,size:s===r.MOBILE?"full":void 0,onClick:()=>l(S.LOGIN,{replace:!0}),testId:"session_expired_action_btn","data-test":"SessionExpired-Button",children:t("noumena.session_expired.return_to_login")})]})})]})},w=f;export{w as default};
//# sourceMappingURL=SessionExpired-31175a1a.js.map
