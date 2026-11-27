// 初始化页头的 Mega Menu、语言、搜索和移动导航。
function initializeHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const megaTriggers = [...header.querySelectorAll("[data-mega-menu]")];
  const megaMenus = [...header.querySelectorAll(".mega-menu")];
  const language = header.querySelector(".language");
  const languageTrigger = header.querySelector(".language__trigger");
  const searchButton = header.querySelector(".icon-button");
  const searchPanel = header.querySelector(".search-panel");
  const searchInput = searchPanel.querySelector("input");
  const searchControls = [...searchPanel.querySelectorAll("input, button")];
  const mobileButton = header.querySelector(".mobile-menu-button");
  const mobileNav = header.querySelector(".mobile-nav");
  const mobileAccordionTriggers = [
    ...mobileNav.querySelectorAll(".mobile-nav__trigger"),
  ];
  const mobileLanguage = mobileNav.querySelector(".mobile-language");
  const mobileLanguageTrigger = mobileNav.querySelector(".mobile-language__trigger");
  let megaCloseTimer;

  // 重新进入页头或下拉面板时，取消延迟关闭。
  function cancelMegaClose() {
    window.clearTimeout(megaCloseTimer);
  }

  function closeMegaMenus() {
    cancelMegaClose();
    megaTriggers.forEach((trigger) => {
      trigger.classList.remove("is-active");
      trigger.setAttribute("aria-expanded", "false");
      trigger.querySelector("span").classList.remove("is-rotated");
    });
    megaMenus.forEach((menu) => {
      menu.hidden = true;
    });
  }

  function openMegaMenu(trigger) {
    closeSearch();
    closeMegaMenus();
    const menu = header.querySelector(`#mega-menu-${trigger.dataset.megaMenu}`);
    trigger.classList.add("is-active");
    trigger.setAttribute("aria-expanded", "true");
    trigger.querySelector("span").classList.add("is-rotated");
    menu.hidden = false;
  }

  // 给鼠标从导航按钮移动到下拉面板留出很短的过渡时间。
  function scheduleMegaClose() {
    cancelMegaClose();
    megaCloseTimer = window.setTimeout(closeMegaMenus, 220);
  }

  function setLanguageOpen(open) {
    language.classList.toggle("is-open", open);
    languageTrigger.setAttribute("aria-expanded", String(open));
  }

  function closeSearch() {
    searchPanel.classList.remove("is-open");
    searchPanel.setAttribute("aria-hidden", "true");
    searchButton.setAttribute("aria-expanded", "false");
    searchButton.setAttribute("aria-label", "Open search");
    searchControls.forEach((control) => {
      control.tabIndex = -1;
    });
  }

  function setSearchOpen(open) {
    closeMegaMenus();
    if (open) setMobileOpen(false);
    searchPanel.classList.toggle("is-open", open);
    searchPanel.setAttribute("aria-hidden", String(!open));
    searchButton.setAttribute("aria-expanded", String(open));
    searchButton.setAttribute("aria-label", open ? "Close search" : "Open search");
    searchControls.forEach((control) => {
      control.tabIndex = open ? 0 : -1;
    });
    if (open) searchInput.focus();
  }

  function setMobileOpen(open) {
    if (open) closeSearch();
    mobileNav.classList.toggle("is-open", open);
    mobileButton.setAttribute("aria-expanded", String(open));
    mobileButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function setMobileAccordion(trigger, open) {
    trigger.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", String(open));
    trigger.nextElementSibling.classList.toggle("is-open", open);
  }

  function setMobileLanguageOpen(open) {
    mobileLanguage.classList.toggle("is-open", open);
    mobileLanguageTrigger.setAttribute("aria-expanded", String(open));
  }

  megaTriggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", () => {
      cancelMegaClose();
      if (!trigger.classList.contains("is-active")) openMegaMenu(trigger);
    });
    trigger.addEventListener("click", (event) => {
      // 鼠标悬停已打开菜单，单击不重复播放进场动画。
      if (!trigger.classList.contains("is-active")) openMegaMenu(trigger);
      else if (event.detail === 0) closeMegaMenus();
    });
  });

  megaMenus.forEach((menu) => {
    menu.addEventListener("mouseenter", cancelMegaClose);
  });

  header.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("mouseenter", closeMegaMenus);
  });

  header.addEventListener("mouseenter", cancelMegaClose);
  header.addEventListener("mouseleave", scheduleMegaClose);
  language.addEventListener("mouseenter", () => setLanguageOpen(true));
  language.addEventListener("mouseleave", () => setLanguageOpen(false));
  languageTrigger.addEventListener("click", () =>
    setLanguageOpen(!language.classList.contains("is-open")),
  );
  searchButton.addEventListener("click", () =>
    setSearchOpen(!searchPanel.classList.contains("is-open")),
  );
  mobileButton.addEventListener("click", () =>
    setMobileOpen(!mobileNav.classList.contains("is-open")),
  );
  mobileAccordionTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      setMobileAccordion(trigger, !trigger.classList.contains("is-open"));
    });
  });
  mobileLanguageTrigger.addEventListener("click", () => {
    setMobileLanguageOpen(!mobileLanguage.classList.contains("is-open"));
  });
  mobileNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMobileLanguageOpen(false);
      setMobileOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
      closeMegaMenus();
      closeSearch();
      setLanguageOpen(false);
      setMobileLanguageOpen(false);
      setMobileOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeMegaMenus();
    closeSearch();
    setLanguageOpen(false);
    setMobileLanguageOpen(false);
    setMobileOpen(false);
  });

  // 页面加载时保持整块 Mega Menu 隐藏，只有 Hover 对应导航项才显示。
  closeMegaMenus();
}

