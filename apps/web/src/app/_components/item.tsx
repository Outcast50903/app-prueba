import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ItemProps {
  id: number;
  name: string;
  description: string;
  onDelete: (id: number) => void;
}

export const Item = ({ id, name, description, onDelete }: ItemProps) => {
  console.log("🚀 ~ Item ~ description:", description)
  console.log("🚀 ~ Item ~ name:", name)
  return (
    <>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
          aria-label="Delete post"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </>
  );
};