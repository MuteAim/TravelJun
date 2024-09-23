// src/app/components/NavBar.tsx
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 왼쪽 로고 */}
          <div className="flex items-center">
            <Link href="/">TravelJM</Link>
          </div>

          {/* 오른쪽 메뉴 */}
          <div className="flex space-x-4 items-center">
            <Link href="/travel">여행지</Link>
            <Link href="/login">로그인</Link>
            <Link href="/signUp">회원가입</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
