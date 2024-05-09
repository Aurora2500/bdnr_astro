import { Outlet, Link } from "react-router-dom";
import { trpc } from "./trpc";

import { FullPageLoading } from "./loading_indicator";
import { Register } from "./pages/register";

const pages = [
	{
		name: "Home",
		path: "/",
	},
	{
		name: "Naves",
		path: "/ships",
	},
	{
		name: "Mercado",
		path: "/market",
	},
]

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
			className="w-screen h-screen flex flex-col bg-slate-300"
		>
			<div
				className="w-screen h-24 bg-yellow-300 flex flex-row flex-wrap
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
				<div className="flex flex-row flex-wrap items-baseline gap-5">
					{
						pages.map((page) => (
							<Link to={page.path}>
								{page.name}
							</Link>
						))
					}
					<p className="text-lg p-2 bg-emerald-500 text-slate-100 rounded-md">${money}</p>
				</div>
			</div>
			<Outlet />
		</div>
	);
}