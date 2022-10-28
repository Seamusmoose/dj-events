import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1> events</h1>
      {events.length === 0 && <h3>Not Events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events },
    // revalidate: 1,
  };
}
