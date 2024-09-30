import "./App.css";
import { Calendar, Tag } from "antd";
import type { Dayjs } from "dayjs";
import schedule from "./schedule.json";

const cellRender = (value: Dayjs) => {
  const date = schedule.dates.find(
    ({ date }) => date === value.format("YYYY-MM-DD")
  );

  if (!date) return null;

  return (
    <div>
      IT Breakfast
      <div>
        {date.tags.map((tag) => (
          <Tag
            key={tag}
            color={tag === "online" ? "green" : "gold"}>
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Calendar cellRender={cellRender} />
    </>
  );
}

export default App;
