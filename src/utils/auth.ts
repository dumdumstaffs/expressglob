export const authToken = {
  get() {
    return localStorage.getItem("token");
  },

  set(token: string) {
    localStorage.setItem("token", token);
  },

  clear() {
    localStorage.removeItem("token");
  },
};
