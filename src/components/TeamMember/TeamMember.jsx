import React from 'react';
import styled from '@emotion/styled';

import Card from '../Card';
import Avatar from '../Avatar';
import MemberStats from '../MemberStats';
import { memberShape } from '../../propTypes';
import ApplicationForm from "../ApplicationForm";

const Name = styled.h2`
  color: #1c1c21;
  font-size: 32px;
  font-weight: bold;
  line-height: 56px;
  margin-bottom: 24px;
`;

const Title = styled.h3`
  color: #343799;
  font-size: 20px;
  letter-spacing: 0.04em;
  line-height: 20px;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

const Body = styled.div`
  font-size: 16px;
  line-height: 24px;
`;

const STATS = [
  {
    label: 'Candid',
    score: 9.0,
  },
  {
    label: 'Learning',
    score: 9.0,
  },
  {
    label: 'Grit',
    score: 9.0,
  },
];

export default function TeamMember({ member, onApply }) {
  const { photoUrl, title, firstName, lastName, favoriteColor, story } = member || {};

  const name = member ? `${firstName} ${lastName}` : 'Join us!';

  return (
    <Card
      badge={(
        <Avatar
          src={photoUrl}
          alt={name}
        />
      )}
      header={(
        <>
          <Title>{title || 'New Teammate'}</Title>
          <Name>{name}</Name>
        </>
      )}
      footer={member && STATS.length ? (
        <MemberStats
          stats={STATS}
          backgroundColor={favoriteColor}
        />
      ) : null}
    >
      <Body>
        {story || <ApplicationForm onApply={onApply} />}
      </Body>
    </Card>
  );
}

TeamMember.propTypes = {
  member: memberShape,
};
