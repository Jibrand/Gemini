const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
dotenv.config(); 

// Replace with your actual Google Generative AI API key
const googleGenerativeAIKey = process.env.API;
const genAI = new GoogleGenerativeAI(googleGenerativeAIKey);

app.use(bodyParser.json());
app.use(cors());
// Preload the model on server start
let generativeModel;

(async () => {
  generativeModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
  // Warm up the model by generating a sample response
  await generativeModel.generateContent('Warm up');
})();

app.post('/generate-response', async (req, res) => {
  try {

    story=`name of company is WebTose 
    Welcome to WebTose – Where Digital Dreams Come to Life.
    
    In the heart of innovation, WebTose stands as a beacon for businesses seeking unparalleled excellence in website development and AI chatbot services. Let us take you on a journey of digital transformation, where your ideas evolve into captivating online experiences.
    
    Once upon a time, in the bustling realm of the internet, there was a visionary company named WebTose. With a team of dedicated professionals driven by a passion for technology, WebTose emerged as a leader in crafting bespoke websites and implementing cutting-edge AI chatbot solutions.
    
    Our Website Development Wizards:
    Picture a team of skilled developers at WebTose, weaving intricate codes to build the digital face of your brand. From sleek portfolios that dazzle to powerful e-commerce platforms that sell, our wizards specialize in bringing your website dreams to reality. Each website is a unique masterpiece, reflecting the essence of your brand and capturing the attention of your online audience.
    
    The AI Chatbot Alchemists:
    In the enchanted laboratory of WebTose, our AI Chatbot Alchemists work tirelessly to infuse intelligence into your customer interactions. These magical chatbots, tailored to your business needs, provide seamless and personalized experiences. Watch as automation transforms your customer support, providing instant responses and ensuring your users feel a connection with your brand.
    
    Why Choose the WebTose Adventure?
    - Expertise Beyond Boundaries: Our team of seasoned professionals possesses a wealth of experience in both website development and the realm of AI.
    - Pioneering Innovation: Navigate the digital landscape with confidence, as WebTose pioneers innovative solutions that keep you ahead of the curve.
    - Your Success, Our Priority: At WebTose, we thrive on your success. Our customer-centric approach ensures that every solution aligns with your goals and aspirations.
    
    Contacting the Digital Guides:
    📞 Phone: +923308138077
    📧 Email: info@webtose.com
    🌐 Website: www.webtose.com
    
    Embark on Your Digital Odyssey:
    Ready to embark on a digital adventure? Contact WebTose today for a consultation. Let's embark on a journey where your online presence transforms into a captivating story of success!
    `
    const { question } = req.body;

    if (!question ) {
      return res.status(400).json({ error: '  question are required.' });
    }

    const prompt = `The story is: ${story}\nQuestion: ${question}`;

    // Use the preloaded model for faster response
    const result = await generativeModel.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    res.json( text );
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
