"use client";
import { useState, useEffect, FormEvent } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Modal from "react-modal";

const containerStyle = {
  width: '100%',
  height: '100%',
};

const categoriesList = [
  { name: "음식점 및 카페", value: "restaurant" },
  { name: "공원", value: "park" },
  { name: "관광명소", value: "tourist_attraction" },
];

Modal.setAppElement('#__next'); // 모달을 사용할 때 접근성 설정

export default function TravelPage() {
  const [schedule, setSchedule] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [dailyPlans, setDailyPlans] = useState<{ [date: string]: { time: string; activity: string }[] }>({});
  const [places, setPlaces] = useState<any[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categories, setCategories] = useState<{ [key: string]: boolean }>({
    restaurant: false,
    park: false,
    tourist_attraction: false,
  });

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

  const fetchPlaces = async (lat: number, lng: number) => {
    const apiKey = "AIzaSyBdkDWYMnnUPvxFhIxQrmUoOG5R6RNhXiE"; // 실제 API 키로 교체
    const selectedCategories = Object.keys(categories).filter((key) => categories[key]);
    const categoryString = selectedCategories.join("|"); // 선택된 카테고리로 필터링
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=${categoryString}&key=${apiKey}`
    );
    const data = await response.json();
    setPlaces(data.results);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("selectedCity", selectedCity!);
    const cityCoordinates = cities[selectedCity!];
    fetchPlaces(cityCoordinates.lat, cityCoordinates.lng);
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
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d).toISOString().split("T")[0]);
    }
    return dates;
  };

  const handleCategoryChange = (category: string) => {
    setCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handlePlanSelection = (place: any, date: string) => {
    handleAddDailyPlan(date);
    const lastIndex = dailyPlans[date]?.length - 1;
    if (lastIndex >= 0) {
      handleDailyPlanChange(date, lastIndex, "activity", place.name);
    }
    setModalIsOpen(false); // 모달 닫기
  };

  return (
    <div className="min-h-screen flex">
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
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
              도시 선택
            </label>
            <select
              id="city"
              value={selectedCity || ""}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="border p-2 w-full rounded-md"
              required
            >
              <option value="">도시를 선택하세요</option>
              {Object.keys(cities).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
          >
            일정 저장하기
          </button>
        </form>

        {startDate && endDate && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">날짜별 계획</h2>
            {getDatesInRange(startDate, endDate).map((date) => (
              <div key={date} className="mb-6">
                <h3 className="text-lg font-bold mb-2">{date}</h3>
                <button
                  onClick={() => setModalIsOpen(true)}
                  className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
                >
                  관광지 선택
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
                      readOnly
                      className="border p-2 w-60 rounded-md"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedCity && (
        <div className="mt-8 flex-grow">
          <h2 className="text-xl font-bold mb-4">여행 지도</h2>
          <LoadScript googleMapsApiKey="AIzaSyBdkDWYMnnUPvxFhIxQrmUoOG5R6RNhXiE">
            <GoogleMap
              mapContainerStyle={containerStyle}


              center={cities[selectedCity]}
              zoom={10}
            >
              {places.map((place) => (
                <Marker key={place.id} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="관광지 선택"
      >
        <h2 className="text-xl font-bold mb-4">관광지 목록</h2>
        <div className="mb-4">
          <h3 className="font-bold mb-2">카테고리 선택</h3>
          {categoriesList.map((category) => (
            <div key={category.value} className="mb-2">
              <label>
                <input
                  type="checkbox"
                  checked={categories[category.value]}
                  onChange={() => handleCategoryChange(category.value)}
                />
                {category.name}
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            const cityCoordinates = cities[selectedCity!];
            fetchPlaces(cityCoordinates.lat, cityCoordinates.lng);
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          관광지 불러오기
        </button>
        <div className="mt-4">
          <h3 className="font-bold mb-2">관광지 목록</h3>
          <ul>
            {places.map((place) => (
              <li key={place.id} className="mb-2">
                <button
                  onClick={() => handlePlanSelection(place, startDate)} // 예시로 시작 날짜에 추가
                  className="text-blue-500 hover:underline"
                >
                  {place.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setModalIsOpen(false)}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          닫기
        </button>
      </Modal>
    </div>
  );
}