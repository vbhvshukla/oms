(function checkAuthentication() {
  const users = JSON.parse(localStorage.getItem("users"));
  if (!users) {
    window.location.href = "index.html";
    return;
  }
  const authenticatedUser = users.find((u) => u.isAuthenticated);
  if (!authenticatedUser) {
    window.location.href = "index.html";
    return;
  }
  if (authenticatedUser.isAdmin) {
    window.location.href = "admin.html";
    return;
  }
})();

if (!localStorage.getItem("products")) {
  localStorage.setItem(
    "products",
    JSON.stringify([
      {
        id: 1,
        name: "Pizza",
        price: 12.99,
        addons: ["Extra Cheese", "Pepperoni", "Olives"],
      },
      {
        id: 2,
        name: "Burger",
        price: 8.99,
        addons: ["Lettuce", "Tomato", "Bacon"],
      },
      {
        id: 3,
        name: "Pasta",
        price: 10.99,
        addons: ["Mushrooms", "Garlic", "Parmesan"],
      },
    ])
  );
}

// function loadProducts() {
//   const products = JSON.parse(localStorage.getItem("products")) || [];
//   const productsList = document.getElementById("productsList");
//   productsList.innerHTML = "";
//   products.forEach((product) => {
//     const productDiv = document.createElement("div");
//     productDiv.classList.add("bg-gray-800", "p-4", "rounded-lg", "shadow-md");
//     productDiv.innerHTML = `
//       <h3 class="text-xl font-semibold text-gray-100">${product.name}</h3>
//       <p class="text-gray-400">Price: $${product.price}</p>
//       <div class="mt-2">
//         <label for="quantity" class="text-sm text-gray-200">Quantity</label>
//         <input type="number" id="quantity-${
//           product.id
//         }" class="w-full mt-1 bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-2" value="1" min="1">
//       </div>
//       <div class="mt-2">
//         <label for="addons" class="text-sm text-gray-200">Add-ons</label>
//         <select id="addons-${
//           product.id
//         }" class="w-full mt-1 bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-2">
//           <option value="">Select Add-ons</option>
//           ${
//             product.addons
//               ? product.addons
//                   .map((addon) => `<option value="${addon}">${addon}</option>`)
//                   .join("")
//               : ""
//           }
//         </select>
//       </div>
//       <button id="addToCartBtn-${
//         product.id
//       }" class="mt-4 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md text-white" onclick="addToCart(${
//       product.id
//     })">Add to Cart</button>
//       <div id="confirmation-${
//         product.id
//       }" class="hidden mt-2 text-green-400">Added to Cart!</div>
//     `;
//     productsList.appendChild(productDiv);
//   });
// }

function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productsList = document.getElementById("productsList");
  productsList.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("bg-gray-800", "p-4", "rounded-lg", "shadow-md");

    let addonsHTML = "";
    if (product.addons && product.addons.length > 0) {
      addonsHTML = `
        <div class="mt-2">
          <label for="addons" class="text-sm text-gray-200">Add-ons</label>
          <select id="addons-${product.id}" class="w-full mt-1 bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-2">
            <option value="">Select Add-ons</option>
            ${product.addons
              .map((addon) => `<option value="${addon}">${addon}</option>`)
              .join("")}
          </select>
        </div>`;
    }

    productDiv.innerHTML = `
      <h3 class="text-xl font-semibold text-gray-100">${product.name}</h3>
      <p class="text-gray-400">Price: $${product.price}</p>
      <div class="mt-2">
        <label for="quantity" class="text-sm text-gray-200">Quantity</label>
        <input type="number" id="quantity-${
          product.id
        }" class="w-full mt-1 bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-2" value="1" min="1">
      </div>
      ${addonsHTML}
      <button id="addToCartBtn-${
        product.id
      }" class="mt-4 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md text-white" onclick="addToCart(${
      product.id
    })">Add to Cart</button>
      <div id="confirmation-${
        product.id
      }" class="hidden mt-2 text-green-400">Added to Cart!</div>
    `;
    productsList.appendChild(productDiv);
  });
}


function showToast(message) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add(
    "bg-green-600",
    "text-white",
    "p-4",
    "rounded-md",
    "shadow-md",
    "w-80",
    "text-center"
  );
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

function addToCart(productId) {
  const quantity = document.getElementById(`quantity-${productId}`).value;
  const addon = document.getElementById(`addons-${productId}`).value;
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const selectedProduct = products.find((p) => p.id === productId);
  if (!selectedProduct) return;

  const cartItem = {
    productId: selectedProduct.id,
    name: selectedProduct.name,
    quantity: parseInt(quantity),
    price: selectedProduct.price,
    addon: addon,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("Product added to cart!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.length;
  const cartCountElement = document.getElementById("cartCount");
  cartCountElement.textContent = cartCount;
  document.getElementById("placeOrderBtn").disabled = cartCount === 0;
}

document.getElementById("placeOrderBtn").addEventListener("click", function () {
  console.log("Getting in place order button")
  const users = JSON.parse(localStorage.getItem("users"));
  const authenticatedUser = users.find((u) => u.isAuthenticated);
  if (!authenticatedUser) return;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    showToast("Add products before placing an order.");
    return;
  }
  if (!authenticatedUser.orders) {
    authenticatedUser.orders = [];
  }
  authenticatedUser.orders.push({
    orderId: Date.now(),
    items: cart,
    status: "Pending",
    placedAt: new Date().toISOString(),
  });
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("cart");
  showToast("Order placed successfully! Redirecting...");
  setTimeout(() => {
    window.location.href = "view-orders.html";
  }, 1000);
});

document.getElementById("logoutBtn").addEventListener("click", function () {
  if (window.confirm("Do you wanna logout?")) {
    const users = JSON.parse(localStorage.getItem("users"));
    users.forEach((user) => (user.isAuthenticated = false));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.removeItem("cart");
    showToast("Logged out successfully!");
    window.location.href = "index.html";
  }
});

loadProducts();

document.querySelector("a[href='cart.html']").addEventListener("click", function (e) {
  e.preventDefault();
  const cartModal = document.getElementById("cartModal");
  const cartItemsContainer = document.getElementById("cartItems");
  const emptyCartMessage = document.getElementById("emptyCartMessage");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyCartMessage.classList.remove("hidden");
  } else {
    emptyCartMessage.classList.add("hidden");
    cart.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("p-4", "bg-gray-700", "rounded-md");
      cartItemDiv.innerHTML = `
        <p class="font-semibold">${item.name} (${item.quantity})</p>
        <p class="text-sm text-gray-400">Add-on: ${item.addon || "None"}</p>
        <p class="text-sm text-gray-400">Price: $${(item.price * item.quantity).toFixed(2)}</p>
      `;
      cartItemsContainer.appendChild(cartItemDiv);
    });
  }
  cartModal.classList.remove("hidden");
});

document.getElementById("closeCartModal").addEventListener("click", function () {
  document.getElementById("cartModal").classList.add("hidden");
});

document.getElementById("closeModalBtn").addEventListener("click", function () {
  document.getElementById("cartModal").classList.add("hidden");
});
