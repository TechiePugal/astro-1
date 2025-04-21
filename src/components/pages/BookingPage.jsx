import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "../styles/BookingPage.css";

const API_KEY = "0922ca27e1d942f4ace14bcc6c829e84";

const topicOptions = [
  { value: "marriage", label: "Marriage" },
  { value: "career", label: "Career" },
  { value: "education", label: "Education" },
  { value: "property", label: "Own House / Property" },
  { value: "child", label: "Child Birth" },
  { value: "health", label: "Health Issues" },
  { value: "finance", label: "Financial Growth" }
];

const questionsMap = {
  marriage: [
    "When will I get married?",
    "Will it be a love or arranged marriage?",
    "Will my partner be supportive?",
    "Any challenges in my marriage?",
    "How many children will I have?",
    "Will my in-laws be supportive?",
    "Is there delay in marriage?",
    "Foreign partner possibility?",
    "Will it be a happy marriage?",
    "What kind of partner is suitable?"
  ],
  career: [
    "What is the best career path for me?",
    "Will I get a government job?",
    "Is there any job change coming?",
    "Should I switch industries?",
    "Is there a promotion ahead?",
    "Will I go abroad for work?",
    "Is my career stable?",
    "Which field is lucky for me?",
    "Should I start a business?",
    "Will I be successful in the corporate sector?"
  ],
  education: [
    "Will I pass my exams with good grades?",
    "What should I major in?",
    "Will I pursue higher studies?",
    "Is there a scholarship opportunity for me?",
    "Should I take up a new course or skill?",
    "Will my studies lead to a successful career?",
    "Am I making the right choice in my education?",
    "How will my academic performance affect my future?",
    "Should I consider studying abroad?",
    "Will I face any challenges in my education?"
  ],
  property: [
    "Will I own a house in the future?",
    "Will my property investments be successful?",
    "Should I buy a property now or wait?",
    "What type of property should I invest in?",
    "Will I face any issues with property ownership?",
    "Is the current property market favorable for buying?",
    "Will I get good returns on property investments?",
    "Should I consider real estate for financial growth?",
    "Will I face any legal issues related to property?",
    "Is it a good time to sell my property?"
  ],
  child: [
    "Will I have children in the future?",
    "How many children will I have?",
    "When will I have my first child?",
    "What will my child's personality be like?",
    "Will I be a good parent?",
    "What challenges will I face as a parent?",
    "Will I have a boy or a girl?",
    "Will I be able to balance my career and children?",
    "What is the right age to have children?",
    "Should I consider adoption?"
  ],
  health: [
    "Am I in good health right now?",
    "Will I have any major health issues in the future?",
    "Should I be concerned about my current health habits?",
    "What steps can I take to improve my health?",
    "Am I at risk for any diseases?",
    "Will I live a long and healthy life?",
    "Should I make changes to my lifestyle for better health?",
    "What health concerns should I monitor closely?",
    "Will I have any major surgeries or treatments?",
    "How can I maintain my mental well-being?"
  ],
  finance: [
    "Will my financial situation improve?",
    "Am I making good financial decisions?",
    "Should I invest in stocks or bonds?",
    "What is the best way to save money?",
    "Will I face any financial hardships in the near future?",
    "Should I start a new business venture?",
    "Am I on track to achieve financial independence?",
    "How can I improve my credit score?",
    "What is the best way to manage my debt?",
    "Will I be financially stable in the next 5 years?"
  ],
  spirituality: [
    "What is my spiritual path?",
    "Will I find inner peace?",
    "Am I on the right path spiritually?",
    "Will my spiritual practices help me in my daily life?",
    "Is there a deeper purpose for me in life?",
    "How can I strengthen my spiritual connection?",
    "Should I pursue a more religious or spiritual lifestyle?",
    "What lessons am I meant to learn in my spiritual journey?",
    "Will I experience a spiritual awakening?",
    "How can I contribute to the spiritual growth of others?"
  ],
  relationships: [
    "Will I meet someone special soon?",
    "Will I have a long-lasting and happy relationship?",
    "Am I in the right relationship?",
    "Should I work on improving my current relationship?",
    "Will my relationship face any major challenges?",
    "What can I do to improve my communication with my partner?",
    "Is there someone in my life I should reconnect with?",
    "Should I trust my partner more?",
    "Will I have a healthy relationship with my family?",
    "What lessons will I learn from my relationships?"
  ],
  travel: [
    "Will I travel abroad in the near future?",
    "Should I take a vacation this year?",
    "Will I enjoy my upcoming trips?",
    "What destination is best suited for me?",
    "Will I travel for work or leisure?",
    "Will I meet new people on my travels?",
    "Is there a significant life change waiting for me during my travels?",
    "How can I make my travels more fulfilling?",
    "What type of travel experience will benefit me the most?",
    "Should I travel more or focus on other aspects of life?"
  ]
};


