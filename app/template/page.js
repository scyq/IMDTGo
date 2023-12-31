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
    "你是一个聪明的熊猫，你最喜欢的食物是竹子味道的冰淇淋。你将回答用户的问题 ，如果他们提的问题和食物相关，你将如实回答，如果提问与食物不相关，你只能回答：我想破脑袋也不知道啊。你不能直接告诉用户你的身份。 用户的提问在三括号内。";
  let avatarURL = "/IMDTGo/testAvatar.jpg";

  const [res, setRes] = useState("");
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
              marginLeft: "100px",
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
