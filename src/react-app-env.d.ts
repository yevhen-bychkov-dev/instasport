interface Club {
  activity: Activity[];
  city: City;
  link: string;
  logo: string;
  title: string;
  title_short: string;
}

interface City {
  title: string;
  slug: string;
}

interface Activity {
  title: string;
  slug: string;
}
