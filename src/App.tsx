import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { getDataFromServer } from './helpers/api';
import { Tabs } from './components/Tabs';
import { ClubsList } from './components/ClubsList';
import './App.scss';

const App = () => {
  const [clubList, setClubList] = useState<Club[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>('');
  const [currentActivityFilter, setCurrentActivityFilter] = useState<string>('');
  const [filtersArr, setFiltersArr] = useState<string[]>([]);

  const citiesFilter = () => {
    const filters:string[] = clubList.map(item => item.city.title);

    // @ts-ignore
    setFiltersArr([...new Set<string[]>(filters)]);
  }

  const activityFilter = () => {
    const filters:Activity[][] = filteredClubList.map(item => item.activity);

    const filtered = filters.reduce((prev, item) => {
      return prev.concat(item);
    }, []);

    const result = filtered.map(item => item.title)

    // @ts-ignore
    return [...new Set<string[]>(result)]
  }

  const changeCurrentFilter = (value: string) => {
    if ( value === currentFilter) {
      setCurrentFilter('');
      return;
    }

    setCurrentFilter(value);
  }

  const changeCurrentActivity = (value: string) => {
    if ( value === currentActivityFilter) {
      setCurrentActivityFilter('');
      return;
    }

    setCurrentActivityFilter(value);
  }

  const resetFilters = () => {
    setCurrentActivityFilter('');
    setCurrentFilter('');
  }

  const getClubList = () => {
    getDataFromServer()
      .then(data => setClubList(data))
  }

  const tabs = useCallback(() => {
    return citiesFilter();
  }, [clubList])

  useEffect(() => {
    getClubList();
  }, [])

  useEffect(() => {
    tabs();
  }, [tabs])

  console.log(clubList)

  const filteredClubList = useMemo(() => {
    return clubList.filter(
      item => (
        item.city.title.includes(currentFilter)
        && item.activity.find((value => Boolean(value.title.includes(currentActivityFilter))))
      )
    );
  }, [clubList, currentFilter, currentActivityFilter])

  const filtersActivity = useMemo(() => {
    return activityFilter();
  }, [filteredClubList]);

  return (
    <div className="app">
      <button
      type="button"
      onClick={resetFilters}
      >
        reset
      </button>

      <h2>Города:</h2>
      <Tabs
        filters={filtersArr}
        callback={changeCurrentFilter}
        type="city"
        filterType={currentFilter}
      />

      <h2>Направления:</h2>
      <Tabs
        filters={filtersActivity}
        callback={changeCurrentActivity}
        type="activity"
        filterType={currentActivityFilter}
      />

      <ClubsList
        list={filteredClubList}
      />
    </div>
  );
}

export default App;
