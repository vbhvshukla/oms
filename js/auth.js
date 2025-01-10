(function checkIfAuthenticated() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const authenticatedUser = users && users.find(u => u.isAuthenticated);
    if (authenticatedUser) {
      alert("Already logged in!");
      if (authenticatedUser.isAdmin) {
        window.location.href = "admin.html"; 
      } else {
        window.location.href = "products.html";
      }
    }
  })();
  if (!localStorage.getItem("users")) {
    localStorage.setItem(
      "users",
      JSON.stringify([
        { username: "admin", password: CryptoJS.SHA256("admin123").toString(), isAdmin: true }
      ])
    );
  }
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === username);
    if (!user) {
      document.getElementById("usernameError").classList.remove("hidden");
      return;
    } else {
      document.getElementById("usernameError").classList.add("hidden");
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();
    if (user.password !== hashedPassword) {
      document.getElementById("passwordError").classList.remove("hidden");
      return;
    } else {
      document.getElementById("passwordError").classList.add("hidden");
    }
  
    user.isAuthenticated = true;
    localStorage.setItem("users", JSON.stringify(users));
  
    if (user.isAdmin) {
      window.location.href = "admin.html"; 
    } else {
      window.location.href = "products.html";
    }
  });
  