import Login from './Components/Login'
import Profile from './Components/Profile'
import Index from './Components/Index'
import LinkRoutes from './Components/LinkRoutes'
import Edit from './Components/Edit'
import Signup from './Components/Signup'
import ProtectedRoute from './Components/ProtectedRoute'
import NotProtectedRoute from './Components/NotProtectedRoute'
import Rough from './Components/Rough'
import {AppContainer} from './Style/app.style'
import {Route, Switch} from 'react-router-dom'
import NavBar from './Components/NavBar'
import ProtectedComponent from './Components/ProtectedComponent'

function App() {
  return (
    <div>
      <ProtectedComponent Component={NavBar} />
      <AppContainer>
        <Switch>
          <Route exact path='/'>
            <ProtectedRoute Component={Index} />
          </Route>
          <Route path='/login'>
            <NotProtectedRoute Component={Login} />
          </Route>
          <Route path='/signup'>
            <NotProtectedRoute Component={Signup} />
          </Route>
          <Route path='/profile'>
            <ProtectedRoute Component={Profile} />
          </Route>
          <Route path='/link'>
            <LinkRoutes />
          </Route>
          <Route path='/edit'>
            <ProtectedRoute Component={Edit} />
          </Route>
          <Route path='/rough'>
            <Rough />
          </Route>
          <Route path="*">
            <div style={{textAlign: 'center'}}>
              <h1>404</h1>
              <p>Nothing Found</p>
            </div>
          </Route>
        </Switch>
      </AppContainer>
    </div>
  );
}

export default App;
