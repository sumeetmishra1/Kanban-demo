import type { TreeNode } from "./Tree.types.tsx";

export const fetchChildren = (parentId: string): Promise<TreeNode[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: `${parentId}-1`, label: " Child 1" },
        { id: `${parentId}-2`, label: " Child 2" },
      ]);
    }, 800);
  });
};
