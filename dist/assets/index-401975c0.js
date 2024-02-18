import{v as Pe,f$ as ra,f as fe,g0 as sa,ci as Ee,Y as Mt,aH as Z,g1 as la,aj as ue,g2 as da,g3 as Gt,g4 as ca,bH as ua,e_ as Qt,w as Re,bX as pa,f5 as ma,f8 as ha,c as b,M as pe,t as he,j as t,h as ve,x as Q,I as ie,T as M,i as ge,k as we,B as $,b2 as pt,m as Oe,s as q,g5 as je,X as _t,g6 as fa,S as ae,ae as Le,ax as Te,F as W,g as Kt,n as Ke,ac as ba,a5 as Ye,p as Tn,R as St,eu as Xt,u as We,e as Fe,au as De,b7 as mt,o as ht,bz as Y,ay as Wt,aN as Zt,g7 as Jt,g8 as en,g9 as ga,ga as ya,gb as Pn,fl as Ca,gc as me,bx as Rn,by as ze,q as xt,gd as Ln,ge as Ut,fk as Bn,eP as Nt,gf as va,gg as Sa,gh as xa,gi as ka,gj as wa,at as Tt,az as Ma,aw as kt,aa as _a,ab as Na,d as zt,fi as En,b1 as Aa,gk as Ia,gl as Ae,am as On,y as Dn,gm as tn,gn as Ta,cL as Pa,go as Ra,gp as La,gq as Ba,gr as Ea,gs as Oa,gt as Da,ei as $a,bE as Wa,gu as Ua,aC as nn,c_ as za,ao as Fa,c4 as Ha,bY as qa,aK as an,a1 as ja,gv as Va}from"./index-cd84bcc9.js";import{r as l,f as Xe,B as C,ar as J,be as Ya,ac as xe,bW as Ga,bA as $n,C as y,ad as Ft,a6 as At,a9 as Ze,aT as be,l as Wn,ay as ft,bc as Qa,al as Un,N as $e,ax as Ka,aw as Xa,as as Za,b9 as Ja,b4 as eo,$ as to,T as on,U as no,bw as ao}from"./vendor-51460554.js";import{S as Pt}from"./index-2d186805.js";import{c as oo,C as io}from"./ChamberCompleteness-c76bd15d.js";import{D as ro,b as so}from"./helper-53a5becb.js";import{L as lo,H as co,M as uo,a as po,I as mo,c as ho,R as fo}from"./HandleUnlinkNoum-c385ad89.js";import{E as bo}from"./EllipsisMenu-8495dca0.js";import{W as Ht,a as qt}from"./styles-1a9b9e59.js";import{b as go,C as yo,u as Co,P as vo,a as So}from"./index-ea5d695b.js";import{E as Ve}from"./trackingEvents-87d8ea4c.js";import"./styles-d2f9f396.js";import{C as xo}from"./MemberStatusTag-69ed5aaa.js";import"./SelectField-54706174.js";import"./styles-26e8a352.js";import"./Pagination-43542d57.js";import"./Accordion-ea03839b.js";import"./MultiselectField-a1e665cb.js";import{c as zn}from"./capitalizeFirstLetter-92ef0abb.js";import{u as ko,D as wo,a as Mo,b as Rt,c as Lt,d as _o,A as No,i as lt,e as Ao,h as Et,j as Io,G as To,k as Fn,l as rn,E as Po,g as Ro,X as Hn,Y as qn,f as Lo,R as Bo,C as Eo,T as Oo,L as Do}from"./generateCategoricalChart-e9d4ef07.js";import{S as $o,D as Wo,C as sn,B as Uo}from"./CustomDateInputMaskField-46ce4df4.js";import{d as zo}from"./styles-e426deab.js";import{u as Fo}from"./useGenerateTokenForCQ-2d299743.js";function Ho(){const{addToast:e}=Pe(),[n,{loading:i}]=ra(),o=l.useCallback(async(a,s,r)=>{let d;try{await n({variables:{spaceId:a,action:s,source:r}}),d=!0}catch(c){let u="Unknown";c instanceof Error&&(u=c.message),e("error","none",u),Xe(new Error(u),{tags:{section:"handleFollow"}}),d=!1}return d},[e,n]);return{loading:i,handleFollowHelper:o}}function qo(){const{addToast:e}=Pe(),{user:n}=fe(),[i,{loading:o}]=sa(),a=l.useCallback(async s=>{const r={id:void 0,alredayCreated:void 0};return await i({variables:{noumId:s},onCompleted:d=>{var c,u,p,m,f;(u=(c=d.applyForRiseApplication)==null?void 0:c.data)!=null&&u._id&&(r.id=((m=(p=d.applyForRiseApplication)==null?void 0:p.data)==null?void 0:m._id)||void 0,r.alredayCreated=((f=d.applyForRiseApplication)==null?void 0:f.alredayCreated)||void 0,r.alredayCreated||(Ee(Ve.RISE.APPLY,{UUID:n==null?void 0:n._id,noumId:s}),e("success","none",C("noumena.riseprogram.created_rise_application"))))},onError:d=>{d instanceof Error&&(e("error","none",d.message),Xe(new Error(d.message),{tags:{section:"applyForRiseApplication"}}))}}),r},[e,i,n]);return{loading:o,createRiseApplicationNoumHelper:a}}function jn(e){const{logError:n}=Mt(),{noumType:i}=Z(),[o,a]=l.useState(),[s,r]=l.useState(),[d,c]=l.useState(),[u,p]=l.useState(),[m,f]=l.useState(),{data:h,loading:v,error:x,refetch:g}=la({skip:i!==ue.RiseApplication||!e,variables:{noumId:e||""},fetchPolicy:"cache-and-network",onError:()=>{n(x,"GetNoumProgramresultById")}});return l.useEffect(()=>{var S,k,_,w,N,I;a((S=h==null?void 0:h.getNoumProgramresultById)==null?void 0:S.questions),r((k=h==null?void 0:h.getNoumProgramresultById)==null?void 0:k._id),c((_=h==null?void 0:h.getNoumProgramresultById)==null?void 0:_.resultJSON),p((w=h==null?void 0:h.getNoumProgramresultById)==null?void 0:w.status),f((I=(N=h==null?void 0:h.getNoumProgramresultById)==null?void 0:N.parentNoumId)==null?void 0:I._id)},[h]),{loading:v,questions:o,refetch:g,applicationId:s,resultJson:d,status:u,parentNoumId:m}}function jo(){const[e]=da(),{addToast:n}=Pe(),{t:i}=J(),o=Ya();return{sendInvite:l.useCallback(async(s,r,d)=>{await e({variables:{ownSpaceId:s,invitedSpaceId:r,message:d},onError:c=>{Xe(c,{tags:{section:"sendConnectionInvite"}}),c instanceof Error?n("error","none",`${c.message}`):n("error","none",i("noumena.chamber_view.visibility.invite_error"))},update:(c,{data:u})=>{if(!u||!u.sendConnectionInvite)return;const p=c.readQuery({query:Gt,variables:{spaceId:s}});if(!p)return;const{getSpaceConnections:m}=p;if(!m)return;const f=[...m],h=[u.sendConnectionInvite,...f];c.writeQuery({query:Gt,variables:{spaceId:s},data:{getSpaceConnections:h}})}}),o.refetchQueries({include:[ca]})},[n,o,e,i])}}function Vo(){const{addToast:e}=Pe(),n=l.useCallback(r=>{e("error","none",`${C("noumena.toast_error.text")}: ${r}`)},[e]),i=l.useCallback(()=>{e("success","none",`${C("noumena.toast_success.text")}: ${C("noumena.chamber_change_status.success_message")}`)},[e]),[o,{loading:a}]=ua(),s=l.useCallback(async(r,d,c)=>{await o({variables:{spaceId:r,status:d},onError:({networkError:u=null,graphQLErrors:p=[]})=>{const[m]=p;n((m==null?void 0:m.message)??u),Xe(new Error((m==null?void 0:m.message)??u),{tags:{section:"createProjectChamberMutation"}})},onCompleted:()=>{i(),c&&c()}})},[n,i,o]);return{loading:a,changeProjectChamberStatusHelper:s}}var Yo=["type","layout","connectNulls","ref"];function Ge(e){return Ge=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},Ge(e)}function Go(e,n){if(e==null)return{};var i=Qo(e,n),o,a;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)o=s[a],!(n.indexOf(o)>=0)&&Object.prototype.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}function Qo(e,n){if(e==null)return{};var i={},o=Object.keys(e),a,s;for(s=0;s<o.length;s++)a=o[s],!(n.indexOf(a)>=0)&&(i[a]=e[a]);return i}function ut(){return ut=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var i=arguments[n];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o])}return e},ut.apply(this,arguments)}function ln(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),i.push.apply(i,o)}return i}function Se(e){for(var n=1;n<arguments.length;n++){var i=arguments[n]!=null?arguments[n]:{};n%2?ln(Object(i),!0).forEach(function(o){Ie(e,o,i[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):ln(Object(i)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(i,o))})}return e}function qe(e){return Jo(e)||Zo(e)||Xo(e)||Ko()}function Ko(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Xo(e,n){if(e){if(typeof e=="string")return Ot(e,n);var i=Object.prototype.toString.call(e).slice(8,-1);if(i==="Object"&&e.constructor&&(i=e.constructor.name),i==="Map"||i==="Set")return Array.from(e);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return Ot(e,n)}}function Zo(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Jo(e){if(Array.isArray(e))return Ot(e)}function Ot(e,n){(n==null||n>e.length)&&(n=e.length);for(var i=0,o=new Array(n);i<n;i++)o[i]=e[i];return o}function ei(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function dn(e,n){for(var i=0;i<n.length;i++){var o=n[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,Vn(o.key),o)}}function ti(e,n,i){return n&&dn(e.prototype,n),i&&dn(e,i),Object.defineProperty(e,"prototype",{writable:!1}),e}function ni(e,n){if(typeof n!="function"&&n!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),n&&Dt(e,n)}function Dt(e,n){return Dt=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,a){return o.__proto__=a,o},Dt(e,n)}function ai(e){var n=ii();return function(){var o=wt(e),a;if(n){var s=wt(this).constructor;a=Reflect.construct(o,arguments,s)}else a=o.apply(this,arguments);return oi(this,a)}}function oi(e,n){if(n&&(Ge(n)==="object"||typeof n=="function"))return n;if(n!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return Ue(e)}function Ue(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ii(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function wt(e){return wt=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(i){return i.__proto__||Object.getPrototypeOf(i)},wt(e)}function Ie(e,n,i){return n=Vn(n),n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}function Vn(e){var n=ri(e,"string");return Ge(n)==="symbol"?n:String(n)}function ri(e,n){if(Ge(e)!=="object"||e===null)return e;var i=e[Symbol.toPrimitive];if(i!==void 0){var o=i.call(e,n||"default");if(Ge(o)!=="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var bt=function(e){ni(i,e);var n=ai(i);function i(){var o;ei(this,i);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return o=n.call.apply(n,[this].concat(s)),Ie(Ue(o),"state",{isAnimationFinished:!0,totalLength:0}),Ie(Ue(o),"getStrokeDasharray",function(d,c,u){for(var p=u.reduce(function(k,_){return k+_}),m=Math.floor(d/p),f=d%p,h=c-d,v=[],x=0,g=0;;g+=u[x],++x)if(g+u[x]>f){v=[].concat(qe(u.slice(0,x)),[f-g]);break}var S=v.length%2===0?[0,h]:[h];return[].concat(qe(i.repeat(u,m)),qe(v),S).map(function(k){return"".concat(k,"px")}).join(", ")}),Ie(Ue(o),"id",ko("recharts-line-")),Ie(Ue(o),"pathRef",function(d){o.mainCurve=d}),Ie(Ue(o),"handleAnimationEnd",function(){o.setState({isAnimationFinished:!0}),o.props.onAnimationEnd&&o.props.onAnimationEnd()}),Ie(Ue(o),"handleAnimationStart",function(){o.setState({isAnimationFinished:!1}),o.props.onAnimationStart&&o.props.onAnimationStart()}),o}return ti(i,[{key:"componentDidMount",value:function(){if(this.props.isAnimationActive){var a=this.getTotalLength();this.setState({totalLength:a})}}},{key:"getTotalLength",value:function(){var a=this.mainCurve;try{return a&&a.getTotalLength&&a.getTotalLength()||0}catch{return 0}}},{key:"renderErrorBar",value:function(a,s){if(this.props.isAnimationActive&&!this.state.isAnimationFinished)return null;var r=this.props,d=r.points,c=r.xAxis,u=r.yAxis,p=r.layout,m=r.children,f=Mo(m,Po);if(!f)return null;function h(x,g){return{x:x.x,y:x.y,value:x.value,errorVal:Fn(x.payload,g)}}var v={clipPath:a?"url(#clipPath-".concat(s,")"):null};return xe.createElement(Rt,v,f.map(function(x,g){return xe.cloneElement(x,{key:"bar-".concat(g),data:d,xAxis:c,yAxis:u,layout:p,dataPointFormatter:h})}))}},{key:"renderDots",value:function(a,s){var r=this.props.isAnimationActive;if(r&&!this.state.isAnimationFinished)return null;var d=this.props,c=d.dot,u=d.points,p=d.dataKey,m=Lt(this.props),f=Lt(c,!0),h=u.map(function(x,g){var S=Se(Se(Se({key:"dot-".concat(g),r:3},m),f),{},{value:x.value,dataKey:p,cx:x.x,cy:x.y,index:g,payload:x.payload});return i.renderDotItem(c,S)}),v={clipPath:a?"url(#clipPath-".concat(s,")"):null};return xe.createElement(Rt,ut({className:"recharts-line-dots",key:"dots"},v,{role:"img"}),h)}},{key:"renderCurveStatically",value:function(a,s,r,d){var c=this.props,u=c.type,p=c.layout,m=c.connectNulls;c.ref;var f=Go(c,Yo),h=Se(Se(Se({},Lt(f,!0)),{},{fill:"none",className:"recharts-line-curve",clipPath:s?"url(#clipPath-".concat(r,")"):null,points:a},d),{},{type:u,layout:p,connectNulls:m});return xe.createElement(_o,ut({},h,{pathRef:this.pathRef}))}},{key:"renderCurveWithAnimation",value:function(a,s){var r=this,d=this.props,c=d.points,u=d.strokeDasharray,p=d.isAnimationActive,m=d.animationBegin,f=d.animationDuration,h=d.animationEasing,v=d.animationId,x=d.animateNewValues,g=d.width,S=d.height,k=this.state,_=k.prevPoints,w=k.totalLength;return xe.createElement(No,{begin:m,duration:f,isActive:p,easing:h,from:{t:0},to:{t:1},key:"line-".concat(v),onAnimationEnd:this.handleAnimationEnd,onAnimationStart:this.handleAnimationStart},function(N){var I=N.t;if(_){var O=_.length/c.length,T=c.map(function(R,F){var K=Math.floor(F*O);if(_[K]){var j=_[K],re=lt(j.x,R.x),U=lt(j.y,R.y);return Se(Se({},R),{},{x:re(I),y:U(I)})}if(x){var se=lt(g*2,R.x),ee=lt(S/2,R.y);return Se(Se({},R),{},{x:se(I),y:ee(I)})}return Se(Se({},R),{},{x:R.x,y:R.y})});return r.renderCurveStatically(T,a,s)}var A=lt(0,w),L=A(I),E;if(u){var P="".concat(u).split(/[,\s]+/gim).map(function(R){return parseFloat(R)});E=r.getStrokeDasharray(L,w,P)}else E="".concat(L,"px ").concat(w-L,"px");return r.renderCurveStatically(c,a,s,{strokeDasharray:E})})}},{key:"renderCurve",value:function(a,s){var r=this.props,d=r.points,c=r.isAnimationActive,u=this.state,p=u.prevPoints,m=u.totalLength;return c&&d&&d.length&&(!p&&m>0||!Ao(p,d))?this.renderCurveWithAnimation(a,s):this.renderCurveStatically(d,a,s)}},{key:"render",value:function(){var a=this.props,s=a.hide,r=a.dot,d=a.points,c=a.className,u=a.xAxis,p=a.yAxis,m=a.top,f=a.left,h=a.width,v=a.height,x=a.isAnimationActive,g=a.id;if(s||!d||!d.length)return null;var S=this.state.isAnimationFinished,k=d.length===1,_=Qt("recharts-line",c),w=u&&u.allowDataOverflow||p&&p.allowDataOverflow,N=Et(g)?this.id:g;return xe.createElement(Rt,{className:_},w?xe.createElement("defs",null,xe.createElement("clipPath",{id:"clipPath-".concat(N)},xe.createElement("rect",{x:f,y:m,width:h,height:v}))):null,!k&&this.renderCurve(w,N),this.renderErrorBar(w,N),(k||r)&&this.renderDots(w,N),(!x||S)&&Io.renderCallByParent(this.props,d))}}],[{key:"getDerivedStateFromProps",value:function(a,s){return a.animationId!==s.prevAnimationId?{prevAnimationId:a.animationId,curPoints:a.points,prevPoints:s.curPoints}:a.points!==s.curPoints?{curPoints:a.points}:null}},{key:"repeat",value:function(a,s){for(var r=a.length%2!==0?[].concat(qe(a),[0]):a,d=[],c=0;c<s;++c)d=[].concat(qe(d),qe(r));return d}},{key:"renderDotItem",value:function(a,s){var r;if(xe.isValidElement(a))r=xe.cloneElement(a,s);else if(Ga(a))r=a(s);else{var d=Qt("recharts-line-dot",a?a.className:"");r=xe.createElement(wo,ut({},s,{className:d}))}return r}}]),i}(l.PureComponent);Ie(bt,"displayName","Line");Ie(bt,"defaultProps",{xAxisId:0,yAxisId:0,connectNulls:!1,activeDot:!0,dot:!0,legendType:"line",stroke:"#3182bd",strokeWidth:1,fill:"#fff",points:[],isAnimationActive:!To.isSsr,animateNewValues:!0,animationBegin:0,animationDuration:1500,animationEasing:"ease",hide:!1,label:!1});Ie(bt,"getComposedData",function(e){var n=e.props,i=e.xAxis,o=e.yAxis,a=e.xAxisTicks,s=e.yAxisTicks,r=e.dataKey,d=e.bandSize,c=e.displayedData,u=e.offset,p=n.layout,m=c.map(function(f,h){var v=Fn(f,r);return p==="horizontal"?{x:rn({axis:i,ticks:a,bandSize:d,entry:f,index:h}),y:Et(v)?null:o.scale(v),value:v,payload:f}:{x:Et(v)?null:i.scale(v),y:rn({axis:o,ticks:s,bandSize:d,entry:f,index:h}),value:v,payload:f}});return Se({points:m,layout:p},u)});var si=Ro({chartName:"LineChart",GraphicalChild:bt,axisComponents:[{axisType:"xAxis",AxisComp:Hn},{axisType:"yAxis",AxisComp:qn}],formatAxisMap:Lo});function li(){const{addToast:e}=Pe(),{flags:n}=Re(),i=l.useCallback(r=>{e("error","none",`${C("noumena.toast_error.text")}: ${r}`)},[e]),[o]=pa(),a=l.useCallback(r=>{let d=!1;const c=new Date;return r&&$n(new Date(r),c)>0&&(d=!0),d},[]);return{checkChamberCanBeUnArchived:l.useCallback(async(r,d,c,u)=>{n.paymentSubscriptions&&u===ue.Project&&r?await o({fetchPolicy:"network-only",variables:{noumDetailInput:{chamber_id:r}},onError:({networkError:p=null,graphQLErrors:m=[]})=>{const[f]=m;i((f==null?void 0:f.message)??p),Xe(new Error((f==null?void 0:f.message)??p),{tags:{section:"gqlGetNoumTransactionFeeDetails"}})},onCompleted:p=>{var m;a((m=p==null?void 0:p.getNoumTransactionFeeDetails[0])==null?void 0:m.valid_till)?d(!0):c(!0)}}):d(!0)},[a,n.paymentSubscriptions,o,i])}}function di(){const{addToast:e}=Pe(),n=l.useCallback(r=>{e("error","none",`${C("noumena.toast_error.text")}: ${r}`)},[e]),i=l.useCallback(()=>{e("success","icon","'Noum Linked To Plan.")},[e]),[o]=ma(),{flags:a}=Re();return{linkNoumToPlanHelper:l.useCallback(async(r,d,c)=>{r&&d&&a.paymentSubscriptions&&await o({variables:{noumInput:{chamber_id:r,operation_type:ha.Activation,subscription_id:d}},onError:({networkError:u=null,graphQLErrors:p=[]})=>{const[m]=p;n((m==null?void 0:m.message)??u),Xe(new Error((m==null?void 0:m.message)??u),{tags:{section:"addRenewNoumMutation"}})},onCompleted:u=>{u.addRenewNoumTransactionFee.noum_transaction_fee_id&&(i(),c==null||c(!0))}})},[o,a.paymentSubscriptions,n,i])}}const ci=({isOpen:e,onClose:n,isEditing:i})=>b(pe,{open:e,size:he.S,onClose:n,testId:"default-event-modal",disableBackdropClick:!0,style:{padding:24},"data-test":"NoumEditRestrictionModal-Modal",children:[t(ve,{"data-test":"NoumEditRestrictionModal-ModalHeader",children:b(Q,{vertical:!0,gap:26,align:"center","data-test":"NoumEditRestrictionModal-Stack",children:[t(ie,{name:"resize_xxl",color:"--icon-card-danger-primary-default",size:52,"data-test":"NoumEditRestrictionModal-Icon"}),t(M,{font:"heading-s-bold","data-test":"NoumEditRestrictionModal-TSpan",children:i?C("noumena.noum_editor.modal.edit_restriction.title"):C("noumena.noum_editor.modal.view_restriction.title")})]})}),t(ge,{style:{alignItems:"center"},"data-test":"NoumEditRestrictionModal-ModalBody",children:t(M,{font:"body-l",textAlign:"center",colorToken:"--text-modal-neutral-default","data-testid":"event-confirmation-modal-description","data-test":"NoumEditRestrictionModal-TSpan",children:i?C("noumena.noum_editor.modal.edit_restriction.description"):C("noumena.noum_editor.modal.view_restriction.description")})}),!i&&t(we,{isFullScreen:!1,gap:16,flexDirection:"column",marginTop:24,"data-test":"NoumEditRestrictionModal-ModalFooter",children:t($,{tertiary:!0,intent:"negative",size:"full",onClick:n,"data-testid":"cancel-button","data-test":"NoumEditRestrictionModal-Button",children:C("noumena.close")})})]}),Yn=y.div`
  display: flex;
  justify-content: center;
`,ui=y.div`
  box-sizing: border-box;
  display: grid;
  #header {
    grid-area: header;
  }
  #sidebar {
    grid-area: sidebar;
  }
  #body {
    grid-area: body;
    overflow: hidden;
    padding: 0 4px;
  }
  #space {
    grid-area: space;
    display: flex;
    justify-content: end;
  }

  width: 100%;
  padding-top: 2px;
  grid-template-columns: 1fr;
  grid-template-rows:
    auto
    auto
    auto;
  grid-template-areas:
    'header'
    'sidebar'
    'body';

  @media ${pt.TABLET} {
    width: 783px;
    padding: 24px 16px;
  }
  @media ${pt.LAPTOP} and (max-width: ${Oe.LAPTOP_SM_MAX}) {
    width: 100%;
    grid-template-columns: 1fr 783px ${({hasThemePanel:e})=>e?"2fr":"1fr"};
    grid-template-rows:
      auto
      auto
      auto;
    grid-template-areas:
      'space header .'
      'space sidebar .'
      'space body .';
    #header {
      width: 783px;
    }
    #body {
      width: 783px;
    }
  }
  @media (min-width: ${Oe.LAPTOP_SM_MIN}) {
    width: 1440px;
    grid-template-columns: 1fr 650px ${({hasThemePanel:e})=>e?"2fr":"1fr"};
    grid-template-rows:
      auto
      auto
      auto;
    grid-template-areas:
      'space header sidebar'
      'space body sidebar'
      'space body .';
  }
  @media (min-width: ${Oe.LAPTOP_M_MIN}) {
    grid-template-columns: 1fr 783px ${({hasThemePanel:e})=>e?"2fr":"1fr"} ${({centralize:e})=>e?"1fr":""};
  }
`,pi=y.div`
  @media (max-width: ${q.LAPTOP_SM}) {
    display: none;
  }
`,Gn=y.div`
  @media (max-width: ${Oe.TABLET_MAX}) {
    padding-top: ${({topSpacing:e})=>e?"48px":"0px"};
  }

  @media (max-width: ${Oe.MOBILE_L_MAX}) {
    padding-top: ${({topSpacing:e})=>e?"68px":"0px"};
  }
`,cn=y.div`
  box-sizing: border-box;
  display: grid;
  #header {
    grid-area: header;
    padding: 0 4px;
  }
  #sidebar {
    grid-area: sidebar;
  }
  #body {
    grid-area: body;
    overflow: visible;
    padding: 4px;
  }
  transition: all ease-in-out 0.25s;
  width: 100%;
  padding-top: 14px;
  grid-template-columns: 1fr;
  grid-template-rows:
    auto
    auto
    auto;
  grid-template-areas:
    'header'
    'sidebar'
    'body';
  ${({isStickyContainer:e})=>e&&"margin-top: 69px"};
  @media (min-width: ${je.LAPTOP_S_MIN}) {
    width: 100%;
    padding: 24px;
    grid-template-columns: 0 minmax(auto, 100%) ${({hasThemePanel:e})=>e?"2fr":"0"};
    grid-template-rows:
      auto
      auto
      auto;
    grid-template-areas:
      'space header sidebar'
      'space body sidebar'
      'space body .';
    &:has(.noums_container) {
      grid-template-columns: 0 minmax(auto, 100%) 238px;
    }
  }
  @media (min-width: ${je.LAPTOP_M_MIN}) {
    padding: 24px 40px;
    &:has(.theme_container) {
      grid-template-columns: 1fr calc(100% - 400px) 400px;
    }
    &:has(.noums_container) {
      grid-template-columns: 0 minmax(auto, 100%) 226px;
    }
    grid-template-rows:
      auto
      auto
      auto;
  }
  @media (min-width: ${je.LAPTOP_L_MIN}) {
    grid-template-columns: 1fr minmax(auto, 1360px) 1fr;
    &:has(.noums_container) {
      grid-template-columns: 0 minmax(auto, 100%) 226px;
    }
  }

  @media (min-width: ${je.LAPTOP_XL_MIN}) {
    grid-template-columns: 1fr 1360px 1fr;
    &:has(.noums_container) {
      grid-template-columns: 1fr 1360px 226px;
    }
  }
  @media (min-width: ${je.DESKTOP_MIN}) {
    &:has(.noums_container) {
      grid-template-columns: 1fr 1360px 1fr;
    }
  }

  @media (max-width: ${Oe.TABLET_L}) {
    padding-top: 0;
    #header {
      padding: 0;
    }
    ${({isStickyContainer:e})=>e&&"margin-top: 85px"};
  }
  @media (max-width: ${Oe.MOBILE_L_MAX}) {
    display: block;
    ${({isStickyContainer:e})=>e&&"margin-top: 165px"};
  }
