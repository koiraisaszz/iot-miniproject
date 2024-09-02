import { NextResponse } from "next/server";
const { Client } = require("pg");
import dotenv from "dotenv";

dotenv.config();
const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect();

export async function GET() {
    try {
        const res = await client.query('SELECT * FROM "iot" ORDER BY id ASC LIMIT 1');
        return NextResponse.json(res.rows, {
            status: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, {
            status: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
        });
    }
}

export async function PUT(req: Request) {
    try {
        const { tbl_led } = await req.json();
        const res = await client.query('UPDATE "iot" SET tbl_led = $1 RETURNING *', [tbl_led]);
        return NextResponse.json(res.rows[0], {
            status: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, {
            status: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
        });
    }
}
