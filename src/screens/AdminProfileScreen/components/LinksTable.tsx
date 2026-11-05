"use client";

import { deleteLink, moveLink } from "@/actions/profile";
import RowActions from "@/components/admin/RowActions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/types/supabase";
import LinkDialog from "./LinkDialog";

export type LinksTableProps = {
  data: Link[];
};

const LinksTable = ({ data }: LinksTableProps) => {
  if (!data.length) return <p className="text-muted-foreground">No links yet. Add your first one.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead className="hidden sm:table-cell">URL</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((link, index) => (
          <TableRow key={link.id}>
            <TableCell className="font-medium capitalize">{link.type}</TableCell>
            <TableCell className="hidden max-w-md truncate text-muted-foreground sm:table-cell">{link.link}</TableCell>
            <TableCell>
              <RowActions
                name={link.type}
                canMoveUp={index > 0}
                canMoveDown={index < data.length - 1}
                onMove={(direction) => moveLink(link.id, direction)}
                onDelete={() => deleteLink(link.id)}
              >
                <LinkDialog link={link} />
              </RowActions>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LinksTable;
