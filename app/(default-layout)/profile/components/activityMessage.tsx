import { format } from "date-fns";
import { ActivityWithUser } from "@/types/types";
import { ActivityType } from "@prisma/client";

const bold = (text: string) => <span className="font-semibold">{text}</span>;

const formatDate = (date: Date | null) => {
  return date ? format(new Date(date), "dd/MM/yyyy") : "N/A";
};

export const generateActivityMessage = (activity: ActivityWithUser) => {
  const taskTitle = activity.task?.title ?? "Unnamed Task";
  const oldColumnTitle = activity.oldColumn?.title ?? "Previous Column";
  const newColumnTitle = activity.newColumn?.title ?? "Next Column";
  const originalColumnTitle =
    activity.originalColumn?.title ?? "Original Column";
  const targetUserName = activity.targetUser?.name ?? "a user"; // Get the target user's name

  switch (activity.type) {
    case ActivityType.TASK_MOVED:
      return (
        <>
          Moved {bold(taskTitle)} from {bold(oldColumnTitle)} to{" "}
          {bold(newColumnTitle)}
        </>
      );
    case ActivityType.TASK_CREATED:
      return (
        <>
          Added {bold(taskTitle)} to {bold(originalColumnTitle)}
        </>
      );
    case ActivityType.START_DATE_ADDED:
      return (
        <>
          Set the start date of {bold(taskTitle)} to{" "}
          {bold(formatDate(activity.startDate))}
        </>
      );
    case ActivityType.START_DATE_UPDATED:
      return (
        <>
          Changed the start date of {bold(taskTitle)} to{" "}
          {bold(formatDate(activity.startDate))}
        </>
      );
    case ActivityType.START_DATE_REMOVED:
      return <>Removed the start date of {bold(taskTitle)}</>;
    case ActivityType.DUE_DATE_ADDED:
      return (
        <>
          Set the due date of {bold(taskTitle)} to{" "}
          {bold(formatDate(activity.dueDate))}
        </>
      );
    case ActivityType.DUE_DATE_UPDATED:
      return (
        <>
          Changed the due date of {bold(taskTitle)} to{" "}
          {bold(formatDate(activity.dueDate))}
        </>
      );
    case ActivityType.DUE_DATE_REMOVED:
      return <>Removed the due date of {bold(taskTitle)}</>;
    case ActivityType.TASK_UPDATED:
      return <>Updated {bold(taskTitle)}</>;
    case ActivityType.TASK_DELETED:
      return <>Deleted {bold(taskTitle)}</>;
    case ActivityType.COMMENT_ADDED:
      return (
        <>
          Added a comment to {bold(taskTitle)}: {bold(activity.content ?? "")}
        </>
      );
    case ActivityType.TASK_ASSIGNED:
      return (
        <>
          Assigned {bold(taskTitle)} to {bold(targetUserName)}
        </>
      );
    case ActivityType.TASK_UNASSIGNED:
      return (
        <>
          Unassigned {bold(taskTitle)} from {bold(targetUserName)}
        </>
      );
    default:
      return <>{activity.content}</>;
  }
};