`,mi=({header:e,isEditing:n,children:i,hasThemePanel:o=!1,leftSidebar:a,isStickyContainer:s})=>{const{isTablet:r,isMobile:d}=_t(),[c,u]=l.useState(!1);return l.useEffect(()=>{u((d||r)&&!!n)},[r,n,d]),l.useMemo(()=>r&&!!n,[r,n]),b(Yn,{className:"NoumEditor-root","data-test":"NoumViewLayout-Root",children:[s&&t("div",{id:"space",children:a}),(d||r)&&n?t(cn,{"data-testid":"Main-Layout",hasThemePanel:o,"data-test":"NoumViewLayout-MainNoumLayout"}):b(cn,{"data-testid":"Main-Layout",hasThemePanel:o,isStickyContainer:s,"data-test":"NoumViewLayout-MainNoumLayout",children:[t(Gn,{id:"header","data-test":"NoumViewLayout-Header",children:e}),t("div",{id:"body",children:i})]}),t(ci,{isOpen:c,onClose:()=>u(!1),isEditing:n,"data-test":"NoumViewLayout-NoumEditRestrictionModal"})]})},hi={noumLinkData:{},refetch:()=>{},getLinkData:()=>{},loadingLinked:!1},Qn=l.createContext(hi),un=({children:e})=>{const[n,{loading:i,data:o,refetch:a}]=fa(),s=l.useCallback(d=>{n({variables:{noumId:d||""}})},[n]),r=l.useMemo(()=>({noumLinkData:o,loadingLinked:i,refetch:a,getLinkData:s}),[o,i,a,s]);return t(Qn.Provider,{value:r,children:e})},Kn=()=>l.useContext(Qn),fi=y($)`
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`,bi=l.memo(({navItems:e,isOpen:n,handleClose:i,handleOptionSelection:o,isNoumPublishedAtAll:a})=>{const s=r=>{o(r),i()};return b(pe,{closeButtonStyles:{enforceLeft:!0},testId:"showOptions",open:n,onClose:i,enableCloseButton:!0,size:he.S,disableBackdropClick:!0,"data-test":"NoumEditOptionsModal-Modal",children:[t(ae,{height:56,"data-test":"NoumEditOptionsModal-Spacer"}),t(ge,{"data-test":"NoumEditOptionsModal-ModalBody",children:e.map(({label:r,type:d,value:c,show:u,disableBeforeFirstPublish:p})=>u?t(fi,{testId:`option-${c}`,size:"large",...d==="error"?{secondary:!0,intent:"negative"}:{tertiary:!0},onClick:()=>s(c),disabled:a&&p,"data-test":"NoumEditOptionsModal-Buttons",children:r},Ft()):void 0)}),t(we,{"data-test":"NoumEditOptionsModal-ModalFooter"})]})});C("noumena.chamber_edit.archive"),C("noumena.chamber_edit.archive"),C("noumena.chamber_edit.manage_noum_ads"),C("noumena.chamber_edit.manage_noum_ads"),C("noumena.chamber_edit.noumena_copilot"),C("noumena.chamber_edit.noumena_copilot");const gi=[{label:C("noumena.chamber_edit.manage_members.title"),value:"manage_members",type:"primary",show:!1,disableBeforeFirstPublish:!1},{label:C("noumena.chamber_edit.visibility.title"),value:"invites",type:"primary",show:!1,disableBeforeFirstPublish:!0},{label:C("noumena.chamber_edit.permission"),value:"permission",type:"primary",show:!1,disableBeforeFirstPublish:!0},{label:C("noumena.chamber_edit.customize.title"),value:"customize",type:"primary",show:!1,disableBeforeFirstPublish:!1},{label:C("noumena.chamber_edit.broadcasting"),value:"broadcasting",type:"primary",show:!1,disableBeforeFirstPublish:!0},{label:C("noumena.noum_edit.custom_preview"),value:"custom_preview",type:"primary",show:!1,disableBeforeFirstPublish:!1},{label:C("noumena.chamber_edit.manage_noum_ads"),value:"noum_ads",type:"primary",show:!1,disableBeforeFirstPublish:!0},{label:C("noumena.chamber_edit.noumena_copilot"),value:"noumena_copilot",type:"primary",show:!1,disableBeforeFirstPublish:!1},{label:C("noumena.noum_editor.save_as_a_template"),value:"save_as_a_template",type:"primary",show:!1,disableBeforeFirstPublish:!1},{label:C("noumena.header.restore_last_saved.text"),value:"restore_last_published_version",type:"primary",show:!1,disableBeforeFirstPublish:!1},{label:C("noumena.chamber_edit.archive"),value:"archive",type:"error",show:!1,disableBeforeFirstPublish:!1}];y.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 5px 5px;
  background-color: var(--bg-body-neutral-alt-highlighted);
  @media (max-width: ${q.MOBILE_L}) {
    padding: 0;
  }
`;const yi=y(Le)`
  display: flex;
  flex-direction: column;
  padding: 8px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  margin-bottom: 24px;

  @media (max-width: ${q.LAPTOP_SM}) {
    display: none;
  }
`,Xn=At`
  cursor: not-allowed;
  color: var(--text-button-neutral-disabled);
  &:hover {
    cursor: not-allowed;
    color: var(--text-button-neutral-disabled);
  }
`,Ci=y(Le)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 17px 12px;
  border-radius: 0;
  background: var(--bg-tablecell-neutral-alt-default);
  &:hover {
    cursor: pointer;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--bg-separator-neutral-default);
  }
  ${({disabled:e})=>e&&Xn}
`,vi=y.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`,Si=y(Le)`
  display: none;
  padding: 16px;
  margin-bottom: 16px;
  @media (max-width: ${q.LAPTOP_SM}) {
    display: block;
  }
  @media (max-width: ${q.TABLET_L}) {
    margin-bottom: 0px;
  }
  @media (max-width: ${q.MOBILE_L}) {
    border-radius: 0px;
  }
`,xi=y($)`
  width: 100%;
`,ol=y.div`
  display: flex;
  justify-content: space-between;
  gap: 32px;
`,il=y.div`
  &:hover {
    cursor: pointer;
  }
  ${({disabled:e})=>e&&Xn}
`,rl=y.div`
  cursor: pointer;
`,ki=({onSelect:e,isNoumPublishedAtAll:n,projectType:i,enableAds:o})=>{const{t:a}=J(),{flags:s}=Re(),[r,d]=l.useState(!1),c=l.useCallback(p=>e==null?void 0:e(p),[e]),u=l.useMemo(()=>gi.map(p=>({...p,show:p.value==="manage_members"?s.elementPermission&&s.noumEditor2:p.value==="broadcasting"?s.broadcast:p.value==="custom_preview"?s.customNoums:p.value==="noum_ads"?s.noumAds&&i===Te.Public:p.value==="noumena_copilot"?!1:["save_as_a_template","restore_last_published_version"].includes(p.value)?s.noumEditor2:!0})),[s,i]);return b(W,{children:[t(yi,{"data-testid":"sideBar","data-test":"NoumEditOptions-OptionsContainer",children:u.map(({label:p,type:m,value:f,show:h,disableBeforeFirstPublish:v})=>h?b(Ci,{onClick:()=>{v&&n||c(f)},"data-testid":"navItem",disabled:v&&n,"data-test":"NoumEditOptions-OptionWrapper",children:[t(M,{"data-testid":`noum-edit-option-${p}`,font:"body-m-bold",colorToken:v&&n?"--text-button-neutral-disabled":m==="error"?"--text-tablecell-header-danger-primary-highlighted":"--text-tablecell-header-neutral-highlighted","data-test":"NoumEditOptions-TSpan",children:p}),b(vi,{"data-test":"NoumEditOptions-SubWrapper",children:[f==="noum_ads"&&!o&&t(M,{font:"footnote",colorToken:"--text-tablecell-body-neutral-default","data-test":"NoumEditOptions-TSpan",children:"Off"}),t(ie,{name:"chevron_small_right_m",size:24,...v&&n?{color:"--text-button-neutral-disabled"}:m==="error"?{color:"--icon-tablecell-danger-primary-default"}:{color:"--icon-tablecell-neutral-highlighted"},"data-test":"NoumEditOptions-Icon"})]})]},Ft()):void 0)}),t(Si,{"data-testid":"showoptions","data-test":"NoumEditOptions-ShowOptionsWrapper",children:t(xi,{size:"large",secondary:!0,testId:"showoptionsBtn",onClick:()=>d(!0),"data-test":"NoumEditOptions-ShowOptionsButton",children:a("noumena.chamber.show_options")})}),t(bi,{navItems:u,isOpen:r,handleOptionSelection:c,handleClose:()=>d(!1),isNoumPublishedAtAll:n,"data-test":"NoumEditOptions-NoumEditOptionsModal"})]})};y.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 279px;
`;const pn=y($)`
  width: 100%;
`,wi={maxWidth:"30em"},Mi=l.memo(({isOpen:e,handleClose:n,onUnarchive:i})=>{const{t:o}=J();return b(pe,{isFullScreen:!1,testId:"chamberUnarchiveModal",open:e,onClose:n,style:wi,size:he.S,"data-test":"ChamberUnarchiveModal-Modal",children:[t(ve,{isFullScreen:!1,"data-test":"ChamberUnarchiveModal-ModalHeader",children:o("noumena.chamber_view.modal.unarchive.title")}),t(ge,{isFullScreen:!1,"data-test":"ChamberUnarchiveModal-ModalBody",children:t(M,{font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center","data-test":"ChamberUnarchiveModal-TSpan",children:o("noumena.chamber_view.modal.unarchive.description")})}),b(we,{isFullScreen:!1,flexDirection:"column",gap:16,"data-test":"ChamberUnarchiveModal-ModalFooter",children:[t(pn,{primary:!0,intent:"positive",onClick:i,children:o("noumena.chamber_view.modal.unarchive.btn.publish")}),t(pn,{tertiary:!0,onClick:n,children:o("noumena.close")})]})]})}),_i=({chamberIdAfterCreatingNoum:e,publishAndSubscribeNoum:n})=>{const{loading:i}=go({success:async a=>{e&&a.subscription_id&&await n(a.subscription_id)}});return t($,{onClick:async()=>{const a=document.getElementById(yo.NOUM_SETUP_USD);a==null||a.click()},size:"large",style:{width:"193px"},disabled:i,secondary:!0,"data-test":"PayFeesSetupNoum-Button",children:C("noumena.money.myplans.payfees")})},Ni=y.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 8px;
  background: var(--bg-card-neutral-alt-default);
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 16px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`,Ai=y.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 16px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`,mn=y.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 177px;
  height: 22px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`,Ii=y.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  flex: none;
  order: 1;
  flex-grow: 1;
`,Ti=({open:e,onClose:n,chamberIdAfterCreatingNoum:i})=>{var j,re,U,se,ee,V,X,z,D;const[o,a]=l.useState(!1),[s,r]=l.useState(!1),[d,c]=l.useState(!1),[u,p]=l.useState(),[m,f]=l.useState(!1),{user:h,masterId:v}=fe(),{space:x}=Kt(i),{totalNoumSetupSlots:g,activeNoumSetupSlots:S,oldestPlanNoumSetup:k,loading:_,payAsYouGoNoumSetup:w}=Co(),N=Ze(),{linkNoumToPlanHelper:I}=di(),{onRefetchSpaceByConfig:O,onRefetchSpaceById:T}=Kt(v||""),{publishSpaceHelper:A,loading:L}=oo();l.useEffect(()=>{var ne,le;w.length>0?(r(!0),c(!0),p((ne=w[w.length-1])==null?void 0:ne.subscription_id)):g-S>0?(r(!0),p((le=k[0])==null?void 0:le.subscription_id)):r(!1)},[S,k,w,g]);const E=l.useCallback(async()=>{a(!0)},[]),P=l.useCallback(()=>{a(!1)},[]),R=()=>{n()},F=l.useCallback(async ne=>{await I(i,ne);const le=await A(i,x);f(!1),(x==null?void 0:x.type)===ue.Project&&Ee("publishPN",{UUID:h==null?void 0:h._id,ProjectNoumID:i}),le&&(O(),T(),N(`/noum/${i}`,{replace:!0})),n()},[i,N,I,n,O,T,A,x,h==null?void 0:h._id]),K=l.useCallback(ne=>{ne&&(f(!0),setTimeout(()=>F(ne),1e3))},[F]);return b(W,{children:[t(pe,{open:e||L,size:he.M,enableCloseButton:!(m||L),onClose:R,disableBackdropClick:!0,children:m||L?b(Ht,{"data-test":"SetupNoumModal-WrapperLoading",children:[b(qt,{"data-test":"SetupNoumModal-WrapperSpinner",children:[t(Ke,{"data-test":"SetupNoumModal-Spinner"}),t(ae,{height:"20px","data-test":"SetupNoumModal-Spacer"})]}),t(ae,{height:"16px","data-test":"SetupNoumModal-Spacer"}),t(M,{"data-testid":"bodyChamberPublishSaving",font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"SetupNoumModal-TSpan",children:C("noumena.container.chamber_publish.body.loading")})]}):_?t("div",{style:{width:"100%"},children:t(be,{count:4,borderRadius:16,height:75,"data-test":"SetupNoumModal-Skeleton"})}):b(W,{children:[t(ve,{children:s?C("noumena.money.myplans.setupnoum"):C("noumena.money.myplans.payasyougo")}),t(ge,{align:"center",hideScrollbar:!0,children:s?b(W,{children:[t(M,{font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"SetupNoumModal-TSpan",children:d?C("noumena.money.myplans.setupnoum.pay_as_you_bodytext"):C("noumena.money.myplans.setupnoum.bodytext")}),t(ae,{height:16,"data-test":"SetupNoumModal-Spacer"}),b(Ni,{"data-test":"SetupNoumModal-PlanInfo",children:[t(M,{font:"body-l-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"SetupNoumModal-TSpan",children:d?"Pay As You Go":(re=(j=k[0])==null?void 0:j.item_price_id)==null?void 0:re.split("-")[0]}),b(Ai,{"data-test":"SetupNoumModal-PlanMetaData",children:[!d&&b(mn,{"data-test":"SetupNoumModal-PlanDescription",children:[t(M,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"SetupNoumModal-TSpan",children:C("noumena.money.myplans.expire")}),t(M,{font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"SetupNoumModal-TSpan",children:ro((U=k[0])==null?void 0:U.valid_till)})]}),b(Ii,{"data-test":"SetupNoumModal-PlanRenewalBox",children:[t(ba,{percentage:d?0/1*100:((se=k[0])!=null&&se.active_count_noum_setup?k[0].active_count_noum_setup:0)/((ee=k[0])!=null&&ee.max_count_noum_setup?k[0].max_count_noum_setup:0)*100,color:((V=k[0])!=null&&V.active_count_noum_setup?k[0].active_count_noum_setup:0)/((X=k[0])!=null&&X.max_count_noum_setup?k[0].max_count_noum_setup:0)*100===0?"var(--bg-progressbar-neutral-default)":"var(--bg-progressbar-brand-primary-default)",barSize:3,circleSize:24,"data-test":"SetupNoumModal-CircleProgressBar"}),b(mn,{"data-test":"SetupNoumModal-PlanDescription",children:[t(M,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"SetupNoumModal-TSpan",children:C("noumena.money.myplans.noumsetup")}),t(M,{font:"body-m",colorToken:"--text-card-neutral-highlighted","data-test":"SetupNoumModal-TSpan",children:d?"0 / 1":`${(z=k[0])==null?void 0:z.active_count_noum_setup} /
                        ${(D=k[0])==null?void 0:D.max_count_noum_setup}`})]})]})]})]}),t(ae,{height:16,"data-test":"SetupNoumModal-Spacer"}),t(M,{font:"footnote",colorToken:"--text-input-neutral-default","data-test":"SetupNoumModal-TSpan",children:C("noumena.money.myplans.setupnoum.expirytext")}),t(M,{font:"body-m-bold",colorToken:"--text-input-neutral-filled","data-test":"SetupNoumModal-TSpan",children:so()})]}):t(M,{font:"body-l",colorToken:"--text-modal-neutral-default",textAlign:"center",style:{width:"370px"},"data-test":"SetupNoumModal-TSpan",children:C("noumena.money.myplans.payasyougo.modaltext")})}),b(we,{gap:16,children:[s?null:t(_i,{chamberIdAfterCreatingNoum:i,publishAndSubscribeNoum:K,"data-test":"SetupNoumModal-PayFeesSetupNoum"}),s?t($,{primary:!0,size:"full",onClick:()=>K(u),"data-test":"SetupNoumModal-Button",children:"Setup Now"}):t($,{primary:!0,size:"large",style:{width:"193px"},onClick:()=>{E()},"data-test":"SetupNoumModal-Button",children:C("noumena.money.myplans.addNewPlan")})]})]})}),o&&t(vo,{open:o,onClose:P,launchFrom:So.NOUM_SETUP,chamberIdAfterCreatingNoum:i,publishAndSubscribeNoum:K,"data-test":"SetupNoumModal-PlanPurchaseModal"})]})},Pi=y(Q)`
  flex-direction: column;
  flex-wrap: wrap;
  gap: 12px;
  @media (max-width: ${q.LAPTOP_SM}) and (min-width: ${q.TABLET}) {
    flex-direction: ${({enforceColumn:e})=>e?"column":"row"};
  }
