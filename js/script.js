document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }

  // Language Toggle (RTL/LTR) with Text Translation
  const langToggle = document.getElementById('lang-toggle');
  
  // دالة ترجمة النصوص
  function translatePage(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
      if (lang === 'ar') {
        el.innerHTML = el.getAttribute('data-ar');
      } else {
        el.innerHTML = el.getAttribute('data-en');
      }
    });
  }

  if (langToggle) {
    // استرجاع اللغة المحفوظة أو تعيين الإنجليزية كلغة افتراضية
    const savedLang = localStorage.getItem('lang') || 'en';
    
    // تطبيق اللغة عند تحميل الصفحة
    if (savedLang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
      langToggle.textContent = 'EN';
      translatePage('ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
      langToggle.textContent = 'ع';
      translatePage('en');
    }

    // عند الضغط على زر التبديل
    langToggle.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      if (currentDir === 'rtl') {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
        langToggle.textContent = 'ع';
        translatePage('en');
        localStorage.setItem('lang', 'en');
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
        langToggle.textContent = 'EN';
        translatePage('ar');
        localStorage.setItem('lang', 'ar');
      }
    });
  }

  // Fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Reading Progress Bar
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    if(progressBar) progressBar.style.width = scrollPercent + '%';
  });

  // Copy Link Button
  const copyBtn = document.getElementById('copy-link');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.textContent = '✓ تم النسخ!';
        setTimeout(() => copyBtn.innerHTML = originalText, 2000);
      });
    });
  }

  // Search functionality (Home page)
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      document.querySelectorAll('.fields-grid .card').forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(query) ? 'block' : 'none';
      });
    });
  }
});