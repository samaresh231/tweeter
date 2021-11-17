import {useState} from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import { FormDiv, LoginText, Input, Button, SupressedText, LogoSpan, Logo, Anchor } from '../Style/login.style'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/auth/login/', {
        email: email, 
        password: password
      }, {
        withCredentials: true,
        credentials: 'include'
      })

      if(response.status === 200) {
        setEmail('')
        setPassword('')
        history.push('/')
        window.location.reload()
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <FormDiv>
      <LoginText>Login</LoginText>
      <form onSubmit={handleSubmit}>
        <Input name='email' type='text' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' />
        <Input name='password' type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' />
        <Button>Login</Button>
      </form>
      <SupressedText>or continue with these social profile</SupressedText>
      <LogoSpan>
        <Anchor href='http://localhost:8080/auth/google'><Logo className="fab fa-google" color='#DB4437'></Logo></Anchor>
        <Anchor href='http://localhost:8080/auth/google'><Logo className="fab fa-facebook" color='#4267B2'></Logo></Anchor>
        <Anchor href='http://localhost:8080/auth/google'><Logo className="fab fa-github" color='#171515'></Logo></Anchor>
        <Anchor href='http://localhost:8080/auth/google'><Logo className="fab fa-twitter" color='#1DA1F2'></Logo></Anchor>
      </LogoSpan>
      <SupressedText>Don't have an account yet?<Link to='/signup'>Register</Link></SupressedText>
    </FormDiv>
  )
}

export default Login