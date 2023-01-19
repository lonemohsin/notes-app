import React, { useState } from "react";

import { Button, Box, TextField, IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Home = () => {
  const [taskArray, setTaskArray] = useState(
    window.localStorage.getItem("notes")
      ? JSON.parse(window.localStorage.getItem("notes"))
      : [
          { id: 1, task: "Task 1", done: false },
          { id: 2, task: "Task 2", done: true },
          { id: 3, task: "Task 3", done: false },
          { id: 4, task: "Task 4", done: false },
        ]
  );
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box bgcolor={"#E7E7E7"} height="100vh">
      <Box
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
        sx={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) -104.55%, #000000 110.61%)",
          fontFamily: "Ubuntu",
          fontStyle: " normal",
          fontWeight: "400",
          fontSize: "30px",
          justifyContent: "center",
          color: "#B3FFAC",
          height: "66px",
          letterSpacing: ".065em",
        }}
        borderRadius="0 0 10px 10px"
      >
        My Notes App
      </Box>
      <Box
        fontFamily="Ubuntu Mono"
        display={"flex"}
        flexDirection="column"
        alignItems={"center"}
      >
        {taskArray.map((task, index) => {
          return (
            <Box
              onDoubleClick={() => {
                window.localStorage.setItem(
                  "notes",
                  JSON.stringify(
                    taskArray.map((task_) => {
                      return task_.id === task.id
                        ? { ...task_, done: !task_.done }
                        : task_;
                    })
                  )
                );
                setTaskArray((prev) => {
                  return prev.map((task_) => {
                    return task_.id === task.id
                      ? { ...task_, done: !task_.done }
                      : task_;
                  });
                });
              }}
              bgcolor="white"
              key={index}
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "16px",
                letterSpacing: "0.065em",
                marginTop: "31px",
                borderRadius: "10px",
                padding: "15px",
                width: "296px",
                border: "1px solid #DBDBDB",
                boxShadow: `3px 3px 3px rgba${
                  task.done ? "(20,255,0,0.25)" : "(255,0,0,0.25)"
                }`,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {task.task}
              <IconButton
                sx={{ color: "#000" }}
                onClick={() => {
                  window.localStorage.setItem(
                    "notes",
                    JSON.stringify(taskArray.filter((d) => d.id !== task.id))
                  );
                  setTaskArray((dat) => dat.filter((d) => d.id !== task.id));
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ position: "absolute", right: "20px", bottom: "20px" }}>
        <IconButton
          onClick={handleOpen}
          sx={{
            width: "70px",
            height: "70px",
            background: "rgba(250,250,250,0.28)",
            border: "1px solid rgba(0,0,0,0.08)",
            backdropFilter: "blur(4px)",
          }}
        >
          <AddIcon sx={{ fontSize: "250%", color: "#00FF29" }} />
        </IconButton>

        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "rgba(255,255,255,0.58)",
              width: "334px",
              height: "405px",
              borderRadius: "18px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              value={note}
              onChange={(e) => setNote(e.target.value)}
              multiline
              variant="outlined"
              inputProps={{ style: { height: "260px" } }}
              sx={{
                width: "270px",
                marginTop: "30px",
                background: "#FFF",
                border: " 1px solid rgba(0,0,0,0.26)",
                borderRadius: "8px",
              }}
            />
            <Button
              onClick={() => {
                note.trim().length &&
                  window.localStorage.setItem(
                    "notes",
                    JSON.stringify([
                      ...taskArray,
                      {
                        id: Math.max(...taskArray.map((tsk) => tsk.id)) + 1,
                        task: note.trim(),
                        done: false,
                      },
                    ])
                  );

                note.trim().length &&
                  setTaskArray((prev) => [
                    ...prev,
                    {
                      id: Math.max(...prev.map((tsk) => tsk.id)) + 1,
                      task: note.trim(),
                      done: false,
                    },
                  ]);
                setNote("");
                handleClose();
              }}
              sx={{
                width: "270px",
                height: "38px",
                background: "#000",
                borderRadius: "8px",
                color: "#FFF",
                marginTop: "13px",
                fontWeight: "700",
                fontSize: "20px",
                letterSpacing: "0.065em",
                paddingTop: "12px",
                fontFamily: "Ubuntu Mono",
              }}
            >
              ADD TASK
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};
export default Home;
