/* eslint-disable react/no-unknown-property */
import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from "next/image";
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';

const Home: NextPage = () => {
    const router = useRouter()

    const [data, setData] = useState(null);
    const [technology, setTechnology] = useState('Select Technology');
    const [question, setQuestion] = useState('Type Question');
    const [answer, setAnswer] = useState('Type Answer');
    const [weightage, setWeightage] = useState(null);


    const show = () => {
        console.log('Hello')
    }

    // const add = () => {
    //     setTechnology(value);
    // }

    return (
        <>


            <div className="l-header">
                <Link href={'/'}>
                    <div className="img">
                        <Image
                            src="/images/genie.png"
                            alt="logo"
                            width={100}
                            height={50}
                        ></Image>
                    </div>
                </Link>
            </div>

            <div className='body'>
                {/* <View style={styles.verticleLine}></View> */}
                <div className="pagetitle">
                    Contribute to Library
                </div>

                <div className="vl"></div>

                <div className="Display">
                    <Image
                        src="/images/searchdoc.png"
                        alt="searching data"
                        width={100}
                        height={50}
                    ></Image>
                    <p>No Data</p>
                    <p>Select any technology</p>
                </div>


                <div className="selecttech">
                    Select Technology *

                    <Dropdown className='dropdown'>
                        <Dropdown.Toggle variant="white" id="dropdown-basic" className='dropdown_toggle'>
                            {technology}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='options'>
                            <Dropdown.Item value="angular">Angular</Dropdown.Item>
                            <Dropdown.Item value="buisness-analyst">Buisness Analyst</Dropdown.Item>
                            <Dropdown.Item value="c++">C++</Dropdown.Item>
                            <Dropdown.Item href="#/javascript">Javascript</Dropdown.Item>
                            <Dropdown.Item href="#/python">Python</Dropdown.Item>
                            <Dropdown.Item href="#/reactJS">ReactJS</Dropdown.Item>
                            <Dropdown.Item href="#/ux">UX Designer</Dropdown.Item>
                            <button className="btn-new"><a style={{ color: "#D8DEE3", textDecoration: "none" }}>
                                New Technology</a>
                            </button>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className='question'>
                    <label htmlFor="name" className="">Question</label>
                    <input
                        className="lib_inp"
                        type="text"
                        placeholder='Type Question'
                        required
                    />
                </div>

                <div className='answer'>
                    <label htmlFor="name" className="">Answer</label>
                    <input
                        className="lib_inp"
                        type="text"
                        placeholder='Type Answer'
                        required
                    />
                </div>

                <div className="weightage">
                    <p style={{ color: "#102333", fontSize: 15 }}>
                        Question Weightage
                    </p>
                    <input style={{ margin: "0px 0px 10px 0px" }} type="radio" value="1" name="weightage" /> 1
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="2" name="weightage" /> 2
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="3" name="weightage" /> 3
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="4" name="weightage" /> 4
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="5" name="weightage" /> 5
                </div>

                <div className="button">
                    <button onClick={show} className="btn-primary" style={{ backgroundColor: "lightgray", borderRadius: "10px", width: "70px", marginLeft: "350px" }}><a style={{ color: "grey" }}>Submit</a></button>
                </div>
            </div>
        </>

    )
}
export default Home