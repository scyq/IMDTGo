"use client";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import P5GPT from "../components/GPT";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import "./chat.css";
import { Box } from "@mui/material";

const agent = new P5GPT();

const Message = ({ text, isUser }) => {
	return (
		<Paper
			elevation={3}
			style={{
				maxWidth: "80%",
				margin: "10px",
				padding: "10px",
				alignSelf: isUser ? "flex-end" : "flex-start",
				backgroundColor: isUser ? "#2196F3" : "#e0e0e0",
				color: isUser ? "white" : "black",
				borderRadius: "10px",
			}}
		>
			<Typography variant="body1">{text}</Typography>
		</Paper>
	);
};

export default function Chat() {
	const [inputText, setInputText] = useState("");
	const [messages, setMessages] = useState([]);
	const [open, setOpen] = useState(false);
	const [res, setRes] = useState("");

	useEffect(() => {
		handleReceiveMessage("你好，请畅所欲言~");
	}, []);

	useEffect(() => {
		if (res !== "") {
			handleReceiveMessage(res);
		}
	}, [res]);

	const handleReceiveMessage = (res) => {
		setMessages([...messages, { text: res, isUser: false }]);
	};

	const handleSendMessage = () => {
		if (inputText.trim() === "") return;
		setMessages([...messages, { text: inputText, isUser: true }]);
		setOpen(true);
		agent.dialog(inputText).then((res) => {
			setOpen(false);
			setRes(res);
		});
		setInputText("");
	};

	return (
		<div>
			<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<div>
				{messages.map((message, index) => (
					<Message key={index} text={message.text} isUser={message.isUser} />
				))}
			</div>
			<div style={{ display: "flex", alignItems: "center" }}>
				<TextField
					label="Type a message"
					variant="outlined"
					fullWidth
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
				/>
				<Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginLeft: "10px" }}>
					Send
				</Button>
			</div>
		</div>
	);
}
