// This file contains the controller functions for handling chatbot messages.
// controller function = a function that processes incoming requests and returns responses.

import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

export async function message(req, res) {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: 'Text message cannot be empty.' });
    }

    const user = await User.create({
      sender: "user",
      text
    })


    // Data for the bot
    const botResponses = {
      "hello": "Hello! How may I assist you?",
      "good morning": "Good morning! Hope you have a great day ahead.",
      "good night": "Good night! Sleep well and recharge.",
      "how are you?": "I’m doing great, thanks for asking! How about you?",
      "what’s your name?": "I’m Copilot, here to help you with anything.",
      "thank you": "You’re welcome! Always happy to help.",
      "bye": "Goodbye! Take care and see you soon.",
      "what’s the time?": "You can check your clock or phone for the exact time.",
      "what’s the date?": "Today’s date is easy to find on your calendar.",
      "how’s the weather?": "Weather changes daily, check your local forecast for details.",
      "tell me a joke": "Sure! Why don’t scientists trust atoms? Because they make up everything!",
      "what’s for dinner?": "That depends on your mood—maybe something light and tasty?",
      "i’m bored": "How about reading, listening to music, or going for a walk?",
      "i’m hungry": "Grab a healthy snack or cook something delicious!",
      "i’m tired": "Rest is important—maybe take a short nap or relax.",
      "i’m sad": "I’m here for you. Talking to a friend might help too.",
      "i’m happy": "That’s wonderful! Keep spreading the positivity.",
      "what’s your favorite color?": "I don’t have favorites, but many people love blue.",
      "play music": "I can suggest songs, but you’ll need a music app to play them.",
      "open google": "You can open Google in your browser easily.",
      "search the web": "Type your query into a search engine for instant results.",
      "tell me a fact": "Did you know honey never spoils?",
      "tell me a story": "Once upon a time, curiosity led to great discoveries.",
      "what’s the capital of india?": "The capital of India is New Delhi.",
      "what’s the capital of usa?": "The capital of the USA is Washington, D.C.",
      "who is the president of usa?": "The current president of the USA is Donald Trump.",
      "what’s 2+2?": "2 + 2 equals 4.",
      "what’s 10*5?": "10 times 5 equals 50.",
      "what’s the square root of 16?": "The square root of 16 is 4.",
      "translate hello in spanish?": "Hello in Spanish is ‘Hola’.",
      "translate thank you in french?": "Thank you in French is ‘Merci’.",
      "how to cook rice?": "Rinse rice, add water, boil, then simmer until soft.",
      "how to make tea?": "Boil water, add tea leaves, steep, and enjoy.",
      "how to stay healthy?": "Eat balanced meals, exercise, and get enough sleep.",
      "how to study better?": "Break tasks into chunks, take notes, and review often.",
      "how to save money?": "Track expenses, avoid impulse buys, and set a budget.",
      "how to be happy?": "Focus on gratitude, relationships, and self-care.",
      "how to sleep well?": "Keep a routine, avoid screens before bed, and relax.",
      "how to exercise?": "Start with stretching, then do cardio or strength training.",
      "how to meditate?": "Sit quietly, focus on your breath, and let thoughts pass.",
      "how to learn english?": "Practice daily, read books, and talk with others.",
      "how to cook pasta?": "Boil water, add pasta, cook until tender, then drain.",
      "how to clean a room?": "Declutter, dust surfaces, and vacuum or mop floors.",
      "how to iron clothes?": "Set iron temperature, smooth fabric, and press gently.",
      "how to wash dishes?": "Scrub with soap, rinse with water, and dry.",
      "how to brush teeth?": "Use fluoride toothpaste, brush for 2 minutes, twice daily.",
      "how to drive a car?": "Start engine, use mirrors, follow traffic rules carefully.",
      "how to ride a bike?": "Balance, pedal steadily, and keep your eyes forward.",
      "how to swim?": "Practice breathing, kick gently, and move arms in rhythm.",
      "how to tie a tie?": "Cross wide end over narrow, loop, and pull through.",
      "how to boil an egg?": "Place eggs in boiling water for 7–10 minutes.",
      "how to make coffee?": "Brew ground coffee with hot water, add milk or sugar if you like.",
      "how to bake a cake?": "Mix flour, sugar, eggs, bake at 180°C until golden.",
      "how to cut vegetables?": "Wash them, use a sharp knife, and slice carefully.",
      "how to plant seeds?": "Place seeds in soil, water regularly, and give sunlight.",
      "how to lose weight?": "Eat healthy, exercise daily, and avoid junk food.",
      "how to gain weight?": "Eat protein-rich meals and strength-train regularly.",
      "how to make friends?": "Be kind, listen, and share common interests.",
      "how to improve memory?": "Practice recall, sleep well, and eat brain-healthy foods.",
      "how to improve focus?": "Remove distractions, set goals, and take breaks.",
      "how to cook chicken?": "Season chicken, cook until juices run clear.",
      "how to cook fish?": "Season fish, grill or fry until flaky.",
      "how to cook vegetables?": "Steam or sauté with spices for flavor.",
      "how to make soup?": "Boil veggies or meat with spices until tender.",
      "how to make salad?": "Mix fresh veggies, add dressing, and toss.",
      "how to make sandwich?": "Layer bread with fillings like cheese or veggies.",
      "how to make pizza?": "Prepare dough, add toppings, bake until crust is crisp.",
      "how to make burger?": "Grill patty, place in bun with toppings.",
      "how to make omelette?": "Beat eggs, add fillings, cook in a pan.",
      "how to boil milk?": "Heat milk until it bubbles, then cool.",
      "how to wash clothes?": "Sort by color, add detergent, wash and dry.",
      "how to fold clothes?": "Lay flat, fold sleeves, then fold in half.",
      "how to clean shoes?": "Wipe with cloth, use polish if needed.",
      "how to clean glasses?": "Use lens cleaner and a soft cloth.",
      "how to clean phone?": "Wipe with microfiber cloth and sanitizer.",
      "how to clean laptop?": "Use compressed air and a soft cloth.",
      "how to clean kitchen?": "Wipe counters, wash dishes, mop floor.",
      "how to clean bathroom?": "Scrub tiles, clean sink, disinfect surfaces.",
      "how to clean car?": "Wash exterior, vacuum interior, polish surfaces.",
      "how to save electricity?": "Turn off lights, unplug devices, use efficient bulbs.",
      "how to save water?": "Fix leaks, take shorter showers, reuse water.",
      "how to recycle?": "Separate paper, plastic, and glass for recycling.",
      "how to travel cheap?": "Book early, use public transport, and compare prices.",
      "how to pack luggage?": "Roll clothes, use organizers, and pack essentials.",
      "how to book tickets?": "Use online apps or websites to book easily.",
      "how to use email?": "Compose, attach files, and send to recipient.",
      "how to use whatsapp?": "Install app, add contacts, and start chatting.",
      "how to use facebook?": "Create account, add friends, and share posts.",
      "how to use instagram?": "Upload photos, follow friends, and like posts.",
      "how to use twitter?": "Tweet thoughts, follow accounts, and engage.",
      "how to use youtube?": "Search videos, subscribe channels, and watch.",
      "how to use zoom?": "Install app, join meetings with ID and password.",
      "how to use google maps?": "Search location, follow directions, and navigate.",
      "how to use calculator?": "Enter numbers, choose operation, and get result.",
      "how to use calendar?": "Add events, set reminders, and check dates.",
      "how to use alarm?": "Set time, choose sound, and activate.",
      "how to use torch?": "Switch on flashlight in your phone or device.",
      "how to use camera?": "Open app, focus lens, and click photo.",
      "how to use headphones?": "Plug in or connect via Bluetooth, then play audio.",
      "how to use charger?": "Plug into socket, connect to device, and charge."
    };

    const normalizedText = text.toLowerCase().trim();
    const botResponse = botResponses[normalizedText] || "I'm sorry, I don't understand that yet. ";

    const bot = await Bot.create({
      text: botResponse
    })

    return res.status(200).json(
      {
        userMessage: user.text,
        botMessage: bot.text
      });
  } catch (error) {
    console.error('Error processing message:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}