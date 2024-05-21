import { NavLink, useMatch } from "react-router-dom";
import { trpc } from "../trpc";

export const Ships = () => {
	const {data: ships, isLoading: loadingList} = trpc.ships.list.useQuery();
	const m = useMatch("/ships/:symbol");
	const {data:selectedShip, isLoading} = trpc.ships.get.useQuery(m?.params.symbol as string, {
		enabled: !!m,
	});

	return (
		<div
		className="w-full h-full flex flex-row"
		>
			<div
				className="flex flex-col bg-slate-400 h-auto w-1/12"
			>
				{
					loadingList ? (
						<div
							className="text-white"
						>
							Loading...
						</div>
					) : (
						ships?.map((ship) => (
							<NavLink
								to={`/ships/${ship.symbol}`}
								key={ship.symbol}
								className="m-2"
							>
								<span
									className="font-bold"
								>{ship.registration.name}</span>
							</NavLink>
						))
					)
				}
			</div>
			<div
				className="flex flex-col h-auto w-11/12"
			>
				{
					isLoading || (selectedShip === null) ? (
						<div >
							Loading...
						</div>
					) : (
						<div
							className=""
						>
							{selectedShip?.symbol}
						</div>
					)
				}
			</div>
		</div>
	);
};