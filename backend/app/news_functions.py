from app.models.news import News
from app import db
from sqlalchemy import desc
from flask import jsonify, g

def get_all_news():
    news_list = News.query.order_by(desc(News.id)).all()
    print(news_list)
    res_list =[]
    for news in news_list:
        res_list.append(news.as_dictionary())
    return jsonify(res_list)

def get_news_by_id(id):
    news_resp = News.query.get(id)
    return jsonify(news_resp.as_dictionary())

def add_news(req_json):
    n = News(author = g.user,
            tags = req_json["tags"],
            headline = req_json["headline"],
            text = req_json["text"])
    db.session.add(n)
    db.session.commit()
    return jsonify(n.as_dictionary())

def delete_news(id):
    News.query.filter(News.id == id).delete()
    db.session.commit()
    return jsonify({"message": "Nyhet med ID: " + id +" raderades!"})

def edit_news(id, req_json):
    news_item = News.query.get(id)
    news_item.author = g.user
    news_item.headline = req_json["headline"]
    news_item.text = req_json["text"]
    news_item.tags = req_json["tags"]
    db.session.commit()
    return jsonify({"message": "uppdaterade nyhet med ID: " + id})
