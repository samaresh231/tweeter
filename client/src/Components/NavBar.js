import axios from 'axios'
import {useState, useEffect } from 'react'
import { Img, NavDiv, Span } from '../Style/navbar.style'
import NavDropDown from './NavDropDown'

function NavBar() {
  const [url, setUrl] = useState('https://res.cloudinary.com/do8wqn9b9/image/upload/v1633538448/profile/rkke1ozjdth82x7wtrs7.jpg')
  const [name, setName] = useState('')
  const [isTrue, setIsTrue] = useState(true)

  useEffect(() => {
    async function main() {
      try {
        const response = await axios.get('http://localhost:8080/settings', {
          withCredentials: true,
        })

        const data = response.data
        const photo = data.photo
        const name = data.name.slice(0, data.name.indexOf(' '))
        setName(name)
        if(photo.url) {
          setUrl(photo.url)
        }

      } catch(err) {
        console.log(err)
      }
    }

    main()
  })

  const handleClick = () => {
    setIsTrue(!isTrue)
  }

  return (
    <NavDiv>
      <span></span>
      <Span onClick={() => setIsTrue((isTrue) => !isTrue)}>
        <Img src={url}/>
        <span>{name} {isTrue ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-up"></i>} </span>
      </Span>
      <NavDropDown hide={isTrue} clicked={handleClick} />
    </NavDiv>
  )
}

export default NavBar
