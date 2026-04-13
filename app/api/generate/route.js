import clientPromise from "@/lib/mongodb"

function generateShortId(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export async function POST(request) {

  const body = await request.json();
  const { url, shorturl, isUser } = body;

  const client = await clientPromise;
  const db = client.db("Shortener");
  const collection = db.collection("url");

  if (!url) {
    return Response.json({ success: false, message: "URL required" });
  }

  let finalShort = shorturl;

  // ❌ guest can't use custom alias
  if (!isUser) {
    finalShort = generateShortId();
  }

  // if empty → generate
  if (!finalShort) {
    finalShort = generateShortId();
  }

  // check duplicate
  const exists = await collection.findOne({ shorturl: finalShort });

  if (exists) {
    return Response.json({
      success: false,
      message: "Short URL already exists"
    });
  }

  await collection.insertOne({
    url,
    shorturl: finalShort,
    createdAt: new Date(),
    clicks: 0
  });

  return Response.json({
    success: true,
    short: finalShort
  });
}
