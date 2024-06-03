import toast from "react-hot-toast";

export const notifySuccess = (message) => {
  toast.success(message);
};

export const notifyFailure = (message) => {
  if (typeof message === "string") {
    toast.error(message);
  } else if (Array.isArray(message)) {
    message.forEach((msg) => toast.error(msg));
  } else if (typeof message === "object") {
    Object.values(message)
      .flat()
      .forEach((msg) => toast.error(msg));
  }
};
