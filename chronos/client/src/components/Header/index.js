import React, {isValidElement, useState} from 'react'
import { useNavigate } from "react-router-dom"
import ChronosLogo from '../ChronosLogo';
import { HeaderCont, HeaderNav, HeaderLinks, HeaderLink, HeaderProfile, HeaderLinkText, HeaderLinkBorder, HeaderBurger, HeaderBurgerLinks, HeaderScreen, HeaderBurgerNav } from "./HeaderElements.js";
import ProfilePic from '../ProfilePic/index.js';
import { authService } from "../../services/authService";
import pic from "../../images/test.jpg";
 
const Header = ({ setNavVisible, links, isVisible }) => { // links = [{title : string, to : string}]
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function handleClick(index) {
    setSelected(index);
  }

  const logout = ()=> {
    authService.logOut();
    navigate('/login');
  } 

  return (
    <HeaderCont isVisible={isVisible}>
        <ChronosLogo fontsize={2.25} />

        <HeaderNav>
            <HeaderLinks>
                {links.map((item, index) => (
                    <HeaderLink key={item.id}>
                      <HeaderLinkText selected={selected == index} to={item.to} onClick={() => handleClick(index)}>
                        {item.title}
                      </HeaderLinkText>

                      <HeaderLinkBorder selected={selected == index}></HeaderLinkBorder>
                    </HeaderLink>
                ))}
                <button className="btn btn-danger" onClick={()=> logout()}>
                    Déconnexion
                </button>
            </HeaderLinks>
            <HeaderProfile isActive={isActive} src={pic} onClick={setNavVisible(true)} />
        </HeaderNav>
    </HeaderCont>
  )
}

export default Header
