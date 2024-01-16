import React from 'react'
import ChronosLogo from '../ChronosLogo';
import { HeaderCont, HeaderNav, HeaderLinks, HeaderLink } from "./HeaderElements.js";
import ProfilePic from '../ProfilePic/index.js';
import pic from "../../images/test.jpg";
 
const Header = ({ links }) => { // links = [{title : string, to : string}]
  return (
    <HeaderCont>
        <ChronosLogo fontsize={3} />

        <HeaderNav>
            <ProfilePic src={pic} size={10} /> 
            <HeaderLinks>
                {links.map((item) => (
                    <HeaderLink key={item.id} to={item.to}>{item.title}</HeaderLink>
                ))}
            </HeaderLinks>
        </HeaderNav>
    </HeaderCont>
  )
}

export default Header
