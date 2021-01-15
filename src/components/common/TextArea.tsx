import React, { EventHandler } from 'react';
import { FieldInputProps, useField } from 'formik';
import { FormField, Label } from 'semantic-ui-react';

export interface TextAreaInputProps extends FieldInputProps<''> {
  label?: string;
  placeholder?: string;
  rows?: number;
  value: any;
  onChange: EventHandler<any>;
  onBlur: EventHandler<any>;
}

//Arreglar types
const TextArea = (props: TextAreaInputProps): JSX.Element => {
  const [field, meta] = useField(props);

  return (
    // '!!' para convertir meta.error en un boolean
    <FormField error={meta.touched && !!meta.error}>
      <label>
        {props.label}
        <textarea {...field} {...props} />
      </label>
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export { TextArea };
