export const location = Object.defineProperties({}, {
  search: {
    get() {
      return window.location.search
    }
  },
  hash: {
    get() {
      return window.location.hash
    }
  },
  pathname: {
    get() {
      return window.location.pathname
    }
  }
});
