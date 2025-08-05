// I'm going to validate that the Html is loaded, in order to use the JS below.

// This if statement is to check the ready state of the document is still loading? if so we want to add an event listener.
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)

// if is not loading more I want to run the ready function that contains my JS
}else{
    ready()
}

function ready() {

        /* The first thing I going to work with is the danger btns to take away something in the cart */
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    /* This is the structure of a for loop for(var i = 0; i < removeCartItemButtons.length; i++) the var start at 0, and if the legth of the element i selected is more than i the i++ is going to add 1 to the i and in this way is going to go every element*/
    for(var i = 0; i < removeCartItemButtons.length; i++) {
        /* Now the var button is using the for loop i to go through the elements in this casa  removeCartItemButtons*/
        var button = removeCartItemButtons[i]
        /* The addEventListener have a click option that is the one im using and im using the event fuction which have the option of target. */
        button.addEventListener('click', removeCartItem)
        }
        var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for(var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]
            input.addEventListener('change', quantityChanged)
        }

        var addToCartButtons = document.getElementsByClassName('shop-item-btn')
        for(var i = 0; i < addToCartButtons.length; i++){
            var button = addToCartButtons[i]
            button.addEventListener('click',addToCartClicked)
        }

        document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

    }

function purchaseClicked(){
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
} 

function removeCartItem(event){
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
            updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart (title, price, imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]

    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('This Item is already added to the cart')
            // With this return we got that the fuction stop and return 
            return
        }
    }
    var cartRowContents = 
    `<div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger cart-quantity-btn" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    // in order to make this work after the first load I need to do the following
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function updateCartTotal(){
    // Obtain the cart-row elements
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')

    var total = 0
    // I need the loop to go through all the cart-row elements
    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        // Now I need the elements that have the price and the quantity to convert them to numbers and after that do math
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]

        // This is the way to convert this element and value to real numbers
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value

        // This total variable make the math 
        total = total + (price * quantity)
    }

    total = Math.round(total *100) / 100
  
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total

}

