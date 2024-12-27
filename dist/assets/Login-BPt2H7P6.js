import{u as L,r as u,j as e,L as b,T as m}from"./index-PtYIsaun.js";import{l as C,g as A}from"./authService-C93CJM16.js";import{P as E}from"./PasswordInput-Dl8aqw-1.js";import{i as S}from"./socialAuthService-ezDZvVUv.js";const F=()=>{const{login:x}=L(),[g,p]=u.useState({email:"",password:""}),[d,l]=u.useState(!1),[y,i]=u.useState("");u.useEffect(()=>{console.log("Environment check - Google Client ID:","Present"),console.log("Google API check:",window.google?"Loaded":"Not loaded")},[]);const j=async t=>{var a,r;t.preventDefault(),i(""),l(!0);try{const s=await C(g);if(!await x(s))throw new Error("Login failed")}catch(s){const o=((r=(a=s.response)==null?void 0:a.data)==null?void 0:r.message)||s.message||"Login failed";m.error(o),i(o)}finally{l(!1)}},v=async()=>{var t,a;console.log("Starting Google Auth..."),i(""),l(!0);try{console.log("Initializing Google One Tap..."),google.accounts.id.initialize({client_id:"41687330401-ap0m3hf3b1ta5uqtukv7pb94fiek2bfb.apps.googleusercontent.com",callback:async c=>{var w,k;console.log("Received credential response:",c);try{if(!c.credential)throw new Error("No credential received from Google");console.log("Got token, calling backend...");const n=await A(c.credential);if(console.log("Backend response:",n),n.status==="success"){if(!await x(n))throw new Error("Login failed");m.success("Login successful!")}else throw new Error(n.message||"Login failed")}catch(n){console.error("Google Auth Response Error:",n);const f=((k=(w=n.response)==null?void 0:w.data)==null?void 0:k.message)||n.message||"Google sign in failed";m.error(f),i(f)}finally{l(!1)}},auto_select:!1});const r=document.getElementById("googleButton"),s=r?r.offsetWidth-35:320,o=localStorage.getItem("hs_theme"),h=o==="dark"||!o&&window.matchMedia("(prefers-color-scheme: dark)").matches;google.accounts.id.renderButton(r,{theme:h?"filled_black":"outline",size:"large",width:s,text:"signin_with"}),google.accounts.id.prompt(c=>{console.log("Google One Tap prompt notification:",c)})}catch(r){console.error("Google Auth Error:",r);const s=((a=(t=r.response)==null?void 0:t.data)==null?void 0:a.message)||r.message||"Google sign in failed";m.error(s),i(s)}finally{l(!1)}},N=async()=>{var t,a;i(""),l(!0);try{const r=await S(),o=(await r.signIn()).authorization.id_token,h=await r(o);if(!await x(h))throw new Error("Apple sign in failed")}catch(r){const s=((a=(t=r.response)==null?void 0:t.data)==null?void 0:a.message)||r.message||"Apple sign in failed";m.error(s),i(s)}finally{l(!1)}};return e.jsx("div",{className:"max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto",children:e.jsx("div",{className:"mt-7 border border-gray-200 rounded-xl shadow-sm dark:border-gray-700 max-w-md mx-auto",children:e.jsxs("div",{className:"p-4 sm:p-7",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{className:"block text-2xl font-bold text-gray-800 dark:text-white",children:"Sign in"}),e.jsxs("p",{className:"mt-2 text-sm text-gray-600 dark:text-gray-400",children:["Don't have an account yet?",e.jsx(b,{to:"/signup",className:"ml-1 text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500",children:"Sign up here"})]})]}),e.jsxs("div",{className:"mt-5",children:[e.jsxs("div",{className:"grid gap-y-4",children:[e.jsxs("button",{id:"googleButton",type:"button",onClick:v,disabled:d,className:"w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-gray-800",children:[e.jsxs("svg",{className:"w-4 h-auto",width:"46",height:"47",viewBox:"0 0 46 47",fill:"none",children:[e.jsx("path",{d:"M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z",fill:"#4285F4"}),e.jsx("path",{d:"M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z",fill:"#34A853"}),e.jsx("path",{d:"M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z",fill:"#FBBC05"}),e.jsx("path",{d:"M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z",fill:"#EB4335"})]}),"Sign in with Google"]}),e.jsxs("button",{type:"button",onClick:N,disabled:d,className:"w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:bg-gray-800",children:[e.jsx("svg",{className:"w-4 h-auto",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512",children:e.jsx("path",{fill:"currentColor",d:"M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"})}),"Sign in with Apple"]})]}),e.jsx("div",{className:"py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600",children:"Or"}),e.jsx("form",{onSubmit:j,children:e.jsxs("div",{className:"grid gap-y-4",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("label",{htmlFor:"email",className:"block text-sm mb-2 dark:text-white",children:"Email address"}),e.jsx(b,{to:"/verify-email",className:"text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500",children:"Verify email"})]}),e.jsx("div",{className:"relative",children:e.jsx("input",{type:"email",id:"email",name:"email",className:"py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600",required:!0,"aria-describedby":"email-error",value:g.email,onChange:t=>p({...g,email:t.target.value}),disabled:d})})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("label",{htmlFor:"password",className:"block text-sm mb-2 dark:text-white",children:"Password"}),e.jsx(b,{to:"/forgot-password",className:"text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500",children:"Forgot password?"})]}),e.jsx(E,{value:g.password,onChange:t=>p({...g,password:t.target.value}),disabled:d,showHints:!0})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex",children:e.jsx("input",{id:"remember-me",name:"remember-me",type:"checkbox",className:"shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"})}),e.jsx("div",{className:"ml-3",children:e.jsx("label",{htmlFor:"remember-me",className:"text-sm dark:text-white",children:"Remember me"})})]}),y&&e.jsx("div",{className:"text-sm text-red-600 dark:text-red-500",children:y}),e.jsx("button",{type:"submit",className:"w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-gray-800",disabled:d,children:d?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full",role:"status","aria-label":"loading"}),"Signing in..."]}):"Sign in"})]})})]})]})})})};export{F as default};