from flask import Flask ,render_template,url_for,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_socketio import SocketIO ,emit 
from Model.Model import join_table

app = Flask(__name__, template_folder="Views/templates/",static_url_path="",static_folder="Views/static")

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://tcddcasvpynvte:d2da9d5e29706ba51b3e5e30acb0fdcbaae972dd7916e66ddc6ee227f0ff7200@ec2-3-222-11-129.compute-1.amazonaws.com:5432/dddtvj83ts4s11"



db = SQLAlchemy(app)
# db.init_app(app)

migrate = Migrate(app, db)

socketio = SocketIO(app)

class Test(db.Model):
    __tablename__ = 'spdr_gold_data'
    #id = db.Column('id',db.Integer, primary_key=True)

    date_ = db.Column('date_',db.DateTime, primary_key=True)
    last_sale = db.Column('last_sale',db.Float)
    total_net_ounces = db.Column('total_net_ounces',db.Float)
    total_net_tonnes = db.Column('total_net_tonnes',db.Float)
    net_asset_value_in_trust = db.Column('net_asset_value_in_trust',db.Float)

    def to_json(self):
        return {
            #'id' : self.id,
            'date_' : str(self.date_),
            'last_sale': self.last_sale,
            'total_net_ounces' : self.total_net_ounces,
            'total_net_tonnes' : self.total_net_tonnes,
            'net_asset_value_in_trust' : self.net_asset_value_in_trust

        }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/Test_db',methods=['GET'])
def test():
    try:
        data = Test.query.order_by(Test.date_.desc()).limit(25).all()
        json_dat = [i.to_json() for i in data]
        # print(json_dat)
        return jsonify(json_dat)

    except Exception as e:
        error_text = "<p>The error:<br>"+str(e)+"</p>"
        hed ="<h1>Something is Broken.</h1>"

        return hed+error_text
        


if __name__ == '__main__':
    app.run(debug=True)


