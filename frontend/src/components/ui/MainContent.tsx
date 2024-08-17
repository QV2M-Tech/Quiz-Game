import React, { useState } from "react";
import { Tabs, Tab, Card } from "@mui/material";
import Button from "@mui/joy/Button";

type TabValue = 0 | 1;

const SUBJECTS: string[] = [
	"ฟิสิกส์",
	"เคมี",
	"ชีวะ",
	"คณิตศาสตร์",
	"ภาษาไทย",
	"สังคม",
	"ประวัติศาสตร์",
	"ภูมิศาสตร์",
	"ศิลปะ",
	"ดนตรี",
];

const SubjectItem: React.FC<{ subject: string }> = ({ subject }) => (
	<li className="flex justify-center mb-5">
		<Button
			color="neutral"
			onClick={() => {}}
			size="lg"
			variant="soft"
			fullWidth
			sx={{
				maxWidth: "80%", // Adjust max width for smaller screens
				backgroundColor: "#bae6fd",
				color: "#082f49",
				justifyContent: "center",
				padding: "10px 20px",
				"&:hover": {
					backgroundColor: "#7dd3fc",
				},
			}}
		>
			{subject}
		</Button>
	</li>
);

const SubjectList: React.FC = () => (
	<ul className="w-full pr-4 max-h-[400px] overflow-y-auto custom-scrollbar">
		{SUBJECTS.map((subject, index) => (
			<SubjectItem key={index} subject={subject} />
		))}
	</ul>
);

const TabPanel: React.FC<{
	children: React.ReactNode;
	value: TabValue;
	index: TabValue;
}> = ({ children, value, index }) => (
	<div
		hidden={value !== index}
		role="tabpanel"
		className="flex justify-center items-start h-full w-full"
	>
		{value === index && children}
	</div>
);

const MainContent: React.FC = () => {
	const [tabValue, setTabValue] = useState<TabValue>(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: TabValue) => {
		setTabValue(newValue);
	};

	return (
		<div className="min-h-[80%] p-6 w-full max-w-6xl mx-auto">
			<Card
				elevation={4}
				className="p-4 mx-auto relative"
				sx={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
			>
				<div className="flex justify-center mb-6 pb-2 border-b">
					<Tabs
						value={tabValue}
						onChange={handleChange}
						aria-label="Course tabs"
						sx={{
							"& .MuiTabs-indicator": {
								backgroundColor: "#1E90FF",
								height: "3px",
							},
						}}
					>
						<Tab
							label="วิชาการ"
							sx={{
								color: tabValue === 0 ? "#1E90FF" : "inherit",
								fontWeight: "bold",
							}}
						/>
						<Tab
							label="บันเทิง"
							sx={{
								color: tabValue === 1 ? "#1E90FF" : "inherit",
								fontWeight: "bold",
								marginLeft: "30px",
							}}
						/>
					</Tabs>
				</div>
				<div className="mt-4 bg-[#F8FBFF] p-4 rounded-lg">
					<TabPanel value={tabValue} index={0}>
						<SubjectList />
					</TabPanel>
					<TabPanel value={tabValue} index={1}>
						<p>Entertainment here!</p>
					</TabPanel>
				</div>
			</Card>
		</div>
	);
};

export default MainContent;
