export default {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "blue"
  }),
  control: styles => ({
    ...styles,
    width: 200,
    marginRight: 10
  })
};
