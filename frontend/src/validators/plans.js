import * as Yup from "yup";

export default Yup.object().shape({
  title: Yup.string().required("O nome é obrigatório"),
  duration: Yup.number()
    .min(1, "A duração é de no minimo um mês")
    .positive("Insira um número válido")
    .required("A duração é obrigatória")
    .typeError("A duração é obrigatória"),
  price: Yup.number("Insira um número válido")
    .required("O preço obrigatório")
    .positive("Insira um numero válido")
    .typeError("O preço é obrigatório")
});
