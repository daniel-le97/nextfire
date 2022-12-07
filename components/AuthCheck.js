import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../library/context";

export default function AuthCHeck(props) {
  const { username } = useContext(UserContext);
  return username ? props.children : props.fallback || <Link href="/enter">you must be signed in</Link>
}
