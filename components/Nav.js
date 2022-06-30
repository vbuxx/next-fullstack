import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";


export default function Nav() {
    function logoutHandler(e) {
        e.preventDefault();

        if (confirm('Are you sure?')) {
            Cookies.remove('token');

            Router.replace('/auth/login');
        }
    }

    return (
        <>
            <Link href='/posts/create/'><a>Create Post</a></Link>
            <Link href='/posts'><a>Post List</a></Link>
            <a href="#" onClick={logoutHandler.bind(this)}>Logout</a>

        </>
    );
}