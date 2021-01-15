import React, { EventHandler } from 'react';
import { FieldInputProps, useField } from 'formik';
import { DropdownItemProps, FormField, Label, Select } from 'semantic-ui-react';

export interface SelectInputProps extends FieldInputProps<''> {
  label?: string;
  placeholder?: string;
  value: any;
  onChange: EventHandler<any>;
  onBlur: EventHandler<any>;
  options: DropdownItemProps[];
}

const SelectInput = (props: SelectInputProps): JSX.Element => {
  const [field, meta, helpers] = useField(props);

  return (
    // '!!' para convertir meta.error en un boolean
    <FormField error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        placeholder={props.placeholder}
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        options={props.options}
      />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export { SelectInput };
