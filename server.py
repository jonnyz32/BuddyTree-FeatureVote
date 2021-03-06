
from flask import Flask, request
import flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__,static_folder="./build",static_url_path="/")
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://kyznlguphxnjzx:3f14c7bc4be324cc871b16147800ede42df5f0406593882b0b9020dba194bf86@ec2-54-243-92-68.compute-1.amazonaws.com:5432/d3fint3qcntumv'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = 'secret string'
CORS(app)
db = SQLAlchemy(app)

class User_votes(db.Model):
    userid = db.Column(db.Integer, primary_key=True)
    feature = db.Column(db.String(500), primary_key=True)

    def __init__(self, userid, feature):
        self.userid = userid
        self.feature = feature

class Feature_votes(db.Model):
    feature = db.Column(db.String(500), primary_key=True)
    votes = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    def __init__(self, feature, votes, date):
        self.feature = feature
        self.votes = votes
        self.date = date

# Serve the react app

@app.route("/")
def index(): 
    return app.send_static_file("index.html")

@app.route("/<user>")
def userIndex(user): 
    return app.send_static_file("index.html")

     

 # Retrieve currently polled features from Feature_votes
@app.route("/getVotes", methods=['GET'])
def getVotes():
    rows = Feature_votes.query.filter().order_by(Feature_votes.date)
    response = []
    feature_votes = []
    user_votes = {}
    for row in rows:
        feature_votes.append(
            {"feature": row.feature,
             "votes": row.votes
        })
    response.append(feature_votes)
    response.append(user_votes)
    return flask.jsonify(response)
   

# Retrieve currently polled features from Feature_votes
@app.route("/getVotes/<user>", methods=['GET'])
def getVotesUser(user):
    rows = Feature_votes.query.filter().order_by(Feature_votes.date)
    response = []
    feature_votes = []
    user_votes = {}
    for row in rows:
        feature_votes.append(
            {"feature": row.feature,
             "votes": row.votes
        })
    response.append(feature_votes)
    
    userVotes = User_votes.query.filter_by(userid = user).all() 
    for row in userVotes:
        user_votes[row.feature] = 1
    response.append(user_votes)
    print("userVotes: ", userVotes)
    
    
    return flask.jsonify(response)

# Add a new feature to the db with votes set to 0
@app.route("/featureAdd", methods=['POST'])
def featureAdd():
    feature = request.get_json()["feature"]
    featureEntry = Feature_votes(feature, 0, datetime.utcnow())
    db.session.add(featureEntry)
    db.session.commit()

    response = {"feature": featureEntry.feature,
                "votes": 0,
                "date": featureEntry.date
                }

    return response
  

@app.route("/featureModifyVotes/<user>", methods=['POST'])
def featureModifyVotes(user):
    feature = request.get_json()["feature"]
    direction = request.get_json()["direction"]
    featureEntry = Feature_votes.query.filter_by(feature=feature).first()

    
    if (direction == "increase"):
        featureEntry.votes += 1
        userEntry = User_votes(user, feature)
        db.session.add(userEntry)
    else:
        featureEntry.votes -= 1
        userEntry = User_votes.query.filter(User_votes.userid == user, User_votes.feature == feature).first()
        db.session.delete(userEntry)
    
    db.session.commit()
    response = {featureEntry.feature: featureEntry.votes}

    
    
    return response

if __name__ == '__main__':
    app.run()
