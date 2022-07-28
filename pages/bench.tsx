import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import WithAuth from '../components/auth';
import Layout from '../components/layout'
import ModelWindowComponent from '../components/modelWindow';
import TableComponent from '../components/table';
import styles from '../styles/Users.module.css'
import appConst from "../util/const"
import { collection, doc, DocumentData, getDocs, limit, query, setDoc, updateDoc, where, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/client';
import AddTraineeComponent from '../components/trainee/addTrainee';
import ViewTraineeComponent from '../components/trainee/viewTrainee';
import FullScreenModelWindowComponent from '../components/FullScreenModelWindow';
import { getFormatedDate } from '../util';
import { addTraineeService, editTraineeService, getTraineesService } from '../service';

const traineeCollection = collection(firestore, 'trainees');
const batchCollection = collection(firestore, 'batchs');
const projectCollection = collection(firestore, 'projects');


const Traineees: NextPage = () => {
    const [addtraineeWindow, setAddtraineeWindow] = useState(false);
    const [viewtraineeWindow, setviewTraineeWindow] = useState(false);
    const [selectedTrainee, setSelectedTrainee]: any = useState({});
    const [batchs, setBatchs]: any = useState([]);
    const [projects, setProjects]: any = useState([]);
    const [trainees, setTrainees] = useState<DocumentData>([])
    const [loading, setLoading] = useState<boolean>(true);

    const getTrainees = async () => {
        getTraineesService().then((result) => {
            setTrainees(result.data.data);
        }).catch((error) => {
            console.log(error);
        })
        // const traineesQuery = query(traineeCollection, where('name', '!=', null), limit(appConst.PAGESIZE));
        // const querySnapshot = await getDocs(traineesQuery);
        // const result: DocumentData[] = [];
        // querySnapshot.forEach(async (snapshot: any) => {
        //     var data = snapshot.data()
        //     data.id = snapshot.id;
        //     result.push(data);
        // });

    };
    const getBatchs = async () => {
        const batchsQuery = query(batchCollection, where('code', '!=', null), limit(appConst.PAGESIZE));
        const querySnapshot = await getDocs(batchsQuery);
        const result: DocumentData[] = [];
        querySnapshot.forEach((snapshot: any) => {
            var data = snapshot.data()
            data.id = snapshot.id;
            result.push(data);
        });
        setBatchs(result);
    };
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
        if (loading) {
            getTrainees().then(() => {
                getBatchs().then(() => {
                    getProjects().then(() => setLoading(false))

                });
            });
        }

    }, [loading]);


    const generateTraineeCode = (traineeName: string) => {
        return traineeName.substring(0, 3) + '-' + Math.floor(Math.random() * (999 - 100) + 100)
    }
    const addTrainee = async (form: any) => {
        setLoading(true);
        const traineeData = {
            name: form.name.value,
            email: form.email.value,
            secondaryEmail: form.secondaryEmail.value,
            primarySkills: form.primarySkills.value,
            secondarySkills: form.secondarySkills.value,
            joinedOn: form.joinedOn.value,
            onInternship: form.onInternship.checked,
            mentorName: form.mentorName.value
        }
        addTraineeService(traineeData).then((data) => {
            console.log(data)
            getTrainees().then(() => {
                setLoading(false);
                hideAddtraineeWindow();
            });
        }).catch((error) => {
            console.log(error)
            setLoading(false);
        })
    }
    const updateTrainee = async (form: any) => {
        // const batchRefrence = doc(firestore, form.batch.value)

        // const projectReference = form.assignToProject?.value && form.transferTo?.value?.toLowerCase() != 'bench' ? doc(firestore, form.assignToProject?.value) : ''
        const traineeData = {
            name: form.name.value,
            email: form.email.value,
            secondaryEmail: form.secondaryEmail.value,
            primarySkills: form.primarySkills.value,
            secondarySkills: form.secondarySkills.value,
            batchId: '',
            joinedOn: form.joinedOn.value,
            onInternship: form.onInternship.checked,
            mentorName: form.mentorName.value,
            trainingLevel: form.trainingLevel.value,
            trainingStatus: form.trainingStatus.value,
            projectId: '',
            traningFeedback: form.traningFeedback.value,
            trainingComplededOn: form.trainingStatus.value == 'COMPLETED' ? getFormatedDate() : '',
            rating: form.rating?.value,
            onBench: form.transferTo?.value?.toLowerCase() == 'bench' ? true : false,
        }
        // const _trainee = doc(firestore, `trainees/${selectedTrainee.id}`);
        setLoading(true);
        editTraineeService(traineeData, selectedTrainee.id).then((result) => {
            hideViewtraineeWindow();
            getTrainees().then(() => {
                setLoading(false);
            });
        }).catch((error) => {
            console.log(error)
        })
        // await updateDoc(_trainee, traineeData);


    }
    const showAddtraineeWindow = () => {

        setAddtraineeWindow(true);
    }
    const hideAddtraineeWindow = () => {
        setAddtraineeWindow(false);
    }

    const hideViewtraineeWindow = () => {
        setviewTraineeWindow(false);
        setSelectedTrainee({});
    }
    const viewTrainee = async (trainee: any) => {
        try {
            getDoc(trainee.batchId).then((batchData: any) => {
                trainee.batch = batchData.data()
                setSelectedTrainee(trainee)
                setviewTraineeWindow(true)
            })
        } catch (error) {
            trainee.batch = []
            setSelectedTrainee(trainee)
            setviewTraineeWindow(true)
        }



    }

    return (
        <Layout pageTitle="Traineees">
            <FullScreenModelWindowComponent show={addtraineeWindow} fullscreen={true} title="Add Trainee" setShow={hideAddtraineeWindow}>
                <AddTraineeComponent batchs={batchs} addTrainee={addTrainee}>Add Trainee</AddTraineeComponent>
            </FullScreenModelWindowComponent>

            <FullScreenModelWindowComponent show={viewtraineeWindow} fullscreen={true} title="View Trainee" setShow={hideViewtraineeWindow}>
                <ViewTraineeComponent projects={projects} batchs={batchs} traineeData={selectedTrainee} updateTrainee={updateTrainee} >View Trainee</ViewTraineeComponent>
            </FullScreenModelWindowComponent>

            <div className={styles.addUserBtnWrp}>
                <button onClick={showAddtraineeWindow} type="button" className='btn btn-dark'>Add Trainee</button>
            </div>
            <div className={styles.tableWraper}>
                <TableComponent data={trainees} headings={[
                    { "key": "name", "title": "Name" },
                    { "key": "email", "title": "Email" },
                    { "key": "joinedOn", "title": "Joined On" },
                    { "key": "billable", "title": "Billable" },
                    { "key": "trainingStatus", "title": "Training Status" },
                    { "key": "trainingComplededOn", "title": "Training Completed On", "hide": true }

                ]} itemClick={viewTrainee}></TableComponent>
            </div>

        </Layout>
    )
}
export default WithAuth(Traineees);