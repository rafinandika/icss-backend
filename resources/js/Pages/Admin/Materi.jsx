import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { MdDelete, MdDownload, MdEdit, MdFileOpen, MdFileUpload, MdGridView, MdReadMore, MdViewList } from 'react-icons/md'
import { HiDotsVertical } from "react-icons/hi";
import { formatDate } from '@/Service/usability';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

const MateriContext = React.createContext();
const Materi = ({ materi }) => {
    const [view, setView] = useState('grid');
    const [del, setDelete] = useState(null);
    const [edit, setEdit] = useState(null);
    return (
        <AuthenticatedLayout>
            <div className="flex font-bold text-3xl justify-between gap-2 border-b p-4">
                <div className="flex">
                    <MdFileOpen size={37} /> Materi
                </div>
                <div className="flex justify-between mb-4">
                    <div></div>
                    <div>
                        <button className='btn btn-info text-white px-5' onClick={() => document.getElementById('modal-add').showModal()}><MdFileUpload /> Unggah</button>
                    </div>
                </div>
            </div>
            <MateriContext.Provider value={{ materi, view, setView, del, setDelete, edit, setEdit }}>
                <List />
                <ModalDelete />
                <ModalAdd />
                <ModalEdit />
            </MateriContext.Provider>
        </AuthenticatedLayout>
    )
}

