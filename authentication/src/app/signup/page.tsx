"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from "axios";

function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = axios.post("/api/users/signup", user);
            console.log("Signup Successfull", response.data);

            router.push("/login");
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <h1 className='text-center text-white text-2xl'>
                Signup
            </h1>
            <hr />
            <label htmlFor='username'>Username :</label>

            <input className='p-2 borfer border-green-300 rounded-lg m-4 focus:outline-none focus:border-gray-600 text-black'
                id='username' type="text" value={user.username} placeholder='username'
                onChange={(e) => {
                    setUser({ ...user, username: e.target.value })
                }}
            />

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
            <button onClick={onSignup} className='p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-600 focus:outline-none  '>{buttonDisabled ? "No Signup" : "Yes you can Sign up"}</button>
            <Link href={"/login"}> Visit Login here</Link>
        </div>
    )
}

export default SignupPage
