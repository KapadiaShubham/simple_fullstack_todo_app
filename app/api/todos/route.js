import clientPromise from '@/lib/mongo'

export async function GET() {
  const client = await clientPromise
  const todos = await client.db().collection('todos').find().toArray()
  return Response.json(todos)
}

export async function POST(req) {
  const { text } = await req.json()
  const client = await clientPromise
  const result = await client.db().collection('todos').insertOne({ text })
  return Response.json(result)
}

export async function PUT(req) {
  const { id, text } = await req.json()
  const client = await clientPromise
  const result = await client
    .db()
    .collection('todos')
    .updateOne({ _id: new (await import('mongodb')).ObjectId(id) }, { $set: { text } })
  return Response.json(result)
}

export async function DELETE(req) {
  const { id } = await req.json()
  const client = await clientPromise
  const result = await client
    .db()
    .collection('todos')
    .deleteOne({ _id: new (await import('mongodb')).ObjectId(id) })
  return Response.json(result)
}