import { router, useForm } from "@inertiajs/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";

const DosenEditContext = createContext()
export const Edit = ({ editData }) => {
    const { data, setData, put, processing, reset } = useForm({
        id: editData.id,
        foto: null,
        nama: '',
        nip: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        menikah: false,
        istri: '',
        anak: null,
        deskripsi: '',
        pendidikan: [
            { tahun: '', tempat: '', tingkat: '', deskripsi: '' }
        ],
        user: {
            id: '',
            name: '',
            username: '',
            password_confirmation: '',
            email: '',
            password: '',
            is_dosen: 1,
            admin: 0,
            aktif: 1
        }
    });

    useEffect(() => {
        setData({
            ...data,
            nip: editData.nip,
            nama: editData.nama,
            tempat_lahir: editData.tempat_lahir,
            tanggal_lahir: editData.tanggal_lahir,
            menikah: editData.menikah,
            istri: editData.istri,
            deskripsi: editData.deskripsi,
            anak: JSON.parse(editData.anak),
            pendidikan: JSON.parse(editData.pendidikan),
            user: {
                id: editData.user.id,
                name: editData.user.name,
                username: editData.user.username,
                password_confirmation: editData.user.password_confirmation,
                email: editData.user.email,
                is_dosen: 1,
                admin: editData.user.is_admin,
                aktif: editData.user.aktif
            }
        });
    }, [editData]);
    const [errors, setError] = useState({});

    const formValidation = () => {
        let newError = {};
        if (data.nama === '') newError['nama'] = `*Mohon masukkan Nama`;
        if (data.nip === '') newError['nip'] = `*Mohon masukkan NIP`;
        if (data.tempat_lahir === '') newError['tempat_lahir'] = `*Mohon masukkan tempat lahir`;
        if (data.tanggal_lahir === '') newError['tanggal_lahir'] = `*Mohon masukkan tanggal lahir`;
        if (data.menikah && data.istri === '') newError['istri'] = `*Mohon masukan nama istri`;

        data.pendidikan.forEach((pendidikan, index) => {
            if (pendidikan.tingkat === '') newError['pendidikan.' + index + '.tingkat'] = `*Mohon masukkan tingkat pendidikan`;
            if (pendidikan.tahun === '') newError['pendidikan.' + index + '.tahun'] = `*Mohon masukkan tahun pendidikan`;
            if (pendidikan.tempat === '') newError['pendidikan.' + index + '.tempat'] = `*Mohon masukkan tempat pendidikan`;
        })

        if (data.user.name === '') newError['user.name'] = `*Mohon masukkan Nama`;
        if (data.user.username === '') newError['user.username'] = `*Mohon masukkan Username`;
        if (data.user.email === '') newError['user.email'] = `*Mohon masukkan Email`;
        if (data.anak !== null) {
            data.anak.forEach((anak, index) => {
                if (anak === '') newError['anak.' + index] = `*Mohon masukkan nama anak`;
            })
        }
        setError(newError);

        return Object.keys(newError).length < 1;
    }


    const handleCLose = () => router.visit('/dosen');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValidation()) {
            toast.warning('Periksa kesalahan pada formulir');
            return;
        }

        put(`/dosen/${data.id}`, {
            forceFormData: data.foto === null ? false :  true,
            onSuccess: (success) => {
                toast.success(success.message);
                reset();
                handleCLose();
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
    }
    return (
        <DosenEditContext.Provider value={{ data, setData, errors, setError, editData }}>
            <button type="button" onClick={handleSubmit}>Simpan</button>
            <div className="w-full h-svh flex flex-col justify-between">
                <div className='card bg-base-100 w-full shadow mt-10 col-span-3'>
                    <div className='flex p-2 text-lg font-bold justify-center items-center bg-black text-white rounded-t-xl'>
                        Formulir Edit Data Dosen
                    </div>
                    <div className='card-body flex flex-col gap-4'>
                        <form onSubmit={handleSubmit}>
                            <div className="border-b py-5">
                                <InputFoto />
                                <h2 className="card-title mb-5">Data Diri :</h2>
                                <div className="mb-4 grid grid-cols-2 gap-5">
                                    <div>
                                        <input
                                            type="text"
                                            value={data.nama}
                                            onChange={(e) => setData('nama', e.target.value)}
                                            className="input input-bordered w-full"
                                            placeholder="Nama" />
                                        <span className={errors.nama ? "text-red-500 text-sm" : "hidden"}>{errors.nama}</span>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            value={data.nip}
                                            onChange={(e) => setData('nip', e.target.value)}
                                            className="input input-bordered w-full"
                                            placeholder="NIP" />
                                        <span className={errors.nip ? "text-red-500 text-sm" : "hidden"}>{errors.nip}</span>
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            value={data.tempat_lahir}
                                            onChange={(e) => setData('tempat_lahir', e.target.value)}
                                            className="input input-bordered w-full"
                                            placeholder="Tempat lahir" />
                                        <span className={errors.tempat_lahir ? "text-red-500 text-sm" : "hidden"}>{errors.tempat_lahir}</span>
                                    </div>
                                    <div>
                                        <input
                                            type="date"
                                            value={data.tanggal_lahir}
                                            onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                            className="input input-bordered w-full"
                                            placeholder="Tempat lahir" />
                                        <span className={errors.tanggal_lahir ? "text-red-500 text-sm" : "hidden"}>{errors.tanggal_lahir}</span>
                                    </div>
                                </div>
                                <InputStatus />
                                <InputAnak />
                                <InputPendidikan />
                                <div className="mb-4 grid grid-cols-1 gap-5">
                                    <textarea
                                        value={data.deskripsi}
                                        onChange={(e) => setData('deskripsi', e.target.value)}
                                        className="textarea textarea-bordered"
                                        placeholder="Tambahkan pengalaman atau deskripsi lainnya" />
                                </div>
                            </div>
                            <InputUser />
                            <div className='sticky bottom-0 w-full flex justify-center gap-4 mt-10 mb-3 p-2 bg-white'>
                                <button
                                    type="button"
                                    className='btn btn-error rounded-lg text-white'
                                    onClick={handleCLose}
                                >
                                    Kembali
                                </button>
                                <button
                                    className='btn btn-primary rounded-lg text-white'
                                    type='submit'
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DosenEditContext.Provider>
    );
}

const InputFoto = () => {
    const { data, setData, errors, setError, editData } = useContext(DosenEditContext);
    const [displayImage, setDisplayImage] = useState("/storage/foto-user/default.png");
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const re = /(\.jpg|\.png|\.svg)$/i;
        let status = true;
        if (file.size / 1024 / 1024 > 5) {
            setError({ ...errors, foto: 'Ukuran file tidak boleh lebih dari 5 MB' });
            status = false;
        } else if (!re.exec(file.name)) {
            setError({ ...errors, foto: 'File harus berupa gambar dengan ext .jpg | .png | .svg' });
            status = false;
        }

        if (!status) {
            setData('foto', null);
            setDisplayImage(`/storage/${editData.foto}`);
            return;
        }

        const oFReader = new FileReader();
        oFReader.readAsDataURL(file);
        oFReader.onload = function (oFREvent) {
            setDisplayImage(oFREvent.target.result);
        }
        setError({ ...errors, foto: '' });
        setData('foto', file);
    };
    useEffect(() => {
        setDisplayImage(`/storage/${editData.foto}`);
    }, [editData.foto]);

    return (
        <div className="mb-8 w-full flex flex-col justify-center gap-5">
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div className="flex justify-center">
                <img src={displayImage} alt="Foto Dosen" className="h-40 w-auto" />
            </div>
            <div className="flex justify-center">
                <button onClick={handleButtonClick} type="button" className="btn btn-info btn-sm text-white">Ganti Foto</button>
            </div>
            <div className="flex justify-center">
                <span className={errors.foto ? "text-red-500 text-sm" : "hidden"}>{errors.foto}</span>
            </div>
        </div>
    )
}

