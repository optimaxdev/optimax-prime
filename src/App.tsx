import "./App.css";
import { Calendar, Flex, Image, Tag, Typography } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import schedule from "./schedule.json";
import avatar from "./assets/optimax-prime-avatar.jpeg";

dayjs.extend(utc);
dayjs.extend(timezone);

interface ScheduleDate {
  date: string;
  time: string;
  timezone: string;
  tags: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cellRender = (value: any) => {
  const date = schedule.dates.find(
    (d: ScheduleDate) => d.date === value.format("YYYY-MM-DD")
  );

  if (!date || !date.time || !date.timezone) return null;

  // Parse the time in the schedule's timezone and convert to user's local timezone
  const meetingTime = dayjs.tz(
    `${date.date} ${date.time}`,
    "YYYY-MM-DD HH:mm",
    date.timezone
  );
  const localTime = meetingTime.local().format("HH:mm");
  const userTimezone = dayjs.tz.guess();

  return (
    <div>
      <div>IT Evening</div>
      <div>{localTime} ({userTimezone})</div>
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
