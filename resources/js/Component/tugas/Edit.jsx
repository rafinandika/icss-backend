import { TugasContext } from "@/Pages/Admin/Tugas";
import { formatDate } from "@/Service/usability";
import { router, useForm } from "@inertiajs/react";
import { useContext, useEffect, useRef, useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Edit = () => {
    const [type, setType] = useState('loading');
    const { view } = useContext(TugasContext);
    useEffect(() => {
        setType(view.data.type);
    }, [view]);
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-16">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                {type === 'file' && <TypeFile datae={view.data} />}
                {type === 'list' && <TypeList datae={view.data} />}
            </div>
        </div>
    )
}

const TypeFile = ({ datae }) => {
    const { data, setData, processing, put, reset } = useForm({
        judul: null,
        deskripsi: null,
        type: 'file',
        file: null,
        pertanyaan: null,
        waktu_akhir: formatDate(new Date(), false),
        aktif: true
    });
    const [displaynamefile, setDisplaynamefile] = useState('');
    const [errors, setError] = useState({});

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    }
    useEffect(() => {
        setData({...datae, file: null});
        setDisplaynamefile(datae.judul + '.pdf');
    }, [datae]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const re = /(\.pdf)$/i;
        let status = true;
        if (!re.exec(file.name)) {
            setError({ ...errors, file: 'File harus berupa PDF' });
            status = false;
        }

        if (!status) {
            setData('file', null);
            return;
        }
        setDisplaynamefile(file.name);
        setData('file', file);
    }


    const handleCLose = () => router.reload();

    const formValidation = () => {
        let status = false;
        let newError = {};
        if (data.judul === null) newError['judul'] = 'Judul harus diisi';
        if (data.deskripsi === null) newError['deskripsi'] = 'Deskripsi harus diisi';
        setError(newError);
        status = Object.keys(newError).length < 1;
        return status;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValidation()) {
            put(`/tugas/${data.id}`, {
                forceFormData: data.file === null ? false : true,
                onSuccess: () => {
                    toast.success('Tugas berhasil diupdate');
                    reset();
                    handleCLose();
                },
                onError: (error) => {
                    toast.error(error.message);
                    setError(error.error);
                }
            });
        }
    }

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-screen w-full">
            <form onSubmit={handleSubmit} className="p-5 px-10 h-screen w-full flex flex-col gap-4">
                <div className="grid grid-cols-12 items-center">
                    <label htmlFor="exampleFormControlInput1" className="form-label col-span-2 font-bold">
                        Judul Tugas
                    </label>
                    <input
                        type="text"
                        className="input input-bordered col-span-10"
                        id="exampleFormControlInput1"
                        placeholder="Judul Tugas"
                        value={data.judul}
                        onChange={(e) => setData('judul', e.target.value)}
                    />
                    <span className="col-span-2"></span>
                    <span className={errors['judul'] ? "text-red-500 text-sm col-span-10 mt-3" : "hidden"}>{errors['judul']}</span>
                </div>
                <div className="grid grid-cols-12 items-center">
                    <label htmlFor="exampleFormControlInput1" className="form-label col-span-2 font-bold">
                        File
                    </label>
                    <button className="btn btn-primary col-span-2 me-3" type="button" onClick={handleButtonClick}>Ubah File ...</button>
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    <input
                        type="text"
                        className="input input-bordered col-span-8 cursor-not-allowed"
                        id="exampleFormControlInput1"
                        placeholder="Belum ada file dipilih..."
                        value={displaynamefile}
                        readOnly={true}
                    />
                    <span className="col-span-2"></span>
                    <span className={errors['file'] ? "text-red-500 text-sm col-span-10 mt-3" : "hidden"}>{errors['file']}</span>
                </div>
                <div className="grid grid-cols-12">
                    <label htmlFor="exampleFormControlInput1" className="form-label col-span-2 font-bold">
                        Deskripsi
                    </label>
                    <textarea
                        defaultValue={data.deskripsi}
                        onChange={(e) => setData('deskripsi', e.target.value)}
                        className="textarea textarea-bordered col-span-10"
                        placeholder="Deskripsi tugas..." />
                    <span className="col-span-2"></span>
                    <span className={errors['deskripsi'] ? "text-red-500 text-sm col-span-10 mt-3" : "hidden"}>{errors['deskripsi']}</span>
                </div>
                <div className='sticky bottom-0 w-full flex justify-center gap-4 mt-10 mb-3 p-2 bg-white'>
                    <button
                        disabled={processing}
                        type="button"
                        className='btn btn-error rounded-lg text-white'
                        onClick={handleCLose}
                    >
                        Kembali
                    </button>
                    {/* <button
                        className='btn btn-info rounded-lg text-white'
                        type='submit'
                    >
                        Draft
                    </button> */}
                    <button
                        disabled={processing}
                        className='btn btn-primary rounded-lg text-white'
                        type='submit'
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    )

}

