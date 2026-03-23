import { db } from "./src/lib/db";
import { course } from "./src/lib/db/schema";
import { eq } from "drizzle-orm";

async function test() {
  try {
    console.log("Testing database connection...");
    const courses = await db.query.course.findMany({
      where: eq(course.status, "published"),
      with: {
        months: true,
      },
      limit: 1,
    });
    console.log("Query successful:", courses);
  } catch (error) {
    console.error("Query failed with error:");
    console.error(error);
  } finally {
    process.exit();
  }
}

test();
