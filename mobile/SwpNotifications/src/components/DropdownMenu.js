import React, { Component } from 'react';
import {
  View, StyleSheet, NativeModules, findNodeHandle,
} from 'react-native';
import { Icon } from 'react-native-elements';

type Props = {
  actions: Array<{ text: string, action: Function }>,
  menu?: Object,
  containerStyle?: StyleSheet.Styles,
  dropDownStyle?: StyleSheet.Styles,
};

class DropDownMenu extends Component<Props> {
  onMenuPressed = () => {
    NativeModules.UIManager.showPopupMenu(
      findNodeHandle(this.menu),
      this.props.actions.map(a => a.text),
      () => {},
      (result, index) => {
        if (result === 'itemSelected') {
          this.props.actions[index].action();
        }
      },
    );
  };

  assignRef = (component) => {
    this.menu = component;
  };

  renderMenu = () => {
    const onPress = this.onMenuPressed;
    const Menu = React.cloneElement(this.props.menu, {
      onPress,
    });
    return Menu;
  };

  render() {
    return (
      <View style={this.props.containerStyle}>
        <View
          ref={this.assignRef}
          style={this.props.dropDownStyle}
        />
        {this.renderMenu()}
      </View>
    );
  }
}

DropDownMenu.defaultProps = {
  menu: <Icon name="more-vert" underlayColor="transparent" />,
  containerStyle: { padding: 5 },
  dropDownStyle: {
    backgroundColor: 'transparent',
    width: 1,
    height: StyleSheet.hairlineWidth,
  },
};

export default DropDownMenu;
