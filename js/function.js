

function noPermitirScrollDelBody(constante, clase){
  if(constante.classList.contains(`${clase}`)){
    body.classList.add("body-scroll");
  } 
  else{
    body.classList.remove("body-scroll");
  }
}
