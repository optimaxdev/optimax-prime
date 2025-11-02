import "./App.css";
import { Calendar, Card, Flex, Image, List, Tag, Typography, Button } from "antd";
import { CalendarOutlined, UnorderedListOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import schedule from "./schedule.json";
import avatar from "./assets/optimax-prime-avatar.jpeg";
import { useState, useEffect } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

interface ScheduleDate {
  date: string;
  time: string;
  timezone: string;
  tags: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cellRender = (value: any, isMobile: boolean) => {
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

  if (isMobile) {
    // Simplified mobile view - just a colored dot
    return (
      <div className="mobile-event-indicator">
        <div className="event-dot" />
      </div>
    );
  }

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
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Default to list view on mobile
      if (window.innerWidth < 768) {
        setViewMode("list");
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get upcoming events sorted by date
  const upcomingEvents = schedule.dates
    .map((date: ScheduleDate) => {
      const meetingTime = dayjs.tz(
        `${date.date} ${date.time}`,
        "YYYY-MM-DD HH:mm",
        date.timezone
      );
      return {
        ...date,
        localTime: meetingTime.local(),
        displayDate: meetingTime.local().format("DD MMMM YYYY"),
        displayTime: meetingTime.local().format("HH:mm"),
        userTimezone: dayjs.tz.guess(),
      };
    })
    .filter((event) => event.localTime.isAfter(dayjs().subtract(1, 'day')))
    .sort((a, b) => a.localTime.diff(b.localTime));

  return (
    <div className="app-container">
      <Flex
        align="flex-start"
        vertical
        className="header-section">
        <Flex align="center" gap="small">
          <Image
            src={avatar}
            width={isMobile ? 40 : 50}
            preview={false}
          />
          <Typography.Title level={isMobile ? 3 : 1} style={{ margin: 0 }}>
            Optimax Prime Breakfast
          </Typography.Title>
        </Flex>
        <Typography.Link
          href="https://telemost.yandex.ru/j/16929976559513"
          target="_blank"
          className="meeting-link">
          Ссылка для подключения онлайн
        </Typography.Link>
      </Flex>

      {isMobile && (
        <Flex gap="small" justify="center" style={{ marginBottom: 16 }}>
          <Button
            type={viewMode === "list" ? "primary" : "default"}
            icon={<UnorderedListOutlined />}
            onClick={() => setViewMode("list")}>
            Список
          </Button>
          <Button
            type={viewMode === "calendar" ? "primary" : "default"}
            icon={<CalendarOutlined />}
            onClick={() => setViewMode("calendar")}>
            Календарь
          </Button>
        </Flex>
      )}

      {isMobile && viewMode === "list" ? (
        <div className="events-list">
          <Typography.Title level={4}>Предстоящие встречи</Typography.Title>
          <List
            dataSource={upcomingEvents}
            renderItem={(event) => (
              <Card
                key={event.date}
                className="event-card"
                size="small">
                <Flex vertical gap="small">
                  <Typography.Text strong className="event-title">
                    IT Evening
                  </Typography.Text>
                  <Typography.Text type="secondary">
                    📅 {event.displayDate}
                  </Typography.Text>
                  <Typography.Text type="secondary">
                    🕐 {event.displayTime} ({event.userTimezone})
                  </Typography.Text>
                  <Flex gap="small" wrap>
                    {event.tags.map((tag) => (
                      <Tag
                        key={tag}
                        color={tag === "online" ? "green" : "gold"}>
                        {tag}
                      </Tag>
                    ))}
                  </Flex>
                </Flex>
              </Card>
            )}
          />
        </div>
      ) : (
        <Calendar cellRender={(value) => cellRender(value, isMobile)} />
      )}
    </div>
  );
}

export default App;
