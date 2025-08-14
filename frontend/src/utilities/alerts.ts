import Swal, { SweetAlertEventName } from 'sweetalert2';

export const AccountNotFoundAlert = async () => {
  await Swal.fire({
    title: "Account Not Found",
    text: "We could not find an account with that email address and/or password.",
    icon: "error",
    confirmButtonText: "OK",
    animation: true,
  })
}
