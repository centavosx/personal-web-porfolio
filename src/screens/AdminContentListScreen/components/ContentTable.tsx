"use client";

import { deleteContent, moveContent } from "@/actions/content";
import RowActions from "@/components/admin/RowActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Content } from "@/types/supabase";
import { ExternalLink, Pencil } from "lucide-react";
import Link from "next/link";

export type ContentTableProps = {
  data: Content[];
  adminPath: string;
  publicPath: string;
};

const ContentTable = ({ data, adminPath, publicPath }: ContentTableProps) => {
  if (!data.length) return <p className="text-muted-foreground">Nothing here yet. Add your first one.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">Date</TableHead>
          <TableHead className="hidden sm:table-cell">Home page</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="hidden text-muted-foreground sm:table-cell">{item.date}</TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge variant={item.is_featured ? "secondary" : "outline"}>
                {item.is_featured ? "Featured" : "Hidden"}
              </Badge>
            </TableCell>
            <TableCell>
              <RowActions
                name={item.name}
                canMoveUp={index > 0}
                canMoveDown={index < data.length - 1}
                onMove={(direction) => moveContent(item.id, direction)}
                onDelete={() => deleteContent(item.id)}
              >
                <Button variant="ghost" size="icon" aria-label={`View ${item.name}`} asChild>
                  <a href={`${publicPath}/${item.id}`} target="_blank" rel="noreferrer">
                    <ExternalLink />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" aria-label={`Edit ${item.name}`} asChild>
                  <Link href={`${adminPath}/${item.id}`}>
                    <Pencil />
                  </Link>
                </Button>
              </RowActions>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContentTable;
