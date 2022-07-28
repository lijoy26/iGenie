import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import WithAuth from '../components/auth';
import Layout from '../components/layout'
import ModelWindowComponent from '../components/modelWindow';
import TableComponent from '../components/table';
import styles from '../styles/Users.module.css'
import appConst from "../util/const"
const batchCollection = collection(firestore, 'batchs');

import { collection, doc, DocumentData, getDocs, limit, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../firebase/client';
import { formateDate, getDateFromTimestamp } from '../util';
import AddBatchComponent from '../components/batch/addBatch';
import ViewBatchComponent from '../components/batch/viewBatch';
import { getBatchesService } from '../service/batches';
const Batches: NextPage = () => {
    const [addbatchWindow, setAddbatchWindow] = useState(false);
    const [viewbatchWindow, setviewBatchWindow] = useState(false);
    const [selectedBatch, setSelectedBatch]: any = useState({});
    const [batchs, setBatchs] = useState<DocumentData>([])
    const [loading, setLoading] = useState<boolean>(true);

    const getBatchs = async () => {
        getBatchesService().then((response) => {
            setBatchs(response.data.batches);
        }).catch((error) => {
            console.log(error);
        })
    };

    useEffect(() => {
        getBatchs().then(() => {
            setLoading(false);
        });

    }, [loading]);


    const generateBatchCode = (batchName: string) => {
        return batchName.substring(0, 3) + '-' + Math.floor(Math.random() * (999 - 100) + 100)
    }
    const addBatch = async (form: any) => {
        const batchData = {
            name: form.name.value,
            code: generateBatchCode(form.name.value),
            batchSize: form.batchSize.value,
            description: form.description.value,
            boardedOn: form.boardedOn.value,
            trainingStatus: 'NOT STARTED'
        }
        const timestamp: string = Date.now().toString();
        const _batchs = doc(firestore, `batchs/${timestamp}`);

        try {
            //add the Document
            setLoading(true);
            await setDoc(_batchs, batchData);
            getBatchs().then(() => {
                setLoading(false);
                hideAddbatchWindow();
            });

        } catch (error) {
            //show an error message
            console.log(error)
        }
    }
    const updateBatch = async (form: any) => {
        const batchData = {
            name: form.name.value,
            batchSize: form.batchSize.value,
            description: form.description.value,
            boardedOn: form.boardedOn.value,
            trainingStatus: form.trainingStatus.value,
            trainingCompletedOn: form.trainingCompletedOn.value
        }
        const _batch = doc(firestore, `batchs/${selectedBatch.id}`);
        setLoading(true);
        await updateDoc(_batch, batchData);
        hideViewbatchWindow();
        getBatchs().then(() => {
            setLoading(false);
        });

    }
    const showAddbatchWindow = () => {
        setAddbatchWindow(true);
    }
    const hideAddbatchWindow = () => {
        setAddbatchWindow(false);
    }

    const hideViewbatchWindow = () => {
        setviewBatchWindow(false);
        setSelectedBatch({});
    }
    const viewBatch = (batch: any) => {
        setSelectedBatch(batch)
        setviewBatchWindow(true)

    }

    return (
        <Layout pageTitle="Batches">
            <ModelWindowComponent show={addbatchWindow} fullscreen={true} title="Add Batch" setShow={hideAddbatchWindow}>
                <AddBatchComponent addBatch={addBatch}>Add Batch</AddBatchComponent>
            </ModelWindowComponent>

            <ModelWindowComponent show={viewbatchWindow} fullscreen={true} title="View Batch" setShow={hideViewbatchWindow}>
                <ViewBatchComponent batchData={selectedBatch} updateBatch={updateBatch} >View Batch</ViewBatchComponent>
            </ModelWindowComponent>

            <div className={styles.addUserBtnWrp}>
                <button onClick={showAddbatchWindow} type="button" className='btn btn-dark'>Add Batch</button>
            </div>
            <div className={styles.tableWraper}>
                <TableComponent data={batchs} headings={[
                    { "key": "code", "title": "Code" },
                    { "key": "name", "title": "Name" },
                    { "key": "description", "title": "Description" },
                    { "key": "boardedOn", "title": "Boarded on" },
                    { "key": "batchSize", "title": "Batch Size" },
                    { "key": "trainingStatus", "title": "Training Status" },
                    { "key": "trainingComplededOn", "title": "Training Completed On", "hide": true }

                ]} itemClick={viewBatch}></TableComponent>
            </div>

        </Layout>
    )
}
export default WithAuth(Batches);