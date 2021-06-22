const Auth = {
  isAuthenticated() {
    if (typeof window == 'undefined') return false;

    if (sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt') as any);
    else return false;
  },
  authenticate(jwt: any, cb: () => void) {
    if (typeof window !== 'undefined')
      sessionStorage.setItem('jwt', JSON.stringify(jwt));
    cb();
  },
  clearJWT(cb: () => void) {
    if (typeof window !== 'undefined') sessionStorage.removeItem('jwt');
    cb();
  },
};

export default Auth;
