import React, {useState} from 'react'
import ChronosLogo from '../ChronosLogo';
import { HeaderCont, HeaderNav, HeaderLinks, HeaderLink, HeaderProfile, HeaderLinkText, HeaderLinkBorder } from "./HeaderElements.js";
import ProfilePic from '../ProfilePic/index.js';
import pic from "../../images/test.jpg";
 
const Header = ({ links }) => { // links = [{title : string, to : string}]

  const [selected, setSelected] = useState(0);

  function handleClick(index) {
    setSelected(index);
  }

  return (
    <HeaderCont>
        <ChronosLogo fontsize={3} />

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
            </HeaderLinks>
            <HeaderProfile src={pic} />
        </HeaderNav>
    </HeaderCont>
  )
}

export default Header
