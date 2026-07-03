import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
	const [searchParams] = useSearchParams();
	const q = searchParams.get("q") || "";

	return (
		<div className="p-4">
			<h1 className="text-xl font-semibold">Search Results</h1>
			<p className="mt-2">Query: {q}</p>
		</div>
	);
};

export default SearchResults;
