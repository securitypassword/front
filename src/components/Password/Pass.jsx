import React, { Component} from 'react'
import { useState, useEffect } from "react";
import NewPass from './NewPass';
import GetPass from './GetPass';
import {
  useParams
} from "react-router-dom";

function Pass(vars){
  const [users, setUsers] = useState();
  const parms = {vars:{usu_id:users.id}}
    return (
        <div>
            <NewPass vars={parms}></NewPass>
            <GetPass vars={parms}></GetPass>
        </div>
    )
}
export default Pass;