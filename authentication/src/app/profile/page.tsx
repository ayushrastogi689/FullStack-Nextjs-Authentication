"use client"

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import axios from "axios";
import { Toast } from 'react-hot-toast';

export default function ProfilePage() {
    const router = useRouter();

    const logout = () => {
        try {
            axios.get("/api/users/logout")
            console.log("User logged out successfully")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message);
        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 '>
            <h1>Profile</h1>
            <hr />
            <p>User Profile</p>
            <hr />
            <button onClick={logout} className='p-4 m-4 bg-blue-500 hover:bg-blue-700 justify-center py-2'>Logout</button>
        </div>
    )
}
