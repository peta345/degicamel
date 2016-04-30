# -*- coding: utf-8 -*-
import MySQLdb
from MySQLdb.cursors import DictCursor
#Pythonの辞書の順番をよしなにしてくれるやつ
from collections import OrderedDict
from flask import Flask, render_template, request, redirect, url_for, json,jsonify
import sys
import codecs
import sys

sys.dont_wirte_bytecode = True


app = Flask(__name__)

#sys.stdout = codecs.getwriter('utf_8')(sys.stdout) 
@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/top', methods=['GET', 'POST'])
def top():
	return render_template('top.html')

@app.route('/submit', methods=['POST'])
def submit():
    if(request.form['search-box']):
		word = request.form['search-box']
		word = 'select * from article where title like ' + '"%' + word + '%"'
		result = _execute(word)
		print len(result)
		if len(result) == 0:
			mes = "その検索ワードにはなにもマッチしませんでした。"
			return render_template('index.html', mes=mes)
		return render_template('index.html', result=result)
    else:
        word = ""
        return render_template('index.html')

@app.route('/signUp', methods=['POST'])
def signUp():
    _name = request.form['inputName']
    _email = request.form['inputEmail']
    _password = request.form['inputPassword']

@app.route('/iine', methods=['POST'])
def iine():
	pack = request.json
	print pack
	print pack['id']
	colid = pack['id']
	_addfav(colid)
	return_data = pack
	return jsonify(ResultSet=json.dumps(return_data))	

def _execute(word):
	connection = MySQLdb.connect(db='camels', user='root', passwd='password')
	cursor = connection.cursor()
	cursor.execute(word)
	result = cursor.fetchall()
	cursor.close()
	connection.close()
	return result

def _addfav(colid):
	connection = MySQLdb.connect(db='camels', user='root', passwd='password')
	cursor = connection.cursor()
	colid = colid.encode('utf-8')
	word = 'update article set fav = fav + 1 where id = ' + colid + ';'
	cursor.execute(word)
	connection.commit()
	cursor.close()
	connection.close()

	


if __name__ == '__main__':
    app.debug = True # デバッグモード有効化
    app.run() # どこからでもアクセス可能に
