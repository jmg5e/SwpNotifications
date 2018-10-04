import React from 'react';
import styled from 'styled-components';


const StyledButton = styled.TouchableOpacity`
    background-color: blue;
    color: white;
    height: 30px;
    line-height: 30px;
    margin: 10px;
    text-align: center;
    width: 90%;
    border-radius: 5px;
    /* border: 2px solid #73AD21; */
`;

const StyledText = styled.Text`
    color: white;
    /* height: 30px; */
    /* line-height: 30px; */
    text-align: center;
`;

type Props = { onPress: Function, label: string };
const Button = ({ label, ...props }: Props) => (
  <StyledButton {...props}>
    <StyledText>
      {label}
    </StyledText>
  </StyledButton>
);

export default Button;
