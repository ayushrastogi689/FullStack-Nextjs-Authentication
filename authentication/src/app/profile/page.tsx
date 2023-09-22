"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Toast } from 'react-hot-toast';

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState();
    const logout = () => {
        try {
            axios.get("/api/users/logout")
            console.log("User logged out successfully")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message);
        }
    }

    const getUserDetails = async () => {
        const response = await axios.get("/api/users/me");
        console.log(response.data);
        setData(response.data.data._id);

    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
            <h1>Profile</h1>
            <hr />
            <p>User Profile</p>
            <hr />
            <button onClick={logout} className='p-4 m-4 bg-blue-500 hover:bg-blue-700 justify-center py-2'>Logout</button>

            <button onClick={getUserDetails} className='bg-green-700 m-4 p-4 hover:bg-green-900 text-white px-2 py-2'>Get User Details</button>
            <hr />
            <h2 className='bg-orange-600'>{data === "nothing" ? "No User data available" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>

        </div>
    )
}
