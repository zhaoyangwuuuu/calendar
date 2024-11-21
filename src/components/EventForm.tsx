import React, { useEffect } from "react";
import { Form, Input, DatePicker, TimePicker, Button } from "antd";
import dayjs from "dayjs";
import { createEvent } from "../services/api";
import "./styles/EventForm.less";

interface EventFormProps {
  selectedDate?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  selectedDate,
  onSuccess,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedDate) {
      form.setFieldsValue({ date: dayjs(selectedDate) });
    }
  }, [selectedDate, form]);

  const onFinish = async (values: any) => {
    try {
      const eventData = {
        title: values.title,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm"),
        description: values.description,
      };
      await createEvent(eventData);
      onSuccess();
      form.resetFields();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      className='event-form'
    >
      <Form.Item
        name='title'
        label='Event Title'
        rules={[{ required: true, message: "Please enter the event title" }]}
        className='form-item'
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='date'
        label='Date'
        rules={[{ required: true, message: "Please select the date" }]}
        className='form-item'
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name='time'
        label='Time'
        rules={[{ required: true, message: "Please select the time" }]}
        className='form-item'
      >
        <TimePicker format='HH:mm' />
      </Form.Item>
      <Form.Item name='description' label='Description' className='form-item'>
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item className='form-buttons'>
        <Button type='primary' htmlType='submit' className='save-button'>
          Save
        </Button>
        <Button onClick={onCancel} className='cancel-button'>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
