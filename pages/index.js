import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import PostIndex from './posts';
import Link from 'next/dist/client/link';

export default function Home() {

  return (
    <>
      <h1>HALO</h1>
      <Link href='/posts'><a>CEK POSTS</a></Link>
    </>

  );
}
