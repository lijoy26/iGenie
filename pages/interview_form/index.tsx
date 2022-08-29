/* eslint-disable react/no-unknown-property */
import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import Image from 'next/image';


const Home: NextPage = () => {
    const router = useRouter()
    
        return (
            <div className='' >
            
                <form className="form" action="/api/form" method="post">
                    {/* <img src="/genie.png" width="150" /> */}
                    <Image
                        src="/genie.png"
                        alt="logo"
                        width={150}
                        height={75}
                    >

                    </Image>
               

                    <p style={{ color: "#102333", fontWeight: "bold", fontSize: 20 }}>
                        Select Questions
                    </p>

                    <div className='formGroup'>
                        <label>
                            Select Technology *
                        </label>
                        <Dropdown className='dropdown' >
                            <Dropdown.Toggle variant="white" id="dropdown-basic" className='dropdown_toggle'>
                                Select Technology
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/angular">Angular</Dropdown.Item>
                                <Dropdown.Item href="#/buisness-analyst">Business Analyst</Dropdown.Item>
                                <Dropdown.Item href="#/c++">C++</Dropdown.Item>
                                <Dropdown.Item href="#/javascript">Javascript</Dropdown.Item>
                                <Dropdown.Item href="#/python">Python</Dropdown.Item>
                                <Dropdown.Item href="#/reactJS">ReactJS</Dropdown.Item>
                                <Dropdown.Item href="#/ux">UX Designer</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>

                    <div className='formGroup'>

                        <label htmlFor="name" className="">No. of Questions  </label>

                        <input
                            className="form-control"

                            type="text"
                            placeholder='No. of Questions'
                            required
                        />
                    </div>


                    <div className='formGroup'>
                        <label >
                            Difficulty Level *
                        </label>
                        <Dropdown className='dropdown'>
                            <Dropdown.Toggle variant="white" id="dropdown-basic" className='dropdown_toggle'>
                                Select Difficulty Level
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/easy">Easy</Dropdown.Item>
                                <Dropdown.Item href="#/moderate">Moderate</Dropdown.Item>
                                <Dropdown.Item href="#/tough">Tough</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>


                    <hr></hr>


                    <p style={{ color: "#102333", fontWeight: "bold", fontSize: 20 }}>
                        Candidate Details
                    </p>

                    <div className='formGroup'>

                        <label htmlFor="name" className="">Name *  </label>

                        <input
                            className="form-control"

                            type="text"
                            placeholder='Name of the Candidate'
                            required
                        />
                    </div>

                    <div className='formGroup'>
                        <label htmlFor="pno" className="">Phone Number *  </label>

                        <input
                            className=" form-control"
                            id="pno"
                            name="pno"
                            type="text"
                            placeholder='Phone no. of the Candidate'

                            required />

                    </div>
                    <div className='formGroup'>
                        <label htmlFor="experience" className="">Experience *  </label>

                        <input
                            className="form-control"
                            id="exp"
                            name="exp"
                            type="number"
                            placeholder='Experience of the Candidate'
                            required />
                    </div>
                    <br></br>

                    <button
                    
                        className="px-4 py-2 font-bold text-black bg-white rounded-full hover:bg-blue-700"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 font-bold text-white bg-dark rounded-full hover:bg-blue-700"
                    >
                        <Link href="/checking">
                            <a style={{ color: "#D8DEE3", textDecoration: "none" }}>
                                {" "}
                                Submit
                            </a>
                        </Link>

                    </button>
                </form>
            </div>

        )
    }

export default Home