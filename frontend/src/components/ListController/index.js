import React from "react";
import PropTypes from "prop-types";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Container } from "./styles";
import CustomButton from "../buttons/customButton";
import color from "../../styles/colors";

export default function ListController({
  onAdd,
  onRemove,
  boolAdd,
  boolRemove,
  page
}) {
  return (
    <Container>
      <CustomButton
        onClick={onRemove}
        type="submit"
        bool={boolRemove}
        width="auto"
        height="auto"
      >
        <FaChevronLeft color={color.buttonPageHeaderPrimary} size={24} />
      </CustomButton>
      <p>{page}</p>
      <CustomButton
        onClick={onAdd}
        bool={boolAdd}
        width="auto"
        height="auto"
        type="submit"
      >
        <FaChevronRight color={color.buttonPageHeaderPrimary} size={24} />
      </CustomButton>
    </Container>
  );
}

ListController.propTypes = {
  page: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  boolAdd: PropTypes.bool.isRequired,
  boolRemove: PropTypes.bool.isRequired
};
