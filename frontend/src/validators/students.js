import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("O e-mail é obrigatório"),
  age: Yup.number()
    .min(10, "A idade deve ser maior que 10 anos")
    .positive("Insira um numero válido")
    .max(120, "Idade inválida")
    .required("A idade é obrigatória")
    .typeError("A idade é obrigatória"),
  weight: Yup.number("Insira um número válido")
    .required("O peso obrigatório")
    .positive("Insira um numero válido")
    .typeError("O peso é obrigatório"),
  height: Yup.number("Insira um número válido")
    .required("A altura é obrigatória")
    .positive("Insira um numero válido")
    .typeError("A altura é obrigatória")
});
