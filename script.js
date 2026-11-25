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
const countryCard = document.querySelector(".country-card");
const mapPins = [...document.querySelectorAll(".world-map__pin")];
let activePin = mapPins.find((pin) => pin.classList.contains("is-active")) ?? mapPins[0];

// 同步地点卡片和地图上的选中标记。
function renderLocation(index, selectedPin) {
  if (!countryCard) return;
  activeLocation = (index + locations.length) % locations.length;
  activePin =
    selectedPin ??
    mapPins.find((pin) => Number(pin.dataset.location) === activeLocation) ??
    mapPins[0];
  const location = locations[activeLocation];
  const image = countryCard.querySelector("img");
  const title = countryCard.querySelector("h3");
  const details = countryCard.querySelectorAll("dl div");

  image.src = location.image;
  image.alt = location.alt;
  title.textContent = location.name;
  details.forEach((detail, detailIndex) => {
    detail.querySelector("dt").textContent = location.details[detailIndex][0];
    detail.querySelector("dd").textContent = location.details[detailIndex][1];
  });
  mapPins.forEach((pin) => {
    const active = pin === activePin;
    pin.classList.toggle("is-active", active);
  });
}

document.querySelectorAll(".country-carousel__controls button").forEach((button) => {
  button.addEventListener("click", () =>
    renderLocation(activeLocation + Number(button.dataset.direction)),
  );
});

mapPins.forEach((pin) => {
  pin.addEventListener("click", () => renderLocation(Number(pin.dataset.location), pin));
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

// 按参考页的顺序注册入场；未启用脚本或不支持观察器时，内容保持可见。
function initializePageReveals() {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

  const mobile = matchMedia("(max-width: 768px)");
  const splitGrid = matchMedia("(max-width: 1280px)");
  const pending = new Set();
  const businessCards = [...document.querySelectorAll(".business__grid > .business-card")];
  const observedGroups = new Map();
  let observer;

  // 延迟按各组的 DOM 顺序分配；窄屏由 CSS 统一缩短延迟与播放时间。
  function register(selector, delay = 0, step = 0) {
    for (const [index, element] of document.querySelectorAll(selector).entries()) {
      element.dataset.revealState = "pending";
      element.style.setProperty("--entry-delay", String(delay + step * index));
      pending.add(element);
    }
  }

  // 消费一次待播状态；访问目标和减少动态效果可直接结束在播动画。
  function reveal(element, immediate = false) {
    if (!element?.dataset.revealState) return;
    if (!pending.delete(element) && !immediate) return;
    if (immediate) {
      delete element.dataset.revealState;
    } else {
      element.dataset.revealState = "playing";
    }
  }

  // 每次断点变化仅重新观察待播元素。业务区按可见行触发，避免错高布局打乱次序。
  function observePending() {
    observer?.disconnect();
    observedGroups.clear();
    if (mobile.matches) {
      for (const element of document.querySelectorAll(".business [data-reveal-state]")) {
        reveal(element, true);
      }
    }
    if (!pending.size) return;

    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: mobile.matches ? "0px 0px -16px" : "0px 0px -48px",
    });

    for (const element of pending) {
      if (!element.matches(".business-card")) {
        observedGroups.set(element, [element]);
      }
    }

    if (!mobile.matches) {
      const columns = splitGrid.matches ? 3 : 6;
      for (let start = 0; start < businessCards.length; start += columns) {
        const row = businessCards.slice(start, start + columns).filter((card) => pending.has(card));
        if (row.length) observedGroups.set(businessCards[start], row);
      }
    }

    for (const target of observedGroups.keys()) observer.observe(target);
    revealAtPageEnd();
  }

  // 相交后立即解除观察；同一业务行共享起点，间距不会随滚动速度改变。
  function handleIntersections(entries, sourceObserver) {
    if (sourceObserver !== observer) return;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const element of observedGroups.get(entry.target) ?? []) reveal(element);
      observedGroups.delete(entry.target);
      sourceObserver.unobserve(entry.target);
    }
  }

  // 页底空间不足以跨过观察边界时，也要显示已进入实际视口的页脚内容。
  function revealAtPageEnd(event) {
    if (!pending.size || window.scrollY + innerHeight < document.documentElement.scrollHeight - 4) return;
    for (const [target, group] of observedGroups) {
      const bounds = target.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= innerHeight) continue;
      for (const element of group) reveal(element, event?.type === "pageshow" && event.persisted);
      observedGroups.delete(target);
      observer.unobserve(target);
    }
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
    reveal(document.getElementById(target.getAttribute("aria-labelledby")), true);
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
    observedGroups.clear();
    mobile.removeEventListener("change", observePending);
    splitGrid.removeEventListener("change", observePending);
    reducedMotion.removeEventListener("change", stopReveals);
    document.removeEventListener("focusin", revealFocused);
    document.removeEventListener("animationend", clearFinished);
    window.removeEventListener("hashchange", revealHashTarget);
    window.removeEventListener("scroll", revealAtPageEnd);
    window.removeEventListener("resize", revealAtPageEnd);
    window.removeEventListener("pageshow", revealAtPageEnd);
  }

  register(".section-intro h2, .section-heading h2");
  register(".business__grid > .business-card");
  register(".business__panel > .button, .operations .section-heading > .button", 105);
  register(".content-section .section-heading > .button", 270);
  register(".news-grid > .news-card", 85, 125);
  register(".magazine__list > .magazine-item", 85, 125);
  register(".operations__content", 105);
  register(".about-hero h1, .about-hero p, .about-anchor-nav", 0, 90);
  register(".about-page > .about-section");
  register(".footer__logo");
  register(".footer__nav > div:nth-child(-n+2)", 90);
  register(".footer__nav > div:nth-child(n+3)", 160);
  register(".footer__legal", 230);

  revealHashTarget();
  reveal(document.activeElement?.closest("[data-reveal-state]"), true);
  observePending();
  mobile.addEventListener("change", observePending);
  splitGrid.addEventListener("change", observePending);
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
