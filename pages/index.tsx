/* eslint-disable react/no-unknown-property */
import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';


const Home: NextPage = () => {
  const router = useRouter()

  return (
    <div>Home Page
      <button><Link href={'/onboard'} >Take Interview</Link></button>
      <button><Link href={'/history'} >Interview History</Link></button>
      <button><Link href={'/library'} >Question Library</Link></button>
    </div>
  )
}
export default Home