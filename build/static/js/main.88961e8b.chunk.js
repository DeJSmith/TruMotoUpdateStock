(this.webpackJsonptrumotoupdatestock=this.webpackJsonptrumotoupdatestock||[]).push([[0],{10:function(e,t,o){"use strict";o.r(t);var l=o(0),s=o(1),n=o(3),a=o.n(n),r=o.p+"static/media/TruMotoLogo.fe72b95d.png";o(9);var c=()=>{const[e,t]=Object(s.useState)({shopifyFile:null,forbesFile:null,newStock:null,download:null,csvFile:null,downloadBtn:!0,buttonClass:"disabled"}),o=o=>{console.log(o.target.files[0]),t({...e,[o.target.name]:o.target.files[0]})},n=async()=>{let t=await a(e.forbesFile),o=await a(e.shopifyFile),l=i(JSON.parse(t),JSON.parse(o));console.log(l);let s=await d(l);console.log(s),b(s)},a=e=>new Promise((t=>{const o=new FileReader;o.onloadend=()=>{var e=o.result,l=c(e.toString().split("\n"));console.log(l),t(l)},o.readAsText(e)})),c=e=>{console.log("converting to json");let t=[],o=e[0].split(",");for(let l=1;l<e.length-1;l++){let s={},n=e[l],a="",r=0;for(let e of n)'"'===e&&0===r?r=1:'"'===e&&1==r&&(r=0),","===e&&0===r&&(e="|"),'"'!==e&&(a+=e);let c=a.split("|");for(let e in o)c[e].includes(",")?s[o[e]]=c[e].split(", ").map((e=>e.trim())):s[o[e]]=c[e];t.push(s)}return JSON.stringify(t)},i=(t,o)=>{console.log(e);let l={},s=[];for(var n of(console.log(t[0]),t))l[n["Item No."]]=Number(n["Qty In Akl"])+Number(n["Qty In CH"]);for(var a of o)String(a.SKU)in l&&(a["51 Waterloo Road"]=l[a.SKU],s.push(a));return s},d=async e=>{console.log(e);let t=e.map((e=>Object.values(e)));return t.unshift(Object.keys(e[0])),`${t.join("\n").replace(/,/g,",")}`},b=o=>{console.log("create blob");var l="text/csv;charset=utf-8;",s=new Blob([o],{type:l});console.log(s);var n=document.getElementById("download");n.download="updatedStock.csv",n.href=window.URL.createObjectURL(s),n.dataset.downloadurl=[l,n.download,n.href].join(":"),t({...e,buttonClass:""})};return Object(l.jsxs)("div",{className:"my-container",children:[Object(l.jsx)("img",{src:r,alt:"",className:"logo"}),Object(l.jsx)("div",{className:"form-container",children:Object(l.jsxs)("form",{action:"",onSubmit:e=>(e=>{e.preventDefault(),console.log("submit"),n()})(e),children:[Object(l.jsxs)("div",{className:"form-group",children:[Object(l.jsxs)("div",{className:"form-group files",children:[Object(l.jsx)("label",{children:"Shopify CSV "}),Object(l.jsx)("input",{type:"file",className:"form-control",name:"shopifyFile",onChange:e=>o(e)})]}),Object(l.jsxs)("div",{className:"form-group files",children:[Object(l.jsx)("label",{children:"Forbes & Davies CSV "}),Object(l.jsx)("input",{type:"file",className:"form-control",name:"forbesFile",onChange:e=>o(e)})]})]}),Object(l.jsxs)("div",{className:"buttons-container",children:[Object(l.jsx)("button",{type:"submit",className:"btn btn-primary mb-3",children:"Submit"}),Object(l.jsx)("a",{id:"download",className:`btn btn-primary ${e.buttonClass}`,children:"Download Stock"})]})]})})]})};a.a.render(Object(l.jsx)(c,{}),document.getElementById("root"))},9:function(e,t,o){}},[[10,1,2]]]);
//# sourceMappingURL=main.88961e8b.chunk.js.map