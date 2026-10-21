const cartIcon = document.querySelector(".cart-icon");
const cardTab = document.querySelector(".card-tab");
const closeButton = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartList=document.querySelector(".cart-list");
const cartTotal = document.querySelector(".card-total");
const cartValue=document.querySelector('.cart-value');
const hamburger=document.querySelector('.hamburger');
const mobileMenu=document.querySelector('.mobile-menu');
const bars=document.querySelector('.fa-bars');

cartIcon.addEventListener("click", (event) => {
  event.preventDefault();
  cardTab.classList.add("card-tab-active");
});

closeButton.addEventListener("click", () => {
  cardTab.classList.remove("card-tab-active");
});

hamburger.addEventListener('click',(event)=>{
  event.preventDefault();
  mobileMenu.classList.toggle('mobile-menu-active');
})
hamburger.addEventListener('click',(event)=>{
  event.preventDefault();
  bars.classList.toggle('fa-xmark');
})

let productList = [];
let cartProduct=[];
let value=1;

const updateTotal=()=>{
let totalPrice=0;
let totalQuantity=0
document.querySelectorAll('.item').forEach(item=>{
 const totalValue=parseInt(item.querySelector('.quantity-value').textContent) 
 const total=parseFloat(item.querySelector('.item-total').textContent.replace('$',''));
 totalPrice += total;
 totalQuantity +=totalValue;
})
cartTotal.textContent=`$${totalPrice.toFixed(2)}`;
cartValue.textContent=`${totalQuantity}`;
}




const showCards = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = ` 
            <div class="card-image">
              <img src="${product.image}" />
            </div>
            <h4>${product.name}</h4>
            <h4 class="price">${product.price}</h4>
            <a href="#" class="btn card-btn">Add To Cart</a>`;
     cardList.appendChild(orderCard)     
     
     const cardBtn=orderCard.querySelector('.card-btn');
     cardBtn.addEventListener('click',(e)=>{
      e.preventDefault();
      addToCart(product);
     })
  });
};

const addToCart=(product)=>{

  const existingProduct=cartProduct.find(item=>item.id===product.id);
  if(existingProduct){
    alert("Item already exists");
    return
  }
  cartProduct.push(product)

 let price=parseFloat(product.price.replace('$',''));


  const cartItem=document.createElement('div');
  cartItem.classList.add('item');

  cartItem.innerHTML=` <div class="item-image">
                <img src="${product.image}">
              </div>
              <div class=>
                <h4>${product.name}</h4>
                <h4 class="item-total">${product.price}</h4>
              </div>
              <div class="flex">
                <a href="#" class="quantity-btn minus"><i class="fa-solid fa-minus"></i></a>
                <h4 class="quantity-value">${value}</h4>
                <a href="#" class="quantity-btn plus"><i class="fa-solid fa-plus"></i></a>
              </div>
            </div>`
  cartList.appendChild(cartItem);
  updateTotal();

  const minusValue=cartItem.querySelector('.minus');
  const plusValue=cartItem.querySelector('.plus');
  const quantityValue=cartItem.querySelector('.quantity-value')
  const itemTotal=cartItem.querySelector('.item-total');

  minusValue.addEventListener('click',(e)=>{
    
    if(value>1){
       e.preventDefault();
    value--;
    quantityValue.textContent=value;
    itemTotal.textContent=`$${(price*value).toFixed(2)}`
    updateTotal();
    }
    else{
      cartItem.remove();
      cartProduct=cartProduct.filter(item=>item.id != product.id)
      updateTotal()
    }
  })
  plusValue.addEventListener('click',(e)=>{
    e.preventDefault();
    value++;
    quantityValue.textContent=value;
    itemTotal.textContent=`$${(price*value).toFixed(2)}`
    updateTotal()
  })
}

const init = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCards();
    });
};
init();
