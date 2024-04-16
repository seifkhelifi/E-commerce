import axios from "axios";
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch, customFetch2 } from "../utils";
const url = "/products";

const allProductsQuery = (queryParams) => {
    const { search, category, company, sort, price, shipping, page, elastic } = queryParams;
    console.log("sqdqdqsq5555555555555");
    return {
        queryKey: [
            "products",
            search ?? "",
            category ?? "all",
            company ?? "all",
            sort ?? "a-z",
            price ?? 10000000,
            shipping ?? false,
            page ?? 1,
        ],

        queryFn: () =>
            customFetch(url, {
                params: queryParams,
            }),
    };
};

const allProductsElastic = (queryParams) => {
    const { elastic } = queryParams;
    console.log(elastic);
    return {
        // queryKey: [
        //     "products",
        //     search ?? "",
        //     category ?? "all",
        //     company ?? "all",
        //     sort ?? "a-z",
        //     price ?? 10000000,
        //     shipping ?? false,
        //     page ?? 1,
        // ],
        queryFn: () => {
            const options = {
                method: "POST", // Set the method to 'POST' for a POST request
                headers: {
                    "Content-Type": "application/json", // Set appropriate content type for JSON data
                },
                body: JSON.stringify({ queryText: elastic }), // Convert data to JSON string
            };
            customFetch2("/search", options);
        },
    };
};

export const loader =
    (queryClient) =>
    async ({ request }) => {
        const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
        console.log("sqdqsd///", params);
        let response;

        {
            params.elastic && params.elastic !== ""
                ? (response = await axios.post("http://localhost:5000/search", {
                      queryText: params.elastic,
                  }))
                : (response = await queryClient.ensureQueryData(allProductsQuery(params)));
        }

        console.log(response);
        const products = response.data;
        const meta = response.data;
        return { products, meta, params };
    };

const Products = () => {
    return (
        <>
            <Filters />
            <ProductsContainer />
            <PaginationContainer />
        </>
    );
};
export default Products;
