"use server";

import client from "@/lib/mongodb";
import * as bcrypt from "bcrypt";

/**
 * @typedef {Object} UserObject
 * @property {String} email
 * @property {String} password
 * */

/**
 * @param {String} email
 * */
export async function getUser(email) {
	const user = await client.db().collection("users").findOne({ email });
	return user;
}

/**
 * @param {UserObject} user
 * */
export async function createUser(user) {
	if (user.password) {
		user.password = await bcrypt.hash(user.password, 10);
	}
	const newUser = await client
		.db()
		.collection("users")
		.insertOne({ ...user });
	return newUser;
}

export async function checkPassword(password, hash) {
	const res = await bcrypt.compare(password, hash);
	return res;
}
