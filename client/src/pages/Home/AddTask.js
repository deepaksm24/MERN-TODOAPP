import React, { useEffect } from "react";
import moment from "moment";
import { Table, message, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { pink, green, red } from "@mui/material/colors";
import Taskform from "./Taskform";
import { GetAlltask, deletetask, updatetask } from "../../api/users";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import PendingIcon from "@mui/icons-material/Pending";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Tooltip } from "antd";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

function AddTask() {
  const [task, setTask] = React.useState([]);
  const [showtask, setShowtask] = React.useState(false);
  const [selectedtask, setSelectedtask] = React.useState(null);
  const [formtype, setFormtype] = React.useState("add");

  const disptach = useDispatch();

  const getData = async () => {
    try {
      const response = await GetAlltask();
      if (response.success) {
        setTask(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {}
  };
  const handleDelete = async (taskId) => {
    try {
      const response = await deletetask({ taskId });
      if (response.success) {
        message.success("Deleted");
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {}
  };

  const handleComplete = async (values, detail) => {
    let valuesadd = {};
    if (detail === 1) {
      valuesadd = { ...values, completed: "yes" };
    } else {
      valuesadd = { ...values, completed: "no" };
    }
    try {
      let response = null;

      response = await updatetask({
        ...valuesadd,
        taskId: valuesadd._id,
      });

      if (response.success) {
        message.success("Updated");
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {}
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Priority",
      dataIndex: "priority",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => {
        return moment(record.date).format("DD-MM-YYYY");
      },
    },
    {
      title: "Status",
      dataIndex: "completed",
      render: (text, record) => {
        return (
          <div className="d-flex gap-2">
            {record.completed == "no" ? (
              <div>
                <PendingIcon 
                sx={{ color: red[500] }}
                fontSize="large"
                />
               {" "} Pending
              </div>
            ) : (
              <div>
                <VerifiedIcon 
                sx={{ color: green[500] }}
                fontSize="large"
                />
                {" "} Done
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="d-flex gap-2">
            <Tooltip title="Edit Task" color={"purple"}>
              <EditNoteSharpIcon
                className="cursor-pointer"
                onClick={() => {
                  setSelectedtask(record);
                  setFormtype("edit");
                  setShowtask(true);
                }}
              />
            </Tooltip>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => {
                handleDelete(record._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete Task" color={"red"} placement="bottom">
                <DeleteSharpIcon
                  sx={{ color: pink[500] }}
                  className="cursor-pointer"
                  // onClick={() => {
                  //   handleDelete(record._id)

                  // }}
                />
              </Tooltip>
            </Popconfirm>
            {record.completed == "no" ? (
              <Popconfirm
                title="Completed the task"
                description="Are you sure completed this task?"
                onConfirm={() => {
                  handleComplete(record, 1);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip
                  title="Click to Complete Task"
                  color={"green"}
                  placement="bottom"
                >
                  <DoneOutlineIcon
                    sx={{ color: green[500] }}
                    className="cursor-pointer"
                  />
                </Tooltip>
              </Popconfirm>
            ) : (
              <Popconfirm
                title="Revoke the task"
                description="Are you sure make this task incomplete?"
                onConfirm={() => {
                  handleComplete(record, 2);
                }}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip
                  title="Click to Revoke task"
                  color={"orange"}
                  placement="bottom"
                >
                  <DoNotDisturbOnIcon
                    sx={{ color: red[500] }}
                    className="cursor-pointer"
                  />
                </Tooltip>
              </Popconfirm>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-end p-3">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            setShowtask(true);
            setFormtype("add");
          }}
        >
          <AddTaskIcon sx={{ color: green[500] }} /> Add Task
        </button>
      </div>

      <Table columns={columns} dataSource={task} className="border rounded" />

      {showtask && (
        <Taskform
          showtask={showtask}
          setShowtask={setShowtask}
          selectedtask={selectedtask}
          setSelectedtask={setSelectedtask}
          formtype={formtype}
          getData={getData}
        />
      )}
    </div>
  );
}

export default AddTask;
