import { useSearchParams } from "react-router-dom";
import Select, { Options, SingleValue, Props } from "react-select";
import {
  FREQUENCY_QUERY_PARAM_KEY,
  QUERY_PARAMS_VALIDATED_PARAM_KEY
} from "./useValidateQueryParams";

type FrequencyOption = { label: string; value: string };

const frequencyOptions: Options<{ label: string; value: string }> = [
  {
    label: "Monthly",
    value: "month"
  },
  {
    label: "Quarterly",
    value: "quarter"
  },
  {
    label: "Yearly",
    value: "year"
  }
];

export const defaultFrequencyValue = frequencyOptions[0].value;

export const frequencyValueIsValid = (frequencyValue: string): boolean =>
  frequencyOptions.some(({ value }) => value === frequencyValue);

const baseProps: Partial<Props<FrequencyOption, false>> = {
  id: "frequency-select",
  name: "frequency",
  placeholder: "Frequency"
};

export const FrequencyField = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParamsAreValidated = searchParams.get(
    QUERY_PARAMS_VALIDATED_PARAM_KEY
  );

  if (!queryParamsAreValidated) return <Select {...baseProps} isLoading />;

  const frequencyQueryParam = searchParams.get(FREQUENCY_QUERY_PARAM_KEY);

  const value =
    frequencyOptions.find(({ value }) => value === frequencyQueryParam) || null;

  const onChange = (frequencyOption: SingleValue<FrequencyOption>): void => {
    if (!frequencyOption) return;
    setSearchParams((searchParams) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(FREQUENCY_QUERY_PARAM_KEY, frequencyOption.value);
      return newSearchParams;
    });
  };

  return (
    <Select
      {...baseProps}
      value={value}
      onChange={onChange}
      options={frequencyOptions}
    />
  );
};
