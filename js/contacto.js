let form = document.querySelector("#form"); 
let inputNombre = document.querySelector("#input-nombre");
let inputMail = document.querySelector("#input-mail");
let textarea = document.querySelector("#textarea");
let submutBtn = document.querySelector(".submit");

form.addEventListener("submit", enviarFormulario);

function enviarFormulario(e){
  e.preventDefault();
  Swal.fire({
    title: 'Mensaje enviado',
    text: 'Gracias por contactarte con nosotros'
  })
  inputNombre.value = "";
  inputMail.value = "";
  textarea.value = "";


}
