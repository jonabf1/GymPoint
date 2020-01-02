import React from "react";
import PropTypes from "prop-types";
import ButtonLink from "../../buttons/buttonLink";
import color from "../../../styles/colors";

export default function Item({ data, path, onDelete, fields }) {
  return (
    <tr>
      {fields.map(field => (
        <td>{data[field]}</td>
      ))}
      <td>
        <ButtonLink to={path} color={color.editTable}>
          editar
        </ButtonLink>
        <ButtonLink type="button" onClick={onDelete} color={color.deleteTable}>
          apagar
        </ButtonLink>
      </td>
    </tr>
  );
}

Item.propTypes = {
  data: PropTypes.string.isRequired,
  fields: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};
