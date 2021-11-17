import {ButtonDiv, Container, Div} from '../Style/navdropdown.style'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

function NavDropDown ({hide, clicked}) {
  const history = useHistory()

  const handleLogout = async () => {
    try {
      const response = await axios.delete('http://localhost:8080/auth/logout', {
        withCredentials: true
      })
      
      if(response.status === 200) {
        window.location.reload()
      }
    } catch(err) {
      console.log(err)
    }
  }

  function handleClick(location) {
    history.push(location)
    clicked()
  }

  return (
    <Container hide={hide}>
      <Div onClick={() => handleClick('/profile')}><i className="fas fa-user-circle"></i> My Profile</Div>
      <Div onClick={() => handleClick('/')}><i className="fas fa-home"></i> Main Page</Div>
      <ButtonDiv onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</ButtonDiv>
    </Container>
  )
}

export default NavDropDown
