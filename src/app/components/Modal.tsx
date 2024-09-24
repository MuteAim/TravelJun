import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedCity }) => {
  if (!isOpen) return null; // 모달이 열리지 않았을 경우 렌더링하지 않음

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{selectedCity} 여행지 선택</h2>
        <p>{selectedCity}는 정말 멋진 여행지입니다! 여기서 더 알아보시겠어요?</p>
        <div className="mt-4">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
