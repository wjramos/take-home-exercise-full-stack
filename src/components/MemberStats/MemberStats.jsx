import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Stat = styled.div`
  flex: 1;
  border-left: 1px solid rgba(255, 255, 255, 0.5);

  &:first-of-type {
    border-left: none;
  }
`;

const Score = styled.div`
  font-family: museo-slab, sans-serif;
  font-style: normal;
  font-weight: 900;
  line-height: 56px;
  font-size: 40px;
`;

const Label = styled.div`
`;

const DEFAULT_FOOTER_COLOR = '#3466F2';

// @NOTE Radii set here because overflow: hidden can not be set on card due to avatar positioning
const StatsContainer = styled.footer`
  background-color: ${props => props.backgroundColor || DEFAULT_FOOTER_COLOR};
  color: #fff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  padding: 16px 0;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
`;

export default function MemberStats({ stats = [], backgroundColor }) {
  return (
    <StatsContainer backgroundColor={backgroundColor}>
      {stats.map(stat => (
        <Stat key={stat.label}>
          <Score>{stat.score.toFixed(1)}</Score>
          <Label>{stat.label}</Label>
        </Stat>
      ))}
    </StatsContainer>
  );
}

MemberStats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    score: PropTypes.number,
  }))
};