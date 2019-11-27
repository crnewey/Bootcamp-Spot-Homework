#!/usr/bin/env python
# coding: utf-8

# # Scraping

# In[78]:


#dependencies
import numpy as np
import pandas as pd
from selenium import webdriver
from bs4 import BeautifulSoup as bs
import requests as req


# # NASA Mars News


def init_browser():
# In[80]:
    return webdriver.Chrome('windows\chromedriver.exe')

def scrape_info():
    browser = init_browser()

# News and paragraph data to reference for later
    news_data = {}
    paragraph_text = []


    # In[81]:


    base_url = "https://mars.nasa.gov/"  
    nasa_url = "https://mars.nasa.gov/news/"


    # In[82]:


    response_1 = req.get(nasa_url)    


    # In[83]:


    nasa_soup = bs(response_1.text, 'html.parser') 


    # In[84]:


    soup_title = nasa_soup.find('div', class_="content_title")
    news_title = soup_title.text  

    news = nasa_soup.find('div', class_"rollover_description_inner")
    news_text = news.text



    # In[85]:


    # soup_p = soup_div.find_all('a', href=True)                                   
    # soup_p_url = soup_p[0]['href']                                               
    # paragraph_url = base_url + soup_p_url                                       
    # response_2 = req.get(paragraph_url)                                         
    # para_soup = bs(response_2.text, "html.parser")                              
    # ww_paragraphs = para_soup.find(class_='wysiwyg_content')                     
    # paragraphs = ww_paragraphs.find_all('p')      


    # # In[86]:


    # for paragraph in paragraphs:                                                
    #     clean_paragraph = paragraph.get_text().strip()                           
    #     paragraph_text.append(clean_paragraph)  


    # # In[87]:


    # news_data["news_title"] = news_title   


    # # In[88]:


    # news_data["paragraph_text_1"] = paragraph_text[0] 


    # # In[89]:



    # news_data["paragraph_text_2"] = paragraph_text[1] 


    # # In[90]:


    # news_data
# ---------------------------------------------

    # # JPL Mars Space Images

    # In[97]:


    browser = webdriver.Chrome('windows/chromedriver.exe')


    # In[98]:


    jpl_fullsize_url = 'https://photojournal.jpl.nasa.gov/jpeg/'                 
    jpl_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"  
    url = "https://www.jpl.nasa.gov/"

    # In[101]:


    # browser.get(jpl_url)       
    # jpl_html = browser.page_source
    # jpl_soup = bs(jpl_html, "html.parser")

    response=req.get(jpl_url)
    soup=bs(reponse.text, 'html.parser')
    result=soup.find('article', class_='carousel_item').attrs

    style=str(result['style'])
    style

    style_trim = style.replace('background-image:', "")
    style_trim

    style_trim2 = style_trim.replace(" url('",")
    style_trim2

    style_trim3 = style_trim2.replace("'); ", "")
    style_trim3

    image= url + style_trim3
    # In[102]:


    # featured_image_list = []                                                  
    # for image in jpl_soup.find_all('div',class_="img"):                       
    #     featured_image_list.append(image.find('img').get('src'))


    # # In[103]:


    # feature_image = featured_image_list[0]                                       
    # temp_list_1 = feature_image.split('-')                                       
    # temp_list_2 = temp_list_1[0].split('/')                                      
    # featured_image_url = jpl_fullsize_url + temp_list_2[-1] + '.jpg' 


    # # In[104]:


    # featured_image_url


    # # In[96]:


    # browser.quit()


    # # Mars Weather

    # In[106]:


    browser = webdriver.Chrome('windows/chromedriver.exe')


    # In[121]:
# -----------------------------------

    tweet_url = 'https://twitter.com/marswxreport?lang=en'      
    response = req.get(tweet_url)  

                                                
    tweet_soup = bs(response.text, 'html.parser') 
    result = soup.find('div', class_="js-tweet-text-container")

    weather=result.p.text


    
    # # In[123]:


    # weather_info_list = []                                                      
    # for weather_info in tweet_soup.find_all('p',class_="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text"):
    #     weather_info_list.append(weather_info.text.strip()) 


    # # In[127]:


    # for value in reversed(weather_info_list):                                   
    #     if value[:3]=='Sol':                                                     
    #         mars_weather = value  


    # # In[129]:


    # value


    # # In[ ]:


    # browser.quit()

# -------------------------------------
    # # Mars Facts

    # In[130]:


    facts_url = 'https://space-facts.com/mars/'


    # In[131]:


    fact_list = pd.read_html(facts_url[0])
    fact_list.columns = ['Characteristic', 'Mars', 'Earth']
    fact_list

    fact_list2 =pd.read_html(facts_url[1])
    fact_list.columns = ['Characteristic', 'Data']
    fact_list2

    fact_list=fact_list.to_html()
    fact_list2=fact_list2.to_html()

    # In[132]:


    # facts_df = fact_list[0]


    # In[133]:


    # facts_table = facts_df.to_html(header=False, index=False)                   
    # print(facts_table) 

# -------------------------------------------------
    # # Mars Hemispheres

    # In[156]:


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

        mars_data = {"Title": news_title, "Info": news_text, "Image": image, "Weather": weather, "Facts1": Mars_table1, "Facts2": Mars_table2, "Hemispheres": hemisphere_url_images}
        return mars_data

    # products = usgs_soup.find('div', class_='result-list')                      
    # hemispheres = products.find_all('div', class_='item')                       

    # for hemisphere in hemispheres:    

    #     usgs_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    #     browser.get(usgs_url)  

    #     html = browser.page_source
    #     soup = bs(html, "html.parser")

    #     image = soup.find('div', class_='collapsible results').find('ul').find('li')  
    #     img_url = image.a['href']

    #     hemisphere_image_urls.append({'img_url': img_url})    
    #     return  hemisphere_image_urls 

# --------------------

    # relative_image_path = soup.find_all("img")[2]["src"]
    # mars_img = usgs_url + relative_image_path
    # mars_data = {"mars_img": mars_img}







    # In[170]:




    # In[151]:


    browser.quit()

