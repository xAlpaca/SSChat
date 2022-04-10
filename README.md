# SSChat


### Why SSChat?
- SSChat is an application written in python with library Django.
- This chat may be hosted on any computer with a python3.x installed.
- The main reason of developing this app is lack of privacy on the social media such as and Meta(Facebook) product.

### How to setup it.
- Download and install python 3.x
- ```console: python3 -m pip install django channels```
- ##### But before you will be able to run the site, you have to add a domain name into _[SSForce/onionChat/settings.py]()_
```python 
25 # SECURITY WARNING: don't run with debug turned on in production!
26 DEBUG = True
27 
28 ALLOWED_HOSTS = ["yourSiteDomainName.com", <---- # Replace it with proper data
29                 "32e3dsi76nJknNNSD2321z.onion",
30                 "127.0.0.1",
31                 ]
32 # Application definition
33
34 INSTALLED_APPS = [
35
```

- Now you can run your site:
- ```console: python3 manage.py runserver yourSiteDomainName.com:80``` 
- If you can't run the script, check if you have an administrator permissions, **windows**: run as administrator, **linux**: sudo python3 manage.py ... 


#### For dev's:
- If you are interested in modifying this app on your own, read a [Django Documentation](https://docs.djangoproject.com/en/4.0/)
- This site might be deployed to the TOR circuit, because for "instant" data transfer it uses Ajax server.