initializeHeader();

const locations = [
  {
    name: "Japan",
    image: "./img/4173a.png",
    alt: "Tokyo skyline illuminated at night",
    details: [
      ["Sales & Service", "35"],
      ["R&D", "4"],
      ["Manufacturing", "11"],
    ],
  },
  {
    name: "Europe",
    image: "./img/4173a.png",
    alt: "European operations at night",
    details: [
      ["Sales & Service", "12"],
      ["R&D", "2"],
      ["Manufacturing", "5"],
    ],
  },
  {
    name: "Americas",
    image: "./img/4173a.png",
    alt: "Americas operations at night",
    details: [
      ["Sales & Service", "8"],
      ["R&D", "2"],
      ["Manufacturing", "3"],
    ],
  },
];

let activeLocation = 0;
let requestedLocation = 0;
let requestedDirection = 1;
const countrySlide = document.querySelector(".country-carousel__slide");
const countryCard = countrySlide?.querySelector(".country-card");
const mapPins = [...document.querySelectorAll(".world-map__pin")];
let requestedPin = mapPins.find((pin) => pin.classList.contains("is-active"));
const countryMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let slideAnimations = [];

function syncLocationPins() {
  mapPins.forEach((pin) => {
    const selected = pin === requestedPin;
    pin.classList.toggle("is-active", selected);
    pin.setAttribute("aria-pressed", String(selected));
  });
}

