interface MessageCategory {
  CREATE_SUCCESS: string;
  CREATE_FAILURE: string;
  [key: string]: string;
}

interface Messages {
  AUTH: {
    REQUIRED: string;
  };
  BOARD: MessageCategory;
  COLUMN: MessageCategory;
}

export const MESSAGES: Messages = {
  AUTH: {
    REQUIRED: "Authentication required",
  },
  BOARD: {
    CREATE_SUCCESS: "Board Created",
    CREATE_FAILURE: "Failed to create board",
    AUTH_FAILURE: "User is not authenticated",
    TITLE_TOO_SHORT: "Title must be at least 3 characters",
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
};
