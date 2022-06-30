import React, { useState } from "react";
import Router from 'next/router';
import { authPage } from "../../middlewares/authorizationPages";
import Nav from '../../components/Nav';


export async function getServerSideProps(context) {
    const { token } = await authPage(context);

    const postReq = await fetch('http://localhost:3000/api/posts', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const posts = await postReq.json();

    console.log(posts);

    return {

        props: {
            token,
            posts: posts.data
        }
    };
}



export default function PostIndex(props) {
    const [posts, setPosts] = useState(props.posts);

    async function deleteHandler(id, e) {
        e.preventDefault();

        const { token } = props;

        const deleteConfirm = confirm('Are you sure to delete this post?');

        if (deleteConfirm) {
            //Delete data on DB
            const deletePost = await fetch('../api/posts/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            const res = await deletePost.json();

            //Delete data on UI
            const postsFiltered = posts.filter(post => {
                return post.id !== id && post;
            });

            setPosts(postsFiltered);
        }
    }

    function editHandler(id) {
        Router.push('posts/edit/' + id);
    }

    return (
        <div>
            <h1>Post</h1>
            <Nav />
            {posts.map(post => {
                return (
                    <div key={post.id}>
                        <h2 >{post.title}</h2>
                        <p>{post.content}</p>
                        <button onClick={deleteHandler.bind(this, post.id)}>DELETE</button>
                        <button onClick={editHandler.bind(this, post.id)}>EDIT</button>
                    </div>

                );
            })}
        </div>
    );
}