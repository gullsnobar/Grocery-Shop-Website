import { useParams } from "react-router-dom";

const ProductPage = () => {
	const { id } = useParams();

	return (
		<div className="p-4">
			<h1 className="text-xl font-semibold">Product Page</h1>
			<p className="mt-2">Product ID: {id}</p>
		</div>
	);
};

export default ProductPage;
