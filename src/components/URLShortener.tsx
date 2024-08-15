import React, { useState } from "react";
import { shortenUrl } from "../Api/Shorten";
import "./URLShortener.css";
import "../Api/Shorten";

const URLShortener: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrlId, setShortUrlId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const id = await shortenUrl(longUrl);
      setShortUrlId(id);
      setError(null);
    } catch (e) {
      setError("Failed to shorten URL");
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
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter your long URL here"
            className="url-shortener-input"
            required
          />
          <button type="submit" className="url-shortener-button">
            Shorten
          </button>
          {shortUrlId && (
            <div className="url-shortened">
              <p>
                Short URL ID:
                <a
                  href={`${shortUrlId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >{`${shortUrlId}`}</a>
              </p>
            </div>
          )}
          {error && <p>{error}</p>}
        </form>
      </section>
    </div>
  );
};

export default URLShortener;
