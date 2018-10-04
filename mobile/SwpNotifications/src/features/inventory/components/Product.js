import React from 'react';
import { ListItem } from 'react-native-elements';

type Props = {
  name: string,
  slot: string,
  onPress: Function,
};

const Product = ({ onPress, name, slot }: Props) => (
  <ListItem
    scaleProps={{
      friction: 90,
      tension: 100,
      activeScale: 0.9,
    }}
    onPress={onPress}
    bottomDivider
    title={name}
    rightSubtitle={`Slot: ${slot}`}
  />
);

export default Product;