`,ke=y($)`
  ${({isNoumEditor:e})=>!e&&"flex: 1"};
  ${({isNoumEditor:e})=>e&&At`
      @media (max-width: ${q.MOBILE_L}) {
        width: 100%;
      }
    `};
`,Zn=y(Q)`
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${({gap:e})=>`${e??12}px`};
`,Qe=y(Q)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: ${({gap:e})=>`${e??12}px`};
`,Jn=y(Q)``,hn=y(Le)`
  padding: 16px;
  border-radius: 0;
  overflow: visible;

  @media ${pt.TABLET} {
    border-radius: 16px;
  }
`,sl=y.div`
  button {
    background: var(--icon-button-neutral-alt-default);
  }
`,Ri=y(Q)`
  background: var(--bg-card-neutral-default);
  border-radius: 8px;
`,Li=y(Q)`
  width: 289px;
  @media (max-width: ${q.MOBILE_L}) {
    width: 100%;
  }
`,Bi=y($)`
  background: var(--bg-button-neutral-alt-default);
`,Ei=()=>{var se,ee,V;const e=Ze(),[n,i]=l.useState(!1),o=l.useRef(null),{isActive:a}=fe(),[s,r]=Ye(!1),[d,c]=Ye(!1),[u,p]=l.useState(!1),{spaceId:m,isArchived:f,space:h,editDisabled:v,onRefetchSpaceById:x}=Z(),{flags:{paymentSubscriptions:g,invoiceTool:S,contractTool:k,elementPermission:_,noumEditor2:w}}=Re(),{noumLinkData:N,refetch:I,getLinkData:O,loadingLinked:T}=Kn();l.useEffect(()=>{O(m||"")},[O,m]);const A=l.useMemo(()=>N==null?void 0:N.getNoumLinkByNoumId,[N]),L=!!((se=A==null?void 0:A.link)!=null&&se._id),E=l.useCallback(()=>{e(`/noum/${m}/edit`)},[e,m]),P=l.useCallback(()=>{i(!1)},[]),{changeProjectChamberStatusHelper:R}=Vo(),{checkChamberCanBeUnArchived:F}=li(),K=l.useCallback(async()=>{m&&await R(m,Tn.Published,x)},[m,R,x]),j=X=>{var z,D;switch(X){case"unlinked_noum":A!=null&&A.link&&A.link.linkedNoumsCount>2?(z=o.current)==null||z.toggleUnlinkMultipleNoum():(D=o.current)==null||D.toggleUnlinkConfirmationOpen();break;case"manage_members":c();break;case"linked_noum":r();break;case"new_invoice":e({pathname:"/invoice/create",search:`?noumId=${m}`});break;case"new_contract":e(Xt.createContract({noumId:m}));break;case"new_sow":e(Xt.createStatementOfWork({noumId:m}));break}},re=l.useCallback(()=>{var X,z;e(L?`${St.LINK_NOUM}?linkID=${(z=(X=N==null?void 0:N.getNoumLinkByNoumId)==null?void 0:X.link)==null?void 0:z._id}`:`${St.LINK_NOUM}?preselect=${m}`)},[L,e,(V=(ee=N==null?void 0:N.getNoumLinkByNoumId)==null?void 0:ee.link)==null?void 0:V._id,m]),U=l.useMemo(()=>Wn.compact([{value:"linked_noum",key:"Linked Noum",type:"value",label:C("noumena.link_noums.link_noums",{linkNo:""}),icon:t(ie,{name:"link_m",size:24,color:"--text-tablecell-header-neutral-highlighted","data-test":"NoumOwnerActions-ellipsisMenuOptions-Icon"})},L&&{value:"unlinked_noum",key:"Unlink",type:"value",label:C("noumena.link_noums.unlink"),intent:"danger",icon:t(ie,{name:"unlink_m",size:24,color:"--text-tablecell-header-danger-primary-highlighted","data-test":"NoumOwnerActions-ellipsisMenuOptions-Icon"})},_&&w&&{value:"manage_members",key:"Manage Members",type:"value",label:C("noumena.chamber_edit.manage_members.title"),icon:t(ie,{name:"groups_m",size:24,color:"--text-tablecell-header-neutral-highlighted","data-test":"NoumOwnerActions-ellipsisMenuOptions-Icon"})},!!S&&{value:"new_invoice",key:"new_invoice",type:"value",label:"New Invoice",icon:t(ie,{name:"plus_m",size:24,color:"--text-tablecell-header-neutral-highlighted","data-test":"NoumOwnerActions-ellipsisMenuOptions-Icon"})},!!k&&{value:"new_contract",key:"new_contract",type:"value",label:"New Contract",icon:t(ie,{name:"plus_m",size:24,color:"--text-tablecell-header-neutral-highlighted","data-test":"NoumOwnerActions-ellipsisMenuOptions-Icon"})},!!k&&{value:"new_sow",key:"new_sow",type:"value",label:"New Statement of Work (SOW)",icon:t(ie,{name:"plus_m",size:24,color:"--text-tablecell-header-neutral-highlighted","data-test":"NoumOwnerActions-ellipsisMenuOptions-Icon"})}]),[k,_,S,L,w]);return f?b(W,{children:[t(Qe,{"data-testid":"archived-noum-actions","data-test":"NoumOwnerActions-RowContainer",children:t(ke,{disabled:v,size:"full",secondary:!0,onClick:()=>F(m,i,p,h==null?void 0:h.type),"data-test":"NoumOwnerActions-NoumActionButton",children:C("noumena.chamber.unarchive_button")})}),g&&u&&t(Ti,{open:u,onClose:()=>p(!1),chamberIdAfterCreatingNoum:m,"data-test":"NoumOwnerActions-SetupNoumModal"}),t(Mi,{isOpen:n,handleClose:P,onUnarchive:K,"data-test":"NoumOwnerActions-ChamberUnarchiveModal"})]}):b(W,{children:[b(Qe,{"data-testid":"edit-noum-actions","data-test":"NoumOwnerActions-RowContainer",children:[t(ke,{disabled:!a,size:"full",primary:!0,leftIcon:t(ie,{name:"edit_m",size:24,color:"--icon-button-neutral-alt-default","data-test":"NoumOwnerActions-Icon"}),onClick:E,"data-test":"NoumOwnerActions-NoumActionButton",children:C("noumena.chamber.edit_button")}),U.length>0&&t("div",{className:"ellipsis-menu",children:t(bo,{menuOptions:U,size:"full",onClick:j,containerWidth:"147",loadingLinked:T,"data-test":"NoumOwnerActions-EllipsisMenu"})})]}),t(lo,{goToNoumLink:re,isOpen:s,handleClose:r,"data-test":"NoumOwnerActions-LinkNoum"}),t(co,{noumLink:A==null?void 0:A.link,ref:o,space:h,refetch:I,"data-test":"NoumOwnerActions-HandleUnlinkNoum"}),d&&t(uo,{isOpen:d,handleClose:()=>c(),"data-test":"NoumOwnerActions-ManageMembersModal"})]})},Oi=({onHandleInvitation:e,invitedFrom:n})=>{var r,d,c;const{isMasterNoum:i}=Z(),{t:o}=J(),a=We(),s=l.useMemo(()=>a.width<=Fe.MOBILE_L,[a.width]);return b(Ri,{fullWidth:!0,justify:"space-between",align:"center",padding:"8px 16px",vertical:s,gap:13,"data-test":"NoumEditorInvited-InvitedWrapper",children:[b(Q,{gap:8,"data-test":"NoumEditorInvited-Stack",children:[t(De,{url:mt.getProfilePicture(n==null?void 0:n.uid)??"",size:"M","data-test":"NoumEditorInvited-Avatar"}),t(Jn,{"data-test":"NoumEditorInvited-TextContainer",children:t(M,{font:"body-m-bold",colorToken:"--text-card-neutral-highlighted","data-test":"NoumEditorInvited-TSpan",children:t(ft,{i18nKey:i?"noumena.editor.home.received_invite_text":"noumena.editor.received_invite_text",values:{name:ht((r=n==null?void 0:n.uid)==null?void 0:r.firstName,(d=n==null?void 0:n.uid)==null?void 0:d.middleName,(c=n==null?void 0:n.uid)==null?void 0:c.lastName)},components:{gray:t(M,{"data-testid":"gray-text",font:"body-m-bold",colorToken:"--text-card-neutral-highlighted","data-test":"NoumEditorInvited-TSpan"})},"data-test":"NoumEditorInvited-Trans"})})})]}),b(Li,{gap:8,"data-test":"NoumEditorInvited-InvitedButtonsStack",children:[t(Bi,{size:s?"full_small":"small",onClick:()=>e(Y.Declined),"data-test":"NoumEditorInvited-InvitedButtons",children:o("noumena.chamber.decline_button")}),t($,{size:"full_small",primary:!0,onClick:()=>e(Y.Approved),"data-test":"NoumEditorInvited-Button",children:o("noumena.chamber.accept_button")})]})]})},Di=({onHandle:e,isNoumEditor:n})=>{var f,h,v,x,g,S;const{t:i}=J(),{masterId:o}=fe(),{existingConnection:a,refetchConnectedMembers:s,space:r,isMasterNoum:d,isOwner:c,onRefetchSpaceById:u}=Z(),p=l.useMemo(()=>{var k,_,w;return d?!c&&((_=(k=r==null?void 0:r.connectionWithNoum)==null?void 0:k.requestTo)==null?void 0:_._id)===o?(w=r==null?void 0:r.connectionWithNoum)==null?void 0:w.requestFrom:void 0:a==null?void 0:a.requestFrom},[a==null?void 0:a.requestFrom,d,c,o,(f=r==null?void 0:r.connectionWithNoum)==null?void 0:f.requestFrom,(v=(h=r==null?void 0:r.connectionWithNoum)==null?void 0:h.requestTo)==null?void 0:v._id]),m=l.useCallback(async k=>{const _=await e(k);k===Y.Approved&&_&&(s(),u())},[e,u,s]);return n?t(Oi,{onHandleInvitation:m,invitedFrom:p,"data-test":"NoumInvitedConnection-NoumEditorInvited"}):b(Zn,{"data-testid":"noum-invited-connections","data-test":"NoumInvitedConnection-ColumnContainer",children:[b(Qe,{gap:8,"data-test":"NoumInvitedConnection-RowContainer",children:[t(De,{url:mt.getProfilePicture(p==null?void 0:p.uid)??"",size:"M","data-test":"NoumInvitedConnection-Avatar"}),t(Jn,{"data-test":"NoumInvitedConnection-TextContainer",children:t(M,{font:"body-m-bold",colorToken:"--text-card-neutral-highlighted","data-test":"NoumInvitedConnection-TSpan",children:t(ft,{i18nKey:d?"noumena.home.received_invite_text":"noumena.received_invite_text",values:{name:ht((x=p==null?void 0:p.uid)==null?void 0:x.firstName,(g=p==null?void 0:p.uid)==null?void 0:g.middleName,(S=p==null?void 0:p.uid)==null?void 0:S.lastName)},components:{gray:t(M,{"data-testid":"gray-text",font:"body-m-bold",colorToken:"--text-card-neutral-default","data-test":"NoumInvitedConnection-TSpan"})},"data-test":"NoumInvitedConnection-Trans"})})})]}),b(Qe,{"data-test":"NoumInvitedConnection-RowContainer",children:[t(ke,{size:"full",tertiary:!0,onClick:()=>m(Y.Declined),"data-test":"NoumInvitedConnection-NoumActionButton",children:i("noumena.chamber.decline_button")}),t(ke,{size:"full",primary:!0,onClick:()=>m(Y.Approved),"data-test":"NoumInvitedConnection-NoumActionButton",children:i("noumena.chamber.accept_button")})]})]})},$i=({spaceName:e,onDisconnect:n,onClose:i})=>{const{t:o}=J();return b(pe,{open:!0,testId:"chamber-disconnect",onClose:i,size:he.S,disableBackdropClick:!0,"data-test":"ChamberDisconnect-Modal",children:[t(ve,{"data-test":"ChamberDisconnect-ModalHeader",children:o("noumena.chamber.disconnect")}),t(ge,{align:"center","data-test":"ChamberDisconnect-ModalBody",children:t(M,{colorToken:"--text-modal-neutral-default",font:"body-l",textAlign:"center","data-test":"ChamberDisconnect-TSpan",children:o("noumena.chamber.disconnect_message",{name:e})})}),b(we,{flexDirection:"column",gap:16,"data-test":"ChamberDisconnect-ModalFooter",children:[t($,{testId:"chamber-disconnect-button",intent:"negative",align:"center",size:"full",onClick:n,"data-test":"ChamberDisconnect-Button",children:o("noumena.chamber.disconnect")}),t($,{testId:"chamber-close-button",align:"center",size:"full",onClick:i,"data-test":"ChamberDisconnect-Button",children:o("noumena.close")})]})]})},jt=({actionType:e,loading:n=!1,onConfirm:i,onClose:o})=>{var m,f;const{t:a}=J(),{width:s}=We(),r=l.useMemo(()=>s<=Fe.MOBILE_MAX,[s]),{projectType:d,link:c}=Z(),u=l.useMemo(()=>a(e==="connect"?`noumena.link_noums.connect_to_${(d==null?void 0:d.toLowerCase())??"public"}.modal.title`:"noumena.link_noums.follow.modal.title"),[e,d,a]),p=l.useMemo(()=>{var h,v;return e==="connect"?a(`noumena.link_noums.connect_to_${(d==null?void 0:d.toLowerCase())??"public"}.modal.description`,{linkedNoumsCount:(h=c==null?void 0:c.linkedNoums)==null?void 0:h.length}):a("noumena.link_noums.follow.modal.description",{linkedNoumsCount:(v=c==null?void 0:c.linkedNoums)==null?void 0:v.length})},[e,d,(m=c==null?void 0:c.linkedNoums)==null?void 0:m.length,a]);return b(pe,{open:!0,testId:"noum-connect-with-linked-noums",onClose:o,enableCloseButton:!0,size:he.M,disableBackdropClick:!0,"data-test":"ConnectLinkedNoumsModal-Modal",children:[t(ve,{"data-test":"ConnectLinkedNoumsModal-ModalHeader",children:u}),b(ge,{align:"center","data-test":"ConnectLinkedNoumsModal-ModalBody",children:[t(M,{font:"body-m",colorToken:"--text-modal-neutral-default","data-test":"ConnectLinkedNoumsModal-TSpan",children:p}),t(ae,{height:16,"data-test":"ConnectLinkedNoumsModal-Spacer"}),t(Q,{fullWidth:!0,"data-test":"ConnectLinkedNoumsModal-Stack",children:t(Wt,{width:"100%",status:"end-with-force",maxHeight:r?"unset":"152px","data-test":"ConnectLinkedNoumsModal-Infinite",children:(f=c==null?void 0:c.linkedNoums)==null?void 0:f.map(h=>b(Q,{fullWidth:!0,style:{height:"40px",minHeight:"40px"},align:"center",borderBottom:!0,grow:!0,"data-test":"ConnectLinkedNoumsModal-Stack",children:[t(De,{url:(h==null?void 0:h.profileImage)||null,size:"M","data-test":"ConnectLinkedNoumsModal-Avatar"}),t(M,{font:"body-m",colorToken:"--text-tablecell-header-neutral-highlighted",style:{marginLeft:"8px"},"data-test":"ConnectLinkedNoumsModal-TSpan",children:(h==null?void 0:h.name)||""})]}))})})]}),b(we,{gap:16,"data-test":"ConnectLinkedNoumsModal-ModalFooter",children:[t($,{testId:"noum-cancel-button",size:"full",onClick:o,disabled:n,"data-test":"ConnectLinkedNoumsModal-Button",children:a("noumena.cancel")}),t($,{testId:"noum-continue-button",primary:!0,size:"full",onClick:i,disabled:n,loading:n,"data-test":"ConnectLinkedNoumsModal-Button",children:a("noumena.continue")})]})]})},Wi=({onHandle:e,loading:n,isNoumEditor:i})=>{const{t:o}=J(),{spaceName:a,refetchConnectedMembers:s,space:r,isConnected:d,onRefetchSpaceById:c}=Z(),{isActive:u}=fe(),[p,m]=l.useState(!1),[f,h]=Ye(!1),v=l.useCallback(async(S=!0)=>{await e(Y.Approved)&&(s(),c()),S&&h()},[e,c,s,h]),x=l.useCallback(()=>{d?m(!0):r!=null&&r.link?h():v(!1)},[v,d,r==null?void 0:r.link,h]),g=l.useCallback(async()=>{m(!1),await e(Y.Declined)&&(s(),c())},[e,c,s]);return b(W,{children:[t(ke,{testId:"user-connection-button",disabled:!u||n,loading:n,isNoumEditor:i,size:i?void 0:"full",primary:!d,tertiary:d,leftIcon:d?t(ie,{name:"check_xs",size:16,color:"--icon-button-neutral-default","data-test":"NoumUserConnection-Icon"}):void 0,onClick:x,"data-test":"NoumUserConnection-NoumActionButton",children:o(d?"noumena.chamber.disconnect_button":"noumena.chamber.connect_button")}),p&&t($i,{spaceName:a,onDisconnect:g,onClose:()=>m(!1),"data-test":"NoumUserConnection-ChamberDisconnect"}),f&&(r==null?void 0:r.link)&&t(jt,{actionType:"connect",loading:n,onConfirm:v,onClose:h,"data-test":"NoumUserConnection-ConnectLinkedNoumsModal"})]})},Ui=({spaceName:e,onCancelRequest:n,onClose:i})=>{const{t:o}=J();return b(pe,{open:!0,testId:"chamber-cancel-request",onClose:i,size:he.S,disableBackdropClick:!0,"data-test":"ChamberCancelRequest-Modal",children:[t(ve,{"data-test":"ChamberCancelRequest-ModalHeader",children:o("noumena.chamber.cancel_request")}),t(ge,{align:"center","data-test":"ChamberCancelRequest-ModalBody",children:t(M,{colorToken:"--text-modal-neutral-default",font:"body-l",textAlign:"center","data-test":"ChamberCancelRequest-TSpan",children:o("noumena.chamber.cancel_request_message",{name:e})})}),b(we,{flexDirection:"column",gap:16,"data-test":"ChamberCancelRequest-ModalFooter",children:[t($,{testId:"chamber-cancel-request-button",intent:"negative",align:"center",size:"full",onClick:n,"data-test":"ChamberCancelRequest-Button",children:o("noumena.chamber.cancel_request")}),t($,{testId:"chamber-close-button",align:"center",size:"full",tertiary:!0,onClick:i,"data-test":"ChamberCancelRequest-Button",children:o("noumena.close")})]})]})},zi=({connectionStatus:e,onHandle:n,loading:i,isNoumEditor:o})=>{const{t:a}=J(),{isActive:s}=fe(),{spaceName:r,link:d}=Z(),[c,u]=l.useState(!1),[p,m]=Ye(!1),f=l.useMemo(()=>e===Y.Requested,[e]),h=l.useCallback(async(g=!0)=>{await n(Y.Requested),g&&m()},[n,m]),v=l.useCallback(async()=>{await n(Y.Cancelled),u(!1)},[n]),x=l.useCallback(async()=>{if(f){u(!0);return}if(!d){await h(!1);return}m()},[h,f,d,m]);return b(W,{children:[t(ke,{isNoumEditor:o,testId:"request-connection-button",disabled:!s||i,loading:i,size:o?void 0:"full",primary:!f,tertiary:f,onClick:x,"data-test":"NoumRequestConnection-NoumActionButton",children:a(f?"noumena.chamber.request_sent_button":"noumena.chamber.request_connect_button")}),c&&t(Ui,{spaceName:r,onCancelRequest:v,onClose:()=>u(!1),"data-test":"NoumRequestConnection-ChamberCancelRequest"}),p&&d&&t(jt,{actionType:"connect",loading:i,onConfirm:h,onClose:m,"data-test":"NoumRequestConnection-ConnectLinkedNoumsModal"})]})},Fi=({spaceName:e,onUnfollow:n,onClose:i})=>{const{t:o}=J();return b(pe,{open:!0,testId:"chamber-unfollow",onClose:i,size:he.S,disableBackdropClick:!0,"data-test":"ChamberUnfollow-Modal",children:[t(ve,{"data-test":"ChamberUnfollow-ModalHeader",children:o("noumena.chamber.unfollow")}),t(ge,{align:"center","data-test":"ChamberUnfollow-ModalBody",children:t(M,{colorToken:"--text-modal-neutral-default",font:"body-l",textAlign:"center","data-test":"ChamberUnfollow-TSpan",children:o("noumena.chamber.unfollow_message",{name:e})})}),b(we,{flexDirection:"column",gap:16,"data-test":"ChamberUnfollow-ModalFooter",children:[t($,{testId:"chamber-unfollow-button",intent:"negative",align:"center",size:"full",onClick:n,"data-test":"ChamberUnfollow-Button",children:o("noumena.chamber.unfollow")}),t($,{testId:"chamber-close-button",align:"center",size:"full",onClick:i,tertiary:!0,"data-test":"ChamberUnfollow-Button",children:o("noumena.close")})]})]})},Hi=({isNoumEditor:e})=>{const{t:n}=J(),{spaceId:i,spaceName:o,isFollowing:a,onFollowersUpdate:s,isFromFeaturedPage:r,onUpdateFromFeaturedPage:d,link:c,refetchFollowersCount:u,onRefetchSpaceById:p}=Z(),[m,f]=Qa(),h=m.get(Zt.source),{isActive:v}=fe(),[x,g]=l.useState(!1),[S,k]=l.useState(a),[_,w]=Ye(!1),{handleFollowHelper:N,loading:I}=Ho();l.useEffect(()=>{h===Zt.featured&&(d(!0),f({},{replace:!0}))},[d,f,h]),l.useEffect(()=>{k(!!a)},[a]);const O=l.useCallback(async(L=!0)=>{if(!i)return;k(!0),s(!0),await N(i,Jt.Follow,r?en.FeaturedPage:void 0)?p():(k(!1),s(!1)),L&&(w(),u&&u())},[N,r,s,p,u,i,w]),T=l.useCallback(async()=>{if(!i)return;g(!1),k(!1),s(!1);const L=await N(i,Jt.Unfollow,r?en.FeaturedPage:void 0);L||(k(!0),s(!0)),L&&p()},[i,s,N,r,p]),A=l.useCallback(()=>{S?g(!0):c?w():O(!1)},[S,O,c,w]);return b(W,{children:[t(ke,{isNoumEditor:e,disabled:!v||I,loading:I,"data-testid":"follow-button",size:e?void 0:"full",secondary:!S,tertiary:S,leftIcon:S?t(ie,{name:"check_xs",size:16,color:"--icon-button-neutral-default","data-test":"NoumUserFollow-Icon"}):void 0,onClick:A,"data-test":"NoumUserFollow-NoumActionButton",children:n(S?"noumena.chamber.unfollow_button":"noumena.chamber.follow_button")}),x&&t(Fi,{spaceName:o,onUnfollow:T,onClose:()=>g(!1),"data-test":"NoumUserFollow-ChamberUnfollow"}),_&&c&&t(jt,{actionType:"follow",loading:I,onConfirm:O,onClose:w,"data-test":"NoumUserFollow-ConnectLinkedNoumsModal"})]})},qi=()=>{const{t:e}=J();return b(W,{children:[t(ke,{testId:"user-connection-button",disabled:!0,size:"full","data-test":"NoumWaitInvitation-NoumActionButton",children:e("noumena.chamber.connect_button")}),t(Qe,{"data-test":"NoumWaitInvitation-RowContainer",children:t(M,{"data-testid":"bodyChamberWaitingText",font:"body-m",colorToken:"--text-card-neutral-default",textAlign:"center","data-test":"NoumWaitInvitation-TSpan",children:e("noumena.noum.text.need_invited_to_noum.text")})})]})},ji=({ownerId:e,isNoumEditor:n})=>{const{t:i}=J(),o=Ze(),[a]=ga(),{user:s}=fe(),r=async()=>{var d;if(s!=null&&s._id&&e){const{data:c}=await a({variables:{userIds:[e,s._id]}}),u=(d=c==null?void 0:c.getOrCreateConversation)==null?void 0:d.cid;u&&o(`${St.MESSAGES}/${u}`)}};return t(W,{children:n?t($,{onClick:r,tertiary:!0,icon:t(ie,{name:"message_outline_m",size:24,"data-test":"NoumSendMessage-Icon"}),"data-test":"NoumSendMessage-Button"}):t(Zn,{"data-testid":"noum-invited-connections","data-test":"NoumSendMessage-ColumnContainer",children:t(ke,{onClick:r,size:"full",secondary:!0,"data-test":"NoumSendMessage-NoumActionButton",children:i("noumena.chamber.message_button")})})})},Vi=()=>{var O;const{spaceId:e,connectionId:n,connectionStatus:i,projectType:o,mainSpaceId:a,noumType:s,existingConnection:r,isOwner:d,onMembersInstantUpdate:c,refetchConnections:u,setConnectionStatus:p,onRefetchSpaceById:m,space:f}=Z(),{onForegroundMessage:h}=ya();l.useEffect(()=>h(T=>{var L,E;if(((L=T.data)==null?void 0:L.chamberId)===e)switch((E=T.data)==null?void 0:E.pnId){case"connectionInviteAccepted":p(Y.Approved);break;case"connectionInviteDeclined":p(Y.Declined);break}}),[h,p,e]);const{user:v}=fe(),{requestConnectionHelper:x,loading:g}=Pn(),{updateConnectionStatusHelper:S,loading:k}=Ca(),_=l.useMemo(()=>g||k,[g,k]),w=l.useCallback(async T=>{if(!e)return!1;let A=!1;const L=i;return p(T),c(T),[Y.Approved,Y.Requested].includes(T)?r&&(r!=null&&r.status)&&![String(Y.Declined),String(Y.Cancelled)].includes(r.status)?A=await S(e,n,T):(A=await x(a,e),A&&(m(),u())):A=await S(e,n,T),A||(p(L),c(L)),A&&s===ue.Home&&T===Y.Requested&&Ee("friend_request_sent",{UUID:v==null?void 0:v._id,DeviceType:navigator.userAgent}),A},[e,i,p,c,s,r,S,n,x,a,m,u,v==null?void 0:v._id]),N=l.useCallback(()=>{let T=null;return s===ue.Home?T=me.handleRequest:o===Te.Public?!d&&s===ue.Home?T=me.handleRequest:T=me.handleConnection:o===Te.Private?T=me.handleRequest:o===Te.Secret&&(T=me.handleWaitInvitation),T},[s,o,d]),I=l.useMemo(()=>{var A,L,E,P,R;let T=null;if(!i)((A=f==null?void 0:f.connectionWithNoum)==null?void 0:A.status)===Y.Requested&&((E=(L=f==null?void 0:f.connectionWithNoum)==null?void 0:L.requestTo)==null?void 0:E._id)===(f==null?void 0:f._id)?T=me.handleInvitation:T=N();else if(i===Y.Invited)T=me.handleInvitation;else if(i===Y.Cancelled)T=N();else if(i===Y.Requested)if(s===ue.Home){const F=(f==null?void 0:f.connectionWithNoum)||null;(F==null?void 0:F.status)===Y.Requested?((P=F.requestFrom)==null?void 0:P._id)===a?T=me.handleRequest:((R=F.requestTo)==null?void 0:R._id)===a&&(T=me.handleInvitation):T=N()}else T=o===Te.Public?me.handleConnection:me.handleRequest;else i===Y.Approved?T=me.handleConnection:[Y.Removed,Y.Declined].includes(i)&&(T=N());return T},[i,N,a,s,o,f==null?void 0:f._id,f==null?void 0:f.connectionWithNoum]);return b(Pi,{"data-testid":"user-actions",enforceColumn:I===me.handleWaitInvitation,"data-test":"NoumUserActions-Wrapper",children:[I===me.handleInvitation&&t(Di,{connectionStatus:i,onHandle:w,"data-test":"NoumUserActions-NoumInvitedConnection"}),I===me.handleRequest&&t(zi,{connectionStatus:i,onHandle:w,loading:_,"data-test":"NoumUserActions-NoumRequestConnection"}),I===me.handleConnection&&t(Wi,{onHandle:w,loading:_,"data-test":"NoumUserActions-NoumUserConnection"}),I===me.handleWaitInvitation&&t(qi,{"data-test":"NoumUserActions-NoumWaitInvitation"}),s!==ue.Home&&o!==Te.Secret&&t(Hi,{"data-test":"NoumUserActions-NoumUserFollow"}),s===ue.Home&&((O=f==null?void 0:f.uid)!=null&&O._id)?t(ji,{ownerId:f.uid._id,"data-test":"NoumUserActions-NoumSendMessage"}):null]})},Yi=()=>{const e=Ze(),{editDisabled:n}=Z();return t(W,{children:t(Qe,{"data-testid":"home-noum-actions","data-test":"HomeNoumActions-RowContainer",children:t(ke,{disabled:n,size:"full",primary:!0,leftIcon:t(ie,{name:"edit_m",size:24,color:"--icon-button-neutral-alt-default","data-test":"HomeNoumActions-Icon"}),onClick:()=>e(St.EDIT_HOME_NOUM),"data-test":"HomeNoumActions-NoumActionButton",children:C("noumena.chamber.edit_button")})})})},Gi=({onClose:e,setRiseApplicationNoumId:n,setOpenAlreadyCreated:i})=>{const{t:o}=J(),{createRiseApplicationNoumHelper:a,loading:s}=qo(),{space:r}=Z(),d=Ze(),c=l.useCallback(async()=>{const{id:u,alredayCreated:p}=await a(r==null?void 0:r._id);p&&u?(n(u),i(!0),e()):(e(),u&&d(`/noum/${u}`))},[a,d,e,i,n,r==null?void 0:r._id]);return t(W,{children:b(pe,{open:!0,testId:"rise-program-create-noum",onClose:e,size:he.S,disableBackdropClick:!0,"data-test":"RiseProgramCreateNoum-Modal",children:[" ",s?b(Ht,{"data-test":"RiseProgramCreateNoum-WrapperLoading",children:[b(qt,{"data-test":"RiseProgramCreateNoum-WrapperSpinner",children:[t(Ke,{"data-test":"RiseProgramCreateNoum-Spinner"}),t(ae,{height:"20px","data-test":"RiseProgramCreateNoum-Spacer"})]}),t(ae,{height:"16px","data-test":"RiseProgramCreateNoum-Spacer"}),t(M,{"data-testid":"bodyElementDeleteSaving",font:"body-l",colorToken:"--text-modal-neutral-default","data-test":"RiseProgramCreateNoum-TSpan",children:o("noumena.riseprogram.create_rise_application.loading")})]}):b(W,{children:[t(ve,{"data-test":"RiseProgramCreateNoum-ModalHeader",children:o("noumena.chamber.riseprogram.create_noum_modal_heading")}),t(ge,{align:"center","data-test":"RiseProgramCreateNoum-ModalBody",children:t(M,{colorToken:"--text-modal-neutral-default",font:"body-l",textAlign:"center","data-test":"RiseProgramCreateNoum-TSpan",children:o("noumena.chamber.riseprogram.create_noum_modal_body")})}),b(we,{flexDirection:"column",gap:16,"data-test":"RiseProgramCreateNoum-ModalFooter",children:[t($,{testId:"chamber-disconnect-button",primary:!0,align:"center",size:"full",onClick:c,"data-test":"RiseProgramCreateNoum-Button",children:o("noumena.chamber.riseprogram.create_noum_modal.submitButton")}),t($,{testId:"chamber-close-button",align:"center",size:"full",onClick:e,"data-test":"RiseProgramCreateNoum-Button",children:o("noumena.chamber.riseprogram.create_noum_modal.cancelButton")})]})]})]})})},Qi=({onClose:e,riseApplicationNoumId:n,open:i})=>{const{t:o}=J(),a=Ze(),s=l.useCallback(async()=>{e(),a(`/noum/${n}`)},[a,e,n]);return b(pe,{open:i,testId:"rise-program-create-noum",onClose:e,size:he.S,disableBackdropClick:!0,"data-test":"RiseProgramAlreadyCreated-Modal",children:[t(ve,{"data-test":"RiseProgramAlreadyCreated-ModalHeader",children:o("noumena.chamber.riseprogram.already_created_modal_heading")}),t(ge,{align:"center","data-test":"RiseProgramAlreadyCreated-ModalBody",children:t(M,{colorToken:"--text-modal-neutral-default",font:"body-l",textAlign:"center","data-test":"RiseProgramAlreadyCreated-TSpan",children:o("noumena.chamber.riseprogram.already_created_modal_body")})}),b(we,{flexDirection:"column",gap:16,"data-test":"RiseProgramAlreadyCreated-ModalFooter",children:[t($,{testId:"chamber-disconnect-button",primary:!0,align:"center",size:"full",onClick:s,"data-test":"RiseProgramAlreadyCreated-Button",children:o("noumena.chamber.riseprogram.already_created.submitButton")}),t($,{testId:"chamber-close-button",align:"center",size:"full",onClick:e,"data-test":"RiseProgramAlreadyCreated-Button",children:o("noumena.chamber.riseprogram.already_created.cancel")})]})]})},Ki=({isNoumEditor:e})=>{const{t:n}=J(),[i,o]=l.useState(),[a,s]=l.useState(!1),[r,d]=l.useState(),{isActive:c}=fe(),{addToast:u}=Pe(),{isConnected:p,spaceId:m}=Z(),[f,h]=l.useState(!1),{logError:v}=Mt(),{data:x,error:g}=Rn({variables:{noumId:m},onCompleted:()=>{var k,_;(k=x==null?void 0:x.getNoumClassByNoumId)!=null&&k._id&&o(!((_=x.getNoumClassByNoumId)!=null&&_.isDeleted))},onError:()=>{v(g,"GetNoumClassByNoumId")}}),S=l.useCallback(()=>{i?p?h(!0):u("error","icon",n("noumena.rise_program.apply_check")):u("error","icon",n("noumena.rise_program.can_user_apply"))},[u,i,p,n]);return b(W,{children:[t(ke,{testId:"user-rise-apply-button",isNoumEditor:e,disabled:!c,size:e?void 0:"full",primary:!0,onClick:S,"data-test":"RiseNoumUserApplyButton-NoumActionButton",children:n("noumena.chamber.riseprogram.apply_button")}),f&&t(Gi,{onClose:()=>h(!1),setRiseApplicationNoumId:d,setOpenAlreadyCreated:s,"data-test":"RiseNoumUserApplyButton-RiseProgramCreateNoum"}),a&&t(Qi,{open:a,onClose:()=>s(!1),riseApplicationNoumId:r,"data-test":"RiseNoumUserApplyButton-RiseProgramAlreadyCreated"})]})},Xi=()=>{var s;const{isOwner:e,isMasterNoum:n,loadingSpace:i,space:o,isConnected:a}=Z();return i?t(hn,{"data-testid":"view-mode-actions-skeleton","data-test":"NoumViewModeActions-ActionsWrapper",children:t(be,{height:56,borderRadius:8,"data-test":"NoumViewModeActions-Skeleton"})}):e&&(o==null?void 0:o.type)===ue.RiseApplication?null:b(hn,{"data-test":"NoumViewModeActions-ActionsWrapper",children:[((s=o==null?void 0:o.category)==null?void 0:s.name)==="Rise"&&a&&t(Ki,{"data-test":"NoumViewModeActions-RiseNoumUserApplyButton"}),t(ae,{height:12,"data-test":"NoumViewModeActions-Spacer"}),e?n?t(Yi,{"data-test":"NoumViewModeActions-HomeNoumActions"}):t(Ei,{"data-test":"NoumViewModeActions-NoumOwnerActions"}):t(Vi,{"data-test":"NoumViewModeActions-NoumUserActions"})]})},Zi=l.createContext({status:void 0,applicationId:void 0,enableApplicationSubmission:!1,identityCompletion:!1,noOfEssays:0,isClassDeleted:!1,essayQuestionAnswered:!1,refresh:()=>null,isStepCompleted:()=>!1,checked:{principlesYou:!1,essays:!1},setChecked:()=>{},canSubmit:!1,setCanSubmit:()=>null,resultJson:void 0});function Ji(){return l.useContext(Zi)}const er=y.div`
  width: 100%;
  height: 54px;
  display: flex;
  gap: 8px;
  border-radius: 4px;
  background-color: var(--bg-infobox-brand-primary-default);
  border-left: 4px solid var(--border-infobox-brand-primary-default);
  div {
    width: ${({isTablet:e})=>e?"auto":"240px"};
    padding: 8px 8px 8px 12px;
  }
`,tr=y.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
`,nr=y.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-card-neutral-default);
  box-sizing: border-box;
  @media (min-width: ${q.MOBILE_MAX}) and (max-width: ${q.TABLET_L}) {
    width: 100%;;
  }
`,ar=y.div`
  display: flex;
  gap: 8px;
  ${({isTablet:e})=>e&&"flex: 1 0 0;"}
  flex-direction: column;
  ${({isOwner:e,isTablet:n})=>e&&!n&&"padding: 0px 16px 0px 0px;"}
  ${({isOwner:e})=>e&&"border-right: 1px solid var(--border-card-neutral-default);"}
`,fn=y(M)`
  white-space: nowrap;
`,ll=y.div`
  display: flex;
  align-items: flex-start;
  gap: -1px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
  flex-direction: ${({isMobile:e})=>e?"column":"row"};
`,dl=y.div`
  display: flex;
  padding: 12px 16px;
  align-items: ${({showCheckbox:e})=>e?"flex-start":"center"};
  gap: ${({showCheckbox:e})=>e?"4px":"8px"};
  flex-direction: ${({showCheckbox:e})=>e?"column":"row"};
  flex: 1 0 0;
  ${({showCheckbox:e})=>e&&"justify-content: center;"}
  align-self: stretch;
  border-right: ${({hasRightBorder:e})=>e?"1px solid var(--border-card-neutral-default)":"none"};
  border-bottom: ${({hasBottomBorder:e})=>e?"1px solid var(--border-card-neutral-default)":"none"};
  cursor: pointer;
  :hover {
    background: var(--bg-tablecell-neutral-hover);
  }
`,bn=y.div`
  width: ${({isDesktop:e})=>e?"220px":"unset"};
  ${({isDesktop:e})=>!e&&"flex: 1 0 0;"}
`,or=y(Q)`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid var(--border-card-neutral-default);
`,cl=y.div`
  display: flex;
  align-items: flex-start;
  gap: -1px;
  align-self: stretch;
  border-bottom: 1px solid var(--border-card-neutral-default);
`,ir=({status:e,isOwner:n})=>{const{t:i}=J(),{isTablet:o,isMobile:a,isDesktop:s}=_t(),r=l.useMemo(()=>e===ze.Approved?{status:i("noumena.rise.status.approved"),helperText:i("noumena.rise.status.approved.helper"),success:!0,danger:!1}:e===ze.Rejected?{status:i("noumena.rise.status.rejected"),helperText:i("noumena.rise.status.rejected.helper"),success:!1,danger:!0}:{status:i("noumena.rise.status.pending"),helperText:i("noumena.rise.status.pending.helper"),success:!1,danger:!1},[e,i]);return a?b(or,{vertical:!0,gap:12,fullWidth:!0,align:"stretch",padding:12,"data-test":"RiseApplicationStatus-RiseStepWrapperTablet",children:[b(Q,{vertical:!0,borderBottom:n,gap:8,padding:12,"data-test":"RiseApplicationStatus-Stack",children:[t(fn,{font:"footnote-bold",colorToken:"--text-body-neutral-default","data-test":"RiseApplicationStatus-StatusText",children:i("noumena.chamber.rise.application.status")}),t(xt,{tertiary:!0,success:r.success,danger:r.danger,"data-test":"RiseApplicationStatus-Tag",children:r.status})]}),n&&t(bn,{isDesktop:s,"data-test":"RiseApplicationStatus-Helpertext",children:t(M,{colorToken:"--text-infobox-neutral-default","data-test":"RiseApplicationStatus-TSpan",children:r.helperText})})]}):b(nr,{"data-test":"RiseApplicationStatus-StatusWrapper",children:[b(ar,{isOwner:n,isTablet:o,"data-test":"RiseApplicationStatus-StatusBox",children:[t(fn,{font:"footnote-bold",colorToken:"--text-body-neutral-default","data-test":"RiseApplicationStatus-StatusText",children:i("noumena.chamber.rise.application.status")}),t(xt,{tertiary:!0,success:r.success,danger:r.danger,"data-test":"RiseApplicationStatus-Tag",children:r.status})]}),n&&t(bn,{isDesktop:s,"data-test":"RiseApplicationStatus-Helpertext",children:t(M,{colorToken:"--text-infobox-neutral-default","data-test":"RiseApplicationStatus-TSpan",children:r.helperText})})]})},rr=({onClose:e,open:n,applicationId:i,refresh:o,resultJson:a})=>{const{t:s}=J(),{logError:r}=Mt(),{user:d}=fe(),[c,{loading:u}]=Ln({onCompleted:()=>{Ee(Ve.RISE.APPLICATION_SUBMIT,{UUID:d==null?void 0:d._id}),o(),e()},onError:m=>{r(m,"submit-rise-application",!0)}}),p=()=>{i&&c({variables:{_id:i,input:{resultJSON:a,status:Ut.Submitted}}})};return t(pe,{open:n,onClose:e,size:he.S,disableBackdropClick:!0,disableEscapeKeyDown:!0,"data-test":"SubmitRiseApplicationModal-Modal",children:u?t(Ht,{"data-test":"SubmitRiseApplicationModal-WrapperLoading",children:b(Q,{vertical:!0,gap:20,"data-test":"SubmitRiseApplicationModal-Stack",children:[t(qt,{"data-test":"SubmitRiseApplicationModal-WrapperSpinner",children:t(Ke,{"data-test":"SubmitRiseApplicationModal-Spinner"})}),t(M,{font:"body-l",colorToken:"--text-body-neutral-default",textAlign:"center","data-test":"SubmitRiseApplicationModal-TSpan",children:s("noumena.chamber.rise.submitting_application")})]})}):b(W,{children:[t(ve,{"data-test":"SubmitRiseApplicationModal-ModalHeader",children:s("noumena.chamber.rise.submit_my_application")}),t(ge,{align:"center","data-test":"SubmitRiseApplicationModal-ModalBody",children:t(M,{font:"body-l",textAlign:"center",colorToken:"--text-modal-neutral-default","data-test":"SubmitRiseApplicationModal-TSpan",children:s("noumena.chamber.rise.submit_my_application_modal_info")})}),b(we,{flexDirection:"column",gap:16,"data-test":"SubmitRiseApplicationModal-ModalFooter",children:[t($,{primary:!0,align:"center",size:"full",onClick:p,"data-test":"SubmitRiseApplicationModal-Button",children:s("noumena.submit")}),t($,{align:"center",size:"full",onClick:e,"data-test":"SubmitRiseApplicationModal-Button",children:s("noumena.cancel")})]})]})})},Vt=y(Le)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 16px;
  gap: 16px;
