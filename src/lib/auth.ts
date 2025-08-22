let _token: string | null = null;

export function setToken(t: string) {
  _token = t;
}
export function getToken() {
  return _token;
}
export function clearToken() {
  _token = null;
}
export function isAuthed() {
  return !!_token;
}
