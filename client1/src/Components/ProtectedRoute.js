import { Redirect } from 'react-router-dom'
import cookies from 'js-cookies'

function ProtectedRoute({ Component }) {
  const token = cookies.getItem('jwt')
  
  return token ? <Component /> : <Redirect to={{pathname: '/login'}} />
}

export default ProtectedRoute
