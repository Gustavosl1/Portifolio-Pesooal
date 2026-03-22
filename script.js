/**
 * Portfólio - Script principal
 * Renderização dinâmica e interatividade
 */

// ========== Page Loader ==========
const pageLoader = document.getElementById('page-loader');
const loaderProgress = document.getElementById('loader-progress');

function hideLoader() {
  if (!pageLoader) return;
  if (loaderProgress) loaderProgress.classList.add('loader-finish');
  pageLoader.classList.add('loaded');
  pageLoader.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => pageLoader.remove(), 650);
}

const loadStart = Date.now();
window.addEventListener('load', () => {
  const elapsed = Date.now() - loadStart;
  const minTime = 1200;
  setTimeout(hideLoader, Math.max(0, minTime - elapsed));
});

setTimeout(hideLoader, 5000);

const { profile, contact } = PORTFOLIO_DATA;
const LANG_DATA = typeof PORTFOLIO_I18N !== 'undefined' ? PORTFOLIO_I18N : {};
let scrollObserver = null;

// ========== Idiomas (PT-BR / EN) ==========
const I18N = {
  'pt-BR': {
    'skip': 'Pular para o conteúdo',
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.skills': 'Conhecimentos',
    'nav.experience': 'Experiência',
    'nav.testimonials': 'Depoimentos',
    'nav.contact': 'Contato',
    'banner.available': 'Disponível para projetos',
    'banner.greeting': 'Olá 👋, meu nome é',
    'banner.tagline': 'Sou Desenvolvedor web, codifico ideias, transformo em experiências. ✨',
    'banner.whatsapp': 'Chama no WhatsApp',
    'section.about': 'Sobre mim<span class="ponto">.</span>',
    'section.projects': 'Projetos<span class="ponto">.</span>',
    'section.skills': 'Conhecimentos<span class="ponto">.</span>',
    'section.experience': 'Experiência & Formação<span class="ponto">.</span>',
    'section.testimonials': 'O que dizem sobre mim<span class="ponto">.</span>',
    'section.contact': 'Contato<span class="ponto">.</span>',
    'about.cta': 'Vamos conversar',
    'contact.intro': 'Entre em contato para projetos, oportunidades ou um café virtual ☕',
    'contact.email': 'E-mail',
    'contact.divider': 'ou encontre-me em',
    'project.cta': 'Visualizar Projeto',
    'skills.placeholder': 'Aguarde...',
    'footer.tagline': 'Desenvolvedor Web • Transformando ideias em código',
    'footer.rights': '&copy; <span id="current-year"></span> Gustavo Lima. Todos os direitos reservados.',
    'footer.made': 'Feito com <span class="heart">❤️</span> por Gustavo Lima',
    'footer.version': 'Versão 2.0',
  },
  'en': {
    'skip': 'Skip to content',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'banner.available': 'Available for projects',
    'banner.greeting': 'Hi 👋, my name is',
    'banner.tagline': 'I am a web developer, coding ideas into experiences. ✨',
    'banner.whatsapp': 'Chat on WhatsApp',
    'section.about': 'About me<span class="ponto">.</span>',
    'section.projects': 'Projects<span class="ponto">.</span>',
    'section.skills': 'Skills<span class="ponto">.</span>',
    'section.experience': 'Experience & Education<span class="ponto">.</span>',
    'section.testimonials': 'What people say about me<span class="ponto">.</span>',
    'section.contact': 'Contact<span class="ponto">.</span>',
    'about.cta': 'Let\'s talk',
    'contact.intro': 'Get in touch for projects, opportunities, or a virtual coffee ☕',
    'contact.email': 'Email',
    'contact.divider': 'or find me on',
    'project.cta': 'View Project',
    'skills.placeholder': 'Coming soon...',
    'footer.tagline': 'Web Developer • Turning ideas into code',
    'footer.rights': '&copy; <span id="current-year"></span> Gustavo Lima. All rights reserved.',
    'footer.made': 'Made with <span class="heart">❤️</span> by Gustavo Lima',
    'footer.version': 'Version 2.0',
  }
};

function updateCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function applyLanguage(lang) {
  const dict = I18N[lang] || I18N['pt-BR'];
  const htmlLang = lang === 'en' ? 'en' : 'pt-br';
  document.documentElement.setAttribute('lang', htmlLang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) el.innerHTML = dict[key];
  });

  updateCurrentYear();

  renderDynamicContent(lang);

  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'en' ? 'EN' : 'PT-BR';
  }
  try {
    localStorage.setItem('portfolio_lang', lang);
  } catch (e) {}
}

const colorMap = {
  cyan: '#22b8cf',
  pink: '#ff00bf',
  orange: '#ffae00',
  purple: '#6f00ff',
};

const aboutBio = document.getElementById('about-bio');
const projectsContainer = document.getElementById('projects-container');
const skillsContainer = document.getElementById('skills-container');
const infoBox = document.getElementById('infoBox');
const timelineContainer = document.getElementById('timeline-container');
const testimonialsContainer = document.getElementById('testimonials-container');
const testimonialsSection = document.querySelector('.testimonials');

function getLocalizedData(lang) {
  if (lang === 'en' && LANG_DATA.en) {
    return {
      ...PORTFOLIO_DATA,
      ...LANG_DATA.en,
      profile: { ...PORTFOLIO_DATA.profile, ...(LANG_DATA.en.profile || {}) },
      contact: { ...PORTFOLIO_DATA.contact, ...(LANG_DATA.en.contact || {}) },
    };
  }
  return PORTFOLIO_DATA;
}

function renderAbout(data) {
  if (!aboutBio) return;
  aboutBio.innerHTML = '';
  const bioParagraphs = data.about?.bio?.length ? data.about.bio : [
    "Hello, I am Gustavo Lima, a web developer passionate about technology.",
    "I am always looking for new challenges and learning opportunities.",
  ];
  bioParagraphs.forEach((paragraph) => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    aboutBio.appendChild(p);
  });
  const locationEl = document.getElementById('about-location');
  const roleEl = document.getElementById('about-role');
  if (locationEl) locationEl.textContent = `\uD83D\uDCCD ${data.profile.location}`;
  if (roleEl) roleEl.textContent = `\uD83D\uDCBB ${data.profile.role}`;
}

