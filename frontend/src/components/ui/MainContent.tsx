import React, { useState } from "react";
import { Tabs, Tab, Card } from "@mui/material";
import Button from "@mui/joy/Button";
import { Topic } from "@/types/Topic";
import SubsubjectModal from "@/app/selectgame/SubsubjectModal";
import { TopicApi } from "@/lib/TopicApi";

type TabValue = 0 | 1;

const SubjectItem: React.FC<{ topic: Topic; onClick: () => void }> = ({
	topic,
	onClick,
}) => (
	<li className="flex justify-center mb-5">
		<Button
			color="neutral"
			onClick={onClick}
			size="lg"
			variant="soft"
			fullWidth
			sx={{
				maxWidth: "80%",
				backgroundColor: "#bae6fd",
				color: "#082f49",
				justifyContent: "center",
				padding: "10px 20px",
				"&:hover": {
					backgroundColor: "#7dd3fc",
				},
			}}
		>
			{topic.topicName}
		</Button>
	</li>
);

const SubjectList: React.FC<{
	topics: Topic[];
	onTopicClick: (topic: Topic) => void;
}> = ({ topics, onTopicClick }) => (
	<ul className="w-full pr-4 max-h-[400px] overflow-y-auto custom-scrollbar">
		{topics.map((topic) => (
			<SubjectItem
				key={topic._id}
				topic={topic}
				onClick={() => onTopicClick(topic)}
			/>
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
	const [topics, setTopics] = useState<Topic[]>([]);
	const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	React.useEffect(() => {
		const fetchTopics = async () => {
			try {
				const fetchedTopics = await TopicApi.getAllTopics();
				setTopics(fetchedTopics);
			} catch (error) {
				console.error("Error fetching topics:", error);
			}
		};

		fetchTopics();
	}, []);

	const handleChange = (_event: React.SyntheticEvent, newValue: TabValue) => {
		setTabValue(newValue);
	};

	const handleTopicClick = (topic: Topic) => {
		setSelectedTopic(topic);
		setIsModalOpen(true);
	};

	return (
		<div className="min-h-[80%] p-6 w-full max-w-6xl mx-auto overflow-hidden">
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
						<SubjectList topics={topics} onTopicClick={handleTopicClick} />
					</TabPanel>
					<TabPanel value={tabValue} index={1}>
						<p>Entertainment here!</p>
					</TabPanel>
				</div>
			</Card>
			{selectedTopic && (
				<SubsubjectModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					topic={selectedTopic}
				/>
			)}
		</div>
	);
};

export default MainContent;
