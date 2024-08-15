import React from "react";
import "./Features.css";

const Features: React.FC = () => {
  const features = [
    {
      title: "Custom Short Links",
      description:
        "Create short links with custom aliases for better branding and easy recall.",
      icon: "🔗",
    },
    {
      title: "Qr Code",
      description:
        "Generate QR codes for your business and events.Attract your audience and customers to your doorstep with this convenient scan-and-go solution.",
      icon: "📊",
    },
    {
      title: "Easy Integration",
      description:
        "Integrate with various platforms and tools using our simple API.",
      icon: "🔧",
    },
    {
      title: "Secure Links",
      description: "Ensure your links are secure and protected from misuse.",
      icon: "🔒",
    },
  ];

  return (
    <section className="features">
      <h2 className="features-title">Our Features</h2>
      <div className="features-list">
        {features.map((feature, index) => (
          <div className="feature-item" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
