import{_ as o,a as Z}from"./@babel-CoH1aX8U.js";import{r as y,j as C}from"./react-BgJWeQTy.js";import{c as tt}from"./clsx-B-dksMZM.js";import{s as T,d as et,u as nt}from"./mui-styles-DbLOnfEf.js";import{g as P}from"./mui-transitions-LTiae6ZC.js";import{a as it,g as ot,j as rt,e as st,c as at}from"./@mui-UoK_28Vw.js";import{u as lt}from"./mui-DefaultPropsProvider-DnUfkTsg.js";import{a as pt}from"./react-transition-group-ClIpIS6O.js";function dt(n){return it("MuiCollapse",n)}ot("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const ct=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],ut=n=>{const{orientation:e,classes:r}=n,d={root:["root",`${e}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${e}`],wrapperInner:["wrapperInner",`${e}`]};return at(d,dt,r)},ht=T("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(n,e)=>{const{ownerState:r}=n;return[e.root,e[r.orientation],r.state==="entered"&&e.entered,r.state==="exited"&&!r.in&&r.collapsedSize==="0px"&&e.hidden]}})(({theme:n,ownerState:e})=>o({height:0,overflow:"hidden",transition:n.transitions.create("height")},e.orientation==="horizontal"&&{height:"auto",width:0,transition:n.transitions.create("width")},e.state==="entered"&&o({height:"auto",overflow:"visible"},e.orientation==="horizontal"&&{width:"auto"}),e.state==="exited"&&!e.in&&e.collapsedSize==="0px"&&{visibility:"hidden"})),mt=T("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(n,e)=>e.wrapper})(({ownerState:n})=>o({display:"flex",width:"100%"},n.orientation==="horizontal"&&{width:"auto",height:"100%"})),ft=T("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(n,e)=>e.wrapperInner})(({ownerState:n})=>o({width:"100%"},n.orientation==="horizontal"&&{width:"auto",height:"100%"})),gt=y.forwardRef(function(e,r){const d=lt({props:e,name:"MuiCollapse"}),{addEndListener:S,children:U,className:_,collapsedSize:f="0px",component:b,easing:D,in:$,onEnter:j,onEntered:W,onEntering:I,onExit:M,onExited:A,onExiting:F,orientation:H="vertical",style:z,timeout:a=et.standard,TransitionComponent:k=pt}=d,q=Z(d,ct),g=o({},d,{orientation:H,collapsedSize:f}),c=ut(g),L=nt(),B=rt(),l=y.useRef(null),v=y.useRef(),x=typeof f=="number"?`${f}px`:f,u=H==="horizontal",h=u?"width":"height",E=y.useRef(null),G=st(r,E),p=t=>i=>{if(t){const s=E.current;i===void 0?t(s):t(s,i)}},R=()=>l.current?l.current[u?"clientWidth":"clientHeight"]:0,J=p((t,i)=>{l.current&&u&&(l.current.style.position="absolute"),t.style[h]=x,j&&j(t,i)}),K=p((t,i)=>{const s=R();l.current&&u&&(l.current.style.position="");const{duration:m,easing:w}=P({style:z,timeout:a,easing:D},{mode:"enter"});if(a==="auto"){const N=L.transitions.getAutoHeightDuration(s);t.style.transitionDuration=`${N}ms`,v.current=N}else t.style.transitionDuration=typeof m=="string"?m:`${m}ms`;t.style[h]=`${s}px`,t.style.transitionTimingFunction=w,I&&I(t,i)}),O=p((t,i)=>{t.style[h]="auto",W&&W(t,i)}),Q=p(t=>{t.style[h]=`${R()}px`,M&&M(t)}),V=p(A),X=p(t=>{const i=R(),{duration:s,easing:m}=P({style:z,timeout:a,easing:D},{mode:"exit"});if(a==="auto"){const w=L.transitions.getAutoHeightDuration(i);t.style.transitionDuration=`${w}ms`,v.current=w}else t.style.transitionDuration=typeof s=="string"?s:`${s}ms`;t.style[h]=x,t.style.transitionTimingFunction=m,F&&F(t)}),Y=t=>{a==="auto"&&B.start(v.current||0,t),S&&S(E.current,t)};return C.jsx(k,o({in:$,onEnter:J,onEntered:O,onEntering:K,onExit:Q,onExited:V,onExiting:X,addEndListener:Y,nodeRef:E,timeout:a==="auto"?null:a},q,{children:(t,i)=>C.jsx(ht,o({as:b,className:tt(c.root,_,{entered:c.entered,exited:!$&&x==="0px"&&c.hidden}[t]),style:o({[u?"minWidth":"minHeight"]:x},z),ref:G},i,{ownerState:o({},g,{state:t}),children:C.jsx(mt,{ownerState:o({},g,{state:t}),className:c.wrapper,ref:l,children:C.jsx(ft,{ownerState:o({},g,{state:t}),className:c.wrapperInner,children:U})})}))}))});gt.muiSupportAuto=!0;export{gt as C};
