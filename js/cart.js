let cartIcono = document.querySelector(".icon-cart-container");
let salirCart = document.querySelector(".close-cart");
let cartSection = document.querySelector(".cart-section");
let body = document.querySelector(".body");
let total = document.querySelector(".total");
let itemCleanAllItems = document.querySelector(".remove-all-items")
let iconoCartNumero = document.querySelector(".icono-cart-numero");
let btnCheckout = document.querySelector(".btn-check-out");

cartIcono.addEventListener("click", abrirCerrarCart);
salirCart.addEventListener("click", abrirCerrarCart);


function abrirCerrarCart(){
  cartSection.classList.toggle("cart-section--active");
  let claseAgregada = "cart-section--active";
  noPermitirScrollDelBody(cartSection, claseAgregada);
}


//agregar items al carrito

function obtenerDatosDeLaCard(e){
  let card = e.target.closest(".card");
  let imgCard = card.querySelector(".img-prod").src;
  let nombreDelCard = card.querySelector(".card-title").textContent;
  let precioDelCard = card.querySelector(".card-price").textContent;
  precioDelCard = parseInt(precioDelCard);
  
  
  
  if(sumarMismoItemAgregadoAlCart(nombreDelCard)){
    sumaTotal(); 
    return;
  }
  else{
    agregarAlCarrito(imgCard, nombreDelCard,precioDelCard);
    sumaTotal();

  } 
}


function agregarAlCarrito(img,nombre,precio){
  let item = document.createElement("div");
  item.classList.add("item-card");  
  let htmlCart = `
    <div class="item-img-container">
      <img src="${img}" alt="">              
    </div>
    <div class="item-card-info">
      <h3 class="item-name">${nombre}</h3>
      <p class="item-price">${precio} $</p>
    </div>
    <div class="item-card-count">
      <div class="restar round-btn-style">-</div>
      <div class="num-item">1</div>
      <div class="sumar round-btn-style">+</div>
    </div>
    <div class="remove-item round-btn-style">X</div>

  `
  item.innerHTML = htmlCart;
  cartContainer.append(item);

  let btnRemoverItem = document.querySelectorAll(".remove-item");
  btnRemoverItem.forEach(el =>{
    el.addEventListener("click", removerItem);
  })
  
  let btnRestarItem = document.querySelectorAll(".restar");
  let btnSumarItem = document.querySelectorAll(".sumar");

  btnRestarItem.forEach(el =>{
    el.addEventListener("click", restarItem);
  })
  btnSumarItem.forEach(el =>{
    el.addEventListener("click", sumarItem);
  })
}


function removerItem(e){
  let item = e.target.closest(".item-card");
  cartContainer.removeChild(item);
  sumaTotal();
  
}


function sumarMismoItemAgregadoAlCart(nombre){
  let nombresDeLosItems = document.querySelectorAll(".item-name");
  for(let itemNombre of nombresDeLosItems){
    if(nombre == itemNombre.textContent){      
      let itemCart = itemNombre.closest(".item-card");
      let num = itemCart.querySelector(".num-item");
      let sumarUnItemRepetido = parseInt(num.innerHTML) + 1;
      num.innerHTML = sumarUnItemRepetido;
      return true;
    }
  }

}


function restarItem (e){
  let itemCart = e.target.closest(".item-card");
  let num = itemCart.querySelector(".num-item");
  if(parseInt(num.innerHTML) > 1){
    let sumarUnItemRepetido = parseInt(num.innerHTML) - 1;
    num.innerHTML = sumarUnItemRepetido;
  }
  else{
    num.innerHTML = 1;
  }
  sumaTotal(); 

}


function sumarItem(e){
  let itemCart = e.target.closest(".item-card");
  let num = itemCart.querySelector(".num-item");
  let sumarUnItemRepetido = parseInt(num.innerHTML) + 1;
  num.innerHTML = sumarUnItemRepetido;
  sumaTotal();

}


function sumaTotal(){
  let sumaTotal = 0;    
  let numeroDeItems = document.querySelectorAll(".num-item");
  for(let numero of numeroDeItems){
    let itemCart = numero.closest(".item-card");
    let precio = itemCart.querySelector(".item-price").textContent;
    let precioXItems = parseInt(precio) * parseInt(numero.innerHTML);
    sumaTotal += precioXItems;
  }
  total.innerHTML = `${sumaTotal} $`;
  numeroTotalDeItemsEnElIconoDelCart();
  popupnumeroEnElIcono();

}


itemCleanAllItems.addEventListener("click", removerTodosLosItems);


function removerTodosLosItems(){
  Swal.fire({
    title: 'Estas seguro que quieres borrar todos los items?',
    text: "No podras revertirlo!",
    icon: 'warning',
   
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, vaciar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Vaciado!',
        'Tu carrito ha sido vaciado.',
        'success'
      )
      while (cartContainer.firstChild) {
        cartContainer.removeChild(cartContainer.firstChild);
      }
      sumaTotal();
    }
  })
 
}



function numeroTotalDeItemsEnElIconoDelCart(){
  let suma = 0;
  let numeroDeItems = document.querySelectorAll(".num-item");
  for(let item of numeroDeItems){
    suma += parseInt(item.innerHTML);
  }
  iconoCartNumero.innerHTML = suma;
}


function popupnumeroEnElIcono(){
  let numero = parseInt(iconoCartNumero.innerHTML);
  if(numero > 0){
    iconoCartNumero.style.display = "flex";

  }
  else{
    iconoCartNumero.style.display = "none";
  } 
  
}


/* ---------------------------------------------------------
-----------------------check out----------------------------
------------------------------------------------------------- */

btnCheckout.addEventListener("click", valirdarCompra);

function valirdarCompra (){
  if(cartContainer.children.length < 1){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No tienes ningun item en el carrito!',
    
    })
  }
  else{
    Swal.fire({
      title: 'Esta seguro que quiere realizar la compra?',
      text: `${total.textContent}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, comprar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Pagado!',
          'Haz pagado tu compra exitosamente.',
          'success'
        )
        while (cartContainer.firstChild) {
          cartContainer.removeChild(cartContainer.firstChild);
        }
        sumaTotal();
      }
    })
  }

}