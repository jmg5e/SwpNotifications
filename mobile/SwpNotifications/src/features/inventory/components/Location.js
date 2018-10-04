import React from 'react';
import { ListItem } from 'react-native-elements';

type Props = {
  moniker: string,
  floor: string,
  onPress: Function,
};

const Location = ({ moniker, floor, onPress }: Props) => (
  <ListItem onPress={onPress} title={moniker} subtitle={floor} bottomDivider />
);

export default Location;
