import React from 'react';

type Props = {
  list: Club[];
}

export const ClubsList: React.FC<Props> = ({ list }) => {
  return (
    <ul>
      {
        list.map(item => (
          <li key={item.link}>
            <a href={item.link}>
              <img src={item.logo} alt={item.title_short}/>
              <h2>{item.title}</h2>
            </a>
          </li>
        ))
      }
    </ul>
  )
}