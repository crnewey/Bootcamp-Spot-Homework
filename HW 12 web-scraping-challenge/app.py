from flask import Flask, jsonify, redirect, render_template
from flask_pymongo import PyMongo
import mars_scrape

app = Flask(__name__)
# Use PyMongo to establish Mongo connection
# client = pymongo.MongoClient('mongodb://localhost:27017/mars_scrape')
mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")
mars_data = mars_scrape.scrape_info()
print('this one', mars_data)
mongo.db.collection.update({}, mars_data, upsert=True)

# db = client.mars_data_DB
# mars_collection = db.mars_collection

@app.route("/")
def home():
    Mars_data = mongo.db.collecion.find_one()
    print(Mars_data)
    return render_template("index.html", Mars_Info=Mars_data)

# # def render_index():
#     # destination_data = mongo.db.collection.find_one()
#     # Error handler for missing collection
#     mars_find =  client.db.collection.find_one()
#     return render_template("index.html.", mars=mars_find)

#     # try:
#     #     mars_find =  mars_collection.find_one()
#     #     # Distributes data from collection
#     #     news_title = mars_find['news_data']['news_title']
#     #     paragraph_text_1 = mars_find['news_data']['paragraph_text_1']
#     #     paragraph_text_2 = mars_find['news_data']['paragraph_text_2']
#     #     featured_image_url = mars_find['featured_image_url']
#     #     mars_weather_tweet = mars_find['mars_weather']
    #     mars_facts_table = mars_find['mars_facts']
    #     hemisphere_title_1 = mars_find['mars_hemispheres'][0]['title']
    #     hemisphere_img_1 = mars_find['mars_hemispheres'][0]['img_url']
    #     hemisphere_title_2 = mars_find['mars_hemispheres'][1]['title']
    #     hemisphere_img_2 = mars_find['mars_hemispheres'][1]['img_url']
    #     hemisphere_title_3 = mars_find['mars_hemispheres'][2]['title']
    #     hemisphere_img_3 = mars_find['mars_hemispheres'][2]['img_url']
    #     hemisphere_title_4 = mars_find['mars_hemispheres'][3]['title']
    #     hemisphere_img_4 = mars_find['mars_hemispheres'][3]['img_url']
    # except (IndexError, TypeError) as error_handler:
    #     # Missing collection; clears fields
    #     news_title = ""
    #     paragraph_text_1 =""
    #     paragraph_text_2 = ""
    #     featured_image_url = ""
    #     mars_weather_tweet = ""
    #     mars_facts_table = ""
    #     hemisphere_title_1 = ""
    #     hemisphere_img_1 = ""
    #     hemisphere_title_2 = ""
    #     hemisphere_img_2 = ""
    #     hemisphere_title_3 = ""
    #     hemisphere_img_3 = ""
    #     hemisphere_title_4 = ""
    #     hemisphere_img_4 = ""

    # # Renders template to index.html
    # return render_template("index.html", news_title=news_title,\
    #                                      paragraph_text_1=paragraph_text_1,\
    #                                      paragraph_text_2=paragraph_text_2,\
    #                                      featured_image_url=featured_image_url,\
    #                                      mars_weather_tweet=mars_weather_tweet,\
    #                                      mars_facts_table=mars_facts_table,\
    #                                      hemisphere_title_1=hemisphere_title_1,\
    #                                      hemisphere_img_1=hemisphere_img_1,\
    #                                      hemisphere_title_2=hemisphere_title_2,\
    #                                      hemisphere_img_2=hemisphere_img_2,\
    #                                      hemisphere_title_3=hemisphere_title_3,\
    #                                      hemisphere_img_3=hemisphere_img_3,\
    #                                      hemisphere_title_4=hemisphere_title_4,\
    #                                      hemisphere_img_4=hemisphere_img_4)

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
