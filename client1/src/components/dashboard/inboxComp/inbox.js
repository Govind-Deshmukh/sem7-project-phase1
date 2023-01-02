import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
import "./style.css";
import axios from "axios";
import get_mails from "../helper/get_mails";
export default function Inbox() {
  // how to fetch the bacend data of flask in Reactjs
  const [artical, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/composemail");
      setData(result.data);
    };
    fetchData();
    console.log(artical);
  }, []);
  return (
    <div>
      <Navbar />
      <div className="m-5">
        <div className="row">
          <div className="col-md-2  mt-2">
            <ul className="list-group mt-3">
              <Link className="list-group-item" to="/dashboard">
                Compose Mail
              </Link>
              <Link className="list-group-item active" to="/dashboard/inbox">
                Inbox
              </Link>
              <li className="list-group-item">
                Sent Mails{" "}
                <span className="form-text text-muted">(Disabled)</span>
              </li>
              <li className="list-group-item">
                Spam Mails{" "}
                <span className="form-text text-muted">(Disabled)</span>
              </li>
            </ul>
          </div>
          <div className="col-md-10 mt-2 shadow-lg p-3 mb-5 rounded">
            <div className="card rounded border">
              <link
                href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
                rel="stylesheet"
              />

              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body bg-primary text-white mailbox-widget pb-0">
                        <h2 className="text-white pb-3">Your Mailbox</h2>
                        <ul
                          className="nav nav-tabs custom-tab border-bottom-0 mt-4"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              id="inbox-tab"
                              data-toggle="tab"
                              aria-controls="inbox"
                              href="inbox"
                              role="tab"
                              aria-selected="true"
                            >
                              <span className="d-block d-md-none">
                                <i className="ti-email"></i>
                              </span>
                              <span className="d-none d-md-block"> INBOX</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="sent-tab"
                              data-toggle="tab"
                              aria-controls="sent"
                              href="sent"
                              role="tab"
                              aria-selected="false"
                            >
                              <span className="d-block d-md-none">
                                <i className="ti-export"></i>
                              </span>
                              <span className="d-none d-md-block">SENT</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="spam-tab"
                              data-toggle="tab"
                              aria-controls="spam"
                              href="spam"
                              role="tab"
                              aria-selected="false"
                            >
                              <span className="d-block d-md-none">
                                <i className="ti-panel"></i>
                              </span>
                              <span className="d-none d-md-block">SPAM</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="delete-tab"
                              data-toggle="tab"
                              aria-controls="delete"
                              href="delete"
                              role="tab"
                              aria-selected="false"
                            >
                              <span className="d-block d-md-none">
                                <i className="ti-trash"></i>
                              </span>
                              <span className="d-none d-md-block">DELETED</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade active show"
                          id="inbox"
                          aria-labelledby="inbox-tab"
                          role="tabpanel"
                        >
                          <div>
                            <div className="row p-4 no-gutters align-items-center">
                              <div className="col-sm-12 col-md-6">
                                <h3 className="font-light mb-0">
                                  <i className="ti-email mr-2"></i>350 Unread
                                  emails
                                </h3>
                              </div>
                              <div className="col-sm-12 col-md-6">
                                <ul className="list-inline dl mb-0 float-left float-md-right">
                                  <li className="list-inline-item text-info mr-3">
                                    <a href="">
                                      <button
                                        className="btn btn-circle btn-success text-white"
                                        href="javascript:void(0)"
                                      >
                                        <i className="fa fa-plus"></i>
                                      </button>
                                      <span className="ml-2 font-normal text-dark">
                                        Compose
                                      </span>
                                    </a>
                                  </li>
                                  <li className="list-inline-item text-danger">
                                    <a href="">
                                      <button
                                        className="btn btn-circle btn-danger text-white"
                                        href="javascript:void(0)"
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                      <span className="ml-2 font-normal text-dark">
                                        Delete
                                      </span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="table-responsive">
                              <table className="table email-table no-wrap table-hover v-middle mb-0 font-14">
                                <tbody>
                                  <tr>
                                    <td className="pl-3">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="cst1"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="cst1"
                                        >
                                          &nbsp;
                                        </label>
                                      </div>
                                    </td>
                                    <td>
                                      <i className="fa fa-star text-warning"></i>
                                    </td>
                                    <td>
                                      <span className="mb-0 text-muted">
                                        Hritik Roshan
                                      </span>
                                    </td>
                                    <td>
                                      <a
                                        className="link"
                                        href="javascript: void(0)"
                                      >
                                        <span className="badge badge-pill text-white font-medium badge-danger mr-2">
                                          Work
                                        </span>
                                        <span className="text-dark">
                                          Lorem ipsum perspiciatis-
                                        </span>
                                      </a>
                                    </td>
                                    <td>
                                      <i className="fa fa-paperclip text-muted"></i>
                                    </td>
                                    <td className="text-muted">May 13</td>
                                  </tr>
                                  <tr>
                                    <td className="pl-3">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="cst2"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="cst2"
                                        >
                                          &nbsp;
                                        </label>
                                      </div>
                                    </td>
                                    <td>
                                      <i className="fa fa-star"></i>
                                    </td>
                                    <td>
                                      <span className="mb-0 text-muted">
                                        Genelia Roshan
                                      </span>
                                    </td>
                                    <td>
                                      <a
                                        className="link"
                                        href="javascript: void(0)"
                                      >
                                        <span className="badge badge-pill text-white font-medium badge-info mr-2">
                                          Business
                                        </span>
                                        <span className="text-dark">
                                          Inquiry about license for Admin{" "}
                                        </span>
                                      </a>
                                    </td>
                                    <td>
                                      <i className="fa fa-paperclip text-muted"></i>
                                    </td>
                                    <td className="text-muted">May 13</td>
                                  </tr>
                                  <tr>
                                    <td className="pl-3">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="cst3"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="cst3"
                                        >
                                          &nbsp;
                                        </label>
                                      </div>
                                    </td>
                                    <td>
                                      <i className="fa fa-star text-warning"></i>
                                    </td>
                                    <td className="user-name max-texts">
                                      <span className="mb-0 text-muted font-light">
                                        Ritesh Deshmukh
                                      </span>
                                    </td>
                                    <td>
                                      <a
                                        className="link"
                                        href="javascript: void(0)"
                                      >
                                        <span className="badge badge-pill text-white font-medium badge-warning mr-2">
                                          Friend
                                        </span>
                                        <span className="font-light text-dark">
                                          Bitbucket (commit Pushed) by Ritesh
                                        </span>
                                      </a>
                                    </td>
                                    <td>
                                      <i className="fa fa-paperclip text-muted"></i>
                                    </td>
                                    <td className="text-muted font-light">
                                      May 13
                                    </td>
                                  </tr>
                                  <tr className="">
                                    <td className="pl-3">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="cst4"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="cst4"
                                        >
                                          &nbsp;
                                        </label>
                                      </div>
                                    </td>
                                    <td>
                                      <i className="fa fa-star"></i>
                                    </td>
                                    <td>
                                      <span className="mb-0 text-muted font-light">
                                        Akshay Kumar
                                      </span>
                                    </td>
                                    <td>
                                      <a
                                        className="link"
                                        href="javascript: void(0)"
                                      >
                                        <span className="badge badge-pill text-white font-medium badge-info mr-2">
                                          Work
                                        </span>
                                        <span className="font-light text-dark">
                                          Perspiciatis unde omnis- iste Lorem
                                          ipsum
                                        </span>
                                      </a>
                                    </td>
                                    <td>
                                      <i className="fa fa-paperclip text-muted"></i>
                                    </td>
                                    <td className="text-muted font-light">
                                      May 9
                                    </td>
                                  </tr>
                                  <tr className="">
                                    <td className="pl-3">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="cst5"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="cst5"
                                        >
                                          &nbsp;
                                        </label>
                                      </div>
                                    </td>
                                    <td>
                                      <i className="fa fa-star"></i>
                                    </td>
                                    <td>
                                      <span className="mb-0 text-muted font-light">
                                        John Abraham
                                      </span>
                                    </td>
                                    <td>
                                      <a
                                        className="link"
                                        href="javascript: void(0)"
                                      >
                                        <span className="badge badge-pill text-white font-medium badge-success mr-2">
                                          Work
                                        </span>{" "}
                                        <span className="font-light text-dark">
                                          Lorem ipsum perspiciatis- unde omnis
                                        </span>
                                      </a>
                                    </td>
                                    <td>
                                      <i className="fa fa-paperclip text-muted"></i>
                                    </td>
                                    <td className="text-muted font-light">
                                      Mar 10
                                    </td>
                                  </tr>
                                  <tr className="">
                                    <td className="pl-3">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="cst6"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="cst6"
                                        >
                                          &nbsp;
                                        </label>
                                      </div>
                                    </td>
                                    <td>
                                      <i className="fa fa-star text-warning"></i>
                                    </td>
                                    <td>
                                      <span className="mb-0 text-muted font-light">
                                        Akshay Kumar
                                      </span>
                                    </td>
                                    <td>
                                      <a
                                        className="link"
                                        href="javascript: void(0)"
                                      >
                                        <span className="badge badge-pill text-white font-medium badge-success mr-2">
                                          Work
                                        </span>{" "}
                                        <span className="font-light text-dark">
                                          Lorem ipsum perspiciatis - unde
                                        </span>
                                      </a>
                                    </td>
                                    <td>
                                      <i className="fa fa-paperclip text-muted"></i>
                                    </td>
                                    <td className="text-muted font-light">
                                      Mar 09
                                    </td>
                                  </tr>
                                  <tr className="">
                                    <td className="pl-3">
                                      <div className="custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="cst7"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="cst7"
                                        >
                                          &nbsp;
                                        </label>
                                      </div>
                                    </td>
                                    <td>
                                      <i className="fa fa-star text-warning"></i>
                                    </td>
                                    <td>
                                      <span className="mb-0 text-muted font-light">
                                        Hanna Gover
                                      </span>
                                    </td>
                                    <td>
                                      <a
                                        className="link"
                                        href="javascript: void(0)"
                                      >
                                        <span className="badge badge-pill text-white font-medium badge-danger mr-2">
                                          Work
                                        </span>
                                        <span className="font-light text-dark">
                                          {" "}
                                          Unde omnis Lorem ipsum perspiciatis
                                        </span>
                                      </a>
                                    </td>
                                    <td>
                                      <i className="fa fa-paperclip text-muted"></i>
                                    </td>
                                    <td className="text-muted font-light">
                                      Mar 09
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="sent"
                          aria-labelledby="sent-tab"
                          role="tabpanel"
                        >
                          <div className="row p-3 text-dark">
                            <div className="col-md-6">
                              <h3 className="font-light">Lets check profile</h3>
                              <h4 className="font-light">
                                you can use it with the small code
                              </h4>
                            </div>
                            <div className="col-md-6 text-right">
                              <p>
                                Donec pede justo, fringilla vel, aliquet nec,
                                vulputate eget, arcu. In enim justo, rhoncus ut,
                                imperdiet a.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="spam"
                          aria-labelledby="spam-tab"
                          role="tabpanel"
                        >
                          <div className="row p-3 text-dark">
                            <div className="col-md-6">
                              <h3 className="font-light">
                                Come on you have a lot message
                              </h3>
                              <h4 className="font-light">
                                you can use it with the small code
                              </h4>
                            </div>
                            <div className="col-md-6 text-right">
                              <p>
                                Donec pede justo, fringilla vel, aliquet nec,
                                vulputate eget, arcu. In enim justo, rhoncus ut,
                                imperdiet a.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="delete"
                          aria-labelledby="delete-tab"
                          role="tabpanel"
                        >
                          <div className="row p-3 text-dark">
                            <div className="col-md-6">
                              <h3 className="font-light">Just do Settings</h3>
                              <h4 className="font-light">
                                you can use it with the small code
                              </h4>
                            </div>
                            <div className="col-md-6 text-right">
                              <p>
                                Donec pede justo, fringilla vel, aliquet nec,
                                vulputate eget, arcu. In enim justo, rhoncus ut,
                                imperdiet a.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
