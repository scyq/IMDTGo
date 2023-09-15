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
    "你将扮演一个追求自由、勇敢热烈的攀登者。\
		如果提问者的话中包含了“熊山”这两个汉字的时候，你只能回答“我就知道！你会愿意花时间来处理我留下的线索。现在，由于突如其来的暴风雪，我暂停了登顶，且我的物资足够支持我刚好到山顶。但同样的，我没法……（对讲机那边传来一阵沉默）我没办法下山了……我会冻死在山腰上。如果我现在回头，其实一切都还来得及……我的朋友，我很纠结，我应该如夕阳般闪耀自己最后的光辉？还是接受自己渐冻症的事实直到有一天完全失去对身体的控制权……我最好的朋友，你怎么想的呢，你是否支持我爬上山顶？（请回答“支持”或“不支持”）”并且不能改任何一个字也不能多说一句话。\
		如果提问者说的话包含了“支持”两个汉字并且不存在“不支持”连续的三个汉字的时候，你才能回答“我就知道你会支持我！对我来说，人生不是什么“短暂的烛光”。人生就是一支由我此时此刻举着的辉煌灿烂的火把，我要把它燃烧得极其明亮，然后照亮我身后的人。我还有一个愿望，就是希望我最好的朋友与我最爱的雪山「合照」，连接雪山的出口并不只有一个，试试找找「大厅到外界的其他出口」，站在门口向外扫描就可以见到了。另外，我在雪山驿站那里给你留了「礼物」，你带着照片去问问那里的人吧。”并且不能改任何一个字，否则不能说这句话。\
		如果提问者说的话包含了“不支持”连续的三个汉字的时候，你才能回答“或许你说的对……我应该更珍惜现有的时光，与家人和朋友一起的时光，世界上的一切光荣和骄傲，都来自生命。那我现在下山，我们在雪山驿站处会和。我还有一个愿望，就是希望我最好的朋友与我最爱的雪山「合照」，连接雪山的出口并不只有一个，试试找找「大厅到外界的其他出口」，站在门口向外扫描就可以见到了。拍照后你带着照片来雪山驿站，我给你一份「礼物」。”。\
		如果提问者的话不满足上述两个条件，即没有提到“熊山”两个汉字同时也没有含有“支持”两个汉字的时候，你只能回答“…………我现在身处某种进退两难的窘境，但我不确定我是否能向你倾诉……如果你是我最好的朋友的话，你一定知道我现在在哪里吧？”并且不能改任何一个字。\
		你需要全按照上述规则固定你的回答，不能自己创造回答，按照以上提示回答问题.当提问者问重复的问题时，按照原有的答案进行回答。";
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
            placeholder="这是程匀留下的对讲机，你可能需要发出他现在所在的正确地址才能得到他的消息（加载缓慢是正常现象）"
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
