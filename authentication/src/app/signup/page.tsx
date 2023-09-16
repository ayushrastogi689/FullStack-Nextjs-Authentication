"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { axios } from "axios";


function SignupPage() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const onSignup = async () => {

    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-center text-white text-2xl'>
                Signup
            </h1>
            <hr />
            <label htmlFor='username'>Username :</label>

            <input id='username' type="text" value={user.username} placeholder='username'
                onChange={(e) => {
                    setUser({ ...user, username: e.target.value })
                }}
            />

            <hr />
            <label htmlFor='email'>Email :</label>

            <input id='email' type="text" value={user.email} placeholder='Email'
                onChange={(e) => {
                    setUser({ ...user, email: e.target.value })
                }}
            />

            <hr />
            <label htmlFor='password'>Password :</label>

            <input id='password' type="password" value={user.password} placeholder='Password'
                onChange={(e) => {
                    setUser({ ...user, password: e.target.value })
                }}
            />
            <button onClick={onSignup} className='p-2 border border-gray-300 rounded-lg mb-4 focus:border-gray-600 focus:outline-none  '>Signup</button>
            <Link href={"/login"}> Visit Login here</Link>
        </div>
    )
}

export default SignupPage