function renderLocation() {
  if (!countryCard) return;
  if (requestedLocation === activeLocation) {
    syncLocationPins();
    return;
  }
  if (slideAnimations.length) return;
  const viewport = countrySlide.parentElement;
  const outgoing = !countryMotion.matches && countrySlide.animate ? countrySlide.cloneNode(true) : null;
  activeLocation = requestedLocation;
  syncLocationPins();
  const location = locations[activeLocation];
  const image = countryCard.querySelector("img");
  const title = countryCard.querySelector("h3");
  const details = countryCard.querySelectorAll("dl div");

  image.src = location.image;
  image.alt = location.alt;
  title.textContent = location.name;
  details.forEach((detail, detailIndex) => {
    detail.querySelector("dt").textContent = location.details[detailIndex][0];
    const value = detail.querySelector("dd");
    value.textContent = location.details[detailIndex][1];
    observeCounter?.(value);
  });
  if (!outgoing) return;
  outgoing.setAttribute("aria-hidden", "true");
  viewport.append(outgoing);
  viewport.classList.add("is-sliding");
  const timing = { duration: 580, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)", fill: "both" };
  const slideGap = matchMedia("(max-width: 768px)").matches ? 16 : 24;
  const frames = (from, to) => [from, to].map(direction => ({
    transform: `translateX(calc(${direction * 100}% + ${direction * slideGap}px))`,
  }));
  slideAnimations = [
    countrySlide.animate(frames(requestedDirection, 0), timing),
    outgoing.animate(frames(0, -requestedDirection), timing),
  ];
  Promise.all(slideAnimations.map(animation => animation.finished)).then(() => {
    outgoing.remove();
    slideAnimations.forEach(animation => animation.cancel());
    slideAnimations = [];
    viewport.classList.remove("is-sliding");
    renderLocation(); // 连点只追到最新请求，不排队播放过期的卡片。
  });
}

syncLocationPins();
countryMotion.addEventListener("change", () => {
  if (countryMotion.matches) slideAnimations.forEach(animation => animation.finish());
});
document.querySelectorAll(".country-carousel__controls button").forEach((button) => {
  button.addEventListener("click", () => {
    requestedDirection = Number(button.dataset.direction);
    requestedLocation = (requestedLocation + requestedDirection + locations.length) % locations.length;
    requestedPin = mapPins.find(pin => Number(pin.dataset.location) === requestedLocation);
    renderLocation();
  });
});

mapPins.forEach((pin) => {
  pin.addEventListener("click", () => {
    requestedLocation = Number(pin.dataset.location);
    requestedDirection = requestedLocation < activeLocation ? -1 : 1;
    requestedPin = pin;
    renderLocation();
  });
});

// 移动端业务区域使用原生横向滚动，保留触摸惯性并将最靠近中心的卡片设为激活态。
function initializeBusinessCarousel() {
  const carousel = document.querySelector(".business__grid");
  if (!carousel) return;

  const mobile = matchMedia("(max-width: 768px)");
  const cards = [...carousel.querySelectorAll(".business-card")];
  const semiconductor = carousel.querySelector('[href="#semiconductor"]');
  let frame;

  function updateActiveCard() {
    frame = undefined;
    if (!mobile.matches) {
      cards.forEach((card) => card.classList.remove("is-active"));
      return;
    }

    const center = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
    let nearest = cards[0];
    let nearestDistance = Infinity;
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      if (distance < nearestDistance) {
        nearest = card;
        nearestDistance = distance;
      }
    });
    cards.forEach((card) => card.classList.toggle("is-active", card === nearest));
  }

  function centerInitialCard() {
    if (!mobile.matches || !semiconductor) return;
    carousel.scrollLeft =
      semiconductor.offsetLeft - (carousel.clientWidth - semiconductor.offsetWidth) / 2;
    updateActiveCard();
  }

  carousel.addEventListener(
    "scroll",
    () => {
      if (!frame) frame = requestAnimationFrame(updateActiveCard);
    },
    { passive: true },
  );
  carousel.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    carousel.scrollBy({
      left: event.key === "ArrowRight" ? 208 : -208,
      behavior: "smooth",
    });
  });
  mobile.addEventListener("change", centerInitialCard);
  requestAnimationFrame(centerInitialCard);
}

initializeBusinessCarousel();

