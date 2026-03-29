/**
 * Dados do Portfólio - Edite aqui para atualizar o site automaticamente
 * Ao adicionar ou remover itens, o site será atualizado sem alterar HTML
 */

const PORTFOLIO_DATA = {
  // Informações pessoais
  profile: {
    name: "Gustavo Lima",
    role: "Desenvolvedor Web",
    email: "gusouzalima5@gmail.com",
    location: "São Paulo, Brasil",
    resumeUrl: "./assets/curriculo.pdf", // Link para seu PDF ou Google Drive
    available: true, // Mostra badge "Disponível para projetos"
  },

  // Sobre mim - textos editáveis
  about: {
    bio: [
      "Olá, meu nome é Gustavo Lima, sou desenvolvedor web apaixonado por tecnologia e programação.",
      "Sou formado em Análise e Desenvolvimento de Sistemas.",
      "Acredito que a tecnologia é uma ferramenta poderosa para transformar ideias em experiências digitais que fazem a diferença.",
    ],
  },

  // Contato e redes
  contact: {
    whatsapp: "5511932100931", // Número com DDI (ex: 5511987654321)
    linkedin: "https://www.linkedin.com/in/gustavo-lima-1b1b3b1b3/",
    instagram: "https://instagram.com/seu_usuario",
    github: "https://github.com/gustavosl1",
  },

  // Experiência profissional e formação
  experience: [
    {
      title: "Desenvolvedor Web Freelancer",
      company: "Autônomo",
      period: "2023 - Atual",
      description: "Desenvolvimento de sites institucionais e aplicações web para clientes.",
      type: "work", // work | education
    },
    {
      title: "Análise e Desenvolvimento de Sistemas",
      company: "Cruzeiro do Sul",
      period: "2025",
      description: "Graduação em tecnologia com foco em desenvolvimento de software.",
      type: "education",
    },
  ],

  // Depoimentos de clientes/colegas (opcional - adicione para credibilidade)
  testimonials: [
    {
      text: "Trabalho excelente! O site superou nossas expectativas e trouxe mais clientes.",
      author: "-Cliente - Deart Pinturas",
    },
    {
      text: "Profissional dedicado, entregou o projeto no prazo com qualidade.",
      author: "-Cliente - System Tecnology",
    },
  ],
// Projetos - adicione quantos quiser
  projects: [
    {
      title: "Deart Pinturas",
      description: "Site desenvolvido para modernizar o atendimento de um pintor, facilitando a solicitação de orçamentos pelos clientes.",
      tech: "HTML, CSS, JavaScript",
      link: "https://deartpinturas.com.br/",
      color: "cyan", // cyan | pink | orange | purple
    },
    {
      title: "System Tecnology",
      description: "Site desenvolvido para modernizar o atendimento de um eletricista, facilitando a solicitação de orçamentos pelos clientes.",
      tech: "HTML, CSS, JavaScript",
      link: "https://systemtecnology.com.br/",
      color: "pink",
    },
    {
      title: "Gerador de Senhas",
      description: "Aplicação web para gerar senhas seguras de forma rápida e personalizada, garantindo mais proteção para os usuários.",
      tech: "HTML, CSS, JavaScript",
      link: "https://gustavosl1.github.io/gerador-de-senhas/",
      color: "orange",
    },
    {
      title: "Ecológica",
      description: "Site responsivo com foco em educação ambiental, orientando sobre o descarte correto de resíduos, principalmente medicamentos vencidos.",
      tech: "HTML, CSS, JavaScript",
      link: "https://gustavosl1.github.io/EcoL-gica/",
      color: "purple",
    },
  ],

  // Conhecimentos/Habilidades
  skills: [
    {
      name: "HTML",
      icon: "./assets/img/html-5.png",
      info: "HTML é a linguagem de marcação padrão para criar páginas da web.",
      color: "#FC490B",
    },
    {
      name: "CSS",
      icon: "./assets/img/css.png",
      info: "CSS é uma linguagem de estilo usada para descrever a apresentação de documentos escritos em HTML ou XML.",
      color: "#1F00FF",
    },
    {
      name: "JavaScript",
      icon: "./assets/img/js.png",
      info: "JavaScript é uma linguagem de programação que permite a implementação de elementos complexos em páginas web.",
      color: "#FFEB00",
    },
    {
      name: "Python",
      icon: "./assets/img/python.png",
      info: "Python é uma linguagem de programação de alto nível, interpretada e de fácil leitura.",
      color: "#FFC916",
    },
    {
      name: "SQL",
      icon: "./assets/img/sql.png",
      info: "SQL é uma linguagem usada para gerenciar e manipular bancos de dados relacionais.",
      color: "#ae01ff",
    },
    {
      name: "Em breve",
      icon: null,
      info: "Aguarde, linguagem em aprendizado...",
      color: "#303030",
      placeholder: true,
    },
  ],
};

