import React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core'

import TeamMemberList from '../TeamMemberList';

const AppContainer = styled.div`
  margin: 0 auto;
  max-width: 992px;
  padding: 0;

  @media screen and (min-width: 1080px) {
    margin-bottom: 44px;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

// @TODO move global styles to standalone component / HOC
const RESET = `
	html {
		box-sizing: border-box;
	}

	html,
	body,
	#root {
		min-height: 100vh;
		width: 100%;
		position: relative;
	}

	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	body {
		margin: 0;
		font-size: 16px;
		overflow-x: hidden;
	}

	ol,
	ul {
		list-style: none;
    padding: 0;
	}

	img {
		max-width: 100%;
		height: auto;
	}
`;

const FONT_SMOOTHING = `
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-webkit-text-stroke: 0.45px rgba(0, 0, 0, 0.1);
`;

const GLOBAL_STYLES = css`
  ${RESET}

  body {
    ${FONT_SMOOTHING}

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }

  code,
  pre {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
`;

export default function App() {
  return (
    <AppContainer>
      <Global styles={GLOBAL_STYLES} />
      <TeamMemberList />
    </AppContainer>
  );
}

