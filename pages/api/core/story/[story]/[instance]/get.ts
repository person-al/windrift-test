// Get info about an instance
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

// Get information about an existing instance of a game
export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const storyId = req.query.story as string
    const instanceId = req.query.instance as string

    const story = await prisma.story.findUnique({
        where: {
            id: storyId
        }
    })
    const instance = await prisma.instance.findUnique({
        where: {
            id: instanceId
        }
    })

    const player1 = await prisma.player.findFirst({
        where: {
            instanceId,
            name: story.player1Name
        }
    })
    const player2 = await prisma.player.findFirst({
        where: {
            instanceId,
            name: story.player2Name
        }
    })

    return res.status(200).json({
        story,
        instance,
        player1,
        player2
    })
}
