import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import { MdOutlineSpaceDashboard } from 'react-icons/md'

const Dashboard = () => {
    return (
        <AuthenticatedLayout>
            <div className="flex font-bold text-3xl gap-2 border-b p-4">
                <MdOutlineSpaceDashboard size={37} /> Dashboard
            </div>
        </AuthenticatedLayout>
    )
}

export default Dashboard