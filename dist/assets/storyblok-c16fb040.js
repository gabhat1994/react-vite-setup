import{h as b}from"./vendor-51460554.js";/*!
 * storyblok-js-client v4.5.2
 * Universal JavaScript SDK for Storyblok's API
 * (c) 2020-2022 Stobylok Team
 */function v(a){return typeof a=="number"&&a==a&&a!==1/0&&a!==-1/0}function T(a,t,e){if(!v(t))throw new TypeError("Expected `limit` to be a finite number");if(!v(e))throw new TypeError("Expected `interval` to be a finite number");var s=[],r=[],n=0,o=function(){n++;var c=setTimeout(function(){n--,s.length>0&&o(),r=r.filter(function(h){return h!==c})},e);r.indexOf(c)<0&&r.push(c);var l=s.shift();l.resolve(a.apply(l.self,l.args))},i=function(){var c=arguments,l=this;return new Promise(function(h,m){s.push({resolve:h,reject:m,args:c,self:l}),n<t&&o()})};return i.abort=function(){r.forEach(clearTimeout),r=[],s.forEach(function(c){c.reject(new throttle.AbortError)}),s.length=0},i}T.AbortError=function(){Error.call(this,"Throttled function aborted"),this.name="AbortError"};const $=function(a,t){if(!a)return null;let e={};for(let s in a){let r=a[s];t.indexOf(s)>-1&&r!==null&&(e[s]=r)}return e};var P={nodes:{horizontal_rule:()=>({singleTag:"hr"}),blockquote:()=>({tag:"blockquote"}),bullet_list:()=>({tag:"ul"}),code_block:a=>({tag:["pre",{tag:"code",attrs:a.attrs}]}),hard_break:()=>({singleTag:"br"}),heading:a=>({tag:`h${a.attrs.level}`}),image:a=>({singleTag:[{tag:"img",attrs:$(a.attrs,["src","alt","title"])}]}),list_item:()=>({tag:"li"}),ordered_list:()=>({tag:"ol"}),paragraph:()=>({tag:"p"})},marks:{bold:()=>({tag:"b"}),strike:()=>({tag:"strike"}),underline:()=>({tag:"u"}),strong:()=>({tag:"strong"}),code:()=>({tag:"code"}),italic:()=>({tag:"i"}),link(a){const t={...a.attrs},{linktype:e="url"}=a.attrs;return e==="email"&&(t.href=`mailto:${t.href}`),t.anchor&&(t.href=`${t.href}#${t.anchor}`,delete t.anchor),{tag:[{tag:"a",attrs:t}]}},styled:a=>({tag:[{tag:"span",attrs:a.attrs}]})}};class w{constructor(t){t||(t=P),this.marks=t.marks||[],this.nodes=t.nodes||[]}addNode(t,e){this.nodes[t]=e}addMark(t,e){this.marks[t]=e}render(t={}){if(t.content&&Array.isArray(t.content)){let e="";return t.content.forEach(s=>{e+=this.renderNode(s)}),e}return console.warn("The render method must receive an object with a content field, which is an array"),""}renderNode(t){let e=[];t.marks&&t.marks.forEach(r=>{const n=this.getMatchingMark(r);n&&e.push(this.renderOpeningTag(n.tag))});const s=this.getMatchingNode(t);return s&&s.tag&&e.push(this.renderOpeningTag(s.tag)),t.content?t.content.forEach(r=>{e.push(this.renderNode(r))}):t.text?e.push(function(r){const n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},o=/[&<>"']/g,i=RegExp(o.source);return r&&i.test(r)?r.replace(o,c=>n[c]):r}(t.text)):s&&s.singleTag?e.push(this.renderTag(s.singleTag," /")):s&&s.html&&e.push(s.html),s&&s.tag&&e.push(this.renderClosingTag(s.tag)),t.marks&&t.marks.slice(0).reverse().forEach(r=>{const n=this.getMatchingMark(r);n&&e.push(this.renderClosingTag(n.tag))}),e.join("")}renderTag(t,e){return t.constructor===String?`<${t}${e}>`:t.map(s=>{if(s.constructor===String)return`<${s}${e}>`;{let r=`<${s.tag}`;if(s.attrs)for(let n in s.attrs){let o=s.attrs[n];o!==null&&(r+=` ${n}="${o}"`)}return`${r}${e}>`}}).join("")}renderOpeningTag(t){return this.renderTag(t,"")}renderClosingTag(t){return t.constructor===String?`</${t}>`:t.slice(0).reverse().map(e=>e.constructor===String?`</${e}>`:`</${e.tag}>`).join("")}getMatchingNode(t){if(typeof this.nodes[t.type]=="function")return this.nodes[t.type](t)}getMatchingMark(t){if(typeof this.marks[t.type]=="function")return this.marks[t.type](t)}}const C=(a=0,t=a)=>{const e=Math.abs(t-a)||0,s=a<t?1:-1;return((r=0,n)=>[...Array(r)].map(n))(e,(r,n)=>n*s+a)},k=(a,t,e)=>{const s=[];for(const r in a){if(!Object.prototype.hasOwnProperty.call(a,r))continue;const n=a[r],o=e?"":encodeURIComponent(r);let i;i=typeof n=="object"?k(n,t?t+encodeURIComponent("["+o+"]"):o,Array.isArray(n)):(t?t+encodeURIComponent("["+o+"]"):o)+"="+encodeURIComponent(n),s.push(i)}return s.join("&")};let y={},g={};class E{constructor(t,e){if(!e){let n=t.region?`-${t.region}`:"",o=t.https===!1?"http":"https";e=t.oauthToken===void 0?`${o}://api${n}.storyblok.com/v2`:`${o}://api${n}.storyblok.com/v1`}let s=Object.assign({},t.headers),r=5;t.oauthToken!==void 0&&(s.Authorization=t.oauthToken,r=3),t.rateLimit!==void 0&&(r=t.rateLimit),this.richTextResolver=new w(t.richTextSchema),typeof t.componentResolver=="function"&&this.setComponentResolver(t.componentResolver),this.maxRetries=t.maxRetries||5,this.throttle=T(this.throttledRequest,r,1e3),this.accessToken=t.accessToken,this.relations={},this.links={},this.cache=t.cache||{clear:"manual"},this.client=b.create({baseURL:e,timeout:t.timeout||0,headers:s,proxy:t.proxy||!1}),t.responseInterceptor&&this.client.interceptors.response.use(n=>t.responseInterceptor(n)),this.resolveNestedRelations=t.resolveNestedRelations||!0}setComponentResolver(t){this.richTextResolver.addNode("blok",e=>{let s="";return e.attrs.body.forEach(r=>{s+=t(r.component,r)}),{html:s}})}parseParams(t={}){return t.version||(t.version="published"),t.token||(t.token=this.getToken()),t.cv||(t.cv=g[t.token]),Array.isArray(t.resolve_relations)&&(t.resolve_relations=t.resolve_relations.join(",")),t}factoryParamOptions(t,e={}){return((s="")=>s.indexOf("/cdn/")>-1)(t)?this.parseParams(e):e}makeRequest(t,e,s,r){const n=this.factoryParamOptions(t,((o={},i=25,c=1)=>({...o,per_page:i,page:c}))(e,s,r));return this.cacheResponse(t,n)}get(t,e){let s=`/${t}`;const r=this.factoryParamOptions(s,e);return this.cacheResponse(s,r)}async getAll(t,e={},s){const r=e.per_page||25,n=`/${t}`,o=n.split("/");s=s||o[o.length-1];const i=await this.makeRequest(n,e,r,1),c=i.total?Math.ceil(i.total/r):1;return((l=[],h)=>l.map(h).reduce((m,_)=>[...m,..._],[]))([i,...await(async(l=[],h)=>Promise.all(l.map(h)))(C(1,c),async l=>this.makeRequest(n,e,r,l+1))],l=>Object.values(l.data[s]))}post(t,e){let s=`/${t}`;return this.throttle("post",s,e)}put(t,e){let s=`/${t}`;return this.throttle("put",s,e)}delete(t,e){let s=`/${t}`;return this.throttle("delete",s,e)}getStories(t){return this.get("cdn/stories",t)}getStory(t,e){return this.get(`cdn/stories/${t}`,e)}setToken(t){this.accessToken=t}getToken(){return this.accessToken}_cleanCopy(t){return JSON.parse(JSON.stringify(t))}_insertLinks(t,e){const s=t[e];s&&s.fieldtype=="multilink"&&s.linktype=="story"&&typeof s.id=="string"&&this.links[s.id]?s.story=this._cleanCopy(this.links[s.id]):s&&s.linktype==="story"&&typeof s.uuid=="string"&&this.links[s.uuid]&&(s.story=this._cleanCopy(this.links[s.uuid]))}_insertRelations(t,e,s){if(s.indexOf(t.component+"."+e)>-1){if(typeof t[e]=="string")this.relations[t[e]]&&(t[e]=this._cleanCopy(this.relations[t[e]]));else if(t[e].constructor===Array){let r=[];t[e].forEach(n=>{this.relations[n]&&r.push(this._cleanCopy(this.relations[n]))}),t[e]=r}}}_insertAssetsRelations(t,e){e.forEach(s=>{t.id===s.id&&(t.original=s,t.original.filename=t.filename,t.original.filename=t.original.filename.includes("https://s3.amazonaws.com/")?t.original.filename:t.original.filename.replace("https://","https://s3.amazonaws.com/"),delete t.original.s3_filename)})}iterateTree(t,e){let s=r=>{if(r!=null){if(r.constructor===Array)for(let n=0;n<r.length;n++)s(r[n]);else if(r.constructor===Object){if(r._stopResolving)return;for(let n in r)r.component&&r._uid||r.type==="link"?(this._insertRelations(r,n,e),this._insertLinks(r,n)):"id"in r&&r.fieldtype==="asset"&&this._insertAssetsRelations(r,e),s(r[n])}}};s(t.content)}async resolveLinks(t,e){let s=[];if(t.link_uuids){const r=t.link_uuids.length;let n=[];const o=50;for(let i=0;i<r;i+=o){const c=Math.min(r,i+o);n.push(t.link_uuids.slice(i,c))}for(let i=0;i<n.length;i++)(await this.getStories({per_page:o,language:e.language,version:e.version,by_uuids:n[i].join(",")})).data.stories.forEach(c=>{s.push(c)})}else s=t.links;s.forEach(r=>{this.links[r.uuid]={...r,_stopResolving:!0}})}async resolveRelations(t,e){let s=[];if(t.rel_uuids){const r=t.rel_uuids.length;let n=[];const o=50;for(let i=0;i<r;i+=o){const c=Math.min(r,i+o);n.push(t.rel_uuids.slice(i,c))}for(let i=0;i<n.length;i++)(await this.getStories({per_page:o,language:e.language,version:e.version,by_uuids:n[i].join(",")})).data.stories.forEach(c=>{s.push(c)})}else s=t.rels;s.forEach(r=>{this.relations[r.uuid]={...r,_stopResolving:!0}})}async resolveStories(t,e){let s=[];if(e.resolve_relations!==void 0&&e.resolve_relations.length>0&&(t.rels||t.rel_uuids)&&(s=e.resolve_relations.split(","),await this.resolveRelations(t,e)),["1","story","url"].indexOf(e.resolve_links)>-1&&(t.links||t.link_uuids)&&await this.resolveLinks(t,e),this.resolveNestedRelations)for(const r in this.relations)this.iterateTree(this.relations[r],s);t.story?this.iterateTree(t.story,s):t.stories.forEach(r=>{this.iterateTree(r,s)})}resolveAssetsRelations(t){const{assets:e,stories:s,story:r}=t;if(s)for(const n of s)this.iterateTree(n,e);else{if(!r)return t;this.iterateTree(r,e)}}cacheResponse(t,e,s){return s===void 0&&(s=0),new Promise(async(r,n)=>{let o=k({url:t,params:e}),i=this.cacheProvider();if(this.cache.clear==="auto"&&e.version==="draft"&&await this.flushCache(),e.version==="published"&&t!="/cdn/spaces/me"){const l=await i.get(o);if(l)return r(l)}try{let l=await this.throttle("get",t,{params:e,paramsSerializer:m=>k(m)}),h={data:l.data,headers:l.headers};if(h.data.assets&&h.data.assets.length&&this.resolveAssetsRelations(h.data),h=Object.assign({},h,{perPage:l.headers["per-page"]?parseInt(l.headers["per-page"]):0,total:l.headers["per-page"]?parseInt(l.headers.total):0}),l.status!=200)return n(l);(h.data.story||h.data.stories)&&await this.resolveStories(h.data,e),e.version==="published"&&t!="/cdn/spaces/me"&&i.set(o,h),h.data.cv&&(e.version=="draft"&&g[e.token]!=h.data.cv&&this.flushCache(),g[e.token]=h.data.cv),r(h)}catch(l){if(l.response&&l.response.status===429&&(s+=1)<this.maxRetries)return console.log(`Hit rate limit. Retrying in ${s} seconds.`),await(c=1e3*s,new Promise(h=>setTimeout(h,c))),this.cacheResponse(t,e,s).then(r).catch(n);n(l)}var c})}throttledRequest(t,e,s){return this.client[t](e,s)}cacheVersions(){return g}cacheVersion(){return g[this.accessToken]}setCacheVersion(t){this.accessToken&&(g[this.accessToken]=t)}cacheProvider(){return this.cache.type==="memory"?{get:t=>y[t],getAll:()=>y,set(t,e){y[t]=e},flush(){y={}}}:{get(){},getAll(){},set(){},flush(){}}}async flushCache(){return await this.cacheProvider().flush(),this}}const A=()=>({env:"dev",token:"sOeIVZFu1rwLtcR4iPrdzwtt"}),{env:u,token:R}=A(),p=u==="prod"?"published":"draft",d={cv:`cdn/spaces/me?token=${R}`,homePageMainPageLayout:`cdn/stories/home-page/${u}/main-page-layout`,moneyPageMainPageLayout:`cdn/stories/money-page/${u}/money-page-layout`,getArticleDetails:"cdn/stories",getSignUpPageData:`cdn/stories/sign-up-page/${u}`,getReferralPageContent:`cdn/stories/referral-page/${u}/referral-page-content`,getBannerContent:`cdn/stories/banner/${u}/content`},f=new E({accessToken:R}),M=async()=>f.get(d.homePageMainPageLayout,{version:p}),O=async a=>f.get(`${d.getArticleDetails}/${a}`,{version:p}),S=async()=>f.get(d.moneyPageMainPageLayout,{version:p}),j=async a=>f.get(`${d.getSignUpPageData}/${a}`,{version:p}),L=async()=>f.get(`${d.getReferralPageContent}`,{version:p}),N=async()=>f.get(`${d.getBannerContent}`,{version:p});export{M as a,L as b,N as c,j as d,S as e,O as g};
//# sourceMappingURL=storyblok-c16fb040.js.map