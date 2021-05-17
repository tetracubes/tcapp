import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Success(message) {
  toast.success(message);
}
export function Error(message) {
  toast.error(message);
}
export function Warning(message) {
  toast.warn(message);
}
export function Info(message) {
  toast.info(message);
}
export function Default(message) {
  toast(message);
}
export function Config() {
  toast.configure({
    autoClose: 4000,
    draggable: true
    //etc you get the idea
  });
}
