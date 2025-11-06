// script.js - Mobile Menu Controller
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById('menu-toggle');
  const menu     = document.getElementById('menu');
  const overlay  = document.getElementById('overlay');
  const closeBtn = document.getElementById('close-menu');

  const openMenu = () => {
    menu.classList.add('open');
    overlay.classList.add('active');
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    overlay.classList.remove('active');
    checkbox.checked = false;
  };

  // Open when burger clicked
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) openMenu();
    else closeMenu();
  });

  // Close with X button
  closeBtn.addEventListener('click', closeMenu);

  // Close when clicking overlay
  overlay.addEventListener('click', closeMenu);

  // Optional: Close when clicking a menu link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
});