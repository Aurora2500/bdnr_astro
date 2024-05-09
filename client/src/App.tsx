import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { trpc } from "./trpc";

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import { Root } from "./Root";
import { httpBatchLink } from "@trpc/react-query";

import { Ships } from "./pages/ships";
import { Dashboard } from "./pages/dashboard";
import { Market } from "./pages/market";
import { Contracts } from "./pages/contracts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Dashboard />,
			},
			{
				path: "/ships",
				element: <Ships />,
			},
			{
				path: "/market",
				element: <Market />,
			},
			{
				path: "/contracts",
				element: <Contracts />,
			}
		]
	}
]);

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: "http://localhost:3000/trpc",
		}),
	]
});

function App() {

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}/>
			</QueryClientProvider>
		</trpc.Provider>
	);
}

export default App;
