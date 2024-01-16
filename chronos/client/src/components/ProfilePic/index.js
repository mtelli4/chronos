import React from 'react';
import { ProfilePicCont, ProfilePicImg } from './ProfilePicElements';

const ProfilePic = ({ src, size }) => {
  return (
    <ProfilePicCont size={size}>
        <ProfilePicImg size={size} src={src} />
    </ProfilePicCont>
  )
}

export default ProfilePic
