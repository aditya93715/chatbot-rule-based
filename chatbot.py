from flask import Flask, render_template, request, jsonify
import ollama

app = Flask(__name__)
client = ollama.Client()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get_response", methods=["POST"])
def get_response():
    user_message = request.json.get("message")
    print(f"User message: {user_message}")  # Debug
    try:
        response = client.chat(
            model="llama3.2",
            messages=[{"role": "user", "content": user_message}]
        )
        bot_reply = response['message']['content']
        print(f"Bot reply: {bot_reply}")  # Debug
    except Exception as e:
        print(f"Error: {e}")
        bot_reply = "Sorry, I am having trouble connecting to the AI service."
    return jsonify({"response": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)
