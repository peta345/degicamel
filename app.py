# coding: utf-8
import MySQLdb
from MySQLdb.cursors import DictCursor
from collections import OrderedDict
from flask import Flask, render_template, request, redirect, url_for


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    if(request.form['search-box']):
        word = request.form['search-box']
        return render_template('index.html', word=word)
    else:
        word = ""
        return render_template('index.html')



if __name__ == '__main__':
    app.debug = True # デバッグモード有効化
    app.run() # どこからでもアクセス可能に
