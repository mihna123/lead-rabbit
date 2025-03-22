import { NextRequest } from "next/server";
import client from "@/lib/mongodb";

/**
 * @param {NextRequest} request
 * */
export async function POST(request) {
	const authorization = request.headers.get("Authorization");
	if (authorization !== `Bearer ${process.env.BIG_API_SECRET}`) {
		return new Response("Unauthorized", {
			status: 401,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		});
	}

	const { email, feedback } = await request.json();

	if (!email) {
		return new Response("Bad request, no email in body", { status: 422 });
	}

	if (!feedback) {
		return new Response("Bad request, no feedback in body", { status: 422 });
	}

	const res = await client
		.db()
		.collection("feedbacks")
		.insertOne({ email, feedback });

	if (!res?.acknowledged) {
		return new Response("Failed to insert new feedback into database", {
			status: 500,
		});
	}

	return new Response("Successfuly posted new feedback", { status: 200 });
}
