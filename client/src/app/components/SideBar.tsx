"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Folder, House, Users } from "lucide-react";
import TopBar from "./TopBar";

function Sidebar({
	open,
	onClose,
	children,
	width,
}: {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	width: number;
}) {
	const sidebarRef = useRef<HTMLDivElement>(null);


	return (
		<>
			<aside
				ref={sidebarRef}
				className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-[20vw] min-w-[250px] max-w-[600px] bg-white dark:bg-gray-800 text-gray-700 dark:text-white z-50 shadow-lg transform transition-transform duration-300 ${
					open ? "translate-x-0" : "-translate-x-full"
				} scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700 hover:scrollbar-thumb-gray-500 dark:hover:scrollbar-thumb-gray-500`}
			>
				{/* Resize handle */}
                <div className="flex flex-col gap-2 mx-3 my-5" >
					
                    <button className="w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                        <Link href="/" className="flex items-center gap-2 p-2">
                            <House className="w-5 h-5" />
                            <span>Home</span>
                        </Link>
                    </button>
                    <button className="w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                        <Link href="/Apps" className="flex items-center gap-2 p-2">
                            <Folder className="w-5 h-5" />
                            <span>Apps</span>
                        </Link>
                    </button>
                    <button className="w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                        <Link href="/Teams" className="flex items-center gap-2 p-2">
                            <Users className="w-5 h-5" />
                            <span>Teams</span>
                        </Link>
                    </button>
                </div>
			</aside>
			{/* Main Content Wrapper */}
			<div
				style={{ marginLeft: open ? `${width}px` : "0" }}
				className={`bg-white dark:bg-gray-900 mt-16`}
			>
				{children}
			</div>
		</>
	);
}

export default function SidebarWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [width, setWidth] = useState(320);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<>
			<TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
		
			<Sidebar
				open={sidebarOpen}
				onClose={() => setSidebarOpen(false)}
				width={width}
			>
				{children}
			</Sidebar>
		</>
	);
}