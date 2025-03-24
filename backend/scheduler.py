from apscheduler.schedulers.background import BackgroundScheduler
import json
import random

def load_quotes():
 
    with open("quotes.json", "r") as file:
        return json.load(file)["quotes"]

def update_quote():

    quotes = load_quotes()
    new_quote = random.choice(quotes)

    with open("current_quote.json", "w") as file:
        json.dump(new_quote, file)

    print(f"Updated Quote: {new_quote['quote']} - {new_quote['author']}") 

def create_scheduler():
    """Create and start the scheduler."""
    scheduler = BackgroundScheduler()
    scheduler.add_job(update_quote, "interval", hours=12)  
    scheduler.start()
    update_quote() 
    return scheduler
