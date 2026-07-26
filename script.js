// ==============================================
// 1. Эффект скролла для шапки
// ==============================================
const header = document.getElementById("header");
window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("scrolled", window.scrollY > 8);
  },
  { passive: true },
);

// ==============================================
// 2. Анимация появления при скролле (reveal)
// ==============================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ==============================================
// 3. FAQ — аккордеон
// ==============================================
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-q");
  const ans = item.querySelector(".faq-a");
  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((other) => {
      if (other !== item) {
        other.classList.remove("open");
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-a").style.maxHeight = null;
      }
    });
    item.classList.toggle("open", !isOpen);
    btn.setAttribute("aria-expanded", String(!isOpen));
    ans.style.maxHeight = !isOpen ? ans.scrollHeight + "px" : null;
  });
});

// ==============================================
// 4. Генерация карточек команды
// ==============================================
const teamData = [
  {
    name: "Илья К.",
    university: "МИЭМ НИУ ВШЭ",
    major: "Информационная безопасность",
    description:
      "Готовился к поступлению в МФТИ, ведь казалось, что статус важнее всего. Но изучил учебные планы, пообщался со студентами и понял: в Вышке программа намного ближе к его интересам в кибербезопасности. Сделал выбор в пользу содержания, а не бренда. Теперь помогает другим не прогадать с выбором вуза.",
    initials: "И К",
    photo: "images/iliya.jpg",
  },
  {
    name: "Ариана С.",
    university: "МСХА имени К.А. Тимирязева",
    major: "Клеточная и молекулярная биотехнология",
    description:
      "Один из наших первых кейсов. Занималась научными конкурсами, но к поступлению растерялась. Вместе проанализировали её баллы, учебные планы и пообщались с людьми из разных вузов. Так нашли забытую олимпиаду, которая давала право на БВИ. Теперь она помогает другим не упускать свои возможности.",
    initials: "А С",
    photo: "images/ariana.jpg",
  },
  {
    name: "Ярослав Б.",
    university: "Сириус Университет",
    major: "Биотехнологии и биоинженерия",
    description:
      "Ещё в школе выиграл олимпиаду «Сириус» с проектом по исследованию влияния поляризованного света на растения. Это открыло ему дорогу на бюджет без вступительных испытаний. Знает, как подготовить сильный проект и грамотно использовать олимпиадные льготы. Расскажет, как превратить науку в реальное преимущество.",
    initials: "Я Б",
    photo: "images/image.png",
  },
];

const teamGrid = document.getElementById("teamGrid");
if (teamGrid) {
  teamData.forEach((member) => {
    const card = document.createElement("div");
    card.className = "team-card reveal";
    card.innerHTML = `
      <div class="team-photo">
        ${
          member.photo
            ? `<img src="${member.photo}" alt="${member.name}" loading="lazy" />`
            : `<span class="team-initials">${member.initials}</span>`
        }
      </div>
      <div class="team-info">
        <h3>${member.name}</h3>
        <div class="role">${member.university} · ${member.major}</div>
        <p>${member.description}</p>
      </div>
    `;
    teamGrid.appendChild(card);
    revealObserver.observe(card);
  });
}

