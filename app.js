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

// Slides functions
let indexValue = 1
showImg(indexValue)

    // Next and previous controls for img
function sideSlide(e){
    showImg(indexValue +=e)
}

    // Thumbnail control function
function currentSlide(e){
    showImg(indexValue = e)
}

    // Shows the selected img in indexValue
function showImg(e){
    let img = document.querySelectorAll('.product__img')
    let thumb = document.querySelectorAll('.thumbnail__img')
    if(e > img.length) {
        indexValue = 1
    } else if(e < 1){
        indexValue = img.length
    }

    for (let i = 0; i < img.length; i++) {
        img[i].style.display = 'none';
    }

    for (i = 0; i < thumb.length; i++) {
        thumb[i].className = thumb[i].className.replace(" active__thumb", "");
    }

    img[indexValue - 1].style.display = 'block';
    thumb[indexValue - 1].className += " active__thumb"
}

// Lightbox functions
let lightboxBg = document.querySelector('.slide__lightbox--bg')
let indexLightbox = 1
showLightbox(indexLightbox)

    //Next and previous controls lightbox
function sideLightbox(n){
    showLightbox(indexLightbox += n)
}

    // Thumbnail control function
function currentLightbox(n){
    showLightbox(indexLightbox = n)
}


    // Display img 
function showLightbox(n){
    let img = document.querySelectorAll('.lightbox__img')
    let thumb = document.querySelectorAll('.thumbnail__lb')
    if (n > img.length){
        indexLightbox = 1
    } else if(n < 1){
        indexLightbox = img.length
    }

    for (let i = 0; i < img.length; i++) {
        img[i].style.display = 'none';
    }

    for (let i = 0; i < thumb.length; i++) {
        thumb[i].className = thumb[i].className.replace(" active__thumb", "")
    }

    img[indexLightbox - 1].style.display = "block";
    thumb[indexLightbox - 1].className += " active__thumb"
}

    // Open and close lightbox
function openLightbox (){
    lightboxBg.style.display = 'block'
    // let img = document.querySelectorAll('.product__img')
    // if(lightboxBg.style.display = 'block'){
    //     let lightboxImg = document.querySelector('.slide__lightbox')
    //     for (let i = 0; i < img.length; i++) {
    //         lightboxImg.appendChild(img[i])
    //     }
    // }
}

    function closeLightbox(){
    lightboxBg.style.display = 'none'
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
        cart.style.height = '30vh'
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
                
                overQuantity()
                function overQuantity(){
                    let overNumber = document.querySelector("#number__items")
                    overNumber.innerHTML = `${sneaker.quantity}`
                }
                sneaker.finalPrice = parseInt(sneakerPrice.textContent.substring(1)) * sneaker.quantity // Calculate the final price
                return sneaker; // return updated object
            } else{
                return sneaker; // return not duplicated objects
            }
        } )

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
                   <img src="/images/icon-delete.svg" class="delete__item--button pointer" data-id="${id}">
                </td>
            `;

            // Fill the tbody with items
            checkoutCart.style.display = 'flex'
            cartContent.appendChild(row)

            

        })
        // Checkout if cart have sneakers
        if (cartContent.children.length === 0) {
            const row = document.createElement('tr')
            row.setAttribute('id', 'cart__empty--message')
            row.className = 'center'
            checkoutCart.style.display = 'none'
            row.innerHTML = '<td>Your cart is empty.</td>'
            cartContent.appendChild(row)
        }       
    }


    // Cleaning code before pushin in the tbody
function limpiarHTML(){
    while (cartContent.firstChild) {
        cartContent.removeChild(cartContent.firstChild)
    }
}










