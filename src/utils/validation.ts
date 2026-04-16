export function validateEmail(value: string): string | null {
  if (!value) return "Обязательное поле";
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!re.test(value)) return "Некорректный адрес почты";
  return null;
}

export function validateLogin(value: string): string | null {
  if (!value) return "Обязательное поле";
  if (value.length < 3 || value.length > 20) return "От 3 до 20 символов";
  if (/^\d+$/.test(value)) return "Не может состоять только из цифр";
  if (!/^[a-zA-Z0-9_-]+$/.test(value))
    return "Только латиница, цифры, дефис и нижнее подчёркивание";
  return null;
}

export function validateName(value: string): string | null {
  if (!value) return "Обязательное поле";
  if (!/^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/.test(value))
    return "Только буквы, первая — заглавная";
  return null;
}

export function validatePhone(value: string): string | null {
  if (!value) return "Обязательное поле";
  if (!/^\+?\d{10,15}$/.test(value))
    return "От 10 до 15 цифр, допускается знак +";
  return null;
}

export function validatePassword(value: string): string | null {
  if (!value) return "Обязательное поле";
  if (value.length < 8 || value.length > 40) return "От 8 до 40 символов";
  if (!/[A-Z]/.test(value)) return "Минимум одна заглавная буква";
  if (!/\d/.test(value)) return "Минимум одна цифра";
  return null;
}

export function validateMessage(value: string): string | null {
  if (!value || !value.trim()) return "Сообщение не может быть пустым";
  return null;
}

export function validateRequired(value: string): string | null {
  if (!value || !value.trim()) return "Обязательное поле";
  return null;
}
