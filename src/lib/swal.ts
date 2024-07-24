import Swal from "sweetalert2";

export const swalError = (text: string) => {
  Swal.fire({
    icon: "error",
    text,
  });
};
