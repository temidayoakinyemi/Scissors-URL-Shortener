import React, { useState } from "react";
import "./URLShortener.css";
import "../Api/Shorten";

const URLShortener: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    {
      setError("Login or Signup to shorten URL");
    }
  };

  return (
    <div>
      <h1 className="shorten-links-title">Shorten Links</h1>
      <section className="url-shortener">
        <h2 className="url-shortener-title-1">Shorten Your URL</h2>
        <form className="url-shortener-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your long URL here"
            className="url-shortener-input"
            required
          />
          <button type="submit" className="url-shortener-button">
            Shorten
          </button>
          {error && <p className="err">{error}</p>}
        </form>
      </section>
    </div>
  );
};

export default URLShortener;
