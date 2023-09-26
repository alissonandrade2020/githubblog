import { HeaderContainer } from './styles'
import logoImg from '../../assets/Logo.svg'

export function Header() {
  return (
    <HeaderContainer >      
      <center><img src={logoImg} alt="LOGO" /></center>

    </HeaderContainer>
  )
}