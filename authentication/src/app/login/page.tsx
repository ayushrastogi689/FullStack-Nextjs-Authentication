"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from "axios";


function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login Successfull", response.data);
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed " + error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-center text-white text-2xl'>
                Login
            </h1>
            <hr />

            <label htmlFor='email'>Email :</label>
            <input className='p-2 borfer border-green-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-black' id='email' type="text" value={user.email} placeholder='Email'
                onChange={(e) => {
                    setUser({ ...user, email: e.target.value })
                }}
            />
            <hr />

            <label htmlFor='password'>Password :</label>
            <input className='p-2 borfer border-green-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-black' id='password' type="password" value={user.password} placeholder='Password'
                onChange={(e) => {
                    setUser({ ...user, password: e.target.value })
                }}
            />

            <button onClick={onLogin} className='p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-600 focus:outline-none  '>Login</button>
            <Link href={"/signup"}> Visit Signup</Link>
        </div>
    )
}

export default LoginPage