const TypeList = ({ datae }) => {
    const { data, setData, processing, put, reset } = useForm({
        judul: null,
        deskripsi: null,
        type: 'list',
        file: null,
        pertanyaan: [''],
        waktu_akhir: formatDate(new Date(), false),
        aktif: true
    });
    const [errors, setError] = useState({});

    const handleCLose = () => router.reload();

    const formValidation = () => {
        let status = false;
        let newError = {};
        if (data.judul === null) newError['judul'] = 'Judul harus diisi';
        if (data.deskripsi === null) newError['deskripsi'] = 'Deskripsi harus diisi';
        data.pertanyaan.forEach((pertanyaan, index) => {
            if (pertanyaan === '') newError[`pertanyaan[${index}]`] = 'Soal harus diisi';
        })
        setError(newError);
        status = Object.keys(newError).length < 1;
        return status;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValidation()) {
            put(route('tugas.update', datae.id), {
                onSuccess: () => {
                    toast.success('Tugas berhasil diupdate');
                    reset();
                    handleCLose();
                },
                onError: (error) => {
                    toast.error(error.message);
                    setError(error.error);
                }
            });
        }
    }
    useEffect(() => {
        setData({
            ...datae,
            pertanyaan: JSON.parse(datae.pertanyaan),
            type: datae.type,
            file: null,
            judul: datae.judul,
            deskripsi: datae.deskripsi,
            aktif: datae.aktif
        });
    }, [datae]);

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-screen w-full">
            <form onSubmit={handleSubmit} className="p-5 px-10 h-screen w-full flex flex-col gap-4">
                <div className="grid grid-cols-12 items-center">
                    <label htmlFor="exampleFormControlInput1" className="form-label col-span-2 font-bold">
                        Judul Tugas
                    </label>
                    <input
                        type="text"
                        className="input input-bordered col-span-10"
                        id="exampleFormControlInput1"
                        placeholder="Judul Tugas"
                        value={data.judul}
                        onChange={(e) => setData('judul', e.target.value)}
                    />
                    <span className="col-span-2"></span>
                    <span className={errors['judul'] ? "text-red-500 text-sm col-span-10 mt-3" : "hidden"}>{errors['judul']}</span>
                </div>
                {data.pertanyaan.map((pertanyaan, index) => (
                    <div className="grid grid-cols-12 items-center" key={index}>
                        <label htmlFor="exampleFormControlInput1" className="form-label col-span-2 font-bold">
                            Soal {index + 1}
                        </label>
                        <input
                            type="text"
                            className={`input input-bordered ${data.pertanyaan.length < 2 ? "col-span-10" : "col-span-9"}`}
                            id="exampleFormControlInput1"
                            placeholder="Ketik soal disini..."
                            value={pertanyaan}
                            onChange={(e) => setData('pertanyaan', data.pertanyaan.map((item, i) => i === index ? e.target.value : item))}
                        />
                        {data.pertanyaan.length > 1 && (
                            <button onClick={() => setData('pertanyaan', data.pertanyaan.filter((_, i) => i !== index))}
                                className="col-span-1 btn btn-ghost">
                                <MdDelete size={20} color="red" />
                            </button>
                        )}
                        <span className="col-span-2"></span>
                        <span className={errors[`pertanyaan[${index}]`] ? "text-red-500 text-sm col-span-10 mt-3" : "hidden"}>{errors[`pertanyaan[${index}]`]}</span>
                    </div>
                ))}
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-2" />
                    <button type="button" className="btn btn-info text-white text-nowrap col-span-2 btn-sm" onClick={() => setData('pertanyaan', [...data.pertanyaan, ''])}>
                        <MdAdd />  Tambah Soal
                    </button>
                </div>
                <div className="grid grid-cols-12">
                    <label htmlFor="exampleFormControlInput1" className="form-label col-span-2 font-bold">
                        Deskripsi
                    </label>
                    <textarea
                        defaultValue={data.deskripsi}
                        onChange={(e) => setData('deskripsi', e.target.value)}
                        className="textarea textarea-bordered col-span-10"
                        placeholder="Deskripsi tugas..." />
                    <span className="col-span-2"></span>
                    <span className={errors['deskripsi'] ? "text-red-500 text-sm col-span-10 mt-3" : "hidden"}>{errors['deskripsi']}</span>
                </div>
                <div className='sticky bottom-0 w-full flex justify-center gap-4 mt-10 mb-3 p-2 bg-white'>
                    <button
                        disabled={processing}
                        type="button"
                        className='btn btn-error rounded-lg text-white'
                        onClick={handleCLose}
                    >
                        Kembali
                    </button>
                    {/* <button
                        className='btn btn-info rounded-lg text-white'
                        type='submit'
                    >
                        Draft
                    </button> */}
                    <button
                        disabled={processing}
                        className='btn btn-primary rounded-lg text-white'
                        type='submit'
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    )

}

export default Edit