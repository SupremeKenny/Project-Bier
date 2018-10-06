import React, { Component } from "react";

export function updateInput(input) {
    
    // update react state
    //this.setState({ [key]:    value });
    var winkelwagen = [];
    if (localStorage.WinkelWagen) {
        console.log(localStorage.WinkelWagen)
        winkelwagen = JSON.parse(localStorage.WinkelWagen);
    } else {
        winkelwagen = [];
    }

    
    winkelwagen.push(input)

    var test = 'Pizza';
    var test = {};

    

    localStorage.setItem('WinkelWagen', JSON.stringify(winkelwagen));

    
  }

export function deleteInput(input){


}

export function count(){
    var winkelwagen = [];
    if (localStorage.WinkelWagen) {
        console.log(localStorage.WinkelWagen)
        winkelwagen = JSON.parse(localStorage.WinkelWagen);
    } else {
        winkelwagen = [];
    }

    return winkelwagen.length;

}