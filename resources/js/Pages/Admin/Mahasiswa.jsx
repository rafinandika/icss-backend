import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { randomString } from '@/Service/usability'
import { router, useForm } from '@inertiajs/react'
import React, { useContext, useEffect, useState } from 'react'
import {
    MdDelete,
    MdEdit,
    MdOutlineLockReset,
    MdOutlinePersonAdd,
    MdPeopleOutline,
    MdVisibility,
    MdVisibilityOff
} from 'react-icons/md';

const MahasiswaContext = React.createContext()

const Mahasiswa = ({ mahasiswa }) => {
    const [edit, setEdit] = useState(null);
    const [del, setDel] = useState({ id: '', nama: '' });
    return (
        <AuthenticatedLayout>
            <div className="flex font-bold text-3xl gap-2 border-b p-4">
                <MdPeopleOutline size={37} /> Mahasiswa
            </div>
            <div className='flex justify-end my-3 mt-10'>
                <button onClick={() => document.getElementById('modal-add').showModal()}
                    className='btn btn-primary rounded-xl text-white'>
                    <MdOutlinePersonAdd size={20} /> Mahasiswa
                </button>
            </div>
            <MahasiswaContext.Provider value={{ mahasiswa, edit, setEdit, del, setDel }}>
                <List />
                <ModalEdit />
                <ModalDelete />
            </MahasiswaContext.Provider>
            <ModalAdd />
        </AuthenticatedLayout>
    )
}

