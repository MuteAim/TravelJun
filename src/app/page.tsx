"use client";
import { useState } from 'react';

export default function MainPage() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const cities = ['서울', '도쿄', '후쿠오카', '오사카', '부산', '제주', '방콕', '다낭', '나트랑', '마카오'];

  const handleClick = () => {
    setIsButtonClicked(true);
  };

  const handleCityClick = (city: string) => {
    console.log(`Selected city: ${city}`);
    // 여기에서 원하는 동작을 추가할 수 있습니다. 예를 들어, 페이지를 이동하거나 데이터를 처리하는 로직.
  };

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
        
        <div className={`transition-all duration-500 ${isButtonClicked ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
          {!isButtonClicked && (
            <button
              onClick={handleClick}
              className="bg-black text-white py-3 px-6 text-lg w-40 hover:bg-gray-100">
              여행준명시작
            </button>
          )}
        </div>

        <div className={`transition-all duration-500 ${isButtonClicked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {isButtonClicked && (
            <>
              <input
                type="text"
                placeholder="어디로 떠나시나요?"
                className="border p-3 w-80 mb-4"
              />
              <div className="p-4 rounded-md">
                <ul className="grid grid-cols-2 gap-4">
                  {cities.map((city, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleCityClick(city)}
                        className="bg-white border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-md w-full text-left">
                        {city}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 오른쪽 */}
      <div className="flex-1">
        {/* 오른쪽 컨텐츠 */}
      </div>
    </div>
  );
}
