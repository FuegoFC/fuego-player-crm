"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import './style/soccerfield.css'
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Providers } from "./providers";
import { ColorModeScript } from "@chakra-ui/react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	return (
		<html lang="en">
			<body suppressHydrationWarning={true}>
				<Providers>
					<ColorModeScript initialColorMode={'dark'} />
					<div className="dark:bg-boxdark-2 dark:text-bodydark">
						{loading ? (
							<Loader />
						) : (
							<div className="flex h-screen overflow-hidden">
								{/* <!-- ===== Sidebar Start ===== --> */}
								<Sidebar
									sidebarOpen={sidebarOpen}
									setSidebarOpen={setSidebarOpen}
								/>
								{/* <!-- ===== Sidebar End ===== --> */}

								{/* <!-- ===== Content Area Start ===== --> */}
								<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
									{/* <!-- ===== Header Start ===== --> */}
									<Header
										sidebarOpen={sidebarOpen}
										setSidebarOpen={setSidebarOpen}
									/>
									{/* <!-- ===== Header End ===== --> */}

									{/* <!-- ===== Main Content Start ===== --> */}
									<main>
										<div className="">
											{children}
										</div>
									</main>
									{/* <!-- ===== Main Content End ===== --> */}
								</div>
								{/* <!-- ===== Content Area End ===== --> */}
							</div>
						)}
					</div>
				</Providers>
			</body>
		</html>
	);
}