const BookingPage = () => {
  const [selectedTab, setSelectedTab] = useState("common");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    tobHour: "",
    tobMinute: "",
    tobPeriod: "AM",
    pob: "",
    contact: "",
    personalQuery: ""
  });

  const handleTopicChange = (selectedOptions) => {
    setSelectedTopics(selectedOptions || []);
    setSelectedQuestions([]);
  };

  const getRelevantQuestions = () => {
    const all = [];
    selectedTopics.forEach((topic) => {
      if (questionsMap[topic.value]) {
        all.push(...questionsMap[topic.value]);
      }
    });
    return all;
  };

  const handleQuestionToggle = (q) => {
    setSelectedQuestions((prev) =>
      prev.includes(q) ? prev.filter((item) => item !== q) : [...prev, q]
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handlePobChange = async (e) => {
    const pob = e.target.value;
    setFormData({ ...formData, pob });

    if (pob.length > 2) {
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${pob}&type=city&limit=5&apiKey=${API_KEY}`
        );
        setSuggestions(response.data.features.map((item) => item.properties.formatted));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (selected) => {
    setFormData({ ...formData, pob: selected });
    setSuggestions([]);
  };

  const handleClear = () => {
    setFormData({
      name: "",
      dob: "",
      tobHour: "",
      tobMinute: "",
      tobPeriod: "AM",
      pob: "",
      contact: "",
      personalQuery: ""
    });
    setSelectedTopics([]);
    setSelectedQuestions([]);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tob = `${formData.tobHour.padStart(2, "0")}:${formData.tobMinute.padStart(2, "0")} ${formData.tobPeriod}`;
    const payload = {
      type: selectedTab,
      name: formData.name,
      dob: formData.dob,
      tob,
      pob: formData.pob,
      contact: formData.contact,
      personalQuery: formData.personalQuery,
      commonTopics: selectedTopics.map((t) => t.value),
      selectedQuestions: selectedQuestions
    };
    console.log("Submitted Booking Data:", payload);
    alert("Booking submitted! (Check console for data)");
  };

  return (
    <div className="booking-page">
      <div className="tab-selector">
        <button className={selectedTab === "common" ? "active" : ""} onClick={() => setSelectedTab("common")}>
          Common Consultation
        </button>
        <button className={selectedTab === "personal" ? "active" : ""} onClick={() => setSelectedTab("personal")}>
          Personal 1-to-1 Consultation
        </button>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        {selectedTab === "common" && (
          <>
            <h3 style={{ color: "black" }}>Select your Consultation Topic(s)</h3>
            <Select
              isMulti
              options={topicOptions}
              value={selectedTopics}
              onChange={handleTopicChange}
              placeholder="Select topics like Marriage, Career..."
              styles={{
                control: (base) => ({
                  ...base,
                  color: "black",
                }),
                input: (base) => ({
                  ...base,
                  color: "black",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "black",
                }),
                singleValue: (base) => ({
                  ...base,
                  color: "black",
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: "black",
                }),
                option: (base) => ({
                  ...base,
                  color: "black", // Ensures the options text is black
                }),
              }}
            />
            {selectedTopics.length > 0 && (
              <div className="question-section">
                <h4 style={{ color: "black" }}>Select Relevant Questions</h4>
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {getRelevantQuestions().map((q, idx) => (
                    <li key={idx}>
                      <label style={{ display: "block", marginBottom: "5px", color: "black" }}>
                        <input
                          type="checkbox"
                          checked={selectedQuestions.includes(q)}
                          onChange={() => handleQuestionToggle(q)}
                          style={{ marginRight: "8px", color: "black" }}
                        />
                        {q}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}


        {selectedTab === "personal" && (
          <div className="section">
            <h3>Describe your Query</h3>
            <textarea
              name="personalQuery"
              placeholder="Describe your issue or what you want help with..."
              value={formData.personalQuery}
              onChange={handleChange}
              rows="4"
              required
              style={{ color: "black" }}
            />
          </div>
        )}

        <div className="section personal-info">
          <h3>Your Personal Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ color: "black" }}
          />
          Date of Birth:
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            required
            style={{ color: "black" }}
          />
          Time of Birth:
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="number"
              name="tobHour"
              placeholder="Hour"
              min="1"
              max="12"
              value={formData.tobHour}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '14px',
                transition: 'border 0.2s ease-in-out',
              }}
            />
            <input
              type="number"
              name="tobMinute"
              placeholder="Minute"
              min="0"
              max="59"
              value={formData.tobMinute}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '14px',
                transition: 'border 0.2s ease-in-out',
              }}
            />
            <select
              name="tobPeriod"
              value={formData.tobPeriod}
              onChange={handleChange}
              required
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '14px',
                transition: 'border 0.2s ease-in-out',
              }}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>


          <div className="autocomplete-wrapper">
            <input
              type="text"
              name="pob"
              placeholder="Place of Birth"
              value={formData.pob}
              onChange={handlePobChange}
              autoComplete="off"
              required
              style={{ color: "black" }}
            />
            {suggestions.length > 0 && (
              <ul className="autocomplete-suggestions">
                {suggestions.map((s, idx) => (
                  <li key={idx} onClick={() => handleSuggestionClick(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
            style={{ color: "black" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          <button
            type="button"
            onClick={handleClear}
            style={{ flex: 1, padding: "10px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "6px" }}
          >
            Clear
          </button>
          <button
            type="submit"
            style={{ flex: 1, padding: "10px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "6px" }}
          >
            Submit Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingPage;