// ==============================================
// 5. КЕЙСЫ — истории выбора + поиск профессии
// ==============================================
const casesData = [
  {
    name: "Анна",
    initials: "А",
    story:
      "С детства любила рисовать, но думала, что это несерьёзно. Наша команда показала ей, что дизайн — это профессия с огромным рынком. Теперь она учится на графического дизайнера и уже берёт первые заказы. Нашла дело жизни, о котором даже не догадывалась.",
    university: "НИУ ВШЭ",
    faculty: "Дизайн",
    category: "profession",
    tag: "Нашла профессию",
  },
  {
    name: "Максим",
    initials: "М",
    story:
      "До последнего думал, что идёт на «Прикладную математику» — это звучало солидно. А потом мы посидели, разобрали его интересы, и оказалось, что душа лежит к преподаванию и работе с детьми. Поступил в педагогический, сейчас счастлив и ни разу не пожалел.",
    university: "МПГУ",
    faculty: "Математика и информатика",
    category: "choice",
    tag: "Поменял направление",
  },
  {
    name: "Полина",
    initials: "П",
    story:
      "Готовилась к поступлению в медицинский, как все вокруг советовали. Но на созвоне сказала: «Я боюсь крови, но не знаю куда ещё». Нашли вместе программу по биоинженерии в Тимирязевке — и это оказалось именно то, что ей нужно.",
    university: "МСХА им. Тимирязева",
    faculty: "Биоинженерия",
    category: "choice",
    tag: "Сменила трек",
  },
  {
    name: "Артём",
    initials: "А",
    story:
      "Хотел в Вышку, потому что «все туда хотят». А после разговора со студентами и изучения программ понял: в Политехе его специальность преподают на порядок лучше. Сделал выбор в пользу качества, а не громкого имени.",
    university: "Политех СПб",
    faculty: "Информатика и вычислительная техника",
    category: "choice",
    tag: "Выбрал содержание",
  },
  {
    name: "Екатерина",
    initials: "Е",
    story:
      "Сомневалась между юриспруденцией и психологией. Мы организовали звонки со студентами обоих направлений — и она поняла, что её место в клинической психологии. Теперь помогает людям и говорит, что это лучшее решение в её жизни.",
    university: "МГУ",
    faculty: "Клиническая психология",
    category: "profession",
    tag: "Нашла профессию",
  },
  {
    name: "Софья",
    initials: "С",
    story:
      "Планировала поступать только в Москве. Мы показали ей программы в Казани и Новосибирске — с теми же предметами, но с жильём и стипендией. Съездила на экскурсию, влюбилась в кампус и не пожалела. Переезд — это не страшно, если знаешь куда.",
    university: "КФУ",
    faculty: "Государственное управление",
    category: "relocation",
    tag: "Переехала в другой город",
  },
];

const caseCategories = [
  { key: "all", label: "Все истории" },
  { key: "profession", label: "Нашёл профессию" },
  { key: "choice", label: "Смена направления" },
  { key: "relocation", label: "Переезд" },
];

const CASES_BATCH = 6; // чтобы все кейсы показывались сразу
let activeCaseCategory = "all";
let visibleCaseCount = CASES_BATCH;

const caseFiltersEl = document.getElementById("caseFilters");
const casesGridEl = document.getElementById("casesGrid");
const casesMoreBtn = document.getElementById("casesMoreBtn");

function buildCaseCard(item) {
  const card = document.createElement("div");
  card.className = "case-card";
  card.dataset.category = item.category;
  card.innerHTML = `
    <div class="case-top">
      <div class="case-who">
        <div class="case-avatar">${item.initials}</div>
        <div class="case-name">
          ${item.name}
          <span class="subj">${item.university}</span>
        </div>
      </div>
      <span class="case-tag">${item.tag}</span>
    </div>
    <div class="case-uni">${item.university} <span>· ${item.faculty}</span></div>
    <p class="case-quote">${item.story}</p>
  `;
  return card;
}

function renderCases() {
  if (!casesGridEl) return;

  const filtered = casesData.filter(
    (item) =>
      activeCaseCategory === "all" || item.category === activeCaseCategory,
  );
  const toShow = filtered.slice(0, visibleCaseCount);

  casesGridEl.innerHTML = "";
  toShow.forEach((item, i) => {
    const card = buildCaseCard(item);
    casesGridEl.appendChild(card);
    setTimeout(() => card.classList.add("is-shown"), 60 * i);
  });

  if (casesMoreBtn) {
    casesMoreBtn.hidden = visibleCaseCount >= filtered.length;
  }
}

if (caseFiltersEl) {
  caseCategories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "case-filter-btn" + (cat.key === "all" ? " is-active" : "");
    btn.textContent = cat.label;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", cat.key === "all" ? "true" : "false");
    btn.addEventListener("click", () => {
      if (activeCaseCategory === cat.key) return;
      activeCaseCategory = cat.key;
      visibleCaseCount = CASES_BATCH;
      caseFiltersEl.querySelectorAll(".case-filter-btn").forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      renderCases();
    });
    caseFiltersEl.appendChild(btn);
  });
}

if (casesMoreBtn) {
  casesMoreBtn.addEventListener("click", () => {
    visibleCaseCount += CASES_BATCH;
    renderCases();
  });
}

renderCases();

// ==============================================
// 6. Честные цифры в шапке — считаются из реальных
//    данных выше, а не вписаны руками
// ==============================================
const statCasesEl = document.getElementById("statCases");
const statTeamEl = document.getElementById("statTeam");
if (statCasesEl) statCasesEl.textContent = casesData.length;
if (statTeamEl) statTeamEl.textContent = teamData.length;
