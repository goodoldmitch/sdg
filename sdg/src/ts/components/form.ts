import { register, login, saveToken, redirectIfAuthorized } from "./api";

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string): boolean {
  return password.length >= 8;
}

export function initForm() {
  const form = document.querySelector<HTMLFormElement>("#signup-form");
  if (!form) return;

  const parentWrapper = document.querySelector<HTMLInputElement>(".popup-content");
  const emailInput = form.querySelector<HTMLInputElement>("input[name='email']");
  const passwordInput = form.querySelector<HTMLInputElement>("input[name='password']");
  const errorBoxEmail = form.querySelector<HTMLElement>("#email-error");
  const errorBoxPassword = form.querySelector<HTMLElement>("#password-error");
  const errorBox = document.querySelector<HTMLElement>("#form-errors");
  const successBox = document.querySelector<HTMLElement>("#form-success");

  if (!emailInput || !passwordInput) return;

  // Универсальная функция валидации одного поля
  function validateField(
    input: HTMLInputElement,
    validator: (val: string) => boolean,
    errorBox?: HTMLElement | null,
    errorMessage?: string
  ): boolean {
    const value = input.value.trim();
    if (!validator(value)) {
      if (errorBox) errorBox.textContent = errorMessage ?? "Invalid value";
      input.classList.add("input-error");
      return false;
    }
    // очищаем ошибку при валидном вводе
    if (errorBox) errorBox.textContent = "";
    input.classList.remove("input-error");
    return true;
  }

  // Вешаем валидацию на blur
  emailInput.addEventListener("blur", () =>
    validateField(emailInput, validateEmail, errorBoxEmail, "Please enter a valid e-mail")
  );

  passwordInput.addEventListener("blur", () =>
    validateField(passwordInput, validatePassword, errorBoxPassword, "Password must be at least 8 characters")
  );

  // Сабмит формы
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isEmailValid = validateField(emailInput, validateEmail, errorBoxEmail, "Please enter a valid e-mail");
    const isPasswordValid = validateField(passwordInput, validatePassword, errorBoxPassword, "Password must be at least 8 characters");

    if (!isEmailValid || !isPasswordValid) return;

    try {
      // Попытка авторизации
      const loginResp = await login(emailInput.value.trim(), passwordInput.value.trim());
      if (loginResp.ok) {
        const token = loginResp.headers.get("X-Token");
        if (token) {
          saveToken(token);
          redirectIfAuthorized();
          return;
        }
      }

      // Регистрация
      const regResp = await register(emailInput.value.trim(), passwordInput.value.trim());
      if (regResp.ok) {
        const token = regResp.headers.get("X-Token");
        if (token) saveToken(token);

        if (successBox) {
        //   successBox.textContent = "Thank You...";

          parentWrapper?.classList.add('show-success');
          
        //   setTimeout(() => {
        //     redirectIfAuthorized();
        //   }, 5000);
        }
      } else {
        if (errorBox) errorBox.textContent = "Registration failed. Try again.";
      }
    } catch (err) {
      if (errorBox) errorBox.textContent = "Error: " + (err as Error).message;
    }
  });
}
