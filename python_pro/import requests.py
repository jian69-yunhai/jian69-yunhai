import requests
from bs4 import BeautifulSoup
import pandas as pd

# 设置请求头模拟浏览器访问
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Referer': 'https://www.dianping.com/'
}

def scrape_dianping_shops():
    url = 'https://www.dianping.com/shanghai/ch10/d1'
    
    try:
        # 发送HTTP请求
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # 检查请求是否成功
        
        # 解析HTML内容
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 查找所有商家名称 - 根据实际网页结构调整选择器
        shop_names = []
        shop_elements = soup.select('.shop-list ul li .tit a')  # 可能需要根据实际页面结构调整
        
        for shop in shop_elements:
            shop_names.append(shop.get_text(strip=True))
        
        # 保存到Excel文件
        df = pd.DataFrame({'商家名称': shop_names})
        df.to_excel('abc.xlsx', index=False)
        
        print(f"成功爬取 {len(shop_names)} 个商家名称，已保存到 abc.xlsx")
        
    except Exception as e:
        print(f"爬取过程中出现错误: {e}")

if __name__ == '__main__':
    scrape_dianping_shops()