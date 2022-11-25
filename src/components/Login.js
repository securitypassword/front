import React, { Component }  from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';

import axios from '../api/axios';
import Navbar from './Navbar/Navbar';
const LOGIN_URL = 'https://securitypasswordauth.cyclic.app/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/newpassword";

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, userAttribs] = useInput('user', '')
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log("login response",response)
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            console.log("login setAuth",{ user, pwd, roles, accessToken })
            setAuth({ user, pwd, roles, accessToken });
            resetUser();
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No hay respuesta del servidor');
            } else if (err.response?.status === 400) {
                setErrMsg('Ingresar todos los parametros');
            } else if (err.response?.status === 401) {
                setErrMsg('Acceso no autorizado');
            } else {
                setErrMsg('Falla al iniciar sesión');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <center>
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Iniciar Sesión</h1>
                <label htmlFor="username">Usuario:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    {...userAttribs}
                    required
                />

                <label htmlFor="password">Contraseña Maestra:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button onClick={handleSubmit}>Iniciar Sesión</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={toggleCheck}
                        checked={check}
                    />
                    <label htmlFor="persist">Confiar en este dispositivo</label>
                </div>
            <p>
                No tienes cuenta?<br />
                <span className="line">
                    <Link to="/register">Registrate aquí</Link>
                </span>
            </p>
            </section>   
        </center>
 
        </>



    )
}

export default Login
