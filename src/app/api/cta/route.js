import client from "@/lib/mongodb";
import { NextRequest } from "next/server";

/**
 * @typedef {Object} CTAData
 * @property {String} userEmail
 * @property {String} domain
 * @property {String} btnText
 * @property {String} btnColor
 * @property {String} btnSize
 * @property {String} pickedFont
 * @property {String} alignment
 * @property {String} explanation
 * */

/**
 * @param {NextRequest} request
 * */
export async function GET(request) {
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

	const { searchParams } = new URL(request.url);
	const userEmail = searchParams.get("email");
	if (!userEmail) {
		return new Response("Bad request, no userEmail", { status: 422 });
	}

	const userCta = await client.db().collection("ctas").findOne({ userEmail });
	if (!userCta) {
		return new Response("CTA not found", { status: 404 });
	}

	return Response.json(userCta, { status: 200 });
}

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

	/** @type {CTAData} */
	const ctaData = await request.json();

	const res = await client
		.db()
		.collection("ctas")
		.updateOne(
			{ userEmail: ctaData.userEmail },
			{ $set: { ...ctaData } },
			{ upsert: true },
		);

	if (!res?.acknowledged) {
		return new Response("Failed to add new CTA to database!", { status: 500 });
	}

	return new Response("Successfuly added new CTA to database!", {
		status: 200,
	});
}
