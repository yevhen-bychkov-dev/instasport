import React from 'react';
import cn from 'classnames';

type Props = {
  filters: string[];
  callback: (value: string) => void;
  type: string;
  filterType: string;
}

export const Tabs: React.FC<Props> = ({ filters, callback, type, filterType }) => {
  return (
    <div className={type}>
      {
      filters.map(item => (
        <button
          className={cn({active: item === filterType})}
          type="button"
          key={item}
          onClick={() => callback(item)}
        >
          {item}
        </button>
        ))
      }
    </div>
  )
}
