"""
auth: AJ Boyd
date: 2/26/24
desc: initializes the databases and flask apps
file: init.py
"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sqlite3
from .routes import router
from .models import Base, engine


def createApp():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "asdfasdfsadfSUPER-SECRET-keyyy!!!!"

    app.register_blueprint(router, url_prefix="/")
    with app.app_context():
        Base.metadata.create_all(engine)

    return app
