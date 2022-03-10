export default(async()=>{function t(){}function n(t,n){for(const e in n)t[e]=n[e];return t}function e(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(e)}function c(t){return"function"==typeof t}function i(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function s(n,...e){if(null==n)return t;const o=n.subscribe(...e);return o.unsubscribe?()=>o.unsubscribe():o}function u(t,n,e){t.$$.on_destroy.push(s(n,e))}function l(t,n,e,o){if(t){const r=a(t,n,e,o);return t[0](r)}}function a(t,e,o,r){return t[1]&&r?n(o.ctx.slice(),t[1](r(e))):o.ctx}function f(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(void 0===n.dirty)return r;if("object"==typeof r){const t=[],e=Math.max(n.dirty.length,r.length);for(let o=0;o<e;o+=1)t[o]=n.dirty[o]|r[o];return t}return n.dirty|r}return n.dirty}function d(t,n,e,o,r,c){if(r){const i=a(n,e,o,c);t.p(i,r)}}function p(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let t=0;t<e;t++)n[t]=-1;return n}return-1}function $(t){const n={};for(const e in t)"$"!==e[0]&&(n[e]=t[e]);return n}function h(t,n){const e={};n=new Set(n);for(const o in t)n.has(o)||"$"===o[0]||(e[o]=t[o]);return e}let m,g=!1;function _(t,n,e,o){for(;t<n;){const r=t+(n-t>>1);e(r)<=o?t=r+1:n=r}return t}function y(t,n){if(g){for(function(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if("HEAD"===t.nodeName){const t=[];for(let e=0;e<n.length;e++){const o=n[e];void 0!==o.claim_order&&t.push(o)}n=t}const e=new Int32Array(n.length+1),o=new Int32Array(n.length);e[0]=-1;let r=0;for(let t=0;t<n.length;t++){const c=n[t].claim_order,i=(r>0&&n[e[r]].claim_order<=c?r+1:_(1,r,(t=>n[e[t]].claim_order),c))-1;o[t]=e[i]+1;const s=i+1;e[s]=t,r=Math.max(s,r)}const c=[],i=[];let s=n.length-1;for(let t=e[r]+1;0!=t;t=o[t-1]){for(c.push(n[t-1]);s>=t;s--)i.push(n[s]);s--}for(;s>=0;s--)i.push(n[s]);c.reverse(),i.sort(((t,n)=>t.claim_order-n.claim_order));for(let n=0,e=0;n<i.length;n++){for(;e<c.length&&i[n].claim_order>=c[e].claim_order;)e++;const o=e<c.length?c[e]:null;t.insertBefore(i[n],o)}}(t),(void 0===t.actual_end_child||null!==t.actual_end_child&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);null!==t.actual_end_child&&void 0===t.actual_end_child.claim_order;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?void 0===n.claim_order&&n.parentNode===t||t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else n.parentNode===t&&null===n.nextSibling||t.appendChild(n)}function b(t,n,e){g&&!e?y(t,n):n.parentNode===t&&n.nextSibling==e||t.insertBefore(n,e||null)}function x(t){t.parentNode.removeChild(t)}function v(t){return document.createElement(t)}function w(t){return document.createTextNode(t)}function E(){return w(" ")}function k(){return w("")}function N(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function S(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function A(t,n){const e=Object.getOwnPropertyDescriptors(t.__proto__);for(const o in n)null==n[o]?t.removeAttribute(o):"style"===o?t.style.cssText=n[o]:"__value"===o?t.value=t[o]=n[o]:e[o]&&e[o].set?t[o]=n[o]:S(t,o,n[o])}function P(t){return Array.from(t.childNodes)}function R(t,n,e,o,r=!1){!function(t){void 0===t.claim_info&&(t.claim_info={last_index:0,total_claimed:0})}(t);const c=(()=>{for(let o=t.claim_info.last_index;o<t.length;o++){const c=t[o];if(n(c)){const n=e(c);return void 0===n?t.splice(o,1):t[o]=n,r||(t.claim_info.last_index=o),c}}for(let o=t.claim_info.last_index-1;o>=0;o--){const c=t[o];if(n(c)){const n=e(c);return void 0===n?t.splice(o,1):t[o]=n,r?void 0===n&&t.claim_info.last_index--:t.claim_info.last_index=o,c}}return o()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function j(t,n,e){return function(t,n,e,o){return R(t,(t=>t.nodeName===n),(t=>{const n=[];for(let o=0;o<t.attributes.length;o++){const r=t.attributes[o];e[r.name]||n.push(r.name)}n.forEach((n=>t.removeAttribute(n)))}),(()=>o(n)))}(t,n,e,v)}function C(t,n){return R(t,(t=>3===t.nodeType),(t=>{const e=""+n;if(t.data.startsWith(e)){if(t.data.length!==e.length)return t.splitText(e.length)}else t.data=e}),(()=>w(n)),!0)}function O(t){return C(t," ")}function B(t){m=t}function T(){if(!m)throw new Error("Function called outside component initialization");return m}function D(t,n){T().$$.context.set(t,n)}function L(t){return T().$$.context.get(t)}const I=[],K=[],H=[],U=[],z=Promise.resolve();let G=!1;function M(t){H.push(t)}const Y=new Set;let q=0;function V(){const t=m;do{for(;q<I.length;){const t=I[q];q++,B(t),F(t.$$)}for(B(null),I.length=0,q=0;K.length;)K.pop()();for(let t=0;t<H.length;t+=1){const n=H[t];Y.has(n)||(Y.add(n),n())}H.length=0}while(I.length);for(;U.length;)U.pop()();G=!1,Y.clear(),B(t)}function F(t){if(null!==t.fragment){t.update(),r(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(M)}}const J=new Set;let W;function Q(){W={r:0,c:[],p:W}}function X(){W.r||r(W.c),W=W.p}function Z(t,n){t&&t.i&&(J.delete(t),t.i(n))}function tt(t,n,e,o){if(t&&t.o){if(J.has(t))return;J.add(t),W.c.push((()=>{J.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function nt(t,n){const e={},o={},r={$$scope:1};let c=t.length;for(;c--;){const i=t[c],s=n[c];if(s){for(const t in i)t in s||(o[t]=1);for(const t in s)r[t]||(e[t]=s[t],r[t]=1);t[c]=s}else for(const t in i)r[t]=1}for(const t in o)t in e||(e[t]=void 0);return e}function et(t){return"object"==typeof t&&null!==t?t:{}}function ot(t){t&&t.c()}function rt(t,n){t&&t.l(n)}function ct(t,n,o,i){const{fragment:s,on_mount:u,on_destroy:l,after_update:a}=t.$$;s&&s.m(n,o),i||M((()=>{const n=u.map(e).filter(c);l?l.push(...n):r(n),t.$$.on_mount=[]})),a.forEach(M)}function it(t,n){const e=t.$$;null!==e.fragment&&(r(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function st(n,e,c,i,s,u,l,a=[-1]){const f=m;B(n);const d=n.$$={fragment:null,ctx:null,props:u,update:t,not_equal:s,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(f?f.$$.context:[])),callbacks:o(),dirty:a,skip_bound:!1,root:e.target||f.$$.root};l&&l(d.root);let p=!1;if(d.ctx=c?c(n,e.props||{},((t,e,...o)=>{const r=o.length?o[0]:e;return d.ctx&&s(d.ctx[t],d.ctx[t]=r)&&(!d.skip_bound&&d.bound[t]&&d.bound[t](r),p&&function(t,n){-1===t.$$.dirty[0]&&(I.push(t),G||(G=!0,z.then(V)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}(n,t)),e})):[],d.update(),p=!0,r(d.before_update),d.fragment=!!i&&i(d.ctx),e.target){if(e.hydrate){g=!0;const t=P(e.target);d.fragment&&d.fragment.l(t),t.forEach(x)}else d.fragment&&d.fragment.c();e.intro&&Z(n.$$.fragment),ct(n,e.target,e.anchor,e.customElement),g=!1,V()}B(f)}class ut{$destroy(){it(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const lt=/^:(.+)/;function at(t,n){return t.substr(0,n.length)===n}function ft(t){return"*"===t[0]}function dt(t){return t.replace(/(^\/+|\/+$)/g,"").split("/")}function pt(t){return t.replace(/(^\/+|\/+$)/g,"")}function $t(t,n){return{route:t,score:t.default?0:dt(t.path).reduce(((t,n)=>(t+=4,function(t){return""===t}(n)?t+=1:function(t){return lt.test(t)}(n)?t+=2:ft(n)?t-=5:t+=3,t)),0),index:n}}function ht(t,n){let e,o;const[r]=n.split("?"),c=dt(r),i=""===c[0],s=function(t){return t.map($t).sort(((t,n)=>t.score<n.score?1:t.score>n.score?-1:t.index-n.index))}(t);for(let t=0,r=s.length;t<r;t++){const r=s[t].route;let u=!1;if(r.default){o={route:r,params:{},uri:n};continue}const l=dt(r.path),a={},f=Math.max(c.length,l.length);let d=0;for(;d<f;d++){const t=l[d],n=c[d];if(void 0!==t&&ft(t)){a["*"===t?"*":t.slice(1)]=c.slice(d).map(decodeURIComponent).join("/");break}if(void 0===n){u=!0;break}let e=lt.exec(t);if(e&&!i){const t=decodeURIComponent(n);a[e[1]]=t}else if(t!==n){u=!0;break}}if(!u){e={route:r,params:a,uri:"/"+c.slice(0,d).join("/")};break}}return e||o||null}function mt(t,n){return t+(n?`?${n}`:"")}function gt(t,n){return`${pt("/"===n?t:`${pt(t)}/${pt(n)}`)}/`}const _t=[];function yt(n,e=t){let o;const r=new Set;function c(t){if(i(n,t)&&(n=t,o)){const t=!_t.length;for(const t of r)t[1](),_t.push(t,n);if(t){for(let t=0;t<_t.length;t+=2)_t[t][0](_t[t+1]);_t.length=0}}}return{set:c,update:function(t){c(t(n))},subscribe:function(i,s=t){const u=[i,s];return r.add(u),1===r.size&&(o=e(c)||t),i(n),()=>{r.delete(u),0===r.size&&(o(),o=null)}}}}function bt(n,e,o){const i=!Array.isArray(n),u=i?[n]:n,l=e.length<2;return{subscribe:yt(o,(n=>{let o=!1;const a=[];let f=0,d=t;const p=()=>{if(f)return;d();const o=e(i?a[0]:a,n);l?n(o):d=c(o)?o:t},$=u.map(((t,n)=>s(t,(t=>{a[n]=t,f&=~(1<<n),o&&p()}),(()=>{f|=1<<n}))));return o=!0,p(),function(){r($),d()}})).subscribe}}const xt={},vt={};function wt(t){return{...t.location,state:t.history.state,key:t.history.state&&t.history.state.key||"initial"}}const Et=function(t,n){const e=[];let o=wt(t);return{get location(){return o},listen(n){e.push(n);const r=()=>{o=wt(t),n({location:o,action:"POP"})};return t.addEventListener("popstate",r),()=>{t.removeEventListener("popstate",r);const o=e.indexOf(n);e.splice(o,1)}},navigate(n,{state:r,replace:c=!1}={}){r={...r,key:Date.now()+""};try{c?t.history.replaceState(r,null,n):t.history.pushState(r,null,n)}catch(e){t.location[c?"replace":"assign"](n)}o=wt(t),e.forEach((t=>t({location:o,action:"PUSH"})))}}}(Boolean("undefined"!=typeof window&&window.document&&window.document.createElement)?window:function(t="/"){let n=0;const e=[{pathname:t,search:""}],o=[];return{get location(){return e[n]},addEventListener(t,n){},removeEventListener(t,n){},history:{get entries(){return e},get index(){return n},get state(){return o[n]},pushState(t,r,c){const[i,s=""]=c.split("?");n++,e.push({pathname:i,search:s}),o.push(t)},replaceState(t,r,c){const[i,s=""]=c.split("?");e[n]={pathname:i,search:s},o[n]=t}}}}()),{navigate:kt}=Et;function Nt(t){let n;const e=t[9].default,o=l(e,t,t[8],null);return{c(){o&&o.c()},l(t){o&&o.l(t)},m(t,e){o&&o.m(t,e),n=!0},p(t,[r]){o&&o.p&&(!n||256&r)&&d(o,e,t,t[8],n?f(e,t[8],r,null):p(t[8]),null)},i(t){n||(Z(o,t),n=!0)},o(t){tt(o,t),n=!1},d(t){o&&o.d(t)}}}function St(t,n,e){let o,r,c,{$$slots:i={},$$scope:s}=n,{basepath:l="/"}=n,{url:a=null}=n;const f=L(xt),d=L(vt),p=yt([]);u(t,p,(t=>e(6,r=t)));const $=yt(null);let h=!1;const m=f||yt(a?{pathname:a}:Et.location);u(t,m,(t=>e(5,o=t)));const g=d?d.routerBase:yt({path:l,uri:l});u(t,g,(t=>e(7,c=t)));const _=bt([g,$],(([t,n])=>{if(null===n)return t;const{path:e}=t,{route:o,uri:r}=n;return{path:o.default?e:o.path.replace(/\*.*$/,""),uri:r}}));var y;return f||(y=()=>Et.listen((t=>{m.set(t.location)})),T().$$.on_mount.push(y),D(xt,m)),D(vt,{activeRoute:$,base:g,routerBase:_,registerRoute:function(t){const{path:n}=c;let{path:e}=t;if(t._path=e,t.path=gt(n,e),"undefined"==typeof window){if(h)return;const n=function(t,n){return ht([t],n)}(t,o.pathname);n&&($.set(n),h=!0)}else p.update((n=>(n.push(t),n)))},unregisterRoute:function(t){p.update((n=>{const e=n.indexOf(t);return n.splice(e,1),n}))}}),t.$$set=t=>{"basepath"in t&&e(3,l=t.basepath),"url"in t&&e(4,a=t.url),"$$scope"in t&&e(8,s=t.$$scope)},t.$$.update=()=>{if(128&t.$$.dirty){const{path:t}=c;p.update((n=>(n.forEach((n=>n.path=gt(t,n._path))),n)))}if(96&t.$$.dirty){const t=ht(r,o.pathname);$.set(t)}},[p,m,g,l,a,o,r,c,s,i]}class At extends ut{constructor(t){super(),st(this,t,St,Nt,i,{basepath:3,url:4})}}const Pt=t=>({params:4&t,location:16&t}),Rt=t=>({params:t[2],location:t[4]});function jt(t){let n,e,o,r;const c=[Ot,Ct],i=[];function s(t,n){return null!==t[0]?0:1}return n=s(t),e=i[n]=c[n](t),{c(){e.c(),o=k()},l(t){e.l(t),o=k()},m(t,e){i[n].m(t,e),b(t,o,e),r=!0},p(t,r){let u=n;n=s(t),n===u?i[n].p(t,r):(Q(),tt(i[u],1,1,(()=>{i[u]=null})),X(),e=i[n],e?e.p(t,r):(e=i[n]=c[n](t),e.c()),Z(e,1),e.m(o.parentNode,o))},i(t){r||(Z(e),r=!0)},o(t){tt(e),r=!1},d(t){i[n].d(t),t&&x(o)}}}function Ct(t){let n;const e=t[10].default,o=l(e,t,t[9],Rt);return{c(){o&&o.c()},l(t){o&&o.l(t)},m(t,e){o&&o.m(t,e),n=!0},p(t,r){o&&o.p&&(!n||532&r)&&d(o,e,t,t[9],n?f(e,t[9],r,Pt):p(t[9]),Rt)},i(t){n||(Z(o,t),n=!0)},o(t){tt(o,t),n=!1},d(t){o&&o.d(t)}}}function Ot(t){let e,o,r;const c=[{location:t[4]},t[2],t[3]];var i=t[0];function s(t){let e={};for(let t=0;t<c.length;t+=1)e=n(e,c[t]);return{props:e}}return i&&(e=new i(s())),{c(){e&&ot(e.$$.fragment),o=k()},l(t){e&&rt(e.$$.fragment,t),o=k()},m(t,n){e&&ct(e,t,n),b(t,o,n),r=!0},p(t,n){const r=28&n?nt(c,[16&n&&{location:t[4]},4&n&&et(t[2]),8&n&&et(t[3])]):{};if(i!==(i=t[0])){if(e){Q();const t=e;tt(t.$$.fragment,1,0,(()=>{it(t,1)})),X()}i?(e=new i(s()),ot(e.$$.fragment),Z(e.$$.fragment,1),ct(e,o.parentNode,o)):e=null}else i&&e.$set(r)},i(t){r||(e&&Z(e.$$.fragment,t),r=!0)},o(t){e&&tt(e.$$.fragment,t),r=!1},d(t){t&&x(o),e&&it(e,t)}}}function Bt(t){let n,e,o=null!==t[1]&&t[1].route===t[7]&&jt(t);return{c(){o&&o.c(),n=k()},l(t){o&&o.l(t),n=k()},m(t,r){o&&o.m(t,r),b(t,n,r),e=!0},p(t,[e]){null!==t[1]&&t[1].route===t[7]?o?(o.p(t,e),2&e&&Z(o,1)):(o=jt(t),o.c(),Z(o,1),o.m(n.parentNode,n)):o&&(Q(),tt(o,1,1,(()=>{o=null})),X())},i(t){e||(Z(o),e=!0)},o(t){tt(o),e=!1},d(t){o&&o.d(t),t&&x(n)}}}function Tt(t,e,o){let r,c,{$$slots:i={},$$scope:s}=e,{path:l=""}=e,{component:a=null}=e;const{registerRoute:f,unregisterRoute:d,activeRoute:p}=L(vt);u(t,p,(t=>o(1,r=t)));const h=L(xt);u(t,h,(t=>o(4,c=t)));const m={path:l,default:""===l};let g={},_={};var y;return f(m),"undefined"!=typeof window&&(y=()=>{d(m)},T().$$.on_destroy.push(y)),t.$$set=t=>{o(13,e=n(n({},e),$(t))),"path"in t&&o(8,l=t.path),"component"in t&&o(0,a=t.component),"$$scope"in t&&o(9,s=t.$$scope)},t.$$.update=()=>{2&t.$$.dirty&&r&&r.route===m&&o(2,g=r.params);{const{path:t,component:n,...r}=e;o(3,_=r)}},e=$(e),[a,r,g,_,c,p,h,m,l,s,i]}class Dt extends ut{constructor(t){super(),st(this,t,Tt,Bt,i,{path:8,component:0})}}function Lt(t){let e,o,r,c;const i=t[16].default,s=l(i,t,t[15],null);let u=[{href:t[0]},{"aria-current":t[2]},t[1],t[6]],a={};for(let t=0;t<u.length;t+=1)a=n(a,u[t]);return{c(){e=v("a"),s&&s.c(),this.h()},l(t){e=j(t,"A",{href:!0,"aria-current":!0});var n=P(e);s&&s.l(n),n.forEach(x),this.h()},h(){A(e,a)},m(n,i){b(n,e,i),s&&s.m(e,null),o=!0,r||(c=N(e,"click",t[5]),r=!0)},p(t,[n]){s&&s.p&&(!o||32768&n)&&d(s,i,t,t[15],o?f(i,t[15],n,null):p(t[15]),null),A(e,a=nt(u,[(!o||1&n)&&{href:t[0]},(!o||4&n)&&{"aria-current":t[2]},2&n&&t[1],64&n&&t[6]]))},i(t){o||(Z(s,t),o=!0)},o(t){tt(s,t),o=!1},d(t){t&&x(e),s&&s.d(t),r=!1,c()}}}function It(t,e,o){let r;const c=["to","replace","state","getProps"];let i,s,l=h(e,c),{$$slots:a={},$$scope:f}=e,{to:d="#"}=e,{replace:p=!1}=e,{state:m={}}=e,{getProps:g=(()=>({}))}=e;const{base:_}=L(vt);u(t,_,(t=>o(14,s=t)));const y=L(xt);u(t,y,(t=>o(13,i=t)));const b=function(){const t=T();return(n,e)=>{const o=t.$$.callbacks[n];if(o){const r=function(t,n,e=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,e,!1,n),o}(n,e);o.slice().forEach((n=>{n.call(t,r)}))}}}();let x,v,w,E;return t.$$set=t=>{e=n(n({},e),$(t)),o(6,l=h(e,c)),"to"in t&&o(7,d=t.to),"replace"in t&&o(8,p=t.replace),"state"in t&&o(9,m=t.state),"getProps"in t&&o(10,g=t.getProps),"$$scope"in t&&o(15,f=t.$$scope)},t.$$.update=()=>{16512&t.$$.dirty&&o(0,x="/"===d?s.uri:function(t,n){if(at(t,"/"))return t;const[e,o]=t.split("?"),[r]=n.split("?"),c=dt(e),i=dt(r);if(""===c[0])return mt(r,o);if(!at(c[0],"."))return mt(("/"===r?"":"/")+i.concat(c).join("/"),o);const s=i.concat(c),u=[];return s.forEach((t=>{".."===t?u.pop():"."!==t&&u.push(t)})),mt("/"+u.join("/"),o)}(d,s.uri)),8193&t.$$.dirty&&o(11,v=at(i.pathname,x)),8193&t.$$.dirty&&o(12,w=x===i.pathname),4096&t.$$.dirty&&o(2,r=w?"page":void 0),15361&t.$$.dirty&&o(1,E=g({location:i,href:x,isPartiallyCurrent:v,isCurrent:w}))},[x,E,r,_,y,function(t){if(b("click",t),function(t){return!t.defaultPrevented&&0===t.button&&!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}(t)){t.preventDefault();const n=i.pathname===x||p;kt(x,{state:m,replace:n})}},l,d,p,m,g,v,w,i,s,f,a]}class Kt extends ut{constructor(t){super(),st(this,t,It,Lt,i,{to:7,replace:8,state:9,getProps:10})}}function Ht(t){!function(t,n,e){const o=function(t){if(!t)return document;const n=t.getRootNode?t.getRootNode():t.ownerDocument;return n&&n.host?n:t.ownerDocument}(t);if(!o.getElementById(n)){const t=v("style");t.id=n,t.textContent=e,function(t,n){!function(t,n){t.appendChild(n)}(t.head||t,n)}(o,t)}}(t,"svelte-1cxhk4e","h1.svelte-1cxhk4e{color:#ff3e00;text-transform:uppercase;font-size:4em;font-weight:100}")}function Ut(n){let e,o,r,c,i;return{c(){e=v("h1"),o=v("a"),r=w("Get Youtube Key!"),c=E(),i=v("link"),this.h()},l(t){e=j(t,"H1",{class:!0});var n=P(e);o=j(n,"A",{href:!0});var s=P(o);r=C(s,"Get Youtube Key!"),s.forEach(x),n.forEach(x),c=O(t),i=j(t,"LINK",{href:!0,rel:!0}),this.h()},h(){S(o,"href","https://localhost:3000/api/v1/youtube/login"),S(e,"class","svelte-1cxhk4e"),S(i,"href","https://fonts.googleapis.com/css?family=Overpass:100,400"),S(i,"rel","stylesheet")},m(t,n){b(t,e,n),y(e,o),y(o,r),b(t,c,n),b(t,i,n)},p:t,i:t,o:t,d(t){t&&x(e),t&&x(c),t&&x(i)}}}class zt extends ut{constructor(t){super(),st(this,t,null,Ut,i,{},Ht)}}function Gt(n){let e,o,r,c,i,s,u,l,a,f,d,p,$;return{c(){e=v("h1"),o=w("Text"),r=E(),c=v("br"),i=E(),s=v("button"),u=w("Get my channel information"),l=E(),a=v("br"),f=E(),d=w(n[0])},l(t){e=j(t,"H1",{});var p=P(e);o=C(p,"Text"),p.forEach(x),r=O(t),c=j(t,"BR",{}),i=O(t),s=j(t,"BUTTON",{});var $=P(s);u=C($,"Get my channel information"),$.forEach(x),l=O(t),a=j(t,"BR",{}),f=O(t),d=C(t,n[0])},m(t,h){b(t,e,h),y(e,o),b(t,r,h),b(t,c,h),b(t,i,h),b(t,s,h),y(s,u),b(t,l,h),b(t,a,h),b(t,f,h),b(t,d,h),p||($=N(s,"click",n[1]),p=!0)},p(t,[n]){var e,o;1&n&&(e=d,o=""+(o=t[0]),e.wholeText!==o&&(e.data=o))},i:t,o:t,d(t){t&&x(e),t&&x(r),t&&x(c),t&&x(i),t&&x(s),t&&x(l),t&&x(a),t&&x(f),t&&x(d),p=!1,$()}}}function Mt(t,n,e){const o=new URLSearchParams(window.location.search).get("token");let r="";return[r,async function(){const t=await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&access_token=${o}`),n=await t.json();console.log(n),e(0,r=JSON.stringify(n.items[0]))}]}class Yt extends ut{constructor(t){super(),st(this,t,Mt,Gt,i,{})}}function qt(t){let n;return{c(){n=w("Home")},l(t){n=C(t,"Home")},m(t,e){b(t,n,e)},d(t){t&&x(n)}}}function Vt(t){let n;return{c(){n=w("Youtube")},l(t){n=C(t,"Youtube")},m(t,e){b(t,n,e)},d(t){t&&x(n)}}}function Ft(t){let n,e;return n=new zt({}),{c(){ot(n.$$.fragment)},l(t){rt(n.$$.fragment,t)},m(t,o){ct(n,t,o),e=!0},i(t){e||(Z(n.$$.fragment,t),e=!0)},o(t){tt(n.$$.fragment,t),e=!1},d(t){it(n,t)}}}function Jt(t){let n,e,o,r,c,i,s,u,l,a;return e=new Kt({props:{to:"/",$$slots:{default:[qt]},$$scope:{ctx:t}}}),r=new Kt({props:{to:"youtube",$$slots:{default:[Vt]},$$scope:{ctx:t}}}),s=new Dt({props:{path:"youtube",component:Yt}}),l=new Dt({props:{path:"/",$$slots:{default:[Ft]},$$scope:{ctx:t}}}),{c(){n=v("nav"),ot(e.$$.fragment),o=E(),ot(r.$$.fragment),c=E(),i=v("div"),ot(s.$$.fragment),u=E(),ot(l.$$.fragment)},l(t){n=j(t,"NAV",{});var a=P(n);rt(e.$$.fragment,a),o=O(a),rt(r.$$.fragment,a),a.forEach(x),c=O(t),i=j(t,"DIV",{});var f=P(i);rt(s.$$.fragment,f),u=O(f),rt(l.$$.fragment,f),f.forEach(x)},m(t,f){b(t,n,f),ct(e,n,null),y(n,o),ct(r,n,null),b(t,c,f),b(t,i,f),ct(s,i,null),y(i,u),ct(l,i,null),a=!0},p(t,n){const o={};2&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o);const c={};2&n&&(c.$$scope={dirty:n,ctx:t}),r.$set(c);const i={};2&n&&(i.$$scope={dirty:n,ctx:t}),l.$set(i)},i(t){a||(Z(e.$$.fragment,t),Z(r.$$.fragment,t),Z(s.$$.fragment,t),Z(l.$$.fragment,t),a=!0)},o(t){tt(e.$$.fragment,t),tt(r.$$.fragment,t),tt(s.$$.fragment,t),tt(l.$$.fragment,t),a=!1},d(t){t&&x(n),it(e),it(r),t&&x(c),t&&x(i),it(s),it(l)}}}function Wt(t){let n,e;return n=new At({props:{url:t[0],$$slots:{default:[Jt]},$$scope:{ctx:t}}}),{c(){ot(n.$$.fragment)},l(t){rt(n.$$.fragment,t)},m(t,o){ct(n,t,o),e=!0},p(t,[e]){const o={};1&e&&(o.url=t[0]),2&e&&(o.$$scope={dirty:e,ctx:t}),n.$set(o)},i(t){e||(Z(n.$$.fragment,t),e=!0)},o(t){tt(n.$$.fragment,t),e=!1},d(t){it(n,t)}}}function Qt(t,n,e){let{url:o=""}=n;return t.$$set=t=>{"url"in t&&e(0,o=t.url)},[o]}return new class extends ut{constructor(t){super(),st(this,t,Qt,Wt,i,{url:0})}}({target:document.querySelector("#__snel"),hydrate:!0,props:{}}),{}})();