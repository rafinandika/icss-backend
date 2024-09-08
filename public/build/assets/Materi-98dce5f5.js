import{R as D,r,j as e,W as C,y as b}from"./app-9b1b557d.js";import{A as B,i as S,j as h,k as I,l as R,m as z,n as F,c as P,d as L}from"./AuthenticatedLayout-cadfc0db.js";import{G as U,B as w}from"./react-toastify.esm-f84a5256.js";import{f as $}from"./usability-9e6ea373.js";function V(s){return U({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"},child:[]}]})(s)}const g=D.createContext(),K=({materi:s})=>{const[d,a]=r.useState("grid"),[o,t]=r.useState(null),[c,n]=r.useState(null);return e.jsxs(B,{children:[e.jsxs("div",{className:"flex font-bold text-3xl justify-between gap-2 border-b p-4",children:[e.jsxs("div",{className:"flex",children:[e.jsx(S,{size:37})," Materi"]}),e.jsxs("div",{className:"flex justify-between mb-4",children:[e.jsx("div",{}),e.jsx("div",{children:e.jsxs("button",{className:"btn btn-info text-white px-5",onClick:()=>document.getElementById("modal-add").showModal(),children:[e.jsx(h,{})," Unggah"]})})]})]}),e.jsxs(g.Provider,{value:{materi:s,view:d,setView:a,del:o,setDelete:t,edit:c,setEdit:n},children:[e.jsx(H,{}),e.jsx(O,{}),e.jsx(A,{}),e.jsx(G,{})]})]})},H=()=>{const{view:s,materi:d,setDelete:a,setEdit:o}=r.useContext(g);return e.jsx("div",{className:"card bg-white shadow-xl h-full mt-5",children:e.jsx("div",{className:"card-body h-svh",children:e.jsxs("div",{className:"grid grid-rows-1 gap-5",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{}),e.jsxs("div",{className:"flex gap-1",children:[e.jsx("button",{className:`btn ${s==="grid"?"text-white btn-neutral":"text-gray-500"} btn-sm`,children:e.jsx(I,{size:20})}),e.jsx("button",{className:"btn text-gray-500 btn-sm",children:e.jsx(R,{size:20})})]})]}),e.jsx("div",{className:"w-full grid grid-cols-2 gap-4 border-t",children:d.data.length>0?d.data.map((t,c)=>e.jsxs("div",{className:"flex flex-row bg-slate-200 p-4 mt-5 rounded-2xl shadow items-center",children:[e.jsx("img",{src:"/images/file/"+t.type+".png",alt:"Icon materi",className:"h-10 w-10"}),e.jsxs("div",{className:"ms-4",children:[e.jsx("h1",{className:"text-lg font-extrabold",children:t.judul}),e.jsx("p",{className:"text-sm",children:$(t.updated_at)})]}),e.jsxs("div",{className:"dropdown dropdown-bottom ms-auto",children:[e.jsx("div",{tabIndex:0,role:"button",className:"btn btn-ghost",children:e.jsx(V,{})}),e.jsxs("ul",{tabIndex:0,className:"dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow",children:[e.jsx("li",{className:"border-b",children:e.jsxs("a",{children:[e.jsx(z,{})," Lihat Materi"]})}),e.jsx("li",{className:"border-b",children:e.jsxs("a",{href:`/storage/${t.file}`,download:t.judul,children:[e.jsx(F,{})," Unduh Materi"]})}),e.jsx("li",{className:"border-b",children:e.jsxs("button",{onClick:()=>{o(t),document.getElementById("modal-edit").showModal()},children:[e.jsx(P,{})," Edit Materi"]})}),e.jsx("li",{children:e.jsxs("button",{onClick:()=>{a(t),document.getElementById("modal-delete").showModal()},children:[e.jsx(L,{}),"Hapus"]})})]})]})]},c)):e.jsx("div",{className:"mt-5 text-center col-span-2",children:"Tidak ada data"})})]})})})},A=()=>{const{data:s,setData:d,post:a,reset:o}=C({judul:"",deskripsi:"",file:"",type:"",video:null}),[t,c]=r.useState({}),[n,m]=r.useState(""),p=r.useRef(null),f=()=>{p.current.click()},j=l=>{const u=l.target.files[0],k=u.name.split(".").pop().toLowerCase(),i=/(\.pdf|\.docx|\.doc|\.ppt|\.pptx)$/i;let x=!0;u.size/1024/1024>25?(c({...t,file:"*Ukuran file tidak boleh lebih dari 25 MB"}),x=!1):i.exec(u.name)||(c({...t,file:"*Hanya mendukung file dengan ekstensi .pdf | .docx | .doc | .ppt | .pptx"}),x=!1),x&&(d({...s,type:{pdf:"pdf",docx:"docx",doc:"docx",ppt:"pptx",pptx:"pptx"}[k],file:u}),m(u.name))},N=()=>{let l={};return s.judul===""&&(l.judul="*Mohon masukkan judul materi"),s.deskripsi===""&&(l.deskripsi="*Mohon masukkan deskripsi materi"),s.file===""&&(l.file="*Mohon pilih file materi"),c(l),Object.keys(l).length<1},v=l=>{if(l.preventDefault(),!N()){w.warning("Periksa kesalahan pada formulir");return}a(route("materi.store"),{forceFormData:!0,onSuccess:()=>{o(),c({}),document.getElementById("modal-add").close(),b.reload()},onError:u=>{c(u.error)}})};return e.jsxs("dialog",{id:"modal-add",className:"modal",children:[e.jsxs("div",{className:"modal-box",children:[e.jsxs("h3",{className:"font-bold text-lg flex items-center",children:[e.jsx(h,{})," Unggah Materi"]}),e.jsx("form",{onSubmit:v,children:e.jsxs("div",{className:"flex flex-col gap-5 w-full mt-5",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",value:s.judul,onChange:l=>d("judul",l.target.value),placeholder:"Judul materi",className:"input input-bordered w-full"}),e.jsx("span",{className:t.judul?"text-red-500 text-sm":"hidden",children:t.judul})]}),e.jsx("input",{type:"file",className:"hidden",ref:p,onChange:j}),e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsx("button",{type:"button",className:"btn btn-sm btn-info text-white",onClick:f,children:"Pilih File"}),e.jsx("p",{children:n===""?"Belum ada file!":n})]}),e.jsx("span",{className:t.file?"text-red-500 text-sm":"hidden",children:t.file}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",value:s.video,onChange:l=>d("video",l.target.value),placeholder:"Tambahkan video (opsional)",className:"input input-bordered w-full"}),e.jsx("span",{className:"text-red-500 text-sm",children:"*Pastikan url video valid, dengan format https://"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",value:s.deskripsi,onChange:l=>d("deskripsi",l.target.value),placeholder:"Deskripsi singkat",className:"input input-bordered w-full"}),e.jsx("span",{className:t.deskripsi?"text-red-500 text-sm":"hidden",children:t.deskripsi})]}),e.jsxs("button",{type:"submit",className:"btn btn-primary",children:[e.jsx(h,{})," Unggah"]})]})})]}),e.jsx("form",{method:"dialog",className:"modal-backdrop",children:e.jsx("button",{children:"close"})})]})},G=()=>{const{edit:s,setEdit:d}=r.useContext(g),{data:a,setData:o,put:t,reset:c}=C({judul:"",deskripsi:"",file:null,video:null,type:""});r.useEffect(()=>{s&&o({...a,judul:s.judul,deskripsi:s.deskripsi,type:s.type,video:s.video})},[s]);const[n,m]=r.useState({}),[p,f]=r.useState(""),j=r.useRef(null),N=()=>{j.current.click()},v=i=>{const x=i.target.files[0],M=x.name.split(".").pop().toLowerCase(),E=/(\.pdf|\.docx|\.doc|\.ppt|\.pptx)$/i;let y=!0;x.size/1024/1024>25?(m({...n,file:"*Ukuran file tidak boleh lebih dari 25 MB"}),y=!1):E.exec(x.name)||(m({...n,file:"*Hanya mendukung file dengan ekstensi .pdf | .docx | .doc | .ppt | .pptx"}),y=!1),y&&(o({...a,type:{pdf:"pdf",docx:"docx",doc:"docx",ppt:"pptx",pptx:"pptx"}[M],file:x}),f(x.name))},l=()=>{let i={};return a.judul===""&&(i.judul="*Mohon masukkan judul materi"),a.deskripsi===""&&(i.deskripsi="*Mohon masukkan deskripsi materi"),m(i),Object.keys(i).length<1},u=()=>{d(null),c(),m({}),f(""),document.getElementById("modal-edit").close()},k=i=>{if(i.preventDefault(),!l()){w.warning("Periksa kesalahan pada formulir");return}b.post(`/materi/${s.id}`,{_method:"put",...a},{onSuccess:()=>{u(),b.reload()},onError:x=>{m(x.error)}})};return e.jsx("dialog",{id:"modal-edit",className:"modal",children:e.jsxs("div",{className:"modal-box",children:[e.jsxs("h3",{className:"font-bold text-lg flex items-center",children:[e.jsx(h,{})," Edit Materi"]}),e.jsx("form",{onSubmit:k,children:e.jsxs("div",{className:"flex flex-col gap-5 w-full mt-5",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",value:a.judul,onChange:i=>o("judul",i.target.value),placeholder:"Judul materi",className:"input input-bordered w-full"}),e.jsx("span",{className:n.judul?"text-red-500 text-sm":"hidden",children:n.judul})]}),e.jsx("input",{type:"file",className:"hidden",ref:j,onChange:v}),e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsx("button",{type:"button",className:"btn btn-sm btn-info text-white",onClick:N,children:"Pilih File"}),e.jsx("p",{children:p===""?`${a.judul}.${a.type}`:p})]}),e.jsx("span",{className:n.file?"text-red-500 text-sm":"hidden",children:n.file}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",value:a.video,onChange:i=>o("video",i.target.value),placeholder:"Tambahkan video (opsional)",className:"input input-bordered w-full"}),e.jsx("span",{className:"text-red-500 text-sm",children:"*Pastikan url video valid, dengan format https://"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",value:a.deskripsi,onChange:i=>o("deskripsi",i.target.value),placeholder:"Deskripsi singkat",className:"input input-bordered w-full"}),e.jsx("span",{className:n.deskripsi?"text-red-500 text-sm":"hidden",children:n.deskripsi})]}),e.jsxs("div",{className:"flex justify-center gap-5",children:[e.jsx("button",{type:"button",onClick:u,className:"btn btn-error text-white px-10",children:" Batal"}),e.jsxs("button",{type:"submit",className:"btn btn-primary",children:[e.jsx(h,{})," Perbarui Materi"]})]})]})})]})})},O=()=>{const{del:s,setDelete:d}=r.useContext(g);return e.jsx("dialog",{id:"modal-delete",className:"modal",role:"dialog",children:e.jsxs("div",{className:"modal-box",children:[e.jsx("form",{method:"dialog",children:e.jsx("button",{className:"btn btn-sm btn-circle btn-ghost absolute right-2 top-2",children:"✕"})}),e.jsxs("div",{className:"text-center mt-10",children:[e.jsx("p",{className:"text-center",children:"Apakah anda yakin ingin menghapus data materi?"}),e.jsxs("p",{className:"text-center font-bold",children:['"',s==null?void 0:s.judul,'"']}),e.jsxs("div",{className:"text-center",children:[e.jsx("button",{className:"btn btn-error rounded-full mt-5 px-5",onClick:()=>document.getElementById("modal-delete").close(),children:"Batal"}),e.jsx("button",{className:"btn btn-md rounded-full mt-5 px-5 ms-4",onClick:()=>{b.delete(route("materi.destroy",s==null?void 0:s.id),{onSuccess:()=>{d(null),w.success("Materi di hapus"),document.getElementById("modal-delete").close()}})},children:"Hapus"})]})]})]})})};export{K as default};