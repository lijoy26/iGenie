import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import WithAuth from '../components/auth';
import Layout from '../components/layout'
import ModelWindowComponent from '../components/modelWindow';
import TableComponent from '../components/table';
import styles from '../styles/Users.module.css'
import appConst from "../util/const"
const projectCollection = collection(firestore, 'projects');

import { collection, doc, DocumentData, getDocs, limit, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../firebase/client';
import AddProjectComponent from '../components/project/addProject';
import ViewProjectComponent from '../components/project/viewProject';
const Projects: NextPage = () => {
    const [addprojectWindow, setAddprojectWindow] = useState(false);
    const [viewprojectWindow, setviewProjectWindow] = useState(false);
    const [selectedProject, setSelectedProject]: any = useState({});
    const [projects, setProjects] = useState<DocumentData>([])
    const [loading, setLoading] = useState<boolean>(true);

    const getProjects = async () => {
        const projectsQuery = query(projectCollection, where('code', '!=', null), limit(appConst.PAGESIZE));
        const querySnapshot = await getDocs(projectsQuery);
        const result: DocumentData[] = [];
        querySnapshot.forEach((snapshot: any) => {
            var data = snapshot.data()
            data.id = snapshot.id;
            result.push(data);
        });
        setProjects(result);
    };

    useEffect(() => {
        getProjects().then(() => {
            setLoading(false);
        });

    }, [loading]);


    const generateProjectCode = (projectName: string) => {
        return projectName.substring(0, 3) + '-' + Math.floor(Math.random() * (999 - 100) + 100)
    }
    const addProject = async (form: any) => {
        const userData = {
            name: form.name.value,
            code: generateProjectCode(form.name.value),
            manager: form.pm.value,
            description: form.description.value,
            pmEmail: form.pmemail.value,
            status: 'Active'
        }

        const timestamp: string = Date.now().toString();
        const _projects = doc(firestore, `projects/${timestamp}`);

        try {
            //add the Document
            setLoading(true);
            await setDoc(_projects, userData);
            getProjects().then(() => {
                setLoading(false);
                hideAddprojectWindow();
            });

        } catch (error) {
            //show an error message
            console.log(error)
        }
    }
    const updateProject = async (form: any) => {
        const projectData = {
            name: form.name.value,
            manager: form.pm.value,
            description: form.description.value,
            pmEmail: form.pmemail.value,
            status: form.status.checked ? 'Active' : 'Inactive'
        }
        const _project = doc(firestore, `projects/${selectedProject.id}`);
        setLoading(true);
        await updateDoc(_project, projectData);
        hideViewprojectWindow();
        getProjects().then(() => {
            setLoading(false);
        });

    }
    const showAddprojectWindow = () => {
        setAddprojectWindow(true);
    }
    const hideAddprojectWindow = () => {
        setAddprojectWindow(false);
    }

    const hideViewprojectWindow = () => {
        setviewProjectWindow(false);
        setSelectedProject({});
    }
    const viewProject = (project: any) => {
        setSelectedProject(project)
        setviewProjectWindow(true)

    }

    return (
        <Layout pageTitle="Projects">
            <ModelWindowComponent show={addprojectWindow} fullscreen={true} title="Add Projects" setShow={hideAddprojectWindow}>
                <AddProjectComponent addProject={addProject}>Add Project</AddProjectComponent>
            </ModelWindowComponent>

            <ModelWindowComponent show={viewprojectWindow} fullscreen={true} title="View Project" setShow={hideViewprojectWindow}>
                <ViewProjectComponent projectData={selectedProject} updateProject={updateProject} >View Project</ViewProjectComponent>
            </ModelWindowComponent>

            <div className={styles.addUserBtnWrp}>
                <button onClick={showAddprojectWindow} type="button" className='btn btn-dark'>Add Project</button>
            </div>
            <div className={styles.tableWraper}>
                <TableComponent data={projects} headings={[
                    { "key": "code", "title": "Code" },
                    { "key": "name", "title": "Name" },
                    { "key": "description", "title": "Description" },
                    { "key": "manager", "title": "Project Manager" },
                    { "key": "pmEmail", "title": "Project Manager Email" },
                    { "key": "status", "title": "Status" }

                ]} itemClick={viewProject}></TableComponent>
            </div>

        </Layout>
    )
}
export default WithAuth(Projects);