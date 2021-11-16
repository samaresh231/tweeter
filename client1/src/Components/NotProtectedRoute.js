import { Redirect } from 'react-router-dom'
import cookies from 'js-cookies'

function NotProtectedRoute({ Component }) {
  const token = cookies.getItem('jwt')
  
  return !token ? <Component /> : <Redirect to={{pathname: '/'}} />
}

export default NotProtectedRoute