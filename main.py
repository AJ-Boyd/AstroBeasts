"""
auth: AJ Boyd
date: 2/26/24
desc: creates and starts the flask application
file: main.py
"""

from astrobeasts import createApp

app = createApp()

if __name__ == "__main__":
    app.run(debug=True)
