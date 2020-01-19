import React from 'react';
import styled from "@emotion/styled";

const CARD_RADIUS = '8px';
const BADGE_SIZE_PX = 128;

const CardContainer = styled.div`
  padding: 16px;
`;

const CardBoundary = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(79, 82, 177, 0.35);
  display: inline-flex;
  flex-direction: column;
  text-align: center;
  border-radius: ${CARD_RADIUS};
  width: 100%;
  margin-top: ${props => props.hasBadge ? BADGE_SIZE_PX / 2 : 0}px;
`;

const Badge = styled.div`
  margin: -${BADGE_SIZE_PX / 2}px auto 0;
  width: ${BADGE_SIZE_PX}px;
  height: ${BADGE_SIZE_PX}px;
`;

const Header = styled.header`
`;

const Content = styled.main`
  padding: 0 32px 32px;
`;

// @NOTE Radii set here because overflow: hidden can not be set on card boundary
// due to avatar positioning.
const Footer = styled.footer`
  overflow: hidden;
  border-bottom-left-radius: ${CARD_RADIUS};
  border-bottom-right-radius: ${CARD_RADIUS};
`;

export default function Card({ badge, header, children, footer }) {
  return (
    <CardContainer>
      <CardBoundary hasBadge={!!badge}>
        {badge && (
          <Badge>
            {badge}
          </Badge>
        )}

        {header && (
          <Header>
            {header}
          </Header>
        )}

        {children && (
          <Content>
            {children}
          </Content>
        )}

        {footer && (
          <Footer>
            {footer}
          </Footer>
        )}
      </CardBoundary>
    </CardContainer>
  );
}