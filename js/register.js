(function checkIfAuthenticated() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const authenticatedUser = users && users.find((u) => u.isAuthenticated);

  if (authenticatedUser) {
    alert("Already logged in!");
    window.location.href = "products.html";
  }
})();
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isUsernameTaken = users.some((u) => u.username === username);
    if (isUsernameTaken) {
      document.getElementById("usernameError").classList.remove("hidden");
      return;
    } else {
      document.getElementById("usernameError").classList.add("hidden");
    }
    if (!passwordRegex.test(password)) {
      document.getElementById("passwordError").classList.remove("hidden");
      return;
    } else {
      document.getElementById("passwordError").classList.add("hidden");
    }
    const hashedPassword = CryptoJS.SHA256(password).toString();
    users.push({
      username: username,
      password: hashedPassword,
      isAuthenticated: false,
      isAdmin: false,
    });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered Successfully!");
    window.location.href = "index.html";
  });
