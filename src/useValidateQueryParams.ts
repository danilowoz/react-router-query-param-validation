import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  defaultFrequencyValue,
  frequencyValueIsValid
} from "./frequency-field";
import {
  defaultDateRangeValue,
  dateRangeValueIsValid
} from "./date-range-field";

export const DATE_RANGE_QUERY_PARAM_KEY = "date-range";
export const FREQUENCY_QUERY_PARAM_KEY = "frequency";
export const QUERY_PARAMS_VALIDATED_PARAM_KEY = "v";

const QUERY_PARAMS_VALIDATED_PARAM_VALUE = "1";

export const useValidateQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dateRangeQueryParam = searchParams.get(DATE_RANGE_QUERY_PARAM_KEY);
  const frequencyQueryParam = searchParams.get(FREQUENCY_QUERY_PARAM_KEY);
  const queryParamsValidatedParam = searchParams.get(
    QUERY_PARAMS_VALIDATED_PARAM_KEY
  );

  useEffect(() => {
    if (queryParamsValidatedParam === QUERY_PARAMS_VALIDATED_PARAM_VALUE)
      return;
    setSearchParams((searchParams) => {
      const newParams = new URLSearchParams(searchParams);
      if (!dateRangeQueryParam || !dateRangeValueIsValid(dateRangeQueryParam)) {
        newParams.set(DATE_RANGE_QUERY_PARAM_KEY, defaultDateRangeValue);
      }
      if (!frequencyQueryParam || !frequencyValueIsValid(frequencyQueryParam)) {
        newParams.set(FREQUENCY_QUERY_PARAM_KEY, defaultFrequencyValue);
      }
      newParams.set(
        QUERY_PARAMS_VALIDATED_PARAM_KEY,
        QUERY_PARAMS_VALIDATED_PARAM_VALUE
      );
      return newParams;
    });
  }, [
    dateRangeQueryParam,
    frequencyQueryParam,
    queryParamsValidatedParam,
    setSearchParams
  ]);
};
