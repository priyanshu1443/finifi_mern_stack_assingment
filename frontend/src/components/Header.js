"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons'

function Header() {
    return (
        <div className='p-5 h-20 flex items-center justify-between' >
            <h1 className='text-4xl font-semibold'>Manage Invoices</h1>
            <div className='h-16 flex gap-5 items-center justify-center'>
                <div className='border-2  border-neutral-400 rounded-full w-9 h-9 flex p-[7px]'>
                    <FontAwesomeIcon icon={faBell} size='lg' className='text-neutral-600' />
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <div className='border-2 border-neutral-400 rounded-full w-10 h-10 flex p-[7px]'>
                        <FontAwesomeIcon icon={faUser} size='xl' className='text-neutral-600' />
                    </div>
                    <div>
                        <h3 className='text-lg font-medium'>Rohit Sharma</h3>
                        <p className='text-sm'>rohitsharma@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
