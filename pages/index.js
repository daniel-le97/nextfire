import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import react, { useState } from "react";
import Link from "next/link";
import Loader from "../components/Loader";
import { firestore, fromMillies, postToJSON } from "../library/firebase";
import PostFeed from "../components/PostFeed";

const limit = 1;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collection("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(limit);

  const posts = (await postsQuery.get()).docs.map(postToJSON);
  return {
    props: { posts },
  };
}
export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);
  const [postEnd, setPostEnd] = useState(false);

  async function getMorePosts() {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor =
      typeof last?.createdAt === "number"
        ? fromMillies(last.createdAt)
        : last.createdAt;
    const query = firestore
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(limit);
    const newPosts = (await query.get()).docs.map((doc) => doc.data());
    setPosts(posts.concat(newPost));
    setLoading(false);
    if (newPosts.length < limit) {
      setPostEnd(true);
    }
  }
  return (
    <main>
      <PostFeed posts={posts} />
      {!loading && !postEnd && (
        <button onClick={getMorePosts}>load more</button>
      )}
      <Loader show={loading} />
      {postEnd && "you have reached the end"}
    </main>
  );
}
