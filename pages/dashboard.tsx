import type { NextPage } from 'next'
import WithAuth from '../components/auth';
import Layout from '../components/layout'
const Dashboard: NextPage = () => {
    return (
        <Layout pageTitle="Dashboard">
            <div className='main-content'>
                <h1 className='page-title'>Dashboard</h1>
                <div className='under-dev'>
                    <i className='bx bx-code-alt'></i>
                    <p>Under Development</p>
                </div>
            </div>
        </Layout>
    )
}
export default WithAuth(Dashboard);