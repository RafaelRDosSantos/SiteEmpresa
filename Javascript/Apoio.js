//Copyright
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("ano").textContent = new Date().getFullYear();
  });
  

// Seleciona todos os cabeçalhos do accordion
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      // Encontra o conteúdo associado ao cabeçalho clicado
      const content = header.nextElementSibling;
      // Alterna a exibição
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });
