/* eslint-disable react/no-unknown-property */
import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from "next/image";
import Dropdown from 'react-bootstrap/Dropdown';
import React, {useState} from 'react';

const NewTech = () => {
    const router = useRouter()

    const [data, setData] = useState(null);
    const [technology, setTechnology] = useState('Select Technology');
    const [question, setQuestion] = useState('Type Question');
    const [answer, setAnswer] = useState('Type Answer');
    const [weightage, setWeightage] = useState(null);


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


            <div className= "selecttech">
                    Select Technology *
                
                    <Dropdown className='dropdown'>
                    <Dropdown.Toggle variant="white" id="dropdown-basic" className='dropdown_toggle'>
                        {technology}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='options'>
                        <Dropdown.Item value="angular" onClick={() => setTechnology("Angular")}>Angular</Dropdown.Item>
                        <Dropdown.Item value="buisness-analyst" onClick={() => setTechnology("Buisness Analyst")}>Buisness Analyst</Dropdown.Item>
                        <Dropdown.Item value="c++" onClick={() => setTechnology("C++")}>C++</Dropdown.Item>
                        <Dropdown.Item href="#/javascript" onClick={() => setTechnology("Javascript")}>Javascript</Dropdown.Item>
                        <Dropdown.Item href="#/python" onClick={() => setTechnology("Python")}>Python</Dropdown.Item>
                        <Dropdown.Item href="#/reactJS" onClick={() => setTechnology("ReactJS")}>ReactJS</Dropdown.Item>
                        <Dropdown.Item href="#/ux" onClick={() => setTechnology("UX Designer")}><Link href={'/library'}>UX Designer</Link></Dropdown.Item>
                        {/* <Dropdown.Item className='btn-new' href="#/newtechnology" onClick={(event) => [setTechnology("New Technology"), newTechnology()]}>New Technology</Dropdown.Item> */}
                        <button className="btn-new" onClick={() => setTechnology("New Technology")}>
                            <a>
                                New Technology
                            </a>
                        </button>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className='technologyname'>
                <label htmlFor="name" className="">Technology Name *</label>
                <input
                    className="inpt"
                    type="text"
                    placeholder='Technology Name'
                    required />
            </div>


            <div className='question'>
                <label htmlFor="name" className="">Question</label>
                    <input
                        className="inpq"
                        type="text"
                        placeholder='Type Question'
                        required
                    />
            </div>

            <div className='answer'>
                <label htmlFor="name" className="">Answer</label>
                    <input
                        className="inpa"
                        type="text"
                        placeholder='Type Answer'
                        required
                    />
            </div>

            <div className="weightage">
                <p style={{ color: "#102333", fontSize: 15 }}>
                    Question Weightage
                </p>
                <div className='radioweightage'>
                    <input type="radio" value="1" name="weightage" /> 1
                    <input type="radio" value="2" name="weightage" /> 2
                    <input type="radio" value="3" name="weightage" /> 3
                    <input type="radio" value="4" name="weightage" /> 4
                    <input type="radio" value="5" name="weightage" /> 5
                </div>
            </div>

            <div className='button1'>
                <button className="buttonsubmit"><a>Submit</a></button>
            </div>
        </div>
    </>

    )
}
export default NewTech

function value(value: any): void {
    throw new Error('Function not implemented.');
}
