import React from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, Modal, Row, message } from "antd";
import { AddTaskuser, updatetask } from "../../api/users";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";


function Taskform({
  showtask,
  setShowtask,
  selectedtask,
  setSelectedtask,
  formtype,
  getData
}) {
  const { user } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(selectedtask){
    selectedtask.date= moment(selectedtask.date).format("YYYY-MM-DD");
  }

  const onFinish = async (values) => {  
try{
    let response = null;
    if (formtype === "add") {
        response = await AddTaskuser({
          ...values,
          user:user._id
        });
      } else {

        response = await updatetask(
          {
            ...values,
            taskId: selectedtask._id
          }
          
          );
      }
      if (response.success) {
        message.success(response.message);
        getData();
        setShowtask(false);
      } else {
        message.error(response.message);
      }
}catch{

}
  }

  return (
    <div>
      <Modal
        title={formtype === "add" ? "Add Task" : "Edit Task"}
        open={showtask}
        onCancel={() => {
          setShowtask(false);
          setSelectedtask(null);
        }}
        footer={null}
        
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={selectedtask}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Task Name" name="title">
                <input className="w-100" type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Task Description" name="description">
                <textarea className="w-100 p-2" type="text" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Date" name="date">
                <input className="w-80" type="date" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Priority" name="priority">
                <select className="">
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
                </select>
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex justify-content-end gap-3">
            <Button
              type="primary"
              danger
              ghost
              onClick={() => {
                setShowtask(false);
                setSelectedtask(null);
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" success>
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Taskform;
