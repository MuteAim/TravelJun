"use client"
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

export default function MainPage() {
  return (
    <div className="flex h-screen">
      {/* 왼쪽 */}
      <div className="flex-1 flex flex-col justify-center p-12 ml-20">
        <h1 className="text-7xl font-bold leading-tight mb-4">
          기존에 경험하지 못한 <br /> 새로운 여행 플래너
        </h1>
        <h1 className="text-5xl font-bold leading-tight mb-4 text-blue-600">여행준명</h1>
        <p className="text-lg mb-6">
          고민만 하던 여행 계획을 <span className="font-bold">여행준명</span>을 통해 <br />
          몇 분 만에 스케줄링 해보세요.
        </p>
        <button className="bg-black text-white py-3 px-6 text-lg w-40">
          여행준명시작
        </button>
      </div>

      {/* 오른쪽 */}
      <div className="flex-1">
        
      </div>
    </div>
  );
}
