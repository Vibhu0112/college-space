import Head from 'next/head';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Modal from '../components/Modal';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>College Social Space</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*header */}
         <Header/>
    

      {/*feed */}
        <Feed />

          {/*modal */}
           <Modal />   

          

    </div>
  )
}
