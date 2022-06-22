let productosContainer = document.querySelector(".card-container");
let cartContainer = document.querySelector(".card-item-container");

fetch('./js/api-products.json')
  .then(res => res.json())
  .then(data => displayProducts(data))


function displayProducts (productos){
  let htmlCard = "";
  for(let el of productos){
   
    
    htmlCard += 
    `
      <div class="card">
        <div class="card-img">
          <img class="img-prod" src="../assets/imagenes/img-prod2/${el["imagen"]}" alt="${el["nombre"]}" loading="lazy">
        </div>
        <div class="card-info">
          <h3 class="card-title">${el["nombre"]}</h3>
          <p class="card-price">${el["precio"]} $</p>
          <button class="button-style btn-agregar-al-carrito">Sumar al carrito</button>
        </div>
      </div>   
    
    ` 

  }
  productosContainer.innerHTML = htmlCard;
  let btnAgregarAlCarrito = document.querySelectorAll(".btn-agregar-al-carrito")
  btnAgregarAlCarrito.forEach(el =>{
    el.addEventListener("click", obtenerDatosDeLaCard)
  })

}


//funcion agregar al carrito en el archivo cart.js