`,sr=y.div`
  width: 100%;
  height: 68px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: var(--bg-infobox-brand-primary-default);
  border-left: 4px solid var(--border-infobox-brand-primary-default);
  div {
    width: 262px;
  }
`,lr=y.div`
  width: 100%;
  padding: 0;
  margin: 0;
`,dr=y.div`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 0px 12px 0px;
  border-top: 1px solid var(--bg-separator-neutral-default);
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  cursor: ${({allowCursor:e})=>e?"pointer":"not-allowed"};
`,cr=y.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,ea=y.div`
  width: 100%;
  height: 85vh;
`,ta=y.iframe`
  width: 100%;
  height: 100%;
  border: none;
`,na=({refreshStatus:e,isNoumEditor:n})=>{const[i,o]=l.useState({open:!1,source:""}),{isActive:a}=fe(),{spaceId:s}=Z(),{applicationId:r}=jn(s),d="https://noudev-operations.noumenati.com/login",c=async()=>{const p=`${d}?to=riseapplication&applicationId=${r}&theme=web&hidemenu=true`;o({open:!0,source:p})},u=()=>{o({open:!1,source:""}),e()};return b(W,{children:[t(ke,{testId:"user-rise-apply-button",isNoumEditor:n,disabled:!a,size:n?void 0:"full",primary:!0,onClick:c,"data-test":"RiseApplicationReviewButton-NoumActionButton",children:"Review Application"}),t(pe,{open:i.open,size:he.XXL,enableCloseButton:!0,onClose:u,"data-test":"RiseApplicationReviewButton-Modal",children:t(ea,{"data-test":"RiseApplicationReviewButton-RiseIFrameContainer",children:t(ta,{src:i.source,title:"rise_Application_review","data-test":"RiseApplicationReviewButton-RiseIframe"})})})]})},ur=l.memo(()=>{const{t:e}=J(),{isTablet:n}=_t();return t(er,{isTablet:n,"data-test":"RiseApplicationInfoText-RiseApplicationInformation",children:t("div",{children:t(M,{font:"footnote",colorToken:"--text-infobox-neutral-default","data-test":"RiseApplicationInfoText-TSpan",children:e("noumena.chamber.riseV2.submit_my_application_info")})})})}),ul=l.memo(()=>{const{isOwner:e,isConnected:n}=Z(),{isDesktop:i}=_t(),{t:o}=J(),{addToast:a}=Pe(),{status:s,enableApplicationSubmission:r,canSubmit:d,setCanSubmit:c,isClassDeleted:u,essayQuestionAnswered:p,refresh:m,applicationId:f,resultJson:h}=Ji();if(!s)return null;const v=()=>{if(u){a("error","icon",o("noumena.rise_program.can_user_apply"));return}p?a("error","icon",o("noumena.rise_program.essay_not_answered")):c(!0)};return b(W,{children:[e&&s===ze.Inprogress&&b(tr,{"data-test":"RiseApplicationActions-Wrapper",children:[i&&t(ur,{"data-test":"RiseApplicationActions-RiseApplicationInfoText"}),t($,{size:"full",primary:!0,disabled:!r,onClick:v,"data-test":"RiseApplicationActions-Button",children:o("noumena.chamber.rise.submit_my_application")})]}),n&&t(na,{refreshStatus:m,isNoumEditor:!0,"data-test":"RiseApplicationActions-RiseApplicationReviewButton"}),(n||e&&s!==ze.Inprogress)&&i&&t(ir,{status:s,isOwner:e,"data-test":"RiseApplicationActions-RiseApplicationStatus"}),t(rr,{open:d,onClose:()=>c(!1),refresh:m,applicationId:f,resultJson:h,"data-test":"RiseApplicationActions-SubmitRiseApplicationModal"})]})});var B=(e=>(e.Noums="Noums",e.Connections="Connections",e.Followers="Followers",e.Members="Members",e.ProjectSpaces="Project Spaces",e.OwnedNoums="Owned Noums",e.Events="Events",e))(B||{});const pr=y.div`
  position: relative;
  min-width: 352px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 648px;

  ${Bn} {
    min-width: 100vw;
    padding: 24px;
  }

  button {
    padding: 8px;
  }

  label {
    width: 100%;
    input {
      display: none;
    }
    div {
      margin: 0px -8px;
    }
  }

  @media (max-width: ${q.TABLET}) {
    min-width: 343px;
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }
`,mr=y(ge)`
  ${({customHeight:e})=>e&&"max-height: calc(100vh - 240px)"}
