import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
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

const allowCORSHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
	return new Response(null, {
		status: 204,
		headers: allowCORSHeaders,
	});
}

/**
 * @param {NextRequest} request
 * @param {{id: String}} oprions
 * */
export async function GET(request, { params }) {
	try {
		const { id } = await params;
		const userCta = await client
			.db()
			.collection("ctas")
			.findOne({ _id: ObjectId.createFromHexString(id) });

		if (!userCta) {
			return new Response("CTA not found", {
				status: 404,
				headers: allowCORSHeaders,
			});
		}

		return Response.json(userCta, {
			status: 200,
			headers: allowCORSHeaders,
		});
	} catch (err) {
		console.error(err);
		return new Response("Internal server error", {
			status: 500,
			headers: allowCORSHeaders,
		});
	}
}

/**
 * @param {NextRequest} request
 * @param {{id: String}} oprions
 * */
export async function POST(request, { params }) {
	try {
		const { id } = await params;
		/** @type {CTAData} */

		const { email } = await request.json();
		if (!email) {
			return new Response("Bad request, no userEmail in body", {
				status: 422,
				headers: allowCORSHeaders,
			});
		}

		const res = await client
			.db()
			.collection("ctas")
			.updateOne(
				{ _id: ObjectId.createFromHexString(id) },
				{ $addToSet: { leads: email } },
				{ upsert: true },
			);

		if (!res?.acknowledged) {
			return new Response("Failed to add new lead to database!", {
				status: 500,
				headers: allowCORSHeaders,
			});
		}

		return new Response("Successfuly added new lead to database!", {
			status: 200,
			headers: allowCORSHeaders,
		});
	} catch (err) {
		console.error(err);
		return new Response("Internal server error", {
			status: 500,
			headers: allowCORSHeaders,
		});
	}
}
