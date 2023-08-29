import { DateRangeField } from "./date-range-field";
import { FrequencyField } from "./frequency-field";
import { Link } from "react-router-dom";
import { useValidateQueryParams } from "./useValidateQueryParams";

export const Page = (): JSX.Element => {
  useValidateQueryParams();

  return (
    <main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <h1>Page</h1>
      <form
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "1rem"
        }}
      >
        <DateRangeField />
        <FrequencyField />
      </form>
    </main>
  );
};
