import styled from 'styled-components'

const NavDiv = styled.div`
  font-family: Noto Sans;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Img = styled.img`
  width: 30px;
  margin: 10px;
  border-radius: 5px;
`

const Span = styled.span`
  display: flex;
  align-items: center;
  margin-right: 7%;

  &:hover {
    cursor: pointer;
  }
`

export {
  Img,
  NavDiv,
  Span
}