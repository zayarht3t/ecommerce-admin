// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { isAdminRequest } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  await isAdminRequest(req, res)
  res.status(200).json({ name: 'John Doe' })
}
