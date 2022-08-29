
/* eslint-disable react/no-unknown-property */
import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import SidebarComponent from '../../components/sidebar';
import Module from "module";


const Home: NextPage = () => {
    const router = useRouter()

    return (
        <>
            <div className='mainnn'>
                <div className='box'>
                    <div className='header'>
                        <img src="/genie.png" width="150" />
                    </div>
                    <hr></hr>
                </div>

                {/* function result() {
        <p>Laura Norda</p>
        <br/>

        <span>
            <p>Difficulty Level      Experience</p>
            <p>      Tough               16</p>
        </span>
        } */}
                <div className='rdabba' >
                    <b>Laura Norda</b>
                    <br />

                    <span>
                        <p>Difficulty Level &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;     Experience</p>
                        <p><b>     Tough   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     16</b></p>
                    </span>
                </div>



                {/* <script>
        var answer=ans1;
        ans1= "JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables or classes to the top of their scope, prior to execution of the code."
        console.log(ans1);
     </script> */}


                <div className='mcontent'>

                    <h3><b>Questions</b></h3>

                    <br></br>


                    {/* repeating content  */}
                    <h5><b>Javascript</b></h5>
                    <br></br>
                    <h6><b>1. Explain hosting</b></h6>
                </div>
                <div className='dabba'>
                    <p>

                        JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables or classes to the top of their scope, prior to execution of the code.
                    </p>
                </div>

                <div className='navingi'>
                    <input style={{ margin: "0px 0px 10px 0px" }} type="radio" value="Wrong" name="weightage" /> Wrong
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="Partially" name="weightage" /> Partially
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="Correct" name="weightage" /> Correct
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="skip" name="weightage" />Skip
                </div>
                <br></br>





                <div className='Mcontent'>
                    <h5><b>Javascript</b></h5>
                    <br></br>
                    <h6><b>1. Explain hoisting</b></h6>
                </div>
                <div className='dabba'>
                    <p>sss
                        dddddfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffdddddddddddddddddddddddddddddddddddddddddddddddd
                        ddddddddddddssghwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    </p>
                </div>
                <div className='navingi'>
                    <input style={{ margin: "0px 0px 10px 0px" }} type="radio" value="Wrong" name="weightage" /> Wrong
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="Partially" name="weightage" /> Partially
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="Correct" name="weightage" /> Correct
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="skip" name="weightage" />Skip
                </div>


                <br></br>



                <div className='Mcontent'>
                    <h5><b>Javacript</b></h5>
                    <br></br>
                    <h6><b>1. Explain hoisting</b></h6>
                </div>
                <div className='dabba'>
                    <p>sss
                        dddd
                        ddddddddddddssghwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    </p>
                </div>
                <div className='navingi'>
                    <input style={{ margin: "0px 0px 10px 0px" }} type="radio" value="Wrong" name="weightage" /> Wrong
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="Partially" name="weightage" /> Partially
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="Correct" name="weightage" /> Correct
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="skip" name="weightage" />Skip
                </div>
                <br></br>



                <div className='Mcontent'>
                    <h5><b>Javascript</b></h5>
                    <br></br>
                    <h6><b>1. Explain hoisting</b></h6>
                </div>

                <div className='dabba'>
                    <p>sjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
                    </p>
                </div>
                <div className='navingi'>
                    <input style={{ margin: "0px 0px 10px 0px" }} type="radio" value="Wrong" name="weightage" /> Wrong
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="Partially" name="weightage" /> Partially
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="Correct" name="weightage" /> Correct
                    <input style={{ margin: "0px 0px 10px 60px" }} type="radio" value="skip" name="weightage" />Skip
                </div>
                <br></br>






                <Link href="/scorecard">
                    <button className='buttony'>
                        Submit
                    </button>
                </Link>


            </div>

        </>
    )
}
export default Home