export const cookieConfig = {
  sameSite: 'Lax' as const,
  secure: true,
  path: '/',
  maxAge: 30 * 24 * 60 * 60, // 30 dias
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; ${Object.entries(cookieConfig)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')}`;
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
}; 