const List = () => {
    const { mahasiswa, setEdit, setDel } = React.useContext(MahasiswaContext)
    return (
        <div className="card bg-base-100 text-center shadow-xl">
            <div className='bg-gray-700 text-center text-white rounded-t-lg p-2'>
                Daftar Mahasiswa
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
                                <th>Mahasiwa</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {mahasiswa.data.map((mahasiswa, index) => (
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
                                                        src={`/storage/${mahasiswa.foto}`}
                                                        alt="Avatar BML" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{mahasiswa.name}</div>
                                                <div className="text-sm opacity-50">{mahasiswa.username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {mahasiswa.email}
                                    </td>
                                    <td>
                                        {mahasiswa.email_verified_at === null ? 'Belum diverifikasi' : mahasiswa.aktif ? 'Aktif' : 'Tidak aktif'}
                                    </td>
                                    <th className='text-center'>
                                        <button
                                            onClick={() => {
                                                setEdit(mahasiswa);
                                                document.getElementById('modal-edit').showModal();
                                            }}
                                            className="btn btn-ghost btn-xs" >
                                            <MdEdit color='blue' size={17} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setDel({ id: mahasiswa.id, nama: mahasiswa.name });
                                                document.getElementById('modal-delete').showModal();
                                            }}
                                            className="btn btn-ghost btn-xs">
                                            <MdDelete color='red' size={17} />
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                        {/* foot */}
                    </table>
                </div>
            </div>
        </div>
    )
}

const ModalAdd = () => {
    const [password, setPassword] = useState(true)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        is_dosen: 0,
        is_admin: 0,
        aktif: 0
    })

    const generatePassword = () => {
        const string = randomString(8);
        setData('password', string);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mahasiswa.store'), {
            onSuccess: () => {
                reset('password', 'name', 'email', 'is_dosen', 'is_admin', 'aktif')
                document.getElementById('modal-add').close();
                router.reload();
            },
        });
    }
    return (
        <dialog id="modal-add" className="modal" role='dialog'>
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg flex flex-row items-center gap-3 modal-title"><MdOutlinePersonAdd /> Tambah Mahasiswa</h3>
                <form onSubmit={handleSubmit}>
                    <label className="form-control w-full mt-4">
                        <div className="label">
                            <span className="label-text">Nama</span>
                        </div>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Nama mahasiswa"
                            className="input input-bordered w-full" />
                        <div className="label">
                            <span className={`label-text-alt text-red-500 ${errors.name ? "visible" : "hidden"}`}>Nama mahasiswa tidak boleh kosong</span>
                        </div>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="text"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Email mahasiswa"
                            className="input input-bordered w-full" />
                        <div className="label">
                            <span className={`label-text-alt text-red-500 ${errors.email ? "visible" : "hidden"}`}>{errors.email}</span>
                        </div>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Username</span>
                        </div>
                        <input
                            type="text"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            placeholder="Gunakan NPM"
                            className="input input-bordered w-full" />
                        <div className="label">
                            <span className={`label-text-alt text-red-500 ${errors.username ? "visible" : "hidden"}`}>{errors.username}</span>
                        </div>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type={!password ? "text" : "password"}
                                className="grow border-none focus:ring-0 rounded-lg"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password" />
                            <button type='button' onClick={() => setPassword(!password)}>{password ? <MdVisibilityOff /> : <MdVisibility />}</button>
                            <button type='button' onClick={generatePassword}><MdOutlineLockReset /></button>
                        </label>
                        <div className="label">
                            <span className={`label-text-alt text-red-500 ${errors.password ? "visible" : "hidden"}`}>{errors.password}</span>
                        </div>
                    </label>
                    <div className='text-center'>
                        <button className='btn btn-primary mt-5 px-5' type='submit'>Simpan</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

const ModalEdit = () => {
    const { edit, setEdit } = useContext(MahasiswaContext);
    const { data, setData, put, processing, errors, reset } = useForm({
        id: '',
        name: '',
        username: '',
        email: '',
        is_dosen: 0,
        is_admin: 0,
        aktif: 0
    });

    useEffect(() => {
        if (edit !== null) {
            setData({
                id: edit.id,
                name: edit.name,
                username: edit.username,
                email: edit.email,
                is_dosen: edit.is_dosen,
                is_admin: edit.is_admin,
                aktif: edit.aktif
            });
        }
    }, [edit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('mahasiswa.update'), {
            onSuccess: () => {
                setEdit(null);
                reset('password', 'name', 'email', 'is_dosen', 'is_admin', 'aktif')
                document.getElementById('modal-edit').close();
                router.reload();
            },
        });
    }


    return (
        <dialog id="modal-edit" className="modal" role='dialog'>
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg flex flex-row items-center gap-3 modal-title"><MdOutlinePersonAdd /> Edit Mahasiswa</h3>
                <form onSubmit={handleSubmit}>
                    <label className="form-control w-full mt-4">
                        <div className="label">
                            <span className="label-text">Nama</span>
                        </div>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Nama mahasiswa"
                            className="input input-bordered w-full" />
                        <div className="label">
                            <span className={`label-text-alt text-red-500 ${errors.name ? "visible" : "hidden"}`}>Nama mahasiswa tidak boleh kosong</span>
                        </div>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="text"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Email mahasiswa"
                            className="input input-bordered w-full" />
                        <div className="label">
                            <span className={`label-text-alt text-red-500 ${errors.email ? "visible" : "hidden"}`}>{errors.email}</span>
                        </div>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Username</span>
                        </div>
                        <input
                            type="text"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            placeholder="Gunakan NPM"
                            className="input input-bordered w-full" />
                        <div className="label">
                            <span className={`label-text-alt text-red-500 ${errors.username ? "visible" : "hidden"}`}>{errors.username}</span>
                        </div>
                    </label>
                    <div className='text-center'>
                        <button className='btn btn-primary mt-5 px-5' type='submit'>Simpan</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

const ModalDelete = () => {
    const { del, setDel } = useContext(MahasiswaContext);

    return (
        <dialog id="modal-delete" className="modal" role='dialog'>
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className='text-center mt-10'>
                    <p className='text-center'>Apakah anda yakin ingin menghapus data {del.nama}?</p>
                    <div className='text-center'>
                        <button className='btn btn-error rounded-full mt-5 px-5' onClick={() => document.getElementById('modal-delete').close()}>Batal</button>
                        <button className='btn btn-md rounded-full mt-5 px-5 ms-4' onClick={() => {
                            router.delete(route('mahasiswa.destroy', del.id), {
                                onSuccess: () => {
                                    setDel({ id: '', nama: '' });
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

export default Mahasiswa