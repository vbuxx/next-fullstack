import React, { useState } from "react";
import { unauthPage } from "../../middlewares/authorizationPages";
import Link from "next/dist/client/link";


export async function getServerSideProps(context) {
    await unauthPage(context);
    return {
        props: {}
    };
}
export default function Register() {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    });

    const [status, setStatus] = useState('normal');

    async function registerHandler(e) {
        e.preventDefault();
        // console.log(fields);

        setStatus('loading');

        const registerReq = await fetch('../api/auth/register', {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!registerReq.ok) return setStatus('error ' + registerReq.status);

        const registerRes = await registerReq.json();

        setStatus('success');
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
            <h1>Register</h1>

            <form onSubmit={registerHandler.bind(this)}>
                <input name="email" type="text" onChange={fieldHandler.bind(this)} placeholder="Email" />
                <input name="password" type="password" onChange={fieldHandler.bind(this)} placeholder="Password" />
                <button type="submit">Register</button>
                <Link href='/auth/login'><a>Login</a></Link>

            </form>

            <div>Output: {status}</div>
        </div>




    );
}