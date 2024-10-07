"use server"

import User from "@/models/userModel";
import connect from "@/lib/dbConn"

export async function createUser(user) {
    try {
        await connect();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        console.log(error)
    }
    
}