import TaskGroup from "@/ui/Task/TaskGroup";
import TaskItem from "@/ui/Task/TaskItem";

const dummyData = [
  {
    taskGroupTitle: "Group 1",
    id: 1, 
    tasks: [
      { taskTitle: "Task 1.1", taskPriority: "High" },
      { taskTitle: "Task 1.2", taskPriority: "Medium" },
      { taskTitle: "Task 1.3", taskPriority: "Low" },
    ],
  },
  {
    taskGroupTitle: "Group 2",
    id: 2, 
    tasks: [
      { taskTitle: "Task 2.1", taskPriority: "Low" },
      { taskTitle: "Task 2.2", taskPriority: "High" },
    ],
  },
];

export default function Home() {
  return (
    <div className="flex gap-x-5">
      {dummyData.map(group => (
        <TaskGroup key={group.taskGroupTitle} taskGroupTitle={group.taskGroupTitle}>
          {group.tasks.map(task => (
            <TaskItem 
              key={task.taskTitle} 
              taskTitle={task.taskTitle} 
              taskPriority={task.taskPriority} 
            />
          ))}
        </TaskGroup>
      ))}
    </div>
  );
}
