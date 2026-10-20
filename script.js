const cartIcon = document.querySelector(".cart-icon");
const cardTab = document.querySelector(".card-tab");
const closeButton = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");

cartIcon.addEventListener("click", (event) => {
  event.preventDefault();
  cardTab.classList.add("card-tab-active");
});

closeButton.addEventListener("click", () => {
  cardTab.classList.remove("card-tab-active");
});

let productList = [];

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
            <a href="#" class="btn">Add To Cart</a>`;
     cardList.appendChild(orderCard)       
  });
};

const init = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCards();
    });
};
init();
