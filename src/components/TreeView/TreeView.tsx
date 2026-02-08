import { useEffect, useState } from "react";
import TreeNodeItem from "./TreeNodeItem";
import type { TreeNode } from "./Tree.types";

const TreeView = () => {
  const [tree, setTree] = useState<TreeNode[]>([
    { id: "1", label: "Root A", hasChildren: true },
    { id: "2", label: "Root B", children: [] },
  ]);

  useEffect(()=>{
    console.log("tree",tree)
  },[tree])

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-3">Tree View</h2>

      {tree.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          onUpdate={(updated) =>
            setTree(tree.map((n) => n.id === updated.id ? updated : n))
          }
          onDelete={(id) => setTree(tree.filter((n) => n.id !== id))}
        />
      ))}
    </div>
  );
};

export default TreeView;