const API_URL = "https://api.dating.com/identity";

// Регистрация
export async function register(email: string, password: string): Promise<Response> {
  return fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
}

// Авторизация (Basic)
export async function login(email: string, password: string): Promise<Response> {
  const credentials = btoa(`${email}:${password}`);
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "Authorization": `Basic ${credentials}`
    }
  });
}

// Сохранение токена
export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

// Получение токена
export function getToken(): string | null {
  return localStorage.getItem("token");
}

// Проверка и редирект
export function redirectIfAuthorized() {
  const token = getToken();
  if (token) {
    window.location.href = `https://www.dating.com/people/#token=${token}`;
  }
}
