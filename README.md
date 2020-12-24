# sherashirt
## Endpoints
```
/admin/
/user/api/create/ ----> create user, methods = ['GET','POST']
/user/api/token/ -----> create token for user, methods = ['POST']
manageuserendpoint -----> To authenticate the user, update own profile(Changing the name, password and view in the user objects)
```
## Create your lovely shirt
### Created by django by docker and docker-compose

## Database offers
### Database offer 1
![DataBase](/media_root_tmp/sherashirt_databases.png)
### Database offer 2
![DataBase2](/media_root_tmp/database2.png)
### Database offer 3
![DataBase3](/media_root_tmp/database3.png)
### Database offer 4
![DataBase4](/media_root_tmp/database4.png)


## Supply Chain Management 
![Value chain](/media_root_tmp/value_chain.png)



## How project Created
### This project dockerized and is has Dockerfile and docker-compose(for manage alpine and DB).
### So for run than you should run
```
sudo docker build .
sudo docker-compose build
```
### Now first how we created project by django:
```
docker-compose run app sh -c "django-admin.py startproject app ."
```

#### In above command the "." in the end of command is important baecuse if you dont use "." the project "app" created in your docker image not your corrent path.
### To create app inside of project use this:
```
docker-compose run app sh -c "python manage.py startapp core"
```

### By this command in you can test all tests that thay created by TDD methon
```
docker run app sh -c "python manage.py test"
```
### Now to creating databases wh must run this
```
docker-compose run app sh -c "python manage.py makemigrations core"
```
#### Notice that last core is not neccessory always.
### After change database like move from mysql to postgres you must run these:
```
python manage.py makemigrations
python manage.py migrate
```
### After install madouls then for run our app successfully run this:
```
python manage.py wait_for_db && python manage.py runserver 0.0.0.0:8000
```
