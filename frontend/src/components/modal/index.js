import Swal from "sweetalert2";
import color from "../../styles/colors";

export default async function Modal({
  title,
  text,
  confirmText,
  cancelText,
  finalText,
  icon,
  inputPlaceholder,
  ...rest
}) {
  let response;
  await Swal.fire({
    title,
    text,
    icon,
    inputPlaceholder,
    showCancelButton: true,
    confirmButtonColor: color.buttonPageHeaderPrimary,
    cancelButtonColor: color.buttonPageHeaderSecondary,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    ...rest
  }).then(result => {
    if (result.value) {
      Swal.fire(finalText, "", "success");
      response = result.value;
    }
  });

  return response;
}
