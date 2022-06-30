import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import { unauthPage } from "../../middlewares/authorizationPages";
import Link from "next/link";


export async function getServerSideProps(context) {
    await unauthPage(context);
    return {
        props: {}
    };
}

export default function Login() {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    });

    const [status, setStatus] = useState('normal');

    async function loginHandler(e) {
        e.preventDefault();
        console.log(fields);

        setStatus('loading');

        const loginReq = await fetch('../api/auth/login', {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!loginReq.ok) return setStatus('error ' + loginReq.status);

        const loginRes = await loginReq.json();

        setStatus('success');

        Cookies.set('token', loginRes.token);

        Router.push('../posts');
    }

    function fieldHandler(e) {

        const name = e.target.getAttribute('name');
        // console.log(e.target.value);
        setFields({
            ...fields, [name]: e.target.value
        });
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={loginHandler.bind(this)}>
                <input name="email" type="text" onChange={fieldHandler.bind(this)} placeholder="Email" />
                <input name="password" type="password" onChange={fieldHandler.bind(this)} placeholder="Password" />
                <button type="submit">Login</button>
                <Link href='/auth/register'><a>Register</a></Link>

            </form>

            <div>Output: {status}</div>
        </div>




    );
}