const InputStatus = () => {
    const { data, setData, errors } = useContext(DosenEditContext);

    return (
        <div className="mb-4 grid grid-cols-2 gap-5">
            <div className="flex flex-row gap-10">
                <label className="label cursor-pointer">
                    <input
                        type="radio"
                        name="menikah"
                        className="radio checked:bg-red-500 me-3"
                        onChange={(e) => setData('menikah', !data.menikah)}
                        checked={!data.menikah} />
                    <span className="label-text">Belum Menikah</span>
                </label>
                <label className="label cursor-pointer">
                    <input
                        type="radio"
                        name="menikah"
                        className="radio checked:bg-blue-500 me-3"
                        value={true} onChange={(e) =>
                            setData('menikah', !data.menikah)}
                        checked={data.menikah} />
                    <span className="label-text">Menikah</span>
                </label>
            </div>
            {data.menikah && (
                <div>
                    <input
                        type="text"
                        value={data.istri}
                        onChange={(e) => setData('istri', e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Nama istri" />
                    <span className={errors.istri ? "text-red-500 text-sm" : "hidden"}>*Nama istri tidak boleh kosong </span>
                </div>
            )}
        </div>
    )
}


const InputPendidikan = () => {
    const { data, setData, errors } = useContext(DosenEditContext);
    const tambahPendidikan = () => {
        setData('pendidikan', [...data.pendidikan, { tahun: '', tempat: '', tingkat: '', deskripsi: '' }]);
    }

    const hapusPendidikan = (index) => {
        setData('pendidikan', data.pendidikan.filter((_, i) => i !== index));
    }
    return (
        <>
            <div className="grid grid-cols-1 gap-5">
                {data.pendidikan.map((pendidikan, index) => (
                    <div className="mb-4 grid grid-cols-12 gap-5 items-center border-b pb-5" key={index}>
                        <input
                            type="text"
                            value={pendidikan.tingkat}
                            onChange={(e) => setData('pendidikan', data.pendidikan.map((item, i) => i === index ? { ...item, tingkat: e.target.value } : item))}
                            className={`input input-bordered w-full col-span-2 ${errors[`pendidikan.${index}.tingkat`] ? "input-error" : ""}`}
                            placeholder="contoh: S1" />
                        <input
                            type="text"
                            value={pendidikan.tempat}
                            onChange={(e) => setData('pendidikan', data.pendidikan.map((item, i) => i === index ? { ...item, tempat: e.target.value } : item))}
                            className={`input input-bordered w-full col-span-8 ${errors[`pendidikan.${index}.tempat`] ? "input-error" : ""}`}
                            placeholder="Tempat pendidikan" />
                        <input
                            type="text"
                            value={pendidikan.tahun}
                            onChange={(e) => setData('pendidikan', data.pendidikan.map((item, i) => i === index ? { ...item, tahun: e.target.value } : item))}
                            className={`input input-bordered w-full col-span-2 ${errors[`pendidikan.${index}.tahun`] ? "input-error" : ""}`}
                            placeholder="Tahun" />
                        <input
                            type="text"
                            value={pendidikan.deskripsi}
                            onChange={(e) => setData('pendidikan', data.pendidikan.map((item, i) => i === index ? { ...item, deskripsi: e.target.value } : item))}
                            className={`input input-bordered w-full ${data.pendidikan.length === 1 ? 'col-span-12' : 'col-span-11'}`}
                            placeholder="Deskripsi" />
                        {data.pendidikan.length !== 1 && (
                            <button onClick={() => hapusPendidikan(index)} className="btn btn-error text-white btn-sm col-span-1">X</button>
                        )}
                    </div>
                ))}
            </div>
            <button type="button" onClick={tambahPendidikan} className="btn btn-info text-white btn-sm mb-4 px-5">Pendidikan<MdAdd /></button>
        </>
    )
}

const InputAnak = () => {
    const { data, setData, errors } = useContext(DosenEditContext);
    const tambahAnak = () => {
        if (data.anak === null) {
            setData('anak', [''])
        } else {
            setData('anak', [...data.anak, ''])
        }
    }

    const kurangAnak = (index) => {
        if (data.anak.length === 1) {
            setData('anak', null);
        } else {
            setData('anak', data.anak.filter((_, i) => i !== index));
        }
    }

    const changeAnak = (index, value) => {
        setData('anak', data.anak.map((item, i) => i === index ? value : item));
    }

    return (
        <div className="border-b mb-5">
            <div className="mb-4 grid grid-cols-1 gap-5">
                {data.anak !== null && data.anak.map((anak, index) => (
                    <div key={index} className="grid grid-cols-12 justify-center items-center gap-4">
                        <div className="col-span-6">
                            <input
                                type="text"
                                value={data.anak[index]}
                                onChange={(e) => changeAnak(index, e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Nama anak" />
                            <span className={errors[`anak.${index}`] ? "text-red-500 text-sm" : "hidden"}>{errors[`anak.${index}`]}</span>
                        </div>
                        <button type="button" className="btn text-red-500 btn-sm col-span-1" onClick={() => kurangAnak(index)}>X</button>
                    </div>
                ))}
            </div>
            <button type="button" className="btn btn-info text-white btn-sm mb-4 px-5" onClick={tambahAnak}>Data Anak <MdAdd /></button>
        </div>
    )
}

const InputUser = () => {
    const { data, setData, errors } = useContext(DosenEditContext);
    const ambilDataDiri = () => {
        setData('user', {
            ...data.user,
            name: data.nama,
            username: data.nip,
        }
        );
    }
    return (
        <div className="mt-5">
            <h2 className="card-title mb-5">Data User :
                <button type="button" className="btn btn-info text-white btn-sm" onClick={() => ambilDataDiri()}>Sinkron data diri</button>
            </h2>
            <div className="mb-4 grid grid-cols-2 gap-5">
                <div>
                    <input
                        type="text"
                        value={data.user.name}
                        onChange={(e) => setData('user', { ...data.user, name: e.target.value })}
                        className="input input-bordered w-full"
                        placeholder="Nama user" />
                    <span className={errors['user.name'] ? "text-red-500 text-sm" : "hidden"}>{errors['user.name']}</span>
                </div>
                <div>
                    <input
                        type="text"
                        value={data.user.username}
                        onChange={(e) => setData('user', { ...data.user, username: e.target.value })}
                        className="input input-bordered w-full"
                        placeholder="Username" />
                    <span className={errors['user.username'] ? "text-red-500 text-sm" : "hidden"}>{errors['user.username']}</span>
                </div>
                <div>
                    <input
                        type="text"
                        value={data.user.email}
                        onChange={(e) => setData('user', { ...data.user, email: e.target.value })}
                        className="input input-bordered w-full"
                        placeholder="Email" />
                    <span className={errors['user.email'] ? "text-red-500 text-sm" : "hidden"}>{errors['user.email']}</span>
                </div>
                <div className="flex flex-row gap-10">
                    <label className="label cursor-pointer">
                        <input
                            type="radio"
                            name="admin"
                            className="radio checked:bg-red-500 me-3"
                            onChange={(e) => setData('user', { ...data.user, admin: !data.user.admin })}
                            checked={!data.user.admin} />
                        <span className="label-text">Bukan Admin</span>
                    </label>
                    <label className="label cursor-pointer">
                        <input
                            type="radio"
                            name="admin"
                            className="radio checked:bg-blue-500 me-3"
                            value={true} onChange={(e) =>
                                setData('user', { ...data.user, admin: !data.user.admin })}
                            checked={data.user.admin} />
                        <span className="label-text">Admin</span>
                    </label>
                </div>
            </div>
        </div>
    )
}