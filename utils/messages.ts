import { INVALID } from "zod";

interface MessageCategory {
  [key: string]: string;
}

interface Messages {
  AUTH: MessageCategory;
  COMMON: MessageCategory;
  BOARD: MessageCategory;
  COLUMN: MessageCategory;
  TASK: MessageCategory;
  BG_IMAGE: MessageCategory;
  DATE: MessageCategory;
  DESCRIPTION: MessageCategory;
  USER_TO_TASK: MessageCategory;
  ACTIVITY: MessageCategory;
  CHECKLIST: MessageCategory;
  CHECKLIST_ITEM: MessageCategory;
  INVITATION: MessageCategory;
}

export const MESSAGES: Messages = {
  AUTH: {
    REQUIRED: "Authentication required",
  },
  COMMON: {
    BOARD_ID_REQUIRED: "Board ID is required",
    COLUMN_ID_REQUIRED: "Column ID is required",
    TASK_ID_REQUIRED: "Task ID is required",
    ACTIVITY_ID_REQUIRED: "Activity ID is required",
    CHECKLIST_ID_REQUIRED: "Checklist ID is required",
    CHECKLIST_ITEM_ID_REQUIRED: "Checklist ID is required",
  },
  BOARD: {
    CREATE_SUCCESS: "Board Created",
    CREATE_FAILURE: "Failed to create board",
    UPDATE_SUCCESS: "Board Updated",
    UPDATE_FAILURE: "Failed to update board",
    DELETE_SUCCESS: "Board Removed",
    DELETE_FAILURE: "Failed to delete board",
    TITLE_TOO_SHORT: "Title must be at least 3 characters",
    OWNER_ONLY_DELETE: "Only the owner can delete this board",
  },
  COLUMN: {
    CREATE_SUCCESS: "New Column Created",
    CREATE_FAILURE: "Failed to create column",
    UPDATE_SUCCESS: "Column Updated",
    UPDATE_FAILURE: "Failed to update column",
    DELETE_SUCCESS: "Column Removed",
    DELETE_FAILURE: "Failed to delete column",
    DELETE_COLUMN_TASKS_SUCCESS: "Tasks Deleted",
    DELETE_COLUMN_TASKS_FAILURE: "Failed to delete tasks in this column",
    TITLE_TOO_SHORT: "Name too short (min 3 chars)",
  },
  TASK: {
    CREATE_SUCCESS: "Task Created",
    CREATE_FAILURE: "Failed to create task",
    UPDATE_SUCCESS: "Task Updated",
    UPDATE_FAILURE: "Failed to update task",
    DELETE_SUCCESS: "Task Removed",
    DELETE_FAILURE: "Failed to delete task",
    TITLE_TOO_SHORT: "Title must be at least 3 characters",
  },
  BG_IMAGE: {
    IMAGE_SAVE_SUCCESS: "Board image saved",
    IMAGE_SAVE_FAILURE: "Failed to save board image",
    IMAGE_REMOVE_SUCCESS: "Board image removed",
    IMAGE_REMOVE_FAILURE: "Failed to remove board image",
    IMAGE_URL_REQUIRED: "Image URL is required",
  },
  DATE: {
    CREATE_SUCCESS: "Date updated",
    CREATE_FAILURE: "Failed to update date",
  },
  DESCRIPTION: {
    UPDATE_SUCCESS: "Description updated",
    UPDATE_FAILURE: "Failed to update description",
    DELETE_SUCCESS: "Description removed",
    DELETE_FAILURE: "Failed to remove description",
    DESCRIPTION_TOO_SHORT: "Description too short (min 1 chars)",
  },
  USER_TO_TASK: {
    CREATE_SUCCESS: "User assigned to task",
    CREATE_FAILURE: "Failed to assign user to task",
    DELETE_SUCCESS: "User removed from task",
    DELETE_FAILURE: "Failed to remove user from task",
  },
  ACTIVITY: {
    CREATE_SUCCESS: "Activity created",
    CREATE_FAILURE: "Failed to create activity",
    DELETE_SUCCESS: "Activity deleted",
    DELETE_FAILURE: "Failed to delete activity",
    CONTENT_TOO_SHORT: "Content too short (min 1 chars)",
    CONTENT_TOO_LONG: "Content too long (max 500 chars)",
  },
  CHECKLIST: {
    CREATE_SUCCESS: "Checklist created",
    CREATE_FAILURE: "Failed to create checklist",
    DELETE_SUCCESS: "Checklist deleted",
    DELETE_FAILURE: "Failed to delete checklist",
    TITLE_TOO_LONG: "Content too long (max 100 chars)",
  },
  CHECKLIST_ITEM: {
    CREATE_SUCCESS: "Checklist item created",
    CREATE_FAILURE: "Failed to create checklist item",
    UPDATE_SUCCESS: "Checklist item updated",
    UPDATE_FAILURE: "Failed to update checklist item",
    DELETE_SUCCESS: "Checklist item deleted",
    DELETE_FAILURE: "Failed to delete checklist item",
    TOGGLE_SUCCESS: "Checklist item toggled",
    TOGGLE_FAILURE: "Failed to toggle checklist item",
    CONTENT_TOO_SHORT: "Content too short (min 1 chars)",
    CONTENT_TOO_LONG: "Content too long (max 100 chars)",
  },
  INVITATION: {
    CREATE_SUCCESS: "Invitation sent",
    CREATE_FAILURE: "Failed to send invitation",
    ACCEPT_SUCCESS: "Invitation accepted",
    ACCEPT_FAILURE: "Failed to accept invitation",
    REJECT_SUCCESS: "Invitation rejected",
    REJECT_FAILURE: "Failed to reject invitation",
    REMOVE_USER_SUCCESS: "User removed from board",
    REMOVE_USER_FAILURE: "Failed to remove user from board",
    USER_EMAIL_REQUIRED: "User email is required",
    USER_ID_REQUIRED: "User ID is required",
    INVITATION_ALREADY_SENT:
      "An invitation has already been sent to this email",
    TOKEN_REQUIRED: "Token is required",
    INVALID_OR_PROCESSED: "Invalid or already processed invitation",
  },
};
