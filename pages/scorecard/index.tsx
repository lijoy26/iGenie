/* eslint-disable react/no-unknown-property */
import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from 'next/image';
import { saveAs } from "file-saver";
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';

const Home: NextPage = () => {
    const router = useRouter()

    // function printPDF() {
    //     const domElement = document.getElementById('scorecard');
    //     html2canvas(domElement, {
    //         onclone: (document) => {
    //             document.getElementById('scorecard').style.visibility = 'hidden'
    //         }
    //     })
    //         .then((canvas) => {
    //             const img = canvas.toDataURL('image/png')
    //             const pdf = new jsPDF()
    //             pdf.addImage(ImageData, 'JPEG', 0,0)
    //             pdf.save('your-filename.pdf')
    //         })
    // };
    const pdfGenerate = () => {
        var doc = new jsPDF("p", "pt", "a4");
       doc.html(document.querySelector('#scorecard'), {
            callback: function (pdf) {
                pdf.save("result.pdf");
            }
       });
    };
    return (
        <div className='scorecard-container'>
            <div className="src_outer" id='scorecard'>
                <Image
                    className='genie_logo'
                    src="/genie.png"
                    alt="logo"
                    width={120}
                    height={70}
                >
                </Image>
                <h2 className='scr_heading' style={{ color: "#102333", fontWeight: "bold", fontSize: 20 }}>
                    Result
                </h2>

                <ul className="alignMe" id="scr">
                    <li> <p className='scr_details'> Name</p> <b className='scr_details'>  Laura Norda</b> </li>
                    <li> <p className='scr_details'>Phone Number</p><b className='scr_details'>0000 000 0000</b></li>
                    <li><p className='scr_details'>Experience </p > <b className='scr_details'> 16 </b> </li>
                    <li><p className='scr_details'>Difficulty Level</p> <b className='scr_details'> Tough</b></li>
                    <li><p className='scr_details'>Interviewed Date</p><b className='scr_details'>July 29, 2002</b></li>
                    <li><p className='scr_details'>Score</p> <b className='scr_per' > 83%</b></li>
                </ul>
                <div className='interviewer'>
                    <label htmlFor="name" className='scr_details' style={{ color: "#515761", fontWeight: "600" }}>Interviewer Name*  </label>
                    <input
                        className='inp scr_details'

                        type="text"
                        placeholder='Name of Interviewer'
                        required
                    />
                </div>
                <div className='status scr_details ' style={{ color: "#515761", fontWeight: "600" }}>
                    Status*
                    <div className='rad scr_details' style={{ color: "#102333", fontWeight: "600" }}>
                        <input type="radio" name="editList" value="always" />Reject
                        <input type="radio" name="editList" value="never" />Select
                        <input type="radio" name="editList" value="costChange" />Hold
                    </div>
                </div>
                <div className='btn-scr'>
                    <button className="scr-primary " onClick={pdfGenerate} >
                        {/* <Link href="/result.pdf" download> */}
                            <a  style={{ color: "#D8DEE3", textDecoration: "none" }}>
                                Save and Download
                            </a>
                        {/* </Link> */}
                    </button>
                </div>
            </div>
        </div>

    )
}
export default Home

