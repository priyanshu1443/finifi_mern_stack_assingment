"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faFileLines } from '@fortawesome/free-regular-svg-icons'
import { faGear, faUsers } from '@fortawesome/free-solid-svg-icons'


function Sidebar() {
    return (
        <>
            <div >
                <Image
                    src="https://finifi.io/wp-content/uploads/2024/03/f2.png"
                    width={100}
                    height={100}
                    alt="Picture of the author"
                />
            </div>
            <ul className=' pt-9 flex flex-col gap-6 '>
                <li className=" flex items-center justify-around p-2 cursor-pointer pl-6">
                    <FontAwesomeIcon icon={faCompass} className="text-blue-600" />
                    <Link className='text-blue-600 font-semibold w-24' href="/">Deshboard</Link>
                </li>
                <li className=" flex items-center justify-around p-2  rounded-l-[27px]  cursor-pointer pl-6 bg-blue-900">
                    <FontAwesomeIcon icon={faFileLines} className="text-white" />
                    <Link className='text-white font-semibold w-24' href="/">Invoices</Link>

                </li >
                <li className=" flex items-center justify-around p-2 cursor-pointer pl-6">
                    < FontAwesomeIcon icon={faUsers} className="text-blue-600" />
                    <Link className='text-blue-600 font-semibold w-24' href="/">Vendors</Link>
                </li >
                <li className=" flex items-center justify-around p-2 cursor-pointer pl-6">
                    < FontAwesomeIcon icon={faGear} className="text-blue-600" />
                    <Link className='text-blue-600 font-semibold w-24' href="/">Settings</Link>
                </li >
            </ul >
        </>
    )
}

export default Sidebar
