"use client"

import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'
import { FC } from 'react'

const Stats: FC = () => {
    const { isAuthenticated } = useConvexAuth()

    if (!isAuthenticated) redirect('/')

    return (
        <div>Stats</div>
    )
}

export default Stats