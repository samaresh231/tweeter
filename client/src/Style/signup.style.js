import styled from 'styled-components'

const FormDiv = styled.div`
  font-family: Noto Sans;
  border: 1px solid #BDBDBD;
  border-radius: 8px;
  width: 32%;
  text-align: center;
  width: 33%;
  min-width: 400px;
`
const LoginText = styled.p`
  font-size: 18px;
  font-weight: 600;
`

const Input = styled.input`
  height: 38px;
  width: 80%;
  margin: 2%;
  display: inline-block;
  border-radius: 8px;
  border: 1px solid #BDBDBD;
  box-sizing: border-box;
  padding-left: 20px;
`

const Button = styled.button`
  width: 80%;
  display: inline-block;
  background-color: #2F80ED;
  color: white;
  border: none;
  border-radius: 8px;
  height: 38px;
  margin: 3%;

  &:hover {
    background-color: darkblue;
    cursor: pointer;
  }
`

const LogoSpan = styled.span`
  display: flex;
  justify-content: center;
`

const Logo = styled.i`
  font-size: 20px;

  &:hover {
    cursor: pointer;
    color: ${props => props.color};
  }
`

const Anchor = styled.a`
  border: 1px solid #BDBDBD;
  border-radius: 50%;
  margin: 2%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #828282;
`

const SupressedText = styled.p`
  /* width: 70%; */
  font-size: 13px;
  color: #828282;
`

export {
  Anchor,
  FormDiv,
  LoginText,
  Input,
  Button,
  SupressedText,
  LogoSpan,
  Logo
}