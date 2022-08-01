import React from "react";
import "./home.css";
import Typing from 'react-typing-animation';
import workImage from '../../../assests/work1.1.jpg'



export const Home: React.FC<{}> = () => {
    return (
        <div>
            <div className="container-fluid position-relative overflow-hidden mb-4 mb-sm-0" style={{minBlockSize:"95vh"}}>

                <div className="container mt-xl-5 mt-lg-5">
                <div className="row pt-xl-5 pt-lg-5 d-sm-flex flex-column-reverse flex-lg-row text-center text-md-start">
                    <div className="col-xl-6 col-lg-7 pt-xl-5 mt-xl-5 mt-lg-5">
                    <h3 className="h3 fw-semibold opacity-75">
                        <Typing speed={50}>
                            <span>Start Planning and Stop forgetting</span>
                        </Typing>
                        <span id="typed"></span>
                    </h3>

                    <h1 className="h1 fw-bold">Plan for the
                        <span className="d-block d-sm-inline gunmetal px-2 text-white rounded">
                        Future
                        </span> 
                        easily
                    </h1>
                    <p className="fs-6 fw-medium w-75 width-100-important opacity-75">Planner is a tool to plan and store upcoming 
                    events. Whelther your a student or a working professional you can use planner to plan important upcoming events.</p>
                    <a href="#" className="btn bg-danger text-white fs-5">Get started</a>
                    </div>
                    <div className="col-xl-6 col-lg-5 mt-lg-5 position-relative">
                    <img src={workImage} 
                      alt="" 
                      className="img-fluid scale-up"/>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
