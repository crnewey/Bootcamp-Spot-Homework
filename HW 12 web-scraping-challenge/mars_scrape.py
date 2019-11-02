#dependencies
import numpy as np
import pandas as pd
from selenium import webdriver
from bs4 import BeautifulSoup as bs
import requests as req

# ----------------
# # NASA Mars News

def init_browser():
    return webdriver.Chrome('windows\chromedriver.exe')

def scrape_info():
    # browser = init_browser()
    # news_data = {}
    # paragraph_text = []
    # base_url = "https://mars.nasa.gov/"  
    nasa_url = "https://mars.nasa.gov/news/"

    response_1 = req.get(nasa_url)    
    nasa_soup = bs(response_1.text, 'html.parser') 
    soup_title = nasa_soup.find('div', class_="content_title")
    news_title = soup_title.text  
    news = nasa_soup.find('div', class_="rollover_description_inner")
    news_text = news.text

# ---------------------------------------------
    # # JPL Mars Space Images

    browser = webdriver.Chrome('windows/chromedriver.exe')

    jpl_fullsize_url = 'https://photojournal.jpl.nasa.gov/jpeg/'                 
    jpl_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"  
    url = "https://www.jpl.nasa.gov/"

    response=req.get(jpl_url)
    soup=bs(reponse.text, 'html.parser')
    result=soup.find('article', class_='carousel_item').attrs

    style=str(result['style'])
    style

    style_trim = style.replace('background-image:', "")
    style_trim

    style_trim2 = style_trim.replace(" url('", "")
    style_trim2

    style_trim3 = style_trim2.replace("'); ", "")
    style_trim3

    image= url + style_trim3

# -----------------------------------
    # # Mars Weather

    browser = webdriver.Chrome('windows/chromedriver.exe')
    tweet_url = 'https://twitter.com/marswxreport?lang=en'      
    response = req.get(tweet_url)  

                                                
    tweet_soup = bs(response.text, 'html.parser') 
    result = soup.find('div', class_="js-tweet-text-container")

    weather=result.p.text

# -------------------------------------
    # # Mars Facts

    facts_url = 'https://space-facts.com/mars/'

    fact_list = pd.read_html(facts_url[0])
    fact_list.columns = ['Characteristic', 'Mars', 'Earth']
    fact_list

    fact_list2 =pd.read_html(facts_url[1])
    fact_list.columns = ['Characteristic', 'Data']
    fact_list2

    fact_list=fact_list.to_html()
    fact_list2=fact_list2.to_html()

# -------------------------------------------------
    # # Mars Hemispheres

    browser = webdriver.Chrome('windows/chromedriver.exe')
    usgs_url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    # usgs_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    response=req.get(usgs_url)  
                                                     
    usgs_soup = bs(response.text, 'html.parser')
    result=soup.find_all('div', class_="item")

    url_list = []
    for x in result:
        link = x.find('a')['href']
        url_list.append(link)
    
    hemisphere_url_images = []
    for j in url_list:
        url_base = 'https://astrogeology.usgs.gov'
        url = url_base + j

        reponse = req.get(url)
        time.sleep(5)
        soup=bs(response.text, 'html.parser')

        result1=soup.find('img', class_="wide-image")
        image=url_base+result1["src"]

        result2 = soup.find('h2', class_"title")
        title=result2.text
        title=title.rsplit(' ', 1)[0]
        Mars_dictionary = {"Title": title, "Image_URL": image}
        hemisphere_url_images.append(Mars_dictionary)

        time.sleep(10)

        mars_data = {"Title": news_title, "Info": news_text, "Image": image, "Weather": weather, "Facts1": fact_list, "Facts2": fact_list2, "Hemispheres": hemisphere_url_images}
        return mars_data

    browser.quit()

