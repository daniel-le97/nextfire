import Image from "next/image";
import Link from "next/link";
import { UserContext } from "../library/context";
import { useContext } from "react";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link href='/'>
            <button className='btn-logo'>feed</button>
          </Link>
        </li>
        {username && (
          <>
            <li className='push-left'>
              <Link href='/admin'>
                <button className='btn-blue'>write posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} alt='' />
              </Link>
            </li>
          </>
        )}
        {!username && (
          <li>
            <Link href='/enter'>
              <button className='btn-blue'>login</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
