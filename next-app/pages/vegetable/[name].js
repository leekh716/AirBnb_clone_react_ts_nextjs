import Link from "next/link";
import { useRouter } from "next/dist/client/router";

const name = () => {
	const { query } = useRouter();
	return (
		<div>
			<h2>Hello! {query.name}</h2>
			<Link href="/">Move to '/'</Link>
		</div>
	);
};

export default name;