// TraduÃ§Ãµes para EN (mantÃ©m os dados PT-BR intactos)
const PORTFOLIO_I18N = {
  en: {
    profile: {
      role: "Web Developer",
      location: "Sao Paulo, Brazil",
    },
    about: {
      bio: [
        "Hi, my name is Gustavo Lima, and I am a web developer passionate about technology and programming.",
        "I am currently studying Systems Analysis and Development and always looking for new challenges and learning.",
        "I believe technology is a powerful tool to turn ideas into digital experiences that make a difference.",
      ],
    },
    experience: [
      {
        title: "Freelance Web Developer",
        company: "Self-employed",
        period: "2023 - Present",
        description: "Building institutional websites and web applications for clients.",
        type: "work",
      },
      {
        title: "Systems Analysis and Development",
        company: "College/University",
        period: "In progress",
        description: "Technology degree focused on software development.",
        type: "education",
      },
    ],
    testimonials: [
      {
        text: "Excellent work! The website exceeded our expectations and brought more clients.",
        author: "Client - Deart Pinturas",
      },
      {
        text: "Dedicated professional, delivered the project on time with quality.",
        author: "Client - System Technology",
      },
    ],
projects: [
      {
        title: "Deart Pinturas",
        description: "Website built to modernize a painter's service and make it easier for clients to request quotes.",
        tech: "HTML, CSS, JavaScript",
        link: "https://deartpinturas.com/",
        color: "cyan",
      },
      {
        title: "System Technology",
        description: "Website built to modernize an electrician's service and make it easier for clients to request quotes.",
        tech: "HTML, CSS, JavaScript",
        link: "https://systemtecnology.com.br/",
        color: "pink",
      },
      {
        title: "Password Generator",
        description: "Web app to generate secure passwords quickly and with customization options.",
        tech: "HTML, CSS, JavaScript",
        link: "https://gustavosl1.github.io/gerador-de-senhas/",
        color: "orange",
      },
      {
        title: "Ecologica",
        description: "Responsive site focused on environmental education and proper disposal of waste, especially expired medicines.",
        tech: "HTML, CSS, JavaScript",
        link: "https://gustavosl1.github.io/EcoL-gica/",
        color: "purple",
      },
    ],
    skills: [
      {
        name: "HTML",
        icon: "./assets/img/html-5.png",
        info: "HTML is the standard markup language for creating web pages.",
        color: "#FC490B",
      },
      {
        name: "CSS",
        icon: "./assets/img/css.png",
        info: "CSS is a style language used to describe the presentation of HTML documents.",
        color: "#1F00FF",
      },
      {
        name: "JavaScript",
        icon: "./assets/img/js.png",
        info: "JavaScript is a programming language that enables complex interactions in web pages.",
        color: "#FFEB00",
      },
      {
        name: "Python",
        icon: "./assets/img/python.png",
        info: "Python is a high-level programming language known for readability and versatility.",
        color: "#FFC916",
      },
      {
        name: "SQL",
        icon: "./assets/img/sql.png",
        info: "SQL is a language used to manage and query relational databases.",
        color: "#ae01ff",
      },
      {
        name: "Coming soon",
        icon: null,
        info: "Soon... currently learning.",
        color: "#303030",
        placeholder: true,
      },
    ],
  },
};
