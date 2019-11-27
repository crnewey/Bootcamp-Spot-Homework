import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///final_df.sqlite"
# db = SQLAlchemy(app)
engine = create_engine(f"sqlite:///final_df.sqlite")

# reflect an existing database into a new model
# Base = automap_base()
# reflect the tables
# Base.prepare(db.engine, reflect=True)

# Final_df = Base.classes.final_df

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/data")
def data():
    data=engine.execute("SELECT Year,UE_Rate,County,State,FIPS,PX_Rate FROM final_df")
    results = []
    # import pdb; pdb.set_trace()
    for record in data:
        # row = {"Year": record[0], "FIPS": record[1]} 
        row = {"Year": record[0],"UE_Rate": record[1], "County": record[2],"State": record[3], "FIPS": record[4], "PX_Rate": record[5]}
        results.append(row)
    return jsonify(results)

    # return jsonify(data)

# @app.route("/names")
# def names():
#     """Return a list of FIPS names."""

#     # Use Pandas to perform the sql query
#     stmt = db.session.query(Final_df).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Return a list of the column names (sample names)
#     return jsonify(list(df.columns)[1:])

# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Final_df).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

   
#     sample_data = df.loc[df[year] == 2016, ["year", "state", sample]]

#     # Sort by sample
#     sample_data.sort_values(by=sample, ascending=False, inplace=True)

#     # Format the data to send as json
#     data = {
#         "year": sample_data.year.values.tolist(),
#         "state": sample_data[state].values.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run()