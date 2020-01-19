import React from 'react';
import styled from "@emotion/styled";

import NEW_USER_AVATAR from '../../assets/matter_empty_avatar.svg';

const AvatarContainer = styled.div`
  border-radius: 100%;
  overflow: hidden;
  height: inherit;
  width: inherit;

  & > img {
    display: inline-block;
    vertical-align: middle;
    object-fit: cover;

    min-width: 100%;
    min-height: 100%;

    height: auto;
    width: auto;
  }
`;

export default function Avatar({ src = NEW_USER_AVATAR, alt = '' }) {
  return (
    <AvatarContainer>
      <img
        src={src}
        alt={alt}
      />
    </AvatarContainer>
  );
}