`,hr=y.div`
  min-width: 100%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`;y.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
`;const fr=y.div`
  padding: 12px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &:hover {
    ${({unregistered:e})=>!e&&"background: var(--bg-tablecell-neutral-pressed); cursor: pointer;"}
  }
`,br=y.div`
  background-color: ${({bgColor:e})=>e};
  color: ${({color:e})=>e};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 6px;
  height: 22px;
  ${Nt.footnoteTypography.footnoteBold}
`,gr=y(Q)`
  ${Nt.bodyTypography.bodyMedium};
  width: 100%;
  form {
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    padding-bottom: 16px;
  }
  form div {
    ${({autoWidth:e})=>e?"width: auto;":"flex: 1;"};
  }
  label div {
    text-align: center;
    ${({autoWidth:e})=>e&&"padding: 9px 12px;"};
  }
`,yr=y(Q)`
  flex: 1;
`,Cr=y(M)`
  padding: 12px;
`;y(Q)`
  padding: 0 10px 0 2px;
`;const gn=y(M)``;y.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`;const vr=y.div`
  display: flex;
  justify-content: center;
`,Sr=y($)`
  height: 40px;
  max-height: 40px;
  min-height: 40px;
`,$t=(e,n,i,o)=>{var Je,et,tt,nt,at;const[s,r]=l.useState([]),[d,c]=l.useState([]),[u,p]=l.useState([]),[m,f]=l.useState([]),[h,v]=l.useState([]),[x,{data:g,networkStatus:S,loading:k,error:_,fetchMore:w}]=va({fetchPolicy:"cache-and-network"}),[N,{data:I,loading:O,networkStatus:T,error:A,fetchMore:L}]=Sa({fetchPolicy:"cache-and-network"}),[E,{data:P,networkStatus:R,loading:F,error:K,fetchMore:j}]=xa({fetchPolicy:"cache-and-network"}),[re,{data:U,networkStatus:se,loading:ee,error:V,fetchMore:X}]=ka({fetchPolicy:"cache-and-network"}),[z,{data:D,networkStatus:ne,loading:le,error:oe,fetchMore:Me}]=wa({fetchPolicy:"cache-and-network"});l.useEffect(()=>{var H,_e,Ne,ce,Ce,Be,ot,it,rt,st;(H=g==null?void 0:g.getNoumConnectedMembers)!=null&&H.data&&r((_e=g==null?void 0:g.getNoumConnectedMembers)==null?void 0:_e.data),(Ne=I==null?void 0:I.getSpaceFollowers)!=null&&Ne.data&&c((ce=I==null?void 0:I.getSpaceFollowers)==null?void 0:ce.data),(Ce=P==null?void 0:P.getNoumLinkedNoums)!=null&&Ce.data&&p((Be=P==null?void 0:P.getNoumLinkedNoums)==null?void 0:Be.data),(ot=U==null?void 0:U.getConnectedSpaces)!=null&&ot.data&&v(o?(it=U==null?void 0:U.getConnectedSpaces)==null?void 0:it.data:[]),(rt=D==null?void 0:D.getUserNoums)!=null&&rt.data&&f(o?(st=D==null?void 0:D.getUserNoums)==null?void 0:st.data:[])},[g,I,P,o,U,D]);const de=l.useMemo(()=>{var _e,Ne,ce,Ce,Be;let H={totalCount:0,networkStatus:Un.ready,loading:!1};switch(n){case B.Connections:H={...H,totalCount:(_e=g==null?void 0:g.getNoumConnectedMembers)==null?void 0:_e.count,networkStatus:S,loading:k};break;case B.Noums:H={...H,totalCount:(Ne=P==null?void 0:P.getNoumLinkedNoums)==null?void 0:Ne.count,networkStatus:R,loading:F};break;case B.ProjectSpaces:H={...H,totalCount:(ce=U==null?void 0:U.getConnectedSpaces)==null?void 0:ce.count,networkStatus:se,loading:ee};break;case B.OwnedNoums:H={...H,totalCount:(Ce=D==null?void 0:D.getUserNoums)==null?void 0:Ce.count,networkStatus:ne,loading:le};break;case B.Followers:default:H={...H,totalCount:(Be=I==null?void 0:I.getSpaceFollowers)==null?void 0:Be.count,networkStatus:T,loading:O};break}return H},[(Je=U==null?void 0:U.getConnectedSpaces)==null?void 0:Je.count,se,(et=g==null?void 0:g.getNoumConnectedMembers)==null?void 0:et.count,S,(tt=I==null?void 0:I.getSpaceFollowers)==null?void 0:tt.count,T,(nt=P==null?void 0:P.getNoumLinkedNoums)==null?void 0:nt.count,R,ee,k,O,F,le,n,(at=D==null?void 0:D.getUserNoums)==null?void 0:at.count,ne]),gt=l.useMemo(()=>de==null?void 0:de.networkStatus,[de==null?void 0:de.networkStatus]),He=l.useMemo(()=>(de==null?void 0:de.totalCount)||0,[de==null?void 0:de.totalCount]),yt=l.useMemo(()=>de.loading,[de.loading]),ye=l.useMemo(()=>(n===B.Noums?u:n===B.Connections?s:n===B.ProjectSpaces?h:n===B.OwnedNoums?m:d)||[],[n,u,s,h,m,d]),Ct=l.useCallback(async()=>{var _e,Ne,ce,Ce,Be,ot,it,rt,st,Yt;if(ye&&He<=(ye==null?void 0:ye.length))return;let H=null;switch(n){case B.Connections:H=await w({variables:{spaceId:e,limit:10,offset:s==null?void 0:s.length,spaceType:ue.Home,sort:{column:"approvedAt",operator:Tt.Desc}}}),r([...ye,...((Ne=(_e=H.data)==null?void 0:_e.getNoumConnectedMembers)==null?void 0:Ne.data)||[]]);break;case B.Followers:H=await L({variables:{spaceId:e,limit:10,offset:d==null?void 0:d.length}}),c([...ye,...((Ce=(ce=H.data)==null?void 0:ce.getSpaceFollowers)==null?void 0:Ce.data)||[]]);break;case B.ProjectSpaces:H=await X({variables:{uid:o,limit:10,offset:h==null?void 0:h.length,filter:{type:ue.Project}}}),v([...ye,...((ot=(Be=H.data)==null?void 0:Be.getConnectedSpaces)==null?void 0:ot.data)||[]]);break;case B.OwnedNoums:H=await Me({variables:{uid:o,limit:10,offset:m==null?void 0:m.length}}),f([...ye,...((rt=(it=H.data)==null?void 0:it.getUserNoums)==null?void 0:rt.data)||[]]);break;case B.Noums:default:H=await j({variables:{spaceId:i,limit:10,offset:u==null?void 0:u.length}}),p([...ye,...((Yt=(st=H.data)==null?void 0:st.getNoumLinkedNoums)==null?void 0:Yt.data)||[]]);break}},[ye,He,n,w,e,s==null?void 0:s.length,L,d==null?void 0:d.length,X,o,h==null?void 0:h.length,Me,m==null?void 0:m.length,j,i,u==null?void 0:u.length]);return l.useEffect(()=>{if(e||o)switch(n){case B.Connections:e&&x({variables:{noumId:e,limit:10,offset:0,sort:{column:"approvedAt",operator:Tt.Desc}}});break;case B.Followers:e&&e!==""&&(x({variables:{noumId:e,limit:100,offset:0}}),N({variables:{spaceId:e,limit:10,offset:0}}));break;case B.Noums:e&&E({variables:{noumId:e,limit:10,offset:0}});break;case B.ProjectSpaces:o&&re({variables:{uid:o,limit:10,offset:0,filter:{type:ue.Project},sort:{column:"name",operator:Tt.Asc}}});break;case B.OwnedNoums:o&&z({variables:{uid:o,limit:10,offset:0}});break}},[n,e,x,N,E,i,o,re,z]),{currentData:ye,totalCount:He,loading:yt,networkStatus:gt,error:_||A||K||V||oe,fetchMore:Ct}},xr=l.forwardRef(({item:e,selectedTab:n,isOwner:i,isArchived:o,gap:a,closeModal:s,setInvitedNoumId:r,showInviteModal:d},c)=>{var v,x,g,S,k,_;const{isUnregistered:u}=fe(),p=l.useCallback(()=>{var w;u||((w=e==null?void 0:e.uid)==null?void 0:w.userStatus)==="UNREGISTERED"||(s(),window.open(`/noum/${e==null?void 0:e._id}`,"_self"))},[s,e,u]),m=l.useCallback(w=>{const{Approved:N,Invited:I,Requested:O}=Y;return![N,I,O].includes(w)},[]),f=l.useMemo(()=>{var w;return i&&!o&&m(((w=e==null?void 0:e.connectionWithNoum)==null?void 0:w.status)||void 0)},[i,o,m,(v=e==null?void 0:e.connectionWithNoum)==null?void 0:v.status]),h=l.useCallback(w=>{w.preventDefault(),w.stopPropagation(),r((e==null?void 0:e._id)||""),d(),s()},[e,r,s,d]);return b(W,{children:[b(fr,{"data-testid":"link_container",ref:c,onClick:p,unregistered:u,"data-test":"ConnectionDetailsContent-ContentContainer",children:[b(Q,{gap:a,align:"center","data-test":"ConnectionDetailsContent-Stack",children:[t(De,{url:n===B.Noums||n===B.ProjectSpaces||n===B.OwnedNoums?(e==null?void 0:e.profileImage)||Ma:mt.getProfilePicture(e==null?void 0:e.uid)||"","data-test":"ConnectionDetailsContent-Avatar"}),b(yr,{vertical:!0,"data-test":"ConnectionDetailsContent-UserDetailStack",children:[t(M,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"ConnectionDetailsContent-TSpan",children:n===B.Noums||n===B.ProjectSpaces||n===B.OwnedNoums?e==null?void 0:e.name:ht((x=e==null?void 0:e.uid)==null?void 0:x.firstName,(g=e==null?void 0:e.uid)==null?void 0:g.middleName,(S=e==null?void 0:e.uid)==null?void 0:S.lastName)}),t(M,{font:"footnote",colorToken:"--text-tablecell-header-neutral-default","data-test":"ConnectionDetailsContent-TSpan",children:t("span",{children:((k=e==null?void 0:e.uid)==null?void 0:k.title)||""})}),n===B.Connections&&b(gn,{font:"footnote",colorToken:"--text-timestamp-neutral-default","data-test":"ConnectionDetailsContent-TimeStampSpan",children:[C("noumena.chamber.link.connection_date"),$e(new Date((e==null?void 0:e.approvedAt)||new Date),"dd MMM yyyy")]}),n===B.Followers&&b(gn,{font:"footnote",colorToken:"--text-timestamp-neutral-default","data-test":"ConnectionDetailsContent-TimeStampSpan",children:[C("noumena.chamber.link.following_date"),$e(new Date((e==null?void 0:e.requestedAt)||new Date),"dd MMM yyyy")]})]})]}),((_=e==null?void 0:e.category)==null?void 0:_.name)&&t(br,{bgColor:kt[e.category.name.toLowerCase()].bgColor,color:kt[e.category.name.toLowerCase()].color,"data-test":"ConnectionDetailsContent-LinkedTagLabel",children:zn(e.category.name)}),n===B.Followers&&t(Sr,{secondary:!0,size:"large",disabled:!f,onClick:w=>h(w),"data-test":"ConnectionDetailsContent-InviteButton",children:C("noumena.chamber.invite_follower")})]}),t(hr,{"data-test":"ConnectionDetailsContent-LinkUnderline"})]})}),kr=({isHomeNoumConnectionDetail:e,connectedMembersCount:n,linkedNoumsCount:i,isConnected:o,isOwner:a,isMasterNoum:s,isSecretNoum:r,followersCount:d,connectedProjectsCount:c,defaultTab:u,userNoumsCount:p})=>{const m=[];return e?(m.push({name:B.Connections,text:C("noumena.noum.home.connection.members",{membersCount:n}),labelSize:"small"},{name:B.ProjectSpaces,text:C("noumena.noum.home.connection.project_spaces",{projectsCount:c}),labelSize:"small"}),m):(i&&m.push({name:B.Noums,text:C("noumena.chamber.link.modal.Noums",{noumsCount:i-1}),labelSize:"medium"}),u===B.OwnedNoums&&s?[{name:B.OwnedNoums,text:C("noumena.home_noum.owned_noums.modal.title",{count:p}),labelSize:"medium"}]:((o||a)&&m.push({name:B.Connections,text:C("noumena.chamber.link.modal.Connections",{connectionsCount:n}),labelSize:"medium"}),!s&&a&&!r&&m.push({name:B.Followers,text:C("noumena.chamber.link.modal.Followers",{followersCount:d}),labelSize:"medium"}),m))},wr=l.memo(({isOpen:e,defaultTab:n,handleClose:i,followersCount:o,linkedNoumsCount:a,setInvitedNoumId:s,showInviteModal:r,connectedProjectsCount:d=0,userNoumsCount:c=0})=>{var le;const{width:u}=We(),p=u<Fe.LAPTOP,{t:m}=J(),[f,h]=l.useState("0"),[v,x]=l.useState(n||""),{isMasterNoum:g,isOwner:S,isArchived:k,isConnected:_,link:w,connectedMembers:N,connectedMembersCount:I,spaceId:O,projectType:T,space:A}=Z(),L=_a(),E=T===Te.Secret,P=l.useMemo(()=>L===Na.MOBILE,[L]),R=l.useMemo(()=>S&&!g&&!E,[g,S,E]),F=l.useMemo(()=>_||g||E,[_,g,E]),K=l.useMemo(()=>g&&n!==B.OwnedNoums,[n,g]),{currentData:j,loading:re,totalCount:U,networkStatus:se,fetchMore:ee}=$t(O||"",v,w==null?void 0:w._id,g?(le=A==null?void 0:A.uid)==null?void 0:le._id:null),V=l.useMemo(()=>kr({isHomeNoumConnectionDetail:K,connectedMembersCount:I,linkedNoumsCount:a,isConnected:_,isOwner:S,isMasterNoum:g,followersCount:o,isSecretNoum:E,connectedProjectsCount:d,defaultTab:n,userNoumsCount:c}),[K,I,a,_,S,g,o,E,d,n,c]),{refetchConnectedMembers:X}=Z();l.useEffect(()=>{e===!0&&X()},[e,X]);const z=l.useMemo(()=>{var oe;return V.length>1?a?m("noumena.noum_link.link_details"):R?m("noumena.noum.connections_and_followers"):F?K?m("noumena.noum.home.connections",{connectionsCount:I+d}):m("noumena.noum.connections"):m("noumena.noum.followers"):((oe=V[0])==null?void 0:oe.text)||""},[V,a,m,R,F,K,I,d]),D=l.useCallback(oe=>{oe&&(h(oe),x(V[parseInt(oe,10)].name))},[V]),ne=l.useMemo(()=>re?null:j&&j.length>0?t(W,{children:j.map(oe=>t(xr,{item:oe,selectedTab:v,connectedMembers:N,isOwner:S,isArchived:k,closeModal:i,setInvitedNoumId:s,showInviteModal:r,gap:K?16:12,"data-test":"ConnectionDetailsModal-tabComponent-ConnectionDetailsContent"},oe==null?void 0:oe._id))}):t(vr,{"data-test":"ConnectionDetailsModal-tabComponent-NoResultsContainer",children:t(Cr,{font:"body-l",colorToken:"--text-card-neutral-highlighted","data-test":"ConnectionDetailsModal-tabComponent-TextOnlySpan",children:m("noumena.chamber.link.no_value",{value:v})})}),[m,re,j,v,N,S,k,K,i,s,r]);return l.useEffect(()=>{if(n){const oe=V.findIndex(Me=>Me.name===n);oe!==-1&&(h(`${oe}`),x(n))}else x("")},[n,V]),t(pe,{testId:"testRequestsAndInvites",open:e,onClose:i,enableCloseButton:!0,size:he.L,isFullScreen:P,closeButtonStyles:{enforceLeft:p},disableBackdropClick:!0,"data-test":"ConnectionDetailsModal-Modal",children:b(pr,{"data-testid":"connection_details_container","data-test":"ConnectionDetailsModal-Container",children:[t(ve,{"data-test":"ConnectionDetailsModal-ModalHeader",children:z}),V.length>1&&t(gr,{autoWidth:K,"data-test":"ConnectionDetailsModal-TabSectionHead",children:t(zt,{onChange:D,inputList:V,selectedId:f,mode:"isBackground",isWithoutImage:!0,fontSize:"--font-button-small-size",fullWidth:!0,textFont:"--font-body-medium-regular-font","data-test":"ConnectionDetailsModal-BasicChipsTabsForm"})}),t(mr,{style:{padding:0},customHeight:V.length<=1,"data-test":"ConnectionDetailsModal-CustomModalBody",children:t(Wt,{onFetchMore:ee,status:En({networkStatus:se,totalCount:U,currentCount:(j==null?void 0:j.length)||0}),disableFetchMoreWhileLoading:!0,isSpinnerRelative:!0,paddingRight:j&&j.length>0?"12px":"0",style:{overflowX:"hidden"},width:"100%","data-test":"ConnectionDetailsModal-Infinite",children:ne})})]})})}),Mr=({isOpen:e,invitedNoumId:n,ownNoumId:i,closeInviteModal:o})=>{const{t:a}=J(),r=We().width<Fe.TABLET,{sendInvite:d}=jo(),[c,u]=l.useState(""),p=l.useCallback(()=>{u(""),o()},[o]),m=l.useCallback(h=>{u(h.target.value)},[]),f=l.useCallback(()=>{i&&n&&d(i,n,c),u(""),o()},[i,n,c,o,d]);return b(pe,{open:e,size:r?he.S:he.M,onClose:p,enableCloseButton:!r,disableBackdropClick:!0,"data-test":"ConnectionInviteModal-Modal",children:[t(ve,{"data-test":"ConnectionInviteModal-ModalHeader",children:a("noumena.chamber.invite_modal.title")}),b(ge,{"data-test":"ConnectionInviteModal-ModalBody",children:[t(M,{font:"body-l",colorToken:"--text-tablecell-header-neutral-default","data-test":"ConnectionInviteModal-TSpan",children:a("noumena.chamber.invite_modal.description")}),t(ae,{height:16,"data-test":"ConnectionInviteModal-Spacer"}),t(Aa,{"data-testid":"message-text-area",label:a("noumena.chamber.invite_modal.message_hint"),value:c,onChange:m,maxLength:100,autoResize:!0,resize:!1,maxLengthPosition:"right","data-test":"ConnectionInviteModal-TextArea"})]}),b(we,{flexDirection:r?"column":"row-reverse","data-test":"ConnectionInviteModal-ModalFooter",children:[t($,{"data-testid":"send-invite-btn",size:"full",primary:!0,disabled:c.length>100,onClick:f,"data-test":"ConnectionInviteModal-Button",children:a("noumena.chamber.invite_follower")}),t(ae,{width:16,height:16,"data-test":"ConnectionInviteModal-Spacer"}),t($,{"data-testid":"cancel-invite-btn",size:"full",tertiary:!0,onClick:p,"data-test":"ConnectionInviteModal-Button",children:a("noumena.cancel")})]})]})};var It=(e=>(e.connections="connections",e))(It||{}),G=(e=>(e.Statistics="Statistics",e.Connected="Connected",e.Disconnected="Disconnected",e))(G||{});const _r=y.div`
  position: relative;
  min-width: 352px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 572px;

  ${Bn} {
    min-width: 100vw;
    padding: 24px;
  }

  button {
    padding: 8px;
  }

  label {
    width: 100%;
    input {
      display: none;
    }
    div {
      margin: 0px -8px;
    }
  }

  @media (max-width: ${q.TABLET}) {
    min-width: 343px;
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
  }
