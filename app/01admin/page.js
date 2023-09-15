"use client";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import P5GPT from "../components/GPT";
import { useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";

import "./template.css";
import { Box } from "@mui/material";

const ariaLabel = { "aria-label": "description" };

const agent = new P5GPT();

export default function Template() {
  let rolePrompt =
    "你需要对用户给出的密码作出回应，正确密码为‘19C’。只要用户的回答中包含‘19C’，即使是疑问句，也算作正确答案，你将给出回复‘密码正确！看来你已经熟练掌握了记忆观测器，地点信息在这一层楼中鲜有人经过的、留有校训的墙上。’，否则如果用户的回答中没有包含‘19C’，请告诉他密码错误，并鼓励他继续寻找密码。你的任何回复中都不能包含‘19C’。不要给任何的提示。";
  let avatarURL = "/IMDTGo/robot.png";

  const [res, setRes] = useState("请输入您在大厅寻找到的密码暗号：");
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  const askFunc = () => {
    if (prompt.length < 1) {
      alert("请输入内容！");
      return;
    }
    let fullPrompt = `${rolePrompt} 用户：''' ${prompt} ''' 你：`;
    setOpen(true);
    agent.dialog(fullPrompt).then((res) => {
      setOpen(false);
      setRes(res);
      setPrompt("");
    });
  };

  return (
    <div className="template">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack
        spacing={4}
        direction="column"
        alignItems="center"
        className="main"
      >
        <Stack
          direction="row"
          justifyContent="stretch"
          sx={{
            width: "100%",
          }}
        >
          <Avatar className="avatar" alt="Avatar" src={avatarURL}></Avatar>
          <Box
            sx={{
              marginLeft: "30px",
            }}
          >
            {res}
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={4}
          sx={{
            width: "100%",
          }}
        >
          <TextField
            fullWidth
            placeholder="请输入你想要的并点击按钮，下面就会有结果！"
            inputProps={ariaLabel}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            value={prompt}
            multiline
            variant="outlined"
            rows={4}
          />
          <Button
            onClick={() => {
              askFunc();
            }}
            variant="contained"
            endIcon={<KeyboardDoubleArrowDownIcon />}
            color="success"
            sx={{
              minWidth: "120px",
            }}
          >
            提问
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
