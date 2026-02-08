import { useState } from "react";
import type{ Card } from "./kanban.types";

interface Props {
  card: Card;
  columnId: string;
  setColumns: React.Dispatch<any>;
}

const KanbanCard: React.FC<Props> = ({ card, columnId, setColumns }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(card.title);

  const save = () => {
    setColumns((prev: any) =>
      prev.map((col: any) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((c: Card) =>
                c.id === card.id ? { ...c, title } : c
              ),
            }
          : col
      )
    );
    setEditing(false);
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("cardId", card.id);
        e.dataTransfer.setData("fromCol", columnId);
      }}
      className="bg-white rounded-lg p-3 shadow-sm border hover:shadow-md cursor-grab active:cursor-grabbing"
    >
      {editing ? (
        <input
          className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === "Enter" && save()}
        />
      ) : (
        <div
          onDoubleClick={() => setEditing(true)}
          className="text-sm text-gray-700"
        >
          {card.title}
        </div>
      )}

      <button
        onClick={() =>
          setColumns((prev: any) =>
            prev.map((col: any) =>
              col.id === columnId
                ? {
                    ...col,
                    cards: col.cards.filter((c: Card) => c.id !== card.id),
                  }
                : col
            )
          )
        }
        className="text-xs text-red-500 mt-2 hover:underline"
      >
        Delete
      </button>
    </div>
  );
};

export default KanbanCard;