`,Nr=y(Q)`
  ${Nt.bodyTypography.bodyMedium};
  width: 100%;
  form {
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    padding-bottom: 16px;
  }
  form div {
    ${({autoWidth:e})=>e?"width: auto;":"flex: 1;"};
  }
  label div {
    text-align: center;
    ${({autoWidth:e})=>e&&"padding: 9px 12px;"};
  }
`,Ar=y(M)`
  padding: 12px;
`,Ir=y.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${q.MOBILE_MAX}) {
    flex-direction: column;
  }
`,Tr=y.div``,aa=y.div`
  width: 250px;
`,Pr=({dashboardType:e})=>{const n=[{name:G.Statistics,text:C("noumena.noum.dashboard.tab.statistics"),labelSize:"small"}];switch(e){case It.connections:n.push({name:G.Connected,text:C("noumena.noum.dashboard.tab.connected"),labelSize:"small"},{name:G.Disconnected,text:C("noumena.noum.dashboard.tab.disconnected"),labelSize:"small"});break}return n},Rr=y.div`
  font-size: var(--font-systeminfo-small-size);
  padding: 10px 16px;
  border-radius: 8px;

  & * {
    color: var(--text-tooltip-neutral-alt-default);
  }
`,Lr=({active:e,payload:n})=>e&&n&&n.length?b(Rr,{"data-test":"CustomTooltip-CustomToolTipWrapper",children:[t(M,{font:"footnote-bold","data-test":"CustomTooltip-TSpan",children:n[0].payload.date}),n.map(i=>{var o;return b(Q,{align:"center","data-test":"CustomTooltip-Stack",children:[t(ie,{name:"radio_btn_m",size:8,color:(o=i==null?void 0:i.color)==null?void 0:o.replace(/^var\((.*)\)$/,"$1"),style:{border:"2px solid var(--border-point-chart-hover)",borderRadius:"8px",marginRight:"8px"},"data-test":"CustomTooltip-Icon"}),b(M,{colorToken:"--text-modal-neutral-default",font:"footnote","data-test":"CustomTooltip-TSpan",children:[i.name,": ",i!=null&&i.dataKey?i.payload[i.dataKey]:""]})]})})]}):null,Br=(e,n,i,o,a)=>{const s={noumId:e,from:o,to:a,granularity:i},{data:r,loading:d,error:c}=Ia({variables:s,fetchPolicy:"cache-and-network"});return{statistics:r==null?void 0:r.getNoumConnectionsKPIs,loading:d,error:c}};var wn,Mn,_n,Nn,An,In;const Er=[{label:C("noumena.periodicity.daily"),key:(wn=Ae)==null?void 0:wn.Daily,type:"value",value:(Mn=Ae)==null?void 0:Mn.Daily},{label:C("noumena.periodicity.monthly"),key:(_n=Ae)==null?void 0:_n.Monthly,type:"value",value:(Nn=Ae)==null?void 0:Nn.Monthly},{label:C("noumena.periodicity.yearly"),key:(An=Ae)==null?void 0:An.Yearly,type:"value",value:(In=Ae)==null?void 0:In.Yearly}],Or=[{label:C("noumena.date_range.lifetime"),key:"lifetime",type:"value",value:"lifetime"},{label:C("noumena.date_range.today"),key:"today",type:"value",value:"today"},{label:C("noumena.date_range.yesterday"),key:"yesterday",type:"value",value:"yesterday",disabled:!0},{label:C("noumena.date_range.this_week"),key:"this_week",type:"value",value:"this_week"},{label:C("noumena.date_range.last_week"),key:"last_week",type:"value",value:"last_week",disabled:!0},{label:C("noumena.date_range.custom"),key:"custom",type:"value",value:"custom",disabled:!0}],Dr=y.div`
  display: flex;
  flex-direction: row;
  height: 54px;
  justify-content: space-between;
  width: 100%;
  @media (max-width: ${q.MOBILE_MAX}) {
    flex-direction: column;
    height: auto;
    gap: 24px;
  }
`,$r=y.div`
  display: flex;
  flex-direction: row;
`,Wr=y.div`
  display: flex;
  flex-direction: column;
  margin: 0 6px;
  padding-right: 12px;
  border-right: 1px solid var(--bg-separator-neutral-default);
  &:last-child {
    border: none;
  }
`,Ur=y.div`
  display: flex;
  align-items: center;
  margin: 0 6px;
  gap: 16px;
`,zr=y.div`
  width: 128px;
`,Fr=y.div`
  padding: 12px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &:hover {
    ${({unregistered:e})=>!e&&"background: var(--bg-tablecell-neutral-pressed); cursor: pointer;"}
  }
`,Hr=y(Q)`
  flex: 1;
`,qr=y.div`
  background-color: ${({bgColor:e})=>e};
  color: ${({color:e})=>e};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 6px;
  height: 22px;
  ${Nt.footnoteTypography.footnoteBold}
`,jr=y.div`
  min-width: 100%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`,Vr=y.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 296px;
  width: 100%;
  @media (max-width: ${q.TABLET_L}) {
    height: calc(100vh - 452px);
  }
`,Yr=({noumId:e,dashboardType:n,range:i})=>{var v,x;const o=l.useMemo(()=>{const g=$n((i==null?void 0:i.to)||new Date,(i==null?void 0:i.from)||new Date);return Er.filter(S=>S.value===Ae.Daily&&g>0||S.value===Ae.Monthly&&g>=7||S.value===Ae.Yearly&&g>=365)},[i]),[a,s]=l.useState(!1),[r,d]=l.useState(o.length>1?o[1]:o.length>0?o[0]:void 0),c=[{keyName:"connected",colorToken:"--border-line-chart1-default",displayName:C("noumena.noum.dashboard.metrics.connected")},{keyName:"disconnected",colorToken:"--border-line-chart2-default",displayName:C("noumena.noum.dashboard.metrics.disconnected")},{keyName:"currentConnections",colorToken:"--border-line-chart3-default",displayName:C("noumena.noum.dashboard.metrics.currentConnections")}],u=l.useCallback(g=>{d(g)},[]),{statistics:p}=Br(e,n,r==null?void 0:r.value,(v=i==null?void 0:i.from)==null?void 0:v.toISOString(),(x=i==null?void 0:i.to)==null?void 0:x.toISOString()),m=(g,S)=>{const k=S===Ae.Yearly?"yyyy":S===Ae.Monthly?"MMM":"MMM dd";return $e(new Date(g),k)},f=g=>t("span",{style:{color:"var(--text-card-neutral-default)"},"data-test":"StatisticsTab-renderColorfulLegendText",children:g}),h=l.useMemo(()=>{var g;return(g=p==null?void 0:p.series)==null?void 0:g.map(S=>({date:m(S==null?void 0:S.date,r==null?void 0:r.value),...S==null?void 0:S.values}))},[r==null?void 0:r.value,p==null?void 0:p.series]);return l.useEffect(()=>{d(o[0])},[o]),b(W,{children:[t(ae,{height:8,"data-test":"StatisticsTab-Spacer"}),b(Dr,{"data-test":"StatisticsTab-ChartTopContainer",children:[t($r,{"data-test":"StatisticsTab-KPIContainer",children:c.map(({keyName:g})=>{var S;return b(Wr,{"data-test":`StatisticsTab-KPIWrapper-${g}`,children:[t(M,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"StatisticsTab-TSpan",children:C(`noumena.noum.dashboard.metrics.${g}`)}),t(M,{font:"body-l-bold",colorToken:"--text-card-neutral-highlighted",singleLine:!0,"data-test":"StatisticsTab-TSpan",children:(S=p==null?void 0:p.kpi)==null?void 0:S[g]})]},g)})}),o.length>0&&b(Ur,{"data-test":"StatisticsTab-PeriodicityContainer",children:[t(M,{font:"footnote",colorToken:"--text-card-neutral-default","data-test":"StatisticsTab-TSpan",children:C("noumena.noum.dashboard.label.filter_by_periodicity")}),t(zr,{"data-test":"StatisticsTab-DropdownWrapper",children:t(On,{containerWidth:"128px",isOpen:a,options:o,onOpen:()=>s(!0),onClose:()=>s(!1),closeOnSelect:!0,onSelectOption:u,hideIcons:!0,hideLeftIconPlace:!0,"data-test":"StatisticsTab-Dropdown",children:({inputProps:g,inputRef:S,toggle:k})=>t(Dn,{readOnly:!0,ref:S,...g,value:r?String(r==null?void 0:r.label):"",rightIcon:t(ie,{name:"chevron_down_m",color:"--icon-input-neutral-default",size:16,onClick:k,"data-test":"StatisticsTab-Icon"}),"data-test":"StatisticsTab-TextField"})})})]})]}),t(Q,{style:{height:"303px"},fullWidth:!0,"data-test":"StatisticsTab-Stack",children:t(Bo,{width:"100%",height:"100%","data-test":"StatisticsTab-ResponsiveContainer",children:b(si,{width:500,height:281,data:h,margin:{top:30,right:4},"data-test":"StatisticsTab-LineChart",children:[t(Eo,{"data-test":"StatisticsTab-CartesianGrid"}),t(Hn,{dataKey:"date",fontSize:"var(--font-systeminfo-small-size)",padding:{left:30,right:30},"data-test":"StatisticsTab-XAxis"}),t(qn,{fontSize:"var(--font-footnote-regular-size)","data-test":"StatisticsTab-YAxis"}),t(Oo,{content:t(Lr,{"data-test":"StatisticsTab-CustomTooltip"}),wrapperStyle:{borderRadius:"8px",background:"var(--bg-tooltip-neutral-default)",opacity:.95},"data-test":"StatisticsTab-Tooltip"}),t(Do,{formatter:f,align:"left",iconType:"plainline",wrapperStyle:{fontSize:"var(--font-body-medium-size)"},"data-test":"StatisticsTab-Legend"}),c.map(g=>t(bt,{dataKey:g.keyName,name:g.displayName?g.displayName:g.keyName,stroke:`var(${g.colorToken})`,strokeWidth:2,color:`var(${g.colorToken})`,"data-test":"StatisticsTab-Line"},g.keyName))]})})})]})},Gr=(e,n,i)=>{var _;const o=l.useMemo(()=>n===G.Connected?tn.Connected:n===G.Disconnected?tn.Disconnected:null,[n]),a=10,[s,r]=l.useState([]),[d,{data:c,networkStatus:u,loading:p,error:m,fetchMore:f}]=Ta({fetchPolicy:"cache-and-network"});l.useEffect(()=>{var w,N;(w=c==null?void 0:c.getNoumConnectionsWithinTimeframe)!=null&&w.data&&r((N=c==null?void 0:c.getNoumConnectionsWithinTimeframe)==null?void 0:N.data)},[c]);const h=l.useMemo(()=>{var N;let w={totalCount:0,networkStatus:Un.ready,loading:!1};switch(n){case G.Connected:case G.Disconnected:default:w={...w,totalCount:(N=c==null?void 0:c.getNoumConnectionsWithinTimeframe)==null?void 0:N.count,networkStatus:u,loading:p};break}return w},[(_=c==null?void 0:c.getNoumConnectionsWithinTimeframe)==null?void 0:_.count,u,p,n]),v=l.useMemo(()=>h==null?void 0:h.networkStatus,[h==null?void 0:h.networkStatus]),x=l.useMemo(()=>(h==null?void 0:h.totalCount)||0,[h==null?void 0:h.totalCount]),g=l.useMemo(()=>h.loading,[h.loading]),S=l.useMemo(()=>n===G.Connected||n===G.Disconnected?s:[],[n,s]),k=l.useCallback(async()=>{var N,I,O,T;if(S&&x<=(S==null?void 0:S.length))return;let w=null;switch(n){case G.Connected:case G.Disconnected:default:w=await f({variables:{spaceId:e,limit:a,offset:s==null?void 0:s.length,from:(N=i.from)==null?void 0:N.toISOString(),to:(I=i.to)==null?void 0:I.toISOString(),connectionType:o}}),r([...S,...((T=(O=w.data)==null?void 0:O.getNoumConnectionsWithinTimeframe)==null?void 0:T.data)||[]]);break}},[S,x,n,f,e,s==null?void 0:s.length,i.from,i.to,o]);return l.useEffect(()=>{var w,N;if(e)switch(n){case G.Connected:case G.Disconnected:d({variables:{noumId:e,from:(w=i.from)==null?void 0:w.toISOString(),to:(N=i.to)==null?void 0:N.toISOString(),limit:a,offset:0,connectionType:o}});break}},[n,e,d,i.from,i.to,o]),{currentData:S,totalCount:x,loading:g,networkStatus:v,error:m,fetchMore:k}},Qr=l.forwardRef(({item:e,gap:n,selectedTab:i},o)=>{var r,d,c,u,p;const{isUnregistered:a}=fe(),s=l.useCallback(()=>{var m;a||((m=e==null?void 0:e.uid)==null?void 0:m.userStatus)==="UNREGISTERED"||window.open(`/noum/${e==null?void 0:e._id}`,"_self")},[e,a]);return b(W,{children:[b(Fr,{"data-testid":"list_item_container",ref:o,onClick:s,unregistered:a,"data-test":"ListItemContent-ContentContainer",children:[b(Q,{gap:n,align:"center","data-test":"ListItemContent-Stack",children:[t(De,{url:mt.getProfilePicture(e==null?void 0:e.uid)||"","data-test":"ListItemContent-Avatar"}),b(Hr,{vertical:!0,"data-test":"ListItemContent-UserDetailStack",children:[t(M,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"ListItemContent-TSpan",children:ht((r=e==null?void 0:e.uid)==null?void 0:r.firstName,(d=e==null?void 0:e.uid)==null?void 0:d.middleName,(c=e==null?void 0:e.uid)==null?void 0:c.lastName)}),t(M,{font:"footnote",colorToken:"--text-tablecell-header-neutral-default","data-test":"ListItemContent-TSpan",children:t("span",{children:((u=e==null?void 0:e.uid)==null?void 0:u.title)||""})}),(i===G.Connected||i===G.Disconnected)&&b(M,{font:"footnote",colorToken:"--text-timestamp-neutral-default","data-test":"ListItemContent-TSpan",children:[i===G.Connected?C("noumena.noum.dashboard.connection_date"):C("noumena.noum.dashboard.disconnection_date"),$e(new Date((e==null?void 0:e.approvedAt)||new Date),"dd MMM yyyy")]})]})]}),((p=e==null?void 0:e.category)==null?void 0:p.name)&&t(qr,{bgColor:kt[e.category.name.toLowerCase()].bgColor,color:kt[e.category.name.toLowerCase()].color,"data-test":"ListItemContent-LinkedTagLabel",children:zn(e.category.name)})]}),t(jr,{"data-test":"ListItemContent-LinkUnderline"})]})}),Kr=({selectedTab:e,dateRange:n,noumId:i})=>{const{currentData:o,loading:a,totalCount:s,networkStatus:r,fetchMore:d}=Gr(i,e,n),c=l.useMemo(()=>a?null:o&&o.length>0?t(W,{children:o.map(u=>t(Qr,{item:u,selectedTab:e,gap:16,"data-test":"ListsTab-listsComponent-ListItemContent"},u==null?void 0:u._id))}):t(Q,{fullWidth:!0,justify:"center","data-test":"ListsTab-listsComponent-Stack",children:t(Ar,{font:"body-l",colorToken:"--text-card-neutral-highlighted","data-test":"ListsTab-listsComponent-TextOnlySpan",children:C("noumena.chamber.link.no_value",{value:e})})}),[a,o,e]);return a?t(Vr,{"data-test":"ListsTab-SpinnerContainer",children:t(Ke,{"data-test":"ListsTab-Spinner"})}):t(Wt,{onFetchMore:d,status:En({networkStatus:r,totalCount:s,currentCount:(o==null?void 0:o.length)||0}),disableFetchMoreWhileLoading:!0,isSpinnerRelative:!0,paddingRight:o&&o.length>0?"12px":"0",style:{overflowX:"hidden"},width:"100%","data-test":"ListsTab-Infinite",children:c})},Xr=({dateFormat:e="MM/dd/yyyy",disabled:n=!1,error:i=!1,fullSize:o,helperText:a="",layout:s="dropdown",maxDate:r,minDate:d,minWidth:c,placement:u="bottom-end",testId:p,value:m,onConfirm:f=()=>{},popperReference:h,isOpen:v,setIsOpen:x,noBorder:g,isAlwaysFocus:S,inputSize:k,leftIcon:_,rightIcon:w,fromLabel:N,toLabel:I})=>{const{t:O}=J(),T=l.useRef(null),[A,L]=l.useState(null),{styles:{popper:E},attributes:{popper:P}}=Ka(h,A,{placement:u,modifiers:[{name:"arrow",options:{}},{name:"offset",options:{offset:[0,8]}}]}),[R,F]=l.useState(m),[K,j]=l.useState(""),[re,U]=l.useState(""),[se,ee]=l.useState(!0);l.useEffect(()=>{F(m)},[m]),Pa(T,!v,()=>x(!1));const V=l.useMemo(()=>typeof n=="boolean"&&n===!0,[n]),X=l.useMemo(()=>m?"main":"placeholder",[m]);l.useEffect(()=>{if(R){const D=R!=null&&R.from?$e(R==null?void 0:R.from,e):"",ne=R!=null&&R.to?$e(R==null?void 0:R.to,e):"";U(ne),j(D)}},[R,e]);const z=(D,ne)=>{const{value:le}=D.target,{isValidDate:oe,isValidMonth:Me,isValidYear:de}=zo(le);ne==="from"?j(le):U(le),Me&&oe&&de?(F({...R,[ne]:new Date(le)}),ee(!0)):ee(!1)};return b(W,{children:[t(Ra,{ref:T,"data-testid":p||"date-picker",color:X,fullSize:o,minWidth:c,error:i,disabled:V,"data-test":"CustomDateRangePicker-DatePickerWrapper",children:v&&t(La,{"data-testid":"date-picker-calendar-testid",ref:L,style:E,...P,"data-test":"CustomDateRangePicker-PickerPopupWrapper",children:t(Xa,{"data-test":"CustomDateRangePicker-AnimatePresence",children:b(Za.div,{onClick:D=>D.stopPropagation(),style:{height:"unset"},children:[t($o,{font:"body-m-bold",textAlign:"left",colorToken:"--text-modal-header-neutral-default","data-test":"CustomDateRangePicker-StyledTimeFrameTitle",children:O("noumena.noum.dashboard.customRange.timeframe.title")}),b(Wo,{"data-test":"CustomDateRangePicker-DateFieldsContainer",children:[t(sn,{noBorder:g,isAlwaysFocus:S,inputSize:k,leftIcon:!!_,rightIcon:!!w,onChangeHandler:D=>{z(D,"from")},value:K||"",dateFormat:e,label:N,"data-test":"CustomDateRangePicker-CustomDateInputMaskField"}),t(sn,{noBorder:g,isAlwaysFocus:S,inputSize:k,leftIcon:!!_,rightIcon:!!w,onChangeHandler:D=>{z(D,"to")},label:I,value:re||"",dateFormat:e,"data-test":"CustomDateRangePicker-CustomDateInputMaskField"})]}),t(Ja,{mode:"range",selected:R,onSelect:F,fromDate:d,toDate:r,classNames:Ba,styles:Ea,captionLayout:s,min:2,footer:b(Uo,{"data-test":"CustomDateRangePicker-ButtonWrapper",children:[t($,{size:"small",onClick:()=>x(!1),tertiary:!0,"data-test":"CustomDateRangePicker-Button",children:O("noumena.cancel")}),t(ae,{width:8,"data-test":"CustomDateRangePicker-Spacer"}),t($,{size:"small",onClick:()=>{x(!1),f(R),F(m)},primary:!0,disabled:!se,"data-test":"CustomDateRangePicker-Button",children:O("noumena.confirm")})]}),"data-test":"CustomDateRangePicker-DayPicker"})]})})})}),!!a&&t(Oa,{error:i,disabled:V,"data-test":"CustomDateRangePicker-HelperText",children:a})]})},yn={from:new Date,to:eo(new Date,4)},Zr=({defaultSelected:e,onDateChange:n,referenceElement:i,dateRangeOptions:o,selectedTab:a})=>{const[s,r]=l.useState(!1),[d,c]=l.useState(!1),[u,p]=l.useState(e),[m,f]=l.useState(o[0]);l.useEffect(()=>{p(e)},[e]);const[h,v]=l.useState(yn),x=l.useCallback(S=>{if(f(S),S.value==="custom"){c(!0);return}p(S.value==="custom"||S.value==="lifetime"?e:Da(S.value))},[e]);l.useEffect(()=>{n(u)},[n,u]),l.useEffect(()=>{a===G.Connected&&f(o[0])},[o,a]),l.useEffect(()=>{d&&v(yn)},[d]);const g=l.useCallback(()=>{const S="MM/dd/yyyy";return a===G.Connected&&(m==null?void 0:m.value)==="lifetime"?C("noumena.date_range.lifetime"):u!=null&&u.from&&(u!=null&&u.to)?`${$e(u.from,S)} - ${$e(u.to,S)}`:""},[u.from,u.to,m==null?void 0:m.value,a]);return b(W,{children:[t(aa,{"data-test":"DateRangePicker-DateRangeContainer",children:t(On,{containerWidth:"250px",options:o,closeOnSelect:!0,isOpen:s,onOpen:()=>r(!0),onClose:()=>r(!1),onSelectOption:x,hideIcons:!0,hideLeftIconPlace:!0,placement:"bottom-end","data-test":"DateRangePicker-Dropdown",children:({inputProps:S,inputRef:k,toggle:_})=>t(Dn,{readOnly:!0,ref:k,...S,label:C("noumena.noum.dashboard.date_range"),value:g(),leftIcon:t(ie,{name:"calendar_xs",size:24,color:"--icon-input-neutral-default",onClick:_,"data-test":"DateRangePicker-Icon"}),"data-test":"DateRangePicker-TextField"})})}),t(Xr,{onConfirm:S=>{p(S)},fromLabel:C("noumena.noum.dashboard.customRange.startdate"),toLabel:C("noumena.noum.dashboard.customRange.enddate"),isOpen:d,popperReference:i,setIsOpen:c,fullSize:!0,value:u||h,minWidth:"350px",inputSize:"small","data-test":"DateRangePicker-CustomDateRangePicker"})]})},Jr=l.memo(({isOpen:e,dashboardType:n=It.connections,defaultTab:i=G.Statistics,handleClose:o})=>{const{space:a,link:s}=Z(),{width:r}=We(),d=r<Fe.LAPTOP,[c,u]=l.useState(null),[p,m]=l.useState("0"),[f,h]=l.useState(i),v=l.useMemo(()=>Wn.min([a==null?void 0:a.createdAt,...(s==null?void 0:s.linkedNoums.map(A=>A==null?void 0:A.createdAt))||[]]),[s==null?void 0:s.linkedNoums,a==null?void 0:a.createdAt]),x=l.useMemo(()=>({from:v?new Date(v):to(new Date),to:on()}),[v]),g=l.useMemo(()=>f===G.Connected?x:{from:no(),to:on()},[x,f]),[S,k]=l.useState(g);l.useEffect(()=>{f===G.Connected&&k(x)},[x,f]);const _=Pr({dashboardType:n}),w=C(`noumena.noum.dashboard.modal.title.${n}`),N=l.useCallback(A=>{A&&(m(A),h(_[parseInt(A,10)].name))},[_]),I=A=>{k(A)},O=l.useMemo(()=>Or.filter(A=>A.value!=="lifetime"&&f!==G.Connected||f===G.Connected),[f]),T=l.useCallback(()=>f===G.Statistics?t(Yr,{noumId:(a==null?void 0:a._id)||"",dashboardType:n,range:S,"data-test":"NoumDashboardMetricsModal-tabComponent-StatisticsTab"}):t(Kr,{selectedTab:f,dateRange:S,noumId:(a==null?void 0:a._id)||"","data-test":"NoumDashboardMetricsModal-tabComponent-ListsTab"}),[n,S,f,a==null?void 0:a._id]);return t(pe,{testId:"testNoumDashboardMetricsModal",open:e&&!!n,onClose:o,enableCloseButton:!0,size:he.XXL,isFullScreen:d,closeButtonStyles:{enforceLeft:!0},"data-test":"NoumDashboardMetricsModal-Modal",children:b(_r,{"data-testid":"noum_dashboard_metrics_container","data-test":"NoumDashboardMetricsModal-Container",children:[t(ve,{"data-test":"NoumDashboardMetricsModal-ModalHeader",children:w}),b(Ir,{"data-test":"NoumDashboardMetricsModal-TabHeaderContainer",children:[t(Tr,{"data-test":"NoumDashboardMetricsModal-TabsContainer",children:_.length>1&&t(Nr,{autoWidth:!0,"data-test":"NoumDashboardMetricsModal-TabSectionHead",children:t(zt,{onChange:N,inputList:_,selectedId:p,mode:"isBackground",isWithoutImage:!0,fontSize:"--font-button-small-size",fullWidth:!0,textFont:"--font-body-medium-regular-font","data-test":"NoumDashboardMetricsModal-BasicChipsTabsForm"})})}),t(aa,{ref:u,"data-test":"NoumDashboardMetricsModal-DateRangeContainer",children:t(Zr,{defaultSelected:g,onDateChange:I,referenceElement:c,dateRangeOptions:O,selectedTab:f,"data-test":"NoumDashboardMetricsModal-DateRangePicker"})})]}),t(ge,{minHeight:54,"data-test":"NoumDashboardMetricsModal-ModalBody",children:T()})]})})}),oa=y(Le)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 0;
  gap: 16px;
  @media ${pt.TABLET} {
    border-radius: 16px;
  }
`,es=y.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (min-width: ${q.TABLET}) and (max-width: ${q.TABLET_L}) {
    flex-direction: row;
    align-items: center;
  }
