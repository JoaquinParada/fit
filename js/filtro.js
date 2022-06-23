let btnFiltro = document.querySelector(".abrir-filtro");
let btnClose = document.querySelector(".close-filtro");
let filtroContainer = document.querySelector(".filtro-container");
let btnAplicarFiltros = document.querySelector(".btn-apply");
let btnResetFiltro = document.querySelector(".reset-filtro");


btnFiltro.addEventListener("click", ()=>{
  abrirCerrarFiltro();
});

btnClose.addEventListener("click", ()=>{
  abrirCerrarFiltro();
});


function abrirCerrarFiltro(){
  filtroContainer.classList.toggle("abrir-filtro--active"); 
  let clase = "abrir-filtro--active";
  noPermitirScrollDelBody(filtroContainer, clase);
  
}
btnAplicarFiltros.addEventListener("click", aplicarFiltrosalHTML)

function aplicarFiltrosalHTML(e){  
  let genero = document.querySelectorAll(".input-sexo");
  let precioInput = document.querySelectorAll(".input-precio"); 
  
  for(let el of genero){
    if(el.checked){           
      for(let i of precioInput){
        if(i.checked){
          let precio = parseInt(i.value);
          return fetch('./js/api-products.json')
            .then(res => res.json())
            .then(data =>filtrarXGeneroYPrecio(data,el.value,precio))
        }
      }
      return fetch('./js/api-products.json')
      .then(res => res.json())
      .then(data =>filtrarXGenero(data,el.value));
    }   
  }
  for(let i of precioInput){
    if(i.checked){
      let precio = parseInt(i.value);
      return fetch('./js/api-products.json')
        .then(res => res.json())
        .then(data =>filtrarXPrecio(data,precio))
    }
  }
  
}


function filtrarXGeneroYPrecio(data,el,precio){
  let arrProd = data.filter(elemento=> elemento["sexo"] == el && elemento["precio"] <= precio)
  displayProducts(arrProd);
  abrirCerrarFiltro();
}

function filtrarXGenero(data,el){
  let arrProd = data.filter(elemento=> elemento["sexo"] == el)
  displayProducts(arrProd);
  abrirCerrarFiltro();
}

function filtrarXPrecio(data,precio){
  let arrProd = data.filter(elemento=> elemento["precio"] <= precio)
  displayProducts(arrProd);
  abrirCerrarFiltro();
}


btnResetFiltro.addEventListener("click", resetearLosFiltros);

function resetearLosFiltros(){
  let genero = document.querySelectorAll(".input-sexo");
  let precioInput = document.querySelectorAll(".input-precio");
  for(let el of genero){
    if(el.checked){ 
      el.checked = false;
    }
  }
  for(let el of precioInput){
    if(el.checked){ 
      el.checked = false;
    }
  }
  return fetch('./js/api-products.json')
  .then(res => res.json())
  .then(data => {
    displayProducts (data)
    abrirCerrarFiltro()})

}
