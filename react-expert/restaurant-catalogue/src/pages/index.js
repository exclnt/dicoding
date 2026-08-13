import RestaurantList from "@/components/RestaurantsList";

export async function getStaticProps() {
  const response = await fetch("https://restaurant-api.dicoding.dev/list");
  const { restaurants } = await response.json();
  console.log(restaurants)

  return {
    props: {
      restaurants,
    },
  };
}

export default function Home({ restaurants }) {
  return (
    <div className='container'>
      <RestaurantList restaurants={restaurants} />
    </div>
  )
};