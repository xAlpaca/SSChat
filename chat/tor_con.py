import requests
session = requests.session()

session.proxies = {'http':  'socks5h://localhost:9050',
                   'https': 'socks5h://localhost:9050'}

data = requests.post("http://6j2hum3uo4bebnchlo2b3xaaqb5235pqyiqlhk3zzlgczg24piwyfxqd.onion/chat/loobby/",data= {"desc": "Request to tor"}, proxies=session.proxies).text

print(data)