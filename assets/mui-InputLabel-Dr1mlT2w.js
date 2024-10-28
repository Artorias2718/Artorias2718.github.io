import{_ as e,a as u}from"./@babel-CoH1aX8U.js";import{r as x,j as h}from"./react-BgJWeQTy.js";import{c as b}from"./clsx-B-dksMZM.js";import{u as k,f as C}from"./mui-FormControl-DRc0CgMk.js";import{s as v,r as z}from"./mui-styles-DbLOnfEf.js";import{a as I,g as L,b as g,c as W}from"./@mui-UoK_28Vw.js";import{F as E,f as F}from"./mui-FormLabel-otT0Lta0.js";import{u as q}from"./mui-DefaultPropsProvider-DnUfkTsg.js";function A(a){return I("MuiInputLabel",a)}L("MuiInputLabel",["root","focused","disabled","error","required","asterisk","formControl","sizeSmall","shrink","animated","standard","filled","outlined"]);const P=["disableAnimation","margin","shrink","variant","className"],R=a=>{const{classes:s,formControl:r,size:t,shrink:l,disableAnimation:m,variant:c,required:p}=a,o={root:["root",r&&"formControl",!m&&"animated",l&&"shrink",t&&t!=="normal"&&`size${g(t)}`,c],asterisk:[p&&"asterisk"]},n=W(o,A,s);return e({},s,n)},j=v(E,{shouldForwardProp:a=>z(a)||a==="classes",name:"MuiInputLabel",slot:"Root",overridesResolver:(a,s)=>{const{ownerState:r}=a;return[{[`& .${F.asterisk}`]:s.asterisk},s.root,r.formControl&&s.formControl,r.size==="small"&&s.sizeSmall,r.shrink&&s.shrink,!r.disableAnimation&&s.animated,r.focused&&s.focused,s[r.variant]]}})(({theme:a,ownerState:s})=>e({display:"block",transformOrigin:"top left",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"100%"},s.formControl&&{position:"absolute",left:0,top:0,transform:"translate(0, 20px) scale(1)"},s.size==="small"&&{transform:"translate(0, 17px) scale(1)"},s.shrink&&{transform:"translate(0, -1.5px) scale(0.75)",transformOrigin:"top left",maxWidth:"133%"},!s.disableAnimation&&{transition:a.transitions.create(["color","transform","max-width"],{duration:a.transitions.duration.shorter,easing:a.transitions.easing.easeOut})},s.variant==="filled"&&e({zIndex:1,pointerEvents:"none",transform:"translate(12px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"},s.size==="small"&&{transform:"translate(12px, 13px) scale(1)"},s.shrink&&e({userSelect:"none",pointerEvents:"auto",transform:"translate(12px, 7px) scale(0.75)",maxWidth:"calc(133% - 24px)"},s.size==="small"&&{transform:"translate(12px, 4px) scale(0.75)"})),s.variant==="outlined"&&e({zIndex:1,pointerEvents:"none",transform:"translate(14px, 16px) scale(1)",maxWidth:"calc(100% - 24px)"},s.size==="small"&&{transform:"translate(14px, 9px) scale(1)"},s.shrink&&{userSelect:"none",pointerEvents:"auto",maxWidth:"calc(133% - 32px)",transform:"translate(14px, -9px) scale(0.75)"}))),y=x.forwardRef(function(s,r){const t=q({name:"MuiInputLabel",props:s}),{disableAnimation:l=!1,shrink:m,className:c}=t,p=u(t,P),o=k();let n=m;typeof n>"u"&&o&&(n=o.filled||o.focused||o.adornedStart);const i=C({props:t,muiFormControl:o,states:["size","variant","required","focused"]}),d=e({},t,{disableAnimation:l,formControl:o,shrink:n,size:i.size,variant:i.variant,required:i.required,focused:i.focused}),f=R(d);return h.jsx(j,e({"data-shrink":n,ownerState:d,ref:r,className:b(f.root,c)},p,{classes:f}))});export{y as I};
