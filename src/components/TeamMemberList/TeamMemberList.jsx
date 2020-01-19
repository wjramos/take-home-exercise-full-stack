import React, { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import TeamMember from '../TeamMember';
import { memberShape } from '../../propTypes';
import AnimatedList from "../AnimatedList";

const MemberList = styled(AnimatedList)`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: center;
  padding: 0;

  & > * {
    height: 100%;
    width: 100%;

    @media screen and (min-width: 1080px) {
      width: 50%;
    }
  }
`;

const Member = styled.li`
  list-style-type none;

  & > * {
    height: 100%;
  }
`;

// @TODO store common endpoints in a constants file
const TEAM_ENDPOINT = '/team';

export default function TeamMemberList() {
  const [team, setTeam] = useState([]);

  const fetchTeam = useCallback(async () => {
    const response = await fetch(TEAM_ENDPOINT);
    const result = await response.json();

    setTeam(result);
  }, [setTeam]);

  useEffect(() => {
    async function pollForData() {
      try {
        await fetchTeam();
      } catch(error) {
        // try again after half a second if fails due to race condition
        console.warn(error, 'Retrying initial data request…');

        setTimeout(async () => {
          await fetchTeam();
        }, 500);
      }
    }

    // @NOTE Recommended way to deal with async functions in useEffect
    // is to define async functions within body rather than making effect
    // argument async, then initializing as an IIFE or calling without await.
    // Source: https://github.com/facebook/react/issues/14326#issuecomment-441680293
    pollForData();
  }, [fetchTeam]);

  if (!team) {
    return (
      <h1>Loading…</h1>
    );
  }

  // @TODO use context to avoid prop-drilling fetchTeam
  return (
    <MemberList
      items={[
        ...team.map(member => (
          <Member key={member.id}>
            <TeamMember
              member={member}
            />
          </Member>
        )),
        <Member key="new">
          <TeamMember onApply={fetchTeam} />
        </Member>
      ]}
    />
  );
}

TeamMemberList.propTypes = {
  team: PropTypes.arrayOf(memberShape),
};