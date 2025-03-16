export function getBaseApiUrl() {
  if (import.meta.env.PROD) {
    return `${window.location.origin}/api`;
  }

  if (import.meta.env["VITE_API_URL"]) {
    return import.meta.env["VITE_API_URL"];
  }

  return "http://localhost:3001";
}
