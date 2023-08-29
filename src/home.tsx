import { Link } from "react-router-dom";

export const Home = (): JSX.Element => (
  <main>
    <h1>Home</h1>
    <nav>
      <ul>
        <li>
          <Link to="page">Page (no params)</Link>
        </li>
        <li>
          <Link to="page?date-range=all-time">Page (valid all time)</Link>
        </li>
        <li>
          <Link to="page?date-range=asdf"> Page (invalid date range)</Link>
        </li>
      </ul>
    </nav>
  </main>
);
