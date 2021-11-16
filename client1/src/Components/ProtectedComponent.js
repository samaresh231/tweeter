import cookies from 'js-cookies'

function ProtectedComponent ({Component}) {
  const token = cookies.getItem('jwt')

  return token ? <Component /> : null
}

export default ProtectedComponent
