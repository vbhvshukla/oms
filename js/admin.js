// (function checkAuthentication() {
//   const users = JSON.parse(localStorage.getItem("users"));
//   const authenticatedUser = users && users.find((u) => u.isAuthenticated);
//   if (!authenticatedUser || !authenticatedUser.isAdmin) {
//     alert("You must be an admin to access this page.");
//     window.location.href = "index.html";
//   }
// })();


// function loadProducts() {
//   const products = JSON.parse(localStorage.getItem("products")) || [];
//   const productList = document.getElementById("productList");
//   productList.innerHTML = "";
//   products.forEach((product, index) => {
//     const productDiv = document.createElement("div");
//     productDiv.classList.add("bg-gray-800", "p-4", "rounded-lg", "shadow-md");
//     productDiv.innerHTML = `
//         <h3 class="text-xl font-semibold text-gray-100">${product.name}</h3>
//         <p class="text-gray-400">Price: $${product.price}</p>
//         <button onclick="deleteProduct(${index})" class="mt-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md text-white">Delete</button>
//         <button id="editBtn-${
//         product.id
//       }" class="mt-4 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md text-white" onclick="editItem(${
//       product.id
//     })">Edit Button</button>
//         `;
//     productList.appendChild(productDiv);
//   });
// }

// function showToast(message) {
//   const toastContainer = document.getElementById("toast-container");
//   const toast = document.createElement("div");
//   toast.classList.add("bg-green-600", "text-white", "p-4", "rounded-md", "shadow-md", "w-80", "text-center");
//   toast.textContent = message;
//   toastContainer.appendChild(toast);
//   setTimeout(() => {
//     toast.classList.add("opacity-0");
//     setTimeout(() => toast.remove(), 500);
//   }, 3000);
// }


// document.getElementById("addProductBtn").addEventListener("click", function () {
//   const productName = document.getElementById("productName").value;
//   const productPrice = document.getElementById("productPrice").value;
//   const errorMessage = document.getElementById("errorMessage");

//   if (!productName || !productPrice) {
//     errorMessage.textContent = "Please fill out both fields.";
//     errorMessage.classList.remove("hidden");
//     return;
//   }

//   errorMessage.classList.add("hidden");

//   const newProduct = {
//     id: Date.now(),
//     name: productName,
//     price: parseFloat(productPrice),
//   };
//   const products = JSON.parse(localStorage.getItem("products")) || [];
//   products.push(newProduct);
//   localStorage.setItem("products", JSON.stringify(products));
//   loadProducts();
//   showToast("New product added!");

// });

// function deleteProduct(index) {
//   const products = JSON.parse(localStorage.getItem("products")) || [];
//   products.splice(index, 1);
//   localStorage.setItem("products", JSON.stringify(products));
//   loadProducts();
// }

// loadProducts();

// document.getElementById("logoutBtn").addEventListener("click", function () {
//   if(window.confirm("Do you wanna logout?")){
//     const users = JSON.parse(localStorage.getItem("users"));
//     users.forEach((user) => (user.isAuthenticated = false));
//     localStorage.setItem("users", JSON.stringify(users));
//     showToast("Logged out successfully!");
//     window.location.href = "index.html";
//   }
// });
(function checkAuthentication() {
  const users = JSON.parse(localStorage.getItem("users"));
  const authenticatedUser = users && users.find((u) => u.isAuthenticated);

  if (!authenticatedUser || !authenticatedUser.isAdmin) {
    alert("You must be an admin to access this page.");
    window.location.href = "index.html";
  }
})();

function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("bg-gray-800", "p-4", "rounded-lg", "shadow-md");
    productDiv.innerHTML = `
      <h3 class="text-xl font-semibold text-gray-100">${product.name}</h3>
      <p class="text-gray-400">Price: $${product.price}</p>
      <button onclick="deleteProduct(${index})" class="mt-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md text-white">Delete</button>
      <button onclick="editItem(${product.id})" class="mt-2 bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md text-white">Edit</button>
    `;
    productList.appendChild(productDiv);
  });
}

function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
  showToast("Product deleted successfully!");
}

function addProduct() {
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const errorMessage = document.getElementById("errorMessage");

  if (!productName || !productPrice) {
    errorMessage.textContent = "Please fill out both fields.";
    errorMessage.classList.remove("hidden");
    return;
  }

  errorMessage.classList.add("hidden");

  const newProduct = {
    id: Date.now(),
    name: productName,
    price: parseFloat(productPrice),
  };

  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
  showToast("New product added!");
}

function editItem(productId) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find((p) => p.id === productId);
  if (!product) return;
  document.getElementById("editProductName").value = product.name;
  document.getElementById("editProductPrice").value = product.price;
  document.getElementById("editModal").dataset.productId = productId;
  document.getElementById("editModal").classList.remove("hidden");
}

document.getElementById("saveEditBtn").addEventListener("click", function () {
  const productId = parseInt(document.getElementById("editModal").dataset.productId, 10);
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) return;
  
  const updatedName = document.getElementById("editProductName").value;
  const updatedPrice = parseFloat(document.getElementById("editProductPrice").value);

  if (!updatedName) {
    alert("Please provide valid product details.");
    return;
  }

  products[productIndex].name = updatedName;
  products[productIndex].price = updatedPrice;

  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
  showToast("Product updated successfully!");
  document.getElementById("editModal").classList.add("hidden");
});

document.getElementById("cancelEditBtn").addEventListener("click", function () {
  document.getElementById("editModal").classList.add("hidden");
});

function showToast(message) {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("bg-green-600", "text-white", "p-4", "rounded-md", "shadow-md", "w-80", "text-center");
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

document.getElementById("addProductBtn").addEventListener("click", addProduct);

document.getElementById("logoutBtn").addEventListener("click", function () {
  if (window.confirm("Do you wanna logout?")) {
    const users = JSON.parse(localStorage.getItem("users"));
    users.forEach((user) => (user.isAuthenticated = false));
    localStorage.setItem("users", JSON.stringify(users));
    showToast("Logged out successfully!");
    window.location.href = "index.html";
  }
});

loadProducts();
