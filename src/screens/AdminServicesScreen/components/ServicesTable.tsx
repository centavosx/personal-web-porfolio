"use client";

import { deleteService, moveService } from "@/actions/services";
import RowActions from "@/components/admin/RowActions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Service } from "@/types/supabase";
import ServiceDialog from "./ServiceDialog";

export type ServicesTableProps = {
  data: Service[];
};

const ServicesTable = ({ data }: ServicesTableProps) => {
  if (!data.length) return <p className="text-muted-foreground">No services yet. Add your first one.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="hidden sm:table-cell">Description</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((service, index) => (
          <TableRow key={service.id}>
            <TableCell className="font-medium">{service.name}</TableCell>
            <TableCell className="hidden max-w-md truncate text-muted-foreground sm:table-cell">
              {service.description}
            </TableCell>
            <TableCell>
              <RowActions
                name={service.name}
                canMoveUp={index > 0}
                canMoveDown={index < data.length - 1}
                onMove={(direction) => moveService(service.id, direction)}
                onDelete={() => deleteService(service.id)}
              >
                <ServiceDialog service={service} />
              </RowActions>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ServicesTable;