`,ts=y.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--bg-separator-neutral-default);

  @media (min-width: ${q.TABLET}) and (max-width: ${q.TABLET_L}) {
    padding: 0;
    border-bottom: none;
    margin-bottom: 0;
  }
`,ia=y.div`
  display: flex;
  flex: 1;
  flex-direction: ${({isBoxFilled:e})=>e?"column":"row"};
  align-items: center;
  gap: 8px;
  @media (min-width: ${q.TABLET}) and (max-width: ${q.TABLET_L}) {
    flex-direction: row;
  }
`,ns=y.div`
  position: relative;
  display: flex;
  flex-direction: column;
`,as=y.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`,os=y.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40px;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) -20%,
    var(--bg-body-neutral-alt-default) 50%
  );
`,is=y.div`
  border-top: 1px solid var(--bg-separator-neutral-default);
  margin: -16px;
  padding: 16px;
  display: flex;
  justify-content: center;
  z-index: 1;
`,vt=y.div`
  display: flex;
  position: relative;
`,rs=y(M)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 6px;
  bottom: -1px;
  height: 14px;
  width: 26px;
  padding: 0 4px;
  border-radius: 1000px;
  background-color: var(--bg-badge-brand-secondary-default);
  border: 2px solid var(--border-badge-neutral-alt-default);
`,dt=y.div`
  display: flex;
  flex-direction: ${({flexDirection:e})=>e??"column"};
  justify-content: space-between;
  width: 100%;

  ${({isBoxFilled:e})=>e&&At`
      background: var(--bg-card-neutral-default);
      border-radius: 8px;
      box-sizing: border-box;
      padding: 12px;
    `}
`,ss=y.div`
  display: flex;
  flex-direction: column;
  cursor: ${({enableClick:e})=>e?"pointer":"default"};
`,ls=y.div`
  position: relative;
  align-items: center;
  display: flex;
`,ds=y.div`
  &[data-title]:hover::after {
    content: attr(data-title);
    position: absolute;
    background-color: var(--bg-tooltip-neutral-default);
    color: var(--text-tooltip-neutral-alt-default);
    padding: 6px 8px;
    border-radius: 4px;
    right: 0px;
    width: max-content;
    top: -22px;
    left: 50%;
    transform: translateX(-50%);
    ${$a.systemInfoSmall}
    @media (max-width: ${q.MOBILE_MAX}) {
      width: auto;
      top: 30px;
    }
  }
`,cs=()=>t(oa,{"data-testid":"skeleton_container","data-test":"NoumMembersSkeleton-MembersContainer",children:b(ia,{"data-test":"NoumMembersSkeleton-MembersWrapper",children:[t(be,{height:24,width:24,borderRadius:"8px","data-test":"NoumMembersSkeleton-Skeleton"}),b(dt,{"data-test":"NoumMembersSkeleton-CardWrapper",children:[t(be,{width:77,borderRadius:"8px","data-test":"NoumMembersSkeleton-Skeleton"}),t(be,{width:141,borderRadius:"8px","data-test":"NoumMembersSkeleton-Skeleton"})]})]})}),Cn=l.memo(({isMasterNoum:e,noumsCount:n=0,noums:i,setDefaultTab:o})=>b(W,{children:[b(ns,{"data-test":"NoumsWrapper-LinkedWrapper",children:[t(M,{font:"footnote-bold",colorToken:"--text-body-neutral-default","data-test":"NoumsWrapper-TSpan",children:t(ft,{i18nKey:e?"noumena.home_noum.owned_noums":"noumena.chamber.linked_noums",values:{count:n},tOptions:{postProcess:"interval",count:n},components:{b:t(M,{font:"footnote-bold",colorToken:"--text-body-neutral-highlighted","data-test":"NoumsWrapper-TSpan"})},"data-test":"NoumsWrapper-Trans"})}),t(ae,{height:16,"data-test":"NoumsWrapper-Spacer"}),i.map(a=>b(as,{"data-test":"NoumsWrapper-LinkedItem",children:[t(vt,{"data-test":"NoumsWrapper-AvatarWrapper",children:t(De,{url:a==null?void 0:a.profileImage,size:"M","data-test":"NoumsWrapper-Avatar"})}),t(M,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"NoumsWrapper-TSpan",children:a==null?void 0:a.name})]},a==null?void 0:a._id)),t(os,{"data-test":"NoumsWrapper-LinkedBottom"})]}),t(is,{"data-test":"NoumsWrapper-SeeAllWrapper",children:t($,{textOnly:!0,onClick:()=>o(e?B.OwnedNoums:B.Noums),"data-test":"NoumsWrapper-Button",children:e?C("noumena.home_noum.owned_noums.see_all"):C("noumena.chamber.see_all_linked_noums")})})]})),vn=()=>{var gt,He,yt,ye,Ct,Je,et,tt,nt,at,H,_e,Ne;const{connectedMembers:e,connectedMembersCount:n,followersCount:i=0,isMasterNoum:o,space:a,isOwner:s,isFollowing:r,isConnected:d,loading:c,refetchConnectedMembers:u,refetchFollowersCount:p,noumType:m}=Z(),{eventMeta:f,loading:h}=Wa({chamberId:(a==null?void 0:a._id)||"",preventGetEvents:!1}),[v,x]=l.useState(),[g,S]=l.useState(),[k,_]=l.useState(),[w,N]=l.useState(!1),[I,O]=l.useState(!1),{flags:{noumDashboardMetrics:T}}=Re(),A=s&&!o,L=s||d||o&&n>0,E=l.useCallback(()=>{L&&(o||!s||!T?x(B.Connections):s?(S(It.connections),x(G.Statistics)):x(B.Connections))},[L,o,s,T]),{noumLinkData:P,loadingLinked:R,getLinkData:F}=Kn(),{totalCount:K,loading:j}=$t("",B.ProjectSpaces,void 0,o?(gt=a==null?void 0:a.uid)==null?void 0:gt._id:null),re=o?K:0,{totalCount:U,loading:se,currentData:ee}=$t("",B.OwnedNoums,void 0,o?(He=a==null?void 0:a.uid)==null?void 0:He._id:null);l.useEffect(()=>{F((a==null?void 0:a._id)||""),u(),p&&(a!=null&&a._id)&&p()},[F,u,p,a==null?void 0:a._id]);const V=l.useMemo(()=>{var ce,Ce;return((Ce=(ce=P==null?void 0:P.getNoumLinkByNoumId)==null?void 0:ce.link)==null?void 0:Ce.linkedNoums)||[]},[(ye=(yt=P==null?void 0:P.getNoumLinkByNoumId)==null?void 0:yt.link)==null?void 0:ye.linkedNoums]),X=l.useMemo(()=>{var ce,Ce;return((Ce=(ce=P==null?void 0:P.getNoumLinkByNoumId)==null?void 0:ce.link)==null?void 0:Ce.linkedNoumsCount)||0},[(Je=(Ct=P==null?void 0:P.getNoumLinkByNoumId)==null?void 0:Ct.link)==null?void 0:Je.linkedNoumsCount]),z=l.useMemo(()=>{var ce;return((ce=P==null?void 0:P.getNoumLinkByNoumId)==null?void 0:ce.link)||!1},[P]),D=l.useMemo(()=>z?z==null?void 0:z.followersCount:i,[z,i]),ne=l.useMemo(()=>V.slice(0,3),[V]),le=l.useMemo(()=>(a==null?void 0:a.type)!==ue.Home&&(a==null?void 0:a.projectType)!==Te.Secret&&m!==ue.RiseApplication,[m,a==null?void 0:a.projectType,a==null?void 0:a.type]),oe=!o&&s;l.useEffect(()=>{F((a==null?void 0:a._id)||"")},[i]);const Me=l.useMemo(()=>e.slice(0,3).map(ce=>mt.getProfilePicture(ce)??""),[e]),de=l.useMemo(()=>n-Me.length,[n,Me]);return c&&!e.length||R&&!(P!=null&&P.getNoumLinkByNoumId)||se&&!ee.length||h?t(cs,{"data-test":"NoumMembers-NoumMembersSkeleton"}):b(oa,{"data-test":"NoumMembers-MembersContainer",children:[!o&&t(M,{font:"footnote-bold",colorToken:"--text-body-neutral-default","data-test":"NoumMembers-TSpan",children:C("noumena.chamber.owner")}),b(es,{"data-test":"NoumMembers-TopContainer",children:[!o&&b(ts,{"data-testid":"owner_wrapper","data-test":"NoumMembers-OwnerWrapper",children:[t(vt,{"data-test":"NoumMembers-AvatarWrapper",children:t(De,{url:(tt=(et=a==null?void 0:a.uid)==null?void 0:et.profile)==null?void 0:tt.profilePicture,size:"L","data-test":"NoumMembers-Avatar"})}),b(dt,{"data-test":"NoumMembers-CardWrapper",children:[t(M,{font:"body-m-bold",colorToken:"--text-card-neutral-highlighted","data-test":"NoumMembers-TSpan",children:ht((nt=a==null?void 0:a.uid)==null?void 0:nt.firstName,(at=a==null?void 0:a.uid)==null?void 0:at.middleName,(H=a==null?void 0:a.uid)==null?void 0:H.lastName)}),t(M,{font:"footnote",colorToken:"--text-card-neutral-default",singleLine:!0,title:((_e=a==null?void 0:a.uid)==null?void 0:_e.title)||"","data-test":"NoumMembers-TSpan",children:(Ne=a==null?void 0:a.uid)==null?void 0:Ne.title})]})]}),b(ia,{"data-testid":"chamberMembers",isBoxFilled:A,"data-test":"NoumMembers-MembersWrapper",children:[!A&&t(W,{children:n>0?b(vt,{"data-test":"NoumMembers-AvatarWrapper",children:[t(Ua,{urls:Me,size:"L",borderedImage:!0,"data-test":"NoumMembers-InlineAvatar"}),de>0&&t(rs,{colorToken:"--text-badge-brand-primary-default",font:"badge-count","data-test":"NoumMembers-AvatarBadge",children:`+${de}`}),Me.length>1&&t(ae,{width:16,"data-test":"NoumMembers-Spacer"})]}):t(vt,{"data-testid":"empty_avatar","data-test":"NoumMembers-AvatarWrapper",children:t(De,{size:"M","data-test":"NoumMembers-Avatar"})})}),b(dt,{enableClick:L,isBoxFilled:A,flexDirection:"row","data-test":"NoumMembers-CardWrapper",children:[b(ss,{onClick:E,enableClick:L,"data-test":"NoumMembers-CardWrapperButton",children:[t(M,{font:"body-m-bold",colorToken:L?"--text-tablecell-header-neutral-highlighted":"--text-tablecell-header-neutral-default","data-testid":"connected_members_count","data-test":"NoumMembers-TSpan",children:n}),t(M,{font:"footnote",colorToken:"--text-tablecell-header-neutral-default","data-test":"NoumMembers-TSpan",children:C("noumena.chamber.connections",{postProcess:"interval",count:n})})]}),s&&!o&&t(ls,{"data-test":"NoumMembers-CardWrapperToolTipButton",children:t(ds,{"data-title":C("noumena.noum.invite_users"),"data-test":"NoumMembers-ToolTipHead",children:t(ie,{name:"person_add",size:24,onClick:()=>O(!0),"data-test":"NoumMembers-Icon"})})})]}),le&&b(dt,{enableClick:s,onClick:()=>s&&x(B.Followers),isBoxFilled:A,"data-test":"NoumMembers-CardWrapper",children:[t(M,{font:"body-m-bold",colorToken:s?"--text-tablecell-header-neutral-highlighted":"--text-tablecell-header-neutral-default","data-test":"NoumMembers-TSpan",children:D}),t(M,{font:"footnote",colorToken:"--text-tablecell-header-neutral-default","data-test":"NoumMembers-TSpan",children:C("noumena.chamber.followers",{postProcess:"interval",count:D})})]}),oe&&b(dt,{isBoxFilled:A,"data-test":"NoumMembers-CardWrapper",children:[t(M,{font:"body-m-bold",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"NoumMembers-TSpan",children:f==null?void 0:f.hostedEventsCount}),t(M,{font:"footnote",colorToken:"--text-tablecell-header-neutral-default","data-test":"NoumMembers-TSpan",children:C("noumena.noum.events",{postProcess:"interval",count:(f==null?void 0:f.hostedEventsCount)||0})})]})]})]}),o?t(Cn,{noumsCount:U,noums:nn(ee==null?void 0:ee.slice(0,3))||[],setDefaultTab:x,isMasterNoum:o,"data-test":"NoumMembers-NoumsWrapper"}):b(W,{children:[V.length>0&&t(Cn,{noumsCount:X,noums:nn(ne),setDefaultTab:x,isMasterNoum:o,"data-test":"NoumMembers-NoumsWrapper"}),t(Jr,{isOpen:!!g,dashboardType:g,handleClose:()=>S(void 0),"data-test":"NoumMembers-NoumDashboardMetricsModal"})]}),(r||L||V.length>0||o&&v===B.OwnedNoums)&&!j&&!se&&t(wr,{isOpen:!!v&&v!==G.Statistics,defaultTab:v,handleClose:()=>x(void 0),followersCount:D,linkedNoumsCount:X,connectedProjectsCount:re,setInvitedNoumId:_,showInviteModal:()=>N(!0),userNoumsCount:U,"data-test":"NoumMembers-ConnectionDetailsModal"}),t(Mr,{isOpen:w,invitedNoumId:k,ownNoumId:(a==null?void 0:a._id)||"",closeInviteModal:()=>N(!1),"data-test":"NoumMembers-ConnectionInviteModal"}),t(xo,{spaceId:(a==null?void 0:a._id)||"",isOpen:I,handleClose:()=>O(!1),isOnlyInvite:!0,"data-test":"NoumMembers-ChamberVisibilityInviteModal"})]})},us=y.div`
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  padding: 16px;
  pointer-events: ${({disabled:e})=>e?"none":"initial"};
`;y.span`
  text-align: center;
  color: var(--text-card-neutral-default);
  ${za.bodyMedium}
`;y.div`
  min-width: 90%;
  height: 1px;
  margin: 16px 0px;
  background-color: var(--bg-separator-neutral-default); ;
`;const ps=y.div`
  position: relative;
  display: flex;
  flex-direction: column;
`,ms=y.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  padding: 16px 0;
  gap: 16px;
`,Sn=y.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`,hs=y.div`
  display: flex;
  flex-direction: column;
`,xn=y.div`
  flex: 1;
`,fs=y.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
`,bs=y(Q)`
  position: relative;
  padding: 5px;
`,gs=y(M)`
  padding-bottom: 10px;
`,ys=y.div`
  cursor: pointer;
  padding: 8px;
  color: var(--icon-button-neutral-default);
  border-radius: 8px;
  background-color: var(--bg-button-neutral-default);
  :hover {
    background-color: var(--bg-button-neutral-alt-hover);
  }
  display: block;

  @media ${pt.LAPTOP} {
    display: none;
  }
`,Cs=y.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`,vs=y($)`
  margin: 2px 0px;
