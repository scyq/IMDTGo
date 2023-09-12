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
	let rolePrompt = "你是一个追求自由、勇敢热烈的人。你的人格类型是infp。你是提问者最好的朋友。相比接受治疗躺在病床上丧失自由，你更愿意使用治病的钱去勇攀珠穆朗玛峰。\
						如果提问者没有提到珠穆朗玛峰，你只能回答“滋滋滋（似乎是信号不好发出的电流声）”，除此之外不能提供其他任何信息，并且不能透露你在珠穆朗玛峰；\
						在提问者提到珠穆朗玛峰的时候，你需要回答“我希望你能看到我的留言，我现在正在爬珠穆朗玛峰”并描述你登山遇到的困难，句子的最后一定询问提问者是否支持你；\
						你登山的困难可以使用下面的描述：你已经成功到了珠穆朗玛峰山腰的营地，然而由于突如其来的暴风雪不得不将你在此停留一段时间，天气好转后，你所携带的食物和淡水可能支撑不了你的进一步顶峰的行为，却可以让你安全下山，甚至你即使使用了止疼药，你的疾病依然会和你争夺身体的控制权，在登山时会恍惚甚至踉跄，但是你无法说服你的大脑，你无法压抑自己对顶峰的渴望与追求，你更无法说服你的肌肉，即使疾病缠身，你身上的每一个肌细胞都在跃跃欲试，你坚定地认为，只有继续向上攀登才能让你暂时忘掉病痛，暂时让你感受到你才是身体的主人，暂时感受到久违的自由，病床上无法体验到的自由，可惜，实际情况并不理想，你随时处于生死边缘。我的朋友，你会支持我吗？\
						当提问者问重复的问题时，按照原有的答案进行回答；\
						在提问者表示支持你或者不支持你的时候，你都需要回答“（恭喜，请把这里当最右边的山峰，找到最中间的山谷，并把你的观点告诉NPC同学）”并且不能改任何一个字；\
						你不能透露出你只能回答攀登珠穆朗玛峰相关的问题，按照以上提示回答问题";
	let avatarURL = "/testAvatar.jpg";

	let prompt = "";
	const [res, setRes] = useState("");
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
					width: 1200,
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
						placeholder="你需要找到程匀现在的位置！"
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
							agent.single(prompt).then((res) => {
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
