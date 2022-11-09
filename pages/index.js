import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming events</h1>
      {events.length === 0 && <h3>Not Events to show</h3>}

      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.data.length === 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?[populate]=*`);
  const events = await res.json();

  return {
    props: { events: events },
  };
}
