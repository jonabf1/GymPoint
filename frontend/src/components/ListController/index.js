import React from "react";
import PropTypes from "prop-types";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Container } from "./styles";
import color from "../../styles/colors";

import CustomButton from "../buttons/customButton";
import EmptyList from "../emptyList";

export default function ListController({
  onAdd,
  onRemove,
  boolAdd,
  boolRemove,
  page,
  empty
}) {
  return (
    <Container>
      {empty ? (
        <>
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
        </>
      ) : (
        <EmptyList>Lista vazia</EmptyList>
      )}
    </Container>
  );
}

ListController.propTypes = {
  page: PropTypes.number.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  boolAdd: PropTypes.bool.isRequired,
  boolRemove: PropTypes.bool.isRequired,
  empty: PropTypes.bool.isRequired
};
