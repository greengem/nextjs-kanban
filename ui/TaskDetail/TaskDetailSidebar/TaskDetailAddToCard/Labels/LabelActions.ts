import {
  handleRemoveLabel,
  handleSaveLabel,
  handleUpdateLabel,
  handleDeleteLabel,
  handleCreateLabel,
} from "@/actions/LabelServerActions";
import { toast } from "sonner";

export const saveLabel = async (
  labelId: string,
  taskId: string,
  boardId: string,
) => {
  try {
    await handleSaveLabel({ labelId, taskId, boardId });
  } catch (error) {
    console.error("Error adding label:", error);
  }
};

export const removeLabel = async (
  labelId: string,
  taskId: string,
  boardId: string,
) => {
  try {
    await handleRemoveLabel({ labelId, taskId, boardId });
  } catch (error) {
    console.error("Error removing label:", error);
  }
};

export const deleteLabel = async (labelId: string, boardId: string) => {
  const response = await handleDeleteLabel({ labelId, boardId });
  if (response.success) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};

export const createLabel = async (
  color: string,
  title: string,
  boardId: string,
  taskId: string,
) => {
  const response = await handleCreateLabel({ color, title, boardId, taskId });
  if (response.success) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};

export const updateLabel = async (
  labelId: string,
  color: string,
  title: string,
  boardId: string,
) => {
  const response = await handleUpdateLabel({ labelId, color, title, boardId });
  if (response.success) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};
