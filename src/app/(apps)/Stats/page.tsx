"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'
import { FC } from 'react'
import Overview from './components/Overview'

const Stats: FC = () => {
    const { isAuthenticated } = useConvexAuth()

    if (!isAuthenticated) redirect('/')

    return (
        <Tabs defaultValue="overview" className="space-y-4 p-10">
            <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Images
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">45</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                            <CardTitle className="text-sm font-medium">
                                Total Notes
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">350</div>
                            <p className="text-xs text-muted-foreground">
                                +180.1% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Completed Tasks</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">234</div>
                            <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Tasks
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">573</div>
                            <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p>
                        </CardContent>

                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>

                        <CardContent className="pl-2">
                            <Overview />
                        </CardContent>

                    </Card>
                </div>

            </TabsContent>
        </Tabs>
    )
}

export default Stats