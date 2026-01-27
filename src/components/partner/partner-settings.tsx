import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PartnerSettingsProps {
    userName: string;
    userEmail: string;
}

export function PartnerSettings({ userName, userEmail }: PartnerSettingsProps) {
    return (
        <div className="space-y-6">
            <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none">
                <CardHeader>
                    <CardTitle className="font-mono uppercase tracking-wide">Profile Settings</CardTitle>
                    <CardDescription className="font-mono text-xs">Manage your account details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="font-mono uppercase text-xs">Agency Name</Label>
                        <Input
                            id="name"
                            value={userName}
                            disabled
                            className="bg-black border-white/20 font-mono text-white rounded-none opacity-50"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="font-mono uppercase text-xs">Email Address</Label>
                        <Input
                            id="email"
                            value={userEmail}
                            disabled
                            className="bg-black border-white/20 font-mono text-white rounded-none opacity-50"
                        />
                    </div>
                    <div className="pt-2">
                        <Button variant="outline" className="rounded-none border-2 border-white/20 hover:bg-white text-white hover:text-black font-mono font-bold uppercase disabled:opacity-50">
                            Request Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none">
                <CardHeader>
                    <CardTitle className="font-mono uppercase tracking-wide">Support</CardTitle>
                    <CardDescription className="font-mono text-xs">Need help with your account?</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-mono text-sm text-gray-400 mb-4">
                        Contact the administrator to update your agency details or commission rates.
                    </p>
                    <Button className="rounded-none bg-white text-black hover:bg-gray-200 font-mono font-black uppercase">
                        Contact Support
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
