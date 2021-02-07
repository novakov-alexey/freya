(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{70:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return i})),n.d(t,"default",(function(){return s}));var r=n(3),o=(n(0),n(82));const a={title:"Dependencies"},c={unversionedId:"dependencies",id:"dependencies",isDocsHomePage:!1,title:"Dependencies",description:"fabric8 kubernetes-client",source:"@site/../docs/target/mdoc/dependencies.md",slug:"/dependencies",permalink:"/freya/dependencies",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/../docs/target/mdoc/dependencies.md",version:"current",sidebar:"docs",previous:{title:"Structural Schema",permalink:"/freya/structural-schema"}},i=[{value:"fabric8 kubernetes-client",id:"fabric8-kubernetes-client",children:[]},{value:"scala-logging",id:"scala-logging",children:[]}],l={toc:i};function s({components:e,...t}){return Object(o.b)("wrapper",Object(r.a)({},l,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"fabric8-kubernetes-client"},"fabric8 kubernetes-client"),Object(o.b)("p",null,"Freya depends on two fabric8 modules such as ",Object(o.b)("inlineCode",{parentName:"p"},"kubernetes-client")," and ",Object(o.b)("inlineCode",{parentName:"p"},"kubernetes-model"),". Client, which needs to\nbe passed as parameter to Freya operator is not going to be closed upon controller close event or restarts.\nClient should be managed separately, when it comes to shutdown of the operator by some event. "),Object(o.b)("p",null,"fabric8 kubernetes-client has its own pool of HTTP connections and it is powered by OkHttp library internally.\nThis HTTP connection pool does not use Cats ",Object(o.b)("inlineCode",{parentName:"p"},"ContextShift")," (or Scala Global ExecutionContext) at all.\nCats ",Object(o.b)("inlineCode",{parentName:"p"},"ContextShift")," is used by Freya to dispatch events from K8s to custom controller."),Object(o.b)("h2",{id:"scala-logging"},"scala-logging"),Object(o.b)("p",null,"Freya is using TypeSafe scala-logging as frontend library. Backend or implementation logging library\nshould be provided by custom controller runtime, for example ",Object(o.b)("inlineCode",{parentName:"p"},"logback-classic"),"."))}s.isMDXComponent=!0},82:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=o.a.createContext({}),u=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(n),b=r,f=p["".concat(c,".").concat(b)]||p[b]||d[b]||a;return n?o.a.createElement(f,i(i({ref:t},s),{},{components:n})):o.a.createElement(f,i({ref:t},s))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,c=new Array(a);c[0]=b;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,c[1]=i;for(var s=2;s<a;s++)c[s]=n[s];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);