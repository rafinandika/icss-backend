import React, { createContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Sidebar from './partials/sidebar'

const DashboardContext = createContext();
const AuthenticatedLayout = ({ children }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <DashboardContext.Provider value={{ scrollPosition }}>
            <div className='flex flex-row w-full min-h-screen'>
                <Sidebar />
                <div className="flex-1 ml-80 p-5 bg-white">
                    <div className="p-5 bg-white">
                        {children}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </DashboardContext.Provider>
    )
}

export default AuthenticatedLayout