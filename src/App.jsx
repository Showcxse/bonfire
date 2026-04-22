import { useState } from "react";
import TaskItem from "./components/TaskItem";
import CompletedBanner from "./components/CompletedBanner";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Build bonfire task tracker app", completed: false },
    { id: 2, title: "Lift dumbbells", completed: false },
  ]);

  const [bannerText, setBannerText] = useState(null);


  const addTask = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const taskTitle = formData.get("taskTitle");

    if (!taskTitle.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: taskTitle,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    form.reset();
  };

  const toggleTaskComplete = (taskId) => {
    setBannerText("Task Completed");

    setTimeout(() => {
      setBannerText(null);

      setTasks(currentTasks => currentTasks.map(task => 
        task.id === taskId ? { ...task, completed: true} : task
      ));
    }, 2000);
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <>
      <main className="min-h-screen bg-souls-abyss font-serif p-6 flex flex-col items-center">
        <CompletedBanner text={bannerText} />
        <header className="mb-12 mt-16 text-center">
          <h1 className="text-4xl md:text-6xl text-souls-estus uppercase tracking-wide leading-relaxed border-y border-souls-stone [text-shadow:0_0_3px_#d48e37,0_0_15px_rgba(212,175,55,0.6)]">
            Bonfire Lit
          </h1>
          <p className="mt-4 text-sm tracking-wider opacity-70">
            Rest and organize your burdens
          </p>
        </header>

        <form onSubmit={addTask} className="w-full max-w-2xl mb-8 flex gap-4">
          <input
            type="text"
            name="taskTitle"
            placeholder="Enter a new task"
            autoComplete="off"
            className="flex-1 bg-transparent border-b border-souls-stone text-souls-paper px-4 py-2 focus:outline-none focus:border-souls-estus transition-colors placeholder:opacity-40 font-serif text-lg"
          />
          <button
            type="submit"
            className="px-6 py-2 border border-souls-stone text-souls-paper hover:text-souls-abyss hover:bg-souls-estus hover:border-souls-estus transition-all duration-300 uppercase tracking-wider text-sm"
          >
            Accept
          </button>
        </form>

        <div className="w-full max-w-2xl space-y-4">
          {/* THROW ALL THE TASKS HERE FOR NOW IDK WHERE TO PUT THEM YET TBH
                NOTE FOR FUTURE ME: MAYBE HAVE HERO / LOADER SCREEN FIRST?
            */}

          {activeTasks.length === 0 ? (
            <div className="text-center italic opacity-50 border border-souls-stone p-8 text-souls-paper">
              The task list is empty...
            </div>
          ) : (
            activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                onToggle={() => toggleTaskComplete(task.id)}
              />
            ))
          )}

          {completedTasks.length > 0 && (
            <div className="mt-12 pt-8 border-t border-souls-stone/30">
              <h3 className="text-souls-estus/50 uppercase text-sm mb-6 text-center">Completed Quests</h3>
              <div className="space-y-4 opacity-40 grayscale pointer-events-none">
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} title={task.title} />
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
};

export default App;
