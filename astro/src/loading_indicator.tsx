export const FullPageLoading = () => {
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
				<p>Loading...</p>
			</div>
		</div>
	);
}