import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import { useRouter } from "next/router";
import qs from "qs";

export default function SearchPage({ events }) {
  const router = useRouter()
  return (
    <Layout>
      <h1> events</h1>
      <Link href='/events'>Go Back</Link>
      <h1>Search results for {router.query.term}</h1>
      {events.data.length === 0 && <h3>Not Events to show</h3>}

      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    sort: ["name:asc"],
    populate: "*",
    filters: {
      $or: [
        { name: { $contains: term } },
        { performers: { $contains: term } },
        { description: { $contains: term } },
        { venue: { $contains: term } },
      ],
    },
  });

  const res = await fetch(`${API_URL}/api/events?${query}`);

  const events = await res.json();
  console.log(events, "e");

  return {
    props: { events },
  };
}

// $or: [
//   { name: { $contains: term } },
//   { performers: { $contains: term } },
//   { description: { $contains: term } },
//   { venue: { $contains: term } },
// ],
