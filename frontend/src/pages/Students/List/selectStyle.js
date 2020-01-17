export default {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "blue",
    padding: 20
  }),
  control: styles => ({
    ...styles,
    marginLeft: 10,
    width: 200
  })
};
