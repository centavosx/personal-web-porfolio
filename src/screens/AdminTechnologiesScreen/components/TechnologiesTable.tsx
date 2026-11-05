"use client";

import { deleteTechnology, moveTechnology } from "@/actions/technologies";
import RowActions from "@/components/admin/RowActions";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Technology } from "@/types/supabase";
import TechnologyDialog from "./TechnologyDialog";

export type TechnologiesTableProps = {
  data: Technology[];
};

const TechnologiesTable = ({ data }: TechnologiesTableProps) => {
  if (!data.length) return <p className="text-muted-foreground">No technologies yet. Add your first one.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="hidden sm:table-cell">Home page</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((technology, index) => (
          <TableRow key={technology.id}>
            <TableCell className="font-medium">{technology.name}</TableCell>
            <TableCell className="capitalize text-muted-foreground">{technology.category}</TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge variant={technology.is_core ? "secondary" : "outline"}>
                {technology.is_core ? "Shown" : "Hidden"}
              </Badge>
            </TableCell>
            <TableCell>
              <RowActions
                name={technology.name}
                canMoveUp={data[index - 1]?.category === technology.category}
                canMoveDown={data[index + 1]?.category === technology.category}
                onMove={(direction) => moveTechnology(technology.id, direction)}
                onDelete={() => deleteTechnology(technology.id)}
              >
                <TechnologyDialog technology={technology} />
              </RowActions>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TechnologiesTable;
