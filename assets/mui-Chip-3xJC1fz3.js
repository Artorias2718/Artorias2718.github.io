import{_ as p,a as G}from"./@babel-CoH1aX8U.js";import{r as u,j as z}from"./react-BgJWeQTy.js";import{c as y}from"./clsx-B-dksMZM.js";import{g as J,a as Q,b as r,d,e as X,c as Y}from"./@mui-UoK_28Vw.js";import{c as Z}from"./mui-internal-Q_tM9Kmf.js";import{s as K}from"./mui-styles-DbLOnfEf.js";import{u as h}from"./mui-DefaultPropsProvider-DnUfkTsg.js";import{B as N}from"./mui-ButtonBase-Cuy8DFON.js";function w(a){return Q("MuiChip",a)}const l=J("MuiChip",["root","sizeSmall","sizeMedium","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","filledPrimary","filledSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","deleteIconFilledColorPrimary","deleteIconFilledColorSecondary","focusVisible"]),aa=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant","tabIndex","skipFocusWhenDisabled"],oa=a=>{const{classes:o,disabled:n,size:e,color:c,iconColor:f,onDelete:v,clickable:t,variant:s}=a,C={root:["root",s,n&&"disabled",`size${r(e)}`,`color${r(c)}`,t&&"clickable",t&&`clickableColor${r(c)}`,v&&"deletable",v&&`deletableColor${r(c)}`,`${s}${r(c)}`],label:["label",`label${r(e)}`],avatar:["avatar",`avatar${r(e)}`,`avatarColor${r(c)}`],icon:["icon",`icon${r(e)}`,`iconColor${r(f)}`],deleteIcon:["deleteIcon",`deleteIcon${r(e)}`,`deleteIconColor${r(c)}`,`deleteIcon${r(s)}Color${r(c)}`]};return Y(C,w,o)},la=K("div",{name:"MuiChip",slot:"Root",overridesResolver:(a,o)=>{const{ownerState:n}=a,{color:e,iconColor:c,clickable:f,onDelete:v,size:t,variant:s}=n;return[{[`& .${l.avatar}`]:o.avatar},{[`& .${l.avatar}`]:o[`avatar${r(t)}`]},{[`& .${l.avatar}`]:o[`avatarColor${r(e)}`]},{[`& .${l.icon}`]:o.icon},{[`& .${l.icon}`]:o[`icon${r(t)}`]},{[`& .${l.icon}`]:o[`iconColor${r(c)}`]},{[`& .${l.deleteIcon}`]:o.deleteIcon},{[`& .${l.deleteIcon}`]:o[`deleteIcon${r(t)}`]},{[`& .${l.deleteIcon}`]:o[`deleteIconColor${r(e)}`]},{[`& .${l.deleteIcon}`]:o[`deleteIcon${r(s)}Color${r(e)}`]},o.root,o[`size${r(t)}`],o[`color${r(e)}`],f&&o.clickable,f&&e!=="default"&&o[`clickableColor${r(e)})`],v&&o.deletable,v&&e!=="default"&&o[`deletableColor${r(e)}`],o[s],o[`${s}${r(e)}`]]}})(({theme:a,ownerState:o})=>{const n=a.palette.mode==="light"?a.palette.grey[700]:a.palette.grey[300];return p({maxWidth:"100%",fontFamily:a.typography.fontFamily,fontSize:a.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:(a.vars||a).palette.text.primary,backgroundColor:(a.vars||a).palette.action.selected,borderRadius:32/2,whiteSpace:"nowrap",transition:a.transitions.create(["background-color","box-shadow"]),cursor:"unset",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box",[`&.${l.disabled}`]:{opacity:(a.vars||a).palette.action.disabledOpacity,pointerEvents:"none"},[`& .${l.avatar}`]:{marginLeft:5,marginRight:-6,width:24,height:24,color:a.vars?a.vars.palette.Chip.defaultAvatarColor:n,fontSize:a.typography.pxToRem(12)},[`& .${l.avatarColorPrimary}`]:{color:(a.vars||a).palette.primary.contrastText,backgroundColor:(a.vars||a).palette.primary.dark},[`& .${l.avatarColorSecondary}`]:{color:(a.vars||a).palette.secondary.contrastText,backgroundColor:(a.vars||a).palette.secondary.dark},[`& .${l.avatarSmall}`]:{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:a.typography.pxToRem(10)},[`& .${l.icon}`]:p({marginLeft:5,marginRight:-6},o.size==="small"&&{fontSize:18,marginLeft:4,marginRight:-4},o.iconColor===o.color&&p({color:a.vars?a.vars.palette.Chip.defaultIconColor:n},o.color!=="default"&&{color:"inherit"})),[`& .${l.deleteIcon}`]:p({WebkitTapHighlightColor:"transparent",color:a.vars?`rgba(${a.vars.palette.text.primaryChannel} / 0.26)`:d(a.palette.text.primary,.26),fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:a.vars?`rgba(${a.vars.palette.text.primaryChannel} / 0.4)`:d(a.palette.text.primary,.4)}},o.size==="small"&&{fontSize:16,marginRight:4,marginLeft:-4},o.color!=="default"&&{color:a.vars?`rgba(${a.vars.palette[o.color].contrastTextChannel} / 0.7)`:d(a.palette[o.color].contrastText,.7),"&:hover, &:active":{color:(a.vars||a).palette[o.color].contrastText}})},o.size==="small"&&{height:24},o.color!=="default"&&{backgroundColor:(a.vars||a).palette[o.color].main,color:(a.vars||a).palette[o.color].contrastText},o.onDelete&&{[`&.${l.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette.action.selectedChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.focusOpacity}))`:d(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)}},o.onDelete&&o.color!=="default"&&{[`&.${l.focusVisible}`]:{backgroundColor:(a.vars||a).palette[o.color].dark}})},({theme:a,ownerState:o})=>p({},o.clickable&&{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:a.vars?`rgba(${a.vars.palette.action.selectedChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.hoverOpacity}))`:d(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity)},[`&.${l.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette.action.selectedChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.focusOpacity}))`:d(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)},"&:active":{boxShadow:(a.vars||a).shadows[1]}},o.clickable&&o.color!=="default"&&{[`&:hover, &.${l.focusVisible}`]:{backgroundColor:(a.vars||a).palette[o.color].dark}}),({theme:a,ownerState:o})=>p({},o.variant==="outlined"&&{backgroundColor:"transparent",border:a.vars?`1px solid ${a.vars.palette.Chip.defaultBorder}`:`1px solid ${a.palette.mode==="light"?a.palette.grey[400]:a.palette.grey[700]}`,[`&.${l.clickable}:hover`]:{backgroundColor:(a.vars||a).palette.action.hover},[`&.${l.focusVisible}`]:{backgroundColor:(a.vars||a).palette.action.focus},[`& .${l.avatar}`]:{marginLeft:4},[`& .${l.avatarSmall}`]:{marginLeft:2},[`& .${l.icon}`]:{marginLeft:4},[`& .${l.iconSmall}`]:{marginLeft:2},[`& .${l.deleteIcon}`]:{marginRight:5},[`& .${l.deleteIconSmall}`]:{marginRight:3}},o.variant==="outlined"&&o.color!=="default"&&{color:(a.vars||a).palette[o.color].main,border:`1px solid ${a.vars?`rgba(${a.vars.palette[o.color].mainChannel} / 0.7)`:d(a.palette[o.color].main,.7)}`,[`&.${l.clickable}:hover`]:{backgroundColor:a.vars?`rgba(${a.vars.palette[o.color].mainChannel} / ${a.vars.palette.action.hoverOpacity})`:d(a.palette[o.color].main,a.palette.action.hoverOpacity)},[`&.${l.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette[o.color].mainChannel} / ${a.vars.palette.action.focusOpacity})`:d(a.palette[o.color].main,a.palette.action.focusOpacity)},[`& .${l.deleteIcon}`]:{color:a.vars?`rgba(${a.vars.palette[o.color].mainChannel} / 0.7)`:d(a.palette[o.color].main,.7),"&:hover, &:active":{color:(a.vars||a).palette[o.color].main}}})),ra=K("span",{name:"MuiChip",slot:"Label",overridesResolver:(a,o)=>{const{ownerState:n}=a,{size:e}=n;return[o.label,o[`label${r(e)}`]]}})(({ownerState:a})=>p({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},a.variant==="outlined"&&{paddingLeft:11,paddingRight:11},a.size==="small"&&{paddingLeft:8,paddingRight:8},a.size==="small"&&a.variant==="outlined"&&{paddingLeft:7,paddingRight:7}));function M(a){return a.key==="Backspace"||a.key==="Delete"}const ua=u.forwardRef(function(o,n){const e=h({props:o,name:"MuiChip"}),{avatar:c,className:f,clickable:v,color:t="default",component:s,deleteIcon:C,disabled:k=!1,icon:$,label:U,onClick:O,onDelete:b,onKeyDown:P,onKeyUp:D,size:j="medium",variant:F="filled",tabIndex:W,skipFocusWhenDisabled:B=!1}=e,_=G(e,aa),x=u.useRef(null),A=X(x,n),L=i=>{i.stopPropagation(),b&&b(i)},H=i=>{i.currentTarget===i.target&&M(i)&&i.preventDefault(),P&&P(i)},S=i=>{i.currentTarget===i.target&&(b&&M(i)?b(i):i.key==="Escape"&&x.current&&x.current.blur()),D&&D(i)},I=v!==!1&&O?!0:v,m=I||b?N:s||"div",R=p({},e,{component:m,disabled:k,size:j,color:t,iconColor:u.isValidElement($)&&$.props.color||t,onDelete:!!b,clickable:I,variant:F}),g=oa(R),q=m===N?p({component:s||"div",focusVisibleClassName:g.focusVisible},b&&{disableRipple:!0}):{};let T=null;b&&(T=C&&u.isValidElement(C)?u.cloneElement(C,{className:y(C.props.className,g.deleteIcon),onClick:L}):z.jsx(Z,{className:y(g.deleteIcon),onClick:L}));let V=null;c&&u.isValidElement(c)&&(V=u.cloneElement(c,{className:y(g.avatar,c.props.className)}));let E=null;return $&&u.isValidElement($)&&(E=u.cloneElement($,{className:y(g.icon,$.props.className)})),z.jsxs(la,p({as:m,className:y(g.root,f),disabled:I&&k?!0:void 0,onClick:O,onKeyDown:H,onKeyUp:S,ref:A,tabIndex:B&&k?-1:W,ownerState:R},q,_,{children:[V||E,z.jsx(ra,{className:y(g.label),ownerState:R,children:U}),T]}))});export{ua as C};
