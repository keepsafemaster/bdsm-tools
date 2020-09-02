import React from 'react';
import {withJsonFormsCellProps} from '@jsonforms/react';
import {DatePicker, Typography} from 'antd';
import moment from 'moment';

function DateCell(props) {
  const {
    data,
    className,
    id,
    enabled,
    visible,
    uischema,
    path,
    handleChange
  } = props;

  if (!visible) {
    return null;
  }

  const format = uischema.format || 'YYYY/MM/DD';
  const date = data ? moment(data, format) : undefined;
  return (
    <React.Fragment>
      <Typography>
        <Typography.Text>
          {uischema.label}
        </Typography.Text>
      </Typography>
      <DatePicker
        value={date}
        format={format}
        picker={uischema.picker}
        onChange={date => handleChange(path, date.format(format))}
        className={className}
        id={id}
        disabled={!enabled}
        style={{ minWidth: '50%' }}
      />
    </React.Fragment>
  );
}

export default withJsonFormsCellProps(DateCell);