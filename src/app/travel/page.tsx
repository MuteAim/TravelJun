"use client";
import { useState, FormEvent } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function TravelPage() {
  const [schedule, setSchedule] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [dailyPlans, setDailyPlans] = useState<{ [date: string]: { time: string; activity: string }[] }>({});
  const [selectedPlaces, setSelectedPlaces] = useState<{ name: string; id: string }[]>([]);
  const [placeOptions, setPlaceOptions] = useState<{ name: string; id: string }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [selectedDate, setSelectedDate] = useState(""); // Selected date for adding plans

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("selectedCity", selectedCity!);
    fetchPlaces(cities[selectedCity!].lat, cities[selectedCity!].lng);
  };

  const fetchPlaces = async (lat: number, lng: number) => {
    const apiKey = "AIzaSyBdkDWYMnnUPvxFhIxQrmUoOG5R6RNhXiE"; // Replace with actual API key
    const category = categories.join("|");
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=10000&type=${category}&key=${apiKey}`
    );
    const data = await response.json();
    setPlaceOptions(data.results.map((place: any) => ({ name: place.name, id: place.place_id })));
  };

  const handleAddDailyPlan = (date: string) => {
    setDailyPlans({
      ...dailyPlans,
      [date]: [...(dailyPlans[date] || []), { time: "", activity: "" }],
    });
  };

  const handleDailyPlanChange = (date: string, index: number, field: string, value: string) => {
    const updatedPlans = [...(dailyPlans[date] || [])];
    updatedPlans[index] = { ...updatedPlans[index], [field]: value };
    setDailyPlans({
      ...dailyPlans,
      [date]: updatedPlans,
    });
  };

  const handleSelectPlace = (place: { name: string; id: string }) => {
    const date = selectedDate;
    handleDailyPlanChange(date, dailyPlans[date]?.length || 0, "activity", place.name);
    setModalVisible(false); // Close modal after selection
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

  return (
    <div className="min-h-screen flex">
      <div className="bg-white p-8 rounded-md shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6">일정 만들기</h1>
        <form onSubmit={handleSubmit}>
          {/* Schedule input */}
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

          {/* Date inputs */}
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

          {/* City selection */}
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
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">
            일정 저장하기
          </button>
        </form>

        {/* Category selection */}
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">관광지 선택</h2>
          <div>
            <label>
              <input
                type="checkbox"
                value="restaurant"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setCategories((prev) => (checked ? [...prev, "restaurant"] : prev.filter((cat) => cat !== "restaurant")));
                }}
              />
              음식점 및 카페
            </label>
            <label>
              <input
                type="checkbox"
                value="park"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setCategories((prev) => (checked ? [...prev, "park"] : prev.filter((cat) => cat !== "park")));
                }}
              />
              공원
            </label>
            <label>
              <input
                type="checkbox"
                value="tourist_attraction"
                onChange={(e) => {
                  const checked = e.target.checked;
                  setCategories((prev) => (checked ? [...prev, "tourist_attraction"] : prev.filter((cat) => cat !== "tourist_attraction")));
                }}
              />
              관광명소
            </label>
          </div>
        </div>
      </div>

      {/* Date-based plans */}
      {startDate && endDate && (
        <div className="mt-8 flex-grow">
          <h2 className="text-xl font-bold mb-4">날짜별 계획</h2>
          {getDatesInRange(startDate, endDate).map((date) => (
            <div key={date} className="mb-6">
              <h3 className="text-lg font-bold mb-2">{date}</h3>
              <button
                onClick={() => {
                  setModalVisible(true);
                  setSelectedDate(date); // Open modal and set date for plan
                }}
                className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
              >
                관광지 선택
              </button>
              {dailyPlans[date]?.map((plan, index) => (
                <div key={index} className="mt-2">
                  <input
                    type="time"
                    value={plan.time}
                    onChange={(e) => handleDailyPlanChange(date, index, "time", e.target.value)}
                    className="border p-2 mr-2"
                    required
                  />
                  <input
                    type="text"
                    value={plan.activity}
                    onChange={(e) => handleDailyPlanChange(date, index, "activity", e.target.value)}
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

      {/* Google Map */}
      {selectedCity && (
        <div className="mt-8 flex-grow">
          <h2 className="text-xl font-bold mb-4">여행 지도</h2>
          <LoadScript googleMapsApiKey="AIzaSyBdkDWYMnnUPvxFhIxQrmUoOG5R6RNhXiE">
            <GoogleMap mapContainerStyle={containerStyle} center={cities[selectedCity]} zoom={13}>
              <Marker position={cities[selectedCity]} />
            </GoogleMap>
          </LoadScript>
        </div>
      )}

      {/* Modal for Tourist Spots */}
      {modalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">관광지 선택</h2>
            <div>
              {placeOptions.map((place) => (
                <div key={place.id} className="flex justify-between mt-2">
                  <span>{place.name}</span>
                  <button
                    onClick={() => handleSelectPlace(place)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                  >
                    선택
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => setModalVisible(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
