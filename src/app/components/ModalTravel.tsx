import React from 'react';
import { useRouter } from 'next/navigation';

const ModalTravel: React.FC<{ isOpen: boolean; onClose: () => void; selectedCity: string | null; places: any[] }> = ({ isOpen, onClose, selectedCity, places }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleCreateSchedule = () => {
    router.push('/travel'); // 일정 만들기 페이지로 이동
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{selectedCity} 관광지 목록</h2>
        <ul className="mb-4">
          {places.map((place, index) => (
            <li key={index} className="mb-2">
              {place.name} - {place.vicinity} ({place.rating}★)
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 mr-4"
          >
            닫기
          </button>
          <button
            onClick={handleCreateSchedule}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            일정 만들기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTravel;