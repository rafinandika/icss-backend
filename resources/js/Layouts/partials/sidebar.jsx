import React from 'react'
import { Link, usePage } from '@inertiajs/react'
import {
    MdOutlinePowerSettingsNew,
    MdOutlineSpaceDashboard,
    MdPeopleOutline,
    MdOutlinePeople,
    MdOutlineHistory,
    MdOutlineBarChart,
    MdDocumentScanner,
    MdOutlineFileOpen,
    MdForum,
    MdOutlineSettings,
} from 'react-icons/md'

const Sidebar = () => {
    const { user } = usePage().props.auth;

    return (
        <aside className='w-80 fixed top-0 left-0 h-full'>
            <div className='flex flex-col h-full shadow-lg bg-white'>
                <div className='flex justify-center'>
                    <img src='/images/icon.png' alt="Logo Unib" className='h-20 w-auto' />
                </div>
                <div className='flex flex-col gap-2 flex-grow p-5 px-3 overflow-y-auto text-gray-700 scrollbar-thin'>
                    <MenuItem path="/dashboard" label={'Dashboard'} icon={<MdOutlineSpaceDashboard size={20} />} />
                    <MenuItem path="/mahasiswa" label={'Mahasiswa'} icon={<MdPeopleOutline size={20} />} />
                    <MenuItem path="/dosen" label={'Dosen'} icon={<MdOutlinePeople size={20} />} />
                    <MenuItem path="/materi" label={'Materi'} icon={<MdOutlineFileOpen size={20} />} />
                    <MenuItem path="/tugas" label={'Tugas'} icon={<MdDocumentScanner size={20} />} />
                    <MenuItem path="/forum" label={'Forum'} icon={<MdForum size={20} />} />
                    {/* <MenuItem path="/sejarah" label={'Sejarah'} icon={<MdOutlineHistory size={20} />} /> */}
                    <MenuItem path="/matrix" label={'Matrix'} icon={<MdOutlineBarChart size={20} />} />
                </div>
                <div className='flex flex-row bg-gray-100 p-5 gap-4 items-center '>
                    <img src={`/storage/${user.foto}`} className='h-12' alt="" />
                    <div className='flex flex-col'>
                        <h1 className='font-bold'>{user.name}</h1>
                        <h1>{user.email}</h1>
                    </div>
                    <div className='flex flex-row'>
                        <Link href={route('logout')} method='post' as='button' className='ms-2'>
                            <MdOutlineSettings size={20} color='black' />
                        </Link>
                        <Link href={route('logout')} method='post' as='button' className='ms-2'>
                            <MdOutlinePowerSettingsNew size={20} color='red' />
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    )
}

const MenuItem = ({ icon, path, label }) => {
    const { pathname } = window.location;
    const activeStyle = "flex flex-row items-center bg-blue-300 text-white p-3 rounded-lg";
    const inactiveStyle = "flex flex-row items-center p-3 rounded-lg hover:bg-blue-100";
    return (
        <Link href={path} className={pathname === path ? activeStyle : inactiveStyle} key={100}>
            {icon}
            <span className='ms-3'>{label}</span>
        </Link>
    )
}
export default Sidebar