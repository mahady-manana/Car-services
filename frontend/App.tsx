import { Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { UserContext } from './UserContext';
import { Headers } from './src/components';

const Home = await import('./src/pages/homepage').then(
  (module) => module.default,
);
const Login = await import('./src/pages/login').then(
  (module) => module.default,
);
const Signup = await import('./src/pages/signup').then(
  (module) => module.default,
);
const Admin = await import('./src/pages/admin').then(
  (module) => module.default,
);
const OneCarPage = await import('./src/pages/carpage').then(
  (module) => module.default,
);
export default function App() {
  interface userContextProps {
    nom?: string;
    prenom?: string;
    email?: string;
    connected?: boolean;
  }
  const [userContext, setUserContext] = useState<userContextProps>({
    nom: '',
    prenom: '',
    email: '',
    connected: false,
  });
  return (
    <Switch>
      <UserContext.Provider value={{ setUserContext, userContext }}>
        <Headers />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin" component={Admin} />
        <Route path="/details/:id/" component={OneCarPage} />
      </UserContext.Provider>
    </Switch>
  );
}
