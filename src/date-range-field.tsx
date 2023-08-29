import { useSearchParams } from "react-router-dom";
import Select, { Options, Props, SingleValue } from "react-select";
import { QUERY_PARAMS_VALIDATED_PARAM_KEY } from "./useValidateQueryParams";

type DateRangeOption = { label: string; value: string };

const dateRangeOptions: Options<{ label: string; value: string }> = [
  {
    label: "All time",
    value: "all-time"
  },
  {
    label: "Last month",
    value: "last-month"
  },
  {
    label: "Last year",
    value: "last-year"
  }
];

export const defaultDateRangeValue = dateRangeOptions[0].value;

export const dateRangeValueIsValid = (dateRangeValue: string): boolean =>
  dateRangeOptions.some(({ value }) => value === dateRangeValue);

const baseProps: Partial<Props<DateRangeOption, false>> = {
  id: "date-range-select",
  name: "date-range",
  placeholder: "Date range"
};

export const DateRangeField = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParamsAreValidated = searchParams.get(
    QUERY_PARAMS_VALIDATED_PARAM_KEY
  );

  if (!queryParamsAreValidated) return <Select {...baseProps} isLoading />;

  const dateRangeQueryParam = searchParams.get("date-range");

  const value =
    dateRangeOptions.find(({ value }) => value === dateRangeQueryParam) || null;

  const onChange = (dateRangeOption: SingleValue<DateRangeOption>): void => {
    if (!dateRangeOption) return;
    setSearchParams((searchParams) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("date-range", dateRangeOption.value);
      return newSearchParams;
    });
  };

  return (
    <Select
      {...baseProps}
      value={value}
      onChange={onChange}
      options={dateRangeOptions}
    />
  );
};
