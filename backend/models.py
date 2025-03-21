from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy ()
class Tasks(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String , nullable= False)
    description =  db.Column(db.String , nullable= False)
    start_date = db.Column( db.String , nullable = False)
    due_date = db.Column(db.String , nullable = False)

