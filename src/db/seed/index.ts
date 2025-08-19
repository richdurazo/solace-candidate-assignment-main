import { db, queryClient } from "..";
import { advocates } from "../schema";
import { advocateData } from "./advocates";

async function main() {
  console.log("Seeding advocates...");
  await db.insert(advocates).values(advocateData);
  console.log(`Inserted ${advocateData.length} advocates`);
  await queryClient.end(); // close postgres-js
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
