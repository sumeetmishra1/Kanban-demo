import React, { useState } from "react";
import type { TreeNode } from "./Tree.types";
import { fetchChildren } from "./MockApi";

interface Props {
  node: TreeNode;
  onUpdate: (node: TreeNode) => void;
  onDelete: (id: string) => void;
}

const TreeNodeItem: React.FC<Props> = ({ node, onUpdate, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(node.label);

  const toggle = async () => {
    if (!expanded && node.hasChildren && !node.children) {
      setLoading(true);
      const children = await fetchChildren(node.id);
      onUpdate({ ...node, children });
      setLoading(false);
    }
    setExpanded(!expanded);
  };

  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  const addChild = () => {
    if (!newLabel.trim()) return;

    onUpdate({
      ...node,
      children: [
        ...(node.children || []),
        { id: Date.now().toString(), label: newLabel.trim() },
      ],
    });

    setNewLabel("");
    setAdding(false);
    setExpanded(true);
  };

  const saveEdit = () => {
    onUpdate({ ...node, label });
    setEditing(false);
  };

  return (
    <div className="ml-4">
      <div className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100">
        {(node.children || node.hasChildren) ? (
          <button onClick={toggle} className="w-5 text-xs">
            {expanded ? "▼" : "▶"}
          </button>
        ) : (
          <span className="w-5" />
        )}

        {editing ? (
          <input
            className="border rounded px-1 text-sm"
            value={label}
            autoFocus
            onChange={(e) => setLabel(e.target.value)}
            onBlur={saveEdit}
          />
        ) : (
          <span
            className="flex-1 cursor-pointer"
            onDoubleClick={() => setEditing(true)}
          >
            {node.label}
          </span>
        )}

        <button
          onClick={() => setAdding(true)}
          className="text-green-600 text-sm"
        >
          ＋
        </button>
        <button
          onClick={() => confirm("Delete this node and its children?") && onDelete(node.id)}
          className="text-red-500 text-sm"
        >
          🗑
        </button>
      </div>

      {adding && (
        <div className="ml-8 mt-1 flex items-center gap-2">
          <input
            className="border rounded px-2 py-0.5 text-sm flex-1"
            placeholder="New node name"
            value={newLabel}
            autoFocus
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addChild()}
          />
          <button
            onClick={addChild}
            className="text-green-600 text-sm"
          >
            Add
          </button>
          <button
            onClick={() => setAdding(false)}
            className="text-gray-500 text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {loading && <div className="ml-6 text-xs text-gray-500">Loading...</div>}

      {expanded && node.children?.map((child) => (
        <TreeNodeItem
          key={child.id}
          node={child}
          onUpdate={(updated) => {
            onUpdate({
              ...node,
              children: node.children!.map((c) => c.id === updated.id ? updated : c),
            });
          }}
          onDelete={(id) => {
            onUpdate({
              ...node,
              children: node.children!.filter((c) => c.id !== id),
            });
          }}
        />
      ))}
    </div>
  );
};

export default TreeNodeItem;