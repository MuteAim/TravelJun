import React from 'react';
import { useRouter } from 'next/navigation'; // 페이지 이동을 위한 useRouter import

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedCity }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleCreateSchedule = () => {
    router.push('/travel'); // 일정 만들기 페이지로 이동
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{selectedCity} 여행지 선택</h2>
        <p>{selectedCity}는 정말 멋진 여행지입니다! 여기서 더 알아보시겠어요?</p>
        <div className="mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 mr-4">
            닫기
          </button>
          <button
            onClick={handleCreateSchedule}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            일정 만들기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
