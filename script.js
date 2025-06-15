const lengthSlider = document.querySelector(".pass-length input"),
  options = document.querySelectorAll(".option input"),
  copyIcon = document.querySelector('.input-icon:not(.toggle-password-visibility)'),
  passwordInput = document.querySelector(".input-box input"),
  passIndicator = document.querySelector(".pass-indicator"),
  generateBtn = document.querySelector(".generate-btn");
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~"
};
const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;
  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excludeDuplicate = true;
      }
    }
  });
  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
};
const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 20
        ? "medium"
        : "strong";
};
const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};
updateSlider();

// Kopírování
if (copyIcon) {
  copyIcon.addEventListener("click", function () {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "var(--primary-color)";
    setTimeout(() => {
      copyIcon.innerText = "copy_all";
      copyIcon.style.color = "var(--quaternary-color)";
    }, 1500);
  });
}

lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);

// Remove focus outline from links in footer (or any other element)
document.querySelectorAll('.minecraft-footer a').forEach(link => {
  link.addEventListener('click', function () {
    this.blur();
  });
});

// Toggle password visibility
const toggleBtn = document.querySelector('.toggle-password-visibility');
if (toggleBtn && passwordInput) {
  toggleBtn.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleBtn.textContent = 'visibility_off';
    } else {
      passwordInput.type = 'password';
      toggleBtn.textContent = 'visibility';
    }
  });
  // Když se změní hodnota inputu, skryj heslo
  passwordInput.addEventListener('input', function () {
    passwordInput.type = 'password';
    toggleBtn.textContent = 'visibility';
  });
}

// Theme switching functionality
document.addEventListener('DOMContentLoaded', function () {
  const themeSwitcherBtn = document.getElementById('theme-switcher-btn');
  const stylesheet = document.getElementById('main-style');
  const navbarLogo = document.getElementById('navbar-logo');
  const switcherIcon = document.querySelector('.theme-switcher-icon');

  const themes = [
    {
      href: './styles.css',
      logo: 'logo-minecraft.webp',
      icon: 'switcher.webp'
    },
    {
      href: './styles1.css',
      logo: 'logo-cyberpunk.webp',
      icon: 'switcher-cyberpunk.webp'
    },
    {
      href: './styles2.css',
      logo: 'logo-starwars.webp',
      icon: 'switcher-starwars.webp'
    }
  ];

  // 📦 Načti uložený index nebo 0 jako výchozí
  let themeState = parseInt(localStorage.getItem('themeState')) || 0;

  applyTheme(themeState); // ✅ použít uložený styl hned při načtení

  if (themeSwitcherBtn) {
    themeSwitcherBtn.addEventListener('click', () => {
      themeState = (themeState + 1) % themes.length;
      localStorage.setItem('themeState', themeState); // 💾 uložit nový index
      applyTheme(themeState);
    });
  }

  function applyTheme(index) {
    const theme = themes[index];
    if (stylesheet) stylesheet.setAttribute('href', theme.href);
    if (navbarLogo) navbarLogo.setAttribute('src', theme.logo);
    if (switcherIcon) switcherIcon.setAttribute('src', theme.icon);
  }
});

// Modal zásad ochrany osobních údajů
document.addEventListener('DOMContentLoaded', function () {
  const openPrivacy = document.getElementById('open-privacy-modal');
  const modal = document.getElementById('privacy-modal');
  const closeModal = document.querySelector('.close-privacy-modal');

  // Otevření modalu ze všech odkazů s class="open-privacy-modal"
  document.querySelectorAll('.open-privacy-modal').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      modal.style.display = 'flex';
    });
  });

  // Zavření modalu
  closeModal.addEventListener('click', () => modal.style.display = 'none');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });
});