import React, { useEffect, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const URL = "http://localhost:5000/";
export default function Login(props) {
    const navigate = useNavigate();
    const currUser = localStorage.getItem('token');
    const [validated, changeValidated] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                if (currUser) {
                    let response = await axios.post(URL + 'validate', { token: currUser });
                    response = response.data;
                    if (response.valid === true) {
                        navigate('/homepage');
                    }
                }
            }
            catch (err) {
                alert(err);
            }
            finally {
                changeValidated(true);
            }
        }
        fetchData();
    },
        [navigate, currUser]);

    const handleSubmit = event => {
        event.preventDefault();
        axios.post(URL + 'login', formdata).then((data) => {
            console.log(data.data);
            localStorage.setItem('token', data.data['token']);
            navigate('/homepage');
        }).catch((err) => {
            alert(err.message);
        });
    };

    const [formdata, setFormData] = useState({ email: "", password: "" });

    const handleChange = (event) => {
        let newData = ({
            ...formdata, [event.target.name]: event.target.value
        });
        setFormData(newData);
    }
    if (!validated) return (
        <></>
    );
    return (
        <div className="container py-5 h-100" >
            <div className="row d-flex justify-content-center align-items-center h-100" >
                <div className="col-12 col-md-8 col-lg-6 col-xl-5" >
                    <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }} >
                        <div className="card-body p-5 text-center" style={{ backgroundColor: 'rgb(249, 243, 195)', borderRadius: '1rem' }}>
                            <Form method='post' onSubmit={handleSubmit}>
                                <h3 className="mb-5">Log in </h3>

                                <div className="form-outline mb-4">
                                    <input type="email formInput" id="typeEmailX-2" className="form-control form-control-lg" value={formdata.email} name="email" onChange={handleChange} required />
                                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" name="password" value={formdata.password} onChange={handleChange} required />
                                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                </div>

                                <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                            </Form>
                            <hr className="my-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
