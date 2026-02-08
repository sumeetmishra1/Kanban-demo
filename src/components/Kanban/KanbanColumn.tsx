import { useState } from "react";
import type { Column } from "./kanban.types";
import KanbanCard from "./KanbanCard";

interface Props {
  column: Column;
  moveCard: (from: string, to: string, cardId: string) => void;
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

const KanbanColumn: React.FC<Props> = ({ column, moveCard, setColumns }) => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");

  const addCard = () => {
    if (!title.trim()) return;

    setColumns((prev) =>
      prev.map((c) =>
        c.id === column.id
          ? {
              ...c,
              cards: [...c.cards, { id: Date.now().toString(), title }],
            }
          : c
      )
    );

    setTitle("");
    setAdding(false);
  };

  return (
    <div
      className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-200 md:min-w-96"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const cardId = e.dataTransfer.getData("cardId");
        const fromCol = e.dataTransfer.getData("fromCol");
        moveCard(fromCol, column.id, cardId);
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-700">{column.title}</h3>
        <button
          onClick={() => setAdding(true)}
          className="text-green-600 hover:text-green-700 text-lg"
        >
          ＋
        </button>
      </div>

      {/* Inline add */}
      {adding && (
        <div className="mb-3 bg-white rounded-lg p-2 shadow-sm border">
          <input
            className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter card title"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCard()}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={addCard}
              className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Add
            </button>
            <button
              onClick={() => setAdding(false)}
              className="text-sm px-3 py-1 rounded text-gray-500 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="space-y-2">
        {column.cards.map((card) => (
          <KanbanCard
            key={card.id}
            card={card}
            columnId={column.id}
            setColumns={setColumns}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
