import Swal from "sweetalert2";
import color from "../../styles/colors";

export default async function Modal({
  title,
  text,
  confirmText,
  cancelText,
  finalText,
  icon
}) {
  let response;
  await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: color.buttonPageHeaderPrimary,
    cancelButtonColor: color.buttonPageHeaderSecondary,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText
  }).then(result => {
    if (result.value) {
      Swal.fire(finalText, "", "success");
      response = result.value;
    }
  });

  return response;
}
