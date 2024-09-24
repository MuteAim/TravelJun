"use client";
import { useState } from 'react';

export default function TravelPage() {
  const [schedule, setSchedule] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 일정 데이터를 처리하거나 저장하는 로직을 추가할 수 있습니다.
    console.log('일정:', schedule, '날짜:', date);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6">일정 만들기</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="schedule" className="block text-gray-700 font-bold mb-2">
              일정 이름
            </label>
            <input
              type="text"
              id="schedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="border p-2 w-full rounded-md"
              placeholder="일정 이름을 입력하세요"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
              날짜 선택
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 w-full rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">
            일정 저장하기
          </button>
        </form>
      </div>
    </div>
  );
}
