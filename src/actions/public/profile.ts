"use server";

import { db } from "@/lib/db";
import { user, projectSubmission, studentProgress, courseWeek } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function getPublicProfile(userId: string) {
    try {
        // Verified: getPublicProfile returns ...userProfile which includes all schema fields.
        const userProfile = await db.query.user.findFirst({
            where: eq(user.id, userId),
            with: {
                projectSubmissions: {
                    with: {
                        week: {
                            with: {
                                month: {
                                    with: {
                                        course: true
                                    }
                                }
                            }
                        }
                    }
                },
                progress: {
                     where: eq(studentProgress.isCompleted, true),
                     with: {
                         week: true
                     }
                }
            }
        });

        if (!userProfile) {
            return { success: false, error: "User not found" };
        }

        // Filter for approved top projects if they exist
        let displayProjects = userProfile.projectSubmissions;
        
        if (userProfile.topProjects && Array.isArray(userProfile.topProjects) && userProfile.topProjects.length > 0) {
            // If user has selected top projects, prioritize them or filter only them
            // The requirement says "5 projects to select from...". 
            // We should probably filter to JUST these if they are selected.
            // But if the IDs in topProjects don't match (e.g. project deleted), we might want fallbacks?
            // For now, let's filter to include ONLY the top projects.
            
            // Cast topProjects to string[] as it's JSON
            const topProjectIds = userProfile.topProjects as string[];
            displayProjects = userProfile.projectSubmissions.filter(p => topProjectIds.includes(p.id));
        } else {
             // If no top projects selected, maybe show recent 5 graded ones?
             displayProjects = userProfile.projectSubmissions
                .filter(p => p.status === 'graded')
                .slice(0, 5);
        }

        return { 
            success: true, 
            data: {
                ...userProfile,
                projectSubmissions: displayProjects
            } 
        };

    } catch (error) {
        console.error("Error fetching public profile:", error);
        return { success: false, error: "Failed to fetch profile" };
    }
}
