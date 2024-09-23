import NavBar from './components/NavBar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        {/* 네비게이션 바 */}
        <NavBar />
        {/* 페이지의 컨텐츠 */}
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
