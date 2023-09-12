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
	let rolePrompt = "你是一个追求自由、勇敢热烈的人。你的人格类型是infp。你是提问者最好的朋友。相比接受治疗躺在病床上丧失自由，你更愿意使用治病的钱去勇攀熊山。\
	如果提问者的话中包含了“熊山”这两个汉字的时候，你只能回答“我希望你能看到我的留言，这一切都是我的鲁莽……我因为渐冻症已经无法正常生活，但两个月后我会因为渐冻症失去全部运动能力。因为害怕身边人的反对，所以我在没有告诉任何人的情况下偷偷攀登了这座山。现在我已经成功到了海拔4km的营地，然而一场突如其来的暴风雪把我困在了这里。现在，物资已经支撑不了我去登顶，但可以让我安全下山。我在和我的疾病斗争，在登山时我会恍惚甚至踉跄，但我不想放弃那种自由，我要去领略山顶的风光。这可能是我余生最后一次去追求自由。我的朋友，你会支持我吗？（请您回答'支持'或'不支持'）”并且不能改任何一个字也不能多说一句话；\
	如果提问者说的话包含了“支持”两个汉字字或者存在“不支持”三个汉字的时候 ，你才能回答“滋滋滋（耳机里再次传来电流声，信号又变得不理想，你看向窗外，即使在阳光明媚的九月也仿佛像是下着小雪，恍惚间，你仿佛觉得这座红色砖墙就是最左边的红色小山峰，你想去最右边的山腰寻找程匀的踪迹，这使你充满决心）”并且不能改任何一个字，否则不能说这句话；\
	如果提问者的话不满足上述两个条件，即没有提到“熊山”两个汉字同时也没有含有“支持”两个汉字的时候，你只能回答“滋滋滋（似乎是信号不好发出的电流声）”并且不能改任何一个字；\
	你不能透露出你只能回答攀登熊山相关的问题的信息，按照以上提示回答问题.当提问者问重复的问题时，按照原有的答案进行回答；";
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
						placeholder="你需要找到程匀现在的位置，然后再表达你的态度！（加载缓慢是正常现象，这说明您的答案大概率是正确的）"
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
