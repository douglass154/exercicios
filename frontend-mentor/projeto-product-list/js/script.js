const cardsContainer = document.querySelector('.cards-container');

const cartItemsQuantity = document.querySelector('.items-quantity');
const illustration = document.querySelector('.illustration-note');
const cartContainer = document.querySelector('.cart-container');
const cartItemsContainer = document.querySelector('.items-added');
const orderTotal = document.querySelector('.order-total');
const btnConfirmOrder = document.querySelector('.btn-confirm-order');
const btnStartNewOrder = document.querySelector('.btn-start-new-order');

let totalQuantity = 0;
let productsInCart = [];

const placeDishes = dishes => {
   dishes.forEach(dishe => {
      const { image, category, name, price } = dishe;

      cardsContainer.innerHTML += `
         <div class="card" data-name="${name}" data-price="${price}">
            <div class="card-img-container">
               <picture>
                  <source media="(max-width: 1200px)" srcset="${image.tablet}">
                  <source media="(max-width: 768px)" srcset="${image.mobile}">
                  <img src="${image.desktop}" alt="${category}">
               </picture>
               <button class="btn-add-to-cart add-to-cart active">
                  <img src="./assets/images/icon-add-to-cart.svg" alt="cart">
                  <span>Add to Cart</span>
               </button>
               <div class="div-quantity">
                  <img class="decrement-item" src="./assets/images/icon-decrement-quantity.svg" alt="decrement">
                  <span class="quantity">1</span>
                  <img class="increment-item" src="./assets/images/icon-increment-quantity.svg" alt="increment">
               </div>
            </div>
            <div class="plate-info">
               <span class="short-name">${category}</span>
               <h4>${name}</h4>
               <span class="price">$${price.toFixed(2)}</span>
            </div>
         </div>
      `;
   });
};

const getDishes = async () => {
   try {
      const response = await fetch('data.json');
      if (!response.ok) {
         throw new Error(`Error in response: ${response.statusText}`);
      }
      const dishes = await response.json();
      placeDishes(dishes);
   } catch (err) {
      console.log(`Error: ${err}`);
   }
};

getDishes();

const updateCart = (name, price, quantity, img) => {
   if (quantity <= 0) {
      productsInCart = productsInCart.filter(product => product.name !== name);
   } else {
      const existingItem = productsInCart.find(
         product => product.name === name
      );
      if (existingItem) {
         existingItem.quantity = quantity;
      } else {
         productsInCart.push({ name, price, quantity, img });
      }
   }
   addItemToCart();
};

cardsContainer.addEventListener('click', e => {
   const card = e.target.closest('.card');
   if (!card) return;

   const name = card.dataset.name;
   const price = parseFloat(card.dataset.price);
   const img = card.querySelector('img').src;
   const btnAddToCart = card.querySelector('.add-to-cart');
   const btnQuantity = card.querySelector('.div-quantity');
   const quantityCount = btnQuantity.querySelector('.quantity');

   if (e.target.closest('.add-to-cart')) {
      changeAppearanceOfTheAddToCartBtn(card, true);
      const count = Number(quantityCount.textContent);
      updateCart(name, price, count, img);
      addCartQuantity(true);
   }

   if (e.target.closest('.increment-item')) {
      const count = Number(quantityCount.textContent) + 1;
      quantityCount.textContent = count;
      updateCart(name, price, count, img);
      addCartQuantity(true);
   }

   if (e.target.closest('.decrement-item')) {
      let count = Number(quantityCount.textContent);

      if (count > 1) {
         count -= 1;
         quantityCount.textContent = count;
         updateCart(name, price, count, img);
         addCartQuantity(false);
      } else {
         changeAppearanceOfTheAddToCartBtn(card, false);
         quantityCount.textContent = 1;
         updateCart(name, price, 0, img);
         addCartQuantity(false);
      }
   }
});

