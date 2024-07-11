import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import { MdMenu, MdPowerSettingsNew, MdSettings } from 'react-icons/md'

const Header = () => {
    const { user } = usePage().props.auth
    return (
        <div className='sticky top-0 bg-white shadow-md z-50 p-2 px-5 flex flex-row justify-between items-center rounded-lg'>
            <MdMenu size={24} />
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button">
                    <img src={`/storage/${user.foto}`} alt="user foto" className='h-12' />
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-4">
                    <li>
                        <Link href='/profile'>
                            <MdSettings size={16} />
                            <span>Pengaturan Akun</span>
                        </Link>
                    </li>
                    <li>
                        <Link href='/logout' as='button' method='post'>
                            <MdPowerSettingsNew />
                            <span>Keluar</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header