import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import React, { Component} from 'react'
import $ from 'jquery'
import {en,de,safe} from "./sec"
import './GetPass.css'

var varsGet=""
async function GetPass(vars){
  varsGet=vars
    return (
      <div className="getpass">
        <Button variant="light" id="getPassBtn" title="get password" onPress={getPass}></Button>
        <Table striped bordered hover variant="dark" id="getPassTable"></Table>
      </div>
    )
  
}
async function getPass(){
  var usu_id=de(varsGet.vars.usu_id)
  usu_id=parseInt(usu_id)  
  var resJson=""
  const queryget = await fetch("https://securitypassword.cyclic.app/getRegisters/?usu_id="+usu_id, {method : 'GET',})
  .then(function(response) {
     return response.json(); })
    .then(function(json) {
      var data=de(json.data)
      console.log(data)
      return json
      })
      if(queryget.data!=""){
        var changeTable=""
        resJson=JSON.parse(data)

        var table=document.getElementById("getPassTable")
        table.innerHTML=""
        for(var r in resJson){
          var regId=de(resJson[r].reg_id)
          var row = table.insertRow(r);
          var cellName = row.insertCell(0);
          var cellPass = row.insertCell(1);
          var cellDel = row.insertCell(2);
          cellName.append(safe(de(resJson[r].reg_name)))
          cellPass.append(safe(de(resJson[r].reg_pass)))
          var command= 'fetch("https://securitypassword.cyclic.app/delRegister/?reg_id='+regId+'", {method : "GET",}).then()'
          cellDel.innerHTML="<input type='button' value='delete' onclick='"+command+"' id='delBtn"+r+"' ></Button>"
          console.log("key "+r+" "+regId)
        }
      }
    ;
}
export default GetPass;