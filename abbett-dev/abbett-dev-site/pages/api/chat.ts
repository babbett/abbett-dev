// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string,
  message: string
}

type handlerProps = {
    req: NextApiRequest,
    res: NextApiResponse<Data>
}

export default function handler({req, res}: handlerProps) {
    res.status(200).json({
        name: 'John Doe',
        message: 'hello'
    });
}
