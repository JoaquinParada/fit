let header = document.querySelector(".header");
let menuNav = document.querySelector(".menu-nav");
let btnHamburguer = document.querySelector(".hamburguer-icon");
let menuAhref = document.querySelectorAll(".menu-a");

window.addEventListener('scroll', () => {
  if(window.scrollY > 200){
    header.style.backgroundColor = "black";
    header.style.transition = ".5s";
  }
  else{
    header.style.backgroundColor = "transparent";
  }
 
})



btnHamburguer.addEventListener("click", openCloseMenu);

function openCloseMenu (){
 menuNav.classList.toggle("menu-nav--active");
 let claseAgregada = "menu-nav--active"
 noPermitirScrollDelBody(menuNav, claseAgregada);
}

window.addEventListener('resize', quitarClaseAlNav);

function quitarClaseAlNav(){
  if(window.innerWidth > 700){
    if(menuNav.classList.contains("menu-nav--active")){
      openCloseMenu();

    }
    
  }
}

menuAhref.forEach(el =>{
  el.addEventListener("click", ()=>{
    if(menuNav.classList.contains("menu-nav--active")){
      openCloseMenu();
    }

  })
})


mouseOverEnDesktop();

window.addEventListener('resize', mouseOverEnDesktop);

function mouseOverEnDesktop(){
  if(window.innerWidth > 630){
    menuAhref.forEach(el=>{
      el.classList.add("hover-desktop")
      })
  }
  else{
    menuAhref.forEach(el=>{
      el.classList.remove("hover-desktop")
      })    
  }
  
}


