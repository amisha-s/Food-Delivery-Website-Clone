const cartIcon = document.querySelector(".cart-icon");
const cardTab = document.querySelector(".card-tab");
const closeButton = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartList=document.querySelector(".cart-list");

cartIcon.addEventListener("click", (event) => {
  event.preventDefault();
  cardTab.classList.add("card-tab-active");
});

closeButton.addEventListener("click", () => {
  cardTab.classList.remove("card-tab-active");
});

let productList = [];
let cartProduct=[];

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
                <a href="#" class="quantity-btn"><i class="fa-solid fa-minus"></i></a>
                <h4 class="quantity-value">1</h4>
                <a href="#" class="quantity-btn"><i class="fa-solid fa-plus"></i></a>
              </div>
            </div>`
  cartList.appendChild(cartItem);
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
