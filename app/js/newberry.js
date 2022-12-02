function multiPix(show, hide) {

  // ***hide single image
  var oldRows = document.getElementById('detail').getElementsByClassName('row');
  oldRows[1].style.display = "none";
  
  // *** toggle visibility of multi-image views
  var newRows = document.getElementById('schema').getElementsByClassName('row');
  newRows[show].style.display = "block" ;
  newRows[hide].style.display = "none" ;
}

function otherVersE (e1, e2) {
  var sideBar = document.getElementById('sidebar').getElementsByTagName('div')[0] ;
  var newDiv = document.createElement('div') ;
  var link1 = document.createElement('a') ;
  var link2 = document.createElement('a') ;
  var text1 = document.createTextNode("Emblem" + " " + e1) ;
  var text2 = document.createTextNode("Emblem" + " " + e2) ;  
  var href1 = "http://emblematica.library.illinois.edu/detail/emblem/E" + e1 ;
  var href2 = "http://emblematica.library.illinois.edu/detail/emblem/E" + e2 ;
  link1.appendChild(text1) ;
  link1.setAttribute("href", href1) ;
  link2.appendChild(text2) ;
  link2.setAttribute("href", href2) ;
  newDiv.appendChild(link1) ;
  newDiv.appendChild(link2) ;
  sideBar.appendChild(newDiv) ;  
}