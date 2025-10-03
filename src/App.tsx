import "./App.css";
import { Calendar, Flex, Image, Tag, Typography } from "antd";
import type { Dayjs } from "dayjs";
import schedule from "./schedule.json";
import avatar from "./assets/optimax-prime-avatar.jpeg";

const cellRender = (value: Dayjs) => {
  const date = schedule.dates.find(
    ({ date }) => date === value.format("YYYY-MM-DD")
  );

  if (!date) return null;

  return (
    <div>
      IT Evening
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
      <Flex
        align="flex-start"
        vertical>
        <Flex align="center">
          <Image
            src={avatar}
            width={50}
          />
          <Typography.Title>Optimax Prime Breakfast</Typography.Title>
        </Flex>
        <Typography.Link
          href="https://telemost.yandex.ru/j/16929976559513"
          target="_blank">
          Ссылка для подключения онлайн
        </Typography.Link>
      </Flex>

      <Calendar cellRender={cellRender} />
    </>
  );
}

export default App;
