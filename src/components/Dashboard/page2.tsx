import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { shortenUrl } from "../../Api/Shorten";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import "./page2.css";

interface UrlData {
  id: string;
  longUrl: string;
  shortUrl: string;
  timestamp: any;
}

const Dashboardpage2: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrlId, setShortUrlId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [svgData, setSvgData] = useState("");

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const urlsCollection = collection(db, "urls");
        const querySnapshot = await getDocs(urlsCollection);
        const urlsData: UrlData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<UrlData, "id">),
        }));
        setUrls(urlsData);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const shortUrl = await shortenUrl(longUrl);
      const newId = `${shortUrl}`;
      await addDoc(collection(db, "urls"), {
        longUrl,
        shortUrl,
        timestamp: new Date(),
      });
      setLongUrl("");
      setShortUrlId(newId);
      setError(null);

      const urlsCollection = collection(db, "urls");
      const querySnapshot = await getDocs(urlsCollection);
      const urlsData: UrlData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<UrlData, "id">),
      }));
      setUrls(urlsData);
    } catch (e) {
      setError("Failed to shorten URL");
    }
  };

  const deleteUrl = async (id: string) => {
    try {
      await deleteDoc(doc(db, "urls", id));
      setUrls(urls.filter((url) => url.id !== id));
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => alert("URL copied to clipboard!"),
      () => alert("Failed to copy URL.")
    );
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    const qrCodeElement = document.getElementById("qrcode-svg");
    if (qrCodeElement) {
      setSvgData(qrCodeElement.innerHTML);
    }
  }, []);

  useEffect(() => {
    console.log(svgData);
  }, [svgData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="all-his">
      <div className="all-1">
        <h1 className="shorten-links-title">Shorten Links</h1>
        <section className="url-shortener">
          <h2 className="url-shortener-title">Shorten Your URL</h2>
          <form className="url-shortener-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Enter your long URL here"
              className="url-shortener-input"
              required
            />
            <button type="submit" className="url-shortener-button-1-2">
              Shorten
            </button>
            {shortUrlId && (
              <div className="url-shortened">
                <p>
                  Short URL:
                  <a
                    href={shortUrlId}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shortUrlId}
                  </a>
                </p>
                <QRCodeCanvas
                  id="qr-code"
                  value={shortUrlId}
                  className="qr qr-code"
                  size={128}
                />
                <button
                  type="button"
                  onClick={downloadQRCode}
                  className="download-button"
                >
                  Download QR Code
                </button>
              </div>
            )}
            {error && <p className="error-message">{error}</p>}
          </form>
        </section>
      </div>
      <table className="url-history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Long URL</th>
            <th>Short URL</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.id}>
              <td>{url.id}</td>
              <td>{url.longUrl}</td>
              <td>{url.shortUrl}</td>
              <td>{new Date(url.timestamp.seconds * 1000).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => copyToClipboard(url.shortUrl)}
                  className="copyButton"
                >
                  Copy
                </button>
                <button
                  onClick={() => deleteUrl(url.id)}
                  className="deleteButton"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboardpage2;
