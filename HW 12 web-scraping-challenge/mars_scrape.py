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

# In[80]:


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


soup_div = nasa_soup.find(class_="slide")
soup_news = soup_div.find_all('a')                                  
news_title = soup_news[1].get_text().strip()  


# In[85]:


soup_p = soup_div.find_all('a', href=True)                                   
soup_p_url = soup_p[0]['href']                                               
paragraph_url = base_url + soup_p_url                                       
response_2 = req.get(paragraph_url)                                         
para_soup = bs(response_2.text, "html.parser")                              
ww_paragraphs = para_soup.find(class_='wysiwyg_content')                     
paragraphs = ww_paragraphs.find_all('p')      


# In[86]:


for paragraph in paragraphs:                                                
    clean_paragraph = paragraph.get_text().strip()                           
    paragraph_text.append(clean_paragraph)  


# In[87]:


news_data["news_title"] = news_title   


# In[88]:


news_data["paragraph_text_1"] = paragraph_text[0] 


# In[89]:



news_data["paragraph_text_2"] = paragraph_text[1] 


# In[90]:


news_data


# # JPL Mars Space Images

# In[97]:


browser = webdriver.Chrome('windows/chromedriver.exe')


# In[98]:


jpl_fullsize_url = 'https://photojournal.jpl.nasa.gov/jpeg/'                 
jpl_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"  


# In[101]:


browser.get(jpl_url)       
jpl_html = browser.page_source
jpl_soup = bs(jpl_html, "html.parser")


# In[102]:


featured_image_list = []                                                  
for image in jpl_soup.find_all('div',class_="img"):                       
    featured_image_list.append(image.find('img').get('src'))


# In[103]:


feature_image = featured_image_list[0]                                       
temp_list_1 = feature_image.split('-')                                       
temp_list_2 = temp_list_1[0].split('/')                                      
featured_image_url = jpl_fullsize_url + temp_list_2[-1] + '.jpg' 


# In[104]:


featured_image_url


# In[96]:


browser.quit()


# # Mars Weather

# In[106]:


browser = webdriver.Chrome('windows/chromedriver.exe')


# In[121]:


tweet_url = 'https://twitter.com/marswxreport?lang=en'      
browser.get(tweet_url)  


# In[122]:


tweet_html = browser.page_source                                                    
tweet_soup = bs(tweet_html, 'html.parser') 


# In[123]:


weather_info_list = []                                                      
for weather_info in tweet_soup.find_all('p',class_="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text"):
    weather_info_list.append(weather_info.text.strip()) 


# In[127]:


for value in reversed(weather_info_list):                                   
    if value[:3]=='Sol':                                                     
        mars_weather = value  


# In[129]:


value


# In[ ]:


browers.quit()


# # Mars Facts

# In[130]:


facts_url = 'https://space-facts.com/mars/'


# In[131]:


fact_list = pd.read_html(facts_url)


# In[132]:


facts_df = fact_list[0]


# In[133]:


facts_table = facts_df.to_html(header=False, index=False)                   
print(facts_table) 


# # Mars Hemispheres

# In[156]:


browser = webdriver.Chrome('windows/chromedriver.exe')
usgs_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
browser.get(usgs_url)  


# In[157]:


usgs_html = browser.page_source                                                     
usgs_soup = bs(usgs_html, 'html.parser')


# In[169]:


def scrape():
    browser = init_browser()
    hemisphere_image_urls = []
    
    products = usgs_soup.find('div', class_='result-list')                      
    hemispheres = products.find_all('div', class_='item')                       

    for hemisphere in hemispheres:    

        usgs_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
        browser.get(usgs_url)  

        html = browser.page_source
        soup = BeautifulSoup(html, "html.parser")

        image = soup.find('div', class_='downloads').find('ul').find('li')  
        img_url = image.a['href']

        hemisphere_image_urls.append({'title': title_text, 'img_url': img_url})    

        return image


# In[170]:


hemisphere_image_urls 


# In[151]:


browser.quit()

