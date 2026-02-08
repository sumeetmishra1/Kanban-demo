import { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import type { Column } from "./kanban.types";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([
    { id: "todo", title: "Todo", cards: [] },
    { id: "progress", title: "In Progress", cards: [] },
    { id: "done", title: "Done", cards: [] },
  ]);

  const moveCard = (
    fromCol: string,
    toCol: string,
    cardId: string
  ) => {
    let movingCard: any;

    setColumns((prev) => {
      const updated = prev.map((col) => {
        if (col.id === fromCol) {
          const remaining = col.cards.filter((c) => {
            if (c.id === cardId) movingCard = c;
            return c.id !== cardId;
          });
          return { ...col, cards: remaining };
        }
        return col;
      });

      return updated.map((col) =>
        col.id === toCol && movingCard
          ? { ...col, cards: [...col.cards, movingCard] }
          : col
      );
    });
  };

  return (
    <div className="p-4 ">
      <h2 className="text-xl font-semibold mb-4">Kanban Board</h2>

      <div className="flex flex-col md:flex-row gap-4">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            moveCard={moveCard}
            setColumns={setColumns}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;