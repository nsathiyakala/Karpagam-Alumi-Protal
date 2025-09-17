import { BaseURL } from "@/utils/BaseUrl";
import { formattedDate } from "@/utils/commonFunction.utils";
import { message, Modal } from "antd";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Priority } from "@/utils/constant.utils";

const ViewTicketDetails = () => {
  const { id } = useParams();
  console.log("✌️id --->", id);

  const [SingleData, setSingleData] = useState({});
  const [token, setToken] = useState("");
  const [profilePercentage, setProfilePercentage] = useState(0);
  const [statusData, setStatusData] = useState({
    status_id: "",
    priority: "",
    due_date: "",
  });

  const [replyData, setReplyData] = useState({
    messages: "",
  });

  const [errMsg, setErrMsg] = useState({});
  const [statusList, setStatusList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAlumniManager, setIsAlumniManager] = useState(false);
  const [isFatulty, setIsFatulty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketReplies, setTicketReplies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    const Admin = localStorage.getItem("isAdmin");
    setIsAdmin(Admin);

    const AlumniManager = localStorage.getItem("isAlumniManager");
    setIsAlumniManager(AlumniManager);

    const Faculty = localStorage.getItem("isFaculty");
    setIsFatulty(Faculty);
  }, []);

  useEffect(() => {
    if (token) {
      SingleDatas(id);
      GetStatus();
      getTicketReplies(id);
      GetStatusData(id);
    }
  }, [id, token]);

  const SingleDatas = (id) => {
    axios
      .get(`${BaseURL}/detail_ticket/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setSingleData(response.data);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  const getTicketReplies = (id) => {
    axios
      .get(`${BaseURL}/tickets_replies/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setTicketReplies(response.data);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  const GetStatusData = (id) => {
    axios
      .get(`${BaseURL}/update_status/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("✌️response --->", response);
        setStatusData(response.data);
      })
      .catch((error) => {
        console.log("❌error --->", error);
      });
  };

  const GetStatus = () => {
    setLoading(true);
    axios
      .get(`${BaseURL}/retrieve_status/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStatusList(response.data?.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setStatusData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReplyChange = (e) => {
    const { name, value } = e.target;
    setReplyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();

    const validationRules = {
      messages: { required: true },
    };

    const isValid = validateForm(replyData, validationRules, setErrMsg);
    if (!isValid) return;

    axios
      .post(
        `${BaseURL}/reply_ticket/${id}/`,
        {
          messages: replyData.messages,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        message.success(response.data.message);
        setLoading(true);
        getTicketReplies(id);
        setReplyData({
          messages: "",
        });
      })
      .catch((error) => {
        message.error(error.response.data.errors);
        console.log(error.response.data);
        if (error?.response?.data?.code === "token_not_valid") {
          localStorage.removeItem("token");
          router.push("/login");
        }
        setLoading(false);
      });
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();

    if (isAdmin == "true" || isAlumniManager == "true") {
      axios
        .post(
          `${BaseURL}/update_status/${statusData.id}/`,
          {
            status_id: statusData.status_id,
            priority: statusData.priority,
            due_date: statusData.due_date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          message.success(response.data.message);
          setLoading(true);
          GetStatusData(id);
          setStatusData({
            status_id: "",
            priority: "",
            due_date: "",
          });
        })
        .catch((error) => {
          message.error(error?.response?.data?.errors);
          console.log(error.response?.data);
          if (error?.response?.data?.code === "token_not_valid") {
            localStorage.removeItem("token");
            router.push("/login");
          }
          setLoading(false);
        });
    } else if (isFatulty == "true") {
      axios
        .post(
          `${BaseURL}/update_status/${statusData.id}/`,
          {
            status_id: statusData.status_id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          message.success(response.data.message);
          setLoading(true);

          GetStatusData(id);
          setStatusData({
            status_id: "",
          });
        })
        .catch((error) => {
          message.error(error.response.data.errors);
          console.log(error.response.data);
          if (error?.response?.data?.code === "token_not_valid") {
            localStorage.removeItem("token");
            router.push("/login");
          }
          setLoading(false);
        });
    }
  };

  const StatusOption = statusList.map((item) => ({
    label: item.status,
    value: item.id,
  }));

  const PriorityOption = Priority.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  console.log("ticketReplies --->", ticketReplies);

  return (
    <section className="jd-page container-fluid section-pad">
      <div className="row justify-content-center">
        <div className="col-11 col-xl-10">
          <div className="container-fluid">

            <div className="rbt-callto-action rbt-cta-default style-2 mb-4">
              <div className="content-wrapper overflow-hidden pt--30 pb--30 bg-color-primary-opacity">
                <div className="row gy-5 align-items-end">
                  <div className="col-lg-8">
                    <div className="inner">
                      <div className="content text-left">
                        <h5 className="mb--5">
                          Viewing the ticke  #{SingleData?.id}
                        </h5>
                        {/* <p className="b3">Create Announcement</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex justify-content-start justify-content-lg-end">
                    <div className="call-to-btn text-start text-lg-end position-relative">
                      <Link
                        className="rbt-btn btn-gradient radius-round sm-btn"
                        href="/my-business-directory"
                      >
                        <span data-text="Add New Announcement">
                          My Business Directory
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row gx-4">
              {/* LEFT */}
              <div className="col-lg-8">
                {/* <div className="jd-main-card p-4 "> */}
                {/* Header */}


                {/* Role Overview */}
                <div className="jd-section mt-4 rbt-shadow-box">
                  <h4 className="jd-section-title">Request by</h4>

                  <p className="jd-text mb-2">
                    <b>Name: </b>
                    {SingleData?.name ? (
                      <Link
                        href={`/members/${SingleData?.member_id}`}
                      >
                        {SingleData?.name}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </p>

                  {SingleData?.alumni && (
                    <p className="jd-text mb-2">
                      <b>Email: </b>
                      {SingleData?.alumni ? SingleData?.alumni : "-"}
                    </p>
                  )}

                  {SingleData?.contact && (
                    <p className="jd-text mb-2">
                      <b>Contact: </b>
                      {SingleData?.contact
                        ? SingleData?.contact
                        : "-"}
                    </p>
                  )}


                  {SingleData?.batch && (
                    <p className="jd-text mb-2">
                      <b>Batch: </b>
                      {SingleData?.batch ? SingleData?.batch : "-"}
                    </p>
                  )}

                  {SingleData?.course && (
                    <p className="jd-text mb-2">
                      <b>Course: </b>
                      {SingleData?.course ? SingleData?.course : "-"}
                    </p>
                  )}

                </div>

                {/* Responsibilities */}
                {(isAdmin == "true" || isAlumniManager == "true") && (
                  SingleData?.assignments?.length > 0 && (
                    <div className="jd-section mt-4 rbt-shadow-box">
                      <h4 className="jd-section-title">Response:</h4>
                      <p className="jd-text mb-2">
                        <b>Address: </b>
                        {SingleData?.location && SingleData.location}
                        {SingleData?.location && SingleData?.country_code
                          ? ", "
                          : ""}
                        {SingleData?.country_code && SingleData.country_code}
                      </p>
                      {SingleData?.contact_email && (
                        <p className="jd-text mb-2">
                          <b>Email: </b>
                          <Link href={`mailto:${SingleData?.contact_email}`}>
                            {SingleData?.contact_email}
                          </Link>
                        </p>
                      )}

                      {SingleData?.contact_number && (
                        <p className="jd-text">
                          <b>Contact Number: </b>
                          <Link href={`tellto:${SingleData?.contact_link}`}>
                            {SingleData?.contact_number}
                          </Link>
                        </p>
                      )}

                    </div>
                  )

                )}


                <div className="jd-section mt-4 rbt-shadow-box">
                  <h4 className="jd-section-title">Alumni Request:</h4>
                  {(isAdmin == "true" || isAlumniManager == "true") && (
                    <p className="jd-text mb-2">
                      <b>Replies: </b>
                      {ticketReplies?.map((ticket) => {
                        return (
                          <div className="jd-similar-item bus-list  mt-3 mb-3 bg-color-primary-opacity flex-column gap-0"
                            key={ticket?.id}
                           
                          >
                            <span style={{ color: "black" }}>
                              {ticket?.message}
                            </span> 
                            <span style={{ fontSize: "14px" }}>
                              Posted by: {ticket?.posted_by} on{" "}
                              {ticket?.posted_on}
                            </span>
                          </div>
                        );
                      })}
                    </p>
                  )}

                  {SingleData?.contact_email && (
                    <p className="jd-text mb-2">
                      <b>Email: </b>
                      <Link href={`mailto:${SingleData?.contact_email}`}>
                        {SingleData?.contact_email}
                      </Link>
                    </p>
                  )}

                  {SingleData?.contact_number && (
                    <p className="jd-text">
                      <b>Contact Number: </b>
                      <Link href={`tellto:${SingleData?.contact_link}`}>
                        {SingleData?.contact_number}
                      </Link>
                    </p>
                  )}

                </div>


                {/* </div> */}
              </div>

              {/* RIGHT SIDEBAR */}
              <div className="col-lg-4 mt-4 mt-lg-0 ">
                <div className="jd-side-card rbt-shadow-box">
                  <div className="jd-side-title d-flex justify-content-between mb-4">
                    <span>More Business Lists</span>

                    <Link
                      href="/business-directory"
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      See All <i className="feather-arrow-right"></i>
                    </Link>
                  </div>


                  <div

                    className="jd-similar-item bus-list mb-3 bg-color-primary-opacity"
                  >
                    <div className="fw-bold">
                      {/* <img src={item?.logo} alt="business img" /> */}
                    </div>
                    <div className="jd-side-small text-muted d-flex align-items-center">
                      {"item "}
                      {/* {item?.business_name} */}
                    </div>
                  </div>

                  <Link className="rbt-btn btn-gradient radius-round sm-btn mt-5"
                    href={"/post-a-directory"}>
                    {" "}
                    Add a Business Listing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewTicketDetails;
