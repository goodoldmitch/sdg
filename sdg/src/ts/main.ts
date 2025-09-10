import '../styles/main.scss';
import { initPopup } from './components/popup';
import { redirectIfAuthorized } from './components/api';
import { initForm } from './components/form';

document.addEventListener("DOMContentLoaded", () => {
    // Автологин при наличии токена
    // redirectIfAuthorized();
  
    // Инициализация UI
    initPopup();
    initForm();
  });