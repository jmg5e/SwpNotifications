import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  Button,
} from 'react-native-elements';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import InputField from '../../../components/InputField';

const validationSchema = Yup.object().shape({
  server: Yup.string()
    .url('Invalid Url')
    .required('Required'),
});

type Props = {
  saveSettings: Function,
  goBack: Function,
  settings: {
    server: string,
  },
};

const SettingsForm = (props: Props) => (
  <Formik
    initialValues={{ ...props.settings }}
    validationSchema={validationSchema}
    onSubmit={props.saveSettings}
    render={({
      handleSubmit,
    }) => (
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView style={{ flex: 1, marginTop: 20 }} contentContainerStyle={{ alignItems: 'center' }}>
          <Field name="server" label="Server Url" component={InputField} />
        </ScrollView>
        <Button
          title="Cancel"
          onPress={props.goBack}
          buttonStyle={{ margin: 5 }}
        />
        <Button
          title="Save"
          onPress={handleSubmit}
          buttonStyle={{ margin: 5 }}
        />
      </View>
    )}
  />
);

export default SettingsForm;
