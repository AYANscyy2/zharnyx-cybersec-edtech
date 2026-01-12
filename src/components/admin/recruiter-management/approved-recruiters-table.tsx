"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getApprovedRecruiters } from "@/actions/admin/recruiter/action";

export function ApprovedRecruitersTable() {
  const [recruiters, setRecruiters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getApprovedRecruiters();
      if (res.success && res.data) {
        setRecruiters(res.data);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading)
    return (
      <div className="text-white font-mono p-4">Loading recruiters...</div>
    );

  return (
    <Card className="bg-zinc-950 border-2 border-white/20 text-white rounded-none shadow-[4px_4px_0px_0px_white/10] mt-8">
      <CardHeader className="bg-white/5 border-b-2 border-white/20 pb-4 pt-4">
        <div className="flex items-center gap-2 mb-1">
          <CardTitle className="font-mono text-xl text-white uppercase tracking-wide">
            Active Recruiters
          </CardTitle>
        </div>
        <CardDescription className="text-gray-400 font-mono text-xs uppercase tracking-wider">
          Currently active recruiters in the system.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/5 border-b-2 border-white/10">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white font-mono text-xs font-black uppercase tracking-widest h-12">
                Name
              </TableHead>
              <TableHead className="text-white font-mono text-xs font-black uppercase tracking-widest h-12">
                Email
              </TableHead>
              <TableHead className="text-white font-mono text-xs font-black uppercase tracking-widest h-12">
                Role
              </TableHead>
              <TableHead className="text-white font-mono text-xs font-black uppercase tracking-widest h-12">
                Joined
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recruiters.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center font-mono text-gray-500 uppercase tracking-widest text-xs"
                >
                  No active recruiters found.
                </TableCell>
              </TableRow>
            ) : (
              recruiters.map((recruiter) => (
                <TableRow
                  key={recruiter.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors font-mono"
                >
                  <TableCell className="font-bold text-white text-sm py-4 border-r border-white/5">
                    {recruiter.name || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-300 text-sm py-4 border-r border-white/5">
                    {recruiter.email}
                  </TableCell>
                  <TableCell className="border-r border-white/5 py-4">
                    <Badge
                      variant="outline"
                      className="border-purple-500 text-purple-400 rounded-none uppercase text-[10px] tracking-wider font-bold bg-purple-500/10"
                    >
                      Recruiter
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-400 text-xs py-4">
                    {recruiter.createdAt
                      ? new Date(recruiter.createdAt).toLocaleDateString()
                      : "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
