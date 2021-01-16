import React from 'react';
import { useField, useFormikContext } from 'formik';
import { FormField, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = (props: any): JSX.Element => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    // '!!' para convertir meta.error en un boolean
    <FormField error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => setFieldValue(field.name, value)}
        placeholderText={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export { DateInput };