function initializeTechnologyCounters() {
  const counters = document.querySelectorAll("[data-technology-counter], .country-card__body dd");
  const pendingFrames = new WeakMap();
  if (!counters.length || !window.IntersectionObserver || !window.requestAnimationFrame || !window.matchMedia) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches) return;

  const defaultDuration = 1500;
  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      if (reducedMotion.matches) continue;

      const finalText = target.textContent;
      const match = finalText.match(/^(\D*)([\d,]+)(\.\d+)?$/);
      if (!match) continue;
      const [, prefix, integer, fraction = ""] = match;
      const finalValue = Number(integer.replace(/,/g, "") + fraction);
      const duration = target.matches(".country-card__body dd")
        ? Math.min(defaultDuration, Math.max(80, finalValue * 80))
        : defaultDuration;
      const startTime = performance.now();
      function updateValue(now) {
        const progress = Math.max(0, (now - startTime) / duration);
        if (progress >= 1 || reducedMotion.matches) {
          target.textContent = finalText;
          return;
        }
        const value = finalValue * progress;
        target.textContent = prefix + (fraction ? value.toFixed(fraction.length - 1) : Math.round(value).toLocaleString("en-US", { useGrouping: integer.includes(",") }));
        pendingFrames.set(target, requestAnimationFrame(updateValue));
      }
      updateValue(startTime);
    }
  }, { threshold: 0.3, rootMargin: "0px 0px -50px 0px" });
  counters.forEach((counter) => observer.observe(counter));
  return (counter) => {
    if (pendingFrames.has(counter)) cancelAnimationFrame(pendingFrames.get(counter));
    observer.unobserve(counter);
    observer.observe(counter);
  };
}

const observeCounter = initializeTechnologyCounters();

