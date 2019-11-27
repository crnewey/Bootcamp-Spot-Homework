from flask import Flask, jsonify, redirect, render_template
from flask_pymongo import PyMongo
import mars_scrape

app = Flask(__name__)
# Use PyMongo to establish Mongo connection
# client = pymongo.MongoClient('mongodb://localhost:27017/mars_scrape')
app.config["MONGO_URI"] ="mongodb://localhost:27017/mars_app"

mongo = PyMongo(app)
# mars_data = mars_scrape.scrape_info()
# print('this one', mars_data)
# mongo.db.collection.update({}, mars_data, upsert=True)

# db = client.mars_data_DB
# mars_collection = db.mars_collection

@app.route("/")
def home():
    mars_data = mongo.db.collection.find_one()
    print(mars_data)
    return render_template("index.html", Mars_Info=mars_data)

# Initializes scrape route; inserts results into  mars_data_DB in MongoDB
@app.route('/scrape')
def scrape():
    mars_data = mars_scrape.scrape_info()
    print("this one", mars_data)
    mongo.db.collection.update({}, mars_data, upsert=True)
    return redirect ("/")
if __name__ == "__main__":
    app.run(debug=True)

#     scrape_results = mars_scrape.scrape_info()
# #     mars_collection.replace_one({}, scrape_results, upsert=True)
#     client.db.collection.update({}, scrape_results, upsert=True)
#     return redirect('/')
# if __name__ == '__main__':
#     app.run()
