"use client";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function TravelPage() {
  const [schedule, setSchedule] = useState("");
  const [startDate, setStartDate] = useState(""); // 시작 날짜
  const [endDate, setEndDate] = useState(""); // 종료 날짜
  const [showMap, setShowMap] = useState(false);
  const [dailyPlans, setDailyPlans] = useState<{ [date: string]: { time: string; activity: string }[] }>({}); // 날짜별 계획

  // Define cities and their coordinates
  const cities: { [key: string]: { lat: number; lng: number } } = {
    서울: { lat: 37.5665, lng: 126.978 },
    도쿄: { lat: 35.6762, lng: 139.6503 },
    후쿠오카: { lat: 33.5902, lng: 130.4017 },
    오사카: { lat: 34.6937, lng: 135.5023 },
    부산: { lat: 35.1796, lng: 129.0756 },
    제주: { lat: 33.4996, lng: 126.5312 },
    방콕: { lat: 13.7563, lng: 100.5018 },
    다낭: { lat: 16.0544, lng: 108.2022 },
    나트랑: { lat: 12.2388, lng: 109.1967 },
    마카오: { lat: 22.1987, lng: 113.5439 },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMap(true); // Show the map after form submission
  };

  const handleAddDailyPlan = (date: string) => {
    setDailyPlans({
      ...dailyPlans,
      [date]: [...(dailyPlans[date] || []), { time: "", activity: "" }],
    });
  };

  const handleDailyPlanChange = (
    date: string,
    index: number,
    field: string,
    value: string
  ) => {
    const updatedPlans = [...(dailyPlans[date] || [])];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    setDailyPlans({
      ...dailyPlans,
      [date]: updatedPlans,
    });
  };

  const getDatesInRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates = [];
    for (
      let d = startDate;
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      dates.push(new Date(d).toISOString().split("T")[0]); // 날짜 포맷팅
    }
    return dates;
  };

  useEffect(() => {
    if (showMap) {
      const selectedCity = localStorage.getItem("selectedCity");

      // Type guard to check if selectedCity is a valid key in cities
      const location = selectedCity && cities[selectedCity]
        ? cities[selectedCity]
        : cities["서울"];

      const map = L.map("map").setView([location.lat, location.lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup(`${selectedCity || "서울"}에서 여행을 시작하세요!`)
        .openPopup();
    }
  }, [showMap]);

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
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">
              시작 날짜
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 w-full rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">
              종료 날짜
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 w-full rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
          >
            일정 저장하기
          </button>
        </form>
      </div>

      {/* 날짜별 계획 */}
      {startDate && endDate && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">날짜별 계획</h2>
          {getDatesInRange(startDate, endDate).map((date) => (
            <div key={date} className="mb-6">
              <h3 className="text-lg font-bold mb-2">{date}</h3>
              <button
                onClick={() => handleAddDailyPlan(date)}
                className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
              >
                시간 계획 추가
              </button>
              {dailyPlans[date]?.map((plan, index) => (
                <div key={index} className="mt-2">
                  <input
                    type="time"
                    value={plan.time}
                    onChange={(e) =>
                      handleDailyPlanChange(date, index, "time", e.target.value)
                    }
                    className="border p-2 mr-2"
                    required
                  />
                  <input
                    type="text"
                    value={plan.activity}
                    onChange={(e) =>
                      handleDailyPlanChange(
                        date,
                        index,
                        "activity",
                        e.target.value
                      )
                    }
                    placeholder="활동 내용"
                    className="border p-2 w-60 rounded-md"
                    required
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {showMap && (
        <div className="mt-8 w-full h-96">
          <h2 className="text-xl font-bold mb-4">여행 지도</h2>
          <div id="map" style={{ height: "400px", width: "100%" }}></div>
        </div>
      )}
    </div>
  );
}
