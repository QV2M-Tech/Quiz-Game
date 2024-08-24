"use client"; // ทำให้ React ใช้งาน client-side rendering
import React from "react";
import TopicManagementPage from "@/app/topic/tableComponents/TopicManagement";

const Page = () => {
	return (
		<div>
			<TopicManagementPage />
		</div>
	);
};

export default Page;
