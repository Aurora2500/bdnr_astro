import { Outlet } from "react-router-dom";
import { trpc } from "./trpc";

import { FullPageLoading } from "./loading_indicator";
import { Register } from "./pages/register";


export const Root = () => {
	const {data:money} = trpc.balance.useQuery();
	const {data:account, isLoading} = trpc.account.useQuery();

	if (isLoading || account === undefined) {
		return <FullPageLoading />;
	}

	if (account.registered === false) {
		return <Register factions={(account as any).factions} />;
	}


	return (
		<div
			className="w-screen h-screen flex bg-slate-300"
		>
			<div
				className="w-screen h-80 bg-yellow-300 flex flex-row flex-wrap
				justify-between items-baseline content-center px-10"
			>
				<div
					className="flex flex-row flex-wrap items-baseline"
				>
					<h1
						className="text-5xl "
					>
						Astro 🚀
					</h1>
				</div>
				<p>{money === null || `You have $${money}`}</p>
			</div>
			<Outlet />
		</div>
	);
}