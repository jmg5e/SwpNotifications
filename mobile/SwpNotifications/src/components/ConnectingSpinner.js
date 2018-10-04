import React from 'react';
import {
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
  /* display: flex; */
  /* flex: 1, */
  /* flex-direction: column; */
  /* justifyContent: center; */
  /* alignItems: center; */
`;
type Props = {
  connecting: boolean,
};

const ConnectingSpinner = ({ connecting } : Props) => {
  if (connecting) {
    return (
      <Container>
        <ActivityIndicator animating size={100} />
      </Container>
    );
  }
  return (null);
};

export default ConnectingSpinner;
