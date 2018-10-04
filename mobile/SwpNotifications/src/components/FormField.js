import React from 'react';
import { View, TextInput, Text } from 'react-native';

type Props = {
  input: Object,
  meta: Object,
  As?: Function,
  label?: string | Function | Object,
};

const FormField = (props : Props) => {
  const {
    input, As, label, meta,
  } = props;
  const hasError = typeof meta.error === 'string' && meta.touched;

  return (
    <View>
      {typeof label === 'string' && <Text>{label}</Text>}
      {typeof label === 'function' && label()}
      {typeof label === 'object' && label}
      {hasError && <Text style={{ color: 'red' }}>{meta.error}</Text>}
      <As onChangeText={input.onChange} onBlur={input.onBlur} onFocus={input.onFocus} {...props} />
    </View>
  );
};
FormField.defaultProps = {
  As: TextInput,
  label: '',
};

export default FormField;
