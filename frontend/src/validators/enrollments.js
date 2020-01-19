import * as Yup from "yup";

export default Yup.object().shape({
  student: Yup.string().required("Escolha um estudante"),
  date: Yup.string().required("Escolha uma data"),
  plan: Yup.string().required("Escolha um plano")
});
