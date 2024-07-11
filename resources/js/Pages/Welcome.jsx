import React, { useEffect } from 'react'
import { Link, Head } from '@inertiajs/react';


const Welcome = () => {
    useEffect(() => {
        document.body.classList.add('bg-gray-300');
    }, []);
    return (
        <div className='relative'>
            <Head title="Welcome" />
            <div className='flex flex-row p-10 h-screen  isolate px-6 pt-14 lg:px-28'>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>
                <div className='flex flex-col justify-center items-center text-center w-1/2 '>
                    <img src="/images/icon.png" className='h-40 w-40' alt="Logo BML" />
                    <h1 className='text-3xl font-bold'>Badminton Mobile Learning</h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                        fugiat veniam occaecat fugiat aliqua.
                    </p>
                    <div className='flex flex-row justify-center mt-8'>
                        <button className="btn btn-neutral">
                            <img src="/images/icon-apk.png" alt="" />
                            Download .apk
                        </button>
                    </div>
                </div>
                <div className='flex text-center w-1/2 justify-center'>
                    <img src="/images/sample.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Welcome