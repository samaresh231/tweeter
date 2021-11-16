import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'

function LinkRoutes() {
  const history = useHistory()
  const handleClick = async () => {
    try {
      const response = await axios.delete('http://localhost:8080/logout', {
        withCredentials: true
      })
      if(response.status === 200) {
        history.push('/login')
      }
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Home Page</Link>
        </li>
        <li>
          <Link to='/link'>Link Page</Link>
        </li>
        <li>
          <Link to='/login'>Login Page</Link>
        </li>
        <li>
          <Link to='/profile'>Profile Page</Link>
        </li>
      </ul>
      <button onClick={handleClick}>Log out</button>
    </div>
  )
}

export default LinkRoutes