import React, { Component} from 'react'
import {Button,Switch} from 'react-native'
import $ from 'jquery'
import {en,de} from "./sec"
import './GetPass.css'

var state = ""; 


state = {  
  low: false,
  up:false,
  n:false,
  num:false,
  char:false,
  rect:false
}; 

export default class RandomPass extends Component {
  state = {  
    low: false,
    up:false,
    n:false,
    num:false,
    char:false,
    rect:false
  };  

  render() {
    return (
      <div className="RandomPass">
        <Switch id={this.id+".low"} value={this.state.low}  
                  onValueChange ={(low)=>{this.setState({low})
                  state.low=low}}><label>Minusculas</label></Switch>

        <Switch id={this.id+".up"} value={this.state.up}  
                  onValueChange ={(up)=>{this.setState({up})
                  state.up=up}}><label>Mayusculas</label></Switch>

        <Switch id={this.id+".num"} value={this.state.num}  
                  onValueChange ={(num)=>{this.setState({num})
                  state.num=num}}><label>Numeros</label></Switch>

        <Switch id={this.id+".char"} value={this.state.char}  
                  onValueChange ={(char)=>{this.setState({char})
                  state.char=char}}><label>Caracteres especiales</label></Switch>
                  <br></br>

                  <br></br>
        <input type="number" id="genNum" placeholder="length" ></input>
        <br></br>
        <Button title="generate" onPress={gen}></Button>
        <input type="text" id="genPass" placeholder='new pass'></input>
      </div>
    )
  }
}
function gen(){
  var len=$("#genNum").val()
  fetch("https://securitypassword.cyclic.app/generate/?low="+state.low.toString()
  +"&up="+state.up.toString()+"&n="+state.n.toString()+"&num="+state.num.toString()
  +"&char="+state.char.toString()+"&rect="+state.rect.toString()+"&len="+len, {method : 'GET',})
  .then(function(response) {
     return response.json(); })
    .then(function(json) {
      $("#genPass").val(de(json.data))
      console.log(de(json.data))
    });
}