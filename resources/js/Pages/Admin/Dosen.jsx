import { Add } from '@/Component/dosen/DosenAdd'
import { Edit } from '@/Component/dosen/DosenEdit'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { router } from '@inertiajs/react'
import React, { useContext, useEffect, useState } from 'react'
import { MdDelete, MdEdit, MdOutlinePeople, MdOutlinePersonAdd } from 'react-icons/md'


export const DosenContext = React.createContext()
const Dosen = ({ dosen }) => {
    const [view, setView] = useState({ type: 'loading', data: null });
    const [del, setDelete] = useState({ data: null });
    useEffect(() => {
        if (dosen.data.length === 0) {
            setView({ type: 'kosong', data: null })
        } else {
            setView({ type: 'list', data: dosen })
        }
    }, [dosen]);

    return (
        <AuthenticatedLayout>
            <div className="flex font-bold text-3xl gap-2 border-b p-4">
                <MdOutlinePeople size={37} /> Instruktur
            </div>
            {(view.type === 'list' || view.type === 'kosong') &&
                <div className='flex justify-end my-3 mt-10'>
                    <button onClick={() => setView({ type: 'add', data: null })}
                        className='btn btn-primary rounded-xl text-white'>
                        <MdOutlinePersonAdd size={20} />Tambah Instruktur
                    </button>
                </div>
            }
            <DosenContext.Provider value={{ view, setView, del, setDelete }}>
                {view.type === 'loading' && <Basic title={'Memuat data...'} spinner={true} />}
                {view.type === 'kosong' && <Basic title={'Data dosen masih kosong'} spinner={false} />}
                {view.type === 'add' && <Add />}
                {view.type === 'edit' && <Edit editData={view.data} />}
                {view.type === 'list' && <List />}
            </DosenContext.Provider>
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

const List = () => {
    const { view, setView, setDelete } = React.useContext(DosenContext)
    return (
        <div className="card bg-base-100 text-center shadow-xl">
            <div className='bg-gray-700 text-center text-white rounded-t-lg p-2'>
                Daftar Dosen
            </div>
            <div className="card-body">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Instruktur</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {view.data.data.map((dosen, index) => (
                                <tr key={index}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={`/storage/${dosen.foto}`}
                                                        alt="Avatar BML" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{dosen.nama}</div>
                                                <div className="text-sm opacity-50">NIP {dosen.nip}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{dosen.user.email}</td>
                                    <td>{dosen.menikah ? "Menikah" : "Belum Menikah"}</td>
                                    <td>
                                        {/* <button className="btn btn-ghost btn-sm">Detail</button> */}
                                        <button className="btn btn-ghost btn-sm text-yellow-500" onClick={() => setView({ type: 'edit', data: dosen })}><MdEdit /></button>
                                        <button className="btn btn-ghost btn-sm text-red-500" onClick={() => {
                                            document.getElementById('modal-delete').showModal();
                                            setDelete(dosen)
                                        }} ><MdDelete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <ModalDelete />
            </div>
        </div>
    );
}

const ModalDelete = () => {
    const { del, setDelete } = useContext(DosenContext);

    return (
        <dialog id="modal-delete" className="modal" role='dialog'>
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className='text-center mt-10'>
                    <p className='text-center'>Apakah anda yakin ingin menghapus data instruktur?</p>
                    <p className='text-center font-bold'>"{del?.nama}"</p>
                    <div className='text-center'>
                        <button className='btn btn-error rounded-full mt-5 px-5' onClick={() => document.getElementById('modal-delete').close()}>Batal</button>
                        <button className='btn btn-md rounded-full mt-5 px-5 ms-4' onClick={() => {
                            router.delete(route('dosen.destroy', del?.id), {
                                onSuccess: () => {
                                    setDelete({ data: null });
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

export default Dosen