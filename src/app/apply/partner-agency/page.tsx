"use client";

import { useState } from "react";
import { submitPartnerApplication } from "@/actions/partner/apply";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Briefcase } from "lucide-react";

export default function PartnerApplyPage() {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        try {
            const result = await submitPartnerApplication(formData);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success("Application submitted successfully! We will review it shortly.");
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <Card className="max-w-xl w-full bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10]">
                <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-6 h-6 text-green-500" />
                        <CardTitle className="font-mono text-2xl text-white uppercase tracking-wide">
                            Partner Agency Application
                        </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                        Join forces with us to expand reach and earn revenue.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <form action={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="agencyName" className="font-mono text-xs uppercase">Agency Name <span className="text-red-500">*</span></Label>
                            <Input id="agencyName" name="agencyName" required placeholder="Enter your agency name" className="bg-black border-white/20 rounded-none focus:ring-green-500" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-mono text-xs uppercase">Email Address <span className="text-red-500">*</span></Label>
                                <Input id="email" name="email" type="email" required placeholder="contact@agency.com" className="bg-black border-white/20 rounded-none focus:ring-green-500" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contactNo" className="font-mono text-xs uppercase">Contact Number <span className="text-red-500">*</span></Label>
                                <Input id="contactNo" name="contactNo" required placeholder="+1 234 567 8900" className="bg-black border-white/20 rounded-none focus:ring-green-500" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="websiteUrl" className="font-mono text-xs uppercase">Website URL</Label>
                            <Input id="websiteUrl" name="websiteUrl" placeholder="https://agency.com" className="bg-black border-white/20 rounded-none focus:ring-green-500" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="font-mono text-xs uppercase">Brief Description</Label>
                            <Textarea id="description" name="description" placeholder="Tell us about your agency and how you plan to promote..." className="bg-black border-white/20 rounded-none focus:ring-green-500 min-h-[100px]" />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full bg-green-600 hover:bg-green-700 text-black font-bold uppercase rounded-none transition-all">
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Application"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
