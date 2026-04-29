import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TaskModal = ({ task, onClose, onUpdate, onComplete }) => {

  const [activeTask, setActiveTask] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");
  useEffect(() => {
    if (task) {
      document.body.style.overflow = "hidden";
      setActiveTask(task);
      setEditedTitle(task.title);
      setEditedDesc(task.description || "");
      setIsEditing(false);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [task]);

  const handleSave = () => {
    if (!editedTitle.trim()) return;
    onUpdate(activeTask?.id, editedTitle, editedDesc);
    setIsEditing(false);
  };

  const handleComplete = () => {
    onComplete(activeTask?.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {task && activeTask && (
        <motion.div
          key="task-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ y: 30, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-souls-abyss border border-souls-stone shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-64 md:h-80">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${activeTask.imageBg})` }}
              ></div>
              <div className="absolute inset-0 bg-linear-to-t from-souls-abyss via-black/40 to-transparent"></div>
            </div>

            <div className="relative z-10 p-8 flex flex-col gap-6 -mt-16">
              {isEditing ? (
                <>
                  <textarea
                    rows={editedTitle.length > 25 ? 2 : 1}
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className='w-full bg-transparent text-3xl md:text-5xl font-serif text-souls-estus tracking-wide drop-shadow-md border-b border-souls-stone/50 pb-6 focus:outline-none resize-none focus:border-souls-estus/50 transition-colors'
                  ></textarea>
                  <div className="min-h-30">
                  <textarea
                    rows="4"
                    value={editedDesc}
                    onChange={(e) => setEditedDesc(e.target.value)}
                    placeholder="Inscribe lore for this quest..."
                    className="w-full bg-transparent text-lg text-souls-paper/90 font-serif italic leading-relaxed resize-none focus:outline-none placeholder:text-souls-paper/30 border-b border-transparent focus:border-souls-estus/50 transition-colors"
                  ></textarea>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl md:text-5xl font-serif text-souls-estus tracking-wide drop-shadow-md border-b border-souls-stone/50 pb-6">
                    {activeTask.title}
                  </h2>

                  <div className="min-h-30">
                    {activeTask.description ? (
                      <p className="text-lg text-souls-paper/90 font-serif italic leading-relaxed">
                        "{activeTask.description}"
                      </p>
                    ) : (
                      <p className="text-lg text-souls-paper/30 font-serif italic">
                        No lore inscribed for this quest...
                      </p>
                    )}
                  </div>
                </>
              )}

              <div className="flex justify-between items-end mt-4 pt-6 border-t border-souls-stone/30">
                {!activeTask.completed ? (
                <button
                  onClick={handleComplete}
                  className="px-6 py-2 border border-souls-estus text-souls-estus hover:bg-souls-estus hover:text-souls-abyss transition-all duration-300 uppercase tracking-wide text-sm cursor-pointer shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                >
                  Complete Quest
                </button>
                ) : ( 
                  <div></div>
                )}


                <div className="flex gap-4">
                  {!activeTask.completed && (isEditing ? (
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 border border-souls-estus text-souls-estus hover:bg-souls-estus hover:text-souls-abyss transition-all duration-300 uppercase tracking-wider text-sm cursor-pointer"
                    >
                      Save Lore
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2 border border-souls-stone text-souls-paper hover:text-souls-estus hover:border-souls-estus transition-all duration-300 uppercase tracking-wider text-sm cursor-pointer"
                    >
                      Alter
                    </button>
                    )
                  )}
                  <button
                    onClick={onClose}
                    className="px-8 py-2 border border-souls-stone text-souls-paper hover:text-souls-abyss hover:bg-souls-estus hover:border-souls-estus transition-all duration-300 uppercase tracking-wider text-sm cursor-pointer"
                  >
                    Return
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
