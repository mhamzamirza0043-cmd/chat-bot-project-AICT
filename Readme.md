    # AI Chat Bot using Flask

A modern, sleek chatbot built with Flask and powered by Google Gemini AI.

## Features

- 🤖 Powered by Google Gemini AI
- 💬 Real-time chat interface
- 🎨 Modern and sleek UI with smooth animations
- 📱 Responsive design (works on mobile, tablet, desktop)
- 🗑️ Clear conversation history
- ⚡ Fast and efficient

## Project Structure

```
python_coding/
├── app.py                  # Flask backend
├── requirements.txt        # Python dependencies
├── .dotenv                 # Environment variables (with API key)
├── templates/
│   └── index.html         # Chat interface
└── static/
    ├── style.css          # Modern styling
    └── script.js          # Frontend functionality
```

## Setup Instructions

### 1. Navigate to the project directory
```bash
cd c:\Users\asus\Desktop\python_coding
```

### 2. Create a virtual environment (optional but recommended)
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Verify .dotenv file
Make sure your `.dotenv` file contains:
```
GOOGLE_API_KEY=your_api_key_here
```

### 5. Run the Flask app
```bash
python app.py
```

### 6. Open in browser
Navigate to: `http://localhost:5000`

## How to Use

1. Type your message in the input field
2. Press Enter or click the send button (➤)
3. Wait for the AI to respond
4. Click the trash icon (🗑️) to clear the chat history

## Dependencies

- **Flask**: Web framework
- **python-dotenv**: Load environment variables
- **google-generativeai**: Google's Generative AI library

## Features Explained

- **Modern UI**: Gradient colors, smooth animations, and a professional look
- **Real-time Chat**: Send and receive messages instantly
- **Responsive Design**: Works on all screen sizes
- **Dark Mode Support**: Automatically adapts to system preferences
- **Loading State**: Visual feedback while waiting for responses

## Troubleshooting

- **"GOOGLE_API_KEY not found"**: Make sure your .dotenv file exists and contains the API key
- **Port already in use**: Change the port in app.py (line: `app.run(..., port=5000)`)
- **API errors**: Check that your Google API key is valid and has proper permissions

## Customization

You can customize:
- Colors: Edit the gradient colors in `static/style.css`
- Title: Change "AI Chat Bot" in `templates/index.html`
- Port: Modify the port number in `app.py`
- Model: Change the model in `app.py` (currently using 'gemini-pro')

---

Enjoy your AI Chat Bot! 🚀

    
