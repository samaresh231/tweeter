import {useState} from 'react'
import {FormDiv, LoginText, Button, SupressedText, LogoSpan, Logo, Input, Anchor} from '../Style/signup.style'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'

function Signup() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/signup', {
        name, email, password
      }, {
        withCredentials: true
      })

      if(response.status === 201) {
        history.push('/login')
      }
    } catch(err) {
      console.log(err)
    }
  }

  return(
    <FormDiv>
      <LoginText>Sign Up</LoginText>
      <form onSubmit={handleSubmit}>
        <Input name='name' type='text' onChange={(e) => setName(e.target.value)} value={name} placeholder='Name' />
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
      <SupressedText>Already a member? <Link to='/login'>Login</Link></SupressedText>
    </FormDiv>
  )
}

export default Signup