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


addCartButton.addEventListener('click', addSneaker)

function addSneaker(){

    // object with sneaker info
    const sneaker = {
        img: sneakerImage.src,
        title: sneakerName.textContent,
        price: sneakerPrice.textContent,
        quantity: quantityItem.value,
        finalPrice: sneakerTotal()
    }
    // add items to cart
    cartItems = [...cartItems, sneaker]
    
    cartHTML()
    console.log(cartItems)

    // total price of quantity sneakers
    function sneakerTotal(){
        return totalPrice = parseInt(sneakerPrice.textContent.substring(1)) * quantityItem.value
    }
}


    // insert html data in cart
    function cartHTML(){

        // clean HTML
        limpiarHTML()

        // loop the cart and generate the HTML
        cartItems.forEach( sneaker => {
            const {img, title, price, quantity, finalPrice} = sneaker
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
                    <a href="#"><img src="/images/icon-delete.svg"></a>
                </td>
            `;

            row.addEventListener('click', (e)=> {console.log(e.target)})

            // Fill the tbod y with items
            checkoutCart.style.display = 'flex'
            cartContent.appendChild(row)


        })
        
    }


    // Delete the curses in the tbody
function limpiarHTML(){
    while (cartContent.firstChild) {
        cartContent.removeChild(cartContent.firstChild)
    }
}





