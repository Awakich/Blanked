"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { useConvexAuth, useQuery } from 'convex/react'
import { redirect } from 'next/navigation'
import { FC } from 'react'
import Overview from './components/Overview'
import { api } from '../../../../convex/_generated/api'

const Stats: FC = () => {
    const { isAuthenticated } = useConvexAuth()
    const tasks = useQuery(api.tasks.getTasks) || []
    const notes = useQuery(api.notes.getNotes) || []
    const messages = useQuery(api.moodboard.getImages) || [];
    const pictures = useQuery(api.pictures.getPictures) || []

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
                            <div className="text-2xl font-bold">{messages?.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Added images from account
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
                            <div className="text-2xl font-bold">{notes?.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Added notes from account
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Completed Tasks</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">{tasks?.filter((task) => task.isComplete !== false).length}</div>
                            <p className="text-xs text-muted-foreground">
                                Complete tasks from account
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
                            <div className="text-2xl font-bold">{tasks?.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Added tasks from account
                            </p>
                        </CardContent>

                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Pictures
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="text-2xl font-bold">{pictures?.length}</div>
                            <p className="text-xs text-muted-foreground">
                                Added pictures from account
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
                            <Overview
                                totalCompleteTasks={tasks?.filter((task) => task.isComplete !== false).length || 0}
                                totalImages={messages?.length || 0}
                                totalNotes={notes?.length || 0}
                                totalTasks={tasks?.length || 0}
                                totalPictures={pictures.length || 0}
                                />
                        </CardContent>

                    </Card>
                </div>

            </TabsContent>
        </Tabs >
    )
}

export default Stats