import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { tourTimeParser, tourTimeParserToArr } from "utilities/tourTime";
import { Form, Row, Col } from "react-bootstrap";
const animatedComponents = makeAnimated();

const dayOptions = [
  { value: "t2", label: "Thứ 2" },
  { value: "t3", label: "Thứ 3" },
  { value: "t4", label: "Thứ 4" },
  { value: "t5", label: "Thứ 5" },
  { value: "t6", label: "Thứ 6" },
  { value: "t7", label: "Thứ 7" },
  { value: "cn", label: "Chủ nhật" },
];

const typeOptions = [
  { value: "daily", label: "Hàng ngày" },
  { value: "weekly", label: "Hàng tuần" },
  // { value: "monthly", label: "Hàng tháng" },
];

const StatTimePicker = ({ tourData, setTourData }) => {
  const [startTime, setStartTime] = React.useState(
    tourTimeParserToArr(tourData.startTime, tourData.scheduleType)
  );
  const [scheduleType, setScheduleType] = React.useState(tourData.scheduleType);

  return (
    <>
      <Form.Group controlId="scheduleType" className="mb-3">
        <Form.Label>Loại lịch trình</Form.Label>
        <Select
          options={typeOptions}
          components={animatedComponents}
          value={typeOptions.find((item) => item.value === scheduleType)}
          onChange={(value) => {
            setScheduleType(value.value);
            //setTourData({ ...tourData, scheduleType: value.value });
            if (value.value === "daily") {
              setStartTime({ hour: "7:00", day: "t2" });
              setTourData({
                ...tourData,
                startTime: `7:00 t2`,
                scheduleType: value.value,
              });
            } else if (value.value === "weekly") {
              setStartTime([]);
              setTourData({
                ...tourData,
                startTime: [],
                scheduleType: value.value,
              });
            }
          }}
        />
      </Form.Group>
      <Form.Group controlId="startTime" className="mb-3">
        <Form.Label>Thời Gian Tour</Form.Label>
        {scheduleType === "daily" ? (
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="startTimeHour"
                value={startTime.hour}
                onChange={(e) => {
                  setStartTime({ ...startTime, hour: e.target.value });
                  setTourData({
                    ...tourData,
                    startTime: `${e.target.value} ${startTime.day}`,
                  });
                }}
                required
              />
            </Col>
            <Col>
              <Select
                options={dayOptions}
                components={animatedComponents}
                value={dayOptions.find((item) => item.value === startTime.day)}
                onChange={(value) => {
                  setStartTime({ ...startTime, day: value.value });
                  setTourData({
                    ...tourData,
                    startTime: `${startTime.hour} ${value.value}`,
                  });
                }}
              />
            </Col>
          </Row>
        ) : (
          <Select
            isMulti
            options={dayOptions}
            value={dayOptions.filter((item) => startTime.includes(item.value))}
            closeMenuOnSelect={false}
            components={animatedComponents}
            onChange={(value) => {
              setStartTime(value.map((item) => item.value));
              setTourData({
                ...tourData,
                startTime: value.map((item) => item.value),
              });
            }}
          />
        )}
      </Form.Group>
    </>
  );
};

export default StatTimePicker;
