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
  copyIcon.addEventListener("click", () => {
    // Copy password to clipboard
    navigator.clipboard.writeText(passwordInput.value).then(() => {
      // Change icon to check
      const originalSrc = copyIcon.getAttribute('src');
      copyIcon.setAttribute('src', 'check.svg');
      
      // Add success animation
      copyIcon.style.transform = 'translateY(-50%) scale(1.2)';
      setTimeout(() => {
        copyIcon.style.transform = 'translateY(-50%) scale(1)';
      }, 150);

      // Change back to copy icon after 1.5s
      setTimeout(() => {
        copyIcon.setAttribute('src', originalSrc);
      }, 1500);
    });
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
const togglePasswordVisibility = document.querySelector('.toggle-password-visibility');

togglePasswordVisibility.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Toggle icon
    const currentSrc = togglePasswordVisibility.getAttribute('src');
    const newSrc = currentSrc.includes('visibility.svg') ? 'visibility_off.svg' : 'visibility.svg';
    togglePasswordVisibility.setAttribute('src', newSrc);
});

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