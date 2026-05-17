"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState, useTransition } from "react";
import { format } from "date-fns";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import { approveUserAccess, rejectUserAccess } from "@/actions/admin/student-management/action";
import { toast } from "@/components/shared/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type NewUser = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  city: string | null;
  studentStatus: string | null;
  preferredTrack: string | null;
  collegeName: string | null;
  message: string | null;
  imageUrl: string | null;
  createdAt: Date;
  paymentStatus: string | null;
};

// Component to render the view details button and modal
const ViewDetailsCell = ({ user }: { user: NewUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAction = (action: "approve" | "reject") => {
    startTransition(async () => {
      const result = action === "approve"
        ? await approveUserAccess(user.id)
        : await rejectUserAccess(user.id);

      if (result.success) {
        toast.success(result.message || `User access ${action}d successfully`);
        setIsOpen(false);
      } else {
        toast.error("Action failed", { description: result.error });
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="font-mono text-xs uppercase tracking-wider rounded-none border-white/20 bg-black text-white hover:bg-white/10 hover:text-white h-8"
      >
        <Eye className="w-3 h-3 mr-2" />
        View Details
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-black border-2 border-white/20 text-white font-mono rounded-none max-w-2xl">
          <DialogHeader className="border-b-2 border-white/20 pb-4">
            <DialogTitle className="text-xl font-bold uppercase tracking-wider">
              USER DETAILS // {user.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Email</p>
                <p className="text-sm truncate">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Phone</p>
                <p className="text-sm">{user.phone || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">City / Region</p>
                <p className="text-sm">{user.city || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Registered At</p>
                <p className="text-sm">{format(user.createdAt, "PPP p")}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Status</p>
                <p className="text-sm">{user.studentStatus || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">College Name</p>
                <p className="text-sm">{user.collegeName || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Preferred Track</p>
                <p className="text-sm">{user.preferredTrack || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Payment Status</p>
                <span className={`text-xs font-bold uppercase px-2 py-1 ${
                  user.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-500' :
                  user.paymentStatus === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                  'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {user.paymentStatus || "pending"}
                </span>
              </div>
            </div>

            {user.message && (
              <div className="col-span-1 md:col-span-2">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Message</p>
                <div className="p-3 bg-white/5 border border-white/10 mt-1 text-sm whitespace-pre-wrap">
                  {user.message}
                </div>
              </div>
            )}

            {user.imageUrl && (
              <div className="col-span-1 md:col-span-2">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Proof Document</p>
                <a
                  href={user.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center justify-center px-4 py-2 border-2 border-white/20 hover:border-red-500 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  View Document
                </a>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 mt-6 pt-4 border-t-2 border-white/20">
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => handleAction("approve")}
              className="flex-1 rounded-none cursor-pointer  border-green-500/50 bg-green-500/10 text-green-500 font-bold uppercase tracking-wider transition-colors"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve Access
            </Button>
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => handleAction("reject")}
              className="flex-1 rounded-none cursor-pointer  border-red-500/50 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 font-bold uppercase tracking-wider transition-colors"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject Access
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const columns: ColumnDef<NewUser>[] = [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "phone",
    header: "PHONE",
    cell: ({ row }) => {
      return <span>{row.original.phone || "N/A"}</span>;
    },
  },
  {
    accessorKey: "preferredTrack",
    header: "TRACK",
    cell: ({ row }) => {
      return <span>{row.original.preferredTrack || "N/A"}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "SIGNED UP ON",
    cell: ({ row }) => {
      return <span>{format(row.original.createdAt, "P")}</span>;
    },
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: ({ row }) => <ViewDetailsCell user={row.original} />,
  },
];
