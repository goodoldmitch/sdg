let popup: HTMLElement | null = null;
let closeBtn: HTMLElement | null = null;

export function initPopup() {
  popup = document.querySelector<HTMLElement>("#popup");
  closeBtn = document.querySelector<HTMLElement>("#popup-close");

  const openBtn = document.querySelector<HTMLElement>("#signup-btn");

  if (openBtn && popup) {
    openBtn.addEventListener("click", openPopup);
  }

  if (closeBtn && popup) {
    closeBtn.addEventListener("click", closePopup);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePopup();
  });
}

export function openPopup() {
  if (popup) {
    popup.classList.add("is-open");
    document.body.classList.add("no-scroll");
  }
}

export function closePopup() {
  if (popup) {
    popup.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  }
}
