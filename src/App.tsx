import TreeView from "./components/TreeView/TreeView";
import KanbanBoard from "./components/Kanban/KanbanBoard";

function App() {
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center gap-8 p-6">
      <div className="font-extrabold text-4xl underline text-gray-600">Ez Demo - Sumeet Mishra Fullstack+Devops </div>
      <TreeView />
      <KanbanBoard/>
    </div>
  );
}

export default App;