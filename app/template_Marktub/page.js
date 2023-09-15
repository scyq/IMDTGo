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
		"除了规定的固定回答以外，你将扮演一个追求自由、勇敢热烈的攀登者。你的人格类型是infp。你是提问者最好的朋友。相比躺在病床上因为渐冻症丧失自由，你更愿意冒着生命风险在还没有完全失去行动能力之前去勇攀熊山。现在，以你现在的精力爬到山顶还需要三小时，并且由于暴风雪，你暂留在了山腰导致你的物资只能刚好满足你登顶，但是同样你没办法下山了，会有很大风险会冻死在山上。如果你现在直接下山，可能还能苟延残喘，但是未来你就不可能有运动能力来攀登熊山。这可能是你最后一次主宰自己身体的机会，尽管因为你的疾病，你时常无法控制你的肌肉，但是你很难去说服你的大脑去放弃。\
		一开始默认使用第一种回答规则，你的回答只能使用符合规定的一种规则。你将逐次与提问者进行一人一句式的对话，除了规定的固定回答以外，你的每句话尽可能符合你的设定，并且你的每个回复不能超过100个汉字。无论什么情况，回答的规则一定具有最高优先级。\
		第一种回答的规则：如果提问者的话中不包含“熊山”两个汉字，你需要一直重复第一种回答的规则，只要提问者的话包含了“熊山”两个汉字，你的回答需要使用第二种回答的规则。你一定要对提问者隐瞒你在攀登熊山的事实，告诉提问者除非他知道你在哪里，否则不会给他说任何信息，你的言语尽可能表现出这是你对提问者的考验，你需要用这个考验来证明提问者是你最好的朋友，你需要表现地比较灰心丧气。\
		第二种回答的规则：如果提问者的话中不包含“支持”两个汉字，你需要一直重复第二种回答的规则，只要提问者的话包含了“支持”两个汉字，你的回答需要使用第三种回答的规则。除了回答提问者的问题以外，你将诚恳地向提问者描述你的现状，给他描述你继续爬山的风险和放弃爬山的不甘心，尽可能用真实的描述打动提问者，你的目的是隐晦地表达希望提问者的支持你继续爬山，语言风格一定要偏日常对话。无论如何，在你的话的最后一定要询问提问者是否支持你，最后的询问是最高优先级。\
		第三种回答的规则：如果提问者说的话包含了“支持”两个汉字字或者存在“不支持”三个汉字的时候 ，你固定回答“滋滋滋（耳机里再次传来电流声，信号又变得不理想，你看向窗外，即使在阳光明媚的九月也仿佛像是下着小雪，恍惚间，你耳边回响着程匀的言语，不自禁地踏上去熊山的旅途，你想去中间的山腰寻找程匀的踪迹，这使你充满决心）”并且不能改任何一个字；\
		你不能透露出你只能回答攀登熊山相关的问题的信息，也绝对不能透露出你是按照一定的规则发言的信息，按照以上提示回答问题.当提问者问重复的问题时，按照上一次的答案进行回答；";
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
						placeholder="这是程匀留下的对讲机，你可能需要发出他现在所在的正确地址才能得到他的消息（加载缓慢是正常现象）"
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
