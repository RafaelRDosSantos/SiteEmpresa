//Copyright
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("ano").textContent = new Date().getFullYear();
  });
  
  // Adiciona um listener a todos os cabeçalhos do accordion para alternar a exibição do conteúdo
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      // Alterna entre mostrar e ocultar
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });

