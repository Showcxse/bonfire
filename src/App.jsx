import { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import TaskItem from "./components/TaskItem";
import TaskModal from "./components/TaskModal";
import PriorityMenu from "./components/PriorityMenu";
import DatePicker from "./components/DatePicker";
import CompletedBanner from "./components/CompletedBanner";
import EmberBackground from "./components/EmberBackground";
import { AnimatePresence } from "framer-motion";
import { soulsborneBackgrounds } from "./assets/assets.js";
import { errorBoundaryAssets } from "./assets/assets.js";

//ERROR BOUNDARY BECAUSE AS I WORK ON THIS MORE AND MORE I REALIZE MY DUMBAHH NEEDS IT
const globalErrorAudio = new Audio(errorBoundaryAssets.errorSound);
function ErrorFallback({ error, resetErrorBoundary }) {

  useEffect(() => {
    if (globalErrorAudio.paused) {
      globalErrorAudio.currentTime = 0;
      globalErrorAudio.play().catch((err) => {
        console.warn('Code so bad even the error sound does not work', err);
      });
    }
    // on the highly unlikely chance it clicking try again actually fixes it
    return () => {
      globalErrorAudio.pause();
    };
  }, []);

  return (
  <div role='alert' className='flex flex-col items-center justify-center py-20 bg-red-50 dark:bg-red-950/20 rounded-3xl border border-red-200'>
    <p className='text-xl font-bold text-red-600 mb-4'>Sowwy something went wong with our services</p>
    <img src={errorBoundaryAssets.errorImage} alt="visualized error" className='w-48 mb-6' />
    <pre className='text-xs text-red-400 bg-black/5 p-4 rounded-lg mb-6'>
      {error.message}
    </pre>
    <button 
    onClick={resetErrorBoundary}
    className='px-8 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors'
    >Twy Again
    </button>
  </div>

  )
}

//ACTUAL APP STARTS HERE

const App = () => {
  const [formKey, setFormKey] = useState(0);


  //vibed some placeholders so I can test stuff
  const [tasks, setTasks] = useState(() => {
    const initialQuests = [
      { title: "Defeat the Taurus Demon", desc: "He guards the wall of the Undead Burg." },
      { title: "Ring the Bell of Awakening", desc: "High above in the Undead Parish." },
      { title: "Traverse Blighttown", desc: "Prepare for toxicity, framerate drops, and despair." },
      { title: "Kindle the Firelink Shrine", desc: "Offer humanity to strengthen the flame." },
      { title: "Explore the Depths", desc: "Beware the Basilisk curses in the sewers." },
      { title: "Slay the Gaping Dragon", desc: "A terrifying maw awaits in the lowest depths." },
      { title: "Navigate Sen's Fortress", desc: "A funhouse of traps, swinging axes, and serpent men." },
      { title: "Discover Anor Londo", desc: "The city of the gods, bathed in eternal sunlight." },
      { title: "Defeat Ornstein & Smough", desc: "The ultimate test of endurance and spatial awareness." },
      { title: "Obtain the Lordvessel", desc: "The key to unlocking the sealed areas of Lordran." }
    ];

    return initialQuests.map(quest => ({
      id: crypto.randomUUID(),
      title: quest.title,
      description: quest.desc,
      imageBg: soulsborneBackgrounds[Math.floor(Math.random() * soulsborneBackgrounds.length)],
      completed: false,
      priority: ["High", "Medium", "Low"][Math.floor(Math.random() * 3)],
      dueDate: ""
    }));
  });

  const [bannerText, setBannerText] = useState(null);
  const [taskCompleteId, setTaskCompleteId] = useState(null);
  const [inspectedTask, setInspectedTask] = useState(null);
  const [newTaskPriority, setNewTaskPriority] = useState("Low");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortCriteria, setSortCriteria] = useState("Default");
  const [sortDirection, setSortDirection] = useState('desc');



  const addTask = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const taskTitle = formData.get("taskTitle");
    const taskDesc = formData.get('taskDesc');

    if (!taskTitle.trim()) return;

    const randomBg = soulsborneBackgrounds[Math.floor(Math.random() * soulsborneBackgrounds.length)];

    const newTask = {
      id: crypto.randomUUID(),
      title: taskTitle,
      description: taskDesc,
      imageBg: randomBg,
      completed: false,
      priority: newTaskPriority,
      dueDate: newTaskDate,
    };

    setTasks([...tasks, newTask]);
    setNewTaskDate("");
    form.reset();
  };

  const toggleTaskComplete = (taskId) => {
    setTaskCompleteId(taskId);
    setTimeout(() => {
    if (Math.floor(Math.random() * 1000) === 1) setBannerText('Kill Yourself');
    setBannerText("Task Completed");

    setTimeout(() => {
      setBannerText(null);
      setTaskCompleteId(null);

      setTasks(currentTasks => currentTasks.map(task => 
        task.id === taskId ? { ...task, completed: true} : task
      ));
    }, 2000);

    }, 800);

  };

  const updateTask = (taskId, newTitle, newDesc, newPriority, newDate) => {
    setTasks(currentTasks => currentTasks.map(task => 
      task.id === taskId ? {...task, title: newTitle, description: newDesc, priority: newPriority, dueDate: newDate} : task
    ));
  };

  const completedTasks = tasks.filter(task => task.completed);

  let activeTasks = tasks.filter((task) => !task.completed);

  if (priorityFilter !== 'All') {
    activeTasks = activeTasks.filter(task => task.priority === priorityFilter);
  } 

  if (sortCriteria === 'Date') {
    activeTasks.sort((a, b) => {
      if (!a.dueDate) return 1; 
      if (!b.dueDate) return -1;
      const dateDifference = new Date(a.dueDate) - new Date(b.dueDate);
      return sortDirection === 'desc' ? dateDifference : -dateDifference;
    });
  } else if (sortCriteria === 'Priority') {
    const prioWeight = { High: 3, Medium: 2, Low: 1};
    activeTasks.sort((a, b) => {
      const prioDifference = prioWeight[b.priority] - prioWeight[a.priority];
      return sortDirection === 'desc' ? prioDifference : -prioDifference;
    });
  }

  return (
    <>
      <main className="min-h-screen font-serif p-6 flex flex-col items-center relative overflow-hidden">

        <CompletedBanner text={bannerText} />

        <EmberBackground />
        <div className="pointer-events-none fixed inset-0 z-0 hidden lg:block bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.9)_100%)]"></div>
        <TaskModal
          task={inspectedTask}
          onClose={() => setInspectedTask(null)}
          onUpdate={updateTask}
          onComplete={toggleTaskComplete}
        />

        <header className="mb-12 mt-16 text-center">

          <h1 className="relative z-10 text-4xl md:text-6xl text-souls-estus uppercase tracking-wide leading-relaxed border-y border-souls-stone [text-shadow:0_0_3px_#d48e37,0_0_15px_rgba(212,175,55,0.6)]">
            Bonfire Lit
          </h1>
          <p className="mt-4 text-sm tracking-wider opacity-70">
            Rest and organize your burdens
          </p>
        </header>
        {/*FORM TO ADD NEW STUFF */}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setFormKey((prevKey) => prevKey +1);
          }}
        >
        <form 
          onSubmit={addTask} 
          className="w-full max-w-2xl mb-8 flex flex-col gap-4 border border-souls-stone p-6 bg-souls-abyss/60"
          key={formKey}
        >
          <input
            type="text"
            name="taskTitle"
            placeholder="Enter a new task"
            autoComplete="off"
            className="w-full bg-transparent border-b border-souls-stone text-souls-paper p-2 focus:outline-none focus:border-souls-estus transition-colors font-serif text-xl md:text-2xl duration-500"
          />
          <textarea
            name='taskDesc'
            placeholder='Enter task details (optional)...'
            rows='2'
            className="w-full bg-transparent border-b border-souls-stone text-souls-paper p-2 focus:outline-none focus:border-souls-estus transition-colors font-serif text-md resize-none duration-500">
          </textarea>
          <div className="flex justify-between mt-2">
            <PriorityMenu 
              value={newTaskPriority} 
              onChange={(prio) => setNewTaskPriority(prio)}
            />
            <DatePicker
              value={newTaskDate}
              onChange={(date) => setNewTaskDate(date)}
            />
          <button
            type="submit"
            className="px-8 py-2 border border-souls-stone text-souls-paper hover:text-souls-abyss hover:bg-souls-estus hover:border-souls-estus transition-all duration-300 uppercase tracking-wider text-sm cursor-pointer"
          >
            Accept
          </button>
          </div>

        </form>
        </ErrorBoundary>
        <div className="w-full max-w-2xl flex items-center justify-center gap-6 mb-6 mt-8">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-souls-stone to-transparent"></div>
          <h3 className="text-souls-estus/90 uppercase text-lg text-center drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">Active Quests</h3>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-souls-stone to-transparent"></div>
        </div>
        
          <div className="w-full max-w-2xl mb-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-serif border-y border-souls-stone/40 py-3 px-4 bg-black/40 shadow-inner">
            <div className="flex items-center gap-3">
              <span className="text-souls-paper uppercase tracking-wider">Filter: </span>
              {['All', 'High', 'Medium', 'Low'].map(prio => (
                <button
                  key={prio}
                  onClick={() => setPriorityFilter(prio)}
                  className={`uppercase tracking-wider px-2 py-1 transition-all duration-300 cursor-pointer ${
                    priorityFilter === prio 
                      ? 'text-souls-abyss bg-souls-estus shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                      : 'text-souls-paper/50 hover:text-souls-paper hover:bg-souls-stone/50'
                  }`}
                >
                  {prio === 'High' ? "High" : prio === 'Medium' ? 'Medium' : prio === 'Low' ? 'Low' : 'All'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-souls-paper uppercase tracking-wider">Sort: </span>
              {['Default', 'Date', 'Priority'].map(sort => (
                <button
                  key={sort}
                  onClick={() => {
                    if (sortCriteria === sort && sort!== 'Default') {
                      setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
                    } else {
                      setSortCriteria(sort);
                      setSortDirection('desc');
                    }
                  }}
                  className={`flex items-center uppercase tracking-wider px-2 py-1 transition-all duration-300 cursor-pointer ${
                    sortCriteria === sort
                      ? 'text-souls-abyss bg-souls-paper/65 shadow-[0_0_10px_rgba(209,209,196,0.4)]'
                      : 'text-souls-paper/50 hover:text-souls-paper hover:bg-souls-stone/50'
                  }`}
                >
                  {sort}
                  {sortCriteria === sort && sort!=='Default' && (
                    <span className={`text-[10px] ml-1 transition-transform duration-300 ${sortDirection === 'asc' ? 'rotate-180' : 'rotate-0'}`}>
                      ▼
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        <div className="w-full max-w-2xl space-y-4 pb-32 ">
          {/* THROW ALL THE TASKS HERE FOR NOW IDK WHERE TO PUT THEM YET TBH
                NOTE FOR FUTURE ME: MAYBE HAVE HERO / LOADER SCREEN FIRST?
            */}

          {activeTasks.length === 0 ? (
            <div className="text-center italic opacity-50 border border-souls-stone p-8 text-souls-paper">
              The task list is empty...
            </div>
          ) : (
            <AnimatePresence mode='popLayout'>
              {activeTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isCompleting={taskCompleteId === task.id}
                  onToggle={() => toggleTaskComplete(task.id)}
                  onInspect={() => setInspectedTask(task)}
                />
              ))}
            </AnimatePresence>

          )}

          {completedTasks.length > 0 && (
            <div className="mt-12 pt-6 border-t border-souls-stone/30">
               <div className="w-full max-w-2xl flex items-center justify-center gap-6 mb-6 mt-8">
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-souls-stone to-transparent"></div>
                  <h3 className="text-souls-estus/80 uppercase text-lg mb-6 text-center">Completed Quests</h3>
                  <div className="h-px flex-1 bg-linear-to-r from-transparent via-souls-stone to-transparent"></div>
              </div>
              <div className="space-y-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {completedTasks.map((task) => (
                  <TaskItem
                  key={task.id}
                  task={task}
                  onInspect={() => setInspectedTask(task)} 
                  />
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
