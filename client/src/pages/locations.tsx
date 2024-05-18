import { Fragment } from "react";
import { trpc } from "../trpc";
import { NavLink, useMatch } from "react-router-dom";

export const Locations = () => {
	const {data:systems} = trpc.locations.systems.useQuery();
	const m_system = useMatch("/loc/:system");
	const {data:waypoints} = trpc.locations.system.useQuery(m_system?.params.system as string, {
		enabled: m_system != null,
	});
	const m_waypoint = useMatch("/loc/:system/:waypoint");

	return (
		<div
			className="flex flex-col h-full w-full"
		>
			<div
				className="flex flex-row h-full"
			>
				<div
					className="flex flex-col bg-slate-100 h-auto w-1/12 m-2 rounded-md"
				>
					<h3
						className="text-center text-xl font-semibold"
					>Systems</h3>
					<div>
						<hr/>
						<ul
							className="flex flex-col w-full h-full overflow-y-auto"
						>
							{systems == null ?
								null : 
								systems.map(system => (
									<Fragment key={system.symbol}>
										<li
											key={system.symbol}
											className="w-full"
										>
											<NavLink
												to={`/loc/${system.symbol}`}
												className={({isActive}) => `
													w-full block
													${isActive ? "bg-slate-200" : ""}`}
											>
											{({isActive}) => (
												<span
													className={` text-lg ${isActive ? "font-bold" : "font-medium"}`}
												>{system.symbol}</span>
											)}
											</NavLink>
										</li>
										<hr className="" />
									</Fragment>
								))
							}
						</ul>
					</div>
				</div>
				<div
					className="flex flex-col bg-slate-100 h-auto w-1/12 m-2 rounded-md"
				>
					<h3
						className="text-center text-xl font-semibold"
					>Waypoints</h3>
					<div>
						<hr/>
						{waypoints == null ?
							null :
							waypoints.map(waypoint => (
								<Fragment key={waypoint.symbol}>
									<div
										className="flex flex-col justify-between"
									>
										<div
											className="text-lg font-medium"
										>{waypoint.symbol}</div>
										<span
											className="text-lg font-medium"
										>{waypoint.type}</span>
									</div>
									<hr/>
								</Fragment>
							))
						}
					</div>
				</div>
			</div>
		</div>
	);
};