import React, { Component }  from 'react';
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NPASSWORD_URL = 'https://securitypasswordauth.cyclic.app/newpassword';

const NewPassword = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [url, setURL] = useState('');
    const [validURL, setValidURL] = useState(false);
    const [urlFocus, setURLFocus] = useState(false);

    const [title, setTitle] = useState('');
    const [validTitle, setValidTitle] = useState(false);
    const [titleFocus, setTitleFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = PWD_REGEX.test(pwd);
        if (!v1) {
            setErrMsg("Contraseña no segura");
            return;
        }
        try {
            const response = await axios.post(NPASSWORD_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setTitle('');
            setPwd('');
            setURL('');
            setUser('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No responde el servidor');
            } else if (err.response?.status === 409) {
                setErrMsg('Nombre de usuario ya tomado');
            } else {
                setErrMsg('Fallo al registrar')
            }
            errRef.current.focus();
        }
    }

    return (
           <>
                {success ? (
                    <center>
                        <br/>    
                        <br/>
                        <br/>
                        <br/>   
                        <section>
                            <center>
                            <br/>    
                            <br/>
                                <h1>Se ha registrado tu contraseña con exito!!!</h1>
                                <br/>
                                <br/>   
                                <p>
                                    <a href="/vault">Regresar a la boveda</a>
                                </p>
                            </center>
                        </section>
                    </center>

                ) : (
                    <center> 
                        <br/>    
                        <br/>
                        <br/>
                        <br/>              
                        <section>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <h1>Nueva Contraseña</h1>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="username">
                                    Titulo:
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                />
                                <label htmlFor="password">
                                    Contraseña:
                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Longitud de 8 a 24 caracteres.<br />
                                    Debe incluir una mayuscula, una minuscula, un numero y un caracter especial.<br />
                                    Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>


                                <label htmlFor="confirm_pwd">
                                    URL:
                                </label>
                                <input
                                    type="text"
                                    id="url"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />

                                <button disabled={!validPwd? true : false}>Agregar</button>
                            </form>
                        </section>
                    </center>

                )}
         </>
    )
}

export default NewPassword
