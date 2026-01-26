"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserActions } from "./user-actions";

import { Role } from "@/lib/auth/auth";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
  // Add other fields as necessary from specific DB schema return type
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "role",
    header: "ROLE",
  },
  {
    accessorKey: "createdAt",
    header: "JOINED",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString();
    },
  },
  {
    header: "ACTIONS",
    id: "actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
