from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load environment variables from .dotenv file
dotenv_path = os.path.join(os.path.dirname(__file__), '.dotenv')
load_dotenv(dotenv_path)

app = Flask(__name__)

# Configure API key
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
if not GOOGLE_API_KEY:
    print(f"Looking for .dotenv at: {dotenv_path}")
    print(f"File exists: {os.path.exists(dotenv_path)}")
    raise ValueError("GOOGLE_API_KEY not found in .dotenv file")

genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the Generative AI model (using latest free model)
model = genai.GenerativeModel('gemini-2.5-flash')

# Store chat history in memory
chat_history = []


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Empty message'}), 400
        
        # Add user message to history
        chat_history.append({
            'role': 'user',
            'parts': [user_message]
        })
        
        try:
            # Create chat session and send message
            chat = model.start_chat(history=chat_history)
            response = chat.send_message(user_message)
            bot_response = response.text
            
            # Add bot response to history
            chat_history.append({
                'role': 'model',
                'parts': [bot_response]
            })
            
            return jsonify({'response': bot_response})
        except Exception as e:
            error_msg = f"API Error: {str(e)}"
            print(error_msg)
            return jsonify({'error': error_msg}), 500
    
    except Exception as e:
        error_msg = f"Server Error: {str(e)}"
        print(error_msg)
        return jsonify({'error': error_msg}), 500


@app.route('/clear', methods=['POST'])
def clear_chat():
    global chat_history
    try:
        # Reset the chat history
        chat_history = []
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
