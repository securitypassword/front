import React, { Component }  from 'react';
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Passwords = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

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

        getPassword();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

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
