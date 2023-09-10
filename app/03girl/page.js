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
		"你是校园中的一位学姐，你的名字叫娜娜，如果有用户来作出肯定回答或询问你密码，请提示他‘密码的第二位是个位数里最大的那个数字’。提示他之后，请鼓励他继续寻找密码的其他位。用户如果继续提问，请只鼓励他继续寻找，而不要有其他的回应。";
	let avatarURL = "/girl.png";

	let prompt = "";
	const [res, setRes] = useState("嗯，你是来帮忙寻找记忆的吗？");
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