const changeAppearanceOfTheAddToCartBtn = (card, changeAppearance) => {
   changeAppearance
      ? card.classList.add('active')
      : card.classList.remove('active');
};

const addItemToCart = () => {
   cartItemsContainer.innerHTML = '';
   let total = 0;

   productsInCart.forEach(product => {
      const totalPrice = product.price * product.quantity;
      total += totalPrice;

      const itemAdded = `
         <div class="added-item-cart">
            <div class="item">
               <h4>${product.name}</h4>
               <div class="added-items-info">
                  <span class="quantity">${product.quantity}x</span>
                  <span class="added-item-price price">@ $${product.price.toFixed(
                     2
                  )}</span>
                  <span class="added-item-total-price item-total-price">$${totalPrice.toFixed(
                     2
                  )}</span>
               </div>
            </div>
            <button class="btn-remove-item"><img src="./assets/images/icon-remove-item.svg" alt="remove"></button>
         </div>
         <hr>
      `;
      cartItemsContainer.insertAdjacentHTML('beforeend', itemAdded);
   });

   orderTotal.textContent = `$${total.toFixed(2)}`;

   const existingProduct = productsInCart.length > 0;
   cartContainer.classList.toggle('active', existingProduct);
};

const addCartQuantity = increment => {
   if (increment) {
      totalQuantity += 1;
      cartItemsQuantity.textContent = totalQuantity;
   } else {
      totalQuantity -= 1;
      cartItemsQuantity.textContent = totalQuantity;
   }
};

const showModal = () => {
   const chosenDishes = document.querySelector('.chosen-dishes');
   const chosenDishesTotalPrice = document.querySelector('.modal .order-total');
   const modal = document.querySelector('.modal-container');

   chosenDishes.innerHTML = '';

   let modalTotal = 0;

   productsInCart.forEach(product => {
      const totalPrice = product.price * product.quantity;
      modalTotal += totalPrice;

      const modalProductAdded = `
         <div class="modal-dishe-infos">
            <div class="dishe-infos">
               <img src="${product.img}" alt="${product.category}">
               <div class="chosen-dishe-info">
                  <h4>${product.name}</h4>
                  <div>
                     <span class="quantity">${product.quantity}x</span>
                     <span class="chosen-dishe-price price">@ $${product.price.toFixed(
                        2
                     )}</span>
                  </div>
               </div>
            </div>
            <span class="chosen-dishe-total-price item-total-price">$${totalPrice.toFixed(
               2
            )}</span>
         </div>
         <hr>
      `;

      chosenDishes.insertAdjacentHTML('beforeend', modalProductAdded);
   });

   chosenDishesTotalPrice.textContent = `$${modalTotal.toFixed(2)}`;
   modal.classList.add('active');
};

cartItemsContainer.addEventListener('click', e => {
   const btnRemoveItem = e.target.closest('.btn-remove-item');
   if (!btnRemoveItem) return;

   const itemAdded = btnRemoveItem.closest('.added-item-cart');
   const name = itemAdded.querySelector('.item h4').textContent;

   const index = productsInCart.findIndex(product => product.name === name);

   if (index !== -1) productsInCart.splice(index, 1);
   addItemToCart();

   const card = [...cardsContainer.children].find(
      product => product.dataset.name === name
   );

   if (card) {
      changeAppearanceOfTheAddToCartBtn(card, false);
      card.querySelector('.div-quantity .quantity').textContent = '1';
   }
});

btnConfirmOrder.addEventListener('click', () => showModal());

btnStartNewOrder.addEventListener('click', () => {
   const modal = document.querySelector('.modal-container');
   modal.classList.remove('active');

   // reset cart
   productsInCart = [];

   totalQuantity = 0;
   cartItemsQuantity.textContent = totalQuantity;

   addItemToCart();

   cardsContainer.querySelectorAll('.card').forEach(card => {
      changeAppearanceOfTheAddToCartBtn(card, false);
      card.querySelector('.quantity').textContent = '1';
   });
});
