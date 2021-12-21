import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function drag(element) {
    const elmnts = document.getElementsByClassName(element)
    var count = 0
    for (var elmnt of elmnts){
      // console.log(elmnt)
      dragElement(count,elmnt);
      count += 1
    }
}

function dragElement(count, elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const headerElmnt = document.getElementsByClassName(elmnt.className + "header")
    // if (document.getElementById(elmnt.id + "header")) {
    if (headerElmnt[count]) {
      // if present, the header is where you move the DIV from:
      if (detectMob()){
        // document.getElementById(elmnt.id + "header").ontouchstart = dragDown;
        headerElmnt[count].ontouchstart = dragDown;
      }
      else{
        console.log("In dragElemenet in elst of if")
      headerElmnt[count].onmousedown = dragDown;
      }
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      if (detectMob()){
        elmnt.ontouchstart = dragDown;
      }
      elmnt.onmousedown = dragDown;
    }
  
    function dragDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:

      if (detectMob()){
        pos3 = e.touches[0].clientX
        pos4 = e.touches[0].clientY
        document.ontouchend = closeDragElement
        document.ontouchmove = elementDrag;
      } else {
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      }
    }
  
    function elementDrag(e) {

      e = e || window.event;
      e.preventDefault();

      // calculate the new cursor position:
      if (detectMob()){
        pos1 = pos3 - e.touches[0].clientX;
        pos2 = pos4 - e.touches[0].clientY;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
      }else{
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
      }
      // set the element's new position:
     
      const screenWidth = window.screen.width
      console.log(screenWidth)
      if ( screenWidth > 1880 ){
        console.log(" > 1880")
        screenLimited(10, 320, 180, 300, pos2, pos1, elmnt)
      }
      if (screenWidth >= 1500 && screenWidth <= 1880){
        console.log(" >= 1500")
        screenLimited(10, 300, 170, 290, pos2, pos1, elmnt)
      }
      if (screenWidth > 1282 && screenWidth < 1500){
        console.log("> 1282")
        screenLimited(10, 270, 120, 220, pos2, pos1, elmnt)
      }
      if (screenWidth >= 1024 && screenWidth <= 1282){
        console.log(">= 1024")
        screenLimited(10, 220, 110, 200, pos2, pos1, elmnt)
      }
      else if (screenWidth > 768 && screenWidth < 1024){
        console.log(">= 768")
        screenLimited(10, 140, 60, 120, pos2, pos1, elmnt)
      }
      else if(screenWidth >= 482 && screenWidth <= 768 ){
        console.log(">= 482")
        screenLimited(10, 320, 150, 280, pos2, pos1, elmnt)
      }
      else if(screenWidth < 482){
        console.log("< 468")
        screenLimited(10, 200, 100, 200, pos2, pos1, elmnt)
      }
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      if (detectMob()){
        document.ontouchend = null;
        document.ontouchmove = null;  
      }else{
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
  }

  function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
  
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
  }

  function screenLimited(tl, tu, ll, lu, pos2, pos1,elmnt){
    elmnt.style.top = elmnt.offsetTop < tl ? tl + "px" : elmnt.offsetTop > tu ? tu + "px" : (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = elmnt.offsetLeft < ll ? ll + "px" : elmnt.offsetLeft > lu ? lu + "px" : (elmnt.offsetLeft - pos1) + "px";
  }