import React, { Component} from 'react'
import NewPass from './NewPass';
import GetPass from './GetPass';
import {
  useParams
} from "react-router-dom";

function Pass(vars){
  const parms=useParams()
    return (
        <div>
            <NewPass vars={parms}></NewPass>
            <GetPass vars={parms}></GetPass>
        </div>
    )
}
export default Pass;