function renderProjects(data, lang) {
  if (!projectsContainer) return;
  projectsContainer.innerHTML = '';
  const ctaLabel = (I18N[lang] || I18N['pt-BR'])['project.cta'];
  (data.projects || []).forEach((project, index) => {
    const color = colorMap[project.color] || colorMap.cyan;
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.setProperty('--card-color', color);
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
      <div class="project-card-content">
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <p class="project-tech">${project.tech}</p>
        <a href="${project.link}" target="_blank" rel="noopener">${ctaLabel}</a>
      </div>
    `;
    projectsContainer.appendChild(card);
  });
}

function renderSkills(data, lang) {
  if (!skillsContainer) return;
  skillsContainer.innerHTML = '';
  const placeholderText = (I18N[lang] || I18N['pt-BR'])['skills.placeholder'];
  (data.skills || []).forEach((skill, index) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.style.setProperty('--skill-color', skill.color);
    card.style.animationDelay = `${index * 0.05}s`;
    card.setAttribute('data-info', skill.info);
    card.innerHTML = skill.placeholder
      ? `<h2>${placeholderText}</h2>`
      : `<img src="${skill.icon}" alt="${skill.name}" loading="lazy">`;
    skillsContainer.appendChild(card);
  });

  if (infoBox) {
    skillsContainer.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        infoBox.textContent = card.getAttribute('data-info');
        infoBox.classList.add('visible');
      });
      card.addEventListener('mouseleave', () => infoBox.classList.remove('visible'));
    });
  }
}

function renderExperience(data) {
  if (!timelineContainer) return;
  timelineContainer.innerHTML = '';
  (data.experience || []).forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `timeline-item timeline-${item.type}`;
    card.style.animationDelay = `${index * 0.15}s`;
    card.innerHTML = `
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <span class="timeline-period">${item.period}</span>
        <h3>${item.title}</h3>
        <p class="timeline-company">${item.company}</p>
        <p class="timeline-description">${item.description}</p>
      </div>
    `;
    timelineContainer.appendChild(card);
  });
}

function renderTestimonials(data) {
  if (!testimonialsContainer || !testimonialsSection) return;
  testimonialsContainer.innerHTML = '';
  if (data.testimonials?.length > 0) {
    testimonialsSection.style.display = '';
    data.testimonials.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.style.animationDelay = `${index * 0.1}s`;
      card.innerHTML = `
        <span class="testimonial-quote">"</span>
        <p class="testimonial-text">${item.text}</p>
        <span class="testimonial-author">- ${item.author}</span>
      `;
      testimonialsContainer.appendChild(card);
    });
  } else {
    testimonialsSection.style.display = 'none';
  }
}


function renderDynamicContent(lang) {
  const data = getLocalizedData(lang);
  renderAbout(data);
  renderProjects(data, lang);
  renderSkills(data, lang);
  renderExperience(data);
  renderTestimonials(data);
  observeAnimatedElements();
}

const savedLang = (() => {
  try {
    return localStorage.getItem('portfolio_lang');
  } catch (e) {
    return null;
  }
})();
const browserLang = (navigator.language || '').toLowerCase().startsWith('en') ? 'en' : 'pt-BR';
const initialLang = savedLang || browserLang;
applyLanguage(initialLang);

document.getElementById('lang-toggle')?.addEventListener('click', () => {
  const current = (() => {
    try {
      return localStorage.getItem('portfolio_lang');
    } catch (e) {
      return null;
    }
  })();
  const next = current === 'en' ? 'pt-BR' : 'en';
  applyLanguage(next);
});

// ========== Menu Mobile ==========
const btnMobile = document.getElementById('btn-mobile');
const nav = document.getElementById('nav');

function toggleMenu(event) {
  if (event.type === 'touchstart') event.preventDefault();
  nav.classList.toggle('active');
  const isActive = nav.classList.contains('active');
  btnMobile.setAttribute('aria-expanded', isActive);
  btnMobile.setAttribute('aria-label', isActive ? 'Fechar Menu' : 'Abrir Menu');
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);

// Fechar menu ao clicar em link
document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('active'));
});

// ========== Renderizar Redes Sociais ==========
const socialContainer = document.getElementById('social-container');
const socialLinks = [
  { href: contact.linkedin, icon: './assets/img/linkedin.png', alt: 'LinkedIn', label: 'LinkedIn' },
  { href: contact.instagram, icon: './assets/img/instagram.png', alt: 'Instagram', label: 'Instagram' },
  { href: contact.github, icon: './assets/img/git.png', alt: 'GitHub', label: 'GitHub' },
];

socialLinks.forEach(({ href, icon, alt, label }) => {
  const link = document.createElement('a');
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener';
  link.ariaLabel = label;
  link.innerHTML = `<img src="${icon}" alt="${alt}">`;
  link.className = 'social-link';
  socialContainer.appendChild(link);
});

// ========== Profile - WhatsApp, Currículo, Email ==========
// CTA do banner: muda texto e estilo no hover (vai para a seção Contato)
const whatsappBtn = document.getElementById('whatsapp-btn');
if (whatsappBtn) {
  const textEl = whatsappBtn.querySelector('.banner-btn-text');
  let defaultText = textEl ? textEl.textContent : '';

  whatsappBtn.addEventListener('mouseenter', () => {
    if (textEl) {
      defaultText = textEl.textContent;
      textEl.textContent = 'Contratar';
    }
    whatsappBtn.classList.add('is-hovered');
  });

  whatsappBtn.addEventListener('mouseleave', () => {
    if (textEl) textEl.textContent = defaultText;
    whatsappBtn.classList.remove('is-hovered');
  });
}

const resumeBtn = document.getElementById('resume-btn');
if (resumeBtn) {
  resumeBtn.href = profile.resumeUrl;
  if (profile.resumeUrl.startsWith('./') || profile.resumeUrl.startsWith('/')) {
    resumeBtn.download = 'Gustavo-Lima-Curriculo.pdf';
  } else {
    resumeBtn.target = '_blank';
    resumeBtn.rel = 'noopener';
  }
}

const emailLink = document.getElementById('email-link');
emailLink.href = `mailto:${profile.email}`;
emailLink.querySelector('.contact-text').textContent = profile.email;


// ========== Badge de disponibilidade ==========
const availabilityBadge = document.getElementById('availability-badge');
if (!profile.available) availabilityBadge.style.display = 'none';

// ========== Ano dinâmico no footer ==========
updateCurrentYear();

// Atualizar JSON-LD com dados do perfil
const schemaScript = document.getElementById('person-schema');
if (schemaScript) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.name,
    "jobTitle": profile.role,
    "email": profile.email,
    "address": { "@type": "PostalAddress", "addressLocality": profile.location?.split(',')[0] || "São Paulo", "addressCountry": "BR" }
  };
  schemaScript.textContent = JSON.stringify(schema);
}

// ========== Barra de progresso do scroll ==========
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
  scrollProgress.setAttribute('aria-valuenow', Math.round(progress));
});

// ========== Botão Voltar ao Topo ==========
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== Animações ao scroll (Intersection Observer) ==========
function observeAnimatedElements() {
  if (!scrollObserver) return;
  document.querySelectorAll('.section, .project-card, .skill-card, .timeline-item, .testimonial-card').forEach(el => {
    if (!el.classList.contains('animate-on-scroll')) {
      el.classList.add('animate-on-scroll');
    }
    scrollObserver.observe(el);
  });
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

observeAnimatedElements();

// ========== Popup de Boas-vindas ==========
const welcomePopup = document.getElementById('welcome-popup');
const popupClose = document.getElementById('popup-close');
const popupOk = document.getElementById('popup-ok');
const popupOverlay = document.getElementById('popup-overlay');

function showWelcomePopup() {
  const hasSeen = sessionStorage.getItem('welcomeSeen');
  if (!hasSeen) {
    setTimeout(() => {
      welcomePopup.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }, 800);
  }
}

function hideWelcomePopup() {
  welcomePopup.classList.remove('visible');
  document.body.style.overflow = '';
  sessionStorage.setItem('welcomeSeen', 'true');
}

[popupClose, popupOk, popupOverlay].forEach(el => {
  el?.addEventListener('click', hideWelcomePopup);
});

welcomePopup?.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideWelcomePopup();
});

showWelcomePopup();

// ========== Curtidas dos Visitantes ==========
const LIKES_KEY = 'portfolio_likes';
const VISITS_KEY = 'portfolio_visits';
const HAS_LIKED_KEY = 'portfolio_has_liked';

function getStorage() {
  try {
    return {
      likes: parseInt(localStorage.getItem(LIKES_KEY) || '0', 10),
      visits: parseInt(localStorage.getItem(VISITS_KEY) || '0', 10),
      hasLiked: localStorage.getItem(HAS_LIKED_KEY) === 'true',
    };
  } catch {
    return { likes: 0, visits: 0, hasLiked: false };
  }
}

function setStorage(data) {
  try {
    localStorage.setItem(LIKES_KEY, String(data.likes));
    localStorage.setItem(VISITS_KEY, String(data.visits));
    if (data.hasLiked !== undefined) localStorage.setItem(HAS_LIKED_KEY, String(data.hasLiked));
  } catch (e) {}
}

let storage = getStorage();
storage.visits += 1;
setStorage(storage);

document.getElementById('like-count').textContent = storage.likes;
document.getElementById('visitor-count').textContent = `${storage.visits} ${storage.visits === 1 ? 'visita' : 'visitas'}`;

const likeBtn = document.getElementById('like-btn');
likeBtn?.addEventListener('click', () => {
  storage = getStorage();
  if (storage.hasLiked) return;

  storage.likes += 1;
  storage.hasLiked = true;
  setStorage(storage);

  const countEl = document.getElementById('like-count');
  countEl.textContent = storage.likes;
  likeBtn.classList.add('liked', 'animate-like');

  setTimeout(() => likeBtn.classList.remove('animate-like'), 600);
});




