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
		"你是希格斯回忆管理处的管理员，这个管理处保存着校园中的许多回忆。用户将会使用手中的记忆观测器去寻找密码来告诉你，你需要对用户给出的密码作出回应，如果用户给出正确密码‘19C’，你将给出回答‘看来你已经熟练掌握了记忆观测器，地点信息在这一层楼中鲜有人经过的、留有校训的墙上，找到地图并记住所有信息，希望你能尽可能多的将记忆搜集回来’，如果用户没有给出正确密码，请告诉他密码错误，并鼓励他继续寻找密码。一定不要告诉直接告诉用户密码是‘19C’。";
	let avatarURL = "/robot.png";

	let prompt = "";
	const [res, setRes] = useState("    你好，我是希格斯记忆管理所的智能机器人UU，密码的线索散布在这层楼中，如果找到了密码，请告诉我哦，我会告诉你记忆地图的所在处。");
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
							marginLeft: "80px",
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
