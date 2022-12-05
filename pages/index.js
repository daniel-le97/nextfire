import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import react from "react";
import Link from "next/link";
import Loader from "../components/Loader";

export default function Home() {
  return (
    <div className=''>
      {/* <Link
        prefetch={true}
        href={{
          pathname: "/[username]",
          query: { username: "daniel" },
        }}>
        dan
      </Link> */}

      <div>
        <Loader show />
      </div>
    </div>
  );
}
