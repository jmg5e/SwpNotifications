import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/InputField';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  // name: Yup.string().nullable().notRequired(),
});

type Props = {
  connectToHub: Function,
};

const ConnectForm = (props: Props) => (
  <Formik
    initialValues={{ name: '' }}
    validationSchema={validationSchema}
    onSubmit={({ name }) => props.connectToHub(name)}
    render={({ handleSubmit, isValid }) => (
      <KeyboardAvoidingView behaviour="padding">
        <View style={{ margin: 50 }}>
          <Field name="name" label="Name" component={InputField} />
          <Button
            onPress={handleSubmit}
            title="Connect"
            disabled={!isValid}
            raised
            containerStyle={{ marginVertical: 50 }}
          />
        </View>
      </KeyboardAvoidingView>
    )}
  />
);

export default ConnectForm;
