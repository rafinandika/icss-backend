import Add from '@/Component/tugas/Add';
import Edit from '@/Component/tugas/Edit';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { cutString } from '@/Service/usability';
import { router } from '@inertiajs/react';
import React, { useContext, useEffect, useState } from 'react'
import { MdAdd, MdDelete, MdDetails, MdDocumentScanner, MdEdit, MdReadMore } from 'react-icons/md'
import { toast } from 'react-toastify';

export const TugasContext = React.createContext();
const Tugas = ({ tugas }) => {
    const [view, setView] = useState({ type: 'loading', data: null });
    const [del, setDelete] = useState({ data: null });

    useEffect(() => {
        if (tugas.data.length === 0) {
            setView({ type: 'kosong', data: null })
        } else {
            setView({ type: 'list', data: tugas })
        }
    }, [tugas]);

    return (
        <AuthenticatedLayout>
            <div className="flex font-bold text-3xl gap-2 border-b p-4">
                <MdDocumentScanner size={37} /> Evaluasi
            </div>
            {(view.type === 'list' || view.type === 'kosong') && (
                <div className="flex justify-end my-3 mt-10">
                    <button
                        onClick={() => setView({ type: 'add', data: null })}
                        className="btn btn-info rounded-xl text-white"
                    >
                        <MdAdd size={20} /> Tambah Evaluasi
                    </button>
                </div>
            )}
            {view.type === 'loading' && <Basic title="Memuat data..." spinner={true} />}
            {view.type === 'kosong' && <Basic title="Data evaluasi masih kosong" spinner={false} />}
            {view.type === 'add' && <Add />}
            <TugasContext.Provider value={{ view, setView, del, setDelete }}>
                {view.type === 'list' && <List list={view.data} />}
                {view.type === 'edit' && <Edit />}
                <ModalDelete del={del} setDelete={setDelete} />
            </TugasContext.Provider>
        </AuthenticatedLayout>
    )
}

const Basic = ({ title, spinner = false }) => {
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-16">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 py-6 flex justify-center">
                    {spinner && <span className="loading loading-spinner loading-md me-2"></span>} {title}
                </div>
            </div>
        </div>
    )
}

const List = ({ list }) => {
    const { setView, setDelete } = React.useContext(TugasContext);
    return (
        <div className="max-w-full mx-auto sm:px-6 lg:px-8 mt-16">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 py-6 flex justify-center">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Tugas</th>
                                <th>Deskripsi</th>
                                <th>Atlet</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.data.map((tugas, index) => (
                                <tr key={index}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>{tugas.judul}</td>
                                    <td>{cutString(tugas.deskripsi, 10)}</td>
                                    <td>{tugas.submit.length} Submit</td>
                                    <td>
                                        <button className="btn btn-sm btn-ghost">
                                            <MdReadMore />
                                        </button>
                                        <button onClick={() => setView({ type: 'edit', data: tugas })}
                                        className="btn btn-sm btn-ghost">
                                            <MdEdit color='yellow' />
                                        </button>
                                        <button onClick={() => {
                                            setDelete(tugas);
                                            document.getElementById('modal-delete').showModal();
                                        }}
                                            className="btn btn-sm btn-ghost">
                                            <MdDelete color='red' />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const ModalDelete = () => {
    const { del, setDelete } = useContext(TugasContext);

    return (
        <dialog id="modal-delete" className="modal" role='dialog'>
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className='text-center mt-10'>
                    <p className='text-center'>Apakah anda yakin ingin menghapus data tugas?</p>
                    <p className='text-center font-bold'>"{del?.judul}"</p>
                    <div className='text-center'>
                        <button className='btn btn-error rounded-full mt-5 px-5' onClick={() => document.getElementById('modal-delete').close()}>Batal</button>
                        <button className='btn btn-md rounded-full mt-5 px-5 ms-4' onClick={() => {
                            router.delete(route('tugas.destroy', del?.id), {
                                onSuccess: () => {
                                    setDelete({ data: null });
                                    toast.success('Tugas di hapus');
                                    document.getElementById('modal-delete').close();
                                    router.refresh();
                                },
                            });
                        }}>Hapus</button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}
export default Tugas