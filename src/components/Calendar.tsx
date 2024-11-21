import React, { useEffect, useState } from "react";
import {
  Calendar as AntCalendar,
  Badge,
  Modal,
  Button,
  CalendarProps,
} from "antd";
import { Dayjs } from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import EventForm from "./EventForm";
import { getEvents } from "../services/api";
import "./styles/Calendar.less";

type BadgeStatus = "success" | "processing" | "default" | "error" | "warning";

interface Event {
  id: string;
  title: string;
  date: string; // Format: 'YYYY-MM-DD'
  type?: BadgeStatus;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const dateCellRender: CalendarProps<Dayjs>["cellRender"] = (value) => {
    const dateString = value.format("YYYY-MM-DD");
    const dateEvents = events.filter((event) => event.date === dateString);
    return (
      <ul className='events'>
        {dateEvents.map((event) => (
          <li key={event.id}>
            <Badge status={event.type || "default"} text={event.title} />
          </li>
        ))}
      </ul>
    );
  };

  const onSelect: CalendarProps<Dayjs>["onSelect"] = (value, _) => {
    setSelectedDate(value.format("YYYY-MM-DD"));
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    fetchEvents();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className='calendar-header'>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedDate("");
            setIsModalVisible(true);
          }}
          className='add-event-button'
        >
          Add Event
        </Button>
      </div>
      <AntCalendar cellRender={dateCellRender} onSelect={onSelect} />
      <Modal
        title='Add Event'
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <EventForm
          selectedDate={selectedDate}
          onSuccess={handleOk}
          onCancel={handleCancel}
        />
      </Modal>
    </>
  );
};

export default Calendar;
