"""
Turns a .bat file into a website for some reason
"""
import flask
import os
import random
import logging
from uuid import uuid4
from string import ascii_uppercase

app = flask.Flask(__name__)
#app.secret_key = os.urandom(16)
LOG = logging.getLogger(__name__)
#app.config.update(
#    SESSION_COOKIE_SECURE=True,
#    SESSION_COOKIE_HTTPONLY=True,
#    SESSION_COOKIE_SAMESITE="Lax",
#)


class GameRoom:
    roomcodes = []

    @classmethod
    def new_room(cls):
        rid = four_letter_code()
        while rid in GameRoom.roomcodes:
            rid = four_letter_code()
        GameRoom.roomcodes.append(rid)
        return rid

    def __init__(self):
        self.rid = GameRoom.new_room()
        self.uid1 = uuid4()
        self.uid2 = None
        self.turns = 0
        self.gamestate = {}


def is_valid(gamestate):
    return True


def four_letter_code():
    return "".join([random.choice(ascii_uppercase) for _ in range(4)])

@app.route("/input", methods=["POST"])
def send_input():
    new_input = flask.request.get_json()
    if not is_valid(new_input):
        flask.abort(401)
    response = flask.make_response(
        {},
        200,
    )
    return response


@app.route("/newroom")
def newroom():
    new_room = GameRoom()
    response = flask.make_response(
        {
            "rid": new_room.rid,
            "uid": new_room.uid1,
        },
        200,
    )
    return response

@app.route("/")
def index():
    return flask.render_template("index.html")