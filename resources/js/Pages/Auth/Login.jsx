import GuestLayout from '@/Layouts/GuestLayout'
import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaKey, FaMailBulk } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
    const [password, setPassword] = useState(true);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onSuccess: () => {
                reset('password');
                setPassword(true);
            },
            onError: () => toast.error('Email atau password salah')
            
        });
    }

    return (
        <GuestLayout>
            <div className="card bg-base-100 w-3/4 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center font-extrabold text-2xl mb-10">Masuk</h2>
                    <form onSubmit={handleSubmit}>
                        <label className="input input-bordered flex items-center gap-2 mb-8">
                            <FaMailBulk />
                            <input
                                type="text"
                                autoFocus
                                value={data.email}
                                className="grow border-none focus:ring-0"
                                placeholder="Masukan email atau username"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-8">
                            <FaKey />
                            <input
                                type={!password ? "text" : "password"}
                                value={data.password}
                                className="grow border-none focus:ring-0"
                                placeholder="Masukan password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <button onClick={() => setPassword(!password)}>
                                {!password ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </label>
                        <button disabled={processing} type="submit" className="btn btn-primary w-full mt-5 text-white">Masuk</button>
                        <Link href="/lupa-password" className='text-center block mt-4'>Lupa password?</Link>
                    </form>
                </div>
            </div>
        </GuestLayout>
    )
}

export default Login