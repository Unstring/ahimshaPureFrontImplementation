import{r as a,j as e,L as m,T as x}from"./index-tP1hS4I_.js";import{b as h}from"./authService-B7eLv6jh.js";import"./axios-upsvKRUO.js";const v=()=>{const[r,u]=a.useState(""),[s,n]=a.useState(!1),[b,d]=a.useState(!1),[o,c]=a.useState(""),g=async i=>{i.preventDefault(),c(""),n(!0);try{const t={email:r,baseUrl:window.location.origin+"/auth/verify/"};console.log(t);const l=await h(t);d(!0),x.success("Verification email sent successfully!")}catch(t){console.log(t);const l=(t==null?void 0:t.message)||"Failed to send verification email";x.error(l),c(l)}finally{n(!1)}};return e.jsx("div",{className:"max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto",children:e.jsx("div",{className:"mt-7 border border-gray-200 rounded-xl shadow-sm dark:border-gray-700 max-w-md mx-auto",children:e.jsxs("div",{className:"p-4 sm:p-7",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{className:"block text-2xl font-bold text-gray-800 dark:text-white",children:"Verify Email"}),e.jsxs("p",{className:"mt-2 text-sm text-gray-600 dark:text-gray-400",children:["Email already verified?",e.jsx(m,{to:"/login",className:"ml-1 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500",children:"Sign in here"})]})]}),e.jsx("div",{className:"mt-5",children:b?e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"mb-4 inline-flex items-center justify-center size-12 rounded-full bg-blue-600",children:e.jsxs("svg",{className:"size-6 text-white",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16",children:[e.jsx("path",{d:"M13 7h-6v5h6v-5zm-1 4h-4v-3h4v3z"}),e.jsx("path",{d:"M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2z"})]})}),e.jsx("h3",{className:"text-center text-lg font-semibold text-gray-800 dark:text-white",children:"Check your email"}),e.jsxs("p",{className:"text-center mt-2 text-gray-600 dark:text-gray-400",children:["We have sent a verification email to ",e.jsx("span",{className:"font-medium",children:r})]}),e.jsxs("div",{className:"mt-6 flex flex-col gap-3",children:[e.jsx("button",{onClick:()=>d(!1),className:"py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",children:"Resend email"}),e.jsx(m,{to:"/login",className:"py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-gray-800",children:"Back to login"})]})]}):e.jsx("form",{onSubmit:g,children:e.jsxs("div",{className:"grid gap-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm mb-2 dark:text-white",children:"Email address"}),e.jsx("div",{className:"relative",children:e.jsx("input",{type:"email",id:"email",name:"email",className:"py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400",required:!0,value:r,onChange:i=>u(i.target.value),disabled:s,placeholder:"Enter your email"})}),o&&e.jsx("p",{className:"text-xs text-red-600 mt-2 dark:text-red-500",children:o})]}),e.jsx("button",{type:"submit",className:"w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-gray-800",disabled:s,children:s?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full",role:"status","aria-label":"loading"}),"Sending..."]}):"Send Verification Email"})]})})})]})})})};export{v as default};
