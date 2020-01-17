import React from "react";
import PropTypes from "prop-types";

import { MdFiberManualRecord } from "react-icons/md";
import TextLink from "../../buttons/TextLink";
import color from "../../../styles/colors";

export default function TableGenerator({
  data,
  path,
  onDelete,
  fields,
  onSearch
}) {
  return (
    <tr>
      {onSearch
        ? fields.map(field => <td>{onSearch[field]}</td>)
        : fields.map(field =>
            field === "active" && data.active ? (
              <td>
                <MdFiberManualRecord color="#6DC81E" size={20} />
              </td>
            ) : (
              <td>{data[field]}</td>
            )
          )}
      <td>
        <TextLink to={path} color={color.editTable}>
          editar
        </TextLink>
        <TextLink type="button" onClick={onDelete} color={color.deleteTable}>
          apagar
        </TextLink>
      </td>
    </tr>
  );
}

TableGenerator.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.number,
    height: PropTypes.number,
    weight: PropTypes.number
  }).isRequired,
  onSearch: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.number,
    height: PropTypes.number,
    weight: PropTypes.number
  }),
  fields: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  path: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

TableGenerator.defaultProps = {
  onSearch: false
};
