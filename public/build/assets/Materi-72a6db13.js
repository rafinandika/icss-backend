import{R as D,r as n,j as e,W as C,y as b}from"./app-1158bfae.js";import{A as B,i as S,j as h,k as I,l as R,m as z,c as F,d as L}from"./AuthenticatedLayout-59226117.js";import{G as P,B as w}from"./react-toastify.esm-66757944.js";import{f as U}from"./usability-49a819c3.js";function V(s){return P({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"},child:[]}]})(s)}const g=D.createContext(),q=({materi:s})=>{const[r,l]=n.useState("grid"),[x,t]=n.useState(null),[o,d]=n.useState(null);return e.jsxs(B,{children:[e.jsxs("div",{className:"flex font-bold text-3xl justify-between gap-2 border-b p-4",children:[e.jsxs("div",{className:"flex",children:[e.jsx(S,{size:37})," Materi"]}),e.jsxs("div",{className:"flex justify-between mb-4",children:[e.jsx("div",{}),e.jsx("div",{children:e.jsxs("button",{className:"btn btn-info text-white px-5",onClick:()=>document.getElementById("modal-add").showModal(),children:[e.jsx(h,{})," Unggah"]})})]})]}),e.jsxs(g.Provider,{value:{materi:s,view:r,setView:l,del:x,setDelete:t,edit:o,setEdit:d},children:[e.jsx($,{}),e.jsx(G,{}),e.jsx(H,{}),e.jsx(A,{})]})]})},$=()=>{const{view:s,materi:r,setDelete:l,setEdit:x}=n.useContext(g);return e.jsx("div",{className:"card bg-white shadow-xl h-full mt-5",children:e.jsx("div",{className:"card-body h-svh",children:e.jsxs("div",{className:"grid grid-rows-1 gap-5",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{}),e.jsxs("div",{className:"flex gap-1",children:[e.jsx("button",{className:`btn ${s==="grid"?"text-white btn-neutral":"text-gray-500"} btn-sm`,children:e.jsx(I,{size:20})}),e.jsx("button",{className:"btn text-gray-500 btn-sm",children:e.jsx(R,{size:20})})]})]}),e.jsx("div",{className:"w-full grid grid-cols-2 gap-4 border-t",children:r.data.length>0?r.data.map((t,o)=>e.jsxs("div",{className:"flex flex-row bg-slate-200 p-4 mt-5 rounded-2xl shadow items-center",children:[e.jsx("img",{src:"/images/file/"+t.type+".png",alt:"Icon materi",className:"h-10 w-10"}),e.jsxs("div",{className:"ms-4",children:[e.jsx("h1",{className:"text-lg font-extrabold",children:t.judul}),e.jsx("p",{className:"text-sm",children:U(t.updated_at)})]}),e.jsxs("div",{className:"dropdown dropdown-bottom ms-auto",children:[e.jsx("div",{tabIndex:0,role:"button",className:"btn btn-ghost",children:e.jsx(V,{})}),e.jsxs("ul",{tabIndex:0,className:"dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow",children:[e.jsx("li",{className:"border-b",children:e.jsxs("a",{children:[e.jsx(z,{})," Lihat Materi"]})}),e.jsx("li",{className:"border-b",children:e.jsxs("button",{onClick:()=>{x(t),document.getElementById("modal-edit").showModal()},children:[e.jsx(F,{})," Edit Materi"]})}),e.jsx("li",{children:e.jsxs("button",{onClick:()=>{l(t),document.getElementById("modal-delete").showModal()},children:[e.jsx(L,{}),"Hapus"]})})]})]})]},o)):e.jsx("div",{className:"mt-5 text-center col-span-2",children:"Tidak ada data"})})]})})})},H=()=>{const{data:s,setData:r,post:l,reset:x}=C({judul:"",deskripsi:"",file:"",type:""}),[t,o]=n.useState({}),[d,m]=n.useState(""),p=n.useRef(null),f=()=>{p.current.click()},j=a=>{const u=a.target.files[0],v=u.name.split(".").pop().toLowerCase(),i=/(\.pdf|\.docx|\.doc|\.ppt|\.pptx)$/i;let c=!0;u.size/1024/1024>25?(o({...t,file:"*Ukuran file tidak boleh lebih dari 25 MB"}),c=!1):i.exec(u.name)||(o({...t,file:"*Hanya mendukung file dengan ekstensi .pdf | .docx | .doc | .ppt | .pptx"}),c=!1),c&&(r({...s,type:{pdf:"pdf",docx:"docx",doc:"docx",ppt:"pptx",pptx:"pptx"}[v],file:u}),m(u.name))},N=()=>{let a={};return s.judul===""&&(a.judul="*Mohon masukkan judul materi"),s.deskripsi===""&&(a.deskripsi="*Mohon masukkan deskripsi materi"),s.file===""&&(a.file="*Mohon pilih file materi"),o(a),Object.keys(a).length<1},k=a=>{if(a.preventDefault(),!N()){w.warning("Periksa kesalahan pada formulir");return}l(route("materi.store"),{forceFormData:!0,onSuccess:()=>{x(),o({}),document.getElementById("modal-add").close(),b.reload()},onError:u=>{o(u.error)}})};return e.jsxs("dialog",{id:"modal-add",className:"modal",children:[e.jsxs("div",{className:"modal-box",children:[e.jsxs("h3",{className:"font-bold text-lg flex items-center",children:[e.jsx(h,{})," Unggah Materi"]}),e.jsx("form",{onSubmit:k,children:e.jsxs("div",{className:"flex flex-col gap-5 w-full mt-5",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",value:s.judul,onChange:a=>r("judul",a.target.value),placeholder:"Judul materi",className:"input input-bordered w-full"}),e.jsx("span",{className:t.judul?"text-red-500 text-sm":"hidden",children:t.judul})]}),e.jsx("input",{type:"file",className:"hidden",ref:p,onChange:j}),e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsx("button",{type:"button",className:"btn btn-sm btn-info text-white",onClick:f,children:"Pilih File"}),e.jsx("p",{children:d===""?"Belum ada file!":d})]}),e.jsx("span",{className:t.file?"text-red-500 text-sm":"hidden",children:t.file}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",value:s.deskripsi,onChange:a=>r("deskripsi",a.target.value),placeholder:"Deskripsi singkat",className:"input input-bordered w-full"}),e.jsx("span",{className:t.deskripsi?"text-red-500 text-sm":"hidden",children:t.deskripsi})]}),e.jsxs("button",{type:"submit",className:"btn btn-primary",children:[e.jsx(h,{})," Unggah"]})]})})]}),e.jsx("form",{method:"dialog",className:"modal-backdrop",children:e.jsx("button",{children:"close"})})]})},A=()=>{const{edit:s,setEdit:r}=n.useContext(g),{data:l,setData:x,put:t,reset:o}=C({judul:"",deskripsi:"",file:null,type:""});n.useEffect(()=>{s&&x({...l,judul:s.judul,deskripsi:s.deskripsi,type:s.type})},[s]);const[d,m]=n.useState({}),[p,f]=n.useState(""),j=n.useRef(null),N=()=>{j.current.click()},k=i=>{const c=i.target.files[0],M=c.name.split(".").pop().toLowerCase(),E=/(\.pdf|\.docx|\.doc|\.ppt|\.pptx)$/i;let y=!0;c.size/1024/1024>25?(m({...d,file:"*Ukuran file tidak boleh lebih dari 25 MB"}),y=!1):E.exec(c.name)||(m({...d,file:"*Hanya mendukung file dengan ekstensi .pdf | .docx | .doc | .ppt | .pptx"}),y=!1),y&&(x({...l,type:{pdf:"pdf",docx:"docx",doc:"docx",ppt:"pptx",pptx:"pptx"}[M],file:c}),f(c.name))},a=()=>{let i={};return l.judul===""&&(i.judul="*Mohon masukkan judul materi"),l.deskripsi===""&&(i.deskripsi="*Mohon masukkan deskripsi materi"),m(i),Object.keys(i).length<1},u=()=>{r(null),o(),m({}),f(""),document.getElementById("modal-edit").close()},v=i=>{if(i.preventDefault(),!a()){w.warning("Periksa kesalahan pada formulir");return}b.post(`/materi/${s.id}`,{_method:"put",...l},{onSuccess:()=>{u(),b.reload()},onError:c=>{m(c.error)}})};return e.jsx("dialog",{id:"modal-edit",className:"modal",children:e.jsxs("div",{className:"modal-box",children:[e.jsxs("h3",{className:"font-bold text-lg flex items-center",children:[e.jsx(h,{})," Edit Materi"]}),e.jsx("form",{onSubmit:v,children:e.jsxs("div",{className:"flex flex-col gap-5 w-full mt-5",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",value:l.judul,onChange:i=>x("judul",i.target.value),placeholder:"Judul materi",className:"input input-bordered w-full"}),e.jsx("span",{className:d.judul?"text-red-500 text-sm":"hidden",children:d.judul})]}),e.jsx("input",{type:"file",className:"hidden",ref:j,onChange:k}),e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsx("button",{type:"button",className:"btn btn-sm btn-info text-white",onClick:N,children:"Pilih File"}),e.jsx("p",{children:p===""?`${l.judul}.${l.type}`:p})]}),e.jsx("span",{className:d.file?"text-red-500 text-sm":"hidden",children:d.file}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("input",{type:"text",value:l.deskripsi,onChange:i=>x("deskripsi",i.target.value),placeholder:"Deskripsi singkat",className:"input input-bordered w-full"}),e.jsx("span",{className:d.deskripsi?"text-red-500 text-sm":"hidden",children:d.deskripsi})]}),e.jsxs("div",{className:"flex justify-center gap-5",children:[e.jsx("button",{type:"button",onClick:u,className:"btn btn-error text-white px-10",children:" Batal"}),e.jsxs("button",{type:"submit",className:"btn btn-primary",children:[e.jsx(h,{})," Perbarui Materi"]})]})]})})]})})},G=()=>{const{del:s,setDelete:r}=n.useContext(g);return e.jsx("dialog",{id:"modal-delete",className:"modal",role:"dialog",children:e.jsxs("div",{className:"modal-box",children:[e.jsx("form",{method:"dialog",children:e.jsx("button",{className:"btn btn-sm btn-circle btn-ghost absolute right-2 top-2",children:"✕"})}),e.jsxs("div",{className:"text-center mt-10",children:[e.jsx("p",{className:"text-center",children:"Apakah anda yakin ingin menghapus data materi?"}),e.jsxs("p",{className:"text-center font-bold",children:['"',s==null?void 0:s.judul,'"']}),e.jsxs("div",{className:"text-center",children:[e.jsx("button",{className:"btn btn-error rounded-full mt-5 px-5",onClick:()=>document.getElementById("modal-delete").close(),children:"Batal"}),e.jsx("button",{className:"btn btn-md rounded-full mt-5 px-5 ms-4",onClick:()=>{b.delete(route("materi.destroy",s==null?void 0:s.id),{onSuccess:()=>{r(null),w.success("Materi di hapus"),document.getElementById("modal-delete").close()}})},children:"Hapus"})]})]})]})})};export{q as default};
