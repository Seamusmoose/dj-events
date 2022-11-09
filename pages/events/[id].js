// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
// import EventMap from "@/components/EventMap";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { useRouter } from "next/router";

export default function EventPage({ evt }) {
  const router = useRouter();

  console.log(evt);

  const att = evt.data.attributes;

  return (
    <Layout>
      <div className={styles.att}>
        <span>
          {new Date(att.date).toLocaleDateString("en-US")} at {att.time}
        </span>
        <h1>{att.name}</h1>
        {/* <ToastContainer /> */}
        {att.image && (
          <div className={styles.image}>
            <Image
              src={att.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{att.performers}</p>
        <h3>Description:</h3>
        <p>{att.description}</p>
        <h3>Venue: {att.venue}</h3>
        <p>{att.address}</p>

        {/* <EventMap evt={evt} /> */}

        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  const paths = events.data.map((evt) => ({
    params: { id: evt.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?[populate]=*`);
  const events = await res.json();

  return {
    props: {
      evt: events,
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ params: { id } }) {
//   const res = await fetch(`http://localhost:1337/api/events/${id}`);
//   const events = await res.json();

//   return {
//     props: {
//       evt: events[0],
//     },
//   };
// }
