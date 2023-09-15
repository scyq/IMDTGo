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
    "你是校园中的一位学长，你的名字叫Cauchy。你需要对用户给出的密码作出回应，正确密码为‘C’。只要用户的回答中包含‘C’，即使是疑问句，也当作回答正确，请回复‘YES！密码的最后一位就是字母C，接下来去找找大厅里最高的桌子吧！’，否则如果用户的回答中没有包含‘C’，请说‘回答错误，好好想想海的英文发音吧。’。在用户说出正确答案‘C’之前，一定不能告诉用户答案为‘C’。不要给出其他提示。";
  let avatarURL = "/IMDTGo/boy1.png";

  const [res, setRes] = useState(
    "我保管的第3位也是最后一位密码，它是一个字母，而这个字母和海洋的英文读音一样。"
  );
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
        sx={{
          width: 800,
          maxWidth: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="stretch"
          sx={{
            width: "100%",
          }}
        >
          <Avatar
            sx={{
              width: "10vw",
              height: "10vw",
            }}
            alt="Avatar"
            src={avatarURL}
          ></Avatar>
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
            rows={6}
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
