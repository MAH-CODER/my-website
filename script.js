// Loader
window.addEventListener('load', () => {
  document.getElementById('loader').style.display = 'none';
});

// Highlight Active Link Based on Scroll Position
document.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// Typing Effect with Partial Erase and Rewrite
const typedTexts = {
  ar: "معظم المرضى يبحثون عن الأطباء عبر الإنترنت... تأكد من أنهم يجدوك!",
  en: "Most patients are looking for doctors online.\nMake sure they find you"
};
let index = 0;
let isDeleting = false;
let currentLang = 'ar'; // Default language
const typingEffect = document.getElementById('typing-effect');

function typeWriter() {
  const text = typedTexts[currentLang];
  if (!isDeleting && index < text.length) {
    typingEffect.textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, 200);
  } else if (!isDeleting && index === text.length) {
    setTimeout(() => {
      isDeleting = true;
      typeWriter();
    }, 1500);
  } else if (isDeleting && index > 0) {
    typingEffect.textContent = text.substring(0, index - 1);
    index--;
    setTimeout(typeWriter, 150);
  } else {
    isDeleting = false;
    setTimeout(typeWriter, 500);
  }
}

typeWriter();

// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  body.setAttribute('data-theme', newTheme);

  const themeToggle = document.getElementById('themeToggle');
  if (newTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
  }
}

// Language Toggle
function toggleLanguage() {
  const body = document.body;
  const currentLang = body.getAttribute('data-lang');
  const newLang = currentLang === 'ar' ? 'en' : 'ar';
  body.setAttribute('data-lang', newLang);
  document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');

  const languageToggle = document.querySelector('.language-toggle');
  languageToggle.textContent = newLang === 'ar' ? ' English' : ' العربية';

  updateContent(newLang);
}

// Update Content Based on Language
function updateContent(lang) {
  currentLang = lang;
  const content = {
    ar: { /* النصوص باللغة العربية */ },
    en: { /* النصوص باللغة الإنجليزية */ }
  };

  // تحديث العناصر بناءً على اللغة
  document.getElementById('typing-effect').textContent = '';
  index = 0;
  isDeleting = false;
  typeWriter();
  document.getElementById('hero-subheading').textContent = content[lang].heroSubheading;
  document.getElementById('hero-cta').textContent = content[lang].heroCTA;
  document.getElementById('startButton').textContent = content[lang].heroCTA;

  // تحديث باقي العناصر...
}

// Back to Top Button
window.addEventListener('scroll', () => {
  const backToTop = document.getElementById('back-to-top');
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}