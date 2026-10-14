(function () {
  "use strict";

  const STATUS_LABELS = {
    planning: "Planning",
    "in-development": "In Development",
    "coming-soon": "Coming Soon",
    launched: "Launched",
  };

  const els = {
    loading: document.getElementById("cs-loading"),
    error: document.getElementById("cs-error"),
    empty: document.getElementById("cs-empty"),
    grid: document.getElementById("cs-grid"),
    modal: document.getElementById("cs-modal"),
    modalBody: document.getElementById("cs-modal-body"),
  };

  function show(el) { el && el.classList.remove("cs-state--hidden"); }
  function hide(el) { el && el.classList.add("cs-state--hidden"); }

  function formatDate(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    if (isNaN(d)) return null;
    return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function cardHtml(p) {
    const launch = formatDate(p.expectedLaunchDate);
    const thumb = p.thumbnail
      ? `<img src="${escapeHtml(p.thumbnail)}" alt="${escapeHtml(p.name)} preview" class="cs-card__img" loading="lazy" />`
      : `<div class="cs-card__img cs-card__img--placeholder" aria-hidden="true"><span>${escapeHtml(p.name.charAt(0))}</span></div>`;

    const tech = (p.tech || [])
      .map((t) => `<span class="cs-chip">${escapeHtml(t)}</span>`)
      .join("");

    const hasDetails = p.details && (p.details.overview || (p.details.features || []).length);

    return `
      <article class="cs-card" data-id="${escapeHtml(p.id)}">
        <div class="cs-card__media">${thumb}</div>
        <div class="cs-card__body">
          <div class="cs-card__head">
            <h3 class="cs-card__title">${escapeHtml(p.name)}</h3>
            <span class="cs-badge cs-badge--${escapeHtml(p.status)}">
              ${escapeHtml(STATUS_LABELS[p.status] || p.status)}
            </span>
          </div>
          <p class="cs-card__desc">${escapeHtml(p.description || "")}</p>
          ${tech ? `<div class="cs-card__tech">${tech}</div>` : ""}
          ${launch ? `<p class="cs-card__date">Expected ${escapeHtml(launch)}</p>` : ""}
          ${hasDetails ? `<button type="button" class="cs-btn cs-btn--ghost" data-details="${escapeHtml(p.id)}">View Details</button>` : ""}
        </div>
      </article>
    `;
  }

  function render(projects) {
    const visible = (projects || []).filter((p) => p.published !== false);
    hide(els.loading);

    if (!visible.length) {
      hide(els.grid);
      show(els.empty);
      return;
    }

    els.grid.innerHTML = visible.map(cardHtml).join("");
    show(els.grid);
    hide(els.empty);

    els.grid.querySelectorAll("[data-details]").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.getAttribute("data-details"), visible));
    });
  }

  function openModal(id, projects) {
    const p = projects.find((x) => x.id === id);
    if (!p) return;

    const d = p.details || {};
    const launch = formatDate(p.expectedLaunchDate);
    const list = (arr) => (arr && arr.length ? `<ul>${arr.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : "");
    const shots = (d.screenshots || []).length
      ? `<div class="cs-modal__shots">${d.screenshots
          .map((s) => `<img src="${escapeHtml(s)}" alt="${escapeHtml(p.name)} screenshot" loading="lazy" />`)
          .join("")}</div>`
      : "";

    els.modalBody.innerHTML = `
      <div class="cs-modal__head">
        <h2 id="cs-modal-title">${escapeHtml(p.name)}</h2>
        <span class="cs-badge cs-badge--${escapeHtml(p.status)}">
          ${escapeHtml(STATUS_LABELS[p.status] || p.status)}
        </span>
      </div>
      ${d.overview ? `<section><h3>Overview</h3><p>${escapeHtml(d.overview)}</p></section>` : ""}
      ${d.goals ? `<section><h3>Goals</h3>${list(d.goals)}</section>` : ""}
      ${d.features ? `<section><h3>Planned Features</h3>${list(d.features)}</section>` : ""}
      ${(p.tech || []).length ? `<section><h3>Tech</h3><div class="cs-card__tech">${p.tech.map((t) => `<span class="cs-chip">${escapeHtml(t)}</span>`).join("")}</div></section>` : ""}
      ${launch ? `<section><h3>Expected Launch</h3><p>${escapeHtml(launch)}</p></section>` : ""}
      ${shots}
      <p class="cs-modal__note">This project is still in progress. No live demo or final date is available yet.</p>
    `;

    show(els.modal);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    hide(els.modal);
    document.body.style.overflow = "";
  }

  els.modal && els.modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  window.loadProjects = function () {
    hide(els.error);
    hide(els.empty);
    show(els.loading);
    try {
      // Swap this line later for: const projects = await fetchFromSanity();
      const projects = window.RHEM_PROJECTS || [];
      // simulate async so loading state is visible
      setTimeout(() => render(projects), 150);
    } catch (err) {
      console.error(err);
      hide(els.loading);
      hide(els.grid);
      show(els.error);
    }
  };

  document.getElementById("cs-year").textContent = new Date().getFullYear();
  window.loadProjects();
})();
