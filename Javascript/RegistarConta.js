
  const toggleBtn = document.getElementById("togglePassword");
  const passwordField = document.getElementById("password");

  toggleBtn.addEventListener("click", () => {
    const type =
      passwordField.getAttribute("type") === "password"
        ? "text"
        : "password";
    passwordField.setAttribute("type", type);

    // Alterna o ícone
    toggleBtn.innerHTML =
      type === "password"
        ? '<i class="bi bi-eye"></i>'
        : '<i class="bi bi-eye-slash"></i>';
  });

