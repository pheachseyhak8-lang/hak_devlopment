import React, { useState } from 'react';
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToTelegram = async (e) => {
    e.preventDefault();
    
    const botToken = "8214235068:AAHGIMjr6EkaBO2p_NaeCe9ztPos-laICRI"; // ប្រើ Token របស់អ្នកដដែល
    const chatId = "5467535945";       // Chat ID របស់អ្នក

    const text = `📧 **សារថ្មីពីអតិថិជន!**\n\n👤 ឈ្មោះ: ${formData.name}\n✉️ Email: ${formData.email}\n📌 ប្រធានបទ: ${formData.subject}\n💬 សារ: ${formData.message}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "Markdown" }),
      });

      if (response.ok) {
        alert("សាររបស់អ្នកត្រូវបានផ្ញើជូនម្ចាស់ហាងរួចរាល់ហើយ!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      alert("មានបញ្ហាក្នុងការផ្ញើសារ!");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>ទំនាក់ទំនងយើងខ្ញុំ</h2>
        <p>ប្រសិនបើអ្នកមានចម្ងល់ ឬចង់សួរព័ត៌មានបន្ថែម សូមទាក់ទងមកយើងតាមរយៈ៖</p>
        <div className="info-item">📍 ទីតាំង: ភ្នំពេញ, ប្រទេសកម្ពុជា</div>
        <div className="info-item">📞 ទូរសព្ទ: 071 456 8013</div>
        <div className="info-item">📧 Email: support@geministore.com</div>
        
        <div className="map-placeholder">
          {/* អ្នកអាចដាក់ Google Map Embed នៅទីនេះ */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125061.123456789!2d104.8!3d11.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc46db797%3A0x15f79361667d4e33!2sPhnom%20Penh!5e0!3m2!1sen!2skh!4v1625000000000!5m2!1sen!2skh" 
            width="100%" height="250" style={{border:0}} allowFullScreen="" loading="lazy">
          </iframe>
        </div>
      </div>

      <div className="contact-form">
        <form onSubmit={sendToTelegram}>
          <div className="input-group">
            <input type="text" name="name" placeholder="ឈ្មោះរបស់អ្នក" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="input-group">
            <input type="email" name="email" placeholder="អ៊ីមែល" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="input-group">
            <input type="text" name="subject" placeholder="ប្រធានបទ" required value={formData.subject} onChange={handleChange} />
          </div>
          <div className="input-group">
            <textarea name="message" rows="5" placeholder="សាររបស់អ្នក..." required value={formData.message} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="submit-btn">ផ្ញើសារឥឡូវនេះ</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;