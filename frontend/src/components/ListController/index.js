import React from "react";
import PropTypes from "prop-types";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Container } from "./styles";
import color from "../../styles/colors";

import CustomButton from "../buttons/customButton";
import EmptyList from "../emptyList";

export default function ListController({
  next,
  back,
  disableNext,
  disableBack,
  page,
  empty
}) {
  return (
    <Container>
      {empty ? (
        <>
          <CustomButton
            onClick={back}
            type="submit"
            bool={disableBack}
            width="auto"
            height="auto"
          >
            <FaChevronLeft color={color.buttonPageHeaderPrimary} size={24} />
          </CustomButton>
          <p>{page}</p>
          <CustomButton
            onClick={next}
            bool={disableNext}
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
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  disableNext: PropTypes.bool.isRequired,
  disableBack: PropTypes.bool.isRequired,
  empty: PropTypes.bool.isRequired
};
