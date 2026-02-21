import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Trie } from "./trie";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [trie, setTrie] = useState(new Trie());
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const navigate = useNavigate();
    const wrapperRef = useRef(null);

  // 🔥 Load products into Trie
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await API.get("/products");
      const newTrie = new Trie();

      res.data.forEach(p => {
        newTrie.insert(p.name);
        newTrie.insert(p.category);
      });

      setTrie(newTrie);
    };

    fetchProducts();
  }, []);

  // 🔥 Load history from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(stored);
  }, []);

  // 🔥 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions([]);
        setShowHistory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 Central Search Function
  const performSearch = (value) => {
    if (!value.trim()) return;

    let updatedHistory = history.filter(item => item !== value);
    updatedHistory.unshift(value);
    updatedHistory = updatedHistory.slice(0, 8);

    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    navigate(`/search?q=${value}`);

    setSuggestions([]);
    setShowHistory(false);
    setHighlightedIndex(-1);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setHighlightedIndex(-1);

    if (val.trim() === "") {
      setSuggestions([]);
      setShowHistory(true);
    } else {
      const matches = trie.searchIncludes(val);
      setSuggestions(matches);
      setShowHistory(false);
    }
  };


    const handleKeyDown = (e) => {
  const activeList = suggestions.length > 0 ? suggestions : history;

  if (activeList.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setHighlightedIndex(prev =>
      prev < activeList.length - 1 ? prev + 1 : 0
    );
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    setHighlightedIndex(prev =>
      prev > 0 ? prev - 1 : activeList.length - 1
    );
  }

  if (e.key === "Enter") {
    e.preventDefault();

    if (highlightedIndex >= 0) {
      performSearch(activeList[highlightedIndex]);
    } else {
      performSearch(searchTerm);
    }
  }
};

    const removeHistoryItem = (itemToRemove) => {
  const updatedHistory = history.filter(item => item !== itemToRemove);
  setHistory(updatedHistory);
  localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
};

  return (
    <div className="position-relative w-100" ref={wrapperRef}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (!searchTerm) setShowHistory(true);
          }}
        />

        <button
          className="btn btn-primary"
          onClick={() =>
            highlightedIndex >= 0
              ? performSearch(suggestions[highlightedIndex])
              : performSearch(searchTerm)
          }
          disabled={!searchTerm.trim()}
        >
          Search
        </button>
      </div>

      {/* 🔥 Suggestions */}
      {suggestions.length > 0 && (
        <ul
          className="list-group position-absolute w-100 shadow"
          style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}
        >
          {suggestions.map((s, i) => (
            <li
              key={i}
              className={`list-group-item list-group-item-action ${
                i === highlightedIndex ? "active" : ""
              }`}
              onClick={() => performSearch(s)}
              style={{ cursor: "pointer" }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      {/* 🔥 Search History */}
   {showHistory && history.length > 0 && (
  <div
    className="position-absolute shadow bg-white rounded"
    style={{
      zIndex: 1000,
      width: "300px",     // 👈 control width
      left: "0",          // 👈 align to left
      top: "100%",
      marginTop: "5px"
    }}
  >
    {/* Header */}
    <div className="px-3 py-2 border-bottom fw-semibold text-muted">
      Your recent search history
    </div>

    <ul className="list-group list-group-flush">
      {history.map((item, i) => (


          <li
              key={i}
              onClick={() => performSearch(item)}
    style={{ cursor: "pointer" }}
  className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center list-group-item d-flex justify-content-between align-items-center ${
    i === highlightedIndex ? "active" : ""
  }` }
>
  <span
    onClick={() => performSearch(item)}
    style={{ cursor: "pointer" }}
  >
    🕒 {item}
  </span>

  <button
    className="btn btn-sm fw-bold text-dark p-0"
    onClick={(e) => {
      e.stopPropagation();
      removeHistoryItem(item);
    }}
  >
    ✕
  </button>
</li>
      ))}
    </ul>
  </div>
)}
    </div>
  );
}