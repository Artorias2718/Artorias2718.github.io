import{a as q,_ as c}from"./@babel-CoH1aX8U.js";import{r as E,j as A}from"./react-BgJWeQTy.js";import{u as B}from"./mui-styles-DbLOnfEf.js";import{r as D,g as h}from"./mui-transitions-LTiae6ZC.js";import{e as G}from"./@mui-UoK_28Vw.js";import{a as H}from"./react-transition-group-ClIpIS6O.js";const J=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"],K={entering:{opacity:1},entered:{opacity:1}},Y=E.forwardRef(function(l,y){const e=B(),g={enter:e.transitions.duration.enteringScreen,exit:e.transitions.duration.leavingScreen},{addEndListener:p,appear:T=!0,children:s,easing:f,in:m,onEnter:x,onEntered:R,onEntering:L,onExit:u,onExited:P,onExiting:j,style:a,timeout:d=g,TransitionComponent:v=H}=l,w=q(l,J),r=E.useRef(null),F=G(r,s.ref,y),i=n=>t=>{if(n){const o=r.current;t===void 0?n(o):n(o,t)}},_=i(L),C=i((n,t)=>{D(n);const o=h({style:a,timeout:d,easing:f},{mode:"enter"});n.style.webkitTransition=e.transitions.create("opacity",o),n.style.transition=e.transitions.create("opacity",o),x&&x(n,t)}),b=i(R),k=i(j),S=i(n=>{const t=h({style:a,timeout:d,easing:f},{mode:"exit"});n.style.webkitTransition=e.transitions.create("opacity",t),n.style.transition=e.transitions.create("opacity",t),u&&u(n)}),z=i(P),W=n=>{p&&p(r.current,n)};return A.jsx(v,c({appear:T,in:m,nodeRef:r,onEnter:C,onEntered:b,onEntering:_,onExit:S,onExited:z,onExiting:k,addEndListener:W,timeout:d},w,{children:(n,t)=>E.cloneElement(s,c({style:c({opacity:0,visibility:n==="exited"&&!m?"hidden":void 0},K[n],a,s.props.style),ref:F},t))}))});export{Y as F};
