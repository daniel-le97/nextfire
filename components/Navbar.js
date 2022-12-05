import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { user, username } = {};

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link href='/'>
            <button className="btn-logo">feed</button>
          </Link>
        </li>
        {username && (
          <>
            <li className="push-left">
              <Link href='/admin'>
                <button className="btn-blue">write posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <Image src={user?.photoUrl} alt='' />
              </Link>
            </li>
          </>
        )}
        {!username && (
          <li>
            <Link href='/enter'>
              <button className="btn-blue">login</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
