/* eslint-disable react/no-unknown-property */
import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';


const Home: NextPage = () => {
    const router = useRouter()

    return (
        <><Link href={'/'}>Back</Link><div>question List view</div></>

    )
}
export default Home