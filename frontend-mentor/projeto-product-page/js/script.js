// Variables
const cartIcon = document.querySelector(".cart-icon");
const cart = document.querySelector(".cart");
const itemsInCart = document.querySelector("#items-in-cart");
const buttonAddToCart = document.querySelector("#add-to-cart");

const emptyCartMessage = document.querySelector("#empty-cart-message");
const productInCartContainer = document.querySelector("#product-in-cart-container");
const productInCartImage = document.querySelector("#product-in-cart-image");
const productInCartName = document.querySelector("#product-in-cart-name");
const productInCartPrice = document.querySelector("#product-in-cart-price");
const productInCartQuantity = document.querySelector("#product-in-cart-quantity");
const productInCartTotalPrice = document.querySelector("#product-in-cart-total-price");

const buttonCheckout = document.querySelector("#button-checkout");
const buttonMinus = document.querySelector("#minus");
const buttonPlus = document.querySelector("#plus");

const quantityText = document.querySelector("#quantity");
let quantity = 0;
let totalItemsInCart = 0;

const src = document.querySelector("#product-image-thumb")?.src;
const startIndex = src?.indexOf("/images");
const productImageThumb = src?.substring(startIndex);

const productName = document.querySelector("#product-name");
const productPrice = Number(document.querySelector("#product-price")?.textContent.slice(1));
const productImage = document.querySelector("#product-image");
const productAllThumbs = document.querySelectorAll("#main-thumbs-container .thumb");
const mainRightArrow = document.querySelector("#main-right-arrow");
const mainLeftArrow = document.querySelector("#main-left-arrow");

const modal = document.querySelector("#modal-product-image");
const modalThumbs = document.querySelectorAll("#modal-product-image .thumb");
const modalMainImage = document.querySelector("#modal-main-image");
const rightArrowModal = document.querySelector("#right-arrow-modal");
const leftArrowModal = document.querySelector("#left-arrow-modal");
const closeModalButton = document.querySelector("#close-modal");

let currentIndex = 0;

const menuButton = document.querySelector("#menu-button");
const navList = document.querySelector("#nav-list");
const navBackground = document.querySelector("#nav-background");

// Checkout's Variables


// Functions
const addNewProductInCart = totalPrice => {
   const div = document.createElement("div");
   div.classList.add(
      "flex",
      "items-center",
      "gap-4",
      "w-[85%]",
      "my-5.5",
      "mx-auto"
   );

   div.innerHTML = `
      <img
         class="w-12 rounded-md"
         src="${productImageThumb}"
      />
      <div>
         <p class="text-dark-grayish-blue">
            ${productName.textContent}
         </p>
         <div>
            <span class="text-dark-grayish-blue">$${productPrice.toFixed(
               2
            )} x</span>
            <span class="quantity-in-cart text-dark-grayish-blue" data-quantity="${quantity}">${quantity}</span>
            <span class="font-700 text-very-dark-blue ml-2">$${totalPrice.toFixed(
               2
            )}</span>
         </div>
      </div>
      <img
         class="trash cursor-pointer"
         src="./images/icon-delete.svg"
         alt="trash"
      />
   `;

   productInCartContainer.appendChild(div);
};

const closeModal = () => {
   modal.classList.remove("flex");
   modal.classList.add("hidden");
};

const updateModalImage = index => {
   if (index < 0) index = modalThumbs.length - 1;
   if (index >= modalThumbs.length) index = 0;

   currentIndex = index;

   const thumbImage = modalThumbs[currentIndex].querySelector("img");
   const src = thumbImage.src.replace("-thumbnail", "");
   modalMainImage.src = src;

   modalThumbs.forEach((thumb, i) => {
      if (i === currentIndex) {
         thumb.classList.add("selected");
         thumb.classList.remove("unselected");
      } else {
         thumb.classList.add("unselected");
         thumb.classList.remove("selected");
      }
   });
};

const updateMainImage = index => {
   if(index < 0) index = productAllThumbs.length - 1;
   if(index >= productAllThumbs.length) index = 0;

   currentIndex = index;

   const thumbImage = productAllThumbs[currentIndex].querySelector("img");
   const src = thumbImage.src.replace("-thumbnail", "");
   productImage.src = src;

   productAllThumbs.forEach((thumb, i) => {
      if(i === currentIndex) {
         thumb.classList.add("selected");
         thumb.classList.remove("unselected");
      } else {
         thumb.classList.add("unselected");
         thumb.classList.remove("selected");
      }
   })
}