// 按参考页的顺序注册入场；未启用脚本或不支持观察器时，内容保持可见。
function initializePageReveals() {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

  const mobile = matchMedia("(max-width: 768px)");
  const pending = new Set();
  let observer;

  function register(selector, delay = 0, step = 0, scope = document, itemsPerRow = Infinity) {
    for (const [index, element] of scope.querySelectorAll(selector).entries()) {
      element.dataset.revealState = "pending";
      element.style.setProperty("--entry-delay", `${delay + step * (index % itemsPerRow)}ms`);
      pending.add(element);
    }
  }

  // 消费一次待播状态；访问目标和减少动态效果可直接结束在播动画。
  function reveal(element, immediate = false) {
    if (!element?.dataset.revealState) return;
    if (!pending.delete(element) && !immediate) return;
    observer?.unobserve(element);
    if (immediate) {
      delete element.dataset.revealState;
    } else {
      element.dataset.revealState = "playing";
    }
  }

  function observePending() {
    observer?.disconnect();
    if (mobile.matches) {
      for (const element of document.querySelectorAll(".business [data-reveal-state]:not(.business-card)")) reveal(element, true);
    }
    if (!pending.size) return;
    observer = new IntersectionObserver((entries, source) => {
      if (source !== observer) return;
      let revealBusinessCards = false;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (entry.target.parentElement === businessGrid) revealBusinessCards = true;
        else reveal(entry.target);
      }
      if (revealBusinessCards) {
        const bounds = businessGrid.getBoundingClientRect();
        // Grid auto-placement follows DOM order; the carousel has its own visual order.
        const cards = [...businessGrid.children].filter((card) => pending.has(card) && card.offsetWidth);
        const visibleCards = mobile.matches ? cards.filter((card) => {
          const rect = card.getBoundingClientRect();
          return rect.right > bounds.left && rect.left < bounds.right;
        }).sort((left, right) => left.offsetLeft - right.offsetLeft) : cards;
        visibleCards.forEach((card, index) => {
          card.style.setProperty("--entry-delay", `${140 + 100 * index}ms`);
          reveal(card);
        });
      }
    }, {
      rootMargin: mobile.matches ? "0px 0px -5% 0px" : "0px 0px -10% 0px",
      threshold: mobile.matches ? 0.1 : 0.16,
    });
    for (const element of pending) observer.observe(element);
    revealAtPageEnd();
  }

  function revealAtPageEnd(event) {
    if (!pending.size || window.scrollY + innerHeight < document.documentElement.scrollHeight - 4) return;
    const restored = event?.type === "pageshow" && event.persisted;
    for (const element of pending) reveal(element, restored || !element.getClientRects().length);
  }

  // 锚点直达与键盘聚焦不等待动画，避免链接可聚焦但仍不可见。
  function revealHashTarget() {
    const hash = location.hash.slice(1);
    if (!hash) return;
    let id = hash;
    try {
      id = decodeURIComponent(hash);
    } catch {
      // 保留原始片段，以便查找包含字面百分号的 ID。
    }
    const target = document.getElementById(id);
    if (!target) return;
    reveal(target.closest("[data-reveal-state]"), true);
    const heading = document.getElementById(target.getAttribute("aria-labelledby")) ?? target.querySelector("h1, h2, h3");
    reveal(heading?.closest("[data-reveal-state]"), true);
  }

  // 聚焦事件也覆盖轮播与图钉所在的入场容器。
  function revealFocused(event) {
    reveal(event.target.closest("[data-reveal-state]"), true);
  }

  // 清理自然结束的动画；保留已消费记录，回滚不会重播。
  function clearFinished(event) {
    if (event.animationName === "home-entry") delete event.target.dataset.revealState;
  }

  // 运行中关闭动态效果时立即放行全部内容，并释放入场监听器。
  function stopReveals() {
    if (!reducedMotion.matches) return;
    for (const element of document.querySelectorAll("[data-reveal-state]")) reveal(element, true);
    observer?.disconnect();
    mobile.removeEventListener("change", observePending);
    reducedMotion.removeEventListener("change", stopReveals);
    document.removeEventListener("focusin", revealFocused);
    document.removeEventListener("animationend", clearFinished);
    window.removeEventListener("hashchange", revealHashTarget);
    window.removeEventListener("scroll", revealAtPageEnd);
    window.removeEventListener("resize", revealAtPageEnd);
    window.removeEventListener("pageshow", revealAtPageEnd);
  }

  register(".section-intro h2, .section-heading h2");
  register(".hero__content > .button", 240);
  register(".section-intro p, .business__panel > .button, .operations .button, .operations__content", 140);
  const businessGrid = document.querySelector(".business .business__grid");
  if (businessGrid) register(":scope > .business-card", 0, 0, businessGrid);
  register(".news-grid > .news-card", 140, 200);
  register("#news .section-heading > .button", 440);
  register(".magazine__list > .magazine-item", 140, 100);
  register(".magazine__image", 140);
  register("[data-magazine-reveal]");
  register("#magazine .section-heading > .button", 540);

  register(".about-hero h1, .technology-hero h1, .about-section h2, .strategy-section > h3");
  register(".about-hero p, .technology-hero p, .profile-hero .about-anchor-nav", 140);
  register(".about-hero:not(.profile-hero) .about-anchor-nav, .technology-hero .about-anchor-nav", 240);
  register(".message-portrait, .who-card > div > p, .strategy-intro p, .portfolio-card > img", 140);
  register(".message-copy > h3", 340);
  register(".message-copy > strong", 440);
  register(".message-copy > div", 540);
  register(".who-card > aside, .strategy-intro figure", 240);
  register(".portfolio-card p", 140, 100);
  register(".growth-grid > article", 140, 100);
  register(".strategy-images > img", 140, 100);
  register(".strategy-section > .text-link", 340);
  register(".glance-grid > *", 140, 100);
  register(".glance-note", 540);
  register(".learn-more a", 140, 100);

  register("h2[data-profile-reveal], h2[data-technology-reveal], .profile-policy h2, .profile-organization h2, .profile-download h2");
  register("tr[data-profile-reveal]", 140, 100);
  register("h3[data-profile-reveal], .profile-policy p, .profile-organization p, .profile-download p, .profile-download > a", 140);
  register(".profile-policy > img, .profile-organization > a", 240);
  for (const group of document.querySelectorAll(".profile-grid, .profile-offices")) {
    register(":scope > article", 140, 100, group);
  }
  register(".technology-intro");
  register(".technology-focus-grid > article", 240, 100);
  register(".technology-metric", 140, 100);
  register(".technology-numbers__note", 540);
  register(".technology-stories-grid > article", 140, 200);
  register(".technology-magazine", 440);
  register(".solutions-card", 140, 100, document, 4);
  register(".solutions-directory__column", 140, 100, document, 4);

  register(".power-hero h1, .power-challenge h2, .power-section__heading");
  register(".power-hero p, .power-challenge p, .power-inquiry__content", 140);
  register(".power-process-card", 140, 100);
  register(".power-equipment-card", 140, 100);
  register(".power-products-action", 240);

  register(".news-page-hero h1, .news-featured__heading, .news-archive__heading");
  register(".news-page-hero p, .news-archive__filters, .news-archive__row", 140);
  register(".news-feature-card", 140, 200, document, 3);

  register(".footer__logo");
  register(".footer__nav > div:nth-child(-n+2)", 140);
  register(".footer__nav > div:nth-child(n+3)", 240);
  register(".footer__legal", 340);

  revealHashTarget();
  reveal(document.activeElement?.closest("[data-reveal-state]"), true);
  observePending();
  mobile.addEventListener("change", observePending);
  reducedMotion.addEventListener("change", stopReveals);
  document.addEventListener("focusin", revealFocused);
  document.addEventListener("animationend", clearFinished);
  window.addEventListener("hashchange", revealHashTarget);
  window.addEventListener("scroll", revealAtPageEnd, { passive: true });
  window.addEventListener("resize", revealAtPageEnd);
  window.addEventListener("pageshow", revealAtPageEnd);
}

