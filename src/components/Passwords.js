import React, { Component }  from 'react';
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from '../api/axios';
import { useNavigate, useLocation } from "react-router-dom";
const GPASSWORD_URL = 'https://securitypasswordapi.cyclic.app/getpass';

const Passwords = async ()  => {
    const [users, setUsers] = useState();
    const [passwords, setPasswords] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    setPasswords(await axios.post(GPASSWORD_URL,
        JSON.stringify({id:users.id}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    ))

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getPassword = async () => {
            try {
                const response = await axiosPrivate.get('/passwords', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }


        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate, location, navigate, setUsers])

    return (
        <article>
            <h2>Lista de contraseñas</h2>
            {passwords?.length
                ? (
                    <ul>
                        {passwords.map((user, i) => <li key={i}>{passwords?.passwords}</li>)}
                    </ul>
                ) : <p>No tiene contraseñas registradas</p>
            }
        </article>
    );
};

export default Passwords;
