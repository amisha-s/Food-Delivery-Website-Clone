const cartIcon = document.querySelector(".cart-icon");
const cardTab = document.querySelector(".card-tab");
const closeButton = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartListParent = document.querySelector(".cart-list");
const cardTotal=document.querySelector('.card-total');
const cartValue=document.querySelector('.cart-value');

cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cardTab.classList.add("card-tab-active");
});
closeButton.addEventListener("click", () => {
  cardTab.classList.remove("card-tab-active");
});
let productList = [];
let cartProduct=[];


const updateTotal=()=>{
    let totalCartPrice=0;
    let totalCartValue2=0;
    document.querySelectorAll('.item').forEach(item=>{
        const totalCartValue=parseInt(item.querySelector('.quantity-value').textContent);
        const itemTotal=parseFloat(item.querySelector('.item-total').textContent.replace('$',''));
        totalCartPrice+=itemTotal;
        totalCartValue2+=totalCartValue;

    })
    cardTotal.textContent=`$${totalCartPrice.toFixed(2)}`;
    cartValue.textContent=`${totalCartValue2}`
    
}


const showCards = () => {
  productList.forEach((product) => {
    const cardListDiv = document.createElement("div");
    cardListDiv.classList.add("order-card");

    cardListDiv.innerHTML = ` <div class="card-image">
              <img src="${product.image}" />
            </div>
            <h4>"${product.name}"</h4>
            <h4 class="price">"${product.price}"</h4>
            <a href="#" class="btn cart-btn">Add To Cart</a>`;
    cardList.appendChild(cardListDiv);
    const addToCartBtn = cardListDiv.querySelector(".cart-btn");
    addToCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCard(product);
    });
  });
};

const addToCard = (product) => {
    const existingProduct= cartProduct.find((item)=>item.id===product.id)
    if (existingProduct){
        alert("Item already in Cart");
        return ;
    }
   
        cartProduct.push(product)
    
  const cartList = document.createElement("div");
  cartList.classList.add("item");
  let value = 1;

  cartList.innerHTML = `
   <div class="item-image">
                <img src="${product.image}">
              </div>
              <div class=>
                <h4>${product.name}</h4>
                <h4 class="item-total">${product.price}</h4>
              </div>
              <div class="flex">
                <a href="#" class="quantity-btn minus"><i class="fa-solid fa-minus"></i></a>
                <h4 class="quantity-value">1</h4>
                <a href="#" class="quantity-btn plus"><i class="fa-solid fa-plus"></i></a>
              </div>`;
    cartListParent.append(cartList);
     updateTotal();
    const minusBtn=cartList.querySelector('.minus');
    const plusBtn=cartList.querySelector('.plus');
    const totalQuantity=cartList.querySelector('.quantity-value');
    const itemTotal=cartList.querySelector('.item-total');
    let price=parseFloat(product.price.replace('$',''));

    minusBtn.addEventListener('click',(e)=>{
         e.preventDefault();
        if(value>1){
        value--;
        totalQuantity.textContent=value;
        console.log(price)
        itemTotal.textContent=`$${(price*value).toFixed(2)}`
         updateTotal();



        }else{
            cartList.remove();
            cartProduct=cartProduct.filter(item=>item.id != product.id);


        }
       
        

    })
    plusBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        value++;
        totalQuantity.textContent=value;
        itemTotal.textContent=`$${(price*value).toFixed(2)}`
         updateTotal();
    })

};

const init = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((item) => {
      productList = item;
      console.log(productList);
      showCards();
    });
};
init();
