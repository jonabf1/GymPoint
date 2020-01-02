import React from "react";
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
