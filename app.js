// variables
const navDeploy = document.getElementById("nav__deploy");
const navBackground = document.querySelector(".nav__background");

const quantityBox = document.querySelector('.main__info--quantitybox');
const plusIcon = document.getElementById('plus__icon');
const minusIcon = document.getElementById('minus__icon');
const quantityItem = document.getElementById('quantity__item--quantity');

let cart = document.getElementById('cart__box');
const cartContent = document.querySelector('#cart__content tbody');
const checkoutCart = document.getElementById('checkout__cart');
const addCartButton = document.getElementById('main__info--button');
const sneakerPrice = document.querySelector('.main__info--pricebox h2');
const sneakerImage = document.querySelector('.product__img');
const sneakerName = document.querySelector('.main__info--sneakerbox h1');
const sneakerIdentify = document.querySelector('#main__info--button').getAttribute('data-id')
let cartItems = [];

// arrow functions
let indexValue = 1
showImg(indexValue)

function sideSlide(e){
    showImg(indexValue +=e)
}

function showImg(e){
    const img = document.querySelectorAll('.product__img')
    if(e > img.length) {
        indexValue = 1
    } else if(e < 1){
        indexValue = img.length
    }

    for (let i = 0; i < img.length; i++) {
        img[i].style.display = 'none';
    }

    img[indexValue - 1].style.display = 'block';
}

// quantity functions
let start = 1;
function aumentar(){
    quantityItem.value = ++start
    if(quantityItem.value <= 1){
        quantityItem.value = 1
    }
}

function disminuir(){
    quantityItem.value = --start
    if(quantityItem.value <= 1){
        quantityItem.value = 1
    }
}

// nav functions

const openNav = () => {
    navDeploy.style.width = "67%"
    navBackground.style.width = "33%"
 }
const closeNav = () => {
    navDeploy.style.width = "0"
    navBackground.style.width = "0"
}

navBackground.addEventListener('click', closeNav)


// cart functions

function openCart (){
    if(cart.style.height === '0vh'){
        cart.style.height = '38vh'
    } else {
        cart.style.height = '0vh'
    }
}

loadEventListeners();
function loadEventListeners(){
    // Add sneakers pressing the button
    addCartButton.addEventListener('click', addSneaker)

    // Delete sneakers in the cart
    cart.addEventListener('click', deleteSneaker)
}

function addSneaker(){

    // object with sneaker info
    const sneakerInfo = {
        img: sneakerImage.src,
        title: sneakerName.textContent,
        price: sneakerPrice.textContent,
        quantity: parseInt(quantityItem.value),
        finalPrice: sneakerTotal(),
        id: sneakerIdentify
    }


    // Check if an sneaker is in the cart
    const exist = cartItems.some( sneaker => sneaker.id === sneakerInfo.id)
    if(exist){
        // Update the quantity if the sneaker already exist in the cart
        const sneakers = cartItems.map( sneaker => {
            if (sneaker.id === sneakerInfo.id){
                sneaker.quantity = sneaker.quantity + parseInt(quantityItem.value)
                sneaker.finalPrice = parseInt(sneakerPrice.textContent.substring(1)) * sneaker.quantity // Calculate the final price
                return sneaker; // return updated object
            } else{
                return sneaker; // return not duplicated objects
            }
        } )
        // let totalPrice = 0
        // totalPrice = sneaker.quantity * parseInt(sneakerPrice.textContent.substring(1))
        // console.log(totalPrice)
        cartItems = [...sneakers]
    }else{
         // add items to cart
        cartItems = [...cartItems, sneakerInfo]
    }

    
    cartHTML()

    // total price of quantity sneakers
    function sneakerTotal(){
        return totalPrice = parseInt(sneakerPrice.textContent.substring(1)) * quantityItem.value
    }
}






// Delete sneaker in the cart
function deleteSneaker(e){
    if(e.target.classList.contains('delete__item--button')){
        const sneakerId = e.target.getAttribute('data-id')
    
        // Delete the sneaker of the cart 
        cartItems = cartItems.filter ( sneaker => sneaker.id !== sneakerId)
        
        cartHTML(); // Iterate over the cart to refresh the HTML    
    }
}


    // insert html data in cart
    function cartHTML(){

        // clean HTML
        limpiarHTML()

        // loop the cart and generate the HTML
        cartItems.forEach( sneaker => {
            const {img, title, price, quantity, finalPrice, id} = sneaker
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${img}" class="img__cart">
                </td>
                <td>   
                    ${title}<br>
                    ${price} x ${quantity} <span id="final__price">$${finalPrice}</span>
                </td>
                <td>
                   <img src="/images/icon-delete.svg" class="delete__item--button" data-id="${id}">
                </td>
            `;

            // Fill the tbody y with items
            checkoutCart.style.display = 'flex'
            cartContent.appendChild(row)


        })
        
    }


    // Cleaning code before pushin in the tbody
function limpiarHTML(){
    while (cartContent.firstChild) {
        cartContent.removeChild(cartContent.firstChild)
    }
}








