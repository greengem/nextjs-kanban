interface MessageCategory {
  [key: string]: string;
}

interface Messages {
  AUTH: MessageCategory;
  BOARD: MessageCategory;
  COLUMN: MessageCategory;
  TASK: MessageCategory;
}

export const MESSAGES: Messages = {
  AUTH: {
    REQUIRED: "Authentication required",
  },
  BOARD: {
    CREATE_SUCCESS: "Board Created",
    CREATE_FAILURE: "Failed to create board",
    UPDATE_SUCCESS: "Board Updated",
    UPDATE_FAILURE: "Failed to update board",
    DELETE_SUCCESS: "Board Removed",
    DELETE_FAILURE: "Failed to delete board",
    IMAGE_SAVE_SUCCESS: "Board image saved",
    IMAGE_SAVE_FAILURE: "Failed to save board image",
    IMAGE_REMOVE_SUCCESS: "Board image removed",
    IMAGE_REMOVE_FAILURE: "Failed to remove board image",
    TITLE_TOO_SHORT: "Title must be at least 3 characters",
    BOARD_ID_REQUIRED: "Board ID is required",
    COLUMN_ID_REQUIRED: "Column ID is required",
    TASK_ID_REQUIRED: "Task ID is required",
    IMAGE_URL_REQUIRED: "Image URL is required",
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
    BOARD_ID_REQUIRED: "Board ID is required",
    COLUMN_ID_REQUIRED: "Column ID is required",
  },
  TASK: {
    CREATE_SUCCESS: "Task Created",
    CREATE_FAILURE: "Failed to create task",
  },
};
