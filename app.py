from flask import Flask ,render_template,url_for,jsonify,request,redirect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_socketio import SocketIO ,emit 
from Model.Model import join_table
import pandas as pd
import os

from werkzeug.utils import secure_filename


app = Flask(__name__, template_folder="Views/templates/",static_url_path="",static_folder="Views/static")

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://yrbojwilzbsaqq:05543744ad1f1feabe1f635b60c7468e95353970bad5bc0be0f76e34e4cf311a@ec2-3-215-57-87.compute-1.amazonaws.com:5432/d3p46mr282o2mq"



db = SQLAlchemy(app)
# db.init_app(app)

migrate = Migrate(app, db)
socketio = SocketIO(app)

class Test(db.Model):
    __tablename__ = 'WIP_Rack'
    #id = db.Column('id',db.Integer, primary_key=True)

    # date_ = db.Column('date_',db.DateTime, primary_key=True)
    id = db.Column('id',db.Integer, primary_key=True)
    RACK_ID = db.Column('RACK_ID',db.String)
    Batch = db.Column('Batch',db.String)
    GRTP = db.Column('GRTP',db.String)
    SLOC = db.Column('SLOC',db.String)
    Copyform = db.Column('Copyform',db.String)
    Cline = db.Column('Cline',db.String)
    Cdate = db.Column('Cdate',db.DateTime)
    Date_QC = db.Column('Date_QC',db.DateTime)
    Weight = db.Column('Weight',db.String)
    QC_Total = db.Column('QC_Total',db.String)
    BR_AQL = db.Column('BR_AQL',db.String)
    CR_AQL = db.Column('CR_AQL',db.String)
    MJ_AQL = db.Column('MJ_AQL',db.String)
    PT_AQL = db.Column('PT_AQL',db.String)
    Remark = db.Column('Remark',db.String)
    Remark2 = db.Column('Remark2',db.String)
    Remark_production_ = db.Column('Remark_production_',db.String)
    Expired_6_Month = db.Column('Expired_6_Month',db.DateTime)
    Ready_PCS_UR = db.Column('Ready_PCS_UR',db.String)
    Blocked = db.Column('Blocked',db.String)
    Wait_to_Check = db.Column('Wait_to_Check',db.String)
    Status = db.Column('Status',db.String)
    Time = db.Column('Time',db.DateTime)
    Updated_Time = db.Column('Updated_Time',db.DateTime)




    # last_sale = db.Column('last_sale',db.Float)
    # total_net_ounces = db.Column('total_net_ounces',db.Float)
    # total_net_tonnes = db.Column('total_net_tonnes',db.Float)
    # net_asset_value_in_trust = db.Column('net_asset_value_in_trust',db.Float)

    



    def to_json(self):
        
        if self.Cdate is None :
            self.Cdate = ""
        if self.Date_QC is None :
            self.Date_QC = ""
        if self.Expired_6_Month is None :
            self.Expired_6_Month = ""
        if self.Expired_6_Month is None :
            self.Expired_6_Month = ""
        if self.Time is None :
            self.Time = ""
        if self.Updated_Time is None :
            self.Updated_Time = ""

        return {
            #'id' : self.id,
            'id' : self.id,
            'RACK_ID': self.RACK_ID,
            'Batch' : self.Batch,
            'GRTP' : self.GRTP,
            'SLOC' : self.SLOC,
            'Copyform' : self.Copyform,
            'Cline' : self.Cline,
            'Cdate' : str(self.Cdate),
            'Date_QC' : str(self.Date_QC),
            'Weight' : self.Weight,
            'QC_Total' : self.QC_Total,
            'BR_AQL' : self.BR_AQL,
            'CR_AQL' : self.CR_AQL,
            'MJ_AQL' : self.MJ_AQL,
            'PT_AQL' : self.PT_AQL,
            'Remark' : self.Remark,
            'Remark2' : self.Remark2,
            'Remark_production_' : self.Remark_production_,
            'Expired_6_Month' : str(self.Expired_6_Month),
            'Ready_PCS_UR': self.Ready_PCS_UR,
            'Blocked' : self.Blocked,
            'Wait_to_Check' : self.Wait_to_Check,
            'Status': self.Status,
            'Time' : str(self.Time),
            'Updated_Time' : str(self.Updated_Time),
        }

@app.route('/')
def index():
    return render_template('Scan_in.html')

@app.route('/Scan_out')
def Scan_out():
    return render_template('Scan_out.html')

@app.route('/Scan_in')
def Scan_in():
    return render_template('Scan_in.html')

@app.route('/Export')
def Export():
    return render_template('Export.html')

@app.route('/Dashboard')
def Dashboard():
    return render_template('Dashboard.html')
    


@app.route('/Test_db',methods=['GET'])
def test():
    try:
        data = Test.query.all()
        json_dat = [i.to_json() for i in data]
        
        # print(json_dat)
        return jsonify(json_dat)

    except Exception as e:
        error_text = "<p>The error:<br>"+str(e)+"</p>"
        hed ="<h1>Something is Broken.</h1>"

        return hed+error_text
        



