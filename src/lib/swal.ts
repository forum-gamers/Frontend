import Swal from "sweetalert2";

export interface SwalAskDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
}

export const swalError = (text: string) => {
  Swal.fire({
    icon: "error",
    text,
  });
};

export const swalAskDelete = ({
  onCancel,
  onConfirm,
  confirmText,
}: SwalAskDeleteProps) =>
  Swal.fire({
    icon: "question",
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmText,
  }).then(({ isConfirmed, isDenied, isDismissed }) => {
    switch (true) {
      case isConfirmed:
        onConfirm();
        break;
      case isDenied:
      case isDismissed:
      default:
        onCancel();
    }
  });
