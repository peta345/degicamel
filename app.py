# -*- coding: utf-8 -*-
import MySQLdb
from MySQLdb.cursors import DictCursor
from collections import OrderedDict
from flask import Flask, render_template, request, redirect, url_for
import sys
import codecs


app = Flask(__name__)

#sys.stdout = codecs.getwriter('utf_8')(sys.stdout) 
@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    if(request.form['search-box']):
        connection = MySQLdb.connect(db='camels', user='root', passwd='password')
        cursor = connection.cursor()
        word = request.form['search-box']
        cursor.execute('select * from indexs where title like ' + '"%' + word + '%"')
        result = cursor.fetchall()
        print len(result)
        if len(result) == 0:
            mes = "その検索ワードにはなにもマッチしませんでした。"
            return render_template('index.html', mes=mes)
        cursor.close()
        connection.close()
        return render_template('index.html', result=result)
        #return render_template('index.html', title=result[0][1], text=result[0][2])
    else:
        word = ""
        return render_template('index.html')



if __name__ == '__main__':
    app.debug = True # デバッグモード有効化
    app.run() # どこからでもアクセス可能に