@app.route('/Rack', methods=['GET', 'PUT', 'DELETE'])
def handle_Rack():

    if request.method == 'GET':
        Rack = request.args.get('Rack_Id')
        


    elif request.method == 'PUT':
         try :
            body = request.get_json()
            if body is not None:
                print(body)
                Rack1 = body['Rack_Id'] + 'T'
                Rack2 = body['Rack_Id'] + 'B'
                Barcode1 = body['Up_Barcode']
                Barcode2 = body['Down_Barcode']

                Position1 = Test.query.filter_by(RACK_ID=Rack1).first()
                Position1.Batch = Barcode1 
                Position2 = Test.query.filter_by(RACK_ID=Rack2).first()
                Position2.Batch = Barcode2



                db.session.commit()

                # user = Test.query.get(5)
                # user.name = 'New Name'
                # db.session.commit()
                
                
                return {"message" : "Got data" , "body" : body} , 200

         except Exception as e:

            return {"error" : "Got error" , "body" : str(e)} , 404

    elif request.method == 'DELETE':
        Rack = request.args.get('Barcode')



@app.route('/Check_Rack_Empty', methods=['GET'])
def Check_Rack_Empty():
        try :
            body = request.get_json()
            Rack1 = body['Rack_Id'] + 'T'
            Rack2 = body['Rack_Id'] + 'B'
            Position1 = Test.query.filter_by(RACK_ID=Rack1).first()
            Position2 = Test.query.filter_by(RACK_ID=Rack2).first()

            if Position1.Batch == "":
                Pos1_empty = True
            else :
                Pos1_empty = False
            if Position2.Batch == "":
                Pos2_empty = True
            else :
                Pos2_empty = False

            res = { "Upper_Post_Empty" : Pos1_empty,
            
                    "Lower_Post_Empty" : Pos2_empty

            }

            return {"message" : "Got data" , "res" : res} , 200


        except Exception as e:
            return {"error" : "Got error" , "body" : str(e)} , 404





@app.route('/uploadLabel',methods=[ "GET",'POST'])
def uploadLabel():
    isthisFile=request.files.get('file')
    print(isthisFile)
    #print(isthisFile.filename)
    print(type(isthisFile))
    #isthisFile.save("./"+isthisFile.filename)


app.config["FILE_UPLOAD"] = r"datta-able-bootstrap-dashboard\FileStorage"
app.config["ALLOWED_FILE_EXTENSION"] = ["CSV","XLSX"]
app.config["MAX_FILESIZE"] = 100*1024*1024

def allowed_file(filename):

    if not "." in filename:
        return False

    ext = filename.rsplit(".",1)[1]

    if ext.upper() in app.config["ALLOWED_FILE_EXTENSION"]:
        return True
    else :
        return False

def allowed_file_filesize(filesize):

    if int(filesize) < app.config["MAX_FILESIZE"]:
        return True

    else:
        return False


@app.route('/upload-file',methods=["GET","POST"])
def upload_SAP():
    
    if request.method == "POST":

        
        print(request.cookies.to_dict())
        if request.files:

            if not allowed_file_filesize(request.cookies.to_dict().get("filesize")):
                print("File exceed Max limit size")
                return redirect(request.url)


            

            SAPfile = request.files["SAP"]

            if SAPfile.filename == "":
                print("Dont have file name")
                return redirect(request.url)
            if not allowed_file(SAPfile.filename):
                print("Ext not allowed")
                return redirect(request.url)

            else:

                # filename = secure_filename(SAPfile.filename)
                # #print(os.path.join(app.config["FILE_UPLOAD"],filename))
                # SAPfile.save(os.path.join(app.config["FILE_UPLOAD"],filename))
                # print(SAPfile)
                ext = SAPfile.filename.rsplit(".",1)[1]
                if ext.upper() == "XLSX":
                    SAP_df = pd.read_excel(SAPfile)
                    SAP_df.to_pickle(os.path.join(app.config["FILE_UPLOAD"],"SAP_df_pickle.pkl"))
                    print("SAP_data saved")

                    return {"message" : "Success"} , 200

                elif ext.upper() == "CSV":
                    SAP_df = pd.read_csv(SAPfile)
                    SAP_df.to_pickle(os.path.join(app.config["FILE_UPLOAD"],"SAP_df_pickle.pkl"))
                    print("SAP_data saved")

                    return {"message" : "Success"} , 200
                else :
                    print("Failed")
                    
            


            return redirect(request.url)


    return render_template('Upload_SAP.html')

if __name__ == '__main__':
    app.run(debug=True)
    #app.run(host='10.120.3.30', port=5000)
    #app.run(host='192.168.43.104', port=5000 )
    #app.run(host='192.168.43.104', port=5000, debug=True, threaded=False)