const List = () => {
    const { view, materi, setDelete, setEdit } = useContext(MateriContext);
    return (
        <div className='card bg-white shadow-xl h-full mt-5'>
            <div className='card-body h-svh'>
                <div className="grid grid-rows-1 gap-5">
                    <div className="flex justify-between">
                        <div></div>
                        <div className='flex gap-1'>
                            <button className={`btn ${view === "grid" ? "text-white btn-neutral" : "text-gray-500"} btn-sm`}><MdGridView size={20} /></button>
                            <button className='btn text-gray-500 btn-sm'><MdViewList size={20} /></button>
                        </div>
                    </div>
                    <div className='w-full grid grid-cols-2 gap-4 border-t'>
                        {materi.data.length > 0 ? materi.data.map((item, index) => (
                            <div key={index} className='flex flex-row bg-slate-200 p-4 mt-5 rounded-2xl shadow items-center'>
                                <img src={'/images/file/' + item.type + '.png'} alt="Icon materi" className='h-10 w-10' />
                                <div className='ms-4'>
                                    <h1 className='text-lg font-extrabold'>{item.judul}</h1>
                                    <p className='text-sm'>{formatDate(item.updated_at)}</p>
                                </div>
                                <div className="dropdown dropdown-bottom ms-auto">
                                    <div tabIndex={0} role="button" className="btn btn-ghost"><HiDotsVertical /></div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                        <li className='border-b'><a><MdReadMore /> Lihat Materi</a></li>
                                        <li className='border-b'><a href={`/storage/${item.file}`} download={item.judul}><MdDownload /> Unduh Materi</a></li>
                                        <li className='border-b'><button onClick={() => {
                                            setEdit(item)
                                            document.getElementById('modal-edit').showModal()
                                        }}><MdEdit /> Edit Materi</button></li>
                                        <li><button onClick={() => {
                                            setDelete(item)
                                            document.getElementById('modal-delete').showModal()
                                        }}><MdDelete />Hapus</button></li>
                                    </ul>
                                </div>
                            </div>
                        )) :
                            <div className='mt-5 text-center col-span-2'>
                                Tidak ada data
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
const ModalAdd = () => {
    const { data, setData, post, reset } = useForm({
        judul: '',
        deskripsi: '',
        file: '',
        type: '',
        video: null,
    })

    const [errors, setError] = useState({});
    const [displayName, setDisplayName] = useState('');
    const fileInput = useRef(null);
    const pilihFile = () => {
        fileInput.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const re = /(\.pdf|\.docx|\.doc|\.ppt|\.pptx)$/i;
        let status = true;
        if (file.size / 1024 / 1024 > 25) {
            setError({ ...errors, file: '*Ukuran file tidak boleh lebih dari 25 MB' });
            status = false;
        } else if (!re.exec(file.name)) {
            setError({ ...errors, file: '*Hanya mendukung file dengan ekstensi .pdf | .docx | .doc | .ppt | .pptx' });
            status = false;
        }

        const extRef = {
            pdf: 'pdf',
            docx: 'docx',
            doc: 'docx',
            ppt: 'pptx',
            pptx: 'pptx',
        }
        if (status) {
            setData({
                ...data,
                type: extRef[fileExtension],
                file: file
            });
            setDisplayName(file.name);
        }

    }
    const formValidation = () => {
        let newError = {};
        if (data.judul === '') newError['judul'] = `*Mohon masukkan judul materi`;
        if (data.deskripsi === '') newError['deskripsi'] = `*Mohon masukkan deskripsi materi`;
        if (data.file === '') newError['file'] = `*Mohon pilih file materi`;
        setError(newError);
        return Object.keys(newError).length < 1;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValidation()) {
            toast.warning('Periksa kesalahan pada formulir');
            return;
        }
        post(route('materi.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setError({});
                document.getElementById('modal-add').close();
                router.reload();
            },
            onError: (error) => {
                setError(error.error);
            }
        })
    }

    return (
        <dialog id="modal-add" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg flex items-center"><MdFileUpload /> Unggah Materi</h3>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-5 w-full mt-5'>
                        <div className='flex flex-col'>
                            <input
                                type="text"
                                value={data.judul}
                                onChange={e => setData('judul', e.target.value)}
                                placeholder="Judul materi"
                                className="input input-bordered w-full" />
                            <span className={errors['judul'] ? "text-red-500 text-sm" : "hidden"}>{errors['judul']}</span>
                        </div>
                        <input type="file" className="hidden" ref={fileInput} onChange={handleFileChange} />
                        <div className='flex items-center gap-5'>
                            <button
                                type='button'
                                className='btn btn-sm btn-info text-white'
                                onClick={pilihFile}>
                                Pilih File
                            </button>
                            <p>{displayName === '' ? 'Belum ada file!' : displayName}</p>
                        </div>
                        <span className={errors['file'] ? "text-red-500 text-sm" : "hidden"}>{errors['file']}</span>
                        <div className='flex flex-col'>
                            <input
                                type="text"
                                value={data.video}
                                onChange={e => setData('video', e.target.value)}
                                placeholder="Tambahkan video (opsional)"
                                className="input input-bordered w-full" />
                            <span className="text-red-500 text-sm">*Pastikan url video valid, dengan format https://</span>
                        </div>
                        <div className='flex flex-col'>
                            <input
                                type="text"
                                value={data.deskripsi}
                                onChange={e => setData('deskripsi', e.target.value)}
                                placeholder="Deskripsi singkat"
                                className="input input-bordered w-full" />
                            <span className={errors['deskripsi'] ? "text-red-500 text-sm" : "hidden"}>{errors['deskripsi']}</span>
                        </div>
                        <button type="submit" className='btn btn-primary'><MdFileUpload /> Unggah</button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}
const ModalEdit = () => {
    const { edit, setEdit } = useContext(MateriContext);
    const { data, setData, put, reset } = useForm({
        judul: '',
        deskripsi: '',
        file: null,
        video: null,
        type: '',
    })

    useEffect(() => {
        if (!edit) return;
        setData({
            ...data,
            judul: edit.judul,
            deskripsi: edit.deskripsi,
            type: edit.type,
            video: edit.video
        })
    }, [edit])

    const [errors, setError] = useState({});
    const [displayName, setDisplayName] = useState('');
    const fileInput = useRef(null);
    const pilihFile = () => {
        fileInput.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const re = /(\.pdf|\.docx|\.doc|\.ppt|\.pptx)$/i;
        let status = true;
        if (file.size / 1024 / 1024 > 25) {
            setError({ ...errors, file: '*Ukuran file tidak boleh lebih dari 25 MB' });
            status = false;
        } else if (!re.exec(file.name)) {
            setError({ ...errors, file: '*Hanya mendukung file dengan ekstensi .pdf | .docx | .doc | .ppt | .pptx' });
            status = false;
        }

        const extRef = {
            pdf: 'pdf',
            docx: 'docx',
            doc: 'docx',
            ppt: 'pptx',
            pptx: 'pptx',
        }
        if (status) {
            setData({
                ...data,
                type: extRef[fileExtension],
                file: file
            });
            setDisplayName(file.name);
        }

    }

    const formValidation = () => {
        let newError = {};
        if (data.judul === '') newError['judul'] = `*Mohon masukkan judul materi`;
        if (data.deskripsi === '') newError['deskripsi'] = `*Mohon masukkan deskripsi materi`;
        setError(newError);
        return Object.keys(newError).length < 1;
    }
    const handleCLose = () => {
        setEdit(null);
        reset();
        setError({});
        setDisplayName('');
        document.getElementById('modal-edit').close();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValidation()) {
            toast.warning('Periksa kesalahan pada formulir');
            return;
        }
        router.post(`/materi/${edit.id}`, { _method: 'put', ...data }, {
            onSuccess: () => {
                handleCLose();
                router.reload();
            },
            onError: (error) => {
                setError(error.error);
            }
        });
    }

    return (
        <dialog id="modal-edit" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg flex items-center"><MdFileUpload /> Edit Materi</h3>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-5 w-full mt-5'>
                        <div className='flex flex-col'>
                            <input
                                type="text"
                                value={data.judul}
                                onChange={e => setData('judul', e.target.value)}
                                placeholder="Judul materi"
                                className="input input-bordered w-full" />
                            <span className={errors['judul'] ? "text-red-500 text-sm" : "hidden"}>{errors['judul']}</span>
                        </div>
                        <input type="file" className="hidden" ref={fileInput} onChange={handleFileChange} />
                        <div className='flex items-center gap-5'>
                            <button
                                type='button'
                                className='btn btn-sm btn-info text-white'
                                onClick={pilihFile}>
                                Pilih File
                            </button>
                            <p>{displayName === '' ? `${data.judul}.${data.type}` : displayName}</p>
                        </div>
                        <span className={errors['file'] ? "text-red-500 text-sm" : "hidden"}>{errors['file']}</span>
                        <div className='flex flex-col'>
                            <input
                                type="text"
                                value={data.video}
                                onChange={e => setData('video', e.target.value)}
                                placeholder="Tambahkan video (opsional)"
                                className="input input-bordered w-full" />
                            <span className="text-red-500 text-sm">*Pastikan url video valid, dengan format https://</span>
                        </div>
                        <div className='flex flex-col'>
                            <input
                                type="text"
                                value={data.deskripsi}
                                onChange={e => setData('deskripsi', e.target.value)}
                                placeholder="Deskripsi singkat"
                                className="input input-bordered w-full" />
                            <span className={errors['deskripsi'] ? "text-red-500 text-sm" : "hidden"}>{errors['deskripsi']}</span>
                        </div>
                        <div className='flex justify-center gap-5'>
                            <button type="button" onClick={handleCLose} className='btn btn-error text-white px-10'> Batal</button>
                            <button type="submit" className='btn btn-primary'><MdFileUpload /> Perbarui Materi</button>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    )
}
const ModalDelete = () => {
    const { del, setDelete } = useContext(MateriContext);

    return (
        <dialog id="modal-delete" className="modal" role='dialog'>
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className='text-center mt-10'>
                    <p className='text-center'>Apakah anda yakin ingin menghapus data materi?</p>
                    <p className='text-center font-bold'>"{del?.judul}"</p>
                    <div className='text-center'>
                        <button className='btn btn-error rounded-full mt-5 px-5' onClick={() => document.getElementById('modal-delete').close()}>Batal</button>
                        <button className='btn btn-md rounded-full mt-5 px-5 ms-4' onClick={() => {
                            router.delete(route('materi.destroy', del?.id), {
                                onSuccess: () => {
                                    setDelete(null);
                                    toast.success('Materi di hapus');
                                    document.getElementById('modal-delete').close();
                                },
                            });
                        }}>Hapus</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default Materi