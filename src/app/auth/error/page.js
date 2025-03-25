import Link from "next/link";

const errorMap = {
	Configuration: (
		<p>
			There was the problem on the server. Please contact us if this error
			persists. Unique error code:{" "}
			<code className="badge badge-error">Configuration</code>
		</p>
	),
	AccessDenied: (
		<p>
			You don't have access for this page. Unique error code:{" "}
			<code className="badge badge-error">AccessDenied</code>
		</p>
	),
	Verification: (
		<p>
			Your email token has expired or has already been used!
			<code className="badge badge-error">Verification</code>
		</p>
	),
	CallbackRouteError: (
		<p>
			The email address or password is incorect. Unique error code:{" "}
			<code className="badge badge-error">CallbackRouteError</code>
		</p>
	),
	Default: (
		<p>
			There was a problem when trying to authenticate. Please contact us if this
			error persists. Unique error code:{" "}
			<code className="badge badge-error">Configuration</code>
		</p>
	),
};

export default async function ErrorPage({ searchParams }) {
	const { error } = await searchParams;
	return (
		<div className="flex justify-center">
			<div className="card bg-base-200 w-96 shadow-sm mt-24">
				<div className="card-body">
					<h2 className="card-title">Oops!</h2>
					{errorMap[error]}
					<div className="card-actions justify-end">
						<Link href="/auth/signin" className="btn btn-accent mt-4">
							Go back
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