const closeMenu = () => {
   menuButton.src = menuButton.src.replace("close", "menu");
   document.body.style.overflowY = "auto";

   navBackground.classList.add("hidden");
   navBackground.classList.remove("fixed");

   navList.classList.add("hidden");
   navList.classList.remove("flex");
};

// Events
buttonAddToCart?.addEventListener("click", () => {
   if (quantity === 0) return;

   let totalPrice = quantity * productPrice;

   emptyCartMessage.classList.remove("flex");
   emptyCartMessage.classList.add("hidden");

   productInCartContainer.classList.remove("hidden");
   productInCartContainer.classList.add("flex");

   buttonCheckout.classList.remove("hidden");
   buttonCheckout.classList.add("block");

   addNewProductInCart(totalPrice);

   const quantityItemsInCart = productInCartContainer
      .closest("div")
      .querySelectorAll("[data-quantity]");

   quantityItemsInCart.forEach(item => {
      totalItemsInCart += Number(item.dataset.quantity);
   });

   quantity = 0;
   totalPrice = 0;

   quantityText.textContent = quantity;
   itemsInCart.textContent = totalItemsInCart;

   totalItemsInCart = 0;
});

buttonPlus?.addEventListener("click", () => {
   quantity++;
   quantityText.textContent = quantity;
});

buttonMinus?.addEventListener("click", () => {
   if (quantityText.textContent <= 0) return;

   quantity--;
   quantityText.textContent = quantity;
});

cartIcon?.addEventListener("click", () => cart.classList.toggle("hidden"));

productInCartContainer?.addEventListener("click", event => {
   if (event.target.classList.contains("trash")) {
      const item = event.target.closest("div.flex.items-center");

      if (item) {
         const itemQuantity = Number(
            item.querySelector(".quantity-in-cart").textContent
         );
         itemsInCart.textContent =
            Number(itemsInCart.textContent) - itemQuantity;

         item.remove();
      }

      if (productInCartContainer.children.length === 0) {
         emptyCartMessage.classList.remove("hidden");
         emptyCartMessage.classList.add("flex");

         productInCartContainer.classList.remove("flex");
         productInCartContainer.classList.add("hidden");

         buttonCheckout.classList.remove("block");
         buttonCheckout.classList.add("hidden");

         itemsInCart.textContent = 0;
      }
   }
});

productAllThumbs?.forEach(thumb => {
   thumb.addEventListener("click", () => {
      productAllThumbs.forEach(t => {
         t.classList.remove("selected");
         t.classList.add("unselected");
      });

      const path = thumb.querySelector("img").src.replace("-thumbnail", "");
      console.log(path);

      productImage.src = path;

      thumb.classList.add("selected");
      thumb.classList.remove("unselected");
   });
});

productImage?.addEventListener("click", () => {
   if(window.innerWidth >= 1024) {
      modal.classList.add("flex");
      modal.classList.remove("hidden");
   }
});

mainLeftArrow?.addEventListener("click", () => 
   updateMainImage(currentIndex - 1)
)

mainRightArrow?.addEventListener("click", () => 
   updateMainImage(currentIndex + 1)
)

closeModalButton?.addEventListener("click", closeModal);

modal?.addEventListener("click", event => {
   if (event.target.id === "modal-product-image") closeModal();
});

leftArrowModal?.addEventListener("click", () =>
   updateModalImage(currentIndex - 1)
);
rightArrowModal?.addEventListener("click", () => 
   updateModalImage(currentIndex + 1)
);

modalThumbs?.forEach((thumb, index) => {
   thumb.addEventListener("click", () => updateModalImage(index));
});

menuButton?.addEventListener("click", () => {
   if (menuButton.src.includes("icon-menu.svg")) {
      menuButton.src = menuButton.src.replace("menu", "close");
      document.body.style.overflowY = "hidden";

      navBackground.classList.add("fixed");
      navBackground.classList.remove("hidden");

      navList.classList.add("flex");
      navList.classList.remove("hidden");
   } else {
      closeMenu();
   }
});

navList?.querySelectorAll(".nav-link").forEach(link => {
   link.addEventListener("click", closeMenu)
})

navBackground?.addEventListener("click", closeMenu);


// CHECKOUT'S EVENTS

