import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import AddUserComponent from '../components/user/addUser';
import WithAuth from '../components/auth';
import Layout from '../components/layout'
import ModelWindowComponent from '../components/modelWindow';
import TableComponent from '../components/table';
import EditUserComponent from '../components/user/editUser';
import ViewUserComponent from '../components/user/viewUser';
import { adduserService, edituserService, getUsers } from '../service/user';
import styles from '../styles/Users.module.css'
import appConst from "../util/const"
import { Pagination } from 'react-bootstrap';
const Users: NextPage = () => {
    const [users, setUsers]: any = useState([]);
    const [adduserWindow, setAdduserWindow] = useState(false);
    const [viewuserWindow, setViewuserWindow] = useState(false);
    const [edituserWindow, setEdituserWindow] = useState(false);
    const [selectedUser, setSelectedUser]: any = useState({});
    const [pageToken, setPageToken]: any = useState('');
    useEffect(() => {
        getUserList()

    }, [users?.length])
    const getUserList = () => {
        getUsers(appConst.PAGESIZE, pageToken).then((response) => {
            setUsers(response.data.data.users);
            setPageToken(response.data.data.pageToken)
        }).catch((error) => {
            console.log(error);
        })
    }
    const addUser = (form: any) => {
        const userData = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,
            photoURL: form.photourl.value
        }
        adduserService(userData).then((response) => {
            hideAdduserWindow();
            getUserList();
        }).catch((error) => {
            console.log(error);
        })
    }
    const editUser = (form: any) => {
        const userData = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,
            photoURL: form.photourl.value,
            uid: selectedUser.uid
        }
        edituserService(userData, selectedUser.id).then((response: any) => {
            hideEdituserWindow()
            getUserList();
        }).catch((error) => {
            console.log(error);
        })
    }
    const showAdduserWindow = () => {
        setAdduserWindow(true);
    }
    const hideAdduserWindow = () => {
        setAdduserWindow(false);
    }
    const hideEdituserWindow = () => {
        setEdituserWindow(false);
    }
    const hideViewuserWindow = () => {
        setViewuserWindow(false);
        setSelectedUser({});
    }
    const viewUser = (user: any) => {
        setSelectedUser(user)
        setViewuserWindow(true)
    }
    const editProfile = () => {
        setViewuserWindow(false)
        setEdituserWindow(true);
    }
    return (
        <Layout pageTitle="Users">
            <ModelWindowComponent show={adduserWindow} fullscreen={true} title="Add User" setShow={hideAdduserWindow}>
                <AddUserComponent addUser={addUser}>Add user</AddUserComponent>
            </ModelWindowComponent>
            <ModelWindowComponent show={edituserWindow} fullscreen={true} title="Edit User" setShow={hideEdituserWindow}>
                <EditUserComponent editUser={editUser} user={selectedUser} >Edit user</EditUserComponent>
            </ModelWindowComponent>
            <ModelWindowComponent show={viewuserWindow} fullscreen={true} title="View User" setShow={hideViewuserWindow}>
                <ViewUserComponent userData={selectedUser} editProfile={editProfile} >View user</ViewUserComponent>
            </ModelWindowComponent>

            <div className={styles.addUserBtnWrp}>
                <button onClick={showAdduserWindow} type="button" className='btn btn-dark'>Add User</button>
            </div>
            <div className={styles.tableWraper}>
                <TableComponent data={users} headings={[
                    { "key": "name", "title": "Name" },
                    { "key": "email", "title": "Email" },
                    { "key": "disabled", "title": "Disabled" },
                ]} itemClick={viewUser}></TableComponent>
                {/* <Pagination>
                <Pagination.Item  active>1</Pagination.Item>
                </Pagination> */}
            </div>

        </Layout>
    )
}
export default WithAuth(Users);