`,Ss=()=>t(ps,{"data-testid":"invited-by-me-skeleton","data-test":"InvitedByMeSkeleton-SkeletonContainer",children:b(ao,{borderRadius:8,"data-test":"InvitedByMeSkeleton-SkeletonTheme",children:[t(be,{width:143,"data-test":"InvitedByMeSkeleton-Skeleton"}),Array.from({length:3}).map(()=>b(ms,{"data-testid":"skeleton_item","data-test":"InvitedByMeSkeleton-SkeletonItem",children:[b(Sn,{"data-test":"InvitedByMeSkeleton-ItemSkeletonWrapper",children:[t(be,{width:40,height:40,"data-test":"InvitedByMeSkeleton-Skeleton"}),b(hs,{"data-test":"InvitedByMeSkeleton-RightSkeletonWrapper",children:[t(be,{width:140,"data-test":"InvitedByMeSkeleton-Skeleton"}),t(be,{width:198,"data-test":"InvitedByMeSkeleton-Skeleton"})]})]}),b(Sn,{"data-test":"InvitedByMeSkeleton-ItemSkeletonWrapper",children:[t(xn,{"data-test":"InvitedByMeSkeleton-ButtonSkeletonWrapper",children:t(be,{height:40,"data-test":"InvitedByMeSkeleton-Skeleton"})}),t(xn,{"data-test":"InvitedByMeSkeleton-ButtonSkeletonWrapper",children:t(be,{height:40,"data-test":"InvitedByMeSkeleton-Skeleton"})})]})]},Ft())),t(fs,{"data-test":"InvitedByMeSkeleton-FooterSkeleton",children:t(be,{width:214,"data-test":"InvitedByMeSkeleton-Skeleton"})})]})}),xs=({isChambersScreen:e,noumId:n,disabled:i})=>{var f,h,v,x,g;const o=We(),{lastUpdatedConnectionId:a}=Z(),[s,r]=Ye(),[d,c]=l.useState(!1),{data:u,loading:p,refetch:m}=po({limit:3,requestFrom:e?null:n,status:Fa.Invited});return l.useEffect(()=>{o.width>Fe.TABLET_L&&c(!1)},[o.width]),l.useEffect(()=>{var S,k,_;a&&((S=u==null?void 0:u.requestedConnection)!=null&&S.data)&&((_=(k=u==null?void 0:u.requestedConnection)==null?void 0:k.data)==null?void 0:_.findIndex(w=>(w==null?void 0:w.connectionId)===a))>-1&&m()},[(f=u==null?void 0:u.requestedConnection)==null?void 0:f.data,a,m]),t(us,{disabled:i,"data-test":"InvitedByMe-Container",children:p&&!((v=(h=u==null?void 0:u.requestedConnection)==null?void 0:h.data)!=null&&v.length)?t(Ss,{"data-test":"InvitedByMe-InvitedByMeSkeleton"}):b(W,{children:[b(Cs,{"data-test":"InvitedByMe-Header",children:[t(ys,{"data-testid":"received-requests-collapse-button",onClick:()=>c(!d),"data-test":"InvitedByMe-ButtonView",children:t(ie,{name:d?"chevron_small_down_m":"chevron_small_up_m",color:"--icon-button-neutral-default",size:24,"data-test":"InvitedByMe-Icon"})}),t(M,{font:"footnote-bold",colorToken:"--text-body-neutral-default","data-test":"InvitedByMe-TSpan",children:(x=C("noumena.chamber.modal.invited_by_me"))==null?void 0:x.toLocaleUpperCase()})]}),p?t(bs,{"data-test":"InvitedByMe-SpinnerContainer",children:t(Ke,{"data-test":"InvitedByMe-Spinner"})}):d?t(gs,{font:"body-m",colorToken:"--text-body-neutral-default",textAlign:"center",$fill:!0,"data-test":"InvitedByMe-CollapsedWrapper",children:t(ft,{i18nKey:"noumena.chamber.awaiting_received_requests",values:{postProcess:"interval",count:((g=u==null?void 0:u.requestedConnection)==null?void 0:g.count)||0},components:{bold:t(M,{colorToken:"--text-card-neutral-highlighted",textAlign:"center",$fill:!0,"data-test":"InvitedByMe-TSpan"})},"data-test":"InvitedByMe-Trans"})}):t(mo,{isChambersScreen:e,refetch:m,chamberId:n,data:u,loading:p,isChamberBox:!0,"data-test":"InvitedByMe-InvitesOrMyRequestsList"}),!p&&t(vs,{textOnly:!0,onClick:i?void 0:r,"data-test":"InvitedByMe-AllInvites",children:C("noumena.chamber.modal.see_all_invited_by_me")}),t(ho,{isOpen:s,isChambersScreen:e,handleClose:r,noumId:n,isInviteOnly:!0,"data-test":"InvitedByMe-RequestsAndInvitesModal"})]})})};var te=(e=>(e.IDENTITY="noumena.rise.identity.step",e.NATIVE="noumena.rise.native.step",e.FINANCIAL="noumena.rise.finance.step",e.BUSINESS="noumena.rise.business.step",e.PRINCIPLES_YOU="noumena.rise.priciplesyou.step",e.ESSAYS="noumena.rise.essay.step",e))(te||{});const ct="https://noudev-cq-portal.noumenati.com/",ks="https://staging-retail.asynctester.com/oauth/authorize?client_id=9CoxffGzaPaTlSW5h-LmVs2XLWv3zgT_AExweIFUoJM&redirect_uri=https%3A%2F%2Fstaging-retail.asynctester.com&response_type=code&scope=openid",ws=`${ct}build-cq-dialog/principles-you`,Ms=[{step:te.IDENTITY,url:`${ct}build-cq-dialog/identity-capital`},{step:te.NATIVE,url:`${ct}build-cq-dialog/native-capital`},{step:te.FINANCIAL,url:`${ct}build-cq-dialog/financial-capital`},{step:te.BUSINESS,url:`${ct}build-cq-dialog/business-plan`},{step:te.PRINCIPLES_YOU,url:ks},{step:te.ESSAYS,url:null}],_s=l.memo(({step:e,applicationId:n,stepCompleted:i,showCheckbox:o,url:a,noumId:s,onModalClosed:r,onCheckBoxClicked:d,checked:c,noOfEssays:u,isClassDeleted:p,canEdit:m,essayQuestionAnswered:f,identityStepCompleted:h})=>{const v=Fo(),{addToast:x}=Pe(),{user:g}=fe(),{flags:S}=Re(),[k,_]=l.useState({open:!1,source:""}),{isOwner:w}=Z(),N=async()=>{if(e===te.PRINCIPLES_YOU&&!S.principlesYou){window.open(a,"_blank"),Ee(Ve.RISE.PRINCIPLES_YOU_CLICKED,{UUID:g==null?void 0:g._id});return}if(e===te.FINANCIAL&&!h){x("error","icon",C("noumena.rise_program.identity.capital.error"));return}const{token:E,error:P}=await v();if(E){const R=`${a}?access_token=${E}&rise_application=true&applicationId=${n}&noumId=${s}`;_({open:!0,source:R});return}P&&x("error","none",P.message)},I=()=>{r(),_({open:!1,source:""})},O=E=>{c?d(P=>({...P,essays:E})):f()?(d(R=>({...R,essays:!1})),x("error","icon",C("noumena.rise_program.esssay_not_answered"))):(d(R=>({...R,essays:E})),Ee(Ve.RISE.APPLICATION_STEP,{UUID:g==null?void 0:g._id,title:"Essays"}))},T=E=>{if(p){x("error","icon",C("noumena.rise_program.can_user_apply"));return}switch(m||x("error","icon",C("noumena.rise_program.not.owner.error")),e){case te.ESSAYS:O(E);break;case te.PRINCIPLES_YOU:d(P=>({...P,principlesYou:E}));break}},A=e===te.ESSAYS,L=e===te.PRINCIPLES_YOU;return l.useEffect(()=>{i&&!A&&!L&&Ee(Ve.RISE.APPLICATION_STEP,{UUID:g==null?void 0:g._id,title:C(e)})},[e,i,g,A,L]),b(W,{children:[b(dr,{allowCursor:w,"data-test":"CQStep-StepWrapper",children:[b(cr,{onClick:()=>{if(a){if(p){x("error","icon",C("noumena.rise_program.can_user_apply"));return}m||x("error","icon",C("noumena.rise_program.not.owner.error")),N()}},style:w?{}:{pointerEvents:"none"},"data-test":"CQStep-StepContent",children:[t(M,{font:"body-m",colorToken:"--text-tablecell-header-neutral-highlighted","data-test":"CQStep-TSpan",children:A?C(e,{noOfEssays:u}):C(e)}),i?t(xt,{secondary:!0,success:!0,"data-test":"CQStep-Tag",children:"Done"}):A||t(ie,{name:"chevron_right_m",size:12,color:o?"--icon-tablecell-neutral-default":"--icon-tablecell-neutral-highlighted",style:{marginRight:"9.15px"},"data-test":"CQStep-Icon"})]}),o&&b(W,{children:[t(ae,{height:9,"data-test":"CQStep-Spacer"}),b(Q,{gap:8,justify:"flex-start","data-test":"CQStep-Stack",children:[t(Ha,{isChecked:c,onChange:T,disableClick:!w,icon:t(ie,{name:"tick_m",size:23.5,color:"--icon-checkbox-neutral-alt-default","data-test":"CQStep-Icon"}),"data-test":"CQStep-Checkbox"}),t(M,{font:"body-m",colorToken:"--text-tablecell-header-neutral-default","data-test":"CQStep-TSpan",children:"I confirm that I completed this step"})]})]})]}),t(pe,{open:k.open,size:he.XXL,enableCloseButton:!0,onClose:I,"data-test":"CQStep-Modal",children:t(ea,{"data-test":"CQStep-RiseIFrameContainer",children:t(ta,{src:k.source,title:"rise","data-test":"CQStep-RiseIframe"})})})]})}),Ns=l.memo(({applicationId:e,spaceId:n,resultJSON:i,refetch:o,noOfEssays:a,canEdit:s,isClassDeleted:r,essayQuestionAnswered:d})=>{const{logError:c}=Mt(),{addToast:u}=Pe(),{user:p}=fe(),{isOwner:m,isConnected:f,space:h}=Z(),{flags:v}=Re(),[x,{loading:g}]=Ln({onCompleted:()=>{Ee(Ve.RISE.APPLICATION_SUBMIT,{UUID:p==null?void 0:p._id}),o()},onError:X=>{c(X,"submit-rise-application",!0)}}),[S,k]=l.useState(!1),[_,w]=l.useState({principlesYou:!1,essays:!1}),{businessFinancialProjectionStatus:N,BusinessPlanStatus:I,identityStatus:O,nativeStatus:T,financialCreditStatus:A,financialCashflowStatus:L,principleYouStatus:E}=i||{},P=O==="SUBMITTED",R=T==="SUBMITTED",F=L==="SUBMITTED"&&A==="SUBMITTED",K=N==="SUBMITTED"&&I==="SUBMITTED",j=P&&R&&F&&K,re=E==="SUBMITTED",U=v.principlesYou?j&&re&&_.essays:j&&_.principlesYou&&_.essays,se=X=>{switch(X){case te.IDENTITY:return P;case te.NATIVE:return R;case te.FINANCIAL:return F;case te.BUSINESS:return K;case te.PRINCIPLES_YOU:return v.principlesYou?re:!1;default:return!1}},ee=()=>{if(r){u("error","icon",C("noumena.rise_program.can_user_apply"));return}d()?u("error","icon",C("noumena.rise_program.esssay_not_answered")):k(!S)},V=()=>{k(!1),e&&x({variables:{_id:e,input:{resultJSON:i,status:Ut.Submitted}}})};return b(Vt,{"data-test":"SubmitMyApplication-Wrapper",children:[(h==null?void 0:h.type)===ue.RiseApplication&&f&&t(na,{refreshStatus:o,"data-test":"SubmitMyApplication-RiseApplicationReviewButton"}),m&&t($,{size:"full",onClick:ee,primary:!0,disabled:!U,"data-test":"SubmitMyApplication-Button",children:C("noumena.chamber.rise.submit_my_application")}),m&&t(sr,{"data-test":"SubmitMyApplication-ApplicationInformation",children:t("div",{children:t(M,{font:"body-m",colorToken:"--text-infobox-neutral-default","data-test":"SubmitMyApplication-TSpan",children:C("noumena.chamber.rise.submit_my_application_info")})})}),t(lr,{"data-test":"SubmitMyApplication-CQStepWrapper",children:Ms.map(X=>{const{step:z,url:D}=X,ne=se(z),le=z===te.PRINCIPLES_YOU&&v.principlesYou?ws:D;return t(_s,{step:z,showCheckbox:z===te.PRINCIPLES_YOU&&!v.principlesYou||z===te.ESSAYS,url:le,noumId:n||"",applicationId:e,stepCompleted:ne,onModalClosed:o,onCheckBoxClicked:w,noOfEssays:a,isClassDeleted:r,canEdit:s,identityStepCompleted:P,checked:z===te.PRINCIPLES_YOU?_.principlesYou:_.essays,essayQuestionAnswered:d,"data-test":`SubmitMyApplication-CQStep-${z}`},z)})}),b(pe,{open:S,disableBackdropClick:!0,disableEscapeKeyDown:!0,"data-test":"SubmitMyApplication-Modal",children:[t(ve,{"data-test":"SubmitMyApplication-ModalHeader",children:t(M,{font:"heading-s-bold","data-test":"SubmitMyApplication-TSpan",children:C("noumena.chamber.rise.submit_my_application")})}),b(ge,{align:"center",style:{width:"279px"},"data-test":"SubmitMyApplication-ModalBody",children:[t(M,{font:"body-l",textAlign:"center",colorToken:"--text-modal-neutral-default","data-test":"SubmitMyApplication-TSpan",children:C("noumena.chamber.rise.submit_my_application_modal_info")}),t(ae,{height:24,"data-test":"SubmitMyApplication-Spacer"}),t($,{onClick:V,primary:!0,size:"full","data-test":"SubmitMyApplication-Button",children:C("noumena.submit")}),t(ae,{height:16,"data-test":"SubmitMyApplication-Spacer"}),t($,{tertiary:!0,size:"full",onClick:ee,"data-test":"SubmitMyApplication-Button",children:C("noumena.cancel")})]})]})," ",t(pe,{disableBackdropClick:!0,disableEscapeKeyDown:!0,open:g,style:{width:"327px"},"data-test":"SubmitMyApplication-Modal",children:b(Q,{align:"center",justify:"center",vertical:!0,"data-test":"SubmitMyApplication-Stack",children:[t(ae,{height:24,"data-test":"SubmitMyApplication-Spacer"}),t("div",{style:{position:"relative"},children:t(Ke,{"data-test":"SubmitMyApplication-Spinner"})}),t(ae,{height:24,"data-test":"SubmitMyApplication-Spacer"}),t(M,{font:"body-l",colorToken:"--text-body-neutral-default",textAlign:"center","data-test":"SubmitMyApplication-TSpan",children:C("noumena.chamber.rise.submitting_application")})]})})]})}),kn=({status:e})=>{const n=l.useMemo(()=>e===ze.Approved?{status:C("noumena.rise.status.approved"),helperText:C("noumena.rise.status.approved.helper"),success:!0,danger:!1}:e===ze.Rejected?{status:C("noumena.rise.status.rejected"),helperText:C("noumena.rise.status.rejected.helper"),success:!1,danger:!0}:e===ze.Inprogress?{status:C("noumena.rise.status.inprogress"),helperText:"Your application is not yet submitted.",success:!1,danger:!0}:{status:C("noumena.rise.status.pending"),helperText:C("noumena.rise.status.pending.helper"),success:!1,danger:!1},[e]);return b(Vt,{"data-test":"StatusScreen-Wrapper",children:[t(M,{font:"footnote",colorToken:"--text-body-neutral-default","data-test":"StatusScreen-TSpan",children:C("noumena.chamber.rise.application.status")}),t(xt,{tertiary:!0,success:n.success,danger:n.danger,"data-test":"StatusScreen-Tag",children:n.status}),t(M,{colorToken:"--text-infobox-neutral-default","data-test":"StatusScreen-TSpan",children:n.helperText})]})},As=()=>b(Vt,{"data-test":"SkeletonLoader-Wrapper",children:[t(be,{height:25,width:"30%","data-test":"SkeletonLoader-Skeleton"}),t(be,{height:15,width:"30%","data-test":"SkeletonLoader-Skeleton"}),t(be,{height:15,count:3,"data-test":"SkeletonLoader-Skeleton"})]}),Is=l.memo(()=>{var v;const{spaceId:e,isOwner:n,isConnected:i}=Z(),{applicationId:o,resultJson:a,refetch:s,status:r,loading:d,questions:c,parentNoumId:u}=jn(e),{data:p,loading:m}=Rn({skip:!u,variables:{noumId:u}}),f=((v=p==null?void 0:p.getNoumClassByNoumId)==null?void 0:v.isDeleted)??!1,h=l.useCallback(()=>(c||[]).some(x=>{const g=String((a==null?void 0:a[x==null?void 0:x.id])||"");return(g&&(g==null?void 0:g.replace(/(<([^>]+)>)/gi,""))||"").length<200}),[c,a]);return d||m?t(As,{"data-test":"RiseApplication-SkeletonLoader"}):r?t(W,{children:r===Ut.Inprogress||i?b(W,{children:[t(kn,{status:r,"data-test":"RiseApplication-StatusScreen"}),t(Ns,{applicationId:o,resultJSON:a,refetch:s,spaceId:e,noOfEssays:(c==null?void 0:c.length)??0,isClassDeleted:f,canEdit:n,essayQuestionAnswered:h,"data-test":"RiseApplication-SubmitMyApplication"})]}):t(kn,{status:r,"data-test":"RiseApplication-StatusScreen"})}):null}),Bt=y.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${({noumEditor2:e})=>e?At`
          @media (min-width: ${je.LAPTOP_M_MIN}) {
            width: 322px;
            margin: 0 0 0 24px;
          }
        `:`
  @media (min-width: ${Oe.LAPTOP_SM_MIN}) {
    width: 322px;
    margin: 0 0 0 24px;
  }
  `}
`;y(Le)`
  padding: 16px;
`;const Ts=parseInt(q.TABLET_L,10)||1023,Ps=({isEditing:e=!1,onSelectEditOption:n})=>{var w,N;const{flags:{noumEditor2:i}}=Re(),{isUnregistered:o}=fe(),{width:a}=We(),{spaceId:s,space:r,isOwner:d,projectType:c,connectionStatus:u,isArchived:p,noumType:m,isConnected:f,mainSpaceId:h}=Z(),{space:v}=qa(),{requestConnectionHelper:x}=Pn(),g=(r==null?void 0:r.type)===ue.Home,S=!(((w=v==null?void 0:v.uid)==null?void 0:w.userStatus)===an.Active&&(v==null?void 0:v.status)===Tn.Published),k=l.useMemo(()=>(c===Te.Public||c===Te.Secret)&&!g,[g,c]),_=l.useMemo(()=>{var I;return a>Ts&&d&&((I=r==null?void 0:r.uid)==null?void 0:I.userStatus)===an.Active&&(!(r!=null&&r.percentCompleted)||(r==null?void 0:r.percentCompleted)<100)},[d,r==null?void 0:r.percentCompleted,(N=r==null?void 0:r.uid)==null?void 0:N.userStatus,a]);return l.useEffect(()=>{o&&!(r!=null&&r.isConnected)&&(r!=null&&r.enableAds)&&s&&x(h,s)},[o,h,x,r==null?void 0:r.enableAds,r==null?void 0:r.isConnected,s]),o?t(Pt,{"data-test":"RightPanel-StickyContainer",children:t(Bt,{"data-testid":"noum-guest-right-panel","data-test":"RightPanel-Container",children:t(un,{"data-test":"RightPanel-NoumByLinkProvider",children:t(vn,{"data-test":"RightPanel-NoumMembers"})})})}):e?t(Pt,{"data-test":"RightPanel-StickyContainer",children:t(Bt,{"data-testid":"noum-edit-right-panel","data-test":"RightPanel-Container",children:t(ki,{onSelect:n,isNoumPublishedAtAll:S,projectType:v==null?void 0:v.projectType,enableAds:v==null?void 0:v.enableAds,"data-test":"RightPanel-NoumEditOptions"})})}):t(Pt,{"data-test":"RightPanel-StickyContainer",children:t(un,{"data-test":"RightPanel-NoumByLinkProvider",children:b(Bt,{noumEditor2:i,"data-testid":"noum-view-right-panel","data-test":"RightPanel-Container",children:[t(Xi,{"data-test":"RightPanel-NoumViewModeActions"}),m===ue.RiseApplication&&(d||f)&&t(Is,{"data-test":"RightPanel-RiseApplication"}),(d||g||u===Y.Approved)&&t(vn,{"data-test":"RightPanel-NoumMembers"}),_&&t(io,{"data-test":"RightPanel-ChamberCompleteness"}),d&&(k?t(xs,{noumId:s,disabled:p,"data-test":"RightPanel-InvitedByMe"}):t(fo,{noumId:s,disabled:p,isChambersScreen:g,"data-test":"RightPanel-ReceivedRequests"}))]})})})},pl=y.div`
  font-family: var(--font-family);
  background-color: var(--bg-card-neutral-default);
  overflow: auto;
  @media (max-width: ${q.TABLET_L}) {
    overflow: unset;
  }
`;y.div`
  padding: 16px 0;
`;const ml=y(ja).attrs({isBorderRadius:!1})`
  padding: 0px;
`,Rs=y(Le)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: var(--bg-card-neutral-alt-default);
  color: var(--text-card-header-neutral-highlighted);
  border-radius: 16px;
  margin: 16px 0px;
  @media (min-width: ${q.LAPTOP_SM}) {
    height: 222px;
    width: 322px;
    margin: 0px 0px 0px 17px;
  }
  @media (max-width: ${q.MOBILE_L}) {
    margin: 16px;
  }
`,Ls=y.span`
  font-weight: 600;
`,hl=y.div`
  background: var(--bg-tag-neutral);
  display: flex;
  gap: 5px;
  padding: ${({isMobile:e})=>e?" 26px 0px ":" 4px 8px "};
  border-radius: 8px;
`,fl=y(Le)`
  width: 100%;
  padding: 28px;
  background-color: var(--bg-card-neutral-alt-hidden);
`,bl=y.div`
  @media (min-width: ${q.LAPTOP_SM}) {
    display: none;
  }
`,Bs=({selectedCustomPreviewTab:e,setSelectedCPreviewTab:n})=>{const i=l.useCallback(s=>{n==null||n(s)},[n]),{width:o}=We(),a=o<Fe.MOBILE_L;return t(Rs,{"data-test":"CustomPreviewRightPanel-CustomPreviewHeader",children:b("div",{children:[t(zt,{onChange:i,inputList:Va,selectedId:e,mode:"isBackground",isWithoutImage:!0,fontSize:"--font-link-medium-size",tabWidth:a?"140px":"165px",textFont:"--font-body-medium-regular-font","data-test":"CustomPreviewRightPanel-BasicChipsTabsForm"}),t(ae,{height:16,"data-test":"CustomPreviewRightPanel-Spacer"}),t(ft,{i18nKey:C("noumena.noum_edit.custom_previews.descriptiontop"),components:{span:t(Ls,{"data-test":"CustomPreviewRightPanel-StyledTSpan"})},"data-test":"CustomPreviewRightPanel-Trans"})]})})},Es=({header:e,isEditing:n,onSelectEditOption:i,hasSideBar:o=!0,children:a,leftSidebar:s,isCustomPreview:r=!1,hasThemePanel:d=!1,selectedCustomPreviewTab:c,setSelectedCPreviewTab:u})=>{const{flags:p}=Re();return t(Yn,{"data-test":"ChamberViewLayout-Root",children:b(ui,{"data-testid":"Main-Layout",centralize:!n&&p.newAppNavigation,hasThemePanel:d,"data-test":"ChamberViewLayout-MainLayout",children:[p.newAppNavigation?null:t("div",{id:"space",children:s}),t(Gn,{topSpacing:!!s,id:"header","data-test":"ChamberViewLayout-Header",children:e}),t("div",{id:"body",children:a}),b("div",{id:"sidebar",children:[o&&t(Ps,{isEditing:n,onSelectEditOption:i,"data-test":"ChamberViewLayout-RightPanel"}),r&&c&&t(pi,{"data-test":"ChamberViewLayout-HeadDCPTab",children:t(Bs,{selectedCustomPreviewTab:c,setSelectedCPreviewTab:u,"data-test":"ChamberViewLayout-CustomPreviewRightPanel"})})]})]})})},gl=e=>{const{flags:{noumEditor2:n}}=Re();return n&&!e.isCustomPreview?t(mi,{...e,"data-test":"NoumViewLayout"}):t(Es,{...e,"data-test":"ChamberViewLayout"})};export{hn as A,ta as B,gl as C,Ji as D,ol as E,ur as F,ll as G,or as H,cl as I,ir as J,Di as K,qi as L,pn as M,gi as N,un as O,fl as P,hl as Q,Yn as R,Ti as S,rl as T,ml as U,bl as V,Bs as W,pl as X,Ls as Y,il as a,Ki as b,Hi as c,ji as d,Wi as e,zi as f,ul as g,Kn as h,Vo as i,li as j,Qe as k,ke as l,Mi as m,sl as n,ci as o,Zi as p,B as q,It as r,G as s,$t as t,jn as u,wr as v,Jr as w,Mr as x,dl as y,ea as z};
//# sourceMappingURL=index-401975c0.js.map
