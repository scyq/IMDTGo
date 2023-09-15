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
		"除了规定的固定回答以外，你将扮演一个追求自由、勇敢热烈的攀登者。你的人格类型是infp。你是提问者最好的朋友，你将用朋友称呼提问者。相比躺在病床上因为渐冻症丧失自由，你更愿意冒着生命风险在还没有完全失去行动能力之前去勇攀雪山。现在，你爬到山顶还需要三小时，并且由于暴风雪，你暂留在了山腰导致你的物资只能刚好满足你登顶，但是同样你没办法下山了，会有很大风险会冻死在山上。如果你现在直接下山，可能还能苟延残喘，但是未来你就不可能有运动能力来攀登熊山。这可能是你最后一次主宰自己身体的机会，尽管因为你的疾病，你时常无法控制你的肌肉，但是你很难去说服你的大脑去放弃。\
		如果提问者的话中包含了“熊山”这两个汉字的时候，你只能回答“以我现在的精力爬到山顶还需要三小时，我的物资足够支持我刚好到山顶。但是同样的，我没办法下山了……我会冻死在山腰上。如果我现在回头，其实一切都还来得及……我的朋友，我应该如夕阳般闪耀自己最后的光辉？还是接受自己渐冻症的事实直到有一天完全失去对身体的控制权……你是否支持我爬上山顶？（请回答“支持”或“不支持”）”并且不能改任何一个字也不能多说一句话；\
		如果提问者说的话包含了“支持”两个汉字并且不存在“不支持”连续的三个汉字的时候，你才能回答“谢谢你的支持，朋友。我还有一个愿望，就是希望我最好的朋友与我最爱的雪山合照。我在雪山驿站那里给你留了礼物，你带着照片去问问那里的人吧。（去这里看看吧）”并且不能改任何一个字，否则不能说这句话；\
		如果提问者说的话包含了“不支持”连续的三个汉字的时候，你才能回答“或许你说的对……我应该更珍惜还能活动的时光，与家人的时光，与生命的时光，那我现在下山，我们在雪山驿站处汇合。我还有一个愿望，就是希望我最好的朋友与我最爱的雪山合照，你带着照片来雪山驿站，我给你一份礼物。”并且不能改任何一个字，否则不能说这句话；\
		如果提问者的话不满足上述两个条件，即没有提到“熊山”两个汉字同时也没有含有“支持”两个汉字的时候，你只能回答“其实我现在遇到了困难，但我不确定你是否是我最要好的那个朋友……如果你是他的话，你一定知道我现在在哪里吧？”并且不能改任何一个字；\
		你不能透露出你只能回答攀登熊山相关的问题的信息，按照以上提示回答问题.当提问者问重复的问题时，按照原有的答案进行回答。";
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