// 移动端和桌面端共用视频播放条件，粒子层和地图脉冲也仅在可见时运行。
function initializeDecorativeMotion() {
  if (!("IntersectionObserver" in window)) return;
  const video = document.querySelector(".story-movie__video");
  const movie = video?.closest(".story-movie");
  const worldMap = document.querySelector(".world-map");
  const mobile = matchMedia("(max-width: 768px)");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const particleFields = document.querySelectorAll(".particle-field");
  const visibleFields = new Set();
  let movieVisible = false;
  let mapVisible = false;

  // 标签页离开前台或用户切换偏好时，暂停不必要的合成和解码。
  function syncPlayback() {
    const active = !document.hidden && !reducedMotion.matches;
    if (video) {
      if (active && movieVisible) {
        // 浏览器拒绝自动播放时保留海报。
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
    worldMap?.classList.toggle("is-motion-visible", active && mapVisible);
    for (const field of particleFields) {
      const running = active && visibleFields.has(field);
      if (running && !field.childElementCount) {
        const count = mobile.matches ? 26 : 46;
        for (let index = 0; index < count; index += 1) {
          const particle = document.createElement("i");
          particle.style.setProperty("--particle-x", ((index * 23.17) % 100) + "%");
          particle.style.setProperty("--particle-y", ((index * 31.31) % 100) + "%");
          particle.style.setProperty("--particle-size", (1 + (index % 4) * 0.5) + "px");
          particle.style.setProperty("--particle-duration", (7 + (index % 6)) + "s");
          particle.style.setProperty("--particle-delay", -(index % 19) / 2 + "s");
          particle.style.setProperty("--particle-opacity", 0.18 + (index % 4) * 0.08);
          field.append(particle);
        }
      }
      field.classList.toggle("is-motion-visible", running);
    }
  }

  // 共用观察器跟踪持续动效，不依赖逐帧滚动计算。
  const visibilityObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === movie) movieVisible = entry.isIntersecting;
      if (entry.target === worldMap) mapVisible = entry.isIntersecting;
      if (entry.target.classList.contains("particle-field")) {
        if (entry.isIntersecting) visibleFields.add(entry.target);
        else visibleFields.delete(entry.target);
      }
    }
    syncPlayback();
  });

  if (movie) visibilityObserver.observe(movie);
  if (worldMap) visibilityObserver.observe(worldMap);
  for (const field of particleFields) visibilityObserver.observe(field);
  mobile.addEventListener("change", syncPlayback);
  reducedMotion.addEventListener("change", syncPlayback);
  document.addEventListener("visibilitychange", syncPlayback);
}

initializePageReveals();
initializeDecorativeMotion();
