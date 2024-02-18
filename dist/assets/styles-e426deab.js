import{r as te,cC as ne,av as re,bC as ae,C as V,a6 as M}from"./vendor-51460554.js";import{b as oe}from"./browser-f98ef106.js";import{dR as X}from"./index-cd84bcc9.js";const N=e=>String(Number(e))!=="NaN",ie=e=>e%4===0&&e%100!==0||e%400===0,De=e=>{const[n,a,r]=e.split("/"),t=N(n)&&Number(n)>0,i=N(r),m=i&&!ie(Number(r))&&t&&n==="02"?N(a)&&Number(a)>0&&Number(a)<=28:N(a)&&Number(a)>0;return{isValidDate:m,isValidMonth:t,isValidYear:i,isValid:m&&t&&i}};var j={},se={get exports(){return j},set exports(e){j=e}};function q(e){return e&&typeof e=="object"&&"default"in e?e.default:e}var B=q(te),le=re,Z=q(oe),H=q(ne);function ue(e,n){for(var a=Object.getOwnPropertyNames(n),r=0;r<a.length;r++){var t=a[r],i=Object.getOwnPropertyDescriptor(n,t);i&&i.configurable&&e[t]===void 0&&Object.defineProperty(e,t,i)}return e}function z(){return z=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},z.apply(this,arguments)}function fe(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,ue(e,n)}function ce(e,n){if(e==null)return{};var a={},r=Object.keys(e),t,i;for(i=0;i<r.length;i++)t=r[i],!(n.indexOf(t)>=0)&&(a[t]=e[t]);return a}function F(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function K(e,n,a){if("selectionStart"in e&&"selectionEnd"in e)e.selectionStart=n,e.selectionEnd=a;else{var r=e.createTextRange();r.collapse(!0),r.moveStart("character",n),r.moveEnd("character",a-n),r.select()}}function de(e){var n=0,a=0;if("selectionStart"in e&&"selectionEnd"in e)n=e.selectionStart,a=e.selectionEnd;else{var r=document.selection.createRange();r.parentElement()===e&&(n=-r.moveStart("character",-e.value.length),a=-r.moveEnd("character",-e.value.length))}return{start:n,end:a,length:a-n}}var pe={9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},he="_";function T(e,n,a){var r="",t="",i=null,c=[];if(n===void 0&&(n=he),a==null&&(a=pe),!e||typeof e!="string")return{maskChar:n,formatChars:a,mask:null,prefix:null,lastEditablePosition:null,permanents:[]};var m=!1;return e.split("").forEach(function(f){!m&&f==="\\"?m=!0:(m||!a[f]?(c.push(r.length),r.length===c.length-1&&(t+=f)):i=r.length+1,r+=f,m=!1)}),{maskChar:n,formatChars:a,prefix:t,mask:r,lastEditablePosition:i,permanents:c}}function S(e,n){return e.permanents.indexOf(n)!==-1}function A(e,n,a){var r=e.mask,t=e.formatChars;if(!a)return!1;if(S(e,n))return r[n]===a;var i=r[n],c=t[i];return new RegExp(c).test(a)}function G(e,n){return n.split("").every(function(a,r){return S(e,r)||!A(e,r,a)})}function L(e,n){var a=e.maskChar,r=e.prefix;if(!a){for(;n.length>r.length&&S(e,n.length-1);)n=n.slice(0,n.length-1);return n.length}for(var t=r.length,i=n.length;i>=r.length;i--){var c=n[i],m=!S(e,i)&&A(e,i,c);if(m){t=i+1;break}}return t}function Q(e,n){return L(e,n)===e.mask.length}function D(e,n){var a=e.maskChar,r=e.mask,t=e.prefix;if(!a){for(n=Y(e,"",n,0),n.length<t.length&&(n=t);n.length<r.length&&S(e,n.length);)n+=r[n.length];return n}if(n){var i=D(e,"");return Y(e,i,n,0)}for(var c=0;c<r.length;c++)S(e,c)?n+=r[c]:n+=a;return n}function ve(e,n,a,r){var t=a+r,i=e.maskChar,c=e.mask,m=e.prefix,f=n.split("");if(!i){for(var h=t;h<f.length;h++)S(e,h)&&(f[h]="");return a=Math.max(m.length,a),f.splice(a,t-a),n=f.join(""),D(e,n)}return f.map(function(d,s){return s<a||s>=t?d:S(e,s)?c[s]:i}).join("")}function Y(e,n,a,r){var t=e.mask,i=e.maskChar,c=e.prefix,m=a.split(""),f=Q(e,n),h=function(l,k){return!S(e,l)||k===t[l]},d=function(l,k){return!i||!S(e,k)||l!==i};return!i&&r>n.length&&(n+=t.slice(n.length,r)),m.every(function(s){for(;!h(r,s);){if(r>=n.length&&(n+=t[r]),!d(s,r))return!0;if(r++,r>=t.length)return!1}var l=A(e,r,s)||s===i;return l?(r<n.length?i||f||r<c.length?n=n.slice(0,r)+s+n.slice(r+1):(n=n.slice(0,r)+s+n.slice(r),n=D(e,n)):i||(n+=s),r++,r<t.length):!0}),n}function me(e,n,a,r){var t=e.mask,i=e.maskChar,c=a.split(""),m=r,f=function(d,s){return!S(e,d)||s===t[d]};return c.every(function(h){for(;!f(r,h);)if(r++,r>=t.length)return!1;var d=A(e,r,h)||h===i;return d&&r++,r<t.length}),r-m}function ge(e,n){for(var a=n;a>=0;--a)if(!S(e,a))return a;return null}function R(e,n){for(var a=e.mask,r=n;r<a.length;++r)if(!S(e,r))return r;return null}function P(e){return!e&&e!==0?"":e+""}function be(e,n,a,r,t){var i=e.mask,c=e.prefix,m=e.lastEditablePosition,f=n,h="",d=0,s=0,l=Math.min(t.start,a.start);if(a.end>t.start?(h=f.slice(t.start,a.end),d=me(e,r,h,l),d?s=t.length:s=0):f.length<r.length&&(s=r.length-f.length),f=r,s){if(s===1&&!t.length){var k=t.start===a.start;l=k?R(e,a.start):ge(e,a.start)}f=ve(e,f,l,s)}return f=Y(e,f,h,l),l=l+d,l>=i.length?l=i.length:l<c.length&&!d?l=c.length:l>=c.length&&l<m&&d&&(l=R(e,l)),f=D(e,f),h||(h=null),{value:f,enteredString:h,selection:{start:l,end:l}}}function ke(){var e=new RegExp("windows","i"),n=new RegExp("phone","i"),a=navigator.userAgent;return e.test(a)&&n.test(a)}function C(e){return typeof e=="function"}function we(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame}function ee(){return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame}function J(e){var n=!!ee(),a;return n?a=we():a=function(){return setTimeout(e,1e3/60)},a(e)}function U(e){var n=ee()||clearTimeout;n(e)}var ye=function(e){fe(n,e);function n(r){var t;t=e.call(this,r)||this,t.focused=!1,t.mounted=!1,t.previousSelection=null,t.selectionDeferId=null,t.saveSelectionLoopDeferId=null,t.saveSelectionLoop=function(){t.previousSelection=t.getSelection(),t.saveSelectionLoopDeferId=J(t.saveSelectionLoop)},t.runSaveSelectionLoop=function(){t.saveSelectionLoopDeferId===null&&t.saveSelectionLoop()},t.stopSaveSelectionLoop=function(){t.saveSelectionLoopDeferId!==null&&(U(t.saveSelectionLoopDeferId),t.saveSelectionLoopDeferId=null,t.previousSelection=null)},t.getInputDOMNode=function(){if(!t.mounted)return null;var o=le.findDOMNode(F(F(t))),u=typeof window<"u"&&o instanceof window.Element;if(o&&!u)return null;if(o.nodeName!=="INPUT"&&(o=o.querySelector("input")),!o)throw new Error("react-input-mask: inputComponent doesn't contain input node");return o},t.getInputValue=function(){var o=t.getInputDOMNode();return o?o.value:null},t.setInputValue=function(o){var u=t.getInputDOMNode();u&&(t.value=o,u.value=o)},t.setCursorToEnd=function(){var o=L(t.maskOptions,t.value),u=R(t.maskOptions,o);u!==null&&t.setCursorPosition(u)},t.setSelection=function(o,u,g){g===void 0&&(g={});var p=t.getInputDOMNode(),v=t.isFocused();if(!(!p||!v)){var w=g,b=w.deferred;b||K(p,o,u),t.selectionDeferId!==null&&U(t.selectionDeferId),t.selectionDeferId=J(function(){t.selectionDeferId=null,K(p,o,u)}),t.previousSelection={start:o,end:u,length:Math.abs(u-o)}}},t.getSelection=function(){var o=t.getInputDOMNode();return de(o)},t.getCursorPosition=function(){return t.getSelection().start},t.setCursorPosition=function(o){t.setSelection(o,o)},t.isFocused=function(){return t.focused},t.getBeforeMaskedValueChangeConfig=function(){var o=t.maskOptions,u=o.mask,g=o.maskChar,p=o.permanents,v=o.formatChars,w=t.props.alwaysShowMask;return{mask:u,maskChar:g,permanents:p,alwaysShowMask:!!w,formatChars:v}},t.isInputAutofilled=function(o,u,g,p){var v=t.getInputDOMNode();try{if(v.matches(":-webkit-autofill"))return!0}catch{}return t.focused?p.end<g.length&&u.end===o.length:!0},t.onChange=function(o){var u=F(F(t)),g=u.beforePasteState,p=F(F(t)),v=p.previousSelection,w=t.props.beforeMaskedValueChange,b=t.getInputValue(),x=t.value,$=t.getSelection();t.isInputAutofilled(b,$,x,v)&&(x=D(t.maskOptions,""),v={start:0,end:0,length:0}),g&&(v=g.selection,x=g.value,$={start:v.start+b.length,end:v.start+b.length,length:0},b=x.slice(0,v.start)+b+x.slice(v.end),t.beforePasteState=null);var E=be(t.maskOptions,b,$,x,v),_=E.enteredString,I=E.selection,O=E.value;if(C(w)){var W=w({value:O,selection:I},{value:x,selection:v},_,t.getBeforeMaskedValueChangeConfig());O=W.value,I=W.selection}t.setInputValue(O),C(t.props.onChange)&&t.props.onChange(o),t.isWindowsPhoneBrowser?t.setSelection(I.start,I.end,{deferred:!0}):t.setSelection(I.start,I.end)},t.onFocus=function(o){var u=t.props.beforeMaskedValueChange,g=t.maskOptions,p=g.mask,v=g.prefix;if(t.focused=!0,t.mounted=!0,p){if(t.value)L(t.maskOptions,t.value)<t.maskOptions.mask.length&&t.setCursorToEnd();else{var w=D(t.maskOptions,v),b=D(t.maskOptions,w),x=L(t.maskOptions,b),$=R(t.maskOptions,x),E={start:$,end:$};if(C(u)){var _=u({value:b,selection:E},{value:t.value,selection:null},null,t.getBeforeMaskedValueChangeConfig());b=_.value,E=_.selection}var I=b!==t.getInputValue();I&&t.setInputValue(b),I&&C(t.props.onChange)&&t.props.onChange(o),t.setSelection(E.start,E.end)}t.runSaveSelectionLoop()}C(t.props.onFocus)&&t.props.onFocus(o)},t.onBlur=function(o){var u=t.props.beforeMaskedValueChange,g=t.maskOptions.mask;if(t.stopSaveSelectionLoop(),t.focused=!1,g&&!t.props.alwaysShowMask&&G(t.maskOptions,t.value)){var p="";if(C(u)){var v=u({value:p,selection:null},{value:t.value,selection:t.previousSelection},null,t.getBeforeMaskedValueChangeConfig());p=v.value}var w=p!==t.getInputValue();w&&t.setInputValue(p),w&&C(t.props.onChange)&&t.props.onChange(o)}C(t.props.onBlur)&&t.props.onBlur(o)},t.onMouseDown=function(o){if(!t.focused&&document.addEventListener){t.mouseDownX=o.clientX,t.mouseDownY=o.clientY,t.mouseDownTime=new Date().getTime();var u=function g(p){if(document.removeEventListener("mouseup",g),!!t.focused){var v=Math.abs(p.clientX-t.mouseDownX),w=Math.abs(p.clientY-t.mouseDownY),b=Math.max(v,w),x=new Date().getTime()-t.mouseDownTime;(b<=10&&x<=200||b<=5&&x<=300)&&t.setCursorToEnd()}};document.addEventListener("mouseup",u)}C(t.props.onMouseDown)&&t.props.onMouseDown(o)},t.onPaste=function(o){C(t.props.onPaste)&&t.props.onPaste(o),o.defaultPrevented||(t.beforePasteState={value:t.getInputValue(),selection:t.getSelection()},t.setInputValue(""))},t.handleRef=function(o){t.props.children==null&&C(t.props.inputRef)&&t.props.inputRef(o)};var i=r.mask,c=r.maskChar,m=r.formatChars,f=r.alwaysShowMask,h=r.beforeMaskedValueChange,d=r.defaultValue,s=r.value;t.maskOptions=T(i,c,m),d==null&&(d=""),s==null&&(s=d);var l=P(s);if(t.maskOptions.mask&&(f||l)&&(l=D(t.maskOptions,l),C(h))){var k=r.value;r.value==null&&(k=d),k=P(k);var y=h({value:l,selection:null},{value:k,selection:null},null,t.getBeforeMaskedValueChangeConfig());l=y.value}return t.value=l,t}var a=n.prototype;return a.componentDidMount=function(){this.mounted=!0,this.getInputDOMNode()&&(this.isWindowsPhoneBrowser=ke(),this.maskOptions.mask&&this.getInputValue()!==this.value&&this.setInputValue(this.value))},a.componentDidUpdate=function(){var t=this.previousSelection,i=this.props,c=i.beforeMaskedValueChange,m=i.alwaysShowMask,f=i.mask,h=i.maskChar,d=i.formatChars,s=this.maskOptions,l=m||this.isFocused(),k=this.props.value!=null,y=k?P(this.props.value):this.value,o=t?t.start:null;if(this.maskOptions=T(f,h,d),this.maskOptions.mask)!s.mask&&this.isFocused()&&this.runSaveSelectionLoop();else{s.mask&&(this.stopSaveSelectionLoop(),this.forceUpdate());return}var u=this.maskOptions.mask&&this.maskOptions.mask!==s.mask;if(!s.mask&&!k&&(y=this.getInputValue()),(u||this.maskOptions.mask&&(y||l))&&(y=D(this.maskOptions,y)),u){var g=L(this.maskOptions,y);(o===null||g<o)&&(Q(this.maskOptions,y)?o=g:o=R(this.maskOptions,g))}this.maskOptions.mask&&G(this.maskOptions,y)&&!l&&(!k||!this.props.value)&&(y="");var p={start:o,end:o};if(C(c)){var v=c({value:y,selection:p},{value:this.value,selection:this.previousSelection},null,this.getBeforeMaskedValueChangeConfig());y=v.value,p=v.selection}this.value=y;var w=this.getInputValue()!==this.value;w?(this.setInputValue(this.value),this.forceUpdate()):u&&this.forceUpdate();var b=!1;p.start!=null&&p.end!=null&&(b=!t||t.start!==p.start||t.end!==p.end),(b||w)&&this.setSelection(p.start,p.end)},a.componentWillUnmount=function(){this.mounted=!1,this.selectionDeferId!==null&&U(this.selectionDeferId),this.stopSaveSelectionLoop()},a.render=function(){var t=this.props,i=t.mask;t.alwaysShowMask;var c=t.maskChar,m=t.formatChars,f=t.inputRef;t.beforeMaskedValueChange;var h=t.children,d=ce(t,["mask","alwaysShowMask","maskChar","formatChars","inputRef","beforeMaskedValueChange","children"]),s;if(H(!d.maxLength||!T(i,c,m).mask,"react-input-mask: maxLength property shouldn't be passed to the masked input. It breaks masking and unnecessary because length is limited by the mask length."),h){C(h)||Z(!1,"react-input-mask: children must be a function");var l=["onChange","onPaste","onMouseDown","onFocus","onBlur","value","disabled","readOnly"],k=z({},d);l.forEach(function(u){return delete k[u]}),s=h(k);var y=l.filter(function(u){return s.props[u]!=null&&s.props[u]!==d[u]});y.length&&Z(!1,"react-input-mask: the following props should be passed to the react-input-mask's component and should not be altered in children's function: "+y.join(", ")),H(!f,"react-input-mask: inputRef is ignored when children is passed, attach ref to the children instead")}else s=B.createElement("input",z({ref:this.handleRef},d));var o={onFocus:this.onFocus,onBlur:this.onBlur};return this.maskOptions.mask&&(!d.disabled&&!d.readOnly&&(o.onChange=this.onChange,o.onPaste=this.onPaste,o.onMouseDown=this.onMouseDown),d.value!=null&&(o.value=this.value)),s=B.cloneElement(s,o),s},n}(B.Component),Ce=ye;(function(e){e.exports=Ce})(se);const Ee=ae(j);V.div`
  position: absolute;
  display: inline-flex;
  left: 14px;
  top: 0;
  bottom: 0;
  align-items: center;
`;const $e=V.div`
  position: absolute;
  display: inline-flex;
  right: 14px;
  top: 0;
  bottom: 0;
  align-items: center;
  svg path {
    fill: ${e=>e.iconColor?`${e.iconColor} !important`:"var(--color-base-gray-main)"};
    ${e=>e.iconColor?"opacity: 1 !important;":""};
  }
`,Se=(e,n)=>e&&n?90:e||n?64:0,Fe=V.div`
  position: relative;
  border-radius: 8px;
  font-family: var(--font-family);
  position: relative;
  width: 100%;
  background-color: ${e=>!e.disabled&&e.isAlwaysFocus?"var(--color-base-primary-95);":"var(--color-base-gray-90)"};
  &:hover {
    background-color: ${e=>e.disabled?"":"var(--color-base-primary-95);"};
    label {
      color: ${e=>e.disabled?"":"var(--color-base-primary-main);"};
    }
  }
  label {
    color: var(--color-base-gray-main);
    font-size: var(--font-input-medium-size);
    font-weight: var(--font-body-medium-regular-weight);
    left: 0;
    pointer-events: none;
    position: absolute;
    ${X};
    top: -4px;
    right: ${e=>`${Se(!!e.leftIcon,!!e.rightIcon)}px`};
    transform-origin: top left;
    transform: ${e=>`translate(${e.leftIcon?44:12}px, ${e.inputSize==="small"?12:20}px)`};
    transition: all 0.2s;
    ${e=>e.error&&M`
        color: var(--color-base-error-main) !important;
      `}
    ${e=>e.disabled&&M`
        color: var(--color-base-gray-0);
        opacity: 0.2;
      `}
  }
  input {
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    color: ${e=>e.disabled?"var(--color-base-gray-70);":"var(--color-base-gray-0);"};
    -webkit-text-fill-color: ${e=>e.disabled?"var(--color-base-gray-70);":"var(--color-base-gray-0);"};
    font-size: var(--font-input-medium-size);
    height: ${e=>e.inputSize==="small"?"40px":"56px"};
    outline: none;
    display: inline-flex;
    align-items: center;
    padding: ${e=>e.inputSize==="small"?"4px 12px":"16px 12px"};
    width: 100%;
    padding-left: ${e=>e.leftIcon&&"44px"};
    ${({rightIcon:e})=>e&&"padding-right: 44px;"}
    ${X};
    &:focus,
    &:hover {
      color: ${e=>e.disabled?"var(--color-base-gray-70);":"var(--color-base-gray-0);"};
      background-color: ${e=>e.disabled?"":"var(--color-base-primary-95);"};
      ${e=>e.error&&M`
          background-color: var(--color-base-error-100);
          border-radius: 8px;
        `}
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      border-radius: 8px;
    }
    // placeholder style
    ::placeholder {
      color: var(--color-base-gray-main);
      opacity: 1; /* Firefox */
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: var(--color-base-gray-main);
    }
    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: var(--color-base-gray-main);
    }
  }
  input + fieldset + label {
    top: 0;
    color: var(--color-base-primary-main);
    font-size: var(--font-footnote-size);
    transform: translate(12px, -7px);
  }
  fieldset {
    border-radius: 8px;
    border: 0;
    bottom: 0;
    box-sizing: border-box;
    left: -2px;
    padding-left: 4px;
    pointer-events: none;
    position: absolute;
    right: -2px;
    top: -9px;
    ${e=>e.error&&!e.noBorder&&M`
        border: 2px solid var(--color-base-error-main) !important;
      `}
    ${e=>e.isAlwaysFocus&&!e.noBorder&&M`
        border: 2px solid var(--color-base-primary-main) !important;
      `}
  }
  input:focus + fieldset {
    ${e=>!e.noBorder&&M`
        border: 2px solid var(--color-base-primary-main);
      `}
  }
  legend {
    pointer-events: none;
    visibility: hidden;
    overflow: hidden;
    ${e=>!e.label&&M`
        width: 0;
        padding: 0;
      `}
  }
  span {
    font-size: var(--font-footnote-size);
    padding: 0 4px;
    visibility: hidden;
  }
  ${e=>e.disabled&&M`
      svg path {
        fill: var(--color-base-gray-0);
        opacity: 0.2;
      }
    `};
  /* only Safari - disabled input color */
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      input {
        color: ${e=>e.disabled?"var(--color-base-gray-50);":"var(--color-base-gray-0);"};
        &:focus,
        &:hover {
          color: ${e=>e.disabled?"var(--color-base-gray-50);":"var(--color-base-gray-0);"};
        }
      }
    }
  }
`;V.p`
  font-size: var(--font-footnote-size);
  font-family: var(--font-family);
  justify-content: space-between;
  color: var(
    ${e=>e.error?"--color-base-error-main":"--color-base-gray-50"}
  );
  margin: 2px 0 0 12px;
  ${e=>e.disabled&&M`
      color: var(--color-base-gray-0);
      opacity: 0.2;
    `}
`;V.span`
  color: var(
    ${e=>e.error?"--color-base-error-main":"--color-base-gray-50"}
  );
`;const Ve=V.div`
  width: ${({fullWidth:e})=>e?"100%":""};
  ${({centerHelperText:e})=>e&&M`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
`;export{Ve as C,Ee as I,$e as R,Fe as S,De as d};
//# sourceMappingURL=styles-e426deab.js.map
