from flask import Flask, request, jsonify 
from flask_cors import CORS

from models import db ,Tasks
import json


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']="sqlite:///tasks.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/get_task', methods=['GET'])
def get_task():
    tasks=Tasks.query.all()
    tasks=[{"id":task.id, "name":task.name , "description":task.description , "start_date":task.start_date , "due_date":task.due_date} for task in tasks]
    return jsonify({"tasks":tasks}),200

@app.route('/add_task', methods=['POST'])
def add_task():
    try:
        data=request.json
        if not data['name'] or not data['description'] or not data['start_date'] or not data['due_date']:
            return jsonify({"message":"All fields are required"}),400
        task=Tasks(name=data['name'], description=data['description'], start_date=data['start_date'], due_date=data['due_date'])
        db.session.add(task)
        db.session.commit()
        return jsonify({"message":"Task added successfully"}),201
    except Exception as e:
        db.session.rollback()
        db.session.commit()
        return jsonify({"message":str(e)}),500 
    
@app.route('/update_task/<int:id>', methods=['PUT']) 
def update_task(id):
    try: 
        data=request.json
        task=Tasks.query.get(id)
        if not task:
            return jsonify({"message":"Task not found"}),404
        task.name=data.get('name' , task.name)
        task.description = data.get('description' , task.description)
        task.start_date = data.get('start_date' , task.start_date)
        task.due_date =  data.get('due_date' , task.due_date)
        db.session.commit()
        return jsonify({'message':'Updated Successfully'}),200
    except Exception as e:
        db.session.rollback()
        db.session.commit()
        return jsonify({"message":str(e)}),500
    

@app.route('/delete_task/<int:id>', methods=["DELETE"])
def delete_task(id):
    try:
        task=Tasks.query.get(id)
        if not task:
            return jsonify({'message':'Task ID Is Not Found!'}), 404
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message':'Deleted Successfully!'}),200

    except Exception as e:
        db.session.rollback()
        db.session.commit()
        return jsonify({"message":str(e)}),500





@app.route("/quote", methods=["GET"])
def get_quote():
    try:
        with open("current_quote.json", "r") as file:
            quote_data = json.load(file)
        return jsonify(quote_data)
    except FileNotFoundError:
        return jsonify({"quote": "No quote available", "author": "Unknown"})


from scheduler import create_scheduler
scheduler = create_scheduler()

if __name__ == "__main__":
    app.run(debug=True)