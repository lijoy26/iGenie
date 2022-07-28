import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import WithAuth from '../components/auth';
import Layout from '../components/layout'
import TableComponent from '../components/table';
import styles from '../styles/Users.module.css'
import appConst from "../util/const"
import { collection, doc, DocumentData, getDocs, limit, query, where, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/client';
import AddTraineeComponent from '../components/trainee/addTrainee';
import ViewTraineeComponent from '../components/trainee/viewTrainee';
import FullScreenModelWindowComponent from '../components/FullScreenModelWindow';
import { getFormatedDate } from '../util';
import { addTraineeService, editTraineeService, getTraineesService } from '../service';
import FilterComponent from '../components/filter';
import SearchComponent from '../components/search';
import { getPresignedURL, uploadFile } from '../service/docupload';
import { saveAs } from 'file-saver';

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
                // getBatchs().then(() => {
                //     getProjects().then(() => setLoading(false))

                // });
            });
        }

    }, [loading]);


    const generateTraineeCode = (traineeName: string) => {
        return traineeName.substring(0, 3) + '-' + Math.floor(Math.random() * (999 - 100) + 100)
    }
    const addTrainee = async (form: any) => {
        setLoading(true);
        const traineeData = {
            name: form.name?.value,
            email: form.primariEmail?.value,
            secondaryEmail: form.secondaryEmail?.value,
            primarySkills: form.primarySkills?.value,
            secondarySkills: form.secondarySkills?.value,
            joinedOn: form.joinedOn?.value,
            onInternship: form.onInternship?.checked,
            mentorName: form.mentorName?.value,
            resume: form.resume?.files[0]?.name
        }
        if (form.resume?.files[0]?.name) {
            getPresignedURL({
                name: form.resume?.files[0]?.name,
                type: form.resume?.files[0]?.type,
                id: form.primariEmail?.value,
                operation: 'putObject'
            }).then((response) => {
                uploadFile(form.resume?.files[0], response.data.preSingedURL).then((response) => {
                    addTraineeService(traineeData).then((data: any) => {
                        getTrainees().then(() => {
                            setLoading(false);
                            hideAddtraineeWindow();
                        });
                    }).catch((error: any) => {
                        console.log(error)
                        setLoading(false);
                    })
                }).catch((error) => {
                    console.log(error)
                    setLoading(false);
                })
            }).catch((error) => {
                console.log(error)
                setLoading(false);
            })
        } else {
            addTraineeService(traineeData).then((data: any) => {
                getTrainees().then(() => {
                    setLoading(false);
                    hideAddtraineeWindow();
                });
            }).catch((error: any) => {
                console.log(error)
                setLoading(false);
            })
        }
    }
    const updateTrainee = async (form: any) => {
        setLoading(true);
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
            resume: form.resume?.files[0]?.name
        }
        if (selectedTrainee.resume != form.resume?.files[0]?.name) {
            getPresignedURL({
                name: form.resume?.files[0]?.name,
                type: form.resume?.files[0]?.type,
                id: selectedTrainee.email || form.primariEmail?.value,
                operation: 'putObject'
            }).then((response) => {
                uploadFile(form.resume?.files[0], response.data.preSingedURL).then((response) => {
                    console.log(form.resume?.files[0])
                    editTraineeService(traineeData, selectedTrainee.id).then((result) => {
                        getTrainees().then(() => {
                            setLoading(false);
                            hideViewtraineeWindow();
                        });
                    }).catch((error) => {
                        console.log(error)
                    })
                }).catch((error) => {
                    console.log(error)
                    setLoading(false);
                })
            }).catch((error) => {
                console.log(error)
                setLoading(false);
            })
        } else {
            editTraineeService(traineeData, selectedTrainee.id).then((result) => {
                hideViewtraineeWindow();
                getTrainees().then(() => {
                    setLoading(false);
                });
            }).catch((error) => {
                console.log(error)
            })
        }
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
    const downloadResume = () => {
        getPresignedURL({
            name: selectedTrainee?.resume,
            type: '',
            id: selectedTrainee.email,
            operation: 'getObject'
        }).then((response) => {
            saveAs(
                response.data.preSingedURL,
                selectedTrainee?.resume
            );
        }).catch((error: any) => {
            console.log(error)
        })
    }
    return (
        <Layout pageTitle="Traineees">
            <div className='main-content'>
                <div className='d-lg-flex justify-content-between align-items-center mb-4 page-subheader'>
                    <h1 className='page-title mb-4 mb-lg-0'>Trainees</h1>
                    <div className='d-block d-md-flex align-items-center justify-content-end'>
                        <div className='d-flex align-items-center mb-3 mb-md-0'>
                            <div className='me-3'>
                                <FilterComponent />
                            </div>
                            <div className='me-0 me-md-3 search-trainee'>
                                <SearchComponent />
                            </div>
                        </div>
                        <button onClick={showAddtraineeWindow} type="button" className='btn btn-dark add-trainee-btn'>Add Trainee</button>
                    </div>
                </div>
                <FullScreenModelWindowComponent show={addtraineeWindow} fullscreen={true} title="Add Trainee" setShow={hideAddtraineeWindow}>
                    <AddTraineeComponent batchs={batchs} addTrainee={addTrainee}>Add Trainee</AddTraineeComponent>
                </FullScreenModelWindowComponent>

                <FullScreenModelWindowComponent show={viewtraineeWindow} fullscreen={true} title="View Trainee" setShow={hideViewtraineeWindow}>
                    <ViewTraineeComponent projects={projects} batchs={batchs} traineeData={selectedTrainee} updateTrainee={updateTrainee} >View Trainee</ViewTraineeComponent>
                </FullScreenModelWindowComponent>
                <div className='trainee-table'>
                    <TableComponent data={trainees} headings={[
                        { "key": "name", "title": "Name" },
                        { "key": "email", "title": "Email" },
                        { "key": "skills", "title": "Skills" },
                        { "key": "joinedOn", "title": "Joined On" },
                        { "key": "billable", "title": "Billable" },
                        { "key": "trainingStatus", "title": "Training Status" },
                        { "key": "trainingComplededOn", "title": "Training Completed On", "hide": true }

                    ]} itemClick={viewTrainee}></TableComponent>
                </div>

            </div>
        </Layout>
    )
}
export default WithAuth(Traineees);