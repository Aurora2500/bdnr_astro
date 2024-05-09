import { useState } from "react"
import { trpc } from "../trpc"

type Faction = {
	name: string
	symbol: string
	description: string
	isRecruiting: boolean
}

type FactionCardProps = {
	faction: Faction
	selected: boolean
	selector: (faction: Faction) => void
}

const FactionCard: React.FC<FactionCardProps> = ({faction, selected, selector}) => {
	const {name, description, isRecruiting} = faction;
	return (
		<div
			className={`border-slate-700 border-2 border-collapse ${selected ? "bg-slate-300" : "bg-slate-400"} p-2 rounded-md flex flex-col flex-wrap gap-2`}
			onClick={() => selector(faction)}
		>
			<p className="underline">{name}</p>
			<p>{description}</p>
			<p>{isRecruiting ? "Recruiting" : "Not recruiting"}</p>
		</div>
	)
};

type RegisterProps = {
	factions: Faction[]
}

export const Register: React.FC<RegisterProps> = ({factions}) => {

	const [symbol, setSymbol] = useState<string>("");
	const [selectedFaction, setSelectedFaction] = useState<Faction>(factions[0]);
	
	const utils = trpc.useUtils();
	const {mutate:register} = trpc.register.useMutation({
		onSuccess: () => {
			utils.account.invalidate();
		}
	})

	return (
		<div
			className="w-screen h-screen flex bg-slate-300 justify-center items-center content-center"
		>
			<div
				className="w-2/5 h-5/6 bg-slate-500 flex flex-col flex-wrap rounded-md items-center p-3 gap-4"
			>
				<h1 className="text-3xl text-slate-200"
				>
					Registración
				</h1>
				<input
					value={symbol}
					onChange={(e) => setSymbol(e.target.value)}
				/>

				<div
					className="w-full h-4/5 flex flex-row flex-wrap
					overflow-hidden overflow-y-auto no-scrollbar
					rounded-sm"
				>
					{factions.map(faction => <FactionCard
							faction={faction}
							selected={faction==selectedFaction}
							selector={setSelectedFaction}
						/>)}
				</div>

				<button
					className="p-2 bg-slate-400 rounded-md"
					onClick={() => register({symbol, faction: selectedFaction.symbol})}
				>Registrarse</button>
			</div>
		</div>
	)
}