import { FC } from "react";
import {trpc, InferOutput} from "../trpc";
import { Outlet } from "react-router-dom";
import { normalize_symols } from "../util";

type NotNull<T> = T extends null ? never : T;

type ContractCardProps = {
	contract: NotNull<InferOutput["contracts"]["list"]>[number];
};

const ContractCard: FC<ContractCardProps> = ({contract}) => {
	return (
		<div>
			{normalize_symols(contract.type)}
		</div>
	);
};

export const Contracts = () => {
	const { data: contracts } = trpc.contracts.list.useQuery();

	return (
		<div
			className="flex flex-col h-full w-full"
		>
			<div
				className="bg-slate-100"
			>
				<h1
					className="text-4xl font-bold m-5"
				>Contratos</h1>
			</div>
			<div
				className="flex flex-row h-full"
			>
				<div
					className="flex flex-col h-auto m-2 bg-slate-100 w-32"
				>
					{
						contracts && 
						contracts.map((contract) => (
							<ContractCard contract={contract} />
						)) || <p>Cargando...</p>
					}
				</div>
				<Outlet />
			</div>
		</div>
	);
};

export const Contract = () => {

	return (
		<div>
			<h1>Contract</h1>
		</div>
	);
};