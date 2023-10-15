import React from 'react';
import Navbar from '../common/navbar';
import Sidenav from '../common/sidenav';
import Footer from '../common/footer';
import "../css/style.css";

const Literature = () => {
  return (
    <div className="wrapper">
    {/* Navbar */}
    <Navbar />
    {/* /.navbar */}
     <Sidenav />
    <div className="content-wrapper">
    <div className="post">
                          <div className="user-block">
                            
                          </div>
                          {/* /.user-block */}
                          <div className="row mb-3">
                            <div className="col-sm-6">
                              <img
                                className="img-fluid"
                                src="../../dist/img/photo1.png"
                                alt="Photo"
                              />
                            </div>
                            {/* /.col */}
                            <div className="col-sm-6">
                              <div className="row">
                                <div className="col-sm-6">
                                  <img
                                    className="img-fluid mb-3"
                                    src="../../dist/img/photo2.png"
                                    alt="Photo"
                                  />
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo3.jpg"
                                    alt="Photo"
                                  />
                                </div>
                                {/* /.col */}
                                <div className="col-sm-6">
                                  <img
                                    className="img-fluid mb-3"
                                    src="../../dist/img/photo4.jpg"
                                    alt="Photo"
                                  />
                                  <img
                                    className="img-fluid"
                                    src="../../dist/img/photo1.png"
                                    alt="Photo"
                                  />
                                </div>
                                {/* /.col */}
                              </div>
                              {/* /.row */}
                            </div>
                            {/* /.col */}
                          </div>
                          {/* /.row */}
                          
                        </div>
                      
                        </div>
                    </div>
  
                        )
}

export default Literature;