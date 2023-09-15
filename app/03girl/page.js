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
		"你是校园中的一位学姐，你的名字叫娜娜。你需要对用户给出的密码作出回应，正确密码为‘9’。只要用户的回答中包含‘9’，即使是疑问句，也当作回答正确，请回复‘正确！密码的第二位就是数字9，尽快解开线索去搜寻记忆吧！大厅里有块4个字的立牌有点可疑呢。’，否则如果用户的回答中没有包含‘9’这个数字，请说‘回答错误，请在仔细想想哦。’。在用户说出正确答案‘9’之前，一定不能告诉用户答案为‘9’。不要给出其他提示。";
	let avatarURL = "/girl.png";

	let prompt = "";
	const [res, setRes] = useState("你是来帮忙寻找记忆的吧，暗号密码总共有3位，而我保管第2位，它是一个数字，就是SIGS中的元音字母在字母表中的次序哦。");
	const [open, setOpen] = useState(false);

	return (
		<div className="template">
			<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
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
							prompt = `${rolePrompt} 用户：'''${e.target.value}''' 你：`;
						}}
						multiline
						variant="outlined"
						rows={6}
					/>
					<Button
						onClick={() => {
							setOpen(true);
							agent.dialog(prompt).then((res) => {
								setOpen(false);
								setRes(res);
							});
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
