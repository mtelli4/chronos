import React, {isValidElement, useState} from 'react'
import { useNavigate } from "react-router-dom"
import ChronosLogo from '../ChronosLogo';
import { HeaderSelect, HeaderWrap, HeaderBurger, HeaderCont, HeaderLink, HeaderLinkBorder, HeaderLinkText, HeaderLinks, HeaderProfile, HeaderNav, HeaderScreen } from "./HeaderElements.js";
import ProfilePic from '../ProfilePic/index.js';
import { authService } from "../../services/authService";
import pic from "../../images/test.jpg";
import ChronosButton from "../ChronosButton"
import grid from "../../images/la-grille.png";
 
const Header = ({ setNavVisible, links, isVisible }) => { // links = [{title : string, to : string}]
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const handleClick = async (index) => {
    setSelected(index);
    await sleep(500);
    setIsActive(false);
  }

  const logout = ()=> {
    authService.logOut();
    navigate('/login');
  } 

  const userRoles = authService.getUserRoles();

  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;

    // Mettre à jour le local storage avec le nouveau rôle sélectionné
    authService.setCurrentRole(selectedRole);
    authService.setCurrentRoleId(userRoles[selectedRole]);
    window.location.reload();
  };

  return (
    <>
      <div style={{height: "15vh"}}></div>
      <HeaderWrap isActive={isActive}>
        <HeaderCont isVisible={isVisible}>
          <ChronosLogo fontsize={2.25} />

          <HeaderBurger src={grid} onClick={() => setIsActive(true)} />
        </HeaderCont>

        <HeaderNav isActive={isActive}>
          <HeaderProfile src={pic} />
          <HeaderSelect id="roleSelector" value={authService.getCurrentRole()} onChange={handleRoleChange}>
                {Object.keys(userRoles ?? {}).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
          </HeaderSelect>

          <HeaderLinks>
            {links.map((item, index) => (
                <HeaderLink key={item.id}>
                  <HeaderLinkText selected={selected == index} to={item.to} onClick={() => handleClick(index)}>
                    {item.title}
                  </HeaderLinkText>

                  <HeaderLinkBorder selected={selected == index}></HeaderLinkBorder>
                </HeaderLink>
            ))}
          </HeaderLinks>

            
          <ChronosButton action={logout} text="Déconnexion" />
        </HeaderNav>


        <HeaderScreen isActive={isActive} onClick={() => setIsActive(false)}></HeaderScreen>
    </HeaderWrap>
  </>
  )
}

export default Header
