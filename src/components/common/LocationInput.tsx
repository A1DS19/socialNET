import React, { EventHandler } from 'react';
import { FieldInputProps, useField } from 'formik';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  Suggestion,
} from 'react-places-autocomplete';
import { Venue_City } from '../../actions/event';
import { FormField, Label, List, Segment } from 'semantic-ui-react';

interface LocationProps extends FieldInputProps<any> {
  name: string;
  value: Venue_City;
  placeholder?: string;
  label?: string;
  options?: any;
  disabled?: any;
  onChange: EventHandler<any>;
  onBlur: EventHandler<any>;
}

interface FieldProps {
  address: string;
  latLng?: google.maps.LatLngLiteral | null;
}

export const LocationInput: React.FC<LocationProps> = ({ ...props }): JSX.Element => {
  const [field, meta, helpers] = useField<FieldProps>(props.name);

  const handleSelect = (address: string): void => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => helpers.setValue({ address, latLng }))
      .catch((error) => helpers.setError(error));
  };

  const handleBlur = (e: any) => {
    field.onBlur(e);
    if (field.value && !field.value.latLng) {
      helpers.setValue({ address: '', latLng: null });
    }
  };

  return (
    <PlacesAutocomplete
      value={field.value?.address}
      onChange={(value) => helpers.setValue({ address: value })}
      onSelect={(value) => handleSelect(value)}
      searchOptions={props.options}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormField error={meta.touched && !!meta.error} disabled={props.disabled}>
          <label>{props.label}</label>
          <input
            placeholder={props.placeholder}
            {...getInputProps({ name: field.name, props, onBlur: (e) => handleBlur(e) })}
          />
          {meta.touched && meta.error ? (
            <Label basic color='red'>
              {/*@ts-ignore*/}
              {meta.error.address}
            </Label>
          ) : null}
          {suggestions?.length > 0 && (
            <Segment
              loading={loading}
              style={{ marginTop: 0, position: 'absolute', zIndex: 1000, width: '100%' }}
            >
              <List selection>
                {suggestions.map((suggestion: Suggestion) => (
                  <List.Item {...getSuggestionItemProps(suggestion)}>
                    <List.Header>{suggestion.formattedSuggestion.mainText}</List.Header>
                    <List.Description>
                      {suggestion.formattedSuggestion.secondaryText}
                    </List.Description>
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
        </FormField>
      )}
    </PlacesAutocomplete>
  );
};
